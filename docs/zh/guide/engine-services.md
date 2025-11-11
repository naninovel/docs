# 引擎服务

大多数引擎功能都是通过引擎服务实现的。引擎服务是一个实现了 `IEngineService` 接口的模块，用于处理特定的任务，例如执行 Naninovel 脚本、管理演出元素（Actors）或保存与加载游戏状态。

当你希望与引擎系统交互时，通常需要使用引擎服务。你可以通过 `Engine.GetService<TService>()` 静态方法获取服务引用，其中 `TService` 是你想获取的服务接口。例如，要获取 `IScriptPlayer` 服务：

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```

::: info 注意
引擎初始化过程是异步的，因此即使启用了自动初始化，在 Unity 加载场景后（例如在 `Awake`、`Start` 或 `OnEnable` [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) 方法中），引擎 API（例如 `GetService` 方法）也可能尚不可用。请参阅 [访问引擎 API](/zh/guide/integration-options#accessing-engine-api) 指南了解更多信息。
:::

当前可用的服务如下：

服务接口 | 解释
--- | ---
IBackgroundManager | 管理 [背景](/zh/guide/backgrounds) 演出元素。
ICharacterManager | 管理 [角色](/zh/guide/characters) 演出元素。
IChoiceHandlerManager | 管理 [选项](/zh/guide/choices) 演出元素。
ITextPrinterManager | 管理 [文本展示窗](/zh/guide/text-printers) 演出元素。
IAudioManager | 管理音频: [音效](/zh/guide/audio#sound-effects), [背景音乐](/zh/guide/audio#background-music) 以及 [语音](/zh/guide/voicing)。
IInputManager | 管理玩家的 [输入处理](/zh/guide/input-processing)。
ILocalizationManager| 管理 [本地化](/zh/guide/localization) 活动。
ITextManager | 处理 [受管文本](/zh/guide/managed-text) 功能。
IMoviePlayer | 处理 [视频](/zh/guide/movies) 播放。
IScriptManager | 管理 [naninovel 脚本](/zh/guide/naninovel-scripts) 资源。
IScriptPlayer | 处理 [naninovel 脚本](/zh/guide/naninovel-scripts) 执行。
ICameraManager | 管理场景渲染所需的摄像机及其他相关系统。
IResourceProviderManager | 管理 `IResourceProvider` 对象。  
IStateManager | 处理与 `IEngineService` 相关的持久化数据序列化与反序列化；提供用于[保存与加载](/zh/guide/save-load-system)游戏状态的 API。  
IUIManager | 管理 `IManagedUI` 对象，并负责 [UI 自定义](/zh/guide/user-interface#ui-customization) 功能。  
ICustomVariableManager | 提供访问并允许修改[自定义变量](/zh/guide/custom-variables)的接口。  
ISpawnManager | 管理通过 [@spawn] 指令生成的对象。  
IUnlockableManager | 管理[可解锁物品](/zh/guide/unlockable-items)（如 CG 与影片画廊项目、词条提示等）。

你可以在 `Naninovel/Runtime` 目录中找到这些服务的内置实现。


## 添加自定义服务

要添加一个新的自定义引擎服务，请实现 `IEngineService` 接口，并在实现类上添加 `InitializeAtRuntime` 特性。在引擎初始化期间，该服务实例会自动创建，并可通过 `Engine.GetService<TService>()` API 获取。

你可以通过在 `InitializeAtRuntime` 特性中设置 `InitializationPriority` 参数来控制自定义服务的初始化顺序；数值越小，该服务会越早在初始化队列中被创建，反之亦然。

要使服务能被自动实例化，实现类的构造函数必须兼容。构造函数可包含以下任意参数（顺序不限）：

- 任意数量的其他服务（继承自 `IEngineService`）  
- 任意数量的配置对象（继承自 `Configuration`）  
- 一个 Unity 的 “MonoBehaviour” 代理对象（继承自 `IEngineBehaviour`）

请注意：**不要在构造函数中直接调用其他服务。** 如果需要在初始化时使用其他服务，请在 `InitializeService` 方法中执行。为确保依赖服务已初始化，请将它们列入服务构造函数参数中，引擎会根据依赖关系自动进行拓扑排序，按顺序初始化。

如果你的自定义服务具有持久化状态，并希望它与其他引擎服务一起序列化或反序列化，请实现 `IStatefulService<TState>` 接口，其中 `TState` 可以是以下之一：

- `GameStateMap` —— 用于与游戏会话绑定的状态  
- `GlobalStateMap` —— 用于全局状态  
- `SettingsStateMap` —— 用于设置数据  

如有需要，单个服务可以同时实现多个状态接口。关于不同类型的引擎状态的详细信息，请参阅 [状态管理指南](/zh/guide/state-management)。

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
        // 此处的服务可能尚未初始化，请避免在这里使用它们。
        this.inputManager = inputManager;
        this.scriptPlayer = scriptPlayer;
    }

    public UniTask InitializeService ()
    {
        // 在此处初始化服务。
        // 现在可以安全地使用在构造函数中请求的服务。
        Debug.Log(inputManager.ProcessInput);
        Debug.Log(scriptPlayer.PlayedScript);
        return UniTask.CompletedTask;
    }

    public void ResetService ()
    {
        // 在此处重置服务状态。
    }

    public void DestroyService ()
    {
        // 在此处停止服务并释放所占用的资源。
    }
}
```

下面是一个自定义引擎服务的实现示例及相关注意事项。

```csharp
var customService = Engine.GetService<CustomService>();
```

::: tip 示例
另一个关于添加自定义引擎服务的示例，可参考 [物品栏示例](/zh/guide/samples#inventory)。该示例展示了如何创建一个自定义引擎服务来管理物品资源和库存 UI 配置。具体实现位于运行时脚本 `Scripts/Runtime/Inventory/InventoryManager.cs`。
:::

## 覆盖内置服务

所有内置服务在引擎源代码中均通过接口引用，因此可以用自定义实现来替换它们。

添加自定义服务的方法与上文相同，但这次不要仅实现 `IEngineService` 接口，而是实现某个具体的引擎接口，并在 `InitializeAtRuntime` 特性中指定要覆盖的类型（注意，是实现类型，而不是接口）。这样，引擎初始化时就会加载你的自定义实现，并替代内置版本。

以下示例展示了一个虚拟的 `IInputManager` 实现：该实现不会执行任何实际操作，只是在调用其方法时输出日志。

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

    // 省略...
}
```
当通过 `Engine.GetService<IInputManager>()` 获取输入管理器时，引擎将使用你的自定义实现来替代内置的 `Naninovel.InputManager`。
