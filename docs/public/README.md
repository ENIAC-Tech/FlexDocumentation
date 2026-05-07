# Static files for VitePress (`public/`)

Files here are copied to the site output root. The site `base` URL (e.g. GitHub Project Pages subpath) is set in [`.vitepress/site-base.json`](../.vitepress/site-base.json) and read from `.vitepress/config.ts`. **Do not** put that base path into Markdown image or download URLs: use root-absolute paths so VitePress rewrites them for the browser:

- `image/` — in Markdown: `/image/...`
- `assets/` — in Markdown: `/assets/...` (e.g. `/assets/factory-v1.flexbar`)

When `docs/source/image/` or `docs/source/assets/` exist, `npm run docs:sync-en` copies them into this folder.

If a file is still missing, `npm run docs:ensure-images` (run as part of `npm run docs:build`) creates minimal placeholders so the build passes. Commit real binaries here when you have them.

`ignoreDeadLinks` in `.vitepress/config.ts` includes `/^\/image\//` and `/^\/assets\//` because the static file checker can false-positive; assets under `public/` are still served correctly.
