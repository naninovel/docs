# 影片

影片是通过场景中的`IMovieUI`UI来播放，在播放时，代码执行和用户输入都会被中断。


开始播放前会有默认的黑色渐入效果，播放结束的时候会有黑色渐隐特效。

玩家可以通过`Cancel` 的输入（默认`Esc`）来取消播放。按键绑定可以通过输入配置菜单修改。

要添加，编辑和移除影片资源，使用`Naninovel -> Resources -> Movies`菜单内的配置：


![Manage Movies](https://i.gyazo.com/aace59f30f42245fc3ba714d10815d46.png)

你可以使用任何 [Unity支持](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility) 的影片格式。

影片相关表现，可以通过`Naninovel -> Configuration -> Movies`菜单来配置，其他可选配置参考[属性配置](/zh/guide/configuration.md#影片)

在Naninovel脚本中使用 [@movie] 加影片名来播放相应影片：


```nani
; 播放添加到影片资源中的名为“Opening”的影片。
@movie Opening
```

影片播放默认比例为16:9来避免拉伸。你可以[重写](/zh/guide/user-interface.html#UI自定义) `IMovieUI` UI。`MovieImage`物体上的`Aspect Ratio Fitter`组件控制了视频播放比例。


![](https://i.gyazo.com/38e8b1fc220d5fedd50f62ab855b2e92.png)

## WebGL限制

由于平台限制，WebGL平台下仅支持URL流的视频播放。当发布WebGL平台时，所有影片资源路径会变为`Assets/StreamingAssets`。确保你的网页寄存配置能够让本地文件获取到玩家的发布路径。

