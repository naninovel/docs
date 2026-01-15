# 背景

与 [角色](/zh/guide/characters) 相对，背景是用于表示场景 *后* 层的 actor：位置、风景、景观或任何应始终出现在角色 *后面* 的东西。

背景 actor 由名称、外观、可见性和变换（位置、旋转、缩放）定义。它可以随时间改变外观、可见性和变换。

可以使用 `Naninovel -> Configuration -> Backgrounds` 上下文菜单配置背景的行为；有关可用选项，请参阅 [配置指南](/zh/guide/configuration#背景)。可以使用 `Naninovel -> Resources -> Backgrounds` 上下文菜单访问背景的资源管理器。

在剧本脚本中，背景主要通过 [@back] 命令控制：

```nani
; 将 "River" 设置为主背景的外观
@back River

; 与上面相同，但也使用 "RadialBlur" 过渡效果
@back River.RadialBlur
```

背景的处理方式与角色略有不同，以更好地适应传统的视觉小说游戏流程。大多数时候，您可能会在场景中拥有一个背景 actor，它会不断过渡到不同的外观。为了消除在脚本中重复相同 actor ID 的麻烦，可以仅提供背景外观和过渡类型（可选）作为无名参数，假设 `MainBackground` actor 是要受影响的 actor。如果不是这种情况，可以通过 `id` 参数显式提供背景 actor 的 ID：

```nani
; 假设有一个带有 "Night" 和 "Day" 视频剪辑的 "CityVideo" actor。

; 显示播放白天剪辑的视频背景。
@back Day id:CityVideo

; 使用波纹效果过渡到夜晚剪辑。
@back Night.Ripple id:CityVideo

; 隐藏视频背景。
@hide CityVideo
```

主背景 actor 记录默认在背景资源管理器中创建，无法重命名或删除；但是，主背景的参数（实现、轴心、PPU 等）可以自由更改。

查看以下视频教程以了解背景 actor 的概述。

![](https://www.youtube.com/watch?v=X2iyGSCpnJs)

## Actor 记录

如果您有很多背景或背景外观，并且通过编辑器菜单分配它们不方便，请使用 actor 记录资产 (`Create -> Naninovel -> Actor Record -> Background`)。它们支持多重编辑，并允许您使用文件夹组织记录。查看下面的视频以获取示例。

![](https://www.youtube.com/watch?v=2YP-36THHvk)

要将外观资源与 actor 记录相关联，请使用 [Addressable 资产系统](/zh/guide/resource-providers#addressable)。例如，要将 "Beach" 外观与 `MainBackground` 相关联，请为纹理资产分配地址 `Naninovel/Backgrounds/MainBackground/Beach` 并添加 `Naninovel` 标签。有关使用 Addressable 提供者的更多详细信息，请参阅 [资源提供者文档](/zh/guide/resource-providers#addressable)。

## Z 顺序

同时显示多个背景时，它们往往会相互覆盖：

```nani
@back id:1
@back id:2
```

— 如果背景 `1` 和 `2` 都是全屏不透明纹理，则后面添加的一个将完全覆盖另一个。要在另一个背景后面显示第一个背景，请隐藏另一个背景或更改 z 位置（深度）以更改绘制顺序：

```nani
; 隐藏背景 2 以显示后面的第一个背景
@back id:2 !visible
; 还有一个专门的命令来隐藏 actor
@hide 2

; 或者，更改 z 位置
@back id:1 pos:,,98
@back id:2 pos:,,99
```

较高的 z 位置会导致距相机的距离更远；因此，放置在离相机更近的 actor 将渲染在另一个之上。

背景默认放置有特定的 z 偏移，使其显示在其他 actor 类型后面。可以通过背景设置中的 `Z Offset` 属性更改偏移值。

为了防止 z-fighting 问题，背景在首次添加（显示）时会在 z 轴上进一步相互偏移。偏移量由 `Z Step` 设置控制。

## 匹配模式

当 [相机](https://docs.unity3d.com/Manual/class-Camera.html) 在正交模式下渲染且背景 actor 配置中的 `Match Mode` 未禁用时，actor 将尝试将其大小与当前屏幕大小匹配。这样做是为了处理显示 [纵横比](https://en.wikipedia.org/wiki/Aspect_ratio_(image)) 与背景不同的情况。当匹配被禁用且纵横比不同时，会出现“黑边”。

![](https://i.gyazo.com/46619a08e3b91441cf30800185932963.png)

虽然对于独立（PC、Mac、Linux）构建，您可以在 [播放器设置](https://docs.unity3d.com/Manual/class-PlayerSettingsStandalone.html#Resolution) 中限制可用的纵横比，但在 Web、控制台和移动设备上是不可能的，应用程序必须适应目标设备。

可以为每个背景 actor 设置以下匹配模式（通用实现除外）：

| 模式 | 描述 |
|------|-------------|
| Crop | 背景将始终占据整个相机视锥体，确保无论显示纵横比如何，玩家都看不到黑边；但是，某些背景区域可能会被裁剪。默认为新背景 actor 设置。 |
| Fit | 整个背景区域将始终保持可见，但当纵横比不同时会出现黑边。 |
| Custom | 允许使用自定义比率匹配宽度或高度。比率由 `Custom Match Ratio` 属性控制：最小值 (0) 将匹配宽度并忽略高度，最大值 (1) — 反之亦然。 |
| Disable | 不执行任何匹配。 |

::: tip
如果您希望为通用或自定义背景实现类似的匹配功能，请参阅论坛上的 [缩放到屏幕示例](https://discord.com/channels/545676116871086080/1369983634236379240)。
:::

## 姿势 (Poses)

每个背景都有 `Poses` 属性，允许指定命名状态（姿势）。

姿势名称可以用作 [@back] 命令中的外观，以一次应用姿势中指定的所有选定参数，而不是通过命令参数单独指定它们。

```nani
; 假设为主背景定义了 "Day" 姿势，
; 应用姿势中指定的所有选定参数。
@back Day

; 与上面相同，但针对具有 "City" ID 的背景 actor
; 并在 3 秒内使用 "DropFade" 过渡。
@back Day.DropFade id:City time:3
```

请注意，当姿势用作外观时，您仍然可以覆盖单个参数，例如：

```nani
; 假设为主背景定义了 "Day" 姿势，
; 应用姿势状态中指定的所有参数，
; 除了 tint，它在命令中被覆盖。
@back Day tint:#ff45cb
```

## 占位符背景

占位符实现是默认实现，用于在您还没有任何视觉资产来表示背景时起草剧本。它会在运行时程序生成背景外观，以便您在处理剧本时跟踪当前显示的内容。下面是一个占位符 "EveningScene" 背景的示例，上面有几个 [占位符角色](/zh/guide/characters#占位符角色)。

![](https://i.gyazo.com/cebb0506d3743e2e1b20b1d3c214239a.png)

虽然 Naninovel 会自动生成背景占位符，但您可以通过背景编辑器中的 `Placeholder Appearances` 列表定义特定外观的样子。

![](https://i.gyazo.com/183dcc86fbf0d01de49d85d45686571f.png)

## 精灵背景

背景 actor 的精灵实现是最常见和最简单的；它使用一组包裹在四边形网格（精灵）上的 [纹理](https://docs.unity3d.com/Manual/Textures.html) 资产来表示背景的外观。纹理可以基于 `.jpg`、`.png`、`.tiff`、`.psd` 或任何其他 [Unity 支持](https://docs.unity3d.com/Manual/ImportingTextures) 的图像文件格式。

::: tip
选择最适合您的开发工作流程的文件格式。构建项目时，Unity 会自动将所有源资源（纹理、音频、视频等）转换为最适合目标平台的格式，因此您最初在项目中存储资源的格式不会产生影响。在 [官方文档](https://docs.unity3d.com/Manual/AssetWorkflow) 中查找有关 Unity 如何管理项目资产的更多信息。
:::

场景中精灵背景网格的初始（未缩放）大小取决于参考分辨率（相机配置）、背景的 `Pixel Per Unit` 属性（在配置菜单中为每个背景 actor 设置）和源纹理分辨率。

Naninovel 默认会尝试使背景覆盖整个相机视锥体，因此请确保调整源纹理的大小，使纵横比等于参考分辨率；有关如何更改或禁用此行为的更多信息，请参阅 [匹配模式指南](/zh/guide/backgrounds#匹配模式)。

::: tip
在开始制作艺术资产（角色和背景）之前，请与您的团队定义参考分辨率。这样，艺术家就能够以正确的尺寸创作资产，您以后就不必编辑它们了。
:::

## 切片精灵背景

使用开源 [SpriteDicing](https://github.com/elringus/SpriteDicing) 包构建，`DicedSpriteBackground` 实现允许通过在相关纹理包含大部分相似数据时重用背景精灵的纹理区域来显着减小构建大小和纹理内存。

切片背景与切片角色实现非常相似；有关设置和使用说明，请参阅 [切片角色指南](/zh/guide/characters#切片精灵角色)。

## 视频背景

视频背景使用循环的 [视频剪辑](https://docs.unity3d.com/Manual/class-VideoClip) 资产来表示外观。

有关每个平台支持的视频格式，请参阅 [Unity 视频源文档](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility.html)。使用带有 alpha 通道（透明度）的视频时，请参阅 [支持格式指南](https://docs.unity3d.com/Manual/VideoTransparency.html)。

::: info NOTE
在视频资产导入设置中禁用 `Transcode` 时，剪辑可能无法在某些平台上播放。当视频未在构建中播放时，请尝试启用转码选项并重建播放器。

![](https://i.gyazo.com/9c3fb59dc8ebb2fbd0f5a5e79542e11f.png)
:::

::: tip EXAMPLE
如果无法实现无缝循环，请确保视频具有完全相同的开始和结束帧以及兼容的编码设置；请查看我们的 [视频 actor 示例](/zh/guide/samples#视频-actor) 以供参考。
:::

为了防止特定外观循环，请将 `NoLoop`（不区分大小写）附加到外观名称。

### WebGL 限制

在 WebGL 上，Unity 的视频播放器只能在流式传输模式下工作，因此构建 WebGL 播放器时，所有视频资源都将被复制到 `Assets/StreamingAssets/Backgrounds` 文件夹。**StreamingAssets** 文件夹也会出现在构建输出目录中；发布构建时请务必保留它，并检查您的 Web 服务器是否允许读取此文件夹中的数据。

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

## 分层背景

分层实现允许从多个精灵（层）组合背景，然后在运行时通过剧本脚本单独切换它们。

::: tip
分层 actor 实现一直在发展，目前是最灵活的，支持所有渲染功能（与通用相反）。即使您不想使用层表达式，而是使用 Unity 的 Animator 或其他自定义系统控制外观；或者需要渲染非平凡的对象，例如粒子系统和/或利用第三方渲染器，在诉诸通用或自定义实现之前，请检查分层 actor 可用的 [仅渲染](/zh/guide/characters#外包外观管理) 和 [相机渲染](/zh/guide/characters#相机渲染) 选项。
:::

要创建分层背景预制件，请使用 `Create -> Naninovel -> Background -> Layered` 资产上下文菜单。进入 [预制件编辑模式](https://docs.unity3d.com/Manual/EditingInPrefabMode.html) 以组合层。默认情况下将创建几个层和组。您可以使用它们或删除并添加您自己的。

分层背景与 [分层角色](/zh/guide/characters#分层角色) 非常相似；有关如何通过剧本脚本设置和控制它们的更多信息，请参阅文档。

不要忘记 [@back] 命令中的无名参数期望外观和过渡类型（而不是像 [@char] 命令那样的 ID 和外观），因此请按以下方式指定层组合表达式：

```nani
; 假设有 "LayeredForest" 背景 actor
@back Group>Layer,Other/Group+Layer,-RootLayer.TransitionType id:LayeredForest
```

## 通用背景

通用背景是最灵活的背景 actor 实现。它基于一个附加了 `Generic Background Behaviour` 组件到根对象的预制件。外观更改和所有其他背景参数都路由为 [Unity 事件](https://docs.unity3d.com/Manual/UnityEvents.html)，允许以任何您希望的方式实现底层对象的行为。

![](https://i.gyazo.com/6483ef3e84549c1bbfbdffc6556308ea.png)

::: info NOTE
通用 actor 实现只是路由来自剧本脚本的事件，由用户来实现底层行为，例如，actor 应如何响应外观或可见性更改命令，是否以及如何适应纵横比更改等。不要指望大多数 actor 相关的功能会自动与通用实现一起工作。
:::

要从模板创建通用背景预制件，请使用 `Create -> Naninovel -> Background -> Generic` 上下文资产菜单。

通用背景与通用角色非常相似；查看有关将动画 3D 模型设置为通用角色的教程视频，了解可能的用法示例之一。请注意，该视频是使用旧版 Naninovel 录制的，一些属性和组件名称现在已不同；有关最新信息，请参阅上述文档。

![](https://www.youtube.com/watch?v=HPxhR0I1u2Q)

::: tip
当游戏对象在同一帧中启用/禁用时，Unity 的 `Animator` 组件可能无法注册 `SetTrigger`；如果您使用 `GameObject.SetActive` 处理可见性更改（如上教程所示），请考虑改为启用/禁用带有渲染器的子对象。
:::

::: tip EXAMPLE
查看 [通用 actor 示例](/zh/guide/samples#通用-actor-generic-actor)，其中使用通用背景实现来托管动画精灵。
:::

## 场景背景

您可以使用 [Unity 场景](https://docs.unity3d.com/Manual/CreatingScenes) 作为带有场景背景实现的背景。

场景背景配置有一个默认设置为 `Assets/Scenes` 的 `Scene Root Path` 选项 — 这是 actor 的场景资产预期所在的目录。您可以更改它（例如为每个 actor 指定单独的文件夹）或保持原样。

![](https://i.gyazo.com/0f3c0be40941ad739f2c873c5fbf6e51.png)

::: info NOTE
场景背景的资源（外观）名称应等于场景资产相对于根目录的路径；例如，如果场景根目录是 `Assets/Scenes`，并且您有 `Assets/Scenes/Sphere.unity` 和 `Assets/Scenes/Sub/Cylinder.unity` 场景资产，则关联的外观将分别是 `Sphere` 和 `Sub/Cylinder`。
:::

在指定的根文件夹下创建一个新场景（或移动现有场景），并确保它至少有一个 [相机](https://docs.unity3d.com/ScriptReference/Camera.html) 组件附加到场景内的根游戏对象。加载场景背景时，Naninovel 会将渲染纹理分配给场景中找到的第一个相机。然后，渲染纹理将被分配给背景精灵，代表 Naninovel 场景空间内的场景背景。这样，场景背景将能够与其他背景和角色 actor 共存，支持所有背景过渡效果并缩放以处理各种显示纵横比。

确保在世界空间中定位场景对象，使它们不会与可能同时加载的其他场景中的对象重叠（例如，在单个剧本脚本中引用时）。此外，请注意，如果场景背景对象位于全局空间原点 (`x0 y0 z0`) 附近，它可能会被 Naninovel 的主相机渲染；为了防止这种情况，请将所有场景对象从全局原点偏移，或者使用 `Configuration -> Engine -> Override Objects Layer` 使用 [层](https://docs.unity3d.com/Manual/Layers.html) 隔离 Naninovel 相关对象。

场景设置完成后，通过 `Naninovel -> Configuration -> Backgrounds` 菜单创建一个新的背景 actor，选择 `SceneBackground` 实现并将场景资产添加到 actor 资源中。

为场景背景 actor 分配资源时，相应的场景资产应自动添加到 [构建设置](https://docs.unity3d.com/Manual/BuildSettings.html) 中；如果您收到场景资产未添加到构建中的错误，请尝试手动添加它。

您现在可以使用 [@back] 命令来控制创建的场景背景 actor，例如：

```nani
; 显示带有 "Sphere" Unity 场景内容的 "Scene" 背景 actor。
@back Sphere id:Scene
; 使用 "RandomCircleReveal" 效果将 actor 过渡到 "Sub/Cylinder"。
@back Sub/Cylinder.RandomCircleReveal id:Scene
```

::: tip
在使用 Unity 场景组合背景时，请考虑添加 [自定义命令](/zh/guide/custom-commands) 来控制场景状态（例如，修改灯光颜色以更改一天中的时间或移动相机以更改视图），而不是为每个外观创建多个场景。这样，您就不必在加载多个场景时跟踪对象位置以防止重叠。
:::

::: tip EXAMPLE
在 [场景背景示例](/zh/guide/samples#场景背景) 中查找有关设置场景背景的示例。
:::

## 渲染到纹理

可以将所有实现（通用除外）的角色和背景 actor 渲染到纹理资产，然后可以将其分配给自定义 UI、打印机、材质或任何其他兼容源。设置背景 actor 渲染到纹理与角色非常相似；[查看指南](/zh/guide/characters#渲染到纹理) 以获取更多信息和示例。
