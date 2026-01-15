# FAQ

## Do I need to know programming to use Naninovel?

Naninovel is designed to be friendly for non-programmers and doesn't require programming knowledge to create basic visual novels. For example, our [WebGL demo](https://naninovel.com/demo) is created without any custom C# scripts. Check the [getting started guide](/guide/getting-started) and [video tutorial](https://youtu.be/wFil5vje3NE) for an example of the basic workflow. However, adding custom features (gameplay) or integrating with other third-party packages will require C# (or [visual](/guide/samples#visual-scripting)) scripting in most cases. Specific features (e.g., [UI customization](/guide/gui.html#ui-customization)) could also require some experience with the Unity editor.

## Can I use Naninovel as a drop-in dialogue system for an existing game?

While Naninovel is primarily designed as a foundation for building visual novels, it can also be used as a drop-in dialogue or cutscene system for games of any genre. It even includes a [dedicated mode](/guide/getting-started#dialogue-mode) specifically for that use case.

## Why not use node graphs for scenario authoring?

At first glance, you might think node graphs are convenient for creating dialogues. In reality, once enough content is added, they quickly turn into an unmanageable mess. Complex conversations are far better handled in text format, as it scales more cleanly and keeps the workflow efficient.

For example, compare [the screenshots](https://i.gyazo.com/94fc39b918d2acdf9437a96c4f3cce10.png): on the left is one of the popular Unity assets for authoring dialogues with a node graph, and on the right is the exact same script written in Naninovel. As you can see, the script is far more straightforward and easier to manage in text format — no clunky UIs, no hunting through Unity assets just to make edits. And if you still prefer a visual editor, we have a [specialized one](/guide/editor#scenario-editor) that handles the process much better than a node graph would.

That said, node graphs can still be useful for tracking and organizing the branching flow of a story. That's why Naninovel includes a [story graph](/guide/editor#story-graph), which provides a clear, high-level view of your narrative.

## Is it possible to embed a mini-game into Naninovel?

Sure, you can "inject" any custom logic into the default Naninovel flow. In many cases, however, this will require using the engine's C# API (via either writing custom C# scripts or using a [visual scripting](/guide/samples#visual-scripting) solution). Check the [engine services guide](/guide/engine-services) for the list of available open APIs, which allows interaction with the engine; you may also make use of [state outsourcing](/guide/state-management#custom-state), [custom actor implementations](/guide/custom-actor-implementations) and [custom commands](/guide/custom-commands) in the process.

## Does it support a specific language?

Naninovel can work with any language, but to display text in some languages, you'll need a compatible font. Consult "Fonts" section of the [localization guide](/guide/localization.html#fonts) for more info.

## Will I get access to the source code when I buy Naninovel?

All the Unity-related sources are available in the distributed package. Common Naninovel modules are precompiled into dynamic assembly with sources hosted on a [private GitHub repository](https://github.com/naninovel/engine) which you can access after [registering your license](https://naninovel.com/register).

## What are the legal usage terms and conditions?

Naninovel is governed by the following End User License Agreement (EULA): [naninovel.com/eula](https://naninovel.com/eula). Please read the document carefully before downloading or using the application.

## Why am I getting "asset wasn't downloaded" error when attempting to register Asset Store license?

The asset download verification is required when Naninovel is purchased via Unity's Asset Store. In order for the verification to succeed, Naninovel has to be downloaded at least once via Unity's [package manager](https://docs.unity3d.com/Manual/Packages.html) by the user who purchased the asset. In case multiple copies of the asset have been purchased, each copy has to be downloaded by the associated organization user. In case you've completed all the steps, but still have issues, please [contact Unity support](https://support.unity.com).

::: warning
When the asset is purchased from an organization account, the organization owner has to download the asset to satisfy the check (assigned members won't count). This is an Asset Store limitation and we won't be able to provide any workarounds in such cases; please contact Unity support for more information and assistance.
:::

## How to customize the title (main) menu?

For the UI part (changing/adding buttons or panel layout and style) [modify the built-in Title UI prefab](/guide/gui#modifying-built-in-ui); for everything else set `Title Script` in the scripts configuration menu (`Naninovel -> Configuration -> Scripts`) and use script commands to set up the scene just like when writing a scenario. The title script will be automatically played after engine initialization and when using the [@title] command.

## Why a background is cropped?

Make sure the aspect ratio of the background texture resolution matches the reference resolution set in the camera configuration. Also, ensure the texture is imported with the [correct settings](https://docs.unity3d.com/Manual/class-TextureImporter) (e.g., `Max Size` is high enough).

When the screen aspect ratio is different from the reference resolution ratio, the background actor will attempt to match by default, which could cause cropping; see [match mode guide](/guide/backgrounds#match-mode) for more information.

## How to inject a command in the midst of a printed text message?

Use [command inlining](/guide/scenario-scripting#command-inlining).

## How to prevent commands from running concurrently?

Specify `wait` parameter, which is available in all async commands, e.g.:

```nani
; Printer will start fading out after the characters are hidden.
@hideChars wait!
@hidePrinter
```

Alternatively, enable `Wait By Default` option in script player configuration; this way all commands will be awaited by default, unless `wait` is negated (set to false).

::: info
Find more about async (parallel) command execution in the [dedicated article](/guide/scenario-scripting#async-execution).
:::

## How to make actors appear in front of each other (z-sorting)?

Use positioning over z-axis, e.g.:

```nani
; Make Sora appear at the bottom-center and in front of Felix
@char Sora pos:50,0,-1
@char Felix pos:,,0
```

In case you have sorting issues in perspective camera mode, try changing `Transparency Sort Mode` found in "Edit > Project Settings > Graphics" Editor menu to `Orthographic`. Find more information on how objects are sorted in Unity in the [2D sorting manual](https://docs.unity3d.com/Manual/2DSorting.html).

## Is it possible to show only the avatar of a character inside a text printer, but hide the character itself?

Specify `!visible` for the character you wish to hide; the avatar will remain visible, e.g.:

```nani
@char CharId !visible
```

In case you're constantly changing avatars while the character itself should remain hidden, consider disabling `Auto Show On Modify` in the characters configuration menu; when disabled, you won't have to specify `!visible` to change any parameters of the character while it's hidden.

Alternatively, check out [render actor to texture](/guide/characters#render-to-texture) feature.

## How to run a custom C# code from scenario scripts?

To invoke a C# behaviour (e.g., access a game object on scene), use [custom commands](/guide/custom-commands); to get a value from a C# method and use it in a scenario script, use [expression functions](/guide/script-expressions#adding-custom-functions).
