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

## Display Names

In the character configuration you can set a `Display Name` for specific characters. When set, display name will be shown in the printer name label UI, instead of the character's ID. This allows using compound character names, that contains spaces and special characters (which is not allowed for IDs).

For localization, use "CharacterNames" [managed text](/guide/managed-text) document, which is automatically created when running generate managed text resources task. Values from the "CharacterNames" document won't override values set in the character metadata when under the default locale.

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

## Speaker Highlight

When enabled in the character configuration, will tint the character based on whether the last printed message is associated with it.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/gobowgagdyE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Sprite Characters 

Sprite implementation of the character actors is the most common and simple one; it uses a set of [sprite](https://docs.unity3d.com/Manual/Sprites) assets to represent appearances of the character. The source of the sprites could be `.png` or `.jpg` image files. 

Sprite character appearance assets can be either managed by editor GUI or placed in a `Resources/Characters/CharacterName` folder, `CharacterName` being the name of the character, for an automatic exposure.

## Diced Sprite Characters

Implemented via an open source (MIT license) third-party package [SpriteDicing](https://github.com/Elringus/SpriteDicing) used to optimize build size and texture memory by reusing source sprite textures of the characters. 

![Sprite Dicing](https://i.gyazo.com/af08d141e7a08b6a8e2ef60c07332bbf.png)

In order to be able to choose this implementation you have to install [NaninovelSpriteDicing extension package](https://github.com/Elringus/NaninovelSpriteDicing/raw/master/NaninovelSpriteDicing.unitypackage). The extension package contains character implementation scripts and has [SpriteDicing](https://github.com/Elringus/SpriteDicing) bundled inside "ThirdParty" folder.

`DicedSpriteAtlas` assets containing character appearances are used as the resources for the diced sprite characters. Each appearance is mapped by name to the diced sprites contained in the atlas.

Note, that diced characters implementation currently doesn't support animated appearance changes (they're changed instantly).

The following video guide covers creating and configuring diced sprite atlas, adding new diced character based on the created atlas and controlling the character from a naninovel script.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/6PdOAOsnhio" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Generic Characters
	
Generic character is the most flexible character actor implementation. It's based on a prefab with a `CharacterActorBehaviour` component attached to the root object. Appearance changes and all the other character parameters are routed as [Unity events](https://docs.unity3d.com/Manual/UnityEvents.html) allowing to implement the behavior of the underlying object in any way you wish.

![](https://i.gyazo.com/68377eacdeb5347582dc57a5f453c67a.png)

Check the following video tutorial for example on setting up a 3D rigged model as a generic character and routing appearance changes to the rig animations via [Animator](https://docs.unity3d.com/Manual/class-AnimatorController.html) component.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/HPxhR0I1u2Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Live2D Characters

Live2D character implementation uses assets created with [Live2D Cubism](https://www.live2d.com) 2D modeling and animation software. 

In order to be able to use this implementation you have to first install [Live2D Cubism SDK for Unity](https://live2d.github.io/#unity). Consult official Live2D docs for the installation and usage instructions.

Then install [NaninovelLive2D extension package](https://github.com/Elringus/NaninovelLive2D/raw/master/NaninovelLive2D.unitypackage).

Live2D model prefab used as the resource for the implementation should have a `Naninovel.Live2DController` component attached to the root object. Appearance changes are routed to the animator component as [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) commands appearance being the trigger name. Eg, if you have a "Kaori" Live2D character prefab and want to invoke a trigger with name "Surprise", use the following command:

```
@char Kaori.Surprise
```

Note, that the above command will only attempt to invoke a [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) with "Surprise" argument on the animator controller attached to the prefab; you have to compose underlying animator state machine yourself.

Look direction can optionally be controlled via Live2D's `CubismLookController` (can be disabled via `Control Look` field of the `Naninovel.Live2DController` component).

Be aware, that `Naninovel.Live2DController` expects a "Drawables" gameobject inside the Live2D model prefab (created automatically when importing Live2D models to Unity); the controller will scale this gameobject at runtime in correspondence with "scale" parameter of the `@char` commands. Hence, any local scale values set in the editor will be ignored. To set an initial scale for the Live2D prefabs, please use scale of the parent gameobject as [shown in the video guide](https://youtu.be/rw_Z69z0pAg?t=353).

When Live2D extension is installed a "Live2D" item will appear in the Naninovel configuration menu providing following options:

![](https://i.gyazo.com/435a4824f0ce0dd8c9c3f29d457bab24.png)

Render layer specifies the layer to apply for the Live2D prefabs and culling mask to use for the cameras that will render the prefabs. Render camera field allows to use a custom setup for the render camera (the default render camera is stored inside the packages "Prefabs" folder). Camera offset allows to offset the render camera from the rendered prefab; you can use this parameters to uniformly position all the Live2D prefabs relative to the camera.

The following video guide covers exporting a Live2D character from Cubism Editor, configuring the prefab, creating a simple animator state machine and controlling the character from a naninovel script.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/rw_Z69z0pAg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

