# 示例资源

虽然 Naninovel 包已经包含了几个 [基本示例](/zh/guide/getting-started#演示示例) 来帮助您开始使用视觉小说和对话模式场景，但也提供了一组额外的专门示例来演示常见的开发用例。请阅读以下内容，了解如何访问这些示例以及每个示例的简要说明。

## 访问示例

高级示例托管在 [引擎的 monorepo](https://github.com/naninovel/engine/tree/stable/unity/samples) 下。要访问存储库，请 [注册您的 Naninovel 许可证](https://naninovel.com/register) 并按照仪表板说明分配 GitHub 用户。一旦您拥有访问权限，请 [克隆](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) 或 [下载](https://github.com/naninovel/engine/archive/refs/heads/stable.zip) 存储库。

解压缩下载的存储库并在 Unity 编辑器中打开 `unity/samples` 目录。Naninovel 在包管理器中被引用为本地包。本地包源指向 `unity/client`，其中包含 Unity 扩展的源代码。示例中使用的其他第三方包为了方便起见嵌入在项目中。

![](https://i.gyazo.com/aa784d89f6a55576b745824c2f6fd537.png)

进入 Unity 编辑器后，打开 `Assets/Scenes/Main.unity` 场景并进入播放模式。您将看到我们 [演示项目](https://naninovel.com/demo) 的标题屏幕。您可以开始演示或单击 "SAMPLES" 按钮导航到可用的示例，概述如下。

![](https://i.gyazo.com/f7304c828ff616f2d9a979d2452413a4.png)

## Addressable

此示例显示如何手动向 [Addressable 提供者](/zh/guide/resource-providers.html#addressable) 注册 Naninovel 资源（不使用资源编辑器菜单）并从远程主机提供资产。

请注意，虽然示例项目中的大多数资源未在资源管理器菜单中分配：

![](https://i.gyazo.com/8c1b37362bf58d26f18e4e61ffe2957c.png)

—但它们仍然可以以相同的方式在剧本脚本中访问：

```nani
@back Snow
```

之所以有效，是因为这些资产分配了 Naninovel 资源地址和标签：

![](https://i.gyazo.com/81e59da9ba85c90f3d59b84573f7facf.png)

## 透视场景 (Perspective Scene)

此示例展示了一个充满多个动画环境精灵的通用背景、透视模式下的相机渲染以及散景（景深）效果。背景存储在 `Content/Backgrounds/Perspective` 目录下。

![](https://i.gyazo.com/610d2cafe5fbe42aba7adb9ac71720d1.mp4)

## 编译器本地化

要在示例项目中激活编译器本地化，请将 `Profiles/Naninovel/CompilerRU` 资产分配给 Scripts 配置中的 `Compiler Localization` 字段。然后重新启动 Unity 编辑器和 VS Code 扩展。现在您可以使用 VS Code 打开项目并运行 `Compiler Localization` 示例剧本。

![](https://i.gyazo.com/fde9998597ffedb8a025401bb2f71ce9.png)

## E2E

`E2E Tests` 示例展示了如何设置 [自动化端到端测试](/zh/guide/automated-testing) 套件并使用大多数可用的 API。

测试脚本存储在 `Scripts/E2E` 文件夹下。请注意放置在该文件夹中的 `.asmdef` 文件：这是在 Unity 测试环境下编译测试源所必需的。还要注意 `Packages/manifest.json` 文件中的 `testables` 条目，它将测试程序集公开给 Unity 的测试运行器。

![](https://i.gyazo.com/92e7eaf5725f098d6d12c83a2b7eb219.png)

## 通用 Actor (Generic Actor)

找到 `Content/Backgrounds/Beach`、`Content/Backgrounds/Perspective` [通用背景](/zh/guide/backgrounds#通用背景) 和 `Content/Characters/Kohaku/K3D` [通用角色](/zh/guide/characters#通用角色)，了解如何使用 Unity 的 Animator 制作的 3D 模型和动画来设置和使用通用 actor 实现。

![](https://i.gyazo.com/009900b179f3130f45824e22094e7884.gif)

## 输入重绑定

文档：https://naninovel.com/guide/input-processing.html#input-system

允许玩家更改默认控件的输入重绑定 UI 示例位于 `Content/UI/InputRebind` 文件夹中。它基于输入系统包捆绑的 "Rebind UI" 示例；在 [Unity 文档](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.1/manual/ActionBindings.html#interactive-rebinding) 中查找更多信息。

![](https://i.gyazo.com/eba8d2ce2dabfbe41cc0df238ad8ad99.png)

## 集成 (Integration)

一个示例项目，演示了 Naninovel 既用作 3D 冒险游戏的嵌入式对话系统，又用作可切换的独立小说模式。

![](https://i.gyazo.com/b1b6042db4a91b3a8cee74236b33c17c.mp4)

所有特定于项目的示例脚本都存储在 `Scripts/Runtime/Integration` 文件夹中。

Naninovel 通过附加到 `Integration` 场景中 `SetupGame` GameObject 的 `SetupGame.cs` 脚本手动初始化（引擎配置菜单中禁用了自动初始化）。

用作触发器组件的 `DialogueTrigger.cs` 脚本在玩家击中触发器碰撞体时切换到对话模式。

`SwitchToNovelMode.cs` 自定义命令用于从 C# 和剧本脚本切换到小说模式。

`SwitchToAdventureMode.cs` 自定义命令用于从小说模式切换回冒险模式。

## 库存 (Inventory)

虽然库存系统超出了视觉小说的范围，但我们收到了许多关于如何将其与 Naninovel 集成的请求和问题。库存示例是在不修改引擎源代码的情况下创建和集成库存扩展的示例，您可以将其设置在 Naninovel 安装之上。

::: info NOTE
库存不是独立产品，也不是 Naninovel 的一部分。使用它来学习如何扩展和自定义引擎，但不要指望它是库存系统的生产就绪解决方案。如果您正在寻找一个，请 [检查 Asset Store](https://assetstore.unity.com/?q=inventory) 或从头开始创建一个自定义的。
:::

此示例项目展示了如何制作具有网格布局、分页和拖放窗口的自定义库存 UI；添加自定义引擎服务和相关配置菜单；添加输入绑定；使用状态外包；以及编写自定义剧本命令和表达式函数。

![](https://i.gyazo.com/86c577f007daf4ec5d79c0e91db7bc10.mp4)

要从模板创建预制的库存 UI，请使用 `Create -> Naninovel -> Inventory -> Inventory UI` 资产上下文菜单。然后在编辑器中通过 `Naninovel -> Resources -> UI` 将预制件添加到 Naninovel UI 资源中。添加后，可以使用 [@showUI] 和 [@hideUI] 命令像所有其他 UI 一样显示/隐藏 UI。

库存 UI 组件具有 `Capacity` 属性，您可以在其中更改库存中的插槽数量。插槽网格通过 `Content/InventoryGrid` GameObject 配置（插槽数量和布局、每页插槽等）。窗口拖放行为可以通过附加到 `Content` GameObject 的 `Drag Drop` 组件进行配置（或禁用）。

库存物品预制件可以使用 `Create -> Naninovel -> Inventory -> Inventory Item` 资产上下文菜单创建。然后需要通过编辑器中的 `Naninovel -> Resources -> Inventory` 将物品预制件分配为库存资源。

![](https://i.gyazo.com/6062f8a433a47306f582a849c7bbf57e.png)

如果您有很多物品，并且通过编辑器菜单分配它们不方便，您可以将它们放在 `Resources/Naninovel/Inventory` 文件夹中，它们将自动公开给引擎。您可以另外使用子文件夹组织它们；在这种情况下，在剧本脚本中引用它们时使用正斜杠 (`/`)。例如，存储为 `Resources/Naninovel/Inventory/Armor/FullPlate.prefab` 的物品可以在脚本中引用为 `Armor/FullPlate`。

也可以使用 [Addressable 资产系统](/zh/guide/resource-providers#addressable) 手动公开资源。要公开资产，请分配一个等于您通过上述方法使用的路径的地址，但省略 `Resources/` 部分。例如，要公开 `FullPlate.prefab` 物品，请为预制件分配地址 `Naninovel/Inventory/FullPlate`。请注意，Addressable 提供者默认情况下不在编辑器中使用；您可以通过打开资源提供者配置菜单中的 `Enable Addressable In Editor` 属性来启用它。

每个物品都有一个 `Stack Count Limit` 属性来限制这种类型的物品可以在单个库存插槽中堆叠多少个，以及一个 `On Item Used` Unity 事件，该事件在物品被使用时调用（通过 `@useItem` 命令或当用户单击库存中的物品时）。下面是一个示例，说明如何使用 `Play Script` 组件设置事件，以便在使用物品后将其删除，生成故障特殊效果并打印文本消息。

![](https://i.gyazo.com/010a9ba35db607ba46d78eda3513f678.png)

您可以使用 `@addItem` 命令向库存添加物品，并使用 `@removeItem`（或 `@removeItemAt`、`@removeAllItems`）将其删除。物品 ID 等于物品预制件名称。库存插槽 ID 等于网格插槽索引（例如，第一个插槽是 0，第二个是 1，依此类推）。

为了方便起见，还提供了 `itemExist()` 和 `itemCount()` 自定义 [表达式函数](/zh/guide/script-expressions#表达式函数) 来检查物品是否存在于库存中以及获取现有物品的数量。

以下是示例项目中的脚本：

```nani
# Start

Select an action.[>]

@choice "Pick up sword" lock:itemExist("Sword")
    @addItem Sword
@choice "Pick up armor" lock:itemExist("Armor")
    @addItem Armor
@choice "Adventure awaits, venture forth!"

# Adventure

@if itemExist("Sword")
	@set monstersSlayed={ itemExist("Armor") ? random(3,5) : 2 }
	@addItem Food amount:{monstersSlayed}
	You've encountered and slayed {monstersSlayed} monsters with your sword.
	@goto #Start
@else
	But you don't have a weapon! You've been beaten by the monsters.
	@goto #Start
```

## Live2D

该示例演示了在 Naninovel 中使用 Live2D 角色。在 `Content/Characters/Hiyori` 和 `Content/Characters/Senko` 目录中找到它们。

![](https://i.gyazo.com/b81df72fc7afaed569520496cbee09f0.mp4)

## 本地化

 - 生成的本地化文档存储在 `Profiles/Naninovel/Resources/Naninovel/Localization` 目录中。
 - 生成的表格存储在示例项目根目录下的 `Sheets` 目录中。
 - 本地化特定字体存储在 `Profiles/Naninovel/Resources/Naninovel/Fonts` 中。

为本地化工具选择的文件夹：

| 文件夹 | 路径 |
|------------------------|------------------------------------------------------------|
| Script Folder (input) | Assets/Scripts/Scenario |
| Text Folder (input) | Assets/Profiles/Naninovel/Resources/Naninovel/Text |
| Locale Folder (output) | Assets/Profiles/Naninovel/Resources/Naninovel/Localization |

为电子表格工具选择的文件夹：

| 文件夹 | 路径 |
|---------------------------|------------------------------------------------------------|
| Input Scripts Folder | Assets/Scripts/Scenario |
| Input Text Folder | Assets/Profiles/Naninovel/Resources/Naninovel/Text |
| Input Localization Folder | Assets/Profiles/Naninovel/Resources/Naninovel/Localization |
| Output Folder | Sheets |

![](https://i.gyazo.com/97d232751dd7e97bc828f3521f1d2066.mp4)

## 地图

此示例展示了如何在没有任何 C# 脚本的情况下实现交互式地图。

![](https://i.gyazo.com/f93f0e73389934bf25226f4000e437eb.gif)

地图实现为存储在 `Content/UI/Map` 的自定义 UI。位置是放置在 UI 中的常规 Unity 按钮。

![](https://i.gyazo.com/f421eaf666c9d84b04d23a72d1259f47.png)

按钮的单击和悬停事件由 Naninovel 的 [Play Script](https://naninovel.com/guide/gui.html#play-script-on-unity-event) 组件处理。

![](https://i.gyazo.com/a64ee9beee378c687d0d8093334f4ef7.png)

位置的可用性由附加到按钮的 [Variable Events](https://naninovel.com/guide/custom-variables.html#variable-events) 组件控制。

## RTL

RTL 打印机存储在 `Content/Printers/RTL`。

![](https://i.gyazo.com/7b582e4ae76c6fd62170e00dd3874ff7.png)

## Actor 着色器

该示例展示了如何创建和使用用于添加自定义过渡效果的纹理着色器以及支持光照和自发光的精灵着色器；后者用于模拟背景 actor 的一天中的时间。

![](https://i.gyazo.com/a9d7fb29d5e076245ac515d673cc155e.mp4)

自定义着色器存储在 `Scripts/Shaders` 目录中。

背景纹理在 alpha 层中存储了一个自发光遮罩，自定义着色器使用该遮罩来评估哪些区域应该发光，同时忽略全局光。

一天中的时间由 `Scripts/Runtime/Shader/TimeOfDay.cs` 控制，它允许在 24 小时的一天中的任何给定点配置灯光颜色和发射强度。

![](https://i.gyazo.com/b58cb70a522b9085cedb796249557df5.png)

组件 API 通过 `Scripts/Runtime/Shader/SetHour.cs` 自定义命令公开给剧本脚本，该命令允许使用 `@hour` 命令设置小时，例如：

```nani
; 在 3 秒内将当前时间设置为 18:00 (6:00 PM)。
@hour 18 duration:3
```

## Spine

该示例演示了在 Naninovel 中使用 Spine 角色。在 `Content/Characters/Spine` 目录中找到它们。

![](https://i.gyazo.com/08b04de115d97427d152cb5f37065d2d.mp4)

## UI

该示例包含以下新的自定义和修改后的内置 UI 示例：

- 标题屏幕

![](https://i.gyazo.com/e76a9a339535da4e34dfcc376ebfbf41.png)

- 音乐画廊

![](https://i.gyazo.com/68eabcbd6538d166c0e6eca58dd8f87b.png)

- 制作人员名单

![](https://i.gyazo.com/40bb59cf450fc129f80830aa411c3b14.png)

- 聊天打印机中的时间戳

![](https://i.gyazo.com/770a7e9d9d021f8013f7ce139c80992b.png)

- 自定义选项处理程序

![](https://i.gyazo.com/aab6a99a12a3e31f775a4f121cdc213a.png)

- 显示消息中的表情符号

![](https://i.gyazo.com/e3bc62957204c0fba91e879470d0e181.png)

- 显示消息中的字体变体

![](https://i.gyazo.com/fd203a98efc513e6bf1020f1978d57eb.png)

- 日历

![](https://i.gyazo.com/1666b02675d34dcd5ea4e42dae81b416.png)

所有示例 UI 都存储在 `Content/UI` 中。

## 分层 Actor

在 `Content/Characters/Miho` 目录中找到分层角色，在 `Content/Backgrounds/Particles` 中找到在相机渲染模式下设置的分层背景。

## 切片 Actor

在 `Content/Characters/Kohaku/Diced` 中找到切片角色和图集。

## 视频 Actor

视频背景存储在 `Content/Backgrounds/Video` 目录中，而视频 actor 可以在 `Content/Characters/Ball` 目录中找到。

## 场景背景

在 `Content/Backgrounds/Scene` 目录中找到场景背景。

## 过渡效果

在 `Scripts/Scenario/Transitions` 剧本脚本中找到按顺序应用所有可用过渡效果的演示。

## 自动配音

EN 和 JA 语言环境的语音剪辑存储在 `Content/Audio/Voice` 下。

进入 "AUTO VOICING" 示例并尝试在游戏设置中切换语音语言。

## 音乐前奏

演示如何使用 `@bgm` 命令的 `intro` 参数，以便在循环播放曲目的基本部分之前播放一次前奏部分。

## 背景匹配

背景匹配功能的演示，展示了不同纵横比的背景如何与显示视口匹配。

## 可视化脚本

[Visual Scripting](https://docs.unity3d.com/Packages/com.unity.visualscripting@latest)（以前称为 Bolt）是 Unity 2021.2 及更高版本默认捆绑的内置包。它使您能够使用程序员和非程序员都可以使用而无需编写代码的基于单元的图形来创建游戏或应用程序的逻辑。

![](https://i.gyazo.com/ab7c9d92b32810b030aba24b4bd95405.jpg)

首先，确保您使用的是兼容的 Unity 版本（2021.2 或更高版本），并且在 Package Manager 中安装了 `Visual Scripting` 包。

![](https://i.gyazo.com/885ebb9808b369c30dfcaab19b0cee2f.png)

将 `Elringus.Naninovel.Runtime` 库添加到 Visual Scripting 项目设置中的 `Node Library` 列表中。这是将引擎类型和 API 公开给可视化脚本图所必需的。

![](https://i.gyazo.com/38afd2ea477fcf0921114e3847de6c85.png)

Visual Scripting 不会自动公开库中的所有可用类型，因此请将所需的 Naninovel 类型添加到同一设置菜单中的 `Type Options` 列表中。在下面的示例中，我们添加了 `Engine`、`Script Player Interface` 和 `Script Player Extensions`，但您可能需要更多类型，例如其他 [引擎服务接口](/zh/guide/engine-services)、配置等。

![](https://i.gyazo.com/9afdeb12c0ff63ce942d04b21f737217.png)

添加库和类型后，不要忘记重新生成单元以应用更改。

![](https://i.gyazo.com/26c7bee4798b690c4eb362ec39746dc7.png)

在 Visual Scripting 设置中添加 Naninovel 库和类型后，引擎 API 将在图视图下的模糊查找器中可用，并且可以像其他 Unity 或第三方 API 一样使用。下面是一个初始化引擎并播放脚本的示例。在尝试此示例之前，请确保禁用 `Initialize On Application Load` 并删除 `Title UI`。

![](https://i.gyazo.com/63a832f10fa3f5e4429e98da50ae8dd0.png)

如果您希望从剧本脚本向可视化脚本图或状态机发送事件，下面是一个 [自定义命令](/zh/guide/custom-commands) 的示例，它将尝试查找具有提供名称的 GameObject 并发送具有指定名称和参数的事件：

```csharp
[Serializable, Alias("bolt")]
public class BroadcastBoltEvent : Command
{
    [Alias("object"), RequiredParameter]
    public StringParameter GameObjectName;
    [Alias("name"), RequiredParameter]
    public StringParameter EventName;
    [Alias("args")]
    public StringListParameter Arguments;

    public override Awaitable Execute (ExecutionContext ctx)
    {
        var gameObject = GameObject.Find(GameObjectName);
        if (!gameObject)
        {
            Debug.LogError($"Failed to broadcast '{EventName}' bolt event: '{GameObjectName}' game object is not found.");
            return Async.Completed;
        }

        CustomEvent.Trigger(gameObject, EventName, Arguments);

        return Async.Completed;
    }
}
```

只需将内容复制粘贴到存储在项目 Assets 目录内任何位置的新 C# 脚本中，命令就会自动可用，并可按如下方式使用：

```nani
; 使用提供的参数将 "MyEvent" 发送到 "ExampleEvent" 游戏对象
@bolt object:ExampleEvent name:MyEvent args:ExampleMessage,Script002
```

下面是一个示例图，当附加到 `ExampleEvent` GameObject 时，它将打印消息并开始播放指定的脚本。

![](https://i.gyazo.com/e2aef7f19cf013f4d476d32aac036f54.png)
