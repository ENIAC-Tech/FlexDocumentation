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
    "repo": "{{repo}}", // Plugin’s repository. It must be hosted on a Git repository to enable automatic downloads and updates.
    "configPage": "", // Points to a .vue file in the ui folder (e.g., ui/configPage.vue). This can be left blank. If specified, your plugin's settings page will appear in the global settings.
    "shortcuts": ["CommandOrControl+F1"], // Register one or more shortcuts, see available shortcuts at https://www.electronjs.org/docs/latest/api/accelerator
    "keyLibrary": { // Describes the keys included in the plugin
        "title": "$PluginName", // Title of the key library. If the title starts with $, it will look up the corresponding translation in the local section.
        "style": {
            "icon": "mdi mdi-puzzle" // Icon of the key library. You can use an MDI icon (https://pictogrammers.com/library/mdi/) or a PNG image in base64.
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

A key that performs an action or displays images when clicked.

```
{
    "title": "$Counter.Title", // Title, supports multi-language text starting with $
    "tip": "$Counter.Tip", // Brief description, supports multi-language text starting with $
    "cid": "com.eniac.example.counter", // classid, must follow plugin-uuid.<key-id> format and be unique
    "config": {
        "keyType": "default", // Specifies a default key
        "clickable": true, // Whether the key is clickable. If clicked, it sends the key data to the plugin backend. If not clickable, it’s typically used for static displays (e.g., weather info).
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

### Wheel

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

#### Subpage

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

Holds frontend `.vue` files. The `.vue` file name can match the one specified in `manifest.configPage` for the settings interface or match each key’s `cid` in `keyLibrary`. For example, the key `com.eniac.example.counter` corresponds to `counter.vue`.

When you edit a key in FlexDesigner, it automatically loads the `.vue` file corresponding to that `cid`.

## src

Stores backend `.js` files.
