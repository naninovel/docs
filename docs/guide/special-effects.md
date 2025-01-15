# Special Effects

A number of built-in script commands are dedicated for various special effects. For example, [@shake] command shakes an actor:

```nani
; Shake 'Kohaku' actor
@shake Kohaku
```

Most effects can be parametrized:

```nani
; Shake 'Kohaku' once (instead of the default 3)
@shake Kohaku count:1
```

You can update the effect parameters without re-starting them:

```nani
; Start slowly shaking `Kohaku` actor in a loop
@shake Kohaku loop! power:0.1
Kohaku: It's rumbling!
; Shake 3 more times with an increased amplitude
@shake Kohaku count:3 power:0.8
```

Some effects are persistent by default and have to be explicitly stopped:

```nani
; Start the rain
@rain
; Stop the rain
@rain power:0
```

Read on for descriptions of the built-in effects and the ways to [add custom effects](/guide/special-effects#adding-custom-effects).

## Shake

Shakes specified actor or main camera. Dedicated command: [@shake]

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
; Shake 'Kohaku' actor with default params
@spawn ShakeCharacter params:Kohaku
; Same with the dedicated command
@shake Kohaku

; Shake the main Naninovel camera horizontally 5 times
@spawn ShakeCamera params:,5,,,,,true,false
; Same with the dedicated command
@shake Camera count:5 hor! !ver
```

## Animate Actor

To animate (interpolate) specific actor parameters over a range of key frames, consider using [@animate] command as a "quick and dirty" solution.

![](https://i.gyazo.com/a0494329c713c4309a52d57d0b297bee.mp4)

::: info NOTE
Scenario scripts are not designed for any kind of animation specifications. Whenever possible, use dedicated solutions instead, like Unity's [Animator](https://docs.unity3d.com/Manual/class-Animator.html) or third-party animation tools. You can incorporate any kind of animation solution with [layered](https://naninovel.com/guide/characters#layered-characters) and [generic](https://naninovel.com/guide/characters#generic-characters) actors; we also have built-in support for [Live2D](https://naninovel.com/guide/characters#live2d-characters) and [Spine](https://naninovel.com/guide/characters#spine-characters) actors.
:::

## Digital Glitch

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
@spawn DigitalGlitch
; Same with the dedicated command
@glitch

; Apply the effect over 3.33 seconds with a low intensity
@spawn DigitalGlitch params:3.33,0.1
; Same with the dedicated command
@glitch power:0.1 time:3.33
```

## Rain

Spawns a particle system simulating a rain. Dedicated command: [@rain]

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
@spawn Rain params:1,10
; Same with the dedicated command
@rain power:1 time:10

; Stop the rain over 30 seconds
@despawn Rain params:30
; Same with the dedicated command
@rain power:0 time:30
```

## Snow

Spawns a particle system simulating a snow. Dedicated command: [@snow]

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
@spawn Snow params:1,10
; Same with the dedicated command
@snow power:1 time:10

; Stop the snow over 30 seconds
@despawn Snow params:30
; Same with the dedicated command
@snow power:0 time:30
```

## Sun Shafts

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
@spawn SunShafts params:1,10
; Same with the dedicated command
@sun power:1 time:10

; Stop the sunshine over 30 seconds
@despawn SunShafts params:30
@sun power:0 time30
```

## Depth of Field (Bokeh)

Simulates depth of field (aka DOF, bokeh) effect, when only the object in focus stays sharp, while the other image is blurred. Dedicated command: [@bokeh]

::: tip
In case you want to blur just one object (actor), consider using [Blur effect](/guide/special-effects#blur) instead.
:::

![](https://i.gyazo.com/616a023c46f207b4a3a33d3d3fd9fbc9.mp4)

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
; Enable the effect with default params and lock focus to `Kohaku` game object
@spawn DepthOfField params:Kohaku
; Same with the dedicated command
@bokeh Kohaku

; Fade-off (disable) the effect over 10 seconds
@despawn DepthOfField params:10
; Same with the dedicated command
@boken power:0

; Set focus point 10 units away from the camera,
; focal length to 0.95 and apply it over 3 seconds
@spawn DepthOfField params:,10,0.95,3
; Same with the dedicated command
@boken dist:10 power:0.95 time:3
```

## Blur

Applies a blur filter to a supported actor: backgrounds and characters of sprite, layered, diced, Live2D, Spine, video and scene implementations. By default (when first parameter is not specified), the effect is applied to `MainBackground` actor. Dedicated command: [@blur]

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
@spawn Blur
; Same with the dedicated command
@blur

; Apply the blur to `Sky` background with full intensity over 2.5 seconds
@spawn Blur params:Sky,1,2.5
; Same with the dedicated command
@blur Sky power:1 time:2.5

; Fade-off and disable the blur
@despawn Blur
; Same with the dedicated command
@blur power:0
```

## Adding Custom Effects

### Standalone Effects

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

In case you have a lot of prefabs to spawn and it's inconvenient to assign them via editor menu, it's possible to just drop them at `Resources/Naninovel/Spawn` folder and they'll automatically be available in the scripts. You can additionally organize them with sub-folders, if you wish; in this case use forward slashes (`/`) when referencing them in naninovel scripts. Eg, prefab asset stored as `Resources/Naninovel/Spawn/Explosions/Boom01` can be referenced in scripts as `Explosions/Boom01`.

It's also possible to use [addressable asset system](/guide/resource-providers#addressable) to manually expose the resources. To expose an asset, assign address equal to the path you'd use to expose it via the method described above, except omit the "Resources/" part. Eg, to expose a "Boom01" prefab asset, assign the asset following address: `Naninovel/Spawn/Boom01`. Be aware, that addressable provider is not used in editor by default; you can allow it by enabling `Enable Addressable In Editor` property in resource provider configuration menu.

Check the built-in effect prefabs stored at `Naninovel/Prefabs/FX` for reference implementations.

### Camera Effects

If you wish to apply a custom [post-processing effect](https://assetstore.unity.com/?q=post%20processing&orderBy=1) (aka image effect or camera filter, like the "Digital Glitch" built-in effect) to the Naninovel camera, [create a camera prefab](https://docs.unity3d.com/Manual/CreatingPrefabs.html), [add the required effect components](https://docs.unity3d.com/Manual/UsingComponents.html) to the camera's object and assign the prefab to `Custom Camera Prefab` field in the camera configuration menu (`Naninovel -> Configuration -> Camera`).

![](https://i.gyazo.com/6024aac1d2665dd96915758cd5c09fde.png)

You can toggle (enable if disabled and vice-versa) the added components via naninovel scripts using `toggle` parameter and explicitly set the enabled state with `set` parameter of the [@camera] command. For example, let's assume you've added a "Bloom Image Effect" component to the camera object. First, find out what is the type name of the component; it's usually specified in the `Script` field of the component.

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

— will enabled `BloomImageEffect` and `CameraNoise` components, while disabling `Sepia`.

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
