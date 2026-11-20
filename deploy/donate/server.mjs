// MarkasUI "Buy me a coffee" service: creates Sumopod QRIS payments and records their webhooks.
// Zero dependencies (Node 22+). Runs behind nginx on 127.0.0.1:8787, see deploy/donate/markas-donate.service.
// Secrets come from systemd credentials ($CREDENTIALS_DIRECTORY), never from the environment or the repo.
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const SITE = "https://markas.jenderalcorp.com";
export const PRESETS = [10_000, 25_000, 50_000, 100_000];
export const MIN_AMOUNT = 10_000;
export const MAX_AMOUNT = 5_000_000;
export const NAME_MAX = 40;
export const MESSAGE_MAX = 140;
export const ORDER_ID_PATTERN = /^KOPI-\d{8}-[A-Z2-7]{16}$/;
// Sumopod's checkout hosts. Live payments currently return checkout.pymnt.app links.
export const CHECKOUT_PREFIXES = [
  "https://pay.sumopod.com/",
  "https://checkout.pymnt.app/",
];
const DONATE_BODY_MAX = 2 * 1024;
const WEBHOOK_BODY_MAX = 64 * 1024;
const SUMOPOD_TIMEOUT_MS = 10_000;
const WEBHOOK_TOLERANCE_S = 5 * 60;
const BUCKET_SIZE = 5;
const GLOBAL_PER_MINUTE = 30;
const JAKARTA_OFFSET_MS = 7 * 3600_000;
/** Public supporters list: how many, how long one answer is reused, and its own per-IP limit. */
export const SUPPORTERS_LIMIT = 12;
export const SUPPORTERS_CACHE_MS = 60_000;
const SUPPORTERS_PER_MINUTE = 20;
const FINAL_STATUS = {
  "payment.completed": "completed",
  "payment.failed": "failed",
  "payment.expired": "expired",
};
const BASE32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
// C0/C1 controls plus bidi overrides, which could disguise a name in the dashboard or the log.
const UNSAFE_CHARS =
  // eslint-disable-next-line no-control-regex -- removing control characters is the point.
  /[\u0000-\u001f\u007f-\u009f\u200e\u200f\u202a-\u202e\u2066-\u2069]/g;

/** A preset or a whole-rupiah amount within the custom range; null otherwise. */
export function validateAmount(value) {
  if (!Number.isSafeInteger(value)) return null;
  if (PRESETS.includes(value)) return value;
  return value >= MIN_AMOUNT && value <= MAX_AMOUNT ? value : null;
}

/** Trimmed text without control characters; "" when absent, null when not a string or too long. */
export function cleanText(value, max) {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") return null;
  const text = value.replace(UNSAFE_CHARS, "").trim();
  return [...text].length > max ? null : text;
}

/** { amount, name, message, locale } from a parsed request body, or { error }. */
export function parseDonation(body) {
  if (!body || typeof body !== "object" || Array.isArray(body))
    return { error: "invalid_body" };
  const amount = validateAmount(body.amount);
  if (amount === null) return { error: "invalid_amount" };
  const name = cleanText(body.name, NAME_MAX);
  if (name === null) return { error: "invalid_name" };
  const message = cleanText(body.message, MESSAGE_MAX);
  if (message === null) return { error: "invalid_message" };
  return { amount, name, message, locale: body.locale === "id" ? "id" : "en" };
}

const base32 = (bytes) => {
  let bits = 0;
  let value = 0;
  let out = "";
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += BASE32[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  return out;
};

/** KOPI-<yyyymmdd in Jakarta time>-<16 base32 chars from 80 random bits>. */
export function createOrderId(now = Date.now(), bytes = randomBytes(10)) {
  const day = new Date(now + JAKARTA_OFFSET_MS)
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");
  return `KOPI-${day}-${base32(bytes)}`;
}

const safeEqual = (a, b) => a.length === b.length && timingSafeEqual(a, b);

/** Svix v1 signature check over the raw body. `nowSeconds` is injectable for tests. */
export function verifySvix(
  secret,
  headers,
  rawBody,
  nowSeconds = Math.floor(Date.now() / 1000),
) {
  const id = headers["svix-id"];
  const timestamp = headers["svix-timestamp"];
  const signatures = headers["svix-signature"];
  if (!secret || !id || !timestamp || !signatures || !/^\d+$/.test(timestamp))
    return false;
  if (Math.abs(nowSeconds - Number(timestamp)) > WEBHOOK_TOLERANCE_S)
    return false;
  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = createHmac("sha256", key)
    .update(`${id}.${timestamp}.`)
    .update(rawBody)
    .digest();
  return signatures
    .split(" ")
    .filter((entry) => entry.startsWith("v1,"))
    .some((entry) =>
      safeEqual(Buffer.from(entry.slice(3), "base64"), expected),
    );
}

/** X-Webhook-Token check, compared as SHA-256 digests so the length does not leak. */
export function verifyToken(token, header) {
  if (!token || !header) return false;
  const digest = (text) =>
    createHmac("sha256", "markas-donate").update(text).digest();
  return safeEqual(digest(token), digest(header));
}

/** In-memory state rebuilt from the JSONL log: orders (status, the donor's name and message) and applied events. */
export function createStore(file) {
  const orders = new Map();
  const events = new Set();
  const apply = (entry) => {
    if (entry.kind === "order")
      orders.set(entry.order_id, {
        amount: entry.amount,
        status: "pending",
        name: entry.name ?? "",
        message: entry.message ?? "",
        paidAt: null,
      });
    if (entry.kind !== "event") return;
    events.add(entry.event_id);
    const order = orders.get(entry.order_id);
    const status = FINAL_STATUS[entry.event_type];
    if (
      order &&
      status &&
      order.status === "pending" &&
      entry.amount === order.amount
    ) {
      order.status = status;
      if (status === "completed") order.paidAt = entry.at ?? null;
    }
  };
  if (file && existsSync(file)) {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      if (!line) continue;
      try {
        apply(JSON.parse(line));
      } catch {
        console.error("donate: skipped an unreadable log line");
      }
    }
  }
  return {
    order: (orderId) => {
      const order = orders.get(orderId);
      return order ? { amount: order.amount, status: order.status } : null;
    },
    supporters: (limit) => publicSupporters(orders.values(), limit),
    status: (orderId) => orders.get(orderId)?.status ?? null,
    hasEvent: (eventId) => events.has(eventId),
    record(entry) {
      if (file) appendFileSync(file, `${JSON.stringify(entry)}\n`);
      apply(entry);
    },
  };
}

/**
 * The latest paid donations, newest first, as the donor chose to show them: the name they typed (null when they left
 * it empty) and their message. No amount, order id or other data leaves the service. Text is cleaned and capped
 * again here because older log lines predate the current limits; the page renders it as text, never as HTML.
 */
export function publicSupporters(orders, limit = SUPPORTERS_LIMIT) {
  const shown = (value, max) =>
    [...(cleanText(String(value ?? ""), Infinity) ?? "")]
      .slice(0, max)
      .join("") || null;
  return [...orders]
    .filter((order) => order.status === "completed" && order.paidAt)
    .sort((a, b) => b.paidAt.localeCompare(a.paidAt))
    .slice(0, limit)
    .map((order) => ({
      name: shown(order.name, NAME_MAX),
      message: shown(order.message, MESSAGE_MAX),
      date: order.paidAt.slice(0, 10),
    }));
}

/** Per-IP token bucket (5 per minute by default) plus a global per-minute cap. */
export function createLimiter(
  now = Date.now,
  { perMinute = BUCKET_SIZE, globalPerMinute = GLOBAL_PER_MINUTE } = {},
) {
  const refillMs = 60_000 / perMinute;
  const buckets = new Map();
  let windowStart = 0;
  let windowCount = 0;
  return (ip) => {
    const t = now();
    if (t - windowStart >= 60_000) [windowStart, windowCount] = [t, 0];
    if (buckets.size > 10_000) buckets.clear();
    const bucket = buckets.get(ip) ?? { tokens: perMinute, at: t };
    const tokens = Math.min(
      perMinute,
      bucket.tokens + (t - bucket.at) / refillMs,
    );
    if (tokens < 1 || windowCount >= globalPerMinute) {
      buckets.set(ip, { tokens, at: t });
      return false;
    }
    buckets.set(ip, { tokens: tokens - 1, at: t });
    windowCount += 1;
    return true;
  };
}

class HttpError extends Error {
  constructor(status, code) {
    super(code);
    this.status = status;
  }
}

function readBody(req, limit) {
  return new Promise((done, fail) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) return fail(new HttpError(413, "too_large"));
      chunks.push(chunk);
    });
    req.on("end", () => done(Buffer.concat(chunks)));
    req.on("error", fail);
  });
}

const send = (res, status, body, cache = "no-store") => {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": cache,
  });
  res.end(JSON.stringify(body));
};

const clientIp = (req) =>
  req.headers["x-real-ip"] ?? req.socket.remoteAddress ?? "";

/**
 * Request handler. Dependencies are injected so tests run without network or disk:
 * { apiKey, webhookSecret, webhookToken, baseUrl, store, fetch, limiter, now, log }.
 */
export function createHandler(deps) {
  const {
    apiKey,
    webhookSecret,
    webhookToken,
    baseUrl,
    store,
    fetch,
    limiter,
    log = console,
  } = deps;
  const now = deps.now ?? Date.now;
  const supportersLimiter =
    deps.supportersLimiter ??
    createLimiter(now, {
      perMinute: SUPPORTERS_PER_MINUTE,
      globalPerMinute: Infinity,
    });
  let supportersCache = { at: -Infinity, body: null };

  async function createPayment(req) {
    if (req.headers.origin !== SITE)
      throw new HttpError(403, "forbidden_origin");
    if (!/^application\/json\b/i.test(req.headers["content-type"] ?? ""))
      throw new HttpError(415, "json_only");
    if (!limiter(clientIp(req))) throw new HttpError(429, "rate_limited");
    let body;
    try {
      body = JSON.parse(
        (await readBody(req, DONATE_BODY_MAX)).toString("utf8"),
      );
    } catch (error) {
      throw error instanceof HttpError
        ? error
        : new HttpError(400, "invalid_json");
    }
    const donation = parseDonation(body);
    if (donation.error) throw new HttpError(400, donation.error);
    const orderId = createOrderId(now());
    const back = `${SITE}${donation.locale === "id" ? "/id" : ""}/support`;
    const response = await fetch(`${baseUrl}/api/v1/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Api-Key": apiKey },
      body: JSON.stringify({
        order_id: orderId,
        amount: donation.amount,
        currency: "IDR",
        payment_method_type_code: "QRIS",
        expires_in_hours: 1,
        success_return_url: `${back}/thanks?order=${orderId}`,
        cancel_return_url: `${back}/cancel?order=${orderId}`,
      }),
      signal: AbortSignal.timeout(SUMOPOD_TIMEOUT_MS),
    });
    const text = await response.text();
    let payment = null;
    try {
      payment = JSON.parse(text);
    } catch {
      payment = null;
    }
    const url = payment?.payment_link_url;
    if (
      !response.ok ||
      typeof url !== "string" ||
      !CHECKOUT_PREFIXES.some((prefix) => url.startsWith(prefix))
    ) {
      log.error(
        `donate: sumopod create failed for ${orderId}: HTTP ${response.status} ${text.slice(0, 300)}`,
      );
      throw new HttpError(502, "payment_unavailable");
    }
    store.record({
      kind: "order",
      order_id: orderId,
      payment_id: payment.payment_id ?? null,
      amount: donation.amount,
      name: donation.name || undefined,
      message: donation.message || undefined,
      locale: donation.locale,
      at: new Date(now()).toISOString(),
    });
    log.info(`donate: created ${orderId} (${donation.amount} IDR)`);
    return { status: 200, body: { url } };
  }

  async function webhook(req) {
    const raw = await readBody(req, WEBHOOK_BODY_MAX);
    if (!webhookSecret && !webhookToken) {
      log.error(
        "donate: webhook received but no webhook-secret or webhook-token is installed",
      );
      throw new HttpError(503, "webhook_not_configured");
    }
    const verified =
      verifySvix(webhookSecret, req.headers, raw, Math.floor(now() / 1000)) ||
      verifyToken(webhookToken, req.headers["x-webhook-token"]);
    if (!verified) {
      log.error(
        `donate: rejected webhook ${req.headers["svix-id"] ?? "(no svix-id)"}: bad signature`,
      );
      throw new HttpError(401, "invalid_signature");
    }
    let event;
    try {
      event = JSON.parse(raw.toString("utf8"));
    } catch {
      throw new HttpError(400, "invalid_json");
    }
    const data = event?.data ?? {};
    const eventId =
      req.headers["svix-id"] ?? `${event?.event_type}:${data.payment_id}`;
    if (store.hasEvent(eventId))
      return { status: 200, body: { ok: true, duplicate: true } };
    const known = store.order(data.order_id);
    if (known && known.amount !== data.amount)
      log.error(
        `donate: amount mismatch for ${data.order_id}, status not updated`,
      );
    store.record({
      kind: "event",
      event_id: eventId,
      event_type: String(event?.event_type ?? "unknown"),
      order_id: data.order_id ?? null,
      payment_id: data.payment_id ?? null,
      amount: data.amount ?? null,
      status: data.status ?? null,
      at: new Date(now()).toISOString(),
    });
    log.info(
      `donate: webhook ${event?.event_type} ${data.order_id ?? ""} (${eventId})`,
    );
    return { status: 200, body: { ok: true } };
  }

  function status(url) {
    const order = url.searchParams.get("order") ?? "";
    if (!ORDER_ID_PATTERN.test(order))
      throw new HttpError(400, "invalid_order");
    const value = store.status(order);
    if (!value) throw new HttpError(404, "unknown_order");
    return { status: 200, body: { status: value } };
  }

  function supporters(req) {
    if (!supportersLimiter(clientIp(req)))
      throw new HttpError(429, "rate_limited");
    if (now() - supportersCache.at >= SUPPORTERS_CACHE_MS)
      supportersCache = {
        at: now(),
        body: { supporters: store.supporters(SUPPORTERS_LIMIT) },
      };
    return {
      status: 200,
      body: supportersCache.body,
      cache: `public, max-age=${SUPPORTERS_CACHE_MS / 1000}`,
    };
  }

  const routes = {
    "/api/donate": { POST: createPayment },
    "/api/donate/webhook": { POST: webhook },
    "/api/donate/status": { GET: (req, url) => status(url) },
    "/api/donate/supporters": { GET: supporters },
    "/api/donate/health": {
      GET: () => ({
        status: 200,
        body: { ok: true, webhook: Boolean(webhookSecret || webhookToken) },
      }),
    },
  };

  return async (req, res) => {
    const url = new URL(req.url ?? "/", SITE);
    const route = routes[url.pathname];
    const handler = route?.[req.method === "HEAD" ? "GET" : req.method];
    try {
      if (!route) throw new HttpError(404, "not_found");
      if (!handler) throw new HttpError(405, "method_not_allowed");
      const result = await handler(req, url);
      send(res, result.status, result.body, result.cache);
    } catch (error) {
      if (error instanceof HttpError)
        return send(res, error.status, { error: error.message });
      log.error(
        `donate: ${req.method} ${url.pathname} failed: ${error?.name ?? "Error"} ${error?.message ?? ""}`,
      );
      send(res, 502, { error: "payment_unavailable" });
    }
  };
}

/** Reads a credential by name, also under the "donate_" prefix that a directory LoadCredential= gives. */
function credential(name) {
  const dir = process.env.CREDENTIALS_DIRECTORY;
  if (!dir) return "";
  const file = [join(dir, name), join(dir, `donate_${name}`)].find((path) =>
    existsSync(path),
  );
  return file ? readFileSync(file, "utf8").trim() : "";
}

function main() {
  const apiKey = credential("api-key");
  if (!apiKey) throw new Error("donate: api-key credential is missing");
  const stateDir = process.env.STATE_DIRECTORY ?? resolve(".");
  const handler = createHandler({
    apiKey,
    webhookSecret: credential("webhook-secret"),
    webhookToken: credential("webhook-token"),
    baseUrl: (
      process.env.SUMOPOD_BASE_URL ?? "https://api-pay.sumopod.com"
    ).replace(/\/+$/, ""),
    store: createStore(join(stateDir, "donations.jsonl")),
    fetch: globalThis.fetch,
    limiter: createLimiter(),
  });
  const port = Number(process.env.PORT ?? 8787);
  const server = createServer(
    { requestTimeout: 15_000, headersTimeout: 10_000 },
    handler,
  );
  server.listen(port, "127.0.0.1", () =>
    console.info(`donate: listening on 127.0.0.1:${port}`),
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  main();
