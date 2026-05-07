# 文档术语表（Glossary）

本文档从 `docs/source` 英文正文归纳，供翻译与审校统一用字。**产品名与品牌**建议全文一致：要么保留英文，要么统一为一种日文表记，勿混用。

---

## 产品与品牌（Flex / ENIAC）

| 术语（建议保留或统一译法） | 说明 |
|---------------------------|------|
| **Flexbar** | 硬件设备名称。 |
| **FlexDesigner** | 桌面配套软件（配置、上传、高级功能）。 |
| **Flexbar Designer** | 文档在「虚拟 Flexbar」编辑界面语境下出现；与 **FlexDesigner** 为同一套软件中的设计视图。翻译前请与 **FlexDesigner** 统一策略。 |
| **FlexGate** | 在线分享平台（Profile、Iconpack、Page、Plugin 等）。 |
| **FlexCLI** / **`flexcli`** | 命令行工具（插件工程、链接、打包等）。 |
| **FlexPlugin** / **`.flexplugin`** | 插件包格式与扩展名。 |
| **FlexDesigner SDK** / **FlexPlugin SDK** | 文档中并用的 SDK 称呼（如 `sdk/index.rst` 为 FlexPlugin SDK）。 |
| **FlexLink** | Adobe 侧 CEP 扩展（如 `com.eniac.FlexLink-1.0`）。 |
| **FlexLink Mod** | Minecraft 模组（Inventory Monitor 用）。 |
| **Flex series** / **Flex series products** | 产品系列表述。 |
| **ENIAC** / **ENIAC-Tech** / **EniacTech** | 版权与组织名（文档中多种写法并存）。 |

---

## 文档与项目

| 术语 | 说明 |
|------|------|
| **FlexDocumentation** | 本仓库文档项目名（见 `source/conf.py`）。 |

---

## 功能与界面用语

| 术语 | 说明 |
|------|------|
| **In the FlexDesigner** | 固定章节：在软件内配置。 |
| **On the Flexbar** | 固定章节：在设备上使用。 |
| **Key Library** | 右侧按键库。 |
| **Profile** | 整套按键/页面配置。 |
| **Iconpack** | 图标包（FlexGate 用语）。 |
| **Pages** / **Page** | 页面树结构中的页面（类文件夹层级）。 |
| **Home** | 默认起始页名。 |
| **Virtual Flexbar** | 软件内虚拟设备。 |
| **Real Flexbar** | 实体设备。 |
| **Safe Mode** | 安全模式（排障、固件更新流程）。 |
| **Flexbar Setting** | 设备设置类功能名（见导航相关文档）。 |
| **Flexbar Sleep** | 设备休眠类按键名。 |
| **sticker pack** | 贴纸包。 |
| **Inventory Monitor** | Minecraft 库存监视功能名。 |

---

## 文件与技术

| 术语 | 说明 |
|------|------|
| **`manifest.json`** | 插件清单。 |
| **`factory.flexbar`** | 出厂/示例配置包文件名。 |
| **WebSocket** | 插件后端与 FlexDesigner 通信。 |
| **HID** / **CDC** | USB 协议（连接排障）。 |
| **DDC/CI** | 显示器控制协议（显示器电源/亮度等按键）。 |
| **DirectDraw** | 插件 `keyType` 等 API 用语。 |

---

## 第三方与集成

| 术语 | 说明 |
|------|------|
| **OBS Studio** | 流媒体软件。 |
| **AIDA64** | 性能图表可选数据源。 |
| **Adobe** / **CEP** / **UXP** | Adobe 集成与框架说明。 |
| **ExtendScript** | Adobe 时间线相关。 |
| **Minecraft** / **Forge** | 模组与版本说明。 |
| **GitHub** | 插件托管与示例仓库。 |
| **Vue 3** / **Vuetify 3** / **Chromium** / **Node.js** / **Electron** | 插件技术栈。 |

---

## 示例插件名（宜保持英文）

- **ScreenMirror** 及文档中的 **Example** 等仓库名，一般作为专有名词保留。

---

## 维护说明

- 新增英文文档中的产品名或固定 UI 字符串时，请同步更新本表。
- 日语 PO 翻译时，可对照本表在 `msgstr` 中保持与之一致的表记。
