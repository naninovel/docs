# 快速上手

## 先决条件

Naninovel 是 [Unity 游戏引擎](https://unity.com) 的扩展，因此强烈建议在开始使用 Naninovel 之前至少 [学习使用 Unity 的基础知识](https://learn.unity.com)。

如果您不打算在 Naninovel 之外实现自定义游戏玩法，可以跳过与场景相关的说明；场景会由 Naninovel 自动处理。

## 视频指南

如果您更喜欢通过视频学习，可以观看下面的教程，内容与本快速上手指南相对应。

![](https://www.youtube.com/watch?v=N1_CwR5xblU)

## 创建 Unity 项目

创建项目时，建议选择基于**通用渲染管线**（URP）的 Universal 2D 或 Universal 3D 模板。旧版内置渲染管线（BiRP）也能使用，但 Unity 已不再积极维护，预计今后会弃用。不建议使用高清渲染管线（HDRP）：虽然通常能运行，但部分渲染功能可能无法直接兼容。

选择 2D 还是 3D 取决于您正在构建的游戏风格。对于大多数标准视觉小说，我们建议选择 2D，这样图像将默认作为精灵资产导入，您无需手动调整导入设置。您可以稍后在 [项目设置](https://docs.unity3d.com/Manual/2DAnd3DModeSettings.html) 中更改编辑器行为模式。

![](https://i.gyazo.com/b1b89ad23fbeffff3d03cf7dcf25cab1.png)

创建新项目后，Unity 会自动添加一个示例场景，其中包含“Main Camera”，以及模板自带的其他游戏对象；具体包含哪些对象取决于所选模板。

![?width=271](https://i.gyazo.com/5bd6471a53ffbf106099373395484ef6.png)

Naninovel 不依赖于场景；因此，我们建议从场景中删除这些对象，以防止不必要的性能开销或与 Naninovel 系统的冲突。您也可以删除示例场景本身，但建议在项目中至少保留一个场景，以便某些编辑器功能正常工作。

### 优化编辑器

::: info NOTE
此步骤为可选项，**并非使用 Naninovel 的必要条件**。其目的仅在于提高 Unity 编辑器的性能。如果您不确定项目需要哪些包或模块，请跳过此步骤。
:::

请打开并检查 Unity 项目根目录下“Packages”文件夹中的 `manifest.json` 文件，它列出了已安装的包和模块。您可能并不需要所有这些包和模块，但每一个都可能拖慢编辑器。以下是 Naninovel 所需的依赖项；请考虑删除不需要的其他项：

```
com.unity.modules.audio
com.unity.modules.video
com.unity.modules.imgui
com.unity.modules.animation
com.unity.modules.particlesystem
com.unity.modules.imageconversion
com.unity.render-pipelines.universal
com.unity.inputsystem
com.unity.ugui
```

### VCS 设置

如果您正在使用版本控制系统，例如 Git，请考虑忽略以下路径，以避免产生不必要的变更：

::: code-group
```asm [.gitignore]
# 自动生成的临时 Unity 资产。
/Assets/NaninovelData/Transient*
# 外部工具生成的临时文件。
/Assets/NaninovelData/.nani/Transient*
```
:::

请注意，`Assets/NaninovelData` 是一个自动生成的文件夹。最初创建后，您可以将其重命名或移动到“Assets”下的任何文件夹（Naninovel 仍然能够找到它）。如果您这样做，上述忽略路径必须相应更新。

::: tip EXAMPLE
Git 忽略配置可以参考 [示例项目](/zh/guide/samples) 中的 [.gitignore](https://github.com/naninovel/engine/blob/main/unity/samples/.gitignore)。该项目为了便于整理，将“NaninovelData”文件夹重命名为“Naninovel”，并移到 `Assets/Settings` 下。您也可以在自己的项目中按同样的方式移动这个文件夹。
:::

## 安装 Naninovel

### 发布流

Naninovel 通过 3 个发布流分发：**preview**（预览版）、**stable**（稳定版）和 **final**（最终版）。

preview 流紧跟最新开发进展，更新最频繁，包含所有最新功能。不过，它偶尔也会引入破坏性更改或错误。如果项目还处于开发初期，或需要其他版本尚未提供的特定功能，请选择此流。

stable 流是折衷方案：它只接收错误修复，没有最新功能，但也没有任何破坏性更改。在大多数情况下建议使用。

final 流经过的测试最充分，稳定性最高，但版本也最旧，且不在 [技术支持](/zh/support/) 范围内。仅在项目已发布且无法升级时，才应继续使用最终版本。

![](https://i.gyazo.com/2462242c14c96a0eae9ca99212c340c4.png)

stable 流同时发布在 GitHub 和 Unity 的 Asset Store 上（不过 Asset Store 上的发布不如 GitHub 频繁），而 preview 和 final 流仅在 GitHub 上提供。

### 从 Asset Store 安装

安装 Naninovel 最简单的方法是通过 Unity Package Manager（UPM）的“My Assets”选项卡。打开 Package Manager 窗口，找到 Naninovel，然后单击“Install”。

![?width=674](https://i.gyazo.com/3e056854efc95a4adfb485557497e134.png)

有关使用 UPM 的更多信息，请参阅 [Unity 文档](https://docs.unity3d.com/Manual/upm-ui-import)。

### 从 GitHub 安装

preview 和 stable 流中的最新 Naninovel 版本通过 Naninovel GitHub 存储库分发。要访问存储库，请 [注册您的 Naninovel 许可证](https://naninovel.com/register) 并按照仪表板上的说明指定您的 GitHub 用户。

获得存储库的访问权限后，请通过 Unity 的 Package Manager 将 `https://github.com/naninovel/upm.git#X.X` 添加为 Git 包，其中 `X.X` 是您想要安装的发布版本，例如：

```
https://github.com/naninovel/upm.git#1.22
```

您可以在 [发布页面](https://pre.naninovel.com/releases) 上找到所有可用的版本及其 Git URI。

![?width=300](https://i.gyazo.com/c7c453b8b34c94809303a9dc42e5330d.png)

如果您希望持续使用 preview 流的最新版本，或在 stable 流的补丁推送到 GitHub 存储库后立即获取，这种安装方式会很方便。在 Package Manager 窗口中单击“Update”，即可将已安装的包更新到最新提交。

![?width=368](https://i.gyazo.com/c1b86f88105a76e33cba961a9b71c8fb.png)

::: tip
如果在安装包时遇到错误，请确保您已使用账户仪表板中指定的 GitHub 用户通过身份验证。在 Windows 上进行身份验证的最简单方法是使用 [GitHub Desktop](https://github.com/apps/desktop) 登录。在 macOS 和 Linux 上，请改用 [GCM](https://github.com/git-ecosystem/git-credential-manager/releases/latest)。有关 [更多信息](https://docs.unity3d.com/Manual/upm-config-https-git.html)，请参阅 Unity 指南。
:::

### 从归档安装

您也可以从 [下载归档](https://account.naninovel.com/download) 获取安装包。如果需要某个已不再通过 Asset Store 分发的最终版本，可以使用这种方式。归档收录了各个旧版本的最终发布包，覆盖从 1.14 到当前稳定版本的范围。

只需将下载的 `.unitypackage` 文件拖放到 Unity 编辑器窗口中，然后单击“Import”即可安装该包。有关安装本地包的更多信息，请参阅 [Unity 文档](https://docs.unity3d.com/Manual/AssetPackagesImport.html)。

## 核心概念

在深入了解 Naninovel 之前，让我们快速了解一下它的一些核心概念。

其中一个基本概念是 *Actor*（演出元素），后面的指南会反复提到它。Actor 是一种实体，由标识符（ID）、外观、空间（场景）中的位置等参数来描述。

Actor 是一个抽象概念，实际存在的是以下几种具体类型，它们各自带有不同的附加参数：

| Actor 类型 | 附加参数 | 描述 |
|--------------------------------------|----------------------------------|------------------------------------------------------------------------------|
| [角色](/zh/guide/characters) | 朝向 | 代表场景中的角色。 |
| [背景](/zh/guide/backgrounds) | 无 | 代表场景中的背景；默认放置在角色 Actor 后面。 |
| [文本打印机](/zh/guide/text-printers) | 文本、作者 ID、显示进度 | 随着时间的推移逐渐显示（打印）文本消息。 |
| [选项处理程序](/zh/guide/choices) | 选项 | 允许玩家选择可用的选项之一。 |

设想一个典型的视觉小说画面：背景前方显示着一个角色。用 Naninovel 的术语来描述，就是下面这样：

![](https://i.gyazo.com/ede8072c68393e915286d18811a8dd4f.png)

假设您想改变角色“Kohaku”的情绪或姿势，并且已经准备了多张角色纹理（图像），分别描绘不同的状态。在 Naninovel 中，这些纹理称为 Actor 的*外观*（appearance）。要切换角色的显示状态，就需要更改该角色 Actor 的外观。同样，要让“MainBackground”显示其他内容，也需要更改该背景 Actor 的外观。

Actor 及其参数通过 [剧本脚本](/zh/guide/scenario-scripting) 中指定的命令来控制。

另一个广泛使用的概念是 [用户界面](/zh/guide/gui)（UI）。玩家使用 UI 与 Actor 和游戏的其余部分进行交互。这包括各种菜单（标题、存档/读档、设置等）和控制面板（切换自动播放模式、跳过文本等）。默认情况下，UI 元素显示在 Actor 之上。

文本打印机和选项处理程序既是 Actor，也是 UI 元素。它们具备 Actor 的特性，可以通过剧本脚本控制，同时也是玩家与游戏交互的界面。

![](https://i.gyazo.com/0c8bd29820c6f2165af6adc5736713bd.png)

如果您熟悉编程，可以阅读 [引擎架构](/zh/guide/engine-architecture)，从软件工程的角度了解 Naninovel 的设计。

## 第一步

初次安装 Naninovel 时，会在 `Assets/Scenario` 文件夹中自动生成几个示例脚本，并自动打开 [故事编辑器](/zh/guide/editor) 选项卡。单击故事编辑器顶部的“Play”按钮进入播放模式。

![?width=400](https://i.gyazo.com/664efe9237b14ee091fded317a2cab4a.png)

Unity 编辑器将进入播放模式并显示默认标题 UI。同时，`Title` 剧本脚本将在故事编辑器中打开，表明它当前正在播放。

![](https://i.gyazo.com/84c64bf7fb4217dd149260fd0008b7f4.png)

不妨试用故事编辑器的各项功能，并尝试编辑脚本，更改会实时应用。示例脚本中的注释简要说明了旁边的命令，可以一并阅读。在标题 UI 中单击“NEW GAME”，即可进入包含更多示例的 `Entry` 脚本。

## 添加剧本脚本

熟悉基本流程后，接下来就开始为游戏添加实际内容。在 Naninovel 中，驱动故事的核心资产称为*剧本脚本*（scenario script）。

目前已有两个自动生成的脚本，下面来学习如何添加新脚本。[故事编辑器](/zh/guide/editor) 也能管理脚本，不过入门阶段我们先按 Unity 的标准流程操作；故事编辑器的具体操作方式可以参阅它的专用指南。

首先，单击“Stop”按钮退出播放模式。一般来说，添加或删除资产、调整项目设置等所有项目级修改，都应在退出 Unity 播放模式后进行。

打开与示例脚本一起自动生成的 `Assets/Scenario` 文件夹。这就是*剧本根目录*（scenario root），所有 Naninovel 剧本脚本都存放在这里。在该文件夹内右键单击，选择 `Create -> Naninovel -> Scenario Script`，创建新的剧本脚本 `Test.nani`。

![](https://i.gyazo.com/52ac23ba6b66c176bcbe67ef852310fb.png)

::: info NOTE
剧本脚本（以及其他资产）可以放在项目中的任意文件夹，整理方式和命名也由您决定。不过，所有剧本脚本必须归于 Unity 项目内同一个根目录。只要满足这一点，就可以在该目录下按需创建任意数量、任意层级的子文件夹来整理脚本。

::: warning
Unity 以特殊方式处理名为“Resources”的文件夹：存储在此类文件夹下的资产被强制包含在构建中，这可能会导致 [性能问题](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime)。最重要的是，除非指南特别要求，否则切勿将任何内容存储在 `Resources/Naninovel` 文件夹下，因为这可能会导致各种冲突和未定义的行为。
:::

剧本脚本是扩展名为 `.nani` 的文本文件。您可以在其中使用 Naninovel 的编剧语言 [NaniScript](/zh/guide/scenario-scripting) 来控制场景中发生的事情。脚本文件可以用任意文本或代码编辑器打开和编辑，例如 Microsoft Word 或 [VS Code](/zh/guide/ide-extension)。

![?class=when-dark](https://i.gyazo.com/9ffce86c54b5bfc5497dd50fa59a637e.png)
![?class=when-light](https://i.gyazo.com/6f5a92d83eb2071ac06cbb72c2d0579e.png)

[故事编辑器](/zh/guide/editor) 写入剧本文件的同样是 NaniScript，因此可以与代码编辑器交替使用。下文会以代码编辑器为例展示脚本片段，但在故事编辑器中也能完成相同的步骤：在行类型下拉列表中从 `@` 开始输入，即可看到匹配的命令。

![?width=399](https://i.gyazo.com/0f5ee5d28de74570bdf25197e1f5444e.png)

请打开创建的 `Test.nani` 脚本并添加以下行：

```nani
Hello World!
```

— 执行时，此行将打印“Hello World!”。

接下来，打开 `Entry.nani` 脚本并将最后的 `@title` 命令替换为：

```nani
@goto Test
```

— 此命令会转到新建的 `Test.nani` 脚本继续播放，而不是返回标题菜单。

进入播放模式，开始新游戏，并一直玩到打印出“Hello World!”。尝试在游戏进行时编辑脚本——更改将立即应用。

::: tip
[API 参考](/zh/api/) 中列出了标准的 NaniScript 命令及其使用示例。也可以添加自定义命令；有关更多信息，请参阅 [指南](/zh/guide/custom-commands)。
:::

## 添加角色

打开刚才添加剧本脚本时使用的菜单，这次选择 `Create -> Naninovel -> Actor Record -> Character`，创建一个保存新角色 Actor 配置的*角色记录*（character record）资产。将这个记录资产命名为 `K`。使用 `K` 这样的简短标识符，是因为剧本脚本中会反复用到它，可以省去每次输入全名的麻烦。实际向玩家显示的名称“Kohaku”，则可以在记录资产的 `Display Name` 中设置。

![?width=574](https://i.gyazo.com/f9da79b98e2cd3acf9151945330f961e.png)

角色的标识符和显示名称都可以自行选择。需要注意的是，ID 不能包含空白字符或特殊字符，而显示名称可以包含空白字符和任意特殊字符。

::: tip
您会在我们的配置菜单中找到许多选项。与其他 Unity 菜单一样，大多数控件都有相关的工具提示来解释它们的作用。要查看工具提示，请将鼠标悬停在控件上并稍等片刻——说明将出现在光标下方。
:::

现在，让我们为 Actor 选择实现。Naninovel 中的角色可以基于常规或切片精灵、Live2D 或 Spine 动画模型、3D 网格以及许多其他类型的资产；您也可以添加自己的实现。在本教程中，我们将使用基于 2D 纹理资产（图像）的精灵实现。

![?width=575](https://i.gyazo.com/8ffc45f0266741dcb31782c9f236985c.png)

最后，为角色分配外观。将纹理拖放到角色记录所在的文件夹中，选中这些纹理，再单击检查器标题栏下方的 Naninovel 图标，选择 `Characters -> K`。

![?width=623](https://i.gyazo.com/25cf89584f50f72b5e0f34d71742ed23.png)

修改剧本脚本以使用 [@char] 命令显示添加的角色：

```nani
@char K
Hello World!
```

角色会显示在屏幕中央。未指定外观时，会自动选择名为“Default”的外观。要指定其他外观，请在角色 ID 后加上一个点，再接上外观名称，如下所示：

```nani
@char K.Happy
Hello World!
```

只要已为角色“K”添加了名为“Happy”的外观，现在就会显示相应的精灵，而不是默认精灵。

现在，在文本前加上角色 ID 和冒号，即可将显示的文本与该角色关联：

```nani
@char K.Happy
K: Hello World!
```

![?width=588](https://i.gyazo.com/48ad8d4c512b67df02d7ace15d5eaca5.png)

还可以把角色的外观设置与要显示的文本合写在一行，减少输入：

```nani
K.Happy: Hello World!
```

要隐藏角色，请使用 [@hide] 命令，后跟 Actor ID：

```nani
@hide K
```

## 添加背景

与角色类似，背景在 Naninovel 中可以用多种方式表示：精灵、视频、场景等；也可以自定义实现。

背景 Actor 可以有多个，彼此独立。不过，典型的视觉小说通常只使用一个背景 Actor，通过切换外观来更换背景。为了简化这种常见操作，[@back] 命令默认控制 ID 为 `MainBackground` 的背景 Actor：

```nani
@back Road
```

— 该命令将使 `MainBackground` Actor 过渡到 `Road` 外观。

创建背景 Actor 记录和分配外观精灵的方式与角色类似：

- 创建一个文件夹来存储背景，例如 `Assets/Backgrounds`
- 右键单击该文件夹并选择 `Create -> Naninovel -> Actor Record -> Background` 以创建 `MainBackground` 记录
- 在检查器中查看该记录并选择实现，例如 `SpriteBackground`
- 分配外观资源

![](https://i.gyazo.com/1017667cd15b374839127fa5e1e5c2e5.png)

在背景外观之间切换时，默认使用交叉淡入淡出 [过渡效果](/zh/guide/special-effects#过渡效果)。要更改效果，请在外观名称后指定过渡类型：

```nani
@back Road
@back Ruins.RadialBlur
```

这将使用“RadialBlur”过渡效果从“Road”过渡到“Ruins”。

要引用除主背景以外的背景（例如，如果您希望将多个背景叠加在一起），请指定该 Actor 的 ID。例如，假设除主背景外还存在一个 ID 为 `Flower` 的背景 Actor，则以下命令会将其外观更改为“Bloomed”，然后更改为“Withered”：

```nani
@back Bloomed id:Flower
@back Withered id:Flower
```

使用相同的 [@hide] 命令隐藏背景：

```nani
@hide Flower
```

## 添加音频

要向 Naninovel 注册 BGM（背景音乐）或 SFX（音效）音频资源，先选中音频剪辑资产，再打开之前注册角色和背景资源时使用的检查器菜单，这次选择“BGM”或“SFX”。

![?width=655](https://i.gyazo.com/e56b1d3f3a800751116ae4dcbb8896c0.png)

要将注册的音频资源作为背景音乐播放，请使用 [@bgm] 命令：

```nani
@bgm CloudNine
```

切换音乐音轨时会自动应用交叉淡入淡出效果。音乐默认循环播放，是否循环、音量大小以及淡入淡出的持续时间，都可以通过命令参数调整。

相比之下，音效默认不会循环播放。使用 [@sfx] 命令播放它们：

```nani
@sfx Explosion
```

要停止正在播放的 BGM 或 SFX，请分别使用 [@stopBgm] 和 [@stopSfx] 命令：

```nani
@stopBgm CloudNine
@stopSfx Explosion
```

## 管理资源

您可以在项目设置窗口的 Naninovel 选项卡下查看所有已注册的资源，以及 Actor 和其他引擎选项；使用 `Naninovel -> Configuration` 编辑器菜单可快速访问配置。

![?width=641](https://i.gyazo.com/4b9b748170ad1cd0073a73a5b0bf2f05.png)

您可以自由更改资源路径（默认情况下它们与资产名称相同），这有助于组织资源。注册的路径是您在剧本脚本中引用资源时实际使用的路径。例如，将音效 `Explosion` 的路径更改为 `Battle/Explosion` 后，请使用新路径来播放它：

```nani
@sfx Battle/Explosion
```

添加或修改资源后，故事编辑器和 VS Code 扩展都会自动同步这些更改，并更新相关列表。

![](https://i.gyazo.com/c353c7cfa398315d926f365634786467.png)

::: tip
考虑安装 Unity 的 [Addressables 包](https://docs.unity3d.com/Packages/com.unity.addressables@latest)，以完全掌控资产在最终构建中的组织和打包方式——Naninovel 将自动与该包集成。
:::

## 对话模式

尽管 Naninovel 主要设计为构建视觉小说的基础，但它也可以用作任何类型游戏的嵌入式对话或过场动画系统。

您可以手动配置引擎，使其适合这种嵌入式用途，也可以使用专门的“Minimal Mode”（最小模式）开关。该开关会自动修改配置，移除大多数内置 UI，并禁用部分功能，将引擎精简到最低限度。

通过 `Naninovel -> Set Up Minimal Mode` Unity 编辑器菜单启用最小模式。

![?width=234](https://i.gyazo.com/6d92cd0d7e0c63c1010123a0f61e78e0.png)

::: warning
最小模式设置过程将修改引擎的默认配置和资源，并且**更改无法自动撤消**。仅当您开始一个新项目，并打算将 Naninovel 用作嵌入式对话系统而不是视觉小说引擎时，才启用该模式。
:::

指南的“高级”部分详细介绍了如何通过 C# 将引擎集成到现有代码库中。这里先演示一种无需编写代码的简单对话交互：玩家将鼠标移到可交互对象上，单击后开始对话。请在空场景中添加以下对象：

- 一个带有 `Event / Event System` 组件的对象
    - 将 `Naninovel/Resources/Naninovel/Input/DefaultControls` 分配为 `Actions Asset`
- 一个带有 `Event / Physics Raycaster` 组件的摄像机对象
- 一个将充当对话触发器的立方体
    - 删除附加到立方体的默认碰撞体组件

右键单击立方体，选择 `Naninovel -> Dialogue`，即可为它自动设置对话触发器。随后在检查器中查看新建的子对象 `Dialogue`，并为其分配要播放的剧本脚本资产。

接下来，在 `Dialogue/Trigger` 对象上设置触发条件：

- 将 `Collide With` 和 `Raycast From` 设置为“None”
- 将 `Perform Input` 设置为 Naninovel 输入操作资产中的 `UI/Click` 操作
- 启用 `Hover With Pointer`

![?width=689](https://i.gyazo.com/97b63b1cb1692966fef8dc0b98b0fced.png)

进入播放模式并将鼠标悬停在立方体上——当鼠标光标位于其上方时，提示将做出反应。左键单击以开始对话。要退出对话，请使用 [@exitDialogue] 命令。

`Trigger Events` 组件提供了许多选项，只需调整这些选项，就能设置大多数常见的交互方式。例如，在第一人称视角下从一定距离注视对象、在横向卷轴视角下发生碰撞，或在第三人称视角下将指针悬停在对象上后按键。各选项的具体作用可以查看对应的工具提示。

## 演示示例

Naninovel 包包含两个基本示例：

- **Visual Novel** — 一个具有多条路线的基本视觉小说模板，演示了占位符 Actor、各种命令、普通变量和元变量、可自定义角色名称以及其他传统 VN 机制的使用。
- **Dialogue System** — 一个 3D 横向卷轴场景，其中 Naninovel 用作嵌入式对话系统，展示了临时打印机、气泡选项处理程序、与 Cinemachine 的集成以及其他常见用法。

这两个示例都可以通过 Unity Package Manager 导入：选择 Naninovel 包，打开“Samples”选项卡，再单击相应示例的“Import”按钮。

![?width=711](https://i.gyazo.com/a33a679037089bab1bce41684818b158.png)

更多高级用法可以参考 [示例项目](/zh/guide/samples)。其中包含许多针对特定用途的示例，例如 Live2D 和 Spine 角色、自定义 Actor 着色器、交互式地图、视频 Actor、日历和库存自定义 UI 等。
