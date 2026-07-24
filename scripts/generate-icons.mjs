#!/usr/bin/env node
/**
 * Optional: regenerate PWA PNGs from public/favicon.svg
 * Requires a one-off: npm i -D sharp@^0.35.3
 */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)

let sharp
try {
  sharp = require('sharp')
} catch {
  console.error(
    'sharp is not installed. Icons are already in public/.\n' +
      'To regenerate: npm i -D sharp@^0.35.3 && npm run icons',
  )
  process.exit(1)
}

const svg = readFileSync(join(root, 'public/favicon.svg'))

async function writePng(name, size) {
  await sharp(svg).resize(size, size).png().toFile(join(root, 'public', name))
  console.log('wrote', name)
}

await writePng('pwa-192.png', 192)
await writePng('pwa-512.png', 512)
await writePng('apple-touch-icon.png', 180)
