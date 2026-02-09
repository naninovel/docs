# 本地化

所有游戏资源（脚本、音频、语音、背景等）都可以本地化为多种语言/文化。

默认情况下，最初用于创作项目的资源与*源语言环境*相关联。例如，如果游戏最初是用英语创作的，则所有原始（源）场景脚本、UI、背景标志等都是英语；这意味着*源语言环境*是 `en`（或者如果你希望为特定地区使用单独的语言环境，则为 `en-GB` / `en-US` / 等）。

可以通过 `Naninovel -> Configuration -> Localization` 菜单中的 `Source Locale` 属性更改*源语言环境*。`Source Locale` 设置仅确定与源项目资产关联的语言环境的名称 (ID)，并用于设置和相关引擎 API 中的“语言”下拉菜单以区分语言环境。

![](https://i.gyazo.com/84eea85d3c3deddd187af1ed843f1bd5.png)

::: tip
如果你想与第三方共享源可本地化文本（例如，用于校对）但不想共享源场景脚本，请将 `Source Locale` 更改为某个你实际上不会使用的不相关语言，然后禁用 `Expose Source Locale` 并为源材料添加一个专用语言环境。然后可以将该语言环境导出到本地化[文档](/zh/guide/localization#脚本本地化)或[电子表格](/zh/guide/localization#电子表格)。
:::

要添加语言环境，请在 `Resources/Naninovel/Localization`（*本地化资源根目录*）内创建一个子文件夹，其名称等于你希望支持的 [RFC5646](https://gist.github.com/Elringus/db90d9c74f13c00fa35131e61d1b73cb) 语言标记之一。例如，要添加德语，请创建 `Resources/Naninovel/Localization/de`。内置游戏设置 UI 中的“语言”下拉菜单将自动包含所有添加的语言环境。

请注意，你不必为*源语言环境*在*本地化资源根目录*中创建子文件夹。存储在*本地化资源根目录*之外的所有项目资源默认属于*源语言环境*。

可以通过 `Loader > Path Prefix` 属性在本地化配置菜单中更改*本地化资源根目录*路径。请注意，配置的路径是相对于“Resources”文件夹（而不是“Assets”）的。Unity 以特殊方式处理 Resources 文件夹；你可以在项目内的任何位置拥有多个此类文件夹来组织特定于语言环境的资产。

::: tip
你可以选择不同的资源提供者，而不是使用 `Resources` 文件夹；例如，使用 [Addressables](/zh/guide/resource-providers#addressable)，你可以独立于主游戏包捆绑特定于语言环境的资源，并按需下载它们。
:::

## 默认语言环境

要指定玩家首次运行游戏时默认选择的语言环境，请使用本地化配置菜单中的 `Default Locale` 属性。未指定此属性时，游戏将在 `Source Locale` 中启动。

当启用 `Auto Detect Locale` 选项且游戏首次运行时，Naninovel 将尝试根据系统语言检测语言环境。如果检测成功且游戏支持该语言环境，则将选择该语言环境；否则游戏将回退到 `Default Locale`。

::: warning
自动检测到的语言环境不会包含说明符；即，当系统语言为英语时，检测到的语言环境将是 `en`，绝不会是 `en-US` 或 `en-GB`。这是 Unity [系统语言检测](https://docs.unity3d.com/ScriptReference/Application-systemLanguage)的限制。依赖自动检测时，避免在添加的语言环境中使用说明符。
:::

## 资源本地化

在*本地化资源根目录*内，存储在游戏设置中选择相应本地化时将用于代替源资源的资源。

例如，如果你希望在选择 `ja-JP` 语言环境时替换主背景（Actor ID `MainBackground`）的 "City" 外观精灵，请将本地化版本放置在：

```
Resources/Naninovel/Localization/ja-JP/Backgrounds/MainBackground/City
```

## 脚本本地化

资源本地化方案适用于大多数资源类型，除了场景脚本和托管文本文档。对于这些类型，请使用通过 `Naninovel -> Tools -> Localization` 访问的本地化工具：

![](https://i.gyazo.com/1b47d70dcbbb45a3ab955b44c9b50942.png)

首先，选择 `Scripts Folder (input)` —— 存储 Naninovel 场景脚本 (`.nani`) 的项目目录（例如 `Assets/Scenario`）。可选地，若要同时为[托管文本](/zh/guide/managed-text)生成本地化文档，请选择 `Text Folder (input)` —— 存储托管文本文档的目录（默认为 `Assets/Resources/Naninovel/Text`）。

或者，如果你希望不从源脚本而是从先前为另一个语言环境生成的文档生成本地化文档，请选择包含该语言环境现有本地化文档的文本文件夹，例如 `Assets/Resources/Naninovel/Localization/ja-JP/Text`。

然后选择生成的本地化资源应存储到的语言环境文件夹路径。确保你选择了实际的语言环境文件夹（例如 `Resources/Naninovel/Localization/ja-JP`）。字段下方的标签将指示何时选择了有效的输出语言环境文件夹并显示目标语言环境名称。

::: tip
你可以通过选择*本地化资源根目录*而不是特定的语言环境文件夹来一次为项目中的所有语言环境生成资源；该工具将遍历子文件夹并为每个子文件夹生成资源。

![](https://i.gyazo.com/4f0a6373755f0e122958f1f98de13013.png)
:::

按“Generate”创建或更新本地化资源。在后续运行中，该工具将尊重先前生成的本地化文档，并在源材料未更改时保留本地化条目。

脚本本地化文档在 `Scripts` 文件夹下分组，并包含以下格式的语句：

```nani
# ID
; Source text
Translation text
```

`# ID` 行是本地化内容的唯一标识符，不应修改。

`; Source text` 行包含要翻译的原始内容。这是一个注释，因此更改它不会影响游戏——它是为了方便翻译人员而提供的。

将实际翻译直接放在注释行之后。为了便于阅读，可以使用多行（它们将被连接），但确保它们出现在下一个 `# ID` 行之前。例如：

```nani
# aj0e5dea
; Aliquam ut <b>ultricies</b> enim, id venenatis.<br>Nullam rhoncus eros tempus.
Оценивая блеск <b>металлического</b> шарика, пространство равноденственно.<br>
Противостояние есть метеорный дождь.
```

### 连接行

当翻译的通用行包含内联命令或表达式时，它可能会被拆分为多个文本片段，每个片段映射到一个唯一的文本 ID。启用 **Join Lines** 时，此类片段将使用管道符号 `|` 连接成一行。

例如，给定以下源脚本文本：

```nani
Looks like rain is starting[rain]. Hey, {MC}, hurry up!
```

— 本地化文档将包含：

```nani
# id1|id2|id3
; Looks like rain is starting|. Hey, |, hurry up!
```

注意内联命令和表达式被替换为 `|`。在翻译文本中保留它们，例如：

```nani
# id1|id2|id3
; Looks like rain is starting|. Hey, |, hurry up!
Похоже, дождь начинается|. Эй, |, поспеши!
```

如果目标语言需要，你还可以重新排列本地化片段，例如：

```nani
# id1|id2
; Hey, |, hurry up!
|, эй, поспеши!
```

— 这将在句子的其余部分之前打印 `{MC}`（主角姓名）。

::: tip
为了让翻译人员更好地控制内联内容（例如，允许重写命令或更改表达式顺序），请查看[显示事件](/zh/guide/text-printers#显示事件)和[显示表达式](/zh/guide/text-printers#显示表达式)。
:::

### 注释

启用 **Include Annotations** 时，生成的本地化文档包括正在本地化的源脚本内容（命令或通用行），以及放置在它之前的任何注释。例如，给定此源脚本：

```nani
; Player has to pick route.
@choice "Go left" set:route="left"
@choice "Go right" set:route="right"
Narrator: You've decided to go {route}. Wise choice!
```

—生成的本地化文档将包含：

```nani
# id1
; > Player has to pick route.
; > @choice "|#id1|" set:route="left"
; Go left

# id2
; > @choice "|#id2|" set:route="right"
; Go right

# id3|id4
; > Narrator: |#id3|{route}|#id4|
; You've decided to go |. Wise choice!
```

注释为翻译人员提供了本地化文本的上下文。确保 **不要** 在翻译中包含注释行（以 `; >` 开头的行）。只有单个 `;` 行需要翻译。

::: tip 示例
在[本地化示例](/zh/guide/samples#本地化)中查找本地化设置示例。如果在项目中设置本地化时遇到问题，请将其用作参考。
:::

## 电子表格

你可以将所有项目场景脚本和托管文本本地化编译成电子表格——例如，与翻译人员或编辑共享文本。

Spreadsheet 工具将可本地化文本提取到 `.csv` 表格中，并将编辑后的表格导回项目。

![](https://i.gyazo.com/50767f3193ae5b3ed423ea7c213c786b.png)

在导出之前，始终使用本地化工具 (`Naninovel -> Tools -> Localization`) 生成本地化数据。你可以通过为 `Locale Folder` 属性选择本地化根目录 (`Resources/Naninovel/Localization`) 来一次为所有语言环境生成资源。

![](https://i.gyazo.com/047d43250a941b918de65205a19b2d78.png)

当本地化数据是最新的时，通过 `Naninovel -> Tools -> Spreadsheet` 打开 Spreadsheet 工具。

![](https://i.gyazo.com/16cd076ebcc43b2d1a058c10e9dea43d.png)

指定所需的文件夹：
- Input Script Folder — 存储源 `.nani` 脚本的文件夹（例如 `Assets/Scenario`）。
- Input Text Folder — 生成[托管文本文档](/zh/guide/managed-text)的文件夹（例如 `Assets/Resources/Naninovel/Text`）。如果文件夹丢失，请确通过工具保生成托管文本文档。
- Input Localization Folder — 存储语言环境资源的本地化根目录（例如 `Assets/Resources/Naninovel/Localization`）。
- Output Folder — 生成或编辑表格的目标位置。

点击 "Export" 将表格导出到选定的目标位置。

每个脚本和托管文本文档将导出到一个单独的表格。每个表格都有一个存储可本地化文本 ID 的 "ID" 列和每个语言环境的附加列。你可以修改除 "ID" 之外的任何列；但是，修改源语言环境列对导入没有任何影响。

启用 **Include Annotations** 时，生成的表格还将包含带有源脚本内容（作者姓名、内联命令和注释）的列。该列在导入期间被忽略。

编辑表格后，点击 "Import" 将数据带回项目。

::: warning
从电子表格导入时，项目本地化文档将被覆盖，因此在编辑电子表格时避免修改它们以防止冲突。
:::

### 自定义处理器

你可以注入自定义电子表格处理器以自定义表格生成和导入/导出过程。

通过继承内置的 `Naninovel.Spreadsheet.Processor` 创建自定义处理器类。该实用程序将自动选取你的自定义处理程序并使用它代替内置处理程序。

下面是一个具有关键覆盖点的示例处理器：

```csharp
using Naninovel.Spreadsheet;

public class CustomProcessor : Processor
{
    public CustomProcessor (ProcessorOptions options) : base(options)
    {
        // Access export/import options, e.g.:
        // options.ScriptFolder
        // options.SourceLocale
        // ...
    }

    // Override how scripts are exported from project to sheets.
    protected override void ExportScripts () { }
    // Override how managed text is exported from project to sheets.
    protected override void ExportText () { }
    // Override how scripts are imported from sheets to project.
    protected override void ImportScripts () { }
    // Override how managed text is imported from sheets to project.
    protected override void ImportText () { }
}
```

::: tip 示例
在[本地化示例](/zh/guide/samples#本地化)中查找有关如何设置和使用该工具的示例。
:::

## UI 本地化

要本地化自定义和内置 UI，请使用[托管文本提供者](/zh/guide/managed-text#管理文本提供者)组件。它还可以用于本地化任何其他自定义游戏对象（预制件）。有关使用托管文本记录并对其进行本地化的更多信息，请参阅托管文本指南。

## 字体

要以某些语言显示文本，你需要兼容的字体。默认使用 `Inter`，支持 Unicode 7.0 中的拉丁语、西里尔语和希腊语字符。

::: tip
如果你计划用一种字体支持多种语言，请考虑 [Noto 字体](https://www.google.com/get/noto/)。
:::

TMPro 打印机支持从右到左 (RTL) 语言（阿拉伯语、希伯来语、波斯语等），但需要额外的设置；有关详细信息，请参阅[指南](/zh/guide/text-printers#从右到左-阿拉伯语-文本)。

发布 CJK 语言（中文、日文和韩文）时，请考虑使用 Character Extractor 实用程序来优化 TMPro 字体图集大小。请参阅[指南](/zh/guide/text-printers#cjk-语言)。

要将字体与特定语言环境关联，请使用 UI 配置中字体选项的 `Apply On Locale` 属性。分配后，每当在游戏设置中选择该语言环境时，字体将自动应用。

![](https://i.gyazo.com/e44d120c983f3d6c1d15e910829fc344.png)

确保在文本打印机上正确设置了 `Font Change Configuration`。有关配置字体的说明，请参阅 [UI 指南](/zh/guide/gui#更改字体)。

::: tip 示例
在[本地化示例](/zh/guide/samples#本地化)中查找有关设置特定于本地化的字体的示例。
:::

## 社区本地化

当已发布的游戏获得足够的人气时，社区可能希望贡献额外的本地化；这通常导致用户破解构建资产以替换显示的文本。Naninovel 提供了一个运行时本地化选项，允许你在不篡改构建文件的情况下添加社区本地化。

### 弹出本地化资源

要生成本地化资源（脚本和托管文本文档），请使用 `-nani-eject` 参数运行游戏可执行文件，例如：

```
./game.exe -nani-eject
```

这将像往常一样启动游戏，但在 Naninovel 初始化后，它会将本地化资源弹出到 `Localization` 下的 Unity [持久数据文件夹](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html)。例如，如果公司名称是 `Foo` 且游戏标题是 `Bar`，Windows 上的弹出路径将是：

```
C:/Users/User/AppData/LocalLow/Foo/Bar/Localization
```

如果你想基于内置本地化生成本地化资源，请将语言环境标记附加到 eject 参数。例如，假设游戏具有 `ja-JP` 本地化，请使用：

```
-nani-eject-ja-JP
```

当未指定语言环境标记时，将弹出源语言环境的文档。

现在提供与本地化一起使用的字体。将字体文件放在 Localization 目录下，例如 `Localization/Noto.ttf`。

注意 `Localization/Info.txt` 文件。通过替换默认内容指定本地化的作者（第一行）和提供的字体名称（第二行）。例如：

```
Awesome Author
Noto.ttf
```

— "Awesome Author" 将默认显示在语言下拉菜单中（开发人员可以自定义）。字体将在游戏启动时默认应用。

不要删除或移动 `Info.txt` 文件，因为它是检测社区本地化存在所必需的。

### 翻译

文档弹出后，你可以开始翻译。过程类似于上面的“脚本本地化”和“UI 本地化”。脚本本地化文档存储在 `Localization/Text/Scripts` 中，而托管文本文档存储在 `Localization/Text` 中。

像往常一样重启游戏（不带 eject 参数），它将自动使用持久数据文件夹中的本地化资源。要使脚本本地化更改生效，必须重新加载关联的脚本（保存加载通常就足够了），但在某些情况下可能需要重启。

如果开发人员更新了游戏，你可以再次弹出以更新现有的本地化；将插入新行和记录，同时保留未更改源材料的现有翻译。

翻译完成后，共享 `Localization` 文件夹并指示最终用户将其放置在上述持久数据目录下以激活本地化。要禁用本地化，请删除该文件夹。

## 编译器本地化

NaniScript 在领域特定语言中很特别，因为它与自然语言紧密交织在一起，即作者不断在显示给玩家的散文（打印的文本行）和引擎构造（命令和标签）之间切换。

只要你用英语创作场景，这就不是问题，但是用其他语言工作的作者将不得不切换键盘布局来输入自然文本和基于英语的命令。更糟糕的是，某些布局可能没有所需的字符（例如 `@`），这就要求作者通过键码输入它们。

为了帮助用英语以外的语言创作场景，Naninovel 具有编译器本地化功能。它允许重新映射控制字符以及命令和参数名称、常量以及创作场景时需要输入的任何内容。

首先，通过 `Create -> Naninovel -> Compiler Localization` 创建编译器本地化资产。选择资产并指定编译器工件所需的本地化：

![](https://i.gyazo.com/5ffcd8e06231616598cc8317f7854f9a.png)

要覆盖命令、参数、函数和常量，请使用专用列表。你还可以本地化与命令和参数关联的文档和使用示例；这些将显示在 IDE 扩展中。

![](https://i.gyazo.com/4fdcdcec7361a9ccbcc1012d842ef4ad.png)

列表最初是空的。要使用项目中可用的命令和函数填充它们，请使用检查器上下文菜单。

![](https://i.gyazo.com/cddd1981c5aef5f16da2052898c7a530.png)

进行所需的更改后，重新启动 Unity 编辑器并重新导入场景脚本资产以使更改生效。

本地化工件将传播到可视化编辑器和 [IDE 扩展](/zh/guide/ide-extension)，在元数据同步后提供自动完成和悬停文档。

![](https://i.gyazo.com/fde9998597ffedb8a025401bb2f71ce9.png)

::: tip 示例
查看[编译器本地化示例](/zh/guide/samples#编译器本地化)，其中编译器已本地化为俄语和键盘布局。
:::
