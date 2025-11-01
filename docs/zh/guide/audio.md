# 音频

本篇文章将介绍背景音乐（BGM）和音效（SFX）；关于语音的内容请参阅 [语音指南](/guide/voicing)。

要添加、编辑或删除 BGM 和 SFX 资源，请使用通过 `Naninovel -> Resources -> Audio` 访问的音频资源管理器。你可以使用任何 [Unity 支持的音频格式](https://docs.unity3d.com/Manual/AudioFiles.html)。

![](https://i.gyazo.com/cacdec36623dbbfcf9f49c594de53c0f.png)

::: tip
选择最适合你开发流程的文件格式。在构建项目时，Unity 会自动将所有源资源（纹理、音频、视频等）转换为最适合目标平台的格式，因此在项目中以哪种格式存储资源并不会产生差别。有关 Unity 如何管理项目资源的更多信息，请参阅 [官方文档](https://docs.unity3d.com/Manual/AssetWorkflow)。
:::

如果你有大量音频文件，通过编辑器菜单逐一分配会比较麻烦，也可以直接将它们放入 `Resources/Naninovel/Audio` 文件夹中，它们会自动在脚本中可用。你还可以根据需要使用子文件夹进行整理；在这种情况下，在 Naninovel 脚本中引用它们时请使用正斜杠（`/`）。例如，存储在 `Resources/Naninovel/Audio/Music/Ambient/Noise002.wav` 的音频文件，可以在脚本中通过 `Music/Ambient/Noise002` 来引用。

你也可以使用 [可寻址资源系统](/guide/resource-providers#addressable) 手动公开资源。要公开一个资源，请为其分配与上面方法中相同的路径作为地址，但省略 “Resources/” 部分。例如，要公开一个名为 “MainTheme.wav” 的 BGM，请为该音频剪辑资源分配以下地址：`Naninovel/Audio/MainTheme`。请注意，默认情况下编辑器中不会使用可寻址资源提供程序；你可以在资源提供程序配置菜单中启用 `Enable Addressable In Editor` 属性以允许其在编辑器中使用。

::: warning
未通过资源管理器分配的音频资源将无法在编辑器中的各种下拉菜单中使用，例如用于为角色演员选择 `Message Sound`（消息音效）的菜单。
:::

可以通过 `Naninovel -> Configuration -> Audio` 上下文菜单配置音频播放行为；可用选项请参阅 [配置指南](/guide/configuration#audio)。

## 背景音乐

在 Naninovel 脚本中使用 [@bgm] 指令并跟随音频剪辑名称来控制音乐播放：

```nani
; 循环播放名为 `Sanctuary` 的音乐曲目。  
@bgm Sanctuary

; 与上面相同，但在 10 秒内淡入音量，仅播放一次。  
@bgm Sanctuary fade:10 !loop

; 将所有正在播放的音乐音量在 2.5 秒内调整为 50%，并使其循环播放。
@bgm volume:0.5 loop! time:2.5
```

音乐曲目默认是循环播放的。当 [@bgm] 指令中未指定音乐名称时，所有当前播放的曲目都会受到影响。当对一个正在播放的曲目再次调用该指令时，播放不会被重置（不会从头开始播放），但会应用指定的参数（音量以及是否循环）。

可以使用 `intro` 参数播放一个前奏（Intro）后接主循环，例如：

```nani
; 播放一次 `BattleThemeIntro`，然后循环播放 `BattleThemeMain`。
@bgm BattleThemeMain intro:BattleThemeIntro
```

要停止正在播放的音乐曲目，请使用 [@stopBgm] 指令并跟随音频名称。当未指定音频名称时，该指令会停止所有当前正在播放的音乐。

```nani
; 在 10 秒内淡出并停止播放 `Promenade` 音乐曲目。
@stopBgm Promenade fade:10

; 停止所有当前正在播放的音乐曲目。
@stopBgm
```

## 音效

在 Naninovel 脚本中使用 [@sfx] 和 [@stopSfx] 指令并跟随音频名称来控制音效的播放：

```nani
; 播放名为 `Explosion` 的音效一次。 
@sfx Explosion

; 循环播放名为 `Rain` 的音效。  
@sfx Rain loop!

; 将所有正在播放的音效音量在 2.5 秒内调整为 75%，并禁用它们的循环播放。
@sfx volume:0.75 !loop time:2.5
```

音效轨道默认不循环播放。当 [@sfx] 指令中未指定音效名称时，所有当前正在播放的音效都会受到影响。当对一个正在播放的音效再次调用该指令时，播放不会被重置（不会从头开始播放），但会应用指定的参数（音量以及是否循环）。

要停止正在播放的音效（无论是否循环），请使用 [@stopSfx] 指令并跟随音效名称。当未指定音效名称时，该指令会停止所有当前正在播放的音效轨道。

```nani
; 在 15 秒内淡出并停止播放名为 `Rain` 的音效。  
@stopSfx Rain fade:15

; 停止所有当前正在播放的音效轨道。
@stopSfx
```

## 音频混音器

Naninovel 在播放音频时会使用一个 [音频混音器（Audio Mixer）](https://docs.unity3d.com/Manual/AudioMixer.html) 资源，用于将 BGM、SFX 和语音通道分离。

![](https://i.gyazo.com/6271d59ee9ac63a0a218316bd3bc78a8.png)

你可以在音频配置菜单中分配自定义混音器资源，修改每个音频通道所使用的分组，以及音量控制参数（暴露的参数名称）。当未分配自定义混音器资源时，将使用默认混音器。

![](https://i.gyazo.com/ef2db68edb871608d1718117a37e9486.png)

要通过自定义混音器分组播放音频，请在 [@bgm]、[@sfx] 和 [@voice] 指令中使用 `group` 参数指定分组路径。

```nani
; 通过 `Master/Ambient` 混音器分组循环播放音频资源 `Noise`。
@sfx Noise loop! group:Master/Ambient

; 通过 `Master/Reverb` 混音器分组播放语音资源 `ScaryVoice`。
@voice ScaryVoice group:Master/Reverb
```

分组是通过当前分配的音频混音器资源的 `FindMatchingGroups(groupPath)` 方法获取的；有关路径格式的更多信息，请参阅 [Unity 文档](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。如果提供的路径对应多个分组，将使用第一个分组来播放音频。

## 自定义音频后端

Unity 允许将其内置音频后端替换为自定义解决方案，例如 [FMOD](https://www.fmod.com) 和 [Wwise](https://www.audiokinetic.com/en/wwise/)。为支持这一点，我们确保 Naninovel 的 `IAudioManager` 接口不依赖于默认音频后端（例如，它不会引用 `AudioClip`、`AudioSource` 等）。这使你可以在无需修改引擎源代码的情况下，[重写该服务](/guide/engine-services#overriding-built-in-services)，从而使用自定义音频后端。

以下是一个为 FMOD 实现此类重写的最小示例。

```cs
[InitializeAtRuntime(@override: typeof(AudioManager))]
public class FMODAudioManager : IAudioManager
{
    // Assuming FMOD resource loading is managed externally.
    public IResourceLoader AudioLoader { get; } = new NullResourceLoader();

    // Assuming FMOD's lifecycle is managed externally.
    public UniTask InitializeService () => UniTask.CompletedTask;
    public void DestroyService () { }

    public UniTask PlaySfx (string path, ...)
    {
        // Resolve the FMOD's event reference from the path and play it.
    }

    public AudioMixerGroup GetGroup (string groupPath)
    {
        // It's OK to return null or otherwise ignore unsupported features.
        return null;
    }

    // Other APIs...
}
```
