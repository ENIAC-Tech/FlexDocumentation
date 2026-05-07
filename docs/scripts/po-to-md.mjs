/**
 * For each English page under docs/en, load the matching gettext .po for
 * zh_CN / ja, apply msgstr replacements (skip fuzzy / empty), fall back to
 * English, and write docs/zh_CN and docs/ja. Reports fuzzy/skips to stdout.
 */
import fs from 'fs/promises'
import fsSync from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { po } from 'gettext-parser'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DOCS = path.resolve(__dirname, '..')
const EN = path.join(DOCS, 'en')
const SOURCE = path.join(DOCS, 'source')

const LANGS = [
  { code: 'zh_CN', localeDir: 'zh_CN' },
  { code: 'ja', localeDir: 'ja' },
]

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

function escapeAngleRegistry(content) {
  let s = content
    .replace(/CSXS\.<X>/g, 'CSXS.&lt;X&gt;')
    .replace(/CSXS\.<VERSION>/g, 'CSXS.&lt;VERSION&gt;')

  const simple = ['STARS', 'base64', 'path', 'uuid', 'debug', 'start', 'output', 'number', 'ARCH']
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

function finalizeMarkdown(content) {
  return fixDocRoles(
    fixBrokenPlaceholderQuotes(
      escapeAngleRegistry(
        fixMarkdownFileExtensions(
          fixLegacyRstLinks(fixAssetZipLinks(normalizeImages(content))),
        ),
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

function collectTranslations(parsed) {
  const out = []
  for (const ctx of Object.keys(parsed.translations)) {
    const block = parsed.translations[ctx]
    for (const mid of Object.keys(block)) {
      if (!mid) continue
      const entry = block[mid]
      const flags = entry.comments?.flag || ''
      const fuzzy = typeof flags === 'string' && flags.includes('fuzzy')
      const msgstr = (entry.msgstr || []).join('')
      const msgid = entry.msgid
      if (!msgid || fuzzy) continue
      if (!msgstr.trim()) continue
      if (msgstr === msgid) continue
      out.push({ msgid, msgstr })
    }
  }
  out.sort((a, b) => b.msgid.length - a.msgid.length)
  return out
}

function applyPo(baseText, pairs) {
  let text = baseText
  for (const { msgid, msgstr } of pairs) {
    if (!msgid || !text.includes(msgid)) continue
    text = text.split(msgid).join(msgstr)
  }
  return text
}

async function walkEn(relBase, onMd) {
  const dir = path.join(EN, relBase)
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const e of entries) {
    const rel = path.join(relBase, e.name).replace(/\\/g, '/')
    const full = path.join(dir, e.name)
    if (e.isDirectory()) await walkEn(rel, onMd)
    else if (e.name.endsWith('.md')) await onMd(full, rel)
  }
}

async function main() {
  for (const { code } of LANGS) {
    await fs.rm(path.join(DOCS, code), { recursive: true, force: true })
  }

  let files = 0
  await walkEn('', async (fullEn, rel) => {
    files++
    const enText = await fs.readFile(fullEn, 'utf8')

    for (const { code, localeDir } of LANGS) {
      const poRel = rel.replace(/\.md$/, '.po')
      const poPath = path.join(
        SOURCE,
        'locales',
        localeDir,
        'LC_MESSAGES',
        poRel,
      )
      let translated = enText
      if (fsSync.existsSync(poPath)) {
        try {
          const raw = await fs.readFile(poPath)
          const parsed = po.parse(raw)
          const pairs = collectTranslations(parsed)
          translated = applyPo(enText, pairs)
        } catch (e) {
          console.warn(`po-to-md: skip broken PO ${poPath}: ${e.message}`)
        }
      }
      const outPath = path.join(DOCS, code, rel)
      await fs.mkdir(path.dirname(outPath), { recursive: true })
      await fs.writeFile(outPath, finalizeMarkdown(translated), 'utf8')
    }
  })

  console.log(`po-to-md: processed ${files} markdown files × ${LANGS.length} languages`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
