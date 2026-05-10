import type { DefaultTheme } from 'vitepress'
import { type DocLang, sidebarLabel as T } from './sidebar-labels'

export type { DocLang } from './sidebar-labels'

function p(lang: DocLang, sub: string) {
  const base = `/${lang}`
  if (!sub || sub === '/') return `${base}/`
  return `${base}/${sub.replace(/^\//, '')}`
}

export function buildSidebar(lang: DocLang): DefaultTheme.SidebarItem[] {
  return [
    { text: T(lang, 'home'), link: p(lang, '/') },
    { text: T(lang, 'gettingStarted'), link: p(lang, 'getting_started') },
    {
      text: T(lang, 'flexDesigner'),
      collapsed: false,
      items: [
        { text: T(lang, 'overview'), link: p(lang, 'flexdesigner/') },
        { text: T(lang, 'gettingStarted'), link: p(lang, 'flexdesigner/getting_started') },
        { text: T(lang, 'pageEditor'), link: p(lang, 'flexdesigner/page_editor') },
        { text: T(lang, 'keyEditor'), link: p(lang, 'flexdesigner/key_editor') },
        { text: T(lang, 'keyLibrary'), link: p(lang, 'flexdesigner/key_library') },
        { text: T(lang, 'toolbar'), link: p(lang, 'flexdesigner/toolbar') },
        { text: T(lang, 'background'), link: p(lang, 'flexdesigner/background') },
        { text: T(lang, 'foreground'), link: p(lang, 'flexdesigner/foreground') },
        { text: T(lang, 'plugins'), link: p(lang, 'flexdesigner/plugins') },
      ],
    },
    {
      text: T(lang, 'functions'),
      collapsed: false,
      items: [
        { text: T(lang, 'overview'), link: p(lang, 'functions/') },
        {
          text: T(lang, 'deviceControl'),
          collapsed: true,
          items: [
            { text: T(lang, 'flexbarSetting'), link: p(lang, 'functions/device_control/flexbar_setting') },
            { text: T(lang, 'flexbarSleep'), link: p(lang, 'functions/device_control/flexbar_sleep') },
          ],
        },
        {
          text: T(lang, 'input'),
          collapsed: true,
          items: [
            { text: T(lang, 'keyboard'), link: p(lang, 'functions/input/keyboard') },
            { text: T(lang, 'mouse'), link: p(lang, 'functions/input/mouse') },
            { text: T(lang, 'keyboardMouse'), link: p(lang, 'functions/input/keyboard_mouse') },
            { text: T(lang, 'scrollWheel'), link: p(lang, 'functions/input/scroll_wheel') },
            { text: T(lang, 'multimedia'), link: p(lang, 'functions/input/multimedia') },
            { text: T(lang, 'text'), link: p(lang, 'functions/input/text') },
            { text: T(lang, 'textEmoji'), link: p(lang, 'functions/input/text_emoji') },
            { text: T(lang, 'stickerPack'), link: p(lang, 'functions/input/sticker_pack') },
            { text: T(lang, 'clipboard'), link: p(lang, 'functions/input/clipboard') },
          ],
        },
        {
          text: T(lang, 'executable'),
          collapsed: true,
          items: [
            { text: T(lang, 'scripts'), link: p(lang, 'functions/executable/scripts') },
            { text: T(lang, 'openWebpage'), link: p(lang, 'functions/executable/open_webpage') },
            { text: T(lang, 'openApplication'), link: p(lang, 'functions/executable/open_application') },
          ],
        },
        {
          text: T(lang, 'navigation'),
          collapsed: true,
          items: [{ text: T(lang, 'navigation'), link: p(lang, 'functions/navigation/navigation') }],
        },
        {
          text: T(lang, 'more'),
          collapsed: true,
          items: [
            { text: T(lang, 'sequencedKeys'), link: p(lang, 'functions/more/sequenced_keys') },
            { text: T(lang, 'cycledKeys'), link: p(lang, 'functions/more/cycled_keys') },
          ],
        },
        {
          text: T(lang, 'systemControl'),
          collapsed: true,
          items: [
            { text: T(lang, 'audioMixer'), link: p(lang, 'functions/system_control/audio_mixer') },
            { text: T(lang, 'volumeControl'), link: p(lang, 'functions/system_control/volume_control') },
            { text: T(lang, 'volumeMute'), link: p(lang, 'functions/system_control/volume_mute') },
            { text: T(lang, 'microphoneControl'), link: p(lang, 'functions/system_control/microphone_control') },
            { text: T(lang, 'microphoneMute'), link: p(lang, 'functions/system_control/microphone_mute') },
            { text: T(lang, 'playPause'), link: p(lang, 'functions/system_control/play_pause') },
            { text: T(lang, 'playbackInfo'), link: p(lang, 'functions/system_control/playback_info') },
            {
              text: T(lang, 'monitorBrightness'),
              link: p(lang, 'functions/system_control/monitor_brightness_control'),
            },
            { text: T(lang, 'monitorPower'), link: p(lang, 'functions/system_control/monitor_power_control') },
          ],
        },
        {
          text: T(lang, 'placeholder'),
          collapsed: true,
          items: [
            { text: T(lang, 'noFunctionKey'), link: p(lang, 'functions/placeholder/no_function_key') },
            { text: T(lang, 'spacer'), link: p(lang, 'functions/placeholder/spacer') },
          ],
        },
        {
          text: T(lang, 'utilities'),
          collapsed: true,
          items: [
            { text: T(lang, 'workspace'), link: p(lang, 'functions/utilities/workspace') },
            { text: T(lang, 'macroPlayer'), link: p(lang, 'functions/utilities/macro_player') },
            {
              text: T(lang, 'keyboardLayoutSelector'),
              link: p(lang, 'functions/utilities/keyboard_layout_selector'),
            },
            { text: T(lang, 'autoHotKey'), link: p(lang, 'functions/utilities/auto_hot_key') },
            { text: T(lang, 'taskbar'), link: p(lang, 'functions/utilities/taskbar') },
            { text: T(lang, 'utilities'), link: p(lang, 'functions/utilities/utilities') },
            { text: T(lang, 'clock'), link: p(lang, 'functions/utilities/clock') },
            { text: T(lang, 'timer'), link: p(lang, 'functions/utilities/timer') },
          ],
        },
        {
          text: T(lang, 'powerControl'),
          collapsed: true,
          items: [{ text: T(lang, 'powerControl'), link: p(lang, 'functions/power_control/power_control') }],
        },
        {
          text: T(lang, 'gadgets'),
          collapsed: true,
          items: [
            { text: T(lang, 'performanceChart'), link: p(lang, 'functions/gadgets/performance_chart') },
            { text: T(lang, 'audioSpectrum'), link: p(lang, 'functions/gadgets/audio_spectrum') },
            { text: T(lang, 'rgbStrip'), link: p(lang, 'functions/gadgets/rgb_strip') },
          ],
        },
        {
          text: T(lang, 'adobe'),
          collapsed: true,
          items: [
            { text: T(lang, 'adobeGetStarted'), link: p(lang, 'functions/adobe/get_started') },
            { text: T(lang, 'extendScript'), link: p(lang, 'functions/adobe/extendscript') },
            { text: T(lang, 'timeline'), link: p(lang, 'functions/adobe/timeline') },
          ],
        },
        {
          text: T(lang, 'obs'),
          collapsed: true,
          items: [{ text: T(lang, 'obs'), link: p(lang, 'functions/obs/obs') }],
        },
        {
          text: T(lang, 'github'),
          collapsed: true,
          items: [
            { text: T(lang, 'stars'), link: p(lang, 'functions/github/stars') },
            { text: T(lang, 'heatmap'), link: p(lang, 'functions/github/heatmap') },
          ],
        },
        {
          text: T(lang, 'minecraft'),
          collapsed: true,
          items: [
            { text: T(lang, 'inventoryMonitor'), link: p(lang, 'functions/minecraft/inventory_monitor') },
          ],
        },
      ],
    },
    {
      text: T(lang, 'sdk'),
      collapsed: false,
      items: [
        { text: T(lang, 'overview'), link: p(lang, 'sdk/') },
        { text: T(lang, 'gettingStarted'), link: p(lang, 'sdk/getting_started') },
        { text: T(lang, 'pluginStructure'), link: p(lang, 'sdk/plugin_structure') },
        { text: T(lang, 'flexCLI'), link: p(lang, 'sdk/flexcli') },
        { text: T(lang, 'releasePlugin'), link: p(lang, 'sdk/release_plugin') },
        { text: T(lang, 'apiReference'), link: p(lang, 'sdk/sdk_api_reference') },
      ],
    },
    {
      text: T(lang, 'troubleshooting'),
      collapsed: false,
      items: [
        { text: T(lang, 'overview'), link: p(lang, 'troubleshoting/') },
        { text: T(lang, 'createMyFirstProfile'), link: p(lang, 'troubleshoting/create_my_first_profile') },
        { text: T(lang, 'cannotConnect'), link: p(lang, 'troubleshoting/cannot_connect') },
        { text: T(lang, 'contentAwareControls'), link: p(lang, 'troubleshoting/content_aware_controls') },
        { text: T(lang, 'firmware'), link: p(lang, 'troubleshoting/firmware') },
        { text: T(lang, 'safeMode'), link: p(lang, 'troubleshoting/safemode') },
        { text: T(lang, 'flexgate'), link: p(lang, 'troubleshoting/flexgate') },
      ],
    },
    {
      text: T(lang, 'releaseNotes'),
      collapsed: false,
      items: [
        { text: T(lang, 'overview'), link: p(lang, 'releasenote/') },
        { text: '1.0.3', link: p(lang, 'releasenote/1.0.3') },
        { text: '1.0.2', link: p(lang, 'releasenote/1.0.2') },
      ],
    },
  ]
}
