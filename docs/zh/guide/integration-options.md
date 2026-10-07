# 集成选项

虽然 Naninovel 专注于传统的视觉小说游戏，并且最适合作为此类游戏的模板，但也可以将引擎与现有项目集成。如果您正在制作 3D 冒险游戏、RPG 或任何其他类型的游戏，您仍然可以将 Naninovel 用作嵌入式对话系统。

![](https://i.gyazo.com/b1b6042db4a91b3a8cee74236b33c17c.mp4)

将 Naninovel 与自定义项目集成有多种方法，具体实现取决于项目类型和您想要实现的目标。下文介绍可用于将 Naninovel 与独立游戏配合使用的配置选项和 API。在继续之前，请先阅读 [引擎架构](/zh/guide/engine-architecture)，了解引擎的基本工作原理。

::: tip EXAMPLE
请查看 [集成示例](/zh/guide/samples#对话模式)，其中 Naninovel 既用作 3D 冒险游戏的嵌入式对话系统，又用作独立的小说模式。
:::

## 手动初始化

启用引擎配置菜单中的 `Initialize On Application Load` 选项时，引擎服务会在应用程序启动时自动初始化。

![](https://i.gyazo.com/5cb8ba25304f7c80d0af23859bc9286f.png)

除非您想让游戏以小说模式开始，否则应在需要时手动初始化引擎：在 C# 中调用静态 `RuntimeInitializer.Initialize()` 方法，或向场景中的游戏对象添加 `Runtime Initializer` 组件；后者将使引擎在 Unity 加载该场景时初始化。

下面是一个从 MonoBehaviour 脚本手动初始化的示例：

```cs
using Naninovel;
using UnityEngine;

public class MyScript : MonoBehaviour
{
    private async void Start ()
    {
        await RuntimeInitializer.Initialize();
    }
}
```

禁用 `Scene Independent` 将使所有与 Naninovel 相关的对象成为引擎初始化时所在 Unity 场景的一部分；当场景卸载时，引擎将被销毁。

要重置引擎服务（并释放大部分已占用的资源），请使用 `IStateManager` 服务的 `ResetState()` 方法；当您需要临时切换到另一种玩法模式，之后又能返回小说模式而无需重新初始化引擎时，这非常有用。

要销毁所有引擎服务并从内存中完全移除 Naninovel，请使用 `Engine.Destroy()` 静态方法。

## 访问引擎 API

引擎初始化过程是异步的，因此即使启用了自动初始化，在 Unity 刚加载完场景时（例如，在 `Awake`、`Start` 和 `OnEnable` MonoBehaviour 方法中），引擎 API 也可能尚不可用。

要检查引擎当前是否可用，请使用 `Engine.Initialized` 属性；`Engine.OnInitializationFinished` 事件允许在初始化过程完成后执行操作，例如：

```cs
public class MyScript : MonoBehaviour
{
    private void Awake ()
    {
        // 此时引擎可能尚未初始化，因此先检查。
        if (Engine.Initialized) DoMyCustomWork();
        else Engine.OnInitializationFinished += DoMyCustomWork;
    }

    private void DoMyCustomWork ()
    {
        // 此时引擎已初始化；可以安全地使用 API。
        var scriptPlayer = Engine.GetService<IScriptPlayer>();
        ...
    }
}
```

## 播放剧本脚本

要预加载并播放指定路径的剧本脚本，请使用 `IScriptPlayer` 服务的 `MainTrack` 上的 `LoadAndPlay(scriptPath)` 方法。要获取引擎服务，请使用 `Engine.GetService<TService>()` 静态方法，其中 `TService` 是要获取的服务的类型（接口）。例如，以下代码获取脚本播放器服务，预加载并播放名为 `Script001` 的脚本：

```cs
var player = Engine.GetService<IScriptPlayer>();
await player.MainTrack.LoadAndPlay("Script001");
```

退出小说模式并返回主游戏模式时，您可能希望卸载 Naninovel 当前使用的所有资源并停止引擎服务。为此，请使用 `IStateManager` 服务的 `ResetState()` 方法：

```cs
var stateManager = Engine.GetService<IStateManager>();
await stateManager.ResetState();
```

### 脚本资产引用

如果您想在自定义系统中引用剧本脚本资产（例如，用于播放对话或过场动画），请注意直接存储脚本路径并不可靠，因为路径取决于文件的位置和名称。

请改用资产引用（GUID）。当关联文件移动或重命名时，引用不会更改。要从 GUID 解析脚本路径，请使用 `ScriptAssets.GetPath` 方法。为方便起见，Naninovel 还提供了 `ScriptAssetRef` 属性绘制器，允许将脚本资产直接分配给序列化字段。

下面是一个序列化脚本引用的示例：当玩家与触发器碰撞时，该引用会被解析为脚本路径，并播放相应的脚本：

```cs
[ScriptAssetRef]
public string ScriptRef;

private void OnTriggerEnter (Collider other)
{
    var path = ScriptAssets.GetPath(ScriptRef);
    var player = Engine.GetService<IScriptPlayer>();
    player.MainTrack.LoadAndPlay(path).Forget();
}
```

`Dialogue Events` 等内置组件也使用相同的特性：将脚本资产拖放到 `Script` 字段，当脚本文件移动或重命名时，引用仍将保持有效。

![](https://i.gyazo.com/e6d96c7de99fabd16cf4a74d8a485469.png)

## 禁用标题菜单

初始化后，引擎会播放脚本配置菜单中分配给 `Title Script` 的脚本（默认为 `Title`），而默认的 [标题脚本](/zh/guide/scenario-scripting#标题脚本) 会通过 `@showUI TitleUI` 命令显示内置的标题菜单。如果您有自己的标题菜单，请取消分配标题脚本，或从该脚本中移除此命令。您还可以使用 [UI 自定义功能](/zh/guide/gui#ui-自定义) 修改、替换或完全移除内置标题菜单。该菜单列在 UI 资源中的 `TitleUI` 下。

## 引擎对象层

您可以通过配置菜单让引擎为其创建的所有对象（UI 相关除外）分配特定的 [层](https://docs.unity3d.com/Manual/Layers.html)。

![](https://i.gyazo.com/b27cdf9e3f5d9e7b25bbc4cbb37afe04.png)

这也将使引擎的摄像机使用 [剔除遮罩](https://docs.unity3d.com/ScriptReference/Camera-cullingMask.html) 仅渲染指定层上的对象。

要更改引擎管理的 UI 对象的层，请使用 UI 配置菜单中的 `Objects Layer` 选项。

![](https://i.gyazo.com/56d863bef96bf72c1fed9ae646db4746.png)

## 渲染到纹理

您可以通过在摄像机配置菜单中为 `Main Camera` 选项分配自定义摄像机预制件，使引擎的摄像机渲染到自定义 [RenderTexture](https://docs.unity3d.com/ScriptReference/RenderTexture.html) 而不是屏幕（并更改其他与摄像机相关的设置）。

![](https://i.gyazo.com/e302efafe6136a0d949defe17f6bc625.png)

## 切换模式

要在您的游戏与 Naninovel 之间切换（例如，在“冒险”和“小说”模式之间切换），请使用静态 `Dialogue` 类。`Dialogue.Enter()` 会在引擎尚未初始化时将其初始化，并启用 Naninovel 的渲染和输入处理，而 `Dialogue.Exit()` 会重置引擎状态并禁用它们。`Dialogue.EnterAndPlay()` 会进入对话模式并播放指定路径的剧本脚本；`Dialogue.EnterAndPlayAsset()` 则通过 [脚本资产引用](/zh/guide/integration-options#脚本资产引用) 执行相同的操作：

```cs
await Dialogue.EnterAndPlay("Script001");
...
await Dialogue.Exit();
```

除非事先已进入对话模式，否则退出不会产生任何效果；当前状态可通过 `Dialogue.Active` 属性获取。要响应模式切换（例如，在对话期间禁用游戏的角色控制），请使用 `Dialogue.OnEntered` 和 `Dialogue.OnExited` 事件。

在剧本脚本中，请使用 [@enterDialogue] 和 [@exitDialogue] 命令：

```nani
; 切换到冒险模式。
@exitDialogue
```

无需 C# 也可以通过 `Dialogue Events` 组件使用相同的 API：从 Unity 事件调用其 `EnterDialogue` 和 `ExitDialogue` 方法，分配 `Script` 和 `Label` 以便在进入时播放剧本脚本，并使用 `Dialogue Entered` 和 `Dialogue Exited` 事件响应模式切换。要添加预先配置好的对话触发器，请右键单击场景中的游戏对象并选择 `Naninovel -> Dialogue`；创建的对象将 `Dialogue Events` 与 `Trigger Events` 组件搭配使用，后者会在满足所配置的约束条件（碰撞、射线检测、指针悬停、输入）时进入对话。有关示例，请参阅 [快速上手指南](/zh/guide/getting-started#对话模式)。

在 [集成示例](/zh/guide/samples#对话模式) 中，每个 NPC 都有一个这样的 `Dialogue` 对象，并分配了脚本和标签；当玩家角色进入触发器的碰撞体并执行所分配的输入时，触发器即被激活。玩家对象下的 `Dialogue Events` 组件会在对话模式处于活动状态期间禁用角色控制，而 `Camera Events` 组件通过 `SetupBaseCamera` 方法将 Naninovel 摄像机叠加到场景摄像机之上，因此无需切换摄像机。对话脚本以 [@exitDialogue] 结束；小说模式则是通过 [@goto] 导航到的常规剧本脚本，它以同一命令结束。

## 其他选项

将引擎与其他系统集成时，还有许多功能可能派上用场，例如，将状态管理交给引擎、服务覆盖、自定义序列化，以及资源和配置提供者。请阅读指南的其他部分了解详情，也可以查看可用的 [配置选项](/zh/guide/configuration)；某些功能虽然未在指南中介绍，但仍可能有助于集成。

如果您觉得某些引擎 API 或系统缺乏可扩展性并且需要修改源代码才能集成，请 [联系技术支持](/zh/support/)——我们会考虑改进它。

::: tip EXAMPLE
请查看 [集成示例](/zh/guide/samples#对话模式)，其中 Naninovel 既用作 3D 冒险游戏的嵌入式对话系统，又用作可切换的独立小说模式。
:::
