# 本地化翻译

所有游戏资源（脚本、音频、语音、背景等）都可以被本地化为多种语言或地区版本。

项目中最初使用的资源默认与 *源语言区域（source locale）* 关联。例如，假设游戏最初以英文创作，则所有原始（源）naninovel 脚本、UI、背景上的文字等都是英文的；这意味着 *源语言区域* 为 `en`（若你希望为特定地区设置独立语言区域，也可以使用 `en-GB`、`en-US` 等）。

可以通过 `Naninovel -> Configuration -> Localization` 菜单中的 `Source Locale` 属性更改 *源语言区域*。`Source Locale` 属性仅决定与源项目资源关联的语言区域名称（ID），并在“语言”下拉设置菜单以及相关的引擎 API 中用于区分语言区域。

![](https://i.gyazo.com/84eea85d3c3deddd187af1ed843f1bd5.png)

::: tip
如果你想将源文本内容分享给第三方（例如用于校对），但不希望共享原始场景脚本，可以将 `Source Locale` 更改为某个实际不会使用的语言，然后禁用 `Expose Source Locale` 并为源素材添加一个专用语言区域。这样即可将其导出为本地化 [文档](/zh/guide/localization#scripts-localization) 或 [电子表格](/zh/guide/localization#spreadsheet)。
:::

要添加新的语言区域，请在 `Resources/Naninovel/Localization`（即 *本地化资源根目录*）内创建一个以 [RFC5646](https://gist.github.com/Elringus/db90d9c74f13c00fa35131e61d1b73cb) 语言标签命名的子文件夹。例如，要添加德语语言区域，请创建 `Resources/Naninovel/Localization/de` 文件夹。游戏设置内置 UI 中的“语言”下拉列表会自动包含所有已添加的语言区域。

请注意，*源语言区域* 无需在 *本地化资源根目录* 下创建子文件夹。所有存储在 *本地化资源根目录* 之外的项目资源默认属于 *源语言区域*。

可通过本地化配置菜单中的 `Loader > Path Prefix` 属性更改 *本地化资源根目录* 的具体路径。注意，配置的路径是相对于“Resources”文件夹的（而不是“Assets”）。Unity 会以[特殊方式处理](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime.html)这些 Resources 文件夹；你可以在项目中的任意位置创建多个 Resources 文件夹以便更好地组织资源。

::: tip
与其他类型的资源一样，你也可以选择使用不同的资源提供器而非 `Resources` 文件夹。例如，使用 [可寻址资源](/zh/guide/resource-providers#可寻址资源) 提供器时，你可以将特定语言的本地化资源与主游戏包独立打包，并在需要时按需下载。
:::

## 默认语言区域

要指定玩家第一次运行游戏时默认选择的语言区域，请在本地化配置菜单中使用 `Default Locale` 属性。若未指定该属性，游戏将以 `Source Locale`（源语言区域）启动。

当配置中启用了 `Auto Detect Locale`（自动检测语言）选项并且游戏第一次运行时，Naninovel 将尝试根据系统语言自动检测语言区域。若检测成功且该语言受游戏支持，则自动选择；否则会回退到 `Default Locale`。

::: warning
自动检测到的语言区域不会包含区域标识符。即，当系统语言为英语时，检测到的语言区域将为 `en`，而不会是 `en-US` 或 `en-GB`。这是 Unity [系统语言检测机制](https://docs.unity3d.com/ScriptReference/Application-systemLanguage) 的限制。若依赖自动检测功能，请确保在添加语言时不要使用带有区域标识符的语言标签。
:::

## 资源本地化

在 *本地化资源根目录* 中存放将在对应语言选中时替代源资源的文件。

例如，若你希望在选择 `ja-JP` 语言时，将主背景（ID 为 “MainBackground” 的背景角色）的 “City” 外观图片替换为另一张图片，请将本地化版本放在以下路径：
`Resources/Naninovel/Localization/ja-JP/Backgrounds/MainBackground/City`

## 脚本本地化

上述资源本地化机制适用于所有类型的资源，但 **不包括 Naninovel 脚本和受管文本（Managed Text）文档**。对于这两类资源，请使用 Naninovel 编辑器菜单中的本地化工具：
`Naninovel -> Tools -> Localization`

![](https://i.gyazo.com/1b47d70dcbbb45a3ab955b44c9b50942.png)

首先，选择 `Scripts Folder (input)` —— 即项目中存放 Naninovel 场景脚本（`.nani` 文件）的目录（例如 `Assets/Scenario`）。
若希望同时为 [Managed Text](/zh/guide/managed-text) 生成本地化文档，可选填 `Text Folder (input)` —— 即存放受管文本文档的目录（默认为 `Assets/Resources/Naninovel/Text`）。

另外，如果你希望基于已有的其他语言本地化文档（而不是源语言）生成新的本地化文档，可以选择该语言的文本目录作为输入。例如：
`Assets/Resources/Naninovel/Localization/ja-JP/Text`

接着，选择用于存放生成的本地化资源的语言区域文件夹路径。请确保选择的是实际的语言区域文件夹（例如 `Resources/Naninovel/Localization/ja-JP`）。当选择有效的输出目录时，属性栏下方会显示目标语言的名称以作确认。

::: tip
可以一次性为项目中所有可用语言生成本地化资源：只需选择 *本地化资源根目录* 而非某个特定语言文件夹，然后照常操作。工具会自动遍历所选目录的所有子文件夹，并为每个语言生成资源。

![](https://i.gyazo.com/4f0a6373755f0e122958f1f98de13013.png)
:::

点击 “Generate” 按钮即可生成（或更新）本地化资源。在后续运行中，工具会自动识别已生成的本地化文档，并在源内容未更改的情况下保留已翻译的文本。

脚本本地化文档将存放于 `Scripts` 文件夹下，内容以以下格式的语句分组存储：

```nani
# ID
; 原始文本
Translation text
```

`# ID` 行是被本地化内容的唯一标识符，请勿修改此行。

`; Source text` 行是需要你翻译的原始文本。这一行只是注释，修改它不会产生任何效果，仅用于参考。

你应当在源文本注释行之后编写实际的翻译文本。为了提高可读性，你可以使用多行来编写翻译（它们会被自动合并），但必须确保这些行位于下一个 `# ID` 行之前：

```nani
# aj0e5dea
; Aliquam ut <b>ultricies</b> enim, id venenatis.<br>Nullam rhoncus eros tempus.
Оценивая блеск <b>металлического</b> шарика, пространство равноденственно.<br>
Противостояние есть метеорный дождь.
```

### 合并行

当翻译的普通文本行中包含内嵌指令或表达式时，系统会将其拆分为多个文本片段，每个片段对应唯一的文本 ID。当启用了 **Join Lines** 选项时，这些片段将被用竖线符号 `|` 合并成单行。

例如，假设源脚本文本如下：

```nani
Looks like rain is starting[rain]. Hey, {MC}, hurry up!
```

— 则生成的本地化文档如下：

```nani
# id1|id2|id3
; Looks like rain is starting|. Hey, |, hurry up!
```

注意，内嵌指令和表达式被替换为 `|`。请在翻译时确保保留这些符号：

```nani
# id1|id2|id3
; Looks like rain is starting|. Hey, |, hurry up!
Похоже, дождь начинается|. Эй, |, поспеши!
```

在目标语言的语序需求下，你也可以重新排列这些片段，例如：

```nani
# id1|id2
; Hey, |, hurry up!
|, эй, поспеши!
```

— 这样可以在句子前显示 `{MC}`（主角名）。

::: tip
若希望让翻译人员对内嵌内容有更高的控制权（例如改写指令或调整表达式顺序），请参阅 [文本显示事件（reveal events）](/zh/guide/text-printers#reveal-events) 与 [显示表达式（reveal expressions）](/zh/guide/text-printers#reveal-expressions)。
:::

### 注释

当启用 **Include Annotations**（包含注释）选项时，生成的本地化文档将包含被本地化的源脚本内容（指令或普通文本行），以及出现在其前的任何注释。例如，假设源脚本文本如下：

```nani
; Player has to pick route.
@choice "Go left" set:route="left"
@choice "Go right" set:route="right"
Narrator: You've decided to go {route}. Wise choice!
```

— 则生成的本地化文档如下：

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

这对于为翻译人员提供更多上下文信息非常有用。请务必**不要**将注释（以 `; >` 开头的行）包含在翻译文本中。只有以单个 `;` 开头的文本行才需要翻译。

::: tip 示例
可在 [本地化示例](/zh/guide/samples#本地化) 中找到本地化配置示例。若你在项目中配置本地化时遇到问题，可将其作为参考。
:::

## 电子表格

在项目开发的某个阶段，你可能希望将所有场景脚本与受管文本的本地化内容汇总为电子表格，以便交给翻译公司或校对编辑进行处理。

电子表格工具可将项目中的所有可本地化文本提取为 `.csv` 表格，并在修改后重新导入。

![](https://i.gyazo.com/50767f3193ae5b3ed423ea7c213c786b.png)

在导出项目前，请务必先通过本地化工具（`Naninovel -> Tools -> Localization`）生成最新的本地化数据。你可以一次性为项目中所有已定义的语言生成资源：在 `Locale Folder` 属性中选择本地化根目录（默认 `Resources/Naninovel/Localization`）。

![](https://i.gyazo.com/047d43250a941b918de65205a19b2d78.png)

在本地化数据最新的情况下，通过菜单 `Naninovel -> Tools -> Spreadsheet` 打开电子表格工具。

![](https://i.gyazo.com/16cd076ebcc43b2d1a058c10e9dea43d.png)

指定以下必要的文件夹路径：

- **Input Script Folder（输入脚本文件夹）** —— 存放源 Naninovel 场景脚本（`.nani` 文件）的文件夹，例如 `Assets/Scenario`。
- **Input Text Folder（输入文本文件夹）** —— 存放 [受管文本（Managed Text）](/zh/guide/managed-text) 文档的文件夹，例如 `Assets/Resources/Naninovel/Text`。若该文件夹不存在，请通过对应工具生成受管文本。
- **Input Localization Folder（输入本地化文件夹）** —— 存放所有语言资源的本地化根目录，例如 `Assets/Resources/Naninovel/Localization`。
- **Output Folder（输出文件夹）** —— 存放导出的表格文件或导入编辑后的文件的目录。

点击 “Export” 按钮将表格导出至指定位置。

每个脚本与受管文本文档都会被导出为独立表格。每个表格包含一个存放可本地化文本 ID 的 “ID” 列，以及对应每个语言区域的附加列。
你可以自由修改除 “ID” 之外的所有列；但修改与源语言关联的列不会在导入时生效。

启用 **Include Annotations（包含注释）** 选项后，生成的表格还会包含一个额外列，用于显示源脚本内容（如作者名、内嵌指令或翻译行前的注释）。该列在导入时会被忽略。

完成修改后，点击 “Import” 按钮即可将数据重新导入项目。

::: warning
从电子表格导入时，项目中的本地化文档会被覆盖。为避免冲突，请勿在编辑电子表格期间同时修改项目中的本地化文档。
:::

### 自定义处理器

你可以通过注入自定义电子表格处理器，来自定义表格的生成方式以及导入和导出流程。

创建一个继承自内置 `Naninovel.Spreadsheet.Processor` 处理器的自定义类。工具会自动检测并使用你的自定义处理器替代内置版本。

以下是一个包含主要重写点的自定义处理器示例：

```csharp
using Naninovel.Spreadsheet;

public class CustomProcessor : Processor
{
    public CustomProcessor (ProcessorOptions options) : base(options)
    {
        // 访问导出/导入过程选项，例如：
        // options.ScriptFolder
        // options.SourceLocale
        // ...etc
    }

    // 重写脚本从项目导出到表格的方式。
    protected override void ExportScripts () { }
    // 重写受管文本从项目导出到表格的方式。
    protected override void ExportText () { }
    // 重写脚本从表格导入回项目的方式。
    protected override void ImportText () { }
    // 重写受管文本从表格导入回项目的方式。
    protected override void ImportScripts () { }
}
```

::: tip 示例
在[本地化示例](/zh/guide/samples#本地化)中可以找到如何设置和使用该工具的示例。
:::

## UI 本地化

要同时本地化自定义和内置 UI，请使用 [managed text provider（受管文本提供器）](/zh/guide/managed-text#managed-text-provider) 组件。它也可用于本地化任何其他自定义游戏对象（Prefab）。关于如何使用受管文本记录并进行本地化，请参阅受管文本指南。

## 字体

要显示某些语言的文本，你需要兼容的字体。默认使用 [Inter](https://github.com/rsms/inter)，其支持 Unicode 7.0 中的所有拉丁、斯拉夫（西里尔）和希腊字符。

::: tip
如果你希望用一款字体支持多种语言，请查看 [Noto 字体](https://www.google.com/get/noto/)。
:::

从右到左（RTL）的语言（阿拉伯语、希伯来语、波斯语等）由 TMPro 文本打印器支持，但需要额外设置；更多信息请[参见指南](/zh/guide/text-printers.html#right-to-left-arabic-text)。

在发布面向 CJK（中文、日文和韩文）的版本时，考虑使用 Character Extractor 工具来优化 TMPro 字体图集大小。（[指南](/zh/guide/text-printers.html#cjk-languages)）

若要将字体与特定语言区域关联，请在 UI 配置中的字体选项里使用 `Apply On Locale` 属性。当选择该语言区域时，游戏设置中将自动应用该字体。

![](https://i.gyazo.com/e44d120c983f3d6c1d15e910829fc344.png)

为使该功能生效，请确保已在文本打印器上正确设置 `Font Change Configuration` 组件。有关字体设置的说明，请参阅 [UI 指南](/zh/guide/gui#changing-font)。

::: tip 示例
在[本地化示例](/zh/guide/samples#本地化)中可以找到如何设置与本地化相关字体的示例。
:::

## 社区本地化

当已发布的作品获得足够人气时，社区（玩家）可能希望贡献额外的本地化；这常常导致用户通过修改构建资源来替换显示文本。Naninovel 提供了运行时本地化选项，允许在不篡改构建文件的情况下添加社区本地化。

### 导出本地化资源

要生成本地化资源（脚本与受管文本文档），请在运行游戏可执行文件时附加 `-nani-eject` 参数，例如：

```
./game.exe -nani-eject
```

— 这将像平常一样启动游戏，但在 Naninovel 初始化后，它会将本地化资源导出（Eject）到 Unity 的 [persistent data folder（持久化数据目录）](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html) 下的 `Localization` 文件夹中。例如，如果应用程序的公司名为 `Foo`，游戏标题为 `Bar`，则在 Windows 上导出的路径如下：
`C:/Users/User/AppData/LocalLow/Foo/Bar/Localization`

如果希望基于某个内置本地化生成资源，请在导出参数中附加语言标识。例如，若游戏内含有 `ja-JP`（日语）本地化，可使用以下参数导出日语本地化文档：
`-nani-eject-ja-JP`
当未指定语言标识时，将导出源语言（source locale）的文档。

接着，为本地化提供要使用的字体。将字体文件放入 `Localization` 目录下，例如：
`Localization/Noto.ttf`

注意 `Localization/Info.txt` 文件。你需要通过替换默认内容，在其中指定本地化作者（第一行）与提供的字体名称（第二行）。以下为示例：

```
Awesome Author
Noto.ttf
```
— “Awesome Author”（超棒译者）将默认显示在语言下拉菜单中，但开发者可以自定义此行为。字体会在游戏启动时自动应用。

请勿删除或移动 `Info.txt` 文件，因为它用于检测社区本地化的存在。

### 翻译

导出文档后，你即可开始翻译。该流程与上文介绍的“脚本本地化”和“UI 本地化”类似。脚本本地化文档存储在 `Localization/Text/Scripts` 文件夹中，而受管文本文档存储在 `Localization/Text` 文件夹中。

正常重启游戏（不带导出参数），游戏会自动使用持久化数据目录中的本地化资源。要使脚本本地化的更改生效，相关脚本需重新加载（通常通过读档即可），但在某些情况下可能需要重新启动游戏。

若开发者更新了游戏，你可以再次导出以更新现有本地化；新行和记录会被插入，而未变更的源文本对应的翻译不会丢失。

翻译完成后，将整个 `Localization` 文件夹分享出去，并指导用户将其放置在前述的持久化数据目录下即可启用该本地化。要禁用该本地化，只需删除该文件夹。

## 编译器本地化

NaniScript 是一种特殊的领域专用语言（DSL），因为它与自然语言紧密交织——编写时需频繁在展示给玩家的文本（叙事台词）与引擎脚本结构（指令、标签等）之间切换。

若你以英语编写剧本，这通常不是问题；但试想如果编剧使用其他语言，他们将不得不频繁切换输入法布局，在本地语言文本与英文指令间来回切换。更糟的是，一些键盘布局可能缺少必要的控制符（例如用于指令的 `@` 符号），导致编剧只能通过输入字符代码来完成操作。

为简化非英语语言下的剧本编写，Naninovel 提供了编译器本地化功能。该功能允许你重新映射所有控制字符，以及指令名、参数名、常量等几乎所有编写脚本时需要输入的元素。

首先，通过 `Create -> Naninovel -> Compiler Localization` 上下文菜单创建一个编译器本地化资源。选中该资源并指定编译器构件的目标语言：

![](https://i.gyazo.com/5ffcd8e06231616598cc8317f7854f9a.png)

要重写指令、参数、函数及常量，可使用专用列表。同时你还可以本地化指令与参数的文档说明及使用示例；这些信息将在 IDE 扩展中显示。

![](https://i.gyazo.com/4fdcdcec7361a9ccbcc1012d842ef4ad.png)

这些列表最初为空。要将项目中可用的指令和函数填充进来，可使用检视器（Inspector）中的右键上下文菜单。

![](https://i.gyazo.com/cddd1981c5aef5f16da2052898c7a530.png)

完成修改后，请重启 Unity 编辑器并重新导入剧本脚本资源，以使更改生效。

本地化的编译器元素将同步至可视化编辑器与 [IDE 扩展](/zh/guide/ide-extension)，从而在元数据同步后，你可获得自动补全与悬停提示功能。

![](https://i.gyazo.com/fde9998597ffedb8a025401bb2f71ce9.png)

::: tip 示例
查看 [编译器本地化示例](/zh/guide/samples#compiler-localization)，其中演示了将编译器本地化为俄语与俄语键盘布局的完整过程。
:::
