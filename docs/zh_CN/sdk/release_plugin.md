# 发布您的插件

本指南说明如何发布您的插件。

## GitHub Actions

使用`flexcli`创建的插件预配置了GitHub Actions。要发布您的插件，只需将代码推送到GitHub仓库并创建Release。注意，您的Release Tag必须与`manifest.json`文件中指定的插件版本匹配。GitHub CI将自动编译并将`*.flexplugin`文件发布到Release资源中。

然后您可以分享`*.flexplugin`文件或GitHub仓库链接，供用户在按键库中导入插件。

### 多平台支持

在某些情况下，不同的操作系统可能需要不同的后端程序。

您可以修改GitHub Actions以以下格式打包您的插件：

 `xxx.&lt;OS NAME&gt;.&lt;ARCH&gt;.flexplugin`

其中OS NAME支持`win32, darwin, linux`；ARCH支持`x64, arm64`。ARCH段是可选的，可以省略。

FlexDesigner将自动查找并安装适当的插件后端。如果找不到具有所需命名格式的文件，它将使用遇到的第一个.flexplugin文件。

## 提交到FlexGate

如果您想与更广泛的受众分享您的插件，可以将其发布到FlexGate。

See [Uploading Plugins to FlexGate](../troubleshoting/flexgate)
