# 自定义脚本编译器

脚本编译是将源场景文本（包含在 `.nani` 文件中）转换为数据结构的过程，这些数据结构随后用于控制游戏流程。例如，编译器会将 `@hide Kohaku` 行转换为一个 `HideActor` 指令，并将其 `ActorId` 参数设置为 “Kohaku”。

你可以通过提供自定义实现来调整甚至完全改变编译器的行为。与其他自定义实现一样，这是通过创建一个实现特定接口的新 C# 类来完成的——在本例中为 `IScriptCompiler`。

可以在脚本配置菜单中通过 `Script Compiler` 属性选择脚本编译器：

![](https://i.gyazo.com/12a03e71e66d1fb0901317e380c9694e.png)

::: info 注意
在配置中切换脚本编译器后，你需要重新导入脚本资源（右键单击包含这些资源的文件夹并选择 `Reimport`）以使更改生效。
:::

下面是一个自定义编译器的示例，它会在源场景文本中每次遇到 `...` 时自动插入等待指令：

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

当选择此编译器并在游戏中出现 `...` 时，即使脚本中没有显式编写，也会自动添加一秒的延迟。请注意，此示例仅用于演示目的。在实际项目中，你可能希望修改通用文本行子编译器，以确保此行为仅影响打印文本，和/或使用正则表达式实现更精确的匹配。

请注意，与其从零实现 `IScriptCompiler` 接口，上述示例继承了内置编译器并重写了其某个方法。你可以通过这种方式进一步调整内置编译器，重写用于注释、标签、指令以及通用文本行的子编译器。例如，你可以创建一个自定义的通用文本行子编译器，并像这样重写它：

```cs
using Naninovel;

public class CustomCompiler : ScriptCompiler
{
    protected override GenericLineCompiler GenericLineCompiler { get; }
        = new CustomGenericLineCompiler();
}
```
