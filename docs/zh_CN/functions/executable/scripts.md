# 运行脚本

运行脚本按键在按下时会在 shell 中执行用户自定义的命令。

![1744946054119](/image/scripts/1744946054119.png)

## 在 FlexDesigner 中

要执行的命令可以在 FlexDesigner 的功能选项卡中定义（可以为单行命令）。在文本编辑器中输入命令，每行一条。可以通过拖动文本编辑器右下角的虚线三角图标来调整编辑器的大小。输入框右侧有一个测试运行按钮，允许在将新配置文件上传到 Flexbar 之前，直接在电脑上进行测试运行。测试运行应与在 Flexbar 上按下按键时的操作效果一致。

在 Windows 平台下，也支持 PowerShell 命令。

![1744713170717](/image/scripts/1744713170717.png)

## 在 Flexbar 上

按下按键即可执行在 FlexDesigner 中定义的命令。

## 示例

### 打开应用程序的新实例

``open -n /Applications/KiCad/KiCad.app``（macOS）

### 在指定的网页浏览器中打开网页

``open /Applications/Firefox.app --args www.eniacelec.com``（macOS）

## 技术细节

在底层，脚本的执行是通过 Node.js 的 `spawn` 函数实现的。命令会通过以下方式执行：
- macOS 下为 `/bin/sh`
- Windows 下为 `cmd.exe`

这意味着，只要是在这些环境下可用的 shell 命令，都可以通过 Flexbar 执行。
