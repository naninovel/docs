# Custom Commands

Command represents a single operation, that controls what happens on the scene; e.g., it can be used to change a background, move a character or load another naninovel script. Parametrized command sequences defined in [naninovel scripts](/guide/naninovel-scripts) effectively controls the game flow. You can find available built-in commands in the [API reference](/api/). In code, all the built-in script command implementations are defined under `Naninovel.Commands` namespace.

## Adding Custom Command

To add your own custom script command, create a new C# class derived from `Command` and implement `Execute` abstract method. The created class will automatically be picked up by the engine and you'll be able to invoke the command from the naninovel scripts by either the class name or an alias (if assigned). To assign an alias to the naninovel command, apply `Alias` attribute to the class.

Below is an example of a custom command, that can be invoked from naninovel scripts as `@HelloWorld` or `@hello` to print "Hello World!" to the console and can also take an optional `name` parameter (eg, `@hello name:Felix`) to greet the provided name instead of the world.

```csharp
using System;
using Naninovel;
using Naninovel.Commands;
using UnityEngine;

[Serializable, Alias("hello")]
public class HelloWorld : Command
{
    public StringParameter Name;

    public override Awaitable Execute (ExecutionContext ctx)
    {
        if (Assigned(Name)) Debug.Log($"Hello, {Name}!");
        else Debug.Log("Hello World!");
        return Async.Completed;
    }
}
```

::: info NOTE
Whenever you change C# command implementations—such as renaming the class, adding or removing parameters, changing their types or attributes—remember to re-import the scenario script assets (right-click on the folder where the scripts are stored and click "Reimport"). This is necessary because scenario scripts are parsed and compiled on import (not at runtime) and must be kept in sync with the C# implementations.
:::

### Execute Method

`Execute` is an async method invoked when the command is executed by the script player; keep your command logic there. Use [engine services](/guide/engine-services) to access the engine's built-in systems. Naninovel script execution will halt until this method returns a completed task if the `Wait` parameter is set to `true`.

### Execution Context

Notice the `ExecutionContext ctx` argument provided to the `Execute` method. When performing [async operations](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/), make sure to check the `ctx.Token` async token for cancellation and completion requests after each async operation, and react accordingly:

- `AsyncToken.Canceled` means the engine has been destroyed or reset. In both cases, it's no longer safe to use engine APIs, and any state mutations will lead to undefined behavior. When canceled, the command implementation is expected to throw `AsyncOperationCanceledException` immediately, discarding any currently performed activities.
- `AsyncToken.Completed` means the command is expected to complete all activities as fast as possible. For example, if you're running animations, finish them instantly, regardless of their expected duration. This usually happens when the player activates continue input or when a save game operation starts.

```csharp
public override async Awaitable Execute (ExecutionContext ctx)
{
    await PerformSomething();
    // The engine may have been destroyed while the above method was running;
    // the following check will throw an exception if that's the case.
    ctx.Token.ThrowIfCanceled();
    // It's safe to continue using engine APIs after the check.
    var someUI = Engine.GetService<IUIManager>().GetUI<SomeUI>();
    // If completion is requested, fade the UI instantly.
    var fadeDuration = ctx.Token.Completed ? 0 : 5;
    await someUI.ChangeVisibility(false, fadeDuration, ctx.Token);
    // The method above accepts the async token; such methods handle
    // cancellations internally, so you don't need to check again afterwards.
}
```

Another member of the execution context is the script track instance executing the command, accessible via `ctx.Track`. Use the track instance whenever you need to control playback or when calling other engine APIs that require a track. For example, stop playback like this:

```csharp
public override async Awaitable Execute (ExecutionContext ctx)
{
    ctx.Track.Stop();
}
```

### Parameter Types

To expose a command parameter to naninovel scripts, add a public field to the command class with one of the supported types:

| Field Type                | Value Type            | Script Example                      |
|---------------------------|-----------------------|-------------------------------------|
| StringParameter           | String                | `LoremIpsum`, `"Lorem ipsum"`       |
| LocalizableTextParameter  | LocalizableText       | `"Lorem ipsum\|#id\|"`              |
| IntegerParameter          | Int32                 | `10`, `0`, `-1`                     |
| DecimalParameter          | Single                | `0.525`, `-55.1`                    |
| BooleanParameter          | Boolean               | `true`, `false`                     |
| NamedStringParameter      | NamedString           | `Script001.LabelName`, `.LabelName` |
| NamedIntegerParameter     | NamedInteger          | `Yuko.5`                            |
| NamedDecimalParameter     | NamedFloat            | `Kohaku.-10.25`                     |
| NamedBooleanParameter     | NamedBoolean          | `Misaki.false`                      |
| StringListParameter       | List&lt;String>       | `Lorem,ipsum,"doler sit amet"`      |
| IntegerListParameter      | List&lt;Int32>        | `10,-1,0`                           |
| DecimalListParameter      | List&lt;Single>       | `0.2,10.5,-88.99`                   |
| BooleanListParameter      | List&lt;Boolean>      | `true,false,true`                   |
| NamedStringListParameter  | List&lt;NamedString>  | `Felix.Happy,Jenna.Confidence`      |
| NamedIntegerListParameter | List&lt;NamedInteger> | `Yuko.5,Misaki.-8`                  |
| NamedDecimalListParameter | List&lt;NamedFloat>   | `Nanikun.88.99,Yuko.-5.1`           |
| NamedBooleanListParameter | List&lt;NamedBoolean> | `Misaki.false,Kohaku.true`          |

### Parameter Alias

Optionally, you can apply `[Alias]` attribute to the field to assign an alias name to the parameter allowing it to be used instead of the field name when referencing the parameter in naninovel scripts. If you wish to make the parameter nameless, set `NamelessParameterAlias` constant (empty string) as the alias; please note, that only one nameless parameter is allowed per command.

```csharp
[Alias(NamelessParameterAlias)]
public StringParameter MyNamelesParameter;
[Alias("myParam")]
public StringParameter MyParameter;
```

```nani
@cmd "value of the nameless param" myParam:"value of 'MyParameter' param"
```

### Required Parameter

To make parameter required (causing an error to be logged when it's not specified in naninovel script), apply `[RequiredParameter]` attribute to the field. When the attribute is not applied, parameter is considered optional.

```csharp
[RequiredParameter]
public StringParameter MyRequiredParameter;
```

### Optional Parameter

When parameter is not required, it may or may not have value assigned in the scenario script; use `HasValue` property to test whether that's the case. Optionally, you can use `Assigned()` static method, which takes parameter instance and returns true when the provided parameter is not null and has a value assigned.

```csharp
public StringParameter MyOptionalParameter;
...
if (MyOptionalParameter.HasValue) { }
if (Assigned(MyOptionalParameter)) { }
```

### Localizable Command

In case the command has parameters that can be localized (text directly presented to the user, usually), implement `Command.ILocalizable` interface to add the command to the generated [script localization](/guide/localization#scripts-localization) documents and use `LocalizableTextParameter` parameter type.

```csharp
public class PrintText : Command, Command.ILocalizable
{
    public LocalizableTextParameter Text;
}
```

### Preloadable Command

In case execution of the command requires loading some resources, implement `Command.IPreloadable` interface to preload the required resources when the game is loading. Refer to [memory management](/guide/memory-management) guide for more info.

```csharp
public class PlayAudioClip : Command, Command.IPreloadable
{
    public StringParameter ClipPath;

    public async Awaitable PreloadResources ()
    {
        if (!Assigned(ClipPath) || ClipPath.DynamicValue) return;
        await ... (load the audio clip here)
    }

    public void ReleasePreloadedResources ()
    {
        if (!Assigned(ClipPath) || ClipPath.DynamicValue) return;
        ... (unload the clip here)
    }
}
```

Notice `ClipPath.DynamicValue` check: we wouldn't be able to preload the resource in case the name is only known when the command is executed (ie parameter contain [script expressions](/guide/script-expressions)); in this case the resource should be loaded inside `Execute` method.

### Command Examples

You can find scripts with all the built-in command implementations at `Naninovel/Runtime/Commands` package folder; feel free to use them as a reference when implementing your own custom commands.

::: tip EXAMPLE
Another example of adding custom commands to add/remove items of an inventory system can be found in the [inventory sample](/guide/samples#inventory). Specifically, the command implementations are stored at `Scripts/Runtime/Inventory/Commands` directory.
:::

## Overriding Built-In Command

In some cases it could be useful to override built-in Naninovel commands. For example, you may want to change how [@print] commands work without adding a custom one, so that the change will also affect [generic text lines](/guide/naninovel-scripts#generic-text-lines) (text from the generic lines is parsed into the print commands under the hood).

To override a built-in command, add a custom one and apply the same alias built-in command has. Reimport the naninovel scripts (right-click over a folder they're stored at, then click "Reimport") after overriding a command in order for the changes to take effect. The custom command will then automatically be used instead of the built-in one when playing a naninovel script.

Below is an example of overriding built-in [@print] command, so that the printed text will be logged into the console before being revealed to the player.

```csharp
[Serializable, Alias("print")]
public class MyCustomPrintCommand : PrintText
{
    public override Awaitable Execute (ExecutionContext ctx)
    {
        Debug.Log(Text);
        return base.Execute(ctx);
    }
}
```

::: tip
Commands and parameters may have various context attributes applied to provide documentation, auto-completion and advanced diagnostics in the IDE and web editor. Find the available attributes in the [IDE extension](/guide/ide-extension#ide-attributes) guide.
:::
