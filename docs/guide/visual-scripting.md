# Visual Scripting

[Visual scripting](https://docs.unity3d.com/Packages/com.unity.visualscripting@latest) (previously known as Bolt) is a built-in package bundled by default with Unity 2021 and newer version. It enables you to create logic for games or applications with unit-based graphs that both programmers and non-programmers can use without writing code.

![](https://i.gyazo.com/ab7c9d92b32810b030aba24b4bd95405.jpg)

## Setup

First, make sure you're using a compatible Unity version (2021.2 or newer) and `Visual Scripting` package is installed in the package manager.

![](https://i.gyazo.com/885ebb9808b369c30dfcaab19b0cee2f.png)

Add `Elringus.Naninovel.Runtime` library to the `Node Library` list found in "Visual Scripting" project settings menu. This is required to expose engine types and APIs to the visual scripting graphs.

![](https://i.gyazo.com/38afd2ea477fcf0921114e3847de6c85.png)

The Visual Scripting doesn't automatically expose all the available types in the libraries, so we additionally need to add the required Naninovel types to the `Type Options` list found in the same settings menu. In the example below we added `Engine` and `Script Player Interface`, but you'll probably need more types, like the other [engine service interfaces](/guide/engine-services.md), configurations, etc.

![](https://i.gyazo.com/2e416a015d980cbedfa49d1589505e17.png)

Don't forget to regenerate units after adding the libraries and types to apply the changes.

![](https://i.gyazo.com/26c7bee4798b690c4eb362ec39746dc7.png)

## Usage

When Naninovel library and types are added in the visual scripting settings, the engine APIs will become available in the fuzzy finder under graph view and can be used in the same way as the other Unity or third-party APIs. Below is an example on initializing the engine and playing a script. Make sure to disable `Initialize On Application Load` and `Show Title UI`, before trying this example.

![](https://i.gyazo.com/a890edf4425ba94d934c31ced6ca0f53.png)

In case you wish to send an event from a scenario script to a visual scripting graph or state machine, below is example of a [custom command](/guide/custom-commands.md), which will attempt to find a game object with the provided name and send an event with the specified name and arguments:

```csharp
using Naninovel;
using Naninovel.Commands;
using UniRx.Async;
using Unity.VisualScripting;
using UnityEngine;

[CommandAlias("bolt")]
public class BroadcastBoltEvent : Command
{
    [ParameterAlias("object"), RequiredParameter]
    public StringParameter GameObjectName;
    [ParameterAlias("name"), RequiredParameter]
    public StringParameter EventName;
    [ParameterAlias("args")]
    public StringListParameter Arguments;
    
    public override UniTask ExecuteAsync (CancellationToken cancellationToken = default)
    {
        var gameObject = GameObject.Find(GameObjectName);
        if (gameObject == null)
        {
            Debug.LogError($"Failed to find `{GameObjectName}` game object.");
            return UniTask.CompletedTask;
        }
        
        CustomEvent.Trigger(gameObject, EventName, Arguments);
        
        return UniTask.CompletedTask;
    }
}
```

Just copy-paste the contents to a new C# script stored anywhere inside the project Assets directory and the command will automatically become available and can be used as follows:

```nani
; Send `MyEvent` to `ExampleEvent` game object with the provided args
@bolt object:ExampleEvent name:MyEvent args:ExampleMessage,Script002
```

Below is an example graph, that, when attached to a `ExampleEvent` game object, will print the message and start playing the specified script.

![](https://i.gyazo.com/fa613006433d43cd8e25b4c9aed33d78.png)

::: example
An example project containing all the aforementioned graphs and test scripts is available on GitHub: [github.com/Naninovel/VisualScripting](https://github.com/Naninovel/VisualScripting). Be aware, that Naninovel is not distributed with the project, hence compilation errors will be produced after opening it for the first time; import the package from the Asset Store to resolve the issues.
:::