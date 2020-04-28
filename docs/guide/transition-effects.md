# Transition Effects

When changing background and character appearances with [@back] and [@char] or performing scene transition with [@startTrans] and [@finishTrans] commands, you can additionally specify which transition effect to use. For example, following command will transition to "River" background using "DropFade" transition effect:

```
@back River.DropFade
```

When no transition effect is specified a cross-fade is used by default. 

You can also specify duration of the transition (in seconds) with the `time` parameter:

```
@back River.DropFade time:1.5
```

The above statement will transition to "River" background using "DropFade" transition over 1.5 seconds. Default `time` for all transitions is 0.35 seconds.

In case you wish to skip to the next command immediately after executing the transition (and not wait for the duration of the effect), you can set `wait` parameter to `false`. E.g.:

```
@back River.Ripple time:1.5 wait:false
@bgm PianoTheme
```
— "PianoTheme" background music will start playing right away and won't be delayed for 1.5 seconds, while the transition is in progress.

Some of the transition effects also support additional parameters, which you can control with `params` parameter:

```
@back River.Ripple params:10,5,0.02
``` 
— will set frequency of the ripple effect to 10, speed to 5 and amplitude to 0.02. When no `params` is specified, default parameters will be used.

If you wish to modify selected parameters, you can skip others and they'll have their default values:

```
@back River.Ripple params:,,0.02
``` 

All the transition parameters are of decimal type.

The above examples work for characters as well, just provide the transition via a standalone `transition` parameter:

```
@char CharID.Appearance transition:TransitionType params:...
```

You can find available transition effects with their parameters and default values in the docs below.

## BandedSwirl

<video class="video" loop autoplay><source src=" https://i.gyazo.com/37432ac584ef04d94d3e4f9535fdffc4.mp4" type="video/mp4"></video>

**Parameters**
Name |  Default 
--- | --- 
Twist amount | 5
Frequency | 10

**Examples**
```
; Apply the transition with default parameters
@back Appearance.BandedSwirl

; Apply the transition with defeault twist amount, but low frequency 
@back Appearance.BandedSwirl params:,2.5
```

## Blinds

[!73a259f2a513a92ef893ebd6a25e9013]

**Parameters**
Name |  Default 
--- | --- 
Count | 6

**Examples**
```
; Apply the transition with default parameters
@back Appearance.Blinds

; Apply the transition using 30 blinds instead of default 6
@back Appearance.Blinds params:30
```

## CircleReveal

[!4f914c6741a5e48a22cafe2ab242a426]

**Parameters**
Name |  Default 
--- | --- 
Fuzzy amount | 0.25

**Examples**
```
; Apply the transition with default parameters
@back Appearance.CircleReveal

; Apply the transition with a high fuzzy amount
@back Appearance.CircleReveal params:3.33
```

## CircleStretch

[!f09bb69a3c045eeb1f6c8ec0b9dcd790]

**Examples**
```
; Apply the transition with default parameters
@back Appearance.CircleStretch
```

## CloudReveal

[!618ec451a9e10f70486db0bb4badbb71]

**Examples**
```
; Apply the transition with default parameters
@back Appearance.CloudReveal
```

## Crossfade

[!dc4781a577ec891065af1858f5fe2ed1]

**Examples**
```
; Apply the transition with default parameters
@back Appearance.Crossfade
```

## Crumble

[!e27c8477842a2092728ea0cc1ae76bda]

**Examples**
```
; Apply the transition with default parameters
@back Appearance.Crumble
```

## Dissolve

[!b2993be8de032a65c7d813c6d749e758]

**Parameters**
Name |  Default 
--- | --- 
Step | 99999

**Examples**
```
; Apply the transition with default parameters
@back Appearance.Dissolve

; Apply the transition with a low step
@back Appearance.Dissolve params:100
```

## DropFade

[!3c3840bb311ccb9fe223960f2e46f800]

**Examples**
```
; Apply the transition with default parameters
@back Appearance.DropFade
```

## LineReveal

[!c0e5259cd3d4ed2016ab74a65a7eec63]

**Parameters**
Name |  Default 
--- | --- 
Fuzzy amount | 0.25
Line Normal X | 0.5
Line Normal Y | 0.5

**Examples**
```
; Apply the transition with default parameters
@back Appearance.LineReveal

; Apply the transition with a vertical line slide
@back Appearance.LineReveal params:,0,1
```

## Pixelate

[!0ac9339b21303e20c524aaf6b6ca95f4]

**Examples**
```
; Apply the transition with default parameters
@back Appearance.Pixelate
```

## RadialBlur

[!f8269fb68519c57c99643948a027a2a1]

**Examples**
```
; Apply the transition with default parameters
@back Appearance.RadialBlur
```

## RadialWiggle

[!a401b3b93a61276ed68ededa2e75e9ae]

**Examples**
```
; Apply the transition with default parameters
@back Appearance.RadialWiggle
```

## RandomCircleReveal

[!f6e685b13fe2d76733fd43878602eabc]

**Examples**
```
; Apply the transition with default parameters
@back Appearance.RandomCircleReveal
```

## Ripple

[!ff1bd285dc675ca5ac04f7ae4500f1c4]

**Parameters**
Name |  Default 
--- | --- 
Frequency | 20
Speed | 10
Amplitude | 0.5

**Examples**
```
; Apply the transition with default parameters
@back Appearance.Ripple

; Apply the transition with a high frequency and amplitude
@back Appearance.Ripple params:45,,1.1
```

## RotateCrumble

[!8d476f466858e4788e5ad6014d6db314]

**Examples**
```
; Apply the transition with default parameters
@back Appearance.RotateCrumble
```

## Saturate

[!ad6eb77b7065387b9cb9afd77adbc784]

**Examples**
```
; Apply the transition with default parameters
@back Appearance.Saturate
```

## Shrink

[!8c8bf00348df28ab89813c21f8655c07]

**Parameters**
Name |  Default 
--- | --- 
Speed | 200

**Examples**
```
; Apply the transition with default parameters
@back Appearance.Shrink

; Apply the transition with a low speed
@back Appearance.Shrink params:50
```

## SlideIn

[!800ee6f5fba39ab8d46f5eb09f2126cf]

**Parameters**
Name |  Default 
--- | --- 
Slide amount | 1

**Examples**
```
; Apply the transition with default parameters
@back Appearance.SlideIn
```

## SwirlGrid

[!5a21293d979323a112ffd07f1fffd28d]

**Parameters**
Name |  Default 
--- | --- 
Twist amount | 15
Cell count | 10

**Examples**
```
; Apply the transition with default parameters
@back Appearance.SwirlGrid

; Apply the transition with high twist and low cell count
@back Appearance.SwirlGrid params:30,4
```

## Swirl

[!6ac9a2fe1bb9dfaf6a8292ae5d03960e]

**Parameters**
Name |  Default 
--- | --- 
Twist amount | 15

**Examples**
```
; Apply the transition with default parameters
@back Appearance.Swirl

; Apply the transition with high twist
@back Appearance.Swirl params:25
```

## Water

[!7c684f9a122006f38a0be2725895b76f]

**Examples**
```
; Apply the transition with default parameters
@back Appearance.Water
```

## Waterfall

[!b6eebcb68002064ababe4d7476139a7c]

**Examples**
```
; Apply the transition with default parameters
@back Appearance.Waterfall
```

## Wave

[!e189ca12868d7ae4c9d8f0ca3d9dd298]

**Parameters**
Name |  Default 
--- | --- 
Magnitude | 0.1
Phase | 14
Frequency | 20

**Examples**
```
; Apply the transition with default parameters
@back Appearance.Wave

; Apply the transition with a high magnitude and low frequency
@back Appearance.Wave params:0.75,,5
```

## Custom Transition Effects

### Dissolve Mask

You can make custom transitions based on a dissolve mask texture. Dissolve mask is a greyscale texture, where the color defines when the pixel will transition to the target texture. For example, consider following spiral dissolve mask:

![](https://i.gyazo.com/3c32e920efdf6cfb35214b6c9b617a6a.png)

— the black square in the top-right corner indicates that the transition target should be displayed there at the start of the transition and the pure-white square in the center will transition in the very end.

To make a custom transition, use `Custom` transition mode and specify path (relative to project "Resources" folder) to the dissolve mask texture via the `dissolve` parameter, eg:

```
@back Appearance.Custom dissolve:Textures/Spiral
```

Check out the following video for the usage examples:

[!!HZjey6M2]

### Custom Shader

It's possible to add a completely custom transition effect via a custom actor [shader](https://docs.unity3d.com/Manual/ShadersOverview.html).

::: warn
The topic requires graphic programming skills in Unity. We're not providing any support or tutorials on writing custom shaders.
:::

Create a new shader and assign it to the actors, which are supposed to use your new custom transition effect; see [custom actor shader](/guide/custom-actor-shader.md) guide for more information on how to create and assign custom actor shaders.

When a transition name is specified in a script command, [shader keyword](https://docs.unity3d.com/ScriptReference/Shader.EnableKeyword.html) with the same name (prefixed with `NANINOVEL_TRANSITION_`) is enabled in the material used by the actor.

To add your own transitions to a custom actor shader, use `multi_compile` directive, eg:

```c
#pragma multi_compile _ NANINOVEL_TRANSITION_MYCUSTOM1 NANINOVEL_TRANSITION_MYCUSTOM2
```

— will add `MyCustom1` and `MyCustom2` transitions.

You can then use conditional directives to select a specific render method based on the enabled transition keyword. When re-using built-in actor shader, it's possible to implement custom transitions via `ApplyTransitionEffect` method, which is used in the fragment handler:

```c
fixed4 ApplyTransitionEffect(in sampler2D mainTex, in float2 mainUV, in sampler2D transitionTex, in float2 transitionUV, in float progress, in float4 params, in float2 randomSeed, in sampler2D cloudsTex, in sampler2D customTex)
{
    const fixed4 CLIP_COLOR = fixed4(0, 0, 0, 0);
    fixed4 mainColor = Tex2DClip01(mainTex, mainUV, CLIP_COLOR);
    fixed4 transitionColor = Tex2DClip01(transitionTex, transitionUV, CLIP_COLOR);

    #ifdef NANINOVEL_TRANSITION_MYCUSTOM1 // MyCustom1 transition.
    return transitionUV.x > progress ? mainColor : lerp(mainColor / progress * .1, transitionColor, progress);
    #endif

    #ifdef NANINOVEL_TRANSITION_MYCUSTOM2 // MyCustom2 transition.
    return lerp(mainColor * (1.0 - progress), transitionColor * progress, progress);
    #endif

    // When no transition keywords enabled default to crossfade.
    return lerp(mainColor, transitionColor, progress);
}
```

You'll then be able to invoke the added transitions in the same way as the built-in ones, eg:

```
@back Snow.MyCustom1
@back River.MyCustom2
```