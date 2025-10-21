# 属性配置

引擎的配置信息存储在位于 `Assets/NaninovelData/Resources/Naninovel/Configuration` 文件夹中的多个 ScriptableObject 资源中。当你第一次在 Unity 编辑器中打开对应的配置菜单时，这些配置文件会被自动生成。

你可以通过菜单 `Naninovel -> Configuration` 或 `Edit -> Project Settings -> Naninovel` 打开配置界面。

请注意，所有配置菜单都支持 [Unity 的预设（Presets）功能](https://docs.unity3d.com/Manual/Presets)。这在针对不同平台（如移动端、PC、主机等）部署项目时非常有用，你可以为每个平台创建独立的配置预设。

![](https://i.gyazo.com/55f5c74bfc16e1af2455034647525df3.mp4)

此外，你也可以在运行时修改配置对象、添加自定义配置，或更改配置数据的访问方式（例如，从远程主机上的 JSON 文件中读取配置）。更多相关内容请参阅 [自定义配置指南](/zh/guide/custom-configuration)。

## 音频（Audio）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Audio Loader | Audio- (Addressable, Project) | 用于加载音频资源（BGM 和 SFX）的资源加载器配置。  
Voice Loader | Voice- (Addressable, Project) | 用于加载语音资源的资源加载器配置。  
Audio Player | Naninovel Audio Player | 负责播放音频剪辑的 IAudioPlayer 实现。  
Default Master Volume | 1 | 游戏首次启动时设置的主音量。  
Default Bgm Volume | 1 | 游戏首次启动时设置的背景音乐音量。  
Default Sfx Volume | 1 | 游戏首次启动时设置的音效音量。  
Default Voice Volume | 1 | 游戏首次启动时设置的语音音量。  
Enable Auto Voicing | False | 启用后，每个 [@print] 指令都会尝试播放对应的语音文件。  
Voice Overlap Policy | Prevent Overlap | 定义如何处理语音的并发播放：<br> • **Allow Overlap** — 允许多个语音同时播放。<br> • **Prevent Overlap** — 在播放新语音前会停止当前播放的语音。<br> • **Prevent Character Overlap** — 限制同一角色的语音重叠播放，不同角色（自动语音）以及 [@voice] 指令可同时播放。  
Voice Locales | Null | 分配语音本地化标签，以便在游戏设置中独立选择语音语言，而不受主语言本地化影响。  
Default Fade Duration | 0.35 | 播放或停止音频时音量淡入/淡出的默认持续时间。  
Play Sfx While Skipping | True | 是否在跳过模式下播放非循环音效（SFX）。禁用后，在跳过期间会忽略未启用 `loop!` 的 [@sfx] 指令。  
Custom Audio Mixer | Null | 用于控制音频分组的混音器（Audio Mixer）。若未指定，将使用默认混音器。  
Master Group Path | Master | 控制主音量的混音器组路径。  
Master Volume Handle Name | Master Volume | 控制主音量的混音器参数名称（暴露参数）。  
Bgm Group Path | Master/BGM | 控制背景音乐音量的混音器组路径。  
Bgm Volume Handle Name | BGM Volume | 控制背景音乐音量的混音器参数名称（暴露参数）。  
Sfx Group Path | Master/SFX | 控制音效音量的混音器组路径。  
Sfx Volume Handle Name | SFX Volume | 控制音效音量的混音器参数名称（暴露参数）。  
Voice Group Path | Master/Voice | 控制语音音量的混音器组路径。  
Voice Volume Handle Name | Voice Volume | 控制语音音量的混音器参数名称（暴露参数）。  

</div>

## 背景（Backgrounds）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Default Metadata | Object Ref | 当为背景角色创建实例且未定义特定 ID 的自定义元数据时，所使用的默认元数据。  
Metadata | Object Ref | 为具有特定 ID 的背景角色创建实例时所使用的元数据。  
Shared Poses | Object Ref | 各背景间共享的命名状态（Pose）。在 [@back] 指令中可使用姿态名称作为外观，以应用对应状态中启用的属性。  
Scene Origin | (0.50, 0.00) | 场景中被视为管理角色原点的参考点。该设置不会影响实际位置。  
Z Offset | 100 | 创建角色时相对于摄像机的初始 Z 轴偏移（深度）。  
Z Step | 0.1 | 创建多个角色时沿 Z 轴设置的间距，用于避免 Z-Fighting（深度冲突）问题。  
Default Duration | 0.35 | 所有角色修改（如更改外观、位置、颜色等）的默认持续时间（秒）。  
Default Easing | Linear | 所有角色修改动画（如外观、位置、颜色等）默认使用的缓动函数类型。  
Auto Show On Modify | True | 是否在执行修改指令时自动显示（显现）角色。  

</div>

## 相机（Camera）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Reference Resolution | (1920, 1080) | 参考分辨率，用于计算正确的渲染尺寸，以确保角色在场景中正确定位。一般建议设置为游戏背景贴图的分辨率。  
Reference PPU | 100 | 每个场景单位对应的像素数量。减小该值会使所有角色看起来更小，反之亦然。默认值 100 适用于大多数情况。  
Match Screen Width | False | 是否将参考场景矩形的宽度与屏幕宽度匹配。启用后，相对（场景）位置的计算将以屏幕边界为原点；否则将使用参考分辨率。  
Initial Position | (0.00, 0.00, -10.00) | 管理摄像机的初始世界坐标位置。  
Custom Camera Prefab | Null | 用于渲染的自定义摄像机预制体。如果未指定，将使用默认摄像机。若希望设置摄像机属性（如背景色、FOV、HDR 等）或添加后期处理脚本，可创建自定义摄像机预制体并在此处指定。  
Use UI Camera | True | 是否使用独立摄像机渲染 UI。此选项用于向后兼容，新项目中不建议关闭。关闭后可能出现问题（例如摄像机动画时 uGUI 布局持续重建）。  
Custom UI Camera Prefab | Null | 用于 UI 渲染的自定义摄像机预制体。如果未指定，将使用默认摄像机。当 `Use UI Camera` 被禁用时，此设置无效。  
Default Duration | 0.35 | 所有摄像机修改（缩放、位置、旋转等）的默认持续时间（秒）。  
Default Easing | Linear | 所有摄像机修改动画（缩放、位置、旋转等）默认使用的缓动函数。  
Thumbnail Resolution | (240, 140) | 用于捕获游戏存档缩略图的分辨率。  
Hide UI In Thumbnails | False | 捕获缩略图时是否忽略 UI 图层。  

</div>

## 角色（Characters）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Auto Arrange On Add | True | 当添加未指定位置的新角色时，是否自动在 X 轴上均匀分布所有角色。  
Arrange Range | (0.00, 1.00) | 表示角色分布范围的起始（x）与结束（y）位置，取值范围为 0.0～1.0，基于场景宽度计算。  
Default Metadata | Object Ref | 当创建角色实例且未定义特定 ID 的自定义元数据时，所使用的默认元数据。  
Metadata | Object Ref | 当创建具有特定 ID 的角色实例时所使用的元数据。  
Avatar Loader | Character Avatars- (Addressable, Project) | 用于加载角色头像贴图资源的资源加载器配置。  
Shared Poses | Object Ref | 各角色之间共享的命名状态（Pose）。可在 [@char] 指令中使用姿态名称作为外观，以应用对应状态中启用的属性。  
Scene Origin | (0.50, 0.00) | 场景中被视为角色原点的参考点。该设置不会影响实际位置。  
Z Offset | 50 | 创建角色时相对于摄像机的初始 Z 轴偏移（深度）。  
Z Step | 0.1 | 创建多个角色时沿 Z 轴的间距，用于防止 Z-Fighting（深度冲突）问题。  
Default Duration | 0.35 | 所有角色修改（如更改外观、位置、颜色等）的默认持续时间（秒）。  
Default Easing | Smooth Step | 所有角色修改动画（如外观、位置、颜色等）默认使用的缓动函数类型。  
Auto Show On Modify | True | 是否在执行修改指令时自动显示（显现）角色。  

</div>

## 选项处理器（Choice Handlers）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Default Handler Id | Button List | 默认使用的选项处理器（Choice Handler）ID。  
Choice Button Loader | Choice Buttons- (Addressable, Project) | 用于加载自定义选项按钮资源的资源加载器配置。  
Default Metadata | Object Ref | 当创建选项处理器实例且未定义特定 ID 的自定义元数据时，所使用的默认元数据。  
Metadata | Object Ref | 当创建具有特定 ID 的选项处理器实例时所使用的元数据。  
Default Duration | 0.35 | 所有角色修改（如更改外观、位置、颜色等）的默认持续时间（秒）。  
Default Easing | Linear | 所有角色修改动画（如外观、位置、颜色等）默认使用的缓动函数类型。  
Auto Show On Modify | True | 是否在执行修改指令时自动显示（显现）角色。  

</div>

## 自定义变量（Custom Variables）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Predefined Variables | Object Ref | 要默认初始化的变量列表。全局变量（名称以 `g_` 开头）将在应用首次启动时初始化，其他变量会在每次状态重置时重新初始化。  

</div>

## 引擎（Engine）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Override Objects Layer | False | 是否为所有引擎对象指定特定的渲染层（Layer）。引擎摄像机会将该层用于裁剪遮罩（Culling Mask）。可用于防止 Naninovel 对象被其他摄像机渲染。  
Objects Layer | 0 | 当启用 `Override Objects Layer` 时，所有引擎对象将被分配到此指定层。  
Async Exception Log Type | Error | 用于记录 UniTask 相关异常的日志类型。  
Async Instantiation | True | 是否在实例化引擎对象时使用 `Object.InstantiateAsync`，以将大部分工作移出主线程。除非遇到兼容性问题，建议保持启用。  
Initialize On Application Load | True | 是否在应用程序启动时自动初始化引擎。  
Scene Independent | True | 是否对引擎对象应用 `DontDestroyOnLoad`，使其生命周期独立于任何已加载场景。禁用后，引擎对象将成为初始化所在场景的一部分，并在场景卸载时被销毁。  
Show Initialization UI | True | 是否在引擎初始化期间显示加载 UI。  
Custom Initialization UI | Null | 在引擎初始化时显示的自定义 UI（启用时）。若未指定，将使用默认加载界面。  
Enable Bridging | True | 是否自动启动桥接服务器，以便与外部 Naninovel 工具（如 IDE 扩展、网页编辑器等）通信。  
Auto Generate Metadata | True | 是否在 Unity 编辑器启动或重新编译 C# 脚本后自动生成项目元数据。  
Enable Development Console | True | 是否启用开发者控制台。  
Debug Only Console | False | 启用后，开发者控制台仅在开发（调试）构建中可用。  

</div>

## 输入（Input）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Spawn Event System | True | 是否生成 Naninovel 专用的事件系统（Event System）；该系统是 uGUI 交互所必需的。若希望自行初始化事件系统，请禁用此选项。  
Event System | Null | 包含 `EventSystem` 组件的预制体，在引擎初始化时实例化并用于输入处理。若未指定，将使用默认事件系统。  
Input Actions | Null | 当 Unity 的输入系统已安装时，可在此处指定输入动作（Input Actions）资源。<br><br>要将输入动作映射到 Naninovel 的输入采样器，请创建名为 `Naninovel` 的动作映射（Action Map），并添加与输入名称相同的动作。<br><br>若未指定，将使用默认输入动作配置。  
Action Maps | Object Ref | 在指定的 “Input Actions” 资源中，要注册到 Naninovel 输入系统的动作映射名称列表。  
Detect Input Mode | True | 是否在检测到关联设备被激活时自动切换输入模式。例如，当按下手柄任意按键时切换为手柄模式；当点击鼠标按钮时切回鼠标模式。  

</div>

## 本地化（Localization）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---
Loader | Localization- (Addressable, Project) | 用于加载本地化资源的资源加载器配置。  
Languages | Object Ref | RFC5646 语言标签与语言显示名称的映射表。修改后需重新启动 Unity 编辑器才能生效。  
Source Locale | En | 源项目资源的语言区域（即项目资产的原始创作语言）。  
Expose Source Locale | True | 是否将源语言区域对终端用户（玩家）可见，即是否包含在语言选择列表中。<br><br>禁用该选项在某些情况下会很有用，例如希望将原始可本地化文本分享给第三方（如校对人员），但又不希望共享完整演出脚本文件。此时可禁用该选项，并为源语言创建单独的语言区域，以便导出到本地化文档或表格中。  
Default Locale | Null | 游戏首次运行时默认选择的语言区域。若未指定，则使用 `Source Locale`。  
Auto Detect Locale | True | 启用后，游戏在首次运行时会尝试根据系统语言自动检测语言区域；若检测到的语言受游戏支持，则自动选择，否则回退到 `Default Locale`。  
Record Separator |   | 用于连接本地化脚本记录（如普通文本行的多个部分及可本地化参数值）的文本分隔字符。  
Annotation Prefix | > | 插入在注释行前的字符，用于将其与本地化文本区分开。注释用于为翻译人员提供额外上下文（如文本作者、内联指令、包含本地化参数的指令行等）。在这种情况下，注释中的本地化部分会以占位符符号替代，因为它们会在下一行注释中重复出现以供翻译。  

</div>

## 托管文本（Managed Text）

:::tip
译注：托管文本即UI中用于多语言的文本内容，基于键值（ID/Key-Value）对应关系。
:::

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Loader | Text- (Addressable, Project) | 用于加载托管文本文档的资源加载器配置。  
Multiline Documents | Object Ref | 使用多行格式的托管文本文档的本地资源路径。  

</div>

## 视频（Movies）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Loader | Movies- (Addressable, Project) | 用于加载影片资源的资源加载器配置。  
Skip On Input | True | 当用户触发 `cancel` 输入键时，是否跳过影片播放。  
Skip Frames | True | 是否跳帧以追赶当前播放时间。  
Fade Duration | 1 | 在开始或结束播放影片前淡入/淡出的持续时间（秒）。  
Custom Fade Texture | Null | 淡入淡出时显示的自定义纹理；若未指定，将使用简单的黑色纹理。  
Play Intro Movie | False | 是否在引擎初始化后、显示主菜单前自动播放开场影片。  
Intro Movie Name | Null | 开场影片资源的路径。  

</div>

## 资源提供器（Resource Provider）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Resource Policy | Conservative | 定义脚本执行过程中资源加载与卸载的策略：<br><br> • **Conservative（保守模式）** — 默认模式，兼顾内存占用与加载效率。在开始播放脚本时，会预加载执行所需的所有资源，并在脚本播放完毕后卸载。通过 [@gosub] 指令引用的脚本资源也会一并预加载。可使用 [@goto] 指令的 `hold` 参数来额外预加载其他脚本。<br><br> • **Optimistic（乐观模式）** — 会预加载当前脚本以及 [@goto]、[@gosub] 指令所引用的所有脚本资源，且不会自动卸载，除非在 [@goto] 指令中显式指定 `release` 参数。该模式能显著减少加载界面并保证流畅回滚，但需要手动管理资源卸载，稍有不慎可能导致内存不足。<br><br> • **Lazy（惰性模式）** — 启动播放时不会预加载任何资源，也不会自动显示加载界面。仅在脚本播放时“即时”加载后续指令所需资源，并在使用后立即释放。此策略无需规划和手动管理，内存占用最低，但可能因后台加载导致卡顿，尤其在快进或回滚时更明显。  
Lazy Buffer | 25 | 启用惰性加载策略时，用于控制预加载缓冲区大小（即预加载的最大脚本指令数）。  
Lazy Priority | Below Normal | 启用惰性加载策略时，控制后台加载资源线程的优先级。降低优先级可减少卡顿，但会延长加载时间。  
Remove Actors | True | 卸载脚本资源时是否自动移除未使用的演出元素（角色、背景、文本输出窗和选项处理器）。即使启用此项，仍可随时通过 `@remove` 指令手动移除演出元素。  
Log Resource Loading | False | 是否在日志中记录资源加载与卸载操作。  
Enable Build Processing | True | 是否注册自定义构建处理器以在打包过程中处理 Naninovel 资源。<br><br>⚠️ **注意**：修改该设置后需重启 Unity 编辑器方可生效。  
Use Addressables | True | 当已安装 Addressable Asset System 时，启用此项可优化资源处理流程并缩短构建时间。  
Auto Build Bundles | True | 是否在构建游戏时自动生成 Addressable 资源包。当 `Use Addressables` 被禁用时无效。  
Label By Scripts | True | 是否根据演出脚本路径为所有 Naninovel Addressable 资源打标签。当 Addressable 组的 `Bundle Mode` 设为 `Pack Together By Label` 时，可提高资源包打包效率。<br><br>请注意：此功能会为所有带有 “Naninovel” 标签的资源添加演出脚本标签，包括手动暴露给 Naninovel 资源提供器的资源。  
Extra Labels | Null | 除 `Naninovel` 标签外，Addressable 资源提供器仅会处理具有额外指定标签的资源。可用于根据自定义条件（例如 HD 与 SD 贴图）筛选引擎使用的资源。  
Local Root Path | %DATA%/Resources | 本地资源提供器的根路径。可为资源文件夹的绝对路径或带以下前缀的相对路径：<br> • `%DATA%` — 游戏数据文件夹（UnityEngine.Application.dataPath）<br> • `%PDATA%` — 持久化数据目录（UnityEngine.Application.persistentDataPath）<br> • `%STREAM%` — `StreamingAssets` 文件夹（UnityEngine.Application.streamingAssetsPath）<br> • `%SPECIAL{F}%` — 操作系统特殊文件夹（F 为 System.Environment.SpecialFolder 的枚举值）  
Video Stream Extension | .mp4 | 在 WebGL 平台播放流式视频（电影或视频背景）时，指定视频文件的扩展名。  
Project Root Path | Naninovel | 相对于 `Resources` 文件夹的路径，指示 Naninovel 特定资源的根目录。  

</div>

## 演出脚本播放器（Script Player）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Default Skip Mode | Read Only | 游戏首次启动时设置的默认跳过模式。  
Skip Time Scale | 10 | 在跳过（快进）模式下使用的时间缩放倍数。设为 1 表示跳过时不更改时间缩放。  
Min Auto Play Delay | 1 | 在自动播放模式下执行下一条指令前等待的最短时间（秒）。  
Complete On Continue | True | 当激活 `Continue` 输入时，是否立即完成所有带 `wait!` 标记的异步指令（如动画、隐藏/显示、颜色变化等）。  
Show Debug On Init | False | 是否在引擎初始化时显示脚本播放器调试窗口。  
Wait By Default | False | 当指令未显式指定 `wait` 参数时，是否默认等待其完成（仅对可等待的异步指令生效）。<br><br>⚠️ **警告**：此选项仅为旧版兼容保留，新项目请勿启用，将在未来版本移除。  
Show Loading UI | True | 在预加载或加载脚本时是否显示 `ILoadingUI`，可用于在加载过程中显示加载画面。  
Resolve Mode | Nearest | 在加载存档时遇到已更改的演出脚本（找不到原行或索引）时的处理方式：<br> • **Nearest** — 尝试从最近的可用位置继续播放，若无则从前一处开始（最宽容但可能造成不确定行为）。<br> • **Restart** — 从演出脚本开头重新播放（安全但需重播已完成内容）。<br> • **Error** — 抛出错误（适用于完全禁止不确定行为的场合）。  

</div>

## 演出脚本（Scripts）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Loader | Scripts- (Addressable, Project) | 用于加载 Naninovel 演出脚本资源的资源加载器配置。  
Script Compiler | Naninovel Script Compiler | 用于将源场景文本转换为演出脚本资源的 `IScriptCompiler` 实现。修改后需重新导入演出脚本资源才能生效。  
Compiler Localization | (Naninovel.Compiler Localization) | NaniScript 编译器的本地化选项。更改后需重启 Unity 编辑器并重新导入演出脚本资源。  
Initialization Script | Null | 引擎初始化完成后立即播放的演出脚本本地路径。  
Title Script | Null | 显示标题界面（主菜单）时播放的演出脚本本地路径，可用于设置标题画面背景、音乐等。  
Start Game Script | Null | 开始新游戏时播放的演出脚本路径；若未指定，将使用第一个可用演出脚本。  
Auto Add Scripts | True | 是否自动将创建的 Naninovel 演出脚本加入资源列表。  
Auto Resolve Path | True | 当演出脚本创建、重命名或移动时，是否自动更新资源路径。  
Hot Reload Scripts | True | 在播放模式下编辑演出脚本时（无论是可视化或外部编辑），是否立即热重载应用变更。  
Watch Scripts | True | 是否监视 `.nani` 文件系统变动（用于检测外部编辑器修改）。  
Show Script Navigator | False | 是否在引擎初始化后自动显示演出脚本导航器 UI（需存在 `IScriptNavigatorUI` 资源）。  
Enable Visual Editor | True | 是否在选中演出脚本时显示可视化脚本编辑器。  
Hide Unused Parameters | True | 是否在未聚焦或悬停指令行时隐藏未赋值参数。  
Select Played Script | True | 当可视化编辑器打开时，是否自动选中当前正在播放的演出脚本。  
Insert Line Key | Space | 打开“插入行”窗口的快捷键。设为 `None` 可禁用。  
Insert Line Modifier | Control | 插入行快捷键的修饰键。  
Indent Line Key | Right Arrow | 缩进行的快捷键。  
Indent Line Modifier | Control | 缩进快捷键修饰键。  
Unindent Line Key | Left Arrow | 反缩进行的快捷键。  
Unindent Line Modifier | Control | 反缩进修饰键。  
Save Script Key | S | 保存编辑中演出脚本的快捷键。  
Save Script Modifier | Control | 保存演出脚本快捷键的修饰键。  
Rewind Mouse Button | 0 | 在可视化编辑器中点击行时，用于触发回滚的鼠标键（0=左键, 1=右键, 2=中键, -1=禁用）。  
Rewind Modifier | Shift | 回滚鼠标键的修饰键。  
Editor Page Length | 300 | 可视化编辑器每页渲染的最大演出脚本行数。  
Editor Custom Style Sheet | Null | 自定义可视化编辑器样式。  
Graph Orientation | Horizontal | 构建演出脚本图时是水平还是垂直布局。  
Graph Auto Align Padding | (10.00, 0.00) | 执行自动排列时为每个节点添加的间距。  
Show Synopsis | True | 是否在演出脚本图节点中显示演出脚本开头的注释行。  
Graph Custom Style Sheet | Null | 自定义演出脚本图的样式表。  
Enable Community Modding | False | 是否允许在构建中添加外部 Naninovel 演出脚本（社区模组支持）。  
External Loader | Scripts- (Local) | 用于加载外部 Naninovel 演出脚本资源的资源加载器配置。  

</div>

## 生成（Spawn）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Loader | Spawn- (Addressable, Project) | 用于加载生成（Spawn）资源的资源加载器配置。  

</div>

## 状态（State）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Save Folder Name | Saves | 保存文件夹名称，将在游戏数据目录下创建。  
Default Settings Slot Id | Settings | 游戏设置保存文件的名称。  
Default Global Slot Id | Global Save | 全局存档文件名称。  
Save Slot Mask | Game Save{0:000} | 用于命名存档槽的掩码。  
Quick Save Slot Mask | Game Quick Save{0:000} | 快速存档命名掩码。  
Auto Save Slot Mask | Game Auto Save{0:000} | 自动存档命名掩码。  
Save Slot Limit | 99 | 最大存档槽数量。  
Quick Save Slot Limit | 18 | 最大快速存档槽数量。  
Auto Save Slot Limit | 18 | 最大自动存档槽数量。  
Auto Save On Quit | True | 在退出游戏或返回标题菜单时自动保存（编辑器中无效）。  
Binary Save Files | True | 是否以二进制文件（`.nson`）而非文本文件（`.json`）格式保存存档。二进制文件更小且不易被修改，但保存/加载时占用更多内存与 CPU。  
Reset On Goto | False | 通过 [@goto] 加载新演出脚本时是否重置引擎服务状态。可替代 [@resetState] 指令自动卸载资源。  
Enable State Rollback | True | 是否启用状态回滚功能，让玩家可以向后回溯演出脚本。  
State Rollback Steps | 1024 | 运行时保留的状态快照数量，决定最大可回滚距离。数值越大，占用内存越多。  
Saved Rollback Steps | 128 | 在存档中保存的状态快照数量，决定加载存档后可回滚的距离。数值越大，存档文件越大。  
Game State Handler | Naninovel Universal Game State Serializer | 负责序列化/反序列化本地（会话级）游戏状态的实现。详见 “State Management” 指南。  
Global State Handler | Naninovel Universal Global State Serializer | 负责序列化/反序列化全局游戏状态的实现。  
Settings State Handler | Naninovel Universal Settings State Serializer | 负责序列化/反序列化游戏设置的实现。  

</div>

## 文本输出窗（Text Printers）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Default Printer Id | Dialogue | 默认使用的文本输出窗 ID。  
Default Base Reveal Speed | 0.5 | 游戏首次启动时的基础文本显示速度。  
Default Base Auto Delay | 0.5 | 游戏首次启动时的基础自动播放延迟。  
Max Reveal Delay | 0.06 | 每个字符的最大显示延迟（秒），定义消息显示速度的上限。  
Max Auto Wait Delay | 0.02 | 自动播放模式下每个字符的最大等待时间（秒），定义自动播放延迟范围。  
Scale Auto Wait | True | 是否根据显示速度调整自动播放模式下的等待时间。  
Skip Print Delay | 0 | 当值大于 0 时，在快进模式下每条打印指令将等待指定秒数（未缩放），可用于减缓跳过速度。  
Default Metadata | Object Ref | 创建文本输出窗时默认使用的元数据。  
Metadata | Object Ref | 为特定 ID 的文本输出窗指定的元数据。  
Scene Origin | (0.50, 0.00) | 管理的演出元素参考原点位置（不影响实际定位）。  
Z Offset | 0 | 文本输出窗创建时与摄像机的初始 Z 轴偏移。  
Z Step | 0 | 创建多个打印机时的 Z 轴间距，用于防止深度冲突。  
Default Duration | 0.35 | 所有打印机变换（外观、位置、颜色等）的默认动画时长（秒）。  
Default Easing | Linear | 打印机动画的默认缓动函数。  
Auto Show On Modify | False | 执行修改指令时是否自动显示打印机。  

</div>

## 用户界面（UI）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
UI Loader | UI- (Addressable, Project) | 用于加载 UI 资源的资源加载器配置。  
Font Loader | Fonts- (Addressable, Project) | 用于加载字体资源的资源加载器配置。  
Override Objects Layer | True | 是否为所有由引擎管理的 UI 对象指定图层（某些功能如 `Toggle UI` 必需）。  
Objects Layer | 5 | 当启用 `Override Objects Layer` 时，应用于所有 UI 对象的图层编号。  
Font Options | Object Ref | 在游戏设置界面中为玩家提供的字体选项（除默认外）。  
Default Font | Null | 游戏首次启动时应用的默认字体名；若未指定则使用系统默认字体。  

</div>

## 可解锁内容（Unlockables）

<div class="config-table">

属性 | 默认值 | 说明  
--- | --- | ---  
Loader | Unlockables- (Addressable, Project) | 用于加载可解锁内容资源的资源加载器配置。  

</div>
