# Transition Effects

When changing background and character appearances with [@back] and [@char] or performing scene transition with [@trans] command, you can additionally specify which transition effect to use. For example, following command will transition to "River" background using "DropFade" transition effect:

```nani
@back River.DropFade
```

When no transition effect is specified a cross-fade is used by default.

You can also specify duration of the transition (in seconds) with the `time` parameter:

```nani
@back River.DropFade time:1.5
```

The above statement will transition to "River" background using "DropFade" transition over 1.5 seconds. Default `time` for all transitions is 0.35 seconds.

In case you wish to wait for the transition to complete before playing next command, add `wait!`:

```nani
@back River.Ripple time:1.5 wait!
@bgm PianoTheme
```

— "PianoTheme" background music will start playing only after the transition is complete.

Some of the transition effects also support additional parameters, which you can control with `params` parameter:

```nani
@back River.Ripple params:10,5,0.02
```

— will set frequency of the ripple effect to 10, speed to 5 and amplitude to 0.02. When no `params` is specified, default parameters will be used.

If you wish to modify selected parameters, you can skip others and they'll have their default values:

```nani
@back River.Ripple params:,,0.02
```

All the transition parameters are of decimal type.

The above examples work for characters as well, just provide the transition via a standalone `transition` parameter:

```nani
@char CharID.Appearance transition:TransitionType params:...
```

You can find available transition effects with their parameters and default values in the docs below.

## BandedSwirl

![](https://i.gyazo.com/37432ac584ef04d94d3e4f9535fdffc4.mp4)

**Parameters**
Name | Default
--- | ---
Twist amount | 5
Frequency | 10

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.BandedSwirl

; Apply the transition with defeault twist amount, but low frequency
@back Appearance.BandedSwirl params:,2.5
```

## Blinds

![](https://i.gyazo.com/73a259f2a513a92ef893ebd6a25e9013.mp4)

**Parameters**
Name | Default
--- | ---
Count | 6

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Blinds

; Apply the transition using 30 blinds instead of default 6
@back Appearance.Blinds params:30
```

## CircleReveal

![](https://i.gyazo.com/4f914c6741a5e48a22cafe2ab242a426.mp4)

**Parameters**
Name | Default
--- | ---
Fuzzy amount | 0.25

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.CircleReveal

; Apply the transition with a high fuzzy amount
@back Appearance.CircleReveal params:3.33
```

## CircleStretch

![](https://i.gyazo.com/f09bb69a3c045eeb1f6c8ec0b9dcd790.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.CircleStretch
```

## CloudReveal

![](https://i.gyazo.com/618ec451a9e10f70486db0bb4badbb71.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.CloudReveal
```

## Crossfade

![](https://i.gyazo.com/dc4781a577ec891065af1858f5fe2ed1.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Crossfade
```

## Crumble

![](https://i.gyazo.com/e27c8477842a2092728ea0cc1ae76bda.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Crumble
```

## Dissolve

![](https://i.gyazo.com/b2993be8de032a65c7d813c6d749e758.mp4)

**Parameters**
Name | Default
--- | ---
Step | 99999

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Dissolve

; Apply the transition with a low step
@back Appearance.Dissolve params:100
```

## DropFade

![](https://i.gyazo.com/3c3840bb311ccb9fe223960f2e46f800.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.DropFade
```

## LineReveal

![](https://i.gyazo.com/c0e5259cd3d4ed2016ab74a65a7eec63.mp4)

**Parameters**
Name | Default
--- | ---
Fuzzy amount | 0.25
Line Normal X | 0.5
Line Normal Y | 0.5
Reverse | 0

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.LineReveal

; Apply the transition with a vertical line slide
@back Appearance.LineReveal params:,0,1

; Apply the transition in reverse (right to left)
@back Appearance.LineReveal params:,,,1
```

## Pixelate

![](https://i.gyazo.com/0ac9339b21303e20c524aaf6b6ca95f4.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Pixelate
```

## RadialBlur

![](https://i.gyazo.com/f8269fb68519c57c99643948a027a2a1.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.RadialBlur
```

## RadialWiggle

![](https://i.gyazo.com/a401b3b93a61276ed68ededa2e75e9ae.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.RadialWiggle
```

## RandomCircleReveal

![](https://i.gyazo.com/f6e685b13fe2d76733fd43878602eabc.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.RandomCircleReveal
```

## Ripple

![](https://i.gyazo.com/ff1bd285dc675ca5ac04f7ae4500f1c4.mp4)

**Parameters**
Name | Default
--- | ---
Frequency | 20
Speed | 10
Amplitude | 0.5

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Ripple

; Apply the transition with a high frequency and amplitude
@back Appearance.Ripple params:45,,1.1
```

## RotateCrumble

![](https://i.gyazo.com/8d476f466858e4788e5ad6014d6db314.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.RotateCrumble
```

## Saturate

![](https://i.gyazo.com/ad6eb77b7065387b9cb9afd77adbc784.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Saturate
```

## Shrink

![](https://i.gyazo.com/8c8bf00348df28ab89813c21f8655c07.mp4)

**Parameters**
Name | Default
--- | ---
Speed | 200

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Shrink

; Apply the transition with a low speed
@back Appearance.Shrink params:50
```

## SlideIn

![](https://i.gyazo.com/800ee6f5fba39ab8d46f5eb09f2126cf.mp4)

**Parameters**
Name | Default
--- | ---
Slide amount | 1

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.SlideIn
```

## SwirlGrid

![](https://i.gyazo.com/5a21293d979323a112ffd07f1fffd28d.mp4)

**Parameters**
Name | Default
--- | ---
Twist amount | 15
Cell count | 10

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.SwirlGrid

; Apply the transition with high twist and low cell count
@back Appearance.SwirlGrid params:30,4
```

## Swirl

![](https://i.gyazo.com/6ac9a2fe1bb9dfaf6a8292ae5d03960e.mp4)

**Parameters**
Name | Default
--- | ---
Twist amount | 15

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Swirl

; Apply the transition with high twist
@back Appearance.Swirl params:25
```

## Water

![](https://i.gyazo.com/7c684f9a122006f38a0be2725895b76f.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Water
```

## Waterfall

![](https://i.gyazo.com/b6eebcb68002064ababe4d7476139a7c.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Waterfall
```

## Wave

![](https://i.gyazo.com/e189ca12868d7ae4c9d8f0ca3d9dd298.mp4)

**Parameters**
Name | Default
--- | ---
Magnitude | 0.1
Phase | 14
Frequency | 20

**Examples**

```nani
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

::: tip
For optimal memory usage, set "Single Channel" and "Red" in the dissolve texture import settings. Also, make sure `Non-Power of 2` and `Generate Mip Maps` options are disabled to prevent visual artifacts.

![](https://i.gyazo.com/7c38c89948b6d040c0b21ca573cf2968.png)
:::

To make a custom transition, use `Custom` transition mode and specify path (relative to project "Resources" folder) to the dissolve mask texture via the `dissolve` parameter, eg:

```nani
@back Appearance.Custom dissolve:Textures/Spiral
```

To smooth (fuzz) borders of the transition, use first parameter in 0 (no smoothing) to 100 (max smoothing) range, eg:

```nani
@back Appearance.Custom dissolve:Textures/Spiral params:90
```

To invert the transition (brighter areas of the dissolve mask will be displayed first), set second parameter to 1, eg:

```nani
@back Appearance.Custom dissolve:Textures/Spiral params:,1
```

Check out the following video for the usage examples.

![](https://www.youtube.com/watch?v=HZjey6M2-PE)

### Custom Shader

It's possible to add a completely custom transition effect via a custom actor [shader](https://docs.unity3d.com/Manual/ShadersOverview.html).

::: warning
The topic requires graphic programming skills in Unity. We're not providing any support or tutorials on writing custom shaders; consult the [support page](/support/#unity-support) for more information.
:::

Create a new shader and assign it to `Custom Texture Shader` property of the actors, which are supposed to use the custom transition effects; see [custom actor shader](/guide/custom-actor-shader) guide for more information on how to create and assign custom actor shaders.

When a transition name is specified in a script command, [shader keyword](https://docs.unity3d.com/ScriptReference/Shader.EnableKeyword.html) with the same name (prefixed with `NANINOVEL_TRANSITION_`) is enabled in the material used by the actor.

To add your own transitions to a custom actor shader, use `multi_compile` directive, eg:

```c
#pragma multi_compile_local _ NANINOVEL_TRANSITION_CUSTOM1 NANINOVEL_TRANSITION_CUSTOM2
```

— will add `Custom1` and `Custom2` transitions.

You can then use conditional directives to select a specific render method based on the enabled transition keyword. When re-using built-in actor shader, it's possible to implement custom transitions via `ApplyTransitionEffect` method, which is used in the fragment handler:

```c
fixed4 ApplyTransitionEffect(sampler2D mainTex, float2 mainUV,
    sampler2D transitionTex, float2 transitionUV, float progress,
    float4 params, float2 randomSeed, sampler2D cloudsTex, sampler2D customTex)
{
    const fixed4 CLIP_COLOR = fixed4(0, 0, 0, 0);
    fixed4 mainColor = Tex2DClip01(mainTex, mainUV, CLIP_COLOR);
    fixed4 transColor = Tex2DClip01(transitionTex, transitionUV, CLIP_COLOR);

    #ifdef NANINOVEL_TRANSITION_CUSTOM1 // Custom1 transition.
    return transitionUV.x > progress ? mainColor
        : lerp(mainColor / progress * .1, transColor, progress);
    #endif

    #ifdef NANINOVEL_TRANSITION_CUSTOM2 // Custom2 transition.
    return lerp(mainColor * (1.0 - progress), transColor * progress, progress);
    #endif

    // When no transition keywords enabled default to crossfade.
    return lerp(mainColor, transColor, progress);
}
```

You'll then be able to invoke the added transitions in the same way as the built-in ones, eg:

```nani
@back Snow.Custom1
@back River.Custom2
```

For the complete shader example see [custom actor shader](/guide/custom-actor-shader) guide.

## Animation Easing

Many commands, that apply changes over time, have optional `easing` parameter which controls how modified parameter changes over time. Below is the list of supported options:

```
Linear
SmoothStep
Spring
EaseInQuad
EaseOutQuad
EaseInOutQuad
EaseInCubic
EaseOutCubic
EaseInOutCubic
EaseInQuart
EaseOutQuart
EaseInOutQuart
EaseInQuint
EaseOutQuint
EaseInOutQuint
EaseInSine
EaseOutSine
EaseInOutSine
EaseInExpo
EaseOutExpo
EaseInOutExpo
EaseInCirc
EaseOutCirc
EaseInOutCirc
EaseInBounce
EaseOutBounce
EaseInOutBounce
EaseInBack
EaseOutBack
EaseInOutBack
EaseInElastic
EaseOutElastic
EaseInOutElastic
```
