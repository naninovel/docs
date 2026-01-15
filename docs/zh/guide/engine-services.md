# 引擎服务

大多数引擎功能都是通过引擎服务实现的。引擎服务是 `IEngineService` 接口的实现，用于处理特定工作，例如执行剧本脚本、管理 actor 或保存和加载游戏状态。

如果您希望与引擎系统交互，您很可能会使用引擎服务。您可以使用静态方法 `Engine.GetService<TService>()` 获取对引擎服务的引用，其中 `TService` 是您希望获取的服务的接口；例如，要获取 `IScriptPlayer` 服务：

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```

::: info NOTE
引擎初始化过程是异步的，因此即使启用了自动初始化，在 Unity 加载场景后（例如，在 `Awake`、`Start` 和 `OnEnable` [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) 方法中），引擎 API（例如 `GetService` 方法）也可能无法立即可用；有关更多信息，请参阅 [访问引擎 API](/zh/guide/integration-options#访问引擎-api) 指南。
:::

目前提供以下服务：

| 服务接口 | 描述 |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| IBackgroundManager | 管理 [背景](/zh/guide/backgrounds) actor。 |
| ICharacterManager | 管理 [角色](/zh/guide/characters) actor。 |
| IChoiceHandlerManager | 管理 [选项处理程序](/zh/guide/choices) actor。 |
| ITextPrinterManager | 管理 [文本打印机](/zh/guide/text-printers) actor。 |
| IAudioManager | 管理音频：[SFX](/zh/guide/audio#声音效果)、[BGM](/zh/guide/audio#背景音乐) 和 [配音](/zh/guide/voicing)。 |
| IInputManager | 管理用户 [输入处理](/zh/guide/input-processing)。 |
| ILocalizationManager | 管理 [本地化](/zh/guide/localization) 活动。 |
| ITextManager | 处理 [管理文本](/zh/guide/managed-text) 功能。 |
| IMoviePlayer | 处理 [电影](/zh/api/#movie) 播放。 |
| IScriptManager | 管理 [剧本脚本](/zh/guide/scenario-scripting) 资源。 |
| IScriptPlayer | 处理 [剧本脚本](/zh/guide/scenario-scripting) 执行。 |
| ICameraManager | 管理场景渲染所需的相机和其他系统。 |
| IResourceProviderManager | 管理 `IResourceProvider` 对象。 |
| IStateManager | 处理 `IEngineService` 相关的持久数据反序列化/序列化；提供 [保存和加载](/zh/api/#save) 游戏状态的 API。 |
| IUIManager | 管理 `IManagedUI` 对象并处理 [UI 自定义](/zh/guide/gui#ui-自定义) 功能。 |
| ICustomVariableManager | 提供访问并允许修改 [自定义变量](/zh/guide/custom-variables)。 |
| ISpawnManager | 管理使用 [@spawn] 命令生成的对象。 |
| IUnlockableManager | 管理 [可解锁项](/zh/guide/unlockable-items)（CG 和电影画廊项目、提示等）。 |

您可以在 `Naninovel/Runtime` 处存储的运行时源代码中找到服务的内置实现。

## 添加自定义服务

要添加新的自定义引擎服务，请实现 `IEngineService` 接口并将 `InitializeAtRuntime` 属性添加到实现类。在引擎初始化期间将自动创建实现的实例，并可通过 `Engine.GetService<TService>()` API 使用。

您可以使用 `InitializeAtRuntime` 属性的 `InitializationPriority` 参数强制您的自定义服务在其他服务之前或之后初始化；较低的值会将其推送到初始化队列中的其他服务之前，反之亦然。

要自动实例化，服务实现应具有兼容的构造函数（或默认构造函数）。允许以下构造函数参数（任意顺序）：

- 任意数量的其他服务（`IEngineService` 派生）
- 任意数量的配置对象（`Configuration` 派生）
- Unity `MonoBehaviour` 代理对象（`IEngineBehaviour` 派生）

请注意，在构造函数中使用其他服务是不安全的。相反，在 `InitializeService` 方法中执行任何需要其他服务的初始化活动；为确保在访问所需服务时已初始化它们，请在服务构造函数中列出它们（初始化队列根据构造函数参数按拓扑排序）。

如果您的自定义服务具有希望与其他引擎服务一起反序列化/序列化的持久状态，请实现 `IStatefulService<TState>` 接口，其中 `TState` 是 `GameStateMap`、`GlobalStateMap` 或 `SettingsStateMap`，具体取决于您是要将状态与特定于游戏会话、全局还是设置数据一起存储。如果需要，允许为单个服务实现所有三个接口。有关不同类型的引擎状态的更多信息，请参阅 [状态管理指南](/zh/guide/state-management)。

下面是带有使用说明的自定义引擎服务实现示例。

```csharp
using Naninovel;
using UnityEngine;

[InitializeAtRuntime]
public class CustomService : IEngineService
{
    private readonly InputManager inputManager;
    private readonly ScriptPlayer scriptPlayer;

    public CustomService (InputManager inputManager, ScriptPlayer scriptPlayer)
    {
        // 服务可能尚未在此处初始化，
        // 请避免使用它们。
        this.inputManager = inputManager;
        this.scriptPlayer = scriptPlayer;
    }

    public Awaitable InitializeService ()
    {
        // 在此处初始化服务。
        // 现在可以安全地使用构造函数中请求的服务。
        Debug.Log(inputManager.ProcessInput);
        Debug.Log(scriptPlayer.PlayedScript);
        return Async.Completed;
    }

    public void ResetService ()
    {
        // 在此处重置服务状态。
    }

    public void DestroyService ()
    {
        // 在此处停止服务并释放任何使用的资源。
    }
}
```

您现在可以通过以下方式访问上述自定义服务：

```csharp
var customService = Engine.GetService<CustomService>();
```

::: tip EXAMPLE
在 [库存示例](/zh/guide/samples#库存-inventory) 中可以找到添加自定义引擎服务以管理项目资源和库存 UI 配置的另一个示例。具体来说，自定义引擎服务通过 `Scripts/Runtime/Inventory/InventoryManager.cs` 运行时脚本实现。
:::

## 覆盖内置服务

所有内置服务都在引擎源代码中通过接口引用，这使得可以将其中任何一个替换为自定义实现。

以与上述相同的方式添加自定义服务，但不要实现 `IEngineService`，而是实现具体的引擎接口并通过 `InitializeAtRuntime` 属性指定被覆盖的类型（实现类型，而不是接口）。然后将初始化您的自定义实现而不是内置实现。

下面是一个虚拟 `IInputManager` 实现的示例，除了在其任何方法被调用时记录日志外，它什么也不做。

```csharp
using Naninovel;
using UnityEngine;

[InitializeAtRuntime(@override: typeof(InputManager))]
public class CustomInputManager : IInputManager
{
    public InputConfiguration Configuration { get; }

    public CustomInputManager (InputConfiguration config)
    {
        Configuration = config;
    }

    public void AddMuter (object muter, IEnumerable<string> allowedIds = null)
    {
        Debug.Log("CustomInputManager::AddMuter()");
    }

    public void RemoveMuter (object muter)
    {
        Debug.Log("CustomInputManager::RemoveMuter()");
    }

    // 等等...
}
```

现在，当通过 `Engine.GetService<IInputManager>()` 请求输入管理器时，将使用您的自定义实现而不是内置的 `Naninovel.InputManager`。
