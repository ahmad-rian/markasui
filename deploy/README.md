# Deploying the docs site

The site at https://markas.jenderalcorp.com is the static Astro build (`apps/docs/dist`) served by nginx on the `tencent` server (Ubuntu 26.04, web root `/var/www/markasui`). The same server runs Jenderal Panel (`panel6.jenderalcorp.com`); nothing here touches its files.

## Commands

```sh
pnpm deploy:site            # build, rsync dist, install the CSP snippet, reload nginx
pnpm deploy:site --nginx    # same, and install deploy/nginx/markas.jenderalcorp.com.conf as the live site config
pnpm deploy:site --donate   # same, and install or update the donation service (deploy/donate) first
DIST_DIR=/path/to/dist pnpm deploy:site   # deploy an existing build (e.g. one built in a temp folder)
DOCS_URL=https://markas.jenderalcorp.com pnpm exec playwright test -c playwright.docs.config.ts tests/docs/security.spec.ts
                            # after a deploy: check the live headers and crawl the site for CSP violations
```

`SSH host`, path and site URL can be overridden with `DEPLOY_HOST`, `DEPLOY_PATH` and `SITE_URL`.

## Files

- `nginx/markas.jenderalcorp.com.conf`: the live site config (`/etc/nginx/sites-available/markas.jenderalcorp.com`). Security headers, rate limit, method limits and hidden-file blocking. The TLS lines are certbot's; if certbot ever rewrites the live file, copy its changes back here.
- `nginx/install.sh`: runs on the server as root during a deploy. Installs `dist/.csp-nginx.conf` as `/etc/nginx/snippets/markas-csp.conf` (and the site config with `--nginx`), backs the old files up to `/var/backups/markas-nginx/` (last 10 kept), and restores them if `nginx -t` fails, so a bad file never reaches a reload.

## Donations ("Buy me a coffee")

`/support` (and `/id/support`) posts to `/api/donate`, served by `donate/server.mjs`: a zero-dependency Node service on `127.0.0.1:8787` that creates a Sumopod QRIS payment (1 hour expiry) and returns its Sumopod checkout URL (`https://pay.sumopod.com/...` or, for Live payments, `https://checkout.pymnt.app/...`). Sumopod sends `payment.*` webhooks to `/api/donate/webhook` (Svix signature, or `X-Webhook-Token`), and `/support/thanks` polls `/api/donate/status?order=...`. Orders and events go to `/var/lib/private/markas-donate/donations.jsonl` (amount, optional display name and message, no IP, no keys).

- `donate/markas-donate.service`: systemd unit (DynamicUser, read-only system, no home, private /tmp, AF_INET/AF_INET6/AF_UNIX only, 128 MB). `SUMOPOD_BASE_URL` selects Live (default, `https://api-pay.sumopod.com`) or Sandbox (`https://api-pay-sandbox.sumopod.com`); override it with `systemctl edit markas-donate`.
- `donate/install.sh`: run by `pnpm deploy:site --donate`. Copies `server.mjs` to `/opt/markas-donate/` and the unit to `/etc/systemd/system/`, then enables, restarts and health-checks the service.
- Secrets, `root:root`, folder `0700`, files `0600`, loaded with `LoadCredential=` (never in the repo, the environment or the logs):
  - `/etc/markas-donate/api-key`: Sumopod project API key. Required.
  - `/etc/markas-donate/webhook-secret` (`whsec_...`) and/or `/etc/markas-donate/webhook-token` (`whtok_...`). Until one exists, webhooks get 503. Read on start, so restart after changing them.
- nginx: POST is allowed only on `/api/donate` and `/api/donate/webhook`; `/api/donate` has its own 5 per minute zone and a 4 KB body limit; every `/api/` response is `Cache-Control: no-store`; other `/api/*` paths are 404.

### Fee

The donor pays Sumopod's QRIS fee on top, so the owner nets exactly the chosen amount. The fee, derived from live create responses on 2026-11-20, is `ceil(0.7% x charged) + Rp 300` on the charged amount (vectors: 3.000 -> 321, 3.071 -> 322, 3.500 -> 325, 4.500 -> 332, 5.000 -> 335, 5.338 -> 338, 10.000 -> 370, 12.345 -> 387; `net_amount = amount - fee`). The service charges the smallest amount whose net reaches the chosen one (`grossUp` in `server.mjs`, Rp 5.000 -> Rp 5.338), stores both `amount` (chosen) and `charged` in the log, matches webhooks against `charged`, and logs a warning when a create response nets less than the chosen amount. `/support` and the coffee popover show the same breakdown from `apps/docs/src/lib/support.ts` (a unit test keeps the two copies in sync).

**Keep Sumopod Settings > Fee Settings on "merchant pays" (Charge fee to customer: off).** With the toggle on, Sumopod would add its fee on top of an amount that already includes it, and the donor would pay the fee twice. If Sumopod changes its fee, update `FEE_PER_MILLE`/`FEE_FIXED` in `server.mjs` and `SUPPORT_FEE_*` in `lib/support.ts` together.

First install on a new server:

```sh
ssh tencent 'sudo apt-get install -y nodejs && sudo install -d -m 0700 /etc/markas-donate'
ssh tencent 'sudo tee /etc/markas-donate/api-key >/dev/null && sudo chmod 600 /etc/markas-donate/api-key'   # paste the key, Enter, Ctrl-D
pnpm deploy:site --nginx --donate
```

Webhook secret (Sumopod Settings, Webhook URL `https://markas.jenderalcorp.com/api/donate/webhook`, then reveal the Signing Secret):

```sh
ssh tencent 'sudo tee /etc/markas-donate/webhook-secret >/dev/null && sudo chmod 600 /etc/markas-donate/webhook-secret && sudo systemctl restart markas-donate'
```

Paste the secret, press Enter, then Ctrl-D. Click "Save & Test" in Sumopod and check the log: `ssh tencent 'journalctl -u markas-donate -n 20 --no-pager'` shows `donate: webhook payment.test`.

Operations: `systemctl status markas-donate`, `curl -s https://markas.jenderalcorp.com/api/donate/health`, `sudo tail /var/lib/private/markas-donate/donations.jsonl`.

## Content-Security-Policy

`apps/docs/scripts/csp.ts` runs at the end of `pnpm build`. It hashes every inline script and inline event handler in `dist` and writes the policy to `dist/.csp-nginx.conf` (nginx `map`s, split into parts because nginx limits one parameter to 4 KB). The site uses `<ClientRouter />`, so one site-wide policy is needed: the first page's policy must allow the inline scripts of every page navigated to afterwards.

- The policy and its remaining relaxations (`'unsafe-eval'` for Alpine on Blade previews, `'wasm-unsafe-eval'` for Pagefind, one `'unsafe-hashes'` handler from Svelte, inline styles) are documented in `apps/docs/scripts/csp-policy.ts`.
- `tests/docs/security.spec.ts` enforces the generated policy in the browser while crawling landing, docs, component previews in all six frameworks, template demos, search, theme toggle, copy page and client-side navigation. A new inline script is hashed automatically; a new third-party origin, `eval`, or `data:` script fails the test.
- `apps/docs/astro.config.mjs` (`cspSafeRouter`) points ClientRouter's empty `data:` module script at `/empty-module.js`, so `data:` is not needed in `script-src`.
- During a deploy, new HTML is live a second or two before nginx reloads with the new hashes. A tab opened before a deploy keeps the old policy for client-side navigations until it reloads.
- To roll out a policy change carefully, deploy once with `Content-Security-Policy-Report-Only` in the site config, run the `DOCS_URL` check above (report-only violations fail it too), then switch back to `Content-Security-Policy`.
- The Cloudflare Pages workflow (`.github/workflows/deploy.yml`, inactive until its secrets are set) only uses `public/_headers`, which has no security headers. Add them there before switching hosting.

## Server hardening in place (2026-11-18)

- ufw: deny incoming except 22, 80, 443/tcp. The panel listens on 8443 but is only reached through nginx.
- SSH: keys only, no root login (`/etc/ssh/sshd_config.d/00-hardening.conf`); fail2ban `sshd` jail.
- fail2ban `nginx-limit-req` jail (`/etc/fail2ban/jail.d/markas-nginx.local`): one-hour ban on 80/443 for clients that keep hitting the rate limit.
- Unattended security updates: `/etc/apt/apt.conf.d/52unattended-upgrades-security` adds the `-security` pockets, which the cloud image had commented out. needrestart restarts services automatically.
- TLS from certbot's `options-ssl-nginx.conf` (TLS 1.2/1.3, no CBC, session tickets off). No OCSP stapling: Let's Encrypt certificates no longer carry an OCSP URL.
- Backups of the configs before these changes: `/root/hardening-backup/20261118-183820`.
