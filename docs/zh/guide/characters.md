# 人物

人物时用于表现独立场景的演出元素，置于[背景](/zh/guide/backgrounds) 之上。

一个角色元素由名字，外观，可见度，位置，旋转，缩放，朝向定义组成。在运行中，上述属性可改变。

角色配置可以通过`Naninovel -> Configuration -> Characters`菜单来配置。其他可选配置参考[属性配置](/zh/guide/configuration#人物) 。角色资源管理通过`Naninovel -> Resources -> Characters`管理。


![Add Character](https://i.gyazo.com/c8a4f7f987621831b4a2ecb3145a4a07.png)

如果你有大量角色需要配置，通过菜单添加会很不便你可以在`Resources/Naninovel/Characters`目录下通过拖拽至此，添加相应ID的资源。比如，你想添加ID为"Kohaku"角色的资源，
在上述目录中直接放入Texture图片精灵，它们就会被自动配置，在脚本中就能获取到了。

另外你可以通过子文件夹管理相应资源。该情况下，你可以用正斜杠 (`/`)在Naninovel脚本中调用。比如，资源路径为`Resources/Naninovel/Characters/Kohaku/Casual/Angry` 的资源，调用时为`Casual/Angry`。

你也可使用[可寻址资源系统](/zh/guide/resource-providers#寻址资源系统) 手动调用资源。你可以通过省略上述的"Resources/"部分的路径来直接调用相应资源。
比如，如果你想使用"Kohaku"的"Happy"外观，绑定资源地址为`Naninovel/Characters/Kohaku/Happy`。注意该调用系统默认关闭，打开资源提供配置菜单的`Enable Addressable In Editor`属性来启用。

在Naninovel脚本中，人物大多数由[@char]命令控制：


```nani
; 显示Sora的默认外观
@char Sora

; 显示Sora 的“Happy”外观
@char Sora.Happy

; 同上，显示距离距左边框45%
; 距下边框10%，并使其看向左
@char Sora.Happy look:left pos:45,10
```

## 姿势

每个角色都有一个名为`Poses`的属性，允许定制特定状态（姿势）。
Each character has `Poses` property allowing to specify named states (poses).

![](https://i.gyazo.com/5b022d32eddb3e721ed036c96f662f5d.png)

已经配置好的姿势名可被像外观名字一样用[@char]命令来调用预设，而不是每次通过脚本命令参数来达到效果。


```nani
; 名为`SuperAngry` 的预设姿势，用于 `Kohaku` 角色，
; 将所有的预设参数应用于该角色，
@char Kohaku.SuperAngry

; 同上，但是同时使用`DropFade`过渡效果，持续3秒。
@char Kohaku.SuperAngry transition:DropFade time:3
```

注意，当姿势像外观一样被调用的时候，你仍然可以单独对某个参数进行重定义修改，比如：


```nani
; 名为`SuperAngry` 的预设姿势，用于 `Kohaku` 角色，
; 将所有的预设参数应用于该角色，
; 除色调Tint参数外, 使用如下命令重新定义。
@char Kohaku.SuperAngry tint:#ff45cb
```

## 显示姓名

在角色配置菜单，你可以为特定角色设置`Display Name`即显示姓名。当设置以后，在姓名区位置显示名字就会显示该配置的名字，而不是角色的ID。该设置可以允许名字使用特殊字符和空格（ID则不行）。

做本地化时，使用[托管文本](/zh/guide/managed-text) 中的"CharacterNames"来配置。该文本文件，会在使用生成托管文本资源功能时创建。该配置，在相应语言内不会覆盖原本的角色数据设置。

你也可以将`Display Name`绑定为自定义变量，来在运行中通过Naninovel脚本动态改变这个值。按下图所示，用中括号括住相应变量名字写入配置菜单。


![](https://i.gyazo.com/9743061df462bd809afc45bff20bbb6d.png)

你可以在Naninovel脚本中改变变量值，它也会随着同时改变显示姓名：


```nani
@set PlayerName="Mistery Man"
Player: ...

@set PlayerName="Dr. Stein"
Player: You can call me Dr. Stein.
```

你也可以姓名绑定功能使用[@input]命令来让玩家自己输入其姓名，如下：


```nani
@input PlayerName summary:"Choose your name."
@stop
Player: You can call me {PlayerName}.
```

## 文本颜色

当角色配置菜单中 `Use Character Color` 属性打开，打字机文本和角色姓名，会在使用[@print] 命令或普通内容文本行的时候根据特定角色ID，被着色为对应的颜色。

以下视频为显示姓名功能和文本颜色的演示：

![](https://www.youtube.com/watch?v=u5B5s-X2Bw0)

## 头像贴图

你可以使用[@char] 命令的`avatar`参数来使用头像。在可用头像功能的打字机显示角色的时候，就会显示头像。目前，仅`宽屏打字机`和`对话打字机`支持头像显示功能。


![](https://i.gyazo.com/83c091c08846fa1cab8764a8d4dddeda.png)

要使用头像，你首先需要在资源里配置相应资源并设置名字。在角色配置菜单中的`Avatar Resources`属性中完成相应配置。

![](https://i.gyazo.com/5a0f10d174aa75ed87da1b472567e40b.png)

::: info NOTE

头像名字可以说随意取，也并不需要和已有的角色或外观姓名有关联。除了当你像想让他们自动关联显示的时候。

:::

在脚本中显示特定头像方法，如下：

```nani
@char CharacaterId avatar:AvatarName
```

要为一个角色设置默认头像，将该头像贴图资源的名字按`角色ID/Default`格式命名；比如，你要为`Kohaku`角色设置默认头像，头像贴图就命名为`Kohaku/Default`。如此操作，即使脚本里[@char]命令里没有定义`avatar`参数，头像也会随人物自动显示。

参照如上方法，可以为特定角色立绘来匹配头像，格式为`角色ID/立绘ID`，`立绘ID`为匹配立绘的ID名。

请注意，**头像显示和角色立绘显示无关**，不应当将此功能用作立绘显示。立绘显示时绘制于场景之上，而头像仅仅将任意图像“注入”到打字机的图像匹配区域。

通过设置[@char]命令的 `visible` 参数值为 `false`，可以隐藏角色，而只显示头像，如下：

```nani
@char CharacaterId visible:false
```

万一你需要频繁改变头像，而不显示角色。可以将角色配置菜单中的 `Auto Show On Modify` 关闭。如此你就不需要每次都取修改`visible:false` 了。


## 说话人高亮

当在角色配置菜单中打开时，将为说话的角色加高亮效果提示。参考如下视频：

![](https://www.youtube.com/watch?v=gobowgagdyE)

## 嘴唇同步

[传统立绘](/zh/guide/characters#传统人物) and [Live2D](/zh/guide/characters#Live2D人物) 人物支持名为“嘴唇同步”的特性，允许通过合适的事件通知，来在显示文字的时候，控制角色的嘴唇动画。

![](https://www.youtube.com/watch?v=fx_YS2ZQGHI)

当[自动语音](/zh/guide/voicing#自动语音) 功能开启时，嘴唇同步会由语音控制。另外，文字打印时也会激活该事件，在这种情况下，如果你想开始或停止该功能，（比如：在显示文字符号的时候停止嘴唇同步），使用[@lipSync]命令。


参考 [传统立绘](/zh/guide/characters#传统人物) and [Live2D](/zh/guide/characters#Live2D人物) 人物的实现部分来使用此功能。

## 关联打字机

用户可以使用`关联打字机`属性，将[文本打字机](/zh/guide/text-printers)和人物相关联。

![](https://i.gyazo.com/50ca6b39cd7f708158678339244b1dc4.png)

关联之后，程序就会自动根据人物来使用相应的打字机预设。

注意，[@print]命令（在处理普通内容文本行时程序也会使用该命令），会默认将关联的打字机设为默认，并隐藏其他打字机。在关联时，[@print]命令会自动改变其他打字机的可见，改变为相应打字机，将其设为默认。你可以通过关闭打字机元素配置菜单内的`Auto Default`属性停用该效果。停用之后，你必须手动通过[@printer]来切换默认打字机以及显示隐藏相应打字机。

## 图像精灵人物

图像精灵人物，是用于人物元素的最通用最简单的一种资源格式。[图像精灵](https://docs.unity3d.com/Manual/Sprites) 。 用于表现人物的外观。精灵可以是贴图或其他[Unity支持的格式](https://docs.unity3d.com/Manual/ImportingTextures) 。


## 切片精灵人物

通过开源资源[SpriteDicing](https://github.com/Elringus/SpriteDicing)创建 。
`切片精灵人物`特性能够通过复用相同图像部分，来显著减少图像文件大小。

![Sprite Dicing](https://i.gyazo.com/af08d141e7a08b6a8e2ef60c07332bbf.png)

通过unity内置的[Unity package manager](https://docs.unity3d.com/Manual/upm-ui.html) 来安装该资源包。打开该窗口，(Window -> Package Manager)点击“+”按钮，选择"Add package from git URL"，输入地址：`https://github.com/Elringus/SpriteDicing.git#package`点击“Add”导入。参考下图来安装：

![](https://i.gyazo.com/b54e9daa9a483d9bf7f74f0e94b2d38a.mp4)

`切片精灵人物`资源包含用于人物表现的切片精灵，每个外观都由名字来切分出其包含在图集中的精灵。

注意，部分切片人物数据参数（单位像素pixels per unit，锚点pivot）由图集资源控制。人物配置的数值，适用于渲染实际显示的图像。当图集参数改变的时候，记得重构该图集以保证设置参数生效。

![](https://i.gyazo.com/3765726bd326bb7a8a03a653f458cd3d.png)

以下视频内容为：创建和配置切分精灵图集；在已创建图集中添加新切分人物；使用Naninovel脚本控制其中人物。

![](https://www.youtube.com/watch?v=6PdOAOsnhio)

## 分层式人物

分层式人物特性，允许使用多个精灵（图层）来组合人物，并可以使用Naninovel脚本在运行时，单独或是成组切换其中的图层。

要创建分层式人物预制体，打开菜单`Create -> Naninovel -> Character -> Layered`。进入[预制体编辑模式](https://docs.unity3d.com/Manual/EditingInPrefabMode.html) ，来制作图层。有多个图层或组会被自动创建，你可以直接使用，删除或添加你自己的资源。

每个预制体下的子物体上都有[sprite renderer](https://docs.unity3d.com/Manual/class-SpriteRenderer.html) 组件的，视为一个图层，其他的物体一组。除了规划和变换的目的意外，将图层置于组内，可以让你通过Naninovel脚本来对其中单个的图层或是打开关闭一个组内的所有图层。（稍后详细说明）

要隐藏部分默认显示的图层，可以通过关闭`sprite renderer`组件（非该游戏物体）实现。

下图所示白框线为运行时所渲染的区域大小，确保调整为合适大小来减少内存占用以及锚点的正常工作。


![](https://i.gyazo.com/4ff103c27858ac9671ba3b94ab1ade20.png)

可是适当微调相应演出元素的游戏物体的尺寸。

在使用PS编辑美术素材时，考虑使用[PSD Importer package](https://docs.unity3d.com/Packages/com.unity.2d.psdimporter@3.0/manual/index.html) 来导入相应资源为预制体来保留图层和位置信息。记得导入的时候勾选上`Use Layer Grouping`来保留图层属性。

不要忘记添加在 (`Naninovel -> Resources -> Characters`)创建好的预制体，选择"Naninovel.LayeredCharacter"并把预制体拖拽到"Resource"栏。

要在Naninovel脚本控制分层式人物元素，像其他人物类型一样使用[@char] 命令。唯一区别是设置不同外观时，使用的是*图层组合表达式*而非ID，有以下三种表达式：

 - 打开一组中的单个图层: `group>layer`
 - 打开一个图层: `group+layer`
 - 关闭一个图层: `group-layer`

比如，“Miho”有一个包含三个图层的身体组，"Uniform"， "SportSuit" 和 "Pajama"。
要开启其中的“Uniform”层关闭另外两层，使用如下命令：

```nani
@char Miho.Body>Uniform
```

要开启关闭一个图层而不影响同组其他层，依序使用“+”和“-”而不是“>”。你可以使用这些符号定义多个表达组合：


```nani
; 打开glasses,关闭hat,选择 "Cool" 表情。
@char CharId.Head/Accessories+BlackGlasses,Head-Hat,Head/Emotions>Cool
```

要选择不属于任何组的属于根预制体的层，省略组别，如下：


```nani
; "Halo" 层位于根预制体，将其关闭。
@char CharId.-Halo
```


也可以通过在合成表达式中省略图层名称来影响组中的所有图层（以及使用选择表达式时，还会影响其相邻图层）：

```nani
; 关闭 "Body/Decoration" 组中所有层
@char CharId.Body/Decoration-

; 打开所有存在的图层
@char CharId.+

; 假定`Poses/Light` 和 `Poses/Dark` 组 (每个都有多个图层),
; 打开所有 `Light` 组内的精灵，而关闭所有 `Dark` 组内的图层。
@char CharId.Poses/Light>
```

以上表达式式，不仅会影响有明确写出来的子组别，而是会依次改变所有其目录下的图层。

当一个外观并未专门定义时（如`@char CharId`，预先没定义时），则会使用默认的外观。默认外观图层的启用状态会和预制体保持一直。

以下视频内容时演示如何设置分层式人物，以及如何通过naninovel脚本来控制。


![](https://www.youtube.com/watch?v=Bl3kXrg8tiI)

::: info NOTE
`@char Miho.Shoes>`命令在视频中实际上时选中的"Shoes"组（关闭所有相邻组），而不是隐藏。正确的隐藏命令为`@char Miho.Shoes-`，
:::

可以通过`Layered Actor Behaviour`组件的`Composition Map`属性，来为构成分层人物的部件进行组别统筹，使用设定表达形的key值来调用：


![](https://i.gyazo.com/ede5cde3548a3187aa714d3e140750ba.png)

— 定义好的key值可以用来直接调用显示相应外观：

```nani
; 等效于同时使用 `Body>Uniform,Hair/Back>Straight,Hair/Front>Straight,Shoes>Grey`.
@char Miho.Uniform
; 等效于同时使用 `Hair/Back>Straight,Hair/Front>Straight`.
@char Miho.StraightHair
```

可以参照下图操作，在相应条目位置右键选择"Preview Composition"，在编辑时对编辑的表现外观进行预览。


![](https://i.gyazo.com/9fb0aeccf4f33245d9f975592ee86dbc.gif)

注意，所有分层部件，运行时并不直接由Unity相机渲染，而是在渲染完成后填充至缓存的渲染贴图上，之后由Naninovel的相机显示出来。这样的流程能够避免深度冲突问题，并以此来支持动画的渐变特效。


## 传统人物

传统的人物模型应该时最被广泛使用的人物元素模板了。该类型人物基于有`CharacterActorBehaviour`组件的预制体。外观更改和其他人物参数修改，都基于[Unity事件](https://docs.unity3d.com/Manual/UnityEvents.html) 来进行通信，以便开发时能够让你应用并实现任何你想要的修改效果。


![](https://i.gyazo.com/9f799f4152782afb6ab86d3c494f4cc4.png)


要通过模板创建通用人物预制体，请使用Create -> Naninovel -> Character -> Generic菜单。

要为通用人物模型设置嘴型同步特性，使用`CharacterActorBehaviour`组件上的`On Started Speaking`和`On Finished Speaking`的unity事件。当角色成为或不再是任何已打印消息的作者时（或者当消息完全显示时），将调用事件来触发任何自定义逻辑实现，例如开始或停止受控角色的嘴部动画。这类似于UI的`On Show` 和`On Hide`事件。参考[自定义UI引导](/zh/guide/user-interface#添加自定义UI) 来了解其工作机制。

参考以下视频来了解如何设置3D骨骼模型为传统模型，并通过[Animator](https://docs.unity3d.com/Manual/class-AnimatorController.html) 组件来调用外观改变。


![](https://www.youtube.com/watch?v=HPxhR0I1u2Q)

注意，unity的`Animator`组件如果在游戏物体同一帧进行开启/关闭触发时调用`SetTrigger` 可能会失败。因此，你可以使用`GameObject.SetActive`方法解决可见度的修改（参考上述教程），考虑使用渲染器来开启/关闭子物体。


## Live2D人物

Live2D人物模型使用的是通过[Live2D Cubism](https://www.live2d.com) 2D模型动画软件创建的。

要是live2D模型，你需要先导入[Unity Live2D Cubism 开发SDK](https://live2d.github.io/#unity) ，参阅官方说明文档。

然后下载导入[Live2D扩展支持包](https://github.com/Naninovel/Live2D/raw/master/NaninovelLive2D.unitypackage) 。

Live2D模型预制体使用时，都必须有`Live2DController`组件。外观动作调用使用的是Animator组件的[SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) 命令触发。相应外观为触发名。比如，如果你想调用“Kaori”的live2D模型预制体，并想调用其名为“surprise”的触发器，使用以下命令

```nani
@char Kaori.Surprise
```

注意，以上命令只是试图去调用预制体上位于animator控制器内的[SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) 内“surprise”的参数。你必须去自己手动设置好[animator](https://docs.unity3d.com/Manual/Animator) 其中要使用的调用参数。

::: warning
最新版本的Cubism-SDk是直接和`Animator`组件一起工作的。Cubism 2.x版本的表情和动作（分别导出为expression.json和pose.json文件），现在已经被[弃用](https://docs.live2d.com/cubism-sdk-tutorials/blendexpression) ，也不被Naninovel的live2D扩展支持了。
:::

当`CubismLookController` 和 `CubismMouthController`组件存在在于预制体时，`Live2DController`组件就能够控制人物的朝向以及嘴唇动画（即是嘴型同步特性）。

![](https://i.gyazo.com/498fe948bc5cbdb4dfc5ebc5437ae6b4.png)

参考Live2D的说明文档获取更多细节设置：
[眼部追踪](https://docs.live2d.com/cubism-sdk-tutorials/lookat) 以及 [嘴型同步](https://docs.live2d.com/cubism-sdk-tutorials/lipsync) 。

请注意，Live2DController在Live2D模型预制体（将Live2D模型导入Unity时会自动创建）中需要一个“可绘制”的游戏对象。控制器将在运行时根据@char命令的“ scale”参数缩放此游戏对象。因此，将忽略在编辑器中设置的任何本地缩放值。要设置Live2D预制体的初始缩放，请设置父游戏对象的缩放值[参考该视频指引](https://youtu.be/rw_Z69z0pAg?t=353) 。

以下视频引导，包含内容为：从Cubism编辑器导出Live2D人物；配置预制体；创建简单动画状态机；通过Naninovel脚本控制人物。

![](https://www.youtube.com/watch?v=rw_Z69z0pAg)

::: tip EXAMPLE
参考 [GitHub的Live2D示例](https://github.com/Naninovel/Live2D) 来了解使用。注意其中不包含Live2D的SDK以及Naninovel相关资源。直接打开会有报错，再导入后解决报错。
:::
