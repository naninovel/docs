# 过渡效果

在使用 [@back] 与 [@char] 指令切换背景或角色外观，或使用 [@trans] 指令执行场景过渡时，可以额外指定使用的过渡效果。例如，以下指令将以 “DropFade” 过渡效果切换到 “River” 背景：

```nani
@back River.DropFade
```

当未指定过渡效果时，系统默认使用交叉淡入淡出（Cross-Fade）效果。

还可以通过 `time` 参数指定过渡持续时间（秒）：

```nani
@back River.DropFade time:1.5
```

上述语句将在 1.5 秒内以 “DropFade” 过渡方式切换到 “River” 背景。所有过渡的默认 `time` 值为 **0.35 秒**。

若希望在过渡完成后再执行下一条指令，请添加 `wait!`：

```nani
@back River.Ripple time:1.5 wait!
@bgm PianoTheme
```

— “PianoTheme” 背景音乐将仅在过渡完成后开始播放。

部分过渡效果还支持额外参数，可通过 `params` 参数进行控制：

```nani
@back River.Ripple params:10,5,0.02
```

— 此指令将设置波纹效果频率为 10、速度为 5、振幅为 0.02。当未指定 `params` 时，将使用默认参数。

若仅需修改部分参数，可以省略其他参数，它们将使用默认值：

```nani
@back River.Ripple params:,,0.02
```

所有过渡参数均为 **小数类型**。

以上示例同样适用于角色，只需通过独立的 `transition` 参数指定过渡效果：

```nani
@char CharID.Appearance transition:TransitionType params:...
```

可在下方文档中查阅可用的过渡效果、其可配置参数及默认值。

## BandedSwirl（带状漩涡）

![](https://i.gyazo.com/37432ac584ef04d94d3e4f9535fdffc4.mp4)

**参数说明**

| 名称 | 默认值 |
| ---- | ------ |
| 扭曲强度（Twist amount） | 5 |
| 频率（Frequency） | 10 |

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.BandedSwirl

; 使用默认扭曲强度，但降低频率应用过渡效果
@back Appearance.BandedSwirl params:,2.5
```

## Blinds（百叶窗）

![](https://i.gyazo.com/73a259f2a513a92ef893ebd6a25e9013.mp4)

**参数说明**

| 名称 | 默认值 |
| ---- | ------ |
| 条数（Count） | 6 |

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.Blinds

; 使用 30 条百叶窗（而非默认的 6 条）应用过渡效果
@back Appearance.Blinds params:30
```

## CircleReveal（圆形揭示）

![](https://i.gyazo.com/4f914c6741a5e48a22cafe2ab242a426.mp4)

**参数说明**

| 名称 | 默认值 |
| ---- | ------ |
| 模糊度（Fuzzy amount） | 0.25 |

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.CircleReveal

; 使用较高模糊度应用过渡效果
@back Appearance.CircleReveal params:3.33
```

## CircleStretch（圆形拉伸）

![](https://i.gyazo.com/f09bb69a3c045eeb1f6c8ec0b9dcd790.mp4)

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.CircleStretch
```

## CloudReveal（云状显现）

![](https://i.gyazo.com/618ec451a9e10f70486db0bb4badbb71.mp4)

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.CloudReveal
```

## Crossfade（交叉淡入淡出）

![](https://i.gyazo.com/dc4781a577ec891065af1858f5fe2ed1.mp4)

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.Crossfade
```

## Crumble（碎裂）

![](https://i.gyazo.com/e27c8477842a2092728ea0cc1ae76bda.mp4)

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.Crumble
```

## Dissolve（溶解）

![](https://i.gyazo.com/b2993be8de032a65c7d813c6d749e758.mp4)

**参数说明**

| 名称 | 默认值 |
| ---- | ------ |
| 阶段（Step） | 99999 |

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.Dissolve

; 使用较低阶段值应用过渡效果
@back Appearance.Dissolve params:100
```

## DropFade（下坠淡出）

![](https://i.gyazo.com/3c3840bb311ccb9fe223960f2e46f800.mp4)

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.DropFade
```

## LineReveal（线性揭示）

![](https://i.gyazo.com/c0e5259cd3d4ed2016ab74a65a7eec63.mp4)

**参数说明**
| 名称 | 默认值 |
| ---- | ------ |
| 模糊度（Fuzzy amount） | 0.25 |
| 线法线 X（Line Normal X） | 0.5 |
| 线法线 Y（Line Normal Y） | 0.5 |
| 反转（Reverse） | 0 |

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.LineReveal

; 使用垂直线滑动的方式应用过渡效果
@back Appearance.LineReveal params:,0,1

; 以反向（从右到左）方式应用过渡效果
@back Appearance.LineReveal params:,,,1
```

## Pixelate（像素化）

![](https://i.gyazo.com/0ac9339b21303e20c524aaf6b6ca95f4.mp4)

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.Pixelate
```

## RadialBlur（径向模糊）

![](https://i.gyazo.com/f8269fb68519c57c99643948a027a2a1.mp4)

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.RadialBlur
```

## RadialWiggle（径向摆动）

![](https://i.gyazo.com/a401b3b93a61276ed68ededa2e75e9ae.mp4)

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.RadialWiggle
```

## RandomCircleReveal（随机圆形揭示）

![](https://i.gyazo.com/f6e685b13fe2d76733fd43878602eabc.mp4)

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.RandomCircleReveal
```

## Ripple（波纹）

![](https://i.gyazo.com/ff1bd285dc675ca5ac04f7ae4500f1c4.mp4)

**参数说明**
| 名称 | 默认值 |
| ---- | ------ |
| 频率（Frequency） | 20 |
| 速度（Speed） | 10 |
| 振幅（Amplitude） | 0.5 |

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.Ripple

; 使用高频率和高振幅的过渡效果
@back Appearance.Ripple params:45,,1.1
```

## RotateCrumble（旋转碎裂）

![](https://i.gyazo.com/8d476f466858e4788e5ad6014d6db314.mp4)

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.RotateCrumble
```

## Saturate（饱和）

![](https://i.gyazo.com/ad6eb77b7065387b9cb9afd77adbc784.mp4)

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.Saturate
```

## Shrink（收缩）

![](https://i.gyazo.com/8c8bf00348df28ab89813c21f8655c07.mp4)

**参数说明**
| 名称 | 默认值 |
| ---- | ------ |
| 速度（Speed） | 200 |

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.Shrink

; 使用较低速度的过渡效果
@back Appearance.Shrink params:50
```

## SlideIn（滑入）

![](https://i.gyazo.com/800ee6f5fba39ab8d46f5eb09f2126cf.mp4)

**参数说明**
| 名称 | 默认值 |
| ---- | ------ |
| 滑动量（Slide amount） | 1 |

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.SlideIn
```

## SwirlGrid（网格旋转）

![](https://i.gyazo.com/5a21293d979323a112ffd07f1fffd28d.mp4)

**参数说明**
| 名称 | 默认值 |
| ---- | ------ |
| 扭曲量（Twist amount） | 15 |
| 单元数量（Cell count） | 10 |

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.SwirlGrid

; 使用高扭曲量和较低单元数量的过渡效果
@back Appearance.SwirlGrid params:30,4
```

## Swirl（旋转）

![](https://i.gyazo.com/6ac9a2fe1bb9dfaf6a8292ae5d03960e.mp4)

**参数说明**

| 名称 | 默认值 |
| ---- | ------ |
| 扭曲量（Twist amount） | 15 |

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.Swirl

; 使用高扭曲量的过渡效果
@back Appearance.Swirl params:25
```

## Water（水波）

![](https://i.gyazo.com/7c684f9a122006f38a0be2725895b76f.mp4)

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.Water
```

## Waterfall（瀑布）

![](https://i.gyazo.com/b6eebcb68002064ababe4d7476139a7c.mp4)

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.Waterfall
```

## Wave（波动）

![](https://i.gyazo.com/e189ca12868d7ae4c9d8f0ca3d9dd298.mp4)

**参数说明**

| 名称 | 默认值 |
| ---- | ------ |
| 幅度（Magnitude） | 0.1 |
| 相位（Phase） | 14 |
| 频率（Frequency） | 20 |

**用例**

```nani
; 使用默认参数应用过渡效果
@back Appearance.Wave

; 使用高幅度和低频率的过渡效果
@back Appearance.Wave params:0.75,,5
```

## 自定义过渡效果

### 溶解遮罩

你可以基于溶解遮罩纹理制作自定义过渡效果。溶解遮罩是一张灰度贴图，颜色值定义了像素在过渡到目标纹理时的时机。例如，以下螺旋状遮罩图：

![](https://i.gyazo.com/3c32e920efdf6cfb35214b6c9b617a6a.png)

—— 右上角的黑色方块表示过渡一开始目标纹理会显示在该位置，而中央的纯白方块会在最后阶段才过渡显示。

::: tip
为优化内存占用，在溶解贴图的导入设置中启用 “Single Channel” 并选择 “Red”。同时确保关闭 `Non-Power of 2` 和 `Generate Mip Maps` 选项，以防出现视觉伪影。

![](https://i.gyazo.com/7c38c89948b6d040c0b21ca573cf2968.png)
:::

要使用自定义过渡，请使用 `Custom` 过渡模式，并通过 `dissolve` 参数指定溶解遮罩纹理在项目 “Resources” 文件夹下的相对路径，例如：

```nani
@back Appearance.Custom dissolve:Textures/Spiral
```

要平滑（模糊）过渡边界，可使用第一个参数，范围为 0（无平滑）至 100（最大平滑），例如：

```nani
@back Appearance.Custom dissolve:Textures/Spiral params:90
```

要反转过渡（使遮罩中较亮区域先显示），将第二个参数设为 1，例如：

```nani
@back Appearance.Custom dissolve:Textures/Spiral params:,1
```

可参考以下视频示例了解使用方式。

![](https://www.youtube.com/watch?v=HZjey6M2-PE)

### 自定义着色器

你可以通过自定义演出元素 [Shader](https://docs.unity3d.com/Manual/ShadersOverview.html) 来添加全新的过渡效果。

::: warning
此主题需要 Unity 图形编程技能。我们不提供编写自定义 Shader 的支持或教程。请参考 [支持页面](/support/#unity-support) 了解更多。
:::

创建一个新的 Shader，并将其分配到需要使用自定义过渡的演出元素的 `Custom Texture Shader` 属性中。参阅 [自定义演出元素着色器](/zh/guide/custom-actor-shader) 以了解如何创建并应用。

当脚本指令中指定了过渡名称时，将会在演出元素使用的材质上启用与过渡名称相同的 [Shader 关键字](https://docs.unity3d.com/ScriptReference/Shader.EnableKeyword.html)，其前缀为 `NANINOVEL_TRANSITION_`。

若要将你自己的过渡效果加入自定义演出元素 Shader，可使用 `multi_compile` 指令，例如：

```c
#pragma multi_compile_local _ NANINOVEL_TRANSITION_CUSTOM1 NANINOVEL_TRANSITION_CUSTOM2
```

— 添加名为 Custom1 和 Custom2 的自定义过渡模式。

随后，你可以使用条件指令根据启用的关键字选择具体渲染逻辑。若复用内置演出元素 Shader，可通过 `ApplyTransitionEffect` 方法在片段函数中实现自定义过渡：

```c
fixed4 ApplyTransitionEffect(sampler2D mainTex, float2 mainUV,
    sampler2D transitionTex, float2 transitionUV, float progress,
    float4 params, float2 randomSeed, sampler2D cloudsTex, sampler2D customTex)
{
    const fixed4 CLIP_COLOR = fixed4(0, 0, 0, 0);
    fixed4 mainColor = Tex2DClip01(mainTex, mainUV, CLIP_COLOR);
    fixed4 transColor = Tex2DClip01(transitionTex, transitionUV, CLIP_COLOR);

    #ifdef NANINOVEL_TRANSITION_CUSTOM1 // Custom1 渐变。
    return transitionUV.x > progress ? mainColor
        : lerp(mainColor / progress * .1, transColor, progress);
    #endif

    #ifdef NANINOVEL_TRANSITION_CUSTOM2 // Custom2 渐变。
    return lerp(mainColor * (1.0 - progress), transColor * progress, progress);
    #endif

    // 当未启用任何过渡关键字时，默认使用交叉淡入淡出（Crossfade）。
    return lerp(mainColor, transColor, progress);
}
```

此后即可像使用内置过渡一样在脚本中调用，例如：

```nani
@back Snow.Custom1
@back River.Custom2
```

完整示例可参阅 [自定义演出元素着色器](/zh/guide/custom-actor-shader) 指南。

## 动画缓动

许多带有时间变化的指令都支持可选的 `easing` 参数，用以控制参数随时间变化的方式。下表列出了支持的缓动选项：

```
Linear
SmoothStep
Spring
EaseInQuad
EaseOutQuad
EaseInOutQuad
EaseInCubic
EaseOutCubic
EaseInOutCubic
EaseInQuart
EaseOutQuart
EaseInOutQuart
EaseInQuint
EaseOutQuint
EaseInOutQuint
EaseInSine
EaseOutSine
EaseInOutSine
EaseInExpo
EaseOutExpo
EaseInOutExpo
EaseInCirc
EaseOutCirc
EaseInOutCirc
EaseInBounce
EaseOutBounce
EaseInOutBounce
EaseInBack
EaseOutBack
EaseInOutBack
EaseInElastic
EaseOutElastic
EaseInOutElastic
```
