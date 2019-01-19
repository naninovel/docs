# Engine Architecture

The engine is designed with the following principles in mind: **scene independence** and **service-orientation**.

## Scene Independent

While Unity design promotes using scenes and prefabs composition, it's not very practical when developing visual novels. 

All the Naninovel systems either not directly bound to a [MonoBehaviour]( https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) or attached to a [persistent]( https://docs.unity3d.com/ScriptReference/Object.DontDestroyOnLoad.html) root [GameObject]( https://docs.unity3d.com/ScriptReference/GameObject.html).

![](https://i.gyazo.com/9805e2ce450bc486a007cdc001f8ae13.png)

The following root objects are used, depending on the environment:
- `Naninovel<Runtime>` for runtime (builds and editor play mode);
- `Naninovel<Editor>` for editor (outside of play mode).

All the required gameobjects are created on engine initialization, which is executed automatically and asynchronously when the application starts (right after entering play mode or running a build) via a [RuntimeInitializeOnLoadMethod]( https://docs.unity3d.com/ScriptReference/RuntimeInitializeOnLoadMethodAttribute.html) method. You can change this behavior by disabling `Initialize On Application Load` property in the engine configuration and manually invoking the initialization using `Naninovel.RuntimeInitializer` (for runtime) or `Naninovel.EditorInitializer` (for editor) classes.

![](https://i.gyazo.com/e7b301265e72ab0b53162a746be2aff2.png)

As the initialization process is asynchronous, either use [async-await approach](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/) when invoking the `InitializeAsync()` method or subscribe to the static `Naninovel.Engine.OnInitialized` event.

To completely disable and remove from memory all the engine systems, use `Naninovel.Engine.Destroy()` static method.

## Service-Oriented

Most of the engine features are implemented via engine services. Engine service is an implementation of an `IEngineService` interface, which handles a specific job, like executing novel scripts, managing actors or saving-loading the game state.

In case you wish to interact with an engine system, you'll most likely want to use an engine service. You can get a reference to an engine service using `Naninovel.Engine.GetService<TService>()` static method, where `TService` is the type of service you wish to reference; e.g., to get a `NovelScriptPlayer` service:

```csharp
var player = Naninovel.Engine.GetService<NovelScriptPlayer>();
player.Stop();
```

You can find the list of all the currently available engine services in the ["Engine Services" guide](/guide/engine-services.md).

## High-Level Concept

The following UML diagram illustrates a high-level concept of the engine architecture. Note that all the class and interface names in the diagram are organized under `Naninovel` namespace. Eg, to reference an `Engine` class, use `Naninovel.Engine`.

<object style="width:100%; max-width:699px" data="/engine-design.svg" type="image/svg+xml"></object>
