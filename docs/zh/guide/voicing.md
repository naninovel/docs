# 配音

要将语音剪辑公开给引擎，请将其存储在 `Resources/Naninovel/Voice` 文件夹下（可以在音频配置的 `Voice Loader` 折叠项下更改）。如果您愿意，还可以使用子文件夹组织它们；在这种情况下，在剧本脚本中引用它们时请使用正斜杠（`/`）。例如，存储为 `Resources/Naninovel/Voice/Intro/Day/25.wav` 的语音音频剪辑可以在脚本中引用为 `Intro/Day/25`。

也可以使用 [Addressable 资产系统](/zh/guide/resource-providers#手动分配) 手动公开资源；有关更多信息，请参阅该指南。

您可以为语音剪辑使用 [Unity 支持](https://docs.unity3d.com/Manual/AudioFiles.html) 的任何音频格式。

可以使用 `Naninovel -> Configuration -> Audio` 编辑器菜单配置语音播放行为；有关可用选项，请参阅 [配置指南](/zh/guide/configuration#音频)。

在剧本脚本中使用 [@voice] 命令后跟剪辑名称（路径）来播放语音，例如：

```nani
@voice Hello
```

— 将播放存储在 `Resources/Naninovel/Voice/Hello.wav` 的语音剪辑资产。

::: info NOTE
[@voice] 命令用于偶尔在特定时刻播放语音剪辑，不适合实现完整的配音；有关如何在大多数文本行都有关联语音剪辑的项目中处理配音的更多信息，请参阅下面的“自动配音”部分。一些内置功能（例如，在历史记录中重播语音、配音文档等）仅适用于自动配音工作流程。
:::

## 自动配音

在全配音游戏中，为每个配音行指定 [@voice] 命令可能会变得繁琐。自动配音功能允许自动播放与配音文本行的唯一标识符关联的语音剪辑。要启用自动配音，请在音频配置菜单中启用 `Enable Auto Voicing` 开关。

语音音频剪辑与配音文本行之间的关联既可以通过语音映射实用程序建立，也可以通过使用 Unity 的 Addressable 资产系统为音频剪辑资产分配地址（或以其他方式将资产公开给其他 [资源提供者](/zh/guide/resource-providers)）来建立。

启用自动配音后，音频配置菜单中将出现“Open Voice Map Utility”按钮；您也可以通过 `Naninovel -> Tools -> Voice Map` 编辑器菜单访问该实用程序。

![](https://i.gyazo.com/3c8fad99f7a18e3f0eaf419c9be92277.mp4)

首先，选择要为其映射语音剪辑的脚本文件。如果所选脚本包含任何打印命令（或通用文本行），它们将与音频剪辑字段成对列出。将语音剪辑拖放（或选择）到字段中以将其与文本关联。也可以自动映射剪辑；为此，请将剪辑资产命名为与配音行文本的开头一致，并将剪辑（或包含它们的文件夹）拖到语音映射实用程序中。

::: warning
通过语音映射窗口分配剪辑时，请确保将语音剪辑存储在任何“Resources”文件夹之外，以防止冲突。
:::

要为非源语言环境关联语音剪辑，请使用 `Localization Document` 字段选择 [脚本本地化文档](/zh/guide/localization#脚本本地化)。选取有效文档后，分配的语音剪辑将自动加上该文档所在语言环境的前缀，并在选择相应的 [语音语言](/zh/guide/voicing#语音语言) 时使用。

如果同一作者有相同的文本消息（在同一脚本中），这两条消息将关联到同一个语音剪辑。如果不需要这样，请向其中一条消息添加唯一的文本标识符，例如：

```nani
你好。
你好。|#uniqueid|
```

::: tip
使用编辑器菜单下的 `Naninovel -> Tools -> Text Identifier` 让 Naninovel 自动为所有可本地化的脚本文本（包括配音行）生成唯一 ID。这样您就不必手动为重复行分配 ID，并且编辑已映射的行也不会破坏关联。有关更多信息，请参阅 [文本标识](/zh/guide/scenario-scripting#文本标识)。
:::

要在不使用语音映射实用程序的情况下关联剪辑，请将资产公开给资源提供者，并使用文本 ID 作为资源名称，前面加上脚本路径和语音加载器前缀（默认为 `Voice`）。要查找特定配音行的脚本路径和文本 ID，请使用 [配音文档](/zh/guide/voicing#配音文档)。例如，要通过 Addressable 资源提供者为路径为 `Script01` 的脚本中文本 ID 为 `2670eb4` 的配音行关联剪辑，请使用以下地址：`Naninovel/Voice/Script01/2670eb4`。

要在游戏运行时查找与当前打印文本关联的自动配音 ID，请使用调试窗口：

![auto voicing](https://i.gyazo.com/12772ecc7c14011bcde4a74c81e997b8.png)

要显示该窗口，请确保在引擎配置中打开了 `Enable Development Console`，然后在播放模式下按 `~` 键，输入 `debug` 并按 `Enter`。

::: tip EXAMPLE
有关为多个语言环境设置自动配音的示例，请参阅 [自动配音示例](/zh/guide/samples#自动配音)。
:::

## 作者音量

使用自动配音时，您可能希望让玩家控制特定 [角色](/zh/guide/characters)（更准确地说，是打印文本消息的作者）的语音音量。例如，玩家可能想将主角的语音静音，或调低特定角色的语音音量。

要为各个作者单独设置语音控制，请 [创建自定义设置 UI](/zh/guide/gui#修改内置-ui)，添加一个新的滑块（您可以复制预制件中已存在的“VoiceVolumeSlider”）并在 `Author ID` 字段中指定作者（角色）ID。

![](https://i.gyazo.com/5a8db32ca5d971f2876f71d35f1a020c.png)

添加的滑块现在将控制指定角色的语音音量。当作者 ID 字段未分配任何内容时，滑块将控制音频混音器的语音组的音量，从而影响所有语音。

## 语音语言

为不同的本地化添加配音时，可以允许玩家独立于主要本地化选择语音语言（例如，以英文文本和 UI 搭配日文配音来玩游戏）。

要将语音语言下拉菜单添加到游戏设置，请在音频配置菜单中分配 `Voice Locales` 属性。添加您拥有相应语音资源的语言环境的语言标签。例如，下面的示例将允许玩家在英语和日语语音之间进行选择：

![](https://i.gyazo.com/904a59d1a18510373da97bc9b26e8880.png)

分配属性后，“Voice language”下拉菜单将出现在游戏设置菜单中：

![](https://i.gyazo.com/70382bb24637a4d8846c3b65f1ea01d9.png)

有关如何本地化游戏资源的更多信息，请参阅 [本地化指南](/zh/guide/localization)。

## 配音文档

配音文档供录音工程师和配音演员在制作配音音频时使用。

使用通过 `Naninovel -> Tools -> Voiceover Documents` 访问的配音文档生成器实用程序来生成文档，其中包含来自 [@print] 命令和通用文本行的打印文本。每条打印的文本消息都将与自动配音 ID 关联。

![](https://i.gyazo.com/d1e40ff118daebd83b55e0433431b2a8.png)

`Locale` 属性允许选择要为其生成文档的特定语言环境（项目中应存在所选语言环境的本地化剧本脚本）。

`Format` 属性控制要生成的配音文档的文件类型和格式：

- Plaintext — 没有任何格式的纯文本文件。
- Markdown — [Markdown](https://en.wikipedia.org/wiki/Markdown) 文件，具有额外的格式以提高可读性。
- CSV — [逗号分隔值](https://en.wikipedia.org/wiki/Comma-separated_values) 文件，可用于 Google Sheets 或 Microsoft Excel 等表格处理软件。

下面是以 Markdown 格式生成的配音文档示例。

![](https://i.gyazo.com/a85d5885b11e99bfe24665a1162e148d.png)

### 自定义生成器

如果您希望以特殊方式格式化和/或序列化文档，可以注入自定义配音文档生成器。

要添加自定义生成器，请创建一个具有无参数构造函数并实现 `IVoiceoverDocumentGenerator` 接口的新 C# 类。该实用程序将自动选取此类并使用它代替内置生成器。

实用程序会针对项目中找到的所选语言环境的每个脚本调用 `GenerateVoiceoverDocument` 方法。`list` 参数是脚本中包含的命令列表。`locale` 表示实用程序中选择的语言环境（语言）。`outDir` 是实用程序中选择的输出路径。

下面是一个自定义配音生成器的示例，它会先附加一个包含脚本路径和语言环境的标题，然后为脚本中找到的每个打印命令附加一行 `auto-voice id > author > text`。

```csharp
public class VoiceoverGenerator : IVoiceoverDocumentGenerator
{
    public void GenerateVoiceoverDocument (ScriptPlaylist list, string locale, string outDir)
    {
        var builder = new StringBuilder();
        builder.AppendLine($"Voiceover for '{list.ScriptPath}' ({locale} locale)");
        foreach (var cmd in list.OfType<PrintText>())
        {
            var voiceId = AutoVoiceResolver.Resolve(cmd.Text);
            builder.AppendLine($"{voiceId} > {cmd.AuthorId} > {cmd.Text}");
        }
        File.WriteAllText($"{outDir}/{list.ScriptPath}.txt", builder.ToString());
    }
}
```
