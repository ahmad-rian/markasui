#!/usr/bin/env bash
# Runs on the server as root: scripts/deploy.sh --donate pipes it through `ssh <host> sudo bash -s -- <upload dir>`.
# Installs the donation service (server.mjs + systemd unit), restarts it and waits for /api/donate/health.
# Needs `nodejs` from the Ubuntu archive and /etc/markas-donate/api-key (root:root 0600). See deploy/README.md.
#
# Arguments: <folder with the uploaded server.mjs and markas-donate.service>
set -euo pipefail

upload="$1"
app=/opt/markas-donate
unit=/etc/systemd/system/markas-donate.service
secrets=/etc/markas-donate

if [[ ! -x /usr/bin/node ]]; then
  echo "donate: /usr/bin/node is missing (apt install nodejs)" >&2
  exit 1
fi
if [[ ! -s "$secrets/api-key" ]]; then
  echo "donate: $secrets/api-key is missing" >&2
  exit 1
fi
chown -R root:root "$secrets"
chmod 0700 "$secrets"
find "$secrets" -type f -exec chmod 0600 {} +

install -d -m 0755 -o root -g root "$app"
install -m 0644 -o root -g root "$upload/server.mjs" "$app/server.mjs"
install -m 0644 -o root -g root "$upload/markas-donate.service" "$unit"
rm -rf -- "$upload"

systemctl daemon-reload
systemctl enable --quiet markas-donate
systemctl restart markas-donate

for _ in $(seq 1 20); do
  if curl -fsS http://127.0.0.1:8787/api/donate/health 2>/dev/null; then
    echo
    echo "donate: service is up"
    exit 0
  fi
  sleep 0.5
done
echo "donate: health check failed" >&2
journalctl -u markas-donate -n 20 --no-pager >&2
exit 1
