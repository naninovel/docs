# 特殊效果

特殊效果激活都是使用[@spawn] 接效果名调用：

```nani
@spawn ShakeBackground
```
— 会抖动主背景。

你可以通过`params`参数来控制具体表现：

```nani
@spawn ShakeCharacter params:Kohaku,1
```
— 抖动ID为"Kohaku"的角色1次。而非3次。

可以只选择性地修改其中部分参数，而保持其他参数默认：


```nani
@spawn ShakePrinter params:,,0.5
```

— 前两个参数（打字机ID和晃动次数）会保持默认值，第三个值（抖动持续时间）会变为0.5秒钟。

你可以通过在之后使用[@spawn]命令更新相关参数：


```nani
; 开始慢慢循环抖动`Kohaku`角色，
; 不等待至完成（即无限循环）。
@spawn ShakeCharacter params:Kohaku,0,,,0.1 wait:false
Kohaku: It's rumbling!
; 用更大振幅震动3次。
@spawn ShakeCharacter params:Kohaku,3,,,0.8
```

部分效果会默认一直执行，需要手动通过[@despawn]命令调用停止：


```nani
; 开始下雨
@spawn Rain
; 停止下雨
@despawn Rain
```

[@despawn]命令也可以使用部分参数（如控制渐隐变化的持续时间）：

```nani
; 10内慢慢停止下雨
@despawn Rain params:10
```

无参数定义是都是用默认值，[@spawn]和[@despawn]，即开始和停止的可用参数设置参看后文。

同一类效果的多个使用，可以通过`#`来区分调用：


```nani
; 同时循坏抖动`Kohaku` 和 `Yuko`
@spawn ShakeCharacter#1 params:Kohaku,0 wait:false
@spawn ShakeCharacter#2 params:Yuko,0 wait:false
```
当要停止上述某个效果时，加上定义的ID：

```nani
; 停止抖动`Yuko`, 增加 `Kohaku` 振幅
@despawn ShakeCharacter#2
@spawn ShakeCharacter#1 params:k,0,,,1
```

你可以使用英语数字来定义ID，或是更好理解的ID如`@spawn ShakeCharacter#Kohaku`，但需要保证不重复。


## 抖动打字机
震动某个特定ID打字机或默认打字机。

![](https://i.gyazo.com/f61fc35e318cce1949b00e5fe2448a80.mp4)

**开始 参数**
参数名 | 值类型 | 默认值 | 描述
--- | --- | --- | ---
Printer ID | String | null | 要执行抖动操作的打字机ID，不定义时抖动默认的打字机。
Shake count | Integer | 2 | 抖动次数，为0或更小值时为循坏，需用[@despawn]命令停止。
Shake duration | Decimal | 0.15 | 每次抖动的持续事件，单位：秒。
Duration variation | Decimal | 0.25 | 用于每次震动持续时间的随机的变化增量范围。
Shake amplitude | Decimal | 0.5 | 每次震动的振幅。
Amplitude variation | Decimal | 0.1 | 用于每次震动振幅的随机的变化增量范围。
Shake horizontally | Boolean | false | 是否横向震动（根据x轴）。
Shake vertically | Boolean | true | 是否纵向震动（根据y轴）。

注意，当UI为"Screen Space Overlay"模式时，振幅需要设置为大概默认值的x100倍，才能看到明显效果。


**示例**
```nani
; 用默认参数抖动打字机
@spawn ShakePrinter

; 水平方向抖动默认打字机10次
@spawn ShakePrinter params:,10,,,,,true,false

; 开始循坏抖动默认打字机，打印文本，停止抖动
@spawn ShakePrinter params:,0 wait:false
What a shaky situation!
@despawn ShakePrinter
```

## 抖动背景
抖动特定ID的背景或者主背景。

![](https://i.gyazo.com/fcf1153a0ad3d9a153908206211f5f5f.mp4)

**开始 参数**
参数名 | 值类型 | 默认值 | 描述
--- | --- | --- | ---
Background ID | String | null | 抖动背景的ID，不定义时抖动主背景。
Shake count | Integer | 2 | 抖动次数，为0或更小值时为循坏，需用[@despawn]命令停止。
Shake duration | Decimal | 0.15 | 每次抖动的持续事件，单位：秒。
Duration variation | Decimal | 0.25 | 用于每次震动持续时间的随机的变化增量范围。
Shake amplitude | Decimal | 0.5 | 每次震动的振幅。
Amplitude variation | Decimal | 0.1 | 用于每次震动振幅的随机的变化增量范围。
Shake horizontally | Boolean | false | 是否横向震动（根据x轴）。
Shake vertically | Boolean | true | 是否纵向震动（根据y轴）。

**示例**
```nani
; 使用默认参数抖动主背景。
@spawn ShakeBackground

; 抖动 `Video` 背景 2次。
@spawn ShakeBackground params:Video,2
```

## 抖动角色
抖动特定ID的角色，不定义时抖动随机可见角色。

![](https://i.gyazo.com/6001d3cfbee855c8a783d10e4a784042.mp4)

**开始 参数**
参数名 | 值类型 | 默认值 | 描述
--- | --- | --- | ---
Character ID | String | null | 抖动角色的ID，不定义时抖动随机可见角色。
Shake count | Integer | 2 | 抖动次数，为0或更小值时为循坏，需用[@despawn]命令停止。
Shake duration | Decimal | 0.15 | 每次抖动的持续事件，单位：秒。
Duration variation | Decimal | 0.25 | 用于每次震动持续时间的随机的变化增量范围。
Shake amplitude | Decimal | 0.5 | 每次震动的振幅。
Amplitude variation | Decimal | 0.1 | 用于每次震动振幅的随机的变化增量范围。
Shake horizontally | Boolean | false | 是否横向震动（根据x轴）。
Shake vertically | Boolean | true | 是否纵向震动（根据y轴）。

**示例**
```nani
; 使用默认参数抖动`Kohaku`角色。
@spawn ShakeCharacter params:Kohaku

; 抖动随机角色，显示选项，根据选项执行对应操作。
@spawn ShakeCharacter params:,0
@choice "Continue shaking" goto:.Continue
@choice "Stop shaking" goto:.Stop
@stop
# Stop
@despawn ShakeCharacter
# Continue
...
```

## 抖动相机
抖动Naninovel的渲染相机。

![](https://i.gyazo.com/f9521fbcf959d0b72e449ae6e2191f9f.mp4)

**开始 参数**
参数名 | 值类型 | 默认值 | 描述
--- | --- | --- | ---
Camera Name | String | null | 抖动相机的名字，不定义时抖动Naninovel主相机。
Shake count | Integer | 2 | 抖动次数，为0或更小值时为循坏，需用[@despawn]命令停止。
Shake duration | Decimal | 0.15 | 每次抖动的持续事件，单位：秒。
Duration variation | Decimal | 0.25 | 用于每次震动持续时间的随机的变化增量范围。
Shake amplitude | Decimal | 0.5 | 每次震动的振幅。
Amplitude variation | Decimal | 0.1 | 用于每次震动振幅的随机的变化增量范围。
Shake horizontally | Boolean | false | 是否横向震动（根据x轴）。
Shake vertically | Boolean | true | 是否纵向震动（根据y轴）。

**示例**
```nani
; 使用默认参数抖动主相机。
@spawn ShakeCamera

; 水平抖动相机5次。
@spawn ShakeCamera params:,5,,,,,true,false
```

## 动画元素定制播放

如果你想直接调整参数做想要的动画效果，使用[@animate]命令。

![](https://i.gyazo.com/a0494329c713c4309a52d57d0b297bee.mp4)

## 数字故障
应用到相机的后处理效果，模拟数字视频的变形故障效果。

![](https://i.gyazo.com/94cb6db25c17956473db4de149281df5.mp4)

**开始 参数**
参数名 | 值类型 | 默认值 | 描述
--- | --- | --- | ---
Duration | Decimal | 1 | 效果持续时间，单位：秒。
Intensity | Decimal | 1 | 效果的剧烈程度，从 0.0 到 10.0范围。

**示例**
```nani
; 用默认参数使用该效果。
@spawn DigitalGlitch
; 3.33秒内使用低剧烈程度的效果。
@spawn DigitalGlitch params:3.33,0.1
```

## 雨
生成粒子系统模拟雨效果。

![](https://i.gyazo.com/74af9eec30f6517ea5b8453a9c86d33c.mp4)

**开始 参数**
参数名 | 值类型 | 默认值 | 描述
--- | --- | --- | ---
Intensity | Decimal | 500 | 雨密度（粒子每秒生成速率）。
Fade-in time | Decimal | 5 | 粒子系统会在设置时间内逐渐增加生成速率，从0到设置的最大值。单位：秒。
X velocity | Decimal | 1 | 水平方向相乘的速度，用于改变下落雨点的方向。
Y velocity | Decimal | 1 | 垂直方向相乘的速度，用于改变下落雨点的方向。

**停止 参数**
参数名 | 值类型 | 默认值 | 描述
--- | --- | --- | ---
Fade-out time | Decimal | 5 | 粒子系统会在设置时间内逐渐减少生成速率，从设置的最大值到0。单位：秒。

**示例**
```nani
; 10秒内下密集的雨。
@spawn Rain params:1500,10
; 30秒后停止雨。
@despawn Rain params:30
```

## 雪
生成粒子系统模拟雪效果。

![](https://i.gyazo.com/25a052444c561e40c8318272f51edf47.mp4)

**开始 参数**
参数名 | 值类型 | 默认值 | 描述
--- | --- | --- | ---
Intensity | Decimal | 100 | 雨密度（粒子每秒生成速率）。
Fade-in time | Decimal | 5 | 粒子系统会在设置时间内逐渐增加生成速率，从0到设置的最大值。单位：秒。

**停止 参数**
参数名 | 值类型 | 默认值 | 描述
--- | --- | --- | ---
Fade-out time | Decimal | 5 | 粒子系统会在设置时间内逐渐减少生成速率，从设置的最大值到0。单位：秒。

**示例**
```nani
; 10秒内下密集的雪。
@spawn Snow params:300,10
; 30秒后停止雪。
@despawn Snow params:30
```

## 阳光射线
生成粒子系统模拟阳光效果。

![](https://i.gyazo.com/7edc4777699229abc508f2bdb404522e.mp4)

**开始 参数**
参数名 | 值类型 | 默认值 | 描述
--- | --- | --- | ---
Intensity | Decimal | 0.85 | 光线强度 (透明度)。
Fade-in time | Decimal | 3 | 粒子系统会在设置时间内逐渐增加强度，从0到设置的最大值。单位：秒。

**停止 参数**
参数名 | 值类型 | 默认值 | 描述
--- | --- | --- | ---
Fade-out time | Decimal | 3 | 粒子系统会在设置时间内逐渐减少强度，从设置的最大值到0。单位：秒。

**示例**
```nani
; 10秒内开始阳光效果。
@spawn SunShafts params:1,10
; 30秒后停止阳光效果。
@despawn SunShafts params:30
```

## 景深 (焦外虚化)
模拟景深效果，对焦点外物体虚化处理，仅仅保持焦点内物体清晰。如下图。

![](https://i.gyazo.com/616a023c46f207b4a3a33d3d3fd9fbc9.mp4)

**开始 参数**
参数名 | 值类型 | 默认值 | 描述
--- | --- | --- | ---
Focus Object Name | String | null | 需要聚焦的物体名字（可选），当设置后焦点总会跟随该物体，`Focus Distance`（焦距）会被忽略。
Focus Distance | Decimal | 10 | Naninovel相机到焦点的距离，当`Focus Object Name` 有定义时，该设置会被忽略。
Focal Length | Decimal | 3.75 | 虚焦区域的虚化程度；也决定了聚焦效果的敏感度。
Duration | Decimal | 1 | 插值持续时间，变化至目标值的快慢速度。

**停止 参数**
参数名 | 值类型 | 默认值 | 描述
--- | --- | --- | ---
Stop Duration | Decimal | 1 | 关闭景深效果，渐隐到目标值的持续时间。

**示例**
```nani
; 使用默认参数启用景深效果并聚焦 `Kohaku` 物体。
@spawn DepthOfField params:Kohaku
; 10秒内渐隐景深至消失。
@despawn DepthOfField params:10
; 焦点距离设置为到摄像机的10个单位距离，
; 中心距离设置为0.95，并在3秒内变化至该值。
@spawn DepthOfField params:,10,0.95,3
```

## 添加自定义效果

### 独立效果

你可以添加独立自定义效果（像内置的“雨”和“雪”一样的预制体类模板），在菜单`Naninovel -> Resources -> Spwan`的生成管理菜单内添加效果预制体，然后像内置效果一样使用[@spawn]和[@despawn]命令来调用。

![](https://i.gyazo.com/45b9d8fb51ffb368ff9f792221f10ca6.png)

比如，已在上述菜单添加了的`Explosion.prefab`预制体，使用如下命令来在场景中生成和删除：

```nani
@spawn Explosion
@despawn Explosion
```
大量添加预制体的时候可以在`Resources/Naninovel/Spawn`目录下直接放入预制体，它们会被自动注册至脚本，你也可以放在其中的子文件夹里分类，此时的调用方法需要添加(`/`)。比如要调用的资源存储目录为`Resources/Naninovel/Spawn/Explosions/Boom01`，脚本调用时使用`Explosions/Boom01`。

你也可以使用[可寻址资源系统](/zh/guide/resource-providers#寻址资源系统)
来绑定你的资源位置，像说明一样记得省略"Resources/"部分。比如，前面资源的目录地址就绑定为：`Naninovel/Spawn/Boom01` 。注意该资源系统默认是关闭的，记得将资源加载配置菜单的`Enable Addressable In Editor`属性启用。

参考`Naninovel/Prefabs/FX`内置预制体效果来构建你的自定义效果。


### 相机效果

如果你想应用[后处理效果](https://assetstore.unity.com/?q=post%20processing&orderBy=1) （即相机滤镜，比如内置的数码故障效果）到Naninovel相机，[创建一个相机预制体](https://docs.unity3d.com/Manual/CreatingPrefabs.html), [添加所需效果](https://docs.unity3d.com/Manual/UsingComponents.html) 到相机物体，并将预制体注册至`Naninovel -> Configuration -> Camera`菜单的`Custom Camera Prefab`栏位。

![](https://i.gyazo.com/6024aac1d2665dd96915758cd5c09fde.png)

你可以通过[@camera]命令的`toggle`和`set`参数来切换要使用的相机效果，比如，假定你相机上有一个名为"Bloom Image Effect"的组件，先确认该组件的类名，通常是`Script`位置的名字，如下图：


![](https://i.gyazo.com/73b7eabfe97ed84796cbe715b7dafc14.png)

这个例子中的类名为`BloomImageEffect`，使用该名字来切换打开关闭状态如下：


```nani
@camera toggle:BloomImageEffect
```

可以同时切换多个特效的状态，使用逗号隔开，如下所示:

```nani
@camera toggle:BloomImageEffect,Sepia,CameraNoise
```

按如下所示使用`set`来对每一个效果进行状态设置：

```nani
@camera set:BloomImageEffect.true,Sepia.false,CameraNoise.true
```

— 会打开 `BloomImageEffect` 和 `CameraNoise` 组件，而关闭 `Sepia`。

效果组件的状态会自动被记录，并会在使用内置读取保存系统，重新读取加载游戏时恢复。

参考以下视频来添加自定义相机滤镜效果。

![](https://www.youtube.com/watch?v=IbT6MTecO-k)
