# 选择

该功能允许向用户呈现许多选择，并根据用户做出的选择重新规划脚本执行流程。

![Choices](https://i.gyazo.com/023502e43b35caa706c88fd9ab32003d.png)

在naninovel脚本中使用 [@choice] 命令，后跟选择摘要和（可选）goto路径，以添加选择：

```nani
; Print the text, then immediately show choices and stop script execution.
Continue executing this script or load another?[skipInput]
@choice "Continue from the next line"
@choice "Continue from the specified label" goto:.Labelname
@choice "Load another from start" goto:AnotherScript
@choice "Load another from label" goto:AnotherScript.LabelName
@stop
```

该 `goto` 参数的值是用户选择相应选项时要导航至的路径。它以以下格式指定：*ScriptName*.*LabelName*。如果省略标签名称，则将从头开始执行提供的脚本。当省略脚本名称时，将引用当前执行的脚本中的标签：

```nani
; Loads and starts playing a naninovel script with the name `Script001` from the start
goto:Script001

; Save as above, but start playing from the label `AfterStorm`
goto:Script001.AfterStorm

; Jumps the playback to the label `Epilogue` in the currently played script
goto:.Epilogue
```

如果 `goto` 未指定参数，则当前脚本将从下一行继续执行。

选择处理器元素用于处理 [@choice]命令。可以使用可通过`Naninovel -> Resources -> Choice Handlers` 菜单访问的选择管理器来添加，编辑和删除选择处理器。

可以使用 `Naninovel -> Configuration -> Choice Handlers` 菜单配置选择处理程序的行为。有关可用选项的信息，请参阅 [属性配置](/zh/guide/configuration#选择处理器) 。

## 选择按钮

 [@choice] 命令有一个可选参数 `button` 用于指定表示选项时使用的预制体的路径（相对于“ Resources”文件夹）。

```nani
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:.HomeScene
```
— 这里我们使用一个支持定位的选择处理器，在地图的上点位表示相应选择， `button` 参数设置为地图上的一个图像。该预制体存储于 `Assets/Resources/MapButtons/Home.prefab`。

要从模板创建选择按钮预制，请使用 `Create -> Naninovel -> Choice Button` 菜单。

![](https://i.gyazo.com/c2bd4abaa0275f7cdd37c56fd2ff0dec.png)

请记住，将**自定义选择按钮存储在“资源”文件夹**中，否则当请求时它们将无法加载。

如果未指定命令 `button` 参数， [@choice] 则使用默认按钮预制。

要为选择文本使用其他（例如TMPro）文本组件，请使用选择按钮组件的 `On Summary Text Changed`  [Unity事件](https://docs.unity3d.com/Manual/UnityEvents) 。

![](https://i.gyazo.com/8810c51b336bfd653efcde591fe1c41f.png)


## 按钮列表选择处理器

默认情况下使用按钮列表处理程序。它将选择按钮存储在水平布局面板中，并忽略 [@choice] 命令的 `pos` 参数。

## 按钮区域选择处理器

与按钮列表相比，按钮区域不套用任何特定的布局，而是允许通过 `pos` 参数手动设置添加的选择按钮的位置。例如，以下为一种使用选择命令和按钮区域处理器制作交互式地图的方法：

```nani
# Map
@back Map
@hidePrinter
@choice handler:ButtonArea button:MapButtons/Home pos:-300,-300 goto:.HomeScene
@choice handler:ButtonArea button:MapButtons/Shop pos:300,200 goto:.ShopScene
@stop

# HomeScene
@back Home
Home, sweet home!
@goto .Map

# ShopScene
@back Shop
Don't forget about cucumbers!
@goto .Map
```

![](https://www.youtube.com/watch?v=cNRNgk5HhKQ)

## 添加自定义选择处理器

您可以基于内置模板添加自定义选择处理程序，也可以从头开始创建新的处理程序。例如，现在自定义内置 `ButtonArea` 模板。

使用 `Create -> Naninovel -> Choice Handler -> ButtonArea` 菜单在Naninovel包之外的某个位置（例如在Assets/ChoiceHandlers文件夹中）创建一个按钮区域处理预制体。

编辑处理程序：更改字体，纹理，添加动画等。有关可用UI构建工具的更多信息，请查看[Unity文档](https://docs.unity3d.com/Packages/com.unity.ugui@latest) 。

通过Naninovel -> Resources -> Choice Handlers菜单，用选择处理程序管理器GUI将选择处理程序公开给引擎资源。使用 `+` （加号）按钮添加新记录，输入元素 ID（可以与预制名称不同），然后双击记录以打开设置。拖放处理程序预制到 `Resource` 区域。如下图所示：

![](https://i.gyazo.com/cb3a0ff7f22b22cec6546acb388719fc.mp4)

现在，可以在 [@choice] 命令的`handler` 参数中指定新的选择处理程序的ID来使用它。

```nani
@choice "Choice summary text." handler:MyNewHandler
```

也可以通过手动实现 `IChoiceHandlerActor` 接口从头创建选择处理程序。有关更多信息，请参见有关[自定义元素实现](/zh/guide/custom-actor-implementations) 。
