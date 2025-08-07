# Plugin Structure

This document provides a detailed description of each part of a plugin.

## manifest.json

This file describes the basic information about the plugin and what it contains. You need to specify the keys and language resources your plugin provides in `manifest.json`.

Below are some important sections:

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

In `keyLibrary`, you can add multiple keys or subpages.

The following types are supported:

#### Default Key

Creates a key that performs an action when pressed or displays a static image.

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

#### Multi-State Key

Creates a key with multiple states that can be cycled through. For example, on/off, mode A/B/C, etc.

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

#### Slider

Creates a slider control, suitable for functions that require drag control with absolute values, such as volume control.

```
{
    "title": "$Slider.Title",
    "tip": "$Slider.Tip",
    "cid": "com.eniac.example.slider",
    "config": {
        "keyType": "slider" // Specifies a slider
    },
    "style": {
        "icon": "mdi mdi-tune-variant",
        "width": 360,
        "slider": { // Specifies the slider style
            "color": "#ffffff", // Slider theme color
            "width": 260,       // Slider width, cannot exceed the key width
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

#### Wheel

Creates a wheel control, suitable for parameter adjustments that don't have absolute values.

```
{
    "title": "$Wheel.Title",
    "tip": "$Wheel.Tip",
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

#### Direct Draw (new)

> Requires FlexDesigner SDK 1.0.7+

Creates an empty page that allows you to directly draw custom content at a relatively fast speed (depending on image content, approximately 15~45fps). You can use this feature to create complex UIs and even animations. You can also receive touch information reported by the device.

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

##### Direct Draw API

The Direct Draw API is simple and straightforward, with only one directDraw method:
```
plugin.directDraw(serialNumber, key, backgroundData, diffUpdate, offsetX)
```

- `serialNumber`: Device serial number
- `key`: Key object received from the event `plugin.data` or `plugin.alive`.
- `backgroundData`: Base64 encoded image data, such as canvas.toDataURL('image/png')
- `diffUpdate`: Whether to use partial updates, defaults to false. If true, it will compare differences between consecutive frames and only update changed parts. This feature can significantly improve frame rate for small area updates, but may occasionally cause screen tearing
- `offsetX`: Horizontal coordinate of the image, range 0-2170. You can specify this parameter to manually refresh specific areas. The image height is fixed at 60px, and the width is specified by the encoded image base64.

##### Touch Event API

When on a Direct Draw page, the device will report touch information:
```
plugin.on('device.touch', (payload) => {})
```

- `payload`: Touch data
```
{
    serialNumber: '',
    x: 0,
    y: 0,
    state: 'up' | 'pressing' | 'down' | 'end'
}
```

#### Dynamic Key (new)

> Requires FlexDesigner SDK 1.0.6+

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

##### Dynamic Key API

Here are some code snippets demonstrating how to interact with Dynamic Keys. For more detailed examples, please refer to the Example Plugin.

- index: Refers to the index of the child key. This index is specific to the Dynamic Key's internal independent indexing, starting from 0. If there are multiple Dynamic Keys, their indices are independent of each other.
- userData: Refers to the user-defined data bound to the child key. When you press a child key, this data will be sent to the plugin. You can use this data to distinguish and define the functionality of child keys.

###### Set Key Width

```
plugin.dynamickey.setWidth(serialNumber, key, width)
```

- `serialNumber`: Device serial number
- `key`: Key object received from the event `plugin.data` or `plugin.alive`.
- `width`: New width value (in pixels)

###### Add Child Key

```
plugin.dynamickey.add(serialNumber, key, index, type, content, width, userData)
```

- `serialNumber`: Device serial number
- `key`: Key object received from the event `plugin.data` or `plugin.alive`.
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

- `serialNumber`: Device serial number
- `key`: Key object received from the event `plugin.data` or `plugin.alive`.
- `index`: Index of the key to remove

###### Move Child Key Position

```
plugin.dynamickey.move(serialNumber, key, fromIndex, toIndex)
```

- `serialNumber`: Device serial number
- `key`: Key object received from the event `plugin.data` or `plugin.alive`.
- `fromIndex`: Source position
- `toIndex`: Target position

###### Redraw Child Key

```
plugin.dynamickey.draw(serialNumber, key, index, type, content, width)
```

- `serialNumber`: Device serial number
- `key`: Key object received from the event `plugin.data` or `plugin.alive`.
- `index`: Key index
- `type`: Content type ('base64','draw')
- `content`: Key drawing content (base64 image or an Object describing key structure and Style)
- `width`: New key width

> The drawing part is similar to the plugin.draw method

###### Update Child Key User Data

```
plugin.dynamickey.update(serialNumber, key, index, userData)
```

- `serialNumber`: Device serial number
- `key`: Key object received from the event `plugin.data` or `plugin.alive`.
- `index`: Key index
- `userData`: New user data object

###### Refresh Key Display

```
plugin.dynamickey.refresh(serialNumber, key)
```

- `serialNumber`: Device serial number
- `key`: Key object received from the event `plugin.data` or `plugin.alive`.

> After modifying the key width, it's recommended to wait 50ms for the update to complete before calling this method to refresh the display

###### Clear All Child Keys

```
plugin.dynamickey.clear(serialNumber, key)
```

- `serialNumber`: Device serial number
- `key`: Key object received from the event `plugin.data` or `plugin.alive`.

#### Subpage

Adds a subpage/category. You can use this feature to categorize your plugin's keys.

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

Defines the default style of a key. The following fields are supported:

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
    "image": "<base64>"    // A base64-encoded PNG background image, valid only if showImage is true
}
```

#### flags

Controls more detailed interaction behaviors, such as disabling background editing.
Available flags:

- disable-bg: Disables the background editing window
- disable-fg: Disables the foreground editing window
- disable-func: Disables the function editing window
- disable-common: Disables the common function editing window
- disable-bg-styles: Disables background style editing, but retains width adjustment
- disable-icon-sel: Prevents icon selection
- disable-layout-sel: Prevents layout selection

### local

Includes multilingual resources. Text starting with $ in the keyLibrary section or used with $t in .vue files is looked up here.

```
"local": {
        "en": { // Language code, see below
            "PluginName": "{{name}}" // Use it via $t("PluginName") in .vue file, or $PluginName in keyLibrary section.
        }
    }
```

Supported language code:

| Code  | Language              |
| ----- | --------------------- |
| en    | English               |
| de    | German                |
| fr    | French                |
| ja    | Japanese              |
| zh-CN | Chinese (Simplified)  |
| zh-HK | Chinese (Traditional) |
| ko    | Korean                |

## backend

Holds the compiled script. The main process will launch this script via `manifest.entry`.

## resources

Stores resource files (e.g., images). You can access them as follows:

```
const { resourcesPath } = require("@eniac/flexdesigner")
```

## ui

Holds frontend `.vue` files. The `.vue` file name can match the one specified in `manifest.configPage` for the settings interface or match each key's `cid` in `keyLibrary`. For example, the key `com.eniac.example.counter` should have a corresponding `ui/com.eniac.example.counter.vue` file.
