# Special Effects

A number of built-in script commands are dedicated for various special effects. For example, [@shake] command shakes an actor:

```nani
; Shake 'Kohaku' actor
@shake Kohaku
```

Most effects can be parameterized:

```nani
; Shake 'Kohaku' once (instead of the default 3)
@shake Kohaku count:1
```

You can update effect parameters without restarting the effect:

```nani
; Start slowly shaking `Kohaku` actor in a loop
@shake Kohaku loop! power:0.1
Kohaku: It's rumbling!
; Shake 3 more times with an increased amplitude
@shake Kohaku count:3 power:0.8
```

Some effects are persistent by default and must be explicitly stopped:

```nani
; Start the rain
@rain
; Stop the rain
@rain power:0
```

Read on for descriptions of the built-in effects and the ways to [add custom effects](/guide/special-effects#adding-custom-effects).

## Spawned Effects

Spawned effects are based on the [@spawn] command or are derived from it. They can be one-off (like [@glitch]) or continuous (like [@show] or [@blur]). Read on for the list of the standard effects and the ways to add custom ones.

---
### ✨ Shake

Shakes the specified actor or the main camera. Dedicated command: [@shake]

![](https://i.gyazo.com/f9521fbcf959d0b72e449ae6e2191f9f.mp4)

**Start Parameters**
Name | Type | Default | Description
--- | --- | --- | ---
ID | String | null | ID of the actor to shake. Specify `Camera` to shake main camera.
Shake count | Integer | 3 | The number of shake iterations.
Loop | Boolean | false | When enabled, will loop the effect until stopped with [@despawn].
Shake duration | Decimal | 0.15 | The base duration of each shake iteration, in seconds.
Duration variation | Decimal | 0.25 | The randomized delta modifier applied to the base duration of the effect.
Shake amplitude | Decimal | 0.5 | The base displacement amplitude of each shake iteration, in units.
Amplitude variation | Decimal | 0.5 | The randomized delta modifier applied to the base displacement amplitude of the effect.
Shake horizontally | Boolean | false | Whether to displace the actor horizontally (by x-axis).
Shake vertically | Boolean | true | Whether to displace the actor vertically (by y-axis).

**Examples**

```nani
; Shake the current default text printer
@shake

; Shake "Kohaku" actor with default params
@shake Kohaku

; Shake the main camera horizontally 5 times
@shake Camera count:5 hor!
```

---
### ✨ Glitch

Applies a post-processing effect to the main camera simulating digital video distortion and artifacts. Dedicated command: [@glitch]

![](https://i.gyazo.com/94cb6db25c17956473db4de149281df5.mp4)

**Start Parameters**
Name | Type | Default | Description
--- | --- | --- | ---
Duration | Decimal | 1 | The duration of the effect, in seconds.
Intensity | Decimal | 1 | The intensity of the effect, in 0.0 to 10.0 range.

**Examples**

```nani
; Apply the glitch effect with default parameters
@glitch

; Apply the effect over 3.33 seconds with a low intensity
@glitch power:0.1 time:3.33
```

---
### ✨ Rain

Spawns a particle system simulating rain. Dedicated command: [@rain]

![](https://i.gyazo.com/74af9eec30f6517ea5b8453a9c86d33c.mp4)

**Start Parameters**
Name | Type | Default | Description
--- | --- | --- | ---
Intensity | Decimal | 0.5 | The intensity of the rain (particles spawn rate per second).
Fade-in time | Decimal | 5 | The particle system will gradually grow the spawn rate from 0 to the target level over the specified time, in seconds.
X velocity | Decimal | 1 | Multiplier to the horizontal speed of the particles. Use to change angle of the rain drops.
Y velocity | Decimal | 1 | Multiplier to the vertical speed of the particles.

**Stop Parameters**
Name | Type | Default | Description
--- | --- | --- | ---
Fade-out time | Decimal | 5 | The particle system will gradually lower the spawn rate from the target level to 0 over the specified time, in seconds.

**Examples**

```nani
; Start intensive rain over 10 seconds
@rain power:1 time:10

; Stop the rain over 30 seconds
@rain power:0 time:30
```

---
### ✨ Snow

Spawns a particle system simulating snow. Dedicated command: [@snow]

![](https://i.gyazo.com/25a052444c561e40c8318272f51edf47.mp4)

**Start Parameters**
Name | Type | Default | Description
--- | --- | --- | ---
Intensity | Decimal | 0.5 | The intensity of the snow (particles spawn rate per second).
Fade-in time | Decimal | 5 | The particle system will gradually grow the spawn rate from 0 to the target level over the specified time, in seconds.

**Stop Parameters**
Name | Type | Default | Description
--- | --- | --- | ---
Fade-out time | Decimal | 5 | The particle system will gradually lower the spawn rate from the target level to 0 over the specified time, in seconds.

**Examples**

```nani
; Start intensive snow over 10 seconds
@snow power:1 time:10

;Stop the snow over 30 seconds
@snow power:0 time:30
```

---
### ✨ Sun

Spawns a particle system simulating sun shafts (rays). Dedicated command: [@sun]

![](https://i.gyazo.com/7edc4777699229abc508f2bdb404522e.mp4)

**Start Parameters**
Name | Type | Default | Description
--- | --- | --- | ---
Intensity | Decimal | 0.85 | The intensity of the rays (opacity).
Fade-in time | Decimal | 3 | The particle system will gradually grow the intensity from 0 to the target level over the specified time, in seconds.

**Stop Parameters**
Name | Type | Default | Description
--- | --- | --- | ---
Fade-out time | Decimal | 3 | The particle system will gradually lower the opacity from the target level to 0 over the specified time, in seconds.

**Examples**

```nani
; Start intensive sunshine over 10 seconds
@sun power:1 time:10

; Stop the sunshine over 30 seconds
@sun power:0 time:30
```

---
### ✨ Bokeh

Simulates depth of field (aka DOF, bokeh) effect, where only the object in focus stays sharp while the rest of the image is blurred. Dedicated command: [@bokeh]

::: tip
In case you want to blur just one object (actor), consider using [Blur effect](/guide/special-effects#✨-blur) instead.
:::

![](https://i.gyazo.com/610d2cafe5fbe42aba7adb9ac71720d1.mp4)

**Start Parameters**
Name | Type | Default | Description
--- | --- | --- | ---
Focus Object Name | String | null | Name of the game object to set focus for (optional). When set, the focus will always stay on the game object and `Focus Distance` parameter will be ignored.
Focus Distance | Decimal | 10 | Distance from the Naninovel camera to the focus point. Ignored when `Focus Object Name` is specified.
Focal Length | Decimal | 3.75 | Amount of blur to apply for the de-focused areas; also determines focus sensitivity.
Duration | Decimal | 1 | Interpolation time (how fast the parameters will reach the target values).

**Stop Parameters**
Name | Type | Default | Description
--- | --- | --- | ---
Stop Duration | Decimal | 1 | Fade-off (disable) duration for the effect parameters to reach default values where the effect is not visible.

**Examples**

```nani
; Enable bokeh with default params and lock focus on "Kohaku" game object
@bokeh Kohaku

; Fade-off (disable) the effect over 10 seconds
@bokeh power:0

; Set focus point 10 units away from the camera,
; focal length to 0.95 and apply it over 3 seconds
@bokeh dist:10 power:0.95 time:3
```

---
### ✨ Blur

Applies a blur filter to a supported actor: backgrounds and characters of sprite, layered, diced, Live2D, Spine, video and scene implementations. By default (when the first parameter is not specified), the effect is applied to the `MainBackground` actor. Dedicated command: [@blur]

![](https://i.gyazo.com/067614d77783683e74ca79652099b58d.mp4)

**Start Parameters**
Name | Type | Default | Description
--- | --- | --- | ---
Actor ID | String | MainBackground | ID of the actor to apply the effect for. The actor should have `IBlurable` interface implemented in order to support the effect.
Intensity | Decimal | 0.5 | Intensity of the effect, in 0.0 to 1.0 range.
Duration | Decimal | 1 | Interpolation time, in seconds (how fast the intensity will reach the target value).

**Stop Parameters**
Name | Type | Default | Description
--- | --- | --- | ---
Stop Duration | Decimal | 1 | Fade-off (disable) duration for the effect, in seconds.

**Examples**

```nani
; Apply the blur to the current main background
@blur

; Apply the blur to "Sky" background with full intensity over 2.5 seconds
@blur Sky power:1 time:2.5

; Fade-off and disable the blur
@blur power:0
```

## Transition Effects

When changing background and character appearances with [@back] and [@char] or performing scene transition with [@trans] command, you can additionally specify which transition effect to use. For example, the following command will transition to the "River" background using the "DropFade" transition effect:

```nani
@back River.DropFade
```

When no transition effect is specified, a cross-fade is used by default.

You can also specify duration of the transition (in seconds) with the `time` parameter:

```nani
@back River.DropFade time:1.5
```

The above statement will transition to "River" background using "DropFade" transition over 1.5 seconds. Default `time` for all transitions is 0.35 seconds.

If you wish to wait for the transition to complete before playing the next command, add `wait!`:

```nani
@back River.Ripple time:1.5 wait!
@bgm PianoTheme
```

— "PianoTheme" background music will start playing only after the transition is complete.

Some of the transition effects also support additional parameters, which you can control with `params` parameter:

```nani
@back River.Ripple params:10,5,0.02
```

— will set the frequency of the ripple effect to 10, speed to 5 and amplitude to 0.02. When no `params` is specified, default parameters will be used.

If you wish to modify selected parameters, you can skip others and they'll have their default values:

```nani
@back River.Ripple params:,,0.02
```

All the transition parameters are of decimal type.

The above examples work for characters as well; just assign the transition with `via` parameter:

```nani
@char CharID.Appearance via:TransitionType params:...
```

You can find available transition effects with their parameters and default values in the docs below.


---
### 💫 BandedSwirl

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

; Apply the transition with default twist amount, but low frequency
@back Appearance.BandedSwirl params:,2.5
```


---
### 💫 Blinds

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

---
### 💫 CircleReveal

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


---
### 💫 CircleStretch

![](https://i.gyazo.com/f09bb69a3c045eeb1f6c8ec0b9dcd790.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.CircleStretch
```


---
### 💫 CloudReveal

![](https://i.gyazo.com/618ec451a9e10f70486db0bb4badbb71.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.CloudReveal
```


---
### 💫 Crossfade

![](https://i.gyazo.com/dc4781a577ec891065af1858f5fe2ed1.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Crossfade
```


---
### 💫 Crumble

![](https://i.gyazo.com/e27c8477842a2092728ea0cc1ae76bda.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Crumble
```


---
### 💫 Dissolve

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


---
### 💫 DropFade

![](https://i.gyazo.com/3c3840bb311ccb9fe223960f2e46f800.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.DropFade
```


---
### 💫 LineReveal

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


---
### 💫 Pixelate

![](https://i.gyazo.com/0ac9339b21303e20c524aaf6b6ca95f4.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Pixelate
```


---
### 💫 RadialBlur

![](https://i.gyazo.com/f8269fb68519c57c99643948a027a2a1.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.RadialBlur
```


---
### 💫 RadialWiggle

![](https://i.gyazo.com/a401b3b93a61276ed68ededa2e75e9ae.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.RadialWiggle
```


---
### 💫 RandomCircleReveal

![](https://i.gyazo.com/f6e685b13fe2d76733fd43878602eabc.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.RandomCircleReveal
```


---
### 💫 Ripple

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


---
### 💫 RotateCrumble

![](https://i.gyazo.com/8d476f466858e4788e5ad6014d6db314.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.RotateCrumble
```


---
### 💫 Saturate

![](https://i.gyazo.com/ad6eb77b7065387b9cb9afd77adbc784.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Saturate
```


---
### 💫 Shrink

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


---
### 💫 SlideIn

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


---
### 💫 SwirlGrid

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


---
### 💫 Swirl

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


---
### 💫 Water

![](https://i.gyazo.com/7c684f9a122006f38a0be2725895b76f.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Water
```


---
### 💫 Waterfall

![](https://i.gyazo.com/b6eebcb68002064ababe4d7476139a7c.mp4)

**Examples**

```nani
; Apply the transition with default parameters
@back Appearance.Waterfall
```


---
### 💫 Wave

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

## Adding Custom Effects

### Custom Spawned Effects

You can add a custom standalone effect (implemented via a prefab, like the "Rain" and "Snow" built-in effects) by adding the effect prefab via spawn resources manager (`Naninovel -> Resources -> Spawn`) and using [@spawn] and [@despawn] commands:

![](https://i.gyazo.com/45b9d8fb51ffb368ff9f792221f10ca6.png)

For example, given there is a `Explosion.prefab` prefab assigned via the spawn manager, following commands will spawn and de-spawn (destroy) the prefab on scene:

```nani
@spawn Explosion
@despawn Explosion
```

Additional effect parameters can be specified with `params`:

```nani
@spawn Explosion params:Kohaku,3,true
```

::: tip
When building custom effects with multiple parameters, consider creating a [custom command](/guide/custom-commands) and inheriting it from `SpawnEffect`. This way you won't have to remember parameter positions in the `params` array and get auto-completion and type-checking when using [IDE extension](/guide/ide-extension):

```nani
@explode Kohaku power:3 smoke!
```
:::

The [@spawn] command also has transform parameters, allowing to spawn the object at a specific scene or world positions and with a specific rotation or scale, eg:

```nani
; Spawn Explosion 15% from the left border of the screen
; with x10 scale and rotated by 15 degrees over z-axis.
@spawn Explosion pos:15 scale:10 rotation:,,15
```

In case you have a lot of prefabs to spawn and it's inconvenient to assign them via editor menu, it's possible to just drop them at `Resources/Naninovel/Spawn` folder and they'll automatically be available in the scripts. You can additionally organize them with sub-folders, if you wish; in this case use forward slashes (`/`) when referencing them in scenario scripts. Eg, prefab asset stored as `Resources/Naninovel/Spawn/Explosions/Boom01` can be referenced in scripts as `Explosions/Boom01`.

It's also possible to use [addressable asset system](/guide/resource-providers#addressable) to manually expose the resources. To expose an asset, assign address equal to the path you'd use to expose it via the method described above, except omit the "Resources/" part. Eg, to expose a "Boom01" prefab asset, assign the asset following address: `Naninovel/Spawn/Boom01`. Be aware, that addressable provider is not used in editor by default; you can allow it by enabling `Enable Addressable In Editor` property in resource provider configuration menu.

Check the built-in effect prefabs stored at `Naninovel/Prefabs/FX` for reference implementations.

### Custom Camera Effects

If you wish to apply a custom [post-processing effect](https://assetstore.unity.com/?q=post%20processing&orderBy=1) (aka image effect or camera filter, like the "Digital Glitch" built-in effect) to the Naninovel camera, [create a camera prefab](https://docs.unity3d.com/Manual/CreatingPrefabs.html), [add the required effect components](https://docs.unity3d.com/Manual/UsingComponents.html) to the camera's object and assign the prefab to `Custom Camera Prefab` field in the camera configuration menu (`Naninovel -> Configuration -> Camera`).

![](https://i.gyazo.com/6024aac1d2665dd96915758cd5c09fde.png)

You can toggle (enable if disabled and vice-versa) the added components via scenario scripts using `toggle` parameter and explicitly set the enabled state with `set` parameter of the [@camera] command. For example, let's assume you've added a "Bloom Image Effect" component to the camera object. First, find out what is the type name of the component; it's usually specified in the `Script` field of the component.

![](https://i.gyazo.com/73b7eabfe97ed84796cbe715b7dafc14.png)

In our case the component's type name is `BloomImageEffect`. Use the type name to toggle this component at runtime like follows:

```nani
@camera toggle:BloomImageEffect
```

You can toggle multiple components at once by delimiting the type names with commas:

```nani
@camera toggle:BloomImageEffect,Sepia,CameraNoise
```

And in case you want to explicitly enable or disable a component:

```nani
@camera set:BloomImageEffect.true,Sepia.false,CameraNoise.true
```

— will enable `BloomImageEffect` and `CameraNoise` components, while disabling `Sepia`.

To toggle, disable or enable all the components attached to the camera object, use `*` symbol.

```nani
; Toggle all components
@camera toggle:*

; Disable all components
@camera set:*.false

; Enable all components
@camera set:*.true
```

The state of the currently enabled (and disabled) camera components will be automatically saved and restored on game save-loading operations.

Check out the following video for example on adding a custom camera filter effect.

![](https://www.youtube.com/watch?v=IbT6MTecO-k)

### Custom Transition Effects

#### Dissolve Mask

You can make custom transitions based on a dissolve mask texture. Dissolve mask is a greyscale texture, where the color defines when the pixel will transition to the target texture. For example, consider the following spiral dissolve mask:

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

#### Custom Shader

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

    // When no transition keywords are enabled, default to crossfade.
    return lerp(mainColor, transColor, progress);
}
```

You'll then be able to invoke the added transitions in the same way as the built-in ones, eg:

```nani
@back Snow.Custom1
@back River.Custom2
```

For the complete shader example see [custom actor shader](/guide/custom-actor-shader) guide.
