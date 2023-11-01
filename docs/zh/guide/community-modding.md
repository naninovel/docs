# 社区模组

社区模组（MOD）允许玩家修改构建、添加自己的场景和资源，同时还可以访问游戏内置资源。

在`Naninovel -> Configuration -> Scripts`菜单中打开 `Enable Community Modding` 属性已启用该功能。然后为要开放自定义使用的资源配置[本地加载器](/zh/guide/resource-providers#本地资源加载器) 。确保配置加载器的根路径为默认值的(`%DATA%/Resources`)，这样他就会在打包目录中检索相应资源。

![Scripts Configuration](https://i.gyazo.com/96630a3a1c592c43f73c47d1bc3bbea1.png)

当该功能打开时，主菜单会出现"EXTERNAL SCRIPTS"按钮；它会打开一个扩展脚本浏览器，在编辑器模式下，该浏览器会显示项目内的Naninovel脚本。

注意， `External Loader` 加载器配置控制着如何加载外部脚本（可通过扩展脚本浏览器访问），而`Loader`配置了项目内置脚本的加载。`Loader`默认情况下设置了本地加载器，因此它将仅在游戏构建目录下查找脚本。对于其他资源类型（背景，角色等），必须在相应的配置菜单中手动设置本地加载器，以允许玩家添加它们。关于资源加载器的设置和怎样工作的参考[资源加载器](/zh/guide/resource-providers) 。

要将外部资源添加到可用资源中，请将其拖放到游戏 `Resources`目录下的子文件夹中，该子文件夹与`Path Prefix`在`Loader`折叠下配置的资源属性相对应。例如，要添加一个外部naninovel脚本，请将其拖放到 `GameFolder/GameName_Data/Resources/Scripts` 文件夹中；背景为 `GameFolder/GameName_Data/Resources/Backgrounds` 等等。 *GameFolder* 和 *GameName* 将取决于Unity项目的名称。

通过[UI自定义](/zh/guide/user-interface#UI自定义) 可以完全替换扩展脚本浏览器UI。
