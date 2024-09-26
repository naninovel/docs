# Backgrounds

Opposed to [characters](/guide/characters), backgrounds are actors used to represent a *back* layer of the scene: locations, sceneries, landscapes or anything that should always appear *behind* the characters. Check following video tutorial for a brief overview of the background actors.

![](https://www.youtube.com/watch?v=X2iyGSCpnJs)

A background actor is defined with a name, appearance, visibility and transform (position, rotation, scale). It can change appearance, visibility and transform over time.

Backgrounds' behavior can be configured using `Naninovel -> Configuration -> Backgrounds` context menu; for available options see [configuration guide](/guide/configuration#backgrounds). The backgrounds' resources manager can be accessed using `Naninovel -> Resources -> Backgrounds` context menu.

![](https://i.gyazo.com/cccd08280dac72d199ea3465bc167a22.gif)

In case you have a lot of backgrounds and/or appearances per background and it's inconvenient to assign them all via editor menu, use actor record assets (`Create -> Naninovel -> Actor Record -> Background`) which support multi-editing and organizing the records with folders; check the video below for an example.

![](https://www.youtube.com/watch?v=2YP-36THHvk)

It's possible to use [addressable asset system](/guide/resource-providers#addressable) to associate resources with actor records without using editor menus. Eg, to associate a "Beach" appearance with "MainBackground" background, assign the texture asset following address: `Naninovel/Backgrounds/MainBackground/Beach` and assign `Naninovel` label to the asset in addressable group configuration. Be aware, that addressable provider is not used in editor by default; you can allow it by enabling `Allow Addressable In Editor` property in resource provider configuration menu. Find more info on using addressable provider in the [resource providers documentation](/guide/resource-providers#addressable).

In naninovel scripts, backgrounds are mostly controlled with [@back] command:

```nani
; Set `River` as the appearance of the main background
@back River

; Same as above, but also use a `RadialBlur` transition effect
@back River.RadialBlur
```

Backgrounds are handled a bit differently from characters to better accommodate traditional VN game flow. Most of the time you'll probably have a single background actor on scene, which will constantly transition to different appearances. To remove the hassle of repeating same actor ID in scripts, it's possible to provide only the background appearance and transition type (optional) as a nameless parameter assuming `MainBackground` actor should be affected. When this is not the case, ID of the background actor can be explicitly provided via the `id` parameter:

```nani
; Given a `CityVideo` actor with `Night` and `Day` video clips.

; Show the video background playing day clip.
@back Day id:CityVideo

; Transition to night clip with ripple effect.
@back Night.Ripple id:CityVideo

; Hide the video background.
@hide CityVideo
```

Main background actor record is created by default in the background resources manager and can't be renamed or deleted; however, parameters of the main background (implementation, pivot, PPU, etc) can be freely changed.

## Z-order

When showing multiple backgrounds simultaneously, they tend to cover each other:

```nani
@back id:1
@back id:2
```

— in case both background `1` and `2` are full-screen opaque textures, one added later will completely cover the other. To show first one back, either hide the other or change z-position (depth) to chane the draw order:

```nani
; Hide background 2 to reveal first one back
@back id:2 !visible
; There is also a dedicated command to hide actors
@hide 2

; Alternatively, change z-position
@back id:1 pos:,,98
@back id:2 pos:,,99
```

Higher z-positions result in further distance from the camera, hence first actor being placed closer to the camera will render on top of the other.

Backgrounds are placed with a specific z-offset by default to make them appear behind other actor types. The offset value can be changed via `Z Offset` property in background settings.

To prevent z-fighting issues, backgrounds are further offset apart from each other over z-axis when first added (shown). The offset is controlled with `Z Step` setting.

## Match Mode

When [camera](https://docs.unity3d.com/Manual/class-Camera.html) is rendering in orthographic mode and `Match Mode` in background actor configuration is not disabled, the actor will attempt to match its size against current screen size. This is performed to handle the cases when display [aspect ratio](https://en.wikipedia.org/wiki/Aspect_ratio_(image)) is different from the background's. When the matching is disabled and the aspect ratios are different, "black bars" will appear.

![](https://i.gyazo.com/46619a08e3b91441cf30800185932963.png)

While for standalone (PC, Mac, Linux) builds you can limit the available aspect ratios in the [player settings](https://docs.unity3d.com/Manual/class-PlayerSettingsStandalone.html#Resolution), on web, consoles and mobiles it's not possible and the applications have to adapt for the target devices instead.

Following match modes can be set for each background actor (except of generic implementation):

 Mode    | Description
 ---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Crop    | The background will always occupy the whole camera frustum, ensuring no black bars are visible to the player, no matter the display aspect ratio; however, some background areas could be cropped. Set by default for new background actors.
 Fit     | The whole background area will always remain visible, but black bars will appear when the aspect ratios are different.
 Custom  | Allows matching either width or height with a custom ratio. The ratio is controlled with `Custom Match Ratio` property: minimum (0) value will match width and ignore height, maximum (1) — vice-versa.
 Disable | Don't perform any matching.

::: tip
In case you wish to implement a similar matching feature for a generic or custom background see the [scale to screen example](https://forum.naninovel.com/viewtopic.php?f=8&t=107&p=335#p335) on the forum.
:::

## Poses

Each background has `Poses` property allowing to specify named states (poses).

Pose name can be used as appearance in [@back] command to apply all the selected parameters specified in the pose at once, instead of specifying them individually via the command parameters.

```nani
; Given `Day` pose is defined for main background,
; applies all the selected parameters specified in the pose.
@back Day

; Same as above, but for a background actor with `City` ID
; and using `DropFade` transition over 3 seconds.
@back Day id:City transition:DropFade time:3
```

Notice, that when a pose is used as appearance, you can still override individual parameters, eg:

```nani
; Given `Day` pose is defined for main background,
; applies all the parameters specified in the pose state,
; except tint, which is overridden in the command.
@back Day tint:#ff45cb
```

## Sprite Backgrounds

Sprite implementation of the background actors is the most common and simple one; it uses a set of [texture](https://docs.unity3d.com/Manual/Textures.html) assets wrapped over a quad mesh (sprite) to represent appearances of the background. The textures can be based on `.jpg`, `.png`, `.tiff`, `.psd` or any other image file format [supported by Unity](https://docs.unity3d.com/Manual/ImportingTextures).

::: tip
Choose file formats that are most comfortable for your development workflow. When building the project, Unity will automatically convert all the source resources (textures, audio, video, etc) to the formats most suitable for the target platform, so it won't make difference in which format you originally store the resources in the project. Find more information on how Unity manage project assets in the [official documentation](https://docs.unity3d.com/Manual/AssetWorkflow).
:::

Initial (unscaled) size of the sprite background mesh on scene depends on the reference resolution (camera configuration), background's `Pixel Per Unit` property (set for each background actor in the configuration menu) and source texture resolution.

Naninovel will attempt to make the backgrounds cover the whole camera frustum by default, so make sure to size the source textures so that the aspect ratio is equal to the reference resolution; see [match mode guide](/guide/backgrounds#match-mode) for more information on how to change or disable this behaviour.

::: tip
Define reference resolution with your team before starting the work on the art assets (both characters and backgrounds). This way the artists will be able to author the assets with the correct dimensions and you won't have to edit them later.
:::

## Diced Sprite Backgrounds

Built with an open source [SpriteDicing](https://github.com/elringus/SpriteDicing) package, `DicedSpriteBackground` implementation allows to significantly reduce build size and texture memory by reusing texture areas of the background sprites when the associated textures contain mostly similar data.

Diced background is very similar to diced character implementation; see the [diced characters guide](/guide/characters.html#diced-sprite-characters) for the setup and usage instructions.

## Video Backgrounds

Video backgrounds use looped [video clip](https://docs.unity3d.com/Manual/class-VideoClip) assets to represent the appearance.

For the supported video formats for each platform see [Unity docs for video sources](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility.html). When using video with an alpha channel (transparency), see the [guide on the supported formats](https://docs.unity3d.com/Manual/VideoTransparency.html).

::: info NOTE
When `Transcode` is disabled in the video asset import settings, the clip may not be playable on some platforms. When a video is not playing in the build, try enabling the transcode option and rebuild the player.

![](https://i.gyazo.com/9c3fb59dc8ebb2fbd0f5a5e79542e11f.png)
:::

::: tip EXAMPLE
In case having issues with achieving a seamless loop, make sure the video has exactly same starting and finishing frames and a compatible encoding setup; check our [video actor example project](https://github.com/naninovel/samples/tree/main/unity/video-actor) for the reference.
:::

To prevent specific appearance from looping, append `NoLoop` (case-insensitive) to the appearance name.

### WebGL Limitations

On WebGL Unity's video player can only work in streaming mode, so all the video resources will be copied to `Assets/StreamingAssets/Backgrounds` folder upon building the WebGL player. **StreamingAssets** folder will also appear in the build output directory; make sure to preserve it when publishing the build and check that your web server allows reading the data from this folder.

The copied video files won't be transcoded by Unity (even if the option is enabled), so the source files should initially be in a format supported by the web browsers; alternatively, you can replace the clip files in the game directory after the build. Below is the detailed metadata of a background video clip that is used in our WebGL demo:

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

If you're using a video format other than mp4 (eg, webm), set the extension of the hosted files via `Video Stream Extension` property in the resource provider configuration.

![](https://i.gyazo.com/b3eb1ab2af513e6a131347d6e5e455e5.png)

## Layered Backgrounds

The layered implementation allows composing backgrounds from multiple sprites (layers) and then toggle them individually via naninovel scripts at runtime.

::: tip
Layered actor implementation has been evolving and is currently the most flexible with support for all the rendering features (in contrast to generic). Even if you don't want to use layer expressions, but instead control the appearance with Unity's Animator or other custom systems; or need to render non-trivial objects such as particle systems and/or utilize third-party renderers, check [render only](/guide/characters#outsourcing-appearance-management) and [camera rendering](/guide/characters#camera-rendering) options available for layered actors before reserving to generic or custom implementation.
:::

To create a layered background prefab, use `Create -> Naninovel -> Background -> Layered` asset context menu. Enter [prefab editing mode](https://docs.unity3d.com/Manual/EditingInPrefabMode.html) to compose the layers. Several layers and groups will be created by default. You can use them or delete and add your own.

The layered backgrounds are very similar to [layered characters](/guide/characters#layered-characters); consult the documentation for more info on how to set up and control them via naninovel scripts.

Don't forget that nameless parameter in [@back] command is expecting appearance and transition type (not ID and appearance as with [@char] command), so specify layer composition expressions in the following way:

```nani
; Given "LayeredForest" background actor
@back Group>Layer,Other/Group+Layer,-RootLayer.TransitionType id:LayeredForest
```

## Generic Backgrounds

Generic background is the most flexible background actor implementation. It's based on a prefab with a `Generic Background Behaviour` component attached to the root object. Appearance changes and all the other background parameters are routed as [Unity events](https://docs.unity3d.com/Manual/UnityEvents.html) allowing to implement the behavior of the underlying object in any way you wish.

![](https://i.gyazo.com/6483ef3e84549c1bbfbdffc6556308ea.png)

::: info NOTE
Generic actor implementations just route events from the scenario scripts and it's up to user to implement the underlying behaviour, eg how the actor should react to the appearance or visibility change commands, whether and how it will adapt to aspect ratio changes, etc. Don't expect most of the actor-related features to work automatically with the generic implementations.
:::

To create generic background prefab from a template, use `Create -> Naninovel -> Background -> Generic` context asset menu.

Generic backgrounds are very similar to generic characters; check out a tutorial video on setting an animated 3D model as a generic character for one of the possible usage examples. Be aware, that the video is captured with an old Naninovel version and some properties and component names are different now; see the above docs for the up-to-date information.

![](https://www.youtube.com/watch?v=HPxhR0I1u2Q)

::: tip
Unity's `Animator` component could fail to register `SetTrigger` when the game object is enabled/disabled in the same frame; in case you use `GameObject.SetActive` to handle visibility changes (as it's shown in the above tutorial), consider enabling/disabling the child objects with renderers instead.
:::

::: tip EXAMPLE
Find [example project on GitHub](https://github.com/naninovel/samples/tree/main/unity/generic-actor), where generic background implementation is used to host animated sprites.
:::

## Scene Backgrounds

You can use a [Unity scene](https://docs.unity3d.com/Manual/CreatingScenes) as a background with scene backgrounds implementation.

The scene background configuration has a `Scene Root Path` option set to `Assets/Scenes` by default — this is the directory, where the actor's scene assets are expected to be located. You can change it (for example to specify individual folder for each actor) or leave as-is.

![](https://i.gyazo.com/0f3c0be40941ad739f2c873c5fbf6e51.png)

::: info NOTE
Resource (appearance) names of the scene backgrounds are expected to be equal to the paths of the scene assets relative to the root; for example, if the scene root is `Assets/Scenes` and you have `Assets/Scenes/Sphere.unity` and `Assets/Scenes/Sub/Cylinder.unity` scene assets, the associated appearances would be `Sphere` and `Sub/Cylinder` respectively.
:::

Create a new (or move an existing) scene under the specified root folder and make sure it has at least one [camera](https://docs.unity3d.com/ScriptReference/Camera.html) component attached to a root game object inside the scene. Upon loading scene background, Naninovel will assign a render texture to the first found camera in the scene. The render texture will then be assigned to a background sprite, representing the scene background inside Naninovel scene space. This way, the scene background will be able to co-exist with other background and character actors, support all the background transition effects and scale to handle various display aspect ratios.

Make sure to position the scene objects in world space so that they don't overlap with objects from other scenes, that could potentially be loaded at the same time (eg, when referenced in a single naninovel script). Additionally, be aware, that in case a scene background object is positioned near the global space origin (`x0 y0 z0`), it could be rendered by Naninovel's main camera; to prevent this, either offset all the scene objects from the global origin, or use `Configuration -> Engine -> Override Objects Layer` to isolate Naninovel-related objects using [layers](https://docs.unity3d.com/Manual/Layers.html).

After scene setup is complete, create a new background actor via `Naninovel -> Configuration -> Backgrounds` menu, select `SceneBackground` implementation and add the scene asset to the actor resources.

When assigning resources for a scene background actor, corresponding scene assets should automatically be added to the [build settings](https://docs.unity3d.com/Manual/BuildSettings.html); in case you're getting an error that a scene asset is not added to the build, try adding it manually.

You can now use [@back] command to control the created scene background actor, eg:

```nani
; Show "Scene" background actor with content from "Sphere" Unity scene.
@back Sphere id:Scene
; Transition the actor to "Sub/Cylinder" with "RandomCircleReveal" effect.
@back Sub/Cylinder.RandomCircleReveal id:Scene
```

::: tip
When composing backgrounds with Unity scenes, consider adding [custom commands](/guide/custom-commands) to control scene state (eg, modify light color to change time of day or move camera to change the view) instead of creating multiple scenes for each appearance. This way you won't have to track objects position to prevent overlap when multiple scenes are loaded.
:::

## Render to Texture

It's possible to render character and background actors of all the implementations (except generic) to a texture asset, which can then can be assigned to a custom UI, printer, material or any other compatible source. Setting up background actor render to texture is very similar to that of a character; [check the guide](/guide/characters#render-to-texture) for more info and examples.
