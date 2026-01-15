# 可解锁项

可解锁项功能允许管理具有锁定或解锁持久状态的项目。您可以以多种方式使用它，例如表示 CG 或电影画廊中的插槽、成就、提示和其他系统，其中某些实体应该能够在玩家满足条件时解锁或激活。

每个可解锁项都由一个字符串标识符和一个指示该项是否已解锁的布尔值表示。在剧本脚本中，使用 [@unlock] 和 [@lock] 命令来解锁和锁定具有特定 ID 的项目，例如：

```nani
@unlock SecretAchievement
```
— 将解锁项目 `SecretAchievement`，而
```nani
@lock SecretAchievement
```
— 将再次锁定它。

项目的解锁状态存储在 [全局范围](/zh/guide/state-management#全局状态) 下，不依赖于本地游戏会话；例如，如果您解锁了一个项目，当玩家开始新游戏或加载保存的游戏时，它不会再次被锁定。

要将实际的 [GameObject](https://docs.unity3d.com/Manual/class-GameObject.html) 与可解锁项绑定，请使用 `Unlockable Events` 组件：

![](https://i.gyazo.com/9e92d5296e5f07d68ce6122ccb1da34a.png)

将项目的 ID 设置为 `Unlockable Item Id` 字段，并绑定应在项目解锁时执行的命令。例如，上面的插图使 GameObject 在 `SecretAchievement` 解锁时处于活动状态，而在锁定时处于非活动状态。

在 C# 中，您可以使用 `UnlockableManager` [引擎服务](/zh/guide/engine-services) 访问可解锁项。

::: tip EXAMPLE
在 [UI 示例](/zh/guide/samples#ui) 中查找使用可解锁系统实现没有任何 C# 脚本的音乐画廊的示例。其他类型的可解锁画廊（电影、成就等）也可以以类似的方式实现。
:::

## 可解锁资源

在可解锁项配置菜单（`Naninovel -> Configuration -> Unlockables`）下，您可以找到一个资源管理器，允许存储要与可解锁项功能一起使用的任意资产。

![](https://i.gyazo.com/17fa198861ed72de3ab1f9dc6b02b3d8.png)

可解锁资源由内置的可解锁系统使用，例如 [CG 画廊](/zh/guide/unlockable-items#cg-画廊)。您也可以将管理器用于您自己的自定义系统。

## CG 画廊

使用 CG 画廊功能，您可以指定可以在整个游戏中解锁的纹理资源（图像），然后通过可从标题菜单访问的 `ICGGalleryUI` UI 进行浏览。

![](https://www.youtube.com/watch?v=wkZeszk6gm0)

默认情况下，任何带有 `CG` 前缀的纹理资源 — 无论是通过可解锁资源管理器添加的，还是作为具有相同前缀的 `MainBackground` actor 的背景精灵资源提供的 — 都被视为可解锁的 CG 项目。

要将可解锁的 CG 项目添加到画廊，您可以通过在其路径前添加 `CG` 来使用现有的主背景资源之一：

![](https://i.gyazo.com/83a6eff3f91c05027ba1fbc5098e03c2.png)

—或者使用可通过 `Naninovel -> Resources -> Unlockables` 访问的可解锁资源管理器添加“独立”纹理：

![](https://i.gyazo.com/236bddfd0a02c18b94153cfb7189a877.png)

要将多个 CG 分组到一个画廊插槽中（例如，单个场景的变体），请将 `_` 后跟数字添加到可解锁 ID。例如，如果您添加具有以下 ID 的 CG：

- `CG/EpicScene_1`
- `CG/EpicScene_2`
- `CG/EpicScene_3`

—它们将被分组在单个 CG 插槽下，并在玩家单击屏幕时以交叉淡入淡出效果按顺序显示。

::: info NOTE
UI 网格中的 CG 插槽从左到右、从上到下排列，并按可解锁路径名称排序。忽略资源编辑器菜单中的位置。如果您想按特定顺序排列插槽，请相应地命名资源，例如：
- `CG/01`
- `CG/02_1`
- `CG/02_2`
- ...
- `CG/35`
- `CG/36`
:::

要解锁和锁定 CG 项目，请分别使用 [@unlock] 和 [@lock] 命令。例如，要解锁上图中添加的 `CG/Map` 项目，请使用以下脚本命令：

```nani
@unlock CG/Map
```

如果您同时使用可解锁资源和背景资源来提供 CG 项目，则在可解锁管理器中指定的资源将首先显示在 CG 画廊中。您可以使用附加到代表 CG 画廊的 UI 预制件根目录的 `CG Gallery Panel` 脚本的 `Cg Sources` 属性来更改此行为以及检索可用 CG 资源的实际来源（内置实现存储在 `Naninovel/Prefabs/DefaultUI/ICGGalleryUI.CGGalleryPanel` 中）。

![](https://i.gyazo.com/c62c69eea8d6b1147aacb178dcaa9347.png)

当至少有一个 CG 项目添加到任何源时（无论解锁状态如何），`CG GALLERY` 按钮将出现在标题菜单中，允许访问 CG 画廊浏览器。

您可以使用 [UI 自定义功能](/zh/guide/gui#ui-自定义) 修改或完全替换内置的 `ICGGalleryUI` 实现。

## 提示

可解锁提示系统允许使用可本地化的 [管理文本](/zh/guide/managed-text) 文档指定一组文本记录；然后可以在整个游戏中解锁记录，并通过可从标题菜单和文本打印机控制面板访问的 `ITipsUI` UI 进行浏览。

该系统可用于构建游戏内词汇表/百科全书或成就跟踪器。

![](https://www.youtube.com/watch?v=CRZuS1u_J4c)

::: info NOTE
上面的视频演示了内联管理文本文档格式，这在现代 Naninovel 版本中不是提示的默认格式；有关当前默认（多行）格式以及如何切换到内联格式，请参见下文。
:::

要定义可用提示，请在 [管理文本](/zh/guide/managed-text) 资源目录（默认为 `Resources/Naninovel/Text`）内创建一个 `Tips.txt` 文本文档。格式类似于脚本本地化文档（多行）：以 `#` 开头的行存储提示 ID（键）；下一行包含提示记录值，其中可以包括标题（必填）、类别和描述（可选），以 `|` 分隔，例如：

```
# Tip1ID
Tip 1 Title | Tip 1 Category | Tip 1 Description
# Tip2ID
Tip 2 Title || Tip 2 Description
# Tip3ID
Tip 3 Title
# Tip4ID
Tip 4 Title | Tip 4 Category |
```

如果提示值太长，为了便于阅读，您可以将其分成多行：

```
# Tip1
Title | Category |
Long description line 1.<br>
Long description line 2.<br>

# Tip2
Title | Category |
Long description line 1.<br>
...
```

如果您喜欢内联格式，请从管理文本配置中的 `Multiline Categories` 列表中删除 `Tips`；然后可以类似于其他管理文本文档来编写提示：

```
Tip1ID: Title
Tip2ID: Title | Category | Description
Tip3ID: Title || Description
```

除了 `<br>` 标签外，您还可以使用您选择的文本渲染系统支持的其他富文本标签（内置提示 UI 中使用 TMPro）。

当 `Tips.txt` 管理文本文档中至少存在一条提示记录时，"TIPS" 按钮将出现在主菜单和控制面板中，通向提示浏览器。

要在脚本中解锁提示记录，请使用 [@unlock]（以及 [@lock] 重新锁定它），后跟提示 ID（应以 `Tips/` 为前缀）。例如，要解锁 `Tip1ID` 提示记录，请使用：
```nani
@unlock Tips/Tip1ID
```

### 打印机中的提示

可以通过 [TMPro 打印机](/zh/guide/text-printers#textmesh-pro) 打印相关文本时自动解锁提示；此外，当玩家单击此类文本时，将自动显示 `ITipsUI` UI 并选中关联的提示记录。

![](https://i.gyazo.com/3c0d761576c351066022be32b8595e6d.mp4)

要将打印文本与提示关联，请使用 `<tip>` 标签，例如：

```nani
Lorem ipsum <tip="VN">visual novel</tip> pharetra nec.
```
— 假设存在 ID 为 "VN" 的提示记录，相关的 "visual novel" 文本（由 TMPro 打印机打印时）将被加下划线，提示记录解锁，当玩家单击文本时，提示 UI 将打开并显示相关记录。

要更改与打印机相关的提示处理行为（例如，修改相关文本的格式或在单击提示时添加自定义行为），请使用所有内置 TMPro 文本打印机预制件的文本游戏对象上附加的 `Revealable TMPro Text` 组件中 "Tips" 部分下的属性；有关如何创建自定义打印机以调整它们的信息，请参阅 [指南](/zh/guide/text-printers#添加自定义打印机)。

![](https://i.gyazo.com/ec20da3f00b507428540d60f354bdeed.png)

请注意，当将自定义处理程序分配给 `On Tip Clicked` 事件时，默认行为（显示提示 UI）将被禁用。
