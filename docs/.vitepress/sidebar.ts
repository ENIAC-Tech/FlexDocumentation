import type { DefaultTheme } from 'vitepress'

export type DocLang = 'en' | 'zh_CN' | 'ja'

function p(lang: DocLang, sub: string) {
  const base = `/${lang}`
  if (!sub || sub === '/') return `${base}/`
  return `${base}/${sub.replace(/^\//, '')}`
}

export function buildSidebar(lang: DocLang): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Home', link: p(lang, '/') },
    { text: 'Getting Started', link: p(lang, 'getting_started') },
    {
      text: 'FlexDesigner',
      collapsed: false,
      items: [
        { text: 'Overview', link: p(lang, 'flexdesigner/') },
        { text: 'Getting Started', link: p(lang, 'flexdesigner/getting_started') },
        { text: 'Page Editor', link: p(lang, 'flexdesigner/page_editor') },
        { text: 'Key Editor', link: p(lang, 'flexdesigner/key_editor') },
        { text: 'Key Library', link: p(lang, 'flexdesigner/key_library') },
        { text: 'Toolbar', link: p(lang, 'flexdesigner/toolbar') },
        { text: 'Background', link: p(lang, 'flexdesigner/background') },
        { text: 'Foreground', link: p(lang, 'flexdesigner/foreground') },
        { text: 'Plugins', link: p(lang, 'flexdesigner/plugins') },
      ],
    },
    {
      text: 'Functions',
      collapsed: false,
      items: [
        { text: 'Overview', link: p(lang, 'functions/') },
        {
          text: 'Device Control',
          collapsed: true,
          items: [
            { text: 'Flexbar Setting', link: p(lang, 'functions/device_control/flexbar_setting') },
            { text: 'Flexbar Sleep', link: p(lang, 'functions/device_control/flexbar_sleep') },
          ],
        },
        {
          text: 'Input',
          collapsed: true,
          items: [
            { text: 'Keyboard', link: p(lang, 'functions/input/keyboard') },
            { text: 'Mouse', link: p(lang, 'functions/input/mouse') },
            { text: 'Keyboard + Mouse', link: p(lang, 'functions/input/keyboard_mouse') },
            { text: 'Scroll Wheel', link: p(lang, 'functions/input/scroll_wheel') },
            { text: 'Multimedia', link: p(lang, 'functions/input/multimedia') },
            { text: 'Text', link: p(lang, 'functions/input/text') },
            { text: 'Text Emoji', link: p(lang, 'functions/input/text_emoji') },
            { text: 'Sticker Pack', link: p(lang, 'functions/input/sticker_pack') },
            { text: 'Clipboard', link: p(lang, 'functions/input/clipboard') },
          ],
        },
        {
          text: 'Executable',
          collapsed: true,
          items: [
            { text: 'Scripts', link: p(lang, 'functions/executable/scripts') },
            { text: 'Open Webpage', link: p(lang, 'functions/executable/open_webpage') },
            { text: 'Open Application', link: p(lang, 'functions/executable/open_application') },
          ],
        },
        {
          text: 'Navigation',
          collapsed: true,
          items: [{ text: 'Navigation', link: p(lang, 'functions/navigation/navigation') }],
        },
        {
          text: 'More',
          collapsed: true,
          items: [
            { text: 'Sequenced Keys', link: p(lang, 'functions/more/sequenced_keys') },
            { text: 'Cycled Keys', link: p(lang, 'functions/more/cycled_keys') },
          ],
        },
        {
          text: 'System Control',
          collapsed: true,
          items: [
            { text: 'Audio Mixer', link: p(lang, 'functions/system_control/audio_mixer') },
            { text: 'Volume Control', link: p(lang, 'functions/system_control/volume_control') },
            { text: 'Volume Mute', link: p(lang, 'functions/system_control/volume_mute') },
            { text: 'Microphone Control', link: p(lang, 'functions/system_control/microphone_control') },
            { text: 'Microphone Mute', link: p(lang, 'functions/system_control/microphone_mute') },
            { text: 'Play Pause', link: p(lang, 'functions/system_control/play_pause') },
            { text: 'Playback Info', link: p(lang, 'functions/system_control/playback_info') },
            {
              text: 'Monitor Brightness',
              link: p(lang, 'functions/system_control/monitor_brightness_control'),
            },
            { text: 'Monitor Power', link: p(lang, 'functions/system_control/monitor_power_control') },
          ],
        },
        {
          text: 'Placeholder',
          collapsed: true,
          items: [
            { text: 'No Function Key', link: p(lang, 'functions/placeholder/no_function_key') },
            { text: 'Spacer', link: p(lang, 'functions/placeholder/spacer') },
          ],
        },
        {
          text: 'Utilities',
          collapsed: true,
          items: [
            { text: 'Workspace', link: p(lang, 'functions/utilities/workspace') },
            { text: 'Macro Player', link: p(lang, 'functions/utilities/macro_player') },
            {
              text: 'Keyboard Layout Selector',
              link: p(lang, 'functions/utilities/keyboard_layout_selector'),
            },
            { text: 'Auto Hot Key', link: p(lang, 'functions/utilities/auto_hot_key') },
            { text: 'Taskbar', link: p(lang, 'functions/utilities/taskbar') },
            { text: 'Utilities', link: p(lang, 'functions/utilities/utilities') },
            { text: 'Clock', link: p(lang, 'functions/utilities/clock') },
            { text: 'Timer', link: p(lang, 'functions/utilities/timer') },
          ],
        },
        {
          text: 'Power Control',
          collapsed: true,
          items: [{ text: 'Power Control', link: p(lang, 'functions/power_control/power_control') }],
        },
        {
          text: 'Gadgets',
          collapsed: true,
          items: [
            { text: 'Performance Chart', link: p(lang, 'functions/gadgets/performance_chart') },
            { text: 'Audio Spectrum', link: p(lang, 'functions/gadgets/audio_spectrum') },
            { text: 'RGB Strip', link: p(lang, 'functions/gadgets/rgb_strip') },
          ],
        },
        {
          text: 'Adobe',
          collapsed: true,
          items: [
            { text: 'Get Started', link: p(lang, 'functions/adobe/get_started') },
            { text: 'ExtendScript', link: p(lang, 'functions/adobe/extendscript') },
            { text: 'Timeline', link: p(lang, 'functions/adobe/timeline') },
          ],
        },
        {
          text: 'OBS',
          collapsed: true,
          items: [{ text: 'OBS', link: p(lang, 'functions/obs/obs') }],
        },
        {
          text: 'GitHub',
          collapsed: true,
          items: [
            { text: 'Stars', link: p(lang, 'functions/github/stars') },
            { text: 'Heatmap', link: p(lang, 'functions/github/heatmap') },
          ],
        },
        {
          text: 'Minecraft',
          collapsed: true,
          items: [
            { text: 'Inventory Monitor', link: p(lang, 'functions/minecraft/inventory_monitor') },
          ],
        },
      ],
    },
    {
      text: 'SDK',
      collapsed: false,
      items: [
        { text: 'Overview', link: p(lang, 'sdk/') },
        { text: 'Getting Started', link: p(lang, 'sdk/getting_started') },
        { text: 'Plugin Structure', link: p(lang, 'sdk/plugin_structure') },
        { text: 'FlexCLI', link: p(lang, 'sdk/flexcli') },
        { text: 'Release Plugin', link: p(lang, 'sdk/release_plugin') },
        { text: 'API Reference', link: p(lang, 'sdk/sdk_api_reference') },
      ],
    },
    {
      text: 'Troubleshooting',
      collapsed: false,
      items: [
        { text: 'Overview', link: p(lang, 'troubleshoting/') },
        { text: 'Create My First Profile', link: p(lang, 'troubleshoting/create_my_first_profile') },
        { text: 'Cannot Connect', link: p(lang, 'troubleshoting/cannot_connect') },
        { text: 'Content Aware Controls', link: p(lang, 'troubleshoting/content_aware_controls') },
        { text: 'Firmware', link: p(lang, 'troubleshoting/firmware') },
        { text: 'Safe Mode', link: p(lang, 'troubleshoting/safemode') },
        { text: 'Flexgate', link: p(lang, 'troubleshoting/flexgate') },
      ],
    },
    {
      text: 'Release Notes',
      collapsed: false,
      items: [
        { text: 'Overview', link: p(lang, 'releasenote/') },
        { text: '1.0.3', link: p(lang, 'releasenote/1.0.3') },
        { text: '1.0.2', link: p(lang, 'releasenote/1.0.2') },
      ],
    },
  ]
}
