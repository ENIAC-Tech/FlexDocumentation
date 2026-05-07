# vitepress-github-pages-migration — 任务清单

## 0. 迁移前盘点

- [x] 统计 `docs/source/**/*.md`、`docs/source/**/*.rst`、`docs/source/locales/**/*.po` 的文件数量与目录映射。（约 69 md、20 rst、178 po；盘点见 context）
- [x] 从 `docs/source/index.rst` 和各章节 `index.rst` 提取完整 toctree，形成 VitePress sidebar 输入。（已体现在 `docs/.vitepress/sidebar.ts`）
- [x] 扫描正文中的 Sphinx/RST/MyST 专用语法：`:doc:`、directive、admonition、definition list、交叉引用。（`:doc:` 仅根 index.rst；正文以 Markdown 为主；directive 在同步脚本中处理 `.. note::`）
- [x] 扫描图片、下载文件和相对链接，列出需要迁移或重写的路径模式。（`image/`→`/image/`；`../assets/`→`/assets/`；`.rst` 索引链接→对应章节路径；见 `docs/scripts/sync-en-from-sphinx.mjs`）
- [x] 确认核心旧链接兼容清单。（站点根 `docs/public/index.html` 重定向至 `/en/`；`ignoreDeadLinks` 覆盖 `/assets/`、`/image/` 二进制链）

## 1. 初始化 VitePress

- [x] 在 `docs/` 新增 `package.json`，使用 `npm` 管理 VitePress。
- [x] 添加 `docs:dev`、`docs:build`、`docs:preview` 脚本。
- [x] 安装 VitePress 并生成 `package-lock.json`。
- [x] 新建 `docs/.vitepress/config.ts`。
- [x] 配置站点基础信息、`base: '/'`、三语言 locale、搜索和导航入口。
- [x] 迁移或重建当前 `docs/source/_static/css/custom.css` 中仍需要的样式。（blockquote 样式在 `docs/.vitepress/theme/custom.css`）

## 2. 英文内容迁移

- [x] 创建 `docs/en/` 目录结构。
- [x] 将 `docs/source/index.rst` 转换为 `docs/en/index.md`。（由同步脚本生成）
- [x] 将英文 Markdown 正文从 `docs/source/` 迁移到 `docs/en/`。（`docs:sync-en`）
- [x] 将章节 `index.rst` 转换为对应的 `index.md` 或 sidebar 配置。
- [x] 将指向 `.rst` 的链接改为 VitePress 路由。（`fixLegacyRstLinks`）
- [x] 将 Sphinx directive/role 改写为 VitePress 支持的 Markdown 或 Vue 组件语法。（根页 `.. note::`→`::: tip`；`:doc:`→Markdown 链接）
- [x] 迁移静态资源到 VitePress 可服务的位置，并更新引用路径。（`/image/`、`/assets/`；缺失文件由 `docs:ensure-images` 生成占位）

## 3. 翻译内容迁移

- [x] 设计 `.po` 到 Markdown 的转换策略，以英文源 Markdown 为结构基准，用 `msgid` 到 `msgstr` 替换文本。
- [x] 编写可重复运行的转换脚本，输入 `docs/source/` 与对应语言 `.po`，输出 `docs/zh_CN/`、`docs/ja/`。（`docs/scripts/po-to-md.mjs`）
- [x] 对未翻译、fuzzy 或空 `msgstr` 条目定义回退策略，默认回退英文并输出报告。（空/fuzzy 跳过；部分 zh_CN `.po` 语法损坏时跳过并告警）
- [x] 运行转换脚本生成中文 Markdown。
- [x] 运行转换脚本生成日文 Markdown。
- [ ] 抽样检查 `getting_started`、`sdk/flexcli` 等已知翻译文件对应页面。（待人工）
- [ ] 对转换失败或语法破损的页面做手工修正。（部分 zh_CN `.po` 需修复后重新转换）

## 4. 导航与多语言体验

- [x] 根据原 Sphinx toctree 生成英文 sidebar。
- [x] 为中文和日文生成对应 sidebar，保持章节顺序一致。
- [x] 配置语言切换入口。（默认主题 `i18nRouting`）
- [x] 配置首页跳转或默认语言策略。（`public/index.html` → `/en/`）
- [ ] 检查每种语言下的主要章节：getting started、flexdesigner、functions、sdk、troubleshoting、releasenote。（待人工预览）

## 5. GitHub Pages 部署

- [x] 新建 GitHub Actions workflow，使用 `actions/setup-node` 和 `npm ci`。
- [x] 在 workflow 中运行 `cd docs && npm run docs:build`。
- [x] 上传 `docs/.vitepress/dist` 作为 Pages artifact。
- [x] 配置 `deploy-pages` 部署步骤。
- [x] 移除或停用 `.github/workflows/docs-i18n.yml`。
- [x] 移除或归档 `.readthedocs.yaml`。

## 6. 兼容与清理

- [x] 为核心旧入口创建兼容页面或重定向。（根 `index.html`）
- [x] 决定是否保留 `docs/source/` 作为迁移归档；若不保留，删除 Sphinx 源和构建脚本。（**保留** `docs/source/`；已删除顶层 Sphinx 构建入口文件）
- [x] 清理 Sphinx 专用文件：`docs/requirements.txt`、`docs/Makefile`、`docs/make.ps1`、`docs/build_all_languages.py`。
- [x] 更新 `docs/BUILD.md` 为 VitePress 构建说明。
- [x] 更新 `README.md` 中与文档构建、托管相关的内容。

## 7. 验证

- [x] 本地运行 `cd docs && npm run docs:build`。
- [ ] 本地运行 `cd docs && npm run docs:preview` 并抽样访问三语言页面。（待人工）
- [ ] 检查控制台和构建日志中的 broken link、Markdown 语法、资源缺失问题。（已用 `ignoreDeadLinks` 放行 `/assets/`、`/image/`；其余待扫）
- [ ] 抽样验证图片、附件下载、跨章节链接。
- [ ] 抽样验证核心旧链接兼容入口。
- [ ] 在 GitHub Actions 上验证 Pages 部署成功。（合并并启用 Pages 后验证）
