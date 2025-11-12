# 选项

该功能允许向玩家展示多个可选项，并根据玩家的选择重新引导脚本的执行路径。

![Choices](https://i.gyazo.com/023502e43b35caa706c88fd9ab32003d.png)

在 Naninovel 脚本中使用 [@choice] 指令来添加选项，指令后跟选项摘要文本和（可选的）`goto` 跳转路径：

```nani
; 打印文本后立即显示选项。
Continue executing this script or load another?[>]
@choice "Continue from the next line"
@choice "Continue from the specified label" goto:#Labelname
@choice "Load another from start" goto:AnotherScript
@choice "Load another from label" goto:AnotherScript#LabelName
```

`goto` 参数的值是当玩家选择该选项后脚本要跳转到的位置。其格式为：**脚本路径.标签名**。当省略标签名时，将从指定脚本的开头开始播放；当省略脚本路径时，则会跳转到当前脚本中的标签位置：

```nani
; 从头开始播放 Naninovel 脚本 `Script001`。
goto:Script001

; 与上例相同，但从标签 `AfterStorm` 开始播放。
goto:Script001#AfterStorm

; 将播放跳转到当前脚本中的标签 `Epilogue`。
goto:#Epilogue
```

::: info 注意
有关标签的更多信息，请参阅 [脚本指南](/zh/guide/naninovel-scripts#label-lines)。
:::

当未指定 `goto` 参数时，当前脚本将从下一行继续执行。

**选项处理器** 用于处理 [@choice] 指令。可通过编辑器菜单 `Naninovel -> Resources -> Choice Handlers` 打开选项管理器来添加、编辑或删除选项处理器。

选项处理器的行为可通过 `Naninovel -> Configuration -> Choice Handlers` 菜单进行配置。有关可用选项，请参阅 [配置指南](/zh/guide/configuration#choice-handlers)。

以下视频教程展示了选项处理器的整体使用概览。

![](https://www.youtube.com/watch?v=cOREgtJak3A)

## 嵌套回调

当选项的后果较轻（例如仅需输出几句话）时，为其单独设置标签并使用 `goto` 或 `gosub` 参数会显得不便。此时可以使用 [嵌套指令](/zh/guide/naninovel-scripts#nesting)，在选项被选择后直接执行嵌套块中的指令：

```nani
@choice "Ask about color"
    Kohaku: What's your favorite color?
    Yuko: Magenta.
@choice "Ask about age"
    Kohaku: How old are you?
    @shake Yuko
    Yuko: Why?
@choice "Keep silent"
    Kohaku: ...
    Awkward silence fell.
```

支持任意层级的嵌套：

```nani
@choice "Ask about age"
    Kohaku: How old are you?
    @shake Yuko
    Yuko: Why?
    @choice "Insist"
        Kohaku: Just asking. Is that a secret?
        Yuko.Angry: It is!
    @choice "Give up"
        Kohaku: Never mind, forget about that.
        @char Yuko.Relieved
@choice "Keep silent"
    ...
```

::: info 注意
嵌套回调与 `goto`、`gosub`、`set` 和 `play` 参数不兼容。若需执行跳转或变量操作，请改用对应指令：使用 [@goto] 代替 `goto` 参数，使用 [@set] 代替 `set` 参数，依此类推。
:::

## 选项按钮

[@choice] 指令接受一个可选参数 `button`，用于指定自定义选项按钮的预制体路径（相对于 “Resources” 文件夹）。

```nani
@choice handler:ButtonArea button:Home pos:-300,-300 goto:#HomeScene
```

— 以下示例中，使用支持定位功能的选项处理器，在一张“地图”上显示可交互的兴趣点。`button` 参数指向的预制体路径为：`Assets/Resources/Naninovel/ChoiceButtons/Home.prefab`，该预制体包含一个按钮与图片的组合。

要从模板创建一个选项按钮预制体，使用菜单：`Create -> Naninovel -> Choice Button`。

![](https://i.gyazo.com/c2bd4abaa0275f7cdd37c56fd2ff0dec.png)

若不想将预制体放在 `Resources` 文件夹内，或需要对选项按钮进行本地化，可在选项处理器的配置菜单中设置自定义加载器，并使用任意可用的 [资源提供器](/zh/guide/resource-providers)。

![](https://i.gyazo.com/9b50d543b5a6843b13b415c3c2ae9641.png)

当未在 [@choice] 指令中指定 `button` 参数时，系统将使用默认按钮预制体。

要更改默认按钮，可创建一个 [自定义选项处理器](/zh/guide/choices#adding-custom-choice-handlers)，并在 `Choice Handler Panel` 组件中将预制体分配给 `Default Button Prefab` 属性，或使用自定义组件。

![](https://i.gyazo.com/0972b2725ed043d050804d3833a83b73.png)

若希望使用不同的文本组件来显示选项文字，可利用按钮组件的 `On Summary Text Changed` [Unity 事件](https://docs.unity3d.com/Manual/UnityEvents)。

![](https://i.gyazo.com/8810c51b336bfd653efcde591fe1c41f.png)

## 锁定选项

在某些情况下，你可能希望根据条件让某个选项处于锁定或禁用状态，例如当玩家未满足前置条件时，禁用进入特定剧情分支的选项。

虽然这种功能可以通过自定义按钮参数实现，但由于其非常常见，Naninovel 提供了专门的 `lock` 参数来实现此功能：

```nani
; 当变量 `score` 小于 10 时，使该选项处于锁定状态。
@choice "Secret option" lock:score<10
```

内置按钮预制体包含一个 `On Lock` 事件，在每次添加选项时调用，会自动设置按钮的 `Interactable` 属性，从而在锁定状态下禁用交互，解锁时恢复可用。你也可以通过以下方式自定义行为：为 `On Lock` 事件绑定自定义处理器；或重写按钮类的 `HandleLockChanged` 方法。

![](https://i.gyazo.com/ec5ef74ec9af1aa46a18d89bd34d866f.png)

## 按钮列表选项处理器

**Button List Handler** 是 Naninovel 默认使用的选项处理器。它会将所有选项按钮存放在一个水平布局（Horizontal Layout）面板中，并忽略 [@choice] 指令中的 `pos` 参数。

## 按钮区域选项处理器

与按钮列表不同，**Button Area Handler** 不会强制使用任何特定布局，允许通过 `pos` 参数手动设置各个选项按钮的位置。  

例如，下方演示了如何使用 `@choice` 指令与 Button Area 处理器制作一个可交互的地图界面：

```nani
# Map
@back Map
@hidePrinter
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:#HomeScene
@choice handler:ButtonArea button:MapButtons/Shop pos:300,200 goto:#ShopScene

# HomeScene
@back Home
Home, sweet home!
@goto #Map

# ShopScene
@back Shop
Don't forget about cucumbers!
@goto #Map
```

::: tip 示例
在 [地图示例](/zh/guide/samples#地图) 中可以找到更高级的基于 Naninovel 实现的交互式地图案例。

![](https://i.gyazo.com/4987b1c53cd275f3fa56b533f53f3d8c.mp4)
:::

## 聊天回复选项处理器

**ChatReply Choice Handler** 用于与 [聊天文本输出窗](/zh/guide/text-printers#chat-printer) 配合，以“聊天回复”的形式展示可选项。

```nani
@printer Chat
Kohaku: Where're you right now?
@choice "Play dumb" handler:ChatReply
    Yuko: ¯\_(ツ)_/¯
@choice "Answer" handler:ChatReply
    Yuko: school. preping for the festival
```

![](https://i.gyazo.com/338f8519b3a1656059a407fe0232b376.mp4)

## 添加自定义选项处理器

你可以基于内置模板添加自定义选项处理器，也可以从零开始创建新的处理器。下面以自定义内置的 `ButtonArea` 模板为例。

使用 `Create -> Naninovel -> Choice Handler -> ButtonArea` 在 Naninovel 包之外（例如 `Assets/ChoiceHandlers` 文件夹中）创建一个按钮区域处理器预制体。

编辑该处理器：可以修改字体、贴图、添加动画等。有关可用的 UI 构建工具的详细信息，请参阅 [Unity 官方文档](https://docs.unity3d.com/Packages/com.unity.ugui@latest)。

打开 `Naninovel -> Resources -> Choice Handlers` 在编辑器中进入选项处理器管理器。点击 `+` 按钮新增一条记录，输入 actor ID（可与预制体名称不同），然后双击该记录以打开设置界面。将自定义处理器预制体拖放到 `Resource` 字段中。

![](https://i.gyazo.com/cb3a0ff7f22b22cec6546acb388719fc.mp4)

完成后，你就可以在 [@choice] 指令中通过 `handler` 参数指定该自定义处理器的 ID 来使用它。

```nani
@choice "Choice summary text." handler:MyNewHandler
```

::: tip 示例
在 [UI 示例](/zh/guide/samples#ui) 中可以找到一个结合粒子系统制作自定义选项处理器的案例。
:::

你也可以完全从零开始创建一个新的选项处理器，只需手动实现 `IChoiceHandlerActor` 接口即可。更多信息请参阅 [自定义 Actor 实现](/zh/guide/custom-actor-implementations) 指南。
