# Game Settings

Game settings can be changed at any time using settings menu.

![](https://i.gyazo.com/8ef1044cb0b8429298af05e6275ff14d.mp4)

::: info NOTE
To specify, which text elements should be affected by font and text size changes, use `Font Change Configuration` property of the UI prefab (`CustomUI` component). By default, only text printers are effected. Find more info about modifying and creating custom UIs in the [customization guide](/guide/user-interface#ui-customization).
:::

Settings are serialized to a `Settings.json` file stored over game directory. File name can be configured using `Naninovel -> Configuration -> State` context menu; for available options see [configuration guide](/guide/configuration#state).

![State Configuration](https://i.gyazo.com/606bb86f6cac2cc2275ca8912f2e6d17.png)

In WebGL settings are serialized using cross-browser [IndexedDB API](https://en.wikipedia.org/wiki/Indexed_Database_API).

Menu UIs can be customized or completely replaced using [UI Customization](/guide/user-interface#ui-customization) feature.
