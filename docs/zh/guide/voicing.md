# 语音

要让引擎识别语音文件，请将语音片段存放在 `Resources/Naninovel/Voice` 文件夹下（可在音频配置中 `Loader` 下拉菜单修改路径）。如果你希望进一步组织文件，可以使用子文件夹；在脚本中引用时使用正斜杠 `/`。例如，语音文件存放路径为 `Resources/Naninovel/Voice/Intro/Day/25.wav`，则在 Naninovel 脚本中引用时为 `Intro/Day/25`。

你也可以使用 [Addressable 资源系统](/zh/guide/resource-providers#manual-assignment) 手动公开语音资源，具体请参阅相关指南。

语音文件可使用 Unity [支持的任意音频格式](https://docs.unity3d.com/Manual/AudioFiles.html)。

语音播放行为可通过 `Naninovel -> Configuration -> Audio` 菜单进行配置；具体可用选项见 [音频配置指南](/zh/guide/configuration#audio)。

使用 [@voice] 指令并跟随语音文件名（路径）即可在 Naninovel 脚本中播放语音，例如：

```nani
@voice Hello
```

— 将播放存放在 `Resources/Naninovel/Voice/Hello.wav` 的语音片段。

::: info 注意
[@voice] 指令用于在特定时刻播放单个语音片段，不适合为整部游戏实现完整配音。若项目中大多数文本行都有配音，请参考下方“自动语音（Auto Voicing）”部分了解更高效的配音方式。某些内置功能（如语音回放、语音文档等）仅支持自动语音工作流。
:::

## 自动语音

在全语音游戏中，为每一行文本单独编写 [@voice] 指令会十分繁琐。自动语音功能可根据文本行的唯一标识符，自动播放关联的语音片段。要启用自动语音，请在音频配置菜单中勾选 `Enable Auto Voicing` 选项。

语音音频与文本行之间的关联可以通过语音映射工具（Voice Map Utility）完成，也可以通过 Unity 的 Addressable 资源系统为音频资源指定地址，或使用其他 [资源提供器](/zh/guide/resource-providers) 暴露音频资源。

启用自动语音后，音频配置菜单中会出现 “Open Voice Map Utility” 按钮；也可通过编辑器菜单 `Naninovel -> Tools -> Voice Map` 打开语音映射工具。

![](https://i.gyazo.com/3c8fad99f7a18e3f0eaf419c9be92277.mp4)

首先，选择要为其映射语音片段的脚本文件。如果所选脚本中包含任意打印指令（[@print]）或普通文本行，它们会以“文本行 — 音频片段”配对的形式显示在列表中。通过字段拖入（或选择）语音文件，即可将语音与文本关联。

也可以使用“自动映射”功能：若语音文件名与文本行开头内容一致，只需将这些语音文件（或包含它们的文件夹）拖入语音映射工具，即可自动完成匹配。

::: warning
通过语音映射窗口分配语音文件时，请确保这些语音文件**不存放在任何 “Resources” 文件夹内**，以避免资源冲突。
:::

若要为**非源语言版本**配置语音，请在 `Localization Document` 字段中选择对应的 [脚本本地化文档](/zh/guide/localization#scripts-localization)。当选择有效的本地化文档后，分配的语音文件会自动加上当前语言前缀，并在对应的 [语音语言](/zh/guide/voicing#voice-language) 被选中时使用。

若同一角色在同一脚本中存在**完全相同的台词**，系统会自动将它们映射到同一个语音文件。若希望它们使用不同的语音文件，可为其中一行文本添加唯一标识符，例如：

```nani
Hello.
Hello.|#uniqueid|
```

::: tip
可在编辑器菜单中使用 `Naninovel/Tools/Text Identifier` 工具，让 Naninovel 自动为所有可本地化文本（包括语音台词）生成唯一的文本 ID。这样就无需手动为重复台词指定 ID，同时在修改已映射台词时也不会破坏语音关联。详见 [文本标识符机制](/zh/guide/scenario-scripting#text-identification)。
:::

若不使用语音映射工具，你也可以手动将语音文件暴露给资源提供器，并使用以下命名规则：以“脚本路径 + 文本 ID”为资源名，并在前方加上语音加载前缀（默认 `Voice`）。要查找特定语音行对应的脚本路径与文本 ID，可参考 [语音文档](/zh/guide/voicing#voiceover-documents)。例如，若脚本路径为 `Script01`，语音行的文本 ID 为 `2670eb4`，并使用 Addressable 资源提供器进行暴露，则资源地址应为：`Naninovel/Voice/Script01/2670eb4`

若要在游戏运行时查看当前播放语音对应的自动语音 ID，可使用调试窗口：

![auto voicing](https://i.gyazo.com/12772ecc7c14011bcde4a74c81e997b8.png)

想要打开窗口，首先确保在引擎配置中启用了 `Enable Development Console`。进入播放模式后，按下 `~` 键打开控制台，最后输入 `debug` 并按下回车键。

::: tip 示例
查看 [自动语音示例](/zh/guide/samples#auto-voicing)，了解如何为多语言版本设置自动语音。
:::

## 作者音量

在使用自动语音功能时，你可能希望让玩家能单独调整特定角色（或更准确地说，文本作者）的语音音量。例如，玩家可能想静音主角的语音，或让某个角色的声音更轻。

要设置每个作者独立的语音控制，请先 [创建自定义设置界面](/zh/guide/gui#modifying-built-in-ui)，添加一个新的滑块（可以复制现有的 “VoiceVolumeSlider” 元素），然后在 `Author ID` 字段中填写角色的 ID。

![](https://i.gyazo.com/5a8db32ca5d971f2876f71d35f1a020c.png)

新增的滑块现在将控制该角色语音的音量。若 `Author ID` 字段为空，则滑块将控制音频混音器（Audio Mixer）中“Voice”分组的整体音量，影响所有语音。

## 语音语言

当为不同语言版本添加语音配音时，可以让玩家独立选择语音语言，而不受游戏文本语言影响。例如，可以在英文界面下播放日语配音。

要在游戏设置菜单中添加语音语言选项（下拉框），请在音频配置菜单中设置 `Voice Locales` 属性。添加拥有对应语音资源的语言标签。例如，以下设置将允许玩家在英文和日文语音间选择：

![](https://i.gyazo.com/904a59d1a18510373da97bc9b26e8880.png)

设置完成后，游戏设置菜单中会出现 “Voice language” 下拉选项：

![](https://i.gyazo.com/70382bb24637a4d8846c3b65f1ea01d9.png)

有关如何本地化游戏资源的更多信息，请参阅 [本地化指南](/zh/guide/localization)。

## 配音文档

配音文档主要供配音工程师与配音演员在录制语音时使用。

可通过编辑器菜单 `Naninovel -> Tools -> Voiceover Documents` 打开“配音文档生成工具”，生成包含所有 [@print] 指令与普通文本行内容的文档。每一条文本消息都会自动关联对应的自动语音 ID。

![](https://i.gyazo.com/d1e40ff118daebd83b55e0433431b2a8.png)

`Locale` 属性用于选择要生成文档的语言（前提是该语言的 Naninovel 脚本已存在于项目中）。

`Format` 属性用于指定导出的配音文档文件类型与格式：

- **Plaintext** — 纯文本文件，无格式。
- **Markdown** — [Markdown](https://en.wikipedia.org/wiki/Markdown) 文件，具有更好的可读性。
- **CSV** — [CSV（逗号分隔值）](https://en.wikipedia.org/wiki/Comma-separated_values) 文件，可用于表格编辑器（如 Google Sheets 或 Microsoft Excel）。

以下为以 Markdown 格式生成的配音文档示例：

![](https://i.gyazo.com/a85d5885b11e99bfe24665a1162e148d.png)

### 自定义生成器

如需以特殊方式格式化或序列化配音文档，可以自定义生成器。

创建一个新的 C# 类，包含无参构造函数，并实现 `IVoiceoverDocumentGenerator` 接口。工具会自动检测该类，并用它替代内置生成器。

`GenerateVoiceoverDocument` 方法会针对项目中每个脚本（基于所选语言）调用。参数说明如下：

- `list`：脚本中包含的所有指令列表。
- `locale`：在工具中选择的语言（区域设置）。
- `outDir`：在工具中指定的输出目录路径。

以下为一个自定义配音文档生成器示例：它会为每个脚本生成标题（包含脚本路径与语言），然后依次写入每条文本指令的 `auto-voice id > author > text` 内容行。

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
