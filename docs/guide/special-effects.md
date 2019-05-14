# Special Effects

Special effects are activated via [`@fx`](/api/#fx) novel action followed by the effect name. E.g.:

```
@fx ShakeBackground
```
— will shake the main background.

You can control parameters of the effect with `params` parameter. E.g.:

```
@fx ShakeCharacter params:Kohaku,1
```
— will shake character with ID "Kohaku" once, instead of the default 3.

It's possible to selectively specify a subset of the parameters, leaving the rest at the default values:

```
@fx ShakePrinter params:,,0.5
```
— notice the first two parameters (printer ID and shake count) are skipped and will have their default values, but the third parameter (shake duration) is set to 0.5 seconds.

Some effects are persistent and should be manually stopped with [`@stopfx`](/api/#stopfx) action. E.g.:

```
; Start the rain
@fx Rain
; Stop the rain
@stopfx Rain
```

The [`@stopfx`](/api/#stopfx) actions of some effects can also receive parameters (eg, to control the fade-out duration), eg:

```
; Stops the rain gradually over 10 seconds
@stopfx Rain params:10
```
When no `params` is specified, default parameters will be used. You can find both "start" (accepted by the [`@fx`](/api/#fx) action) and "stop" (accepted by the [`@stopfx`](/api/#stopfx) action) parameters available for each effect and their default values in the docs below.

## ShakePrinter
Shakes printer with the specified ID or the currently active one.

### Demo

<video class="video" loop autoplay><source src="https://i.gyazo.com/f61fc35e318cce1949b00e5fe2448a80.mp4" type="video/mp4"></video>

### Start Parameters
Name | Type | Default | Description
--- | --- | --- | ---
Printer ID | String | null | ID of the printer to shake. Will shake currently active printer when not specified.
Shake count | Integer | 3 | The number of shake iterations. When set to 0 or less, will loop the effect until stopped with [`@stopfx`](/api/#stopfx).
Shake duration | Decimal | 0.15 | The base duration of each shake iteration, in seconds.
Duration variation | Decimal | 0.25 | The randomized delta modifier applied to the base duration of the effect.
Shake amplitude | Decimal | 0.5 | The base displacement amplitude of each shake iteration, in units.
Amplitude variation | Decimal | 0.5 | The randomized delta modifier applied to the base displacement amplitude of the effect.
Shake horizontally | Boolean | false | Whether to displace the actor horizontally (by x-axis).
Shake vertically | Boolean | true | Whether to displace the actor vertically (by y-axis).

### Examples
```
; Shake currently active printer with default params
@fx ShakePrinter

; Shake currently active printer horizontally 10 times 
@fx ShakePrinter params:,10,,,,,true,false

; Start shaking currently active printer in loop, print some text, stop the shaking
@fx ShakePrinter params:,0 wait:false
What a shaky situation!
@stopfx ShakePrinter
```

## ShakeBackground
Shakes background with the specified ID or the main one.

### Demo

<video class="video" loop autoplay><source src="https://i.gyazo.com/fcf1153a0ad3d9a153908206211f5f5f.mp4" type="video/mp4"></video>

### Start Parameters
Name | Type | Default | Description
--- | --- | --- | ---
Background ID | String | null | ID of the background to shake. Will shake main background when not specified.
Shake count | Integer | 3 | The number of shake iterations. When set to 0 or less, will loop the effect until stopped with [`@stopfx`](/api/#stopfx).
Shake duration | Decimal | 0.15 | The base duration of each shake iteration, in seconds.
Duration variation | Decimal | 0.25 | The randomized delta modifier applied to the base duration of the effect.
Shake amplitude | Decimal | 0.5 | The base displacement amplitude of each shake iteration, in units.
Amplitude variation | Decimal | 0.5 | The randomized delta modifier applied to the base displacement amplitude of the effect.
Shake horizontally | Boolean | false | Whether to displace the actor horizontally (by x-axis).
Shake vertically | Boolean | true | Whether to displace the actor vertically (by y-axis).

### Examples
```
; Shake main background with default params
@fx ShakeBackground

; Shake `Video` background twice 
@fx ShakeBackground params:Video,2
```

## ShakeCharacter
Shakes character with the specified ID or a random visible one.

### Demo

<video class="video" loop autoplay><source src="https://i.gyazo.com/6001d3cfbee855c8a783d10e4a784042.mp4" type="video/mp4"></video>

### Start Parameters
Name | Type | Default | Description
--- | --- | --- | ---
Character ID | String | null | ID of the character to shake. Will shake a random visible one when not specified.
Shake count | Integer | 3 | The number of shake iterations. When set to 0 or less, will loop the effect until stopped with [`@stopfx`](/api/#stopfx).
Shake duration | Decimal | 0.15 | The base duration of each shake iteration, in seconds.
Duration variation | Decimal | 0.25 | The randomized delta modifier applied to the base duration of the effect.
Shake amplitude | Decimal | 0.5 | The base displacement amplitude of each shake iteration, in units.
Amplitude variation | Decimal | 0.5 | The randomized delta modifier applied to the base displacement amplitude of the effect.
Shake horizontally | Boolean | false | Whether to displace the actor horizontally (by x-axis).
Shake vertically | Boolean | true | Whether to displace the actor vertically (by y-axis).

### Examples
```
; Shake `Kohaku` character with default parameters
@fx ShakeCharacter params:Kohaku

; Start shaking a random character, show a choice to stop and act accordingly
@fx ShakeCharacter params,0
@choice "Continue shaking" goto:.Continue
@choice "Stop shaking" goto:.Stop
@stop
# Stop
@stopfx ShakeCharacter
# Continue
...
```

## DigitalGlitch
Applies a post-processing effect to the main camera simulating digital video distortion and artifacts.

### Demo

<video class="video" loop autoplay><source src="https://i.gyazo.com/94cb6db25c17956473db4de149281df5.mp4" type="video/mp4"></video>

### Start Parameters
Name | Type | Default | Description
--- | --- | --- | ---
Duration | Decimal | 1 | The duration of the effect, in seconds.
Intensity | Decimal | 1 | The intensity of the effect, in 0.0 to 10.0 range.

### Examples
```
; Apply the glitch effect with default parameters
@fx DigitalGlitch
; Apply the effect over 3.33 seconds with a low intensity
@fx DigitalGlitch params:3.33,0.1
```

## Rain
Spawns a particle system simulating a rain.

### Demo

<video class="video" loop autoplay><source src="https://i.gyazo.com/1dc818d5e00ac48164fc6411d963d968.mp4" type="video/mp4"></video>

### Start Parameters
Name | Type | Default | Description
--- | --- | --- | ---
Intensity | Decimal | 500 | The intensity of the rain (particles spawn rate per second).
Fade-in time | Decimal | 5 | The particle system will gradually grow the spawn rate from 0 to the target level over the specified time, in seconds.
X velocity | Decimal | 1 | Multiplier to the horizontal speed of the particles. Use to change angle of the rain drops.
Y velocity | Decimal | 1 | Multiplier to the vertical speed of the particles.

### Stop Parameters
Name | Type | Default | Description
--- | --- | --- | ---
Fade-out time | Decimal | 5 | The particle system will gradually lower the spawn rate from the target level to 0 over the specified time, in seconds.

### Examples
```
; Start intensive rain over 10 seconds
@fx Rain params:1500,10
; Stop the rain over 30 seconds
@stopfx Rain params:30
```

## Adding Custom Effects

### Standalone Effects

You can add a custom standalone effect (implemented via a prefab, like the "Rain" and "Snow" built-in effects) by storing the effect prefab in `Resources` folders and using [`@spawn`](/api/#spawn) and [`@despawn`](/api/#despawn) actions to control them via novel scripts. For example, given there is a `Resources/FX/Explosion.prefab` asset stored in the project, following actions will spawn and de-spawn (destroy) the prefab on scene:

```
@spawn FX/Explosion
@despawn FX/Explosion
```

Check the built-in effect prefabs stored at `Naninovel/Resources/Naninovel/FX` for reference implementations.

### Camera Effects

If you wish to apply a custom [post-processing effect](https://assetstore.unity.com/?q=post%20processing&orderBy=1) (aka image effect or camera filter, like the "Digital Glitch" built-in effect) to the Naninovel camera, [create a camera prefab](https://docs.unity3d.com/Manual/CreatingPrefabs.html), [add the required effect components](https://docs.unity3d.com/Manual/UsingComponents.html) to the camera's object and assign the prefab to `Custom Camera Prefab` field in the camera configuration menu (Naninovel -> Configuration -> Camera).

![](https://i.gyazo.com/6024aac1d2665dd96915758cd5c09fde.png)

You can toggle (enable if disabled and vice-versa) the added components via novel scripts using `toggle` parameter of the [`@camera`](/api/#camera) action. For example, let's assume you've added a "Bloom Image Effect" component to the camera object. First, find out what is the type name of the component; it's usually specified in the `Script` field of the component.

![](https://i.gyazo.com/73b7eabfe97ed84796cbe715b7dafc14.png)

In our case the component's type name is `BloomImageEffect`. Use the type name to toggle this component at runtime like follows:

```
@camera toggle:BloomImageEffect
```

You can toggle multiple components at once by delimiting the type names with commas:

```
@camera toggle:BloomImageEffect,Sepia,CameraNoise
```

The state of the currently enabled (and disabled) custom camera components will be automatically saved and restored on game save-loading operations.

Check out the following video for example on adding a custom camera filter effect.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/IbT6MTecO-k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>