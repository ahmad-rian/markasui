# "Buy me a coffee" donations with Sumopod: plan

Status: research and design only. Nothing is implemented, no keys exist yet. Researched 2026-11-18.

## Ringkasan (Bahasa Indonesia)

- Sumopod punya **Managed Payment**: buat pembayaran lewat `POST /api/v1/payments` dengan header `X-Api-Key`, lalu arahkan donatur ke `payment_link_url` (halaman bayar Sumopod). Metode yang didukung baru **QRIS**, biaya 0,7% + Rp 300, dana cair ke saldo sekitar 2 hari. Ada mode Sandbox dan Live; kunci dan secret webhook berbeda per mode, dan Live perlu verifikasi bisnis.
- Webhook (`payment.completed`, `payment.failed`, `payment.expired`) diverifikasi dengan header Svix (`svix-id`, `svix-timestamp`, `svix-signature`, secret `whsec_...`) atau token sederhana `X-Webhook-Token` (`whtok_...`). Pakai tanda tangan Svix.
- Situs ini statis, jadi API key **tidak boleh** ada di browser. Rekomendasi: layanan kecil Node.js (tanpa paket npm) di server yang sama, di belakang nginx pada `/api/donate` dan `/api/donate/webhook`, dijalankan systemd dengan user terisolasi, secret dibaca dari file root-only lewat `LoadCredential`.
- Alur redirect tidak butuh perubahan CSP (cukup `fetch` ke `/api/donate` lalu `location.assign`). Yang perlu diubah: filter method di nginx (sekarang hanya GET/HEAD/OPTIONS) dan dua `location` baru. Baris persisnya ada di bawah.
- Dokumentasi resmi tidak menyebut URL API Live, endpoint cek status, batas nominal, maupun format payload lengkap. Detail itu hanya ada di repo komunitas (tidak resmi). Konfirmasi dulu ke Sumopod (daftar pertanyaan di bawah) sebelum menulis kode.
- Alternatif paling sederhana tanpa kode server: tautan ke Saweria, Trakteer, atau GitHub Sponsors.

## What Sumopod documents

Official docs (docs.sumopod.com, "Managed Payment", last modified 2026-11-04):

| Topic            | What the docs say                                                                                                                                                                                           | Source                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Product          | Managed Payment, built into the Sumopod dashboard. Every account has a default Project with its own API key.                                                                                                | [Using Managed Payment](https://docs.sumopod.com/guides/managed-payment/create-managed-payment)            |
| Auth             | `X-Api-Key: <project API key>` header. One server-side key; there is no separate client key.                                                                                                                | same                                                                                                       |
| Create payment   | `POST https://api-pay-sandbox.sumopod.com/api/v1/payments`, JSON body `order_id`, `amount`, `currency` (`IDR`), `payment_method_type_code` (`QRIS`).                                                        | same                                                                                                       |
| Checkout         | Redirect the customer to `payment_link_url` from the response, or show `payment_code` yourself. No embeddable script or popup is documented.                                                                | same                                                                                                       |
| Redirects        | Default Success and Cancel Return URLs in Settings, overridable per payment with `success_return_url` / `cancel_return_url`.                                                                                | [Configuring Payment Settings](https://docs.sumopod.com/guides/managed-payment/configure-payment-settings) |
| Methods and fees | QRIS only, 0.7% + Rp 300, settles to Available Balance after about 2 days. "Charge fee to customer" toggle adds the fee on top.                                                                             | create and settings pages                                                                                  |
| Webhooks         | HTTP POST for `payment.completed`, `payment.failed`, `payment.expired`. Must answer 2xx within 10 s, otherwise marked failed and resendable from the Webhooks tab.                                          | [Managed Payment Integration](https://docs.sumopod.com/guides/managed-payment/integrate-managed-payment)   |
| Webhook auth     | Either `svix-id` + `svix-timestamp` + `svix-signature` checked with the Signing Secret (`whsec_...`), or `X-Webhook-Token` compared with the Webhook Token (`whtok_...`). Both can be revealed and rotated. | same                                                                                                       |
| Payload          | A `payment.completed` sample includes `payment_id`, `order_id`, `amount`, `fee`, `net_amount`, `status`, `paid_at`, `settled_at`.                                                                           | same                                                                                                       |
| Sandbox / Live   | Start in Sandbox (fake data). "Register for Live Access" needs business verification. API key, webhook URL and redirect URLs are set separately per mode; do not reuse Sandbox keys.                        | [Switching to Live Mode](https://docs.sumopod.com/guides/managed-payment/go-live)                          |

Not in the official docs: the Live API base URL, a "get payment status" endpoint, amount limits, payment expiry, the full webhook JSON shape, webhook retry policy and source IPs.

An **unofficial** community write-up ([nasrulmufid/payment-gateway-sumopod](https://github.com/nasrulmufid/payment-gateway-sumopod), apparently copied from the dashboard's own docs tab) adds: Live base URL `https://api-pay.sumopod.com/api/v1/payments`; optional `expires_in_hours` (default and maximum 24); response fields `payment_id`, `fee`, `net_amount`, `status: "pending"`, `expires_at`, and `payment_link_url` on `https://pay.sumopod.com/...`; webhook body `{ "event_type": "...", "data": { ... } }` with a `payment.test` event; and the standard Svix v1 scheme (HMAC-SHA256 over `${svix-id}.${svix-timestamp}.${rawBody}` with the base64-decoded secret after `whsec_`, header holding space-separated `v1,<base64>` values). Treat all of this as unconfirmed until Sumopod confirms it or it shows up in your dashboard.

## Recommended architecture

The site is static and the API key must never reach the browser, so a small server-side piece is needed.

**Recommended: a tiny Node.js service on the same server, behind nginx.**

- `node` from the Ubuntu archive (`apt install nodejs`), so unattended-upgrades patches it. No npm dependencies: `node:http`, `node:crypto` and `node:sqlite` (built in) are enough. Neither Node nor PHP is on the server today; installing `nodejs` is the one new package this needs.
- Listens on `127.0.0.1:8787` only (ufw already blocks everything but 22/80/443).
- Two routes: `POST /api/donate` (create a payment) and `POST /api/donate/webhook` (Sumopod events).
- State in one SQLite file in the service's `StateDirectory`: `donations(order_id PK, amount, status, payment_id, created_at, updated_at)` and `webhook_events(svix_id PK, received_at)`.
- systemd unit with an isolated user and secrets passed as credentials, not environment variables:

```ini
# /etc/systemd/system/markas-donate.service
[Unit]
Description=MarkasUI donations (Sumopod)
After=network-online.target

[Service]
ExecStart=/usr/bin/node /opt/markas-donate/server.js
DynamicUser=yes
StateDirectory=markas-donate
LoadCredential=sumopod-api-key:/etc/markas-donate/api-key
LoadCredential=sumopod-webhook-secret:/etc/markas-donate/webhook-secret
Environment=SUMOPOD_BASE_URL=https://api-pay-sandbox.sumopod.com/api/v1
Environment=PORT=8787
NoNewPrivileges=yes
ProtectSystem=strict
ProtectHome=yes
PrivateTmp=yes
PrivateDevices=yes
ProtectKernelTunables=yes
ProtectKernelModules=yes
ProtectControlGroups=yes
RestrictAddressFamilies=AF_INET AF_INET6 AF_UNIX
RestrictNamespaces=yes
LockPersonality=yes
MemoryMax=128M
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

The secret files live in `/etc/markas-donate/` (`root:root`, mode `0700` for the folder and `0600` for the files) and are read in code from `$CREDENTIALS_DIRECTORY`. They are never in the repo, the build, the client bundle, the CI secrets or the logs.

**Alternative: Cloudflare Worker.** DNS for jenderalcorp.com is already on Cloudflare, but `markas.jenderalcorp.com` is DNS-only, so a Worker on the same host would mean proxying the whole site through Cloudflare. A Worker on another host (e.g. `donate.jenderalcorp.com`) works without touching the server, but adds CORS and a `connect-src` entry. Only worth it if you'd rather not run Node on the server.

**Simplest: no code at all.** A link to Saweria, Trakteer or GitHub Sponsors needs no keys, no webhook and no server changes. Consider this first if all you want is a "Buy me a coffee" button.

## Flow

1. `/donate` (static page) shows preset amounts, for example Rp 10.000, 25.000, 50.000 and 100.000, plus an optional custom amount. No name or email fields: nothing personal is collected.
2. The page sends `fetch("/api/donate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ amount }) })`.
3. The service:
   - accepts only `POST` with `Content-Type: application/json` and `Origin: https://markas.jenderalcorp.com` (403 otherwise). A JSON content type forces a CORS preflight from other origins, and nginx answers that preflight without CORS headers, so other sites cannot call the endpoint from a browser. This is the CSRF protection; there are no cookies or sessions to steal.
   - validates `amount`: an integer, either one of the presets or within a custom range (for example 10.000 to 1.000.000 IDR; confirm Sumopod's own limits). Rejects anything else with 400.
   - creates `order_id = "don-" + crypto.randomUUID()`, stores it as `pending`, then calls Sumopod `POST /payments` with `X-Api-Key`, the amount, `currency: "IDR"`, `payment_method_type_code: "QRIS"`, `success_return_url: https://markas.jenderalcorp.com/donate/thanks` and `cancel_return_url: https://markas.jenderalcorp.com/donate`. Timeout of 10 s on the outbound call.
   - checks that `payment_link_url` is `https:` on the expected Sumopod host before returning `{ "url": ... }`. Sumopod errors map to a generic 502 for the browser; the detail goes to the log without the request headers.
4. The page calls `location.assign(url)`. The donor pays with QRIS on Sumopod's page and comes back to `/donate/thanks`. That page only says thank you; it never trusts query parameters as proof of payment.
5. Sumopod calls `POST /api/donate/webhook`. The service:
   - reads the **raw** body (at most 64 KB) before any JSON parsing.
   - verifies the Svix signature: rejects a `svix-timestamp` more than 5 minutes from now, computes HMAC-SHA256 over `${svix-id}.${svix-timestamp}.${rawBody}` with the base64-decoded secret, and compares it with every `v1,` value in `svix-signature` using `crypto.timingSafeEqual`. Invalid: 401, logged with the svix-id only. Prefer the signature over `X-Webhook-Token`: the token is a static bearer value, while the signature binds the body and the time.
   - is idempotent: inserts `svix-id` into `webhook_events` first; a duplicate returns 200 without doing anything again. Status changes are also keyed on `order_id`, and only move forward (`pending` to `completed`, `failed` or `expired`).
   - checks that `order_id` exists and that `amount` equals the stored amount before marking it `completed`. If Sumopod confirms a status endpoint, re-fetch the payment there as well.
   - answers 200 quickly (well inside the 10 s limit). Slow work, such as a thank-you counter, happens after the response.
6. Optional: a public `GET /api/donate/stats` with only aggregate numbers (count and total), cached.

## Logging and privacy

- Log `order_id`, `payment_id`, amount, status changes, the event type and the svix-id. Never log the API key, the webhook secret, full request headers or raw webhook bodies.
- Keep client IPs in the nginx logs only (normal rotation). The service stores no IPs and no personal data.
- Keep at most what you need for bookkeeping (Sumopod's dashboard already holds the payment history).

## Rate limiting and abuse

- nginx: a dedicated zone for creating payments, 5 per minute per IP with a small burst, on top of the site-wide limit. Webhooks are not rate-limited per IP (Sumopod may send bursts) but are bounded in body size.
- The service: reject concurrent creates beyond a small global cap (for example 30 per minute in total), so a distributed flood cannot create thousands of pending payments.
- The existing fail2ban `nginx-limit-req` jail also bans clients that keep hitting the 429s.

## Exact changes for later

### nginx (`deploy/nginx/markas.jenderalcorp.com.conf`)

Add next to the other maps and zones:

```nginx
limit_req_zone $binary_remote_addr zone=markas_donate:1m rate=5r/m;

# POST is allowed only on the two donation endpoints.
map $uri $markas_post_allowed {
    ~^/api/donate(/webhook)?$  1;
    default                    0;
}
map "$request_method:$markas_post_allowed" $markas_method_blocked {
    ~^(GET|HEAD|OPTIONS):  0;
    "POST:1"               0;
    default                1;
}
```

Add `~^/api/ "no-store";` to the `$markas_cache_control` map.

Replace the current method check:

```nginx
    if ($request_method !~ ^(GET|HEAD|OPTIONS)$) {
        return 405;
    }
```

with:

```nginx
    if ($markas_method_blocked) {
        return 405;
    }
```

Add these locations (no `add_header` inside them, so the server-level headers still apply):

```nginx
    location = /api/donate {
        limit_req zone=markas_req burst=300 nodelay;
        limit_req zone=markas_donate burst=3 nodelay;
        client_max_body_size 1k;
        proxy_pass http://127.0.0.1:8787;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Origin $http_origin;
    }
    location = /api/donate/webhook {
        client_max_body_size 64k;
        proxy_pass http://127.0.0.1:8787;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
```

### Content-Security-Policy

- The redirect flow above needs **no CSP change**: `fetch("/api/donate")` is covered by `connect-src 'self'`, and top-level navigation to Sumopod is not restricted by CSP.
- If you use a plain HTML form that POSTs to `/api/donate` and gets a 303 redirect to Sumopod instead of `fetch`, add the checkout host to `form-action` in `apps/docs/scripts/csp-policy.ts` (browsers apply `form-action` to redirects after a form submit): `"form-action": ["'self'", "https://pay.sumopod.com"]` (confirm the host first).
- If you show the QRIS code on our own page from `payment_code`, render it as an SVG on the server and send it as a `data:` image (`img-src` already allows `data:`). A client-side QR library would be a new npm package.
- If Sumopod ever offers an embedded popup or script checkout, it would need `script-src` and `frame-src` entries for its domain, and `Cross-Origin-Opener-Policy: same-origin` would cut the link to a popup window. None of this applies to the documented redirect flow.
- `Permissions-Policy: payment=()` stays; QRIS does not use the Payment Request API.

## What the owner must provide

1. A Sumopod account with Managed Payment, tested in Sandbox, then **Live access** approved (business verification).
2. The **Live API key** and the **Live webhook Signing Secret** (`whsec_...`), copied straight into `/etc/markas-donate/api-key` and `/etc/markas-donate/webhook-secret` on the server (never in chat, the repo or CI).
3. In Sumopod Settings (Live): webhook URL `https://markas.jenderalcorp.com/api/donate/webhook`, Success Return URL `https://markas.jenderalcorp.com/donate/thanks`, Cancel Return URL `https://markas.jenderalcorp.com/donate`, and the "Charge fee to customer" choice.
4. The preset amounts and the custom minimum and maximum.
5. Approval to install `nodejs` from the Ubuntu archive on the server (or a choice for the Cloudflare Worker or the no-code link instead).

## Questions to confirm with Sumopod (support@sumopod.com)

1. The Live API base URL (the unofficial source says `https://api-pay.sumopod.com/api/v1`).
2. Is there an endpoint to fetch one payment's status (by `payment_id` or `order_id`), for reconciling and double-checking webhooks?
3. Minimum and maximum amount for QRIS, and whether amounts must be integers.
4. Is `expires_in_hours` supported, and what are its default and maximum?
5. Rules for `order_id`: allowed characters, length, and whether reuse is rejected.
6. Is the signature exactly Svix's v1 scheme, and what is the timestamp tolerance? Do they recommend the Svix libraries?
7. Webhook retry schedule, and whether there is a fixed list of source IPs.
8. The exact host of `payment_link_url` (the unofficial source says `pay.sumopod.com`), so the service can allow-list it.
9. The full webhook body for each event, and whether `payment_method_type_code` is `QRIS` or `qris`.
10. Can an individual (not a company) get Live access, and what documents does verification need?
11. How Sandbox payments are completed for testing (simulator or test QR).
12. Refund policy and any tax or reporting obligations for donations.
