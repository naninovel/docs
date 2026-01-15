# Engine Services

Most of the engine features are implemented via engine services. An engine service is an implementation of an `IEngineService` interface, which handles a specific job, like executing scenario scripts, managing actors, or saving and loading the game state.

If you wish to interact with an engine system, you'll most likely use an engine service. You can get a reference to an engine service using the static method `Engine.GetService<TService>()`, where `TService` is the interface of the service you wish to get; e.g., to get an `IScriptPlayer` service:

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```

::: info NOTE
The engine initialization procedure is asynchronous, so even when automatic initialization is enabled, engine APIs (e.g., `GetService` method) may not be available right after Unity loads a scene (e.g., in `Awake`, `Start`, and `OnEnable` [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) methods); see [accessing engine API](/guide/integration-options#accessing-engine-api) guide for more info.
:::

The following services are currently available:

| Service Interface        | Description                                                                                                                              |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| IBackgroundManager       | Manages [background](/guide/backgrounds) actors.                                                                                         |
| ICharacterManager        | Manages [character](/guide/characters) actors.                                                                                           |
| IChoiceHandlerManager    | Manages [choice handler](/guide/choices) actors.                                                                                         |
| ITextPrinterManager      | Manages [text printer](/guide/text-printers) actors.                                                                                     |
| IAudioManager            | Manages the audio: [SFX](/guide/audio#sound-effects), [BGM](/guide/audio#background-music), and [voicing](/guide/voicing).                |
| IInputManager            | Manages the user [input processing](/guide/input-processing).                                                                            |
| ILocalizationManager     | Manages the [localization](/guide/localization) activities.                                                                              |
| ITextManager             | Handles [managed text](/guide/managed-text) feature.                                                                                     |
| IMoviePlayer             | Handles [movie](/api/#movie) playing.                                                                                                    |
| IScriptManager           | Manages [scenario script](/guide/scenario-scripting) resources.                                                                          |
| IScriptPlayer            | Handles [scenario scripts](/guide/scenario-scripting) execution.                                                                         |
| ICameraManager           | Manages cameras and other systems required for scene rendering.                                                                          |
| IResourceProviderManager | Manages `IResourceProvider` objects.                                                                                                     |
| IStateManager            | Handles `IEngineService`-related persistent data de-/serialization; provides API to [save and load](/api/#save) game state. |
| IUIManager               | Manages `IManagedUI` objects and handles [UI customization](/guide/gui#ui-customization) feature.                                        |
| ICustomVariableManager   | Provides access and allows modifying [custom variables](/guide/custom-variables).                                                        |
| ISpawnManager            | Manages objects spawned with [@spawn] commands.                                                                                          |
| IUnlockableManager       | Manages [unlockable items](/guide/unlockable-items) (CG and movie gallery items, tips, etc.).                                             |

You can find built-in implementations of the services in the runtime source code stored at `Naninovel/Runtime`.

## Adding Custom Services

To add a new custom engine service, implement the `IEngineService` interface and add the `InitializeAtRuntime` attribute to the implementing class. An instance of the implementation will automatically be created during engine initialization and become available via the `Engine.GetService<TService>()` API.

You can force your custom service to be initialized before or after other services using the `InitializationPriority` argument of the `InitializeAtRuntime` attribute; lower values will push it before other services in the initialization queue and vice versa.

To be automatically instantiated, a service implementation should have a compatible constructor (or a default one). The following constructor arguments (in any order) are allowed:

- Any number of other services (`IEngineService`-derived)
- Any number of configuration objects (`Configuration`-derived)
- A Unity `MonoBehaviour` proxy object (`IEngineBehaviour`-derived)

Be aware that it's not safe to use other services in the constructor. Instead, perform any initialization activities that require other services in the `InitializeService` method; to make sure required services are initialized when you're accessing them, list them in the service constructor (the initialization queue is topologically sorted based on constructor arguments).

If your custom service has a persistent state that you wish to de-/serialize with other engine services, implement the `IStatefulService<TState>` interface, where `TState` is either `GameStateMap`, `GlobalStateMap`, or `SettingsStateMap` depending on whether you want to store the state with game-session-specific, global, or settings data. It's allowed to implement all three interfaces for a single service if required. For more information on different types of engine state see the [state management guide](/guide/state-management).

Below is an example of a custom engine service implementation with some usage notes.

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
        // The services are potentially not yet initialized here,
        // refrain from using them.
        this.inputManager = inputManager;
        this.scriptPlayer = scriptPlayer;
    }

    public Awaitable InitializeService ()
    {
        // Initialize the service here.
        // It's now safe to use services requested in the constructor.
        Debug.Log(inputManager.ProcessInput);
        Debug.Log(scriptPlayer.PlayedScript);
        return Async.Completed;
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

You can now access the aforementioned custom service in the following way:

```csharp
var customService = Engine.GetService<CustomService>();
```

::: tip EXAMPLE
Another example of adding a custom engine service to manage item resources and configuration of an inventory UI can be found in the [inventory sample](/guide/samples#inventory). Specifically, the custom engine service is implemented via `Scripts/Runtime/Inventory/InventoryManager.cs` runtime script.
:::

## Overriding Built-in Services

All the built-in services are referenced via interfaces in the engine source code, making it possible to swap any of them with a custom implementation.

Add a custom service in the same way as described above, but instead of `IEngineService` implement a concrete engine interface and specify the overridden type (implementation type, not the interface) via the `InitializeAtRuntime` attribute. Your custom implementation will then be initialized instead of the built-in one.

Below is an example of a dummy `IInputManager` implementation that does nothing but logs when any of its methods are invoked.

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

    // Etc...
}
```

Now, when an input manager is requested via `Engine.GetService<IInputManager>()`, your custom implementation will be used instead of the built-in `Naninovel.InputManager`.
