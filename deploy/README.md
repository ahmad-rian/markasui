# Deploying the docs site

The site at https://markas.jenderalcorp.com is the static Astro build (`apps/docs/dist`) served by nginx on the `tencent` server (Ubuntu 26.04, web root `/var/www/markasui`). The same server runs Jenderal Panel (`panel6.jenderalcorp.com`); nothing here touches its files.

## Commands

```sh
pnpm deploy:site            # build, rsync dist, install the CSP snippet, reload nginx
pnpm deploy:site --nginx    # same, and install deploy/nginx/markas.jenderalcorp.com.conf as the live site config
DIST_DIR=/path/to/dist pnpm deploy:site   # deploy an existing build (e.g. one built in a temp folder)
DOCS_URL=https://markas.jenderalcorp.com pnpm exec playwright test -c playwright.docs.config.ts tests/docs/security.spec.ts
                            # after a deploy: check the live headers and crawl the site for CSP violations
```

`SSH host`, path and site URL can be overridden with `DEPLOY_HOST`, `DEPLOY_PATH` and `SITE_URL`.

## Files

- `nginx/markas.jenderalcorp.com.conf`: the live site config (`/etc/nginx/sites-available/markas.jenderalcorp.com`). Security headers, rate limit, method limits and hidden-file blocking. The TLS lines are certbot's; if certbot ever rewrites the live file, copy its changes back here.
- `nginx/install.sh`: runs on the server as root during a deploy. Installs `dist/.csp-nginx.conf` as `/etc/nginx/snippets/markas-csp.conf` (and the site config with `--nginx`), backs the old files up to `/var/backups/markas-nginx/` (last 10 kept), and restores them if `nginx -t` fails, so a bad file never reaches a reload.

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
