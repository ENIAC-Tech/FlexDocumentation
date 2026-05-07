# vitepress-github-pages-migration — 上下文

## 背景与约束

当前文档站基于 Sphinx 7.1.2，使用 MyST Parser 解析 Markdown，使用 `sphinx-rtd-theme` 生成 HTML，使用 `sphinx-intl` 和 gettext `.po` 文件维护中文、日文翻译。

新的目标是迁移到 VitePress，并托管到 GitHub Pages 用户/组织站点。迁移必须一次性覆盖英文、中文、日文三种语言；翻译后的 Markdown 内容需要提交进仓库，`.po` 作为迁移来源和历史资产保留或归档，不作为新站构建输入。

仓库当前没有 Node 包配置文件，因此 VitePress 迁移需要新增 `docs/package.json` 和 lockfile。包管理器决策为 `npm`。

## 关键文件

- `docs/source/conf.py`：Sphinx 配置，包含 MyST、i18n、主题、静态资源配置。
- `docs/source/index.rst`：当前文档入口和主 toctree。
- `docs/source/**/*.md`：当前主要英文正文来源。
- `docs/source/**/index.rst`：当前章节导航来源，需要转换为 VitePress sidebar。
- `docs/source/locales/zh_CN/LC_MESSAGES/**/*.po`：中文翻译来源。
- `docs/source/locales/ja/LC_MESSAGES/**/*.po`：日文翻译来源。
- `docs/source/_static/css/custom.css`：当前 Sphinx 自定义样式。
- `docs/BUILD.md`：当前 Sphinx 构建与翻译流程说明，迁移后需要更新。
- `docs/requirements.txt`：当前 Python 文档依赖，迁移后不再作为主构建依赖。
- `docs/Makefile`：当前 Sphinx Make 构建入口。
- `docs/make.ps1`：当前 Windows/Sphinx 多语言构建入口。
- `docs/build_all_languages.py`：当前 gettext 与多语言 Sphinx 构建脚本。
- `.github/workflows/docs-i18n.yml`：当前 `.po` 更新 CI，迁移后需要替换为 Pages 部署 workflow。
- `.readthedocs.yaml`：当前 Read the Docs 配置，迁移到 GitHub Pages 后需要移除或归档。
- `README.md`：可能包含过时的文档构建说明。

## 已确认决策

| 日期 | 决策 | 理由 |
|------|------|------|
| 2026-05-07 | 一次性迁移英文、中文、日文到 VitePress | 避免新旧站长期并行，确保上线时三语言体验完整 |
| 2026-05-07 | 使用 `docs/` 作为 VitePress 项目根 | 复用当前文档边界，不污染仓库根目录 |
| 2026-05-07 | 发布到 GitHub Pages 用户/组织站点 | 目标地址为 `https://<user>.github.io/`，VitePress `base` 使用 `/` |
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

部分 `zh_CN` 的 `.po` 文件对 `gettext-parser` 非法（未转义引号等），`po-to-md.mjs` 会跳过并回退英文；需后续修复 PO 或手工维护对应中文页。

构建产物：`docs/en/`、`docs/zh_CN/`、`docs/ja/` 由脚本生成，可提交也可仅由 CI 生成；`docs/public/image/` 与 `docs/public/assets/` 下的占位文件由 `docs:ensure-images` 在本地/CI 生成，已加入根 `.gitignore`。
