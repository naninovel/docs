# Backgrounds 

Opposed to [characters](/guide/characters.md), backgrounds are novel actors used to represent a *back* layer of the scene: locations, sceneries, landscapes or anything that should always appear *behind* the characters. 

A background actor is defined with a name, appearance, visibility and transform (position, rotation, scale). It can change appearance, visibility and transform over time.

Backgrounds' behavior can be configured using `Naninovel -> Configuration -> Backgrounds` context menu; for available options see [configuration guide](/guide/configuration.md#backgrounds). The backgrounds' resources manager can be accessed using `Naninovel -> Resources -> Backgrounds` context menu.

![Add Background](/guide/add-background.png)

In novel scripts, backgrounds are mostly controlled with [`@back`](/api/#back) action:

```
; Set `River` as the appearance of the main background
@back River

; Same as above, but also use a `RadialBlur` transition effect
@back River.RadialBlur

; Given an `ExplosionSound` SFX and an `ExplosionSprite` background, the following
; script sequence will simulate two explosions appearing far and close to the camera.
@sfx ExplosionSound volume:0.1
@back name:ExplosionSprite scale:0.3 pos:0.55,0.6 time:0 isVisible:false
@back name:ExplosionSprite
@fx ShakeBackground params:,1
@hide ExplosionSprite
@sfx ExplosionSound volume:1.5
@back name:ExplosionSprite pos:0.65 scale:1
@fx ShakeBackground params:,3
@hide ExplosionSprite
```


## Sprite Backgrounds

Sprite implementation of the background actors is the most common and simple one; it uses a single [sprite](https://docs.unity3d.com/Manual/Sprites) asset to represent appearance of the background. The source of the sprite could be a `.jpg` or `.png` image file. 

Sprite backgrounds can be either managed by editor GUI or placed in a `Resources/Backgrounds` folder for an automatic exposure. 


## Video Backgrounds

Video backgrounds use [video clip]( https://docs.unity3d.com/Manual/class-VideoClip) assets to represent the appearance. 

Video backgrounds can only be managed by editor GUI.

## Animated Backgrounds

Animated background is the most flexible background actor implementation. It's based on a prefab with an [animator]( https://docs.unity3d.com/ScriptReference/Animator) component attached to the root object. Appearance changes are routed to the animator component as [SetTrigger]( https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) commands appearance being the trigger name. You're free to implement the behavior of the underlying object. 

Animated backgrounds can't be used as a main backgrounds, therefore you always have to specify actor name when using [`@back`](/api/#back) action.

Animated backgrounds can only be managed by editor GUI.


## Scene Backgrounds

You can use a full-fledged [Unity scene]( https://docs.unity3d.com/Manual/CreatingScenes) as a background with scene backgrounds implementation. 

Scene backgrounds can only be managed by editor GUI; scene assets should be stored under `./Assets/Scenes` project folder.

