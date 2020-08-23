# 音频

背景音乐和音效会在本文介绍，语音部分请看[语音引导](/guide/voicing.md) 。

要添加，编辑和移除影片资源，使用`Naninovel -> Resources -> Audio`菜单内的配置。你可以使用任何 [Unity支持](https://docs.unity3d.com/Manual/AudioFiles.html) 的影片格式。

![](https://i.gyazo.com/cacdec36623dbbfcf9f49c594de53c0f.png)

在通过编辑器菜单添加多个背景的时候，可能并不方便，在
`Resources/Naninovel/Audio`目录下直接拖入资源，这样添加也是可以的。他们就会被自动被注册至脚本。你也可以通过子文件夹来管理相应资源。脚本中需要使用(`/`)调用。比如`Resources/Naninovel/Audio/Music/Ambient/Noise002.wav`的资源，脚本中的调用为： `Music/Ambient/Noise002`。

使用[可寻址资源系统](/zh/guide/resource-providers.md#寻址资源系统) 来手动公开资源也是可以的。公开资源地址和上述相同，但是需要省略"Resources/"部分。比如开放 "MainTheme.wav" 背景音乐，注册地址为`Naninovel/Audio/MainTheme`。注意，该系统默认不启用你可以通过资源配置菜单的`Enable Addressable In Editor`属性来启用。

::: warn
未通过资源管理器分配的音频资产将无法在各种编辑器下拉菜单中使用，比如用于角色元素的 `Message Sound` 的菜单中。
::: 

可以使用 `Naninovel -> Configuration -> Audio` 菜单配置音频表现。有关可用选项的信息，请参阅[属性配置](/zh/guide/configuration.md#音频)。

## 背景音乐

使用 [@bgm] 命令后跟剪辑名称来控制在naninovel脚本中的音乐播放：

```nani
; Starts playing a music track with the name `Sanctuary` in a loop
@bgm Sanctuary

; Same as above, but fades-in the volume over 10 seconds and plays only once
@bgm Sanctuary fade:10 loop:false

; Changes volume of all the played music tracks to 50% over 2.5 seconds and makes them play in a loop
@bgm volume:0.5 loop:true time:2.5
```

音轨默认循环播放。在 [@bgm] 命令后未定义名字时，所有当前播放的音轨都会收到该命令影响。当音轨正在播放时，不会受到影响（不会重头播放），但是个别参数（音量，循环）会被应用。

使用 `intro` 参数，可以播放一次性前奏再接其他音轨循环播放，比如：

```nani
; 播放 `BattleThemeIntro` 一次然后立即循环播放 `BattleThemeMain` 。
@bgm BattleThemeMain intro:BattleThemeIntro
```

要停止播放音乐，使用 [@stopBgm] 命令接剪辑名称。如果未指定片段名称，该命令将停止所有当前播放的曲目。

```nani
; Fades-out the `Promenade` music track over 10 seconds and stops the playback
@stopBgm Promenade fade:10

; Stops all the currently played music tracks
@stopBgm
```

## 音效

使用[@sfx] 和 [@stopSfx]命令跟剪辑名称，以在naninovel脚本中控制音效的播放：

```nani
; 播放 `Explosion` 音效一次
@sfx Explosion

; 循环播放  `Rain`  音效
@sfx Rain loop:true

; 2.5秒内调整所有音量到75%，并关闭所有循环播放选项
@sfx volume:0.75 loop:false time:2.5
```

音效默认不循环播放。在 [@sfx] 命令后未定义名字时，所有当前播放的音轨都会收到该命令影响。当音轨正在播放时，不会受到影响（不会重头播放），但是个别参数（音量，循环）会被应用。

要停止播放音效（无论是否循环），使用 [@stopSfx] 命令接音效名字。当音效名字未定义，该命令会停止当前所有音效播放。

```nani
; 停止播放 `Rain`，15淡出。
@stopSfx Rain fade:15

; 停止所有音效播放。
@stopSfx
```

## 混音器

Nanonovel使用了[混音器](https://docs.unity3d.com/Manual/AudioMixer.html) 来分离背景音乐，音效和语音音轨。

![](https://i.gyazo.com/6271d59ee9ac63a0a218316bd3bc78a8.png)

可以在音频配置菜单中分配自定义混音器，更改用于每个音频通道的组和音量控制处理（公开的参数名称）。如果未分配自定义混音器，将使用默认配置。

![](https://i.gyazo.com/ef2db68edb871608d1718117a37e9486.png)

要通过自定义混音器组播放音频，使用[@bgm], [@sfx] 和 [@voice] 命令内的 `group` 参数。

```nani
; 通过 `Master/Ambient` 混音器组播放`Noise` 
@sfx Noise loop:true group:Master/Ambient

; 通过 `Master/Reverb` 混音器组播放 `ScaryVoice`
@voice ScaryVoice group:Master/Reverb
```

组别是通过 `FindMatchingGroups(groupPath)` 方法来检索当前的注册混音器。参考[Unity文档](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups) 获取更多关于混音器组路径的说明。如果提供路径下有多个组别，会使用第一个来播放音频。

在 C# 脚本中，当前使用的混音器通过[引擎服务](/zh/guide/engine-services.md) 的`IAudioManager` 来获取：

```nani
var audioManager = Engine.GetService<IAudioManager>();
var audioMixer = audioManager.AudioMixer;
```

