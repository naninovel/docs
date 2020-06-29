# Movies

Movies are videos played on top of the scene via `IMovieUI` UI, halting script execution and user input processing while being played. 

Before starting playing a movie a fade-in to the specified fade texture (solid black by default) is performed. When playback is finished, a fade-out from the fade texture to the scene content is performed. 

Player can skip movie playback with a `Cancel` input (`Esc` by default for standalone input module); binding can be changed in input configuration menu.

To add, edit and remove movie resources use the movie manager accessible via `Naninovel -> Resources -> Movies` context menu:

![Manage Movies](https://i.gyazo.com/aace59f30f42245fc3ba714d10815d46.png)

You can use any video formats [supported by Unity](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility).

Movies playback behavior can be configured using `Naninovel -> Configuration -> Movies` context menu; for available options see [configuration guide](/ru/guide/configuration.md#movies).

Use [@movie] command followed by video clip name to play a movie from the naninovel scripts:

```
; Given an "Opening" video clip is added to the movie resources, play it
@movie Opening
```

By default, played video is fitted to 16:9 aspect ratio to prevent stretching. You can change this behavior by [overriding](/ru/guide/user-interface.html#ui-customization) `IMovieUI` UI. `Aspect Ratio Fitter` component attached to `MovieImage` game object controls the fitting behavior.

![](https://i.gyazo.com/38e8b1fc220d5fedd50f62ab855b2e92.png)

## WebGL Limitations

Due to platform limitations, video playback on WebGL possible only in URI streaming mode. When building WebGL player, all the movie resources will automatically be copied to `Assets/StreamingAssets` directory. Make sure your web hosting is configured to allow local file access from the player build directory.
