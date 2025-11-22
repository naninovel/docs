# Characters

Characters are actors used to represent scene entities that are placed on top of the [backgrounds](/guide/backgrounds).

A character actor is defined with a name, appearance, visibility, transform (position, rotation, scale) and look direction. It can change appearance, visibility, transform and look direction over time.

Characters' behavior can be configured using `Naninovel -> Configuration -> Characters` context menu; for available options see [configuration guide](/guide/configuration#characters). The characters' resources manager can be accessed using `Naninovel -> Resources -> Characters` context menu.

![Add Character](https://i.gyazo.com/c8a4f7f987621831b4a2ecb3145a4a07.png)

In naninovel scripts, characters are controlled with [@char] command:

```nani
; Shows character with name `Sora` with a default appearance.
@char Sora

; Same as above, but sets appearance to `Happy`.
@char Sora.Happy

; Same as above, but also positions the character 45% away from the left
; border of the scene and 10% away from the bottom border;
; also makes him look to the left.
@char Sora.Happy look:left pos:45,10
```

::: tip
Consider using [Scene Assistant](https://github.com/idaocracy/NaninovelSceneAssistant) extension to help with positioning the actors on scene.
:::

## Actor Records

If you have many characters and it's inconvenient to assign them all via the editor menu, use actor record assets (`Create -> Naninovel -> Actor Record -> Character`). They support multi-editing and allow you to organize records with folders. Check the video below for an example.

![](https://www.youtube.com/watch?v=2YP-36THHvk)

To associate appearance resources with actor records, you can use the [addressable asset system](/guide/resource-providers#addressable). For example, to associate a "Happy" appearance with the "Kohaku" character, assign the texture asset to the `Naninovel/Characters/Kohaku/Happy` address and add the `Naninovel` label. You can find more information on using the addressable provider in the [resource providers documentation](/guide/resource-providers#addressable).

## Poses

Each character has `Poses` property allowing to specify named states (poses).

![](https://i.gyazo.com/a049313d5c7cfa9897dd8c5f5ee00af3.png)

Pose name can be used as appearance in [@char] command to apply all the selected parameters specified in the pose at once, instead of specifying them individually via the command parameters.

```nani
; Given `SuperAngry` pose is defined for `Kohaku` character,
; applies all the selected parameters specified in the pose.
@char Kohaku.SuperAngry

; Same as above, but using `DropFade` transition over 3 seconds.
@char Kohaku.SuperAngry via:DropFade time:3
```

Notice, that when a pose is used as appearance, you can still override individual parameters, eg:

```nani
; Given `SuperAngry` pose is defined for `Kohaku` character,
; applies all the parameters specified in the pose state,
; except tint, which is overridden in the command.
@char Kohaku.SuperAngry tint:#ff45cb
```

In the character and background configurations you can also find `Shared Poses` — these poses are shared between all the respective actors. Example use cases for shared poses are re-using speaking/non-speaking template or creating pre-defined stages respective to camera.

![](https://i.gyazo.com/c4c6d850d2a6efae269164af58da1ed3.png)

Both per-actor and shared poses can also be applied via dedicated `pose` parameter:

```nani
@char Kohaku.Happy pose:DownLeft
@char Yuko.Surprise pose:UpCenter
@char Misaki pose:UpRight
```

![](https://i.gyazo.com/7bdbad68dd08c97032af174875ac4978.png)

Per-actor poses have priority over shared poses meaning if actor pose name is equal to a shared pose, actor's pose will be used. This allows overriding shared poses for specific actors when necessary.

## Display Names

In the character configuration, given `Has Name` is enabled, you can set a `Display Name` for specific characters. When set, display name will be shown in the printer name label UI, instead of the character's ID. This allows using compound character names, that contains spaces and special characters (which is not allowed for IDs).

Alternatively, the names can be specified with "CharacterNames" [managed text](/guide/managed-text) document, which is automatically created when running generate managed text resources task. Use this to localize display names and/or edit them outside of Unity editor. Records in the managed text document have priority over display names set in actor configuration and will override them.

It's possible to bind a display name to a custom variable to dynamically change it throughout the game via naninovel scripts. To bind a display name, specify name of the custom variable wrapped in curly braces in the character configuration menu.

![](https://i.gyazo.com/931d0f6b09c77e13e7800d102c089d44.png)

You can then change the variable value in the scripts and it will also change the display name:

```nani
@set PlayerName="Mistery Man"
Player: ...

@set PlayerName="Dr. Stein"
Player: You can call me Dr. Stein.
```

It's also possible to use the name binding feature to allow player pick their display name using [@input] command:

```nani
@input PlayerName summary:"Choose your name."
Player: You can call me {PlayerName}.
```

The content of the curly braces is actually treated as a full-fledged [script expression](/guide/script-expressions), allowing complex scenarios for evaluating the display name. For example, you may want to keep a pre-defined localizable display name for a character until some point and then let the player pick a custom name.

Let's say the character in questions has "Char1" ID, pre-defined name is stored as "T_PredefinedName" [managed text record](/guide/managed-text#script-text), the value entered by the player will be stored as "name" [custom variable](/guide/custom-variables) and "nameSet" variable will be set to "true" when player has set the name. Assign the following expression to the `Display Name` property: `{ nameSet ? name : T_PredefinedName }`.

![](https://i.gyazo.com/b4bed71310ae8d0f80aff11d910d6e5b.png)

Then use the following scenario script:

```nani
@char Char1

Char1: My name is now pre-defined by `T_PredefinedName` managed text record.
Char1: It's localizable; try changing the locale and it will update accordingly.
Char1: Now, we'll make the player input a custom name.

; Notice the default input value assigned via `value` parameter:
; it's retrieved from managed text and is localizable as well.
@input name summary:"Choose your name." value:{T_DefaultName}

; Here we set the variable, that is used in the expression
; for display name to decide where to get the value from.
@set nameSet=true

Char1: My display name is now bound to `name` custom variable.
```

When `Has Name` is disabled, neither display name, nor character ID will be displayed in the printer UI. This is useful for [narrator characters](/guide/characters#narrator-characters), which could have a [linked printer](/guide/characters#linked-printer), but their ID shouldn't be displayed.

## Name Labels

While display names discussed above are recommended in most cases, sometimes you may want to change name of the actor for a few lines or make multiple actors authors of the same line. Setting up a dedicated actor or variable display name for each such occurrence would be impractical. Instead, consider using `as` [generic parameter](/guide/naninovel-scripts#generic-parameters):

```nani
; Even though "Kohaku" character may have custom display name
; set in configuration, print this line with "Someone" as name.
Kohaku: Lorem ipsum.[< as:"Someone"]

; Print the line with "All Together" displayed as author name
; and make all visible characters author of the printed text.
*: Lorem ipsum![< as:"All Together"]

; Similar, but make only "Kohaku" and "Yuko" the authors.
Kohaku,Yuko: Lorem ipsum?[< as:"Kohaku and Yuko"]
```

— `as` parameters are localizable and will be exposed in the script localization documents for translation. Additionally, [speaker highlighting](/guide/characters.html#speaker-highlight) feature will recognize `*` and `,` specified in author ID and highlight all/selected characters as speakers.

## Message Colors

When `Use Character Color` is enabled in the character configuration, printer text messages and name labels will be tinted in the specified colors when the corresponding character ID is specified in a [@print] command or generic text line.

The following video demonstrates how to use display names and character colors.

![](https://www.youtube.com/watch?v=u5B5s-X2Bw0)

## Avatar Textures

You can assign avatar textures to characters using `avatar` parameter of [@char] command. Avatars will be shown by the compatible text printers when they print a text message that is associated with the character.

![](https://i.gyazo.com/83c091c08846fa1cab8764a8d4dddeda.png)

Currently, only `Wide` and `Chat` built-in printers (as well as their TMPro-counterparts) support the avatars feature. In order to support the feature in a custom printer, assign a game object with `Author Image` component to `Author Avatar Image` property of `Revealable Text Printer Panel` component.

To use any given avatar, you have to first add it to the avatar resources and give it a name. You can do this via `Avatar Resources` property in the characters configuration menu.

![](https://i.gyazo.com/5a0f10d174aa75ed87da1b472567e40b.png)

::: info NOTE
Avatar names can be arbitrary and don't have to contain an existing character ID or appearance. This is only required when you want to associate an avatar with a character so that it's shown automatically.
:::

You can then show a specific avatar texture like this:

```nani
@char CharacaterId avatar:AvatarName
```

To set a default avatar for a character, give the avatar texture resource name that equals to `CharacterID/Default`; eg, to set a default avatar for character with ID `Kohaku` name the avatar resource `Kohaku/Default`. Default avatars will be shown automatically, even when `avatar` parameter is not specified in the [@char] commands.

It's also possible to associate avatars with specific character appearances, so that when character changes appearance, the avatar will also change automatically. For this, name the avatar resources using the following format: `CharacterID/CharacterAppearance`, where `CharacterAppearance` is the name of the appearance for which to map the avatar resource.

To show only the avatar of a character inside a text printer, but hide the character itself, set `visible` parameter of the [@char] command to `false`, eg:

```nani
@char CharacaterId !visible
```

In case you're constantly changing avatars while the character itself should remain hidden, consider disabling `Auto Show On Modify` in the characters configuration menu; when disabled, you won't have to specify `!visible` to change any parameters of the character while it's hidden.

::: info NOTE
The **avatars are not directly connected with character appearances** and shouldn't be considered as a way to represent a character on scene. Avatars is a standalone feature, that "injects" an arbitrary image to a compatible text printer. In case you want an actual character appear inside a text printer (or a custom UI), check [render actor to texture](/guide/characters.html#render-to-texture) feature.
:::

## Speaker Highlight

When enabled in the character configuration, will set specified [poses](/guide/characters#poses) to the character based on whether the last printed message is associated with it. This allows automatically highlighting the "speaking" characters, usually by tinting or scaling.

![](https://i.gyazo.com/3817adb43d6e14f9854e5d558792c2f6.png)

When applying the same highlight poses for multiple characters, it's recommended to use Shared Poses found in the root of the character's configuration.

## Lip Sync

### Event Driven

Animatable character implementations (generic, layered, Live2D, etc) provide `On Started Speaking` and `On Finished Speaking` Unity events. When such character becomes or ceases to be the author of a printed message (or rather when the message is fully revealed), the events will be invoked allowing you to trigger any custom logic, like starting or stopping mouth animation of the controlled character.

![](https://www.youtube.com/watch?v=fx_YS2ZQGHI)

When [auto voicing](/guide/voicing#auto-voicing) feature is enabled, the events will be driven by the voice-over; otherwise, printed text messages will activate the events. In the latter case, you'll probably want to manually mute the events (eg, to prevent mouth animation when punctuation marks are printed); for such cases, use [@lipSync] command.

### Audio Driven

In case you'd like to drive character mouth animation by the actual waves of the voice audio clips, use `Voice Source` option in the character configuration. When a prefab with Unity's `Audio Source` component is assigned, Naninovel will instantiate the prefab under the character object and play the voice of the character via the audio source component.

By having access to a dedicated audio source component used for character voice, you can hook a custom solution to analyze the waves of the played audio and drive mouth animation accordingly. There are multiple third-party solutions that can help achieve that. For example, Live2D's `Cubism Audio Mouth Input` component or [SALSA](https://assetstore.unity.com/packages/tools/animation/salsa-lipsync-suite-148442).

## Linked Printer

It's possible to associate a [text printer](/guide/text-printers) with a character using `Linked Printer` property.

![](https://i.gyazo.com/50ca6b39cd7f708158678339244b1dc4.png)

When linked, the printer will automatically be used to handle messages authored by the character.

Be aware, that [@print] commands (that are also used under the hood when printing generic text lines) make associated printers default and hide other visible printers by default. When printers are linked to characters, print commands will automatically change the currently visible and default text printer, while printing text associated with the corresponding characters. It's possible to prevent this behavior by disabling `Auto Default` property in printer actor configuration menu; when disabled you'll have to manually show/hide and switch default printers with [@printer] commands.

::: tip
Link a printer with [narrator character](/guide/characters#narrator-characters) and disable `Has Name` to make narrated text linked with a printer, so that you won't have to use [@printer] to switch back to non-character (default) printer all the time.
:::

## Default Author

You may have noticed the `DefaultAuthor` record in characters configuration created by default in a new project — it's a [narrator character](/guide/characters#narrator-characters), whose metadata is used when you don't explicitly specify the author in [@print] commands and [generic text](/guide/naninovel-scripts#generic-text-lines).

This is useful when you have [linked printers](/guide/characters#linked-printer) assigned to the "actual" characters and want to fall back to a default printer for un-authored text lines without having to specify an explicit "Narrator" ID for all such lines or switch the default printer with the [@printer] command.

If you don't need this feature, the default author record can be safely removed.

## Placeholder Characters

The placeholder implementation is the default one and is intended for scenario drafting when you do not yet have any visual assets to represent a character. It uses actor metadata such as the identifier, display name and colors to procedurally generate the character placeholder.

![](https://i.gyazo.com/a94fdcc2cd645738d71baa42c424ed65.png)

Below is an example of a [placeholder background](/guide/backgrounds#placeholder-backgrounds) with a couple of placeholder characters on top. Notice the currently speaking character is highlighted by an increased scale and opacity.

![](https://i.gyazo.com/cebb0506d3743e2e1b20b1d3c214239a.png)

## Sprite Characters

Sprite implementation of the character actors is the most common and simple one; it uses a set of [texture](https://docs.unity3d.com/Manual/Textures.html) assets wrapped over a quad mesh (sprite) to represent appearances of the character. The textures can be based on `.jpg`, `.png`, `.tiff`, `.psd` or any other image file format [supported by Unity](https://docs.unity3d.com/Manual/ImportingTextures).

::: tip
Choose file formats that are most comfortable for your development workflow. When building the project, Unity will automatically convert all the source resources (textures, audio, video, etc) to the formats most suitable for the target platform, so it won't make difference in which format you originally store the resources in the project. Find more information on how Unity manage project assets in the [official documentation](https://docs.unity3d.com/Manual/AssetWorkflow).
:::

Initial (unscaled) size of the sprite character mesh on scene depends on the reference resolution (camera configuration), character's `Pixel Per Unit` property (set for each character actor in the configuration menu) and source texture resolution.

To achieve best render quality and optimal performance, it's generally advised to keep the default `Pixel Per Unit` value (100) for all the characters and control the desired initial character size via texture resolution. For example, given reference resolution in your game is the default `1920x1080` pixels, to make a character occupy the whole screen height, set height of the character's texture (eg, by resizing it via Photoshop or other image editor) to `1080` pixels; to make another character occupy 2/3 of the screen height, set the height to `1080 * 2/3` and so on.

## Diced Sprite Characters

Built with an open source [SpriteDicing](https://github.com/elringus/sprite-dicing) package, `DicedSpriteCharacter` implementation allows to significantly reduce build size and texture memory by reusing texture areas of the character sprites.

![Sprite Dicing](https://i.gyazo.com/af08d141e7a08b6a8e2ef60c07332bbf.png)

Install the package via [Unity package manager](https://docs.unity3d.com/Manual/upm-ui.html): open package manager window (Window -> Package Manager), click "+" button, choose "Add package from git URL", enter following URL:

```
https://github.com/elringus/sprite-dicing.git?path=/plugins/unity/Assets/SpriteDicing
```

— to the input field and click "Add".

![](/assets/img/docs/upm.mp4)

::: info NOTE
Before installing a package from a Git repository, make sure a [Git client](https://git-scm.com/downloads) is installed on your machine and Git executable path is set to the [PATH system environment variable](https://en.wikipedia.org/wiki/PATH_(variable)) (usually performed automatically during the installation).
:::

When "SpriteDicing" extension is installed via UPM, a `Naninovel.DicedSpriteCharacter` option will appear in the character implementations list.

![](https://i.gyazo.com/25360c9287a7b5a6a7feaba987a2bbb4.png)

`DicedSpriteAtlas` assets containing character appearances are used as the resources for the diced sprite characters. Each appearance is mapped by name to the diced sprites contained in the atlas.

::: tip
Character metadata properties (eg, pixels per unit, pivot) are applied to render texture used to represent the character on scene, while similar diced atlas properties are applied to the generated diced sprites. When changing atlas properties, don't forget to rebuild it for changes to take effect.
:::

Following video guide covers creating and configuring diced sprite atlas, adding new diced character based on the created atlas and controlling the character from a naninovel script.

![](https://www.youtube.com/watch?v=6PdOAOsnhio)

For more information on available dicing options and usage examples, refer to the extension docs: https://dicing.elringus.com/guide/unity.

::: tip EXAMPLE
Find example on setting up diced actors in the [diced actor sample](/guide/samples#diced-actor).
:::

## Layered Characters

The layered implementation allows composing characters from multiple layers and then toggle them individually or in groups via naninovel scripts at runtime.

::: tip
Layered actor implementation has been evolving and is currently the most flexible with support for all the rendering features (in contrast to generic). Even if you don't want to use layer expressions, but instead control the appearance with Unity's Animator or other custom systems; or need to render non-trivial objects such as particle systems and/or utilize third-party renderers, check [render only](/guide/characters#outsourcing-appearance-management) and [camera rendering](/guide/characters#camera-rendering) options available for layered actors before reserving to generic or custom implementation.
:::

To create a layered character prefab, use `Create -> Naninovel -> Character -> Layered` asset context menu. Enter [prefab editing mode](https://docs.unity3d.com/Manual/EditingInPrefabMode.html) to compose the layers. Several layers and groups will be created by default. You can use them or delete and add your own.

Each child game object of the root prefab object with a [renderer](https://docs.unity3d.com/ScriptReference/Renderer.html)-derived component (eg, `SpriteRenderer`, `MeshRenderer`, eg) is considered a *layer*; other objects considered *groups*. Aside from organization and transformation purposes, placing layers inside groups will allow you to select a single layer or disable/enable all the layers inside a group with a single expression in naninovel script (more on that later).

::: info NOTE
Only "simple" draw mode for `Sprite Renderer` is supported in default (non-camera) render mode; when choosing other modes they'll be rendered as it was set to simple.
:::

To hide specific layers from being visible by default, disable renderer components (not the game objects).

The white frame drawn over the prefab is used to describe the actor canvas, which will be rendered to a render texture at runtime. Make sure to minimize the empty areas inside the frame by moving the layers and groups to prevent wasting texture memory and for anchoring to work correctly. To set a custom canvas size (eg, in case some layers are animated and can stretch out of the default canvas), add `Render Canvas` component to the root object and set `Size` property.

![](https://i.gyazo.com/4ff103c27858ac9671ba3b94ab1ade20.png)

You can scale the root game object to fine-tune the default size of the actor.

When authoring layered character art in Photoshop, consider using Unity's [PSD Importer package](https://docs.unity3d.com/Packages/com.unity.2d.psdimporter@3.0/manual/index.html) to automatically generate character prefab preserving all the layers and their positions. To preserve the layers hierarchy, make sure to enable `Use Layer Grouping` option in the import settings.

::: tip
When using sprites, set `Mesh Type` to `Full Rect` in the texture import settings to prevent rendering issues.

![](https://i.gyazo.com/16ebf843081c826e0add1a6304c2608f.png)
:::

Don't forget to add the created layered prefab to the character resources (`Naninovel -> Resources -> Characters`). Choose "Naninovel.LayeredCharacter" implementation and drop prefab to the "Resource" field when configuring the resource record.

To control the layered characters in naninovel scripts, use [@char] command in the same way as with the other character implementations. The only difference is how you set the appearance: instead of a single ID, use the *layer composition expression*. There are three expression types:

- Enable a single layer in group: `group>layer`
- Enable a layer: `group+layer`
- Disable a layer: `group-layer`

For example, consider a "Miho" character, which has a "Body" group with three layers: "Uniform", "SportSuit" and "Pajama". To enable "Uniform" layer and disable all the others, use the following command:

```nani
@char Miho.Body>Uniform
```

To enable or disable a layer without affecting any other layers in the group, use "+" and "-" respectively instead of ">". You can also specify multiple composition expressions splitting them with commas:

```nani
; Enable glasses, disable hat, select "Cool" emotion.
@char CharId.Head/Accessories+BlackGlasses,Head-Hat,Head/Emotions>Cool
```

To select a layer outside of any groups (a child of the root prefab object), just skip the group part, eg:

```nani
; Given "Halo" layer object is placed under the prefab root, disable it.
@char CharId.-Halo
```

It's also possible to affect all the layers inside a group (and additionally its neighbors when using select expression) by omitting layer name in composition expression:

```nani
; Disable all the layers in "Body/Decoration" group.
@char CharId.Body/Decoration-

; Enable all the existing layers.
@char CharId.+

; Given `Poses/Light` and `Poses/Dark` groups, enable all the layers
; inside `Light` group and disable layers inside `Dark` group.
@char CharId.Poses/Light>
```

The above expressions will affect not only the direct descendants of the target groups, but all the layers contained in the underlying groups, recursively.

When an appearance is not specified (eg, `@char CharId` without previously setting any appearance), a default appearance will be used; default appearance of the layered characters equals to how the layered prefab looks in the editor.

The video below demonstrates how to set up a layered character and control it via naninovel commands.

![](https://www.youtube.com/watch?v=Bl3kXrg8tiI)

::: info NOTE
`@char Miho.Shoes>` command displayed in the video will actually select the "Shoes" group (disabling all the neighbor groups), not hide it. Correct command to hide a group is `@char Miho.Shoes-`.
:::

It's possible to map composition expressions to keys via `Composition Map` property of `Layered Character Behaviour` component:

![](https://i.gyazo.com/ede5cde3548a3187aa714d3e140750ba.png)

— the keys can then be used to specify layered actor appearance:

```nani
; Equal to `Body>Uniform,Hair/Back>Straight,Hair/Front>Straight,Shoes>Grey`.
@char Miho.Uniform
; Equal to `Hair/Back>Straight,Hair/Front>Straight`.
@char Miho.StraightHair
; It's also possible to combine keys and expressions.
@char Miho.Uniform,Hair/Front>Short
```

While editing layered character prefab, it's possible to preview mapped composition expressions by right-clicking a map record and selecting "Preview Composition". Another menu item — "Paste Current Composition" — will generate current composition expression string of the character (based on enabled/disabled sprite renderers in the hierarchy) and paste it to the inspected record; use it to quickly map current prefab state to a composition item.

![](https://i.gyazo.com/84a2f8e51997cdccbfb8321d58586d2a.mp4)

Be aware, that the layer objects are not directly rendered by Unity cameras at runtime; instead, they're rendered once upon each composition (appearance) change to a temporary render texture, which is then fed to a custom mesh visible to the Naninovel camera. This setup is required to prevent semi-transparency overdraw issues and to support transition animation effects.

In case you wish to apply an animation or other dynamic behaviour to the layered character, enable `Animated` property found on `Layered Character Behaviour` component. When the property is enabled, the layers will be rendered each frame (instead once per appearance change).

### Outsourcing Appearance Management

You may find layered implementation useful for supporting various built-in render features (semi-transparency overdraw handling, transition effects, blur and depth-of-field support, etc), but would like to use external tools for managing appearance of the actor, such as Unity's [Animator](https://docs.unity3d.com/Manual/class-Animator.html). By default, layered behaviour will use layered expressions when notifying about appearance changes via `On Appearance Changed` event, which may not be desired in such case.

Enabling `Render Only` option will disable layer-related behaviour and make the event report the appearance as it's specified in script commands. You will also have to specify `Default Appearance` on the behaviour component to prevent it from evaluating default appearance based on the initial prefab layer composition.

### Camera Rendering

In case your character prefab contains non-trivial renderers like particle systems, trails, sprite masks or custom/third-party renderers, you can still use them with layered implementation by assigning a camera to `Render Camera` field of `Layered Behaviour` component (the camera has to be inside character's prefab).

When assigned, instead of custom render procedure, the actor will use the camera to render contents, which lifts all the inherent limitations, such as lacking stencil support. The drawback is, in order to ensure the content is only rendered to the actor texture (and doesn't "leak" to the main camera), you'll have to reserve camera [layers](https://docs.unity3d.com/Manual/Layers.html) specifically for rendering this kind of actor.

There a total of 32 layers available in Unity, while 8 of them are reserved for engine internals. You can use remaining layers as you wish (they're unused by default). To allow Naninovel use a layer for rendering layered actors in camera mode, give the layer name starting with `Naninovel`; eg: `Naninovel 1`, `Naninovel 2` and so on.

![](https://i.gyazo.com/dfbb4306553c85a4683fffb0fef03de3.png)

Total number of layers to add depends on the max amount of unique camera-rendered layered actors spawned at any given time, no matter visible or not. When layered actor is rendered, it holds a layer from the pool. When the actor is hidden, it releases the layer, allowing it to be re-used by other actors. However, the actors are also rendered on appearance change, which happen when they're initially added to scene (even if they're hidden) or when game is loaded or rolled-back, so **layer pool size has to accommodate total number of camera-rendered actors spawned at a time**, and not just amount of such actors visible at a time. To destroy (de-spawn) an actor after hiding it, use [@remove] command.

After adding the layers, assign `Custom Camera Prebab` in Naninovel's camera configuration with a camera prefab, which has culling mask with the `Naninovel ...` layers disabled. This is required to prevent the "raw" layered actors from leaking into the main Naninovel camera. Note that the assigned camera should be a dedicated camera prefab, not the camera you've used inside layered actor prefabs.

![](https://i.gyazo.com/e2f713e4e212718f50e028cdf546aaba.png)

While in camera rendering mode, game objects of the layered actor prefab are considered layers when they have `Layered Actor Layer` component attached, other objects are considered groups. After attaching the component, configure what should happen when camera layer is held and released with `On Layer Held` and `On Layer Released` Unity events. Typically, you'd assign the held layer to the host game object and enable associated renderer and disable the renderer when released (to make sure the object is not picked by other cameras).

![](https://i.gyazo.com/4dbfe57dbf6b7365e1e7db78f707f412.png)

Layer active state is also reflected differently in camera mode: instead of renderer component enabled state, game object's active state is used. To set up default appearance of the actor, enable/disable game objects.

::: tip
When layer contains lots of children, it would be tedious to set the layer held/release events for each of them individually. In this case use custom event handler to apply the changes in batch. Check [the example](https://discord.com/channels/545676116871086080/1369982706393284700) on applying the changes to all the children renderers of a layer.
:::

Make sure `Render Canvas` component is attached to the layer actor prefab root, as it's required for the camera mode. It works similar to normal render mode, restricting render texture size, so keep it compact.

In case extra layers are required for rendering the actor (for example, a layer dedicated for Unity's Lights 2D), add them via `Camera Mask` property found on the layered behaviour component. Naninovel will preserve specified layers in the camera culling mask when rendering the actor.

::: tip EXAMPLE
Find example on setting up layered actors in the [layered actor sample](/guide/samples#layered-actor).
:::

## Generic Characters

Generic character is the most flexible character actor implementation. It's based on a prefab with a `Generic Character Behaviour` component attached to the root object. Appearance changes and all the other character parameters are routed as [Unity events](https://docs.unity3d.com/Manual/UnityEvents.html) allowing to implement the behavior of the underlying object in any way you wish.

![](https://i.gyazo.com/d0ea1bf7a5ed3b4bb7eb70c4ddbfeba2.png)

::: info NOTE
Generic actor implementations just route events from the scenario scripts and it's up to user to implement the underlying behaviour, eg how the actor should react to the appearance or visibility change commands, whether and how it will support speaker highlight feature, etc. Don't expect most of the actor-related features to work automatically with the generic implementations.
:::

To create generic character prefab from a template, use `Create -> Naninovel -> Character -> Generic` context asset menu.

Check the following video tutorial for example on setting up a 3D rigged model as a generic character and routing appearance changes to the rig animations via [Animator](https://docs.unity3d.com/Manual/class-AnimatorController.html) component. Be aware, that the video is captured with an old Naninovel version and some properties and component names are different now; see the above docs for the up-to-date information.

![](https://www.youtube.com/watch?v=HPxhR0I1u2Q)

::: tip
Unity's `Animator` component could fail to register `SetTrigger` when the game object is enabled/disabled in the same frame; in case you use `GameObject.SetActive` to handle visibility changes (as it's shown in the above tutorial), consider enabling/disabling the child objects with renderers instead.
:::

::: tip EXAMPLE
Check [generic actor sample](/guide/samples#generic-actor), where generic character implementation is used to host a 3D animated model.
:::

## Video Characters

Video characters use looped [video clip](https://docs.unity3d.com/Manual/class-VideoClip) assets to represent the appearance.

For the supported video formats for each platform see [Unity docs for video sources](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility.html).

When using video with an alpha channel (transparency), see the [guide on the supported formats](https://docs.unity3d.com/Manual/VideoTransparency.html).

To prevent specific appearance from looping, append `NoLoop` (case-insensitive) to the appearance name.

## Live2D Characters

Live2D character implementation uses assets created with [Live2D Cubism](https://www.live2d.com) 2D modeling and animation software.

![](https://i.gyazo.com/b81df72fc7afaed569520496cbee09f0.mp4)

In order to be able to use this implementation you have to first install [Live2D Cubism SDK for Unity](https://live2d.github.io/#unity). Consult official Live2D docs for the installation and usage instructions.

After Live2D SDK for Unity is installed, click `Naninovel/Extensions/Enable Live2D` editor menu item to activate Naninovel module which provides integration between Live2D and the engine.

![](https://i.gyazo.com/e27ee50e8107147e20503a955ddcc548.png)

::: info NOTE
This integration with third-party commercial product serve mostly as an example on how you can make Naninovel work with another tool. While we're committed to keep the sample integration compatible with Live2D updates and changes, please be aware that the functionality will remain bare minimum and we won't be able to provide any support or help on using another product with Naninovel beyond the scope of the sample.
:::

Live2D model prefab used as the resource for the implementation should have a `Live2DController` component attached to the root object. Appearance changes are routed to the animator component as [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) commands appearance being the trigger name. Eg, if you have a "Kaori" Live2D character prefab and want to invoke a trigger with name "Surprise", use the following command:

```nani
@char Kaori.Surprise
```

Note, that the above command will only attempt to invoke a [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) with "Surprise" argument on the animator controller attached to the prefab; you have to compose underlying [animator](https://docs.unity3d.com/Manual/Animator) state machine yourself.

::: info NOTE
Current actual version of Cubism SDK for Unity is working directly with `Animator` component; expressions and poses (exported as expression.json and pose.json), that were previously used in Cubism 2.x are now [deprecated](https://docs.live2d.com/cubism-sdk-tutorials/blendexpression) and not supported by Naninovel's extension for Live2D.
:::

When Live2D's `CubismLookController` and `CubismMouthController` components are present and setup on the Live2D model prefab, `Live2DController` can optionally use them to control look direction and mouth animation (aka lip sync feature) of the character.

![](https://i.gyazo.com/498fe948bc5cbdb4dfc5ebc5437ae6b4.png)

Consult Live2D documentation on [eye tracking](https://docs.live2d.com/cubism-sdk-tutorials/lookat) and [lip sync](https://docs.live2d.com/cubism-sdk-tutorials/lipsync) for the setup details.

In case the model appears too small or large, set an initial scale for the root Live2D prefab game object as [shown in the video guide](https://youtu.be/rw_Z69z0pAg?t=353).

Internally, Live2D model is rendered to a texture, which is then projected to the screen. This is required to prevent semi-transparency overdraw artifacts when fading the character. Naninovel will attempt to evaluate size of the render canvas automatically, but in case the model contains animated parts that are moved outside of the initial bounds, the parts will be clipped. To prevent that, add `Render Canvas` component to the root game object of the Live2D prefab and set the desired size of the canvas manually. Enable [gizmos](https://docs.unity3d.com/Manual/GizmosMenu.html) to preview current render canvas size while in prefab mode.

![](https://i.gyazo.com/23f916ae104f57828914221333e42dbf.mp4)

Be aware, that larger the size, the more memory will the texture consume, so keep it as small, as possible.

Following video guide covers exporting a Live2D character from Cubism Editor, configuring the prefab, creating a simple animator state machine and controlling the character from a naninovel script.

![](https://www.youtube.com/watch?v=rw_Z69z0pAg)

::: tip EXAMPLE
Check the [Live2D sample](/guide/samples#live2d), where a Live2D character is used with Naninovel.
:::

## Spine Characters

Spine character implementation uses assets created with [Spine](http://esotericsoftware.com) 2D modeling and animation software.

![](https://i.gyazo.com/08b04de115d97427d152cb5f37065d2d.mp4)

In order to be able to use this implementation you have to first install [Spine runtime for Unity](http://esotericsoftware.com/spine-unity-download). Consult [the official docs](http://esotericsoftware.com/spine-unity) for the installation and usage instructions.

After Spine runtime for Unity is installed, click `Naninovel/Extensions/Enable Spine` editor menu item to activate Naninovel module which provides integration between Spine and the engine.

![](https://i.gyazo.com/2fb6c27f6e2149b501c0025dd6bd67f0.png)

::: info NOTE
This integration with third-party commercial product serve mostly as an example on how you can make Naninovel work with another tool. While we're committed to keep the sample integration compatible with Spine updates and changes, please be aware that the functionality will remain bare minimum and we won't be able to provide any support or help on using another product with Naninovel beyond the scope of the sample.
:::

Spine character prefab used as the resource for the implementation should have a `Spine Controller` component attached to the root object. Appearance changes from naninovel scripts commands (such as `@char`) are routed to the controller's `On Appearance Changed` events similar to [generic implementation](/guide/characters#generic-characters). You can handle the events as you wish; for example, use Spine's `SetAnimation` method or invoke a trigger in Unity's animator controller.

![](https://i.gyazo.com/6a2772a3e4137413a7c1587788c54c41.png)

::: tip
It's possible to use a custom component inherited from `Spine Controller`. This way you'll be able to override the virtual methods and associated behaviour (eg, handle appearance change with a specific duration or transition parameters).
:::

Internally, Spine model is rendered to a texture, which is then projected to the screen. This is required to prevent semi-transparency overdraw artifacts when fading the character. To specify the texture size, use `Render Canvas` component (attached automatically when adding `Spine Controller`). Enable [gizmos](https://docs.unity3d.com/Manual/GizmosMenu.html) to preview current the size while in prefab mode. Be aware, that larger the size, the more memory will the texture consume, so keep it as small, as possible.

::: info NOTE
Spine's [Skeleton Render Separator](https://github.com/pharan/spine-unity-docs/blob/master/spine-unity-skeletonrenderseparator) (multi-render) workflow is not supported; to integrate that workflow with Naninovel, create a custom character implementation.
:::

::: tip EXAMPLE
Check the [spine sample](/guide/samples#spine), where a Spine character is used with Naninovel.
:::

## Narrator Characters

Narrator characters don't have any presence on scene (appearances, position, look direction, tint, etc), but are still able to author printed messages and have the related configuration options (display name, message color, linked printer, etc).

![](https://i.gyazo.com/f1ee43da312b29f3236cf772d9ea9fa7.png)

## Render to Texture

It's possible to render character and background actors of all the implementations (except generic) to a texture asset, which can then can be assigned to a custom UI, printer, material or any other compatible source.

Assign the render texture asset via actor configuration with `Render Texture` property. When a texture is assigned, the actor won't appear as a game object on scene, but will rather be rendered to the texture. `Render Rectangle` property allows specifying a region of the actor to render into texture.

![](https://i.gyazo.com/7224fa44695507b0ce0274940d630299.png)

::: info NOTE
When using [addressables package](https://docs.unity3d.com/Manual/com.unity.addressables.html), Unity [can't properly track asset references](https://issuetracker.unity3d.com/product/unity/issues/guid/1277169), which may cause render texture duplication in build preventing the feature from working correctly. Either manually handle the references (via `AssetReference` API) or use `Get Actor Render Texture` component as illustrated below.

![](https://i.gyazo.com/92772b1fa51e6042efcd3de67d05fd79.png)
:::

When an actor is rendered to a texture, transformations (position, rotation, scale) and some other modifications won't have any effect. Instead, transform the host object of the render texture (eg, image in case the texture is assigned to UI raw image component).

The video below demonstrates how to render a Live2D character to a texture, which is assigned to custom text printer. The printer is linked to the character, so the character will automatically show and hide with the printer when the associated text messages are processed.

![](https://www.youtube.com/watch?v=81OTbSAnWbw)

All the other character and background implementation types (except generic) can be set up to render to texture similar to Live2D example.

## Multiple Appearances

Generic, Live2D and Spine actors support multiple appearances applied at once, eg:

```nani
@char Kohaku.Body/Pose1,Face/Smile
```

— will invoke `Body/Pose1` and `Face/Smile` appearance change events. Use this to trigger multiple animator triggers simultaneously to set up complex animation states. All the appearances will as well serialize with the actor state and restore on game load or rollback.

![](https://i.gyazo.com/f438703100ca8c695de814fe08ff2427.mp4)
