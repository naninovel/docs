# Background Transition Effects

When changing background appearance with [`@back`](/api/#back) action, you can additionally specify which transition effect to use. For example, following action will transition to "River" background using "DropFade" transition effect:

```
@back River.DropFade
```

When no transition effect is specified a cross-fade is used by default. 

You can also specify duration of the transition (in seconds) with the `time` parameter:

```
@back River.DropFade time:1.5
```

The above statement will transition to "River" background using "DropFade" transition over 1.5 seconds. Default `time` for all transitions is 0.35 seconds.

In case you wish to skip to the next action immediately after executing the transition (and not wait for the duration of the effect), you can set `wait` parameter to `false`. E.g.:

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

You can find available transition effects with their parameters and default values in the docs below.

Parameters are listed in the following format: params:*ParamName*(*DefaultValue*) Where *ParamName* is the name of the parameter and *DefaultValue* is the default value of the parameter.


## BandedSwirl

params:twistAmount(5),frequency(10)

<video class="video" loop autoplay><source src=" https://i.gyazo.com/37432ac584ef04d94d3e4f9535fdffc4.mp4" type="video/mp4"></video>


## Blinds

params:count(6)

<video class="video" loop autoplay><source src="https://i.gyazo.com/73a259f2a513a92ef893ebd6a25e9013.mp4" type="video/mp4"></video>

## CircleReveal

params:fuzzyAmount(0.25)

<video class="video" loop autoplay><source src="https://i.gyazo.com/4f914c6741a5e48a22cafe2ab242a426.mp4" type="video/mp4"></video>

## CircleStretch

params:none

<video class="video" loop autoplay><source src="https://i.gyazo.com/f09bb69a3c045eeb1f6c8ec0b9dcd790.mp4" type="video/mp4"></video>

## CloudReveal

params:none

<video class="video" loop autoplay><source src="https://i.gyazo.com/618ec451a9e10f70486db0bb4badbb71.mp4" type="video/mp4"></video>

## Crossfade

params:none

<video class="video" loop autoplay><source src="https://i.gyazo.com/dc4781a577ec891065af1858f5fe2ed1.mp4" type="video/mp4"></video>

## Crumble

params:none

<video class="video" loop autoplay><source src="https://i.gyazo.com/e27c8477842a2092728ea0cc1ae76bda.mp4" type="video/mp4"></video>

## Disolve

params:step(99999)

<video class="video" loop autoplay><source src="https://i.gyazo.com/b2993be8de032a65c7d813c6d749e758.mp4" type="video/mp4"></video>

## DropFade

params:none

<video class="video" loop autoplay><source src="https://i.gyazo.com/3c3840bb311ccb9fe223960f2e46f800.mp4" type="video/mp4"></video>

## LineReveal

params:fuzzyAmount(0.25),lineNormalX(0.5),lineNormalY(0.5)

<video class="video" loop autoplay><source src="https://i.gyazo.com/c0e5259cd3d4ed2016ab74a65a7eec63.mp4" type="video/mp4"></video>

## Pixelate

params:none

<video class="video" loop autoplay><source src="https://i.gyazo.com/0ac9339b21303e20c524aaf6b6ca95f4.mp4" type="video/mp4"></video>

## RadialBlur

params:none

<video class="video" loop autoplay><source src="https://i.gyazo.com/f8269fb68519c57c99643948a027a2a1.mp4" type="video/mp4"></video>

## RadialWiggle

params:none

<video class="video" loop autoplay><source src="https://i.gyazo.com/a401b3b93a61276ed68ededa2e75e9ae.mp4" type="video/mp4"></video>

## RandomCircleReveal

params:none

<video class="video" loop autoplay><source src="https://i.gyazo.com/f6e685b13fe2d76733fd43878602eabc.mp4" type="video/mp4"></video>

## Ripple

params:frequency(20),speed(10),amplitude(0.5)

<video class="video" loop autoplay><source src="https://i.gyazo.com/ff1bd285dc675ca5ac04f7ae4500f1c4.mp4" type="video/mp4"></video>

## RotateCrumble

params:none

<video class="video" loop autoplay><source src="https://i.gyazo.com/8d476f466858e4788e5ad6014d6db314.mp4" type="video/mp4"></video>

## Saturate
	
params:none

<video class="video" loop autoplay><source src="https://i.gyazo.com/ad6eb77b7065387b9cb9afd77adbc784.mp4" type="video/mp4"></video>

## Shrink

params:speed(200)

<video class="video" loop autoplay><source src="https://i.gyazo.com/8c8bf00348df28ab89813c21f8655c07.mp4" type="video/mp4"></video>

## SlideIn

params:slideAmount(1)

<video class="video" loop autoplay><source src="https://i.gyazo.com/800ee6f5fba39ab8d46f5eb09f2126cf.mp4" type="video/mp4"></video>

## SwirlGrid

params:twistAmount(15),cellCount(10)

<video class="video" loop autoplay><source src="https://i.gyazo.com/5a21293d979323a112ffd07f1fffd28d.mp4" type="video/mp4"></video>

## Swirl

params:twistAmount(15)

<video class="video" loop autoplay><source src="https://i.gyazo.com/6ac9a2fe1bb9dfaf6a8292ae5d03960e.mp4" type="video/mp4"></video>

## Water

params:none

<video class="video" loop autoplay><source src="https://i.gyazo.com/7c684f9a122006f38a0be2725895b76f.mp4" type="video/mp4"></video>

## Waterfall

params:none

<video class="video" loop autoplay><source src="https://i.gyazo.com/b6eebcb68002064ababe4d7476139a7c.mp4" type="video/mp4"></video>

## Wave

params:magnitude(0.1),phase(14),frequency(20)

<video class="video" loop autoplay><source src="https://i.gyazo.com/e189ca12868d7ae4c9d8f0ca3d9dd298.mp4" type="video/mp4"></video>

