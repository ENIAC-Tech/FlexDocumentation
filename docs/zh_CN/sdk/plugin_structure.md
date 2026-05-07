# 插件结构

本文档详细描述了插件的每个部分。

## manifest.json

此文件描述插件的基本信息和包含的内容。您需要在`manifest.json`中指定插件提供的按键和语言资源。

以下是一些重要部分：

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
        "style": {
            "icon": "mdi mdi-puzzle" // Icon of the key library. You can use an MDI icon (https://pictogrammers.com/library/mdi/) or a PNG image in base64.
            "flags": [], // Controls detailed key behaviors with flags
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

在`keyLibrary`中，您可以添加多个按键或子页面。

支持以下类型：

#### 默认按键

创建一个按键，按下时执行操作或显示静态图像。

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
    "style": { // Default style, see the style section
        "icon": "mdi mdi-gesture-tap-button",
        "width": 240
    },
    "data": { // Custom key data. The modelValue in the .vue file corresponds to this object.
        "rangeMin": "0",
        "rangeMax": "100"
    }
},
```

#### 多状态按键

创建一个具有多个状态的按键，可以循环切换。例如，开/关、模式A/B/C等。

```
{
    "title": "$CycleButton.Title",
    "tip": "$CycleButton.Tip",
    "cid": "com.eniac.example.cyclebutton",
    "config": {
        "keyType": "multiState" // Specifies a multi-state key
    },
    "style": {
        "icon": "mdi mdi-record-circle-outline",
        "width": 240,
        "multiStyle": [ // Specifies the default style for each state in multiStyle; each entry supports all settings from the style section
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

#### 滑块

创建滑块控件，适用于需要具有绝对值的拖拽控制的功能，如音量控制。

```
{
    "title": "$滑块.Title",
    "tip": "$滑块.Tip",
    "cid": "com.eniac.example.slider",
    "config": {
        "keyType": "slider" // Specifies a slider
    },
    "style": {
        "icon": "mdi mdi-tune-variant",
        "width": 360,
        "slider": { // Specifies the slider style
            "color": "#ffffff", // 滑块 theme color
            "width": 260,       // 滑块 width, cannot exceed the key width
            "format": "%0.1f %%", // Value display format, supports C-style formatting
            "min": 0,           // Minimum value
            "max": 100,         // Maximum value
            "decimals": 1       // Number of decimal places
        }
    },
    "data": {

    }
},
```

#### 滚轮

创建滚轮控件，适用于没有绝对值的参数调整。

```
{
    "title": "$滚轮.Title",
    "tip": "$滚轮.Tip",
    "cid": "com.eniac.example.wheel",
    "config": {
        "keyType": "wheel" // Specifies a wheel
    },
    "style": {
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

#### 直接绘制（新）

> 需要FlexDesigner SDK 1.0.7+

创建一个空白页面，允许您以相对较快的速度直接绘制自定义内容（根据图像内容，大约15~45fps）。您可以使用此功能创建复杂的UI甚至动画。您还可以接收设备报告的触摸信息。

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
    "style": {
        "icon": "mdi mdi-gradient-horizontal",
        "width": 240
    },
    "data": {
    }
}
```

##### 直接绘制API

直接绘制API简单直接，只有一个directDraw方法：
```
plugin.directDraw(serialNumber, key, backgroundData, diffUpdate, offsetX)
```

- `serialNumber`：设备序列号
- `key`：从事件`plugin.data`或`plugin.alive`接收的按键对象。
- `backgroundData`：Base64编码的图像数据，如canvas.toDataURL('image/png')
- `diffUpdate`：是否使用部分更新，默认为false。如果为true，它将比较连续帧之间的差异并仅更新更改的部分。此功能可以显著提高小区域更新的帧率，但偶尔可能导致屏幕撕裂
- `offsetX`：图像的水平坐标，范围0-2170。您可以指定此参数来手动刷新特定区域。图像高度固定为60px，宽度由编码图像的base64指定。

##### 触摸事件API

在直接绘制页面上时，设备将报告触摸信息：
```
plugin.on('device.touch', (payload) => {})
```

- `payload`：触摸数据
```
{
    serialNumber: '',
    x: 0,
    y: 0,
    state: 'up' | 'pressing' | 'down' | 'end'
}
```

#### 动态按键（新）

> 需要FlexDesigner SDK 1.0.6+

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
    "style": { // For Dynamic Key, users can only adjust the width. Other style properties only affect the display in FlexDesigner and will not be shown on the flexbar.
        "icon": "mdi mdi-contain",
        "width": 240
    },
    "data": {
        "subkeyNum": 0 // This value will be automatically updated when you add/remove keys. You don't need to set this item.
    }
}
```

##### 动态按键API

Here are some code snippets demonstrating how to interact with Dynamic Keys. For more detailed examples, please refer to the Example Plugin.

- index: Refers to the index of the child key. This index is specific to the Dynamic Key's internal independent indexing, starting from 0. If there are multiple Dynamic Keys, their indices are independent of each other.
- userData: Refers to the user-defined data bound to the child key. When you press a child key, this data will be sent to the plugin. You can use this data to distinguish and define the functionality of child keys.

###### Set Key Width

```
plugin.dynamickey.setWidth(serialNumber, key, width)
```

- `serialNumber`：设备序列号
- `key`：从事件`plugin.data`或`plugin.alive`接收的按键对象。
- `width`: New width value (in pixels)

###### Add Child Key

```
plugin.dynamickey.add(serialNumber, key, index, type, content, width, userData)
```

- `serialNumber`：设备序列号
- `key`：从事件`plugin.data`或`plugin.alive`接收的按键对象。
- `index`: Insert position
- `type`: Content type ('base64','draw')
- `content`: Key drawing content (base64 image or an Object describing key structure and Style)
- `width`: Key width
- `userData`: User data object

> The drawing part is similar to the plugin.draw method

###### Remove Child Key

```
plugin.dynamickey.remove(serialNumber, key, index)
```

- `serialNumber`：设备序列号
- `key`：从事件`plugin.data`或`plugin.alive`接收的按键对象。
- `index`: Index of the key to remove

###### Move Child Key Position

```
plugin.dynamickey.move(serialNumber, key, fromIndex, toIndex)
```

- `serialNumber`：设备序列号
- `key`：从事件`plugin.data`或`plugin.alive`接收的按键对象。
- `fromIndex`：源位置
- `toIndex`：目标位置

###### 重绘子按键

```
plugin.dynamickey.draw(serialNumber, key, index, type, content, width)
```

- `serialNumber`：设备序列号
- `key`：从事件`plugin.data`或`plugin.alive`接收的按键对象。
- `index`：按键索引
- `type`: Content type ('base64','draw')
- `content`: Key drawing content (base64 image or an Object describing key structure and Style)
- `width`：新按键宽度

> The drawing part is similar to the plugin.draw method

###### 更新子按键用户数据

```
plugin.dynamickey.update(serialNumber, key, index, userData)
```

- `serialNumber`：设备序列号
- `key`：从事件`plugin.data`或`plugin.alive`接收的按键对象。
- `index`：按键索引
- `userData`：新用户数据对象

###### 刷新按键显示

```
plugin.dynamickey.refresh(serialNumber, key)
```

- `serialNumber`：设备序列号
- `key`：从事件`plugin.data`或`plugin.alive`接收的按键对象。

> 修改按键宽度后，建议等待50ms让更新完成，然后再调用此方法刷新显示

###### 清除所有子按键

```
plugin.dynamickey.clear(serialNumber, key)
```

- `serialNumber`：设备序列号
- `key`：从事件`plugin.data`或`plugin.alive`接收的按键对象。

#### 子页面

添加子页面/类别。您可以使用此功能对插件的按键进行分类。

```
{
    "title": "$Submenu.Title",
    "cid": "com.eniac.navigation.page", // Must be com.eniac.navigation.page, cannot be changed
    "style": {
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

### style

定义按键的默认样式。支持以下字段：

```
{
    "icon": "mdi mdi-cog", // Icon for the key. Can be an MDI icon (https://pictogrammers.com/library/mdi/) or a PNG in base64
    "emoji": "☺️",         // An emoji for the key
    "width": 240,          // Width of the key
    "bgColor": "#424242",  // Background color
    "fgColor": "#ffffff",  // Foreground color
    "borderStyle": "none", // Border style: solid, dotted, double, 3d
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

#### flags

Controls more detailed interaction behaviors, such as disabling background editing.
Available flags:

- disable-bg：禁用背景编辑窗口
- disable-fg：禁用前景编辑窗口
- disable-func：禁用功能编辑窗口
- disable-common：禁用通用功能编辑窗口
- disable-bg-styles：禁用背景样式编辑，但保留宽度调整
- disable-icon-sel：阻止图标选择
- disable-layout-sel：阻止布局选择

### local

包含多语言资源。在 keyLibrary 部分以 $ 开头的文本，或在 .vue 文件中通过 $t 使用的文本，都会在此处查找。

```
"local": {
        "en": { // 语言 code, see below
            "PluginName": "{{name}}" // Use it via $t("PluginName") in .vue file, or $PluginName in keyLibrary section.
        }
    }
```

支持的语言代码：

| 代码  | 语言              |
| ----- | --------------------- |
| en    | 英语               |
| de    | 德语                |
| fr    | 法语                |
| ja    | 日语              |
| zh-CN | 中文（简体）  |
| zh-HK | 中文（繁体） |
| ko    | 韩语                |

## backend

用于存放编译后的脚本。主进程会通过 `manifest.entry` 启动该脚本。

## resources

用于存放资源文件（如图片）。你可以通过如下方式访问：

```
const { resourcesPath } = require("@eniac/flexdesigner")
```

## ui

用于存放前端 `.vue` 文件。`.vue` 文件名可以与 `manifest.configPage` 中指定的设置界面名称一致，也可以与 `keyLibrary` 中每个按键的 `cid` 一致。例如，按键 `com.eniac.example.counter` 应有对应的 `ui/com.eniac.example.counter.vue` 文件。
