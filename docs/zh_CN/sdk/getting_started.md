# 快速开始

按照本文档创建并运行FlexDesigner插件。

## 插件架构

FlexDesigner插件由两部分组成：前端和后端。

#### 前端

前端使用[vue3](https://vuejs.org/)和[Vuetify3](https://vuetifyjs.com/en/)构建，在Chromium环境中运行。通过window对象与FlexDesigner通信。

#### 后端

后端使用JavaScript编写，在Node.js中运行。通过WebSocket与FlexDesigner通信。

## 前置要求

要开发FlexDesigner插件，您需要：

- Node.js 18或更高版本
- FlexDesigner v1.0.0或更高版本
- 一个Flexbar
- 一个代码编辑器（我们推荐VS Code）

> We recommend using nvm to install and manage your Node.js environment.
> [nvm for MacOS](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
> [nvm for Windows](https://github.com/coreybutler/nvm-windows/releases)

## 获取SDK

使用Flex CLI安装和配置SDK。

### 安装FlexCLI

运行：

`npm install -g @eniac/flexcli`

This installs FlexCLI in your development environment. After installation, run `flexcli` in your terminal to ensure it’s correctly installed.

### 创建您的第一个插件

运行：

`flexcli plugin create`

然后按照提示提供所需的参数。

> 注意：如果您计划在我们的在线平台上分享您的插件，请确保提供正确的仓库链接，您的插件托管在该链接中。FlexDesigner将从该链接获取并更新您的插件。

成功创建后，您的工作空间将如下所示：

```
│  .gitignore
│  package.json
│  rollup.config.mjs
│  
├─com.eniac.example.plugin
│  │  config.json
│  │  manifest.json
│  │  
│  ├─backend
│  ├─logs
│  ├─resources
│  └─ui
└─src
    plugin.js
```

#### com.`<author>`.`<name>`.plugin

此文件夹是您的插件目录。如果您在GitHub上托管插件，它必须位于根级别；否则，FlexDesigner无法识别它。

- **config.json**：存储需要持久化的数据，如用户账户详情和插件配置
- **manifest.json**: Describes your plugin’s information
- **backend**：包含编译后的后端脚本
- **logs**：日志文件的默认位置
- **resources**：资源（如图像）的默认位置
- **ui**: Holds the plugin’s frontend files

#### src

此目录包含您的后端代码，它在Node.js中作为子进程运行，并通过WebSocket与FlexDesigner通信。

## 首次运行

确保FlexDesigner正在运行，然后执行：

```
npm run build
npm run dev
```

This automatically compiles, bundles, and installs your plugin. You should then see your plugin in FlexDesigner’s Key Library:

![1742308777216](/image/getting_started/1742308777216.png)

您在插件中进行的任何更改都会自动与FlexDesigner同步。

Congratulations! You’ve successfully created and run your first plugin.

如需进一步开发，您可以参考示例插件：

- [示例](https://github.com/ENIAC-Tech/Plugin-Example) – 展示所有支持的功能和API
- [屏幕镜像](https://github.com/ENIAC-Tech/Plugin-ScreenMirror) – 将屏幕的特定区域镜像到Flexbar
