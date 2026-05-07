/**
 * Copies English Markdown from docs/source into docs/en, generates index.md
 * from each index.rst, normalizes image paths to /image/..., and mirrors every
 * Sphinx-style nested `image` folders under docs/source (including docs/source/image,
 * flexdesigner/image, functions/.../image, etc.) into docs/public/image.
 */
import fs from 'fs/promises'
import fsSync from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DOCS = path.resolve(__dirname, '..')
const SOURCE = path.join(DOCS, 'source')
const EN = path.join(DOCS, 'en')
const PUBLIC = path.join(DOCS, 'public')

const SKIP_DIRS = new Set(['locales', '_templates', '_build', '__pycache__', '.pytest_cache'])

function normalizeImages(content) {
  return content
    .replaceAll('](image/', '](/image/')
    .replaceAll('src="image/', 'src="/image/')
    .replaceAll("src='image/", "src='/image/")
}

function fixAssetZipLinks(content) {
  return content
    .replace(/\]\(\.\.\/\.\.\/\.\.\/assets\//g, '](/assets/')
    .replace(/\]\(\.\.\/assets\//g, '](/assets/')
}

function fixLegacyRstLinks(content) {
  return content
    .replace(/\]\(sdk\/index\.rst\)/g, '](sdk/)')
    .replace(/\]\(functions\/index\.rst\)/g, '](functions/)')
    .replace(/\]\(\.\.\/sdk\/index\.rst\)/g, '](../sdk/)')
    .replace(/\]\(\.\.\/functions\/index\.rst\)/g, '](../functions/)')
}

function fixMarkdownFileExtensions(content) {
  return content.replace(/\]\(([^)]+\.md)\)/g, (_, p) => `](${p.replace(/\.md$/, '')})`)
}

/** Avoid Vue treating registry placeholders like CSXS.<X> as HTML tags. */
function escapeAngleRegistry(content) {
  let s = content
    .replace(/CSXS\.<X>/g, 'CSXS.&lt;X&gt;')
    .replace(/CSXS\.<VERSION>/g, 'CSXS.&lt;VERSION&gt;')

  const simple = [
    'STARS',
    'base64',
    'path',
    'uuid',
    'debug',
    'start',
    'output',
    'number',
    'ARCH',
  ]
  for (const tag of simple) {
    const re = new RegExp(`<${tag}>`, 'gi')
    s = s.replace(re, `&lt;${tag}&gt;`)
  }
  s = s.replace(/<OS NAME>/gi, '&lt;OS NAME&gt;')
  return s
}

function fixBrokenPlaceholderQuotes(content) {
  return content.replace(/'<STARS>`'/g, "`<STARS>`")
}

function normalizeMarkdown(content) {
  return fixBrokenPlaceholderQuotes(
    escapeAngleRegistry(
      fixMarkdownFileExtensions(
        fixLegacyRstLinks(fixAssetZipLinks(normalizeImages(content))),
      ),
    ),
  )
}

const DOC_LINK_TITLE = {
  getting_started: 'Getting Started',
}

function fixDocRoles(md) {
  return md.replace(/:doc:`([^`]+)`/g, (_, slug) => {
    const title = DOC_LINK_TITLE[slug] || slug.replace(/_/g, ' ')
    return `[${title}](${slug})`
  })
}

function transformNoteBlocks(body) {
  const lines = body.split(/\r?\n/)
  const out = []
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '.. note::') {
      i++
      const tipLines = []
      while (i < lines.length && (lines[i].startsWith('   ') || lines[i].trim() === '')) {
        if (lines[i].trim()) tipLines.push(lines[i].replace(/^   /, ''))
        i++
      }
      i--
      out.push('::: tip')
      for (const t of tipLines) out.push(t)
      out.push(':::')
      out.push('')
      continue
    }
    out.push(lines[i])
  }
  return out.join('\n')
}

function sphinxRefToMdLink(ref) {
  const clean = ref.trim()
  if (clean.endsWith('/index')) return `${clean.slice(0, -'/index'.length)}/`
  return clean
}

const ROOT_TOC_LABEL = {
  getting_started: 'Getting Started',
  flexdesigner: 'FlexDesigner',
  functions: 'Functions',
  sdk: 'SDK',
  troubleshoting: 'Troubleshooting & FAQ',
  releasenote: 'Release Notes',
}

function convertRootIndexRst(rst) {
  const lines = rst.split(/\r?\n/)
  let i = 0
  while (i < lines.length && lines[i].trim() === '') i++
  const title = lines[i].trim()
  i++
  if (i < lines.length && /^[=-]+$/.test(lines[i].trim())) i++

  const body = []
  while (i < lines.length) {
    const t = lines[i].trim()
    if (t === 'Contents') {
      while (i < lines.length && !lines[i].trim().startsWith('.. toctree')) i++
      break
    }
    if (t.startsWith('.. toctree')) break
    body.push(lines[i])
    i++
  }
  let bodyText = body.join('\n').trim()
  bodyText = transformNoteBlocks(bodyText)
  bodyText = fixDocRoles(bodyText)

  const tocLinks = []
  while (i < lines.length) {
    const line = lines[i]
    if (line.trim().startsWith('.. toctree')) {
      i++
      while (i < lines.length && lines[i].trim() && !lines[i].startsWith('   ')) i++
      while (i < lines.length) {
        const t = lines[i].trim()
        if (!t) {
          i++
          continue
        }
        if (!lines[i].startsWith('   ')) break
        const ref = t.replace(/\s+/g, '')
        if (ref && !ref.startsWith(':')) {
          const href = sphinxRefToMdLink(ref)
          const key = href.replace(/\/$/, '')
          const label = ROOT_TOC_LABEL[key] || href.replace(/\//g, '').replace(/_/g, ' ') || ref
          tocLinks.push({ label, href })
        }
        i++
      }
      break
    }
    i++
  }

  const tocMd =
    tocLinks.length > 0
      ? `\n## Contents\n\n${tocLinks.map(({ label, href }) => `- [${label}](${href})`).join('\n')}\n`
      : ''

  return normalizeMarkdown(`# ${title}\n\n${bodyText}\n${tocMd}`)
}

function rstIntroToMarkdown(rst) {
  const lines = rst.split(/\r?\n/)
  let i = 0
  while (i < lines.length && lines[i].trim() === '') i++
  if (i >= lines.length) return '#\n'
  const title = lines[i].trim()
  i++
  if (i < lines.length && /^[=-]+$/.test(lines[i].trim())) i++
  const body = []
  while (i < lines.length) {
    const line = lines[i]
    if (line.trim().startsWith('.. toctree')) break
    body.push(line)
    i++
  }
  let bodyText = body.join('\n').trim()
  bodyText = transformNoteBlocks(bodyText)
  bodyText = fixDocRoles(bodyText)
  return normalizeMarkdown(`# ${title}\n\n${bodyText ? `${bodyText}\n` : ''}`)
}

async function rmrf(dir) {
  await fs.rm(dir, { recursive: true, force: true })
}

async function copyTree(src, dest) {
  if (!fsSync.existsSync(src)) return
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })
  for (const e of entries) {
    const from = path.join(src, e.name)
    const to = path.join(dest, e.name)
    if (e.isDirectory()) await copyTree(from, to)
    else await fs.copyFile(from, to)
  }
}

/** Collect every directory named `image` under root (e.g. flexdesigner/image). Skip locales/build dirs. */
async function collectDirsNamed(root, dirname, out = []) {
  let entries
  try {
    entries = await fs.readdir(root, { withFileTypes: true })
  } catch {
    return out
  }
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue
    const full = path.join(root, e.name)
    if (!e.isDirectory()) continue
    if (e.name === dirname) {
      out.push(full)
      continue
    }
    await collectDirsNamed(full, dirname, out)
  }
  return out
}

async function mergeCopySourceImagesToPublic() {
  const destImg = path.join(PUBLIC, 'image')
  const dirs = await collectDirsNamed(SOURCE, 'image')
  for (const imgDir of dirs) {
    await copyTree(imgDir, destImg)
  }
}

async function walk(dir, relBase, handleFile) {
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue
    const full = path.join(dir, e.name)
    const rel = path.join(relBase, e.name).replace(/\\/g, '/')
    if (e.isDirectory()) await walk(full, rel, handleFile)
    else await handleFile(full, rel)
  }
}

async function main() {
  await rmrf(EN)
  await fs.mkdir(EN, { recursive: true })

  await walk(SOURCE, '', async (full, rel) => {
    if (!rel.endsWith('.md')) return
    const text = await fs.readFile(full, 'utf8')
    const out = path.join(EN, rel)
    await fs.mkdir(path.dirname(out), { recursive: true })
    await fs.writeFile(out, normalizeMarkdown(text), 'utf8')
  })

  await walk(SOURCE, '', async (full, rel) => {
    if (!rel.endsWith('index.rst')) return
    const rst = await fs.readFile(full, 'utf8')
    const mdRel = rel.replace(/index\.rst$/, 'index.md')
    const out = path.join(EN, mdRel)
    await fs.mkdir(path.dirname(out), { recursive: true })
    const md = rel === 'index.rst' ? convertRootIndexRst(rst) : rstIntroToMarkdown(rst)
    await fs.writeFile(out, md, 'utf8')
  })

  await mergeCopySourceImagesToPublic()

  const assetsSrc = path.join(SOURCE, 'assets')
  const assetsDest = path.join(PUBLIC, 'assets')
  if (fsSync.existsSync(assetsSrc)) await copyTree(assetsSrc, assetsDest)

  console.log(
    'sync-en-from-sphinx: wrote docs/en; merged all docs/source/.../image → public/image; copied source/assets → public/assets when present',
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
