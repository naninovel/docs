# 可解锁内容

可解锁内容功能允许管理具有持久的锁定或解锁状态的项。您可以通过多种方式使用它，例如表示 CG 或影片画廊中的栏位、成就、提示，以及其他需要在玩家满足条件时解锁或激活某些实体的系统。

每个可解锁项都由一个字符串标识符和一个指示该项是否已解锁的布尔值表示。在剧本脚本中，使用 [@unlock] 和 [@lock] 命令来解锁和锁定具有特定 ID 的项，例如：

```nani
@unlock SecretAchievement
```
— 将解锁 `SecretAchievement` 项，而
```nani
@lock SecretAchievement
```
— 将再次锁定它。

可解锁项的解锁状态存储在 [全局作用域](/zh/guide/state-management#全局状态) 下，不依赖于本地游戏会话；例如，如果您解锁了某一项，当玩家开始新游戏或加载存档时，它不会再次被锁定。

要将实际的 [GameObject](https://docs.unity3d.com/Manual/class-GameObject.html) 与可解锁项绑定，请使用 `Unlockable Events` 组件：

![](https://i.gyazo.com/9e92d5296e5f07d68ce6122ccb1da34a.png)

在 `Unlockable Item Id` 字段中设置该项的 ID，并绑定应在该项解锁时执行的命令。例如，上图中的设置会使游戏对象在 `SecretAchievement` 解锁时处于活动状态，而在锁定时处于非活动状态。

在 C# 中，您可以使用 `UnlockableManager` [引擎服务](/zh/guide/engine-services) 访问可解锁项。

::: tip EXAMPLE
在 [UI 示例](/zh/guide/samples#ui) 中可以找到无需任何 C# 脚本、使用可解锁系统实现音乐画廊的示例。其他类型的可解锁画廊（影片、成就等）也可以用类似的方式实现。
:::

## 可解锁资源

在可解锁内容配置菜单（`Naninovel -> Configuration -> Unlockables`）下，您可以找到一个资源管理器，用于存储要与可解锁内容功能一起使用的任意资产。

![](https://i.gyazo.com/17fa198861ed72de3ab1f9dc6b02b3d8.png)

可解锁资源由内置的可解锁系统使用，例如 [CG 画廊](/zh/guide/unlockables#cg-画廊)。您也可以将管理器用于您自己的自定义系统。

## CG 画廊

使用 CG 画廊功能，您可以指定可在游戏过程中解锁的纹理资源（图像），然后通过可从标题菜单访问的 `ICGGalleryUI` UI 进行浏览。

![](https://www.youtube.com/watch?v=wkZeszk6gm0)

默认情况下，任何带有 `CG` 前缀的纹理资源——无论是通过可解锁资源管理器添加的，还是作为 `MainBackground` Actor 的带有相同前缀的背景精灵资源提供的——都被视为可解锁的 CG 项。

要将可解锁的 CG 项添加到画廊，您可以通过在其路径前添加 `CG` 来使用现有的主背景资源之一：

![](https://i.gyazo.com/83a6eff3f91c05027ba1fbc5098e03c2.png)

— 或者使用可通过 `Naninovel -> Resources -> Unlockables` 访问的可解锁资源管理器添加“独立”纹理：

![](https://i.gyazo.com/236bddfd0a02c18b94153cfb7189a877.png)

要将多个 CG 归入同一个画廊栏位（例如，同一场景的多个变体），请在可解锁项 ID 后添加 `_` 和一个数字。例如，如果您添加具有以下 ID 的 CG：

- `CG/EpicScene_1`
- `CG/EpicScene_2`
- `CG/EpicScene_3`

— 它们将被归入同一个 CG 栏位，并在玩家单击屏幕时以交叉淡入淡出效果依次显示。

::: info NOTE
UI 网格中的 CG 栏位从左到右、从上到下排列，并按可解锁项的路径名称排序。资源编辑器菜单中的位置会被忽略。如果您想按特定顺序排列栏位，请相应地命名资源，例如：
- `CG/01`
- `CG/02_1`
- `CG/02_2`
- ...
- `CG/35`
- `CG/36`
:::

要解锁和锁定 CG 项，请分别使用 [@unlock] 和 [@lock] 命令。例如，要解锁上图中添加的 `CG/Map` 项，请使用以下脚本命令：

```nani
@unlock CG/Map
```

如果您同时使用可解锁资源和背景资源来提供 CG 项，则在可解锁资源管理器中指定的资源将首先显示在 CG 画廊中。您可以使用 `CG Gallery Panel` 脚本的 `Cg Sources` 属性来更改此行为以及获取可用 CG 资源的实际来源；该脚本附加在代表 CG 画廊的 UI 预制件的根对象上（内置实现存储在 `Naninovel/Prefabs/DefaultUI/CGGalleryUI`）。

![](https://i.gyazo.com/c62c69eea8d6b1147aacb178dcaa9347.png)

当任一来源中添加了至少一个 CG 项时（无论解锁状态如何），`CG GALLERY` 按钮将出现在标题菜单中，可通过它访问 CG 画廊浏览器。

您可以使用 [UI 自定义功能](/zh/guide/gui#ui-自定义) 修改或完全替换内置的 `ICGGalleryUI` 实现。

## 提示

可解锁提示系统允许使用可本地化的 [管理文本](/zh/guide/managed-text) 文档指定一组文本记录；这些记录随后可以在游戏过程中解锁，并通过可从标题菜单和文本打印机控制面板访问的 `ITipsUI` UI 进行浏览。

该系统可用于构建游戏内词汇表/百科全书或成就跟踪器。

![](https://www.youtube.com/watch?v=CRZuS1u_J4c)

::: info NOTE
上面的视频演示了内联管理文本文档格式，这在较新的 Naninovel 版本中不是提示的默认格式；有关当前默认（多行）格式以及如何切换到内联格式，请参见下文。
:::

要定义可用提示，请在 [管理文本](/zh/guide/managed-text) 资源目录（默认为 `Resources/Naninovel/Text`）内创建一个 `Tips.txt` 文本文档。格式类似于脚本本地化文档（多行）：以 `#` 开头的行存储提示 ID（键）；下一行包含提示记录值，其中可以包括标题（必需）、类别和描述（可选），以 `|` 分隔，例如：

```
# Tip1ID
提示 1 标题 | 提示 1 类别 | 提示 1 描述
# Tip2ID
提示 2 标题 || 提示 2 描述
# Tip3ID
提示 3 标题
# Tip4ID
提示 4 标题 | 提示 4 类别 |
```

如果提示值太长，为了便于阅读，您可以将其分成多行：

```
# Tip1
标题 | 类别 |
长描述第 1 行。<br>
长描述第 2 行。<br>

# Tip2
标题 | 类别 |
长描述第 1 行。<br>
...
```

如果您更喜欢内联格式，请从管理文本配置中的 `Multiline Documents` 列表中移除 `Tips`；之后即可像其他管理文本文档一样编写提示：

```
Tip1ID: 标题
Tip2ID: 标题 | 类别 | 描述
Tip3ID: 标题 || 描述
```

除了 `<br>` 标签外，您还可以使用您选择的文本渲染系统支持的其他富文本标签（内置提示 UI 中使用 TMPro）。

当 `Tips.txt` 管理文本文档中至少存在一条提示记录时，“TIPS”按钮将出现在标题菜单和控制面板中，用于打开提示浏览器。

要在脚本中解锁提示记录，请使用 [@unlock]（以及 [@lock] 重新锁定它），后跟提示 ID（应以 `Tips/` 为前缀）。例如，要解锁 `Tip1ID` 提示记录，请使用：
```nani
@unlock Tips/Tip1ID
```

### 打印机中的提示

当关联文本显示时，可以自动解锁提示；此外，当玩家单击此类文本时，将自动显示 `ITipsUI` UI 并选中关联的提示记录。

![](https://i.gyazo.com/3c0d761576c351066022be32b8595e6d.mp4)

要将打印文本与提示关联，请使用 `<tip>` 标签，例如：

```nani
Lorem ipsum <tip="VN">visual novel</tip> pharetra nec.
```
— 假设存在 ID 为“VN”的提示记录，关联的“visual novel”文本（由 TMPro 打印机打印时）将带有下划线，该提示记录将被解锁，并且当玩家单击该文本时，提示 UI 将打开并显示相关记录。

要更改与打印机相关的提示处理行为（例如，修改关联文本的格式或在单击提示时添加自定义行为），请使用所有内置 TMPro 文本打印机预制件的文本游戏对象上附加的 `Revealable Text` 组件中“Tips”部分下的属性；有关如何创建自定义打印机以调整它们的信息，请参阅 [指南](/zh/guide/text-printers#添加自定义打印机)。

![](https://i.gyazo.com/ec20da3f00b507428540d60f354bdeed.png)

请注意，当将自定义处理程序分配给 `On Tip Clicked` 事件时，默认行为（显示提示 UI）将被禁用。
