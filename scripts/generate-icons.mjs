import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const svg = readFileSync(join(root, 'public/favicon.svg'))

async function writePng(name, size) {
  await sharp(svg).resize(size, size).png().toFile(join(root, 'public', name))
  console.log('wrote', name)
}

await writePng('pwa-192.png', 192)
await writePng('pwa-512.png', 512)
await writePng('apple-touch-icon.png', 180)
