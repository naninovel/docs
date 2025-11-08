# 游戏设置

可以随时通过设置菜单更改游戏设置。

![](https://i.gyazo.com/8ef1044cb0b8429298af05e6275ff14d.mp4)

::: info 注意
要指定哪些文本元素会受到字体和文字大小更改的影响，请使用 UI 预制体（`CustomUI` 组件）的 `Font Change Configuration` 属性。默认情况下，仅文字打印机会受影响。有关修改和创建自定义 UI 的更多信息，请参阅 [自定义指南](/zh/guide/user-interface#ui-customization)。
:::

设置将序列化到游戏目录下的 `Settings.json` 文件中。文件名可通过 `Naninovel -> Configuration -> State` 上下文菜单进行配置；可用选项请参阅 [配置指南](/zh/guide/configuration#state)。

![State Configuration](https://i.gyazo.com/606bb86f6cac2cc2275ca8912f2e6d17.png)

在 WebGL 中，设置会使用跨浏览器的 [IndexedDB API](https://en.wikipedia.org/wiki/Indexed_Database_API) 进行序列化。

菜单 UI 可以使用 [UI 自定义](/zh/guide/user-interface#ui-customization) 功能进行定制或完全替换。
