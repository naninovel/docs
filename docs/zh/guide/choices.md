# 选项

此功能允许向玩家呈现多个选项，并根据选择的选项重新路由脚本执行。

![Choices](https://i.gyazo.com/023502e43b35caa706c88fd9ab32003d.png)

使用 [@choice] 命令，后跟选项摘要和可选的 `goto` 路径，从剧本脚本中添加选项：

```nani
; 打印文本，然后立即显示选项。
继续执行此脚本或加载另一个脚本？[>]
@choice "从下一行继续"
@choice "从指定标签继续" goto:#Labelname
@choice "从头开始加载另一个" goto:AnotherScript
@choice "从标签加载另一个" goto:AnotherScript#LabelName
```

未指定 `goto` 参数时，当前脚本将从下一行继续执行。

选项处理程序 actor 用于处理 [@choice] 命令。您可以使用可通过 `Naninovel -> Resources -> Choice Handlers` 上下文菜单访问的选项管理器添加、编辑和删除选项处理程序。

可以使用 `Naninovel -> Configuration -> Choice Handlers` 上下文菜单配置选项处理程序的行为；有关可用选项，请参阅 [配置指南](/zh/guide/configuration#选项处理程序)。

查看以下视频教程以了解选项处理程序的概述。

![](https://www.youtube.com/watch?v=cOREgtJak3A)

## 嵌套回调

当选择某个选项的后果很小时（例如，您可能只想打印几句话），指定标签并使用 `goto` or `gosub` 参数是不切实际的。相反，[嵌套](/zh/guide/scenario-scripting#嵌套) 命令以在选择该选项时执行：

```nani
@choice "询问颜色"
    Kohaku: 你最喜欢的颜色是什么？
    Yuko: 洋红色。
@choice "询问年龄"
    Kohaku: 你多大了？
    @shake Yuko
    Yuko: 为什么问这个？
@choice "保持沉默"
    Kohaku: ...
    尴尬的沉默降临。
```

支持任何级别的嵌套：

```nani
@choice "询问年龄"
    Kohaku: 你多大了？
    @shake Yuko
    Yuko: 为什么问这个？
    @choice "坚持"
        Kohaku: 只是问问。那是秘密吗？
        Yuko.Angry: 是的！
    @choice "放弃"
        Kohaku: 没关系，忘了它吧。
        @char Yuko.Relieved
@choice "保持沉默"
    ...
```

::: info NOTE
嵌套选项回调与 `goto`、`gosub`、`set` 和 `play` 参数不兼容。不要将它们指定为参数，而是在嵌套块内使用适当的命令：使用 [@goto] 代替 `goto` 参数，使用 [@set] 代替 `set` 参数，依此类推。
:::

## 选项按钮

[@choice] 命令接受一个可选的 `button` 参数，该参数指定表示选项对象的自定义预制件的路径（相对于 "Resources" 文件夹）。

```nani
@choice handler:ButtonArea button:Home pos:-300,-300 goto:#HomeScene
```

— 在这里，我们使用支持定位的选项处理程序来表示临时地图上的兴趣点，其中 `button` 参数指向由包裹在图像上的按钮组成的预制件。预制件存储在 `Assets/Resources/Naninovel/ChoiceButtons/Home.prefab` 中。

要从模板创建选项按钮预制件，请使用 `Create -> Naninovel -> Choice Button` 资产上下文菜单。

![](https://i.gyazo.com/c2bd4abaa0275f7cdd37c56fd2ff0dec.png)

如果您不想将选项按钮预制件存储在 `Resources` 文件夹中或需要本地化它们，请在选项处理程序配置菜单中设置自定义加载器，并使用任何可用的 [资源提供者](/zh/guide/resource-providers)。

![](https://i.gyazo.com/9b50d543b5a6843b13b415c3c2ae9641.png)

未指定 [@choice] 命令的 `button` 参数时，将使用默认按钮预制件。

要更改默认使用的选项按钮，请创建 [自定义选项处理程序](/zh/guide/choices#添加自定义选项处理程序) 并将预制件分配给 `Choice Handler Panel` 组件的 `Default Button Prefab` 属性，或使用自定义组件。

![](https://i.gyazo.com/0972b2725ed043d050804d3833a83b73.png)

要为选项文本使用不同的文本组件，请使用选项按钮组件的 `On Summary Text Changed` [Unity 事件](https://docs.unity3d.com/Manual/UnityEvents)。

![](https://i.gyazo.com/8810c51b336bfd653efcde591fe1c41f.png)

## 锁定选项

选项的一个常见用例是根据条件使一个选项锁定/禁用或以其他方式对玩家不可用。例如，如果在选择之前未满足条件，您可能希望限制玩家访问特定的故事分支。

虽然可以使用选项按钮参数（如上所述）来实现这一点，但这种用例很常见，因此 Naninovel 有一种专门的方法通过 [@choice] 命令的 `lock` 参数来实现这一点：

```nani
; 当 'score' 变量低于 10 时，使选项禁用/锁定。
@choice "秘密选项" lock:score<10
```

内置选项按钮具有一个 `On Lock` 事件，每次添加选项时都会调用该事件，这将设置底层按钮的 `Interactible` 属性，使其在选项未锁定时可交互，反之亦然。您可以通过将自定义处理程序附加到 `On Lock` 事件或覆盖选项按钮类的 `HandleLockChanged` 方法来覆盖或扩展该行为。

![](https://i.gyazo.com/ec5ef74ec9af1aa46a18d89bd34d866f.png)

## ButtonList 选项处理程序

默认使用按钮列表处理程序。它将选项按钮存储在水平布局面板内，并忽略 [@choice] 命令的 `pos` 参数。

## ButtonArea 选项处理程序

与按钮列表相反，按钮区域不强制执行任何特定布局，并允许通过 `pos` 参数手动设置添加的选项按钮的位置。例如，这是一种使用选项命令和按钮区域处理程序制作交互式地图的方法：

```nani
# Map
@back Map
@hidePrinter
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:#HomeScene
@choice handler:ButtonArea button:MapButtons/Shop pos:300,200 goto:#ShopScene

# HomeScene
@back Home
家，甜蜜的家！
@goto #Map

# ShopScene
@back Shop
别忘了黄瓜！
@goto #Map
```

::: tip EXAMPLE
在 [地图示例](/zh/guide/samples#地图) 中查找使用 Naninovel 实现交互式地图的更高级实现。

![](https://i.gyazo.com/4987b1c53cd275f3fa56b533f53f3d8c.mp4)
:::

## ChatReply 选项处理程序

由 [聊天文本打印机](/zh/guide/text-printers#chat-打印机) 使用来表示回复选项。示例：

```nani
@printer Chat
Kohaku: 你现在在哪里？
@choice "装傻" handler:ChatReply
    Yuko: ¯\_(ツ)_/¯
@choice "回答" handler:ChatReply
    Yuko: 学校。准备文化祭
```

## 添加自定义选项处理程序

您可以基于内置模板添加自定义选项处理程序，也可以从头开始创建新处理程序。例如，让我们自定义内置的 `ButtonArea` 模板。

使用 `Create -> Naninovel -> Choice Handler -> ButtonArea` 资产上下文菜单在 Naninovel 包之外的某处创建按钮区域处理程序预制件，例如在 `Assets/ChoiceHandlers` 文件夹中。

编辑处理程序：更改字体、纹理、添加动画等。有关可用 UI 构建工具的更多信息，请查看 [Unity 文档](https://docs.unity3d.com/Packages/com.unity.ugui@latest)。

使用选项处理程序管理器 GUI 将处理程序公开给引擎资源，可以使用 `Naninovel -> Resources -> Choice Handlers` 编辑器上下文菜单访问该 GUI。使用 `+`（加号）按钮添加新记录，输入 actor ID（可以与预制件名称不同），然后双击记录以打开 actor 设置。将处理程序预制件拖放到 `Resource` 字段。

您现在可以通过在 [@choice] 命令的 `handler` 参数中指定其 ID 来使用新的选项处理程序。

```nani
@choice "选项摘要文本。" handler:MyNewHandler
```

::: tip EXAMPLE
在 [UI 示例](/zh/guide/samples#ui) 中查找有关使用粒子系统创建自定义选项处理程序的示例。
:::

也可以通过手动实现 `IChoiceHandlerActor` 接口从头开始创建选项处理程序。有关更多信息，请参阅 [自定义 actor 实现](/zh/guide/custom-actor-implementations) 指南。
