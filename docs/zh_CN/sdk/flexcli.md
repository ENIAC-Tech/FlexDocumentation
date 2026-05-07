# FlexCLI工具文档

本文档提供了与插件和FlexDesigner交互的CLI工具的概述和使用指南。该工具提供各种管理插件的命令，如链接、重启、调试、安装和卸载插件。它还支持创建插件项目和验证插件结构。

## 安装

### 前置要求

- Node.js 18或更高版本
- FlexDesigner 1.0.0或更高版本。

### 设置

通过运行以下命令安装FlexDesigner CLI工具。

```
npm install -g @eniactech/flexcli
```

## 命令

### `plugin link`

将插件链接到FlexDesigner。

#### 选项：

- `--path &lt;path&gt;`: Path to the plugin directory (required)
- `--uuid &lt;uuid&gt;`: UUID of the plugin (required)
- `--debug &lt;debug&gt;`: Enable or disable debug mode (default: false)
- `--skip-validate`：跳过验证步骤（默认：false）
- `--force`：强制覆盖现有插件（默认：false）
- `--start &lt;start&gt;`: Whether to start the plugin after linking (default: true)

#### 描述：

此命令通过指定路径和UUID将插件链接到FlexDesigner。它还提供启用调试模式、跳过验证、强制覆盖和链接后启动插件的选项。

---

### `plugin restart`

重启插件。

#### 选项：

- `--uuid &lt;uuid&gt;`: UUID of the plugin to restart (required)

#### 描述：

此命令使用提供的UUID重启插件。

---

### `plugin unlink`

从FlexDesigner取消链接插件。

#### 选项：

- `--uuid &lt;uuid&gt;`: UUID of the plugin to unlink (required)
- `--silent`：静默模式运行，无输出（默认：false）

#### 描述：

此命令使用指定的UUID从FlexDesigner取消链接插件。

---

### `plugin debug`

调试插件。

#### 选项：

- `--uuid &lt;uuid&gt;`: UUID of the plugin to debug (required)

#### 描述：

此命令用于使用UUID调试插件。它连接到插件并提供调试信息。

---

### `plugin list`

列出所有已安装的插件。

#### 描述：

此命令列出FlexDesigner中当前安装的所有插件。

---

### `plugin pack`

将插件打包成`.flexplugin`文件。

#### 选项：

- `--path &lt;path&gt;`: Path to the plugin directory (required)
- `--output &lt;output&gt;`: Output path for the `.flexplugin` file
- `--skip-validate`：跳过验证（默认：false）

#### 描述：

此命令将插件打包成`.flexplugin`文件，提供指定输出路径和跳过验证的选项。

---

### `plugin install`

从`.flexplugin`文件安装插件。

#### 选项：

- `--path &lt;path&gt;`: Path to the `.flexplugin` file (required)
- `--force`：强制安装（默认：false）

#### 描述：

此命令使用`.flexplugin`文件安装插件。如果文件扩展名不是`.flexplugin`，将显示错误。`--force`选项允许强制安装。

---

### `plugin uninstall`

卸载插件。

#### 选项：

- `--uuid &lt;uuid&gt;`: UUID of the plugin to uninstall (required)

#### 描述：

此命令使用指定的UUID卸载插件。

---

### `plugin validate`

验证插件的结构和清单。

#### 选项：

- `--path &lt;path&gt;`: Path to the plugin directory (required)

#### 描述：

此命令验证插件目录及其清单，确保它遵循正确的结构。

---

### `plugin create`

创建基本插件工作空间。

#### 描述：

此命令为新插件创建基本工作空间，允许您指定插件路径、名称、版本、作者、描述和仓库URL等详细信息。

它将提示您输入以下信息：

- 插件路径
- 插件名称
- 作者名称
- 反向域名UUID（例如，`com.author.myplugin`）
- 版本（格式为`x.y.z`）
- 描述
- 仓库URL

创建的工作空间将使用提供的信息进行初始化。

---

### `plugin kill`

终止插件线程。

#### 描述：

此命令终止FlexDesigner中的插件线程

---

## 通用选项

- `--port &lt;number&gt;`: Specifies the WebSocket server port (default: 60109)

---

## 使用示例

链接插件：

```bash
flexcli plugin link --path /path/to/plugin --uuid com.example.plugin --debug true
```

重启插件：

```bash
flexcli plugin restart --uuid com.example.plugin
```

列出所有插件：

```bash
flexcli plugin list
```

创建新的插件工作空间：

```bash
flexcli plugin create
```
