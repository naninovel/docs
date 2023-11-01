# 用户界面UI

naninovel由许多内置UI构成：标题菜单，游戏设置，保存加载菜单，回看面板，CG回顾，提示面板等。

每个内置UI都可以关闭或是自定义修改；参考[UI自定义](/zh/guide/user-interface#UI自定义) 。


## 自适应UI布局

所有内置UI都做了自适应。这使得UI能在各种平台和各种分辨率下都能够保持可用状态。

![](https://i.gyazo.com/b6bddf8a0c6f2ba68dcdc1bc65db0c09.mp4)

## UI切换

UI切换特性，能让用户整体隐藏/显示游戏内UI。

![](https://i.gyazo.com/e267c4ab3654efbfaf611011502de79f.mp4)

激活`ToggleUI`输入（个人电脑默认`Space`键）或使用控制面板下的`HIDE`按钮来隐藏/显示游戏内UI。

当UI隐藏时，`Continue`输入或是单击（触击）屏幕会重新显示出UI。

## UI自定义

UI自定义特性允许用户添加自建UI，或使其替代任何内置UI元素，如标题菜单，设置菜单，回看面板等。

注意，文本打字机和选择处理器，是不同的元素交互，非UI范围内的定制。参考说明[文本打字机](/zh/guide/text-printers)和 [选择处理器](/zh/guide/choices)。


::: warning

在尝试自建UI或修改前，确保你已经熟悉[UGUI](https://docs.unity3d.com/Packages/com.unity.ugui@latest)。即使下面有示例项目和视频教程，但我们不会提供任何关于UGUI的问题支持。详情参考[技术支持](/zh/support/#unity-支持)页面。

:::

要添加自定义UI或是修改（关闭）内置UI，使用`Naninovel -> Resources -> UI`菜单的UI资源管理的。

![](https://i.gyazo.com/b0f00e8431e34e59249b3f59919e3b2c.png)

当引起初始化的时候，将会自动将UI预制体注册至该资源管理器。

要显示/隐藏已经配置的UI，分别使用[@showUI]和[@hideUI]命令。

### 添加自定义UI

要添加新的自定义UI，通过菜单`Create -> Naninovel -> Custom UI`来添加，并将其添加到资源列表内。这样它就会随引擎初始化时进行初始化。

以下视频教程，展示了如何添加用户自定义的日历UI，并使用特殊的出现/隐藏的动画。该日历会根据[自定义变量](/zh/guide/custom-variables) （可通过Naninovel来控制并随游戏保存）来显示。并且日历会随数据变化而同步更新。这些功能实现都不需要C#代码来实现。

![](https://www.youtube.com/watch?v=wrAm-cwPXy4)

::: tip EXAMPLE
上述视频用的Unity项目文件在[GitHub获取](https://github.com/Naninovel/CustomUIExample) 。你可以使用git客户端[克隆存储库](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) 或是 [下载为zip存档](https://github.com/Naninovel/CustomUIExample/archive/master.zip) 。注意，其中不包含Naninovel资源包，导入资源以解决报错。
:::

::: tip EXAMPLE
其他高级示例，如添加使用网格组件，页码，拖拽等功能的的自定义背包参考[GitHub背包项目示例](https://github.com/Naninovel/Inventory)。

另外，UI相关代码和预制体都在[运行时/UI](https://github.com/Naninovel/Inventory/tree/master/Assets/NaninovelInventory/Runtime/UI) 和 [预制体](https://github.com/Naninovel/Inventory/tree/master/Assets/NaninovelInventory/Prefabs)

:::

在通过菜单创建自定义UI时，会自动添加`Custom UI`组件，该组件继承`IManagedUI`接口，以保证能被引擎识别该预制体为UI。

![](https://i.gyazo.com/9a4a38754ccf35e48b8bef2c3062ff02.png)

`Disable Interaction` 用于永久关闭UI交互，无论该UI是非在游戏中可见。需要`Canvas Group`在同一个游戏物体上。

`Visible On Awake`打开时，UI会在引擎初始化完成后就显示出来为可见状态，关闭则相反。

当`Control Opacity`打开时，并且`Canvas Group`组件在想同游戏物体，`Canvas Group`上的`Alpha`属性会同步当前UI的可见度修改。
`Fade Duration`用于控制透明度渐隐持续时间。如果你想使用其他的可见状态效果，（比如滑动动画），关闭`Control Opacity`，使用`On Show` 和 `On Hide`事件来完成可见度修改。

如果你想支持游戏手柄或是键盘控制UI，将可交互的组件（如按钮）绑定到`Focus Object`属性。之后该物体就能够自动通过各种按键来控制。具体设置使用步骤可参考[UI导航控制引导](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/script-SelectableNavigation.html) 。

 `Focus Object` 被绑定后，`Focus Mode`将允许聚焦于该物体时被选择：`Visibility`将在UI可见时就聚焦到该组件，`Navigation`会在玩家使用按键输入（手柄左摇杆，D-pad或是键盘方向键）后聚焦。

用户可以通过`On Show` 和 `On Hide`事件来对UI的可见度变化进行控制。比如，你可以使用`Animator`触发来控制UI的显示隐藏。

`Hide On Load`开启时，UI会在引擎开始加载操作时自动隐藏。这个动作通常发生在加载另一个Naninovel脚本或是退出标题画面时。

`Save Visibility State`开启时，会对UI可见度状态做持久化保存，在下次加载游戏时，UI会保持和之前退出时一样的状态。

`Block Input When Visible`允许在UI可见时关闭[输入](/zh/guide/input-processing)。 这有助于防止玩家在与UI交互时使用各种快捷键（隐藏UI，继续阅读等）。`Allowed Samplers` 允许使用的快捷键。比如，你可以将`ToggleUI` 输入添加到此，能让玩家使用该功能的快捷键，而其他所有快捷键都将无效化。

启用`Modal UI`会使所有其他UI在可见时都忽略交互。这类似于`Block Input When Visible`，但是会影响基于事件的交互（鼠标单击，触摸，UI导航），而不影响直接输入处理。

创建自定义UI时，默认情况下还将添加其他几个组件：

- `Canvas Group` 允许通过更改不透明度（由Fade Duration控制）来隐藏UI，并允许UI在必要时忽略用户交互。
- `Canvas Scaler` 自动缩放布局以适合当前的显示分辨率。
- `Graphic Raycaster` 允许播放器与UI画布内的按钮和其他可交互元素交互。


您可以随意修改或删除上述任何组件。

### 关闭内置UI

要关闭内置UI，一处UI资源管理菜单内的相应条目，这样预制体就不会在引擎初始化时加载。

### 修改内置UI

如果要修改现有的内置（默认）UI预制体，你可以在`Naninovel/Prefabs/DefaultUI`目录下找到。

如果可能的话，**请不要直接编辑内置的预制件**，以防止更新包装时出现问题。
请通过菜单`Create -> Naninovel -> Default UI -> ...`创建，或是在该文件夹下，复制(Ctrl/Cmd+D)后从该文件夹移到其他位置修改，之后再将修改/创建的预制体添加到资源管理器的已有条目下(`Object` 字段)。

在下面的视频教程中，您可以学习如何覆盖内置标题（主）菜单。以及进入标题菜单时如何使用标题脚本添加背景和特殊效果。不需要使用C＃脚本来实现。

![](https://www.youtube.com/watch?v=hqhfhXzQkdk)

::: tip EXAMPLE
上述视频用的Unity项目文件在[GitHub获取](https://github.com/Naninovel/CustomUIExample) 。你可以使用git客户端[克隆存储库](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) 或是 [下载为zip存档](https://github.com/Naninovel/CustomUIExample/archive/master.zip) 。注意，其中不包含Naninovel资源包，导入资源以解决报错。
:::

从头开始创建新的预制体时，确保你要覆写的UI上的相应组件都已关联好。这些组件都应该被关联至预制体的根物体上。

所有UI接口都位于 `Naninovel.UI`命名空间下：

接口 | 对应UI
--- | ---
IBacklogUI | 打字机回看面板。
ILoadingUI | 加载游戏时显示的面板。
IMovieUI | 用于托管电影的UI。
ISaveLoadUI | 用于保存和加载游戏的面板。
ISceneTransitionUI | 处理场景过渡 ( [@startTrans] 和  [@finishTrans] 命令)。
ISettingsUI | 用于更改游戏设置的面板。
ITitleUI | 游戏的标题（主）菜单。
IExternalScriptsUI | 外部脚本浏览器UI (社区修改功能)。
IVariableInputUI | 用于输入将任意文本分配给自定义状态变量 ([@input] 命令调用).
IConfirmationUI | 用于确认重要命令的UI面板 (例如，退出标题菜单或删除保存的游戏时)。
ICGGalleryUI | 解锁 [CG 画廊](/zh/guide/unlockable-items#CG画廊) 窗口。
ITipsUI | 解锁 [提示](/zh/guide/unlockable-items#提示) 窗口。
IRollbackUI | 状态回滚功能的指示器。
IContinueInputUI | 全屏不可见的UI层，位于UI层的底部，在点击或触击时激活`continue input`的触发。

为了使UI支持可见性（awake唤醒时可见，渐隐时间）和交互选项（禁用交互），还应将`Canvas Group`组件附加到同一对象。

如果你熟悉C#变成，并且想自己覆写UI的默认逻辑，[创建新组件](https://docs.unity3d.com/Manual/CreatingAndUsingScripts) ，继承`IManagedUI`接口（可随意继承`CustomUI`和`ScriptableUIBehaviour`来保证满足其他接口的需要），并将其关联至你都自建UI。检查`Naninovel/Runtime/UI`文件夹下内置UI的实现来定制你的UI。这是最小化自定义UI组件的示例：

```csharp
using UniRx.Async;

public class MyCustomUI : ScriptableUIBehaviour, Naninovel.UI.IManagedUI
{
    public UniTask InitializeAsync () => UniTask.CompletedTask;
}
```

## 在Unity事件上执行脚本

创建自定义UI时，你可能想执行一些命令或执行特定的naninovel脚本以响应某些事件(比如，[按钮点击](https://docs.unity3d.com/Manual/script-Button.html))。

将Play Script组件添加到游戏对象，然后选择现有的naninovel脚本或在文本区域中直接编写命令；然后路由其他组件的[Unity事件](https://docs.unity3d.com/Manual/UnityEvents.html) 以调用该`Play Script`组件上`Play()`的方法。在运行时，事件触发时，脚本就会执行。下面的示例演示了如何在单击按钮时隐藏自定义UI。


![](https://i.gyazo.com/5f56fbddc090919cc71f68e82bb1713f.png)

也可以在脚本文本中使用{arg}表达式引用Unity事件参数。支持的参数类型为：字符串，整数，浮点型和布尔型。下面的示例演示在布尔型Unity事件为正时执行相机抖动并播放声音效果，在负布尔值时为播放背景音乐。

![](https://i.gyazo.com/78e9fa27d6561f8f8aced76bbeb4b542.png)

::: warning
条件判断 (if, else, elseif, endif) 在此位置不被支持.
:::

当通过下拉列表选择现有的naninovel脚本时，脚本文本区域将被忽略，所选的naninovel脚本将被执行，**而不是**当前执行的脚本。如果您希望在不中断当前执行的脚本的情况下附加执行某些命令，请使用脚本文本区域。
