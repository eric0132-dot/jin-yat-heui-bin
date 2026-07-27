#!/usr/bin/env bash
# Restore「今日煮咩好」+ 主味標籤 from patches/ (run from repo root)
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ ! -f patches/0001-Add-recipe-section-with-flavor-tags-and-97-home-cook.patch ]]; then
  if [[ -f patches/recipe-patches.tar.gz.b64 ]]; then
    echo "Extracting patches from recipe-patches.tar.gz.b64 ..."
    base64 -d -i patches/recipe-patches.tar.gz.b64 | tar xzf - -C patches
  else
    echo "Missing patches/. Copy from Cloud Agent workspace or pull after GitHub push."
    exit 1
  fi
fi

echo "Applying patches ..."
git am patches/0001-*.patch patches/0002-*.patch

echo "Reinstalling dependencies ..."
rm -rf node_modules package-lock.json
npm install

echo "Done. Verify with: grep '今日煮咩好' src/App.tsx && npm run build"
