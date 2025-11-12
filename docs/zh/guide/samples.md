# 示例项目

提供了一系列示例项目，帮助你快速上手常见的开发场景。以下是访问示例项目的说明及各示例的简要介绍。

## 访问示例项目

这些示例托管在 [Naninovel 引擎的 monorepo 仓库](https://github.com/naninovel/engine/tree/stable/unity/samples) 下。要访问该仓库，请先[注册你的 Naninovel 许可证](https://naninovel.com/register)，并按照控制面板的说明将其分配给一个 GitHub 用户。获得访问权限后，可以选择[克隆仓库](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)或[直接下载](https://github.com/naninovel/engine/archive/refs/heads/stable.zip)。

解压下载的仓库后，用 Unity 编辑器打开 `unity/samples` 目录。注意，Naninovel 作为本地包在包管理器中被引用，其本地包的源路径指向 `unity/client`，其中包含 Unity 扩展的源代码。示例项目中使用的其他第三方包也已嵌入到项目中以便使用。

![](https://i.gyazo.com/aa784d89f6a55576b745824c2f6fd537.png)

进入 Unity 编辑器后，打开 `Assets/Scenes/Main.unity` 场景并进入播放模式。你将看到我们的[演示项目](https://naninovel.com/demo)的标题界面。你可以直接开始演示，或者点击“SAMPLES”按钮浏览可用示例，具体如下所述。

![](https://i.gyazo.com/f7304c828ff616f2d9a979d2452413a4.png)

## 可寻址资源

此示例展示了如何手动为 [Addressable Provider](/zh/guide/resource-providers.html#addressable) 注册 Naninovel 资源（无需使用资源编辑器菜单），并从远程主机加载这些资源。

请注意，虽然示例项目中的大多数资源并未在资源管理器菜单中分配：

![](https://i.gyazo.com/8c1b37362bf58d26f18e4e61ffe2957c.png)

— 它们仍然可以像往常一样在 Naninovel 脚本中访问：

```nani
@back Snow
```

之所以能正常运行，是因为这些资源被分配了 Naninovel 的资源地址和标签：

![](https://i.gyazo.com/81e59da9ba85c90f3d59b84573f7facf.png)

## 透视场景

此示例展示了一个包含多个动画环境精灵的通用背景、透视模式下的相机渲染以及景深（虚化）效果。背景存储在 `Content/Backgrounds/Perspective` 目录下。

![](https://i.gyazo.com/610d2cafe5fbe42aba7adb9ac71720d1.mp4)

## 编译器本地化

要在示例项目中启用编译器本地化，请将 `Profiles/Naninovel/CompilerRU` 资源分配到脚本配置中的 `Compiler Localization` 字段。然后重新启动 Unity 编辑器和 VS Code 扩展。此后，你可以在 VS Code 中打开项目并运行 `Compiler Localization` 示例场景。

![](https://i.gyazo.com/fde9998597ffedb8a025401bb2f71ce9.png)

## E2E

`E2E Tests` 示例展示了如何设置[自动化端到端测试](/zh/guide/automated-testing)套件，并使用大部分可用的 API。

测试脚本存放在 `Scripts/E2E` 文件夹下。注意该文件夹中放置了一个 `.asmdef` 文件：这是在 Unity 特定测试环境下编译测试源代码所必需的。同时请注意 `Packages/manifest.json` 文件中的 `testables` 条目，它将测试程序集暴露给 Unity 的测试运行器。

![](https://i.gyazo.com/92e7eaf5725f098d6d12c83a2b7eb219.png)

## 通用演出元素

请查看 `Content/Backgrounds/Beach`、`Content/Backgrounds/Perspective` [通用背景](/zh/guide/backgrounds#通用背景) 以及 `Content/Characters/Kohaku/K3D` [通用角色](/zh/guide/characters#通用角色)，这些示例展示了如何使用 Unity 的 Animator 创建并使用带有 3D 模型和动画的通用角色实现。

![](https://i.gyazo.com/009900b179f3130f45824e22094e7884.gif)

## 输入重绑定

文档地址：https://naninovel.com/guide/input-processing.html#input-system

在 `Content/UI/InputRebind` 文件夹中可以找到输入重绑定 UI 示例，它允许玩家更改默认控制。该示例基于输入系统包自带的 “Rebind UI” 示例；更多信息请参阅 [Unity 官方文档](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.1/manual/ActionBindings.html#interactive-rebinding)。

![](https://i.gyazo.com/eba8d2ce2dabfbe41cc0df238ad8ad99.png)

## 集成示例

这是一个将 Naninovel 同时用作 3D 冒险游戏中的对话系统以及可切换独立小说模式的示例项目。

![](https://i.gyazo.com/b1b6042db4a91b3a8cee74236b33c17c.mp4)

所有与项目相关（示例）的脚本都存储在 `Scripts/Runtime/Integration` 文件夹中。

在此项目中，Naninovel 通过附加在 `Integration` 场景中的 `SetupGame` 游戏对象上的 `SetupGame.cs` 脚本手动初始化（引擎配置菜单中已禁用自动初始化）。

`DialogueTrigger.cs` 脚本作为触发器组件使用，当玩家与触发碰撞体接触时切换至对话模式。

`SwitchToNovelMode.cs` 自定义指令可用于从 C# 或 Naninovel 脚本中切换至小说模式。

`SwitchToAdventureMode.cs` 自定义指令则用于从小说模式切换回冒险模式。

## 物品系统

虽然物品系统并非视觉小说的核心功能，但我们收到了许多关于如何与 Naninovel 集成的请求和问题。该示例展示了如何创建并集成一个物品系统扩展模块，可在不修改引擎源代码的情况下叠加到 Naninovel 上运行。

::: info 注意
此物品系统并不是一个独立产品，也不是 Naninovel 的组成部分。你可以通过它学习如何扩展和自定义引擎，但请不要将其视为可直接投入生产的解决方案。如果你需要现成的方案，请前往 [Unity 资产商店](https://assetstore.unity.com/?q=inventory) 或自行开发。
:::

该示例项目展示了如何创建具有网格布局、分页与拖拽功能的自定义物品 UI，添加自定义引擎服务和配置菜单、输入绑定、状态外包、自定义场景指令与表达式函数。

![](https://i.gyazo.com/86c577f007daf4ec5d79c0e91db7bc10.mp4)

要从模板创建一个预制的物品 UI，可通过 `Create -> Naninovel -> Inventory -> Inventory UI` 菜单生成，然后在 `Naninovel -> Resources -> UI` 编辑器菜单中将该预制体添加为 UI 资源。添加后，你可以像其他 UI 一样使用 [@showUI] 与 [@hideUI] 指令来显示或隐藏它。

Inventory UI 组件包含 `Capacity` 属性，用于设置物品栏的槽位数量。槽位网格（数量、布局、分页等）由 `Content/InventoryGrid` 游戏对象配置。窗口的拖拽行为可通过附加在 `Content` 游戏对象上的 `Drag Drop` 组件进行启用或禁用。

物品预制体可通过 `Create -> Naninovel -> Inventory -> Inventory Item` 菜单创建。然后在 `Naninovel -> Resources -> Inventory` 菜单中将这些预制体指定为物品资源。

![](https://i.gyazo.com/6062f8a433a47306f582a849c7bbf57e.png)

如果物品数量很多，通过编辑器菜单分配不方便，也可以直接将它们放入 `Resources/Naninovel/Inventory` 文件夹中，系统会自动识别。你还可以通过子文件夹分类管理；此时在脚本中引用时使用斜杠（`/`）。例如，存放于 `Resources/Naninovel/Inventory/Armor/FullPlate.prefab` 的物品可在脚本中以 `Armor/FullPlate` 引用。

你还可以使用 [Addressable 资源系统](/zh/guide/resource-providers#addressable) 手动暴露这些资源。只需将资源地址设置为对应路径（省略 “Resources/” 部分）。例如，要暴露 `FullPlate.prefab`，可将其地址设置为 `Naninovel/Inventory/FullPlate`。注意，默认情况下 Addressable 提供器不会在编辑器中启用；可在资源提供器配置菜单中启用 `Enable Addressable In Editor` 属性。

每个物品都有一个 `Stack Count Limit` 属性，用于限制同类物品在单个槽位中的最大堆叠数量；还有一个 `On Item Used` Unity 事件，会在物品被使用时触发（通过 `@useItem` 指令或玩家在 UI 中点击物品）。下方示例展示了如何利用 `Play Script` 组件配置事件，以在物品被使用后移除该物品、生成特效并显示文本消息。

![](https://i.gyazo.com/010a9ba35db607ba46d78eda3513f678.png)

你可以使用 `@addItem` 指令添加物品，使用 `@removeItem`（或 `@removeItemAt`、`@removeAllItems`）移除物品。物品 ID 与预制体名称一致。物品槽位 ID 则从 0 开始递增（如第一个槽位为 0，第二个为 1，以此类推）。

自定义的 [表达式函数](/zh/guide/script-expressions#expression-functions) `itemExist()` 和 `itemCount()` 也可用于检测物品是否存在以及物品数量。

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

此示例展示了如何在 Naninovel 中使用 Live2D 角色。相关资源位于 `Content/Characters/Hiyori` 和 `Content/Characters/Senko` 目录下。

![](https://i.gyazo.com/b81df72fc7afaed569520496cbee09f0.mp4)

## 本地化

- 生成的本地化文档存储在 `Profiles/Naninovel/Resources/Naninovel/Localization` 目录中。  
- 生成的表格文件存储在示例项目根目录下的 `Sheets` 文件夹中。  
- 与特定语言相关的字体文件存储在 `Profiles/Naninovel/Resources/Naninovel/Fonts` 目录中。

以下是为本地化工具选择的文件夹：

| 文件夹名称               | 路径                                                         |
|--------------------------|--------------------------------------------------------------|
| Script Folder (输入)     | Assets/Scripts/Scenario                                      |
| Text Folder (输入)       | Assets/Profiles/Naninovel/Resources/Naninovel/Text           |
| Locale Folder (输出)     | Assets/Profiles/Naninovel/Resources/Naninovel/Localization   |

用于电子表格工具的文件夹：

| 文件夹名称                   | 路径                                                         |
|------------------------------|--------------------------------------------------------------|
| Input Scripts Folder         | Assets/Scripts/Scenario                                      |
| Input Text Folder            | Assets/Profiles/Naninovel/Resources/Naninovel/Text           |
| Input Localization Folder    | Assets/Profiles/Naninovel/Resources/Naninovel/Localization   |
| Output Folder                | Sheets                                                       |

![](https://i.gyazo.com/97d232751dd7e97bc828f3521f1d2066.mp4)

## 地图

该示例展示了如何在不编写任何 C# 脚本的情况下实现一个交互式地图。

![](https://i.gyazo.com/f93f0e73389934bf25226f4000e437eb.gif)

地图以自定义 UI 形式实现，存放于 `Content/UI/Map` 目录下。各个地点是普通的 Unity 按钮，放置在该 UI 中。

![](https://i.gyazo.com/f421eaf666c9d84b04d23a72d1259f47.png)

按钮的点击与悬停事件由 Naninovel 的 [Play Script](https://naninovel.com/guide/user-interface.html#play-script-on-unity-event) 组件处理。

![](https://i.gyazo.com/a64ee9beee378c687d0d8093334f4ef7.png)

地点的可用性由附加在按钮上的 [Variable Events](https://naninovel.com/guide/custom-variables.html#variable-events) 组件控制。

## 右到左文字

右到左文字输出窗存放在 `Content/Printers/RTL` 目录下。

![](https://i.gyazo.com/7b582e4ae76c6fd62170e00dd3874ff7.png)

## 演出元素着色器

该示例展示了如何创建并使用纹理着色器来实现自定义转场效果，以及带有光照与自发光支持的精灵着色器；后者用于模拟背景角色的昼夜变化效果。

![](https://i.gyazo.com/a9d7fb29d5e076245ac515d673cc155e.mp4)

自定义着色器存储在 `Scripts/Shaders` 目录中。

背景纹理的 Alpha 通道中存有自发光遮罩，着色器会根据该遮罩判断哪些区域应发光，而不受全局光照影响。

昼夜变化由 `Scripts/Runtime/Shader/TimeOfDay.cs` 控制，它允许在 24 小时周期内配置光照颜色与发光强度。

![](https://i.gyazo.com/b58cb70a522b9085cedb796249557df5.png)

组件 API 通过自定义指令 `Scripts/Runtime/Shader/SetHour.cs` 暴露给 Naninovel 脚本，可通过 `@hour` 指令设置时间，例如：

```nani
; Set current hour to 18:00 (6:00 PM) over 3 seconds.
@hour 18 duration:3
```

## Spine

此示例展示了如何在 Naninovel 中使用 Spine 角色。资源位于 `Content/Characters/Spine` 目录。

![](https://i.gyazo.com/08b04de115d97427d152cb5f37065d2d.mp4)

## 用户界面

该示例包含以下自定义与修改后的内置 UI 示例：

- 标题界面（Title Screen）

![](https://i.gyazo.com/e76a9a339535da4e34dfcc376ebfbf41.png)

- 音乐图库（Music Gallery）

![](https://i.gyazo.com/68eabcbd6538d166c0e6eca58dd8f87b.png)

- 制作人员表（Credits）

![](https://i.gyazo.com/40bb59cf450fc129f80830aa411c3b14.png)

- 聊天文本输出窗中的时间戳（Timestamps in Chat Printer）

![](https://i.gyazo.com/770a7e9d9d021f8013f7ce139c80992b.png)

- 自定义选项处理器（Custom Choice Handler）

![](https://i.gyazo.com/aab6a99a12a3e31f775a4f121cdc213a.png)

- 已显示消息中的表情符号（Emoji in Revealed Messages）

![](https://i.gyazo.com/e3bc62957204c0fba91e879470d0e181.png)

- 已显示消息中的字体变体（Font Variants in Revealed Messages）

![](https://i.gyazo.com/fd203a98efc513e6bf1020f1978d57eb.png)

- 日历（Calendar）

![](https://i.gyazo.com/1666b02675d34dcd5ea4e42dae81b416.png)

以上所有示例 UI 均存储在 `Content/UI` 目录中。

## 分层角色

分层角色位于 `Content/Charecters/Miho` 目录，分层背景（使用摄像机渲染模式）位于 `Content/Backgrounds/Particles` 目录。

## 切片角色

切片角色与图集位于 `Content/Charecters/Kohaku/Diced` 目录。

## 视频角色

视频背景位于 `Content/Backgrounds/Video` 目录，视频角色位于 `Content/Characters/Ball` 目录。

## 场景背景

场景背景位于 `Content/Backgrounds/Scene` 目录。

## 转场效果

展示所有可用转场效果的示例脚本存储在 `Scripts/Scenario/Transitions` 中。

## 自动语音

英语（EN）与日语（JA）语音文件存放于 `Content/Audio/Voice` 目录。  
进入 “AUTO VOICING” 示例后，可在游戏设置中切换语音语言。

## 音乐前奏

演示如何使用 [@bgm] 指令的 `intro` 参数，使曲目的前奏部分只播放一次，然后循环播放主体部分。

## 背景匹配

此示例展示了背景匹配功能，即如何使不同宽高比的背景适配显示视口。

## 可视化脚本

[Visual Scripting](https://docs.unity3d.com/Packages/com.unity.visualscripting@latest)（先前称为 Bolt）是 Unity 2021 及更高版本中默认包含的内置包。  
它允许开发者使用基于单元（unit-based）的图形逻辑系统，在无需编写代码的情况下创建游戏或应用逻辑，程序员与非程序员皆可使用。

![](https://i.gyazo.com/ab7c9d92b32810b030aba24b4bd95405.jpg)

首先，确保使用 Unity 2021.2 或更新版本，并在包管理器中安装了 `Visual Scripting` 包。

![](https://i.gyazo.com/885ebb9808b369c30dfcaab19b0cee2f.png)

在项目设置的 “Visual Scripting” 菜单中，将 `Elringus.Naninovel.Runtime` 库添加至 `Node Library` 列表中。  
这样才能在可视化脚本图表中使用 Naninovel 引擎类型与 API。

![](https://i.gyazo.com/38afd2ea477fcf0921114e3847de6c85.png)

Visual Scripting 并不会自动暴露库中的所有类型，因此还需将所需的 Naninovel 类型添加到同一设置菜单下的 `Type Options` 列表中。  
在示例中，我们添加了 `Engine`、`Script Player Interface` 与 `Script Player Extensions`，但你可能还需要更多类型，如其他 [引擎服务接口](/zh/guide/engine-services)、配置等。

![](https://i.gyazo.com/9afdeb12c0ff63ce942d04b21f737217.png)

添加完库与类型后，别忘了重新生成单元（Regenerate Units）以应用更改。

![](https://i.gyazo.com/26c7bee4798b690c4eb362ec39746dc7.png)

当 Naninovel 库与类型已添加至可视化脚本设置后，引擎 API 将在图形视图的模糊查找器（Fuzzy Finder）中可用，可与 Unity 或其他第三方 API 一样使用。  
以下示例演示如何初始化引擎并播放脚本。在尝试此示例前，请禁用 “Initialize On Application Load” 并移除 “Title UI”。

![](https://i.gyazo.com/63a832f10fa3f5e4429e98da50ae8dd0.png)

如果希望从 Naninovel 场景脚本向可视化脚本图或状态机发送事件，可使用如下 [自定义指令](/zh/guide/custom-commands) 示例：它会尝试查找具有指定名称的游戏对象并发送带参数的事件。

```csharp
[Alias("bolt")]
public class BroadcastBoltEvent : Command
{
    [Alias("object"), RequiredParameter]
    public StringParameter GameObjectName;
    [Alias("name"), RequiredParameter]
    public StringParameter EventName;
    [Alias("args")]
    public StringListParameter Arguments;

    public override UniTask Execute (ExecutionContext ctx)
    {
        var gameObject = GameObject.Find(GameObjectName);
        if (!gameObject)
        {
            Debug.LogError($"Failed to broadcast '{EventName}' bolt event: '{GameObjectName}' game object is not found.");
            return UniTask.CompletedTask;
        }

        CustomEvent.Trigger(gameObject, EventName, Arguments);

        return UniTask.CompletedTask;
    }
}
```

只需将以下内容复制粘贴到项目 Assets 目录中的任意位置，保存为新的 C# 脚本，该指令便会自动生效，可按如下方式使用：

```nani
; Send "MyEvent" to "ExampleEvent" game object with the provided args
@bolt object:ExampleEvent name:MyEvent args:ExampleMessage,Script002
```

以下是一个示例图表，将其附加到 `ExampleEvent` 游戏对象后，会输出消息并开始播放指定的脚本。

![](https://i.gyazo.com/e2aef7f19cf013f4d476d32aac036f54.png)
