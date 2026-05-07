# プラグインの構造

このドキュメントでは、プラグインの各部分について詳細に説明します。

## manifest.json

このファイルには、プラグインの基本情報と含まれる内容が記述されます。プラグインが提供するキーと言語リソースは `manifest.json` で指定する必要があります。

以下にいくつかの重要なセクションを示します。

```
{
    "name": "{{name}}", // Plugin name
    "uuid": "{{uuid}}", // Plugin UUID, consisting of three parts in reverse domain format, e.g., com.eniac.example
    "version": "{{version}}", // Plugin version number, must be in x.x.x format
    "author": "{{author}}", // Author name
    "entry": "backend/plugin.cjs", // Plugin backend entry, the compiled Node.js script
    "description": "{{description}}", // Plugin description
    "repo": "{{repo}}", // Plugin's repository. It must be hosted on a Git repository to enable automatic downloads and updates.
    "configPage": "", // Points to a .vue file in the ui folder (e.g., ui/configPage.vue). This can be left blank. If specified, your plugin's settings page will appear in the global settings.
    "shortcuts": ["CommandOrControl+F1"], // Register one or more shortcuts, see available shortcuts at https://www.electronjs.org/docs/latest/api/accelerator
    "keyLibrary": { // Describes the keys included in the plugin
        "title": "$PluginName", // Title of the key library. If the title starts with $, it will look up the corresponding translation in the local section.
        "スタイル": {
            "icon": "mdi mdi-puzzle" // Icon of the key library. You can use an MDI icon (https://pictogrammers.com/library/mdi/) or a PNG image in base64.
            "フラグ": [], // Controls detailed key behaviors with フラグ
        },
        "children": [ // Subdirectories where you can add multiple keys or nested subdirectories. See the keyLibrary section for details.
        ]
    },
    "local": { // Multi-language resources. Text starting with $ in the keyLibrary section or used with $t in .vue files is looked up here.
        "en": {
            "PluginName": "{{name}}"
        },
        "ja": {
  
        }
    }
}
```

### keyLibrary

`keyLibrary` では、複数のキーまたはサブページを追加できます。

次のタイプがサポートされています。

#### デフォルトキー

押されたときにアクションを実行するキー、または静止画像を表示するキーを作成します。

```
{
    "title": "$Counter.Title", // Title, supports multi-language text starting with $
    "tip": "$Counter.Tip", // Brief description, supports multi-language text starting with $
    "cid": "com.eniac.example.counter", // classid, must follow plugin-uuid.<key-id> format and be unique
    "config": {
        "keyType": "default", // Specifies a default key
        "clickable": true, // Whether the key is clickable. If clicked, it sends the key data to the plugin backend. If not clickable, it's typically used for static displays (e.g., weather info).
        "platform": [ // Supported operating systems
            "windows",
            "mac"
        ]
    },
    "スタイル": { // Default スタイル, see the スタイル section
        "icon": "mdi mdi-gesture-tap-button",
        "width": 240
    },
    "data": { // Custom key data. The modelValue in the .vue file corresponds to this object.
        "rangeMin": "0",
        "rangeMax": "100"
    }
},
```

#### マルチステートキー

循環可能な複数の状態を持つキーを作成します。たとえば、オン/オフ、モード A/B/C など。

```
{
    "title": "$CycleButton.Title",
    "tip": "$CycleButton.Tip",
    "cid": "com.eniac.example.cyclebutton",
    "config": {
        "keyType": "multiState" // Specifies a multi-state key
    },
    "スタイル": {
        "icon": "mdi mdi-record-circle-outline",
        "width": 240,
        "multiStyle": [ // Specifies the default スタイル for each state in multiStyle; each entry supports all settings from the スタイル section
            {
                "icon": "mdi mdi-numeric-0-box",
                "bgColor": "#D6582A"
            },
            {
                "icon": "mdi mdi-numeric-1-box",
                "bgColor": "#CD3B42"
            },
            {
                "icon": "mdi mdi-numeric-2-box",
                "bgColor": "#C33DA3"
            }
        ]
    },
    "data": {

    }
},
```

#### スライダー

ボリューム コントロールなど、絶対値によるドラッグ コントロールが必要な機能に適したスライダー コントロールを作成します。

```
{
    "title": "$スライダー.Title",
    "tip": "$スライダー.Tip",
    "cid": "com.eniac.example.slider",
    "config": {
        "keyType": "slider" // Specifies a slider
    },
    "スタイル": {
        "icon": "mdi mdi-tune-variant",
        "width": 360,
        "slider": { // Specifies the slider スタイル
            "color": "#ffffff", // スライダー theme color
            "width": 260,       // スライダー width, cannot exceed the key width
            "format": "%0.1f %%", // Value display format, supports C-スタイル formatting
            "min": 0,           // Minimum value
            "max": 100,         // Maximum value
            "decimals": 1       // Number of decimal places
        }
    },
    "data": {

    }
},
```

#### ホイール

絶対値を持たないパラメータ調整に適したホイール コントロールを作成します。

```
{
    "title": "$ホイール.Title",
    "tip": "$ホイール.Tip",
    "cid": "com.eniac.example.wheel",
    "config": {
        "keyType": "wheel" // Specifies a wheel
    },
    "スタイル": {
        "icon": "mdi mdi-tire",
        "width": 400,
        "wheel": {
            "step": 5 // Sets the wheel sensitivity; it triggers once every 5 steps
        }
    },
    "data": {

    }
},
```

#### Direct Draw（新規）

> FlexDesigner SDK 1.0.7以降が必要です

空のページを作成し、比較的高速 (画像コンテンツに応じて約 15 ～ 45fps) でカスタム コンテンツを直接描画できるようにします。この機能を使用すると、複雑な UI やアニメーションさえも作成できます。デバイスから報告されたタッチ情報を受信することもできます。

```
{
    "title": "$DirectDraw.Title",
    "tip": "$DirectDraw.Tip",
    "cid": "com.eniac.example.directdraw",
    "config": {
        "keyType": "directDraw", // Specifies DirectDraw
        "platform": [
            "windows",
            "mac"
        ]
    },
    "スタイル": {
        "icon": "mdi mdi-gradient-horizontal",
        "width": 240
    },
    "data": {
    }
}
```

##### Direct Draw API

Direct Draw API はシンプルで、`directDraw` メソッドのみを提供します。
```
plugin.directDraw(serialNumber, key, backgroundData, diffUpdate, offsetX)
```

- `serialNumber`: デバイスのシリアル番号
- `key`: イベント `plugin.data` または `plugin.alive` から受け取ったキー オブジェクト。
- `backgroundData`: Base64 エンコードされた画像データ（例: `canvas.toDataURL('image/png')`）
- `diffUpdate`: 部分的な更新を使用するかどうか。デフォルトは false です。 true の場合、連続するフレーム間の差分を比較し、変更された部分のみを更新します。この機能により、狭い領域の更新のフレーム レートが大幅に向上しますが、画面のティアリングが発生する場合があります。
- `offsetX`: 画像の水平座標、範囲は 0 ～ 2170。このパラメータを指定すると、特定の領域を手動で更新できます。画像の高さは 60px に固定されており、幅はエンコードされた画像の Base64 によって指定されます。

##### タッチイベント API

Direct Draw ページでは、デバイスはタッチ情報を報告します。
```
plugin.on('device.touch', (payload) => {})
```

- `payload`: タッチデータ
```
{
    serialNumber: '',
    x: 0,
    y: 0,
    state: 'up' | 'pressing' | 'down' | 'end'
}
```

#### Dynamic Key（新規）

> FlexDesigner SDK 1.0.6以降が必要です

Creates a dynamic key that serves as a container. It has no functionality by itself, but you can use APIs to add/remove child keys. This is suitable for projects that require dynamic creation.
Currently, a dynamic key can contain up to 16 child keys.

```
{
    "title": "$DynamicKey.Title",
    "tip": "$DynamicKey.Tip",
    "cid": "com.eniac.example.dynamickey",
    "config": {
        "keyType": "dynamic", // Specifies a dynamic key
        "platform": [
            "windows",
            "mac"
        ]
    },
    "スタイル": { // For Dynamic Key, users can only adjust the width. Other スタイル properties only affect the display in FlexDesigner and will not be shown on the flexbar.
        "icon": "mdi mdi-contain",
        "width": 240
    },
    "data": {
        "subkeyNum": 0 // This value will be automatically updated when you add/remove keys. You don't need to set this item.
    }
}
```

##### Dynamic Key API

以下に、Dynamic Key を操作するコード例をいくつか示します。詳細は Example プラグインを参照してください。

- index: 子キーのインデックスを指します。このインデックスは Dynamic Key 内部の独立した番号付け用で、0 から始まります。Dynamic Key が複数ある場合も、それぞれの index は互いに独立しています。
- userData: 子キーに紐付くユーザー定義データです。子キーを押すとこのデータがプラグインに送られ、子キーごとの動作を区別するのに使えます。

###### キー幅の設定

```
plugin.dynamickey.setWidth(serialNumber, key, width)
```

- `serialNumber`: デバイスのシリアル番号
- `key`: イベント `plugin.data` または `plugin.alive` から受け取ったキー オブジェクト。
- `width`: 新しい幅の値 (ピクセル単位)

###### 子キーの追加

```
plugin.dynamickey.add(serialNumber, key, index, type, content, width, userData)
```

- `serialNumber`: デバイスのシリアル番号
- `key`: イベント `plugin.data` または `plugin.alive` から受け取ったキー オブジェクト。
- `index`: 挿入位置
- `type`: コンテンツタイプ ('base64','draw')
- `content`: キー描画コンテンツ (base64 イメージまたはキー構造とスタイルを記述するオブジェクト)
- `width`: キーの幅
- `userData`: ユーザーデータオブジェクト

> 描画まわりは `plugin.draw` メソッドと同様です。

###### 子キーの削除

```
plugin.dynamickey.remove(serialNumber, key, index)
```

- `serialNumber`: デバイスのシリアル番号
- `key`: イベント `plugin.data` または `plugin.alive` から受け取ったキー オブジェクト。
- `index`: 削除するキーのインデックス

###### 子キーの位置を移動

```
plugin.dynamickey.move(serialNumber, key, fromIndex, toIndex)
```

- `serialNumber`: デバイスのシリアル番号
- `key`: イベント `plugin.data` または `plugin.alive` から受け取ったキー オブジェクト。
- `fromIndex`: 移動元の位置
- `toIndex`: 移動先の位置

###### 子キーの再描画

```
plugin.dynamickey.draw(serialNumber, key, index, type, content, width)
```

- `serialNumber`: デバイスのシリアル番号
- `key`: イベント `plugin.data` または `plugin.alive` から受け取ったキー オブジェクト。
- `index`: キーインデックス
- `type`: コンテンツタイプ ('base64','draw')
- `content`: キー描画コンテンツ (base64 イメージまたはキー構造とスタイルを記述するオブジェクト)
- `width`: 新しいキーの幅

> 描画まわりは `plugin.draw` メソッドと同様です。

###### 子キーのユーザーデータを更新する

```
plugin.dynamickey.update(serialNumber, key, index, userData)
```

- `serialNumber`: デバイスのシリアル番号
- `key`: イベント `plugin.data` または `plugin.alive` から受け取ったキー オブジェクト。
- `index`: キーインデックス
- `userData`: 新しいユーザー データ オブジェクト

###### キー表示を更新

```
plugin.dynamickey.refresh(serialNumber, key)
```

- `serialNumber`: デバイスのシリアル番号
- `key`: イベント `plugin.data` または `plugin.alive` から受け取ったキー オブジェクト。

> キー幅を変更した後、このメソッドを呼び出して表示を更新する前に、更新が完了するまで 50 ミリ秒待つことをお勧めします。

###### すべての子キーをクリア

```
plugin.dynamickey.clear(serialNumber, key)
```

- `serialNumber`: デバイスのシリアル番号
- `key`: イベント `plugin.data` または `plugin.alive` から受け取ったキー オブジェクト。

#### サブページ

サブページ/カテゴリを追加します。この機能を使用して、プラグインのキーを分類できます。

```
{
    "title": "$Submenu.Title",
    "cid": "com.eniac.navigation.page", // Must be com.eniac.navigation.page, cannot be changed
    "スタイル": {
        "icon": "mdi mdi-folder-outline",
        "width": 240
    },
    "data": {
        "path": "",
        "win": []
    },
    "children": [ // Keys contained in this subpage
    ]
}
```

### スタイル

キーのデフォルトのスタイルを定義します。次のフィールドがサポートされています。

```
{
    "icon": "mdi mdi-cog", // Icon for the key. Can be an MDI icon (https://pictogrammers.com/library/mdi/) or a PNG in base64
    "emoji": "☺️",         // An emoji for the key
    "width": 240,          // Width of the key
    "bgColor": "#424242",  // Background color
    "fgColor": "#ffffff",  // Foreground color
    "borderStyle": "none", // Border スタイル: solid, dotted, double, 3d
    "borderWidth": 1,      // Border width
    "borderColor": "#ffffff", // Border color
    "font": "",            // Font for the key title
    "fontSize": 24,        // Font size for the key title
    "iconSize": 42,        // Icon size
    "iconPos": {           // Icon position in percentages
        "X": 50,
        "Y": 49
    },
    "titlePos": {          // Title position in percentages
        "X": 50,
        "Y": 50
    },
    "titleRotate": 0,      // Rotation angle for the title
    "iconRotate": 0,       // Rotation angle for the icon
    "foregroundOutline": true, // Whether to add a shadow to the icon and title
    "showIcon": true,      // Whether to display the icon
    "showEmoji": false,    // Whether to display an emoji
    "showTitle": false,    // Whether to display the title
    "showImage": false,    // Whether to display an image
    "image": "&lt;base64&gt;"    // A base64-encoded PNG background image, valid only if showImage is true
}
```

#### フラグ

Controls more detailed interaction behaviors, such as disabling background editing.
Available フラグ:

- disable-bg: 背景編集ウィンドウを無効にします。
- disable-fg: 前景編集ウィンドウを無効にします。
- disable-func: 関数編集ウィンドウを無効にします。
- disable-common: 共通機能編集ウィンドウを無効にします。
- disable-bg-スタイルs: 背景スタイルの編集を無効にしますが、幅の調整は保持します
- disable-icon-sel: アイコンの選択を禁止します
- disable-layout-sel: レイアウトの選択を禁止します

### local

多言語リソースが含まれています。 keyLibrary セクション内の $ で始まるテキスト、または .vue ファイル内の $t とともに使用されるテキストがここで検索されます。

```
"local": {
        "en": { // 言語 code, see below
            "PluginName": "{{name}}" // Use it via $t("PluginName") in .vue file, or $PluginName in keyLibrary section.
        }
    }
```

サポートされている言語コード:

| コード  | 言語              |
| ----- | --------------------- |
| en    | 英語               |
| de    | ドイツ語                |
| fr    | フランス語                |
| ja    | 日本語              |
| zh-CN | 中国語（簡体字）  |
| zh-HK | 中国語（繁体字） |
| ko    | 韓国語                |

## backend

コンパイル済みスクリプトを格納します。メイン プロセスは `manifest.entry` からこのスクリプトを起動します。

## resources

リソース ファイル (画像など) を保存します。次のようにしてアクセスできます。

```
const { resourcesPath } = require("@eniac/flexdesigner")
```

## ui

フロントエンドの `.vue` ファイルを置きます。ファイル名は設定画面の `manifest.configPage` で指定した名前と一致させるか、`keyLibrary` 内の各キーの `cid` と一致させます。例: キー `com.eniac.example.counter` には `ui/com.eniac.example.counter.vue` が対応します。
