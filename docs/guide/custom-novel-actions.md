# Custom Novel Actions

Novel action represents a single operation, that controls what happens on the scene; e.g., it can be used to change a background, move a character or load another novel script. Parametrized action sequences defined in [novel scripts](/guide/novel-scripts.md) effectively controls the game flow. You can find available built-in actions in the [API reference](/api/). In code, all the built-in novel action implementations are defined under `Naninovel.Actions` namespace.

To add your own custom novel action, create a new C# class, inherit `Naninovel.Actions.NovelAction` class and implement `ExecuteAsync` and `UndoAsync` abstract methods.

`ExecuteAsync` is an async method invoked when the action is executed by the scripts player; put the action logic here. Use [engine services](/guide/engine-services.md) to access the engine built-in systems. Novel script execution will halt until this method returns a completed task in case `Wait` parameter is `true`.

`UndoAsync` method is invoked when rewinding novel scripts backwards. In case your novel action changes scene state, you should revert the changes here; otherwise just return a completed task.

To expose an action parameter to novel scripts, add a `ActionParameter` attribute to the public property you want to expose. The attribute takes two optional arguments: `alias` (string) is an alias name of the parameter and `optional` (bool) controls whether the parameter should be considered optional (can be omitted in novel scripts). If you wish to make the parameter nameless, set an empty string (`""` or `string.Empty`) as the alias; please note, that only one nameless parameter is allowed per action.

To assign an alias name to the novel action, apply `ActionAlias` attribute to the implementing class. In novel scripts you can reference the action by either its implementation class name or the assigned alias name.

In case execution of the action requires loading some resources, implement `NovelAction.IPreloadable` interface to preload the required resources when the game is loading.

In case the action have parameters that can be localized (text directly presented to the user, usually), implement `NovelAction.ILocalizable` interface to add the action to the generated script localization documents.

You can find scripts with all the built-in action implementations at `Naninovel/Runtime/Actions` package folder; feel free to use them as a reference when implementing your own custom actions.

Here is an example of a custom action, that can be invoked from novel scripts as `@HelloWorld` or `@hello` to print `Hello World!` to the console and can also take an optional `name` parameter (eg, `@hello name:Felix`) to greet the provided name instead of the world:

```csharp
using Naninovel.Actions;
using System.Threading.Tasks;
using UnityEngine;

[ActionAlias("hello")]
public class HelloWorld : NovelAction
{
    [ActionParameter(optional: true)]
    public string Name { get; set; }

    public override Task ExecuteAsync ()
    {
        if (Name is null)
        {
            Debug.Log("Hello World!");
        }
        else
        {
            Debug.Log($"Hello, {Name}!");
        }

        return Task.CompletedTask;
    }

    public override Task UndoAsync () => Task.CompletedTask;
}
```

