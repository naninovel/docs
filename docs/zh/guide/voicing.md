# Voicing

To expose voice clips to the engine, store them under `Resources/Naninovel/Voice` folder (can be changed in audio configuration under `Loader` foldout). You can additionally organize them with sub-folders, if you wish; in this case use forward slashes (`/`) when referencing them in naninovel scripts. Eg, voice audio clip stored as `Resources/Naninovel/Voice/Intro/Day/25.wav` can be referenced in scripts as `Voice/Intro/Day/25`.

It's also possible to use [addressable asset system](/zh/guide/resource-providers.md#addressable) to manually expose the resources. To expose an asset, assign address equal to the path you'd use to expose it via the method described above, except omit the "Resources/" part. Eg, to expose a "Hello.wav" voice clip, assign the clip asset following address: `Naninovel/Voice/Hello`. Be aware, that addressable provider is not used in editor by default; you can allow it by enabling `Enable Addressable In Editor` property in resource provider configuration menu.

You can use any audio formats [supported by Unity](https://docs.unity3d.com/Manual/AudioFiles.html) for your voice clips.

Voice playback behavior can be configured using `Naninovel -> Configuration -> Audio` context menu; for available options see [configuration guide](/zh/guide/configuration.md#audio). 

Use [@voice] command followed by the clip name (path) to play the voice in naninovel scripts.


## Auto Voicing

In fully-voiced games, it could become tedious to specify a [@voice] command for each voiced line. Auto voicing feature allows to automatically play a voice clip that has a name equal to the line number of the currently played [@print] command; this way, you won't have to use [@voice] commands in naninovel scripts at all — voices will be automatically played when the corresponding text lines are printed in the game.

To enable auto voicing feature, use `Enable Auto Voicing` toggle in the Audio configuration menu.

Audio clips used for the auto voicing feature should be grouped under a folder with name equal to the script name, and has the following name: *LineNumber*.*CommandIndex*, where *LineNumber* is the line number of the corresponding print command and *CommandIndex* is the inline or command index of the print command in cases when dealing with generic text lines.

For example, consider the following naninovel script with name "Script001":

```
@print text:"Text from a print command."
Text from a simple generic text line.
Text from first sentence.[i] Text from second sentence.
```

In order for the auto voicing system to play corresponding audio clips when printing those lines, the clips should be placed under `Resources/Naninovel/Voice/Script001` folder (or registered with [addressable system](/zh/guide/resource-providers.md#addressable)) and have the following names: 

Text | Voice Clip Name
--- | ---
Text from a print command. | 1.0
Text from a simple generic text line. | 2.0
Text from first sentence. | 3.0
Text from second sentence. | 3.2

To simplify the process, when auto voicing feature is enabled, name of voice clip for the currently printed text is displayed in the debug window:

![auto voicing](https://i.gyazo.com/12772ecc7c14011bcde4a74c81e997b8.png)

To open the debug window, make sure `Enable Development Console` is turned on in the engine configuration, then press `~` key while in play mode, type `debug` and press `Enter`.

## Voiceover Documents

You can use voiceover documents generator utility accessible via `Naninovel -> Tools -> Voiceover Documents` to generate documents, containing printed text from the [@print] commands and generic text lines. Each printed text message will be associated with the auto voice clip name to be used with the auto voicing feature.

![](https://i.gyazo.com/69466444d4b8b43d76e7f1566db5ca9a.png)

`Locale` property allows to select a specific locale for which to generate the documents (the localized naninovel scripts for the selected locale should exist in your project).

When `Use Markdown Format` property is enabled, the generated files will be of [markdown format](https://en.wikipedia.org/wiki/Markdown) (.md extension) with some additional formatting for better readability.

![](https://i.gyazo.com/ed6776026a79140de9e9f6a155faffdc.png)

The voiceover documents are intended to be used by the voice actors when recording the voiceover audio clips. 