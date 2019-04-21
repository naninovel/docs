# Sound Effects

You can add, edit and remove sound effect (SFX) resources using the audio manager accessible via `Naninovel -> Resources -> Audio` or just store the audio clips at `Resources/Audio` folder.

![Managing SFX](https://i.gyazo.com/cacdec36623dbbfcf9f49c594de53c0f.png)

You can use any audio formats [supported by Unity](https://docs.unity3d.com/Manual/AudioFiles.html).

Sound effects playback behavior can be configured using `Naninovel -> Configuration -> Audio` context menu; for available options see [configuration guide](/guide/configuration.md#audio). 

Use [`@sfx`](/api/#sfx) and [`@stopSfx`](/api/#stopsfx) actions followed by the clip name to control playback of the sound effects in novel scripts:

```
; Plays an SFX with the name `Explosion` once
@sfx Explosion

; Plays an SFX with the name `Rain` in a loop
@sfx Rain loop:true

; Changes volume of all the played SFX tracks to 75% over 2.5 seconds and disables looping for all of them
@sfx volume:0.75 loop:false time:2.5
```

Sound effect tracks are not looped by default. When sfx track name is not specified in `@sfx` action, all the currently played tracks will be affected. When invoked for a track that is already playing, the playback won't be affected (track won't start playing from the start), but the specified parameters (volume and whether the track is looped) will be applied.
