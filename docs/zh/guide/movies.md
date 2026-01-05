# 影片

影片是在场景上方通过 `IMovieUI` 界面播放的视频，在播放期间会暂停脚本执行和用户输入处理。

在开始播放影片之前，会先淡入到指定的淡入纹理（默认是纯黑色）。播放结束后，会从淡入纹理淡出回场景内容。

玩家可以通过 `SkipMovie` 输入（在独立输入模块中默认为 `Esc` 键）跳过影片播放；可以在输入配置菜单中更改此绑定。

要添加、编辑或删除影片资源，请使用 `Naninovel -> Resources -> Movies` 上下文菜单进入影片管理器：

![Manage Movies](https://i.gyazo.com/aace59f30f42245fc3ba714d10815d46.png)

你可以使用任何 [Unity 支持的视频格式](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility)。

::: TIP
译注：Unity 打包 Windows 应用时，推荐使用 webm 格式，对 Windows 支持度会更好。
:::

影片播放行为可通过 `Naninovel -> Configuration -> Movies` 编辑器菜单进行配置；可用选项请参阅 [配置指南](/zh/guide/configuration#movies)。

使用 [@movie] 指令并跟上视频剪辑名称，即可在 Naninovel 脚本中播放影片：

```nani
; 假设一个名为 “Opening” 的视频剪辑已添加到影片资源中，播放它。
@movie Opening
```

默认情况下，播放的视频会被适配为 16:9 的宽高比以防止拉伸。你可以通过 [重写](/zh/guide/gui.html#ui-customization) `IMovieUI` 界面来更改此行为。附加在 `MovieImage` 游戏对象上的 `Aspect Ratio Fitter` 组件用于控制适配行为。

![](https://i.gyazo.com/38e8b1fc220d5fedd50f62ab855b2e92.png)

## WebGL 限制

由于平台限制，WebGL 上的视频播放仅支持 URI 流式模式。在构建 WebGL 播放器时，所有影片资源将自动复制到 `Assets/StreamingAssets` 目录。请确保你的网站托管环境已配置为允许从播放器构建目录访问本地文件。

如果你使用的不是 mp4 格式（例如 webm），请在资源提供程序配置中的 `Video Stream Extension` 属性中设置托管文件的扩展名。

![](https://i.gyazo.com/b3eb1ab2af513e6a131347d6e5e455e5.png)
