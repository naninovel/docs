# 自定义演出脚本编译器

脚本编译是将源剧本文本（包含在 `.nani` 文件中）转换为随后用于控制游戏流程的数据结构的过程。例如，编译器将 `@hide Kohaku` 行转换为 `HideActor` 命令，并将 `ActorId` 参数设置为 `Kohaku`。

您可以通过提供自定义实现来调整或完全更改编译器的行为。与其他自定义实现一样，这是通过创建一个实现 `IScriptCompiler` 接口的新 C# 类来完成的。

可以通过 `Script Compiler` 属性在 Scripts 配置菜单中选择脚本编译器：

![](https://i.gyazo.com/12a03e71e66d1fb0901317e380c9694e.png)

::: info NOTE
在配置中切换脚本编译器后，重新导入脚本资产（右键单击包含资产的文件夹并选择 `Reimport`）以使更改生效。
:::

下面是一个自定义编译器的示例，它会在源剧本文本中找到的每个 `...` 后自动插入 wait 命令：

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

当选择此编译器并且游戏中出现 `...` 时，会自动添加一秒钟的延迟，即使脚本中没有明确写入。请注意，这种简单的实现仅用于演示目的。在实际项目中，您可能希望修改通用行子编译器以确保这仅影响打印文本，和/或使用正则表达式进行更精确的匹配。

上面的示例没有从头开始实现 `IScriptCompiler`，而是继承自内置编译器并覆盖其方法之一。您可以通过覆盖用于注释、标签、命令和通用文本行的子编译器来进一步调整内置编译器。例如，您可以创建一个自定义通用行子编译器并像这样覆盖它：

```cs
using Naninovel;

public class CustomCompiler : ScriptCompiler
{
    protected override GenericLineCompiler GenericLineCompiler { get; }
        = new CustomGenericLineCompiler();
}
```
