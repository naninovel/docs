# Characters 

Characters are actors used to represent scene entities that are placed on top of the [backgrounds](/guide/backgrounds.md). 

A character actor is defined with a name, appearance, visibility, transform (position, rotation, scale) and look direction. It can change appearance, visibility, transform and look direction over time.

Characters' behavior can be configured using `Naninovel -> Configuration -> Characters` context menu; for available options see [configuration guide](/guide/configuration.md#characters). The characters' resources manager can be accessed using `Naninovel -> Resources -> Characters` context menu.

![Add Character](https://i.gyazo.com/c8a4f7f987621831b4a2ecb3145a4a07.png)

In naninovel scripts, characters are mostly controlled with [`@char`](/api/#char) command:

```
; Shows character with name `Sora` with a default appearance.
@char Sora

; Same as above, but sets appearance to `Happy`.
@char Sora.Happy

; Same as above, but also positions the character 45% away from the left border
; of the screen and 10% away from the bottom border; also makes him look to the left.
@char Sora.Happy look:left pos:0.45,0.1
```

## Poses

Each character has `Poses` property allowing to specify named states (poses).

![](https://i.gyazo.com/6dd1e4bca6473e25cc24acc56138dc55.png)

Pose name can be used as appearance in [`@char`](/api/#char) command to apply all the parameters specified in the pose state at once, instead of specifying them individually via the command parameters.

```
; Given `SuperAngry` pose is defined for `Kohaku` character,
; applies all the parameters specified in the pose state.
@char Kohaku.SuperAngry

; Same as above, but using `DropFade` transition over 3 seconds.
@char Kohaku.SuperAngry transition:DropFade time:3
```

Notice, that when a pose is used as appearance, you can still override individual parameters, eg:

```
; Given `SuperAngry` pose is defined for `Kohaku` character,
; applies all the parameters specified in the pose state,
; except tint, which is overridden in the command.
@char Kohaku.SuperAngry tint:#ff45cb
```

## Display Names

In the character configuration you can set a `Display Name` for specific characters. When set, display name will be shown in the printer name label UI, instead of the character's ID. This allows using compound character names, that contains spaces and special characters (which is not allowed for IDs).

For localization, use "CharacterNames" [managed text](/guide/managed-text) document, which is automatically created when running generate managed text resources task. Values from the "CharacterNames" document won't override values set in the character metadata when under the source locale.

It's possible to bind a display name to a custom variable to dynamically change it throughout the game via naninovel scripts. To bind a display name, specify name of the custom variable wrapped in curly braces in the character configuration menu.

![](https://i.gyazo.com/9743061df462bd809afc45bff20bbb6d.png)

You can then change the variable value in the scripts and it will also change the display name:

```
@set PlayerName="Mistery Man"
Player: ...

@set PlayerName="Dr. Stein"
Player: You can call me Dr. Stein.
```

It's also possible to use the name binding feature to allow player pick their display name using [`@input`](/api/#input) command:

```
@input PlayerName summary:"Choose your name."
@stop
Player: You can call me {PlayerName}.
```

## Message Colors

When `Use Character Color` is enabled in the character configuration, printer text messages and name labels will be tinted in the specified colors when the corresponding character ID is specified in a [`@print`](/api/#print) command or generic text line.

The following video demonstrates how to use display names and character colors.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/u5B5s-X2Bw0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Avatar Textures

You can assign avatar textures to characters using `avatar` parameter of [`@char`](/api/#char) command. Avatars will be shown by the compatible text printers when they print a text message that is associated with the character. Currently, only `Wide` and `Chat` text printers support the avatars feature.

![](https://i.gyazo.com/f921ab4ef864aea6980a5c6be6743494.png)

To use any given avatar, you have to first add it to the avatar resources and give it a name. You can do this via `Avatar Resources` property in the characters configuration menu.

![](https://i.gyazo.com/5a0f10d174aa75ed87da1b472567e40b.png)

You can set a default avatar for a character by giving the avatar texture resource name that equals to `CharacterID/Default`; eg, to set a default avatar for character with ID `Kohaku` name the avatar resource `Kohaku/Default`. Default avatars will be used when `avatar` parameter is not set in the `@char` commands.

It's also possible to associate avatars with specific character appearances, so that when character changes appearance, the avatar will also change automatically. For this, name the avatar resources using the following format: `CharacterID/CharacterAppearance`, where `CharacterAppearance` is the name of the appearance for which to map the avatar resource.

Please note, that the **avatars are not directly connected with character appearances** and shouldn't be considered as a way to show character on the scene. Appearances are the actual representation of a character on the scene. Avatars is a standalone feature, that "injects" an image to a compatible text printer.

It's possible to show only the avatar of a character inside a text printer, but hide the character itself by setting `visible` parameter of the `@char` command to `false`, eg:
```
@char CharId visible:false
```

In case you're constantly changing avatars while the character itself should remain hidden, consider disabling `Auto Show On Modify` in the characters configuration menu; when disabled, you won't have to specify `visible:false` to change any parameters of the character while it's hidden.

## Speaker Highlight

When enabled in the character configuration, will tint the character based on whether the last printed message is associated with it.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/gobowgagdyE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Lip Sync

[Generic](/guide/characters.md#generic-characters) and [Live2D](/guide/characters.md#live2d-characters) character implementations support so called "lip synchronization" feature, allowing to drive character's mouth animation while its the author of the printed message by sending the appropriate events. 

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/fx_YS2ZQGHI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

When [auto voicing](/guide/voicing.md#auto-voicing) feature is enabled, lip sync events will be driven by the voice over; otherwise, printed text messages will activate the events. In the latter case, you'll probably sometimes want to manually start or stop the lip sync (eg, to prevent mouth animation when punctuation marks are printed); for such cases, use [`@lipSync`](/api/#lipsync) command.

See [Generic](/guide/characters.md#generic-characters) and [Live2D](/guide/characters.md#live2d-characters) character implementation docs below for the details on how to setup the lip sync feature.

## Linked Printer

It's possible to associate a [text printer](/guide/text-printers.md) with a character using `Linked Printer` property.

![](https://i.gyazo.com/50ca6b39cd7f708158678339244b1dc4.png)

When linked, the printer will automatically be used to handle messages authored by the character.

Be aware, that [`@print`](/api/#print) commands (that are also used under the hood when printing generic text lines) make associated printers default and hide other visible printers by default. When printers are linked to characters, print commands will automatically change the currently visible and default text printer, while printing text associated with the corresponding characters. It's possible to prevent this behavior by disabling `Auto Default` property in printer actor configuration menu; when disabled you'll have to manually show/hide and switch default printers with [`@printer`](/api/#printer) commands.

## Sprite Characters 

Sprite implementation of the character actors is the most common and simple one; it uses a set of [sprite](https://docs.unity3d.com/Manual/Sprites) assets to represent appearances of the character. The source of the sprites could be images (textures) of any [formats supported by Unity](https://docs.unity3d.com/Manual/ImportingTextures).

## Diced Sprite Characters

Built with an open source [SpriteDicing](https://github.com/Elringus/SpriteDicing) package, `DicedSpriteCharacter` implementation allows to significantly reduce build size and texture memory by reusing texture areas of the character sprites. 

![Sprite Dicing](https://i.gyazo.com/af08d141e7a08b6a8e2ef60c07332bbf.png)

Install the package via [Unity package manager](https://docs.unity3d.com/Manual/upm-ui.html): open package manager window (Window -> Package Manager), click "+" button, choose "Add package from git URL", enter `https://github.com/Elringus/SpriteDicing.git#package` to the input field and click "Add".

<video class="video" loop autoplay><source src="https://i.gyazo.com/b54e9daa9a483d9bf7f74f0e94b2d38a.mp4" type="video/mp4"></video>

`DicedSpriteAtlas` assets containing character appearances are used as the resources for the diced sprite characters. Each appearance is mapped by name to the diced sprites contained in the atlas.

The following video guide covers creating and configuring diced sprite atlas, adding new diced character based on the created atlas and controlling the character from a naninovel script.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/6PdOAOsnhio" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Layered Characters

The layered implementation allows composing characters from multiple sprites (layers) and then toggle them individually or in groups via naninovel scripts at runtime.

To create a layered character prefab, use `Create -> Naninovel -> Character -> Layered` asset context menu. Enter [prefab editing mode](https://docs.unity3d.com/Manual/EditingInPrefabMode.html) to compose the layers. Several layers and groups will be created by default. You can use them or delete and add your own.

Each child game object of the root prefab object with a [sprite renderer](https://docs.unity3d.com/Manual/class-SpriteRenderer.html) component is considered a *layer*; other objects considered *groups*. Aside from organization and transformation purposes, placing layers inside groups will allow you to select a single layer or disable/enable all the layers inside a group with a single expression in naninovel script (more on that later). 

To hide some of the layers from being visible by default, disable sprite renderer components (not the game objects).

The white frame drawn over the prefab is used to describe the actor canvas, which will be rendered to a render texture at runtime. Make sure to minimize the empty areas inside the frame by moving the layers and groups to prevent wasting texture memory and for anchoring to work correctly.

![](https://i.gyazo.com/4ff103c27858ac9671ba3b94ab1ade20.png)

You can scale the root game object to fine-tune the default size of the actor.

When authoring layered character art in Photoshop, consider using Unity's [PSD Importer package](https://docs.unity3d.com/Packages/com.unity.2d.psdimporter@3.0/manual/index.html) to automatically generate character prefab preserving all the layers and their positions.

Don't forget to add the created layered prefab to the character resources (`Naninovel -> Resources -> Characters`). Choose "Naninovel.LayeredCharacter" implementation and drop prefab to the "Resource" field when configuring the resource record.

To control the layered characters in naninovel scripts, use `@char` command in the same way as with the other character implementations. The only difference is how you set the appearance: instead of a single ID, use the *layer composition expression*. There are three expression types:

 - Enable a single layer in group: `group>layer`
 - Enable a layer: `group+layer`
 - Disable a layer: `group-layer`

For example, consider a "Miho" character, which has a "Body" group with three layers: "Uniform", "SportSuit" and "Pajama". To enable "Uniform" layer and disable all the others, use the following command:

```
@char Miho.Body>Uniform
```

To enable or disable a layer without affecting any other layers in the group, use "+" and "-" respectively instead of ">". You can also specify multiple composition expressions splitting them with commas:

```
; Enable glasses, disable hat, select "Cool" emotion.
@char CharId.Head/Accessories+BlackGlasses,Head-Hat,Head/Emotions>Cool
```

To select a layer outside of any groups (a child of the root prefab object), just skip the group part, eg:

```
; Given "Halo" layer object is placed under the prefab root, disable it
@char CharId.-Halo
```

It's also possible to affect all the layers inside a group (and additionally its neighbors when using select expression) by omitting layer name in composition expression:

```
; Disable all the layers in "Body/Decoration" group
@char CharId.Body/Decoration-

; Enable all the existing layers.
@char CharId.+

; Given `Poses/Light` and `Poses/Dark` groups (each containing multiple layers), 
; enable all the sprites inside `Light` group and disable layers inside `Dark` group
@char CharId.Poses/Light>
```

The above expressions will affect not only the direct descendants of the target groups, but all the layers contained in the underlaying groups, recursively.

When an appearance is not specified (eg, `@char CharId` without previously setting any appearance), a default appearance will be used; default appearance of the layered characters equals to how the layered prefab looks in the editor.

The video below demonstrates hot to setup a layered character and control it via naninovel commands.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/Bl3kXrg8tiI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

*Note: "@char Miho.Shoes>" command displayed in the video will actually select the "Shoes" group (disabling all the neighbor groups), not hide it. Correct command to hide a group is "@char Miho.Shoes-"*

It's possible to map composition expressions to keys via `Composition Map` property of `Layered Actor Behaviour` component:

![](https://i.gyazo.com/ede5cde3548a3187aa714d3e140750ba.png)

— the keys can then be used to specify layered actor appearance:

```
; Corresponds to `Body>Uniform,Hair/Back>Straight,Hair/Front>Straight,Shoes>Grey`.
@char Miho.Uniform
; Corresponds to `Hair/Back>Straight,Hair/Front>Straight`.
@char Miho.StraightHair
```

While editing layered character prefab, it's possible to preview mapped composition expressions by right-clicking a map record and selecting "Preview Composition".

![](https://i.gyazo.com/9fb0aeccf4f33245d9f975592ee86dbc.gif)

Be aware, that the layer objects are not directly rendered by Unity cameras at runtime; instead, they're rendered once upon each composition (appearance) change to a temporary render texture, which is then fed to a custom mesh visible to the Naninovel camera. This setup is required to prevent semi-transparency overdraw issues and to support transition animation effects.

## Generic Characters

Generic character is the most flexible character actor implementation. It's based on a prefab with a `CharacterActorBehaviour` component attached to the root object. Appearance changes and all the other character parameters are routed as [Unity events](https://docs.unity3d.com/Manual/UnityEvents.html) allowing to implement the behavior of the underlying object in any way you wish.

![](https://i.gyazo.com/9f799f4152782afb6ab86d3c494f4cc4.png)

To create generic character prefab from a template, use `Create -> Naninovel -> Character -> Generic` context asset menu.

To setup lip sync feature for generic characters, use `On Is Speaking Changed` boolean Unity event of the `CharacterActorBehaviour` component. When the character becomes or ceases to be the author of any printed message, this event will be invoked allowing you to trigger any custom logic, like starting or stopping mouth animation of the controlled character.

Check the following video tutorial for example on setting up a 3D rigged model as a generic character and routing appearance changes to the rig animations via [Animator](https://docs.unity3d.com/Manual/class-AnimatorController.html) component.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/HPxhR0I1u2Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Be aware, that Unity's `Animator` component could fail to register `SetTrigger` when the game object is enabled/disabled in the same frame; in case you use `GameObject.SetActive` to handle visibility changes (as it's shown in the above tutorial), consider enabling/disabling the child objects with renderers instead.

## Live2D Characters

Live2D character implementation uses assets created with [Live2D Cubism](https://www.live2d.com) 2D modeling and animation software. 

In order to be able to use this implementation you have to first install [Live2D Cubism SDK for Unity](https://live2d.github.io/#unity). Consult official Live2D docs for the installation and usage instructions.

Then download and import [Live2D extension package](https://github.com/Elringus/NaninovelLive2D/raw/master/NaninovelLive2D.unitypackage).

Live2D model prefab used as the resource for the implementation should have a `Live2DController` component attached to the root object. Appearance changes are routed to the animator component as [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) commands appearance being the trigger name. Eg, if you have a "Kaori" Live2D character prefab and want to invoke a trigger with name "Surprise", use the following command:

```
@char Kaori.Surprise
```

Note, that the above command will only attempt to invoke a [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) with "Surprise" argument on the animator controller attached to the prefab; you have to compose underlying [animator](https://docs.unity3d.com/Manual/Animator) state machine yourself.

When Live2D's `CubismLookController` and `CubismMouthController` components are present and setup on the Live2D model prefab, `Live2DController` can optionally use them to control look direction and mouth animation (aka lip sync feature) of the character.

![](https://i.gyazo.com/498fe948bc5cbdb4dfc5ebc5437ae6b4.png)

Consult Live2D documentation on [eye tracking](https://docs.live2d.com/cubism-sdk-tutorials/lookat) and [lip sync](https://docs.live2d.com/cubism-sdk-tutorials/lipsync) for the setup details.

Be aware, that `Live2DController` expects a "Drawables" gameobject inside the Live2D model prefab (created automatically when importing Live2D models to Unity); the controller will scale this gameobject at runtime in correspondence with "scale" parameter of the `@char` commands. Hence, any local scale values set in the editor will be ignored. To set an initial scale for the Live2D prefabs, please use scale of the parent gameobject as [shown in the video guide](https://youtu.be/rw_Z69z0pAg?t=353).

When Live2D extension is installed a "Live2D" item will appear in the Naninovel configuration menu providing following options:

![](https://i.gyazo.com/435a4824f0ce0dd8c9c3f29d457bab24.png)

Render layer specifies the layer to apply for the Live2D prefabs and culling mask to use for the cameras that will render the prefabs. Render camera field allows to use a custom setup for the render camera (the default render camera is stored inside the packages "Prefabs" folder). Camera offset allows to offset the render camera from the rendered prefab; you can use this parameters to uniformly position all the Live2D prefabs relative to the camera.

The following video guide covers exporting a Live2D character from Cubism Editor, configuring the prefab, creating a simple animator state machine and controlling the character from a naninovel script.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/rw_Z69z0pAg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Be aware, that the latest version of Cubism SDK for Unity is working directly with `Animator` component; expressions and poses (exported as expression.json and pose.json), that were previously used in Cubism 2.x are now [deprecated](https://docs.live2d.com/cubism-sdk-tutorials/blendexpression) and not supported by Naninovel's extension for Live2D.