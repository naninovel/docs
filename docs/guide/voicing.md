# Voicing

To expose voice clips to the engine, store them under `Resources/Voice` folder. You can use any audio formats [supported by Unity](https://docs.unity3d.com/Manual/AudioFiles.html).

Voice playback behavior can be configured using `Naninovel -> Configuration -> Audio` context menu; for available options see [configuration guide](/guide/configuration.md#audio). 

Use [`@voice`](/api/#voice) action followed by the clip name to play the voice in novel scripts.


## Auto Voicing

In fully-voiced games, it could become tedious to specify a `@voice` action for each voiced line. Auto voicing feature allows to automatically play a voice clip that has a name equal to the line number of the currently played `@print` action; this way, you won't have to use `@voice` actions in novel scripts at all — voices will be automatically played when the corresponding text lines are printed in the game.

To enable auto voicing feature, use `Enable Auto Voicing` toggle in the Audio configuration menu.

Audio clips used for the auto voicing feature should be grouped under a folder with name equal to the script name, and has the following name: *LineNumber*.*ActionIndex*, where *LineNumber* is the line number of the corresponding print action and *ActionIndex* is the inline or action index of the print action in cases when dealing with generic text lines.

For example, consider the following novel script with name "Script001":

```
@print text:"Text from a print action."
Text from a simple generic text line.
Text from first sentence.[i] Text from second sentence.
```

In order for the auto voicing system to play corresponding audio clips when printing those lines, the clips should be placed under `Resources/Voice/Script001` folder and have the following names: 

Text | Voice Clip Name
--- | ---
Text from a print action. | 1.0
Text from a simple generic text line. | 2.0
Text from first sentence. | 3.0
Text from second sentence. | 3.2

To simplify the process, when auto voicing feature is enabled, name of voice clip for the currently printed text is displayed in the debug window:

![auto voicing](/guide/auto-voicing.png)

To open the debug window, make sure `Enable Development Console` is turned on in the engine configuration, then press `~` key while in play mode, type `debug` and press `Enter`.

