# Engine Architecture

The engine is designed with the following principles in mind: **scene independence** and **service-orientation**.

## Scene Independent

While Unity design promotes using scenes and prefabs composition, it's not very practical when developing visual novels. Naninovel systems are either not directly bound to a [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) or attached to a [persistent](https://docs.unity3d.com/ScriptReference/Object.DontDestroyOnLoad.html) root [GameObject](https://docs.unity3d.com/ScriptReference/GameObject.html).

![](https://i.gyazo.com/6802b8c4bce20ca158bb757d12ef6c1a.png)

The following root objects are used, depending on the environment:
- `Naninovel<Runtime>` for runtime (builds and editor Play mode);
- `Naninovel<Editor>` for editor (outside of Play mode).

All required game objects are created on engine initialization, which runs automatically and asynchronously when the application starts (right after entering Play mode or running a build) via a [RuntimeInitializeOnLoadMethod](https://docs.unity3d.com/ScriptReference/RuntimeInitializeOnLoadMethodAttribute.html) method. To customize the initialization scenario, see the [manual initialization guide](/guide/integration-options#manual-initialization).

::: info NOTE
If the scene-independent design doesn't work for your project, disable the `Scene Independent` option in the engine configuration menu. All Naninovel-related objects will then become part of the active Unity scene and will be destroyed when the scene is unloaded.
:::

## Service-Oriented

Most of the engine features are implemented via engine services. An engine service is an implementation of the `IEngineService` interface that handles a specific job, such as executing scenario scripts, managing actors, or saving and loading the game state.

If you need to interact with an engine system, you will usually use an engine service. You can get a reference to a service using the static method `Engine.GetService<TService>()`, where `TService` is the interface type of the service you want; for example, to get an `IScriptPlayer` service:

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```
You can find a list of all currently available engine services and information on how to override or add custom ones in the [engine services guide](/guide/engine-services).

## High-Level Concept

The following UML diagram illustrates a high-level concept of the engine architecture. Note that all the class and interface names in the diagram are organized under the `Naninovel` namespace. For example, to reference the `Engine` class, use `Naninovel.Engine` or [include the namespace](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/namespaces/using-namespaces).

<object class="engine-design-dark" data="/assets/img/engine-design-dark.svg" type="image/svg+xml"></object>
<object class="engine-design-light" data="/assets/img/engine-design-light.svg" type="image/svg+xml"></object>
