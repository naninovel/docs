# 集成选项

虽然 Naninovel 专注于传统的视觉小说游戏，并且作为模板最适合，但也可以将引擎与现有项目集成。如果你正在制作 3D 冒险游戏、RPG 或任何其他类型的游戏——你仍然可以将 Naninovel 用作嵌入式对话系统。

![](https://i.gyazo.com/b1b6042db4a91b3a8cee74236b33c17c.mp4)

有多种方法可以将 Naninovel 与自定义项目集成；具体的实现取决于项目类型和你想要实现的目标。在以下文档中，我们将列出各种配置选项和 API，它们可用于将 Naninovel 与独立游戏“配对”。在继续之前，请查看[引擎架构](/zh/guide/engine-architecture)以更好地了解其概念行为。

::: tip 示例
查看[集成示例](/zh/guide/samples#集成-integration)，其中 Naninovel 既用作 3D 冒险游戏的嵌入式对话系统，又用作独立的小说模式。
:::

## 手动初始化

启用引擎配置菜单中的 `Initialize On Application Load` 选项时，引擎服务会在应用程序启动时自动初始化。

![](https://i.gyazo.com/6349692c2e2036e908e41c3d89509102.png)

除非你想在小说模式下开始游戏，否则你应该在需要时通过调用 C# 中的静态 `RuntimeInitializer.Initialize()` 方法或向场景中的 GameObject 添加 `Runtime Initializer` 组件来手动初始化引擎；后者将使引擎在 Unity 中加载场景时初始化。

下面是一个从 MonoBehaviour 脚本手动初始化的示例：

```csharp
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

禁用 `Scene Independent` 将使所有与 Naninovel 相关的对象成为初始化引擎的 Unity 场景的一部分；当场景卸载时，引擎将被销毁。

要重置引擎服务（并处置大多数占用的资源），请使用 `IStateManager` 服务的 `ResetState()` 方法；这在临时切换到另一种游戏模式同时能够返回小说模式而无需重新初始化引擎时非常有用。

要销毁所有引擎服务并从内存中完全移除 Naninovel，请使用 `Engine.Destroy()` 静态方法。

## 访问引擎 API

引擎初始化过程是异步的，因此即使启用了自动初始化，引擎 API 也可能在 Unity 加载场景后（例如，在 `Awake`、`Start` 和 `OnEnable` MonoBehaviour 方法中）不可用。

要检查引擎当前是否可用，请使用 `Engine.Initialized` 属性；`Engine.OnInitializationFinished` 事件允许在初始化过程完成后执行操作，例如：

```csharp
public class MyScript : MonoBehaviour
{
    private void Awake ()
    {
        // 引擎可能未在此处初始化，因此先检查。
        if (Engine.Initialized) DoMyCustomWork();
        else Engine.OnInitializationFinished += DoMyCustomWork;
    }

    private void DoMyCustomWork ()
    {
        // 引擎在此处已初始化，可以安全地使用 API。
        var scriptPlayer = Engine.GetService<IScriptPlayer>();
        ...
    }
}
```

## 播放场景脚本

要预加载并播放具有给定路径的场景脚本，请使用 `IScriptPlayer` 服务的 `LoadAndPlay(ScriptPath)` 方法。要获取引擎服务，请使用 `Engine.GetService<TService>()` 静态方法，其中 `TService` 是要检索的服务类型（接口）。例如，以下代码获取脚本播放器服务，预加载并播放名为 `Script001` 的脚本：

```csharp
var player = Engine.GetService<IScriptPlayer>();
await player.LoadAndPlay("Script001");
```

退出小说模式并返回主游戏模式时，你可能希望卸载 Naninovel 当前使用的所有资源并停止引擎服务。为此，请使用 `IStateManager` 服务的 `ResetState()` 方法：

```csharp
var stateManager = Engine.GetService<IStateManager>();
await stateManager.ResetState();
```

### 脚本资产引用

如果你想在自定义系统中引用场景脚本资产（例如，播放对话或过场动画），请注意直接存储脚本路径是很脆弱的，因为它取决于文件位置和名称。

相反，使用资产引用 (GUID)。当关联文件移动或重命名时，引用不会更改。要从 GUID 解析脚本路径，请使用 `ScriptAssets.GetPath` 方法。Naninovel 还提供了一个 `ScriptAssetRef` 属性抽屉，为了方便起见，允许将脚本资产直接分配给序列化字段。

下面是来自[集成示例](/zh/guide/samples#集成-integration)的一个组件，当玩家与触发器碰撞时开始播放指定的脚本：

```cs
public class DialogueTrigger : MonoBehaviour
{
    [ScriptAssetRef]
    public string ScriptRef;
    public string Label;

    private void OnTriggerEnter (Collider other)
    {
        var player = Engine.GetService<IScriptPlayer>();
        var path = ScriptAssets.GetPath(ScriptRef);
        player.LoadAndPlayAtLabel(path, Label).Forget();
    }
}
```

在编辑器中，你可以将脚本资产拖放到 `Script Ref` 字段，当脚本文件移动或重命名时，引用将保持完整。

![](https://i.gyazo.com/cd634c628a0a116397f6ecef837a10b0.png)

## 禁用标题菜单

引擎初始化时会自动显示内置标题菜单实现，而你可能拥有自己的标题菜单。你可以使用[UI 自定义功能](/zh/guide/gui#ui-自定义)修改、替换或完全移除内置标题菜单。菜单列在 UI 资源中的 `Title UI` 下。

## 引擎对象层

你可以通过配置菜单让引擎为其创建的所有对象（UI 相关除外）分配特定的[层](https://docs.unity3d.com/Manual/Layers.html)。

![](https://i.gyazo.com/8642fe37ddc45b8514b9f01d70277fbd.png)

这也将使引擎的摄像机使用[剔除遮罩](https://docs.unity3d.com/ScriptReference/Camera-cullingMask.html)仅渲染指定层上的对象。

要更改引擎管理的 UI 对象的层，请使用 UI 配置菜单中的 `Objects Layer` 选项。

![](https://i.gyazo.com/56d863bef96bf72c1fed9ae646db4746.png)

## 渲染到纹理

你可以通过在摄像机配置菜单中分配自定义摄像机预制件，使引擎的摄像机渲染到自定义 [RenderTexture](https://docs.unity3d.com/ScriptReference/RenderTexture.html) 而不是屏幕（并更改其他与摄像机相关的设置）。

![](https://i.gyazo.com/1b7116fa1bd170d3753b4cdbd27afcf3.png)

## 切换模式

虽然这在很大程度上取决于项目，但以下是一个抽象示例（基于集成示例），展示了如何通过自定义命令在“冒险”和“小说”模式之间切换。

::: code-group

```csharp [SwitchToNovelMode.cs]
[Alias("novel")]
public class SwitchToNovelMode : Command
{
    public StringParameter ScriptPath;
    public StringParameter Label;

    public override async Awaitable Execute (ExecutionContext ctx)
    {
        // 1. 禁用角色控制。
        var controller = Object.FindAnyObjectByType<CharacterController3D>();
        controller.IsInputBlocked = true;

        // 2. 切换摄像机。
        var advCamera = GameObject.Find("AdvCamera").GetComponent<Camera>();
        advCamera.enabled = false;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = true;

        // 3. 加载并播放指定脚本（如果已分配）。
        if (Assigned(ScriptPath))
        {
            var scriptPlayer = Engine.GetService<IScriptPlayer>();
            await scriptPlayer.MainTrack.LoadAndPlayAtLabel(ScriptPath, Label);
        }

        // 4. 取消静音 Naninovel 输入。
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.Muted = false;
    }
}
```

```csharp [SwitchToAdventureMode.cs]
[Alias("adventure")]
public class SwitchToAdventureMode : Command
{
    public override async Awaitable Execute (ExecutionContext ctx)
    {
        // 1. 静音 Naninovel 输入。
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.Muted = true;

        // 2. 停止脚本播放器。
        var scriptPlayer = Engine.GetService<IScriptPlayer>();
        scriptPlayer.MainTrack.Stop();

        // 3. 重置状态。
        var stateManager = Engine.GetService<IStateManager>();
        await stateManager.ResetState();

        // 4. 切换摄像机。
        var advCamera = GameObject.Find("AdvCamera").GetComponent<Camera>();
        advCamera.enabled = true;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = false;

        // 5. 启用角色控制。
        var controller = Object.FindAnyObjectByType<CharacterController3D>();
        controller.IsInputBlocked = false;
    }
}
```

:::

然后可以在场景脚本中使用这些命令：

```nani
; 切换到冒险模式。
@adventure
```

—或直接在 C# 中（例如，在 `OnTrigger` Unity 事件中）：

```csharp
private void OnTriggerEnter (Collider other)
{
	var switchCommand = new SwitchToNovelMode { ScriptPath = "Script001" };
	switchCommand.Execute().Forget();
}
```

## 其他选项

还有许多其他功能（状态外包、服务覆盖、自定义序列化、资源和配置提供者等）在将引擎与其他系统集成时可能很有用。查看其余指南以获取更多信息。还可以考虑研究可用的[配置选项](/zh/guide/configuration)；某些功能可能未在指南中描述，但在集成时仍然很有用。

如果你觉得某些引擎 API 或系统缺乏可扩展性并且需要修改源代码才能集成，请[联系支持](/support/#naninovel-support)——我们将考虑改进它。

::: tip 示例
查看[集成示例](/zh/guide/samples#集成-integration)，其中 Naninovel 既用作 3D 冒险游戏的嵌入式对话，又用作可切换的独立小说模式。
:::
