# Flexbar 快速入门指南

![1743993324834](/image/getting_started/1743993324834.png)

## 什么是 Flexbar？

Flexbar 是您的多功能、完全可自定义的快捷键管理系统。它代表了一种新型的快捷键键盘，配备了多功能按键，能够执行通常需要复杂鼠标和键盘操作的任务。从简单的命令如发送 Ctrl+Z，到难以记忆的复杂专业软件快捷键——一旦设置完成，Flexbar 可以轻松处理它们。与传统键盘不同，Flexbar 甚至可以执行普通键盘无法执行的操作，如插入整个文本段落、表情符号，甚至 GIF 动图，所有这些都可以通过单次触摸实现。其便捷的分层页面和滚动功能让您可以配置无数个按钮。此外，还有更多功能等待您的探索。

**Flexbar = 键盘 + 鼠标 + 更多**

## 我可以在哪里使用 Flexbar？

如您所见，Flexbar 设计为纤薄的触摸屏条，非常适合放置在键盘或显示器上方或下方，适用于笔记本电脑和台式机。随附的磁性支架允许您在任何方便的地方以舒适的角度定位它，通过其重量增加稳定性。

![1743982169966](/image/getting_started/1743982169966.png)

> The detachable angled stand includes built-in magnets that attach securely to the middle of Flexbar’s back panel. Note that the Flexbar itself doesn't contain magnets.
>
> Included silicone pads can optionally be placed at both ends on the back of the Flexbar, improving friction on smooth surfaces and protecting your laptop’s finish.

## 检查您的配件

您的包装应包含以下物品：

- Flexbar
- Type-C 转 Type-C 数据线
- 磁性底座

## 将 Flexbar 连接到您的设备

使用提供的 USB Type-C 数据线（或任何能够进行数据传输的 USB 线，无论连接器类型如何）将您的 Flexbar 连接到您的设备。Flexbar 只需要基本的 USB 2.0 数据通信和 500mA 以下的 5V 电源。理论上，任何支持外部 USB 键盘和鼠标的设备都可以使用 Flexbar，包括但不限于 PC、iPad 等平板电脑、智能手机和工业控制主机。

> Flexbar 的初始配置需要支持 FlexDesigner 软件的设备（Windows、Mac、Linux）。一旦配置并上传，按钮配置将存储在 Flexbar 本身，允许它在不同设备之间自由移动。（仅限于基本键盘/鼠标快捷键。）

## 首次使用 Flexbar 和 FlexDesigner

Flexbar 预装了一个简单的教程来帮助您入门。之后，您可以使用我们的桌面软件 [FlexDesigner](https://eniacelec.com/pages/software) 自定义您自己独特的快捷键配置文件，并将它们上传到您的 Flexbar。

![1743993683833](/image/getting_started/1743993683833.png)

To help you quickly get started, a factory-default profile without the tutorial is also available [factory.flexbar](/assets/factory-v1.flexbar). Additional profiles and functional key sets are provided on our online platform [FlexGate](https://flexgate.enilinx.com/), where you can freely download, import, and kickstart your shortcut journey.

> Due to its multifunctional nature, we strongly recommend thoroughly reading the [FlexDesigner documentation](./flexdesigner/getting_started).
>
> 配置文件中的单个页面可以单独导出和导入，允许您只使用需要的部分。

## 支持

### GitHub

我们建议将错误或功能请求提交到我们的 [GitHub 仓库](https://github.com/ENIAC-Tech/FlexDesigner/issues)，您可以在那里轻松跟踪它们的进度。

### 社区

我们强烈鼓励您加入我们的 [Discord 社区](https://discord.com/invite/7STSjmBpKT)，您可以在那里与许多 Flexbar 用户讨论和分享经验。这也是接收官方支持的最快和最直接的方式。

### 电子邮件

当然，您也可以通过电子邮件联系我们，我们通常在 48 小时内回复。

`contact@eniacelec.com`

## 术语

### FlexDesigner

[下载](https://eniacelec.com/pages/software)

FlexDesigner 是我们提供的用于自定义 Flexbar 功能、软件更新和支持高级功能的软件。适用于 Windows、Mac 和 Linux，它不会影响您在未安装 FlexDesigner 的设备上使用基本键盘和鼠标功能的能力。

> Visit the [FlexDesigner documentation](./flexdesigner/getting_started) to learn how to customize your Flexbar

### 配置文件

配置文件包含通过 FlexDesigner 配置的所有按键外观、功能和页面逻辑，用于在 Flexbar 上显示。配置文件可以共享和编辑，并通过 FlexDesigner 上传到兼容的 Flexbar 设备，但无法从 Flexbar 下载回您的计算机。

> Factory profile download: [factory.flexbar](/assets/factory-v1.flexbar)
>
> *请注意，出厂配置文件仅用于演示目的，某些功能可能与您的计算机不兼容*

### 按键

在 Flexbar 上显示的小型方形功能组件称为"按键"。根据其特定功能，并非所有按键都必然执行交互式"按钮式"操作。

> [Add your first key to Flexbar](./flexdesigner/getting_started)

### 固件

固件 refers to the embedded software written into Flexbar’s internal microcontroller, pre-installed at the factory. Updates to firmware are prompted via FlexDesigner when available. We recommend regularly updating to ensure access to the latest features and improved stability. 固件 can also be manually rolled back or updated in special cases—details available at [firmware documention](troubleshoting/firmware).

### FlexGate

[FlexGate](https://flexgate.enilinx.com/) is our official platform dedicated to sharing profiles and plug-ins for Flex series products. Users can upload and download pre-configured shortcut sets. Officially provided sets are also available for convenience. After downloading, you can freely combine or edit them via FlexDesigner’s page import/export functions and integrate them into your Flexbar 配置文件.

[How to use FlexGate](./troubleshoting/flexgate)

### 插件

插件系统是一个开源软件平台，旨在允许开发者和有额外需求的用户创建新功能并将其集成到 Flexbar 中。用户可以独立开发和运行功能，与内置功能并行，可选择在 FlexGate 平台上共享他们的创作供社区使用。

> Check out the [SDK documentation](sdk/) to learn how to create custom plugins

## 常见问题

**问：** **为什么 flexbar 在 iPad 上不工作？**

**答：** 在 iPad 上，只支持不需要 FlexDesigner 运行的基本键盘、鼠标和文本输入功能。

**问：** **为什么 Flexbar 按键被称为"keys"而不是"buttons"？**

**答：** 因为我们将 Flexbar 定义为专门的触摸屏键盘，而不是"按钮板"。

**问：** **当 Flexbar 本身不灵活时，为什么它被称为"Flex"？**

**A:** Although physically rigid, Flexbar’s functionality is highly flexible, hence the name "Flexbar".

**问：** **为什么没有无线版本？**

**答：** 由于为笔记本电脑兼容性而设计的大小限制，Flexbar 已经尽可能紧凑。使用当前的电池技术，为这种尺寸的屏幕实现合理的电池续航时间尚不可行。然而，我们继续研究新的形式和可能性，可能包括未来的无线版本。

**问：** **什么是 ENIAC？**

**答：** ENIAC（电子数值积分器和计算机）是世界上第一台数字电子通用计算机。1954 年使用真空管和继电器建造，重达数吨，性能约为现代便携式计算器的一半。这也是我们创始人长期使用的在线化名。

**问：** **Flexbar 或 Flex 系列是开源的吗？**

**答：** 我们是一个希望开源我们工作的小型开发团队，但商业考虑阻止了立即完全开源。目前，我们为用户提供开源插件系统来自定义 Flexbar 功能，并与开源社区密切合作。更多组件可能在未来逐渐开源，可能还会发布完全开源的产品。

**问：** **2D/3D 模型？**

**答：** 我们提供详细的 3D 参考文件，详细说明 Flexbar 的尺寸和磁性位置，供您方便使用。

[flexbar.dwg](/assets/flexbar.dwg)

[flexbar.stp](/assets/flexbar.stp)

## 下一步

- Check out the [SDK documentation](sdk/getting_started) to learn how to create custom plugins
- Explore the [Functions documentation](functions/) to see what you can do with Flexbar
- Visit the [FlexDesigner documentation](flexdesigner/getting_started) to learn how to customize your Flexbar
