# Custom Commands

Command represents a single operation, that controls what happens on the scene; e.g., it can be used to change a background, move a character or load another naninovel script. Parametrized command sequences defined in [naninovel scripts](/guide/naninovel-scripts.md) effectively controls the game flow. You can find available built-in commands in the [API reference](/api/). In code, all the built-in script command implementations are defined under `Naninovel.Commands` namespace.

## Adding Custom Command

To add your own custom script command, create a new C# class derived from `Command` and implement `ExecuteAsync` abstract method. The created class will automatically be picked up by the engine and you'll be able to invoke the command from the naninovel scripts by either the class name or an alias (if assigned). To assign an alias to the naninovel command, apply `CommandAlias` attribute to the class.

::: warn
When adding custom implementation types under a non-predefined assembly (via [assembly definitions](https://docs.unity3d.com/Manual/ScriptCompilationAssemblyDefinitionFiles.html)), add the assembly name to the `Type Assemblies` list found in the engine configuration menu. Otherwise, the engine won't be able to locate your custom types.
:::

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

Optionally, you can apply `[ParameterAlias]` attribute to the field to assign an alias name to the parameter allowing it to be used instead of the field name when referencing the parameter in naninovel scripts. If you wish to make the parameter nameless, set `NamelessParameterAlias` constant (empty string) as the alias; please note, that only one nameless parameter is allowed per command.

To make parameter required (causing an error to be logged when it's not specified in naninovel script), apply `[RequiredParameter]` attribute to the field. When the attribute is not applied, parameter is considered optional.

All the parameter types have `HasValue` property, which you can use to test whether the parameter has been assigned in naninovel script; optionally, you can use `Assigned()` static method, which takes a parameter instance and returns true when the provided parameter is not null and has a value assigned.

In case execution of the command requires loading some resources, implement `Command.IPreloadable` interface to preload the required resources when the game is loading; find more about memory management in the [resource providers guide](/guide/resource-providers.md#memory-management).

In case the command has parameters that can be localized (text directly presented to the user, usually), implement `Command.ILocalizable` interface to add the command to the generated [script localization](/guide/localization.md#scripts-localization) documents.

You can find scripts with all the built-in command implementations at `Naninovel/Runtime/Commands` package folder; feel free to use them as a reference when implementing your own custom commands.

Below is an example of a custom command, that can be invoked from naninovel scripts as `@HelloWorld` or `@hello` to print "Hello World!" to the console and can also take an optional `name` parameter (eg, `@hello name:Felix`) to greet the provided name instead of the world.

```csharp
using Naninovel;
using Naninovel.Commands;
using UniRx.Async;
using UnityEngine;

[CommandAlias("hello")]
public class HelloWorld : Command
{
    public StringParameter Name;

    public override UniTask ExecuteAsync (CancellationToken cancellationToken = default)
    {
        if (Assigned(Name))
        {
            Debug.Log($"Hello, {Name}!");
        }
        else
        {
            Debug.Log("Hello World!");
        }

        return UniTask.CompletedTask;
    }
}
```

Notice the optional `CancellationToken` argument. When using [async methods](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/), make sure to check the token for cancellation requests and react accordingly. `CancelASAP` means the engine has either been destroyed or performing a state reset; in both cases it's no longer safe to use the engine APIs and any mutation to the state could cause issues, so the command should return immediately, discarding any currently performed activities. `CancelLazy` means the command is expected to complete all the activities as fast as possible; eg, if you're running animations, finish them instantly, no matter the initial duration.

::: example
Another example of adding custom commands to add/remove items of an inventory system can be found in the [inventory example project on GitHub](https://github.com/Naninovel/Inventory).

Specifically, the command implementations are stored at [Runtime/Commands](https://github.com/Naninovel/Inventory/tree/master/Assets/NaninovelInventory/Runtime/Commands) directory.
:::

## Overriding Built-In Command

In some cases it could be useful to override built-in Naninovel commands. For example, you may want to change how [@print] commands work without adding a custom one, so that the change will also affect [generic text lines](/guide/naninovel-scripts.md#generic-text-lines) (text from the generic lines is parsed into the print commands under the hood).

To override a built-in command, add a custom one and apply the same alias built-in command has. Reimport the naninovel scripts (right-click over a folder they're stored at, then click "Reimport") after overriding a command in order for the changes to take effect. The custom command will then automatically be used instead of the built-in one when playing a naninovel script.

Below is an example of overriding built-in [@print] command, so that the printed text will be logged into the console before being revealed to the player.

```csharp
[CommandAlias("print")]
public class MyCustomPrintCommand : PrintText
{
    public override UniTask ExecuteAsync (CancellationToken cancellationToken = default)
    {
        Debug.Log(Text);
        return base.ExecuteAsync(cancellationToken);
    }
}
```

::: example
Find a more useful example of overriding built-in commands [on the forum](https://forum.naninovel.com/viewtopic.php?f=8&t=53). An overridden and custom commands will allow changing reveal speed right inside generic text lines, eg: 
```nani
Yuko: [s 0.1] Print text 10 times slower than usual. [s 2] Print 2 times faster.
```
:::

## IDE Metadata

When adding custom commands, you may notice that they're highlighted as errors in IDE extensions. That is due to metadata of the custom commands is not available to the extensions. You can use IDE metadata tool to automatically generate the required metadata file over all the custom commands present in the project; see the [IDE extension guide](/guide/ide-extension.md#ide-metadata) for more information.
