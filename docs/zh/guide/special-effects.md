# 特殊效果

许多内置脚本命令专用于各种特殊效果。例如，[@shake] 命令会震动 actor：

```nani
; 震动 'Kohaku' actor
@shake Kohaku
```

大多数效果都可以参数化：

```nani
; 震动 'Kohaku' 一次（而不是默认的 3 次）
@shake Kohaku count:1
```

您可以更新效果参数而无需重新启动效果：

```nani
; 开始循环缓慢震动 `Kohaku` actor
@shake Kohaku loop! power:0.1
Kohaku: 隆隆作响！
; 震动 3 次以上，幅度增加
@shake Kohaku count:3 power:0.8
```

默认情况下，某些效果是持久的，必须显式停止：

```nani
; 开始下雨
@rain
; 停止下雨
@rain power:0
```

请继续阅读以了解内置效果的说明以及 [添加自定义效果](/zh/guide/special-effects#添加自定义效果) 的方法。

## 生成效果

生成效果基于 [@spawn] 命令或派生自它。它们可以是一次性的（如 [@glitch]）或连续的（如 [@show] 或 [@blur]）。请继续阅读以了解标准效果列表以及添加自定义效果的方法。

---
### ✨ 震动 (Shake)

震动指定的 actor 或主相机。专用命令：[@shake]

![](https://i.gyazo.com/f9521fbcf959d0b72e449ae6e2191f9f.mp4)

**开始参数**
| 名称 | 类型 | 默认 | 描述 |
| --- | --- | --- | --- |
| ID | String | null | 要震动的 actor 的 ID。指定 `Camera` 以震动主相机。 |
| Shake count | Number | 3 | 震动迭代次数。 |
| Loop | Boolean | false | 启用后，将循环效果，直到使用 [@despawn] 停止。 |
| Shake duration | Number | 0.15 | 每次震动迭代的基本持续时间（以秒为单位）。 |
| Duration variation | Number | 0.25 | 应用于效果基本持续时间的随机增量修饰符。 |
| Shake amplitude | Number | 0.5 | 每次震动迭代的基本位移幅度（以单位为单位）。 |
| Amplitude variation | Number | 0.5 | 应用于效果基本位移幅度的随机增量修饰符。 |
| Shake horizontally | Boolean | false | 是否水平位移 actor（按 x 轴）。 |
| Shake vertically | Boolean | true | 是否垂直位移 actor（按 y 轴）。 |

**示例**

```nani
; 震动当前默认文本打印机
@shake

; 使用默认参数震动 "Kohaku" actor
@shake Kohaku

; 水平震动主相机 5 次
@shake Camera count:5 hor!
```

---
### ✨ 故障 (Glitch)

对主相机应用后处理效果，模拟数字视频失真和伪影。专用命令：[@glitch]

![](https://i.gyazo.com/94cb6db25c17956473db4de149281df5.mp4)

**开始参数**
| 名称 | 类型 | 默认 | 描述 |
| --- | --- | --- | --- |
| Duration | Number | 1 | 效果的持续时间（以秒为单位）。 |
| Intensity | Number | 1 | 效果的强度，范围为 0.0 到 10.0。 |

**示例**

```nani
; 使用默认参数应用故障效果
@glitch

; 在 3.33 秒内以低强度应用效果
@glitch power:0.1 time:3.33
```

---
### ✨ 雨 (Rain)

生成模拟雨的粒子系统。专用命令：[@rain]

![](https://i.gyazo.com/74af9eec30f6517ea5b8453a9c86d33c.mp4)

**开始参数**
| 名称 | 类型 | 默认 | 描述 |
| --- | --- | --- | --- |
| Intensity | Number | 0.5 | 雨的强度（每秒粒子生成率）。 |
| Fade-in time | Number | 5 | 粒子系统将在指定时间（以秒为单位）内逐渐将生成率从 0 增加到目标水平。 |
| X velocity | Number | 1 | 粒子水平速度的乘数。用于改变雨滴的角度。 |
| Y velocity | Number | 1 | 粒子垂直速度的乘数。 |

**停止参数**
| 名称 | 类型 | 默认 | 描述 |
| --- | --- | --- | --- |
| Fade-out time | Number | 5 | 粒子系统将在指定时间（以秒为单位）内逐渐将生成率从目标水平降低到 0。 |

**示例**

```nani
; 在 10 秒内开始强降雨
@rain power:1 time:10

; 在 30 秒内停止降雨
@rain power:0 time:30
```

---
### ✨ 雪 (Snow)

生成模拟雪的粒子系统。专用命令：[@snow]

![](https://i.gyazo.com/25a052444c561e40c8318272f51edf47.mp4)

**开始参数**
| 名称 | 类型 | 默认 | 描述 |
| --- | --- | --- | --- |
| Intensity | Number | 0.5 | 雪的强度（每秒粒子生成率）。 |
| Fade-in time | Number | 5 | 粒子系统将在指定时间（以秒为单位）内逐渐将生成率从 0 增加到目标水平。 |

**停止参数**
| 名称 | 类型 | 默认 | 描述 |
| --- | --- | --- | --- |
| Fade-out time | Number | 5 | 粒子系统将在指定时间（以秒为单位）内逐渐将生成率从目标水平降低到 0。 |

**示例**

```nani
; 在 10 秒内开始大雪
@snow power:1 time:10

; 在 30 秒内停止下雪
@snow power:0 time:30
```

---
### ✨ 阳光 (Sun)

生成模拟太阳光束（光线）的粒子系统。专用命令：[@sun]

![](https://i.gyazo.com/7edc4777699229abc508f2bdb404522e.mp4)

**开始参数**
| 名称 | 类型 | 默认 | 描述 |
| --- | --- | --- | --- |
| Intensity | Number | 0.85 | 光线的强度（不透明度）。 |
| Fade-in time | Number | 3 | 粒子系统将在指定时间（以秒为单位）内逐渐将强度从 0 增加到目标水平。 |

**停止参数**
| 名称 | 类型 | 默认 | 描述 |
| --- | --- | --- | --- |
| Fade-out time | Number | 3 | 粒子系统将在指定时间（以秒为单位）内逐渐将不透明度从目标水平降低到 0。 |

**示例**

```nani
; 在 10 秒内开始强烈的阳光
@sun power:1 time:10

; 在 30 秒内停止阳光
@sun power:0 time:30
```

---
### ✨ 散景 (Bokeh)

模拟景深（又名 DOF、散景）效果，其中只有焦点处的对象保持清晰，而图像的其余部分模糊。专用命令：[@bokeh]

::: tip
如果您只想模糊一个对象 (actor)，请考虑改用 [模糊效果](/zh/guide/special-effects#✨-blur)。
:::

![](https://i.gyazo.com/610d2cafe5fbe42aba7adb9ac71720d1.mp4)

**开始参数**
| 名称 | 类型 | 默认 | 描述 |
| --- | --- | --- | --- |
| Focus Object Name | String | null | 要设置焦点的游戏对象的名称（可选）。设置后，焦点将始终停留在游戏对象上，并且 `Focus Distance` 参数将被忽略。 |
| Focus Distance | Number | 10 | 从 Naninovel 相机到焦点的距离。指定 `Focus Object Name` 时忽略。 |
| Focal Length | Number | 3.75 | 应用于散焦区域的模糊量；也决定焦点灵敏度。 |
| Duration | Number | 1 | 插值时间（参数达到目标值的速度）。 |

**停止参数**
| 名称 | 类型 | 默认 | 描述 |
| --- | --- | --- | --- |
| Stop Duration | Number | 1 | 效果参数达到默认值（效果不可见）的淡出（禁用）持续时间。 |

**示例**

```nani
; 使用默认参数启用散景并将焦点锁定在 "Kohaku" 游戏对象上
@bokeh Kohaku

; 在 10 秒内淡出（禁用）效果
@bokeh power:0

; 将焦点设置在距离相机 10 个单位的位置，
; 焦距为 0.95 并在 3 秒内应用
@bokeh dist:10 power:0.95 time:3
```

---
### ✨ 模糊 (Blur)

将模糊滤镜应用于支持的 actor：精灵、分层、切片、Live2D、Spine、视频和场景实现的背景和角色。默认情况下（未指定第一个参数时），效果应用于 `MainBackground` actor。专用命令：[@blur]

![](https://i.gyazo.com/067614d77783683e74ca79652099b58d.mp4)

**开始参数**
| 名称 | 类型 | 默认 | 描述 |
| --- | --- | --- | --- |
| Actor ID | String | MainBackground | 要应用效果的 actor 的 ID。actor 应实现 `IBlurable` 接口以支持该效果。 |
| Intensity | Number | 0.5 | 效果的强度，范围为 0.0 到 1.0。 |
| Duration | Number | 1 | 插值时间，以秒为单位（强度达到目标值的速度）。 |

**停止参数**
| 名称 | 类型 | 默认 | 描述 |
| --- | --- | --- | --- |
| Stop Duration | Number | 1 | 效果的淡出（禁用）持续时间，以秒为单位。 |

**示例**

```nani
; 对当前主背景应用模糊
@blur

; 在 2.5 秒内以全强度对 "Sky" 背景应用模糊
@blur Sky power:1 time:2.5

; 淡出并禁用模糊
@blur power:0
```

## 过渡效果

当使用 [@back] 和 [@char] 更改背景和角色外观或使用 [@trans] 命令执行场景过渡时，您可以额外指定要使用的过渡效果。例如，以下命令将使用 "DropFade" 过渡效果过渡到 "River" 背景：

```nani
@back River.DropFade
```

未指定过渡效果时，默认使用交叉淡入淡出。

您还可以使用 `time` 参数指定过渡的持续时间（以秒为单位）：

```nani
@back River.DropFade time:1.5
```

上述语句将在 1.5 秒内使用 "DropFade" 过渡过渡到 "River" 背景。所有过渡的默认 `time` 为 0.35 秒。

如果您希望在播放下一个命令之前等待过渡完成，请添加 `wait!`：

```nani
@back River.Ripple time:1.5 wait!
@bgm PianoTheme
```

— "PianoTheme" 背景音乐只有在过渡完成后才会开始播放。

一些过渡效果还支持其他参数，您可以使用 `params` 参数进行控制：

```nani
@back River.Ripple params:10,5,0.02
```

— 将波纹效果的频率设置为 10，速度设置为 5，幅度设置为 0.02。未指定 `params` 时，将使用默认参数。

如果您希望修改选定的参数，您可以跳过其他参数，它们将具有默认值：

```nani
@back River.Ripple params:,,0.02
```

所有过渡参数均为 number 类型。

上述示例也适用于角色；只需使用 `via` 参数分配过渡：

```nani
@char CharID.Appearance via:TransitionType params:...
```

您可以在下面的文档中找到可用的过渡效果及其参数和默认值。


---
### 💫 BandedSwirl

![](https://i.gyazo.com/37432ac584ef04d94d3e4f9535fdffc4.mp4)

**参数**
| 名称 | 默认 |
| --- | --- |
| Twist amount | 5 |
| Frequency | 10 |

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.BandedSwirl

; 使用默认扭曲量但低频应用过渡
@back Appearance.BandedSwirl params:,2.5
```


---
### 💫 Blinds

![](https://i.gyazo.com/73a259f2a513a92ef893ebd6a25e9013.mp4)

**参数**
| 名称 | 默认 |
| --- | --- |
| Count | 6 |

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.Blinds

; 使用 30 个百叶窗而不是默认的 6 个应用过渡
@back Appearance.Blinds params:30
```

---
### 💫 CircleReveal

![](https://i.gyazo.com/4f914c6741a5e48a22cafe2ab242a426.mp4)

**参数**
| 名称 | 默认 |
| --- | --- |
| Fuzzy amount | 0.25 |

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.CircleReveal

; 使用高模糊量应用过渡
@back Appearance.CircleReveal params:3.33
```


---
### 💫 CircleStretch

![](https://i.gyazo.com/f09bb69a3c045eeb1f6c8ec0b9dcd790.mp4)

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.CircleStretch
```


---
### 💫 CloudReveal

![](https://i.gyazo.com/618ec451a9e10f70486db0bb4badbb71.mp4)

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.CloudReveal
```


---
### 💫 Crossfade

![](https://i.gyazo.com/dc4781a577ec891065af1858f5fe2ed1.mp4)

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.Crossfade
```


---
### 💫 Crumble

![](https://i.gyazo.com/e27c8477842a2092728ea0cc1ae76bda.mp4)

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.Crumble
```


---
### 💫 Dissolve

![](https://i.gyazo.com/b2993be8de032a65c7d813c6d749e758.mp4)

**参数**
| 名称 | 默认 |
| --- | --- |
| Step | 99999 |

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.Dissolve

; 使用低步长应用过渡
@back Appearance.Dissolve params:100
```


---
### 💫 DropFade

![](https://i.gyazo.com/3c3840bb311ccb9fe223960f2e46f800.mp4)

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.DropFade
```


---
### 💫 LineReveal

![](https://i.gyazo.com/c0e5259cd3d4ed2016ab74a65a7eec63.mp4)

**参数**
| 名称 | 默认 |
| --- | --- |
| Fuzzy amount | 0.25 |
| Line Normal X | 0.5 |
| Line Normal Y | 0.5 |
| Reverse | 0 |

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.LineReveal

; 使用垂直线滑动应用过渡
@back Appearance.LineReveal params:,0,1

; 反向（从右到左）应用过渡
@back Appearance.LineReveal params:,,,1
```


---
### 💫 Pixelate

![](https://i.gyazo.com/0ac9339b21303e20c524aaf6b6ca95f4.mp4)

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.Pixelate
```


---
### 💫 RadialBlur

![](https://i.gyazo.com/f8269fb68519c57c99643948a027a2a1.mp4)

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.RadialBlur
```


---
### 💫 RadialWiggle

![](https://i.gyazo.com/a401b3b93a61276ed68ededa2e75e9ae.mp4)

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.RadialWiggle
```


---
### 💫 RandomCircleReveal

![](https://i.gyazo.com/f6e685b13fe2d76733fd43878602eabc.mp4)

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.RandomCircleReveal
```


---
### 💫 Ripple

![](https://i.gyazo.com/ff1bd285dc675ca5ac04f7ae4500f1c4.mp4)

**参数**
| 名称 | 默认 |
| --- | --- |
| Frequency | 20 |
| Speed | 10 |
| Amplitude | 0.5 |

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.Ripple

; 使用高频率和幅度应用过渡
@back Appearance.Ripple params:45,,1.1
```


---
### 💫 RotateCrumble

![](https://i.gyazo.com/8d476f466858e4788e5ad6014d6db314.mp4)

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.RotateCrumble
```


---
### 💫 Saturate

![](https://i.gyazo.com/ad6eb77b7065387b9cb9afd77adbc784.mp4)

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.Saturate
```


---
### 💫 Shrink

![](https://i.gyazo.com/8c8bf00348df28ab89813c21f8655c07.mp4)

**参数**
| 名称 | 默认 |
| --- | --- |
| Speed | 200 |

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.Shrink

; 使用低速应用过渡
@back Appearance.Shrink params:50
```


---
### 💫 SlideIn

![](https://i.gyazo.com/800ee6f5fba39ab8d46f5eb09f2126cf.mp4)

**参数**
| 名称 | 默认 |
| --- | --- |
| Slide amount | 1 |

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.SlideIn
```


---
### 💫 SwirlGrid

![](https://i.gyazo.com/5a21293d979323a112ffd07f1fffd28d.mp4)

**参数**
| 名称 | 默认 |
| --- | --- |
| Twist amount | 15 |
| Cell count | 10 |

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.SwirlGrid

; 使用高扭曲和低单元格数应用过渡
@back Appearance.SwirlGrid params:30,4
```


---
### 💫 Swirl

![](https://i.gyazo.com/6ac9a2fe1bb9dfaf6a8292ae5d03960e.mp4)

**参数**
| 名称 | 默认 |
| --- | --- |
| Twist amount | 15 |

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.Swirl

; 使用高扭曲应用过渡
@back Appearance.Swirl params:25
```


---
### 💫 Water

![](https://i.gyazo.com/7c684f9a122006f38a0be2725895b76f.mp4)

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.Water
```


---
### 💫 Waterfall

![](https://i.gyazo.com/b6eebcb68002064ababe4d7476139a7c.mp4)

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.Waterfall
```


---
### 💫 Wave

![](https://i.gyazo.com/e189ca12868d7ae4c9d8f0ca3d9dd298.mp4)

**参数**
| 名称 | 默认 |
| --- | --- |
| Magnitude | 0.1 |
| Phase | 14 |
| Frequency | 20 |

**示例**

```nani
; 使用默认参数应用过渡
@back Appearance.Wave

; 使用高幅度和低频率应用过渡
@back Appearance.Wave params:0.75,,5
```

## 添加自定义效果

### 自定义生成效果

您可以通过生成资源管理器 (`Naninovel -> Resources -> Spawn`) 添加效果预制件并使用 [@spawn] 和 [@despawn] 命令来添加自定义独立效果（通过预制件实现，如 "Rain" 和 "Snow" 内置效果）：

![](https://i.gyazo.com/45b9d8fb51ffb368ff9f792221f10ca6.png)

例如，假设通过生成管理器分配了一个 `Explosion.prefab` 预制件，以下命令将在场景中生成并取消生成（销毁）预制件：

```nani
@spawn Explosion
@despawn Explosion
```

可以使用 `params` 指定附加效果参数：

```nani
@spawn Explosion params:Kohaku,3,true
```

::: tip
在构建具有多个参数的自定义效果时，请考虑创建一个 [自定义命令](/zh/guide/custom-commands) 并从 `SpawnEffect` 继承它。这样您就不必记住 `params` 数组中的参数位置，并且在使用 [IDE 扩展](/zh/guide/ide-extension) 时可以获得自动补全和类型检查：

```nani
@explode Kohaku power:3 smoke!
```
:::

[@spawn] 命令还具有变换参数，允许在特定场景或世界位置以及特定旋转或缩放的情况下生成对象，例如：

```nani
; 在距屏幕左边界 15% 处生成爆炸
; 缩放 x10 并在 z 轴上旋转 15 度。
@spawn Explosion pos:15 scale:10 rotation:,,15
```

如果您有很多预制件要生成，并且通过编辑器菜单分配它们不方便，可以将它们放在 `Resources/Naninovel/Spawn` 文件夹中，它们将自动在脚本中可用。如果您愿意，您还可以使用子文件夹组织它们；在这种情况下，在剧本脚本中引用它们时使用正斜杠 (`/`)。例如，存储为 `Resources/Naninovel/Spawn/Explosions/Boom01` 的预制件资产可以在脚本中引用为 `Explosions/Boom01`。

也可以使用 [Addressable 资产系统](/zh/guide/resource-providers#addressable) 手动公开资源。要公开资产，请分配一个等于您通过上述方法公开它时使用的路径的地址，但省略 "Resources/" 部分。例如，要公开 "Boom01" 预制件资产，请为该资产分配以下地址：`Naninovel/Spawn/Boom01`。请注意，Addressable 提供者默认情况下不在编辑器中使用；您可以通过打开资源提供者配置菜单中的 `Enable Addressable In Editor` 属性来启用它。

检查存储在 `Naninovel/Prefabs/FX` 中的内置效果预制件以获取参考实现。

### 自定义相机效果

如果您希望将自定义 [后处理效果](https://assetstore.unity.com/?q=post%20processing&orderBy=1)（又名图像效果或相机滤镜，如 "Digital Glitch" 内置效果）应用于 Naninovel 相机，请 [创建相机预制件](https://docs.unity3d.com/Manual/CreatingPrefabs.html)，[将所需的效果组件添加](https://docs.unity3d.com/Manual/UsingComponents.html) 到相机对象，并将预制件分配给相机配置菜单 (`Naninovel -> Configuration -> Camera`) 中的 `Custom Camera Prefab` 字段。

![](https://i.gyazo.com/6024aac1d2665dd96915758cd5c09fde.png)

您可以通过剧本脚本使用 `toggle` 参数切换（启用（如果已禁用）和反之亦然）添加的组件，并使用 [@camera] 命令的 `set` 参数显式设置启用状态。例如，假设您已将 "Bloom Image Effect" 组件添加到相机对象。首先，找出组件的类型名称是什么；它通常在组件的 `Script` 字段中指定。

![](https://i.gyazo.com/73b7eabfe97ed84796cbe715b7dafc14.png)

在我们的例子中，组件的类型名称是 `BloomImageEffect`。使用类型名称在运行时切换此组件，如下所示：

```nani
@camera toggle:BloomImageEffect
```

您可以通过用逗号分隔类型名称来一次切换多个组件：

```nani
@camera toggle:BloomImageEffect,Sepia,CameraNoise
```

如果您想显式启用或禁用组件：

```nani
@camera set:BloomImageEffect.true,Sepia.false,CameraNoise.true
```

— 将启用 `BloomImageEffect` 和 `CameraNoise` 组件，同时禁用 `Sepia`。

要切换、禁用或启用附加到相机对象的所有组件，请使用 `*` 符号。

```nani
; 切换所有组件
@camera toggle:*

; 禁用所有组件
@camera set:*.false

; 启用所有组件
@camera set:*.true
```

当前启用（和禁用）的相机组件的状态将在游戏保存加载操作时自动保存和恢复。

查看以下视频，了解有关添加自定义相机滤镜效果的示例。

![](https://www.youtube.com/watch?v=IbT6MTecO-k)

### 自定义过渡效果

#### 溶解遮罩

您可以根据溶解遮罩纹理进行自定义过渡。溶解遮罩是灰度纹理，其中颜色定义像素何时过渡到目标纹理。例如，考虑以下螺旋溶解遮罩：

![](https://i.gyazo.com/3c32e920efdf6cfb35214b6c9b617a6a.png)

— 右上角的黑色方块表示过渡目标应在过渡开始时显示在那里，中心的纯白色方块将在最后过渡。

::: tip
为了优化内存使用，请在溶解纹理导入设置中设置 "Single Channel" 和 "Red"。此外，确保禁用 `Non-Power of 2` 和 `Generate Mip Maps` 选项以防止视觉伪影。

![](https://i.gyazo.com/7c38c89948b6d040c0b21ca573cf2968.png)
:::

要进行自定义过渡，请使用 `Custom` 过渡模式并通过 `dissolve` 参数指定溶解遮罩纹理的路径（相对于项目 "Resources" 文件夹），例如：

```nani
@back Appearance.Custom dissolve:Textures/Spiral
```

要平滑（模糊）过渡边界，请使用范围为 0（无平滑）到 100（最大平滑）的第一个参数，例如：

```nani
@back Appearance.Custom dissolve:Textures/Spiral params:90
```

要反转过渡（将首先显示溶解遮罩的较亮区域），请将第二个参数设置为 1，例如：

```nani
@back Appearance.Custom dissolve:Textures/Spiral params:,1
```

查看以下视频以获取使用示例。

![](https://www.youtube.com/watch?v=HZjey6M2-PE)

#### 自定义着色器

可以通过自定义 actor [着色器](https://docs.unity3d.com/Manual/ShadersOverview.html) 添加完全自定义的过渡效果。

创建一个新着色器并将其分配给应该使用自定义过渡效果的 actor 的 `Custom Texture Shader` 属性；有关如何创建和分配自定义 actor 着色器的更多信息，请参阅 [自定义 actor 着色器](/zh/guide/custom-actor-shader) 指南。

当在脚本命令中指定过渡名称时，将在 actor 使用的材质中启用具有相同名称（前缀为 `NANINOVEL_TRANSITION_`）的 [着色器关键字](https://docs.unity3d.com/ScriptReference/Shader.EnableKeyword.html)。

要将您自己的过渡添加到自定义 actor 着色器，请使用 `multi_compile` 指令，例如：

```c
#pragma multi_compile_local _ NANINOVEL_TRANSITION_CUSTOM1 NANINOVEL_TRANSITION_CUSTOM2
```

— 将添加 `Custom1` 和 `Custom2` 过渡。

然后，您可以使用条件指令根据启用的过渡关键字选择特定的渲染方法。当重用内置 actor 着色器时，可以通过片段处理程序中使用的 `ApplyTransitionEffect` 方法实现自定义过渡：

```c
fixed4 ApplyTransitionEffect(sampler2D mainTex, float2 mainUV,
    sampler2D transitionTex, float2 transitionUV, float progress,
    float4 params, float2 randomSeed, sampler2D cloudsTex, sampler2D customTex)
{
    const fixed4 CLIP_COLOR = fixed4(0, 0, 0, 0);
    fixed4 mainColor = Tex2DClip01(mainTex, mainUV, CLIP_COLOR);
    fixed4 transColor = Tex2DClip01(transitionTex, transitionUV, CLIP_COLOR);

    #ifdef NANINOVEL_TRANSITION_CUSTOM1 // Custom1 transition.
    return transitionUV.x > progress ? mainColor
        : lerp(mainColor / progress * .1, transColor, progress);
    #endif

    #ifdef NANINOVEL_TRANSITION_CUSTOM2 // Custom2 transition.
    return lerp(mainColor * (1.0 - progress), transColor * progress, progress);
    #endif

    // 当未启用过渡关键字时，默认为交叉淡入淡出。
    return lerp(mainColor, transColor, progress);
}
```

然后，您将能够以与内置过渡相同的方式调用添加的过渡，例如：

```nani
@back Snow.Custom1
@back River.Custom2
```

有关完整的着色器示例，请参阅 [自定义 actor 着色器](/zh/guide/custom-actor-shader) 指南。
