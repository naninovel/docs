# Backgrounds 

Opposed to [characters](/guide/characters.md), backgrounds are actors used to represent a *back* layer of the scene: locations, sceneries, landscapes or anything that should always appear *behind* the characters. 

A background actor is defined with a name, appearance, visibility and transform (position, rotation, scale). It can change appearance, visibility and transform over time.

Backgrounds' behavior can be configured using `Naninovel -> Configuration -> Backgrounds` context menu; for available options see [configuration guide](/guide/configuration.md#backgrounds). The backgrounds' resources manager can be accessed using `Naninovel -> Resources -> Backgrounds` context menu.

![](https://i.gyazo.com/cccd08280dac72d199ea3465bc167a22.gif)

In naninovel scripts, backgrounds are mostly controlled with [`@back`](/api/#back) command:

```
; Set `River` as the appearance of the main background
@back River

; Same as above, but also use a `RadialBlur` transition effect
@back River.RadialBlur
```
Backgrounds are handled a bit differently from characters to better accommodate traditional VN game flow. Most of the time you'll probably have a single background actor on scene, which will constantly transition to different appearances. To remove the hassle of repeating same actor ID in scripts, it's possible to provide only the background appearance and transition type (optional) as a nameless parameter assuming `MainBackground` actor should be affected. When this is not the case, ID of the background actor can be explicitly provided via the `id` parameter:

```
; Given a `CityVideo` background actor with `Night` and `Day` appearances (video clips)

; Show the video background playing day clip
@back Day id:CityVideo

; Transition to night clip with ripple effect
@back Night.Ripple id:CityVideo

; Hide the video background
@hide CityVideo
```

Main background actor record is created by default in the background resources manager and can't be renamed or deleted; however, parameters of the main background (implementation, pivot, PPU, etc) can be freely changed.

## Poses

Each background has `Poses` property allowing to specify named states (poses).

Pose name can be used as appearance in [`@back`](/api/#back) command to apply all the parameters specified in the pose state at once, instead of specifying them individually via the command parameters.

```
; Given `Day` pose is defined for main background, 
; applies all the parameters specified in the pose state.
@back Day

; Same as above, but for a background actor with `City` ID
; and using `DropFade` transition over 3 seconds.
@back Day id:City transition:DropFade time:3
```

Notice, that when a pose is used as appearance, you can still override individual parameters, eg:

```
; Given `Day` pose is defined for main background,
; applies all the parameters specified in the pose state,
; except tint, which is overridden in the command.
@back Day tint:#ff45cb
```

## Sprite Backgrounds

Sprite implementation of the background actors is the most common and simple one; it uses a single [sprite](https://docs.unity3d.com/Manual/Sprites) asset to represent appearance of the background. The source of the sprite could be a `.jpg` or `.png` image file. 


## Video Backgrounds

Video backgrounds use [video clip](https://docs.unity3d.com/Manual/class-VideoClip) assets to represent the appearance. 

Video backgrounds can only be managed by editor GUI.

For the supported video formats for each platform see [Unity docs for video sources](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility.html).

For the reference, here is the detailed video parameters of the background video clip that is used in our WebGL demo:

~~~
Container : MPEG-4
Container profile : Base Media
Container codec ID : isom (isom/iso2/avc1/mp41)
Format : AVC
Format/Info : Advanced Video Codec
Format profile : High@L4
Format settings, CABAC : Yes
Format settings, RefFrames : 4 frames
Codec ID : avc1
Codec ID/Info : Advanced Video Coding
Bit rate : 3 196 kb/s
Width : 1 920 pixels
Height : 1 080 pixels
Display aspect ratio : 16:9
Frame rate mode : Constant
Frame rate : 25.000 FPS
Color space : YUV
Chroma subsampling : 4:2:0
Bit depth : 8 bits
Scan type : Progressive
Writing library : x264 core 148 r2795 aaa9aa8
Encoding settings : cabac=1 / ref=3 / deblock=1:0:0 / analyse=0x3:0x113 / me=hex / subme=7 / psy=1 / psy_rd=1.00:0.00 / mixed_ref=1 / me_range=16 / chroma_me=1 / trellis=1 / 8x8dct=1 / cqm=0 / deadzone=21,11 / fast_pskip=1 / chroma_qp_offset=-2 / threads=12 / lookahead_threads=2 / sliced_threads=0 / nr=0 / decimate=1 / interlaced=0 / bluray_compat=0 / constrained_intra=0 / bframes=3 / b_pyramid=2 / b_adapt=1 / b_bias=0 / direct=1 / weightb=1 / open_gop=0 / weightp=2 / keyint=250 / keyint_min=25 / scenecut=40 / intra_refresh=0 / rc_lookahead=40 / rc=crf / mbtree=1 / crf=23.0 / qcomp=0.60 / qpmin=0 / qpmax=69 / qpstep=4 / ip_ratio=1.40 / aq=1:1.00
~~~

And here is the Unity import settings for this video clip:

![](https://i.gyazo.com/9e6a9cc0bd79bca2c0e8e35666fbdc7f.png)

Depending on the target platform, it could be required to enable the transcoding in the video clip import settings.

In case having issues with achieving a seamless loop, make sure the video has exactly same starting and finishing frames and a compatible encoding setup; check our [video loop example project](https://github.com/Elringus/VideoLoop) for the reference.

Be aware, that on WebGL video player can only work in the streaming mode, so all the video resources will be copied to `Assets/StreamingAssets/Backgrounds` folder upon building the WebGL player. **StreamingAssets** folder will also appear in the build output directory; make sure to preserve it when publishing the build and check that your web server allows reading the data from this folder.

## Layered Backgrounds

The layered implementation allows composing backgrounds from multiple sprites (layers) and then toggle them individually via naninovel scripts at runtime.

To create a layered background prefab, use `Create -> Naninovel -> Background -> Layered` asset context menu. Enter [prefab editing mode](https://docs.unity3d.com/Manual/EditingInPrefabMode.html) to compose the layers. Several layers and groups will be created by default. You can use them or delete and add your own.

The layered backgrounds are very similar to [layered characters](/guide/characters.md#layered-characters); consult the documentation for more info on how to setup and control them via naninovel scripts.

Don't forget that nameless parameter in `@back` command is expecting appearance and transition type (not ID and appearance as with `@char` command), so specify layer composition expressions in the following way:

```
; Given "LayeredForest" background actor
@back Group>Layer,Other/Group+Layer,-RootLayer.TransitionType id:LayeredForest
```

## Generic Backgrounds

Generic background is the most flexible background actor implementation. It's based on a prefab with a `BackgroundActorBehaviour` component attached to the root object. Appearance changes and all the other background parameters are routed as [Unity events](https://docs.unity3d.com/Manual/UnityEvents.html) allowing to implement the behavior of the underlying object in any way you wish. 

![](https://i.gyazo.com/d8f86c83decfb3c40c8d23602214a743.png)

To create generic background prefab from a template, use `Create -> Naninovel -> Background -> Generic` context asset menu.

Generic backgrounds are very similar to generic characters; check out a tutorial video on setting an animated 3D model as a generic character for one of the possible usage examples.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/HPxhR0I1u2Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Scene Backgrounds

You can use a [Unity scene](https://docs.unity3d.com/Manual/CreatingScenes) as a background with scene backgrounds implementation. 

Scene backgrounds can only be managed by editor GUI; scene assets should be stored under `Assets/Scenes` project folder.

First, create a new (or move an existing) scene inside `Assets/Scenes` folder and make sure it has at least one [camera](https://docs.unity3d.com/ScriptReference/Camera.html). Upon loading scene background, Naninovel will assign a render texture to the first found camera in the scene. The render texture will then be assigned to a background sprite, representing the scene background inside Naninovel scene space. This way, the scene background will be able to co-exist with other background and character actors, support all the background transition effects and scale to handle various display aspect ratios. 

Make sure to position the scene objects in world space so that they don't overlap with objects from other scenes, that could potentially be loaded at the same time (eg, when referenced in a single naninovel script). Additionally, be aware, that in case a scene background object is positioned near the global space origin (`x0 y0 z0`), it could be rendered by Naninovel's main camera; to prevent this, either offset all the scene objects from the global origin, or use `Configuration -> Engine -> Override Objects Layer` to isolate Naninovel-related objects using [layers](https://docs.unity3d.com/Manual/Layers.html).

After scene setup is complete, create a new background actor via `Naninovel -> Configuration -> Backgrounds` menu, select `SceneBackground` implementation and add the scene asset to the actor resources.

![](https://i.gyazo.com/d69159ab4d93793022018fa8d244f1aa.png)

When assigning resources for a scene background actor, corresponding scene assets should automatically be added to the [build settings](https://docs.unity3d.com/Manual/BuildSettings.html); in case you're getting an error that a scene asset wasn't added to the build, try adding it manually.

You can now use [`@back`](/api/#back) command to control the created scene background actor, eg:

```
@back SceneName id:ActorId
```
