# 社区模组

**社区模组功能**允许玩家在不修改源码的前提下，向游戏中添加自己的剧情脚本与资源文件，并可同时访问游戏内置资源。

## 启用模组功能

在 Unity 菜单中打开：`Naninovel -> Configuration -> Scripts` 勾选 `Enable Community Modding`（启用社区模组）选项。

然后为要开放的资源类型配置一个 [本地资源提供器（Local Provider）](/zh/guide/resource-providers#local)，并确保其根路径为默认值：`%DATA%/Resources`，这样游戏会在构建目录下查找玩家添加的额外资源。

![](https://i.gyazo.com/e32f40aa3faa648774908a0a937c5fcb.png)

当启用此功能时，标题菜单中会出现一个“EXTERNAL SCRIPTS（外部脚本）”按钮；点击后将打开外部脚本浏览器。在编辑器中，该浏览器还会列出项目资源中的 Naninovel 脚本。

请注意，`External Loader`（外部加载器）配置控制在外部脚本浏览器中显示哪些脚本，而 `Loader` 则配置实际脚本资源的加载方式。外部加载器默认使用 Local（本地）提供程序，因此它只会在游戏构建目录下查找脚本；对于其他资源类型（背景、角色等），你需要在相应的配置菜单中手动设置本地提供程序，以允许玩家添加它们。有关资源提供程序的工作方式及其设置方法，请参阅 [资源提供程序指南](/zh/guide/resource-providers)。

要向构建中添加外部资源，请将它们放入游戏 `Resources` 目录下对应资源类型的子文件夹中，该子文件夹名称应与在 `Loader` 折叠面板下配置的资源 `Path Prefix` 属性一致。例如，要添加一个外部 Naninovel 脚本，请将其放入 `GameFolder/GameName_Data/Resources/Scripts` 文件夹中；背景资源则应放入 `GameFolder/GameName_Data/Resources/Backgrounds`，依此类推。*GameFolder* 和 *GameName* 将取决于你的 Unity 项目名称。

外部脚本浏览器的 UI 可以使用 [UI 自定义](/zh/guide/gui#ui-customization) 功能进行自定义或完全替换。
