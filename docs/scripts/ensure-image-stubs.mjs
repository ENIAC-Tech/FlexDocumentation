/**
 * VitePress resolves local image URLs during build. Missing files under
 * public/ cause Rollup errors. This script creates minimal 1×1 PNG stubs for
 * every /image/... path referenced in locale markdown.
 */
import fs from 'fs/promises'
import fsSync from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DOCS = path.resolve(__dirname, '..')
const PUBLIC = path.join(DOCS, 'public')

const PNG_1x1 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)

function extractPaths(content) {
  const out = new Set()
  for (const m of content.matchAll(/\(\/image\/[^)]+\)/g)) {
    out.add(m[0].slice(1, -1))
  }
  for (const m of content.matchAll(/src="(\/image\/[^"]+)"/g)) {
    out.add(m[1])
  }
  for (const m of content.matchAll(/\(\/assets\/[^)]+\)/g)) {
    out.add(m[0].slice(1, -1))
  }
  return out
}

async function walkMd(dir, onFile) {
  if (!fsSync.existsSync(dir)) return
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) await walkMd(full, onFile)
    else if (e.name.endsWith('.md')) await onFile(full)
  }
}

async function main() {
  const paths = new Set()
  for (const locale of ['en', 'zh_CN', 'ja']) {
    await walkMd(path.join(DOCS, locale), async (file) => {
      const text = await fs.readFile(file, 'utf8')
      for (const p of extractPaths(text)) paths.add(p)
    })
  }

  let n = 0
  for (const urlPath of paths) {
    if (!urlPath.startsWith('/image/') && !urlPath.startsWith('/assets/')) continue
    const rel = urlPath.slice(1)
    const dest = path.join(PUBLIC, rel)
    if (fsSync.existsSync(dest)) continue
    await fs.mkdir(path.dirname(dest), { recursive: true })
    const body = urlPath.startsWith('/assets/') ? Buffer.from('stub\n') : PNG_1x1
    await fs.writeFile(dest, body)
    n++
  }
  console.log(`ensure-image-stubs: wrote ${n} placeholder files under public/`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
