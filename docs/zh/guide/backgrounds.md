# 背景

与 [角色](/zh/guide/characters) 不同，背景是用于表示场景*后*层的 Actor：地点、风景、景观或任何应始终出现在角色*后面*的东西。

背景 Actor 由名称、外观、可见性和变换（位置、旋转、缩放）定义。它可以随时间改变外观、可见性和变换。

可以使用 `Naninovel -> Configuration -> Backgrounds` 编辑器菜单配置背景的行为；有关可用选项，请参阅 [配置指南](/zh/guide/configuration#背景)。可以使用 `Naninovel -> Resources -> Backgrounds` 编辑器菜单访问背景的资源管理器。

在剧本脚本中，背景主要通过 [@back] 命令控制：

```nani
; 将“River”设置为主背景的外观
@back River

; 与上面相同，但也使用“RadialBlur”过渡效果
@back River.RadialBlur
```

为了更好地适应传统的视觉小说游戏流程，背景的处理方式与角色略有不同。大多数时候，场景中可能只有一个背景 Actor，它会不断过渡到不同的外观。为了省去在脚本中重复相同 Actor ID 的麻烦，可以仅提供背景外观和过渡类型（可选）作为主参数，此时默认影响 `MainBackground` Actor。如果要影响其他背景，可以通过 `id` 参数显式指定背景 Actor 的 ID：

```nani
; 假设有一个带有“Night”和“Day”视频剪辑的“CityVideo”Actor。

; 显示播放白天剪辑的视频背景。
@back Day id:CityVideo

; 使用波纹效果过渡到夜晚剪辑。
@back Night.Ripple id:CityVideo

; 隐藏视频背景。
@hide CityVideo
```

主背景 Actor 记录默认在背景资源管理器中创建，无法重命名或删除；但是，主背景的参数（实现、轴心、PPU 等）可以自由更改。

请查看以下视频教程，了解背景 Actor 的概况。

![](https://www.youtube.com/watch?v=X2iyGSCpnJs)

## Actor 记录

如果您有很多背景或背景外观，并且通过编辑器菜单逐一分配它们不方便，请使用 Actor 记录资产（`Create -> Naninovel -> Actor Record -> Background`）。它们支持多重编辑，并允许您使用文件夹组织记录。请观看下面的视频查看示例。

![](https://www.youtube.com/watch?v=2YP-36THHvk)

## Z 顺序

同时显示多个背景时，它们往往会相互覆盖：

```nani
@back id:1
@back id:2
```

— 如果背景 `1` 和 `2` 都是全屏不透明纹理，则后添加的那个将完全覆盖另一个。要显示位于后面的第一个背景，请隐藏另一个背景，或更改 Z 位置（深度）以改变绘制顺序：

```nani
; 隐藏背景 2 以显示后面的第一个背景
@back id:2 !visible
; 还有一个专门用于隐藏 Actor 的命令
@hide 2

; 或者，更改 Z 位置
@back id:1 pos:,,98
@back id:2 pos:,,99
```

Z 位置越大，离摄像机越远；因此，离摄像机更近的 Actor 会渲染在另一个 Actor 之上。

背景默认带有特定的 Z 偏移，使其显示在其他类型的 Actor 后面。可以通过背景配置中的 `Z Offset` 属性更改偏移值。

为了防止 z-fighting 问题，背景在首次添加（显示）时会沿 Z 轴进一步相互错开。偏移量由 `Z Step` 设置控制。

## 匹配模式

当 [摄像机](https://docs.unity3d.com/Manual/class-Camera.html) 在正交模式下渲染且背景 Actor 配置中的 `Match Mode` 未禁用时，Actor 将尝试将其大小与当前屏幕大小匹配。这样做是为了处理显示器 [纵横比](https://en.wikipedia.org/wiki/Aspect_ratio_(image)) 与背景不同的情况。当匹配被禁用且纵横比不同时，会出现“黑边”。

![](https://i.gyazo.com/46619a08e3b91441cf30800185932963.png)

虽然可以 [强制使用受支持的纵横比](/zh/guide/gui#强制纵横比)，但更友好的替代方案是让游戏适应任意纵横比。内置 GUI 已经很灵活，可以适应任何屏幕大小；Actor 的定位也相对于场景边界，而场景边界会与屏幕匹配。背景匹配模式允许配置背景 Actor 如何填充屏幕。

可以为每个背景 Actor 设置以下匹配模式（通用实现除外）：

| 模式 | 描述 |
|------|-------------|
| Crop | 背景将始终占据整个摄像机视锥体，确保无论显示器纵横比如何，玩家都看不到黑边；但是，某些背景区域可能会被裁剪。新背景 Actor 默认使用此模式。 |
| Fit | 整个背景区域将始终保持可见，但当纵横比不同时会出现黑边。 |
| Custom | 允许使用自定义比率匹配宽度或高度。比率由 `Custom Match Ratio` 属性控制：最小值（0）将匹配宽度并忽略高度，最大值（1）则相反。 |
| Disable | 不执行任何匹配。 |

::: tip
如果您希望为通用或自定义背景实现类似的匹配功能，请参阅 Discord 上的 [缩放到屏幕示例](https://discord.com/channels/545676116871086080/1369983634236379240)。
:::

## 姿势

每个背景都有 `Poses` 属性，允许指定命名状态（姿势）。

姿势名称可以用作 [@back] 命令中的外观，以一次性应用姿势中指定的所有选定参数，而不必通过命令参数逐个指定它们。

```nani
; 假设为主背景定义了“Day”姿势，
; 应用姿势中指定的所有选定参数。
@back Day

; 与上面相同，但针对具有“City”ID 的背景 Actor
; 并在 3 秒内使用“DropFade”过渡。
@back Day.DropFade id:City time:3
```

请注意，当姿势用作外观时，您仍然可以覆盖单个参数，例如：

```nani
; 假设为主背景定义了“Day”姿势，
; 应用姿势状态中指定的所有参数，
; 但色调除外，它在命令中被覆盖。
@back Day tint:#ff45cb
```

## 占位符背景

占位符实现是默认实现，用于在您还没有任何视觉资产来表示背景时起草剧本。它会在运行时以程序化方式生成背景外观，以便您在编写剧本时了解当前显示的是哪一个。下面是一个占位符“EveningScene”背景的示例，上面有几个 [占位符角色](/zh/guide/characters#占位符角色)。

![](https://i.gyazo.com/cebb0506d3743e2e1b20b1d3c214239a.png)

虽然 Naninovel 会自动生成背景占位符，但您可以通过背景编辑器中的 `Placeholder Appearances` 列表定义特定外观的样子。

![](https://i.gyazo.com/183dcc86fbf0d01de49d85d45686571f.png)

## 精灵背景

背景 Actor 的精灵实现是最常见和最简单的；它使用一组包裹在四边形网格（精灵）上的 [纹理](https://docs.unity3d.com/Manual/Textures.html) 资产来表示背景的外观。纹理可以基于 `.jpg`、`.png`、`.tiff`、`.psd` 或任何其他 [Unity 支持](https://docs.unity3d.com/Manual/ImportingTextures) 的图像文件格式。

::: tip
选择最适合您的开发工作流程的文件格式。构建项目时，Unity 会自动将所有源资源（纹理、音频、视频等）转换为最适合目标平台的格式，因此您最初在项目中存储资源的格式不会产生影响。有关 Unity 如何管理项目资产的更多信息，请参阅 [官方文档](https://docs.unity3d.com/Manual/AssetWorkflow)。
:::

场景中精灵背景网格的初始（未缩放）大小取决于参考分辨率（摄像机配置）、背景的 `Pixels Per Unit` 属性（在配置菜单中为每个背景 Actor 设置）和源纹理分辨率。

Naninovel 默认会尝试使背景覆盖整个摄像机视锥体，因此请确保调整源纹理的大小，使其纵横比与参考分辨率的纵横比一致；有关如何更改或禁用此行为的更多信息，请参阅 [匹配模式指南](/zh/guide/backgrounds#匹配模式)。

::: tip
在开始制作美术资产（包括角色和背景）之前，请与您的团队确定参考分辨率。这样，美术人员就能够以正确的尺寸制作资产，您以后就不必再修改它们了。
:::

## 切片精灵背景

`DicedSpriteBackground` 实现基于开源的 [SpriteDicing](https://github.com/elringus/sprite-dicing) 包构建，当关联的纹理包含的数据大多相似时，允许通过重用背景精灵的纹理区域来显著减小构建大小和纹理内存占用。

切片背景与切片角色实现非常相似；有关设置和使用说明，请参阅 [切片角色指南](/zh/guide/characters#切片精灵角色)。

## 视频背景

视频背景使用循环的 [视频剪辑](https://docs.unity3d.com/Manual/class-VideoClip) 资产来表示外观。

有关每个平台支持的视频格式，请参阅 [Unity 视频源文档](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility.html)。使用带有 alpha 通道（透明度）的视频时，请参阅 [支持格式指南](https://docs.unity3d.com/Manual/VideoTransparency.html)。

::: info NOTE
在视频资产导入设置中禁用 `Transcode` 时，剪辑可能无法在某些平台上播放。如果视频在构建中无法播放，请尝试启用转码选项并重新构建播放器。

![](https://i.gyazo.com/9c3fb59dc8ebb2fbd0f5a5e79542e11f.png)
:::

::: tip EXAMPLE
如果无法实现无缝循环，请确保视频具有完全相同的开始和结束帧以及兼容的编码设置；请查看我们的 [视频 Actor 示例](/zh/guide/samples#视频-actor) 以供参考。
:::

为了防止特定外观循环，请在外观名称后追加 `NoLoop`（不区分大小写）。

### WebGL 限制

在 WebGL 上，Unity 的视频播放器只能在流式传输模式下工作，因此构建 WebGL 播放器时，所有视频资源都将被复制到 `Assets/StreamingAssets/Backgrounds` 文件夹。“StreamingAssets”文件夹也会出现在构建输出目录中；发布构建时请务必保留它，并检查您的 Web 服务器是否允许读取此文件夹中的数据。

复制的视频文件不会被 Unity 转码（即使启用了该选项），因此源文件最初应采用 Web 浏览器支持的格式；或者，您可以在构建后替换游戏目录中的剪辑文件。以下是我们 WebGL 演示中使用的背景视频剪辑的详细元数据：

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

如果您使用的是 mp4 以外的视频格式（例如 webm），请通过资源提供者配置中的 `Video Stream Extension` 属性设置托管文件的扩展名。

![](https://i.gyazo.com/b3eb1ab2af513e6a131347d6e5e455e5.png)

## Universal 背景

当您希望背景不仅仅是简单的精灵时，首先值得考虑的便是 Universal 实现。它支持 Unity 提供的所有默认渲染器：网格、粒子、蒙皮精灵、瓦片地图等。此外，Universal Actor 的内容会受到光源和 Volume 的影响。

使用 `Create -> Naninovel -> Background -> Universal` 资产上下文菜单从模板创建新的 Universal 背景预制件，然后双击该预制件进入预制件编辑模式。您会在根对象上看到 `Universal Background Behaviour` 组件，它是 Naninovel 与预制件内容之间的适配器。

您可以像构建 Unity 中的任何其他预制件一样构建此预制件。Naninovel 会捕获预制件根对象下所有兼容的渲染器，并在运行时将它们合成到背景渲染纹理中。请注意组件上的 `On Appearance Changed` 事件；您可以使用它为外观更改设置回调。例如，可以使用 Unity 的 [Animator](https://docs.unity3d.com/Manual/class-Animator.html) 系统驱动背景动画。

如果要包含在 Universal Actor 中的对象使用自定义渲染功能（例如 2D 光源或程序化绘制），可以在组件中实现 `Naninovel.IUniversalActorDrawable` 接口，并将该组件附加到包含自定义内容的游戏对象上，从而使其兼容。例如，[Live2D Actor](/zh/guide/characters#live2d-角色) 就是以这种方式实现的。

## 分层背景

分层实现基于 [Universal](/zh/guide/backgrounds#universal-背景)，并额外提供 `Layered Actor Controller` 组件，允许从多个精灵（层）组合背景，然后在运行时通过剧本脚本单独切换它们。

要创建分层背景预制件，请使用 `Create -> Naninovel -> Background -> Layered` 资产上下文菜单。进入 [预制件编辑模式](https://docs.unity3d.com/Manual/EditingInPrefabMode.html) 以组合层。默认情况下将创建几个层和组。您可以使用它们，也可以删除并添加自己的层和组。

分层背景与 [分层角色](/zh/guide/characters#分层角色) 非常相似；有关如何设置它们以及如何通过剧本脚本控制它们的更多信息，请参阅该文档。

不要忘记 [@back] 命令的主参数接受的是外观和过渡类型（而不是像 [@char] 命令那样的 ID 和外观），因此请按以下方式指定层组合表达式：

```nani
; 假设有“LayeredForest”背景 Actor
@back Group>Layer,Other/Group+Layer,-RootLayer.TransitionType id:LayeredForest
```

## 通用背景

通用背景是最灵活的背景 Actor 实现。它使用根对象上附加了 `Generic Background Behaviour` 组件的预制件。外观更改和所有其他背景参数都会作为 [Unity 事件](https://docs.unity3d.com/Manual/UnityEvents.html) 转发，因此您可以按需自由实现底层对象的行为。

![](https://i.gyazo.com/6483ef3e84549c1bbfbdffc6556308ea.png)

::: info NOTE
通用 Actor 实现只是转发来自剧本脚本的事件，底层行为需由用户自行实现，例如，Actor 应如何响应外观或可见性更改命令，是否以及如何适应纵横比变化等。不要指望大多数 Actor 相关功能能在通用实现中自动生效。
:::

要从模板创建通用背景预制件，请使用 `Create -> Naninovel -> Background -> Generic` 资产上下文菜单。

通用背景与通用角色非常相似；请查看有关将带动画的 3D 模型设置为通用角色的教程视频，了解其中一种可能的用法。请注意，该视频是使用旧版 Naninovel 录制的，一些属性和组件名称现在已不同；有关最新信息，请参阅上述文档。

![](https://www.youtube.com/watch?v=HPxhR0I1u2Q)

::: tip
当游戏对象在同一帧中启用/禁用时，Unity 的 `Animator` 组件可能无法注册 `SetTrigger`；如果您使用 `GameObject.SetActive` 处理可见性更改（如上述教程所示），请考虑改为启用/禁用带有渲染器的子对象。
:::

::: tip EXAMPLE
请查看 [通用 Actor 示例](/zh/guide/samples#通用-actor)，其中使用通用背景实现来承载动画精灵。
:::

## 场景背景

借助场景背景实现，您可以将 [Unity 场景](https://docs.unity3d.com/Manual/CreatingScenes) 用作背景。

场景背景配置有一个 `Scene Path Root` 选项，默认设置为 `Assets/Scenes`——这是 Actor 的场景资产应位于的目录。您可以更改它（例如，为每个 Actor 指定单独的文件夹）或保持原样。

![](https://i.gyazo.com/0f3c0be40941ad739f2c873c5fbf6e51.png)

::: info NOTE
场景背景的资源（外观）名称应等于场景资产相对于根目录的路径；例如，如果场景根目录是 `Assets/Scenes`，并且您有 `Assets/Scenes/Sphere.unity` 和 `Assets/Scenes/Sub/Cylinder.unity` 场景资产，则关联的外观将分别是 `Sphere` 和 `Sub/Cylinder`。
:::

在指定的根文件夹下创建一个新场景（或移动现有场景），并确保它至少有一个 [摄像机](https://docs.unity3d.com/ScriptReference/Camera.html) 组件附加到场景内的根游戏对象。加载场景背景时，Naninovel 会将渲染纹理分配给场景中找到的第一个摄像机。然后，渲染纹理将被分配给背景精灵，代表 Naninovel 场景空间内的场景背景。这样，场景背景将能够与其他背景和角色 Actor 共存，支持所有背景过渡效果，并通过缩放适配各种显示器纵横比。

请确保在世界空间中定位场景对象，使它们不会与可能同时加载的其他场景中的对象重叠（例如，在单个剧本脚本中引用时）。此外，请注意，如果场景背景对象位于全局空间原点（`x0 y0 z0`）附近，它可能会被 Naninovel 的主摄像机渲染；为了防止这种情况，请将所有场景对象从全局原点偏移，或者使用 `Configuration -> Engine -> Override Objects Layer` 通过 [层](https://docs.unity3d.com/Manual/Layers.html) 隔离 Naninovel 相关对象。

场景设置完成后，通过 `Naninovel -> Configuration -> Backgrounds` 菜单创建一个新的背景 Actor，选择 `SceneBackground` 实现并将场景资产添加到 Actor 资源中。

为场景背景 Actor 分配资源时，相应的场景资产应自动添加到 [构建设置](https://docs.unity3d.com/Manual/BuildSettings.html) 中；如果您收到场景资产未添加到构建中的错误，请尝试手动添加它。

您现在可以使用 [@back] 命令来控制创建的场景背景 Actor，例如：

```nani
; 显示带有“Sphere”Unity 场景内容的“Scene”背景 Actor。
@back Sphere id:Scene
; 使用“RandomCircleReveal”效果将 Actor 过渡到“Sub/Cylinder”。
@back Sub/Cylinder.RandomCircleReveal id:Scene
```

::: tip
在使用 Unity 场景组合背景时，请考虑添加 [自定义命令](/zh/guide/custom-commands) 来控制场景状态（例如，修改灯光颜色以改变昼夜时段或移动摄像机以更改视图），而不是为每个外观创建多个场景。这样，您就不必在加载多个场景时跟踪对象位置以防止重叠。
:::

::: tip EXAMPLE
有关设置场景背景的示例，请参阅 [场景背景示例](/zh/guide/samples#场景背景)。
:::

## 渲染到纹理

可以将所有实现（通用除外）的角色和背景 Actor 渲染到纹理资产，然后可以将其分配给自定义 UI、打印机、材质或任何其他兼容源。为背景 Actor 设置渲染到纹理的方式与角色非常相似；[查看指南](/zh/guide/characters#渲染到纹理) 以获取更多信息和示例。
