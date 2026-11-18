# Voicing

To expose voice clips to the engine, store them under the `Resources/Naninovel/Voice` folder (can be changed in the audio configuration under the `Voice Loader` foldout). You can additionally organize them with subfolders, if you wish; in this case use forward slashes (`/`) when referencing them in scenario scripts. For example, a voice audio clip stored as `Resources/Naninovel/Voice/Intro/Day/25.wav` can be referenced in scripts as `Intro/Day/25`.

It's also possible to use the [Addressable Asset System](/guide/resource-providers#manual-assignment) to manually expose the resources; consult the guide for more info.

You can use any audio formats [supported by Unity](https://docs.unity3d.com/Manual/AudioFiles.html) for your voice clips.

Voice playback behaviour can be configured using the `Naninovel -> Configuration -> Audio` editor menu; for available options, see the [configuration guide](/guide/configuration#audio).

Use the [@voice] command followed by the clip name (path) to play the voice in scenario scripts, eg:

```nani
@voice Hello
```

— will play a voice clip asset stored at `Resources/Naninovel/Voice/Hello.wav`.

::: info NOTE
The [@voice] commands are intended to occasionally play voice clips at specific moments and are not suited for implementing a complete voiceover; see the "Auto Voicing" section below for more information on how to handle voicing in projects where most of the text lines have an associated voice clip. Some built-in features (eg, replay voice in backlog, voiceover documents, etc) work only with the auto-voicing workflow.
:::

## Auto Voicing

In fully voiced games, it can become tedious to specify a [@voice] command for each voiced line. The auto-voicing feature allows automatically playing voice clips associated with unique identifiers of the voiced text lines. To enable auto voicing, enable the `Enable Auto Voicing` toggle in the audio configuration menu.

The association between voice audio clips and voiced text lines can be performed either via the voice map utility or by assigning addresses to audio clip assets with Unity's Addressable Asset System (or otherwise exposing the assets to another [resource provider](/guide/resource-providers)).

When auto voicing is enabled, an "Open Voice Map Utility" button will appear in the audio configuration menu; you can also access the utility via the `Naninovel -> Tools -> Voice Map` editor menu.

![](https://i.gyazo.com/3c8fad99f7a18e3f0eaf419c9be92277.mp4)

First, select the script file for which you want to map the voice clips. If the selected script contains any print commands (or generic text lines), they will be listed in pairs with audio clip fields. Drop (or select) a voice clip into the field to associate it with the text. It's also possible to auto-map the clips; for this, name the clip assets to match the start of the voiced line text and drag the clips (or the folder containing them) to the voice map utility.

::: warning
When assigning the clips via the voice map window, make sure to store the voice clips outside any "Resources" folders to prevent conflicts.
:::

Select the [voice language](/guide/voicing#voice-language) in the `Locale` field before assigning clips. Voice Map defaults to the source locale. For another locale, it previews the text from the [script localization document](/guide/localization#scripts-localization). If a translation is missing or empty, the preview shows the source text; clips are still assigned to the selected locale.

If the same author has identical text messages (in the same script), both messages will be associated with the same voice clip. If that is not desired, add a unique text identifier to one of the messages, eg:

```nani
Hello.
Hello.|#uniqueid|
```

::: tip
Use `Naninovel -> Tools -> Text Identifier` under the editor menu to make Naninovel automatically generate unique IDs for all localizable script text, including voiced lines. This way you won't have to manually assign IDs for duplicate lines, and editing already mapped lines won't break the associations. See [text identification](/guide/scenario-scripting#text-identification) for more info.
:::

To associate the clips without using the voice map utility, expose the assets to a resource provider using the text ID as the resource name prefixed by the script path and voice loader prefix (`Voice` by default). To find the script path and text ID of a specific voiced line, use [voiceover documents](/guide/voicing#voiceover-documents). For example, to associate a voiced line with `2670eb4` text ID inside a script with `Script01` path exposed via an addressable resource provider, use the following address: `Naninovel/Voice/Script01/2670eb4`.

To find auto-voice IDs associated with the currently printed text while the game is running, use the debug window:

![auto voicing](https://i.gyazo.com/12772ecc7c14011bcde4a74c81e997b8.png)

To show the window, make sure `Enable Development Console` is turned on in the engine configuration, then press the `~` key while in Play mode, type `debug` and press `Enter`.

::: tip EXAMPLE
Find an example of setting up auto voicing for multiple locales in the [auto-voicing sample](/guide/samples#auto-voicing).
:::

## Author Volume

When using auto voicing, you may want to let players control voice volume for specific [characters](/guide/characters) or, more correctly, authors of the printed text messages. For example, a player may decide to mute the voice of the main protagonist or make a specific character's voice quieter.

To set up per-author voice control, [create a custom settings UI](/guide/gui#modifying-built-in-ui), add a new slider (you can duplicate "VoiceVolumeSlider" already present in the prefab) and add the author (character) ID to the `Author IDs` list.

![](https://i.gyazo.com/5a8db32ca5d971f2876f71d35f1a020c.png)

The added slider will now control the voice volume of the specified character. To control multiple authors with a single slider, add more IDs to the list; for example, when a character's inner thoughts are authored under a separate ID. When the list is empty, the slider will control the volume of the audio mixer's voice group, affecting all the voices.

## Voice Language

When adding voiceover for different localizations, it's possible to allow the player to select the voice language independently of the main localization (eg, play the game with English text and UI, but with Japanese voiceover).

To add a voice language dropdown to the game settings, assign the `Voice Locales` property in the audio configuration menu. Add the language tags of the locales for which you have the corresponding voice resources. Eg, the example below will allow the player to choose from English and Japanese voices:

![](https://i.gyazo.com/904a59d1a18510373da97bc9b26e8880.png)

When the property is assigned, a "Voice language" dropdown will appear in the game settings menu:

![](https://i.gyazo.com/70382bb24637a4d8846c3b65f1ea01d9.png)

For more information on how to localize game resources, see the [localization guide](/guide/localization).

## Voiceover Documents

The voiceover documents are intended to be used by the voice recording engineers and actors when producing the voiceover audio.

Use the voiceover documents generator utility accessible via `Naninovel -> Tools -> Voiceover Documents` to generate the documents containing printed text from the [@print] commands and generic text lines. Each printed text message will be associated with the auto-voice ID.

![](https://i.gyazo.com/d1e40ff118daebd83b55e0433431b2a8.png)

`Locale` selects the language of the exported text and defaults to the source locale. Missing or empty translations use the source text. Generating documents doesn't require Play Mode or change the running game's locale.

The `Format` property controls the type of file and formatting of the voiceover documents to produce:

- Plaintext — Plaintext file without any formatting.
- Markdown — [Markdown](https://en.wikipedia.org/wiki/Markdown) file with additional formatting for better readability.
- CSV — [Comma-separated values](https://en.wikipedia.org/wiki/Comma-separated_values) file to be used with table processors, such as Google Sheets or Microsoft Excel.

Below is an example of a voiceover document generated in Markdown format.

![](https://i.gyazo.com/a85d5885b11e99bfe24665a1162e148d.png)

### Custom Generator

It's possible to inject a custom voiceover document generator in case you wish to format and/or serialize the documents in a special way.

To add a custom generator, create a new C# class with a parameterless constructor and implement the `IVoiceoverDocumentGenerator` interface. The utility will automatically pick such a class and use it instead of the built-in generators.

The utility invokes `GenerateVoiceoverDocument` for each registered scenario script. `list` contains the script's commands, `locale` is the language selected for export, and `outDir` is the selected output directory. Use `LocalizableTextResolver.Resolve(cmd.Text, locale)` to read a print command's text in that language.

Below is an example of a custom voiceover generator, which appends a header with the script path and locale followed by an `auto-voice id > author > text` line for each print command found in the script.

```cs
public class VoiceoverGenerator : IVoiceoverDocumentGenerator
{
    public void GenerateVoiceoverDocument (ScriptPlaylist list, string locale, string outDir)
    {
        var builder = new StringBuilder();
        builder.AppendLine($"Voiceover for '{list.ScriptPath}' ({locale} locale)");
        foreach (var cmd in list.OfType<PrintText>())
        {
            var voiceId = AutoVoiceResolver.Resolve(cmd.Text);
            var text = LocalizableTextResolver.Resolve(cmd.Text, locale);
            builder.AppendLine($"{voiceId} > {cmd.AuthorId} > {text}");
        }
        var path = Path.Combine(outDir, $"{list.ScriptPath}.txt");
        Directory.CreateDirectory(Path.GetDirectoryName(path));
        File.WriteAllText(path, builder.ToString());
    }
}
```
