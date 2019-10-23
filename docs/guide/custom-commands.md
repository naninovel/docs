# Custom Commands

Command represents a single operation, that controls what happens on the scene; e.g., it can be used to change a background, move a character or load another naninovel script. Parametrized command sequences defined in [naninovel scripts](/guide/naninovel-scripts.md) effectively controls the game flow. You can find available built-in commands in the [API reference](/api/). In code, all the built-in script command implementations are defined under `Naninovel.Commands` namespace.

To add your own custom script command, create a new C# class derived from `Command` and implement `ExecuteAsync` abstract method. The created class will automatically be picked up by the engine and you'll be able to invoke the command from the naninovel scripts by either the class name or an alias (if assigned). To assign an alias to the naninovel command, apply `CommandAlias` attribute to the class.

`ExecuteAsync` is an async method invoked when the command is executed by the scripts player; put the command logic there. Use [engine services](/guide/engine-services.md) to access the engine built-in systems. Naninovel script execution will halt until this method returns a completed task in case `Wait` parameter is `true`.

To expose a command parameter to naninovel scripts, add a `CommandParameter` attribute to the public property you want to expose. The attribute takes two optional arguments: `alias` (string) is an alias name of the parameter and `optional` (bool) controls whether the parameter should be considered optional (can be omitted in naninovel scripts). If you wish to make the parameter nameless, set an empty string (`""` or `string.Empty`) as the alias; please note, that only one nameless parameter is allowed per command.

In case execution of the command requires loading some resources, implement `Command.IPreloadable` interface to preload the required resources when the game is loading.

In case the command have parameters that can be localized (text directly presented to the user, usually), implement `Command.ILocalizable` interface to add the command to the generated script localization documents.

You can find scripts with all the built-in command implementations at `Naninovel/Runtime/Commands` package folder; feel free to use them as a reference when implementing your own custom commands.

Here is an example of a custom command, that can be invoked from naninovel scripts as `@HelloWorld` or `@hello` to print `Hello World!` to the console and can also take an optional `name` parameter (eg, `@hello name:Felix`) to greet the provided name instead of the world:

```csharp
using Naninovel.Commands;
using System.Threading;
using System.Threading.Tasks;
using UnityEngine;

[CommandAlias("hello")]
public class HelloWorld : Command
{
    [CommandParameter(optional: true)]
    public string Name { get; set; }

    public override Task ExecuteAsync (CancellationToken cancellationToken = default)
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
}
```

Notice the optional `CancellationToken` argument. In case invoking any async methods, make sure to check the token for cancellation requests and return ASAP.