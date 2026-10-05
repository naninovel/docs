# 配置

引擎配置存储在 `Assets/NaninovelData/Resources/Naninovel/Configuration` 文件夹中的多个 ScriptableObject 资产中。首次在 Unity 编辑器中打开相应的配置菜单时，会自动生成它们。

使用 `Naninovel -> Configuration` 或 `Edit -> Project Settings -> Naninovel` 访问配置菜单。

请注意，所有配置菜单都支持 [Unity 的预设功能](https://docs.unity3d.com/Manual/Presets)。在部署到不同的目标平台（例如移动平台、独立平台、游戏主机等）时，创建多个配置预设可能会很有用。

![](https://i.gyazo.com/55f5c74bfc16e1af2455034647525df3.mp4)

可以在运行时修改配置对象，添加新的自定义配置并更改在运行时访问对象的方式（例如，从存储在远程主机上的 JSON 文件中读取配置）；有关更多信息，请参阅 [自定义配置](/zh/guide/custom-configuration) 指南。

## 音频

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Bgm Loader | BGM- (Addressable, Project) | BGM 音频资源所用的资源加载器配置。 |
| Sfx Loader | SFX- (Addressable, Project) | SFX 音频资源所用的资源加载器配置。 |
| Voice Loader | Voice- (Addressable, Project) | 语音音频资源所用的资源加载器配置。 |
| Audio Player | Naninovel Audio Player | 负责播放音频剪辑的 IAudioPlayer 实现。 |
| Default Master Volume | 1 | 首次启动游戏时设置的主音量。 |
| Default Bgm Volume | 1 | 首次启动游戏时设置的 BGM 音量。 |
| Default Sfx Volume | 1 | 首次启动游戏时设置的 SFX 音量。 |
| Default Voice Volume | 1 | 首次启动游戏时设置的语音音量。 |
| Enable Auto Voicing | False | 启用后，每个 [@print] 命令都将尝试播放关联的语音剪辑。 |
| Voice Overlap Policy | Prevent Overlap | 指定如何处理语音的同时播放：<br> • Allow Overlap — 不加限制地同时播放多条语音。<br> • Prevent Overlap — 在播放新的语音剪辑之前停止所有正在播放的语音剪辑，以防止语音同时播放。<br> • Prevent Character Overlap — 防止同一角色的语音同时播放；不同角色的语音（自动配音）以及任意数量的 [@voice] 命令可以同时播放。 |
| Voice Locales | Null | 分配本地化标签，以允许在游戏设置中独立于主本地化选择语音语言。 |
| Default Fade Duration | 0.35 | 开始或停止播放音频时音量淡入/淡出的默认持续时间。 |
| Default Fade Easing | Linear | 默认用于音频淡入淡出和修改的缓动函数。 |
| Play Sfx While Skipping | True | 是否在跳过模式下播放非循环音效（SFX）。禁用时，将在跳过时忽略不带 `loop!` 的 [@sfx] 命令。 |
| Custom Audio Mixer | Null | 用于控制音频组的音频混音器。未指定时，将使用默认混音器。 |
| Master Group Path | Master | 控制主音量的混音器组的路径。 |
| Master Volume Handle Name | Master Volume | 控制主音量的混音器句柄（公开参数）的名称。 |
| Bgm Group Path | Master/BGM | 控制背景音乐音量的混音器组的路径。 |
| Bgm Volume Handle Name | BGM Volume | 控制背景音乐音量的混音器句柄（公开参数）的名称。 |
| Sfx Group Path | Master/SFX | 控制音效音量的混音器组的路径。 |
| Sfx Volume Handle Name | SFX Volume | 控制音效音量的混音器句柄（公开参数）的名称。 |
| Voice Group Path | Master/Voice | 控制语音音量的混音器组的路径。 |
| Voice Volume Handle Name | Voice Volume | 控制语音音量的混音器句柄（公开参数）的名称。 |

</div>

## 背景

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Default Metadata | Object Ref | 创建背景 Actor 且所创建的 Actor ID 不存在自定义元数据时默认使用的元数据。 |
| Metadata | Object Ref | 创建具有特定 ID 的背景 Actor 时使用的元数据。 |
| Shared Poses | Object Ref | 在背景之间共享的命名状态（姿势）；姿势名称可在 [@back] 命令中用作外观，以应用关联状态中已启用的属性。 |
| Scene Origin | (0.50, 0.00) | 场景中被视为受管 Actor 原点的参考点。 |
| Z Offset | 100 | 创建 Actor 时设置的从 Actor 到摄像机的初始 Z 轴偏移（深度）。 |
| Z Step | 0.1 | 创建 Actor 时在 Actor 之间设置的 Z 轴距离；用于防止 z-fighting 问题。 |
| Default Duration | 0.35 | 所有 Actor 修改（更改外观、位置、色调等）的默认持续时间（以秒为单位）。 |
| Default Easing | Linear | 默认用于所有 Actor 修改动画（更改外观、位置、色调等）的缓动函数。 |
| Auto Show On Modify | True | 执行修改命令时是否自动显示 Actor（使其可见）。 |

</div>

## 摄像机

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Reference Resolution | (1920, 1080) | 参考分辨率用于计算合适的渲染尺寸，以便 Actor 在场景中正确定位。根据经验，请将其设置为与您为游戏制作的背景纹理的分辨率相同。 |
| Reference PPU | 100 | 一个场景单位对应多少像素。减小此值将使所有 Actor 显得更小，反之亦然。大多数情况下建议使用默认值 100。 |
| Aspect Ratios | Object Ref | 支持的纵横比。指定后，将筛选游戏设置中可用的分辨率，并在受管摄像机上强制应用纵横比。留空则不限制也不强制纵横比。<br><br>请注意，此功能要求 Naninovel 的主摄像机为基础摄像机。使用多摄像机设置时，请确保在配置中禁用 `Stack Camera`。 |
| Match Screen Width | False | 是否应将参考场景矩形的宽度与屏幕宽度匹配。启用后，计算相对（场景）位置时将以屏幕边界为原点；否则使用参考分辨率。 |
| Initial Position | (0.00, 0.00, -10.00) | 受管摄像机的初始世界位置。 |
| Stack Camera | True | 是否查找现有的“基础”摄像机，并在找到时将 Naninovel 的主摄像机添加（叠加）到基础摄像机堆栈中。即使禁用此选项，您也可以使用 `Camera Events` 组件的 `Setup Base Camera` 方法手动堆叠摄像机。 |
| Stack Camera Tag | Null | 启用 `Stack Camera` 时，指定要查找的基础摄像机的标签。如果未指定，将使用第一个找到的基础摄像机。 |
| Clear Color | RGBA(0.098, 0.098, 0.098, 1.000) | 使用默认摄像机渲染时用于清除屏幕的颜色。 |
| Main Camera | Null | 用于渲染的带有摄像机组件的预制件。未指定时将使用默认预制件。如果您希望设置某些摄像机属性（背景颜色、FOV、HDR 等）或添加后处理脚本，请创建一个具有所需摄像机设置的预制件，并将该预制件分配给此字段。 |
| Main Renderer | -1 | 用于受管主摄像机的 URP 渲染器。默认使用摄像机上配置的渲染器。 |
| Use UI Camera | True | 是否使用专用摄像机渲染 UI。此选项用于向后兼容，不应在新项目中禁用。禁用后可能会出现问题（例如，摄像机动画期间不断重建 uGUI 布局）。 |
| UI Camera | Null | 用于 UI 渲染的带有摄像机组件的预制件。未指定时将使用默认预制件。禁用 `Use UI Camera` 时无效。 |
| UI Renderer | -1 | 用于受管 UI 摄像机的 URP 渲染器。默认使用摄像机上配置的渲染器。禁用 `Use UI Camera` 时无效。 |
| Default Duration | 0.35 | 所有摄像机修改（更改缩放、位置、旋转等）的默认持续时间（以秒为单位）。 |
| Default Easing | Linear | 默认用于所有摄像机修改（更改缩放、位置、旋转等）的缓动函数。 |
| Disable Rendering | False | 初始化引擎时是否默认禁用 Naninovel 摄像机。当 Naninovel 作为嵌入式对话系统集成并且初始化后不应渲染时很有用。 |
| Capture Thumbnails | True | 保存游戏时是否捕获屏幕的小型预览图；这些预览图随后会用于存档槽。 |
| Thumbnail Resolution | (240, 140) | 捕获用于预览游戏存档槽的缩略图时所用的分辨率。 |
| Hide UI In Thumbnails | False | 捕获缩略图时是否忽略 UI 层。 |

</div>

## 角色

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Auto Arrange On Add | True | 在添加没有指定位置的新角色时，是否按 X 轴均匀分布角色。 |
| Arrange Range | (0.00, 1.00) | 相对于场景宽度的起始（x）和结束（y）位置（在 0.0 到 1.0 范围内），表示角色排列的范围。 |
| Default Metadata | Object Ref | 创建角色 Actor 且所创建的 Actor ID 不存在自定义元数据时默认使用的元数据。 |
| Metadata | Object Ref | 创建具有特定 ID 的角色 Actor 时使用的元数据。 |
| Avatar Loader | Character Avatars- (Addressable, Project) | 角色头像纹理资源所用的资源加载器配置。 |
| Shared Poses | Object Ref | 在角色之间共享的命名状态（姿势）；姿势名称可在 [@char] 命令中用作外观，以应用关联状态中已启用的属性。 |
| Scene Origin | (0.50, 0.00) | 场景中被视为受管 Actor 原点的参考点。 |
| Z Offset | 50 | 创建 Actor 时设置的从 Actor 到摄像机的初始 Z 轴偏移（深度）。 |
| Z Step | 0.1 | 创建 Actor 时在 Actor 之间设置的 Z 轴距离；用于防止 z-fighting 问题。 |
| Default Duration | 0.35 | 所有 Actor 修改（更改外观、位置、色调等）的默认持续时间（以秒为单位）。 |
| Default Easing | Smooth Step | 默认用于所有 Actor 修改动画（更改外观、位置、色调等）的缓动函数。 |
| Auto Show On Modify | True | 执行修改命令时是否自动显示 Actor（使其可见）。 |

</div>

## 选项处理程序

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Default Handler ID | ButtonList | 默认使用的选项处理程序的 ID。 |
| Choice Button Loader | Choice Buttons- (Addressable, Project) | 用于加载自定义选项按钮的资源加载器配置。 |
| Default Metadata | Object Ref | 创建选项处理程序 Actor 且所创建的 Actor ID 不存在自定义元数据时默认使用的元数据。 |
| Metadata | Object Ref | 创建具有特定 ID 的选项处理程序 Actor 时使用的元数据。 |
| Default Duration | 0.35 | 所有 Actor 修改（更改外观、位置、色调等）的默认持续时间（以秒为单位）。 |
| Default Easing | Linear | 默认用于所有 Actor 修改动画（更改外观、位置、色调等）的缓动函数。 |
| Auto Show On Modify | False | 执行修改命令时是否自动显示 Actor（使其可见）。 |

</div>

## 引擎

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Override Objects Layer | False | 是否为所有引擎对象分配特定层。引擎的摄像机将使用该层作为剔除遮罩。使用此选项可避免 Naninovel 对象被其他摄像机渲染。 |
| Objects Layer | 0 | 启用 `Override Objects Layer` 时，指定的层将分配给所有引擎对象。 |
| Async Instantiation | True | 是否使用 `Object.InstantiateAsync` 实例化引擎对象，这将大部分相关工作移出主线程。除非遇到问题，否则保持启用。 |
| Initialize On Application Load | True | 应用程序启动时是否自动初始化引擎。 |
| Check Unity Version | True | Unity 版本不受支持时是否发出警告。 |
| Scene Independent | True | 是否将 `DontDestroyOnLoad` 应用于引擎对象，使其生命周期独立于任何加载的场景。禁用时，对象将成为引擎初始化时所在 Unity 场景的一部分，并将在该场景卸载时销毁。 |
| Show Initialization UI | True | 引擎初始化时是否显示加载 UI。 |
| Custom Initialization UI | Null | 引擎初始化时显示的 UI（启用时）。未指定时将使用默认 UI。 |
| Enable Bridging | True | 是否自动启动桥接服务器以与外部 Naninovel 工具通信：IDE 扩展、故事编辑器等。 |
| Auto Generate Metadata | True | 是否在 Unity 编辑器启动时以及编译 C# 脚本后自动生成项目元数据。 |
| Enable Development Console | True | 是否启用开发控制台。 |
| Debug Only Console | True | 启用后，开发控制台将仅在开发（调试）构建中可用。 |

</div>

## 输入

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Spawn Event System | True | 是否生成 Naninovel 专用的事件系统；uGUI 交互需要它。如果您想自行初始化事件系统，请禁用此选项。 |
| Event System | Null | 带有 `EventSystem` 组件的预制件，将在引擎初始化时生成并用于输入处理。未分配时将使用默认事件系统。 |
| Input Actions | Null | 安装 Unity 的输入系统后，在此处分配输入操作资产。<br><br>要将输入操作映射到 Naninovel 的输入，请在 `Action Maps` 中列出的操作映射（默认为 `Naninovel`）下添加名称与输入名称相同的操作。<br><br>未分配时将使用默认输入操作。 |
| Action Maps | Object Ref | 指定的 `Input Actions` 资产中要注册到 Naninovel 输入的输入操作映射名称。 |
| Rebind Timeout | 5 | 重新绑定输入时，在取消之前等待控件被激活的时间（以秒为单位）。零或更小的值将禁用超时。 |
| Rebind Cancel Key | &lt;Keyboard&gt;/escape | 激活时取消重新绑定输入的控件路径。留空以禁用。 |
| Enable Gyroscope | True | 是否启用陀螺仪设备（在 Unity 的输入系统中默认禁用）。通过旋转移动设备来使用摄像机观看功能时需要启用。 |
| Detect Input Mode | True | 激活关联设备时是否更改输入模式。例如，按下任何游戏手柄按钮时切换到游戏手柄，单击鼠标按钮时切换回鼠标。 |
| Disable Input | False | 初始化引擎时是否默认禁用输入处理。当 Naninovel 作为嵌入式对话系统集成并且初始化后不应响应用户输入时很有用。 |

</div>

## 本地化

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Loader | Localization- (Addressable, Project) | 本地化资源所用的资源加载器配置。 |
| Languages | Object Ref | 映射到默认语言显示名称的 RFC5646 语言标签。重新启动 Unity 编辑器以使更改生效。 |
| Source Locale | en | 项目源资源的语言环境（创作项目资产所用的语言）。 |
| Expose Source Locale | True | 是否向最终用户（玩家）提供源语言环境，即将其包含在语言选择中。<br><br>如果您想与第三方共享源语言的可本地化文本（例如，用于校对），但不想共享剧本脚本，禁用此选项会很有用。在这种情况下，请禁用此选项并为源内容添加一个专用语言环境，之后即可将其导出到本地化文档或电子表格。 |
| Default Locale | Null | 首次运行游戏时默认选择的语言环境。未指定时将选择 `Source Locale`。 |
| Auto Detect Locale | True | 启用后，在首次运行游戏时会尝试根据系统语言自动检测语言环境。如果检测成功且游戏支持该语言环境，则选择它；否则回退到 `Default Locale`。 |
| Record Separator | \| | 用于连接单个本地化记录中各文本片段的字符，例如通用文本行的各个部分或命令的多个可本地化参数值。 |
| Annotation Prefix | &gt; | 插入到批注行之前的字符串，用于将批注行与本地化文本区分开。批注是可选择添加到生成的本地化文档中的注释，用于为翻译人员提供额外的上下文，例如所打印文本消息的作者、内联命令以及包含本地化参数的命令行。此类批注中的本地化部分会被替换为相应的文本 ID，因为文本本身位于下一个注释行中。 |

</div>

## 管理文本

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Loader | Text- (Addressable, Project) | 管理文本文档所用的资源加载器配置。 |
| Multiline Documents | Object Ref | 使用多行格式的管理文本文档的本地资源路径。 |

</div>

## 影片

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Loader | Movies- (Addressable, Project) | 影片资源所用的资源加载器配置。 |
| Skip On Input | True | 用户激活 `SkipMovie` 输入时是否跳过影片播放。 |
| Skip Frames | True | 是否跳过帧以赶上当前时间。 |
| Fade Duration | 1 | 开始/结束播放影片前淡入/淡出的时间（以秒为单位）。 |
| Custom Fade Texture | Null | 淡入淡出时显示的纹理。未指定时将使用简单的黑色纹理。 |
| Play Intro Movie | False | 是否在引擎初始化之后、显示标题菜单之前自动播放影片。 |
| Intro Movie Name | Null | 开场影片资源的路径。 |

</div>

## 资源提供者

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Resource Policy | Conservative | 指定脚本执行期间何时加载和卸载资源：<br><br> • Conservative — 具有平衡内存利用率的默认模式。开始播放时预加载脚本执行所需的所有资源，并在脚本播放完毕时卸载。[@gosub] 命令中引用的脚本也会预加载。可以使用 [@goto] 命令的 `hold` 参数预加载其他脚本。<br><br> • Optimistic — 预加载所播放脚本所需的所有资源，以及 [@goto] 和 [@gosub] 命令中指定的脚本的所有资源，除非在 [@goto] 命令中指定 `release` 参数，否则不卸载。这最大限度地减少了加载屏幕并允许平滑回滚，但需要手动指定何时应卸载资源，从而增加了内存不足异常的风险。<br><br> • Lazy — 开始播放时不为执行的脚本预加载资源，并且不自动显示加载屏幕。相反，仅在脚本播放时“即时”加载接下来几个命令所需的资源，并立即释放已执行命令使用的资源。此策略不需要剧本规划或手动控制，消耗的内存最少，但可能会由于后台加载资源而导致游戏过程中出现卡顿——尤其是在快进（跳过模式）或执行回滚时。 |
| Lazy Buffer | 25 | 启用 Lazy 资源策略时，控制预加载缓冲区的大小，即预加载的最大脚本命令数。 |
| Lazy Priority | Below Normal | 启用 Lazy 资源策略时，控制加载资源的后台线程的优先级。降低优先级可最大限度地减少卡顿，但代价是加载时间更长。 |
| Remove Actors | True | 卸载脚本资源时是否自动移除未使用的 Actor（角色、背景、文本打印机和选项处理程序）。请注意，即使启用此选项，仍然可以随时使用 [@remove] 命令手动移除 Actor。 |
| Enable Build Processing | True | 是否注册自定义的播放器构建处理程序，以处理被分配为 Naninovel 资源的资产。<br><br>警告：要使此设置生效，需要重新启动 Unity 编辑器。 |
| Auto Build Bundles | True | 构建播放器时是否自动构建 Addressable 资产包。 |
| Label By Scripts | True | 是否按使用它们的剧本脚本的路径为所有 Naninovel Addressable 资产添加标签。当 Addressable 组设置中的 `Bundle Mode` 设置为 `Pack Together By Label` 时，这将使资产包的打包更加高效。<br><br>请注意，脚本标签将分配给地址以“Naninovel/”开头的所有资产，其中包括手动公开给 Addressable 资源提供者的资产（未使用资源编辑器菜单）。 |
| Local Root Path | %DATA%/Resources | 本地资源提供者使用的根路径。可以是资源所在文件夹的绝对路径，也可以是以下列可用原点之一开头的相对路径：<br> • %DATA% — 目标设备上的游戏数据文件夹（UnityEngine.Application.dataPath）。<br> • %PDATA% — 目标设备上的持久数据目录（UnityEngine.Application.persistentDataPath）。<br> • %STREAM% — `StreamingAssets` 文件夹（UnityEngine.Application.streamingAssetsPath）。<br> • %SPECIAL{F}% — 操作系统特殊文件夹（其中 F 是 System.Environment.SpecialFolder 中的值）。 |
| Video Stream Extension | .mp4 | 在 WebGL 下流式传输视频（影片、视频背景）时，指定视频文件的扩展名。 |
| Reload Scripts | True | 是否监视和热重载存储在本地提供者目录下的修改后的剧本脚本。 |

</div>

## 脚本播放器

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Default Skip Mode | Read Only | 首次启动游戏时设置的默认跳过模式。 |
| Skip Time Scale | 10 | 在跳过（快进）模式下使用的时间缩放。设置为 1 可禁止在跳过时更改时间缩放。 |
| Min Auto Play Delay | 1 | 在自动播放模式下执行下一个命令之前等待的最少秒数。 |
| Complete On Continue | True | 当激活 `Continue` 输入时，是否立即完成随时间执行的阻塞（`wait!`）命令（例如，动画、隐藏/显示、色调更改等）。 |
| Show Debug On Init | False | 是否在引擎初始化时显示播放器调试窗口。 |
| Wait By Default | False | 当未显式指定 `wait` 参数时，是否等待所播放的命令。仅适用于可等待（异步）命令。<br><br>警告：不要在新项目中启用，因为此选项是为了向后兼容而保留的，并将在下一个版本中移除。 |
| Show Loading UI | False | 是否在脚本预加载/加载和引擎重置操作期间自动显示 `ILoadingUI`。允许使用加载屏幕遮盖资源加载过程。 |

</div>

## 脚本

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Loader | Scripts- (Addressable, Project) | 剧本脚本资源所用的资源加载器配置。 |
| Script Compiler | Naninovel Script Compiler | 用于将源剧本文本转换为脚本资产的 IScriptCompiler 实现。修改此设置后重新导入脚本资产以使更改生效。 |
| Compiler Localization | Object Ref | 特定于语言环境的 NaniScript 编译器选项。将在元数据同步时传播到 IDE 扩展。重新启动 Unity 编辑器并重新导入脚本资产以使更改生效。 |
| Initialization Script | Null | 引擎初始化后立即播放的脚本的本地资源路径。 |
| Title Script | Title | 显示标题 UI 时播放的脚本的本地资源路径。可用于设置标题屏幕场景（背景、音乐等）。 |
| Start Game Script | Entry | 开始新游戏时播放的脚本的本地资源路径。未指定时将使用第一个可用的脚本。 |
| Auto Add Scripts | True | 是否将创建的剧本脚本自动添加到资源中。 |
| Auto Resolve Path | True | 创建、重命名或移动脚本时，是否自动解析和更新资源路径。 |
| Hot Reload Scripts | True | 是否在播放模式期间重新加载修改后的脚本（无论是通过故事编辑器还是外部编辑器修改）并应用更改，而无需重新开始播放。 |
| Watch Scripts | True | 是否对“.nani”文件运行文件系统监视程序。使用外部应用程序编辑脚本时，需要它来检测脚本更改。 |
| Show Script Navigator | False | 引擎初始化后是否自动显示脚本导航器 UI（要求 UI 资源中存在 `IScriptNavigatorUI`）。 |
| Enable Story Editor | True | 是否启用故事编辑器应用。 |
| Show Selected Script | True | 是否在故事编辑器中打开选定的剧本脚本资产。 |
| Enable Community Modding | False | 是否允许向构建添加外部剧本脚本。 |
| External Loader | Scripts- (Local) | 用于定位外部剧本脚本资源的资源加载器配置。<br><br>请注意，`External` 加载器仅用于定位脚本；您仍需配置 `Loader` 才能实际加载它们；有关更多信息，请参阅社区模组指南。 |

</div>

## 生成

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Loader | Spawn- (Addressable, Project) | 生成资源所用的资源加载器配置。 |

</div>

## 状态

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Save Folder Name | Saves | 持久数据目录下用于存储存档文件（游戏存档、全局状态和设置）的文件夹的名称。 |
| Default Settings Slot ID | Settings | 用于保存设置的存档文件的名称。 |
| Default Global Slot ID | GlobalSave | 全局存档文件的名称。 |
| Save Slot Mask | GameSave{0:000} | 用于命名存档槽的掩码。 |
| Quick Save Slot Mask | GameQuickSave{0:000} | 用于命名快速存档槽的掩码。 |
| Auto Save Slot Mask | GameAutoSave{0:000} | 用于命名自动存档槽的掩码。 |
| Save Slot Limit | 99 | 存档槽的最大数量。 |
| Quick Save Slot Limit | 18 | 快速存档槽的最大数量。 |
| Auto Save Slot Limit | 18 | 自动存档槽的最大数量。 |
| Auto Save On Quit | True | 是否在退出到标题之前，或在未处于标题菜单的情况下关闭应用程序时自动保存游戏（在编辑器中不起作用）。 |
| Binary Save Files | True | 是否将存档压缩并存储为二进制文件（.nson）而不是文本文件（.json）。这将显著减小文件大小并使其更难编辑（以防止作弊），但在保存和加载时会消耗更多内存和 CPU 时间。 |
| Reset On Goto | False | 通过 [@goto] 命令加载另一个脚本时是否重置引擎服务的状态。可用于代替 [@resetState] 命令，在每次 goto 时自动卸载所有资源。 |
| Show Loading UI | True | 加载游戏状态时是否自动显示 `ILoadingUI`。 |
| Enable State Rollback | True | 是否启用状态回滚功能，该功能允许玩家倒回脚本。<br><br>请注意，回滚功能会带来性能开销，因为它实际上会在每次玩家交互时序列化整个游戏状态，从而产生大量堆分配。如果您的游戏不需要回滚功能，请在此处禁用它，而不是仅仅移除回滚输入。<br><br>请注意，即使在此处禁用，回滚在 Unity 编辑器中仍会保持启用，因为热重载功能需要它；此配置会在播放器构建中生效。 |
| State Rollback Steps | 1024 | 运行时保留的状态快照数量；决定回滚（倒回）可以回溯多远。增加此值将消耗更多内存。 |
| Saved Rollback Steps | 128 | 序列化（保存）到游戏存档槽中的状态快照数量；决定加载存档后回滚可以回溯多远。增加此值将增大游戏存档文件。 |
| Recovery Rollback | True | 加载游戏状态时，如果脚本在存档创建之后被修改过，是否回滚到所播放脚本的开头。 |
| Game State Handler | Naninovel Universal Game State Serializer | 负责反序列化/序列化本地（特定于会话的）游戏状态的实现；有关如何添加自定义序列化处理程序的信息，请参阅状态管理指南。 |
| Global State Handler | Naninovel Universal Global State Serializer | 负责反序列化/序列化全局游戏状态的实现；有关如何添加自定义序列化处理程序的信息，请参阅状态管理指南。 |
| Settings State Handler | Naninovel Universal Settings State Serializer | 负责反序列化/序列化游戏设置的实现；有关如何添加自定义序列化处理程序的信息，请参阅状态管理指南。 |

</div>

## 文本打印机

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Default Printer ID | Dialogue | 默认使用的文本打印机的 ID。 |
| Default Base Reveal Speed | 0.5 | 首次启动游戏时设置的基础显示速度（游戏设置）。 |
| Default Base Auto Delay | 0.5 | 首次启动游戏时设置的基础自动延迟（游戏设置）。 |
| Max Reveal Delay | 0.06 | 显示（打印）文本消息时的延迟限制（以秒为单位）。具体的显示速度通过游戏设置中的 `message speed` 设置；此值定义可用范围（值越高，显示速度越慢）。 |
| Max Auto Wait Delay | 0.02 | 在自动播放模式下等待继续时，每个已打印字符对应的延迟限制（以秒为单位）。具体的延迟通过游戏设置中的 `auto delay` 设置；此值定义可用范围。 |
| Scale Auto Wait | True | 是否按打印命令中设置的显示速度缩放自动播放模式下的等待时间。 |
| Skip Print Delay | 0 | 大于零时，在启用跳过模式（快进）期间，每个打印命令将等待指定的时间（以秒为单位，不受时间缩放影响）。用于在跳过时减慢播放速度。 |
| Default Metadata | Object Ref | 创建文本打印机 Actor 且所创建的 Actor ID 不存在自定义元数据时默认使用的元数据。 |
| Metadata | Object Ref | 创建具有特定 ID 的文本打印机 Actor 时使用的元数据。 |
| Scene Origin | (0.50, 0.00) | 场景中被视为受管 Actor 原点的参考点。 |
| Z Offset | 0 | 创建 Actor 时设置的从 Actor 到摄像机的初始 Z 轴偏移（深度）。 |
| Z Step | 0 | 创建 Actor 时在 Actor 之间设置的 Z 轴距离；用于防止 z-fighting 问题。 |
| Default Duration | 0.35 | 所有 Actor 修改（更改外观、位置、色调等）的默认持续时间（以秒为单位）。 |
| Default Easing | Linear | 默认用于所有 Actor 修改动画（更改外观、位置、色调等）的缓动函数。 |
| Auto Show On Modify | False | 执行修改命令时是否自动显示 Actor（使其可见）。 |

</div>

## UI

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| UI Loader | UI- (Addressable, Project) | UI 资源所用的资源加载器配置。 |
| Font Loader | Fonts- (Addressable, Project) | 字体资源所用的资源加载器配置。 |
| Override Objects Layer | True | 是否为引擎管理的所有 UI 对象分配特定层。某些内置功能（例如 `Toggle UI`）需要此选项。 |
| Objects Layer | 5 | 启用 `Override Objects Layer` 时，指定的层将分配给所有受管 UI 对象。 |
| Font Options | Object Ref | 游戏设置 UI 中（除 `Default` 之外）可供玩家选择的字体选项。 |
| Default Font | Null | 首次启动游戏时默认应用的 `Font Options` 中的字体名称。未指定时，应用 `Default` 字体。 |

</div>

## 可解锁内容

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Loader | Unlockables- (Addressable, Project) | 可解锁资源所用的资源加载器配置。 |

</div>

## 变量

<div class="config-table">

| 属性 | 默认值 | 描述 |
| --- | --- | --- |
| Meta By Default | False | 是否默认将所有变量视为元变量。元变量在开始新游戏时不会重置，并会在更改时自动保存。适用于引擎不断重置且游戏状态由外部处理的对话模式。 |
| Predefined Variables | Object Ref | 默认初始化的变量列表。元变量在应用程序首次启动时初始化，其他变量在每次状态重置时初始化（常量除外）。 |

</div>
