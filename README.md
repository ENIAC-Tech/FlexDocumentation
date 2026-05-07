# FlexDocumentation

This repository manages documentation for Flexbar products. The published site is built with **VitePress** and deployed to **GitHub Pages**.

## Quick start (local docs)

1. Install [Node.js](https://nodejs.org/) 20+ and clone this repository.
2. From the `docs` folder:

   ```powershell
   cd docs
   npm ci
   npm run docs:sync-en
   npm run docs:translate
   npm run docs:dev
   ```

3. Open the local URL shown in the terminal to browse English, Chinese, and Japanese pages.

For a production build and further detail, see [docs/BUILD.md](docs/BUILD.md).

## Contributing

After editing Markdown under `docs/source/`, run `npm run docs:sync-en` and `npm run docs:translate` in `docs/` so `docs/en/`, `docs/zh_CN/`, and `docs/ja/` stay in sync before you commit (unless you rely on CI to regenerate them on `main`).
