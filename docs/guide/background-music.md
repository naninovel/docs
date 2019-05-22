# Background Music

You can add, edit and remove background music (BGM) resources using the audio manager accessible via `Naninovel -> Resources -> Audio` or just store the audio clips at `Resources/Audio` folder.

![Managing BGM](https://i.gyazo.com/cacdec36623dbbfcf9f49c594de53c0f.png)

You can use any audio formats [supported by Unity](https://docs.unity3d.com/Manual/AudioFiles.html).

Background music playback behavior can be configured using `Naninovel -> Configuration -> Audio` context menu; for available options see [configuration guide](/guide/configuration.md#audio). 

Use [`@bgm`](/api/#bgm) command followed by the clip name to control the music playback in naninovel scripts:

```
; Fades-in a music track with the name `Sanctuary` over default fade duration and plays it in a loop
@bgm Sanctuary

; Same as above, but fade-in duration is 10 seconds and plays only once
@bgm Sanctuary time:10 loop:false

; Changes volume of all the played music tracks to 50% over 2.5 seconds and makes them play in a loop
@bgm volume:0.5 loop:true time:2.5
```

Music tracks are looped by default. When music track name is not specified in `@bgm` command, all the currently played tracks will be affected. When invoked for a track that is already playing, the playback won't be affected (track won't start playing from the start), but the specified parameters (volume and whether the track is looped) will be applied.
