// @vitest-environment node
import { createHmac } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ORDER_ID_PATTERN,
  SITE,
  cleanText,
  createHandler,
  createLimiter,
  createOrderId,
  createStore,
  grossUp,
  parseDonation,
  publicSupporters,
  serviceFee,
  SUPPORTERS_LIMIT,
  validateAmount,
  verifySvix,
  verifyToken,
  type HandlerDeps,
  type Store,
  type StoredOrder,
} from "../../deploy/donate/server.mjs";
import { supportCharge, supportFee } from "../../apps/docs/src/lib/support";

// Svix's published test vector (docs.svix.com, "Verifying payloads manually").
const SVIX = {
  secret: "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw",
  id: "msg_p5jXN8AQM9LWM0D4loKWxJek",
  timestamp: "1614265330",
  body: '{"test": 2432232314}',
  signature: "v1,g0hM9SsE+OTPJTGt/tmIKtSyZlE3uFJELVlNIOLJ1OE=",
};
const NOW = Date.UTC(2026, 10, 19, 5, 0, 0);
const PAY_URL =
  "https://pay.sumopod.com/pay/1b0c2d3e-0000-4000-8000-000000000000";

const svixHeaders = (
  id = SVIX.id,
  timestamp = SVIX.timestamp,
  signature = SVIX.signature,
) => ({
  "svix-id": id,
  "svix-timestamp": timestamp,
  "svix-signature": signature,
});

function sign(secret: string, id: string, timestamp: number, body: string) {
  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const signature = createHmac("sha256", key)
    .update(`${id}.${timestamp}.${body}`)
    .digest("base64");
  return svixHeaders(id, String(timestamp), `v1,${signature}`);
}

describe("validation", () => {
  it("accepts presets and whole amounts from 3.000 to 5.000.000", () => {
    for (const amount of [
      3_000, 5_000, 10_000, 25_000, 50_000, 100_000, 12_345, 5_000_000,
    ]) {
      expect(validateAmount(amount)).toBe(amount);
    }
  });

  it("rejects amounts outside the range, fractions and strings", () => {
    for (const amount of [
      0,
      2_999,
      5_000_001,
      10_000.5,
      "25000",
      null,
      Number.NaN,
      Infinity,
    ]) {
      expect(validateAmount(amount)).toBeNull();
    }
  });

  it("strips control and bidi characters and enforces the length in code points", () => {
    expect(cleanText("  Rian\u0000\u202e \n", 40)).toBe("Rian");
    expect(cleanText(undefined, 40)).toBe("");
    expect(cleanText(42, 40)).toBeNull();
    expect(cleanText("☕".repeat(40), 40)).toBe("☕".repeat(40));
    expect(cleanText("a".repeat(41), 40)).toBeNull();
  });

  it("parses a donation and defaults the locale to English", () => {
    expect(
      parseDonation({ amount: 25_000, name: "Rian", message: "Mantap" }),
    ).toEqual({
      amount: 25_000,
      name: "Rian",
      message: "Mantap",
      locale: "en",
    });
    expect(parseDonation({ amount: 25_000, locale: "id" })).toMatchObject({
      locale: "id",
      name: "",
    });
    expect(parseDonation({ amount: 1 })).toEqual({ error: "invalid_amount" });
    expect(parseDonation({ amount: 25_000, message: "x".repeat(141) })).toEqual(
      { error: "invalid_message" },
    );
    expect(parseDonation([])).toEqual({ error: "invalid_body" });
  });
});

describe("QRIS fee paid by the donor", () => {
  // Live Sumopod create responses (2026-11-20): charged amount -> fee; net_amount = amount - fee.
  const LIVE = [
    [3_000, 321],
    [3_071, 322],
    [3_072, 322],
    [3_214, 323],
    [3_500, 325],
    [4_500, 332],
    [5_000, 335],
    [5_338, 338],
    [10_000, 370],
    [12_345, 387],
  ] as const;

  it("matches Sumopod's fee: 0.7% rounded up, plus Rp 300", () => {
    for (const [charged, fee] of LIVE) expect(serviceFee(charged)).toBe(fee);
  });

  it("grosses up so the owner nets exactly the chosen amount", () => {
    // Live: a Rp 5.338 payment returned net_amount 5000.
    expect(grossUp(5_000)).toBe(5_338);
    expect(grossUp(3_000)).toBe(3_324);
    expect(grossUp(25_000)).toBe(25_479);
    expect(grossUp(5_000_000)).toBe(5_035_549);
  });

  it("returns the smallest charge whose net reaches the amount", () => {
    const net = (charged: number) => charged - serviceFee(charged);
    const amounts = [
      ...Array.from({ length: 20_000 }, (_, index) => 3_000 + index),
      99_999,
      100_000,
      1_234_567,
      4_999_999,
      5_000_000,
    ];
    for (const amount of amounts) {
      const charged = grossUp(amount);
      expect(net(charged)).toBeGreaterThanOrEqual(amount);
      expect(net(charged - 1)).toBeLessThan(amount);
    }
  });

  it("agrees with the copy on /support (apps/docs/src/lib/support.ts)", () => {
    for (let amount = 3_000; amount <= 60_000; amount += 7)
      expect(supportCharge(amount)).toBe(grossUp(amount));
    for (const amount of [100_000, 1_000_000, 5_000_000])
      expect(supportCharge(amount)).toBe(grossUp(amount));
    for (const [charged, fee] of LIVE) expect(supportFee(charged)).toBe(fee);
  });
});

describe("order id", () => {
  it("is KOPI-<Jakarta date>-<16 base32 characters>", () => {
    const id = createOrderId(NOW, new Uint8Array(10));
    expect(id).toBe("KOPI-20261119-AAAAAAAAAAAAAAAA");
    expect(createOrderId(NOW)).toMatch(ORDER_ID_PATTERN);
    // 18:30 UTC is already the next day in Jakarta (UTC+7).
    expect(createOrderId(Date.UTC(2026, 10, 19, 18, 30))).toMatch(
      /^KOPI-20261120-/,
    );
  });

  it("does not repeat", () => {
    const ids = new Set(Array.from({ length: 500 }, () => createOrderId(NOW)));
    expect(ids.size).toBe(500);
  });
});

describe("webhook signatures", () => {
  const now = Number(SVIX.timestamp);

  it("verifies the Svix test vector over the raw body", () => {
    expect(verifySvix(SVIX.secret, svixHeaders(), SVIX.body, now)).toBe(true);
    expect(
      verifySvix(SVIX.secret, svixHeaders(), Buffer.from(SVIX.body), now),
    ).toBe(true);
  });

  it("accepts any of several space-separated signatures", () => {
    const headers = svixHeaders(
      SVIX.id,
      SVIX.timestamp,
      `v1,bm9wZQ== ${SVIX.signature}`,
    );
    expect(verifySvix(SVIX.secret, headers, SVIX.body, now)).toBe(true);
  });

  it("rejects a changed body, a wrong secret, a stale timestamp and missing headers", () => {
    expect(verifySvix(SVIX.secret, svixHeaders(), '{"test": 1}', now)).toBe(
      false,
    );
    expect(
      verifySvix(
        "whsec_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        svixHeaders(),
        SVIX.body,
        now,
      ),
    ).toBe(false);
    expect(verifySvix(SVIX.secret, svixHeaders(), SVIX.body, now + 301)).toBe(
      false,
    );
    expect(
      verifySvix(SVIX.secret, { "svix-id": SVIX.id }, SVIX.body, now),
    ).toBe(false);
    expect(verifySvix("", svixHeaders(), SVIX.body, now)).toBe(false);
  });

  it("compares the X-Webhook-Token in constant time", () => {
    expect(verifyToken("whtok_abc", "whtok_abc")).toBe(true);
    expect(verifyToken("whtok_abc", "whtok_abd")).toBe(false);
    expect(verifyToken("whtok_abc", undefined)).toBe(false);
    expect(verifyToken("", "")).toBe(false);
  });
});

describe("rate limiter", () => {
  it("allows 5 requests per IP per minute and refills over time", () => {
    let time = NOW;
    const allow = createLimiter(() => time);
    expect(Array.from({ length: 6 }, () => allow("1.1.1.1"))).toEqual([
      true,
      true,
      true,
      true,
      true,
      false,
    ]);
    expect(allow("2.2.2.2")).toBe(true);
    time += 12_000;
    expect(allow("1.1.1.1")).toBe(true);
  });
});

describe("HTTP handler", () => {
  let server: Server;
  let base: string;
  let store: Store;
  let sumopod: ReturnType<typeof vi.fn>;
  let dir: string;
  const log = { info: vi.fn(), error: vi.fn() };

  async function start(overrides: Partial<HandlerDeps> = {}) {
    const deps: HandlerDeps = {
      apiKey: "test-key",
      webhookSecret: SVIX.secret,
      baseUrl: "https://sumopod.test",
      store,
      fetch: sumopod as unknown as typeof fetch,
      limiter: () => true,
      now: () => NOW,
      log,
      ...overrides,
    };
    server = createServer(createHandler(deps));
    await new Promise<void>((done) => server.listen(0, "127.0.0.1", done));
    base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  }

  const donate = (body: unknown, headers: Record<string, string> = {}) =>
    fetch(`${base}/api/donate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: SITE, ...headers },
      body: typeof body === "string" ? body : JSON.stringify(body),
    });

  const webhook = (event: unknown, id = "msg_1") => {
    const body = JSON.stringify(event);
    return fetch(`${base}/api/donate/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...sign(SVIX.secret, id, NOW / 1000, body),
      },
      body,
    });
  };

  const status = async (order: string) => {
    const response = await fetch(`${base}/api/donate/status?order=${order}`);
    return { code: response.status, body: await response.json() };
  };

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "markas-donate-"));
    store = createStore(join(dir, "donations.jsonl"));
    // Answers like Sumopod: the fee comes off the amount it was asked to charge.
    sumopod = vi.fn(async (_url: string, init: RequestInit) => {
      const { amount } = JSON.parse(String(init.body));
      return Response.json({
        payment_id: "pay_1",
        amount,
        fee: serviceFee(amount),
        net_amount: amount - serviceFee(amount),
        payment_link_url: PAY_URL,
        status: "pending",
      });
    });
    log.info.mockClear();
    log.error.mockClear();
  });

  afterEach(async () => {
    await new Promise((done) => server.close(done));
    rmSync(dir, { recursive: true, force: true });
  });

  async function createdOrder(
    body: unknown = { amount: 25_000, name: "Rian" },
  ) {
    const response = await donate(body);
    expect(response.status).toBe(200);
    const [, init] = sumopod.mock.calls.at(-1)!;
    return JSON.parse(init.body).order_id as string;
  }

  it("creates a QRIS payment and returns the checkout URL", async () => {
    await start();
    const response = await donate({
      amount: 25_000,
      name: "Rian",
      message: "Terima kasih",
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ url: PAY_URL });
    expect(response.headers.get("cache-control")).toBe("no-store");

    const [url, init] = sumopod.mock.calls[0]!;
    expect(url).toBe("https://sumopod.test/api/v1/payments");
    expect(init.headers).toEqual({
      "Content-Type": "application/json",
      "X-Api-Key": "test-key",
    });
    const body = JSON.parse(init.body);
    expect(body).toEqual({
      order_id: expect.stringMatching(ORDER_ID_PATTERN),
      // The donor pays the fee on top: 25.479 - (179 + 300) nets exactly 25.000.
      amount: 25_479,
      currency: "IDR",
      payment_method_type_code: "QRIS",
      expires_in_hours: 1,
      success_return_url: `${SITE}/support/thanks?order=${body.order_id}`,
      cancel_return_url: `${SITE}/support/cancel?order=${body.order_id}`,
    });
    expect((await status(body.order_id)).body).toEqual({ status: "pending" });
    const log = readFileSync(join(dir, "donations.jsonl"), "utf8");
    expect(log).toContain('"name":"Rian"');
    expect(log).toContain('"amount":25000,"charged":25479');
    expect(store.order(body.order_id)).toEqual({
      amount: 25_000,
      charged: 25_479,
      status: "pending",
    });
    expect(log).not.toContain("test-key");
  });

  it("accepts the checkout.pymnt.app links that Live payments return", async () => {
    const live =
      "https://checkout.pymnt.app/payment-links/02fe61ab-0000-4000-8000-000000000000";
    sumopod.mockResolvedValueOnce(
      Response.json(
        { payment_id: "pay_2", payment_link_url: live },
        { status: 201 },
      ),
    );
    await start();
    const response = await donate({ amount: 10_000 });
    expect(await response.json()).toEqual({ url: live });
  });

  it("uses the /id return URLs for Indonesian visitors", async () => {
    await start();
    await donate({ amount: 10_000, locale: "id" });
    const body = JSON.parse(sumopod.mock.calls[0]![1].body);
    expect(body.success_return_url).toBe(
      `${SITE}/id/support/thanks?order=${body.order_id}`,
    );
    expect(body.cancel_return_url).toBe(
      `${SITE}/id/support/cancel?order=${body.order_id}`,
    );
  });

  it("rejects other origins, other content types, bad JSON, bad amounts and big bodies", async () => {
    await start();
    expect(
      (await donate({ amount: 25_000 }, { Origin: "https://evil.test" }))
        .status,
    ).toBe(403);
    expect(
      (await donate({ amount: 25_000 }, { "Content-Type": "text/plain" }))
        .status,
    ).toBe(415);
    expect((await donate("{nope")).status).toBe(400);
    const bad = await donate({ amount: 2_000 });
    expect(bad.status).toBe(400);
    expect(await bad.json()).toEqual({ error: "invalid_amount" });
    expect(
      (await donate({ amount: 25_000, message: "x".repeat(3000) })).status,
    ).toBe(413);
    expect(sumopod).not.toHaveBeenCalled();
  });

  it("answers 429 when the limiter says no", async () => {
    await start({ limiter: () => false });
    expect((await donate({ amount: 25_000 })).status).toBe(429);
    expect(sumopod).not.toHaveBeenCalled();
  });

  it("hides Sumopod failures behind a generic 502 and logs them without the key", async () => {
    sumopod.mockResolvedValueOnce(
      Response.json({ message: "Unauthorized" }, { status: 401 }),
    );
    sumopod.mockResolvedValueOnce(
      Response.json({ payment_link_url: "https://evil.test/pay" }),
    );
    sumopod.mockRejectedValueOnce(
      new DOMException("timed out", "TimeoutError"),
    );
    await start();
    for (let i = 0; i < 3; i++) {
      const response = await donate({ amount: 25_000 });
      expect(response.status).toBe(502);
      expect(await response.json()).toEqual({ error: "payment_unavailable" });
    }
    expect(log.error).toHaveBeenCalledTimes(3);
    expect(JSON.stringify(log.error.mock.calls)).not.toContain("test-key");
  });

  it("marks an order completed from a signed webhook, once", async () => {
    await start();
    const order = await createdOrder();
    const event = {
      event_type: "payment.completed",
      data: {
        payment_id: "pay_1",
        order_id: order,
        // Webhooks carry what Sumopod charged, fee included.
        amount: 25_479,
        status: "completed",
      },
    };
    const first = await webhook(event, "msg_a");
    expect(first.status).toBe(200);
    expect(await first.json()).toEqual({ ok: true });
    const again = await webhook(event, "msg_a");
    expect(await again.json()).toEqual({ ok: true, duplicate: true });
    expect((await status(order)).body).toEqual({ status: "completed" });

    // A later expiry does not undo a completed payment.
    await webhook({ ...event, event_type: "payment.expired" }, "msg_b");
    expect((await status(order)).body).toEqual({ status: "completed" });

    const lines = readFileSync(join(dir, "donations.jsonl"), "utf8")
      .trim()
      .split("\n");
    expect(lines.filter((line) => line.includes('"msg_a"'))).toHaveLength(1);
    // State survives a restart: the JSONL is read back.
    expect(createStore(join(dir, "donations.jsonl")).status(order)).toBe(
      "completed",
    );
    expect(createStore(join(dir, "donations.jsonl")).hasEvent("msg_a")).toBe(
      true,
    );
  });

  it("does not complete an order when the webhook amount differs", async () => {
    await start();
    const order = await createdOrder();
    await webhook(
      {
        event_type: "payment.completed",
        data: { order_id: order, amount: 1_000 },
      },
      "msg_c",
    );
    // The chosen amount without the fee is not what was charged either.
    await webhook(
      {
        event_type: "payment.completed",
        data: { order_id: order, amount: 25_000 },
      },
      "msg_d",
    );
    expect((await status(order)).body).toEqual({ status: "pending" });
    expect(log.error).toHaveBeenCalledWith(
      expect.stringContaining("amount mismatch"),
    );
  });

  it("warns when Sumopod's net is below the chosen amount", async () => {
    sumopod.mockResolvedValueOnce(
      Response.json({
        payment_id: "pay_3",
        amount: 5_338,
        fee: 400,
        net_amount: 4_938,
        payment_link_url: PAY_URL,
      }),
    );
    await start();
    expect((await donate({ amount: 5_000 })).status).toBe(200);
    expect(log.error).toHaveBeenCalledWith(
      expect.stringMatching(/nets 4938 for 5000 chosen \(charged 5338/),
    );
  });

  it("does not warn when the net covers the chosen amount", async () => {
    await start();
    await createdOrder({ amount: 5_000 });
    expect(log.error).not.toHaveBeenCalled();
  });

  it("logs payment.test events", async () => {
    await start();
    expect(
      (await webhook({ event_type: "payment.test", data: {} }, "msg_test"))
        .status,
    ).toBe(200);
    expect(store.hasEvent("msg_test")).toBe(true);
  });

  it("rejects bad signatures with 401 and answers 503 until a secret is installed", async () => {
    await start();
    const response = await fetch(`${base}/api/donate/webhook`, {
      method: "POST",
      headers: svixHeaders("msg_x", String(NOW / 1000)),
      body: "{}",
    });
    expect(response.status).toBe(401);
    await new Promise((done) => server.close(done));

    await start({ webhookSecret: "", webhookToken: "" });
    const unconfigured = await fetch(`${base}/api/donate/webhook`, {
      method: "POST",
      body: "{}",
    });
    expect(unconfigured.status).toBe(503);
  });

  it("accepts the X-Webhook-Token instead of a signature", async () => {
    await start({ webhookSecret: "", webhookToken: "whtok_test" });
    const ok = await fetch(`${base}/api/donate/webhook`, {
      method: "POST",
      headers: { "X-Webhook-Token": "whtok_test" },
      body: JSON.stringify({ event_type: "payment.test", data: {} }),
    });
    expect(ok.status).toBe(200);
    const bad = await fetch(`${base}/api/donate/webhook`, {
      method: "POST",
      headers: { "X-Webhook-Token": "whtok_nope" },
      body: "{}",
    });
    expect(bad.status).toBe(401);
  });

  it("validates status lookups and answers health checks", async () => {
    await start();
    expect((await status("nope")).code).toBe(400);
    expect((await status("KOPI-20261119-AAAAAAAAAAAAAAAA")).code).toBe(404);
    const health = await fetch(`${base}/api/donate/health`);
    expect(await health.json()).toEqual({ ok: true, webhook: true });
    expect((await fetch(`${base}/api/donate`)).status).toBe(405);
    expect((await fetch(`${base}/api/other`)).status).toBe(404);
  });
  it("lists paid supporters only, without amounts, cached for 60 s", async () => {
    let clock = NOW;
    await start({ now: () => clock });
    const paid = await createdOrder({
      amount: 25_000,
      name: "Rian",
      message: "Semangat <b>terus</b>",
    });
    await createdOrder({ amount: 50_000, name: "Belum bayar" });
    const failed = await createdOrder({ amount: 10_000, name: "Gagal" });
    const anonymous = await createdOrder({ amount: 10_000 });
    const complete = (order: string, amount: number, id: string) =>
      webhook(
        {
          event_type: "payment.completed",
          data: {
            order_id: order,
            amount: grossUp(amount),
            status: "completed",
          },
        },
        id,
      );
    await complete(paid, 25_000, "msg_paid");
    await complete(anonymous, 10_000, "msg_anon");
    await webhook(
      {
        event_type: "payment.failed",
        data: { order_id: failed, amount: grossUp(10_000) },
      },
      "msg_failed",
    );

    const response = await fetch(`${base}/api/donate/supporters`);
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("public, max-age=60");
    const body = await response.json();
    expect(body.supporters).toHaveLength(2);
    expect(body.supporters).toContainEqual({
      name: "Rian",
      // Returned as plain text inside JSON; /support renders it with textContent.
      message: "Semangat <b>terus</b>",
      date: "2026-11-19",
    });
    expect(body.supporters).toContainEqual({
      name: null,
      message: null,
      date: "2026-11-19",
    });
    expect(JSON.stringify(body)).not.toMatch(/amount|order|KOPI|25000/);

    // A payment that lands within the minute shows up on the next refresh, not before.
    const late = await createdOrder({ amount: 10_000, name: "Nanti" });
    await complete(late, 10_000, "msg_late");
    const cached = await (await fetch(`${base}/api/donate/supporters`)).json();
    expect(cached.supporters).toHaveLength(2);
    clock += 60_000;
    const fresh = await (await fetch(`${base}/api/donate/supporters`)).json();
    expect(fresh.supporters).toHaveLength(3);
  });

  it("rate limits the supporters list per IP and only allows GET", async () => {
    await start({ supportersLimiter: () => false });
    const limited = await fetch(`${base}/api/donate/supporters`);
    expect(limited.status).toBe(429);
    expect(await limited.json()).toEqual({ error: "rate_limited" });
    const post = await fetch(`${base}/api/donate/supporters`, {
      method: "POST",
    });
    expect(post.status).toBe(405);
  });
});

describe("public supporters", () => {
  const order = (overrides: Partial<StoredOrder> = {}): StoredOrder => ({
    amount: 10_000,
    status: "completed",
    name: "Rian",
    message: "",
    paidAt: "2026-11-19T05:00:00.000Z",
    ...overrides,
  });

  it("keeps completed payments only, newest first, at most 12", () => {
    const orders = [
      order({ name: "Pending", status: "pending", paidAt: null }),
      order({ name: "Failed", status: "failed", paidAt: null }),
      order({ name: "Expired", status: "expired", paidAt: null }),
      ...Array.from({ length: 14 }, (_, day) =>
        order({
          name: `Day ${day + 1}`,
          paidAt: `2026-11-${String(day + 1).padStart(2, "0")}T01:00:00.000Z`,
        }),
      ),
    ];
    const list = publicSupporters(orders);
    expect(list).toHaveLength(SUPPORTERS_LIMIT);
    expect(list[0]).toEqual({
      name: "Day 14",
      message: null,
      date: "2026-11-14",
    });
    expect(list.at(-1)!.name).toBe("Day 3");
    expect(list.map((entry) => entry.name)).not.toContain("Pending");
    expect(list.map((entry) => entry.name)).not.toContain("Failed");
  });

  it("truncates long text and strips control characters from older log lines", () => {
    const [entry] = publicSupporters([
      order({
        name: `\u202e${"N".repeat(60)}`,
        message: `${"m".repeat(200)}\u0007`,
      }),
    ]);
    expect(entry!.name).toBe("N".repeat(40));
    expect(entry!.message).toBe("m".repeat(140));
  });

  it("shows empty or whitespace-only names as anonymous (null)", () => {
    const [entry] = publicSupporters([order({ name: "   ", message: " Hi " })]);
    expect(entry).toEqual({ name: null, message: "Hi", date: "2026-11-19" });
  });

  it("rebuilds supporters from the JSONL log after a restart", () => {
    const dir = mkdtempSync(join(tmpdir(), "markas-donate-"));
    const file = join(dir, "donations.jsonl");
    const first = createStore(file);
    first.record({
      kind: "order",
      order_id: "KOPI-20261119-AAAAAAAAAAAAAAAA",
      amount: 25_000,
      name: "Rian",
      message: "Mantap",
      at: "2026-11-19T04:00:00.000Z",
    });
    first.record({
      kind: "event",
      event_id: "msg_1",
      event_type: "payment.completed",
      order_id: "KOPI-20261119-AAAAAAAAAAAAAAAA",
      amount: 25_000,
      at: "2026-11-19T04:01:00.000Z",
    });
    expect(createStore(file).supporters(SUPPORTERS_LIMIT)).toEqual([
      { name: "Rian", message: "Mantap", date: "2026-11-19" },
    ]);
    rmSync(dir, { recursive: true, force: true });
  });
});
