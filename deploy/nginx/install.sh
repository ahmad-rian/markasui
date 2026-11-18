#!/usr/bin/env bash
# Runs on the server as root: scripts/deploy.sh pipes it through `ssh <host> sudo bash -s -- <args>`.
# Installs the CSP snippet generated with the build and, when a second argument is given, the nginx site config.
# The live files are backed up first and restored if `nginx -t` fails, so a bad file never reaches a reload.
#
# Arguments: <web root> [uploaded site config]
set -euo pipefail

web_root="$1"
site_upload="${2:-}"
snippet=/etc/nginx/snippets/markas-csp.conf
site=/etc/nginx/sites-available/markas.jenderalcorp.com
backup_root=/var/backups/markas-nginx
backup="$backup_root/$(date +%Y%m%d-%H%M%S)"
keep_backups=10

if [[ ! -f "$web_root/.csp-nginx.conf" ]]; then
  echo "install: $web_root/.csp-nginx.conf is missing (build with apps/docs/scripts/csp.ts)" >&2
  exit 1
fi

mkdir -p "$backup"
for file in "$snippet" "$site"; do
  if [[ -f "$file" ]]; then cp -a "$file" "$backup/"; fi
done

restore() {
  echo "install: nginx -t failed, restoring the files from $backup" >&2
  if [[ -f "$backup/markas-csp.conf" ]]; then cp -a "$backup/markas-csp.conf" "$snippet"; fi
  if [[ -f "$backup/markas.jenderalcorp.com" ]]; then cp -a "$backup/markas.jenderalcorp.com" "$site"; fi
  nginx -t
  exit 1
}

install -m 0644 -o root -g root "$web_root/.csp-nginx.conf" "$snippet"
if [[ -n "$site_upload" ]]; then
  install -m 0644 -o root -g root "$site_upload" "$site"
  rm -f "$site_upload"
fi

nginx -t || restore
systemctl reload nginx
echo "install: nginx reloaded (backup in $backup)"

# Keep the newest backups only.
find "$backup_root" -mindepth 1 -maxdepth 1 -type d | sort -r | tail -n +$((keep_backups + 1)) |
  while read -r old; do rm -r -- "$old"; done
