#!/usr/bin/env bash
# Build situs docs untuk domain produksi lalu sinkronkan ke server (nginx statis, /var/www/markasui).
# Pemakaian: pnpm deploy:site   (butuh host SSH "tencent" di ~/.ssh/config, atau DEPLOY_HOST=user@host)
set -euo pipefail

SITE_URL="${SITE_URL:-https://markas.jenderalcorp.com}"
DEPLOY_HOST="${DEPLOY_HOST:-tencent}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/markasui}"
root="$(cd "$(dirname "$0")/.." && pwd)"

cd "$root"
# Cache konten Astro bisa menyajikan Markdown lama setelah plugin rehype berubah.
rm -f apps/docs/node_modules/.astro/data-store.json
SITE_URL="$SITE_URL" pnpm build
rsync -az --delete --stats apps/docs/dist/ "$DEPLOY_HOST:$DEPLOY_PATH/" | tail -3
echo "deploy: $SITE_URL"
