# Custom Script Compiler

Script compilation is the process of transforming source scenario text (contained in `.nani` files) into data structures that are then used to control game flow. For example, the compiler transforms the `@hide Kohaku` line into a `HideActor` command with the `ActorId` parameter set to `Kohaku`.

You can tweak or completely change how the compiler behaves by providing a custom implementation. Like other custom implementations, this is done by creating a new C# class that implements the `IScriptCompiler` interface.

A script compiler can be selected in the Scripts configuration menu via the `Script Compiler` property:

![](https://i.gyazo.com/12a03e71e66d1fb0901317e380c9694e.png)

::: info NOTE
After switching the script compiler in the configuration, re-import the script assets (right-click the folder containing the assets and choose `Reimport`) for the changes to take effect.
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

When this compiler is selected and a `...` appears in the game, a one-second delay will automatically be added, even though it isn't explicitly written in the script. Note that this naive implementation is only for demonstration purposes. In a real project, you'd likely want to modify the generic line sub-compiler to ensure this only affects printed text, and/or use a regex for more precise matching.

Instead of implementing `IScriptCompiler` from scratch, the example above inherits from the built-in compiler and overrides one of its methods. You can further tweak the built-in compiler by overriding sub-compilers used for comments, labels, commands, and generic text lines. For example, you can create a custom generic line sub-compiler and override it like this:

```cs
using Naninovel;

public class CustomCompiler : ScriptCompiler
{
    protected override GenericLineCompiler GenericLineCompiler { get; }
        = new CustomGenericLineCompiler();
}
```
