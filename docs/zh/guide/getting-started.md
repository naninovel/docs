# 开始指南

## 使用前提

Naninovel是 [Unity游戏引擎](https://unity.com/) 扩展资源，所以确保你在对Unity有基本了解以后再开始使用本扩展。

使用这套资源以前应该有对Unity的基础了解：
- [安装Unity；](https://docs.unity3d.com/Manual/GettingStartedInstallingHub)
- [创建项目；](https://docs.unity3d.com/Manual/GettingStarted)
- [编辑器界面交互；](https://docs.unity3d.com/Manual/LearningtheInterface)
- [使用Assets Store资源商店；](https://docs.unity3d.com/Manual/AssetStore)
- [发布项目到对应平台；](https://docs.unity3d.com/Manual/PublishingBuilds)

加入你要创建任何和本扩展无关的场景，可以忽略场景相关的提示信息，因为它们都会用本扩展来协调处理。

## 核心概念

开始使用之前，我们快速浏览一些核心概念。

首先很关键的一个概念，在本教程中你会频繁遇到的-- *演出元素（Actor）*，他是由多种参数ID，外观，场景中位置，等其他参数构成。

演出元素（Actor）是抽象概念，部分演出元素（Actor）有其特殊的参数比如：

演出元素（Actor） | 额外参数 | 描述
--- | --- | ---
[人物](/zh/guide/characters.md) | Look Direction | 场景中人物立绘
[背景](/zh/guide/backgrounds.md) | None | 场景中背景，默认置于人物例会之后显示
[打字机](/zh/guide/text-printers.md) | 随时间显示文字
[选择处理器](/zh/guide/choices.md) | Choices | 让玩家选择选项

典型VN游戏，由人物和其背景组成。在Naninovel规范里，由以下方式呈现。

![](https://i.gyazo.com/1d4d5130056f7d6acee978c5fde42cfc.gif)

现在，我们想让"Kohaku" 呈现高兴的样子。我们有不同表情的立绘。在 Naninovel这种图像的元素，称为演出元素（Actor）的*外观appearances*。 要达到这个目的，我们就得改变人物演出元素的外观，背景演出元素同理。

演出元素（Actor）直接由 [naninovel 脚本](/zh/guide/naninovel-scripts.md) 来控制。

另一个广泛使用的概念是演出元素，[UI界面](/zh/guide/user-interface.md) (UI)。包含玩家和演出元素的交互，有各种各样的菜单（标题画面，保存读取窗口，设置窗口等），以及控制面板（自动阅读切换，跳过文本等）。UI元素默认置于所有演出元素之上。

打字机和选择处理两个元素可视为UI元素，可以由Naninovel 脚本控制，用于玩家和游戏的交互。

如果你熟悉编程，可以参阅：[引擎结构](/zh/guide/engine-architecture.md) 了解本资源的程序设计理念。

## 创建新Unity项目：

了解到核心概念之后，开始第一步，创建新项目，可以从 [Unity 手册](https://docs.unity3d.com/Manual/GettingStarted) 学习如何创建新项目。

创建时使用`2D Template` 免得频繁手动修改导入图片素材的Import settings。也可以创建后在 [project settings](https://docs.unity3d.com/Manual/2DAnd3DModeSettings.html) 手动修改。

新场景Sample Scene内的Main Camera和Directional Light可以删除，本资源是完全和场景不关联的，默认新建的Sample Scene都可以删除，但是建议至少留下一个空场景，保证内置功能正常运行。

## 安装 Naninovel

从 [Asset商店窗口](https://docs.unity3d.com/Manual/AssetStore.html) 下载并等待导入编译完成。Naninovel资源的文件夹位置可以在资源文件夹内随意移动。

在使用该资源各项功能（配置，设置，保存等）后会自动生成文件夹 `Assets/NaninovelData` 。 和上面相反，不要移动该目录（移动后再运行是会重新生成），如果你想改变该目录， 编辑引擎配置菜单中的 `Generated Data Path` 。

## 添加Naninovel 脚本

使用 `Create -> Naninovel -> Naninovel Script`来创建新的naninovel script。 

![Create Naninovel Script](https://i.gyazo.com/be7677077abeb4f805979bd647d6d90e.png)

::: note
以下示例仅供参考，文件夹和其他资源位置，命名等随意，按使用者自己需求
:::

Naninovel脚本是文本文件（扩展名为.nani），用于控制你场景的演出，你可以使用任何文本编辑器进行修改，比如Notepad，TextEdit，或者 [VS Code](https://code.visualstudio.com).

![Open Naninovel Script](https://i.gyazo.com/f552c2ef323f9ec1171eba72e0c55432.png)

也可使用内置可视化编译器进行编辑。
在选择创建好的脚本以后，在右侧的属性面板会自动打开内置的可视化编辑器。

[!ba57b9f78116e57408125325bdf66be9]

在右侧编辑器内按右键insert或者`Ctrl+Space`以插入新行 (可以之后再输入配置菜单自定义快捷键) 然后选择想要的命令行，过直接输入左边的编号，或是直接拖拽来重新排序已有的行，在右侧编辑器内按右键remove移除已有行。

上方修改文件名会有(`*`) 符号显示，按`Ctrl+S` 保存修改，未保存当前文件修改去改动其他脚本时会有提示询问是否保存。

使用其他编译器编译时候注意保存修改，内置可视化编辑器会自动同步修改，所以你可以同时使用文本编辑器和内置可视化编辑器。

::: note
以下指引中均使用的文本编辑器，你可以直接再内置可视化编辑器中实现一样的修改。
:::

在Naninovel -> Resources -> Scripts内按“+”号添加外部脚本，也可以通过拖拽添加，支持文件夹拖拽，确保所有要使用的脚本被添加进来，通过菜单创建的会自动被添加。

![Add Naninovel Script](https://i.gyazo.com/b3281a145ba54e6cb6cbdaa478ea894d.png)

打开已经创建的脚本输入如下信息：

```nani
Hello World!
@stop
```
启动场景可以看到运行效果，显示第一句话后，随机根据第二句停止。

::: note

所有可用内置命令，参数，示例参考[API 参考](/zh/api/) 。你也可以添加自定义命令，参考[自定义命令](/zh/guide/custom-commands.md) 。

:::

万一主菜单的"NEW GAME" 按钮没被激活，确认脚本配置菜单 (`Naninovel -> Configuration -> Scripts`) 内 `Start Game Script`属性正确配置，名字是创建的要使用的第一个脚本名字。如果你导入了其他已有脚本，该配置可能不会自动配置，正常创建第一个脚本时，该属性会被自动配置。

![](https://i.gyazo.com/47e34c913994a5b3e88d8f30d5127b7b.png)

## 添加人物

本资源可使用人物类型为，2D Sprites，动态Live2D模型3D meshes，你可以导入自己的资源使用，教程里使用2D Sprites。

在Naninovel -> Resources -> Characters 配置要使用的人物资源，每个人物由ID名称和对应的资源构成。支持拖拽添加。

![Add Character](https://i.gyazo.com/0c1e81ea1a20165c1bf88854df177b7f.png)

假定添加角色ID为"Kohaku"。编辑naninovel script来显示角色：

```nani
@char Kohaku
Hello World!
@stop
```

运行游戏时你会看到显示在屏幕上的人物，如果不指定特定资源名，会使用默认的显示资源。在脚本中使用“.”来调用对应的人物资源如下所示：

```nani
@char Kohaku.Happy
Hello World!
@stop
```

这样就会显示名字是"Happy" 的"Kohaku"元素图像，而不是默认的图像.

可使用如下方式使用“：”关联显示的对应文本：

```nani
@char Kohaku.Happy
Kohaku: Hello World!
@stop
```

或者：

```nani
Kohaku.Happy: Hello World!
@stop
```

要从场景中隐藏（移除）某个角色，或是其他演出元素如背景等，使用[@hide] :

```nani
Kohaku.Happy: Hello World!
@hide Kohaku
@stop
```

## 添加背景

背景可用Sprite，generic object，video，scene，也可用自定义工具物体；

你可以创建多个独立演出元素的背景，在一般VN游戏中，我们通常看到的效果是不同背景之间的切换。为了简化操作，`MainBackground`是预先添加好在背景演出元素中的的，也就不用每次在脚本中声明id，自动调用MainBackground内的背景。

Naninovel -> Resources -> Backgrounds在此菜单内添加新背景，默认打开MainBackground条目在此添加，你也可以返回上一级添加其他演出元素添加新的条目。

![Add Background](https://i.gyazo.com/98e88780625c7f2e1ef88db7ef10d1f4.png)

假定背景名为 "City"。使用[@back] 命令按如下调用：


```nani
@back City 
```

切换时会使用默认切换效果，详情参考[切换效果](/zh/guide/transition-effects.md) 。调用如下，使用径向模糊:

```nani
@back City 
@back School.RadialBlur
```

如此就会从 "City" 径向渐变到 "School"。

不同条目下的同名背景调用需要定义ID，如下:

```nani
@back Flower id:Flower
@back Withered id:Flower
```

## 添加音乐和音效
Naninovel -> Resources -> Audio内添加音效；Unity支持的格式参考[Unity支持格式](https://docs.unity3d.com/Manual/AudioFiles.html).

![Managing Audio](https://i.gyazo.com/cacdec36623dbbfcf9f49c594de53c0f.png)

BGM默认循环播放，使用渐隐切换过去，音量循环等可以使用参数改动，用[@bgm]命令基本调用如下：
```nani
@bgm ThePromenade
```

音效默认播放一次，[@sfx]命令调用如下：
```nani
@sfx Explosion
```

## 视频教程

如果你想看视频教程，如下：

[!!wFil5vje3NE]

## Demo 工程示例

GitHub完整Demo资源地址：[github.com/Elringus/NaninovelDemo](https://github.com/Elringus/NaninovelDemo). 

可以[使用Git客户端克隆库](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) 或者 [作为zip档案下载](https://github.com/Elringus/NaninovelDemo/archive/master.zip)。
Demo仅供学习使用。

::: warn
Demo不包含扩展，导入会报错，从Asset Store导入后解决报错。
:::