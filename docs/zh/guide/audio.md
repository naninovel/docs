# 音频

要添加、编辑或删除背景音乐 (BGM) 和声音效果 (SFX) 资源，请使用可通过 `Naninovel -> Resources -> Audio` 访问的音频资源管理器。您可以使用 [Unity 支持](https://docs.unity3d.com/Manual/AudioFiles.html) 的任何音频格式。

::: tip
选择最适合您的开发工作流程的文件格式。构建项目时，Unity 会自动将所有源资源（纹理、音频、视频等）转换为最适合目标平台的格式，因此您最初在项目中存储资源的格式不会产生影响。在 [官方文档](https://docs.unity3d.com/Manual/AssetWorkflow) 中查找有关 Unity 如何管理项目资产的更多信息。
:::

如果您有很多音频文件，并且通过编辑器菜单分配它们不方便，您可以将它们放在 `Resources/Naninovel/Audio` 文件夹中，它们将自动在脚本中可用。如果您愿意，您还可以使用子文件夹组织它们；在这种情况下，在剧本脚本中引用它们时使用正斜杠 (`/`)。例如，存储为 `Resources/Naninovel/Audio/Music/Ambient/Noise002.wav` 的音频剪辑可以在脚本中引用为 `Music/Ambient/Noise002`。

也可以使用 [Addressable 资产系统](/zh/guide/resource-providers#addressable) 手动公开资源。要公开资产，请分配一个等于您通过上述方法公开它时使用的路径的地址，但省略 "Resources/" 部分。例如，要公开 "MainTheme.wav" BGM，请为剪辑资产分配以下地址：`Naninovel/Audio/MainTheme`。请注意，Addressable 提供者默认情况下不在编辑器中使用；您可以通过打开资源提供者配置菜单中的 `Enable Addressable In Editor` 属性来启用它。

::: warning
未通过资源管理器分配的音频资产将在各种编辑器下拉列表中不可用，例如用于为角色 actor 选择 `Message Sound` 的下拉列表。
:::

可以使用 `Naninovel -> Configuration -> Audio` 上下文菜单配置音频播放行为；有关可用选项，请参阅 [配置指南](/zh/guide/configuration#音频)。

## 背景音乐

使用 [@bgm] 命令后跟剪辑名称来控制剧本脚本中的音乐播放：

```nani
; 开始循环播放名为 "Sanctuary" 的音乐曲目。
@bgm Sanctuary

; 与上面相同，但在 10 秒内淡入音量并且只播放一次。
@bgm Sanctuary fade:10 !loop

; 在 2.5 秒内将所有正在播放的音乐曲目的音量更改为 50%
; 并使它们循环播放。
@bgm volume:0.5 loop! time:2.5
```

默认情况下，音乐曲目是循环播放的。当 [@bgm] 命令中未指定音乐曲目名称时，将影响所有当前正在播放的曲目。当为已在播放的曲目调用时，曲目不会重新开始，但会应用指定的参数（音量和曲目是否循环）。

可以使用 `intro` 参数播放前奏，然后循环播放，例如：

```nani
; 播放 "BattleThemeIntro" 一次，然后循环播放 "BattleThemeMain"。
@bgm BattleThemeMain intro:BattleThemeIntro
```

要停止播放音乐曲目，请使用 [@stopBgm] 命令，后跟剪辑名称。当未指定剪辑名称时，该命令将停止所有当前正在播放的曲目。

```nani
; 在 10 秒内淡出 "Promenade" 音乐曲目并停止播放。
@stopBgm Promenade fade:10

; 停止所有当前正在播放的音乐曲目。
@stopBgm
```

## 声音效果

使用 [@sfx] 和 [@stopSfx] 命令后跟剪辑名称来控制剧本脚本中声音效果的播放：

```nani
; 播放名为 "Explosion" 的 SFX 一次。
@sfx Explosion

; 循环播放名为 "Rain" 的 SFX。
@sfx Rain loop!

; 在 2.5 秒内将所有正在播放的 SFX 曲目的音量更改为 75%
; 并禁用所有它们的循环。
@sfx volume:0.75 !loop time:2.5
```

声音效果曲目默认不循环。当 [@sfx] 命令中未指定 SFX 曲目名称时，将影响所有当前正在播放的曲目。当为已在播放的曲目调用时，曲目不会重新开始，但会应用指定的参数（音量和曲目是否循环）。

要停止播放声音效果（无论是否循环），请使用 [@stopSfx] 命令，后跟剪辑名称。当未指定剪辑名称时，该命令将停止所有当前正在播放的 SFX 曲目。

```nani
; 停止播放名为 "Rain" 的 SFX，淡出 15 秒。
@stopSfx Rain fade:15

; 停止所有当前正在播放的声音效果曲目。
@stopSfx
```

## 音频混音器

Naninovel 在播放音频时使用 [音频混音器](https://docs.unity3d.com/Manual/AudioMixer.html) 资产来分离 BGM、SFX 和语音通道。

![](https://i.gyazo.com/6271d59ee9ac63a0a218316bd3bc78a8.png)

可以分配自定义混音器资产，更改每个音频通道使用的组，并在音频配置菜单中更改音量控制处理程序（公开的参数名称）。当未分配自定义混音器资产时，将使用默认资产。

![](https://i.gyazo.com/ef2db68edb871608d1718117a37e9486.png)

要通过自定义混音器组播放音频，请使用 [@bgm]、[@sfx] 和 [@voice] 命令中可用的 `group` 参数指定组路径。

```nani
; 通过 "Master/Ambient" 混音器组循环播放 "Noise" 音频资源。
@sfx Noise loop! group:Master/Ambient

; 通过 "Master/Reverb" 混音器组播放 "ScaryVoice" 语音资源。
@voice ScaryVoice group:Master/Reverb
```

使用当前分配的音频混音器资产的 `FindMatchingGroups(groupPath)` 方法检索组；有关预期路径格式的更多信息，请参阅 [Unity 文档](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。如果多个组与提供的路径关联，则将使用第一个组来播放音频。

## 自定义音频后端

Unity 允许使用自定义解决方案（例如 [FMOD](https://www.fmod.com) 和 [Wwise](https://www.audiokinetic.com/en/wwise/)）替换其内置音频后端。为了支持这一点，我们确保 Naninovel 的 `IAudioManager` 接口不依赖于默认音频后端（例如，它不引用 `AudioClip`、`AudioSource` 等）。这允许您 [覆盖服务](/zh/guide/engine-services#覆盖内置服务) 并使用自定义音频后端，而无需修改引擎的源代码。

下面是 FMOD 的此类覆盖的最小示例。

```cs
[InitializeAtRuntime(@override: typeof(AudioManager))]
public class FMODAudioManager : IAudioManager
{
    // 假设 FMOD 资源加载是在外部管理的。
    public IResourceLoader AudioLoader { get; } = new NullResourceLoader();

    // 假设 FMOD 的生命周期是在外部管理的。
    public Awaitable InitializeService () => Async.Completed;
    public void DestroyService () { }

    public Awaitable PlaySfx (string path, ...)
    {
        // 从路径解析 FMOD 的事件引用并播放它。
    }

    public AudioMixerGroup GetGroup (string groupPath)
    {
        // 返回 null 或以其他方式忽略不支持的功能是可以的。
        return null;
    }

    // 其他 API...
}
```
