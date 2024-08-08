# Custom Script Parser

Script parsing is a process of transforming source script text (contained in .nani files) into data structures, which then used to control the game flow. For example, parser will transform `@hide Kohaku` text line in naninovel script file into `HideActor` command with `ActorId` parameter set to "Kohaku".

It's possible to tweak or even completely change the way parsing behaves with a custom script parser implementation. Akin to other custom implementations, it's added simply by creating a new C# class, which implements a specific interface, in this case `IScriptParser`.

Script parser can be selected in scripts configuration menu with `Script Parser` property:

![](https://i.gyazo.com/12a03e71e66d1fb0901317e380c9694e.png)

::: info NOTE
After switching script parser in the configuration, it's required to re-import script assets (right-click folder containing the assets and choose `Reimport`) in order for the changes to take effect.
:::

Below is an example of a custom parser, which automatically inserts wait commands after each `...` found in the source script text.

```csharp
public class CustomParser : ScriptParser
{
    public override Script ParseText (string scriptName, string scriptText,
        ParseOptions options = default)
    {
        scriptText = scriptText.Replace("...", "...[wait 1]");
        return base.ParseText(scriptName, scriptText, options);
    }
}
```

When the parser is selected and a `...` is printed in the game, a one-second delay will automatically be added, even though it's not explicitly assigned in the script text. Be aware, that this naive implementation is just for demo purpose. In real project you'd rather modify generic text sub-parser to make sure this only affect the printed text and/or use regex for a more precise matching.

Notice, that instead of implementing `IScriptParser` interface from scratch, the example parser above is inherited from built-in parser and overrides one of its methods. You can further tweak the built-in parser this way, overriding sub-parsers used for comments, labels, command and generic text lines. For example, you can create a custom generic text line sub-parser and override it like this:

```csharp
using Naninovel;

public class CustomParser : ScriptParser
{
    protected override GenericTextLineParser GenericTextLineParser { get; }
        = new CustomGenericLineParser();
}
```
