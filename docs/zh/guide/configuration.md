# 属性配置
资源配置保存于`Assets/NaninovelData/Resources/Naninovel/Configuration` 目录。
这些在第一次打开配置菜单的时候会自动生成。

配置菜单按 `Naninovel -> Configuration` or `Edit -> Project Settings -> Naninovel` 打开.

注意，所有配置菜单支持unity的预设保存功能如下图 [Unity's presets feature](https://docs.unity3d.com/Manual/Presets). 在发布到不同平台的时候很方便。(如, mobile, standlone, consoles, 等).

[!55f5c74bfc16e1af2455034647525df3]

在项目运行的时候也可以修改或是添加新配置，或是改变读取配置信息的方式，（如，从远端读取json文档），详情参考 [custom configuration](/zh/guide/custom-configuration.md)。
::: note
该配置根据版本 [Naninovel v1.10](https://github.com/Elringus/NaninovelWeb/releases).
:::

## Audio

<div class="config-table">

属性 | 默认值 | 描述
--- | --- | ---
Audio Loader | Audio- (Addressable, Project) | 用于读取（BGM和音效SFX）的加载器。
Voice Loader | Voice- (Addressable, Project) | 用于读取Voice（大概指人声音配音）。
Default Master Volume | 1 | 用于控制游戏音量。
Default Bgm Volume | 1 | 用于控制BGM音量。
Default Sfx Volume | 1 | 用于控制SFX音量。
Default Voice Volume | 1 | 用于控制人声音量。
Enable Auto Voicing 开启人声自动播放| False | 启用时每个`PrintText` 命令会试图播放以下的音频剪辑`VoiceResourcesPrefix/ScriptName/LineIndex.ActionIndex`。
Voice Overlap Policy 人声重叠规则| Prevent Overlap | 决定怎么播放重叠的人声：<br> • Allow Overlap — 允许已播放的声音播放结束，允许人声重叠<br> • Prevent Overlap — 停止任何正在播放的人声，再播放吓一跳，不允许人声重叠<br> • Prevent Character Overlap —  不允许同一角色的声音重叠，允许不同的角色的声音重叠。 (auto voicing)和[@voice]命令的声音可以重叠。
Custom Audio Mixer | Null | 音频混合器，用于控制Audio groups。未定义时使用默认值。
Master Volume Handle Name | Master Volume | 控制主音量的混合器的名字 (exposed parameter公开参数)。
Bgm Group Path | Master/BGM | 控制的BGM组的路径。
Bgm Volume Handle Name | BGM Volume | 控制BGM的混合器的名字 (exposed parameter公开参数)。
Sfx Group Path | Master/SFX | 控制的SFX组的路径。
Sfx Volume Handle Name | SFX Volume | 控制SFX音效的混合器的名字 (exposed parameter公开参数)。
Voice Group Path | Master/Voice | 控制人声组的路径。
Voice Volume Handle Name | Voice Volume | 控制人声的混合器的名字 (exposed parameter公开参数)。
</div>

## Backgrounds

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Default Metadata | Object Ref | 默认使用的数据的元数据配置，创建背景元素和要使用的元素ID不存在时调用的。
Metadata | Object Ref | 创建具体ID背景元素时使用的元数据。
Scene Origin | (0.5, 0.0) | 场景中背景生成的定位参考点。
Z Offset | 100 | 创建元素时初始化元素与相机的z轴偏移。
Z Step | 0.1 | z轴上生成元素的间隔，用于避免深度渲染冲突。
Default Easing | Linear | 默认使用的切换动画效果，如改变外观，位置，色调等。
Auto Show On Modify | True | 当执行修改命令后，是否自动显示（演示）元素。

</div>

## Camera

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Reference Resolution | (1920, 1080) | 参考分辨率用于评估正确渲染范围，以保证背景人物元素的正常显示，建议背景元素分辨率和该设置保持一致。
Auto Correct Ortho Size | True | 是否基于当前相机显示的方位比率来纠正正交大小，以此确保背景和人物的位置正确。
Default Ortho Size | 5.35 | 当自动纠正关闭时，默认相机正交大小。
Initial Position | (0.0, 0.0, -10.0) | 生成相机的世界坐标位置。
Orthographic | True | 相机使用透视还是正交模式，自定义相机预制体由定义时无效。
Custom Camera Prefab | Null | 带相机组件用于渲染的预制体，不定义时，使用默认设置，如果你想修改部分属性（背景色，FOV，HDR，等）或者添加后处理脚本效果，按需创建预制体绑定即可。
Use UI Camera | True | 是否使用单独相机渲染UI，会使用各自的配置应用于主要相机和UI相机，这样可以避免图像后处理影响到UI，节约部分性能。
Custom UI Camera Prefab | Null | 带相机组件的用于UI渲染的相机预制体，不配置时使用默认，当 `UseUICamera` 关闭时无效。
Default Easing | Linear | 默认使用的相机过渡动画效果（缩放，位置，旋转等）。
Thumbnail Resolution | (240, 140) | 保存栏位的截图分辨率。
Hide UI In Thumbnails | False | 截图时是否忽略UI层级。

</div>

## Characters

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Auto Arrange On Add | True | 是否按X轴平均分布新生成的角色。
Default Metadata | Object Ref | 默认使用的数据的元数据配置，创建角色元素和要使用的元素ID不存在时调用的。
Metadata | Object Ref | 创建具体ID角色元素时使用的元数据。
Avatar Loader | Character Avatars- (Addressable, Project) | 用于加载人物头像的资源加载器配置。
Scene Origin | (0.5, 0.0) | 场景中人物生成的定位参考点。
Z Offset | 50 | 生成元素到相机的z轴偏移。
Z Step | 0.1 | 生成元素z轴偏移，避免深度渲染冲突。
Default Easing | Smooth Step | 默认使用的切换动画效果，如改变外观，位置，色调等。
Auto Show On Modify | True | 当执行修改命令后，是否自动显示（演示）元素。

</div>

## Choice Handlers

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Default Handler Id | Button List | 默认使用的选择处理器。
Default Metadata | Object Ref | 默认使用的数据的元数据配置，创建选择处理器和要使用的选择处理器ID不存在时调用的。
Metadata | Object Ref | 创建具体ID选择处理器时使用的元数据。
Default Easing | Linear | 默认使用的切换动画效果，如改变外观，位置，色调等。
Auto Show On Modify | True | 当执行修改命令后，是否自动显示（演示）元素。

</div>

## Custom Variables

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Predefined Variables | Object Ref | 默认初始化的列表变量。 全局变量（名字 `G_` or `g_`开头）在启动时初始化，其他在每个state使用时初始化。

</div>

## Engine

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Generated Data Path | Naninovel Data | 存储自动生成资源的路径。
Override Objects Layer | False | 是否为所有引擎物体，绑定特定layer，用于Unity相机渲染的culling mask，用于避免Naninovel被其他相机渲染。
Objects Layer | 0 | 当 `Override Objects Layer` 开启时，该layer会被用于所有游戏物体。
Async Exception Log Type | Error | Log type to use for UniTask-related exceptions.
Initialize On Application Load | True | 应用启动时，本资源是否自动初始化。
Show Initialization UI | True | 资源初始化的时候，是否显示加载UI。
Custom Initialization UI | Null | 前者启用时显示的UI。不定义时使用默认。
Show Title UI | True | 资源初始化完成以后是否自动显示标题画面，你可以定制标题画面，使用资源的自定义UI特性，参考指导手册。
Enable Development Console | True | 是否打开开发控制台。
Toggle Console Key | Back Quote | 切换控制台的key，在触摸屏你可以使用多点触摸呼出。

</div>

## Input

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Spawn Event System | True | 是否在初始化是生成event system。
Custom Event System | Null | 带有`EventSystem` 组件的预制体，用于监听输入，未定义时生成默认的。
Spawn Input Module | True | 是否在初始化是生成input module。
Custom Input Module | Null | 带有`InputModule`  组件的预制体，用于监听输入，未定义时生成默认的。
Touch Frequency Limit | 0.1 | 触摸输入频率闲置，单位秒。
Process Legacy Bindings | True | 是否使用传统输入方式，如果使用新的Unity输入系统，就关闭。
Bindings | Object Ref | 用于存取输入的Bindings。

</div>

## Localization

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | Localization- (Addressable, Project) | 用于加载本地化资源的加载器。
Source Locale | En |本地项目的使用哪种本地化配置(用于资源的语言设置)。
Default Locale | Null | 第一次启动时使用的本地化配置。如果不配置则使用 `Source Locale` 的配置。

</div>

## Managed Text

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | Text- (Addressable, Project) | 用于加载托管文本的资源加载器配置。

</div>

## Movies

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | Movies- (Addressable, Project) | 用于加载电影的资源加载器配置。
Skip On Input | True | 播放时是否允许用户点击去掉跳过。
Skip Frames | True | 是否允许帧跳过以匹配当前时间。
Fade Duration | 1 | 播放开始结束时的渐入渐隐时长。
Custom Fade Texture | Null | 渐入渐隐显示的图片，不定义时使用默认黑色效果过渡。
Play Intro Movie | False | 显示标题菜单以前是否使用开场动画。
Intro Movie Name | Null | 开场动画的路径配置。

</div>

## Resource Provider

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Resource Policy | Static | 脚本执行时，加载卸载资源的规则：<br> • Static — （静态）所有资源在读取画面时预加载，并在脚本执行完成后卸载，默认使用的配置推荐适用于大多情况。<br> • Dynamic — （动态）根据`Dynamic Policy Steps`加载，不使用的资源卸载。用于低配低内存设备，可能在游戏时会有加载时间卡顿。
Dynamic Policy Steps | 25 | 当Resource Policy使用动态配置时，定义在多少句前预加载。
Optimize Loading Priority | True | 当Resource Policy使用动态配置时，会将Uniyt的后台加载线程优先级设置为低，避免加载卡顿。
Log Resource Loading | False | 是否再加载界面显示资源加载信息。
Enable Build Processing | True | Whether to register a custom build player handle to process the assets assigned as Naninovel resources.<br><br>注意: 重启Unity编辑器后生效。
Use Addressables | True | 当Addressable Asset System安装时，开启会优化资源读取，节约build时间。
Auto Build Bundles | True | Whether to automatically build the addressable asset bundles when building the player.  `Use Addressables` 关闭时无效。
Allow Addressable In Editor | False | Whether to use addressable provider in editor. Enable if you're manually exposing resources via addressable address instead of assigning them with Naninovel's resource managers. Be aware, that enabling this could cuase issues when resources are assigned both in resources manager and registered with an addressable address and then renamed or dublicated.
Extra Labels | Null | Addressable provider will only work with assets, that have the assigned labels in addition to `Naninovel` label. Can be used to filter assets used by the engine based on custom criterias (eg, HD vs SD textures).
Local Root Path | %DATA%/Resources | Path root to use for the local resource provider. Can be an absolute path to the folder where the resources are located, or a relative path with one of the available origins:<br> • %DATA% — Game data folder on the target device (UnityEngine.Application.dataPath).<br> • %PDATA% — Persistent data directory on the target device (UnityEngine.Application.persistentDataPath).<br> • %STREAM% — `StreamingAssets` folder (UnityEngine.Application.streamingAssetsPath).<br> • %SPECIAL{F}% — An OS special folder (where F is value from System.Environment.SpecialFolder).
Project Root Path | Naninovel | Path relative to `Resources` folders, under which the naninovel-specific assets are located.
Google Drive Root Path | Resources | Path root to use for the Google Drive resource provider.
Google Drive Request Limit | 2 | Maximum allowed concurrent requests when contacting Google Drive API.
Google Drive Caching Policy | Smart | Cache policy to use when downloading resources. `Smart` will attempt to use Changes API to check for the modifications on the drive. `PurgeAllOnInit` will to re-download all the resources when the provider is initialized.

</div>

## Script Player

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Skip Time Scale | 10 | 在skip模式下使用的time scale。
Min Auto Play Delay | 3 | 在auto模式下执行到下一句命令的最小等待时长。
Show Debug On Init | False | 是否再引擎初始化时显示玩家debug窗口。

</div>

## Scripts

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | Scripts- (Addressable, Project) | 用于加载Naninovel脚本的的资源加载器配置。
Initialization Script | Null | 在引擎初始化完成后执行的脚本。
Title Script | Null | 显示标题画面时执行的脚本。用于定制标题画面，背景，音乐等。
Start Game Script | Null | 开始新游戏时执行的脚本，未定义时使用配置的第一脚本。
Auto Add Scripts | True | 是否自动添加创建的Naninovel脚本。
Hot Reload Scripts | True | 运行中是否自动重新加载编辑后的脚本。
Count Total Commands | False | 是否在初始化时计算所有可执行语句数量。如果你不使用`TotalCommandsCount`属性和脚本内的`CalculateProgress` 方法，可以关闭来节省加载时间。
Enable Visual Editor | True | 选中脚本时是否自动显示内置编辑器。
Hide Unused Parameters | True | 某行未被选定或鼠标停留时，是否隐藏未指定参数的命令。
Insert Line Key | Space | 显示`Insert Line`窗口的快捷键。设置为`None`关闭。
Insert Line Modifier | Control | `Insert Line Key`的快捷键。设置为`None`关闭。
Save Script Key | S | 选中时保存序列化脚本的快捷键，设置为`None`关闭。
Save Script Modifier | Control | `Save Script Key`的快捷键。设置为`None`关闭。
Editor Page Length | 1000 | 内置编辑器每页可现实多少行。
Editor Custom Style Sheet | Null | 允许调整编辑器的默认风格。
Graph Orientation | Horizontal | 允许调整水平或垂直方向。
Graph Auto Align Padding | (10.0, 0.0) | 在每个节点执行时会加上的外边距。
Graph Custom Style Sheet | Null | 允许调整默认脚本样式。
Enable Community Modding | False | 是否允许添加外部naninovel脚本。
External Loader | Scripts- (Local) | 用于加载外部naninovel脚本的资源加载器配置。
Enable Navigator | True | 是否允许初始化脚本导航器浏览所有可用naninovel脚本。
Show Navigator On Init | False | 是否在初始化完成以后显示naninovel脚本导航器。
Navigator Sort Order | 900 | 脚本导航器的sort order。

</div>

## Spawn

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | Spawn- (Addressable, Project) | 用于生成资源的资源加载器配置。

</div>

## State

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Save Folder Name | Saves | 会创建于游戏数据目录。
Default Settings Slot Id | Settings | 设置保存文件的名字。
Default Global Slot Id | Global Save | 全局保存文件的名字。
Save Slot Mask | Game Save{0:000} | 命名保存栏位的Mask名字。
Quick Save Slot Mask | Game Quick Save{0:000} | 命名快速保存栏位的Mask名字。
Save Slot Limit | 99 | 最大保存栏位。
Quick Save Slot Limit | 18 | 最大快速保存栏位。
Binary Save Files | True | 是否保存为(.nson) 文件而非(.json)，更难编辑和作弊，会花费更多cpu和保存读取时间。
Load Start Delay | 0.3 | 在开始加载命令前的等待时间（秒），用于完成预加载动画，避免加载相关的卡顿。
Reset On Goto | True | 是否允许在使用[@goto]命令是卸载资源，推荐开启，避免内存溢出问题，如果关闭了该配置，可以手动使用[@resetState]命令控制卸载资源。
Enable State Rollback | True | 是否允许玩家回跳文本。
State Rollback Steps | 1024 | 允许在运行时回跳的最大步进数，更大值耗费更多内存。
Saved Rollback Steps | 128 | 允许在读取存档后回跳的最大步进数，更大值保存文件会耗费更多空间。
Game State Handler | Naninovel.IO Game State Slot Manager, Elringus.Naninovel.Runtime, Version=0.0.0.0, Culture=neutral, Public Key Token=null | Implementation responsible for de-/serializing local (session-specific) game state; see `State Management` guide on how to add custom serialization handlers.
Global State Handler | Naninovel.IO Global State Slot Manager, Elringus.Naninovel.Runtime, Version=0.0.0.0, Culture=neutral, Public Key Token=null | Implementation responsible for de-/serializing global game state; see `State Management` guide on how to add custom serialization handlers.
Settings State Handler | Naninovel.IO Settings Slot Manager, Elringus.Naninovel.Runtime, Version=0.0.0.0, Culture=neutral, Public Key Token=null | Implementation responsible for de-/serializing game settings; see `State Management` guide on how to add custom serialization handlers.

</div>

## Text Printers

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Default Printer Id | Dialogue | 默认使用的text printer的ID配置。
Max Reveal Delay | 0.06 | 延迟限制（单位秒），在设置中`message speed`可用值范围，值越大，显示速度越慢。
Max Auto Wait Delay | 0.02 | 延迟限制（单位秒），auto模式下每个字母的显示间隔，在设置中`auto delay`可用值范围，值越大，显示速度越慢。
Scale Auto Wait | True | 是否在auto模式下根据显示速度自动缩放等待时间。
Default Metadata | Object Ref | 默认使用的text printer的元数据配置，创建text printer和要使用的text printer的ID不存在时调用的。
Metadata | Object Ref | 创建具体ID的text printer元素时使用的元数据
Scene Origin | (0.5, 0.0) | 场景中生成元素的定位参考点。
Z Offset | 100 | 生成元素到相机的z轴偏移。
Z Step | 0.1 | z轴上生成元素的间隔，用于避免深度渲染冲突。
Default Easing | Linear | 默认使用的切换动画效果，如改变外观，位置，色调等。
Auto Show On Modify | False | 当执行修改命令后，是否自动显示（演示）元素。

</div>

## UI

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | UI- (Addressable, Project) | 用于加载UI的资源加载器配置。
Objects Layer | 5 | 引擎用于注册UI的layer，用于遮挡剔除UI，用于`toogle UI`特性。
Render Mode | Screen Space Camera | 用于所有管理的UI元素的画布渲染模式。
Sorting Offset | 1 | 所有管理元素的排序步进。

</div>

## Unlockables

<div class="config-table">

Property | Default Value | Description
--- | --- | ---
Loader | Unlockables- (Addressable, Project) | 用于加载未解锁资源的资源加载器配置。
</div>

