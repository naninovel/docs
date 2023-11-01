# 可解锁物件

可解锁功能允许管理物件，有持久化记录解锁或未解锁状态。该功能有多种使用场景，比如CG和影片的解锁，成就，提示或是其他游戏中玩家达成某些条件后需要激活或解锁的系统。

每个可解锁物件都有一个字符串id和布尔值构成，表示该物件是否解锁。在naninovel脚本中使用 [@unlock] 和 [@lock] 命令跟物件ID来解锁或加锁物件，比如：

```nani
@unlock SecretAchievement
```
— 会解锁物件 `SecretAchievement`
```nani
@lock SecretAchievement
```
— 会为该物件重新加密，变为未解锁状态

可解锁物件状态存储于 [全局状态](/zh/guide/state-management#全局状态) 和当前游戏进度无关。比如，如果你解锁了某个物件，在你开始新游戏或是加载另一个存档时，该物件也不会变为未解锁状态。

要将某个[游戏物体](https://docs.unity3d.com/Manual/class-GameObject.html) 设置为可解锁物件，使用 `UnlockableTrigger` 组件：

![](https://i.gyazo.com/9e92d5296e5f07d68ce6122ccb1da34a.png)

 `Unlockable Item Id` 设置物件ID，并设置解锁时的相应事件。以上图为例，使 `SecretAchievement` 游戏物体在解锁时变为激活状态，反之亦然。

在C#中你可以使用`UnlockableManager` [引擎服务](/zh/guide/engine-services) 获取可解锁物件。

## 可解锁资源配置

在配置菜单下 (`Naninovel -> Configuration -> Unlockables`)，可找到资源管理器，可以将任意资源设置为可解锁物件。

![](https://i.gyazo.com/17fa198861ed72de3ab1f9dc6b02b3d8.png)

该资源配置被用作内建系统使用，比如[CG画廊](/zh/guide/unlockable-items#CG画廊) 。你可以将其用于你自己的自定义系统。

## CG画廊

使用CG画廊功能，可以将任意资源在游戏内设置为可解锁物件，之后可以在标题画面的 `ICGGalleryUI` UI查看。

![](https://www.youtube.com/watch?v=wkZeszk6gm0)

默认情况，所有添加到[可解锁资源管理器](/zh/guide/unlockable-items#可解锁资源配置) 带有前缀`CG` 的资源，和 `MainBackground` 元素内的[背景](/zh/guide/backgrounds) 精灵，都会被视为可解锁物件。

要添加新的资源到CG画廊，可以在已有主背景资源路径前添加 `CG` ，如下所示：

![](https://i.gyazo.com/83a6eff3f91c05027ba1fbc5098e03c2.png)

— 或者在`Naninovel -> Resources -> Unlockables`内使用资源管理器单独添加资源，如下所示：

![](https://i.gyazo.com/236bddfd0a02c18b94153cfb7189a877.png)

两种方式均可，之后就可以使用 [@unlock] 和 [@lock] 命令控制了。

比如，要解锁上图的 `CG/Map` 物件，使用下列命令：

```nani
@unlock CG/Map
```

如果你用了两种方式来添加可解锁物件，可解锁物件管理器内的资源将先在CG画廊显示。可以改变该设置，通过修改`Naninovel/Prefabs/DefaultUI/ICGGalleryUI.CGGalleryPanel`路径下的内置CG画廊UI预制体的 `CG Gallery Panel` 脚本的 `Cg Sources` 参数，该脚本用于检索实际相关资源。

![](https://i.gyazo.com/c62c69eea8d6b1147aacb178dcaa9347.png)

当有可解锁物件添加成功时（无论是否解锁），标题的按钮就会变为可用状态，可点击进行浏览。

你可以使用[自定义UI](/zh/guide/user-interface#UI自定义) 修改或替换内置`ICGGalleryUI` UI。

## 提示

可解锁提示系统，允许通过本地[托管文本](/zh/guide/managed-text) 来设置一套本地化文本记录。这些记录可以在之后的游戏中解锁，并通过标题菜单和游戏中的文本打字机的控制面板按钮打开名为`ITipsUI` 的UI查看。

该系统可用于游戏内置的词典/百科/成就等系统。

![](https://www.youtube.com/watch?v=CRZuS1u_J4c)

在托管文本资源路径创建名为 `Tips.txt` 的[托管文本](/zh/guide/managed-text)(`Resources/Naninovel/Text`为默认路径) 每行，代表一个独立的提示。一行的内容由，ID接冒号，提示标题，类别（可选），描述构成，中间由(`|`)隔开，如下：


```
Tip1ID: Tip 1 Title | Tip 1 Category | Tip 1 Description
Tip2ID: Tip 2 Title || Tip 2 Description
Tip3ID: Tip 3 Title
Tip4ID: Tip 4 Title | Tip 4 Category |
...
```

你可以使 [富文本标记](https://docs.unity3d.com/Manual/StyledText.html) 并在提示的描述部分从插入 (`\n`) 。

当 `Tips.txt` 托管文本至少有一条记录时，标题菜单和控制面板的 "TIPS" 按钮就会显示出来，可通过它打开相应浏览界面。
When there is at least one tip record in the `Tips.txt` managed text document, "TIPS" button will appear in the main menu and control panels, leading to the tips browser.

使用[@unlock] 和 [@lock] 命令来控制提示的解锁和加锁（在脚本中ID前始终要加上 `Tips/` 前缀），如下为解锁ID为 `Tip1ID` 的提示的示例：

```nani
@unlock Tips/Tip1ID
```
