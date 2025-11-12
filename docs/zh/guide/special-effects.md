# 特效

Naninovel 提供了多种内置脚本指令用于实现各种特效。例如，[@shake] 指令可以让一个角色或摄像机产生震动效果：

```nani
; Shake 'Kohaku' actor
@shake Kohaku
```

大多数特效都支持参数化设置：

```nani
; Shake 'Kohaku' once (instead of the default 3)
@shake Kohaku count:1
```

你可以在不重新启动特效的情况下更新其参数：

```nani
; Start slowly shaking `Kohaku` actor in a loop
@shake Kohaku loop! power:0.1
Kohaku: It's rumbling!
; Shake 3 more times with an increased amplitude
@shake Kohaku count:3 power:0.8
```

某些特效默认是持续性的，必须通过显式指令停止：

```nani
; Start the rain
@rain
; Stop the rain
@rain power:0
```

以下将介绍内置特效的详细说明以及如何[添加自定义特效](/zh/guide/special-effects#adding-custom-effects)。

## 震动 Shake

对指定的角色或主摄像机进行震动。专用指令：[@shake]

![](https://i.gyazo.com/f9521fbcf959d0b72e449ae6e2191f9f.mp4)

**启动参数**

名称 | 类型 | 默认值 | 描述
--- | --- | --- | ---
ID | String | null | 要震动的角色 ID。指定 `Camera` 可震动主摄像机。
Shake count | Integer | 3 | 震动的迭代次数。
Loop | Boolean | false | 启用后，效果会持续循环，直到使用 [@despawn] 停止。
Shake duration | Decimal | 0.15 | 每次震动的基础持续时间（秒）。
Duration variation | Decimal | 0.25 | 应用于基础持续时间的随机变化系数。
Shake amplitude | Decimal | 0.5 | 每次震动的基础位移幅度（单位）。
Amplitude variation | Decimal | 0.5 | 应用于基础位移幅度的随机变化系数。
Shake horizontally | Boolean | false | 是否在水平方向（X 轴）震动。
Shake vertically | Boolean | true | 是否在垂直方向（Y 轴）震动。

**示例**

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

## 动画化演出元素

要在一系列关键帧间平滑地改变（插值）演出元素的特定参数，可以使用 [@animate] 指令作为一种“快捷简易”的方案。

![](https://i.gyazo.com/a0494329c713c4309a52d57d0b297bee.mp4)

::: info 注意
场景脚本并非为动画编排而设计。若有可能，请优先使用更专业的动画系统，例如 Unity 的 [Animator](https://docs.unity3d.com/Manual/class-Animator.html) 或第三方动画工具。  
你可以通过 [分层角色](https://naninovel.com/guide/characters#layered-characters) 和 [通用角色](https://naninovel.com/guide/characters#generic-characters) 集成任何动画方案；此外，Naninovel 还内置支持 [Live2D](https://naninovel.com/guide/characters#live2d-characters) 与 [Spine](https://naninovel.com/guide/characters#spine-characters) 角色。
:::

## 数码干扰 Digital Glitch

对主摄像机应用一种后处理效果，用以模拟数码视频信号的失真与杂波。专用指令：[@glitch]

![](https://i.gyazo.com/94cb6db25c17956473db4de149281df5.mp4)

**启动参数**

名称 | 类型 | 默认值 | 描述
--- | --- | --- | ---
Duration | Decimal | 1 | 效果持续时间（秒）。
Intensity | Decimal | 1 | 效果强度，范围为 0.0 到 10.0。

**示例**

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

## 雨效 Rain

生成一个模拟降雨的粒子系统。专用指令：[@rain]

![](https://i.gyazo.com/74af9eec30f6517ea5b8453a9c86d33c.mp4)

**启动参数**

名称 | 类型 | 默认值 | 描述
--- | --- | --- | ---
Intensity | Decimal | 0.5 | 雨势强度（每秒生成的粒子数量）。
Fade-in time | Decimal | 5 | 粒子系统将在指定的秒数内逐渐将生成速率从 0 提升至目标值。
X velocity | Decimal | 1 | 粒子的水平速度倍率。可用于调整雨滴的倾斜角度。
Y velocity | Decimal | 1 | 粒子的垂直速度倍率。

**停止参数**

名称 | 类型 | 默认值 | 描述
--- | --- | --- | ---
Fade-out time | Decimal | 5 | 粒子系统将在指定的秒数内逐渐将生成速率从目标值降低至 0。

**示例**

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

## 雪效 Snow

生成一个模拟下雪的粒子系统。专用指令：[@snow]

![](https://i.gyazo.com/25a052444c561e40c8318272f51edf47.mp4)

**启动参数**

名称 | 类型 | 默认值 | 描述
--- | --- | --- | ---
Intensity | Decimal | 0.5 | 雪势强度（每秒生成的粒子数量）。
Fade-in time | Decimal | 5 | 粒子系统将在指定的秒数内逐渐将生成速率从 0 提升至目标值。

**停止参数**

名称 | 类型 | 默认值 | 描述
--- | --- | --- | ---
Fade-out time | Decimal | 5 | 粒子系统将在指定的秒数内逐渐将生成速率从目标值降低至 0。

**示例**

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

## 光束 Sun Shafts

生成一个模拟阳光光束（光线散射）的粒子系统。专用指令：[@sun]

![](https://i.gyazo.com/7edc4777699229abc508f2bdb404522e.mp4)

**启动参数**

名称 | 类型 | 默认值 | 描述
--- | --- | --- | ---
Intensity | Decimal | 0.85 | 光线强度（不透明度）。
Fade-in time | Decimal | 3 | 粒子系统将在指定秒数内逐渐将光线强度从 0 增加到目标值。

**停止参数**

名称 | 类型 | 默认值 | 描述
--- | --- | --- | ---
Fade-out time | Decimal | 3 | 粒子系统将在指定秒数内逐渐将光线强度（不透明度）从目标值降低至 0。

**示例**

```nani
; Start intensive sunshine over 10 seconds
@spawn SunShafts params:1,10
; Same with the dedicated command
@sun power:1 time:10

; Stop the sunshine over 30 seconds
@despawn SunShafts params:30
@sun power:0 time30
```

## 景深 Bokeh / Depth of Field

模拟景深（又称 DOF、虚化）效果，使焦点对象保持清晰，而其他区域产生模糊。专用指令：[@bokeh]

::: tip
如果你只想模糊单个对象（演员），请考虑使用 [模糊效果](/zh/guide/special-effects#blur)。
:::

![](https://i.gyazo.com/616a023c46f207b4a3a33d3d3fd9fbc9.mp4)

**启动参数**

名称 | 类型 | 默认值 | 描述
--- | --- | --- | ---
Focus Object Name | String | null | 要对焦的游戏对象名称（可选）。如果设置，该对象将始终保持对焦，`Focus Distance` 参数将被忽略。
Focus Distance | Decimal | 10 | 从 Naninovel 摄像机到焦点的距离。当设置了 `Focus Object Name` 时将被忽略。
Focal Length | Decimal | 3.75 | 对失焦区域应用的模糊强度；同时决定焦点敏感度。
Duration | Decimal | 1 | 插值时间（参数到达目标值的速度）。

**停止参数**

名称 | 类型 | 默认值 | 描述
--- | --- | --- | ---
Stop Duration | Decimal | 1 | 效果淡出的持续时间，用于让参数回归默认值，从而使效果消失。

**示例**

```nani
; Enable the effect with default params and lock focus to `Kohaku` game object
@spawn DepthOfField params:Kohaku
; Same with the dedicated command
@bokeh Kohaku

; Fade-off (disable) the effect over 10 seconds
@despawn DepthOfField params:10
; Same with the dedicated command
@bokeh power:0

; Set focus point 10 units away from the camera,
; focal length to 0.95 and apply it over 3 seconds
@spawn DepthOfField params:,10,0.95,3
; Same with the dedicated command
@bokeh dist:10 power:0.95 time:3
```

## 模糊 Blur

为支持的演员应用模糊滤镜：背景和角色（包括精灵、分层、切片、Live2D、Spine、视频及场景实现）。默认情况下（当未指定第一个参数时），效果将应用于 `MainBackground` 演员。专用指令：[@blur]

![](https://i.gyazo.com/067614d77783683e74ca79652099b58d.mp4)

**启动参数**

名称 | 类型 | 默认值 | 描述
--- | --- | --- | ---
Actor ID | String | MainBackground | 要应用模糊效果的演员 ID。演员必须实现 `IBlurable` 接口才能支持该效果。
Intensity | Decimal | 0.5 | 效果强度，范围为 0.0 到 1.0。
Duration | Decimal | 1 | 插值时间（以秒为单位），即强度达到目标值的速度。

**停止参数**

名称 | 类型 | 默认值 | 描述
--- | --- | --- | ---
Stop Duration | Decimal | 1 | 效果淡出的持续时间（以秒为单位）。

**示例**

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

## 添加自定义特效

### 独立特效

你可以通过在生成资源管理器（`Naninovel -> Resources -> Spawn`）中添加特效预制体（如内置的 “Rain” 和 “Snow” 特效）来添加自定义独立特效，并使用 [@spawn] 和 [@despawn] 指令进行控制：

![](https://i.gyazo.com/45b9d8fb51ffb368ff9f792221f10ca6.png)

例如，假设通过生成管理器分配了一个名为 `Explosion.prefab` 的预制体，以下指令将在场景中生成并销毁该预制体：

```nani
@spawn Explosion
@despawn Explosion
```

可以使用 `params` 来指定额外的特效参数：

```nani
@spawn Explosion params:Kohaku,3,true
```

::: tip
当创建具有多个参数的自定义特效时，建议编写一个 [自定义指令](/zh/guide/custom-commands)，并继承自 `SpawnEffect`。这样一来，你就不必记住 `params` 数组中的参数位置，同时在使用 [IDE 扩展](/zh/guide/ide-extension) 时还能获得自动补全和类型检查功能。

```nani
@explode Kohaku power:3 smoke!
```
:::

[@spawn] 指令还支持变换参数，可用于在特定场景或世界位置生成对象，并指定其旋转或缩放，例如：

```nani
; Spawn Explosion 15% from the left border of the screen
; with x10 scale and rotated by 15 degrees over z-axis.
@spawn Explosion pos:15 scale:10 rotation:,,15
```

如果你有大量需要生成的预制体，通过编辑器菜单手动分配会很不方便，可以直接将它们放在 `Resources/Naninovel/Spawn` 文件夹中，它们将自动在脚本中可用。你也可以使用子文件夹来组织这些预制体；这种情况下，在 naninovel 脚本中引用时使用正斜杠（`/`）。例如，若预制体资源存放路径为 `Resources/Naninovel/Spawn/Explosions/Boom01`，则可在脚本中通过 `Explosions/Boom01` 进行引用。

也可以使用 [可寻址资源系统](/zh/guide/resource-providers#addressable) 手动公开资源。要公开某个资源，请为其分配一个与上面方法中使用的路径相同的地址，但省略 “Resources/” 部分。例如，要公开一个名为 “Boom01” 的预制体资源，请将其地址设为：`Naninovel/Spawn/Boom01`。请注意，Addressable 提供器在编辑器中默认未启用；你可以在资源提供器配置菜单中启用 `Enable Addressable In Editor` 选项以允许其在编辑器中使用。

可参考 `Naninovel/Prefabs/FX` 中的内置特效预制体了解示例实现。

### 摄像机特效

如果你希望在 Naninovel 摄像机上应用自定义的 [后期处理特效](https://assetstore.unity.com/?q=post%20processing&orderBy=1)（又称图像特效或摄像机滤镜，例如内置的 “Digital Glitch” 特效），可以 [创建一个摄像机预制体](https://docs.unity3d.com/Manual/CreatingPrefabs.html)，在摄像机对象上 [添加所需的特效组件](https://docs.unity3d.com/Manual/UsingComponents.html)，然后在摄像机配置菜单（`Naninovel -> Configuration -> Camera`）中将其分配到 `Custom Camera Prefab` 字段。

![](https://i.gyazo.com/6024aac1d2665dd96915758cd5c09fde.png)

你可以在 naninovel 脚本中使用 [@camera] 指令的 `toggle` 参数来切换（启用或禁用）所添加的组件，或使用 `set` 参数显式设置组件的启用状态。例如，假设你在摄像机对象上添加了一个 “Bloom Image Effect” 组件。首先，查看组件的类型名称；通常在组件的 `Script` 字段中显示。

![](https://i.gyazo.com/73b7eabfe97ed84796cbe715b7dafc14.png)

在本例中，组件的类型名称为 `BloomImageEffect`。你可以使用该类型名称在运行时切换此组件，如下所示：

```nani
@camera toggle:BloomImageEffect
```

你可以通过用逗号分隔类型名称来同时切换多个组件：

```nani
@camera toggle:BloomImageEffect,Sepia,CameraNoise
```

如果你想显式启用或禁用某个组件，可以这样做：

```nani
@camera set:BloomImageEffect.true,Sepia.false,CameraNoise.true
```

— 这将启用 `BloomImageEffect` 和 `CameraNoise` 组件，同时禁用 `Sepia`。

要切换、禁用或启用摄像机对象上附加的所有组件，可使用 `*` 符号。

```nani
; Toggle all components
@camera toggle:*

; Disable all components
@camera set:*.false

; Enable all components
@camera set:*.true
```

当前启用（或禁用）的摄像机组件状态会在游戏的保存与加载操作中自动保存并恢复。

可查看以下视频了解如何为摄像机添加自定义滤镜特效的示例：

![](https://www.youtube.com/watch?v=IbT6MTecO-k)
