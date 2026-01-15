# Engine Architecture

The engine is designed with the following principles in mind: **scene independence** and **service-orientation**.

## Scene Independent

While Unity design promotes using scenes and prefabs composition, it's not very practical when developing visual novels. Naninovel systems either not directly bound to a [MonoBehaviour]( https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) or attached to a [persistent](https://docs.unity3d.com/ScriptReference/Object.DontDestroyOnLoad.html) root [GameObject]( https://docs.unity3d.com/ScriptReference/GameObject.html).

![](https://i.gyazo.com/6802b8c4bce20ca158bb757d12ef6c1a.png)

The following root objects are used, depending on the environment:
- `Naninovel<Runtime>` for runtime (builds and editor play mode);
- `Naninovel<Editor>` for editor (outside of play mode).

All the required game objects are created on engine initialization, which is executed automatically and asynchronously when the application starts (right after entering play mode or running a build) via a [RuntimeInitializeOnLoadMethod]( https://docs.unity3d.com/ScriptReference/RuntimeInitializeOnLoadMethodAttribute.html) method. To customize the initialization scenario, see [manual initialization guide](/guide/integration-options#manual-initialization).

::: info NOTE
In case the scene independent design is not working for you, just disable `Scene Independent` option in the engine configuration menu and all the Naninovel-related objects will become part of the Unity scene where the engine was initialized and will be destroyed when the scene is unloaded.
:::

## Service-Oriented

Most of the engine features are implemented via engine services. Engine service is an implementation of an `IEngineService` interface, which handles a specific job, like executing scenario scripts, managing actors or saving-loading the game state.

In case you wish to interact with an engine system, you'll most likely want to use an engine service. You can get a reference to an engine service using `Engine.GetService<TService>()` static method, where `TService` is the type (interface) of service you wish to reference; e.g., to get a `IScriptPlayer` service:

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```
You can find list of all the currently available engine services and information on how to override/add custom ones in the [engine services guide](/guide/engine-services).

## High-Level Concept

The following UML diagram illustrates a high-level concept of the engine architecture. Note that all the class and interface names in the diagram are organized under `Naninovel` namespace. Eg, to reference `Engine` class, use `Naninovel.Engine` or [include the namespace](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/namespaces/using-namespaces).

<object class="engine-design-dark" data="/assets/img/engine-design-dark.svg" type="image/svg+xml"></object>
<object class="engine-design-light" data="/assets/img/engine-design-light.svg" type="image/svg+xml"></object>
