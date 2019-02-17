# Background Music

You can add, edit and remove background music (BGM) resources using the audio manager accessible via `Naninovel -> Resources -> Audio` or just store the audio clips at `Resources/Audio` folder.

![Managing BGM](/guide/managing-audio.png)

You can use any audio formats [supported by Unity](https://docs.unity3d.com/Manual/AudioFiles.html).

Background music playback behavior can be configured using `Naninovel -> Configuration -> Audio` context menu; for available options see [configuration guide](/guide/configuration.md#audio). 

Use [`@bgm`](/api/#bgm) action followed by the clip name to play the music in novel scripts:

```
; Fades-in a music track with the name `ThePromenade` and plays it in a loop
@bgm ThePromenade

; Same as above, but fade-in duration is 10 seconds and plays only once
@bgm ThePromenade fadeTime:10 loop:false

; Fades-out and stops any currently played music
@bgm none
```

Only one background music track can be played simultaneously and a cross-fade effect will be automatically applied when switching the music tracks. The music will also loop by default, though you can change this, as well as volume and fade duration using corresponding action parameters.

In case you would like to play multiple audio tracks simultaneously, consider using [sound effects](/guide/sound-effects.md) instead.
