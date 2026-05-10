# FlexDesigner SDK

FlexDesigner 向けプラグイン開発のための包括的な SDK で、Flexbar との連携と多彩なインタラクション機能を提供します。

## インストール

### 前提条件

- Node.js 20 以降
- FlexDesigner 1.0.0 以降。

### 設定

FlexDesigner SDK をプロジェクトに追加する

> 通常は `flexcli` でプラグイン プロジェクトを作成するだけで、FlexDesigner SDK が自動的にインストールされます。

```bash
npm install @eniactech/flexdesigner-sdk
```

## クイックスタート

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

## 主要な概念

### プラグインのライフサイクル

1. **初期化**: プラグインが起動し、FlexDesigner に接続します。
2. **Alive イベント**: キーが読み込まれ、操作可能になったときに発火します。
3. **データ イベント**: ユーザーがキーを操作したときに発火します。
4. **設定**: プラグインは設定データの読み書きができます。

### キーの種類

- **標準キー**: 基本的なボタン機能
- **マルチステート キー**: 複数の状態を切り替えます。
- **スライダー キー**: 連続値調整
- **ダイナミック キー**: 動的に管理するキーの集合です。
- **ホイール キー**: ロータリー エンコーダーのサポート

## API リファレンス

### 組み込みモジュール

プラグイン開発を簡単にするため、すぐに使えるモジュールをあらかじめ組み込んでいます。

1. [@napi-rs/canvas](https://www.npmjs.com/package/@napi-rs/canvas)
2. [express](https://www.npmjs.com/package/express)
3. [axios](https://www.npmjs.com/package/axios)

> 他のモジュールの組み込みが必要な場合はお知らせください。

### コア プラグイン API

#### plugin.start()

WebSocket 接続を開始し、プラグインを初期化します。

```javascript
plugin.start()
```

#### plugin.on(event, handler)

指定したイベントのハンドラーを登録します。

**パラメータ:**

- `event` (文字列): イベントの種類
- `handler` (関数): イベントハンドラー関数

```javascript
plugin.on('plugin.data', (payload) => {
    const { data, serialNumber } = payload
    logger.info('Key pressed:', data.key.title)
    return { status: 'success', message: 'Key handled!' }
})
```

#### plugin.off(event)

イベント ハンドラーの登録を解除します。

```javascript
plugin.off('plugin.data')
```

### 描画と表示の更新

#### plugin.draw(serialNumber, key, type?, base64?)

キーの見た目を更新します。

**パラメータ:**

- `serialNumber` (文字列): デバイスのシリアル番号
- `key` (オブジェクト): イベントからのキーオブジェクト
- `type` (文字列): 'draw' (デフォルト) または 'base64'
- `base64` (文字列): Base64画像データ(型が'base64'の場合)

```javascript
// Update key based on key.style properties
plugin.draw(serialNumber, key, 'draw')

// Draw custom image
const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'
plugin.draw(serialNumber, key, 'base64', base64Image)
```

### キー状態の管理

#### plugin.setMultiState(serialNumber, key, state, message?)

マルチステートキーの状態を設定します。

**パラメータ:**

- `serialNumber` (文字列): デバイスのシリアル番号
- `key` (オブジェクト): キーオブジェクト
- `state` (数値): ターゲット状態インデックス
- `message` (string, 任意): 表示するメッセージ

```javascript
plugin.setMultiState(serialNumber, key, 2, 'State Changed')
```

#### plugin.setSlider(serialNumber, key, value)

スライダー キーの値を設定します。

**パラメータ:**

- `serialNumber` (文字列): デバイスのシリアル番号
- `key` (オブジェクト): キーオブジェクト
- `value` (数値): スライダーの値

```javascript
plugin.setSlider(serialNumber, key, 75)
```

### デバイス設定と制御

#### plugin.sendControlCommand(serialNumber, command)

デバイスに制御コマンドを送信します。

**パラメータ:**

- `serialNumber` (文字列): デバイスのシリアル番号
- `command` (文字列): 送信するコマンド。次のいずれか:
    - "sys.sleep": デバイスをスリープ状態にします。
    - "sys.wake": デバイスをスリープから復帰させます。
    - "haptic.click": クリックに相当する振動フィードバックを出します。

```javascript
plugin.sendControlCommand(serialNumber, 'sys.sleep') // Put the device to sleep
plugin.sendControlCommand(serialNumber, 'sys.wake') // Wake up the device
plugin.sendControlCommand(serialNumber, 'haptic.click') // Trigger a click vibration
```



#### plugin.setDeviceConfig(serialNumber, config)

デバイスの設定を行います。

**パラメータ:**

- `serialNumber` (文字列): デバイスのシリアル番号
- `config` (オブジェクト): 設定オブジェクト

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

### メッセージと通知

#### plugin.showFlexbarSnackbarMessage(serialNumber, msg, level, icon?, timeout?, waitUser?)

Flexbar デバイスにメッセージを表示します。

**パラメータ:**

- `serialNumber` (文字列): デバイスのシリアル番号
- `msg` (文字列): メッセージの内容 (最大 64 文字)
- `level` (文字列): メッセージ レベル ('info'、'warning'、'error'、'success')
- `icon` (文字列、オプション): アイコン名
- `timeout` (数値、オプション): ミリ秒単位の継続時間 (500 ～ 10000、デフォルト: 2000)
- `waitUser` (boolean, 任意): ユーザー操作を待つかどうか

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

FlexDesigner アプリケーションにメッセージを表示します。

```javascript
plugin.showSnackbarMessage('success', 'Operation completed!', 3000)
```

### システム統合

#### plugin.electronAPI(api, ...args)

システム統合のために Electron API を呼び出します。

**サポートされている API:**

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

### ファイル操作

#### plugin.openFile(path)

ファイルシステムからファイルを読み取ります。

```javascript
const content = await plugin.openFile('/path/to/file.txt')
```

#### plugin.saveFile(path, data)

データをファイルに保存します。

```javascript
await plugin.saveFile('/path/to/output.txt', 'Hello World!')
```

### アプリケーション情報

#### plugin.getAppInfo()

FlexDesigner アプリケーション情報を取得します。

```javascript
const appInfo = await plugin.getAppInfo()
// Returns: { version: "v1.0.0", platform: "win32" }
```

#### plugin.getOpenedWindows()

システム上で開いているウィンドウのリストを取得します。

```javascript
const windows = await plugin.getOpenedWindows()
windows.forEach(win => {
    console.log(`Window: ${win.title} (${win.bounds.width}x${win.bounds.height})`)
})
```

#### plugin.getDeviceStatus()

接続されているデバイスのステータスを取得します。

```javascript
const devices = await plugin.getDeviceStatus()
devices.forEach(device => {
    console.log(`Device: ${device.serialNumber}, Status: ${device.status}`)
})
```

### 設定の管理

#### plugin.getConfig()

プラグインの設定を取得します。

```javascript
const config = await plugin.getConfig()
console.log('Current config:', config)
```

#### plugin.setConfig(config)

プラグインの設定を更新します。

```javascript
await plugin.setConfig({ theme: 'dark', autoUpdate: true })
```

### パフォーマンスの監視

#### plugin.sendChartData(chartDataArray)

パフォーマンス指標を FlexDesigner 側の表示用に送ります。

**パラメータ:**

- `chartDataArray` (配列): チャート データ オブジェクトの配列

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

### ショートカット管理

#### plugin.updateShortcuts(shortcuts)

キーボード ショートカットを登録または登録解除します。

**パラメータ:**

- `shortcuts` (配列): ショートカット オブジェクトの配列

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

## ダイナミック キーの管理

`plugin.dynamickey` オブジェクトが、高度なキー管理機能を提供します。

### plugin.dynamickey.clear(serialNumber, key)

コンテナ内のダイナミック キーをすべて削除します。

```javascript
plugin.dynamickey.clear(serialNumber, key)
```

### plugin.dynamickey.add(serialNumber, key, index, backgroundType, backgroundData, width, userData)

新しいダイナミック キーを追加します。

**パラメータ:**

- `index` (number): キーを挿入する位置
- `backgroundType` (文字列): 'base64' または 'draw'
- `backgroundData` (文字列): 画像データまたはキーオブジェクト
- `width` (数値): キーの幅 (ピクセル単位) (60 ～ 1000)
- `userData` (オブジェクト): キーに関連付けられたカスタム データ

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

指定したインデックスのダイナミック キーを削除します。

```javascript
plugin.dynamickey.remove(serialNumber, key, 2)
```

### plugin.dynamickey.move(serialNumber, key, srcIndex, dstIndex)

ダイナミック キーの位置を移動します。

```javascript
plugin.dynamickey.move(serialNumber, key, 0, 3)
```

### plugin.dynamickey.setWidth(serialNumber, key, width)

ダイナミック キー コンテナの幅を変更します。

```javascript
plugin.dynamickey.setWidth(serialNumber, key, 800)
```

### plugin.dynamickey.draw(serialNumber, key, index, backgroundType, backgroundData, width)

指定したダイナミック キーの見た目を更新します。

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

ダイナミック キーのユーザーデータを更新します。

```javascript
plugin.dynamickey.update(serialNumber, key, 0, { status: 'updated' })
```

### plugin.dynamickey.refresh(serialNumber, key)

ダイナミック キーの表示を更新します（幅変更後の呼び出しを推奨）。

```javascript
plugin.dynamickey.refresh(serialNumber, key)
```

## イベント処理

### プラグイン イベント

#### 'plugin.alive'

キーが読み込まれ、操作可能になったときに発火します。

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

プラグインのキーが破棄されたときに発火します。

```javascript
plugin.on('plugin.dead', (payload) => {
    const { serialNumber, keys } = payload
  
    keys.forEach(key => {
        console.log(`Key destoried: ${key.cid}`)
    })
})
```


#### 'plugin.data'

ユーザーがキーを操作したときに発火します。

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

プラグインの設定が変わったときに発火します。

```javascript
plugin.on('plugin.config.updated', (payload) => {
    console.log('Configuration updated:', payload.config)
})
```

### システム イベント

#### 'system.shortcut'

登録したショートカットが押されたときに発火します。

```javascript
plugin.on('system.shortcut', (payload) => {
    console.log(`Shortcut pressed: ${payload.shortcut}`)
})
```

#### 'system.actwin'

アクティブ ウィンドウが切り替わったときに発火します。

```javascript
plugin.on('system.actwin', (payload) => {
    const { oldWin, newWin } = payload
    console.log(`Window changed: ${oldWin.title} -> ${newWin.title}`)
})
```

### デバイス イベント

#### 'device.status'

デバイスの接続状態が変わったときに発火します。

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

### UI イベント

#### 'ui.message'

プラグインの UI からメッセージを受け取ったときに発火します。

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

プラグインの UI からのログを扱います（自動処理）。

## ユーティリティとヘルパー

### ロガー

SDK は、デバッグと監視のためのロガー インスタンスを提供します。

```javascript
const { logger } = require("@eniactech/flexdesigner-sdk")

logger.info('Information message')
logger.warn('Warning message')
logger.error('Error message')
logger.debug('Debug message')
```

### パス関連ユーティリティ

プラグイン専用のパスにアクセスできます。

```javascript
const { pluginPath, resourcesPath } = require("@eniactech/flexdesigner-sdk")

console.log('Plugin directory:', pluginPath)
console.log('Resources directory:', resourcesPath)
```

## 完全な例

以下は、SDK の主な機能を示す包括的な例です。

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
                // 設定 dynamic keys
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

// パフォーマンス monitoring
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

## ベストプラクティス

### パフォーマンス

- 幅を変更したあとは `plugin.dynamickey.refresh()` を呼び出します。
- 可能ならダイナミック キー操作はまとめて行います。
- 画像サイズを最適化してパフォーマンスを高めます。

### エラーハンドリング

- 非同期処理は常に try-catch で囲みます。
- 型固有のメソッドを呼ぶ前にキーの種類を確認します。
- デバイス切断時も落ち着いて扱えるようにします。

### ユーザー体験

- 操作に応じた視覚的フィードバックを返します。
- 通知には適切なメッセージ レベルを使います。
- スナックバーの文言は短く、内容が伝わるようにします。

### 開発

- デバッグは console.log ではなくロガーを使います。
- 複数台接続した状態でもテストします。
- 変更を反映する前に設定内容を検証します。

## トラブルシューティング

### よくある問題

1. **プラグインが起動しない**: コマンドライン引数が正しく渡されているか確認します。
2. **キーが更新されない**: シリアル番号が正しいか確認します。
3. **ダイナミック キーが表示されない**: 幅変更後に `refresh()` を呼び出します。
4. **イベントが発火しない**: イベント ハンドラーの登録を確認します。

### デバッグ

ログ レベルを適切に設定してデバッグ出力を有効にします。

```javascript
logger.debug('Debug information')
```

WebSocket 接続を確認し、プラグインが FlexDesigner と通信できる状態か検証します。

## ライセンス

この SDK は、EniacTech が指定する条件に基づいて提供されます。使用条件については、ライセンス契約を参照してください。
