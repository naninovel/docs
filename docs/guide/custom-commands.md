# Custom Commands

Command represents a single operation, that controls what happens on the scene; e.g., it can be used to change a background, move a character or load another naninovel script. Parametrized command sequences defined in [naninovel scripts](/guide/naninovel-scripts.md) effectively controls the game flow. You can find available built-in commands in the [API reference](/api/). In code, all the built-in script command implementations are defined under `Naninovel.Commands` namespace.

To add your own custom script command, create a new C# class derived from `Command` and implement `ExecuteAsync` abstract method. The created class will automatically be picked up by the engine and you'll be able to invoke the command from the naninovel scripts by either the class name or an alias (if assigned). To assign an alias to the naninovel command, apply `CommandAlias` attribute to the class.

`ExecuteAsync` is an async method invoked when the command is executed by the scripts player; put the command logic there. Use [engine services](/guide/engine-services.md) to access the engine built-in systems. Naninovel script execution will halt until this method returns a completed task in case `Wait` parameter is `true`.

To expose a command parameter to naninovel scripts, add a public field to the command class with one of the supported types: 

Field Type | Value Type | Script Example
--- | --- | ---
StringParameter | String | `LoremIpsum`, `"Lorem ipsum"`
IntegerParameter | Int32 | `10`, `0`, `-1`
DecimalParameter | Single | `0.525`, `-55.1`
BooleanParameter | Boolean | `true`, `false`
NamedStringParameter | NamedString |  `Script001.LabelName`, `.LabelName`
NamedIntegerParameter | NamedInteger | `Yuko.5`
NamedDecimalParameter | NamedFloat | `Kohaku.-10.25`
NamedBooleanParameter | NamedBoolean | `Misaki.false`
StringListParameter | List&lt;String> | `Lorem,ipsum,"doler sit amet"`
IntegerListParameter | List&lt;Int32> | `10,-1,0`
DecimalListParameter | List&lt;Single> | `0.2,10.5,-88.99`
BooleanListParameter | List&lt;Boolean> | `true,false,true`
NamedStringListParameter | List&lt;NamedString> | `Felix.Happy,Jenna.Confidence`
NamedIntegerListParameter | List&lt;NamedInteger> | `Yuko.5,Misaki.-8`
NamedDecimalListParameter | List&lt;NamedFloat> | `Nanikun.88.99,Yuko.-5.1`
NamedBooleanListParameter | List&lt;NamedBoolean> | `Misaki.false,Kohaku.true`

Optionally, you can apply `[ParameterAlias]` attribute to the field to assign an alias name to the parameter allowing it to be used instead of the field name when referencing the parameter in naninovel scripts. If you wish to make the parameter nameless, set `Command.NamelessParameterAlias` constant (empty string) as the alias; please note, that only one nameless parameter is allowed per command.

To make parameter required (causing an error to be logged when it's not specified in naninovel script), apply `[RequiredParameter]` attribute to the field. When the attribute is not applied, parameter is considered optional.

All the parameter types have `HasValue` property, which you can use to test whether the parameter has been assigned in naninovel script; optionally, you can use `Command.Assigned()` static method, which takes a parameter instance and returns true when the provided parameter is not null and has a value assigned.

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
    public StringParameter Name;

    public override Task ExecuteAsync (CancellationToken cancellationToken = default)
    {
        if (Assigned(Name))
        {
            Debug.Log($"Hello, {Name}!");
        }
        else
        {
            Debug.Log("Hello World!");
        }

        return Task.CompletedTask;
    }
}
```

Notice the optional `CancellationToken` argument. In case invoking any async methods, make sure to check the token for cancellation requests and return ASAP.