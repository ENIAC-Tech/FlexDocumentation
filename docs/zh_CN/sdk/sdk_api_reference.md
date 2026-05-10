# FlexDesigner SDK

用于开发 FlexDesigner 插件的综合 SDK，提供与 Flexbar 设备的无缝集成和丰富的交互功能。

## 安装

### 前置要求

- Node.js 版本 20 或更高
- FlexDesigner 版本 1.0.0 或更高。

### 设置

将 FlexDesigner SDK 添加到您的项目

> 在典型情况下，您只需要使用 `flexcli` 创建插件项目，FlexDesigner SDK 将自动安装。

```bash
npm install @eniactech/flexdesigner-sdk
```

## 快速开始

```javascript
const { plugin, logger, pluginPath, resourcesPath } = require("@eniactech/flexdesigner-sdk")

// Start the plugin
plugin.start()

// Handle plugin events
plugin.on('plugin.alive', (payload) => {
    logger.info('Plugin loaded:', payload)
})

plugin.on('plugin.data', (payload) => {
    logger.info('User interaction:', payload)
    return 'Response from plugin backend!'
})
```

## 核心概念

### 插件生命周期

1. **初始化**：插件启动并连接到 FlexDesigner
2. **活跃事件**：当按键加载并准备就绪时触发
3. **数据事件**：当用户与按键交互时触发
4. **配置**：插件可以读取/写入配置数据

### 按键类型

- **标准按键**：基本按钮功能
- **多状态按键**：在不同状态之间循环
- **滑块按键**：连续值调整
- **动态按键**：动态管理的按键集合
- **滚轮按键**：旋转编码器支持

## API 参考

### 内置模块

为了简化插件开发过程，我们预集成了几个可以直接使用的模块：

1. [@napi-rs/canvas](https://www.npmjs.com/package/@napi-rs/canvas)
2. [express](https://www.npmjs.com/package/express)
3. [axios](https://www.npmjs.com/package/axios)

> 如果您需要集成其他模块，请告诉我们

### 核心插件 API

#### plugin.start()

启动 WebSocket 连接并初始化插件。

```javascript
plugin.start()
```

#### plugin.on(event, handler)

为特定事件注册事件处理器。

**参数：**

- `event` (string)：事件类型
- `handler` (function)：事件处理函数

```javascript
plugin.on('plugin.data', (payload) => {
    const { data, serialNumber } = payload
    logger.info('Key pressed:', data.key.title)
    return { status: 'success', message: 'Key handled!' }
})
```

#### plugin.off(event)

注销事件处理器。

```javascript
plugin.off('plugin.data')
```

### 绘图和视觉更新

#### plugin.draw(serialNumber, key, type?, base64?)

更新按键的视觉外观。

**参数：**

- `serialNumber`（字符串）：设备序列号
- `key`（对象）：事件中获取的按键信息对象
- `type`（字符串）：'draw'（默认）或 'base64'
- `base64`（字符串）：Base64 图片数据（当 type 为 'base64' 时）

```javascript
// Update key based on key.style properties
plugin.draw(serialNumber, key, 'draw')

// Draw custom image
const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'
plugin.draw(serialNumber, key, 'base64', base64Image)
```

### 按键状态管理

#### plugin.setMultiState(serialNumber, key, state, message?)

设置多状态按键的当前状态。

**参数：**

- `serialNumber`（字符串）：设备序列号
- `key`（对象）：按键对象
- `state`（数字）：目标状态索引
- `message`（字符串，可选）：显示的消息内容

```javascript
plugin.setMultiState(serialNumber, key, 2, 'State Changed')
```

#### plugin.setSlider(serialNumber, key, value)

设置滑动条按键的数值。

**参数：**

- `serialNumber`（字符串）：设备序列号
- `key`（对象）：按键对象
- `value`（数字）：滑动条的数值

```javascript
plugin.setSlider(serialNumber, key, 75)
```

### Device Configuration & Control

#### plugin.sendControlCommand(serialNumber, command)

Sends control commands to the device

**参数：**

- `serialNumber`（字符串）：设备序列号
- `command` (string): The command to send. One of the following:
    - "sys.sleep": Put the device to sleep
    - "sys.wake": Wake up the device
    - "haptic.click": Trigger a click vibration

```javascript
plugin.sendControlCommand(serialNumber, 'sys.sleep') // Put the device to sleep
plugin.sendControlCommand(serialNumber, 'sys.wake') // Wake up the device
plugin.sendControlCommand(serialNumber, 'haptic.click') // Trigger a click vibration
```



#### plugin.setDeviceConfig(serialNumber, config)

配置设备设置。

**参数：**

- `serialNumber`（字符串）：设备序列号
- `config`（对象）：配置对象

```javascript
plugin.setDeviceConfig(serialNumber, {
    sleepTime: 1000,
    brightness: 100,
    screenFlip: true,
    vibrate: 'full',
    autoSleep: true,
    deviceName: 'My Flexbar',
    cdcMode: true,
    color: 'space black'
})
```

### 消息与通知

#### plugin.showFlexbarSnackbarMessage(serialNumber, msg, level, icon?, timeout?, waitUser?)

在 Flexbar 设备上显示一条消息。

**参数：**

- `serialNumber`（字符串）：设备序列号
- `msg`（字符串）：消息内容（最多 64 个字符）
- `level`（字符串）：消息级别（'info'、'warning'、'error'、'success'）
- `icon`（字符串，可选）：图标名称
- `timeout`（数字，可选）：显示时长（毫秒，500-10000，默认 2000）
- `waitUser`（布尔值，可选）：是否等待用户交互

```javascript
plugin.showFlexbarSnackbarMessage(
    serialNumber, 
    'Hello from plugin!', 
    'info', 
    'bell', 
    3000
)
```

#### plugin.showSnackbarMessage(color, message, timeout?)

在 FlexDesigner 应用程序中显示一条消息。

```javascript
plugin.showSnackbarMessage('success', 'Operation completed!', 3000)
```

### 系统集成

#### plugin.electronAPI(api, ...args)

调用 Electron API 以实现系统集成。

**支持的 API：**

- `dialog.showOpenDialog`
- `dialog.showSaveDialog`
- `dialog.showMessageBox`
- `dialog.showErrorBox`
- `app.getAppPath`
- `app.getPath`
- `screen.getCursorScreenPoint`
- `screen.getPrimaryDisplay`
- `screen.getAllDisplays`

```javascript
// Show file dialog
const result = await plugin.electronAPI('dialog.showOpenDialog', {
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['png', 'jpg'] }]
})

// Get cursor position
const cursorPos = await plugin.electronAPI('screen.getCursorScreenPoint')
```

### 文件操作

#### plugin.openFile(path)

从文件系统读取文件。

```javascript
const content = await plugin.openFile('/path/to/file.txt')
```

#### plugin.saveFile(path, data)

将数据保存到文件。

```javascript
await plugin.saveFile('/path/to/output.txt', 'Hello World!')
```

### 应用信息

#### plugin.getAppInfo()

获取 FlexDesigner 应用程序的信息。

```javascript
const appInfo = await plugin.getAppInfo()
// Returns: { version: "v1.0.0", platform: "win32" }
```

#### plugin.getOpenedWindows()

获取系统中已打开窗口的列表。

```javascript
const windows = await plugin.getOpenedWindows()
windows.forEach(win => {
    console.log(`Window: ${win.title} (${win.bounds.width}x${win.bounds.height})`)
})
```

#### plugin.getDeviceStatus()

获取已连接设备的状态。

```javascript
const devices = await plugin.getDeviceStatus()
devices.forEach(device => {
    console.log(`Device: ${device.serialNumber}, Status: ${device.status}`)
})
```

### 配置管理

#### plugin.getConfig()

获取插件配置。

```javascript
const config = await plugin.getConfig()
console.log('Current config:', config)
```

#### plugin.setConfig(config)

更新插件配置。

```javascript
await plugin.setConfig({ theme: 'dark', autoUpdate: true })
```

### 性能监控

#### plugin.sendChartData(chartDataArray)

发送性能指标数据，在 FlexDesigner 中进行展示。

**参数：**

- `chartDataArray`（数组）：图表数据对象数组

```javascript
plugin.sendChartData([
    {
        label: 'CPU Usage',
        value: 45.2,
        unit: '%',
        baseUnit: '%',
        baseVal: 45.2,
        maxLen: 2,
        category: 'system',
        key: 'cpu'
    },
    {
        label: 'Memory',
        value: 2.1,
        unit: 'GB',
        baseUnit: 'MB',
        baseVal: 2048,
        maxLen: 3,
        category: 'system',
        key: 'memory'
    }
])
```

### 快捷键管理

#### plugin.updateShortcuts(shortcuts)

注册或注销键盘快捷键。

**参数：**

- `shortcuts`（数组）：快捷键信息对象数组

```javascript
plugin.updateShortcuts([
    {
        shortcut: 'CommandOrControl+F1',
        action: 'register'
    },
    {
        shortcut: 'CommandOrControl+F2',
        action: 'unregister'
    }
])
```

## 动态按键管理

`plugin.dynamickey` 对象提供了高级的按键管理能力。

### plugin.dynamickey.clear(serialNumber, key)

移除容器中的所有动态按键。

```javascript
plugin.dynamickey.clear(serialNumber, key)
```

### plugin.dynamickey.add(serialNumber, key, index, backgroundType, backgroundData, width, userData)

添加一个新的动态按键。

**参数：**

- `index`（数字）：插入按键的位置
- `backgroundType`（字符串）：'base64' 或 'draw'
- `backgroundData`（字符串）：图片数据或按键对象
- `width`（数字）：按键宽度（像素，60-1000）
- `userData`（对象）：与按键关联的自定义数据

```javascript
plugin.dynamickey.add(
    serialNumber, 
    key, 
    0, 
    'base64', 
    'data:image/png;base64,iVBORw0...', 
    200, 
    { name: 'Dynamic Key 1', action: 'custom' }
)
```

### plugin.dynamickey.remove(serialNumber, key, index)

移除指定索引位置的动态按键。

```javascript
plugin.dynamickey.remove(serialNumber, key, 2)
```

### plugin.dynamickey.move(serialNumber, key, srcIndex, dstIndex)

将动态按键从一个位置移动到另一个位置。

```javascript
plugin.dynamickey.move(serialNumber, key, 0, 3)
```

### plugin.dynamickey.setWidth(serialNumber, key, width)

更改动态按键容器的宽度。

```javascript
plugin.dynamickey.setWidth(serialNumber, key, 800)
```

### plugin.dynamickey.draw(serialNumber, key, index, backgroundType, backgroundData, width)

更新指定动态按键的视觉外观。

```javascript
plugin.dynamickey.draw(
    serialNumber, 
    key, 
    1, 
    'base64', 
    'data:image/png;base64,iVBORw0...', 
    200
)
```

### plugin.dynamickey.update(serialNumber, key, index, userData)

更新动态按键的用户数据。

```javascript
plugin.dynamickey.update(serialNumber, key, 0, { status: 'updated' })
```

### plugin.dynamickey.refresh(serialNumber, key)

刷新动态按键的显示（建议在宽度变更后调用）。

```javascript
plugin.dynamickey.refresh(serialNumber, key)
```

## 事件处理

### 插件事件

#### 'plugin.alive'

当按键加载完成并可交互时触发。

```javascript
plugin.on('plugin.alive', (payload) => {
    const { serialNumber, keys } = payload
  
    keys.forEach(key => {
        console.log(`Key loaded: ${key.cid} at position ${key.uid}`)
  
        // Initialize key based on its type
        if (key.cid === 'com.example.counter') {
            key.style.showTitle = true
            key.title = '0'
            plugin.draw(serialNumber, key, 'draw')
        }
    })
})
```

#### 'plugin.dead'

Triggered when plugin keys are destroyed

```javascript
plugin.on('plugin.dead', (payload) => {
    const { serialNumber, keys } = payload
  
    keys.forEach(key => {
        console.log(`Key destoried: ${key.cid}`)
    })
})
```


#### 'plugin.data'

当用户与按键交互时触发。

```javascript
plugin.on('plugin.data', (payload) => {
    const { serialNumber, data } = payload
    const key = data.key
  
    if (key.cid === 'com.example.button') {
        console.log('Button pressed!')
        return { status: 'success', message: 'Button handled' }
    }
  
    if (key.cid === 'com.example.slider') {
        console.log(`Slider value: ${data.value}`)
    }
})
```

#### 'plugin.config.updated'

当插件配置发生变化时触发。

```javascript
plugin.on('plugin.config.updated', (payload) => {
    console.log('Configuration updated:', payload.config)
})
```

### 系统事件

#### 'system.shortcut'

当注册的快捷键被按下时触发。

```javascript
plugin.on('system.shortcut', (payload) => {
    console.log(`Shortcut pressed: ${payload.shortcut}`)
})
```

#### 'system.actwin'

当活动窗口发生变化时触发。

```javascript
plugin.on('system.actwin', (payload) => {
    const { oldWin, newWin } = payload
    console.log(`Window changed: ${oldWin.title} -> ${newWin.title}`)
})
```

### 设备事件

#### 'device.status'

当设备连接状态发生变化时触发。

```javascript
plugin.on('device.status', (devices) => {
    devices.forEach(device => {
        if (device.status === 'connected') {
            console.log(`Device connected: ${device.serialNumber}`)
            // Configure the newly connected device
            plugin.setDeviceConfig(device.serialNumber, {
                brightness: 80,
                deviceName: 'My Plugin Device'
            })
        }
    })
})
```

### UI 事件

#### 'ui.message'

当收到来自插件 UI 的消息时触发。

```javascript
plugin.on('ui.message', async (payload) => {
    console.log('Message from UI:', payload)
  
    if (payload.action === 'test') {
        // Perform test operations
        await testAPIs()
        return 'Test completed!'
    }
  
    return 'Message received!'
})
```

#### 'ui.log'

处理来自插件 UI 的日志消息（自动处理）。

## 工具与辅助功能

### 日志记录器

SDK 提供了一个日志记录器实例，用于调试和监控。

```javascript
const { logger } = require("@eniactech/flexdesigner-sdk")

logger.info('Information message')
logger.warn('Warning message')
logger.error('Error message')
logger.debug('Debug message')
```

### 路径工具

访问插件专属路径。

```javascript
const { pluginPath, resourcesPath } = require("@eniactech/flexdesigner-sdk")

console.log('Plugin directory:', pluginPath)
console.log('Resources directory:', resourcesPath)
```

## 完整示例

以下是一个展示多种 SDK 功能的综合示例：

```javascript
const { plugin, logger, pluginPath } = require("@eniactech/flexdesigner-sdk")
const { createCanvas } = require('@napi-rs/canvas')

// Store key data
const keyData = {}

// Plugin lifecycle
plugin.start()

// Handle key loading
plugin.on('plugin.alive', (payload) => {
    const { serialNumber, keys } = payload
  
    keys.forEach(key => {
        keyData[key.uid] = key
  
        switch (key.cid) {
            case 'com.example.counter':
                // Initialize counter
                keyData[key.uid].counter = 0
                key.style.showTitle = true
                key.title = 'Click Me!'
                plugin.draw(serialNumber, key, 'draw')
                break
          
            case 'com.example.slider':
                // Set initial slider value
                plugin.setSlider(serialNumber, key, 50)
                break
          
            case 'com.example.dynamic':
                // 设置 dynamic keys
                setupDynamicKeys(serialNumber, key)
                break
        }
    })
})

// Handle user interactions
plugin.on('plugin.data', (payload) => {
    const { serialNumber, data } = payload
    const key = data.key
  
    switch (key.cid) {
        case 'com.example.counter':
            // Increment counter
            keyData[key.uid].counter++
            key.title = `${keyData[key.uid].counter}`
            plugin.draw(serialNumber, key, 'draw')
            break
      
        case 'com.example.wheel':
            // Handle wheel rotation
            showWheelFeedback(serialNumber, data.delta)
            break
    }
})

// Handle device connections
plugin.on('device.status', (devices) => {
    devices.forEach(device => {
        if (device.status === 'connected') {
            logger.info(`Device connected: ${device.serialNumber}`)
      
            // Configure device
            plugin.setDeviceConfig(device.serialNumber, {
                brightness: 100,
                deviceName: 'SDK Example Device',
                autoSleep: true
            })
        }
    })
})

// Helper function for dynamic keys
function setupDynamicKeys(serialNumber, key) {
    plugin.dynamickey.clear(serialNumber, key)
  
    // Add multiple dynamic keys
    for (let i = 0; i < 3; i++) {
        const canvas = createCanvas(200, 60)
        const ctx = canvas.getContext('2d')
  
        // Draw custom background
        ctx.fillStyle = `hsl(${i * 120}, 70%, 50%)`
        ctx.fillRect(0, 0, 200, 60)
  
        ctx.fillStyle = 'white'
        ctx.font = '20px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(`Key ${i}`, 100, 35)
  
        const imageData = canvas.toDataURL()
  
        plugin.dynamickey.add(
            serialNumber,
            key,
            i,
            'base64',
            imageData,
            200,
            { id: i, name: `Dynamic Key ${i}` }
        )
    }
}

// 性能 monitoring
setInterval(() => {
    const memUsage = process.memoryUsage()
  
    plugin.sendChartData([
        {
            label: 'Memory Usage',
            value: memUsage.heapUsed / 1024 / 1024,
            unit: 'MB',
            baseUnit: 'bytes',
            baseVal: memUsage.heapUsed,
            maxLen: 3,
            category: 'system',
            key: 'memory'
        }
    ])
}, 5000)

// Register shortcuts
setTimeout(() => {
    plugin.updateShortcuts([
        {
            shortcut: 'CommandOrControl+Shift+F1',
            action: 'register'
        }
    ])
}, 1000)

logger.info('Plugin example started successfully!')
```

## 最佳实践

### 性能

- 在宽度变更后请调用 `plugin.dynamickey.refresh()`
- 尽量批量处理多个动态按键操作
- 优化图片尺寸以提升性能

### 错误处理

- 始终将异步操作包裹在 try-catch 代码块中
- 在调用特定类型方法前请校验按键类型
- 优雅地处理设备断开连接的情况

### 用户体验

- 为用户交互提供视觉反馈
- 为通知选择合适的消息级别
- 保持 snackbar 消息简洁且信息明确

### 开发

- 调试时请使用日志记录器而非 console.log
- 请在多设备连接场景下进行测试
- 在应用配置变更前请先校验配置

## 故障排查

### 常见问题

1. **插件无法启动**：请确保已提供正确的命令行参数
2. **按键未更新**：请检查是否使用了正确的序列号
3. **动态按键未显示**：请在宽度变更后调用 `refresh()`
4. **事件未触发**：请确认事件处理器已正确注册

### 调试

通过设置合适的日志级别启用调试日志：

```javascript
logger.debug('Debug information')
```

监控 WebSocket 连接，确保插件能够与 FlexDesigner 正常通信。

## 许可协议

本 SDK 依据 EniacTech 规定的条款提供。请参阅您的许可协议以了解使用条款和条件。
