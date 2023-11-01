# 过渡效果

当使用[@back] 和 [@char] 命令改变背景和人物元素的时候，或是[@startTrans] 和 [@finishTrans] 命令场景（scene）切换时，你可以定义使用的过渡效果。比如，如下示例会使用"DropFade"效果过渡到 "River" 背景：


```nani
@back River.DropFade
```

当未定义特效时，交叉过渡的效果会被默认使用。

你也可以定义特效时长（单位：秒），用`time`参数：

```nani
@back River.DropFade time:1.5
```

上述命令，会使用1.5秒的"DropFade"效果过渡到 "River" 背景。默认的`time`参数值为0.35秒。

如果你想在执行过渡效果后立即跳到下一个命令（而不等待效果的持续时间），可以将`wait`参数设置为false。例如：

```nani
@back River.Ripple time:1.5 wait:false
@bgm PianoTheme
```

— 在过渡过程中，“ PianoTheme”背景音乐将立即开始播放，并且不会延迟1.5秒。

一些过渡效果还支持其他参数，您可以使用params参数进行控制：

```nani
@back River.Ripple params:10,5,0.02
```
— 将波纹效果的频率设置为10，速度设置为5，幅度设置为0.02。如果`params`未设置 ，则将使用默认参数。

如果要修改特定的参数，可以跳过其他参数，它们将使用默认值：


```nani
@back River.Ripple params:,,0.02
```

所有过渡参数均为decimal类型。

上面的示例也适用于人物，只需为其提供独立`transition`参数：

```nani
@char CharID.Appearance transition:TransitionType params:...
```

您可以在下面的文档中找到可用的过渡效果及其参数和默认值。

## 带状漩涡

![](https://i.gyazo.com/37432ac584ef04d94d3e4f9535fdffc4.mp4)

**参数**
名字 |  默认值
--- | ---
Twist amount | 5
Frequency | 10

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.BandedSwirl

; 按默认值使用扭曲值（twist amount），但是低频率（frequency）。
@back Appearance.BandedSwirl params:,2.5
```

## 百叶窗

![](https://i.gyazo.com/73a259f2a513a92ef893ebd6a25e9013.mp4)

**参数**
名字 |  默认值
--- | ---
Count | 6

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.Blinds

; 将默认参数扇叶数量设置为30而非默认的6.
@back Appearance.Blinds params:30
```

## 中心渐入

![](https://i.gyazo.com/4f914c6741a5e48a22cafe2ab242a426.mp4)

**参数**
名字 |  默认值
--- | ---
Fuzzy amount | 0.25

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.CircleReveal

; 使用高模糊量（Fuzzy amount）的过渡效果。
@back Appearance.CircleReveal params:3.33
```

## 中心扭曲渐入

![](https://i.gyazo.com/f09bb69a3c045eeb1f6c8ec0b9dcd790.mp4)

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.CircleStretch
```

## 云状渐入

![](https://i.gyazo.com/618ec451a9e10f70486db0bb4badbb71.mp4)

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.CloudReveal
```

## 淡入淡出

![](https://i.gyazo.com/dc4781a577ec891065af1858f5fe2ed1.mp4)

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.Crossfade
```

## 瓦解渐入

![](https://i.gyazo.com/e27c8477842a2092728ea0cc1ae76bda.mp4)

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.Crumble
```

## 溶解

![](https://i.gyazo.com/b2993be8de032a65c7d813c6d749e758.mp4)

**参数**
名字 |  默认值
--- | ---
Step | 99999

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.Dissolve

; 过渡效果设置为低步进。
@back Appearance.Dissolve params:100
```

## 淡入淡出

![](https://i.gyazo.com/3c3840bb311ccb9fe223960f2e46f800.mp4)

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.DropFade
```

## 斜角渐入

![](https://i.gyazo.com/c0e5259cd3d4ed2016ab74a65a7eec63.mp4)

**参数**
名字 |  默认值
--- | ---
Fuzzy amount | 0.25
Line Normal X | 0.5
Line Normal Y | 0.5

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.LineReveal

; 垂直方向直角渐入。
@back Appearance.LineReveal params:,0,1
```

## 像素化

![](https://i.gyazo.com/0ac9339b21303e20c524aaf6b6ca95f4.mp4)

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.Pixelate
```

## 径向模糊

![](https://i.gyazo.com/f8269fb68519c57c99643948a027a2a1.mp4)

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.RadialBlur
```

## 径向摆动

![](https://i.gyazo.com/a401b3b93a61276ed68ededa2e75e9ae.mp4)

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.RadialWiggle
```

## 中心不规则显示

![](https://i.gyazo.com/f6e685b13fe2d76733fd43878602eabc.mp4)

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.RandomCircleReveal
```

## 波纹

![](https://i.gyazo.com/ff1bd285dc675ca5ac04f7ae4500f1c4.mp4)

**参数**
名字 |  默认值
--- | ---
Frequency | 20
Speed | 10
Amplitude | 0.5

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.Ripple

; 将过渡效果调整为高频高振幅。
@back Appearance.Ripple params:45,,1.1
```

## 旋转渐入

![](https://i.gyazo.com/8d476f466858e4788e5ad6014d6db314.mp4)

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.RotateCrumble
```

## 高亮渐入

![](https://i.gyazo.com/ad6eb77b7065387b9cb9afd77adbc784.mp4)

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.Saturate
```

## 收缩

![](https://i.gyazo.com/8c8bf00348df28ab89813c21f8655c07.mp4)

**参数**
名字 |  默认值
--- | ---
Speed | 200

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.Shrink

; 低速应用到过渡效果。
@back Appearance.Shrink params:50
```

## 滑入

![](https://i.gyazo.com/800ee6f5fba39ab8d46f5eb09f2126cf.mp4)

**参数**
名字 |  默认值
--- | ---
Slide amount | 1

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.SlideIn
```

## 漩涡网格

![](https://i.gyazo.com/5a21293d979323a112ffd07f1fffd28d.mp4)

**参数**
名字 |  默认值
--- | ---
Twist amount | 15
Cell count | 10

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.SwirlGrid

; 过渡效果使用高扭曲度，和低单元数量。
@back Appearance.SwirlGrid params:30,4
```

## 漩涡过渡

![](https://i.gyazo.com/6ac9a2fe1bb9dfaf6a8292ae5d03960e.mp4)

**参数**
名字 |  默认值
--- | ---
Twist amount | 15

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.Swirl

; 过渡效果使用高扭曲度。
@back Appearance.Swirl params:25
```

## 水状过渡

![](https://i.gyazo.com/7c684f9a122006f38a0be2725895b76f.mp4)

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.Water
```

## 瀑布

![](https://i.gyazo.com/b6eebcb68002064ababe4d7476139a7c.mp4)

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.Waterfall
```

## 规则水波

![](https://i.gyazo.com/e189ca12868d7ae4c9d8f0ca3d9dd298.mp4)

**参数**
名字 |  默认值
--- | ---
Magnitude | 0.1
Phase | 14
Frequency | 20

**示例**
```nani
; 按默认值使用过渡效果。
@back Appearance.Wave

; 过渡效果使用大水波，和低频。
@back Appearance.Wave params:0.75,,5
```

## 自定义过渡效果

### 溶解蒙版

您可以基于溶解蒙版纹理进行自定义过渡。溶解蒙版是灰度贴图，其中颜色定义像素何时过渡到目标纹理。例如，以下螺旋形方块溶解蒙版：

![](https://i.gyazo.com/3c32e920efdf6cfb35214b6c9b617a6a.png)

— 右上角的黑色正方形表示在过渡开始时应在此处显示过渡目标，而中间的纯白色正方形将在末尾过渡。

要使用自定义过渡,使用 `Custom` 过渡模式并通过 `dissolve` 参数设置蒙版贴图的路径（相对于项目“ Resources”文件夹），如下：

```nani
@back Appearance.Custom dissolve:Textures/Spiral
```
请查看以下视频以了解用法示例。

![](https://www.youtube.com/watch?v=HZjey6M2-PE)

### 自定义着色器

可以通过自定义[着色器](https://docs.unity3d.com/Manual/ShadersOverview.html) 添加完全自定义的过渡效果。
It's possible to add a completely custom transition effect via a custom actor [shader](https://docs.unity3d.com/Manual/ShadersOverview.html).

::: warning
该板块需要Unity中的图形学编程技能。我们不提供有关编写自定义着色器的任何支持或教程。请自行参阅[技术支持](/zh/support/#unity-支持)页面以获取更多信息。
:::

创建一个新的着色器，并将其分配给要使用新的自定义过渡效果的元素；参考[自定义元素着色器](/zh/guide/custom-actor-shader) 以获取更多关于如何创建绑定自定义元素着色器的信息。

在脚本命令中指定过渡名称后，元素使用的具有相同[着色器关键字](https://docs.unity3d.com/ScriptReference/Shader.EnableKeyword.html) （前缀`NANINOVEL_TRANSITION_`）的名字的材质将会被启用。

要将自己的过渡添加到自定义元素着色器，请使用 `multi_compile` 指令，如下：

```c
#pragma multi_compile _ NANINOVEL_TRANSITION_MYCUSTOM1 NANINOVEL_TRANSITION_MYCUSTOM2
```

— 将添加 `MyCustom1` 和 `MyCustom2` 过渡效果。

然后，可以使用条件判断基于已启用的transition关键字来选择特定的渲染方式。当重新使用内置的元素着色器时，可以使用 `ApplyTransitionEffect` 方法来实现：

```c
fixed4 ApplyTransitionEffect(in sampler2D mainTex, in float2 mainUV, in sampler2D transitionTex, in float2 transitionUV, in float progress, in float4 params, in float2 randomSeed, in sampler2D cloudsTex, in sampler2D customTex)
{
    const fixed4 CLIP_COLOR = fixed4(0, 0, 0, 0);
    fixed4 mainColor = Tex2DClip01(mainTex, mainUV, CLIP_COLOR);
    fixed4 transitionColor = Tex2DClip01(transitionTex, transitionUV, CLIP_COLOR);

    #ifdef NANINOVEL_TRANSITION_MYCUSTOM1 // MyCustom1 transition.
    return transitionUV.x > progress ? mainColor : lerp(mainColor / progress * .1, transitionColor, progress);
    #endif

    #ifdef NANINOVEL_TRANSITION_MYCUSTOM2 // MyCustom2 transition.
    return lerp(mainColor * (1.0 - progress), transitionColor * progress, progress);
    #endif

    // When no transition keywords enabled default to crossfade.
    return lerp(mainColor, transitionColor, progress);
}
```

然后，你就能够以与内置过渡相同的方式调用添加的过渡，如下：

```nani
@back Snow.MyCustom1
@back River.MyCustom2
```
