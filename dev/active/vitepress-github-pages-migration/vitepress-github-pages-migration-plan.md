# vitepress-github-pages-migration — 计划

## 目标

将当前 `Sphinx + MyST + sphinx-intl` 文档站重构为 `VitePress` 站点，并通过 GitHub Pages 发布到用户/组织站点 `https://<user>.github.io/`。

迁移后应支持英文、中文、日文三个语言版本，文档内容由 VitePress 直接构建，部署流程由 GitHub Actions 完成。

## 范围

- 使用 `docs/` 作为 VitePress 项目根目录。
- 建立 `docs/.vitepress/` 配置、主题与导航结构。
- 将当前 `docs/source/` 的英文源内容迁移为 VitePress Markdown。
- 将 `docs/source/locales/zh_CN/LC_MESSAGES/` 与 `docs/source/locales/ja/LC_MESSAGES/` 中的 `.po` 翻译转换为可提交的 Markdown 内容目录。
- 使用 `npm` 管理 VitePress 依赖和构建命令。
- 新建 GitHub Actions workflow，构建 VitePress 并发布到 GitHub Pages。
- 对核心旧链接提供有限兼容，优先覆盖首页和主要章节入口。
- 更新构建说明，移除或标记过时的 Sphinx/Read the Docs 工作流。

## 非目标

- 本次不保留 Read the Docs 托管。
- 本次不保留 PDF/EPUB 输出。
- 不继续使用 gettext/`.po` 作为新站点的日常构建输入。
- 不在迁移阶段重写正文内容风格或重组产品信息架构，除非 VitePress 路由/Markdown 兼容性要求必须调整。

## 怎么做（步骤概览）

1. 盘点当前文档结构、toctree、静态资源、跨文档链接和 `.po` 翻译覆盖范围。
2. 初始化 `docs/` 下的 VitePress 工程：`package.json`、`.vitepress/config.*`、基础主题样式、`npm` scripts。
3. 设计三语言目录结构，建议：
   - `docs/en/`
   - `docs/zh_CN/`
   - `docs/ja/`
   - `docs/public/` 或 VitePress 约定的静态资源目录
4. 将英文 `.md` 正文迁移到 `docs/en/`，将 Sphinx `index.rst`/toctree 转换为 VitePress 首页、章节索引和 sidebar 配置。
5. 编写一次性或可重复运行的 `.po` 到 Markdown 转换脚本，把中文、日文翻译落到 `docs/zh_CN/` 与 `docs/ja/`。
6. 批量处理 Sphinx/MyST 专用语法：
   - `:doc:` 等 RST role
   - `.. note::` 等 directive
   - 指向 `.rst` 的链接
   - 图片和下载资源路径
   - MyST `colon_fence`、definition list 等语法差异
7. 配置 VitePress 多语言导航、侧边栏、站点标题、搜索、base 路径。用户/组织站点使用 `base: '/'`。
8. 新建 GitHub Pages workflow：安装 Node、`npm ci`、`npm run docs:build`、上传并部署 `docs/.vitepress/dist`。
9. 处理核心 URL 兼容：为首页、主要章节入口和可能外部引用的核心页面提供兼容入口或重定向页面。
10. 清理或归档 Sphinx 专用文件：`docs/source/conf.py`、`docs/requirements.txt`、`docs/Makefile`、`docs/make.ps1`、`docs/build_all_languages.py`、`.readthedocs.yaml`、`.github/workflows/docs-i18n.yml`。
11. 本地构建并检查三语言页面、导航、图片、下载链接、搜索和 GitHub Pages 产物。

## 验收标准

- `cd docs && npm install` 后可使用 `npm run docs:dev` 本地预览。
- `cd docs && npm run docs:build` 成功生成静态站点。
- 英文、中文、日文首页和主要章节均可访问。
- VitePress 侧边栏覆盖原 Sphinx `toctree` 中的主要章节。
- 图片、静态下载资源和主要跨文档链接可正常打开。
- GitHub Actions 能发布到 GitHub Pages。
- 核心旧入口链接有明确兼容策略并通过抽样验证。
- 仓库说明不再引导用户使用过时的 Sphinx 构建流程。

## 风险与依赖

- `.po` 到 Markdown 的转换质量是最大风险：翻译可能包含未翻译条目、模糊条目、RST/MyST 标记或分段顺序差异。
- VitePress 与 MyST/Sphinx Markdown 方言不完全一致，需要处理 directive、role、definition list 和 admonition。
- 旧链接兼容无法完全自动化，必须先确认高价值页面清单。
- GitHub 用户/组织站点要求仓库名和 Pages 设置与 `https://<user>.github.io/` 发布形态匹配。
- 如果当前文档中存在大量相对路径资源，迁移后需要集中验证图片、附件和下载链接。
