# Custom Script Compiler

Script compiling is the process of transforming source scenario text (contained in `.nani` files) into data structures, which are then used to control the game flow. For example, the compiler will transform the `@hide Kohaku` line into a `HideActor` command with the `ActorId` parameter set to "Kohaku".

It's possible to tweak or even completely change how the compiler behaves by providing a custom implementation. Like other custom implementations, this is done by creating a new C# class that implements a specific interface—in this case, `IScriptCompiler`.

A script compiler can be selected in the scripts configuration menu via the `Script Compiler` property:

![](https://i.gyazo.com/12a03e71e66d1fb0901317e380c9694e.png)

::: info NOTE
After switching the script compiler in the configuration, you need to re-import the script assets (right-click the folder containing the assets and choose `Reimport`) for the changes to take effect.
:::

Below is an example of a custom compiler that automatically inserts wait commands after each `...` found in the source scenario text:

```cs
public class CustomCompiler : ScriptCompiler
{
    public override Script CompileScript (string path, string text,
        CompileOptions options = default)
    {
        text = text.Replace("...", "...[wait 1]");
        return base.CompileScript(path, text, options);
    }
}
```

When this compiler is selected and a `...` appears in the game, a one-second delay will automatically be added, even though it's not explicitly written in the script. Be aware that this naive implementation is only for demonstration purposes. In a real project, you'd likely want to modify the generic line sub-compiler to ensure this only affects printed text, and/or use regex for more precise matching.

Notice that instead of implementing the `IScriptCompiler` interface from scratch, the example above inherits from the built-in compiler and overrides one of its methods. You can further tweak the built-in compiler in this way, overriding sub-compilers used for comments, labels, commands, and generic text lines. For example, you can create a custom generic line sub-compiler and override it like this:

```cs
using Naninovel;

public class CustomCompiler : ScriptCompiler
{
    protected override GenericLineCompiler GenericLineCompiler { get; }
        = new CustomGenericLineCompiler();
}
```
