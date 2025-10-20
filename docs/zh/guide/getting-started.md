# 快速上手

## 前置要求

Naninovel 是 [Unity 游戏引擎](https://unity.com) 的一个扩展插件。  
因此，强烈建议在使用 Naninovel 之前，先 [学习 Unity 的基础知识](https://learn.unity.com)。

如果你不打算在 Naninovel 之外开发自定义的游戏玩法，那么可以完全忽略与场景（Scene）相关的信息，因为 Naninovel 会自动处理这些部分。

## 创建新的 Unity 项目

在创建项目时，建议选择 **Built-in Render Pipeline（内置渲染管线，BiRP）** 模板。 

虽然 Universal（URP）和 High Definition（HDRP）渲染管线通常也能正常工作，但相比内置渲染器，它们有一定的限制、需要额外设置，并且 Naninovel 对它们的支持有限。 

更多信息请参阅 [渲染管线指南](/zh/guide/render-pipelines)。

选择 2D 或 3D 模式取决于你所制作的游戏类型。对于大多数标准视觉小说，我们推荐选择 **2D 模式**，这样图像会默认导入为精灵（Sprite）资源，你无需手动修改导入设置。  

你也可以稍后在 [项目设置](https://docs.unity3d.com/Manual/2DAnd3DModeSettings.html) 中更改编辑器模式。

![](https://i.gyazo.com/7abffe64675880f6d1c7afe6424b91be.png)

创建新项目后，Unity 会自动包含一个示例场景，其中通常包含 “Main Camera” 和（在部分模板中）“Directional Light” 游戏对象。

![](https://i.gyazo.com/0691599c7586100d2467499a252b6194.png)

Naninovel 是与场景无关的系统，因此建议删除这些对象，以避免不必要的性能开销或与 Naninovel 系统的冲突。你也可以删除整个示例场景，但建议项目中至少保留一个场景，以保证部分编辑器功能的正常工作。

### 优化编辑器性能

此步骤为可选项，但强烈建议执行，以显著提升编辑器启动、重载及进入播放模式的速度。

首先，前往 `Edit -> Project Settings -> Editor` 菜单，在 “Enter Play Mode Settings” 选项下选择 `Do not reload Domain or Scene`，以减少进入播放模式所需的时间。

![](https://i.gyazo.com/8432d5dfb28a0f63d0f2fedfa00be91c.png)

接着，打开并检查项目根目录下 “Packages” 文件夹中的 `manifest.json` 文件。  
该文件列出了所有已安装的包与模块。
Unity 在不同模板中会默认包含许多模块，但其中大部分你可能永远不会用到，  
而每一个模块都会增加编辑器启动与代码重载的时间。  

以下是 Naninovel 所需的必要模块；  若其他模块并非必需，建议将其从文件中移除：

::: code-group
```json [Packages/manifest.json]
{
    "dependencies": {
        "com.unity.modules.audio": "1.0.0",
        "com.unity.modules.video": "1.0.0",
        "com.unity.modules.imgui": "1.0.0",
        "com.unity.modules.uielements": "1.0.0",
        "com.unity.modules.particlesystem": "1.0.0",
        "com.unity.modules.imageconversion": "1.0.0",
        "com.unity.ugui": "2.0.0"
    }
}
```
:::

### 设置版本管理软件

如果你正在使用版本控制系统（例如 Git），建议忽略以下路径，以避免不必要的文件变动:

::: code-group
```asm [.gitignore]
# Auto-generated Unity assets of transient nature.
/Assets/NaninovelData/Transient*
# Transient artifacts of the external tools.
/Assets/NaninovelData/.nani/Transient*
```
:::

— 请注意，`Assets/NaninovelData` 文件夹是自动生成的。在首次生成后，你可以将其重命名或移动到 `Assets` 目录下的任意位置，Naninovel 仍然能够正确定位到它。但如果你进行了移动或重命名，请相应更新上述忽略路径。

::: tip 示例
请参阅我们的 [示例项目](/zh/guide/samples) 中的 [.gitignore](https://github.com/naninovel/engine/blob/main/unity/samples/.gitignore) 文件，以了解一个示例的 Git 忽略配置。
请注意，在该项目中，`NaninovelData` 文件夹已被重命名为 `Naninovel`，并出于组织结构的考虑移动到了 `Assets/Profiles` 目录下。你也可以在自己的项目中以类似方式移动该文件夹。
:::

## 安装 Naninovel

### 版本发布通道

Naninovel 提供三种版本发布通道：**preview（预览版）**、**stable（稳定版）** 和 **final（最终版）**。

**Preview（预览版）** 是最新开发进度的版本，更新最频繁，包含所有最新功能。但它可能会出现不兼容性更改或偶发性 bug。当你处于项目早期开发阶段，或需要其他版本中尚未提供的特定功能时，推荐使用此版本。

**Stable（稳定版）** 是折中选择，仅包含 bug 修复，不会加入新功能，但也不会引入任何破坏性更改。在大多数情况下，推荐使用稳定版。

**Final（最终版）** 是经过最多测试、最稳定的版本，但同时也最为过时，并且不再享受 [技术支持](/zh/support/#naninovel-support)。仅当你的项目已发布且无法升级时，才建议继续使用最终版。

![](https://i.gyazo.com/2462242c14c96a0eae9ca99212c340c4.png)

Stable 通道的版本会同时发布在 GitHub 与 Unity Asset Store（不过 GitHub 上更新更频繁），而 Preview 与 Final 版本仅在 GitHub 上提供。

### 从 GitHub 安装

所有版本通道均通过托管在私有 GitHub 仓库中的 UPM 注册表进行分发。要访问该仓库，请先 [注册你的 Naninovel 许可证](https://naninovel.com/register)，并按照控制面板上的指示操作。

获得访问权限后，在 Unity 编辑器中打开 `Window -> Package Manager`，然后添加 Git 包地址： `https://github.com/naninovel/upm.git#X.X` 其中 `X.X` 为你想要安装的 Naninovel 版本号，例如 `1.21`。所有可用的版本和对应号可在 [版本发布页面](https://pre.naninovel.com/releases) 中查看。

![](https://i.gyazo.com/91d056eb5b6278e5c9a28f59c8ff8732.png)

如果在安装包时出现错误，请确保你已在本地以分配许可证的 GitHub 用户身份完成身份验证。最简单的验证方式是通过 [GitHub Desktop](https://github.com/apps/desktop) 或 [GitHub CLI 工具](https://cli.github.com) 登录。你也可以参考 Unity 官方指南了解 [更多身份验证信息](https://docs.unity3d.com/Manual/upm-config-https-git.html)。

### 通过安装包安装

你也可以使用 `.unitypackage` 文件来安装 Naninovel。当前稳定版本及所有历史版本都可在我们的 [下载存档](https://account.naninovel.com/download) 中获取。

::: info 注意
Asset Store 的安装包与下载存档的更新通常比 UPM 仓库 **滞后 2–3 个月**，并且不包含预览版（Preview Releases）。因此，我们推荐直接从 GitHub 安装 Naninovel，以获取最新更新。
:::

## 核心概念

在开始配置和使用 Naninovel 之前，我们先快速了解一些核心概念。

一个你将在整个指南中频繁遇到的核心抽象概念是 **“Actor（演员）”**。**Actor** 是一个由标识符（ID）、外观、空间位置以及其他参数描述的实体。

需要注意的是，**Actor 是一个抽象概念，无法直接存在**；相反，在实际使用中会有多个具备不同附加参数的特化版本，例如：

| 演员类型                              | 附加参数                   | 描述                                                       |
|---------------------------------------|----------------------------|------------------------------------------------------------|
| [角色](/zh/guide/characters)             | 朝向                       | 表示场景中的一个角色。                                     |
| [背景](/zh/guide/backgrounds)            | 无                         | 表示场景中的背景；默认位于角色演员的后方。                 |
| [文本输出框](/zh/guide/text-printers)    | 文本、作者ID、文字显示进度 | 用于逐步显示（打印）文本消息。                             |
| [对话选项](/zh/guide/choices)            | 选项                       | 允许玩家从可用的选项中进行选择。                           |

想象一个典型的视觉小说场景：角色立绘显示在背景之上。在 Naninovel 的术语中，它的结构可以用如下方式表示。

![](/assets/img/docs/actor-concept.mp4)

假设我们想让角色 “Kohaku” 露出开心的表情。你可能拥有该角色的多张贴图（图像），每张表现不同的情绪。在 Naninovel 中，这些贴图被称为 **Actor 的 “外观”**。因此，要让 “Kohaku” 看起来开心，我们只需更改角色 Actor 的外观。同样地，如果要让 “MainBackground” 显示其他画面，也需要更改对应背景 Actor 的外观。

所有 Actor 及其参数都通过 [Naninovel 脚本](/zh/guide/naninovel-scripts) 中的命令来控制（或称“指挥”）。

另一个常用的概念是 [用户界面](/zh/guide/user-interface)。UI 让玩家能够与 Actor 以及游戏的其他部分交互。这包括各种菜单（标题界面、存档/读档、设置等）和控制面板（自动阅读、跳过文本等）。UI 元素默认位于 Actor 图层之上。

**文本输出窗** 和 **选项处理器** 既被视为 Actor，也被视为 UI 元素。这意味着它们既拥有 Actor 的特性、可通过 Naninovel 脚本控制，同时也能被玩家直接操作以与游戏交互。

如果你熟悉编程，建议阅读 [引擎架构（Engine Architecture）](/zh/guide/engine-architecture) 一节，以了解 Naninovel 从软件工程角度的设计思路。

## 添加 Naninovel 脚本

在 `Assets` 资源目录中使用 `Create -> Folder` 菜单创建一个名为 “Scenario” 的文件夹，用于存放所有 Naninovel 的剧情脚本资源。然后，在该文件夹下点击 `Create -> Naninovel -> Naninovel Script` 来创建你的第一个剧情脚本。

![](https://i.gyazo.com/30f96fd3c8bb275478361c51f1a00e86.png)

::: info 注意
你可以将 Naninovel 脚本（以及其他资源）存放在项目中的任意文件夹，并按照自己的喜好进行组织，命名方式也完全由你决定。不过请注意，**所有剧情脚本必须存放在同一个根目录下**。你可以根据需要创建任意多层子文件夹，只要这些子文件夹最终都属于同一个根目录即可。
:::

::: warning
Unity 对名为 `Resources` 的文件夹有特殊处理：其中的资源会被强制包含到构建中，这可能会导致[性能问题](https://docs.unity3d.com/Manual/UnderstandingPerformanceResourcesFolder.html)。最重要的是，**不要将任何内容存放在 `Resources/Naninovel` 文件夹下**，除非指南中特别要求，否则可能会引发各种冲突和未定义行为。
:::

Naninovel 脚本是扩展名为 `.nani` 的文本文件，用于控制场景中发生的事件。  
你可以使用任意文本编辑器（如 Microsoft Word、Google Docs 或 [VS Code](https://code.visualstudio.com)）打开和编辑它们。

![?class=when-dark](https://i.gyazo.com/0051c3b96de4854d665e6bf9aba6bbd1.png)  
![?class=when-light](https://i.gyazo.com/4172fee457fb4c1f473ffeb0516b83ca.png)

你也可以使用可视化脚本编辑器来编辑 Naninovel 脚本。选中刚创建的脚本资源后，可视化编辑器会在 Inspector 面板中自动打开。

![](https://i.gyazo.com/ba57b9f78116e57408125325bdf66be9.mp4)

要在脚本中添加新行，可在目标位置右键点击，或按下 `Ctrl+Space`（可在输入配置中更改快捷键），然后选择要插入的行或命令类型。  
拖动行号可调整顺序，右键点击行并选择 “Remove” 可删除该行。

当你使用可视化编辑器修改脚本后，脚本路径上方会显示一个星号（`*`），表示该资源已修改但尚未保存。按 `Ctrl+S` 保存更改。  
若在未保存时切换到其他资源，会弹出提示窗口，允许你选择保存或放弃更改。

可视化编辑器在检测到脚本被外部更新时会自动同步，使你可以在文本编辑器和可视化编辑器之间无缝切换。

::: tip
我们正在开发一个比内置可视化编辑器更强大的独立编辑器应用程序，它可以在不依赖 Unity 的情况下直接在浏览器中使用。  
详细信息请参阅 [编辑器指南](/zh/guide/editor)。

![](https://i.gyazo.com/d54f0b35b4d89bdbece096c7b78c8c72.mp4)
:::

在本指南的后续部分中，我们将使用文本编辑器进行演示，但你也可以选择使用可视化或独立编辑器完成相同操作。

为了让 Naninovel 相关资源（如刚创建的脚本）对引擎“可见”，必须将其注册为项目资源。  
通过资源菜单创建的脚本会自动注册。若需手动添加、编辑或移除脚本资源，可通过编辑器菜单 `Naninovel -> Resources -> Scripts` 打开脚本资源窗口。  
点击列表中的 `+`（加号）按钮即可新增条目，并将脚本文件拖放进列表中。你还可以批量拖入多个文件或整个文件夹进行导入。

![Add Naninovel Script](https://i.gyazo.com/b3281a145ba54e6cb6cbdaa478ea894d.png)

使用文本编辑器打开刚创建的脚本，添加以下内容：

```nani
你好，世界！
```

当游戏运行时，这行代码会在屏幕上显示 “你好，世界！”。进入播放模式并开始新游戏即可查看效果。

::: info 注意
所有可用的内置脚本命令、支持的参数以及使用示例均可在 [API 参考](/zh/api/) 中查阅。  
你也可以添加自定义命令，详情请参考 [自定义命令指南](/zh/guide/custom-commands)。
:::

如果标题菜单中的 “NEW GAME” 按钮处于不可用状态，请确认脚本配置（`Naninovel -> Configuration -> Scripts`）中的 `Start Game Script` 属性是否与所创建脚本的名称一致。

![](https://i.gyazo.com/47e34c913994a5b3e88d8f30d5127b7b.png)

## 添加角色

在 Naninovel 中，角色可以基于普通或分割（diced）精灵、动画的 Live2D 或 Spine 模型，以及 3D 网格（mesh）实现；你也可以添加自己的自定义实现。在本教程中，我们将使用 **精灵（Sprite）** 作为示例实现。

每个角色由一个 **ID** 和一组 **外观** 组成。要添加角色，请通过菜单 `Naninovel -> Resources -> Characters` 打开角色管理器界面。在界面中新增一个角色记录，并为其指定一个 ID。然后双击该记录（或点击记录末尾的按钮），在 `Resources` 列表中添加所有角色外观精灵。与 Naninovel 脚本类似，你可以一次性将多个资源或文件夹拖放到列表中进行批量导入。

![增加角色](https://i.gyazo.com/0c1e81ea1a20165c1bf88854df177b7f.png)

假设我们添加的角色 ID 是 “Kohaku”。编辑 Naninovel 脚本以显示该角色：

```nani
@char Kohaku
你好，世界！
```

运行游戏后，你会在屏幕中央看到该角色的某个外观精灵。当未指定外观时，系统会默认选择与角色 ID 相同名称的外观，或名为 “Default” 的外观。若要指定特定外观，请在角色 ID 后以英文句点（`.`）分隔并写上外观名称，例如：

```nani
@char Kohaku.Happy
你好，世界！
```

假设角色 “Kohaku” 已添加了一个名为 “Happy” 的外观，现在将显示该外观对应的精灵，而非默认外观。

你还可以通过在文本前添加角色 ID 和一个冒号，将显示的文本与该角色关联，例如：

```nani
@char Kohaku.Happy
Kohaku: 你好，世界！
```

你也可以将角色外观与文本合并在同一行中，以减少输入量，例如：

```nani
Kohaku.Happy: 你好，世界！
```

要隐藏一个角色（或其他 Actor，如背景、文本打印机等），请使用 [@hide] 命令并在后面加上该 Actor 的 ID，例如：

```nani
Kohaku.Happy: 你好，世界！
@hide Kohaku
```

## 添加背景

与角色类似，Naninovel 中的背景也可以用多种方式表示：精灵（Sprite）、通用对象（Generic Object）、视频（Video）或场景（Scene）；当然，你也可以实现自定义的背景类型。

虽然你可以创建多个独立的背景 Actor，但在典型的视觉小说（VN）游戏中，通常只需使用一个背景 Actor，并在不同外观之间切换。为简化这一流程，系统默认会在背景 Actor 列表中添加一个名为 `MainBackground` 的 Actor，你在 Naninovel 脚本中切换背景外观时无需每次都指定 ID。

通过菜单 `Naninovel -> Resources -> Backgrounds` 添加背景精灵。`MainBackground` 记录会自动打开，但你仍然可以返回 Actor 列表添加其他背景（如果需要）。

![Add Background](https://i.gyazo.com/98e88780625c7f2e1ef88db7ef10d1f4.png)

假设添加的背景外观名为 “City”。要显示该背景，请使用 [@back] 命令并在后面加上背景外观名称，例如：

```nani
@back City
```

在切换背景时，系统默认会使用交叉淡入淡出（cross-fade）[过渡效果](/zh/guide/transition-effects)。若要更改效果，请在外观名称后指定过渡类型，例如：

```nani
@back City
@back School.RadialBlur
```

这将使用 “RadialBlur” 过渡效果将背景从 “City” 切换为 “School”。

要引用主背景以外的其他背景（例如你希望将多个背景叠加组合），请指定该背景 Actor 的 ID。例如，假设存在一个名为 `Flower` 的背景 Actor，以下命令将依次把它的外观切换为 “Bloomed” 和 “Withered”：

```nani
@back Bloomed id:Flower
@back Withered id:Flower
```

## 添加音乐与音效

要添加 BGM（背景音乐）或 SFX（音效）资源，请使用编辑器菜单 `Naninovel -> Resources -> Audio`。你可以使用任何 [Unity 支持的音频格式](https://docs.unity3d.com/Manual/AudioFiles.html)。

![管理音频](https://i.gyazo.com/cacdec36623dbbfcf9f49c594de53c0f.png)

假设添加的 BGM 文件名为 “ThePromenade”。要播放该曲作为背景音乐，请使用 [@bgm] 命令并在后面加上曲目名称，例如：

```nani
@bgm ThePromenade
```

在切换音乐曲目时，系统会自动应用交叉淡入淡出效果。音乐默认会循环播放，但你可以通过命令参数修改此行为，以及调整音量和淡入淡出时长。

相反，音效默认不会循环播放。假设你已添加名为 “爆炸” 的音效（SFX），可使用 [@sfx] 命令来播放它，例如：

```nani
@sfx 爆炸
```

::: tip
在使用 Naninovel 的过程中，会自动在 `Assets/NaninovelData` 文件夹下生成许多资源（如设置、资源引用、缓存等）。你可以自由移动或重命名该文件夹，但请务必 **不要** 将其放在 `Resources` 文件夹下，否则会导致冲突。
:::

## 视频教程

如果你更喜欢通过视频学习，这里有一个演示上述步骤的视频：

![](https://www.bilibili.com/video/BV1CTsPzhEiB/)

## 示例项目

如果你更倾向于通过完整项目进行学习，请查看 [示例项目](/zh/guide/samples)，其中包含网站演示中展示的完整源代码。