# FAQ

## Do I need to know programming to use Naninovel?

Naninovel is designed to be friendly for non-programmers and doesn't require any programming knowledge in order to create basic visual novels. For example, our [WebGL demo](https://naninovel.com/demo) is created without any custom C# scripts. Check the [getting started guide](/guide/getting-started) and [video tutorial](https://youtu.be/wFil5vje3NE) for an example of the basic workflow. However, adding custom features (gameplay) or integrating with other third-party packages will require C# (or [visual](/guide/samples#visual-scripting)) scripting in most cases. Specific features (eg, [UI customization](/guide/user-interface.html#ui-customization)) could also require some experience with the Unity editor.

## Can I use Naninovel as a drop-in dialogue system for an existing game?

While Naninovel is focused around traditional visual novel games and works best as a template for one, it's possible to integrate the engine with existing projects. If you're making a 3D adventure game, RPG or game of any other genre — you can still use Naninovel as a drop-in dialogue system.

Be aware, that in most cases such integration will require C# (or [visual](/guide/samples#visual-scripting)) scripting in varying extent. See the [engine architecture overview](/guide/engine-architecture) to get a grasp of how Naninovel works and [integration guide](/guide/integration-options) for more information on the integration options.

## Is it possible to embed a mini-game to Naninovel?

Sure, you can "inject" any custom logic to the default Naninovel flow. In many cases, however, this will require using the engine's C# API (via either writing custom C# scripts or using a [visual scripting](/guide/samples#visual-scripting) solution). Check the [engine services guide](/guide/engine-services) for the list of available open APIs, which allows interaction with the engine; you may also make use of [state outsourcing](/guide/state-management#custom-state), [custom actor implementations](/guide/custom-actor-implementations) and [custom commands](/guide/custom-commands) in the process.

## Does it support a specific language?

Naninovel can work with any language, but to display text in some languages, you'll need a compatible font. Consult "Fonts" section of the [localization guide](/guide/localization.html#fonts) for more info.

## Will I get access to the source code when I buy Naninovel?

All the Unity-related sources are available in the distributed package. Common Naninovel modules are precompiled into dynamic assembly with sources hosted on a [private GitHub repository](https://github.com/naninovel/engine) which you can access after [registering your license](https://naninovel.com/register).

## What are the legal usage terms and conditions?

Naninovel is governed by the following End User License Agreement (EULA): [naninovel.com/eula](https://naninovel.com/eula). Please read the document carefully before downloading or using the application.

## Why am I getting "asset wasn't downloaded" error when attempting to register Asset Store license?

The asset download verification is required when Naninovel is purchased via Unity's Asset Store. In order for the verification to succeed, Naninovel has to be downloaded at least once via Unity's [package manager](https://docs.unity3d.com/Manual/Packages.html) by the user, which purchased the asset. In case multiple copies of the asset have been purchased, each copy has to be downloaded by the associated organization user. In case you've completed all the steps, but still have issues, please [contact Unity support](https://support.unity.com).

::: warning
When asset is purchased from an organization account, the organization owner have to download the asset to satisfy the check (assigned members won't count). This is an Asset Store limitation and we won't be able to provide any workarounds in such cases; please contact Unity support for more information and assistance.
:::

## Why the package doesn't contain any demo scenes?

Naninovel is designed to be [scene-independent](/guide/engine-architecture#scene-independent) and doesn't use [Unity scenes](https://docs.unity3d.com/Manual/CreatingScenes.html) in any way, hence it's not possible to make any kind of example or demo scenes. The engine is automatically initialized when the game is started (can be switched to manual initialization in the engine configuration window) and scenarios are scripted via text documents called [naninovel scripts](/guide/naninovel-scripts).

Please read through the [getting started](/guide/getting-started) guide to get a grasp on how to use the engine. You can find additional examples on using various engine features and script commands in the rest of the [guide](/guide/index) and [API command reference](/api/index). In case you'd like a complete working project, which can be used as a reference, take a look at the [demo project](/guide/getting-started.html#demo-project).

## How to customize the title (main) menu: add background, music, effects, change buttons, etc?

For the UI part (changing/adding buttons or panel layout and style) [modify the built-in Title UI prefab](/guide/user-interface#modifying-built-in-ui); for everything else set `Title Script` at the scripts configuration menu (`Naninovel -> Configuration -> Scripts`) and use script commands to set up the scene just like when writing a scenario. The title script will be automatically played when entering the title menu. An example of the entire customization process is shown in the following video tutorial: [youtu.be/hqhfhXzQkdk](https://youtu.be/hqhfhXzQkdk).

## Why a background is cropped?

Make sure aspect ratio of the background texture resolution is equal to the reference resolution set in the camera configuration. Also, ensure the texture is imported with the [correct settings](https://docs.unity3d.com/Manual/class-TextureImporter) (eg, `Max Size` is high enough).

When screen aspect ratio is different from the reference resolution ratio, background actor will attempt to match by default, which could cause cropping; see [match mode guide](/guide/backgrounds#match-mode) for more information.

## How to inject a command in the midst of a printed text message?

Use [command inlining](/guide/naninovel-scripts#command-inlining).

## How to prevent commands from running concurrently?

Specify `wait` parameter, which is available in all async commands, eg:

```nani
; Printer will start fading out after the characters are hidden.
@hideChars wait!
@hidePrinter
```

Alternatively, enable `Wait By Default` option in script player configuration; this way all commands will be awaited by default, unless `wait` is negated (set to false).

::: info
Find more about async (parallel) command execution in the [dedicated article](/guide/naninovel-scripts#async-execution).
:::

## How to make actors appear in front of each other (z-sorting)?

Use positioning over z-axis, eg:

```nani
; Make Sora appear at the bottom-center and in front of Felix
@char Sora pos:50,0,-1
@char Felix pos:,,0
```

In case you have sorting issues in perspective camera mode, try changing `Transparency Sort Mode` found in "Edit > Projecting Settings > Graphics" editor menu to `Orthographic`. Find more information on how objects are sorted in Unity in the [2D sorting manual](https://docs.unity3d.com/Manual/2DSorting.html).

## Is it possible to show only the avatar of a character inside a text printer, but hide the character itself?

Specify `!visible` for the character you wish to hide; the avatar will remain visible, eg:

```nani
@char CharId !visible
```

In case you're constantly changing avatars while the character itself should remain hidden, consider disabling `Auto Show On Modify` in the characters configuration menu; when disabled, you won't have to specify `!visible` to change any parameters of the character while it's hidden.

Alternatively, check out [render actor to texture](/guide/characters#render-to-texture) feature.

## How to run a custom C# code from naninovel scripts?

To invoke a C# behaviour (eg, access a game object on scene), use [custom commands](/guide/custom-commands); to get value from a C# method and use it in naninovel script, use [expression functions](/guide/script-expressions#adding-custom-functions).
