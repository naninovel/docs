# Special Effects

Special effects are activated using [`@fx`](/api/#fx) action followed by effect name. E.g.:

```
@fx ShakeBackground
```
— will shake the main background.

You can control parameters of the effect with the `params` parameter. E.g.:

```
@fx ShakeBackground params:,1
```
— will shake the background once, instead of the default 3.

When no `params` is specified, default parameters will be used. You can find available parameters for each effect and their default values in the docs below.

Parameters are listed in the following format: params:*ParamName*(*DefaultValue*) Where *ParamName* is the name of the parameter and *DefaultValue* is the default value of the parameter.

## ShakePrinter

Shakes printer with specified name or the currently active one.

params:PrinterName(), ShakesCount(3), ShakeDuration(0.15), DurationVariation(0.25), ShakeAmplitude(0.5), AmplitudeVariation(0.5), ShakeHorizontally(false), ShakeVertically(true)

<video class="video" loop autoplay><source src="https://i.gyazo.com/f61fc35e318cce1949b00e5fe2448a80.mp4" type="video/mp4"></video>

## ShakeBackground

Shakes background with specified name or the  main one.

params:BackgroundName(), ShakesCount(3), ShakeDuration(0.15), DurationVariation(0.25), ShakeAmplitude(0.5), AmplitudeVariation(0.5), ShakeHorizontally(false), ShakeVertically(true)

<video class="video" loop autoplay><source src="https://i.gyazo.com/fcf1153a0ad3d9a153908206211f5f5f.mp4" type="video/mp4"></video>

## ShakeCharacter

Shakes character with specified name or a random visible one.

params:CharacterName(), ShakesCount(3), ShakeDuration(0.15), DurationVariation(0.25), ShakeAmplitude(0.5), AmplitudeVariation(0.5), ShakeHorizontally(false), ShakeVertically(true)

<video class="video" loop autoplay><source src="https://i.gyazo.com/6001d3cfbee855c8a783d10e4a784042.mp4" type="video/mp4"></video>


## GlitchCamera

params:Duration(1),Intensity(1)

<video class="video" loop autoplay><source src="https://i.gyazo.com/94cb6db25c17956473db4de149281df5.mp4" type="video/mp4"></video>

## TBA

New special effects, like rain, snow, thunder, light rays and others will be added as the engine undergoes an active development.