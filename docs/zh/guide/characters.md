# 角色

角色是用于表示放置在 [背景](/zh/guide/backgrounds) 之上的场景实体的 actor。

角色 actor 由名称、外观、可见性、变换（位置、旋转、缩放）和朝向定义。

可以使用 `Naninovel -> Configuration -> Characters` 上下文菜单或使用 [actor 记录](/zh/guide/characters#actor-记录) 配置角色的行为；有关可用选项，请参阅 [配置指南](/zh/guide/configuration#角色)。可以使用 `Naninovel -> Resources -> Characters` 上下文菜单访问角色的资源管理器。

在剧本脚本中，角色通过 [@char] 命令控制：

```nani
; 显示名为 "Sora" 的角色，使用默认外观。
@char Sora

; 与上面相同，但将外观设置为 "Happy"。
@char Sora.Happy

; 与上面相同，但也将角色定位在距离场景左边界 45%
; 和底部边界 10% 的位置；
; 并且让他向左看。
@char Sora.Happy look:left pos:45,10
```

::: tip
考虑使用 [Scene Assistant](https://github.com/idaocracy/NaninovelSceneAssistant) 扩展来帮助在场景中定位 actor。
:::

## Actor 记录

如果您有很多角色，并且通过编辑器菜单分配它们不方便，请使用 actor 记录资产 (`Create -> Naninovel -> Actor Record -> Character`)。它们支持多重编辑，并允许您使用文件夹组织记录。查看下面的视频以获取示例。

![](https://www.youtube.com/watch?v=2YP-36THHvk)

要将外观资源与 actor 记录相关联，可以使用 [Addressable 资产系统](/zh/guide/resource-providers#addressable)。例如，要将 "Happy" 外观与 "Kohaku" 角色相关联，请将纹理资产分配给 `Naninovel/Characters/Kohaku/Happy` 地址并添加 `Naninovel` 标签。您可以在 [资源提供者文档](/zh/guide/resource-providers#addressable) 中找到有关使用 Addressable 提供者的更多信息。

## 姿势 (Poses)

每个角色都有 `Poses` 属性，允许指定命名状态（姿势）。

![](https://i.gyazo.com/a049313d5c7cfa9897dd8c5f5ee00af3.png)

姿势名称可以用作 [@char] 命令中的外观，以一次应用姿势中指定的所有选定参数，而不是通过命令参数单独指定它们。

```nani
; 假设为 "Kohaku" 定义了 "SuperAngry" 姿势，
; 应用姿势中指定的所有选定参数。
@char Kohaku.SuperAngry

; 与上面相同，但在 3 秒内使用 "DropFade" 过渡。
@char Kohaku.SuperAngry via:DropFade time:3
```

请注意，当姿势用作外观时，您仍然可以覆盖单个参数，例如：

```nani
; 假设为 "Kohaku" 定义了 "SuperAngry" 姿势，
; 应用姿势状态中指定的所有参数，
; 除了 tint，它在命令中被覆盖。
@char Kohaku.SuperAngry tint:#ff45cb
```

在角色和背景配置中，您还可以找到 `Shared Poses` — 这些姿势在所有相应的 actor 之间共享。共享姿势的示例用例是重用说话/不说话模板或创建相对于相机的预定义舞台。

![](https://i.gyazo.com/c4c6d850d2a6efae269164af58da1ed3.png)

每个 actor 的姿势和共享姿势也可以通过专用的 `pose` 参数应用：

```nani
@char Kohaku.Happy pose:DownLeft
@char Yuko.Surprise pose:UpCenter
@char Misaki pose:UpRight
```

![](https://i.gyazo.com/7bdbad68dd08c97032af174875ac4978.png)

每个 actor 的姿势优先于共享姿势，这意味着如果 actor 姿势名称等于共享姿势，则将使用 actor 的姿势。这允许在必要时为特定 actor 覆盖共享姿势。

## 显示名称

在角色配置中，当启用 `Has Name` 时，您可以为特定角色设置 `Display Name`。设置后，显示名称将显示在打印机名称标签 UI 中，而不是角色的 ID。这允许使用包含空格和特殊字符（ID 不允许）的复合角色名称。

或者，可以使用 "CharacterNames" [管理文本](/zh/guide/managed-text) 文档指定名称，该文档在运行生成管理文本资源任务时自动创建。使用它来本地化显示名称和/或在 Unity 编辑器之外编辑它们。管理文本文档中的记录优先于 actor 配置中设置的显示名称，并将覆盖它们。

可以将显示名称绑定到自定义变量，以便通过剧本脚本在整个游戏中动态更改它。要绑定显示名称，请在角色配置菜单中指定用大括号括起来的自定义变量的名称。

![](https://i.gyazo.com/931d0f6b09c77e13e7800d102c089d44.png)

然后，您可以在脚本中更改变量值，它也会更改显示名称：

```nani
@set PlayerName="Mystery Man"
Player: ...

@set PlayerName="Dr. Stein"
Player: You can call me Dr. Stein.
```

也可以使用名称绑定功能允许玩家使用 [@input] 命令选择他们的显示名称：

```nani
@input PlayerName summary:"Choose your name."
Player: You can call me {PlayerName}.
```

大括号的内容实际上被视为成熟的 [脚本表达式](/zh/guide/script-expressions)，允许复杂的场景来评估显示名称。例如，您可能希望保留角色的预定义可本地化显示名称直到某个时刻，然后让玩家选择自定义名称。

假设有问题的角色具有 "Char1" ID，预定义名称存储为 `T_PredefinedName` [管理文本记录](/zh/guide/managed-text#脚本文本)，玩家输入的值将存储为 `name` [自定义变量](/zh/guide/custom-variables)，当玩家设置名称时，`nameSet` 变量将设置为 `true`。将以下表达式分配给 `Display Name` 属性：`{ nameSet ? name : T_PredefinedName }`。

![](https://i.gyazo.com/b4bed71310ae8d0f80aff11d910d6e5b.png)

然后使用以下剧本脚本：

```nani
@char Char1

Char1: My name is now pre-defined by `T_PredefinedName` managed text record.
Char1: It's localizable; try changing the locale and it will update accordingly.
Char1: Now, we'll make the player input a custom name.

; 注意通过 `value` 参数分配的默认输入值：
; 它是从管理文本中检索的，也是可本地化的。
@input name summary:"Choose your name." value:{T_DefaultName}

; 在这里我们设置变量，该变量用于表达式中
; 以决定从哪里获取显示名称的值。
@set nameSet=true

Char1: My display name is now bound to `name` custom variable.
```

当 `Has Name` 被禁用时，打印机 UI 中既不会显示显示名称也不会显示角色 ID。这对于 [旁白角色](/zh/guide/characters#旁白角色) 很有用，它们可能有一个 [链接的打印机](/zh/guide/characters#链接的打印机)，但不应显示其 ID。

## 名称标签

虽然上面讨论的显示名称在大多数情况下是推荐的，但有时您可能希望在几行中更改 actor 的名称或使多个 actor 成为同一行的作者。为每个此类情况设置专用的 actor 或变量显示名称是不切实际的。相反，请考虑使用 `as` [通用参数](/zh/guide/scenario-scripting#通用参数)：

```nani
; 即使 "Kohaku" 角色可能在配置中设置了自定义显示名称，
; 也使用 "Someone" 作为名称打印此行。
Kohaku: Lorem ipsum.[< as:"Someone"]

; 打印该行，显示 "All Together" 作为作者名称
; 并使所有可见角色成为打印文本的作者。
*: Lorem ipsum![< as:"All Together"]

; 类似，但只让 "Kohaku" 和 "Yuko" 成为作者。
Kohaku,Yuko: Lorem ipsum?[< as:"Kohaku and Yuko"]
```

— `as` 参数是可本地化的，并将暴露在脚本本地化文档中以进行翻译。此外，[说话者高亮](/zh/guide/characters#说话者高亮) 功能将识别作者 ID 中指定的 `*` 和 `,`，并将所有/选定的角色高亮显示为说话者。

## 消息颜色

在角色配置中启用 `Use Character Color` 时，如果在 [@print] 命令或通用文本行中指定了相应的角色 ID，则打印机文本消息和名称标签将染上指定的颜色。

以下视频演示了如何使用显示名称和角色颜色。

![](https://www.youtube.com/watch?v=u5B5s-X2Bw0)

## 头像纹理

您可以使用 [@char] 命令的 `avatar` 参数为角色分配头像纹理。当兼容的文本打印机打印与角色关联的文本消息时，将显示头像。

![](https://i.gyazo.com/83c091c08846fa1cab8764a8d4dddeda.png)

目前，只有 `Wide` 和 `Chat` 内置打印机（以及它们的 TMPro 对应物）支持头像功能。为了在自定义打印机中支持该功能，请将带有 `Author Image` 组件的游戏对象分配给 `Revealable Text Printer Panel` 组件的 `Author Avatar Image` 属性。

要使用任何给定的头像，您必须首先将其添加到头像资源并为其命名。您可以通过角色配置菜单中的 `Avatar Resources` 属性执行此操作。

![](https://i.gyazo.com/5a0f10d174aa75ed87da1b472567e40b.png)

::: info NOTE
头像名称可以是任意的，不必包含现有的角色 ID 或外观。这仅在您希望将头像与角色关联以便自动显示时才需要。
:::

然后，您可以像这样显示特定的头像纹理：

```nani
@char CharacterId avatar:AvatarName
```

要为角色设置默认头像，请给头像纹理资源命名等于 `CharacterID/Default`；例如，要为 ID 为 `Kohaku` 的角色设置默认头像，请将头像资源命名为 `Kohaku/Default`。默认头像将自动显示，即使 [@char] 命令中未指定 `avatar` 参数。

也可以将头像与特定的角色外观关联，以便当角色更改外观时，头像也会自动更改。为此，请使用以下格式命名头像资源：`CharacterID/CharacterAppearance`，其中 `CharacterAppearance` 是要映射头像资源的外观名称。

要仅在文本打印机内显示角色的头像，但隐藏角色本身，请将 [@char] 命令的 `visible` 参数设置为 `false`，例如：

```nani
@char CharacterId !visible
```

如果您在角色本身应保持隐藏的情况下不断更改头像，请考虑在角色配置菜单中禁用 `Auto Show On Modify`；禁用后，您无需在隐藏角色时指定 `!visible` 即可更改角色的任何参数。

::: info NOTE
**头像与角色外观没有直接联系**，不应被视为在场景中表示角色的方式。头像是将任意图像“注入”到兼容文本打印机的独立功能。如果您希望实际角色出现在文本打印机（或自定义 UI）内，请检查 [渲染 actor 到纹理](/zh/guide/characters#渲染到纹理) 功能。
:::

## 说话者高亮

在角色配置中启用时，说话者高亮将根据最后打印的消息是否与角色关联来为角色设置指定的 [姿势](/zh/guide/characters#姿势-poses)。这允许自动高亮显示“正在说话”的角色，通常通过着色或缩放。

![](https://i.gyazo.com/3817adb43d6e14f9854e5d558792c2f6.png)

当为多个角色应用相同的高亮姿势时，建议使用角色配置根目录下的共享姿势。

## 口型同步 (Lip Sync)

### 事件驱动

可动画的角色实现（通用、分层、Live2D 等）提供 `On Started Speaking` 和 `On Finished Speaking` Unity 事件。当此类角色成为打印消息的作者或不再是作者（或者更确切地说是当消息完全显示时），将调用事件，允许您触发任何自定义逻辑，例如开始或停止受控角色的嘴部动画。

![](https://www.youtube.com/watch?v=fx_YS2ZQGHI)

启用 [自动配音](/zh/guide/voicing#自动配音) 功能时，事件将由画外音驱动；否则，打印的文本消息将激活事件。在后一种情况下，您可能希望手动静音事件（例如，为了防止在打印标点符号时出现嘴部动画）；对于此类情况，请使用 [@lipSync] 命令。

### 音频驱动

如果您想通过语音音频剪辑的实际波形来驱动角色嘴部动画，请使用角色配置中的 `Voice Source` 选项。当分配带有 Unity `Audio Source` 组件的预制件时，Naninovel 将在角色对象下实例化该预制件，并通过音频源组件播放角色的声音。

通过访问用于角色声音的专用音频源组件，您可以挂钩自定义解决方案来分析播放音频的波形并相应地驱动嘴部动画。有多种第三方解决方案可以帮助实现这一点。例如，Live2D 的 `Cubism Audio Mouth Input` 组件或 [SALSA](https://assetstore.unity.com/packages/tools/animation/salsa-lipsync-suite-148442)。

## 链接的打印机

可以使用 `Linked Printer` 属性将 [文本打印机](/zh/guide/text-printers) 与角色关联。

![](https://i.gyazo.com/50ca6b39cd7f708158678339244b1dc4.png)

链接后，打印机将自动用于处理该角色创作的消息。

请注意，[@print] 命令（在打印通用文本行时也在底层使用）默认使关联的打印机成为默认打印机并隐藏其他可见打印机。当打印机链接到角色时，打印命令将在打印与相应角色关联的文本时自动更改当前可见和默认的文本打印机。可以通过在打印机 actor 配置菜单中禁用 `Auto Default` 属性来防止此行为；禁用后，您必须使用 [@printer] 命令手动显示/隐藏和切换默认打印机。

::: tip
将打印机与 [旁白角色](/zh/guide/characters#旁白角色) 链接并禁用 `Has Name` 以使旁白文本与打印机链接，这样您就不必一直使用 [@printer] 切换回非角色（默认）打印机。
:::

## 默认作者

当为常规角色使用 [链接的打印机](/zh/guide/characters#链接的打印机) 时，您可能希望没有显式作者的 [通用文本行](/zh/guide/scenario-scripting#通用文本行) 和 [@print] 命令回退到专用打印机。这就避免了必须为每一行指定旁白 ID 或使用 [@printer] 命令手动切换打印机。

要启用此行为，请创建一个 ID 为 `DefaultAuthor` 的角色记录，将其实现设置为 `NarratorCharacter` 并禁用 `HasName` 选项。该角色随后将充当任何无作者文本的回退作者，并自动应用其链接的打印机。

## 占位符角色

占位符实现是默认实现，用于在您还没有任何视觉资产来表示角色时起草剧本。它使用 actor 元数据（如标识符、显示名称和颜色）来程序生成角色占位符。

![](https://i.gyazo.com/a94fdcc2cd645738d71baa42c424ed65.png)

下面是一个 [占位符背景](/zh/guide/backgrounds#占位符背景) 的示例，上面有几个占位符角色。请注意，当前正在说话的角色通过增加比例和不透明度来高亮显示。

![](https://i.gyazo.com/cebb0506d3743e2e1b20b1d3c214239a.png)

## 精灵角色

角色 actor 的精灵实现是最常见和最简单的；它使用一组包裹在四边形网格（精灵）上的 [纹理](https://docs.unity3d.com/Manual/Textures.html) 资产来表示角色的外观。纹理可以基于 `.jpg`、`.png`、`.tiff`、`.psd` 或任何其他 [Unity 支持](https://docs.unity3d.com/Manual/ImportingTextures) 的图像文件格式。

::: tip
选择最适合您的开发工作流程的文件格式。构建项目时，Unity 会自动将所有源资源（纹理、音频、视频等）转换为最适合目标平台的格式，因此您最初在项目中存储资源的格式不会产生影响。在 [官方文档](https://docs.unity3d.com/Manual/AssetWorkflow) 中查找有关 Unity 如何管理项目资产的更多信息。
:::

场景中精灵角色网格的初始（未缩放）大小取决于参考分辨率（相机配置）、角色的 `Pixel Per Unit` 属性（在配置菜单中为每个角色 actor 设置）和源纹理分辨率。

为了获得最佳渲染质量和最佳性能，通常建议对所有角色保持默认的 `Pixel Per Unit` 值 (100)，并通过纹理分辨率控制所需的初始角色大小。例如，假设游戏中的参考分辨率是默认的 `1920x1080` 像素，要使角色占据整个屏幕高度，请将角色纹理的高度设置为 `1080` 像素（例如，通过 Photoshop 或其他图像编辑器调整大小）；要使另一个角色占据屏幕高度的 2/3，请将高度设置为 `1080 * 2/3`，依此类推。

## 切片精灵角色

使用开源 [SpriteDicing](https://github.com/elringus/sprite-dicing) 包构建，`DicedSpriteCharacter` 实现允许通过重用角色精灵的纹理区域来显着减小构建大小和纹理内存。

![Sprite Dicing](https://i.gyazo.com/af08d141e7a08b6a8e2ef60c07332bbf.png)

通过 [Unity package manager](https://docs.unity3d.com/Manual/upm-ui.html) 安装包：打开包管理器窗口 (Window -> Package Manager)，单击 "+" 按钮，选择 "Add package from git URL"，输入以下 URL：

```
https://github.com/elringus/sprite-dicing.git?path=/plugins/unity/Assets/SpriteDicing
```

— 到输入字段并单击 "Add"。

::: info NOTE
在从 Git 存储库安装包之前，请确保您的机器上安装了 [Git 客户端](https://git-scm.com/downloads) 并且 Git 可执行文件路径已设置到 [PATH 系统环境变量](https://en.wikipedia.org/wiki/PATH_(variable))（通常在安装过程中自动执行）。
:::

当通过 UPM 安装 "SpriteDicing" 扩展时，`Naninovel.DicedSpriteCharacter` 选项将出现在角色实现列表中。

![](https://i.gyazo.com/25360c9287a7b5a6a7feaba987a2bbb4.png)

包含角色外观的 `DicedSpriteAtlas` 资产用作切片精灵角色的资源。每个外观都按名称映射到图集中包含的切片精灵。

::: tip
角色元数据属性（例如，每单位像素数、轴心）应用于用于在场景中表示角色的渲染纹理，而类似的切片图集属性应用于生成的切片精灵。更改图集属性时，不要忘记重建它以使更改生效。
:::

以下视频指南涵盖了创建和配置切片精灵图集、基于创建的图集添加新的切片角色以及从剧本脚本控制角色。

![](https://www.youtube.com/watch?v=6PdOAOsnhio)

有关可用切片选项和使用示例的更多信息，请参阅扩展文档：https://dicing.elringus.com/guide/unity。

::: tip EXAMPLE
在 [切片 actor 示例](/zh/guide/samples#切片-actor) 中查找有关设置切片 actor 的示例。
:::

## 分层角色

分层实现允许从多个层组合角色，然后在运行时通过剧本脚本单独或成组地切换它们。

::: tip
分层 actor 实现一直在发展，目前是最灵活的，支持所有渲染功能（与通用相反）。即使您不想使用层表达式，而是使用 Unity 的 Animator 或其他自定义系统控制外观；或者需要渲染非平凡的对象，例如粒子系统和/或利用第三方渲染器，在诉诸通用或自定义实现之前，请检查分层 actor 可用的 [仅渲染](/zh/guide/characters#外包外观管理) 和 [相机渲染](/zh/guide/characters#相机渲染) 选项。
:::

要创建分层角色预制件，请使用 `Create -> Naninovel -> Character -> Layered` 资产上下文菜单。进入 [预制件编辑模式](https://docs.unity3d.com/Manual/EditingInPrefabMode.html) 以组合层。默认情况下将创建几个层和组。您可以使用它们或删除并添加您自己的。

带有 [Renderer](https://docs.unity3d.com/ScriptReference/Renderer.html) 派生组件（例如 `SpriteRenderer`、`MeshRenderer`）的根预制件对象的每个子游戏对象都被视为 *layer（层）*；其他对象被视为 *groups（组）*。除了组织和转换目的外，将层放置在组内将允许您选择单个层或使用剧本脚本中的单个表达式禁用/启用组内的所有层（稍后会详细介绍）。

::: info NOTE
在默认（非相机）渲染模式下，仅支持 `Sprite Renderer` 的 "simple" 绘制模式；当选择其他模式时，它们将像设置为 simple 一样进行渲染。
:::

要默认隐藏特定层，请禁用渲染器组件（而不是游戏对象）。

绘制在预制件上的白色框架用于描述 actor 画布，该画布将在运行时渲染到渲染纹理。确保通过移动层和组来最小化框架内的空白区域，以防止浪费纹理内存并使锚定正常工作。要设置自定义画布大小（例如，如果某些层是动画的并且可以伸出默认画布），请将 `Render Canvas` 组件添加到根对象并设置 `Size` 属性。

![](https://i.gyazo.com/4ff103c27858ac9671ba3b94ab1ade20.png)

您可以缩放根游戏对象以微调 actor 的默认大小。

在 Photoshop 中创作分层角色艺术时，请考虑使用 Unity 的 [PSD Importer 包](https://docs.unity3d.com/Packages/com.unity.2d.psdimporter@3.0/manual/index.html) 自动生成保留所有层及其位置的角色预制件。为了保留层层次结构，请确保在导入设置中启用 `Use Layer Grouping` 选项。

::: tip
使用精灵时，请在纹理导入设置中将 `Mesh Type` 设置为 `Full Rect` 以防止渲染问题。

![](https://i.gyazo.com/16ebf843081c826e0add1a6304c2608f.png)
:::

不要忘记将创建的分层预制件添加到角色资源 (`Naninovel -> Resources -> Characters`)。在配置资源记录时，选择 `Naninovel.LayeredCharacter` 实现并将预制件拖放到 `Resource` 字段。

要在剧本脚本中控制分层角色，请以与其他角色实现相同的方式使用 [@char] 命令。唯一的区别是您如何设置外观：使用 *layer composition expression（层组合表达式）* 代替单个 ID。有三种表达式类型：

- 启用组中的单个层：`group>layer`
- 启用层：`group+layer`
- 禁用层：`group-layer`

例如，考虑一个 "Miho" 角色，它有一个 "Body" 组，其中包含三个层："Uniform"、"SportSuit" 和 "Pajama"。要启用 "Uniform" 层并禁用所有其他层，请使用以下命令：

```nani
@char Miho.Body>Uniform
```

要启用或禁用层而不影响组中的任何其他层，请分别使用 "+" 和 "-" 代替 ">"。您还可以指定多个组合表达式，用逗号分隔它们：

```nani
; 启用眼镜，禁用帽子，选择 "Cool" 情绪。
@char CharId.Head/Accessories+BlackGlasses,Head-Hat,Head/Emotions>Cool
```

要选择任何组之外的层（根预制件对象的子对象），只需跳过组部分，例如：

```nani
; 假设 "Halo" 层对象放置在预制件根目录下，禁用它。
@char CharId.-Halo
```

也可以通过省略组合表达式中的层名称来影响组内的所有层（以及在使用选择表达式时另外影响其邻居）：

```nani
; 禁用 "Body/Decoration" 组中的所有层。
@char CharId.Body/Decoration-

; 启用所有现有层。
@char CharId.+

; 假设有 "Poses/Light" 和 "Poses/Dark" 组，启用 "Light" 组内的
; 所有层并禁用 "Dark" 组内的层。
@char CharId.Poses/Light>
```

上述表达式不仅会影响目标组的直接后代，还会递归影响基础组中包含的所有层。

当未指定外观时（例如，`@char CharId` 之前未设置任何外观），将使用默认外观；分层角色的默认外观等于分层预制件在编辑器中的外观。

下面的视频演示了如何设置分层角色并通过 Naninovel 命令控制它。

![](https://www.youtube.com/watch?v=Bl3kXrg8tiI)

::: info NOTE
视频中显示的 `@char Miho.Shoes>` 命令实际上将选择 "Shoes" 组（禁用所有相邻组），而不是隐藏它。隐藏组的正确命令是 `@char Miho.Shoes-`。
:::

可以通过 `Layered Character Behaviour` 组件的 `Composition Map` 属性将组合表达式映射到键：

![](https://i.gyazo.com/ede5cde3548a3187aa714d3e140750ba.png)

— 然后可以使用键指定分层 actor 外观：

```nani
; 等于 "Body>Uniform,Hair/Back>Straight,Hair/Front>Straight,Shoes>Grey"。
@char Miho.Uniform
; 等于 "Hair/Back>Straight,Hair/Front>Straight"。
@char Miho.StraightHair
; 也可以组合键和表达式。
@char Miho.Uniform,Hair/Front>Short
```

编辑分层角色预制件时，可以通过右键单击映射记录并选择 "Preview Composition" 来预览映射的组合表达式。另一个菜单项 — "Paste Current Composition" — 将生成角色的当前组合表达式字符串（基于层次结构中启用/禁用的精灵渲染器）并将其粘贴到检查的记录中；使用它快速将当前预制件状态映射到组合项。

![](https://i.gyazo.com/84a2f8e51997cdccbfb8321d58586d2a.mp4)

请注意，层对象在运行时不会由 Unity 相机直接渲染；相反，它们在每次组合（外观）更改时渲染一次到临时渲染纹理，然后将其提供给 Naninovel 相机可见的自定义网格。此设置是防止半透明过度绘制问题和支持过渡动画效果所必需的。

如果您希望对分层角色应用动画或其他动态行为，请启用 `Layered Character Behaviour` 组件上的 `Animated` 属性。启用该属性后，层将在每一帧渲染（而不是每次外观更改一次）。

### 外包外观管理

您可能会发现分层实现对于支持各种内置渲染功能（半透明过度绘制处理、过渡效果、模糊和景深支持等）很有用，但希望使用外部工具来管理 actor 的外观，例如 Unity 的 [Animator](https://docs.unity3d.com/Manual/class-Animator.html)。默认情况下，分层行为在通过 `On Appearance Changed` 事件通知外观更改时将使用分层表达式，在这种情况下可能不希望这样做。

启用 `Render Only` 选项将禁用层相关行为，并使事件按脚本命令中指定的方式报告外观。您还必须在行为组件上指定 `Default Appearance`，以防止它根据初始预制件层组合评估默认外观。

### 相机渲染

如果您的角色预制件包含非平凡的渲染器，如粒子系统、轨迹、精灵遮罩或自定义/第三方渲染器，您仍然可以通过将相机分配给 `Layered Behaviour` 组件的 `Render Camera` 字段（相机必须在角色预制件内）来使用分层实现。

分配后，actor 将使用相机渲染内容，而不是自定义渲染过程，这将解除所有固有得限制，例如缺乏模板支持。缺点是，为了确保内容仅渲染到 actor 纹理（并且不会“泄漏”到主相机），您必须专门为渲染此类 actor 保留相机 [层](https://docs.unity3d.com/Manual/Layers.html)。

Unity 中共有 32 个层可用，其中 8 个保留给引擎内部使用。您可以随意使用剩余的层（默认情况下未使用）。要允许 Naninovel 使用层在相机模式下渲染分层 actor，请给层名称以 `Naninovel` 开头；例如 `Naninovel 1`、`Naninovel 2` 等。

![](https://i.gyazo.com/dfbb4306553c85a4683fffb0fef03de3.png)

要添加的总层数取决于在任何给定时间生成的唯一相机渲染分层 actor 的最大数量，无论可见与否。当分层 actor 被渲染时，它会从池中持有一个层。当 actor 被隐藏时，它会释放该层，允许其他 actor 重用它。但是，actor 在外观更改时也会被渲染，这发生在它们最初添加到场景时（即使它们被隐藏）或加载或回滚游戏时，因此 **层池大小必须适应一次生成的相机渲染 actor 的总数**，而不仅仅是一次可见的此类 actor 的数量。要在隐藏后销毁（取消生成）actor，请使用 [@remove] 命令。

添加层后，在 Naninovel 的相机配置中的 `Custom Camera Prefab` 分配一个相机预制件，该预制件的剔除掩码禁用了 `Naninovel ...` 层。这是防止“原始”分层 actor 泄漏到主 Naninovel 相机所必需的。请注意，分配的相机应该是专用的相机预制件，而不是您在分层 actor 预制件中使用的相机。

![](https://i.gyazo.com/e2f713e4e212718f50e028cdf546aaba.png)

在相机渲染模式下，分层 actor 预制件的游戏对象如果附加了 `Layered Actor Layer` 组件，则被视为层，其他对象被视为组。附加组件后，使用 `On Layer Held` 和 `On Layer Released` Unity 事件配置持有和释放相机层时应发生的情况。通常，您会将持有的层分配给宿主游戏对象并启用关联的渲染器，并在释放时禁用渲染器（以确保其他相机不会拾取该对象）。

![](https://i.gyazo.com/4dbfe57dbf6b7365e1e7db78f707f412.png)

层活动状态在相机模式下也有不同的反映：使用游戏对象的活动状态代替渲染器组件的启用状态。要设置 actor 的默认外观，请启用/禁用游戏对象。

::: tip
当层包含许多子项时，为每个子项单独设置层持有/释放事件会很乏味。在这种情况下，使用自定义事件处理程序批量应用更改。检查将更改应用于层的所有子渲染器的 [示例](https://discord.com/channels/545676116871086080/1369982706393284700)。
:::

确保 `Render Canvas` 组件附加到分层 actor 预制件根目录，因为相机模式需要它。它的工作原理类似于普通渲染模式，限制渲染纹理大小，因此请保持紧凑。

如果渲染 actor 需要额外的层（例如，专门用于 Unity 的 Lights 2D 的层），请通过分层行为组件上的 `Camera Mask` 属性添加它们。Naninovel 在渲染 actor 时将保留相机剔除掩码中的指定层。

::: tip EXAMPLE
在 [分层 actor 示例](/zh/guide/samples#分层-actor) 中查找有关设置分层 actor 的示例。
:::

## 通用角色

通用角色是最灵活的角色 actor 实现。它基于一个附加了 `Generic Character Behaviour` 组件到根对象的预制件。外观更改和所有其他角色参数都路由为 [Unity 事件](https://docs.unity3d.com/Manual/UnityEvents.html)，允许以任何您希望的方式实现底层对象的行为。

![](https://i.gyazo.com/d0ea1bf7a5ed3b4bb7eb70c4ddbfeba2.png)

::: info NOTE
通用 actor 实现只是路由来自剧本脚本的事件，由用户来实现底层行为，例如，actor 应如何响应外观或可见性更改命令，是否以及如何支持说话者高亮功能等。不要指望大多数 actor 相关的功能会自动与通用实现一起工作。
:::

要从模板创建通用角色预制件，请使用 `Create -> Naninovel -> Character -> Generic` 上下文资产菜单。

查看以下视频教程，了解如何将 3D 绑定模型设置为通用角色，并通过 [Animator](https://docs.unity3d.com/Manual/class-AnimatorController.html) 组件将外观更改路由到绑定动画。请注意，该视频是使用旧版 Naninovel 录制的，一些属性和组件名称现在已不同；有关最新信息，请参阅上述文档。

![](https://www.youtube.com/watch?v=HPxhR0I1u2Q)

::: tip
当游戏对象在同一帧中启用/禁用时，Unity 的 `Animator` 组件可能无法注册 `SetTrigger`；如果您使用 `GameObject.SetActive` 处理可见性更改（如上教程所示），请考虑改为启用/禁用带有渲染器的子对象。
:::

::: tip EXAMPLE
查看 [通用 actor 示例](/zh/guide/samples#通用-actor-generic-actor)，其中使用通用角色实现来托管 3D 动画模型。
:::

## 视频角色

视频角色使用循环的 [视频剪辑](https://docs.unity3d.com/Manual/class-VideoClip) 资产来表示外观。

有关每个平台支持的视频格式，请参阅 [Unity 视频源文档](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility.html)。

使用带有 alpha 通道（透明度）的视频时，请参阅 [支持格式指南](https://docs.unity3d.com/Manual/VideoTransparency.html)。

为了防止特定外观循环，请将 `NoLoop`（不区分大小写）附加到外观名称。

## Live2D 角色

Live2D 角色实现使用使用 [Live2D Cubism](https://www.live2d.com) 2D 建模和动画软件创建的资产。

![](https://i.gyazo.com/b81df72fc7afaed569520496cbee09f0.mp4)

为了能够使用此实现，您必须首先安装 [Live2D Cubism SDK for Unity](https://live2d.github.io/#unity)。请参阅官方 Live2D 文档以获取安装和使用说明。

安装 Live2D SDK for Unity 后，单击 `Naninovel/Extensions/Enable Live2D` 编辑器菜单项以激活提供 Live2D 与引擎之间集成的 Naninovel 模块。

![](https://i.gyazo.com/e27ee50e8107147e20503a955ddcc548.png)

::: info NOTE
与第三方商业产品的这种集成主要作为如何使 Naninovel 与另一个工具一起工作的示例。虽然我们要致力于保持示例集成与 Live2D 更新和更改兼容，但请注意，功能将保持在最低限度，我们无法在示例范围之外提供任何有关在 Naninovel 中使用其他产品的支持或帮助。
:::

用作实现资源的 Live2D 模型预制件应具有附加到根对象的 `Live2DController` 组件。外观更改作为 [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html) 命令路由到动画器组件，外观为触发器名称。例如，如果您有一个 "Kaori" Live2D 角色预制件并想调用名为 "Surprise" 的触发器，请使用以下命令：

```nani
@char Kaori.Surprise
```

请注意，上述命令只会尝试在附加到预制件的动画器控制器上调用带有 "Surprise" 参数的 [SetTrigger](https://docs.unity3d.com/ScriptReference/Animator.SetTrigger.html)；您必须自己组合底层的 [animator](https://docs.unity3d.com/Manual/Animator) 状态机。

::: info NOTE
Cubism SDK for Unity 的当前实际版本直接与 `Animator` 组件一起工作；以前在 Cubism 2.x 中使用的表情和姿势（导出为 expression.json 和 pose.json）现在 [已弃用](https://docs.live2d.com/cubism-sdk-tutorials/blendexpression)，Naninovel 的 Live2D 扩展不支持。
:::

当 Live2D 模型预制件上存在并设置了 Live2D 的 `CubismLookController` 和 `CubismMouthController` 组件时，`Live2DController` 可以选择使用它们来控制角色的视线方向和嘴部动画（即口型同步功能）。

![](https://i.gyazo.com/498fe948bc5cbdb4dfc5ebc5437ae6b4.png)

有关设置详情，请参阅有关 [眼球追踪](https://docs.live2d.com/cubism-sdk-tutorials/lookat) 和 [口型同步](https://docs.live2d.com/cubism-sdk-tutorials/lipsync) 的 Live2D 文档。

如果模型显得太小或太大，请为根 Live2D 预制件游戏对象设置初始比例，如 [视频指南所示](https://youtu.be/rw_Z69z0pAg?t=353)。

在内部，Live2D 模型被渲染到纹理，然后投影到屏幕上。这是防止在淡入淡出角色时出现半透明过度绘制伪影所必需的。Naninovel 将尝试自动评估渲染画布的大小，但是如果模型包含移动到初始边界之外的动画部分，则这些部分将被裁剪。为了防止这种情况，请将 `Render Canvas` 组件添加到 Live2D 预制件的根游戏对象，并手动设置所需的画布大小。在预制件模式下启用 [gizmos](https://docs.unity3d.com/Manual/GizmosMenu.html) 以预览当前渲染画布大小。

![](https://i.gyazo.com/23f916ae104f57828914221333e42dbf.mp4)

请注意，尺寸越大，纹理消耗的内存就越多，因此请使其尽可能小。

以下视频指南涵盖了从 Cubism Editor 导出 Live2D 角色、配置预制件、创建简单的动画器状态机以及通过剧本脚本控制角色。

![](https://www.youtube.com/watch?v=rw_Z69z0pAg)

::: tip EXAMPLE
查看 [Live2D 示例](/zh/guide/samples#live2d)，其中 Live2D 角色与 Naninovel 一起使用。
:::

## Spine 角色

Spine 角色实现使用使用 [Spine](http://esotericsoftware.com) 2D 建模和动画软件创建的资产。

![](https://i.gyazo.com/08b04de115d97427d152cb5f37065d2d.mp4)

为了能够使用此实现，您必须首先安装 [Spine runtime for Unity](http://esotericsoftware.com/spine-unity-download)。请参阅 [官方文档](http://esotericsoftware.com/spine-unity) 以获取安装和使用说明。

安装 Spine runtime for Unity 后，单击 `Naninovel/Extensions/Enable Spine` 编辑器菜单项以激活提供 Spine 与引擎之间集成的 Naninovel 模块。

![](https://i.gyazo.com/2fb6c27f6e2149b501c0025dd6bd67f0.png)

::: info NOTE
与第三方商业产品的这种集成主要作为如何使 Naninovel 与另一个工具一起工作的示例。虽然我们要致力于保持示例集成与 Spine 更新和更改兼容，但请注意，功能将保持在最低限度，我们无法在示例范围之外提供任何有关在 Naninovel 中使用其他产品的支持或帮助。
:::

用作实现资源的 Spine 角色预制件应具有附加到根对象的 `Spine Controller` 组件。来自剧本脚本命令（例如 `@char`）的外观更改将路由到控制器的 `On Appearance Changed` 事件，类似于 [通用实现](/zh/guide/characters#通用角色)。您可以随心所欲地处理事件；例如，使用 Spine 的 `SetAnimation` 方法或在 Unity 的动画器控制器中调用触发器。

![](https://i.gyazo.com/6a2772a3e4137413a7c1587788c54c41.png)

::: tip
可以使用继承自 `Spine Controller` 的自定义组件。这样您就可以覆盖虚方法和相关行为（例如，处理具有特定持续时间或过渡参数的外观更改）。
:::

在内部，Spine 模型被渲染到纹理，然后投影到屏幕上。这是防止在淡入淡出角色时出现半透明过度绘制伪影所必需的。要指定纹理大小，请使用 `Render Canvas` 组件（添加 `Spine Controller` 时自动附加）。在预制件模式下启用 [gizmos](https://docs.unity3d.com/Manual/GizmosMenu.html) 以预览当前大小。请注意，尺寸越大，纹理消耗的内存就越多，因此请使其尽可能小。

::: info NOTE
不支持 Spine 的 [Skeleton Render Separator](https://github.com/pharan/spine-unity-docs/blob/master/spine-unity-skeletonrenderseparator)（多重渲染）工作流程；要将该工作流程与 Naninovel 集成，请创建自定义角色实现。
:::

::: tip EXAMPLE
查看 [spine 示例](/zh/guide/samples#spine)，其中 Spine 角色与 Naninovel 一起使用。
:::

## 旁白角色

旁白角色在场景中没有任何存在（外观、位置、视线方向、色调等），但仍能够创作打印的消息并具有相关的配置选项（显示名称、消息颜色、链接的打印机等）。

![](https://i.gyazo.com/f1ee43da312b29f3236cf772d9ea9fa7.png)

## 渲染到纹理

可以将所有实现（通用除外）的角色和背景 actor 渲染到纹理资产，然后可以将其分配给自定义 UI、打印机、材质或任何其他兼容源。

使用 `Render Texture` 属性通过 actor 配置分配渲染纹理资产。分配纹理后，actor 将不会作为游戏对象出现在场景中，而是会渲染到纹理。`Render Rectangle` 属性允许指定要渲染到纹理中的 actor 区域。

![](https://i.gyazo.com/7224fa44695507b0ce0274940d630299.png)

::: info NOTE
使用 [addressables 包](https://docs.unity3d.com/Manual/com.unity.addressables.html) 时，Unity [无法正确跟踪资产引用](https://issuetracker.unity3d.com/product/unity/issues/guid/1277169)，这可能会导致构建中渲染纹理重复，从而阻止该功能正常工作。手动处理引用（通过 `AssetReference` API）或使用 `Get Actor Render Texture` 组件，如下图所示。

![](https://i.gyazo.com/92772b1fa51e6042efcd3de67d05fd79.png)
:::

当 actor 渲染到纹理时，变换（位置、旋转、缩放）和其他一些修改将没有任何效果。相反，变换渲染纹理的宿主对象（例如，如果纹理分配给 UI 原始图像组件，则为图像）。

下面的视频演示了如何将 Live2D 角色渲染到纹理，该纹理分配给自定义文本打印机。打印机链接到角色，因此当处理关联的文本消息时，角色将自动与打印机一起显示和隐藏。

![](https://www.youtube.com/watch?v=81OTbSAnWbw)

所有其他角色和背景实现类型（通用除外）都可以设置为类似于 Live2D 示例的渲染到纹理。

## 多种外观

通用、Live2D 和 Spine actor 支持同时应用多种外观，例如：

```nani
@char Kohaku.Body/Pose1,Face/Smile
```

— 将调用 `Body/Pose1` 和 `Face/Smile` 外观更改事件。使用此功能同时触发多个动画器触发器以设置复杂的动画状态。所有外观也将与 actor 状态一起序列化，并在游戏加载或回滚时恢复。

![](https://i.gyazo.com/f438703100ca8c695de814fe08ff2427.mp4)
