# Flexbar 连接故障排除

如果 FlexDesigner 无法识别您的 Flexbar，请按照以下步骤识别并解决问题。

## 验证计算机识别

Flexbar 不需要额外的 USB 驱动程序，连接时应该自动识别。通过以下方式验证：

### 方法 1：测试 Flexbar 功能

1. **Access the Home Screen**:
   Press the "🏠" icon on the far left of Flexbar
   ![主页按钮](/image/cannot_connect/1746349468296.png)
2. **Test Device Functions**:
   Rotate the volume wheel or press media control buttons and observe your computer's response
   ![功能测试](/image/cannot_connect/1746349473776.png)

如果您的计算机音量发生变化或媒体控制有响应，您的系统已成功识别 Flexbar。

### 方法 2：检查系统设备管理器

#### Windows

1. 打开设备管理器
2. 在观看设备列表时连接和断开 Flexbar
3. 如果设备出现或消失，您的系统已识别 Flexbar

#### macOS

1. 点击左上角的 Apple 菜单 → 选择"关于本机"
2. 点击"系统报告"进入系统信息
3. 在硬件部分选择"USB"
4. 在 USB 设备列表中查找 Flexbar

### 计算机无法识别 Flexbar？

尝试这些解决方案：

- 更换 USB 端口（最好使用内置计算机端口）
- 避免通过 USB 集线器或扩展坞连接
- 尝试使用 USB-A 转 USB-C 数据线

## 计算机识别 Flexbar 但无法连接到 FlexDesigner

### 解决方案 1：重启设备

重启您的计算机和 FlexDesigner 是解决大多数连接问题的最简单和最有效的方法。

### 解决方案 2：重新安装 FlexDesigner

从[官方网站](https://eniacelec.com/pages/software)下载并重新安装最新软件。

### 解决方案 3：切换 USB 协议

在极少数情况下，您的系统可能在使用特定协议与 Flexbar 通信时遇到问题。Flexbar 支持 HID 和 CDC USB 协议。要在它们之间切换：

1. **Enter Safe Mode**:
   During startup, click the "Enter SafeMode" button on the left side of the LOGO screen
   ![安全模式入口](/image/safemode/1743991368473.png)
2. **Access Settings**:
   Click the gear icon on the far right of Flexbar
   ![设置按钮](/image/safemode/1743991410209.png)
3. **Switch USB Mode**:
   Press button 6 to toggle between CDC and HID modes
   ![1746499904730](/image/cannot_connect/1746499904730.png)
4. **重新连接 Flexbar**

## Linux USB 权限问题

如果您使用 Linux 并遇到"无法访问 USB 设备，这可能是由于权限问题"，请按照以下步骤操作：

1. **创建 udev 规则**通过在终端中运行以下命令：
   ```bash
   echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="303a", ATTRS{idProduct}=="82bd", MODE="0666", GROUP="plugdev"
   SUBSYSTEM=="hidraw", ATTRS{idVendor}=="303a", ATTRS{idProduct}=="82bd", MODE="0666", GROUP="plugdev"
   SUBSYSTEM=="usb", ATTRS{idVendor}=="303a", ATTRS{idProduct}=="82bf", MODE="0666", GROUP="plugdev"
   SUBSYSTEM=="tty", ATTRS{idVendor}=="303a", ATTRS{idProduct}=="82bf", MODE="0666", GROUP="plugdev"' > /tmp/99-flexbar.rules
   sudo cp /tmp/99-flexbar.rules /etc/udev/rules.d/99-flexbar.rules
   ```

2. **根据需要调整用户或用户组**

   某些发行版（包括部分基于 Arch 的发行版）可能没有 `plugdev` 用户组。如果创建设备规则后仍然无法访问设备，请编辑 `/etc/udev/rules.d/99-flexbar.rules`，并将所有 `GROUP="plugdev"` 替换为 `OWNER="<your-linux-username>"`，例如 `OWNER="alex"`。

3. **重新加载 udev 规则**，运行以下命令：
   ```bash
   sudo udevadm control --reload-rules
   sudo udevadm trigger
   ```

4. **断开并重新连接您的设备**

5. **重启应用程序**

## MacOS USB Permission Issues

如果您使用的是 MacOS，请确保已在系统设置中允许配件连接。

您可以参考[苹果官方文档](https://support.apple.com/en-us/102282)以获取更多信息。


## 仍然有问题？

如果上述方法无法解决您的问题，请发送电子邮件至 contact@eniacelec.com。我们的技术支持团队将及时联系您以帮助解决问题。
