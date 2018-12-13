# Sound Effects

You can add, edit and remove sound effect (SFX) resources using the audio manager accessible via `Naninovel -> Resources -> Audio` or just store the audio clips at `Resources/Audio` folder.

![Managing SFX](/guide/managing-audio.png)

You can use any audio formats [supported by Unity](https://docs.unity3d.com/Manual/AudioFiles.html).

Sound effects playback behavior can be configured using `Naninovel -> Configuration -> Audio` context menu; for available options see [configuration guide](/guide/configuration.md#audio). 

Use [`@sfx`](/api/#sfx) and [`@stopSfx`](/api/#stopsfx) actions followed by the clip name to control playback of the sound effects in novel scripts:

```
; Plays an SFX with the name `Explosion` once
@sfx Explosion

; Plays an SFX with the name `Rain` in a loop
@sfx Rain loop:true

; Stop playing an SFX with the name `Rain`, fading-out for 15 seconds
@stopSfx Rain fadeTime:15
```

Multiple SFX tracks can be played simultaneously and they won't loop by default, though you can change this, as well as volume and fade duration using corresponding action parameters.
