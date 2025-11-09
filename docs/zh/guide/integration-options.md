# 集成选项

虽然 Naninovel 主要面向传统视觉小说游戏并在这类项目中表现最佳，但它同样可以与现有项目进行集成。如果你正在制作 3D 冒险游戏、RPG 或其他类型的游戏，也可以将 Naninovel 作为即插即用的对话系统使用。

![](https://i.gyazo.com/b1b6042db4a91b3a8cee74236b33c17c.mp4)

你可以通过多种方式将 Naninovel 集成到自定义项目中，具体实现方式取决于项目类型以及你希望 Naninovel 实现的功能。以下文档列出了多种配置选项与 API，可帮助你将 Naninovel 与独立游戏进行“配合”或“对接”。在继续之前，建议先阅读 [引擎架构](/zh/guide/engine-architecture) 以更好地理解其工作原理。

::: tip EXAMPLE
请查看 [integration 示例](/zh/guide/samples#integration)，该示例展示了 Naninovel 既作为 3D 冒险游戏中的对话系统使用，也作为独立小说模式运行的案例。
:::

## 手动初始化

当在引擎配置菜单中启用 `Initialize On Application Load` 选项时，引擎服务会在应用程序启动时自动初始化。

![](https://i.gyazo.com/6349692c2e2036e908e41c3d89509102.png)

除非你希望游戏从小说模式开始，否则应当在真正需要时再手动初始化引擎。可以通过两种方式实现：

- 在 C# 脚本中调用静态方法 `RuntimeInitializer.Initialize()`；
- 或在场景中的某个 GameObject 上添加 `Runtime Initializer` 组件，使引擎在场景加载时自动初始化。

以下示例展示了如何在一个 [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) 脚本中手动初始化引擎：

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

禁用 `Scene Independent` 选项将使所有与 Naninovel 相关的对象成为引擎初始化所在 Unity 场景的一部分；当该场景被卸载时，引擎也会随之销毁。

若要重置引擎服务（并释放大部分已占用的资源），可使用 `IStateManager` 服务的 `ResetState()` 方法；当你需要临时切换到其他游戏模式，但又希望能够在不重新初始化引擎的情况下返回小说模式时，这个方法非常有用。

若要销毁所有引擎服务并将 Naninovel 完全从内存中移除，请使用静态方法 `Engine.Destroy()`。

## 访问引擎 API

引擎初始化过程是异步的，因此即使启用了自动初始化功能，Unity 在加载场景后（例如在 `Awake`、`Start` 和 `OnEnable` [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) 方法中）引擎 API 也可能暂时不可用。

若要检查引擎当前是否可用，请使用 `Engine.Initialized` 属性；`Engine.OnInitializationFinished` 事件可用于在初始化完成后执行操作，例如：

```csharp
public class MyScript : MonoBehaviour
{
    private void Awake ()
    {
        // 此时引擎可能尚未初始化，因此需先进行检查。
        if (Engine.Initialized) DoMyCustomWork();
        else Engine.OnInitializationFinished += DoMyCustomWork;
    }

    private void DoMyCustomWork ()
    {
        // 此时引擎已初始化，可以安全地使用其 API。
        var scriptPlayer = Engine.GetService<IScriptPlayer>();
        ...
    }
}
```

## 播放 Naninovel 脚本

若要预加载并播放指定路径的 Naninovel 剧本，可使用 `IScriptPlayer` 服务的 `LoadAndPlay(ScriptPath)` 方法。要获取引擎服务，请使用静态方法 `Engine.GetService<TService>()`，其中 `TService` 是要获取的服务接口类型。例如，以下示例展示了如何获取脚本播放器服务并播放名为 “Script001” 的剧本：

```csharp
var player = Engine.GetService<IScriptPlayer>();
await player.LoadAndPlay("Script001");
```

当你退出小说模式并返回主游戏模式时，通常希望卸载 Naninovel 当前使用的所有资源并停止所有引擎服务。可通过调用 `IStateManager` 服务的 `ResetState()` 方法实现：

```csharp
var stateManager = Engine.GetService<IStateManager>();
await stateManager.ResetState();
```

### 剧本资源引用

如果你希望在自定义系统中引用 Naninovel 剧本资源（例如用于播放对白或过场动画），请注意不要直接存储剧本路径，因为路径依赖于文件位置和名称，容易失效。

推荐使用资源引用（GUID）。GUID 在文件移动或重命名后仍保持不变。可通过 `ScriptAssets.GetPath` 方法根据 GUID 解析剧本路径。Naninovel 还提供了内置的 `ScriptAssetRef` 属性绘制器，可直接在编辑器中将剧本资源分配给序列化字段，使用更方便。

以下示例来自 [integration 示例](/zh/guide/samples#integration)，该组件挂载于场景中的游戏对象上，当玩家与触发器碰撞时，将自动播放指定剧本：

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

在编辑器中，你可以直接将剧本资源拖放到 `Script Ref` 字段中，即使剧本文件被移动或重命名，引用仍将保持有效。

![](https://i.gyazo.com/cd634c628a0a116397f6ecef837a10b0.png)

## 禁用标题菜单

引擎初始化后，会自动显示内置的标题菜单，而你的项目中可能已拥有自定义标题界面。你可以通过 [UI 自定义功能](/zh/guide/user-interface#ui-customization) 修改、替换或完全移除内置标题菜单。该菜单在 UI 资源列表中对应 `Title UI` 项。

## 引擎对象层

你可以通过配置菜单指定引擎在创建所有对象（UI 相关除外）时使用的特定 [Layer](https://docs.unity3d.com/Manual/Layers.html)。

![](https://i.gyazo.com/8642fe37ddc45b8514b9f01d70277fbd.png)

此设置还会让引擎的摄像机应用相应的 [Culling Mask](https://docs.unity3d.com/ScriptReference/Camera-cullingMask.html)，仅渲染指定层上的对象。

若要更改引擎管理的 UI 对象的层，请在 UI 配置菜单中使用 `Objects Layer` 选项。

![](https://i.gyazo.com/56d863bef96bf72c1fed9ae646db4746.png)

## 渲染到纹理

你可以让引擎的摄像机渲染到自定义的 [Render Texture](https://docs.unity3d.com/ScriptReference/RenderTexture.html)，而不是直接渲染到屏幕上。只需在摄像机配置菜单中指定自定义摄像机预制体，即可修改包括渲染目标在内的摄像机相关设置。

![](https://i.gyazo.com/1b7116fa1bd170d3753b4cdbd27afcf3.png)

## 模式切换

根据项目需求不同，以下为一个抽象示例（基于前面提到的集成项目），演示如何通过自定义指令在“冒险模式”和“小说模式”之间进行切换。

::: code-group

```csharp [SwitchToNovelMode.cs]
[Alias("novel")]
public class SwitchToNovelMode : Command
{
    public StringParameter ScriptPath;
    public StringParameter Label;

    public override async UniTask Execute (ExecutionContext ctx)
    {
        // 1. 禁用角色控制。
        var controller = Object.FindAnyObjectByType<CharacterController3D>();
        controller.IsInputBlocked = true;

        // 2. 切换摄像机。
        var advCamera = GameObject.Find("AdvCamera").GetComponent<Camera>();
        advCamera.enabled = false;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = true;

        // 3. 加载并播放指定剧本（如果已分配）。
        if (Assigned(ScriptPath))
        {
            var scriptPlayer = Engine.GetService<IScriptPlayer>();
            await scriptPlayer.MainTrack.LoadAndPlayAtLabel(ScriptPath, Label);
        }

        // 4. 恢复 Naninovel 输入。
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.Muted = false;
    }
}
```

```csharp [SwitchToAdventureMode.cs]
[Alias("adventure")]
public class SwitchToAdventureMode : Command
{
    public override async UniTask Execute (ExecutionContext ctx)
    {
        // 1. 屏蔽 Naninovel 输入。
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

这些指令随后可在 Naninovel 剧本中使用：

```nani
; 切换到冒险模式。
@adventure
```

— 或直接在 C# 中调用（例如在 Unity 的 `OnTrigger` 事件中）：

```csharp
private void OnTriggerEnter (Collider other)
{
	var switchCommand = new SwitchToNovelMode { ScriptPath = "Script001" };
	switchCommand.Execute().Forget();
}
```

## 其他选项

Naninovel 还包含许多其他可用于系统集成的特性（如状态外部化、服务重写、自定义序列化、资源与配置提供器等），可根据需要选择使用。建议查阅本指南的其他章节以了解详细信息。同时，你也可以查看 [配置选项](/zh/guide/configuration)，其中某些功能虽然未在文档中详细说明，但在集成时可能非常有用。

如果你发现某些引擎 API 或系统在可扩展性方面不足，必须修改源代码才能集成，请 [联系支持](/support/#naninovel-support)，我们会考虑进行改进。

::: tip EXAMPLE
请参考 [integration 示例](/zh/guide/samples#integration)，该示例展示了 Naninovel 既作为 3D 冒险游戏中的对话系统使用，也可切换为独立小说模式。
:::
