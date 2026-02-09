# 属性配置

引擎配置存储在 `Assets/NaninovelData/Resources/Naninovel/Configuration` 文件夹中的多个可编写脚本对象资产中。首次在 Unity 编辑器中打开相应的配置菜单时，会自动生成它们。

使用 `Naninovel -> Configuration` 或 `Edit -> Project Settings -> Naninovel` 访问配置菜单。

请注意，所有配置菜单都支持 [Unity 的预设功能](https://docs.unity3d.com/Manual/Presets)。在部署到不同的目标平台（例如移动设备、独立设备、控制台等）时，创建多个配置预设可能会很有用。

![](https://i.gyazo.com/55f5c74bfc16e1af2455034647525df3.mp4)

可以在运行时修改配置对象，添加新的自定义配置并更改在运行时访问对象的方式（例如，从存储在远程主机上的 JSON 文件中读取配置）；有关更多信息，请参阅 [自定义配置](/zh/guide/custom-configuration) 指南。

## 音频

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Audio Loader | Audio- (Addressable, Project) | 与音频（BGM 和 SFX）资源一起使用的资源加载器的配置。 |
| Voice Loader | Voice- (Addressable, Project) | 与语音资源一起使用的资源加载器的配置。 |
| Audio Player | Naninovel Audio Player | 负责播放音频剪辑的 IAudioPlayer 实现。 |
| Default Master Volume | 1 | 首次启动游戏时设置的主音量。 |
| Default Bgm Volume | 1 | 首次启动游戏时设置的 BGM 音量。 |
| Default Sfx Volume | 1 | 首次启动游戏时设置的 SFX 音量。 |
| Default Voice Volume | 1 | 首次启动游戏时设置的语音音量。 |
| Enable Auto Voicing | False | 启用后，每个 [@print] 命令都将尝试播放关联的语音剪辑。 |
| Voice Overlap Policy | Prevent Overlap | 指定如何处理并发语音播放：<br> • Allow Overlap — 将无限制地播放并发语音。<br> • Prevent Overlap — 通过在播放新语音剪辑之前停止任何播放的语音剪辑来防止并发语音播放。<br> • Prevent Character Overlap — 防止每个角色的并发语音播放；允许并发播放不同角色的语音（自动配音）和任意数量的 [@voice] 命令。 |
| Voice Locales | Null | 分配本地化标签以允许在游戏设置中独立于主要本地化选择语音语言。 |
| Default Fade Duration | 0.35 | 开始或停止播放音频时音量淡入/淡出的默认持续时间。 |
| Play Sfx While Skipping | True | 是否在跳过模式下播放非循环声音效果 (SFX)。禁用时，将在跳过时忽略没有 `loop!` 的 [@sfx] 命令。 |
| Custom Audio Mixer | Null | 控制音频组的音频混音器。未指定时，将使用默认值。 |
| Master Group Path | Master | 控制主音量的混音器组的路径。 |
| Master Volume Handle Name | Master Volume | 控制主音量的混音器句柄（公开参数）的名称。 |
| Bgm Group Path | Master/BGM | 控制背景音乐音量的混音器组的路径。 |
| Bgm Volume Handle Name | BGM Volume | 控制背景音乐音量的混音器句柄（公开参数）的名称。 |
| Sfx Group Path | Master/SFX | 控制声音效果音乐音量的混音器组的路径。 |
| Sfx Volume Handle Name | SFX Volume | 控制声音效果音量的混音器句柄（公开参数）的名称。 |
| Voice Group Path | Master/Voice | 控制语音音量的混音器组的路径。 |
| Voice Volume Handle Name | Voice Volume | 控制语音音量的混音器句柄（公开参数）的名称。 |

</div>

## 背景

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Default Metadata | Object Ref | 创建背景 actor 时默认使用的元数据，并且创建的 actor ID 的自定义元数据不存在。 |
| Metadata | Object Ref | 创建具有特定 ID 的背景 actor 时使用的元数据。 |
| Shared Poses | Object Ref | 在背景之间共享的命名状态（姿势）；姿势名称可以用作 [@back] 命令中的外观，以设置关联状态的启用属性。 |
| Scene Origin | (0.50, 0.00) | 场景上的参考点，被视为受管 actor 的原点。不影响定位。 |
| Z Offset | 100 | 创建 actor 时设置的从 actor 到相机的初始 Z 轴偏移（深度）。 |
| Z Step | 0.1 | 创建 actor 时设置的 actor 之间的 Z 轴距离；用于防止 z-fighting 问题。 |
| Default Duration | 0.35 | 所有 actor 修改（更改外观、位置、色调等）的默认持续时间（以秒为单位）。 |
| Default Easing | Linear | 默认情况下用于所有 actor 修改动画（更改外观、位置、色调等）的缓动函数。 |
| Auto Show On Modify | True | 执行修改命令时是否自动显示（展示）actor。 |

</div>

## 相机

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Reference Resolution | (1920, 1080) | 参考分辨率用于评估适当的渲染尺寸，以便 actor 正确定位在场景中。根据经验，将其设置为等于您为游戏制作的背景纹理的分辨率。 |
| Reference PPU | 100 | 多少像素对应于一个场景单位。减少此值将使所有 actor 显得更小，反之亦然。对于大多数情况，建议使用默认值 100。 |
| Match Screen Width | False | 是否应将参考场景矩形宽度与屏幕宽度匹配。启用后，相对（场景）位置评估将使用屏幕边界作为原点；否则使用参考分辨率。 |
| Initial Position | (0.00, 0.00, -10.00) | 受管相机的初始世界位置。 |
| Custom Camera Prefab | Null | 带有用于渲染的相机组件的预制件。未指定时将使用默认值。如果您希望设置一些相机属性（背景颜色、FOV、HDR 等）或添加后处理脚本，请使用所需的相机设置创建一个预制件并将该预制件分配给此字段。 |
| Use UI Camera | True | 是否使用专用相机渲染 UI。此选项用于向后兼容，不应在新项目中禁用。禁用时可能会出现问题（例如，在相机动画上不断重建 uGUI 布局）。 |
| Custom UI Camera Prefab | Null | 带有用于 UI 渲染的相机组件的预制件。未指定时将使用默认值。当禁用 `Use UI Camera` 时无效。 |
| Default Duration | 0.35 | 所有相机修改（更改缩放、位置、旋转等）的默认持续时间（以秒为单位）。 |
| Default Easing | Linear | 默认情况下用于所有相机修改（更改缩放、位置、旋转等）的缓动函数。 |
| Disable Rendering | False | 初始化引擎时是否默认禁用 Naninovel 相机。当 Naninovel 作为嵌入式对话系统集成并且初始化后不应渲染时很有用。 |
| Capture Thumbnails | True | 保存游戏时是否捕获小屏幕预览；这些预览随后用于保存槽。 |
| Thumbnail Resolution | (240, 140) | 将捕获用于预览游戏保存槽的缩略图的分辨率。 |
| Hide UI In Thumbnails | False | 捕获缩略图时是否忽略 UI 层。 |

</div>

## 角色

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Auto Arrange On Add | True | 在添加没有指定位置的新角色时，是否按 X 轴均匀分布角色。 |
| Arrange Range | (0.00, 1.00) | 相对于场景宽度的开始 (x) 和结束 (y) 位置（在 0.0 到 1.0 范围内），表示排列角色的范围。 |
| Default Metadata | Object Ref | 创建角色 actor 时默认使用的元数据，并且创建的 actor ID 的自定义元数据不存在。 |
| Metadata | Object Ref | 创建具有特定 ID 的角色 actor 时使用的元数据。 |
| Avatar Loader | Character Avatars- (Addressable, Project) | 与角色头像纹理资源一起使用的资源加载器的配置。 |
| Shared Poses | Object Ref | 在角色之间共享的命名状态（姿势）；姿势名称可以用作 [@char] 命令中的外观，以设置关联状态的启用属性。 |
| Scene Origin | (0.50, 0.00) | 场景上的参考点，被视为受管 actor 的原点。不影响定位。 |
| Z Offset | 50 | 创建 actor 时设置的从 actor 到相机的初始 Z 轴偏移（深度）。 |
| Z Step | 0.1 | 创建 actor 时设置的 actor 之间的 Z 轴距离；用于防止 z-fighting 问题。 |
| Default Duration | 0.35 | 所有 actor 修改（更改外观、位置、色调等）的默认持续时间（以秒为单位）。 |
| Default Easing | Smooth Step | 默认情况下用于所有 actor 修改动画（更改外观、位置、色调等）的缓动函数。 |
| Auto Show On Modify | True | 执行修改命令时是否自动显示（展示）actor。 |

</div>

## 选项处理程序

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Default Handler Id | Button List | 默认使用的选项处理程序的 ID。 |
| Choice Button Loader | Choice Buttons- (Addressable, Project) | 用于加载自定义选项按钮的资源加载器的配置。 |
| Default Metadata | Object Ref | 创建选项处理程序 actor 时默认使用的元数据，并且创建的 actor ID 的自定义元数据不存在。 |
| Metadata | Object Ref | 创建具有特定 ID 的选项处理程序 actor 时使用的元数据。 |
| Default Duration | 0.35 | 所有 actor 修改（更改外观、位置、色调等）的默认持续时间（以秒为单位）。 |
| Default Easing | Linear | 默认情况下用于所有 actor 修改动画（更改外观、位置、色调等）的缓动函数。 |
| Auto Show On Modify | False | 执行修改命令时是否自动显示（展示）actor。 |

</div>

## 自定义变量

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Default Scope | Local | 设置为 'Global' 时，所有变量都将被视为全局变量，即使它们的名称不以 'g_' 前缀开头。开始新游戏时不会重置全局变量，并且在更改时会自动保存。对于不断重置引擎并在外部处理游戏状态的对话模式很有用。 |
| Predefined Variables | Object Ref | 默认初始化的变量列表。全局变量（以 `g_` 开头的名称）在首次应用程序启动时初始化，其他变量在每次状态重置时初始化。 |

</div>

## 引擎

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Override Objects Layer | False | 是否为所有引擎对象分配特定层。引擎的相机将使用该层作为剔除掩码。使用此选项将 Naninovel 对象与其他相机渲染隔离。 |
| Objects Layer | 0 | 启用 `Override Objects Layer` 时，指定的层将分配给所有引擎对象。 |
| Async Instantiation | True | 是否使用 `Object.InstantiateAsync` 实例化引擎对象，这将大部分相关工作移出主线程。除非遇到问题，否则保持启用。 |
| Initialize On Application Load | True | 应用程序启动时是否自动初始化引擎。 |
| Check Unity Version | True | 不支持 Unity 版本时是否警告。 |
| Scene Independent | True | 是否将 `DontDestroyOnLoad` 应用于引擎对象，使其生命周期独立于任何加载的场景。禁用时，对象将成为初始化引擎的 Unity 场景的一部分，并将在场景卸载时销毁。 |
| Show Initialization UI | True | 引擎初始化时是否显示加载 UI。 |
| Custom Initialization UI | Null | 引擎初始化时显示的 UI（启用时）。未指定时将使用默认值。 |
| Enable Bridging | True | 是否自动启动桥接服务器以与外部 Naninovel 工具通信：IDE 扩展、Web 编辑器等。 |
| Auto Generate Metadata | True | 启动 Unity 编辑器和编译 C# 脚本后是否自动生成项目元数据。 |
| Enable Development Console | True | 是否启用开发控制台。 |
| Debug Only Console | False | 启用后，开发控制台将仅在开发（调试）构建中可用。 |

</div>

## 输入

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Spawn Event System | True | 是否生成 Naninovel 特定的事件系统；uGUI 交互所必需。如果您想自己初始化事件系统，请禁用。 |
| Event System | Null | 带有 `EventSystem` 组件的预制件，用于在引擎初始化时生成并用于输入处理。未分配时将使用默认事件系统。 |
| Input Actions | Null | 安装 Unity 的输入系统后，在此处分配输入操作资产。<br><br>要将输入操作映射到 Naninovel 的输入采样器，请创建 `Naninovel` 操作映射并添加名称等于输入名称的操作。<br><br>未分配时将使用默认输入操作。 |
| Action Maps | Object Ref | 指定的 'Input Actions' 资产中的输入操作映射名称，以向 Naninovel 输入注册。 |
| Detect Input Mode | True | 激活关联设备时是否更改输入模式。例如，按下任何游戏手柄按钮时切换到游戏手柄，单击鼠标按钮时切换回鼠标。 |
| Disable Input | False | 初始化引擎时是否默认禁用输入处理。当 Naninovel 作为嵌入式对话系统集成并且初始化后不应响应用户输入时很有用。 |

</div>

## 本地化

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Loader | Localization- (Addressable, Project) | 与本地化资源一起使用的资源加载器的配置。 |
| Languages | Object Ref | 映射到默认语言显示名称的 RFC5646 语言标签。重新启动 Unity 编辑器以使更改生效。 |
| Source Locale | En | 源项目资源的区域设置（创作项目资产的语言）。 |
| Expose Source Locale | True | 是否使源区域设置对最终用户（玩家）可用，即包含在语言选择中。<br><br>如果您想与第三方共享源可本地化文本（例如，用于校对），但不想共享剧本脚本，则禁用此选项可能很有用。在这种情况下，禁用此选项并为源材料添加专用区域设置，然后可以将其导出到本地化文档或电子表格。 |
| Default Locale | Null | 首次运行游戏时默认选择的区域设置。未指定时将选择 `Source Locale`。 |
| Auto Detect Locale | True | 启用并在首次运行游戏时，尝试根据系统语言自动检测区域设置。成功且游戏支持该区域设置时，选择它；否则回退到 'Default Locale'。 |
| Record Separator | | | 连接常见本地化脚本记录的文本字符，例如通用文本行的部分和可本地化参数值。 |
| Annotation Prefix | > | 插入注释行之前的文本字符，以区分本地化文本。注释是可选添加到生成的本地化文档中的注释，以便为翻译人员提供额外的上下文，例如打印文本消息的作者、内联命令和包含本地化参数的命令行。存根字符用于替换此类注释的本地化部分，因为它们在包含要本地化文本的下一个注释行中重复。 |

</div>

## 管理文本

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Loader | Text- (Addressable, Project) | 与管理文本文档一起使用的资源加载器的配置。 |
| Multiline Documents | Object Ref | 使用多行格式的管理文本文档的本地资源路径。 |

</div>

## 电影

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Loader | Movies- (Addressable, Project) | 与电影资源一起使用的资源加载器的配置。 |
| Skip On Input | True | 用户激活 `cancel` 输入键时是否跳过电影播放。 |
| Skip Frames | True | 是否跳过帧以赶上当前时间。 |
| Fade Duration | 1 | 开始/结束播放电影前淡入/淡出的时间（以秒为单位）。 |
| Custom Fade Texture | Null | 淡入淡出时显示的纹理。未指定时将使用简单的黑色纹理。 |
| Play Intro Movie | False | 引擎初始化后和显示主菜单之前是否自动播放电影。 |
| Intro Movie Name | Null | 介绍电影资源的路径。 |

</div>

## 资源提供者

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Resource Policy | Conservative | 指定脚本执行期间何时加载和卸载资源：<br><br> • Conservative — 具有平衡内存利用率的默认模式。开始播放时预加载脚本执行所需的所有资源，并在脚本播放完毕时卸载。[@gosub] 命令中引用的脚本也会预加载。可以使用 [@goto] 命令的 `hold` 参数预加载其他脚本。<br><br> • Optimistic — 预加载播放脚本所需的所有资源，以及 [@goto] 和 [@gosub] 命令中指定的脚本的所有资源，除非在 [@goto] 命令中指定 `release` 参数，否则不卸载。这最大限度地减少了加载屏幕并允许平滑回滚，但需要手动指定何时应卸载资源，从而增加了内存不足异常的风险。<br><br> • Lazy — 开始播放时不为执行的脚本预加载资源，并且不自动显示加载屏幕。相反，仅在脚本播放时“即时”加载接下来几个命令所需的资源，并立即释放已执行命令使用的资源。此策略不需要场景规划或手动控制，消耗的内存最少，但可能会由于后台加载资源而导致游戏过程中出现卡顿——尤其是在快进（跳过模式）或执行回滚时。 |
| Lazy Buffer | 25 | 启用 Lazy 资源策略时，控制预加载缓冲区的大小，即预加载的最大脚本命令数。 |
| Lazy Priority | Below Normal | 启用 Lazy 资源策略时，控制加载资源的后台线程优先级。降低以最大限度地减少卡顿，但这会增加加载时间。 |
| Remove Actors | True | 卸载脚本资源时是否自动删除未使用的 actor（角色、背景、文本打印机和选项处理程序）。请注意，即使启用，仍然可以随时使用 `@remove` 命令手动删除 actor。 |
| Log Resource Loading | False | 是否记录资源卸载/加载操作。 |
| Enable Build Processing | True | 是否注册自定义构建播放器句柄以处理分配为 Naninovel 资源的资产。<br><br>警告：要使此设置生效，需要重新启动 Unity 编辑器。 |
| Use Addressables | True | 安装 Addressable 资产系统后，启用此属性将优化资产处理步骤，缩短构建时间。 |
| Auto Build Bundles | True | 构建播放器时是否自动构建 Addressable 资产包。禁用 `Use Addressables` 时无效。 |
| Label By Scripts | True | 是否通过它们使用的剧本脚本路径标记所有 Naninovel Addressable 资产。当 Addressable 组设置中的 `Bundle Mode` 设置为 `Pack Together By Label` 时，将产生更高效的包打包。<br><br>请注意，脚本标签将分配给所有带有 'Naninovel' 标签的资产，其中包括手动公开给 Addressable 资源提供者的资产（不使用资源编辑器菜单）。 |
| Extra Labels | Null | Addressable 提供者仅适用于除 `Naninovel` 标签外还具有分配标签的资产。可用于根据自定义标准（例如，HD 与 SD 纹理）过滤引擎使用的资产。 |
| Local Root Path | %DATA%/Resources | 用于本地资源提供者的路径根。可以是资源所在文件夹的绝对路径，也可以是具有以下可用原点之一的相对路径：<br> • %DATA% — 目标设备上的游戏数据文件夹 (UnityEngine.Application.dataPath)。<br> • %PDATA% — 目标设备上的持久数据目录 (UnityEngine.Application.persistentDataPath)。<br> • %STREAM% — `StreamingAssets` 文件夹 (UnityEngine.Application.streamingAssetsPath)。<br> • %SPECIAL{F}% — OS 特殊文件夹（其中 F 是来自 System.Environment.SpecialFolder 的值）。 |
| Video Stream Extension | .mp 4 | 在 WebGL 下流式传输视频（电影、视频背景）时，指定视频文件的扩展名。 |
| Reload Scripts | True | 是否监视和热重载存储在本地提供者目录下的修改后的剧本脚本。 |
| Project Root Path | Naninovel | 相对于 `Resources` 文件夹的路径，naninovel 特定资产位于该路径下。 |

</div>

## 脚本播放器

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Default Skip Mode | Read Only | 首次启动游戏时设置的默认跳过模式。 |
| Skip Time Scale | 10 | 在跳过（快进）模式下使用的时间刻度。设置为 1 以禁用在跳过时更改时间刻度。 |
| Min Auto Play Delay | 1 | 在自动播放模式下执行下一个命令之前等待的最少秒数。 |
| Complete On Continue | True | 当激活 `Continue` 输入时，是否立即完成随时间执行的阻塞 (`wait!`) 命令（例如，动画、隐藏/显示、色调更改等）。 |
| Show Debug On Init | False | 是否在引擎初始化时显示播放器调试窗口。 |
| Wait By Default | False | 当未显式指定 `wait` 参数时，是否等待播放的命令。仅适用于可等待（异步）命令。<br><br>警告：不要在新项目中启用，因为此选项是为了向后兼容而保留的，并将在下一个版本中删除。 |
| Show Loading UI | False | 是否在脚本预加载/加载和引擎重置操作期间自动显示 `ILoadingUI`。允许使用加载屏幕屏蔽资源加载过程。 |

</div>

## 脚本

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Loader | Scripts- (Addressable, Project) | 与 naninovel 脚本资源一起使用的资源加载器的配置。 |
| Script Compiler | Naninovel Script Compiler | 用于将源剧本文本转换为脚本资产的 IScriptCompiler 实现。修改此设置后重新导入脚本资产以使更改生效。 |
| Compiler Localization | (Naninovel.Compiler Localization) | 特定于区域设置的 NaniScript 编译器选项。将在元数据同步时传播到 IDE 扩展。重新启动 Unity 编辑器并重新导入脚本资产以使更改生效。 |
| Initialization Script | Null | 引擎初始化后立即播放的脚本的本地资源路径。 |
| Title Script | Title | 显示标题 UI 时播放的脚本的本地资源路径。可用于设置标题屏幕场景（背景、音乐等）。 |
| Start Game Script | Entry | 开始新游戏时播放的脚本的本地资源路径。未指定时将使用第一个可用的。 |
| Auto Add Scripts | True | 是否将创建的 naninovel 脚本自动添加到资源中。 |
| Auto Resolve Path | True | 创建、重命名或移动脚本时，是否自动解析和更新资源路径。 |
| Hot Reload Scripts | True | 是否重新加载修改后的（通过可视化和外部编辑器）脚本并在播放模式期间应用更改而不重新启动播放。 |
| Watch Scripts | True | 是否在 '.nani' 文件上运行文件系统监视程序。使用外部应用程序编辑时注册脚本更改所必需的。 |
| Show Script Navigator | False | 引擎初始化后是否自动显示脚本导航器 UI（需要 UI 资源中可用的 'IScriptNavigatorUI'）。 |
| Enable Story Editor | True | 是否使用新的故事编辑器代替旧版可视化编辑器和脚本图。 |
| Show Selected Script | True | 是否在故事编辑器中打开选定的剧本脚本资产。 |
| Enable Visual Editor | True | 选中脚本时是否显示旧版可视化脚本编辑器。启用故事编辑器时无效。 |
| Hide Unused Parameters | True | 当未悬停或聚焦行时，是否隐藏命令行的未分配参数。 |
| Select Played Script | True | 打开可视化编辑器时是否自动选择当前播放的脚本。 |
| Insert Line Key | Space | 可视化编辑器处于焦点时用于显示“插入行”窗口的热键。设置为 'None' 以禁用。 |
| Insert Line Modifier | Control | 'Insert Line Key' 的修饰符。设置为 'None' 以禁用。 |
| Indent Line Key | Right Arrow | 用于缩进行的热键。设置为 'None' 以禁用。 |
| Indent Line Modifier | Control | 'Indent Line Key' 的修饰符。设置为 'None' 以禁用。 |
| Unindent Line Key | Left Arrow | 用于取消缩进行的缩进的热键。设置为 'None' 以禁用。 |
| Unindent Line Modifier | Control | 'Unindent Line Key' 的修饰符。设置为 'None' 以禁用。 |
| Save Script Key | S | 可视化编辑器处于焦点时用于保存（序列化）编辑脚本的热键。设置为 'None' 以禁用。 |
| Save Script Modifier | Control | 'Save Script Key' 的修饰符。设置为 'None' 以禁用。 |
| Rewind Mouse Button | 0 | 单击可视化编辑器中的行时，哪个鼠标按钮应激活倒带：'0' 是左键，'1' 是右键，'2' 是中键；设置为 '-1' 以禁用。 |
| Rewind Modifier | Shift | 'Rewind Mouse Button' 的修饰符。设置为 'None' 以禁用。 |
| Editor Page Length | 300 | 每个可视化编辑器页面应渲染多少脚本行。 |
| Editor Custom Style Sheet | Null | 允许修改可视化编辑器的默认样式。 |
| Graph Orientation | Horizontal | 垂直还是水平构建图形。 |
| Graph Auto Align Padding | (10.00, 0.00) | 执行自动对齐时为每个节点添加的填充。 |
| Show Synopsis | True | 是否在图形节点内显示脚本的第一条注释行。 |
| Graph Custom Style Sheet | Null | 允许修改脚本图的默认样式。 |
| Enable Community Modding | False | 是否允许向构建添加外部 naninovel 脚本。 |
| External Loader | Scripts- (Local) | 与外部 naninovel 脚本资源一起使用的资源加载器的配置。 |

</div>

## 生成

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Loader | Spawn- (Addressable, Project) | 与生成资源一起使用的资源加载器的配置。 |

</div>

## 状态

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Save Folder Name | Saves | 该文件夹将在游戏数据文件夹中创建。 |
| Default Settings Slot Id | Settings | 设置保存文件的名称。 |
| Default Global Slot Id | Global Save | 全局保存文件的名称。 |
| Save Slot Mask | Game Save{0:000} | 用于命名保存槽的掩码。 |
| Quick Save Slot Mask | Game Quick Save{0:000} | 用于命名快速保存槽的掩码。 |
| Auto Save Slot Mask | Game Auto Save{0:000} | 用于命名自动保存槽的掩码。 |
| Save Slot Limit | 99 | 保存槽的最大数量。 |
| Quick Save Slot Limit | 18 | 快速保存槽的最大数量。 |
| Auto Save Slot Limit | 18 | 自动保存槽的最大数量。 |
| Auto Save On Quit | True | 是否在退出到标题之前或在不在标题菜单中关闭应用程序时自动保存游戏（在编辑器中不起作用）。 |
| Binary Save Files | True | 是否将保存压缩并存储为二进制文件 (.nson) 而不是文本文件 (.json)。这将显着减小文件大小并使其更难编辑（以防止作弊），但在保存和加载时会消耗更多内存和 CPU 时间。 |
| Reset On Goto | False | 通过 [@goto] 命令加载另一个脚本时是否重置引擎服务的状态。可用于代替 [@resetState] 命令，在每次 goto 时自动卸载所有资源。 |
| Show Loading UI | True | 加载游戏状态时是否自动显示 `ILoadingUI`。 |
| Enable State Rollback | True | 是否启用允许玩家向后倒带脚本的状态回滚功能。<br><br>请注意，回滚功能有性能成本，因为它有效地在每次玩家交互时序列化整个游戏状态，导致大量堆分配。如果您的游戏不需要回滚功能，请在此处禁用它，而不是简单地删除回滚输入。<br><br>请注意，即使在此处禁用，回滚在 Unity 编辑器中仍处于启用状态，因为热重载功能需要它；该配置在播放器构建中得到尊重。 |
| State Rollback Steps | 1024 | 运行时保留的状态快照数量；决定可以执行回滚（倒带）多远。增加此值将消耗更多内存。 |
| Saved Rollback Steps | 128 | 在保存游戏槽下序列化（保存）的状态快照数量；决定加载保存的游戏后可以执行回滚多远。增加此值将增大保存游戏文件。 |
| Recovery Rollback | True | 当加载保存后脚本被修改的游戏状态时，是否回滚到播放脚本的开头。 |
| Game State Handler | Naninovel Universal Game State Serializer | 负责反序列化/序列化本地（特定于会话）游戏状态的实现；有关如何添加自定义序列化处理程序的信息，请参阅 `State Management` 指南。 |
| Global State Handler | Naninovel Universal Global State Serializer | 负责反序列化/序列化全局游戏状态的实现；有关如何添加自定义序列化处理程序的信息，请参阅 `State Management` 指南。 |
| Settings State Handler | Naninovel Universal Settings State Serializer | 负责反序列化/序列化游戏设置的实现；有关如何添加自定义序列化处理程序的信息，请参阅 `State Management` 指南。 |

</div>

## 文本输出窗

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Default Printer Id | Dialogue | 默认使用的文本打印机的 ID。 |
| Default Base Reveal Speed | 0.5 | 首次启动游戏时设置的基本显示速度（游戏设置）。 |
| Default Base Auto Delay | 0.5 | 首次启动游戏时设置的基本自动延迟（游戏设置）。 |
| Max Reveal Delay | 0.06 | 显示（打印）文本消息时的延迟限制（以秒为单位）。通过游戏设置中的 `message speed` 设置特定显示速度；此值定义可用范围（值越高，显示速度越慢）。 |
| Max Auto Wait Delay | 0.02 | 在自动播放模式下等待继续时每个打印字符的延迟限制（以秒为单位）。通过游戏设置中的 `auto delay` 设置特定延迟；此值定义可用范围。 |
| Scale Auto Wait | True | 是否通过打印命令中设置的显示速度缩放自动播放模式下的等待时间。 |
| Skip Print Delay | 0 | 当大于零时，每个打印命令将在启用跳过播放模式（快进）时等待指定的时间（以秒为单位，未缩放）。用于在跳过时减慢播放速度。 |
| Default Metadata | Object Ref | 创建文本打印机 actor 时默认使用的元数据，并且创建的 actor ID 的自定义元数据不存在。 |
| Metadata | Object Ref | 创建具有特定 ID 的文本打印机 actor 时使用的元数据。 |
| Scene Origin | (0.50, 0.00) | 场景上的参考点，被视为受管 actor 的原点。不影响定位。 |
| Z Offset | 0 | 创建 actor 时设置的从 actor 到相机的初始 Z 轴偏移（深度）。 |
| Z Step | 0 | 创建 actor 时设置的 actor 之间的 Z 轴距离；用于防止 z-fighting 问题。 |
| Default Duration | 0.35 | 所有 actor 修改（更改外观、位置、色调等）的默认持续时间（以秒为单位）。 |
| Default Easing | Linear | 默认情况下用于所有 actor 修改动画（更改外观、位置、色调等）的缓动函数。 |
| Auto Show On Modify | False | 执行修改命令时是否自动显示（展示）actor。 |

</div>

## UI

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| UI Loader | UI- (Addressable, Project) | 与 UI 资源一起使用的资源加载器的配置。 |
| Font Loader | Fonts- (Addressable, Project) | 与字体资源一起使用的资源加载器的配置。 |
| Override Objects Layer | True | 是否为引擎管理的所有 UI 对象分配特定层。某些内置功能（例如 `Toggle UI`）所必需。 |
| Objects Layer | 5 | 启用 `Override Objects Layer` 时，指定的层将分配给所有受管 UI 对象。 |
| Font Options | Object Ref | 应该在游戏设置 UI 中可用（除了 `Default`）供玩家选择的字体选项。 |
| Default Font | Null | 首次启动游戏时默认应用的 `Font Options` 中的字体名称。未指定时，应用 `Default` 字体。 |

</div>

## 可解锁项

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Loader | Unlockables- (Addressable, Project) | 与可解锁资源一起使用的资源加载器的配置。 |

</div>
