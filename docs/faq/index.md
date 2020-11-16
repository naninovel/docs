# FAQ

## Can I use Naninovel as a drop-in dialogue system for an existing game?

While Naninovel is focused around traditional visual novel games the engine is designed to allow integration with existing projects. If you're making a 3D adventure game, RPG or game of any other genre — you can still use Naninovel as a drop-in dialogue system. 

Be aware, that in most cases such integration will require C# scripting (or [visual scripting](/guide/bolt.md)) in varying extent. See the [engine architecture overview](/guide/engine-architecture.md) to get a grasp of how Naninovel works and [integration guide](/guide/integration-options.md) for more information on the integration options.

## Is it possible to embed a mini-game to Naninovel?

Sure, you can freely "inject" any custom logic to the default Naninovel flow. In most cases, however, this will require using the engine's C# API (via either writing custom C# scripts or using a [visual scripting](/guide/bolt.md) solution). Check the [engine services guide](/guide/engine-services.md) for the list of available open APIs, which allows interaction with the engine; you may also make use of [state outsourcing](/guide/state-management.md#custom-state), [custom actor implementations](/guide/custom-actor-implementations.md) and [custom commands](/guide/custom-commands.md) in the process.

## Does it support a specific language?

Naninovel can work with any language, but to display text in some languages, you'll need a compatible font. [Google's Roboto](https://fonts.google.com/specimen/Roboto) is used by default, which supports all Latin, Cyrillic, and Greek characters in Unicode 7.0. You can change the font used in any of the built-in UIs with [UI customization](/guide/user-interface.md#ui-customization) feature; for the printed text messages, [create custom printers](/guide/text-printers.md#adding-custom-printers) and set the desired font.

In case you're aiming to support as many languages, as possible, check out [Noto fonts](https://www.google.com/get/noto/).

Right-to-left (RTL) languages (Arabic, Hebrew, Persian, etc) are supported by the TMPro text printers, but require additional setup; [see the guide](/guide/text-printers.html#right-to-left-arabic-text) for more info.

## Will I get access to the source code when I buy Naninovel?

All the engine source code is available in the distributed package. A couple of third-party libraries (namely, [NCalc](https://github.com/ncalc/ncalc) and [NLayer](https://github.com/naudio/NLayer)) are pre-compiled, but they're open-sourced (MIT license) with sources hosted on GitHub.

## Why the package doesn't contain any demo scenes?

Naninovel is designed to be [scene-independent](/guide/engine-architecture.md#scene-independent) and doesn't use [Unity scenes](https://docs.unity3d.com/Manual/CreatingScenes.html) in any way, hence it's not possible to make any kind of example or demo scenes. The engine is automatically initialized when the game is started (can be switched to manual initialization in the engine configuration window) and scenarios are scripted via text documents called [naninovel scripts](/guide/naninovel-scripts.md).

Please read through the [getting started](/guide/getting-started.md) guide to get a grasp on how to use the engine. You can find additional examples on using various engine features and script commands in the rest of the [guide](/guide/index.md) and [API command reference](/api/index.md). In case you'd like a complete working project, which can be used as a reference, take a look at the [demo project](/guide/getting-started.html#demo-project).

## How to customize the title (main) menu: add background, music, effects, change buttons, etc?

For the UI part (changing/adding buttons or panel layout and style) [modify the built-in Title UI prefab](/guide/user-interface.md#modifying-built-in-ui); for everything else set `Title Script` at the scripts configuration menu (`Naninovel -> Configuration -> Scripts`) and use script commands to set up the scene just like when writing a scenario. The title script will be automatically played when entering the title menu. An example of the entire customization process is shown in the following video tutorial: [youtu.be/hqhfhXzQkdk](https://youtu.be/hqhfhXzQkdk).

## How to remove a sky background appearing by default in all the Unity scenes?

Remove `Skybox Material` in  `Window -> Rendering -> Lighting Settings` editor menu.

When you remove the skybox, camera's background color will be used instead to fill the screen when no objects are visible. You can change that color (as well as other related settings) by creating a camera prefab and assigning it to `Custom Camera Prefab` property found inside `Naninovel -> Configuration -> Camera` menu. 

## How to change a font?

Built-in UIs bundled with Naninovel use a single default font. While you can easily specify additional fonts for the player to choose from (via `Font Options` property in the UI configuration menu), you'd probably like to change the default font as well.

Font is an individual property of a [text component](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/script-Text.html); all the text components are part of specific UI prefabs. When [adding custom UIs](/guide/user-interface.md#adding-custom-ui), you're free to set any fonts you like; they'll be used when "Default" font option is selected by the player in the game settings menu. In order to change a font in the specific text component of a built-in UI, [modify it](/guide/user-interface.md#modifying-built-in-ui). 

## Why a background is cropped?

Make sure aspect ratio of the background texture resolution is equal to the reference resolution set in the camera configuration. Also, ensure the texture is imported with the [correct settings](https://docs.unity3d.com/Manual/class-TextureImporter) (eg, `Max Size` is high enough).

When screen aspect ratio is different from the reference resolution ratio, background actor will attempt to match by default, which could cause cropping; see [match mode guide](/guide/backgrounds.md#match-mode) for more information.

## How to add a line break to the message?

Check out [`[br]` command](/api/#br). Alternatively, `<br>` tag will work with [TMPro printers](/guide/text-printers.md#textmesh-pro), eg:
```nani
First line.<br>Second line. 
```

## How to inject a command in the midst of a printed text message?

Use [command inlining](/guide/naninovel-scripts.md#command-inlining).

## Hot to run commands concurrently?

Use `wait` parameter, eg:
```nani
; Printer will start fading out at the same time as the characters
@hideChars wait:false
@hidePrinter
```

## How to make actors appear in front of each other (z-sorting)?

Use positioning over z-axis, eg:

```nani
; Make Sora appear at the bottom-center and in front of Felix
@char Sora pos:50,0,-1
@char Felix pos:,,0
```

## Is it possible to show only the avatar of a character inside a text printer, but hide the character itself?

Set `visible:false` for the character you wish to hide; the avatar will remain visible, eg:

```nani
@char CharId visible:false
```

In case you're constantly changing avatars while the character itself should remain hidden, consider disabling `Auto Show On Modify` in the characters configuration menu; when disabled, you won't have to specify `visible:false` to change any parameters of the character while it's hidden.

Alternatively, check out [render actor to texture](/guide/characters.md#render-to-texture) feature.

## How to run a custom C# code from naninovel scripts?

Use [custom commands](/guide/custom-commands.md).
