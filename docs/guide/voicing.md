# Voicing

To expose voice clips to the engine, store them under `Resources/Naninovel/Voice` folder (can be changed in audio configuration under `Loader` foldout). You can additionally organize them with sub-folders, if you wish; in this case use forward slashes (`/`) when referencing them in naninovel scripts. Eg, voice audio clip stored as `Resources/Naninovel/Voice/Intro/Day/25.wav` can be referenced in scripts as `Intro/Day/25`.

It's also possible to use [addressable asset system](/guide/resource-providers#manual-assignment) to manually expose the resources; consult the guide for more info.

You can use any audio formats [supported by Unity](https://docs.unity3d.com/Manual/AudioFiles.html) for your voice clips.

Voice playback behavior can be configured using `Naninovel -> Configuration -> Audio` context menu; for available options see [configuration guide](/guide/configuration#audio).

Use [@voice] command followed by the clip name (path) to play the voice in naninovel scripts, eg:

```nani
@voice Hello
```

— will play a voice clip asset stored at `Resources/Naninovel/Voice/Hello.wav`.

::: info NOTE
The [@voice] commands are intended to occasionally play voice clips at specific moments and are not suited for implementing a complete voiceover; see the "Auto Voicing" section below for more information on how to handle voicing in projects, where most of the text lines have an associated voice clip. Some built-in features (eg, replay voice in backlog, voiceover documents, etc) works only with the auto voice workflow.
:::

## Auto Voicing

In fully-voiced games, it could become tedious to specify a [@voice] command for each voiced line. Auto voicing feature allows automatically playing voice clips associated with unique identifiers of the voiced text lines. To enable auto voicing feature, enable `Enable Auto Voicing` toggle in the Audio configuration menu.

The association between voice audio clips and voiced text lines can be performed either via voice map utility or by assigning addresses to audio clip assets with Unity's addressable asset system (or otherwise exposing the assets to another [resource provider](/guide/resource-providers)).

When auto voicing is enabled, an "Open Voice Map Utility" button will appear in the audio configuration menu; you can also access the utility via `Naninovel -> Tools -> Voice Map` editor menu.

![](https://i.gyazo.com/3c8fad99f7a18e3f0eaf419c9be92277.mp4)

First, select script file for which to map the voice clips. If the selected script contains any print commands (or generic text lines), they will be listed in pairs with audio clip fields. Drop (or select) a voice clip via the field to associate voice with the text. It's also possible to auto-map the clips; for this name the clip assets equal to the start of the voiced line text and drag the clips (or folder with the clips) to the voice map utility.

::: warning
When assigning the clips via voice map window, make sure to store the voice clips outside any "Resources" folders to prevent conflicts.
:::

To associate voice clips for non-source locale, pick [script localization document](/guide/localization#scripts-localization) with `Localization Document` field. When valid document is picked, assigned voice clips will be automatically prefixed with the locale under which the document is stored and used whe corresponding [voice language](/guide/voicing#voice-language) is selected.

In cases same author have equal text messages (in the same script), both messages will be associated with the same voice clip. If that is not desired, add unique text identifier to one of the messages, eg:

```nani
Hello.
Hello.|#uniqueid|
```

::: tip
Enable `Stable Identification` under scripts configuration menu to make Naninovel automatically generate unique IDs for all localizable script text, including voiced lines. This way you won't have to manually assign IDs for duplicate lines and editing already mapped lines won't break the associations. See [text identification](/guide/naninovel-scripts#text-identification) for more info.
:::

To associate the clips without using voice map utility, expose the assets to a resource provider using text ID as the resource name prefixed by the script path and voice loader prefix (`Voice` by default). To find the script path and text ID of a specific voiced line, use [voiceover documents](/guide/voicing#voiceover-documents). For example, to associate a voiced line with `2670eb4` text ID inside script with `Script01` path exposed via addressable resource provider, use the following address: `Naninovel/Voice/Script01/2670eb4`.

To find auto-voice IDs associated with the currently printed text while the game is running use debug window:

![auto voicing](https://i.gyazo.com/12772ecc7c14011bcde4a74c81e997b8.png)

To show the window, make sure `Enable Development Console` is turned on in the engine configuration, then press `~` key while in play mode, type `debug` and press `Enter`.

::: tip EXAMPLE
Find example on setting up auto voicing for multiple locales in the [auto voicing sample](/guide/samples#auto-voicing).
:::

## Author Volume

When using auto voicing, you may want to let players control voice volume for specific [characters](/guide/characters) or, more correctly, authors of the printed text messages. For example, a player may decide to mute voice of the main protagonist or make a specific character voice lower.

To set up per-author voice control, [create a custom settings UI](/guide/user-interface#modifying-built-in-ui), add a new slider (you can duplicate "VoiceVolumeSlider" already present in the prefab) and specify author (character) ID in the `Author ID` field.

![](https://i.gyazo.com/5a8db32ca5d971f2876f71d35f1a020c.png)

The added slider will now control voice volume of the specified character. When nothing is assigned to the author ID field, the slider will control volume of the audio mixer's voice group, affecting all the voices.

## Voice Language

When adding voice over for different localizations, it's possible to allow player to select the voice language independently of the main localization (eg, play the game with English text and UI, but with Japanese voice over).

To add voice language dropdown to the game settings, assign `Voice Locales` property in the audio configuration menu. Add the language tags of the locales for which you have the corresponding voice resources. Eg, the example below will allow the player to choose from English and Japanese voices:

![](https://i.gyazo.com/904a59d1a18510373da97bc9b26e8880.png)

When the property is assigned, "Voice language" dropdown will appear in the game settings menu:

![](https://i.gyazo.com/70382bb24637a4d8846c3b65f1ea01d9.png)

For more information on how to localize game resources, see the [localization guide](/guide/localization).

## Voiceover Documents

The voiceover documents are intended to be used by the voice recording engineers and actors when producing the voiceover audio.

Use voiceover documents generator utility accessible via `Naninovel -> Tools -> Voiceover Documents` to generate the documents, containing printed text from the [@print] commands and generic text lines. Each printed text message will be associated with the auto-voice ID.

![](https://i.gyazo.com/d1e40ff118daebd83b55e0433431b2a8.png)

`Locale` property allows to select a specific locale for which to generate the documents (the localized naninovel scripts for the selected locale should exist in your project).

`Format` property controls type of file and formatting of the voiceover documents to produce:

- Plaintext — Plaintext file without any formatting.
- Markdown — [Markdown](https://en.wikipedia.org/wiki/Markdown) file with additional formatting for better readability.
- CSV — [Comma-separated values](https://en.wikipedia.org/wiki/Comma-separated_values) file to be used with table processors, such as Google Sheets or Microsoft Excel.

Below is an example of a voiceover document generated in Markdown format.

![](https://i.gyazo.com/a85d5885b11e99bfe24665a1162e148d.png)

### Custom Generator

It's possible to inject custom voiceover document generator in case you wish to format and/or serialize the documents in a special way.

To add custom generator, create a new C# class with a parameterless constructor and implement `IVoiceoverDocumentGenerator` interface. The utility will automatically pick such class and use it instead of the built-in generators.

`GenerateVoiceoverDocument` method will be invoked by the utility for each script found in the project for the selected locale. `list` argument is the list of commands contained in the script. `locale` represents the locale (language) selected in the utility. `outDir` is the output path selected in the utility.

Below is an example of a custom voiceover generator, which appends a header with script path and locale followed by `auto-voice id > author > text` line for each print text command found in the script.

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
