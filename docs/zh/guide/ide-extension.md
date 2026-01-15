# VS Code 扩展

代码编辑器的功能，如语法高亮、错误检查、自动补全和交互式文档，可以显著提高生产力。Naninovel 拥有官方的 [VS Code](https://code.visualstudio.com) 扩展，为使用 [Naninovel 脚本](/zh/guide/scenario-scripting) 提供了丰富的创作工具。

![?class=when-dark](https://i.gyazo.com/8ccfe73f2b0d39dfe8479a02a218a011.png)
![?class=when-light](https://i.gyazo.com/110a7ca29df4d19f9a019732e1a68019.png)

## 设置

### 安装 VS Code 扩展

1. 通过 `View -> Extensions` 菜单打开 VS Code 中的扩展视图
2. 搜索 "Naninovel" 并点击 "Install"

![](https://i.gyazo.com/85999dd50f414c13de12b46e640bf531.png)

::: info NOTE
VS Code 注册表中的扩展与当前的 Naninovel 稳定版本兼容。使用 Naninovel 的预览版本时，请切换到预发布扩展流。使用最终 Naninovel 版本时，请禁用 VS Code 中的自动更新并安装关联的旧版本。
:::

### 激活扩展

1. 确保 Unity 项目中 [已安装 Naninovel](/zh/guide/getting-started#安装-naninovel)。
2. 在 VS Code 中打开 Unity 项目的 `Assets` 文件夹。

当扩展在当前工作区检测到 `.nani` 文件时，它将激活 LSP 服务。该服务处理脚本诊断、自动补全以及指示当前正在播放哪一行脚本等任务。

![?width=260](https://i.gyazo.com/5eae1dda34e4b36474333227de62d1ee.png)

### 工作区根目录

Naninovel 在生成的数据目录（默认为 `Assets/NaninovelData`）下生成与 VS Code 扩展通信所需的项目元数据和桥接文件。这意味着在 VS Code 中打开 Naninovel 项目（选择 [工作区根目录](https://code.visualstudio.com/docs/editor/workspaces)）时，您需要选择一个在某个层级包含生成数据目录的文件夹。

但是，有些用户更喜欢只打开包含剧本脚本的文件夹，其中不包括生成的数据目录。在这种情况下，请将 `NaninovelData` 文件夹移动到剧本脚本文件夹中，使其对 VS Code 可见。

移动文件夹后重新启动 VS Code 以使更改生效。

## VS Code 设置

以下是 VS Code 的推荐设置，用于忽略 Unity 自动生成的元文件，启用自动换行和拼写检查（如果安装了 [拼写检查扩展](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)），并禁用基于单词的建议：

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

您可以通过 `File -> Preferences -> Settings` 访问设置 JSON 文件，然后单击窗口右上角的 "Open Settings (JSON)" 按钮。选择 "User" 选项卡以编辑所有项目的设置，或选择 "Workspace" 以仅影响包含剧本脚本的当前项目。

安装包时默认应用上述某些设置，但如果您愿意，可以覆盖它们。如果您还想自定义语法高亮显示，请添加以下内容并调整颜色：

```json
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
            "Error": "#d14e4e"
        }
    },
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
            "Error": "#be2222"
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
            { "scope": ["naniscript.text-identifier"], "settings": { "foreground": "#5d6470" } }
        ]
    },
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
            { "scope": ["naniscript.text-identifier"], "settings": { "foreground": "#acb5c6" } }
        ]
    }
}
```

`semanticTokenColorCustomizations` 颜色应用于 LSP 上下文（激活扩展后的脚本内容），而 `tokenColorCustomizations` 应用于 TextMate 上下文（工具提示中的片段和激活扩展前的脚本）。

::: tip
在 [包源代码](https://github.com/naninovel/engine/blob/main/vscode/package.json) 的 `configurationDefaults` 下查找默认应用的完整设置。
:::

## 折叠

以下结构默认获得折叠支持：

- 标签（直到另一个标签）
- 连续的注释行
- 缩进（嵌套）块

您还可以使用以下语法通过注释指定自定义折叠区域：

1. 以 `; > region name` 打开，其中 "region name" 可以是任何内容
2. 以 `; < region name` 关闭，其中 "region name" 等于打开时的名称

## 项目元数据

Naninovel 元数据是一个 JSON 文件，其中包含与创作项目相关的各种信息：可用角色、背景、资源、命令等。创作工具（例如 IDE 扩展和 Web 编辑器）使用此信息来提供有用的功能，例如自动补全和诊断。

元数据文件存储在 `NaninovelData` 自动生成文件夹下的 `.nani/Metadata.json` 中。当引擎配置中启用 `Auto Generate Metadata` 时，元数据会在域重新加载以及编辑 Naninovel 配置或资源资产后自动重新生成。要手动更新元数据，请使用 `Naninovel -> Update Metadata` 编辑器菜单或 `Ctrl + Shift + U` 热键。

::: tip
如果元数据未同步，请确保引擎配置中已打开 `Enable Bridging`，并确保引擎配置菜单顶部显示的 `Generated Data Root` 值等于 IDE 扩展报告的数据根目录。
:::

### 元数据提供者

要使用其他自定义值填充生成的元数据或覆盖默认值，请创建一个实现 `IMetadataProvider` 接口的 C# 类；实现应该有一个无参数构造函数。如果找到，每次生成项目元数据时都会使用自定义提供者而不是默认提供者。

以下是默认的元数据提供者，您可以在实现自己的提供者时将其用作参考：

```csharp
public class DefaultMetadataProvider : IMetadataProvider
{
    public Project GetMetadata ()
    {
        var meta = new Project();
        var cfg = ProjectConfigurationProvider.LoadOrDefault<ScriptsConfiguration>();
        meta.EntryScript = cfg.StartGameScript;
        meta.TitleScript = cfg.TitleScript;
        Notify("Processing commands...", 0);
        meta.Commands = MetadataGenerator.GenerateCommandsMetadata();
        Notify("Processing resources...", .25f);
        meta.Resources = MetadataGenerator.GenerateResourcesMetadata();
        Notify("Processing actors...", .50f);
        meta.Actors = MetadataGenerator.GenerateActorsMetadata();
        Notify("Processing variables...", .75f);
        meta.Variables = MetadataGenerator.GenerateVariablesMetadata();
        Notify("Processing functions...", .95f);
        meta.Functions = MetadataGenerator.GenerateFunctionsMetadata();
        Notify("Processing constants...", .99f);
        meta.Constants = MetadataGenerator.GenerateConstantsMetadata();
        meta.Syntax = Compiler.Syntax;
        return meta;
    }

    private static void Notify (string info, float progress)
    {
        if (EditorUtility.DisplayCancelableProgressBar("Generating Metadata", info, progress))
            throw new OperationCanceledException("Metadata generation cancelled by the user.");
    }
}
```

## IDE 属性

Naninovel 提供了一些 [C# 属性](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/attributes) 来为自定义命令和表达式函数启用 IDE 相关功能。例如，要向自定义命令和/或参数添加悬停文档，请分别将 `Doc` 属性应用于命令类型和参数字段：

```csharp
[Doc("Summary of the custom command.")]
public class CustomCommand : Command
{
    [Doc("Summary of the custom parameter.")]
    public StringParameter CustomParameter;
}
```

要使参数支持内置和自定义表达式函数以及预定义自定义变量的自动补全，请使用 `ExpressionContext` 属性：

```csharp
[ExpressionContext]
public StringParameter Expression;
```

要使用任意 [枚举类型](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum) 的值进行自动补全，请使用 `ConstantContext` 属性：

```csharp
[ConstantContext(typeof(PlatformID))]
public StringParameter Platform;
```

要自动补全和分析导航端点（脚本路径和标签）的使用情况和正确性，请使用 `EndpointContext` 属性：

```csharp
[EndpointContext]
public NamedStringParameter Goto;
```

要使用资源自动补全，请使用 `ResourceContext` 并提供资源的路径前缀。下面的示例将使用音频资源进行补全：

```csharp
[ResourceContext(AudioConfiguration.DefaultAudioPathPrefix)]
public StringParameter Audio;
```

要使用 actor ID（任何类型）自动补全，请使用 `ActorContext` 属性：

```csharp
[ActorContext]
public StringParameter ActorId;
```

要使用特定类型的 actor ID 进行自动补全，请使用 `ActorContext`，其中第一个参数指定 actor 资源的路径前缀。下面的示例将使用打印机 ID 进行补全：

```csharp
[ActorContext(TextPrintersConfiguration.DefaultPathPrefix)]
public StringParameter PrinterId;
```

要自动补全在当前命令的相同或另一个参数中指定了 ID 的 actor 的外观，请使用 `AppearanceContext`。请注意，这需要在同一命令中指定 `ActorContext`：

```csharp
[ActorContext(CharactersConfiguration.DefaultPathPrefix)]
public StringParameter CharacterId;
[AppearanceContext]
public StringParameter CharacterAppearance;
```

上述每个属性都允许提供可选的 `namedIndex` 参数。将其与命名参数一起使用以指定属性应用于参数值的哪个部分。下面的示例将允许使用角色 ID 自动补全命名参数的名称部分，并使用当前键入角色的外观自动补全值部分（类似于 [@char] 命令的无名参数）：

```csharp
[ActorContext(CharactersConfiguration.DefaultPathPrefix, 0), AppearanceContext(1)]
public NamedStringParameter IdAndAppearance;
```

参数上下文属性可以应用于类而不是字段，以指定（或覆盖）父类中声明的字段的上下文。例如，虽然 `Id` 参数在抽象 `ModifyActor` 命令中声明，但上下文应用于 `ModifyBackground` 派生类：

```csharp
[ActorContext(BackgroundsConfiguration.DefaultPathPrefix, paramId: "Id")]
public class ModifyBackground : ModifyActor { }
```

从内置命令继承自定义命令时，可以使用相同的方法。将参数上下文属性应用于类而不是字段时，请不要忘记提供可选的 `paramId` 参数。

::: tip
大多数相同的参数上下文属性可以应用于表达式函数参数，以在 IDE 扩展中启用自动补全和诊断。请参阅 [函数指南](/zh/guide/script-expressions#参数上下文) 中的示例。
:::

## 常量表达式

使用 `ConstantContext` IDE 属性时，除了枚举之外，还可以指定一个由 IDE 评估的表达式，以根据命令参数值或其他变量（例如当前检查的脚本）生成常量名称。

表达式语法：

- 评估部分应包裹在花括号 (`{}`) 中
- 要引用当前检查的脚本路径，请使用 `$Script`
- 要引用参数值，请使用 `:` 后跟参数 ID（C# 中指定的字段名称，而不是别名）
- 在参数引用后使用 `[0]` 或 `[1]` 指定命名值（0 表示名称，1 表示索引）
- 在参数引用后使用空合并 (`??`) 作为值未指定时的后备
- 使用连接运算符 (`+`) 合并多个常量的值

例如，检查分配给内置 `[@goto]` 命令的 `Path` 参数的表达式：

```csharp
[ConstantContext("Labels/{:Path[0]??$Script}", 1)]
public NamedStringParameter Path;
```

当参数的名称组件被分配为 `foo` 时，它将评估为 `Labels/foo`；否则，假设检查的脚本路径为 `bar`，它将评估为 `Labels/bar`。

应用于 `@char` 命令的角色姿势的另一个示例：

```csharp
[ConstantContext("Poses/Characters/{:Id??:IdAndAppearance[0]}+Poses/Characters/*", paramId: nameof(Pose))]
public class ModifyCharacter { ... }
```

这将把共享的角色姿势与 ID 分配给 "Id" 参数或（当未分配时）"IdAndAppearance" 参数的名称组件的角色的姿势合并。

常量表达式与 [自定义元数据提供者](/zh/guide/ide-extension#元数据提供者) 相结合，允许为 IDE 扩展创建灵活的自动补全场景。

## 其他 IDE 和编辑器

如果您使用的是 VS Code 兼容的编辑器，例如 [VSCodium](https://vscodium.com)、[Cursor](https://www.cursor.com) 或 [Trae](https://www.trae.ai/)，请从 Open VSX 注册表安装我们的扩展：[open-vsx.org/extension/elringus/naninovel](https://open-vsx.org/extension/elringus/naninovel)。

虽然我们不维护其他编辑器的扩展，但我们在 [引擎 monorepo](https://github.com/naninovel/engine/tree/main/core/packages/language) 中提供了一个 [符合 LSP](https://microsoft.github.io/language-server-protocol) 的语言服务器。该服务器是用 C# 实现的，可以编译为 WASM，并具有内置的 JavaScript 绑定，使其可以在大多数现代 IDE 中使用。

我们的 VS Code 扩展建立在同一个语言服务器之上。扩展源也可以在 monorepo 中找到 — 在将服务器集成到您选择的 IDE 中时，请随意使用它们作为参考。要访问存储库，请 [注册您的许可证](https://naninovel.com/register)。

或者，如果您使用的编辑器支持 TextMate 语法（例如 [Sublime](https://www.sublimetext.com) 或 [Visual Studio](https://visualstudio.microsoft.com)），我们在此处提供一个：[textmate.json](https://github.com/naninovel/docs/blob/main/docs/.vitepress/ext/lang/textmate.json)。请注意，语法仅可用于语法高亮；其他 IDE 功能仍需要语言服务器。
