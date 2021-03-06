# Engine Services

Most of the engine features are implemented via engine services. Engine service is an implementation of an `IEngineService` interface, which handles a specific job, like executing naninovel scripts, managing actors or saving-loading the game state.

In case you wish to interact with an engine system, you'll most likely want to use an engine service. You can get a reference to an engine service using `Engine.GetService<TService>()` static method, where `TService` is the interface of the service you wish to get; e.g., to get a `IScriptPlayer` service:

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```

::: note
The engine initialization procedure is asynchronous, so even when automatic initialization is enabled, engine APIs (eg, `GetService` method) may not be available right after Unity loads a scene (eg, in `Awake`, `Start` and `OnEnable` [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) methods); see [accessing engine API](/guide/integration-options.md#accessing-engine-api) guide for more info.
:::

The following services are currently available:

Service Interface | Description
--- | ---
IBackgroundManager | Manages [background](/guide/backgrounds.md) actors.
ICharacterManager | Manages [character](/guide/characters.md) actors.
IChoiceHandlerManager | Manages [choice handler](/guide/choices.md) actors.
ITextPrinterManager | Manages [text printer](/guide/text-printers.md) actors.
IAudioManager | Manages the audio: [SFX](/guide/audio.md#sound-effects), [BGM](/guide/audio.md#background-music) and [voicing](/guide/voicing.md).
IInputManager | Manages the user [input processing](/guide/input-processing.md).
ILocalizationManager| Manages the [localization](/guide/localization.md) activities.
ITextManager | Handles [managed text](/guide/managed-text.md) feature.
IMoviePlayer | Handles [movie](/guide/movies.md) playing.
IScriptManager | Manages [naninovel script](/guide/naninovel-scripts.md) resources.
IScriptPlayer | Handles [naninovel scripts](/guide/naninovel-scripts.md) execution.
ICameraManager | Manages cameras and other systems required for scene rendering.
IResourceProviderManager | Manages `IResourceProvider` objects.
IStateManager | Handles `IEngineService`-related persistent data de-/serialization; provides API to [save and load](/guide/save-load-system.md) game state.
IUIManager | Manages `IManagedUI` objects and handles [UI customization](/guide/user-interface.md#ui-customization) feature.
ICustomVariableManager | Provides access and allows modifying [custom variables](/guide/custom-variables.md). 
ISpawnManager | Manages objects spawned with [@spawn] commands.
IUnlockableManager | Manages [unlockable items](/guide/unlockable-items.md) (CG and movie gallery items, tips, etc).

You can find built-in implementations of the services in the runtime source code stored at `Naninovel/Runtime`.

## Adding Custom Services

To add a new custom engine service, implement `IEngineService` interface and add `InitializeAtRuntime` attribute to the implementing class. Instance of the implementation will automatically be created during the engine initialization and become available via `Engine.GetService<TService>()` API.

::: warn
When adding custom implementation types under a non-predefined assembly (via [assembly definitions](https://docs.unity3d.com/Manual/ScriptCompilationAssemblyDefinitionFiles.html)), add the assembly name to the `Type Assemblies` list found in the engine configuration menu. Otherwise, the engine won't be able to locate your custom types.
:::

You can force your custom service to be initialized before or after other services using `InitializationPriority` argument of `InitializeAtRuntime` attribute; lower values will push it before other services in the initialization queue and vice-versa.

In order to be automatically instantiated, service implementation should have a compatible constructor (or a default one). Following arguments (in any order) are allowed:
 
- Any number of other services (`IEngineService`-derived)
- Any number of configuration objects (`Configuration`-derived)
- A Unity's "MonoBehavior" proxy object (`IEngineBehaviour`-derived)

Be aware, that it's not safe to use other services in the constructor. Instead, perform any initialization activities that require using other services at `InitializeServiceAsync` method; to make sure required services are initialized when you're accessing them, list them in the service constructor (initialization queue is topologically sorted based on the constructor arguments).

In case your custom service has a persistent state, which you wish to de-/serialize with other engine services, implement `IStatefulService<TState>` interface, where `TState` is either `GameStateMap`, `GlobalStateMap` or `SettingsStateMap` depending if you want to store the state with the game sessions-specific, global state or settings. It's allowed to implement all three interfaces for a single service if required. For more information on different types of engine state see [state management guide](/guide/state-management.md).

Below is an example of a custom engine service implementation with some usage notices.

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
        // The services are potentially not yet initialized here, 
        // refrain from using them.
        this.inputManager = inputManager;
        this.scriptPlayer = scriptPlayer;
    }

    public UniTask InitializeServiceAsync ()
    {
    	// Initialize the service here.
        // It's now safe to use services requested in the constructor.
        Debug.Log(inputManager.ProcessInput);
        Debug.Log(scriptPlayer.PlayedScript);
        return UniTask.CompletedTask;
    }

    public void ResetService ()
    {
        // Reset service state here.
    }

    public void DestroyService ()
    {
        // Stop the service and release any used resources here.
    }
}
```

Given the aforementioned service, you can get via the engine API in the following way:

```csharp
var customService = Engine.GetService<CustomService>();
```

::: example
Another example of adding a custom engine service to manage item resources and configuration of an inventory UI can be found in the [inventory example project on GitHub](https://github.com/Naninovel/Inventory).

Specifically, the custom engine service is implemented via [InventoryManager.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/InventoryManager.cs) runtime script.
:::

## Overriding Built-in Services

All the built-in services are referenced via interfaces in the engine source code, making it possible to swap any of them with a custom implementation.

Add a custom service in the same way as described above, but instead of `IEngineService` implement a concrete engine interface and specify the overridden type (implementation type, not the interface) via `InitializeAtRuntime` attribute. Your custom implementation will then be initialized instead of the built-in one.

Below is an example of a dummy `IInputManager` implementation, that does nothing, but logs when any of its methods are invoked.

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
Now, when an input manager is requested via `Engine.GetService<IInputManager>()`, your custom implementation will be provided instead of the built-in `Naninovel.InputManager`.
