# FAQ

## Do I need to know programming to use Naninovel?

Naninovel is designed to be friendly for non-programmers and doesn't require any programming knowledge in order to create basic visual novels. For example, our [WebGL demo](https://naninovel.com/demo) is created without any custom C# scripts. Check the [getting started guide](/guide/getting-started) and [video tutorial](https://youtu.be/wFil5vje3NE) for an example of the basic workflow. However, adding custom features (gameplay) or integrating with other third-party packages will require C# (or [visual](/guide/visual-scripting)) scripting in most cases. Specific features (eg, [UI customization](/guide/user-interface.html#ui-customization)) could also require some experience with the Unity editor.

## Can I use Naninovel as a drop-in dialogue system for an existing game?

While Naninovel is focused around traditional visual novel games the engine is designed to allow integration with existing projects. If you're making a 3D adventure game, RPG or game of any other genre — you can still use Naninovel as a drop-in dialogue system.

Be aware, that in most cases such integration will require C# (or [visual](/guide/visual-scripting)) scripting in varying extent. See the [engine architecture overview](/guide/engine-architecture) to get a grasp of how Naninovel works and [integration guide](/guide/integration-options) for more information on the integration options.

## Is it possible to embed a mini-game to Naninovel?

Sure, you can freely "inject" any custom logic to the default Naninovel flow. In most cases, however, this will require using the engine's C# API (via either writing custom C# scripts or using a [visual scripting](/guide/visual-scripting) solution). Check the [engine services guide](/guide/engine-services) for the list of available open APIs, which allows interaction with the engine; you may also make use of [state outsourcing](/guide/state-management#custom-state), [custom actor implementations](/guide/custom-actor-implementations) and [custom commands](/guide/custom-commands) in the process.

## Does it support a specific language?

Naninovel can work with any language, but to display text in some languages, you'll need a compatible font. Consult "Fonts" section of the [localization guide](/guide/localization.html#fonts) for more info.

## Will I get access to the source code when I buy Naninovel?

All the Unity-related sources are available in the distributed package. Common Naninovel modules are precompiled into dynamic assembly with sources hosted on GitHub: [github.com/naninovel/common](https://github.com/naninovel/common).

## What are the legal usage terms and conditions?

Naninovel is governed by the following End User License Agreement (EULA): [naninovel.com/eula](https://naninovel.com/eula). Please read the document carefully before downloading or using the application.

## What's the difference between purchasing Naninovel on Asset Store vs our website?

We recommend purchasing Naninovel directly [from our website](https://naninovel.com), as it's both cheaper and provide diverse payment options: cards and direct bank debit, Apple and Google Pay, WeChat, Alipay and more, as well as "buy now, pay later" option via Klarna or Affirm.

We are using [Stripe](https://stripe.com) to process the payments, which is the leading solution in the field providing secure and reliable service. On the other hand, we had several cases when Asset Store failed to process payments resulting in funds being frozen for weeks.

Another issue with purchasing on Asset Store is the requirement to validate the purchase to receive support and access latest updates. When purchasing directly from us, you just use the order number, whilst with Asset Store you have to wait until invoice is generated (which may take up to 24 hours) and download the asset via package manager at least once in order for the verification to work.

The only "extra" you'd get when purchasing on Asset Store is the option to download the package via Unity's package manager. However, due to long review processes, Naninovel version on the store is usually outdated, so you'll most likely end up downloading it directly from us anyway.

## Why am I getting "asset wasn't downloaded" error when attempting to register Asset Store license?

The asset download verification is required when Naninovel is purchased via Unity's Asset Store. In order for the verification to succeed, Naninovel has to be downloaded at least once via Unity's [package manager](https://docs.unity3d.com/Manual/Packages.html) by the user, which purchased the asset. In case multiple copies of the asset has been purchased, each copy has to be downloaded by the associated organization user.

In case you've made sure all the associated users have downloaded the asset but the error is still there, try waiting for some time to allow notification propagate on the Unity side. If it's still not working, contact Unity support with the order number and ask them to check why the download status is not changing.

## Why the package doesn't contain any demo scenes?

Naninovel is designed to be [scene-independent](/guide/engine-architecture#scene-independent) and doesn't use [Unity scenes](https://docs.unity3d.com/Manual/CreatingScenes.html) in any way, hence it's not possible to make any kind of example or demo scenes. The engine is automatically initialized when the game is started (can be switched to manual initialization in the engine configuration window) and scenarios are scripted via text documents called [naninovel scripts](/guide/naninovel-scripts).

Please read through the [getting started](/guide/getting-started) guide to get a grasp on how to use the engine. You can find additional examples on using various engine features and script commands in the rest of the [guide](/guide/index) and [API command reference](/api/index). In case you'd like a complete working project, which can be used as a reference, take a look at the [demo project](/guide/getting-started.html#demo-project).

## How to customize the title (main) menu: add background, music, effects, change buttons, etc?

For the UI part (changing/adding buttons or panel layout and style) [modify the built-in Title UI prefab](/guide/user-interface#modifying-built-in-ui); for everything else set `Title Script` at the scripts configuration menu (`Naninovel -> Configuration -> Scripts`) and use script commands to set up the scene just like when writing a scenario. The title script will be automatically played when entering the title menu. An example of the entire customization process is shown in the following video tutorial: [youtu.be/hqhfhXzQkdk](https://youtu.be/hqhfhXzQkdk).

## Why a background is cropped?

Make sure aspect ratio of the background texture resolution is equal to the reference resolution set in the camera configuration. Also, ensure the texture is imported with the [correct settings](https://docs.unity3d.com/Manual/class-TextureImporter) (eg, `Max Size` is high enough).

When screen aspect ratio is different from the reference resolution ratio, background actor will attempt to match by default, which could cause cropping; see [match mode guide](/guide/backgrounds#match-mode) for more information.

## How to add a line break to the message?

Check out [`[br]` command](/api/#br). Alternatively, `<br>` tag will work with [TMPro printers](/guide/text-printers#textmesh-pro), eg:

```nani
First line.<br>Second line.
```

## How to inject a command in the midst of a printed text message?

Use [command inlining](/guide/naninovel-scripts#command-inlining).

## How to run commands concurrently?

Use wait flag, eg:

```nani
; Printer will start fading out at the same time as the characters
@hideChars >
@hidePrinter
```

Alternatively, disable `Wait By Default` option in script player configuration; this way all commands will execute concurrently by default, unless wait flag is reversed. Refer to the [wait flag documentation](/guide/naninovel-scripts#wait-flag) for more info.

## How to make actors appear in front of each other (z-sorting)?

Use positioning over z-axis, eg:

```nani
; Make Sora appear at the bottom-center and in front of Felix
@char Sora pos:50,0,-1
@char Felix pos:,,0
```

In case you have sorting issues in perspective camera mode, try changing `Transparency Sort Mode` found in "Edit > Projecting Settings > Graphics" editor menu to `Orthographic`. Find more information on how objects are sorted in Unity in the [2D sorting manual](https://docs.unity3d.com/Manual/2DSorting.html).

## Is it possible to show only the avatar of a character inside a text printer, but hide the character itself?

Set `visible:false` for the character you wish to hide; the avatar will remain visible, eg:

```nani
@char CharId visible:false
```

In case you're constantly changing avatars while the character itself should remain hidden, consider disabling `Auto Show On Modify` in the characters configuration menu; when disabled, you won't have to specify `visible:false` to change any parameters of the character while it's hidden.

Alternatively, check out [render actor to texture](/guide/characters#render-to-texture) feature.

## How to run a custom C# code from naninovel scripts?

To invoke a C# behaviour (eg, access a game object on scene), use [custom commands](/guide/custom-commands); to get value from a C# method and use it in naninovel script, use [expression functions](/guide/script-expressions#adding-custom-functions).

## Can you make an internal method or property virtual, so I can override it?

We've used to make most of the class members virtual, allowing users to override them in custom [engine services](/guide/engine-services), [actors](/guide/custom-actor-implementations), [commands](/guide/custom-commands), components, etc.

While it didn't affect Naninovel's own code quality (we are not overriding those members internally), the inherit->override option was promoting bad practice among users, where, instead of taking ownership of  custom implementation of an interface or component, it's coupled to internal class.

The internal classes (opposed to public interfaces) are subject to frequent changes both in API and behaviour; such changes will inevitably break user's implementation derived from them. Additionally, in some cases you may not even notice something has changed and leak the issues to production (published game).

Instead of inheriting built-in class when authoring interface implementation or swapping component on a game object, copy-paste the class sources and perform the required changes. This will make your custom implementations less fragile when upgrading Naninovel package.
