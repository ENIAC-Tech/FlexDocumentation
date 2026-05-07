# vitepress-github-pages-migration — 上下文

## 背景与约束

当前文档站基于 Sphinx 7.1.2，使用 MyST Parser 解析 Markdown，使用 `sphinx-rtd-theme` 生成 HTML，使用 `sphinx-intl` 和 gettext `.po` 文件维护中文、日文翻译。

新的目标是迁移到 VitePress，并托管到 GitHub Pages 用户/组织站点。迁移必须一次性覆盖英文、中文、日文三种语言；翻译后的 Markdown 内容需要提交进仓库，`.po` 作为迁移来源和历史资产保留或归档，不作为新站构建输入。

仓库当前没有 Node 包配置文件，因此 VitePress 迁移需要新增 `docs/package.json` 和 lockfile。包管理器决策为 `npm`。

## 关键文件

- `docs/.vitepress/site-base.json`：VitePress `base`（与 GitHub Project Pages 子路径一致）。
- `docs/source/conf.py`：Sphinx 配置（归档）。
- `docs/source/index.rst`：文档入口与主 toctree（归档）。
- `docs/source/**/*.md`：英文正文来源。
- `docs/source/**/index.rst`：章节导航（归档）。
- `docs/source/locales/zh_CN/LC_MESSAGES/**/*.po`：中文翻译来源。
- `docs/source/locales/ja/LC_MESSAGES/**/*.po`：日文翻译来源。
- `docs/source/_static/css/custom.css`：旧 Sphinx 样式（blockquote 已迁至 VitePress 主题）。
- `docs/BUILD.md`：VitePress 构建说明。
- `docs/public/`：静态资源（`image/`、`assets/`）；约定见 `docs/public/README.md`。
- `.github/workflows/docs-pages.yml`：GitHub Pages 部署 workflow。
- `README.md`：仓库入口说明。

## 已确认决策

| 日期 | 决策 | 理由 |
|------|------|------|
| 2026-05-07 | 一次性迁移英文、中文、日文到 VitePress | 避免新旧站长期并行，确保上线时三语言体验完整 |
| 2026-05-07 | 使用 `docs/` 作为 VitePress 项目根 | 复用当前文档边界，不污染仓库根目录 |
| 2026-05-07 | GitHub Project Pages 子路径 `/FlexDocumentation/` | 线上：`https://eniac-tech.github.io/FlexDocumentation/`；Markdown 公共资源路径仍为 `/image/`、`/assets/`，由 VitePress 拼接 `base` |
| 2026-05-07 | 使用 `npm` | 减少额外工具要求，仓库当前无既有 Node 约定 |
| 2026-05-07 | 提交生成后的三语言 Markdown | 构建简单，可人工修正翻译，GitHub Pages 不依赖 gettext 运行时 |
| 2026-05-07 | 本次只保留 HTML 输出 | VitePress/GitHub Pages 原生适合静态 HTML，PDF/EPUB 后续单独处理 |
| 2026-05-07 | 对核心旧链接做有限兼容 | 控制迁移复杂度，同时保护主要入口和外部引用 |

## 放弃或暂缓的方案

- 暂缓完整兼容所有 Sphinx `.html` URL，因为会显著增加重定向映射和验证成本。
- 不在本次保留 gettext/`.po` 日常翻译流水线，因为 VitePress 不直接消费 `.po`。
- 不在本次保留 Read the Docs、PDF、EPUB，因为目标托管平台和输出形态已改为 GitHub Pages HTML。

## 迁移目标结构草案

```text
docs/
├── package.json
├── package-lock.json
├── .vitepress/
│   ├── config.ts
│   └── theme/
├── en/
│   ├── index.md
│   ├── getting_started.md
│   ├── flexdesigner/
│   ├── functions/
│   ├── sdk/
│   ├── troubleshoting/
│   └── releasenote/
├── zh_CN/
│   └── ...
├── ja/
│   └── ...
└── public/
    └── ...
```

## 需要实现时再确认的细节

- GitHub Pages 用户/组织站点仓库名与目标 GitHub 用户名。
- 核心旧链接清单，至少包含首页、`getting_started`、`flexdesigner`、`functions`、`sdk`、`troubleshoting`、`releasenote`。
- 是否保留 `docs/source/` 作为迁移归档，还是迁移完成后删除 Sphinx 源目录。（**已决定：保留** `docs/source/` 作为归档与 `.po` 来源；日常构建不依赖 Sphinx。）

## 迁移前盘点摘要（2026-05-07）

| 类别 | 数量（约） |
|------|------------|
| `docs/source/**/*.md` | 69 |
| `docs/source/**/*.rst` | 20 |
| `docs/source/locales/**/*.po` | 178 |

部分 zh_CN `.po` 曾在 `msgstr` 续行中嵌入未转义的 ASCII `"`，导致解析失败；已于 2026-05-07 修复（改用「」或重写）。后续编辑 `.po` 时请避免在引号包裹的续行内嵌套裸 `"`。

构建产物：`docs/en/`、`docs/zh_CN/`、`docs/ja/` 由脚本生成。`docs/public/` 可提交真实资源；缺失引用由 `docs:ensure-images` 生成占位以便 CI；根 `.gitignore` 不再强制忽略 `public/image`、`public/assets`。
