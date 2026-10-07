# IDE 扩展

代码编辑器的功能，例如语法高亮、错误检查、自动补全和交互式文档，可以显著提高生产力。Naninovel 拥有官方的 [VS Code](https://code.visualstudio.com) 扩展，为编写 [剧本脚本](/zh/guide/scenario-scripting) 提供了丰富的创作工具。

![?class=when-dark](https://i.gyazo.com/9ffce86c54b5bfc5497dd50fa59a637e.png)
![?class=when-light](https://i.gyazo.com/6f5a92d83eb2071ac06cbb72c2d0579e.png)

## 安装与设置

### 安装 VS Code 扩展

1. 通过 `View -> Extensions` 菜单打开 VS Code 中的扩展视图
2. 搜索“Naninovel”并单击“Install”

![](https://i.gyazo.com/85999dd50f414c13de12b46e640bf531.png)

::: info NOTE
VS Code 注册表中的扩展与当前的 Naninovel 稳定版本兼容。使用 Naninovel 的预览版本时，请切换到扩展的预发布流。使用 Naninovel 的最终版本时，请禁用 VS Code 中的自动更新并安装对应的旧版本。
:::

### 激活扩展

1. 请确保 Unity 项目中 [已安装 Naninovel](/zh/guide/getting-started#安装-naninovel)。
2. 在 VS Code 中打开 Unity 项目的“Assets”文件夹。

当扩展在当前工作区检测到 `.nani` 文件时，它将激活 LSP 服务。该服务处理脚本诊断、自动补全以及指示当前正在播放哪一行脚本等任务。

![?width=260](https://i.gyazo.com/5eae1dda34e4b36474333227de62d1ee.png)

### 工作区根目录

Naninovel 在生成的数据目录（默认为 `Assets/NaninovelData`）下生成与 VS Code 扩展通信所需的项目元数据和桥接文件。这意味着在 VS Code 中打开 Naninovel 项目（选择 [工作区根目录](https://code.visualstudio.com/docs/editor/workspaces)）时，您需要选择一个在某个层级包含生成的数据目录的文件夹。

但是，有些用户更喜欢只打开包含剧本脚本的文件夹，其中不包括生成的数据目录。在这种情况下，请将“NaninovelData”文件夹移动到剧本脚本文件夹中，使其对 VS Code 可见。

移动文件夹后，请重新启动 VS Code 以使更改生效。

## VS Code 设置

以下是 VS Code 的推荐设置，用于忽略 Unity 自动生成的元文件，启用自动换行，并禁用基于单词的建议、匹配项高亮和括号对着色：

```json
{
    "files.exclude": {
        "**/*.meta": true
    },
    "editor.wordWrap": "on",
    "editor.wordBasedSuggestions": "off",
    "editor.occurrencesHighlight": "off",
    "editor.suggest.showWords": false,
    "editor.bracketPairColorization.enabled": false
}
```

要访问设置 JSON 文件，请打开 `File -> Preferences -> Settings` 并单击窗口右上角的“Open Settings (JSON)”按钮。选择“User”选项卡以编辑所有项目的设置，或选择“Workspace”以仅影响包含剧本脚本的当前项目。

上述某些设置会在安装扩展时默认应用，但您可以根据需要覆盖它们。如果您还想自定义语法高亮，请添加以下内容并调整颜色：

::: code-group

```json [Dark Themes]
"editor.semanticTokenColorCustomizations": {
    "[*Dark*][*Night*][*Abyss*][*Monokai*]": {
        "enabled": true,
        "rules": {
            "CommentLine": "#5d6470",
            "CommentText": "#5d6470",
            "LabelLine": "#9bc37c",
            "LabelText": "#9bc37c",
            "CommandLine": "#6cb2ed",
            "InlinedCommand": "#6cb2ed",
            "Command": "#6cb2ed",
            "CommandIdentifier": "#6cb2ed",
            "Parameter": "#cd9769",
            "ParameterIdentifier": "#cd9769",
            "ParameterValue": "#e2be7f",
            "LocalizableValue": "#acb2be",
            "EndpointValue": "#9bc37c",
            "GenericTextLine": "#acb2be",
            "GenericTextPrefix": "#e2be7f",
            "GenericTextAuthor": "#e2be7f",
            "GenericTextAuthorAppearance": "#e2be7f",
            "Expression": "#62b8c1",
            "TextIdentifier": "#5d6470",
            "WaitFlag": "#6cb2ed",
            "Error": "#d14e4e",
            "UnknownTag": "#5d6470",
            "CommandTag": "#5d6470",
            "ExpressionTag": "#5d6470",
            "WaitInputTag": "#6cb2ed",
            "SelectTag": "#5d6470",
            "SelectOption": "#acb2be",
            "ActorsCommandGroup": "#e2be7f",
            "TextCommandGroup": "#93b6f8",
            "PlaybackCommandGroup": "#a9e17e",
            "BranchingCommandGroup": "#be93f3",
            "VisualsCommandGroup": "#f88d84",
            "AudioCommandGroup": "#9dd6de",
            "UICommandGroup": "#f893b7"
        }
    }
},
"editor.tokenColorCustomizations": {
    "[*Dark*][*Night*][*Abyss*][*Monokai*]": {
        "textMateRules": [
            { "scope": ["naniscript.comment"], "settings": { "foreground": "#5d6470" } },
            { "scope": ["naniscript.label"], "settings": { "foreground": "#9bc37c" } },
            { "scope": ["naniscript.command"], "settings": { "foreground": "#6cb2ed" } },
            { "scope": ["naniscript.command.parameter.id"], "settings": { "foreground": "#cd9769" } },
            { "scope": ["naniscript.command.parameter.value"], "settings": { "foreground": "#e2be7f" } },
            { "scope": ["naniscript.generic-text"], "settings": { "foreground": "#acb2be" } },
            { "scope": ["naniscript.author"], "settings": { "foreground": "#e2be7f" } },
            { "scope": ["naniscript.expression"], "settings": { "foreground": "#62b8c1" } },
            { "scope": ["naniscript.text-identifier"], "settings": { "foreground": "#5d6470" } },
            { "scope": ["naniscript.tag"], "settings": { "foreground": "#5d6470" } },
            { "scope": ["naniscript.select-option"], "settings": { "foreground": "#acb2be" } }
        ]
    }
},
```

```json [Light Themes]
"editor.semanticTokenColorCustomizations": {
    "[*Light*][*Day*][*Bright*]": {
        "enabled": true,
        "rules": {
            "CommentLine": "#acb5c6",
            "CommentText": "#acb5c6",
            "LabelLine": "#51a612",
            "LabelText": "#51a612",
            "CommandLine": "#257dc8",
            "InlinedCommand": "#257dc8",
            "Command": "#257dc8",
            "CommandIdentifier": "#257dc8",
            "Parameter": "#c642a5",
            "ParameterIdentifier": "#c642a5",
            "ParameterValue": "#9250bf",
            "LocalizableValue": "#4b5871",
            "EndpointValue": "#51a612",
            "GenericTextLine": "#4b5871",
            "GenericTextPrefix": "#9250bf",
            "GenericTextAuthor": "#9250bf",
            "GenericTextAuthorAppearance": "#9250bf",
            "Expression": "#3abfb3",
            "TextIdentifier": "#acb5c6",
            "WaitFlag": "#257dc8",
            "Error": "#be2222",
            "UnknownTag": "#acb5c6",
            "CommandTag": "#acb5c6",
            "ExpressionTag": "#acb5c6",
            "WaitInputTag": "#257dc8",
            "SelectTag": "#acb5c6",
            "SelectOption": "#4b5871",
            "ActorsCommandGroup": "#c79b4a",
            "TextCommandGroup": "#6b95df",
            "PlaybackCommandGroup": "#7fb857",
            "BranchingCommandGroup": "#9d7ad4",
            "VisualsCommandGroup": "#e07d74",
            "AudioCommandGroup": "#6ab7c3",
            "UICommandGroup": "#df79a5"
        }
    }
},
"editor.tokenColorCustomizations": {
    "[*Light*][*Day*][*Bright*]": {
        "textMateRules": [
            { "scope": ["naniscript.comment"], "settings": { "foreground": "#acb5c6" } },
            { "scope": ["naniscript.label"], "settings": { "foreground": "#51a612" } },
            { "scope": ["naniscript.command"], "settings": { "foreground": "#257dc8" } },
            { "scope": ["naniscript.command.parameter.id"], "settings": { "foreground": "#c642a5" } },
            { "scope": ["naniscript.command.parameter.value"], "settings": { "foreground": "#9250bf" } },
            { "scope": ["naniscript.generic-text"], "settings": { "foreground": "#4b5871" } },
            { "scope": ["naniscript.author"], "settings": { "foreground": "#9250bf" } },
            { "scope": ["naniscript.expression"], "settings": { "foreground": "#3abfb3" } },
            { "scope": ["naniscript.text-identifier"], "settings": { "foreground": "#acb5c6" } },
            { "scope": ["naniscript.tag"], "settings": { "foreground": "#acb5c6" } },
            { "scope": ["naniscript.select-option"], "settings": { "foreground": "#4b5871" } }
        ]
    }
},
```

:::

`semanticTokenColorCustomizations` 颜色应用于 LSP 上下文（激活扩展后的脚本内容），而 `tokenColorCustomizations` 应用于 TextMate 上下文（工具提示中的片段和激活扩展前的脚本）。

::: tip
默认应用的完整设置可在 [包源代码](https://github.com/naninovel/engine/blob/main/vscode/package.json) 的 `configurationDefaults` 下找到。
:::

## 装饰

默认情况下，会显示半透明图标来替代行标识符，以帮助区分不同的行类型和命令类型。您可以通过 `Decoration Style` 和 `Decoration Opacity` 设置来调整此行为。各个命令组的颜色可以在 `semanticTokenColorCustomizations` 设置中分别进行自定义。

:::: group

::: item Disabled
![](https://i.gyazo.com/002c585bd448af30af78ebfb7dc98583.png)
:::

::: item Monochrome
![](https://i.gyazo.com/0ea8a85d9845267b0d92187af716f902.png)
:::

::: item Colored (Default)
![](https://i.gyazo.com/6a841742f4903d8515d996de9bcc1334.png)
:::

::: item Full Color
![](https://i.gyazo.com/73a492b7c41274baf99cb2027b8016dd.png)
:::

::::

## 自动补全

输入 `@`、`[` 或 `{` 等符号时，补全建议会自动显示。要随时手动调用，请按 `Ctrl+Space`；例如，在空行上调用时会列出可用于指定文本行作者的角色。

## 折叠

以下结构默认支持折叠：

- 标签（直到另一个标签）
- 连续的注释行
- 缩进（嵌套）块

您还可以使用以下语法通过注释指定自定义折叠区域：

1. 以 `; > region name` 开始，其中“region name”可以是任意内容
2. 以 `; < region name` 结束，其中“region name”与开始时的名称相同

## 项目元数据

Naninovel 元数据是一个 JSON 文件，其中包含与创作项目相关的各种信息：可用角色、背景、资源、命令等。创作工具（例如 IDE 扩展和故事编辑器）使用此信息来提供有用的功能，例如自动补全和诊断。

元数据文件存储在 `NaninovelData` 自动生成文件夹下的 `.nani/Transient/Metadata.json` 中。当引擎配置中启用 `Auto Generate Metadata` 时，元数据会在域重新加载以及编辑 Naninovel 配置或资源资产后自动重新生成。要手动更新元数据，请使用 `Naninovel -> Update Metadata` 编辑器菜单或 `Ctrl+Shift+U` 热键。

::: tip
如果元数据未同步，请确保引擎配置中已打开 `Enable Bridging`，并确保引擎配置菜单顶部显示的 `Generated Data Root` 值等于 IDE 扩展报告的数据根目录。
:::

### 元数据提供者

要在生成的元数据中添加自定义值或覆盖默认值，请创建一个实现 `IMetadataProvider` 接口的 C# 类，并为其提供无参数构造函数。检测到自定义提供者后，每次生成项目元数据时都会使用它来替代默认提供者。

以下是默认的元数据提供者，您可以在实现自己的提供者时将其用作参考：

```cs
public class DefaultMetadataProvider : IMetadataProvider
{
    public virtual Project GetMetadata ()
    {
        var meta = new Project();
        var cfg = ProjectConfigurationProvider.LoadOrDefault<ScriptsConfiguration>();
        meta.EntryScript = cfg.StartGameScript;
        meta.TitleScript = cfg.TitleScript;
        Notify("Processing commands...", 0);
        meta.CommandGroups = MetadataGenerator.GenerateCommandGroupMetadata();
        meta.Commands = MetadataGenerator.GenerateCommandsMetadata();
        Notify("Processing resources...", .25f);
        meta.Resources = MetadataGenerator.GenerateResourcesMetadata();
        Notify("Processing actors...", .50f);
        meta.Actors = MetadataGenerator.GenerateActorsMetadata();
        Notify("Processing variables...", .75f);
        meta.Variables = MetadataGenerator.GenerateVariablesMetadata();
        Notify("Processing queries...", .95f);
        meta.Queries = MetadataGenerator.GenerateQueryMetadata();
        Notify("Processing enums...", .99f);
        meta.Enums = MetadataGenerator.GenerateEnumsMetadata();
        meta.Symbols = new(Compiler.Symbols);
        return meta;
    }

    protected static void Notify (string info, float progress)
    {
        if (EditorUtility.DisplayCancelableProgressBar("Generating Metadata", info, progress))
            throw new OperationCanceledException("Metadata generation cancelled by the user.");
    }
}
```

## IDE 特性

Naninovel 提供了一些 [C# 特性](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/attributes) 来为自定义命令和表达式查询启用 IDE 相关功能。例如，要向自定义命令和/或参数添加悬停文档，请分别将 `Doc` 特性应用于命令类型和参数字段：

```cs
[Doc("Summary of the custom command.")]
public class CustomCommand : Command
{
    [Doc("Summary of the custom parameter.")]
    public StringParameter CustomParameter;
}
```

要使参数支持内置和自定义表达式查询以及预定义变量的自动补全，请使用 `ExpressionContext` 特性：

```cs
[ExpressionContext]
public StringParameter Expression;
```

要使用任意 [枚举类型](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum) 的值进行自动补全，请使用 `EnumContext` 特性：

```cs
[EnumContext(typeof(PlatformID))]
public StringParameter Platform;
```

要自动补全和分析导航端点（脚本路径和标签）的使用情况和正确性，请使用 `EndpointContext` 特性：

```cs
[EndpointContext]
public StringParameter Path;
```

要使用资源自动补全，请使用 `ResourceContext` 并提供资源的路径前缀。下面的示例将使用音效资源进行补全：

```cs
[ResourceContext(AudioConfiguration.DefaultSfxPathPrefix)]
public StringParameter Audio;
```

要使用 Actor ID（任何类型）自动补全，请使用 `ActorContext` 特性：

```cs
[ActorContext]
public StringParameter ActorId;
```

要使用特定类型的 Actor ID 进行自动补全，请使用 `ActorContext`，其中第一个参数指定 Actor 资源的路径前缀。下面的示例将使用打印机 ID 进行补全：

```cs
[ActorContext(TextPrintersConfiguration.DefaultPathPrefix)]
public StringParameter PrinterId;
```

要自动补全在当前命令的相同或另一个参数中指定了 ID 的 Actor 的外观，请使用 `AppearanceContext`。请注意，这需要在同一命令中指定 `ActorContext`：

```cs
[ActorContext(CharactersConfiguration.DefaultPathPrefix)]
public StringParameter CharacterId;
[AppearanceContext]
public StringParameter CharacterAppearance;
```

除 `EndpointContext` 外，上述每个上下文特性都允许提供可选的 `index` 参数。将其与命名参数一起使用以指定特性应用于参数值的哪个部分。下面的示例将允许使用角色 ID 自动补全命名参数的名称部分，并使用当前键入角色的外观自动补全值部分（类似于 [@char] 命令的主参数）：

```cs
[ActorContext(CharactersConfiguration.DefaultPathPrefix, 0), AppearanceContext(1)]
public NamedStringParameter IdAndAppearance;
```

参数上下文特性可以应用于类而不是字段，以指定（或覆盖）父类中声明的字段的上下文。例如，虽然 `Id` 参数在抽象 `ModifyActor` 命令中声明，但上下文应用于 `ModifyBackground` 派生类：

```cs
[ActorContext(BackgroundsConfiguration.DefaultPathPrefix, paramId: "Id")]
public class ModifyBackground : ModifyActor { }
```

从内置命令继承自定义命令时，可以使用相同的方法。将参数上下文特性应用于类而不是字段时，请不要忘记提供可选的 `paramId` 参数。

::: tip
上述大多数参数上下文特性同样可以应用于表达式查询参数，以在 IDE 扩展中启用自动补全和诊断。请参阅 [查询指南](/zh/guide/expressions#参数上下文) 中的示例。
:::

## 枚举表达式

使用 `EnumContext` IDE 特性时，可以不指定枚举，而是指定一个由 IDE 求值的表达式，以根据命令参数值或其他变量（例如标题脚本的路径）生成枚举名称。

表达式语法：

- 需要求值的部分应包裹在花括号（`{}`）中
- 要引用脚本配置中分配的 `Start Game Script` 或 `Title Script` 的路径，请分别使用 `$EntryScript` 或 `$TitleScript`
- 要引用参数值，请使用 `:` 后跟参数 ID（C# 中指定的字段名称，而不是别名）
- 在参数引用后使用 `[0]` 或 `[1]` 指定命名值的组成部分（0 表示名称，1 表示值）
- 在参数引用后使用空合并（`??`）作为未指定值时的回退
- 使用单引号指定字面文本，例如作为回退值：`{:Id??'MainBackground'}`
- 使用连接运算符（`+`）合并多个枚举的值

例如，请看赋给自定义命令的命名参数的以下表达式（假设 `Quests/...` 枚举是通过自定义元数据提供者添加的）：

```cs
[EnumContext("Quests/{:QuestId[0]??$EntryScript}", 1)]
public NamedStringParameter QuestId;
```

当参数的名称部分被赋值为 `foo` 时，其求值结果为 `Quests/foo`；否则，假设 `Start Game Script` 的路径为 `bar`，其求值结果为 `Quests/bar`。

另一个示例是应用于 [@char] 命令的角色姿势表达式：

```cs
[EnumContext("Poses/Characters/{:Id??:IdAndAppearance[0]}+Poses/Characters/*", paramId: nameof(Pose))]
public class ModifyCharacter { ... }
```

这会将共享的角色姿势与特定角色的姿势合并，该角色的 ID 取自 `Id` 参数，或（未指定时）取自 `IdAndAppearance` 参数的名称部分。

枚举表达式与 [自定义元数据提供者](/zh/guide/ide-extension#元数据提供者) 相结合，允许为 IDE 扩展创建灵活的自动补全场景。

## 其他 IDE 和编辑器

如果您使用的是 VS Code 兼容的编辑器，例如 [VSCodium](https://vscodium.com)、[Cursor](https://www.cursor.com) 或 [Trae](https://www.trae.ai/)，请从 Open VSX 注册表安装我们的扩展：[open-vsx.org/extension/elringus/naninovel](https://open-vsx.org/extension/elringus/naninovel)。

虽然我们不维护其他编辑器的扩展，但我们在 [引擎 monorepo](https://github.com/naninovel/engine/tree/main/core/packages/language) 中提供了一个 [符合 LSP](https://microsoft.github.io/language-server-protocol) 的语言服务器。该服务器是用 C# 实现的，可以编译为 WASM，并具有内置的 JavaScript 绑定，使其可以在大多数现代 IDE 中使用。

我们的 VS Code 扩展基于同一个语言服务器构建。扩展的源代码也可以在 monorepo 中找到，您可以在将服务器集成到所选 IDE 时用作参考。要访问存储库，请 [注册您的许可证](https://naninovel.com/register)。

或者，如果您使用的编辑器支持 TextMate 语法（例如 [Sublime](https://www.sublimetext.com) 或 [Visual Studio](https://visualstudio.microsoft.com)），我们在此处提供了相应的语法文件：[textmate.json](https://github.com/naninovel/docs/blob/main/docs/.vitepress/ext/lang/textmate.json)。请注意，该语法仅可用于语法高亮；其他 IDE 功能仍需要语言服务器。
