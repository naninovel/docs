# FAQ

## Can I use Naninovel as a drop-in dialogue system for an existing game?

While Naninovel is focused around traditional visual novel games the engine is designed to allow integration with existing projects. If you're making a 3D adventure game, RPG or game of any other genre — you can still use Naninovel as a drop-in dialogue system. 

Be aware, that in most cases such integration will require C# scripting (or [visual scripting](/guide/visual-scripting.md)) in varying extent. See the [engine architecture overview](/guide/engine-architecture.md) to get a grasp of how Naninovel works and [integration guide](/guide/integration-options.md) for more information on the integration options

## Is it possible to embed a mini-game to Naninovel?

Sure, you can freely "inject" any custom logic to the default Naninovel flow. In most cases, however, this will require using the engine's C# API (via either writing custom C# scripts or using a [visual scripting](/guide/visual-scripting.md) solution). Check the [engine services guide](/guide/engine-services.md) for the list of available open APIs, which allows interaction with the engine; you may also make use of [state outsourcing](/guide/state-management.md#custom-state), [custom actor implementations](/guide/custom-actor-implementations.md) and [custom commands](/guide/custom-commands.md) in the process.

## Does it support a specific language?

Naninovel can work with any language, but to display text in some languages, you'll need a compatible font. [Google's Roboto](https://fonts.google.com/specimen/Roboto) is used by default, which supports all Latin, Cyrillic, and Greek characters in Unicode 7.0. You can change the font used in any of the built-in UIs with [UI customization](/guide/user-interface.md#ui-customization) feature; for the printed text messages, [create custom printers](/guide/text-printers.md#adding-custom-printers) and set the desired font.

In case you're aiming to support as much languages, as possible, check out [Noto fonts](https://www.google.com/get/noto/).

## Will I get access to the source code when I buy Naninovel?

All the engine source code is available in the distributed package. Several third-party libraries (namely, [NCalc](https://github.com/ncalc/ncalc), [NLayer](https://github.com/naudio/NLayer) and [UniTask](https://github.com/Cysharp/UniTask)) are pre-compiled, but they're open-sourced (MIT license) with sources hosted on GitHub.

## Why the package doesn't contain any demo scenes?

Naninovel is designed to be [scene-independent](/guide/engine-architecture.md#scene-independent) and doesn't use [Unity scenes](https://docs.unity3d.com/Manual/CreatingScenes.html) in any way, hence it's not possible to make any kind of example or demo scenes. The engine is automatically initialized when the game is started (can be switched to manual initialization in the engine configuration window) and scenarios are scripted via text documents called [naninovel scripts](/guide/naninovel-scripts.md).

Please read through the [getting started](/guide/getting-started.md) guide to get a grasp on how to use the engine. You can find additional examples on using various engine features and script commands in the rest of the [guide](/guide/index.md) and [API command reference](/api/index.md).

There is also a demo project available on GitHub: [github.com/Elringus/NaninovelDemo](https://github.com/Elringus/NaninovelDemo). After cloning the project, don't forget to import Naninovel package to prevent compilation errors.

## How to customize the title (main) menu: add background, music, effects, change buttons, etc?

For the UI part (changing/adding buttons or panel layout and style) use the [UI customization](/guide/user-interface.md#ui-customization) feature; for everything else set `Title Script` at the [scripts configuration menu](/guide/configuration.md#scripts) (Naninovel -> Configuration -> Scripts) and use script commands to setup the scene just like when writing a scenario. The title script will be automatically played when entering the title menu.

## How to remove a sky background appearing by default in all the Unity scenes?

Remove `Skybox Material` in  `Window -> Rendering -> Lighting Settings` editor menu.

When you remove the skybox, camera's background color will be used instead to fill the screen when no objects are visible. You can change that color (as well as other related settings) by creating a camera prefab and assigning it to `Custom Camera Prefab` property found inside `Naninovel -> Configuration -> Camera` menu. 

## How to add a line break to the message?

[Check out `[br]` command](/api/#br).

## How to make actors appear in front of each other (z-sorting)?

Use positioning over z-axis, eg:

```
; Make Sora appear at the bottom-center and in front of Felix
@char Sora pos:50,0,-1
@char Felix pos:,,0
```

## Is it possible to show only the avatar of a character inside a text printer, but hide the character itself?

Set `visible:false` for the character you wish to hide; the avatar will remain visible, eg:

```
@char CharId visible:false
```

In case you're constantly changing avatars while the character itself should remain hidden, consider disabling `Auto Show On Modify` in the characters configuration menu; when disabled, you won't have to specify `visible:false` to change any parameters of the character while it's hidden.

## I'd like to use backgrounds with a non-standard resolution (eg, 2048x1024), but they look cropped.

Set `Reference Resolution` at the [camera configuration menu](/guide/configuration.md#camera) (Naninovel -> Configuration -> Camera) equal to the backgrounds resolution. Also, make sure the background textures are imported with the [correct settings](https://docs.unity3d.com/Manual/class-TextureImporter) (eg, `Max Size` is high enough).

## How to handle different aspect ratios of the target platforms?

For standalone (PC, Mac, Linux) builds you can select the available aspect ratios in the [player settings](https://docs.unity3d.com/Manual/class-PlayerSettingsStandalone.html#Resolution); for web, consoles and mobiles you can't force a specific aspect ratio and have to adapt for the target devices instead. 

Given the source textures (background sprites) of a specific resolution, the only options to "adapt" them for a different aspect ratio are: resize (will distort the image), add black bars or crop. The least noticeable option is to crop, obviously. Naninovel will automatically do the cropping, when `Auto Correct Ortho Size` is enabled in the camera configuration menu and display aspect ratio is different from the `Reference Resolution` aspect set in the same menu. The auto correction will ensure, that the user won't see any black bars or distortions, no matter which display or device is used to run the game.

To manually handle the aspect ratio differences (eg, if you prefer to add black bars or resize the images instead of cropping), disable `Auto Correct Ortho Size` option in the camera configuration menu. You can then control orthographic size of the camera used by Naninovel with `CameraManager` [engine service](/guide/engine-services.md).

## How to run a custom C# code from naninovel scripts?

Use [custom commands](/guide/custom-commands.md).
