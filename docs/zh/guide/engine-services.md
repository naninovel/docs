# 引擎服务

大多数引擎功能都是通过引擎服务实现的。引擎服务是IEngineService接口的实现，该接口会处理特定的功能，例如执行naninovel脚本，管理演出元素或保存加载游戏状态。


如果你想和引擎系统交互，大概率你是想使用某个引擎服务。你可以通过静态方法`Engine.GetService<TService>()`来获得相关引擎服务参考， `TService` 指你想要获取到的服务，比如，获取`IScriptPlayer` 服务：

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```

当前提供以下服务：

服务接口 | 描述
--- | ---
IBackgroundManager | 管理 [背景](/zh/guide/backgrounds) 元素。
ICharacterManager | 管理 [角色](/zh/guide/characters) 元素。
IChoiceHandlerManager | 管理 [选择处理器](/zh/guide/choices) 元素。
ITextPrinterManager | 管理 [文本打字机](/zh/guide/text-printers) 元素。
IAudioManager | 管理音频: [音效](/zh/guide/audio#音效) ， [背景音乐](/zh/guide/audio#背景音乐) 和 [语音](/zh/guide/voicing) 。
IInputManager | 管理[输入操作](/zh/guide/input-processing) 。
ILocalizationManager| 管理[本地化](/zh/guide/localization) 。
ITextManager | 处理[托管文本](/zh/guide/managed-text) 特性。
IMoviePlayer | 处理 [影片](/zh/guide/movies) 播放。
IScriptManager | 管理 [naninovel脚本](/zh/guide/naninovel-scripts) 资源。
IScriptPlayer | 处理[naninovel脚本](/zh/guide/naninovel-scripts) 执行。
ICameraManager | 管理场景渲染所需的相机和其他系统。
IResourceProviderManager | 管理 `IResourceProvider` 物体.
IStateManager | 处理 `IEngineService` 相关持久化数据的，序列化和反序列化；及用于[保存加载](/zh/guide/save-load-system) 游戏的API。
IUIManager | 管理 `IManagedUI` 物体和处理[自定义UI](/zh/guide/user-interface#UI自定义) 特性。
ICustomVariableManager | 提供访问权限并允许修改[自定义变量](/zh/guide/custom-variables).
ISpawnManager | 使用 [@spawn] 命令生成的对象。
IUnlockableManager | 管理 [可解锁项目](/zh/guide/unlockable-items) （CG和 影片，画廊，提示等）。

你可以在`Naninovel/Runtime`内运行时代码中找到内置的服务实现。

## 添加自定义服务

要添加新的自定义引擎服务，请实现 `IEngineService` 接口并将`InitializeAtRuntime`属性添加到实现类。实现的实例将在引擎初始化期间自动创建，并可以通过 `Engine.GetService<TService>()` 使用。

你可以使用`InitializeAtRuntime`特性的 `InitializationPriority` 优先级设定来强制设置你的自定义服务的初始化顺序。越低数值会处于序列化队列的越前面，反之越大值则越置后。

为了自动实例化，服务实现应具有兼容的构造函数（或默认构造函数）。可使用以下参数（以任何顺序）：

- 任意数量的其他服务（`IEngineService`派生）
- 任意数量的配置对象（`Configuration`派生）
- Unity的“ MonoBehavior”代理对象（`IEngineBehaviour`派生）

请注意，在构造函数中使用其他服务并不安全。相反，执行相关初始化操作所需服务须在 `InitializeServiceAsync` 方法中调用；为了确保在访问所需服务时已对其进行了初始化，请在服务构造函数中罗列（初始化队列将按构造函数参数拓扑排序）。

如果你的自定义服务使用持久化处理，希望和其他服务一起做序列化和反序列化，继承`IStatefulService<TState>` 接口，`TState`是`GameStateMap`，`GlobalStateMap` ，`SettingsStateMap` 三者之一，取决于你的服务所属种类，游戏状态，全局状态，设置状态。如果必要可以在一个服务中继承三个状态接口。更多相关信息参考[状态管理](/guide/state-management)。

以下是带有一些使用注意事项的自定义引擎服务实现的示例。

```csharp
using Naninovel;
using UniRx.Async;
using UnityEngine;

[InitializeAtRuntime]
public class CustomService : IEngineService
{
    private readonly InputManager inputManager;
    private readonly ScriptPlayer scriptPlayer;

    public CustomService (InputManager inputManager, ScriptPlayer scriptPlayer)
    {
        // 服务现在仍未被初始化，
        // 还不能使用
        this.inputManager = inputManager;
        this.scriptPlayer = scriptPlayer;
    }

    public UniTask InitializeServiceAsync ()
    {
    	// 在此初始化服务
        // 现在可以安全调用构造所需服务
        Debug.Log(inputManager.ProcessInput);
        Debug.Log(scriptPlayer.PlayedScript);
        return UniTask.CompletedTask;
    }

    public void ResetService ()
    {
        // 重置服务状态
    }

    public void DestroyService ()
    {
        // 停止服务并释放所有使用过的资源
    }
}
```

有了上述服务，您可以通过以下方式通过引擎API获取：

```csharp
var customService = Engine.GetService<CustomService>();
```

::: tip EXAMPLE
在[GitHub的背包示例项目](https://github.com/Naninovel/Inventory) 中，可以找到添加自定义引擎服务以管理背包UI配置和资源的相关示例。

具体来说，这个示例的定制引擎服务是通过[InventoryManager.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/InventoryManager.cs) 运行时脚本实现的。
:::

## 覆盖内置服务

所有内置服务都是通过引擎源代码中的接口引用的，从而可以通过自定义实现交换任何内置服务。


以与上述相同的方式添加自定义服务，但不是`IEngineService` 实现具体的引擎接口，而是通过`InitializeAtRuntime` 属性指定重写的类型（实现类型，而不是接口）。之后引擎就会将初始化您的自定义服务，而不是内置的服务。

下面是一个虚拟 `IInputManager` 实现的示例，不执行任何操作，但会在调用其任何方法时输出信息。

```csharp
using Naninovel;
using Naninovel.UI;
using UniRx.Async;
using UnityEngine;

[InitializeAtRuntime(@override: typeof(InputManager))]
public class CustomInputManager : IInputManager
{
    public InputConfiguration Configuration { get; }
    public bool ProcessInput { get; set; }

    public CustomInputManager (InputConfiguration config)
    {
        Configuration = config;
    }

    public UniTask InitializeServiceAsync ()
    {
        Debug.Log("CustomInputManager::InitializeServiceAsync()");
        return UniTask.CompletedTask;
    }

    public void ResetService ()
    {
        Debug.Log("CustomInputManager::ResetService()");
    }

    public void DestroyService ()
    {
        Debug.Log("CustomInputManager::DestroyService()");
    }

    public IInputSampler GetSampler (string bindingName)
    {
        Debug.Log($"CustomInputManager::GetSampler({bindingName})");
        return default;
    }

    public void AddBlockingUI (IManagedUI ui, params string[] allowedSamplers)
    {
        Debug.Log($"CustomInputManager::AddBlockingUI({ui.GetType().Name})");
    }

    public void RemoveBlockingUI (IManagedUI ui)
    {
        Debug.Log($"CustomInputManager::RemoveBlockingUI({ui.GetType().Name})");
    }
}
```
现在，当通过`Engine.GetService<IInputManager>()`请求输入管理器时，就会提供你的自定义实现而非内置`Naninovel.InputManager`。
