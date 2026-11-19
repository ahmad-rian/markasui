#!/usr/bin/env bash
# Build situs docs untuk domain produksi lalu sinkronkan ke server (nginx statis, /var/www/markasui).
# Pemakaian: pnpm deploy:site [--nginx] [--donate]   (butuh host SSH "tencent" di ~/.ssh/config, atau DEPLOY_HOST=user@host)
#   --nginx      pasang juga deploy/nginx/markas.jenderalcorp.com.conf sebagai config situs nginx
#   --donate     pasang juga layanan donasi (deploy/donate: server.mjs + unit systemd) lalu restart
#   DIST_DIR=..  pakai build yang sudah ada (mis. build di folder sementara), tanpa build ulang
# Setiap deploy memasang snippet CSP hasil build (hash skrip inline berubah) lalu reload nginx. Lihat deploy/README.md.
set -euo pipefail

SITE_URL="${SITE_URL:-https://markas.jenderalcorp.com}"
DEPLOY_HOST="${DEPLOY_HOST:-tencent}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/markasui}"
root="$(cd "$(dirname "$0")/.." && pwd)"
site_conf="$root/deploy/nginx/markas.jenderalcorp.com.conf"
site_upload=".markas-nginx-site.conf"

sync_nginx=false
sync_donate=false
for arg in "$@"; do
  case "$arg" in
    --nginx) sync_nginx=true ;;
    --donate) sync_donate=true ;;
    *) echo "deploy: opsi tidak dikenal: $arg" >&2 && exit 2 ;;
  esac
done

cd "$root"
if [[ -z "${DIST_DIR:-}" ]]; then
  # Cache konten Astro bisa menyajikan Markdown lama setelah plugin rehype berubah.
  rm -f apps/docs/node_modules/.astro/data-store.json
  SITE_URL="$SITE_URL" pnpm build
fi
dist="${DIST_DIR:-apps/docs/dist}"
if [[ ! -f "$dist/.csp-nginx.conf" ]]; then
  echo "deploy: $dist/.csp-nginx.conf tidak ada (build harus menjalankan apps/docs/scripts/csp.ts)" >&2
  exit 1
fi

# Layanan donasi dipasang sebelum nginx, supaya /api/donate sudah hidup saat config barunya aktif.
if [[ "$sync_donate" == true ]]; then
  donate_upload=".markas-donate-upload"
  rsync -a --delete deploy/donate/server.mjs deploy/donate/markas-donate.service "$DEPLOY_HOST:$donate_upload/"
  ssh "$DEPLOY_HOST" sudo bash -s -- "$donate_upload" < deploy/donate/install.sh
fi

remote_args=("$DEPLOY_PATH")
if [[ "$sync_nginx" == true ]]; then
  rsync -a "$site_conf" "$DEPLOY_HOST:$site_upload"
  remote_args+=("$site_upload")
fi

rsync -az --delete --stats "$dist/" "$DEPLOY_HOST:$DEPLOY_PATH/" | tail -3
# Snippet CSP dipasang tepat setelah rsync: HTML baru hanya sebentar dilayani dengan header lama.
ssh "$DEPLOY_HOST" sudo bash -s -- "${remote_args[@]}" < deploy/nginx/install.sh
echo "deploy: $SITE_URL"
