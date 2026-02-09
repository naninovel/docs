# 快速上手

## 先决条件

Naninovel 是 [Unity 游戏引擎](https://unity.com) 的扩展，因此强烈建议在开始使用 Naninovel 之前至少 [学习使用 Unity 的基础知识](https://learn.unity.com)。

如果您不打算在 Naninovel 之外实现任何自定义游戏玩法，则可以忽略场景相关的信息，因为 Naninovel 会自动处理它。

## 视频指南

如果您更喜欢视频指南，这里有一个涵盖了视觉小说和对话模式的快速上手指南。

![](https://www.youtube.com/watch?v=N1_CwR5xblU)

## 创建 Unity 项目

创建项目时，我们建议选择基于 **Universal Render Pipeline** (URP) 的 Universal 2D 或 Universal 3D 模板。旧版内置渲染管线 (BiRP) 也可以工作，但 Unity 不再积极维护它，并且预计将被弃用。不建议使用 High Definition Render Pipeline (HDRP) — 它通常可以工作，但某些渲染功能可能无法开箱即用。

选择 2D 还是 3D 取决于您正在构建的游戏风格。对于大多数标准视觉小说，我们建议选择 2D，这样图像将默认作为精灵资产导入，您无需手动调整导入设置。您可以稍后在 [项目设置](https://docs.unity3d.com/Manual/2DAnd3DModeSettings.html) 中更改编辑器行为模式。

![](https://i.gyazo.com/b1b89ad23fbeffff3d03cf7dcf25cab1.png)

创建新项目后，Unity 会自动包含一个带有“Main Camera”的示例场景，根据模板的不同，还会包含各种其他游戏对象。

![?width=271](https://i.gyazo.com/5bd6471a53ffbf106099373395484ef6.png)

Naninovel 是场景无关的；因此，我们建议从场景中删除这些对象，以防止不必要的性能开销或与 Naninovel 系统的冲突。您也可以删除示例场景本身，但建议在项目中至少保留一个场景，以便某些编辑器功能正常工作。

### 优化编辑器

此步骤是可选的，但建议执行，因为它可以显着缩短 Unity 编辑器的启动、重新加载和进入播放模式的时间。

首先，转到 `Edit -> Project Settings -> Editor` 并在 "Enter Play Mode Settings" 选项下选择 `Do not reload Domain or Scene`，以减少进入播放模式所需的时间。

![](https://i.gyazo.com/bf1a91f7ad04f0823e72c9feb4f67f0a.png)

现在，打开并检查位于 Unity 项目根目录下的 "Packages" 文件夹中的 `manifest.json` 文件。此文件列出了所有已安装的包和模块。根据模板的不同，Unity 默认包含许多模块，其中大多数您可能永远不需要，而每个额外的模块都会增加编辑器启动和代码重新加载的时间。以下是 Naninovel 所需的模块 — 如果不需要，请考虑删除任何其他条目：

::: code-group
```json [Packages/manifest.json]
{
    "dependencies": {
        "com.unity.modules.audio": "1.0.0",
        "com.unity.modules.video": "1.0.0",
        "com.unity.modules.imgui": "1.0.0",
        "com.unity.modules.animation": "1.0.0",
        "com.unity.modules.particlesystem": "1.0.0",
        "com.unity.modules.imageconversion": "1.0.0",
        "com.unity.render-pipelines.universal": "17.3.0",
        "com.unity.inputsystem": "1.17.0",
        "com.unity.ugui": "2.0.0"
    }
}
```
:::

::: info NOTE
禁用域重新加载和修改 `manifest.json` 文件 **并不是使用 Naninovel 所必需的**；这仅旨在提高 Unity 编辑器的性能。如果您不确定这些更改的影响或您的游戏需要哪些模块 — 请跳过这些步骤。
:::

### VCS 设置

如果您正在使用版本控制系统，例如 Git，请考虑忽略以下路径以防止不必要的混乱：

::: code-group
```asm [.gitignore]
# Auto-generated Unity assets of transient nature.
/Assets/NaninovelData/Transient*
# Transient artifacts of the external tools.
/Assets/NaninovelData/.nani/Transient*
```
:::

请注意，`Assets/NaninovelData` 是一个自动生成的文件夹。最初创建后，您可以将其重命名或移动到 `Assets` 下的任何文件夹（Naninovel 仍然能够找到它）。如果您这样做，上述忽略路径必须相应更新。

::: tip EXAMPLE
请参阅我们的 [示例项目](/zh/guide/samples) 中的 [.gitignore](https://github.com/naninovel/engine/blob/main/unity/samples/.gitignore) 以获取 Git 忽略配置文件的示例。在该示例中，`NaninovelData` 文件夹重命名为 `Naninovel` 并移动到 `Assets/Profiles` 下以便更好地组织 — 您可以在自己的项目中类似地移动文件夹。
:::

## 安装 Naninovel

### 发布流

Naninovel 分布在 3 个发布流中：**preview**（预览版）、**stable**（稳定版）和 **final**（最终版）。

Preview 是最前沿的：它更新最频繁，并拥有所有最新功能。但是，它可能会偶尔出现重大更改和错误。当您处于开发初期或需要其他版本中不可用的特定功能时，请选择此流。

Stable 是折衷方案：它只接收错误修复，没有最新功能，但也没有任何重大更改。在大多数情况下建议使用。

Final 虽然是经过最充分测试和稳定的，但也是最过时的，并且不在 [技术支持](/zh/support/#naninovel-support) 范围内。仅当项目已经发布并且无法升级时，才停留在最终版本上。

![](https://i.gyazo.com/2462242c14c96a0eae9ca99212c340c4.png)

Stable 流发布在 GitHub 和 Unity 的 Asset Store 上（虽然不如在 GitHub 上频繁），而 preview 和 final 流仅在 GitHub 上可用。

### 从 Asset Store 安装

安装 Naninovel 最简单的方法是通过 Unity Package Manager (UPM) 的 "My Assets" 选项卡。打开 Package Manager 窗口，找到 Naninovel，然后单击 Install。

![?width=674](https://i.gyazo.com/3e056854efc95a4adfb485557497e134.png)

在 [Unity 文档](https://docs.unity3d.com/Manual/upm-ui-import) 中查找有关使用 UPM 的更多信息。

### 从 GitHub 安装

preview 和 stable 流中的最新 Naninovel 版本通过 Naninovel GitHub 存储库分发。要访问存储库，请 [注册您的 Naninovel 许可证](https://naninovel.com/register) 并按照仪表板上的说明分配您的 GitHub 用户。

一旦您可以访问存储库，通过 Unity 的 Package Manager 将 `https://github.com/naninovel/upm.git#X.X` 添加为 Git 包，其中 `X.X` 是您想要安装的发布版本，例如：

```
https://github.com/naninovel/upm.git#1.21
```

您可以在 [发布页面](https://pre.naninovel.com/releases) 上找到所有可用的版本及其 Git URI。

![?width=300](https://i.gyazo.com/c7c453b8b34c94809303a9dc42e5330d.png)

当您希望使用 preview 流保持最前沿或在 GitHub 存储库推送后立即获取 stable 流上的补丁时，这种安装方法特别方便。只需单击 Package Manager 窗口中的 "Update" 即可将您的安装升级到最新提交。

![?width=368](https://i.gyazo.com/c1b86f88105a76e33cba961a9b71c8fb.png)

::: tip
如果在安装包时遇到错误，请确保您已通过帐户仪表板中分配的 GitHub 用户进行身份验证。在 Windows 上进行身份验证的最简单方法是使用 [GitHub Desktop](https://github.com/apps/desktop) 登录。在 macOS 和 Linux 上，请改用 [GCM](https://github.com/git-ecosystem/git-credential-manager/releases/latest)。有关 [更多信息](https://docs.unity3d.com/Manual/upm-config-https-git.html)，请参阅 Unity 指南。
:::

### 从存档安装

另一种安装 Naninovel 的方法是从我们的 [下载存档](https://account.naninovel.com/download) 下载包。当您需要不再在 Asset Store 上分发的特定最终版本时，此方法很有用。存档包含从版本 1.14 到当前稳定版本的所有旧版本的最终版本。

只需将下载的 `.unitypackage` 文件拖放到 Unity 编辑器窗口中，然后单击 "Import" 即可安装该包。在 [Unity 文档](https://docs.unity3d.com/Manual/AssetPackagesImport.html) 中查找有关安装本地包的更多信息。

## 核心概念

在深入了解 Naninovel 之前，让我们快速了解一下它的一些核心概念。

一个必不可少的概念是 *actor（演出元素/演员）*，在指南的其余部分中，您将不断遇到它。Actor 是一个由标识符 (ID)、外观、空间（场景）位置和其他一些参数描述的实体。

Actor 是一个抽象实体，不能直接存在；相反，使用具有各种附加参数的专用版本：

| Actor 类型 | 附加参数 | 描述 |
|--------------------------------------|----------------------------------|------------------------------------------------------------------------------|
| [角色](/zh/guide/characters) | 朝向 | 代表场景中的角色。 |
| [背景](/zh/guide/backgrounds) | 无 | 代表场景中的背景；默认放置在角色 actor 后面。 |
| [文本输出窗](/zh/guide/text-printers) | 文本, 作者 ID, 显示进度 | 随着时间的推移逐渐显示（打印）文本消息。 |
| [选项处理程序](/zh/guide/choices) | 选项 | 允许玩家选择可用的选项之一。 |

考虑一个典型的视觉小说设置，在背景之上描绘一个角色。用 Naninovel 术语来说，它表示如下：

![](https://i.gyazo.com/ede8072c68393e915286d18811a8dd4f.png)

现在，假设您希望角色 "Kohaku" 显示不同的情绪或姿势。该角色有几个纹理（图像），每个纹理描绘不同的状态。在 Naninovel 中，此类纹理称为 actor 的 *appearances（外观）*。为了实现这一点，我们要改变角色 actor 的外观。同样，要让 "MainBackground" 显示其他内容，我们需要更改该背景 actor 的外观。

Actors 及其参数通过 [剧本脚本](/zh/guide/scenario-scripting) 中指定的命令进行定向。

另一个广泛使用的概念是 [用户界面](/zh/guide/gui) (UI)。玩家使用 UI 与 actor 和游戏的其余部分进行交互。这包括各种菜单（标题、保存加载、设置等）和控制面板（切换自动阅读模式、跳过文本等）。默认情况下，UI 元素位于 actor 的顶部。

文本输出窗和选项处理程序既被视为 actor 也被视为 UI 元素，这意味着它们共享 actor 的特质，可以通过剧本脚本进行控制，同时也被玩家用来与游戏进行交互。

![](https://i.gyazo.com/0c8bd29820c6f2165af6adc5736713bd.png)

如果您熟悉编程，请查看 [引擎架构](/zh/guide/engine-architecture) 以了解它是如何从软件工程的角度设计的。

## 第一步

几个示例脚本已搭建到 `Assets/Scenario` 文件夹中，并且在初次安装 Naninovel 时会自动打开 [故事编辑器](/zh/guide/editor) 选项卡。单击故事编辑器顶部的 "Play" 按钮进入播放模式。

![?width=400](https://i.gyazo.com/664efe9237b14ee091fded317a2cab4a.png)

Unity 编辑器将进入播放模式并显示默认标题 UI。同时，`Title` 剧本脚本将在故事编辑器中打开，表明它当前正在播放。

![](https://i.gyazo.com/84c64bf7fb4217dd149260fd0008b7f4.png)

随意探索故事编辑器并编辑脚本 — 更改会实时应用。阅读示例脚本中的注释，了解附近命令的简要说明。单击标题 UI 上的 "NEW GAME" 进入 `Entry` 脚本，其中包含一些其他示例。

## 添加剧本脚本

现在您熟悉了大致流程，让我们深入了解如何向游戏添加实际内容。在 Naninovel 中驱动故事的基本资产称为 *scenario scripts（剧本脚本）*。

我们已经自动搭建了两个脚本，但让我们学习如何添加新脚本。虽然您可以使用 [故事编辑器](/zh/guide/editor) 来管理脚本，但让我们在开始时专注于标准的 Unity 工作流程；您可以在其专用指南中了解故事编辑器特定的工作流程。

首先，单击 "Stop" 按钮退出播放模式。根据经验，任何项目级修改 — 例如添加或删除资产以及调整项目设置 — 都应在 Unity 的播放模式之外执行。

找到与示例脚本一起自动搭建的 `Assets/Scenario` 文件夹 — 这是 *scenario root（剧本根目录）* — 存储所有 Naninovel 剧本脚本的文件夹。在 scenario 文件夹下，右键单击并选择 `Create -> Naninovel -> Scenario Script` 以创建一个新的 `Test.nani` 剧本脚本。

![](https://i.gyazo.com/52ac23ba6b66c176bcbe67ef852310fb.png)

::: info NOTE
您可以将剧本脚本（和其他资产）存储在任何项目文件夹中，并随心所欲地组织它们；命名也完全取决于您。但是，请注意，所有剧本脚本必须存储在单个根目录中。您可以根据组织目的创建任意数量的嵌套文件夹，只要所有子文件夹最终都解析为 Unity 项目中的公共根目录即可。
:::

::: warning
Unity 以特殊方式处理名为 `Resources` 的文件夹：存储在此类文件夹下的资产被强制包含在构建中，这可能会导致 [性能问题](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime)。最重要的是，除非指南特别要求，否则切勿将任何内容存储在 `Resources/Naninovel` 文件夹下，因为这可能会导致各种冲突和未定义的行为。
:::

剧本脚本是带有 `.nani` 扩展名的文本文档，您可以在其中使用 [NaniScript](/zh/guide/scenario-scripting) — Naninovel 的编剧语言 — 控制场景中发生的事情。您可以使用您选择的任何文本或代码编辑器（例如 Microsoft Word 或 [VS Code](/zh/guide/ide-extension)）打开和编辑脚本文件。

![?class=when-dark](https://i.gyazo.com/8ccfe73f2b0d39dfe8479a02a218a011.png)
![?class=when-light](https://i.gyazo.com/110a7ca29df4d19f9a019732e1a68019.png)

当您使用 [故事编辑器](/zh/guide/editor) 时，它会将相同的 NaniScript 输出到脚本文件，因此您可以将其与代码编辑器互换使用。在本指南的其余部分，我们将假设您正在使用代码编辑器来显示脚本片段，但您可以在故事编辑器中执行相同的步骤：在行类型下拉列表中开始输入 `@`，它将显示匹配的命令。

![?width=399](https://i.gyazo.com/0f5ee5d28de74570bdf25197e1f5444e.png)

打开创建的 `Test.nani` 脚本并添加以下行：

```nani
Hello World!
```

— 执行时，此行将打印 "Hello World!"。

接下来，打开 `Entry.nani` 脚本并将最后的 `@title` 命令替换为：

```nani
@goto Test
```

— 此命令会将播放导航到我们新的 `Test.nani` 脚本，而不是退出到标题菜单。

进入播放模式，开始新游戏，并一直玩到打印出 "Hello World!"。尝试在游戏进行时编辑脚本 — 更改将立即应用。

::: tip
[API 参考](/zh/api/) 中列出了标准的 NaniScript 命令及其使用示例。也可以添加自定义命令；有关更多信息，请参阅 [指南](/zh/guide/custom-commands)。
:::

## 添加角色

使用用于添加剧本脚本的相同菜单，但现在选择 `Create -> Naninovel -> Actor Record -> Character`。这将创建一个 *character record（角色记录）* 资产，其中包含新角色的 actor 配置。让我们给记录资产起个名字 — `K`。为什么是 `K`？因为标识符将在整个剧本脚本中使用，您不想重复输入全名。实际名称 — "Kohaku" — 可以在记录资产的 `Display Name` 下设置；这是将在游戏中向玩家显示的名称。

![?width=574](https://i.gyazo.com/f9da79b98e2cd3acf9151945330f961e.png)

当然，您可以为您的角色使用任何标识符和显示名称；只需确保 ID 不包含空格或特殊字符。另一方面，显示名称可以包含空格和任何特殊字符。

::: tip
您会在我们的配置菜单中找到许多选项。与其他 Unity 菜单一样，大多数控件都有相关的工具提示来解释它们的作用。要查看工具提示，请将鼠标悬停在其上并稍等片刻 — 说明将出现在光标下方。
:::

现在，让我们选择 actor 的实现。Naninovel 中的角色可以基于常规或切片精灵、动画 Live2D 或 Spine 模型、3D 网格以及许多其他类型的资产；您也可以添加自己的实现。为了本教程的目的，我们将使用基于 2D 纹理资产（图像）的精灵实现。

![?width=575](https://i.gyazo.com/8ffc45f0266741dcb31782c9f236985c.png)

最后，将纹理拖放到包含我们角色的文件夹中来分配外观，选择它们，单击 Inspector 标头下的 Naninovel 图标，然后选择 `Characters -> K`。

![?width=623](https://i.gyazo.com/25cf89584f50f72b5e0f34d71742ed23.png)

修改剧本脚本以使用 [@char] 命令显示添加的角色：

```nani
@char K
Hello World!
```

您将在屏幕中央看到角色。当您未指定外观时，会自动选择名为 "Default" 的外观。要选择特定外观，请在角色 ID 后添加其名称，以点分隔，如下所示：

```nani
@char K.Happy
Hello World!
```

鉴于已为角色 "K" 添加了名为 "Happy" 的外观，现在将显示相应的精灵而不是默认精灵。

现在，您可以通过在文本前添加其 ID 后跟冒号来将显示的文本与角色相关联：

```nani
@char K.Happy
K: Hello World!
```

![?width=588](https://i.gyazo.com/48ad8d4c512b67df02d7ace15d5eaca5.png)

可以将角色的外观与显示的文本结合起来以节省一些输入：

```nani
K.Happy: Hello World!
```

要隐藏角色，请使用 [@hide] 命令，后跟 actor ID：

```nani
@hide K
```

## 添加背景

与角色类似，背景在 Naninovel 中可以用多种方式表示：精灵、视频、场景等；也可以自定义实现。

虽然您可以创建多个独立的背景 actor，但在典型的视觉小说中，您通常只使用一个并在不同的外观之间转换。为了简化例程，当您使用 [@back] 命令控制背景 actor 时，默认假定使用 ID 为 `MainBackground` 的背景 actor：

```nani
@back Road
```

— 该命令将使 `MainBackground` actor 转换为 `Road` 外观。

您可以像角色一样创建背景 actor 记录并分配外观精灵：

- 创建一个文件夹来存储背景，例如 `Assets/Backgrounds`
- 右键单击该文件夹并选择 `Create -> Naninovel -> Actor Record -> Background` 以创建 `MainBackground` 记录
- 检查记录并选择实现，例如 `SpriteBackground`
- 分配外观资源

![](https://i.gyazo.com/1017667cd15b374839127fa5e1e5c2e5.png)

在背景外观之间切换时，默认使用交叉淡入淡出 [过渡效果](/zh/guide/special-effects#过渡效果)。要更改效果，请在外观名称后指定过渡类型：

```nani
@back Road
@back Ruins.RadialBlur
```

这将使用 "RadialBlur" 过渡效果将 "Road" 转换为 "Ruins"。

要引用除主背景以外的背景（例如，如果您希望将多个背景叠加在一起），请指定 actor 的 ID。例如，假设 ID 为 `Flower` 的背景 actor 与主 actor 一起存在，则以下命令将其外观更改为 "Bloomed"，然后更改为 "Withered"：

```nani
@back Bloomed id:Flower
@back Withered id:Flower
```

使用相同的 [@hide] 命令隐藏背景：

```nani
@hide Flower
```

## 添加音频

要向 Naninovel 注册 BGM（背景音乐）或 SFX（声音效果）音频资源，请选择音频剪辑资产并使用用于注册角色和背景资源的相同检查器菜单，但选择 "Audio"。

![?width=655](https://i.gyazo.com/b49d3a7f865c8dde7322ef497ee9bcf6.png)

要将注册的音频资源作为背景音乐播放，请使用 [@bgm] 命令：

```nani
@bgm CloudNine
```

切换音乐曲目时会自动应用交叉淡入淡出效果。默认情况下，音乐将循环播放，不过您可以使用命令参数更改此设置，以及音量和淡入淡出持续时间。

相比之下，声音效果默认不会循环播放。使用 [@sfx] 命令播放它们：

```nani
@sfx Explosion
```

要停止播放 BGM 或 SFX，请分别使用 [@stopBgm] 和 [@stopSfx] 命令：

```nani
@stopBgm CloudNine
@stopSfx Explosion
```

## 管理资源

您可以在 Naninovel 选项卡下的 Project Settings 窗口中查看所有已注册的资源，以及 actor 和其他引擎选项；使用 `Naninovel -> Configuration` 编辑器菜单快速访问配置。

![?width=641](https://i.gyazo.com/0716a001d7bc1695ae0cac655b55f017.png)

您可以自由更改资源路径（默认情况下它们等于资产名称），这对组织目的很有用。注册的路径是您在剧本脚本中引用资源时实际使用的路径。例如，在上面的截图中，我们将 `Explosion` 更改为 `SFX/Explosion`。我们现在可以使用新路径播放声音效果：

```nani
@sfx SFX/Explosion
```

当您添加或修改资源时，故事编辑器和 VS Code 扩展都会自动与更改同步并更新相关列表。

![](https://i.gyazo.com/c353c7cfa398315d926f365634786467.png)

::: tip
考虑安装 Unity 的 [Addressables 包](https://docs.unity3d.com/Packages/com.unity.addressables@latest) 以最终控制资产在最终构建中的组织和捆绑方式 — Naninovel 将自动与该包集成。
:::

## 对话模式

尽管 Naninovel 主要设计为构建视觉小说的基础，但它也可以用作任何类型游戏的嵌入式对话或过场动画系统。

虽然可以手动为“嵌入式”用例配置引擎，但有一个专用的 "Minimal Mode"（最小模式）开关，它可以自动修改配置，删除大多数内置 UI，并禁用功能以将引擎减少到最低限度。

通过 `Naninovel -> Set Up Minimal Mode` Unity 编辑器菜单启用最小模式。

![?width=234](https://i.gyazo.com/6d92cd0d7e0c63c1010123a0f61e78e0.png)

::: warning
最小模式设置过程将修改引擎的默认配置和资源，并且 **更改无法自动撤消**。仅当开始一个新项目，其中 Naninovel 将被用作嵌入式对话系统而不是视觉小说引擎时，才启用该模式。
:::

等待设置完成并重新编译脚本。请注意，"Naninovel" 编辑器菜单现在位于 "Tools" 下 — 表明它已将自己降级为工具状态，而不是项目的基础部分。

您可以在指南的“高级”部分下阅读有关将引擎集成到现有代码库中的 C# 部分的更多信息。在这里，我们将展示一个简单的无代码对话交互场景：玩家将鼠标悬停在可交互对象上并单击它以开始对话。在一个空场景上，添加：

- 一个带有 `UI / Event System` 组件的对象
    - 将 `Naninovel/Resources/Input/DefaultControls` 分配为 `Actions Asset`
- 一个带有 `Event / Physics Raycaster` 组件的相机对象
- 一个将充当对话触发器的立方体
    - 删除附加到立方体的默认碰撞体组件

现在，右键单击立方体并选择 `Naninovel -> Dialogue` — 这会自动在所选对象上设置对话触发器。检查在立方体下创建的 `Dialogue` 对象并分配要播放的剧本脚本资产。

接下来，在 `Dialogue/Trigger` 对象上设置触发条件：

- 将 `Collide With` 和 `Raycast From` 设置为 "None"
- 将 `Perform Input` 设置为 Naninovel 输入操作资产中的 `UI/Click` 操作
- 启用 `Hover With Pointer`

![?width=689](https://i.gyazo.com/97b63b1cb1692966fef8dc0b98b0fced.png)

进入播放模式并将鼠标悬停在立方体上 — 当鼠标光标位于其上方时，提示将做出反应。左键单击以开始对话。要退出对话，请使用 [@exitDialogue] 命令。

请注意 `Trigger Events` 组件上的许多选项 — 您可以通过简单地调整它们来设置大多数常见的交互场景，例如一定距离的第一人称注视、横向卷轴视图碰撞、第三人称指针悬停后按键等。阅读每个选项上的工具提示以了解它们的工作原理。

## 演示示例

Naninovel 包包含两个基本示例：

- **Visual Novel** — 一个具有多条路线的基本视觉小说模板，演示了占位符 actor、各种命令、局部和全局变量、可自定义角色名称以及其他传统 VN 机制的使用。
- **Dialogue System** — 一个 3D 横向卷轴场景，其中 Naninovel 用作嵌入式对话系统，展示了瞬态打印机、气泡选项处理程序、与 Cinemachine 的集成以及其他常见使用场景的使用。

您可以通过选择 Naninovel 包，导航到 "Samples" 选项卡，然后单击示例的 "Import" 按钮，通过 Unity Package Manager 导入这两个示例。

![?width=711](https://i.gyazo.com/a33a679037089bab1bce41684818b158.png)

有关更多高级示例的集合，请查看 [示例项目](/zh/guide/samples) — 它包含许多专用示例，例如 Live2D 和 Spine 角色、自定义 actor 着色器、交互式地图、视频 actor、日历和库存自定义 UI 等。
