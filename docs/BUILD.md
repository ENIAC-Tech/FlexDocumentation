# Build documentation (VitePress)

The documentation site uses [VitePress](https://vitepress.dev/) under the `docs/` directory. English source Markdown lives in `docs/source/`; the build copies it to `docs/en/` and applies gettext translations to `docs/zh_CN/` and `docs/ja/`.

## Prerequisites

- Node.js 20 or newer
- npm

## Install

```powershell
cd docs
npm ci
```

## Local preview

Regenerate locale trees from `docs/source/`, then start the dev server:

```powershell
cd docs
npm run docs:sync-en
npm run docs:translate
npm run docs:dev
```

Open the URL printed in the terminal (default Vite port). The site `base` is `/FlexDocumentation/flexbar/`, so local dev and preview use that prefix (for example `http://localhost:5173/FlexDocumentation/flexbar/en/`). Use the language menu for English, 简体中文, and 日本語.

## Production build

```powershell
cd docs
npm run docs:build
```

This runs `docs:sync-en`, `docs:translate`, placeholder generation for missing static files under `public/`, and `vitepress build`. Output is written to `docs/.vitepress/dist/`.

## Preview the static output

```powershell
cd docs
npm run docs:preview
```

## Scripts

| Script | Purpose |
|--------|---------|
| `docs:sync-en` | Copy English `.md` from `source/`, generate `index.md` from `index.rst`, normalize links and images into `en/` |
| `docs:translate` | Apply `locales/zh_CN` and `locales/ja` `.po` files into `zh_CN/` and `ja/` |
| `docs:ensure-images` | Create minimal placeholder files under `public/` for missing `/image/` and `/assets/` references so the build succeeds |
| `docs:dev` | VitePress dev server (run sync/translate first if `source/` changed) |
| `docs:build` | Full pipeline + static build |
| `docs:preview` | Serve the last build from `docs/.vitepress/dist` |

## GitHub Pages

The documentation lives at **`https://eniac-tech.github.io/FlexDocumentation/flexbar/`** (VitePress `base` is `/FlexDocumentation/flexbar/`). The GitHub Actions workflow uploads the build under a `flexbar/` folder so this path matches Project Pages. **`https://eniac-tech.github.io/FlexDocumentation/`** serves a short redirect page to `flexbar/en/`. Enable **GitHub Pages** with source **GitHub Actions** in the repository settings.

## Site base URL

GitHub Project Pages path is configured in `docs/.vitepress/site-base.json` (single source of truth for `base`). Markdown must continue to use `/image/` and `/assets/` without embedding the project prefix—VitePress applies `base` when rendering.

## gettext / `.po` maintenance

Chinese `msgstr` strings must not contain raw ASCII `"` inside quoted PO lines (gettext breaks). Use Chinese corner quotes 「」, escaped `\"`, or rephrase.

## Legacy Sphinx tree

`docs/source/` still holds the original Sphinx/MyST files and gettext catalogs for reference. The active site is built only from the VitePress pipeline above.
