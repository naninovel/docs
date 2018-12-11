# Characters 

Characters are novel actors used to represent scene entities that are placed on top of the [backgrounds](/guide/backgrounds.md). 

A character actor is defined with a name, appearance, visibility, transform (position, rotation, scale) and look direction. It can change appearance, visibility, transform and look direction over time.

Characters' behavior can be configured using `Naninovel -> Configuration -> Characters` context menu; for available options see [configuration guide](/guide/configuration.md#characters). The characters' resources manager can be accessed using `Naninovel -> Resources -> Characters` context menu.

In novel scripts, characters are mostly controlled with [`@char`](/api/#char) action.


## Sprite Characters 

Sprite implementation of the character actors is the most common and simple one; it uses a set of [sprite](https://docs.unity3d.com/Manual/Sprites) assets to represent appearances of the character. The source of the sprites could be `.png` or `.jpg` image files. 

Sprite character appearance assets can be either managed by editor GUI or placed in a `Resources/Characters/CharacterName` folder, `CharacterName` being the name of the character, for an automatic exposure. 

## Diced Sprite Characters

Implemented via an open source (MIT license) third-party package [SpriteDicing](https://github.com/Elringus/SpriteDicing) used to optimize build size and texture memory by reusing source sprite textures of the characters. 

In order to be able to choose this implementation you have to first install [SpriteDicing](https://github.com/Elringus/SpriteDicing) and Unity's [Conditional Compilation Utility](https://github.com/Unity-Technologies/ConditionalCompilationUtility). Consult projects' readme for installation and usage instructions.

Diced sprite characters can only be managed by editor GUI.

## Animated Characters
	
Animated characters is the most flexible characters actor implementation. It's based on a prefab with an [animator](https://docs.unity3d.com/ScriptReference/Animator) component attached to the root object. Appearance changes are routed to the animator component as [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) commands appearance being the trigger name. You're free to implement the behavior of the underlying object. For example, you can use a 3D rigged character model and route the appearance changes to the corresponding rig animations. 


Animated characters can only be managed by editor GUI.
## Live2D Characters

This character implementation uses assets created with a popular [Live2D Cubism]( https://www.live2d.com) software. 

In order to be able to choose this implementation you have to first install [Live2D Cubism SDK for Unity](https://www.live2d.com/en/news/unity_full_release) and Unity's [Conditional Compilation Utility](https://github.com/Unity-Technologies/ConditionalCompilationUtility). Consult projects' readme for installation and usage instructions.

Live2D model prefab used as the resource for this implementation should have a `Naninovel.Live2DAppearanceController` component attached to the root object. Appearance changes are handled by routing appearance name to the set of `Live2D.Cubism.Core.CubismParameter` as specified in the `Live2DAppearanceController` component.

Live2D characters can only be managed by editor GUI.

