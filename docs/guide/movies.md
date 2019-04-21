# Movies

Movies are videos played on top of the scene, halting script execution and user input processing while being played. 

Before starting playing a movie a fade-in to the specified fade texture (solid black by default) is performed. When playback is finished, a fade-out from the fade texture to the scene content is performed. 

User can skip movie playback with a `Cancel` input (`Esc` by default for standalone input module).

To add, edit and remove movie resources use the movie manager accessible via `Naninovel -> Resources -> Movies` context menu:

![Manage Movies](https://i.gyazo.com/aace59f30f42245fc3ba714d10815d46.png)

You can use any video formats [supported by Unity](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility).

Movies playback behavior can be configured using `Naninovel -> Configuration -> Movies` context menu; for available options see [configuration guide](/guide/configuration.md#movies).

Use [`@movie`](/api/#movie) action followed by video clip name to play a movie from the novel scripts:

```
; Given an "Opening" video clip is added to the movie resources, play it
@movie Opening
```

Due to platform limitations, video playback on WebGL possible only in URI streaming mode. When building WebGL player, all the movie resources will automatically be copied to `Assets/StreamingAssets` directory. Make sure your web hosting is configured to allow local file access from the player build directory.