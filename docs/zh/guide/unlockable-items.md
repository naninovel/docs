# 可解锁物品

可解锁系统用于管理具有“锁定 / 解锁”状态的物品。该功能可广泛应用于 CG / 视频图库、成就系统、提示条目或其他需在满足条件后激活的系统中。

每个可解锁物品由一个字符串 ID 和一个布尔值组成，表示该物品是否已解锁。在 Naninovel 脚本中，使用 [@unlock] 与 [@lock] 指令分别解锁与锁定指定 ID 的物品，例如：

```nani
@unlock SecretAchievement
```
— 将解锁 `SecretAchievement` 项
```nani
@lock SecretAchievement
```
— 再次执行则会将其重新锁定。

物品的解锁状态存储在 [全局作用域](/guide/state-management#global-state) 中，不会因重新开始游戏或读取其他存档而重置。

要将实际的 [GameObject](https://docs.unity3d.com/Manual/class-GameObject.html) 与可解锁项绑定，可使用 `Unlockable Events` 组件：

![](https://i.gyazo.com/9e92d5296e5f07d68ce6122ccb1da34a.png)

在 `Unlockable Item Id` 字段中填写物品 ID，并在解锁时绑定要执行的指令。例如上图在 `SecretAchievement` 解锁后激活对象，反之禁用。

在 C# 中，可通过 `UnlockableManager` [引擎服务](/guide/engine-services) 访问可解锁项。

::: tip 示例
在 [UI 示例](/guide/samples#ui) 中可查看无须编写 C# 脚本的音乐图库实现。其他类型（视频、成就等）也可采用类似方式实现。
:::

## 可解锁资源

在解锁系统配置菜单中（`Naninovel -> Configuration -> Unlockables`）可找到资源管理器，用于存储与可解锁功能关联的任意资源。

![](https://i.gyazo.com/17fa198861ed72de3ab1f9dc6b02b3d8.png)

这些资源供内置解锁系统（如 [CG 图鉴](/guide/unlockable-items#cg-gallery)）使用，也可用于自定义系统。

## CG 图鉴

CG 图鉴功能允许定义可在游戏中解锁的图片资源，并可在主菜单中的 `ICGGalleryUI` 界面中浏览。

![](https://www.youtube.com/watch?v=wkZeszk6gm0)

默认情况下，在 [可解锁资源管理器](/guide/unlockable-items#unlockable-resources) 中添加的带 `CG` 前缀的纹理资源，以及具有相同前缀的主背景（`MainBackground`）也会被视为可解锁 CG 项。

若要将背景添加为 CG，只需在背景路径前加 `CG`：

![](https://i.gyazo.com/83a6eff3f91c05027ba1fbc5098e03c2.png)

也可通过菜单 `Naninovel -> Resources -> Unlockables` 直接添加独立 CG 纹理：

![](https://i.gyazo.com/236bddfd0a02c18b94153cfb7189a877.png)

若要将多个 CG 归为同一图库槽（如同一场景的不同版本），在 ID 末尾加 `_` 与编号，例如：

— 这些 CG 会被分组为一个槽位，点击后以淡入淡出方式顺序播放。

::: info 注意
CG 槽位在 UI 网格中按路径名排序（从左到右，从上到下）。若需自定义顺序，请通过命名控制，如：
- `CG/01`
- `CG/02_1`
- `CG/02_2`
- ...
- `CG/35`
- `CG/36`
:::

要解锁或锁定 CG 项，使用 [@unlock] 或 [@lock] 指令。例如，要解锁上图的 `CG/Map`，可写：

```nani
@unlock CG/Map
```

如果你同时使用“可解锁资源”和“背景资源”来添加 CG 项目，那么在 CG 图鉴中会优先显示在“可解锁资源管理器”中指定的资源。你可以通过 `CG Gallery Panel` 脚本的 `Cg Sources` 属性来更改这一行为，以及更改用于检索可用 CG 资源的实际来源。该脚本挂载在代表 CG 图鉴的 UI 预制体根对象上（内置实现位于 `Naninovel/Prefabs/DefaultUI/ICGGalleryUI.CGGalleryPanel`）。

![](https://i.gyazo.com/c62c69eea8d6b1147aacb178dcaa9347.png)

当任意来源中至少添加了一个 CG 项（无论其是否解锁）时，标题菜单中将出现 `CG GALLERY` 按钮，以便进入 CG 图鉴浏览器。

你可以使用 [UI 自定义功能](/guide/user-interface#ui-customization) 修改或完全替换内置的 `ICGGalleryUI` 实现。

## 提示

可解锁提示系统允许通过可本地化的 [管理文本](/guide/managed-text) 文档定义一组文本记录；这些记录可在游戏过程中逐步解锁，并可通过主菜单或文本打印面板中的 `ITipsUI` 界面浏览。

该系统可用于构建游戏内词汇表、百科全书或成就追踪系统。

![](https://www.youtube.com/watch?v=CRZuS1u_J4c)

::: info 注意
上方视频展示的是“内联格式”的管理文本文档，而现代版本的 Naninovel 默认使用“多行格式”。下文将介绍当前默认格式及如何切换回内联格式。
:::

要定义可用的提示，请在 [管理文本](/guide/managed-text) 资源目录（默认路径为 `Resources/Naninovel/Text`）中创建一个 `Tips.txt` 文件。

其格式与脚本本地化文档类似（多行格式）：以 `#` 开头的行为提示 ID（键），其下的行为提示记录的值，可包含标题（必填）、分类与描述（可选），字段之间以 `|` 分隔，例如：

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

当提示内容过长时，可以将其分成多行以提高可读性：

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

如果你更喜欢 **内联格式**，请在“管理文本配置”中从 `Multiline Categories` 列表中移除 `Tips` 项，此时可像其他管理文本文档一样编写提示内容：

```
Tip1ID: Title
Tip2ID: Title | Category | Description
Tip3ID: Title || Description
```

除了 `<br>` 标签外，你还可以使用所选文本渲染系统支持的其他富文本标签（内置提示 UI 使用的是 TMPro 系统）。

当 `Tips.txt` 管理文本文档中至少存在一条提示记录时，主菜单和文本打印面板中将会出现 **“TIPS”** 按钮，点击即可进入提示浏览界面。

若要在脚本中解锁提示记录，请使用 [@unlock] 指令；若要重新锁定则使用 [@lock] 指令，后跟提示的 ID（始终应以 `Tips/` 为前缀）。例如，要解锁名为 `Tip1ID` 的提示记录：
```nani
@unlock Tips/Tip1ID
```

### 文本窗中的提示

当使用 [TMPro 文本窗](/zh/guide/text-printers#textmesh-pro) 输出文本时，可以在打印相关文本的同时自动解锁对应的提示；此外，当玩家点击该文本时，系统会自动打开 `ITipsUI` 界面并选中相应的提示记录。

![](https://i.gyazo.com/3c0d761576c351066022be32b8595e6d.mp4)

要将打印的文本与提示关联，请使用 `<tip>` 标签，例如：

```nani
Lorem ipsum <tip="VN">visual novel</tip> pharetra nec.
```
— 当存在一个 ID 为 "VN" 的提示记录时，与之关联的 “visual novel” 文本在通过 TMPro 文本窗输出时会被加上下划线，对应的提示记录会自动解锁，并且当玩家点击该文本时，系统会自动打开提示界面（Tips UI）并显示对应记录。

若要修改与提示相关的输出行为（例如调整文本格式，或为点击提示时添加自定义行为），可以在所有内置 TMPro 文本文本窗预制体的文本对象上，找到 `Revealable TMPro Text` 组件中的 **“Tips”** 部分属性进行设置。有关如何创建自定义文本窗以进一步调整行为，请参阅 [添加自定义文本窗指南](/zh/guide/text-printers#添加自定义输出窗)。

![](https://i.gyazo.com/ec20da3f00b507428540d60f354bdeed.png)

请注意：如果为 `On Tip Clicked` 事件分配了自定义处理函数，则默认行为（显示提示界面）将会被禁用。
