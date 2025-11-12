# 角色

角色是用于表示场景中实体的演出元素（Actor），它们显示在 [背景](/zh/guide/backgrounds) 之上。

一个角色演出元素由以下属性定义：名称、外观、可见性、变换（位置、旋转、缩放）以及朝向。角色可以随时间改变外观、可见性、位置与朝向。

角色的行为可通过 `Naninovel -> Configuration -> Characters` 菜单进行配置；有关可用选项，请参阅 [配置指南](/zh/guide/configuration#characters)。角色资源管理器可通过 `Naninovel -> Resources -> Characters` 菜单访问。

![Add Character](https://i.gyazo.com/c8a4f7f987621831b4a2ecb3145a4a07.png)

在 Naninovel 脚本中，角色通过 [@char] 指令进行控制：

```nani
; 显示名为 `Sora` 的角色，使用默认外观。  
@char Sora

; 与上相同，但将外观设置为 `Happy`。  
@char Sora.Happy

; 与上相同，但将角色位置设置为距离场景左边界 45%、底部边界 10%，并使其朝向左侧。  
@char Sora.Happy look:left pos:45,10
```

::: tip
可使用 [Scene Assistant](https://github.com/idaocracy/NaninovelSceneAssistant) 扩展插件帮助在场景中定位演出元素。
:::

## 演出元素记录

当角色数量较多，不方便通过编辑器菜单手动分配时，可以使用演出元素记录资产（`Create -> Naninovel -> Actor Record -> Character`）。它们支持批量编辑，并可通过文件夹进行组织。下面的视频演示了示例操作：

![](https://www.youtube.com/watch?v=2YP-36THHvk)

要将外观资源与演出元素记录关联，可使用 [可寻址资源系统（Addressable）](/zh/guide/resource-providers#addressable)。例如，要将名为 “Happy” 的外观与角色 “Kohaku” 关联，请将对应纹理资源地址设为 `Naninovel/Characters/Kohaku/Happy`，并添加 `Naninovel` 标签。有关可寻址资源提供程序的更多信息，请参阅 [资源提供者文档](/zh/guide/resource-providers#addressable)。

## 姿势

::: tip
译注：一般常被用于切换角色的表情、服装差分（Diffs）。
:::

每个角色都有一个 `Poses` 属性，用于定义命名状态（姿势）。

![](https://i.gyazo.com/a049313d5c7cfa9897dd8c5f5ee00af3.png)

姿势名称可以作为 [@char] 指令中的外观（appearance）使用，以一次性应用姿势中预设的所有参数，而无需在指令参数中逐项单独指定。

```nani
; 当 `Kohaku` 角色定义了名为 `SuperAngry` 的姿势时，  
; 将应用该姿势中指定的所有参数。  
@char Kohaku.SuperAngry

; 与上相同，但使用 `DropFade` 过渡效果，持续 3 秒。  
@char Kohaku.SuperAngry transition:DropFade time:3
```

请注意，当使用姿势作为外观时，你仍然可以在指令中单独覆盖某些参数，例如：  

```nani
; 当 `Kohaku` 角色定义了名为 `SuperAngry` 的姿势时，  
; 将应用该姿势状态中的所有参数，  
; 但会在指令中重写 `tint`（色调）属性。  
@char Kohaku.SuperAngry tint:#ff45cb
```

在角色与背景配置中，还可以找到 `Shared Poses`（共享姿势）—— 这些姿势可在所有同类演出元素之间共享。共享姿势的典型用途包括：复用“说话/非说话”模板，或创建与摄像机视角对应的预设舞台。

![](https://i.gyazo.com/c4c6d850d2a6efae269164af58da1ed3.png)

无论是单个角色姿势还是共享姿势，都可以通过专用的 `pose` 参数应用：

```nani
@char Kohaku.Happy pose:DownLeft
@char Yuko.Surprise pose:UpCenter
@char Misaki pose:UpRight
```

![](https://i.gyazo.com/7bdbad68dd08c97032af174875ac4978.png)

当角色姿势与共享姿势同名时，角色专属姿势优先于共享姿势。这允许在需要时为特定角色覆盖共享姿势。

## 显示名称

在角色配置中，当启用了 `Has Name` 选项后，你可以为特定角色设置 `Display Name`（显示名称）。设置后，显示名称将会在输出窗的姓名标签 UI 中显示，替代角色的 ID。这使你能够使用包含空格和特殊字符的复合角色名（这些字符在 ID 中是不允许的）。

此外，还可以通过 “CharacterNames” [受管文本](/zh/guide/managed-text) 文档来指定名称。该文档会在运行生成受管文本资源任务时自动创建。使用这种方式可在 Unity 编辑器外编辑或本地化角色显示名称。受管文本文档中的记录优先级高于演出元素配置中设置的显示名称，因此会覆盖后者。

你还可以将显示名称绑定到自定义变量，以便在游戏过程中通过 Naninovel 脚本动态更改名称。要绑定显示名称，请在角色配置菜单中将自定义变量名用花括号 `{}` 包裹。

![](https://i.gyazo.com/931d0f6b09c77e13e7800d102c089d44.png)

之后，只需在脚本中修改该变量的值，对应角色的显示名称也会随之改变：

```nani
@set PlayerName="Mistery Man"
Player: ...

@set PlayerName="Dr. Stein"
Player: You can call me Dr. Stein.
```

你也可以利用名称绑定功能，让玩家通过 [@input] 指令来自定义自己的显示名称：

```nani
@input PlayerName summary:"Choose your name."
Player: You can call me {PlayerName}.
```

花括号 `{}` 中的内容实际上会被视为一个完整的 [脚本表达式](/zh/guide/script-expressions)，这允许在评估显示名称时实现更复杂的逻辑。例如，你可以在游戏前期使用一个预定义且可本地化的角色名称，在某个时刻再让玩家自定义名字。

假设角色 ID 为 “Char1”，预定义名称存储在 “T_PredefinedName” [受管文本记录](/zh/guide/managed-text#script-text) 中，玩家输入的自定义名称存储在 “name” [自定义变量](/zh/guide/custom-variables) 中，而当玩家设置了名字时，变量 “nameSet” 会被设为 `true`。此时可在 `Display Name` 属性中指定以下表达式：`{ nameSet ? name : T_PredefinedName }`

![](https://i.gyazo.com/b4bed71310ae8d0f80aff11d910d6e5b.png)

然后在脚本中编写如下场景：

```nani
@char Char1

Char1: My name is now pre-defined by `T_PredefinedName` managed text record.
Char1: It's localizable; try changing the locale and it will update accordingly.
Char1: Now, we'll make the player input a custom name.

; 注意 `value` 参数中指定的默认输入值：  
; 它从受管文本中获取，因此也支持本地化。  
@input name summary:"Choose your name." value:{T_DefaultName}

; 此处我们设置用于显示名称表达式的变量，  
; 以决定显示名称取值来源。  
@set nameSet=true

Char1: My display name is now bound to `name` custom variable.
```

当 `Has Name` 被禁用时，输出窗 UI 中既不会显示角色显示名称，也不会显示角色 ID。这对于 [旁白角色](/zh/guide/characters#narrator-characters) 非常有用 —— 它们可以拥有 [关联输出窗](/zh/guide/characters#linked-printer)，但其 ID 不应在界面上显示。

## 名称标签

虽然上文所述的显示名称系统在大多数情况下都推荐使用，但有时你可能希望仅在几行文本中临时更改角色名，或让多名角色共同成为某段文本的发言者。为每种情况单独设置一个演出元素或变量显示名称是不切实际的。此时可以使用 [@print] 指令的 `as` 参数：

```nani
; 即使角色 “Kohaku” 在配置中设置了自定义显示名称，  
; 仍可使用 “Someone” 作为该行文本的显示名称进行打印。  
@print "Lorem ipsum." author:Kohaku as:"Someone"

; 以 “All Together” 作为作者名打印该行文本，  
; 并让所有可见角色成为这条文本的发言者。  
@print "Lorem ipsum!" author:* as:"All Together"

; 类似，但仅让 “Kohaku” 与 “Yuko” 成为发言者。  
@print "Lorem ipsum?" author:Kohaku,Yuko as:"Kohaku and Yuko"
```

—— `as` 参数支持本地化，并会暴露在脚本本地化文档中以供翻译。此外，[发言者高亮](/zh/guide/characters.html#speaker-highlight) 功能可识别作者 ID 中的 `*` 与 `,`，以便在发言时同时高亮所有或指定的角色。

## 消息颜色

当在角色配置中启用了 `Use Character Color` 选项时，只要在 [@print] 指令或普通文本行中指定了相应的角色 ID，输出窗中的文本消息与角色名称标签都会被染上该角色所设置的颜色。

以下视频演示了如何使用显示名称与角色颜色功能：

![](https://www.youtube.com/watch?v=u5B5s-X2Bw0)

## 头像贴图

你可以通过 [@char] 指令的 `avatar` 参数为角色指定头像贴图。当文本消息与该角色相关联时，兼容的文本输出窗会显示相应的头像。

![](https://i.gyazo.com/83c091c08846fa1cab8764a8d4dddeda.png)

目前，仅内置的 `Wide` 与 `Chat` 输出窗（及其 TMPro 版本）支持头像功能。若希望在自定义输出窗中启用此功能，请将带有 `Author Image` 组件的游戏对象指定给 `Revealable Text Printer Panel` 组件的 `Author Avatar Image` 属性。

要使用头像，首先需在角色配置菜单中通过 `Avatar Resources` 属性添加头像资源并为其命名。

![](https://i.gyazo.com/5a0f10d174aa75ed87da1b472567e40b.png)

::: info 提示
头像名称可以任意指定，不必包含现有的角色 ID 或外观名称。只有当你希望头像与角色自动关联并自动显示时，才需要匹配角色 ID。
:::

你可以通过以下方式显示指定的头像贴图：

```nani
@char CharacaterId avatar:AvatarName
```

要为角色设置默认头像，请将头像贴图资源命名为 `CharacterID/Default`，例如，要为 ID 为 `Kohaku` 的角色设置默认头像，请将头像资源命名为 `Kohaku/Default`，默认头像会自动显示，即使在 [@char] 指令中未指定 `avatar` 参数。

你还可以将头像与特定的角色外观关联，这样当角色更换外观时，头像也会自动切换。为此，请按以下格式命名头像资源：`CharacterID/CharacterAppearance`，其中 `CharacterAppearance` 是要与头像资源对应的外观名称。

若只想在文本输出窗中显示角色头像而隐藏角色本体，可在 [@char] 指令中将 `visible` 参数设置为 `false`，例如：

```nani
@char CharacaterId !visible
```

如果你需要频繁切换头像而角色始终保持隐藏，建议在角色配置菜单中禁用 `Auto Show On Modify` 选项；禁用后，你在修改隐藏角色的参数时无需再指定 `!visible`。

::: info NOTE
**头像与角色外观并没有直接关联**，因此不应将头像视为角色在场景中的呈现方式。头像是一种独立功能，用于将任意图像“注入”至兼容的文本输出窗中。如果你希望让角色实体真正出现在文本输出窗或自定义 UI 中，请参考 [将角色渲染至贴图](/zh/guide/characters.html#render-to-texture) 功能。
:::

## 发言者高亮

当在角色配置中启用此功能后，系统会根据最近打印的消息是否与该角色关联，自动为角色设置指定的 [姿势（poses）](/zh/guide/characters#poses)。

下方视频展示了旧版 Naninovel 的示例，当时只能为发言者应用色调（tint color）；在当前版本中，设置方法类似，但改为指定姿势名称。

![](https://www.youtube.com/watch?v=gobowgagdyE)

## 唇形同步

### 事件驱动

可动画化的角色实现（如通用型、分层型、Live2D 等）提供了 `On Started Speaking` 与 `On Finished Speaking` 两个 Unity 事件。当角色成为或停止成为打印消息的作者时（更准确地说，是当消息完全显示时），这些事件会被触发，从而允许你执行自定义逻辑，例如启动或停止角色的嘴部动画。

![](https://www.youtube.com/watch?v=fx_YS2ZQGHI)

当启用了 [自动语音](/zh/guide/voicing#auto-voicing) 功能时，这些事件将由语音配音驱动；否则，它们将由打印文本消息驱动。在后一种情况下，你可能希望手动屏蔽部分事件（例如防止在打印标点符号时触发嘴部动画）；可使用 [@lipSync] 指令来实现。

### 音频驱动

如果你希望通过语音音频的实际波形驱动角色嘴部动画，可在角色配置中使用 `Voice Source` 选项。当为其指定一个带有 Unity `Audio Source` 组件的预制体后，Naninovel 会在角色对象下实例化该预制体，并通过该音频源组件播放角色语音。

借助这个专用的角色语音音频源组件，你可以接入自定义方案分析播放中的音频波形，从而据此驱动嘴部动画。市面上有多种第三方方案可以实现这一点，例如 Live2D 的 `Cubism Audio Mouth Input` 组件或 [SALSA](https://assetstore.unity.com/packages/tools/animation/salsa-lipsync-suite-148442) 插件。

## 链接输出窗

你可以通过 `Linked Printer` 属性将一个 [文本输出窗](/zh/guide/text-printers) 与角色关联。

![](https://i.gyazo.com/50ca6b39cd7f708158678339244b1dc4.png)

当角色与输出窗关联后，该输出窗将自动用于处理该角色所说的文本消息。

请注意，[ @print ] 指令（打印普通文本行时也会在底层使用）默认会将关联的输出窗设为默认输出窗，并隐藏其他可见的输出窗。当输出窗与角色相连时，打印指令会在输出该角色文本时自动切换当前可见与默认的文本输出窗。若希望禁止此行为，可在输出窗角色配置菜单中禁用 `Auto Default` 属性；禁用后，你需要使用 [@printer] 指令手动显示、隐藏或切换默认输出窗。

::: tip
将输出窗链接到 [旁白角色](/zh/guide/characters#narrator-characters)，并禁用 `Has Name`，即可让旁白文本自动使用该输出窗，无需每次都用 [@printer] 指令切换回非角色（默认）输出窗。
:::

## 占位角色

占位角色是默认实现，用于在尚未准备好角色视觉资源时进行剧本草拟。它会根据角色的元数据（如标识符、显示名称与颜色）自动生成角色的占位显示。

![](https://i.gyazo.com/a94fdcc2cd645738d71baa42c424ed65.png)

下图展示了一个 [占位背景](/zh/guide/backgrounds#placeholder-backgrounds) 以及若干个置于其上的占位角色。注意，当前发言的角色会通过放大与提高不透明度来突出显示。

![](https://i.gyazo.com/cebb0506d3743e2e1b20b1d3c214239a.png)

## 精灵角色

精灵（Sprite）实现是最常见且最简单的角色类型。它通过一组包裹在四边形网格（Sprite）上的 [贴图（Texture）](https://docs.unity3d.com/Manual/Textures.html) 来表现角色外观。贴图可以是 `.jpg`、`.png`、`.tiff`、`.psd` 等任意 [Unity 支持的图像格式](https://docs.unity3d.com/Manual/ImportingTextures)。

::: tip
请选择最适合你开发流程的文件格式。在构建项目时，Unity 会自动将所有源资源（贴图、音频、视频等）转换为最适合目标平台的格式，因此你在项目中存储的原始格式不会影响最终构建结果。关于 Unity 如何管理项目资源的更多信息，请参阅 [官方文档](https://docs.unity3d.com/Manual/AssetWorkflow)。
:::

场景中精灵角色的初始（未缩放）大小取决于相机配置中的参考分辨率、角色配置菜单中 `Pixel Per Unit`（每单位像素数）属性，以及源贴图的分辨率。

为获得最佳渲染质量与性能，通常建议所有角色保持默认的 `Pixel Per Unit` 值（100），并通过贴图分辨率控制角色在屏幕上的初始尺寸。例如，当你的游戏参考分辨率为 `1920x1080` 时，若希望角色立绘占据整个屏幕高度，则将贴图高度设为 `1080` 像素；若希望另一个角色高度占屏幕的 2/3，则将贴图高度设为 `1080 * 2/3`，以此类推。

## 切割精灵角色

基于开源的 [SpriteDicing](https://github.com/elringus/sprite-dicing) 包构建的 `DicedSpriteCharacter` 实现，可通过复用角色贴图中的相同区域，显著减少构建体积与纹理内存占用。

![Sprite Dicing](https://i.gyazo.com/af08d141e7a08b6a8e2ef60c07332bbf.png)

可通过 [Unity 包管理器](https://docs.unity3d.com/Manual/upm-ui.html) 安装此包：打开包管理器窗口（`Window -> Package Manager`），点击 “+” 按钮，选择 “Add package from git URL”，然后输入以下 URL：

```
https://github.com/elringus/sprite-dicing.git?path=/plugins/unity/Assets/SpriteDicing
```

— 在输入框中粘贴上述 URL 并点击 “Add”。

![](/assets/img/docs/upm.mp4)

::: info 注意
在从 Git 仓库安装包之前，请确保你的电脑上已安装 [Git 客户端](https://git-scm.com/downloads)，并且 Git 可执行文件路径已加入 [PATH 系统环境变量](https://en.wikipedia.org/wiki/PATH_(variable))。（通常在安装 Git 时会自动完成此操作。）
:::

当通过 UPM 安装了 “SpriteDicing” 扩展后，角色实现列表中将出现 `Naninovel.DicedSpriteCharacter` 选项。

![](https://i.gyazo.com/25360c9287a7b5a6a7feaba987a2bbb4.png)

`DicedSpriteAtlas` 资源包含角色的各个外观，它们将作为切割精灵角色的素材使用。每个外观名称与图集中对应的切割精灵一一对应。

::: tip
角色的元数据属性（如每单位像素数、枢轴点等）会应用于场景中用于渲染角色的纹理，而图集中的类似属性则应用于生成的切割精灵。当修改图集属性后，请记得重新构建图集以使更改生效。
:::

下方视频教程演示了如何创建并配置切割精灵图集、如何基于该图集添加新的切割角色，以及如何通过 Naninovel 脚本控制该角色。

![](https://www.youtube.com/watch?v=6PdOAOsnhio)

关于更多切割选项与使用示例，请参考扩展文档：https://dicing.elringus.com/guide/unity。

::: tip 示例
关于切割角色的完整示例，请参见 [Diced Actor 示例](/zh/guide/samples#diced-actor)。
:::

## 分层角色

分层角色实现允许将角色由多个图层组合而成，并可在运行时通过 Naninovel 脚本单独或成组地切换这些图层。

::: tip
分层角色是目前最灵活的角色实现方式，支持所有渲染特性（相比通用实现更强大）。即使你不打算使用图层表达式，而是想通过 Unity 的 Animator 或自定义系统控制外观，或希望渲染复杂对象（如粒子系统、第三方渲染器等），也建议先查看分层角色提供的 [仅渲染模式](/zh/guide/characters#outsourcing-appearance-management) 与 [相机渲染模式](/zh/guide/characters#camera-rendering)，再考虑使用通用或自定义实现。
:::

要创建一个分层角色预制体，可通过菜单 `Create -> Naninovel -> Character -> Layered` 新建资源。进入 [Prefab 编辑模式](https://docs.unity3d.com/Manual/EditingInPrefabMode.html) 以组合图层。默认情况下会生成多个图层和分组，你可以直接使用，也可以删除并添加自己的。

预制体根对象的每个子对象，若挂载了继承自 [Renderer](https://docs.unity3d.com/ScriptReference/Renderer.html) 的组件  
（如 `SpriteRenderer`、`MeshRenderer` 等），都将被视为一个 **图层（Layer）**；其他子对象则被视为 **分组（Group）**。除了组织结构和变换用途外，将图层置于分组中还允许你在 Naninovel 脚本中用一个表达式选择或启用 / 禁用整个分组内的图层（稍后详述）。

::: info 注意
在默认（非相机）渲染模式下，仅支持 `Sprite Renderer` 的 “Simple” 绘制模式；若选择其他模式，实际渲染时也会按 “Simple” 方式处理。
:::

若希望某些图层默认不可见，请禁用其 **渲染器组件**（不要禁用整个对象）。

预制体中绘制的白色框用于定义角色画布（Actor Canvas），游戏运行时该区域会被渲染到一张渲染纹理（Render Texture）中。请尽量减少画布内的空白区域，通过调整图层和分组位置避免浪费纹理内存，并确保锚点对齐正确。若需自定义画布大小（例如某些图层带动画可能会越出默认范围），可在根对象上添加 `Render Canvas` 组件并调整 `Size` 属性。

![](https://i.gyazo.com/4ff103c27858ac9671ba3b94ab1ade20.png)

你可以通过缩放根对象来微调角色默认显示尺寸。

在 Photoshop 中制作分层角色立绘时，可使用 Unity 的 [PSD Importer 包](https://docs.unity3d.com/Packages/com.unity.2d.psdimporter@3.0/manual/index.html) 自动生成保留所有图层与位置的角色预制体。若希望保留图层层级结构，请在导入设置中启用 `Use Layer Grouping` 选项。

::: tip
使用 Sprite 时，请在贴图导入设置中将 `Mesh Type` 设为 `Full Rect`，以防止渲染异常。

![](https://i.gyazo.com/16ebf843081c826e0add1a6304c2608f.png)
:::

别忘了将创建好的分层角色预制体添加到角色资源中（`Naninovel -> Resources -> Characters`）。在配置资源记录时，选择 `Naninovel.LayeredCharacter` 实现，并将预制体拖放到 “Resource” 字段中。

要在 Naninovel 脚本中控制分层角色，可像控制其他角色实现那样使用 [@char] 指令。唯一的区别是外观设置方式：分层角色使用 **图层组合表达式（Layer Composition Expression）**，而非单一外观 ID。表达式有三种类型：

- 启用组内单个图层：`group>layer`  
- 启用图层（不影响同组其他图层）：`group+layer`  
- 禁用图层：`group-layer`

例如，假设角色 “Miho” 拥有一个 “Body” 分组，其中包含三个图层：“Uniform”（制服）、“SportSuit”（运动服）和 “Pajama”（睡衣）。要启用 “Uniform” 图层并禁用其他图层，可使用以下指令：

```nani
@char Miho.Body>Uniform
```

要在不影响同组其他图层的情况下启用或禁用图层，可分别使用 “+” 与 “-” 替代 “>”。你还可以通过逗号分隔多个组合表达式：

```nani
; 启用眼镜，禁用帽子，选择 “Cool” 表情。
@char CharId.Head/Accessories+BlackGlasses,Head-Hat,Head/Emotions>Cool
```

若要操作未归属于任何分组的图层（即预制体根对象下的直接子节点），只需省略分组部分，例如：

```nani
; 若 “Halo” 图层对象位于预制体根下，禁用它。
@char CharId.-Halo
```

同样，你也可以通过省略图层名来作用于整个分组中的所有图层（使用 “选择表达式” 时，还会同时影响相邻分组）：

```nani
; 禁用 “Body/Decoration” 分组中的所有图层。
@char CharId.Body/Decoration-

; 启用所有现有图层。
@char CharId.+

; 若存在 `Poses/Light` 与 `Poses/Dark` 分组，  
; 则启用 `Light` 分组内的所有图层，禁用 `Dark` 分组内的图层。
@char CharId.Poses/Light>
```

以上表达式不仅会影响目标分组的直接子图层，还会递归地影响所有嵌套分组内的图层。

当未指定外观（例如使用 `@char CharId`，且未事先设置任何外观）时，将使用默认外观；分层角色的默认外观等同于预制体在编辑器中的可见状态。

下方视频展示了如何设置分层角色并通过 Naninovel 指令进行控制。

![](https://www.youtube.com/watch?v=Bl3kXrg8tiI)

::: info 注意
视频中出现的 `@char Miho.Shoes>` 指令实际上会选择 “Shoes” 分组（并禁用其相邻分组），而不是隐藏它。若要隐藏分组，应使用指令 `@char Miho.Shoes-`。
:::

可以在 `Layered Character Behaviour` 组件的 `Composition Map` 属性中将组合表达式映射为键值：

![](https://i.gyazo.com/ede5cde3548a3187aa714d3e140750ba.png)

— 然后即可使用这些键值来指定分层角色外观：

```nani
; 等价于 `Body>Uniform,Hair/Back>Straight,Hair/Front>Straight,Shoes>Grey`。
@char Miho.Uniform
; 等价于 `Hair/Back>Straight,Hair/Front>Straight`。
@char Miho.StraightHair
; 也可以混合使用键值与表达式。
@char Miho.Uniform,Hair/Front>Short
```

在编辑分层角色预制体时，可右键单击映射项，选择 “Preview Composition” 以预览映射的组合效果。另一个菜单项 “Paste Current Composition” 则会根据当前启用 / 禁用的渲染器状态生成组合表达式字符串， 并将其粘贴到正在查看的映射记录中，方便快速将当前预制体状态映射为组合项。

![](https://i.gyazo.com/84a2f8e51997cdccbfb8321d58586d2a.mp4)

请注意，这些图层对象在运行时并不会被 Unity 摄像机直接渲染。它们在每次外观（组合）更改时会被渲染到临时渲染纹理，再由该纹理贴到供 Naninovel 摄像机显示的自定义网格上。这种机制用于避免半透明叠加问题，并支持转场动画等效果。

若希望为分层角色应用动画或其他动态效果，请启用 `Layered Character Behaviour` 组件中的 `Animated` 属性。启用后，图层将会在每帧重新渲染（而非仅在外观变化时）。

### 外部外观管理

分层角色实现可用于启用各种内建渲染特性（如半透明叠加修正、转场效果、模糊、景深支持等），但有时你可能希望使用 Unity 的 [Animator](https://docs.unity3d.com/Manual/class-Animator.html) 或其他外部工具来管理角色外观。默认情况下，分层行为会在触发 `On Appearance Changed` 事件时使用分层表达式报告外观变化，但这种行为在上述情境下可能并不理想。

启用 `Render Only` 选项可禁用图层相关逻辑，使事件报告的外观与脚本指令中指定的内容保持一致。同时，你还需在组件中设置 `Default Appearance` 属性，以防止系统根据预制体初始图层组合自动推算默认外观。

### 相机渲染

若角色预制体中包含复杂的渲染器（如粒子系统、拖尾、Sprite Mask 或自定义 / 第三方渲染器），可以通过在 `Layered Behaviour` 组件的 `Render Camera` 字段中分配一个相机（该相机需放置在角色预制体内部）以继续使用分层角色实现。

当指定了渲染相机后，角色将由该相机负责渲染内容，而非使用默认的自定义渲染流程。此方式可解除一些固有限制（例如缺乏模板缓冲支持），但也有一个前提：为避免内容被主相机渲染（即“泄漏”），你需要专门保留若干 [Layers](https://docs.unity3d.com/Manual/Layers.html) 用于渲染此类角色。

Unity 共提供 32 个图层，其中 8 个供引擎内部使用。剩余图层可自行分配（默认未被使用）。若希望 Naninovel 能使用这些图层来渲染相机模式下的分层角色，请将图层命名以 `Naninovel` 开头，例如：`Naninovel 1`、`Naninovel 2` 等。

![](https://i.gyazo.com/dfbb4306553c85a4683fffb0fef03de3.png)

需要添加的图层数量取决于任意时刻生成的相机渲染分层角色的最大数量，无论它们当前是否可见。当分层角色被渲染时，它会从池中占用一个图层；当角色被隐藏时，该图层会被释放供其他角色复用。然而，角色在外观变化时（例如首次加入场景、加载存档、回滚等）也会触发渲染，因此 **图层池的大小必须足以容纳同时存在的所有相机渲染角色数量**，而不仅是当前可见的数量。若需在隐藏后彻底销毁角色，请使用 [@remove] 指令。

添加图层后，在 Naninovel 的相机配置中为 `Custom Camera Prefab` 分配一个自定义相机预制体，并在其裁剪遮罩（Culling Mask）中禁用所有 `Naninovel ...` 图层。这可防止“原始”分层角色被主 Naninovel 相机捕获。请注意，这里指定的相机应为独立预制体，而不是角色预制体内部所使用的相机。

![](https://i.gyazo.com/e2f713e4e212718f50e028cdf546aaba.png)

在相机渲染模式下，若分层角色预制体中的对象带有 `Layered Actor Layer` 组件，则该对象会被视为一个“图层”；其余对象则被视为“分组”。为含有该组件的对象设置 `On Layer Held` 与 `On Layer Released` 事件，以定义图层被占用与释放时的行为。通常可在被占用时启用渲染器并将图层分配给宿主对象，在释放时禁用渲染器（防止被其他相机渲染）。

![](https://i.gyazo.com/4dbfe57dbf6b7365e1e7db78f707f412.png)

在相机模式下，图层的激活状态由对象的启用状态（Active State）控制，而非渲染器的启用状态。若要设置角色的默认外观，请在层级中启用或禁用对应对象。

::: tip
当图层包含大量子对象时，逐个为它们设置“持有 / 释放”事件会十分繁琐。此时可使用自定义事件处理器批量应用更改。请参见 [示例](https://discord.com/channels/545676116871086080/1369982706393284700)，了解如何批量更新一个图层下所有子渲染器。
:::

请确保角色预制体根对象上挂载了 `Render Canvas` 组件，该组件在相机模式下是必需的。其作用与普通渲染模式类似，用于限制渲染纹理大小，因此应保持画布紧凑。

若角色渲染需要额外图层（例如专用于 Unity 2D 灯光的图层），可在分层行为组件中的 `Camera Mask` 属性中添加这些图层。Naninovel 在渲染角色时会保留这些图层于相机裁剪遮罩中。

::: tip 示例
关于设置分层角色的完整案例，请参见 [Layered Actor 示例](/zh/guide/samples#layered-actor)。
:::

## 通用角色

通用角色是最灵活的角色实现方式。它基于一个在根对象上挂有 `Generic Character Behaviour` 组件的预制体。外观变化及其他角色参数将通过 [Unity 事件](https://docs.unity3d.com/Manual/UnityEvents.html) 传递，从而允许你以任意方式实现底层对象的具体表现逻辑。

![](https://i.gyazo.com/d0ea1bf7a5ed3b4bb7eb70c4ddbfeba2.png)

::: info 注意
通用角色仅负责将脚本中的事件路由出去，具体的行为逻辑（例如角色如何响应外观或可见性变化、是否以及如何支持“说话高亮”等功能）均需用户自行实现。因此，请不要期望大多数与角色相关的特性能在通用实现中自动生效。
:::

要从模板创建一个通用角色预制体，请使用菜单：`Create -> Naninovel -> Character -> Generic`。

下面的视频教程展示了如何将一个 3D 绑定模型设置为通用角色，并通过 [Animator](https://docs.unity3d.com/Manual/class-AnimatorController.html) 组件将外观变化事件映射到绑定动画。请注意，视频录制于旧版本 Naninovel，部分属性与组件名称可能已更改，请以当前文档为准。

![](https://www.youtube.com/watch?v=HPxhR0I1u2Q)

::: tip
当游戏对象在同一帧内被启用 / 禁用时，Unity 的 `Animator` 组件可能无法正确注册 `SetTrigger`。如果你在控制可见性时使用了 `GameObject.SetActive`（如视频中所示），建议改为启用 / 禁用带渲染器的子对象。
:::

::: tip 示例
请参见 [通用角色示例](/zh/guide/samples#generic-actor)，该示例展示了如何通过通用角色实现托管 3D 动画模型。
:::

## 视频角色

视频角色使用循环播放的 [Video Clip](https://docs.unity3d.com/Manual/class-VideoClip) 资源来表现角色外观。

各平台支持的视频格式请参阅 [Unity 视频源兼容性文档](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility.html)。

若使用带透明通道（Alpha）的影片，请参考 [视频透明度格式指南](https://docs.unity3d.com/Manual/VideoTransparency.html)。

若希望特定外观不循环播放，请在外观名称后添加 `NoLoop`（不区分大小写）。

## Live2D 角色

Live2D 角色实现依赖于 [Live2D Cubism](https://www.live2d.com) 这款二维建模与动画制作软件生成的资源。

![](https://i.gyazo.com/b81df72fc7afaed569520496cbee09f0.mp4)

若要使用该实现，你需要先安装 [Live2D Cubism SDK for Unity](https://live2d.github.io/#unity)。有关安装与使用的详细说明，请参考 Live2D 官方文档。

安装完成后，点击 Unity 菜单 `Naninovel/Extensions/Enable Live2D` 以启用 Naninovel 模块，该模块提供 Live2D 与引擎之间的集成。

![](https://i.gyazo.com/e27ee50e8107147e20503a955ddcc548.png)

::: info 注意
此集成示例主要用于展示如何将 Naninovel 与第三方工具协同使用。我们会尽力保持该示例与 Live2D 的更新兼容，但其功能仅限于基础集成，无法针对 Live2D 产品的使用提供超出示例范围的支持或技术协助。
:::

作为资源的 Live2D 模型预制体应在根对象上挂载 `Live2DController` 组件。外观变化会作为 [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) 指令传递给 Animator 组件，其中外观名即为触发器名称。例如，若你有一个名为 “Kaori” 的 Live2D 角色预制体，并希望触发名为 “Surprise” 的动画，可使用以下指令：

```nani
@char Kaori.Surprise
```

请注意，上述指令仅会尝试在挂载于预制体上的 [Animator](https://docs.unity3d.com/Manual/Animator) 控制器中调用一个以 "Surprise" 为参数的 [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) 方法；你需要自行构建底层 Animator 状态机。

::: info 注意
当前版本的 Cubism SDK for Unity 已直接与 `Animator` 组件协同工作；旧版本 Cubism 2.x 中使用的 expressions 与 poses（导出为 expression.json 与 pose.json）已被 [弃用](https://docs.live2d.com/cubism-sdk-tutorials/blendexpression)，Naninovel 的 Live2D 扩展不再支持这些文件。
:::

当 Live2D 模型预制体上存在并正确设置 `CubismLookController` 与 `CubismMouthController` 组件时，`Live2DController` 可以选择性地利用它们控制角色的视线方向与嘴部动画（即口型同步功能）。

![](https://i.gyazo.com/498fe948bc5cbdb4dfc5ebc5437ae6b4.png)

请参考 Live2D 官方文档中关于 [眼球追踪](https://docs.live2d.com/cubism-sdk-tutorials/lookat) 与 [口型同步](https://docs.live2d.com/cubism-sdk-tutorials/lipsync) 的设置说明。

若模型显示过大或过小，可按照[视频教程](https://youtu.be/rw_Z69z0pAg?t=353)所示，在 Live2D 预制体根对象上设置初始缩放比例。

在内部，Live2D 模型会先渲染到一张纹理上，再将该纹理投射到屏幕。此过程可避免在角色淡入淡出时出现半透明叠加伪影。Naninovel 会自动尝试评估渲染画布大小，但若模型中存在越界的动画部件，这些部件可能会被裁剪。为避免此问题，可在 Live2D 预制体根对象上添加 `Render Canvas` 组件，并手动设置合适的画布尺寸。启用 [Gizmos](https://docs.unity3d.com/Manual/GizmosMenu.html) 可在预制体编辑模式下预览当前画布范围。

![](https://i.gyazo.com/23f916ae104f57828914221333e42dbf.mp4)

请注意，画布越大，渲染纹理占用的显存也越多，因此应尽量保持画布尺寸紧凑。

以下视频教程展示了如何从 Cubism Editor 导出 Live2D 角色、配置预制体、创建简单的 Animator 状态机，并在 Naninovel 脚本中控制角色。

![](https://www.youtube.com/watch?v=rw_Z69z0pAg)

::: tip 示例
请参见 [Live2D 示例](/zh/guide/samples#live2d)，该示例展示了如何在 Naninovel 中使用 Live2D 角色。
:::

## Spine 角色

Spine 角色实现依赖于使用 [Spine](http://esotericsoftware.com) 二维建模与动画软件创建的资源。

![](https://i.gyazo.com/08b04de115d97427d152cb5f37065d2d.mp4)

若要使用该实现，你需要先安装 [Spine runtime for Unity](http://esotericsoftware.com/spine-unity-download)。有关安装与使用的详细说明，请参考 [官方文档](http://esotericsoftware.com/spine-unity)。

安装完成后，点击 Unity 菜单 `Naninovel/Extensions/Enable Spine` 以启用 Naninovel 模块，该模块提供 Spine 与引擎之间的集成。

![](https://i.gyazo.com/2fb6c27f6e2149b501c0025dd6bd67f0.png)

::: info 注意
此集成示例主要用于展示如何将 Naninovel 与第三方工具协同使用。我们会尽力保持该示例与 Spine 的更新兼容，但其功能仅限于基础集成，无法针对 Spine 产品的使用提供超出示例范围的支持或技术协助。
:::

作为资源的 Spine 角色预制体应在根对象上挂载 `Spine Controller` 组件。来自 Naninovel 脚本指令（如 `@char`）的外观变化会被路由到控制器的 `On Appearance Changed` 事件，工作方式类似于 [通用角色实现](/zh/guide/characters#generic-characters)。你可以按需处理这些事件：例如，通过 Spine 的 `SetAnimation` 方法或在 Unity 的 Animator 控制器中触发某个触发器。

![](https://i.gyazo.com/6a2772a3e4137413a7c1587788c54c41.png)

::: tip
可以自定义一个继承自 `Spine Controller` 的组件。这样，你就能重写其虚方法与相关行为，例如在外观变化时自定义过渡时长或动画参数。
:::

在内部，Spine 模型会先渲染到一张纹理上，再将该纹理投射到屏幕。此过程可避免在角色淡入淡出时出现半透明叠加伪影。要指定渲染纹理的尺寸，请使用 `Render Canvas` 组件（在添加 `Spine Controller` 时会自动附加）。启用 [Gizmos](https://docs.unity3d.com/Manual/GizmosMenu.html) 可在预制体编辑模式下预览当前渲染画布的尺寸。请注意，画布越大，纹理消耗的显存也越多，因此应尽量保持画布尺寸紧凑。

::: info 注意
Spine 的 [Skeleton Render Separator](https://github.com/pharan/spine-unity-docs/blob/master/spine-unity-skeletonrenderseparator)（多渲染器）工作流不受支持。若需集成该工作流，请创建自定义角色实现。
:::

::: tip 示例
请参见 [Spine 示例](/zh/guide/samples#spine)，该示例展示了如何在 Naninovel 中使用 Spine 角色。
:::

## 旁白角色

旁白角色在场景中没有任何实体存在（无外观、位置、朝向、色调等），但仍可以作为文本的作者，并拥有相关的配置选项（显示名称、文本颜色、关联输出窗等）。

![](https://i.gyazo.com/f1ee43da312b29f3236cf772d9ea9fa7.png)

---

## 渲染到纹理

除通用角色外，所有角色与背景实现都可以渲染到一个纹理资源中，该纹理可被用于自定义 UI、输出窗、材质或其他兼容的纹理输入源。

可在角色配置中通过 `Render Texture` 属性指定目标渲染纹理。当指定后，该角色将不会以游戏对象形式出现在场景中，而是直接渲染至该纹理。`Render Rectangle` 属性可用于指定要渲染进纹理的区域。

![](https://i.gyazo.com/7224fa44695507b0ce0274940d630299.png)

::: info 注意
在使用 [Addressables 包](https://docs.unity3d.com/Manual/com.unity.addressables.html) 时，Unity [无法正确追踪资源引用](https://issuetracker.unity3d.com/product/unity/issues/guid/1277169)，这可能导致在构建后渲染纹理被重复创建，从而使该功能无法正常工作。可通过 `AssetReference` API 手动管理引用，或使用下图示例中的 `Get Actor Render Texture` 组件。

![](https://i.gyazo.com/92772b1fa51e6042efcd3de67d05fd79.png)
:::

当角色被渲染到纹理后，其在场景中的变换（位置、旋转、缩放）及部分修改将不再生效。此时应直接变换纹理宿主对象（例如绑定在 UI Raw Image 上的图像）。

下方视频演示了如何将 Live2D 角色渲染到纹理中，并将该纹理绑定到自定义文本输出窗上。该输出窗与角色相互关联，因此当打印与角色相关的文本时，角色会自动随输出窗一起显隐。

![](https://www.youtube.com/watch?v=81OTbSAnWbw)

除通用角色外，其他所有角色与背景类型均可按照 Live2D 的方式进行纹理渲染配置。

## 多重外观

通用、Live2D 与 Spine 角色均支持同时应用多个外观，例如：

```nani
@char Kohaku.Body/Pose1,Face/Smile
```

— 此指令将同时触发 `Body/Pose1` 与 `Face/Smile` 的外观变化事件。你可以利用这一机制同时触发多个 Animator 触发器，以实现复杂的动画状态切换。所有外观状态也会随角色状态序列化，并在游戏加载或回滚时恢复。

![](https://i.gyazo.com/f438703100ca8c695de814fe08ff2427.mp4)
