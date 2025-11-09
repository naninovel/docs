# IDE支持

IDE 功能（如语法高亮、错误检查、自动补全和交互式文档）可以显著提升编写 [Naninovel 脚本](/zh/guide/naninovel-scripts) 的效率。我们为免费开源的 [Visual Studio Code](https://code.visualstudio.com)（支持 Windows、macOS 和 Linux）制作了扩展插件，为 NaniScript 语法提供完整的 IDE 支持。

![](https://i.gyazo.com/c07e4a512dec21b2dfdf582e73cc3b10.mp4)

## 设置

### 安装 VS Code 扩展

1. 通过 `View -> Extensions` 菜单打开 VS Code 的扩展窗口  
2. 搜索 “Naninovel” 并点击 “Install” 按钮  

![](https://i.gyazo.com/b85f1478acde3cad440d1f29f915f395.png)

::: info NOTE
VS Code 插件商店中的扩展与当前稳定版 Naninovel 兼容。若使用 Naninovel 预览版，请切换到扩展的预发布分支。若使用正式版，请在 VS Code 中禁用自动更新，并安装与当前版本对应的旧版扩展。
:::

### 激活扩展

1. 确保 Unity 项目中已[安装 Naninovel](/zh/guide/getting-started#install-naninovel)  
2. 使用 VS Code 打开该 Unity 项目文件夹  

当扩展检测到工作区中存在 `.nani` 文件时，会自动启用桥接服务，用于执行脚本诊断、提供自动补全、显示当前正在播放的脚本行等功能。

![](https://i.gyazo.com/e8b2c0689d75bed8f9a6dbf2d09d8eb0.png)

### 工作区根目录

Naninovel 会在生成的数据目录（默认 `Assets/NaninovelData`）下创建项目元数据和 VS Code 通信桥接文件。因此，在 VS Code 中打开 Naninovel 项目时（即选择 [workspace root](https://code.visualstudio.com/docs/editor/workspaces)），必须选择包含该目录的上层文件夹。

部分用户喜欢仅打开包含剧本脚本的文件夹，而不包括生成数据目录。此时，可将 `NaninovelData` 文件夹移动到剧本脚本所在的目录下，使 VS Code 能够“看到”它。

![](https://i.gyazo.com/1bd8f72bcd4ad30f55ff78592c1093aa.mp4)

移动后请重启 VS Code 以使更改生效。

## VS Code 设置

以下为推荐配置，用于忽略 Unity 自动生成的 `.meta` 文件、启用自动换行与拼写检查（需安装 [拼写检查扩展](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)），并关闭基于单词的建议：

```json
{
    "files.exclude": {
        "**/*.meta": true
    },
    "editor.wordWrap": "on",
    "editor.wordBasedSuggestions": "off",
    "editor.occurrencesHighlight": "off",
    "editor.suggest.showWords": false,
    "editor.bracketPairColorization.enabled": false,
    "cSpell.enableFiletypes": [
        "naniscript"
    ]
}
```

可通过 `File -> Preference -> Settings` 菜单打开设置面板，点击右上角 “Open Settings (JSON)” 按钮打开配置文件。选择 “User” 选项以全局生效，或选择 “Workspace” 仅对当前 Naninovel 项目生效。

![](https://i.gyazo.com/324d7e4568a066854d6cb8270eb73b6d.png)

部分配置在安装扩展包时会自动应用，你也可以根据需要进行覆盖。若希望自定义语法高亮，可添加以下设置并调整颜色：

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
— `semanticTokenColorCustomizations` 的颜色适用于 LSP 上下文（即扩展激活后脚本内容），而 `tokenColorCustomizations` 则应用于 TextMate 上下文（提示框中的片段及扩展激活前的脚本内容）。

::: tip
可在 [插件源码](https://github.com/naninovel/engine/blob/main/vscode/package.json) 的 `configurationDefaults` 中查看默认应用的完整设置。
:::

## 拼写检查

要在 Naninovel 脚本中启用拼写检查，请安装如 [Code Spell Check](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) 的扩展，并为 `naniscript` 语言启用检测。示例请参见下方 [设置章节](/zh/guide/ide-extension#vs-code-settings)。

![](https://i.gyazo.com/f66f7adcae6b366dfced8ec08f24cff9.png)

## 代码块折叠

以下内容默认支持代码折叠：

- 标签（Label）间的代码段  
- 连续的注释行  
- 缩进（嵌套）块  

此外，可通过特殊注释语法定义自定义折叠区域：

1. 使用 `; > region name` 开启区域，其中 “region name” 可为任意名称；  
2. 使用 `; < region name` 关闭区域，名称需与开启时一致。

![?width=450px](https://i.gyazo.com/1e84951c9d5c34e0295e58bb4e1ebe28.mp4)

## 项目元数据

Naninovel 的项目元数据是一个 JSON 文件，包含项目中可用的角色、背景、资源、指令等信息。这些信息被编辑工具（如 IDE 扩展与 Web 编辑器）使用，以提供自动补全与诊断功能。

元数据文件存储在 Unity 项目根目录的 `.nani/Metadata.json`。当在引擎配置中启用 “Auto Generate Metadata” 时，编辑器启动或 C# 脚本编译后会自动重新生成元数据。也可通过 `Naninovel -> Update Metadata` 菜单或快捷键 `Ctrl + Shift + U` 手动更新。

### 元数据提供者

若需在生成的元数据中填充自定义值或覆盖默认内容，可编写一个 C# 类实现 `IMetadataProvider` 接口（需具备无参构造函数）。当系统检测到自定义提供者时，将在每次生成元数据时（如与 IDE 扩展同步时）使用它替代默认实现。

以下为默认的元数据提供者示例，可在自定义实现时参考：

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

Naninovel 提供若干 [C# 特性（Attributes）](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/attributes)，用于为自定义指令与表达式函数提供 IDE 相关功能。例如，为自定义指令及其参数添加悬停说明文档，可分别在指令类型和字段上使用 `Doc` 特性。

```csharp
[Doc("Summary of the custom command.")]
public class CustomCommand : Command
{
    [Doc("Summary of the custom parameter.")]
    public StringParameter CustomParameter;
}
```

要让参数在自动补全中包含内置与自定义表达式函数及预定义变量，请使用 `ExpressionContext` 特性。

```csharp
[ExpressionContext]
public StringParameter Expression;
```

要让参数自动补全任意 [枚举类型](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum) 的值，请使用 `ConstantContext` 特性。

```csharp
[ConstantContext(typeof(PlatformID))]
public StringParameter Platform;
```

要让参数自动补全并分析脚本跳转终点（脚本路径与标签）的合法性，请使用 `EndpointContext` 特性。

```csharp
[EndpointContext]
public NamedStringParameter Goto;
```

要让参数自动补全资源路径，请使用 `ResourceContext` 特性并提供资源路径前缀，例如以下代码将自动补全音频资源路径：

```csharp
[ResourceContext(AudioConfiguration.DefaultAudioPathPrefix)]
public StringParameter Audio;
```

若需自动补全任意类型的演员 ID，请使用 `ActorContext` 特性。

```csharp
[ActorContext]
public StringParameter ActorId;
```

若仅补全特定类型的演员 ID，请为 `ActorContext` 特性传入第一个参数指定演员资源路径前缀，例如以下代码将补全打印机（Printer）ID：

```csharp
[ActorContext(TextPrintersConfiguration.DefaultPathPrefix)]
public StringParameter PrinterId;
```

若需自动补全演员外观（Appearance），且该演员 ID 来自当前指令的同名或其他参数，请使用 `AppearanceContext` 特性。请注意，此功能要求当前指令中同时声明了 `ActorContext` 特性。

```csharp
[ActorContext(CharactersConfiguration.DefaultPathPrefix)]
public StringParameter CharacterId;
[AppearanceContext]
public StringParameter CharacterAppearance;
```

上述特性均可选传入 `namedIndex` 参数，用于指定在命名参数中该特性应用于参数值的哪一部分。例如，以下示例中，命名参数的 “名称部分” 自动补全角色 ID，而 “值部分” 自动补全对应角色的外观（类似 [@char] 指令的无名参数）：

```csharp
[ActorContext(CharactersConfiguration.DefaultPathPrefix, 0), AppearanceContext(1)]
public NamedStringParameter IdAndAppearance;
```

参数上下文特性也可以应用于类，而非字段，用于为父类中声明的字段指定或覆盖上下文。例如，虽然 `Id` 参数定义在抽象类 `ModifyActor` 中，但上下文可以在继承的 `ModifyBackground` 类中定义：

```csharp
[ActorContext(BackgroundsConfiguration.DefaultPathPrefix, paramId: "Id")]
public class ModifyBackground : ModifyActor { }
```

当你从内置指令派生自定义指令时，也可使用相同方法。如果将特性应用于类而非字段，别忘了提供可选的 `paramId` 参数。

::: tip
大多数参数上下文特性同样可用于表达式函数参数，使其在 IDE 扩展中获得自动补全与诊断功能。示例可参考 [函数指南](/zh/guide/script-expressions#parameter-context)。
:::

## 常量表达式

在使用 `ConstantContext` IDE 特性时，除了枚举类型外，还可以指定一个表达式（Expression），由 IDE 在运行时计算，以根据指令参数值或其他变量（如当前检查的脚本）生成常量名称。

表达式语法说明：

- 需要计算的部分应使用大括号（`{}`）包裹  
- 若要引用当前正在检查的脚本路径，请使用 `$Script`  
- 若要引用参数值，请使用 `:` 后跟参数 ID（即 C# 中的字段名，而非别名）  
- 在参数引用后使用 `[0]` 或 `[1]` 可指定命名参数的部分（0 表示名称部分，1 表示索引部分）  
- 使用空合并运算符（`??`）可在值未指定时提供后备值  
- 使用连接运算符（`+`）可将多个常量的值拼接  

例如，可查看内置 `[@goto]` 指令中 `Path` 参数所使用的表达式：

```csharp
[ConstantContext("Labels/{:Path[0]??$Script}", 1)]
public NamedStringParameter Path;
```

—— 当参数的名称部分被赋值为 `foo` 时，表达式会计算为 `Labels/foo`；否则，如果当前检查的脚本路径为 `bar`，则会计算为 `Labels/bar`。

另一个示例是应用于 `@char` 指令的人物姿势（character poses）：

```csharp
[ConstantContext("Poses/Characters/{:Id??:IdAndAppearance[0]}+Poses/Characters/*", paramId: nameof(Pose))]
public class ModifyCharacter { ... }
```

—— 会将共享的人物姿势与由 “ID” 参数指定的角色（或当未指定时由 “IdAndAppearance” 参数的名称部分指定的角色）姿势合并。

将常量表达式与 [自定义元数据提供者](/zh/guide/ide-extension#metadata-provider) 结合使用，可为 IDE 扩展创建任意形式的自动补全场景。

## 其他 IDE 与编辑器

如果你使用与 VS Code 兼容的编辑器，例如 [VSCodium](https://vscodium.com)、[Cursor](https://www.cursor.com) 或 [Trae](https://www.trae.ai)，可以从 Open VSX 注册表安装我们的扩展：[open-vsx.org/extension/elringus/naninovel](https://open-vsx.org/extension/elringus/naninovel)。

![](https://i.gyazo.com/57590a6871aec7ae41097d7d0ae9bf63.png)

虽然我们没有为其他编辑器维护专用扩展，但在 [引擎单体仓库](https://github.com/naninovel/engine/tree/main/core/packages/language) 中提供了一个 [符合 LSP 标准](https://microsoft.github.io/language-server-protocol) 的语言服务器。该服务器由 C# 实现，可编译为 WASM，并内置 JavaScript 绑定，使其可在大多数现代 IDE 中使用。

我们的 VS Code 扩展正是基于该语言服务器构建的。扩展的源码也可在 [单体仓库](https://github.com/naninovel/engine/tree/main/vscode) 中获取 —— 如果你希望在自己的 IDE 中集成该语言服务器，可参考这些源码。如需访问仓库，请先[注册你的许可证](https://naninovel.com/register)。

此外，如果你使用支持 TextMate 语法的编辑器（例如 [Sublime](https://www.sublimetext.com) 或 [Visual Studio](https://visualstudio.microsoft.com)），我们也提供了对应语法文件：[textmate.json](https://github.com/naninovel/docs/blob/main/docs/.vitepress/ext/lang/textmate.json)。请注意，该语法文件仅用于语法高亮，其他 IDE 功能仍需语言服务器支持。
