# 资源提供者

资源提供者用于在运行时检索 Naninovel 相关资产（外观纹理、BGM 剪辑等），以满足 [内存管理](/zh/guide/memory-management) 的需要。每个提供者都专门负责从特定来源检索资产：项目的“Resources”文件夹、Unity 的 Addressable 资产系统、本地文件存储等。

提供者的一般行为可以通过 `Naninovel -> Configuration -> Resource Provider` 菜单进行配置。

![](https://i.gyazo.com/623b6df78984851c79715378aae9b559.png)

`Resource Policy` 属性决定在脚本执行期间何时加载和卸载资源。有关更多信息，请参阅 [内存管理](/zh/guide/memory-management) 指南。

`Enable Build Processing` 会开启一个构建预处理步骤，该步骤是确保通过编辑器菜单分配的资产在构建中可用所必需的。如果您使用的是 [自定义构建环境](/zh/guide/custom-build-environment) 或附加了自己的构建挂钩，则可能需要禁用此处理。启用或禁用该属性后，请重新启动 Unity 编辑器以使更改生效。

安装 [Addressables 系统](https://docs.unity3d.com/Packages/com.unity.addressables@latest) 后，将使用它来优化资产处理步骤并缩短构建时间；启用 `Auto Build Bundles` 将在构建播放器时自动编译资产包。

配置菜单中的其他属性是特定于提供者的，如下所述。

针对特定资源的提供者行为通过相应配置菜单中的 `Loader` 属性进行配置。例如，这是用于检索 SFX 资源的默认加载器配置：

![](https://i.gyazo.com/a51d5e5e6348ccc942cd3c96e5782b48.png)

`Path Prefix` 属性允许为特定类型的资源在提供者根路径的基础上指定附加路径。例如，如果我们要从项目的“Resources”文件夹中检索“Explosion”音频文件并将路径前缀设置为 `SFX`，则最终的资源请求将是 `Resources.LoadAsync("Naninovel/SFX/Explosion")`。

`Providers List` 允许指定使用哪些提供者类型以及使用顺序。例如，在上面的配置中，请求音频资源时，将首先尝试 Addressable 提供者；如果它找不到请求的资源，将回退到项目提供者。

请注意，在编辑器中时，始终首先使用特殊的“Editor”资源提供者（无论加载器配置如何）。此提供者可以访问通过 Naninovel 的配置和资源管理器菜单（`Naninovel -> Resources -> ...`）分配的所有资源。构建游戏时，此类资源会自动复制到临时“Resources”文件夹或（当安装了 [Addressables 系统](https://docs.unity3d.com/Packages/com.unity.addressables@latest) 时）在 Addressables 配置中注册并编译为资产包。请记住始终在构建中而不是在 Unity 编辑器中执行任何与提供者相关的测试。

## Addressable

[Addressable 资产系统](https://docs.unity3d.com/Packages/com.unity.addressables@latest) 是一个 Unity 包，允许通过“地址”加载资产。它使用异步加载来支持从任何位置（本地存储、远程 Web 托管等）加载具有任意依赖项集合的资产。有关如何设置、配置和使用该系统的信息，请参阅 Unity 的文档。

当项目中安装了该包时，Naninovel 将自动使用 Addressables。无需额外设置：在 Naninovel 的配置菜单中分配的所有资产（例如，剧本脚本、角色精灵、音频剪辑）将在构建播放器时向系统注册（分配地址）。

通过 Naninovel 菜单分配的资产会添加到 `Naninovel` 组中。如果您希望配置这些资产的提供方式（例如，指定远程 Web 主机），请通过 `Window -> Asset Management -> Addressables -> Groups` 编辑该组。该组会在首次需要时自动创建；您也可以手动创建该组，以便在构建游戏前进行配置。

![](https://i.gyazo.com/c93fbd9e232ec94468c685c4d6003916.png)

::: info NOTE
通过 Naninovel 菜单分配的资产地址会在每次构建时自动生成或更新。请勿手动编辑这些地址，因为更改可能会在下次构建时丢失。不过，组设置会保留。
:::

### 手动分配

若要在不使用编辑器菜单的情况下将 Addressable 资产注册为 Naninovel 资源，请在地址中添加 `Naninovel/` 前缀，后跟资源类型（路径前缀）和本地资源路径。地址中不要包含文件扩展名。资产可以位于任意 Addressables 组中；Naninovel 通过地址识别它。

以下是可用于手动分配常见资源类型的地址示例：

| 资源类型    | 地址                                                             |
|---------|----------------------------------------------------------------|
| 剧本脚本    | `Naninovel/Scripts/{SCRIPT_PATH}`                              |
| 精灵角色外观  | `Naninovel/Characters/{CHARACTER_ID}/{APPEARANCE_PATH}`        |
| 通用角色    | `Naninovel/Characters/{CHARACTER_ID}`                          |
| 背景音乐    | `Naninovel/BGM/{AUDIO_PATH}`                                   |
| 音效      | `Naninovel/SFX/{AUDIO_PATH}`                                   |
| 语音      | `Naninovel/Voice/{AUDIO_PATH}`                                 |
| 管理文本文档  | `Naninovel/Text/{DOCUMENT_PATH}`                               |
| 脚本本地化文档 | `Naninovel/Localization/{L10N_TAG}/Text/Scripts/{SCRIPT_PATH}` |

::: tip EXAMPLE
查看 [Addressable 示例](/zh/guide/samples#addressable)，了解通过 Addressable 提供者手动注册 Naninovel 资源（不使用资源编辑器菜单）并从远程主机提供资产的示例。您可能还会发现 Unity 的 [学习材料](https://learn.unity.com/course/get-started-with-addressables) 很有用。
:::

### 脚本标签

由于 [令人遗憾的 Unity 设计决策](https://github.com/naninovel/docs/issues/159)，Addressable 资产在整个资产包卸载之前不会从内存中卸载。这意味着，除非您合理地组织资产包，否则资产可能最终都位于同一个包中，一旦加载就永远不会卸载，从而可能导致内存不足异常。

最简单的解决方案是在 [组设置](https://docs.unity3d.com/Packages/com.unity.addressables@1.22/manual/GroupSchemas.html) 中将 `Bundle Mode` 设置为 `Pack Separately`：

![](https://i.gyazo.com/651a292ca6f1f4e26593074e25c66cea.png)

这使每个资产各自成为一个独立的包，从而可以在释放后立即卸载。虽然这对 RAM 使用而言是最优的，但这种方法会增加 CPU 开销和加载时间，因为加载一个大的连续二进制块比反复寻道并加载许多小块要快得多，尤其是在较慢的驱动器上。

当在资源提供者配置中启用 `Label By Scripts`（默认）时，Naninovel 将使用折衷方案：在构建过程中，它会扫描所有剧本脚本，尝试确定每个脚本需要哪些资产，并按引用它们的脚本为 Addressable 资产分配标签：

![](https://i.gyazo.com/9013a1264a55aa95d22ecfc6b3283ac3.png)

如果您将 `Bundle Mode` 设置为 `Pack Together By Label`（默认），资产将根据它们与剧本脚本的关联关系拆分到不同的包中，这会针对 Naninovel 的 [内存管理策略](/zh/guide/memory-management) 优化包结构。

::: info NOTE
所有 Naninovel 资产都会被分配标签，包括通过 Addressables [手动分配](/zh/guide/resource-providers#手动分配) 的资产。只要资产的地址以 `Naninovel/` 开头，它就会被打上关联脚本的标签。
:::

分配标签的过程需要一定程度的推测，并不总是完美的。为了帮助确保资产被分配正确的标签，请遵循以下准则：

- 不要在资源上下文的参数（例如 Actor ID、外观、音频路径等）中使用 [表达式](/zh/guide/expressions)。表达式在命令即将执行之前才会求值，这使得无法在构建时解析最终路径。Naninovel 会在构建期间检测到此类情况时警告您。
- 始终在 [@char] 和 [@back] 等命令中指定 Actor ID 和外观；虽然此类命令可能会回退到默认值，但在构建时并不总是可以解析这些默认值。
- 创建 [自定义命令](/zh/guide/custom-commands) 时，将 [资源上下文特性](/zh/guide/ide-extension#ide-特性) 应用于引用资源的参数（例如，将 `[ActorContext]` 应用于接受 Actor ID 的参数）。这些特性主要由 IDE 扩展用于自动补全，但标签分配工具也使用它们来解析资产地址。

## Project

项目提供者提供位于 Unity 项目内“Resources”文件夹中的资产。有关项目 [资源加载 API](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime) 的更多信息，请参阅 Unity 指南。

::: warning
在大多数情况下，[不建议使用“Resources”文件夹](https://docs.unity3d.com/Manual/UnderstandingPerformanceResourcesFolder.html)。请尽可能通过 Naninovel 资源管理器菜单分配资源或改用 Addressables 系统；之后记得将资产移出“Resources”文件夹。
:::

## Local

本地提供者允许从本地文件系统中的任意位置提供简单资产（剧本脚本、精灵角色和背景、音频）。

::: info NOTE
本地提供者从文件系统加载原始文件并在运行时转换它们，这种方式速度较慢，而且与其他提供者相比支持的文件类型有限。请仅在开发过程中或针对特定功能（例如 [社区模组](/zh/guide/resource-providers#社区模组)）使用它。
:::

支持的文件格式：

- 用于剧本脚本的 `.nani` 纯文本文件
- 用于图像/纹理的 `.png` 和 `.jpg`
- 用于音频的 `.wav`（仅限 PCM16 44100Hz 立体声）

::: tip
通过覆盖 `IResourceProviderManager` [引擎服务](/zh/guide/engine-services#覆盖内置服务) 并为本地提供者添加自定义转换器来添加更多支持的文件格式。

![](https://i.gyazo.com/d4e63726c2d1d75e2677cab7f2503546.png)
:::

资源提供者配置中的 `Local Root Path` 属性应指向存储本地资源的文件夹。您可以使用绝对路径（例如 `C:\Resources`），也可以使用以下列起点之一开头的相对路径：

- `%DATA%` — 目标设备上的游戏数据文件夹（[Application.dataPath](https://docs.unity3d.com/ScriptReference/Application-dataPath)）；
- `%PDATA%` — 目标设备上的持久数据目录（[Application.persistentDataPath](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath)）；
- `%STREAM%` — “StreamingAssets”文件夹（[Application.streamingAssetsPath](https://docs.unity3d.com/ScriptReference/Application-streamingAssetsPath)）；
- `%SPECIAL{F}%` — 操作系统特殊文件夹，其中 `F` 是 [特殊文件夹枚举](https://docs.microsoft.com/en-us/dotnet/api/system.environment.specialfolder) 值的名称。

默认的 `%DATA%/Resources` 值指向游戏数据目录内的“Resources”文件夹（确切位置因目标平台而异）。

作为一个使用示例，假设您想从 `C:/Users/Admin/Dropbox/MyGame/Scripts` 加载剧本脚本，并与协作者共享该文件夹以共同编写剧本。指定绝对根文件夹（`C:/Users/Admin/Dropbox/MyGame`）将要求所有协作者将该文件夹存储在完全相同的路径下。更好的做法是使用以“UserProfile”特殊文件夹为起点的相对路径：`%SPECIAL{UserProfile}%/Dropbox/MyGame`。

![](https://i.gyazo.com/eb435b782cfb9df6c403702e8f6124df.png)

如果脚本配置下的路径前缀设置为 `Scripts` 并且本地提供者已添加到列表中，则脚本导航器（可通过 `nav` 控制台命令访问）应该能识别到存储在该文件夹下的所有 `.nani` 文本文件。

![](https://i.gyazo.com/df8ad31d30b5c10c9a918e69a4543567.png)

## 自定义提供者

可以添加资源提供者的自定义实现，并让 Naninovel 将其与内置提供者一起使用（或用它代替内置提供者）。

要添加自定义提供者，请创建一个具有无参数构造函数的 C# 类并实现 `IResourceProvider` 接口。创建后，自定义提供者类型将与内置类型一起出现在所有加载器配置菜单中。

![](https://i.gyazo.com/7176a9d4a4ea2d9414c5495e2e465baf.png)

您可以在 `Naninovel/Runtime/Resource/Provider` 包目录中找到内置资源提供者的实现；在实现您自己的提供者时，可以随意将它们用作参考。

## 社区模组

社区模组允许玩家通过添加自己的剧本和资源来修改构建，同时仍然可以访问游戏的内置资源。

要激活该功能，请在脚本配置 UI（`Naninovel -> Configuration -> Scripts`）中启用 `Enable Community Modding` 属性，并为您希望公开给模组使用的任何资源设置 [本地](/zh/guide/resource-providers#local) 提供者。请确保本地提供者的根路径设置为默认值（`%DATA%/Resources`），以便它在构建目录下查找资源。

![](https://i.gyazo.com/e32f40aa3faa648774908a0a937c5fcb.png)

启用该功能后，标题菜单中会出现一个“EXTERNAL SCRIPTS”按钮，用于打开外部脚本浏览器。在编辑器中时，浏览器还将列出项目资产中的剧本脚本。

请注意，`External Loader` 配置控制哪些脚本显示在外部脚本浏览器中，而 `Loader` 配置控制实际脚本资源的加载。External Loader 默认使用本地提供者，因此它仅在游戏构建目录中查找脚本。对于其他资源类型（背景、角色等），您必须在相应的配置菜单中手动设置本地提供者，以允许玩家添加它们。

要将外部资源添加到构建中，请将它们放入游戏 `Resources` 目录下的子文件夹中，子文件夹应与 `Loader` 折叠项中为该资源配置的 `Path Prefix` 属性相对应。例如，要添加外部剧本脚本，请将其放入 `GameFolder/GameName_Data/Resources/Scripts`；背景放入 `GameFolder/GameName_Data/Resources/Backgrounds`，依此类推。*GameFolder* 和 *GameName* 取决于您的 Unity 项目的名称。

可以使用 [UI 自定义](/zh/guide/gui#ui-自定义) 功能自定义或完全替换外部脚本浏览器 UI。
