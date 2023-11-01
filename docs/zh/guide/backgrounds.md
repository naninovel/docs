# 背景

和[角色](/zh/guide/characters) 相反，背景是用来表示场景*置后层*的元素：位置，风景或应始终出现在角色*后面*的任何东西。

背景元素使用名称，外观，可见性和变换（位置，旋转，比例）定义。它们可以随着时间改变其外观，可见性和各种形态改变。

通过 `Naninovel -> Configuration -> Backgrounds` 菜单来配置背景行为表现，相关配置信息参考[属性配置](/zh/guide/configuration#背景)。 可以使用`Naninovel -> Resources -> Backgrounds`菜单访问背景的资源配置管理器。

![](https://i.gyazo.com/cccd08280dac72d199ea3465bc167a22.gif)

在通过编辑器菜单添加多个背景的时候，可能并不方便，在`Resources/Naninovel/Backgrounds`目录下直接拖入资源，将其用ID命名的文件夹分类，这样添加也是可以的。比如添加"MainBackground" ID的元素背景，就需要放在`Resources/Naninovel/Backgrounds/MainBackground`目录下，他们就会被自动被注册至脚本。

你也可以通过子文件夹来管理相应资源。脚本中需要使用(`/`)调用。比如`Resources/Naninovel/Backgrounds/MainBackground/Events/CG251`的资源，脚本中的调用为：`Events/CG251`。

使用[可寻址资源系统](/zh/guide/resource-providers#寻址资源系统) 来手动公开资源也是可以的。公开资源地址和上述相同，但是需要省略"Resources/"部分。比如将"Beach"注册到"MainBackground"背景下，地址为`Naninovel/Backgrounds/MainBackground/Beach`。注意，该系统默认不启用你可以通过资源配置菜单的`Enable Addressable In Editor`属性来启用。

在naninovel脚本中，背景大部分由[@back] 命令控制：

```nani
; 将 `River` 设为主背景外观
@back River

; 同上，但是使用`RadialBlur`（径向模糊）特效
@back River.RadialBlur
```

背景处理和角色有略微不同以适应传统VN游戏流程。多数情况，都只需要一个背景元素显示，然后由其变化至两外一张。为了避免在脚本中使用相同的元素ID的麻烦，在使用`MainBackground` ID下的元素的时候，可以只用外观名称和过渡效果类型（可选），来调用背景。而其他ID下的背景，则`id` 必须定义了，如下所示：

```nani
; 给定`CityVideo`背景元素下的`Night`和`Day`背景（影片剪辑）

; 显示视频背景，播放白天的影片剪辑
@back Day id:CityVideo

; 变化至晚上的影片剪辑，使用波浪效果
@back Night.Ripple id:CityVideo

; 隐藏视频背景
@hide CityVideo
```

资源管理器中的主背景元素条目是不能被重命名或删除的。但其中的参数（实现，锚点，PPU等）可以任意修改。


## 姿态

每个背景都有`Poses`属性允许指定特定命名状态（姿势）。

姿态使用通过[@back]命令直接调用，如此就可以将姿态的所有设置参数应用于背景上，而非通过单个背景设置其参数，如下所示：


```nani
; `Day`的姿态配置用于主背景，
; 将该姿态的所有参数应用于背景。pose state.
@back Day

; 同上，但是为`City` ID下的背景，
; 使用3s的`DropFade`过渡效果。
@back Day id:City transition:DropFade time:3
```

请注意，将姿态用作外观时，仍然可以覆盖各个参数，例如：

```nani
; `Day`的姿态配置用于主背景，
; 将该姿态的所有参数应用于背景，
; 除了着色，由下面的命令来覆写控制。
@back Day tint:#ff45cb
```

## 图片精灵背景

精灵背景是最通用也是最简单的，使用单个[精灵](https://docs.unity3d.com/Manual/Sprites) 作为背景。资源类型可为`.jpg` 或 `.png`图像文件。


## 影片背景

硬盘背景使用[影片剪辑](https://docs.unity3d.com/Manual/class-VideoClip) 来表现背景。

影片背景可以通过编辑器GUI来管理。

各个平台支持的视频格式参考[Unity视频资源格式说明](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility.html) 。

作为参考，以下为我们在WebGL的demo上使用的视频详细参数：

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

以下为Unity的视频导入设置图：


![](https://i.gyazo.com/9e6a9cc0bd79bca2c0e8e35666fbdc7f.png)

视发布平台不同，需要看情况勾选转码设置：

::: tip EXAMPLE
如果不能无缝循环，请保证视频最后一帧和第一张是相同的，并且编码格式正确；参考我们的[视频循环示例](https://github.com/Naninovel/Video) 。
:::

注意，在WebGL下视频播放只能使用流模式，所以发布至WebGL时，所有视频资源都会被拷贝至`Assets/StreamingAssets/Backgrounds`文件夹。**StreamingAssets**也会出现在项目输出目录；请确保保留由该文件夹，并检查你的web服务器允许读取该目录。

## 多图层背景

多图层背景允许组合不同层背景，在运行时通过Naninovel独立切换。

要创建该类型背景，使用
To create a layered background prefab, use `Create -> Naninovel -> Background -> Layered` 菜单，进入[预制体编辑模式](https://docs.unity3d.com/Manual/EditingInPrefabMode.html) 来组合图层。默认会创建有多个图层，你可以使用或直接删除这些添加自己的。

多图层背景和[多图层人物](/zh/guide/characters#分层式人物) 类似。关于如何设置和通过脚本调用，可以参考上述链接。

不要忘了[@back]命令的无名参数是默认为外观和过渡效果类型（而非和[@char]命令一样的ID和外观），所以如下所示的方式来指定相应资源表现：


```nani
;  "LayeredForest" 的多图层背景调用
@back Group>Layer,Other/Group+Layer,-RootLayer.TransitionType id:LayeredForest
```

## 传统模型背景

传统背景是最灵活的背景元素实现。在根物体上关联有`BackgroundActorBehaviour`组件。外观改变或其他参数修改都通过[Unity事件](https://docs.unity3d.com/Manual/UnityEvents.html) 实现，你可以借此实现任何你想要的表现。


![](https://i.gyazo.com/d8f86c83decfb3c40c8d23602214a743.png)

通过菜单`Create -> Naninovel -> Background -> Generic`来创建模板预制体。

传统背景和传统人物类似，观看视频教程了解如何设置有动作的3D模型为传统人物。


![](https://www.youtube.com/watch?v=HPxhR0I1u2Q)

## 场景背景

你可以使用[Unity场景](https://docs.unity3d.com/Manual/CreatingScenes) 作为背景来表现场景。

场景背景仅可以通过编辑器GUI来管理；场景资源存储于`Assets/Scenes`目录。


首先，创建一个（或是移动已有）场景到`Assets/Scenes`目录下，确保场景中至少有一个[摄像机](https://docs.unity3d.com/ScriptReference/Camera.html)。 加载场景背景时，Naninobel会自动为第一个找到的摄像机绑定render texture，之后会将其绑定到背景精灵上，再现到相应场景的背景图层。这样，场景背景就能够和其他背景角色元素共存，并能支持各种过渡效果，和各种显示比例。

确保场景中物体在合适位置，以避免和其他同时加载的场景的物体相互遮挡（比如，在同一个脚本中调用时）。此外，请注意，如果场景背景对象位于全局空间原点（x0 y0 z0）附近，则由Naninovel的主摄像头渲染该对象。为避免这一情况，调整物体偏移远离原点，或是`Configuration -> Engine -> Override Objects Layer`菜单中调整相关物体[层级](https://docs.unity3d.com/Manual/Layers.html)。

在场景完成后，通过`Naninovel -> Configuration -> Backgrounds`菜单创建新背景元素，选择`SceneBackground`将其添加到此。

![](https://i.gyazo.com/d69159ab4d93793022018fa8d244f1aa.png)

在注册场景背景资源时，[build settings](https://docs.unity3d.com/Manual/BuildSettings.html) 应该会自动添加该场景，如果报错提示未添加，请检查并手动添加。

你可以使用[@back]来控制创建场景背景元素，如下：


```nani
@back SceneName id:ActorId
```
