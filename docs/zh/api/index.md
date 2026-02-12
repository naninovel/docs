# 命令

标准脚本命令 API 参考。使用侧边栏快速在可用命令之间导航。

~~删除线~~ 表示无名参数，**粗体** 代表必需参数；其他参数应视为可选参数。如果不确定这是怎么回事，请查阅[场景脚本指南](/zh/guide/scenario-scripting)。

大多数脚本命令都支持以下参数：

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| if | string | 一个布尔[脚本表达式](/zh/guide/script-expressions)，控制命令是否应该执行。 |
| unless | string | 一个布尔[脚本表达式](/zh/guide/script-expressions)，控制命令是否不应该执行（'if' 的反义）。 |
| wait | boolean | 脚本播放器是否应等待异步命令完成执行后再执行下一个命令。 |

</div>

## addChoice

向具有指定 ID（或默认 ID）的选择处理程序添加一个[选择](/zh/guide/choices)选项。使用此命令代替 [@choice] 可以动态添加选择，并更好地控制何时（或是否）停止播放。

::: info NOTE
当在选择下嵌套命令时，`goto`、`gosub` 和 `set` 参数将被忽略。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">choiceSummary</span> | string | 选择显示的文本。当文本包含空格时，请用双引号 (`"`) 将其括起来。如果你希望在文本本身中包含双引号，请对其进行转义。 |
| id | string | 选择的唯一标识符。稍后可用于使用 [@clearChoice] 删除选择。 |
| lock | string | 选择是否应被禁用或以其他方式让玩家无法选择；有关更多信息，请参阅[选择文档](/zh/guide/choices#锁定选项)。默认情况下禁用。 |
| button | string | 代表选择的[按钮预制件](/zh/guide/choices#选项按钮)的本地资源路径。预制件的根对象上应附加 `ChoiceHandlerButton` 组件。未指定时将使用默认按钮。 |
| pos | decimal list | 选择按钮在选择处理程序内的本地位置（如果处理程序实现支持）。 |
| handler | string | 要为其添加选择的选择处理程序的 ID。未指定时将使用默认处理程序。 |
| goto | string | 用户选择该选项时要跳转的路径；路径格式请参见 [@goto] 命令。当在选择下嵌套命令时忽略。 |
| gosub | string | 用户选择该选项时要跳转的子程序路径；路径格式请参见 [@gosub] 命令。分配 `goto` 时，此参数将被忽略。当在选择下嵌套命令时忽略。 |
| set | string | 用户选择该选项时要执行的设置表达式；语法参考请参见 [@set] 命令。当在选择下嵌套命令时忽略。 |
| show | boolean | 是否也显示添加了选择的选择处理程序；默认启用。 |
| time | decimal | 淡入（显示）动画的持续时间（以秒为单位）。 |

</div>

```nani
; 快速反应事件：除非玩家在 3 秒内做出选择，否则游戏结束。
Decide now![>]
@addChoice "Turn left" goto:Left
@addChoice "Turn Right" goto:Right
@wait 3
@clearChoice
You crashed!

; 添加一个随机选择，然后停止播放直到玩家选择它。
@random
    @addChoice "Top choice"
        You've selected the top choice!
    @addChoice "Mediocre choice"
        You've selected a mediocre choice.
    @addChoice "The worst choice"
        You've selected the worst possible choice...
@stop
```

## append

将指定文本追加到文本打印机。

::: info NOTE
整个文本会立即追加，不会触发显示效果。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">text</span> | string | 要追加的文本。 |
| printer | string | 要使用的打印机 Actor 的 ID。未指定时将使用默认值。 |
| author | string | 应与追加文本关联的 Actor 的 ID。 |

</div>

```nani
; 像往常一样打印句子的第一部分（逐渐显示），
; 然后立即追加句子的结尾。
Lorem ipsum
@append " dolor sit amet."
```

## arrange

按 X 轴排列指定角色。未指定参数时，将执行自动排列，按 X 轴均匀分布可见角色。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">characterPositions</span> | named decimal list | 角色 ID 到场景 X 轴位置（相对于左侧场景边界，以百分比表示）命名值的集合。位置 0 与左边界相关，100 与场景右边界相关；50 是中心。 |
| look | boolean | 执行自动排列时，控制是否也让角色看向场景原点（默认启用）。 |
| time | decimal | 命令启动的动画持续时间，以秒为单位。 |
| wait | boolean | 是否在开始执行场景脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 均匀分布所有可见角色。
@arrange

; 将 ID 为 'Jenna' 的角色放置在 15%，'Felix' 放置在 50%，'Mia' 放置在 85%
; 远离场景左边界的位置。
@arrange Jenna.15,Felix.50,Mia.85
```

## async

在专用脚本轨道上与主场景播放例程并行异步执行嵌套行。用于并发运行复合动画或任意命令链。有关更多信息，请参阅[并发播放](/zh/guide/scenario-scripting#并发播放)指南。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">trackId</span> | string | 负责执行嵌套行的播放器轨道的唯一标识符。指定后，ID 可用于 [@await] 或 [@stop] 异步轨道播放。 |
| loop | boolean | 是否循环播放嵌套行，直到使用 [@stop] 停止。 |

</div>

```nani
; 在三个点之间缓慢平移摄像机。
@async CameraPan
    @camera offset:4,1 zoom:0.5 time:3 wait!
    @camera offset:,-2 zoom:0.4 time:2 wait!
    @camera offset:0,0 zoom:0 time:3 wait!
; 当上面的动画独立运行时，下面的文本会打印出来。
...
; 在再次修改摄像机之前，确保平移动画已完成。
@await CameraPan
@camera zoom:0.7

; 循环运行 'Quake' 异步任务。
@async Quake loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3,10) }
...
; 停止任务。
@stop Quake
```

## await

暂停场景播放，直到指定的异步任务或所有嵌套行执行完毕。

::: info NOTE
嵌套块应该总是能完成；不要嵌套任何可能导航到块外部的命令，因为这可能会导致未定义的行为。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">trackId</span> | string | 要等待的异步脚本轨道的标识符。可用于等待使用 [@async] 命令生成的轨道的完成。 |
| complete | boolean | 是否尽快强制完成等待的轨道。等待嵌套行时无效。 |

</div>

```nani
; 并行运行嵌套行并等待它们全部完成。
@await
    @back RainyScene
    @bgm RainAmbient
    @camera zoom:0.5 time:3
    It starts Raining...[>]
; 下面的行将在上述所有操作完成后执行。
...

; 在两点之间缓慢平移摄像机。
@async CameraPan
    @camera offset:4,1 zoom:0.5 time:3 wait!
    @camera offset:,-2 zoom:0.4 time:2 wait!
...
; 在再次修改摄像机之前，确保动画已完成。
@await CameraPan complete!
@camera zoom:0
```

## back

修改[背景 Actor](/zh/guide/backgrounds)。

::: info NOTE
为了更好地适应传统的 VN 游戏流程，背景的处理方式与角色略有不同。大多数时候，场景中可能只有一个背景 Actor，它会不断过渡到不同的外观。为了消除在脚本中重复相同 Actor ID 的麻烦，可以仅提供背景外观和过渡类型（可选）作为无名参数，假设 `MainBackground` Actor 应该受到影响。如果情况并非如此，可以通过 `id` 参数显式指定背景 Actor 的 ID。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">appearanceAndTransition</span> | named string | 要为修改后的背景设置的外观（或[姿势](/zh/guide/backgrounds#姿势-poses)）和要使用的[过渡效果](/zh/guide/special-effects#过渡效果)类型。未指定过渡时，默认使用交叉淡入淡出效果。 |
| pos | decimal list | 为修改后的 Actor 设置的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。在正交模式下，使用 Z 分量（第三个成员，例如 `,,10`）按深度移动（排序）。 |
| id | string | 要修改的 Actor 的 ID；指定 `*` 以影响所有可见 Actor。 |
| appearance | string | 为修改后的 Actor 设置的外观。 |
| pose | string | 为修改后的 Actor 设置的姿势。 |
| via | string | 要使用的[过渡效果](/zh/guide/special-effects#过渡效果)类型（默认使用交叉淡入淡出）。 |
| params | decimal list | 过渡效果的参数。 |
| dissolve | string | [自定义溶解](/zh/guide/special-effects#过渡效果)纹理的路径（路径应相对于 `Resources` 文件夹）。仅当过渡设置为 `Custom` 模式时有效。 |
| visible | boolean | 为修改后的 Actor 设置的可见性状态。 |
| position | decimal list | 为修改后的 Actor 设置的位置（在世界空间中）。在正交模式下，使用 Z 分量（第三个成员）按深度移动（排序）。 |
| rotation | decimal list | 为修改后的 Actor 设置的旋转。 |
| scale | decimal list | 为修改后的 Actor 设置的缩放。 |
| tint | string | 要应用的色调颜色。<br><br>以 `#` 开头的字符串将按以下方式解析为十六进制：`#RGB`（变为 `RRGGBB`）、`#RRGGBB`、`#RGBA`（变为 `RRGGBBAA`）、`#RRGGBBAA`；未指定 alpha 时将默认为 `FF`。<br><br>不以 `#` 开头的字符串将被解析为文字颜色，支持以下颜色：red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta。 |
| easing | string | 要应用的[缓动函数](/zh/guide/special-effects#过渡效果)名称。未指定时，将使用配置中设置的默认函数。 |
| time | decimal | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画将在开始动画到新目标之前立即完成。 |
| wait | boolean | 是否在开始执行场景脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 将 'River' 设置为主背景的外观。
@back River

; 与上面相同，但也使用 'RadialBlur' 过渡效果。
@back River.RadialBlur

; 将 'Smoke' 背景放置在屏幕中心
; 并将其缩放为原始大小的 50%。
@back id:Smoke pos:50,50 scale:0.5

; 为场景中所有可见背景着色。
@back id:* tint:#ffdc22
```

## bgm

播放或修改当前播放的具有指定名称的 [BGM（背景音乐）](/zh/guide/audio#背景音乐) 轨道。

::: info NOTE
音乐轨道默认循环播放。未指定音乐轨道名称 (BgmPath) 时，将影响所有当前播放的轨道。当对已在播放的轨道调用时，播放不会受到影响（轨道不会从头开始播放），但将应用指定的参数（音量和轨道是否循环）。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">bgmPath</span> | string | 要播放的音乐轨道的路径。 |
| intro | string | 在主轨道之前播放一次的介绍音乐轨道的路径（不受循环参数影响）。 |
| volume | decimal | 音乐轨道的音量。 |
| loop | boolean | 轨道结束后是否从头开始播放。 |
| fade | decimal | 开始播放时的音量淡入持续时间，以秒为单位（默认为 0.0）；修改正在播放的轨道时无效。 |
| group | string | 播放音频时应使用的混音器[组路径](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。 |
| time | decimal | 修改的持续时间（以秒为单位）。 |
| wait | boolean | 在播放下一个命令之前是否等待 BGM 淡入淡出动画完成。 |

</div>

```nani
; 开始循环播放名为 'Sanctuary' 的音乐轨道。
@bgm Sanctuary

; 与上面相同，但在 10 秒内淡入音量并播放一次。
@bgm Sanctuary fade:10 !loop

; 在 2.5 秒内将所有播放的音乐轨道的音量更改为 50%
; 并让它们循环播放。
@bgm volume:0.5 loop! time:2.5

; 播放 'BattleThemeIntro' 一次，然后循环播放 'BattleThemeMain'。
@bgm BattleThemeMain intro:BattleThemeIntro
```

## blur

将[模糊效果](/zh/guide/special-effects#模糊-blur)应用于受支持的 Actor：精灵、分层、骰子、Live2D、Spine、视频和场景实现的背景和角色。

::: info NOTE
Actor 应实现 `IBlurable` 接口以支持该效果。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">actorId</span> | string | 要应用效果的 Actor 的 ID；如果发现多个具有相同 ID 的 Actor（例如，一个角色和一个打印机），将仅影响第一个发现的 Actor。未指定时，应用于主背景。 |
| power | decimal | 效果的强度，范围为 0.0 到 1.0。默认为 0.5。设置为 0 以禁用（取消生成）效果。 |
| time | decimal | 参数达到目标值所需的时间，以秒为单位。默认为 1.0。 |
| wait | boolean | 在播放下一个命令之前是否等待效果预热动画。 |

</div>

```nani
; 使用默认参数模糊主背景。
@blur
; 从主背景中移除模糊。
@blur power:0

; 在 5 秒内以最大强度模糊 'Kohaku' Actor。
@blur Kohaku power:1 time:5
; 在 3.1 秒内从 'Kohaku' 移除模糊。
@blur Kohaku power:0 time:3.1
```

## bokeh

模拟[景深](/zh/guide/special-effects#散景-bokeh)（又名 DOF、散景）效果，此时只有焦点中的对象保持清晰，而其他对象则模糊。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">focus</span> | string | 要设置焦点的游戏对象名称（可选）。设置后，焦点将始终停留在游戏对象上，而 `dist` 参数将被忽略。 |
| dist | decimal | 从 Naninovel 摄像机到焦点的距离（以单位为单位）。指定 `focus` 参数时忽略。默认为 10。 |
| power | decimal | 应用于散焦区域的模糊量；也决定了焦点灵敏度。默认为 3.75。设置为 0 以禁用（取消生成）效果。 |
| time | decimal | 参数达到目标值所需的时间，以秒为单位。默认为 1.0。 |
| wait | boolean | 在播放下一个命令之前是否等待效果预热动画。 |

</div>

```nani
; 默认启用效果并将焦点锁定在 'Kohaku' 游戏对象上。
@bokeh focus:Kohaku
; 在 10 秒内淡出（禁用）效果。
@bokeh power:0 time:10
; 将焦点设置在距离摄像机 10 个单位的位置，
; 焦距设置为 0.95 并在 3 秒内应用。
@bokeh dist:10 power:0.95 time:3
```

## camera

修改主摄像机，随时间更改偏移、缩放级别和旋转。查看[此视频](https://youtu.be/zy28jaMss8w)以快速演示命令效果。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| offset | decimal list | 本地摄像机位置按 X,Y,Z 轴偏移（以单位为单位）。 |
| roll | decimal | 本地摄像机按 Z 轴旋转的角度（0.0 到 360.0 或 -180.0 到 180.0）。与 `rotation` 参数的第三个分量相同；指定 `rotation` 时忽略。 |
| rotation | decimal list | 本地摄像机按 X,Y,Z 轴旋转的角度（0.0 到 360.0 或 -180.0 到 180.0）。 |
| zoom | decimal | 相对摄像机缩放（正交大小或视野，取决于渲染模式），范围为 0.0（无缩放）到 1.0（全缩放）。 |
| ortho | boolean | 摄像机应以正交 (true) 还是透视 (false) 模式渲染。 |
| toggle | string list | 要切换（如果禁用则启用，反之亦然）的组件名称。组件应附加到与摄像机相同的游戏对象。这可用于切换[自定义后处理效果](/zh/guide/special-effects#自定义相机效果)。使用 `*` 影响附加到摄像机对象的所有组件。 |
| set | named boolean list | 要启用或禁用的组件名称。组件应附加到与摄像机相同的游戏对象。这可用于显式启用或禁用[自定义后处理效果](/zh/guide/special-effects#自定义相机效果)。指定的组件启用状态将覆盖 `toggle` 参数的效果。使用 `*` 影响附加到摄像机对象的所有组件。 |
| easing | string | 要应用的[缓动函数](/zh/guide/special-effects#过渡效果)名称。未指定时，将使用配置中设置的默认函数。 |
| time | decimal | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画将在开始动画到新目标之前立即完成。 |
| wait | boolean | 是否在开始执行场景脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 将摄像机在 X 轴上偏移 -3 个单位，在 Y 轴上偏移 1.5 个单位。
@camera offset:-3,1.5

; 将摄像机设置为透视模式，放大 50% 并后退 5 个单位。
@camera !ortho offset:,,-5 zoom:0.5

; 将摄像机设置为正交模式并顺时针滚动 10 度。
@camera ortho! roll:10

; 偏移、缩放和滚动在 5 秒内同时动画化。
@camera offset:-3,1.5 zoom:0.5 roll:10 time:5

; 立即将摄像机重置为默认状态。
@camera offset:0,0 zoom:0 rotation:0,0,0 time:0

; 切换附加到摄像机的 'FancyCameraFilter' 和 'Bloom' 组件。
@camera toggle:FancyCameraFilter,Bloom

; 设置 'FancyCameraFilter' 组件启用，'Bloom' 禁用。
@camera set:FancyCameraFilter.true,Bloom.false

; 禁用附加到摄像机对象的所有组件。
@camera set:*.false
```

## char

修改[角色 Actor](/zh/guide/characters)。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">idAndAppearance</span> | named string | 要修改的角色的 ID（指定 `*` 以影响所有可见角色）和要设置的外观（或[姿势](/zh/guide/characters#姿势-poses)）。未指定外观时，将使用 `Default`（如果存在）或随机外观。 |
| look | string | Actor 的观看方向；支持的值：left, right, center。 |
| avatar | string | 为角色分配的[头像纹理](/zh/guide/characters#头像纹理)的名称（路径）。使用 `none` 从角色中移除（取消分配）头像纹理。 |
| pos | decimal list | 为修改后的 Actor 设置的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。在正交模式下，使用 Z 分量（第三个成员，例如 `,,10`）按深度移动（排序）。 |
| id | string | 要修改的 Actor 的 ID；指定 `*` 以影响所有可见 Actor。 |
| appearance | string | 为修改后的 Actor 设置的外观。 |
| pose | string | 为修改后的 Actor 设置的姿势。 |
| via | string | 要使用的[过渡效果](/zh/guide/special-effects#过渡效果)类型（默认使用交叉淡入淡出）。 |
| params | decimal list | 过渡效果的参数。 |
| dissolve | string | [自定义溶解](/zh/guide/special-effects#过渡效果)纹理的路径（路径应相对于 `Resources` 文件夹）。仅当过渡设置为 `Custom` 模式时有效。 |
| visible | boolean | 为修改后的 Actor 设置的可见性状态。 |
| position | decimal list | 为修改后的 Actor 设置的位置（在世界空间中）。在正交模式下，使用 Z 分量（第三个成员）按深度移动（排序）。 |
| rotation | decimal list | 为修改后的 Actor 设置的旋转。 |
| scale | decimal list | 为修改后的 Actor 设置的缩放。 |
| tint | string | 要应用的色调颜色。<br><br>以 `#` 开头的字符串将按以下方式解析为十六进制：`#RGB`（变为 `RRGGBB`）、`#RRGGBB`、`#RGBA`（变为 `RRGGBBAA`）、`#RRGGBBAA`；未指定 alpha 时将默认为 `FF`。<br><br>不以 `#` 开头的字符串将被解析为文字颜色，支持以下颜色：red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta。 |
| easing | string | 要应用的[缓动函数](/zh/guide/special-effects#过渡效果)名称。未指定时，将使用配置中设置的默认函数。 |
| time | decimal | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画将在开始动画到新目标之前立即完成。 |
| wait | boolean | 是否在开始执行场景脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 显示具有默认外观的 ID 为 'Sora' 的角色。
@char Sora

; 与上面相同，但将外观设置为 'Happy'。
@char Sora.Happy

; 与上面相同，但另外将角色放置在距离场景左边界 45%
; 和底部边界 10% 的位置；还使其向左看。
@char Sora.Happy look:left pos:45,10

; 使 Sora 出现在底部中心并位于 Felix 前面。
@char Sora pos:50,0,-1
@char Felix pos:,,0

; 为场景中所有可见角色着色。
@char * tint:#ffdc22
```

## choice

添加一个必需的[选择](/zh/guide/choices)选项，该选项会停止进一步的场景播放，直到玩家做出选择。后续选择命令将合并，允许一次显示多个选项。使用 [@addChoice] 代替此命令可简单地添加选择，而不需要在继续播放之前进行选择。

::: info NOTE
当在选择下嵌套命令时，`goto`、`gosub` 和 `set` 参数将被忽略。<br><br>if 参数中不支持使用非确定性表达式，因为命令必须提前确定哪个选择是链中的最后一个，以便自动停止播放。如果你需要像 `@choice ... if:random(0,10)>5` 这样的东西，请改用 [@addChoice] 命令。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">choiceSummary</span> | string | 选择显示的文本。当文本包含空格时，请用双引号 (`"`) 将其括起来。如果你希望在文本本身中包含双引号，请对其进行转义。 |
| id | string | 选择的唯一标识符。稍后可用于使用 [@clearChoice] 删除选择。 |
| lock | string | 选择是否应被禁用或以其他方式让玩家无法选择；有关更多信息，请参阅[选择文档](/zh/guide/choices#锁定选项)。默认情况下禁用。 |
| button | string | 代表选择的[按钮预制件](/zh/guide/choices#选项按钮)的本地资源路径。预制件的根对象上应附加 `ChoiceHandlerButton` 组件。未指定时将使用默认按钮。 |
| pos | decimal list | 选择按钮在选择处理程序内的本地位置（如果处理程序实现支持）。 |
| handler | string | 要为其添加选择的选择处理程序的 ID。未指定时将使用默认处理程序。 |
| goto | string | 用户选择该选项时要跳转的路径；路径格式请参见 [@goto] 命令。当在选择下嵌套命令时忽略。 |
| gosub | string | 用户选择该选项时要跳转的子程序路径；路径格式请参见 [@gosub] 命令。分配 `goto` 时，此参数将被忽略。当在选择下嵌套命令时忽略。 |
| set | string | 用户选择该选项时要执行的设置表达式；语法参考请参见 [@set] 命令。当在选择下嵌套命令时忽略。 |
| show | boolean | 是否也显示添加了选择的选择处理程序；默认启用。 |
| time | decimal | 淡入（显示）动画的持续时间（以秒为单位）。 |

</div>

```nani
; 打印文本，然后立即显示选择并停止播放
; 直到选择其中一个选择。
Continue executing this script or ...?[>]
@choice "Continue"
@choice "Load another script from start" goto:Another
@choice "Load another script from \"Label\" label" goto:Another#Label
@choice "Goto to \"Sub\" subroutine in another script" gosub:Another#Sub

; 根据选择设置自定义变量。
@choice "I'm humble, one is enough..." set:score++
@choice "Two, please." set:score=score+2
@choice "I'll take the entire stock!" set:karma--,score=999

; 选择选择时播放音效并排列角色。
@choice "Arrange"
    @sfx Click
    @arrange k.10,y.55

; 打印对应于所选选择的文本行。
@choice "Ask about color"
    What's your favorite color?
@choice "Ask about age"
    How old are you?
@choice "Keep silent"
    ...

; 当 'score' 变量低于 10 时，使选择禁用/锁定。
@choice "Extra option" lock:score<10

; 仅当 'score' 变量为 10 或更多时才显示选择。
@choice "Secret option" if:score>=10
```

## choiceHandler

修改[选择处理程序 Actor](/zh/guide/choices)。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">handlerId</span> | string | 要修改的选择处理程序 Actor 的 ID。未指定时，将使用默认值。 |
| default | boolean | 是否将选择处理程序设为默认。未指定 `handler` 参数时，默认处理程序将受所有选择相关命令的影响。 |
| id | string | 要修改的 Actor 的 ID；指定 `*` 以影响所有可见 Actor。 |
| appearance | string | 为修改后的 Actor 设置的外观。 |
| pose | string | 为修改后的 Actor 设置的姿势。 |
| via | string | 要使用的[过渡效果](/zh/guide/special-effects#过渡效果)类型（默认使用交叉淡入淡出）。 |
| params | decimal list | 过渡效果的参数。 |
| dissolve | string | [自定义溶解](/zh/guide/special-effects#过渡效果)纹理的路径（路径应相对于 `Resources` 文件夹）。仅当过渡设置为 `Custom` 模式时有效。 |
| visible | boolean | 为修改后的 Actor 设置的可见性状态。 |
| position | decimal list | 为修改后的 Actor 设置的位置（在世界空间中）。在正交模式下，使用 Z 分量（第三个成员）按深度移动（排序）。 |
| rotation | decimal list | 为修改后的 Actor 设置的旋转。 |
| scale | decimal list | 为修改后的 Actor 设置的缩放。 |
| tint | string | 要应用的色调颜色。<br><br>以 `#` 开头的字符串将按以下方式解析为十六进制：`#RGB`（变为 `RRGGBB`）、`#RRGGBB`、`#RGBA`（变为 `RRGGBBAA`）、`#RRGGBBAA`；未指定 alpha 时将默认为 `FF`。<br><br>不以 `#` 开头的字符串将被解析为文字颜色，支持以下颜色：red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta。 |
| easing | string | 要应用的[缓动函数](/zh/guide/special-effects#过渡效果)名称。未指定时，将使用配置中设置的默认函数。 |
| time | decimal | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画将在开始动画到新目标之前立即完成。 |
| wait | boolean | 是否在开始执行场景脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 将 'ButtonArea' 选择处理程序设为默认。
@choiceHandler ButtonArea default!
```

## clearBacklog

从[打印机积压](/zh/guide/text-printers#打印机积压日志)中删除所有消息。

```nani
; 打印的文本将从积压中删除。
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
@clearBacklog
```

## clearChoice

删除具有指定 ID（未指定 ID 时为默认 ID；指定 `*` 为 ID 时为所有现有处理程序）的选择处理程序中的当前选择，并（可选）隐藏它（它们）。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">handlerId</span> | string | 要清除的选择处理程序的 ID。未指定时将使用默认处理程序。指定 `*` 以清除所有现有处理程序。 |
| id | string | 要删除的特定选择的标识符。未指定时将删除所有选择。 |
| hide | boolean | 是否也隐藏受影响的选择处理程序。 |

</div>

```nani
; 给玩家 2 秒钟的时间选择一个选项。
You have 2 seconds to respond![>]
@addChoice "Cats" set:response="Cats"
@addChoice "Dogs" set:response="Dogs"
@set response="None"
@wait 2
@clearChoice
@unless response="None"
    {response}, huh?
@else
    Time's out!
```

## despawn

销毁使用 [@spawn] 命令生成的对象。

::: info NOTE
如果预制件的根对象上附加了 `MonoBehaviour` 组件，并且该组件实现了 `IParameterized` 接口，则会在销毁对象之前传递指定的 `params` 值；如果该组件实现了 `IAwaitable` 接口，则命令执行将等待实现返回的异步完成任务，然后再销毁对象。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">path</span> | string | 要销毁的预制件资源的名称（路径）。预期之前已执行具有相同参数的 [@spawn] 命令。 |
| params | string list | 销毁预制件之前要设置的参数。需要预制件的根对象上附加 `IParameterized` 组件。 |
| wait | boolean | 如果实现了 `IAwaitable` 接口，是否等待生成对象随时间销毁。 |

</div>

```nani
; 假设之前执行了 '@spawn Rainbow' 命令，取消生成（销毁）它。
@despawn Rainbow
```

## despawnAll

销毁使用 [@spawn] 命令生成的所有对象。等于对所有当前生成的对象调用 [@despawn]。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| wait | boolean | 如果实现了 `IAwaitable` 接口，是否等待生成对象随时间销毁。 |

</div>

```nani
@spawn Rainbow
@spawn SunShafts
; 将取消生成（销毁）Rainbow 和 SunShafts。
@despawnAll
```

## else

标记条件执行块的一个分支，在开头的 [@if] 或 [@unless] 以及前面的 [@else]（如果有）命令的条件不满足时执行。有关用法示例，请参阅[条件执行](/zh/guide/scenario-scripting#条件执行)指南。

## endIf

在条件块中使用缩进的替代方法：标记上一个 [@if] 命令打开的块的结束，无论缩进如何。有关用法示例，请参阅[条件执行](/zh/guide/scenario-scripting#条件执行)指南。

## enterDialogue

通过启用 Naninovel 活动（例如渲染和输入处理）进入对话模式。旨在当 Naninovel 用作嵌入式对话/过场动画系统时切换到对话或视觉小说模式。

## exitDialogue

通过重置引擎状态并禁用大多数 Naninovel 活动（例如渲染和输入处理）退出对话模式。旨在当 Naninovel 用作嵌入式对话/过场动画系统时切换出对话或视觉小说模式。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| destroy | boolean | 退出对话模式后是否也销毁（取消初始化）引擎。 |

</div>

## format

分配要应用于打印消息的[格式化模板](/zh/guide/text-printers#消息模板)。

::: info NOTE
你也可以使用[样式标签](/zh/guide/text-printers#文本样式)格式化打印的文本。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">templates</span> | named string list | 要应用的模板，格式为 `Template.AuthorFilter`；有关更多信息，请参阅[格式化模板](/zh/guide/text-printers#消息模板)指南。 |
| printer | string | 要为其分配模板的打印机 Actor 的 ID。未指定时将使用默认值。 |

</div>

```nani
; 以粗体红色文本和 45px 大小打印前两句，
; 然后重置样式并使用默认样式打印最后一句。
@format <color=#ff0000><b><size=45>%TEXT%</size></b></color>
Lorem ipsum dolor sit amet.
Cras ut nisi eget ex viverra egestas in nec magna.
@format default
Consectetur adipiscing elit.

; 除了使用 @format 命令，
; 还可以直接将样式应用于打印的文本。
Lorem ipsum sit amet. <b>Consectetur adipiscing elit.</b>
```

## glitch

将[数字故障](/zh/guide/special-effects#故障-glitch)后处理效果应用于主摄像机，模拟数字视频失真和伪影。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| time | decimal | 效果的持续时间，以秒为单位；默认为 1。 |
| power | decimal | 效果的强度，范围为 0.0 到 10.0；默认为 1。 |
| wait | boolean | 在播放下一个命令之前是否等待效果预热动画。 |

</div>

```nani
; 使用默认参数应用故障效果。
@glitch
; 在 3.33 秒内以低强度应用效果。
@glitch time:3.33 power:0.1
```

## gosub

将 naninovel 脚本播放导航到指定路径并将该路径保存到全局状态；[@return] 命令使用此信息重定向到最后调用的 gosub 命令之后的命令。

::: info NOTE
虽然此命令可以用作函数（子程序）来调用一组通用脚本行，但请记住 NaniScript 是一种场景脚本 DSL，不适合通用编程。强烈建议改用[自定义命令](/zh/guide/custom-commands)。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">path</span> | string | 导航到的路径，格式如下：`ScriptPath#Label`。省略标签时，将从头开始播放指定的脚本。省略脚本路径时，将尝试在当前播放的脚本中查找标签。 |

</div>

```nani
; 导航到当前播放脚本中的 'VictoryScene' 标签，然后
; 执行命令并导航回 'gosub' 之后的命令。
@gosub #VictoryScene
...
@stop
# VictoryScene
@back Victory
@sfx Fireworks
@bgm Fanfares
You are victorious!
@return

; 子程序内部有分支的另一个示例。
@set time=10
; 这里我们得到一个结果。
@gosub #Room
...
@set time=3
; 这里我们得到另一个结果。
@gosub #Room
@stop
# Room
@print "It's too early, I should visit after sunset." if:time<21&time>6
@print "I can sense an ominous presence!" if:time>21|time<6
@return
```

## goto

将 naninovel 脚本播放导航到指定路径。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">path</span> | string | 导航到的路径，格式如下：`ScriptPath#Label`。省略标签时，将从头开始播放指定的脚本。省略脚本路径时，将尝试在当前播放的脚本中查找标签。 |
| reset | string list | 指定时，将控制在加载脚本之前是否重置引擎服务状态（如果路径指向另一个脚本）：<br/> - 指定 `*` 以重置所有服务，除了具有 `Goto.DontReset` 属性的服务。<br/> - 指定要从重置中排除的服务类型名称（以逗号分隔）；所有其他服务都将重置，包括具有 `Goto.DontReset` 属性的服务。<br/> - 指定 `-` 强制不重置（即使在配置中默认启用了重置）。<br/><br/>请注意，虽然某些服务应用了 `Goto.DontReset` 属性并且默认不重置，但在从重置中排除特定服务时仍应指定它们。 |
| hold | boolean | 是否在目标脚本中保留资源，使其与此命令指定的脚本一起预加载。在 `Conservative` 资源策略之外无效。有关更多信息，请参阅[内存管理](/zh/guide/memory-management)指南。 |
| release | boolean | 是否在导航到目标脚本之前释放资源以释放内存。在 `Optimistic` 资源策略之外无效。有关更多信息，请参阅[内存管理](/zh/guide/memory-management)指南。 |

</div>

```nani
; 加载并从头开始播放 'Script001' 脚本。
@goto Script001

; 与上面相同，但从标签 'AfterStorm' 开始播放。
@goto Script001#AfterStorm

; 导航到当前播放脚本中的 'Epilogue' 标签。
@goto #Epilogue
...
# Epilogue
...
```

## group

允许在嵌套块内对命令进行分组。

```nani
; Random 命令选择嵌套行之一，但忽略
; 其嵌套行的子级。Group 命令在此处用于对多行进行分组，
; 以便 random 命令实际上执行多行。
@random
    @group
        @back tint:red
        Paint it red.
    @group
        @back tint:black
        Paint it black.
```

## hide

隐藏具有指定 ID 的 Actor（角色、背景、文本打印机、选择处理程序）。如果发现多个具有相同 ID 的 Actor（例如，一个角色和一个打印机），将仅影响第一个发现的 Actor。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">actorIds</span> | string list | 要隐藏的 Actor 的 ID。 |
| time | decimal | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画将在开始动画到新目标之前立即完成。 |
| wait | boolean | 是否在开始执行场景脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 假设 Actor ID 'Smoke' 可见，在 3 秒内隐藏它。
@hide Smoke time:3

; 隐藏 'Kohaku' 和 'Yuko' Actor。
@hide Kohaku,Yuko
```

## hideAll

隐藏场景中的所有 Actor（角色、背景、文本打印机、选择处理程序）。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| time | decimal | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画将在开始动画到新目标之前立即完成。 |
| wait | boolean | 是否在开始执行场景脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 隐藏场景中所有可见的 Actor（角色、背景、打印机等）。
@hideAll
```

## hideChars

隐藏场景中所有可见的角色。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| time | decimal | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画将在开始动画到新目标之前立即完成。 |
| wait | boolean | 是否在开始执行场景脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 隐藏场景中所有可见的角色 Actor。
@hideChars
```

## hidePrinter

隐藏文本打印机。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">printerId</span> | string | 要使用的打印机 Actor 的 ID。未指定时将使用默认值。 |
| time | decimal | 命令启动的动画持续时间，以秒为单位。 |
| wait | boolean | 是否在开始执行场景脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 隐藏默认打印机。
@hidePrinter

; 隐藏 ID 为 'Wide' 的打印机。
@hidePrinter Wide
```

## hideUI

使具有指定名称的 [UI 元素](/zh/guide/gui#ui-自定义)不可见。未指定名称时，将停止渲染（隐藏）整个 UI（包括所有内置 UI）。

::: info NOTE
使用此命令隐藏整个 UI 且 `allowToggle` 参数为 false（默认）时，用户将无法使用热键或通过单击屏幕上的任意位置重新显示 UI；使用 [@showUI] 命令使 UI 再次可见。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">uINames</span> | string list | 要隐藏的 UI 元素的名称。 |
| allowToggle | boolean | 隐藏整个 UI 时，控制是否允许用户使用热键或通过单击屏幕上的任意位置重新显示 UI（默认为 false）。隐藏特定 UI 时无效。 |
| time | decimal | 隐藏动画的持续时间（以秒为单位）。未指定时，将使用特定于 UI 的持续时间。 |
| wait | boolean | 在播放下一个命令之前是否等待 UI 淡出动画。 |

</div>

```nani
; 假设有一个自定义 'Calendar' UI，以下命令将隐藏它。
@hideUI Calendar

; 隐藏整个 UI，不允许用户重新显示它。
@hideUI
...
; 使 UI 再次可见。
@showUI

; 隐藏整个 UI，但允许用户将其切换回来。
@hideUI allowToggle!

; 同时隐藏内置 'TipsUI' 和自定义 'Calendar' UI。
@hideUI TipsUI,Calendar
```

## if

标记条件执行块的开始。嵌套行被视为块的主体，仅在条件无名参数评估为 `true` 时才会执行。有关更多信息，请参阅[条件执行](/zh/guide/scenario-scripting#条件执行)指南。

::: info NOTE
此命令与 [@unless] 相反且互补。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">expression</span> | string | 一个[脚本表达式](/zh/guide/script-expressions)，应返回一个布尔值，决定是否执行关联的嵌套块。 |

</div>

```nani
; 根据 "score" 变量打印文本行：
;   "You've failed. Try again!" - 当分数低于 6 时。
;   "You've passed the test." 和 "Brilliant!" - 当分数高于 8 时。
;   "You've passed the test." 和 "Impressive!" - 当分数高于 7 时。
;   "You've passed the test." 和 "Good job!" - 否则。
@if score>6
    You've passed the test.
    @if score>8
        Brilliant!
    @else if:score>7
        Impressive!
    @else
        Good job!
@else
    You've failed. Try again!

; 根据 "score" 变量打印文本行：
;   "Test result: Failed." - 当分数低于 6 时。
;   "Test result: Perfect!" - 当分数高于 8 时。
;   "Test result: Passed." - 否则。
Test result:[if score>8] Perfect![else if:score>6] Passed.[else] Failed.[endif]
```

## input

显示一个输入字段 UI，用户可以在其中输入任意文本。提交后，输入的文本将分配给指定的自定义变量。

::: info NOTE
要使用此命令为角色分配显示名称，请考虑[将名称绑定到自定义变量](/zh/guide/characters#显示名称)。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">variableName</span> | string | 输入文本将分配给的自定义变量的名称。 |
| type | string | 输入内容的类型；默认为指定变量的类型。用于更改分配的变量类型或分配给新变量时。支持的类型：`String`、`Numeric`、`Boolean`。 |
| summary | string | 与输入字段一起显示的可选摘要文本。当文本包含空格时，请用双引号 (`"`) 将其括起来。如果你希望在文本本身中包含双引号，请对其进行转义。 |
| value | string | 为输入字段设置的预定义值。未分配时将提取分配变量的现有值（如果有）。 |
| nostop | boolean | 在玩家提交输入之前是否不停止脚本播放。 |

</div>

```nani
; 提示输入任意文本并将其分配给 'name' 自定义变量。
@input name summary:"Choose your name."

; 然后可以在 naninovel 脚本中注入分配的 'name' 变量。
Archibald: Greetings, {name}!

; ...或者在 set 和条件表达式中使用它。
@set score++ if:name="Felix"
```

## lipSync

允许强制停止具有指定 ID 的角色的口型同步嘴部动画；停止后，在再次使用此命令允许之前，动画不会重新开始。角色应能够接收口型同步事件（目前仅限 generic、layered 和 Live2D 实现）。有关口型同步功能的更多信息，请参阅[角色指南](/zh/guide/characters#口型同步-lip-sync)。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">charIdAndAllow</span> | named boolean | 角色 ID 后跟一个布尔值（true 或 false），表示是否停止或允许口型同步动画。 |

</div>

```nani
; 假设自动配音已禁用且口型同步由文本消息驱动，
; 从嘴部动画中排除标点符号。
Kohaku: Lorem ipsum dolor sit amet[lipSync Kohaku.false]... [lipSync Kohaku.true]Consectetur adipiscing elit.
```

## loadScene

加载具有指定名称的 [Unity 场景](https://docs.unity3d.com/Manual/CreatingScenes.html)。不要忘记将所需的场景添加到[构建设置](https://docs.unity3d.com/Manual/BuildSettings.html)以使其可供加载。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">sceneName</span> | string | 要加载的场景名称。 |
| additive | boolean | 是以附加方式加载场景，还是在加载新场景之前卸载任何当前加载的场景（默认）。有关更多信息，请参阅[加载场景文档](https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.LoadScene.html)。 |

</div>

```nani
; 在单一模式下加载场景 'TestScene1'。
@loadScene TestScene1

; 在附加模式下加载场景 'TestScene2'。
@loadScene TestScene2 additive!
```

## lock

将具有指定 ID 的[可解锁项](/zh/guide/unlockable-items)设置为 `locked` 状态。

::: info NOTE
项目的解锁状态存储在[全局范围](/zh/guide/state-management#全局状态)中。<br/> 如果具有指定 ID 的项目未在全局状态映射中注册，则将自动添加相应的记录。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">id</span> | string | 可解锁项的 ID。使用 `*` 锁定所有已注册的可解锁项。 |

</div>

```nani
; 锁定 ID 为 'FightScene1' 的可解锁 CG 记录。
@lock CG/FightScene1
```

## look

激活/禁用摄像机观看模式，此时玩家可以使用输入设备（例如，通过移动鼠标或使用游戏手柄模拟摇杆）偏移主摄像机。查看[此视频](https://youtu.be/rC6C9mA7Szw)以快速演示命令。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">enable</span> | boolean | 是否启用或禁用摄像机观看模式。默认值：true。 |
| zone | decimal list | 距离初始摄像机位置的 X,Y 大小（以单位为单位）的边界框，描述摄像机可以移动多远。默认值：5.0,3.0 |
| speed | decimal list | 按 X,Y 轴的摄像机移动速度（灵敏度）。默认值：1.5,1.0 |
| gravity | boolean | 当观看输入不活动时（例如，鼠标未移动或模拟摇杆处于默认位置），是否自动将摄像机移动到初始位置。默认值：false。 |

</div>

```nani
; 使用默认参数激活摄像机观看模式。
@look

; 使用自定义参数激活摄像机观看模式。
@look zone:6.5,4 speed:3,2.5 gravity!

; 禁用观看模式并立即重置偏移。
@look false

; 禁用观看，但以 0.25 的速度逐渐重置。
@look false gravity! speed:0.25
```

## movie

播放具有指定名称（路径）的电影。

::: info NOTE
在播放电影之前会淡出屏幕，并在播放后淡入。可以通过激活 `cancel` 输入（默认为 `Esc` 键）来取消播放。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">movieName</span> | string | 要播放的电影资源的名称。 |
| time | decimal | 淡入淡出动画的持续时间（以秒为单位）。未指定时，将使用电影配置中设置的淡入淡出持续时间。 |
| block | boolean | 是否在播放电影时阻止与游戏的交互，防止玩家跳过它。 |

</div>

```nani
; 假设已将 'Opening' 视频剪辑添加到电影资源中，播放它。
@movie Opening
```

## openURL

使用默认 Web 浏览器打开指定的 URL（网址）。

::: info NOTE
在 WebGL 外部或编辑器中，使用 Unity 的 `Application.OpenURL` 方法来处理命令；有关行为细节和限制，请参阅[文档](https://docs.unity3d.com/ScriptReference/Application.OpenURL.html)。在 WebGL 下，将调用原生 `window.open()` JS 函数：https://developer.mozilla.org/en-US/docs/Web/API/Window/open。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">uRL</span> | string | 要打开的 URL。 |
| target | string | 浏览上下文：_self（当前标签页）、_blank（新标签页）、_parent、_top。 |

</div>

```nani
; 在当前标签页中打开空白页。
@openURL "about:blank"

; 在新标签页中打开 Naninovel 网站。
@openURL "https://naninovel.com" target:_blank
```

## print

使用文本打印机 Actor 打印（随时间显示）指定的文本消息。

::: info NOTE
此命令在处理通用文本行时在后台使用，例如通用行 `Kohaku: Hello World!` 在解析 naninovel 脚本时将自动转换为 `@print "Hello World!" author:Kohaku`。<br/> 默认情况下，在打印新消息之前重置（清除）打印机；将 `reset` 参数设置为 *false* 或在打印机 Actor 配置中禁用 `Auto Reset` 以防止这种情况并追加文本。<br/> 默认情况下，使打印机成为默认打印机并隐藏其他打印机；将 `default` 参数设置为 *false* 或在打印机 Actor 配置中禁用 `Auto Default` 以防止这种情况。<br/> 默认情况下，在完成任务之前等待用户输入；将 `waitInput` 参数设置为 *false* 或在打印机 Actor 配置中禁用 `Auto Wait` 以在文本完全显示后立即返回。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">text</span> | string | 要打印的消息文本。当文本包含空格时，请用双引号 (`"`) 将其括起来。如果你希望在文本本身中包含双引号，请对其进行转义。 |
| printer | string | 要使用的打印机 Actor 的 ID。未指定时将使用默认值。 |
| author | string | 应与打印消息关联的 Actor 的 ID。追加时忽略。指定 `*` 或使用 `,` 分隔多个 Actor ID 以使所有/选定的角色成为文本的作者；当与 `as` 参数结合使用以表示多个角色同时说话时很有用。 |
| as | string | 指定时，将使用标签代替作者 ID（或关联的显示名称）在打印消息时在文本打印机中表示作者姓名。用于覆盖几条消息的默认名称或表示多个作者同时说话，而不会触发文本打印机的作者特定行为，例如消息颜色或头像。 |
| speed | decimal | 文本显示速度倍增器；应为正数或零。设置为 1 将产生默认速度。 |
| reset | boolean | 是否在执行打印任务之前重置打印机的文本。默认值由打印机 Actor 配置菜单中的 `Auto Reset` 属性控制。 |
| default | boolean | 是否在执行打印任务之前使打印机成为默认打印机并隐藏其他打印机。默认值由打印机 Actor 配置菜单中的 `Auto Default` 属性控制。 |
| waitInput | boolean | 完成打印任务后是否等待用户输入。默认值由打印机 Actor 配置菜单中的 `Auto Wait` 属性控制。 |
| append | boolean | 是否将打印的文本追加到最后一条打印机消息。 |
| fadeTime | decimal | 控制与此命令关联的打印机显示和隐藏动画的持续时间（以秒为单位）。每个打印机的默认值在 Actor 配置中设置。 |
| wait | boolean | 在播放下一个命令之前是否等待文本显示并提示完成（等待输入）。 |

</div>

```nani
; 使用默认打印机打印短语。
@print "Lorem ipsum dolor sit amet."

; 要在文本本身中包含引号，请对其进行转义。
@print "Shouting \"Stop the car!\" was a mistake."

; 以一半的正常速度显示消息并
; 不等待用户输入即可继续。
@print "Lorem ipsum dolor sit amet." speed:0.5 !waitInput

; 打印行，显示 "Together" 作为作者姓名，
; 并使所有可见角色成为打印文本的作者。
@print "Hello World!" author:* as:"Together"

; 类似，但仅使 "Kohaku" 和 "Yuko" 成为作者。
@print "Hello World!" author:Kohaku,Yuko as:"Kohaku and Yuko"
```

## printer

修改[文本打印机 Actor](/zh/guide/text-printers)。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">idAndAppearance</span> | named string | 要修改的打印机的 ID 和要设置的外观。未指定 ID 或外观时，将使用默认值。 |
| default | boolean | 是否将打印机设为默认。未指定 `printer` 参数时，默认打印机将受所有打印机相关命令的影响。 |
| hideOther | boolean | 是否隐藏所有其他打印机。 |
| anchor | boolean | 是否允许通过 Actor 锚点自动定位打印机。在手动定位打印机后为支持的打印机启用以恢复自动定位。请注意，当使用此命令分配显式位置时，锚定将自动禁用。 |
| pos | decimal list | 为修改后的 Actor 设置的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。在正交模式下，使用 Z 分量（第三个成员，例如 `,,10`）按深度移动（排序）。 |
| id | string | 要修改的 Actor 的 ID；指定 `*` 以影响所有可见 Actor。 |
| appearance | string | 为修改后的 Actor 设置的外观。 |
| pose | string | 为修改后的 Actor 设置的姿势。 |
| via | string | 要使用的[过渡效果](/zh/guide/special-effects#过渡效果)类型（默认使用交叉淡入淡出）。 |
| params | decimal list | 过渡效果的参数。 |
| dissolve | string | [自定义溶解](/zh/guide/special-effects#过渡效果)纹理的路径（路径应相对于 `Resources` 文件夹）。仅当过渡设置为 `Custom` 模式时有效。 |
| visible | boolean | 为修改后的 Actor 设置的可见性状态。 |
| position | decimal list | 为修改后的 Actor 设置的位置（在世界空间中）。在正交模式下，使用 Z 分量（第三个成员）按深度移动（排序）。 |
| rotation | decimal list | 为修改后的 Actor 设置的旋转。 |
| scale | decimal list | 为修改后的 Actor 设置的缩放。 |
| tint | string | 要应用的色调颜色。<br><br>以 `#` 开头的字符串将按以下方式解析为十六进制：`#RGB`（变为 `RRGGBB`）、`#RRGGBB`、`#RGBA`（变为 `RRGGBBAA`）、`#RRGGBBAA`；未指定 alpha 时将默认为 `FF`。<br><br>不以 `#` 开头的字符串将被解析为文字颜色，支持以下颜色：red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta。 |
| easing | string | 要应用的[缓动函数](/zh/guide/special-effects#过渡效果)名称。未指定时，将使用配置中设置的默认函数。 |
| time | decimal | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画将在开始动画到新目标之前立即完成。 |
| wait | boolean | 是否在开始执行场景脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 将 'Wide' 打印机设为默认并隐藏任何其他可见打印机。
@printer Wide

; 将 'Right' 外观分配给 'Bubble' 打印机，使其成为默认打印机，
; 放置在场景中心且不隐藏其他打印机。
@printer Bubble.Right pos:50,50 !hideOther
```

## processInput

允许暂停和恢复用户输入处理（例如，对按下键盘按键的反应）。动作的效果是持久的，并随游戏保存。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">inputEnabled</span> | boolean | 是否启用所有采样器的输入处理。 |
| set | named boolean list | 允许静音和取消静音单个输入采样器。 |

</div>

```nani
; 停止所有采样器的输入处理。
@processInput false

; 恢复所有采样器的输入处理。
@processInput true

; 静音 'Rollback' 和 'Pause' 输入并取消静音 'Continue' 输入。
@processInput set:Rollback.false,Pause.false,Continue.true
```
## purgeRollback

防止玩家回滚到以前的状态快照。

```nani
; 防止玩家回滚以尝试选择另一个选项。

Select a choice. You won't be able to rollback.
@choice One goto:#One
@choice Two goto:#Two

# One
@purgeRollback
You've picked one.
@stop

# Two
@purgeRollback
You've picked two.
@stop
```

## rain

生成模拟[雨](/zh/guide/special-effects#雨-rain)的粒子系统。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| power | decimal | 雨的强度（每秒粒子生成率）；默认为 500。设置为 0 以禁用（取消生成）效果。 |
| time | decimal | 粒子系统将在指定时间内（以秒为单位）逐渐将生成率增加到目标水平。 |
| xSpeed | decimal | 粒子水平速度的倍增器。用于改变雨滴的角度。 |
| ySpeed | decimal | 粒子垂直速度的倍增器。 |
| pos | decimal list | 为生成的效果游戏对象设置的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。在正交模式下，使用 Z 分量（第三个成员，例如 `,,10`）按深度移动（排序）。 |
| position | decimal list | 为生成的效果游戏对象设置的位置（在世界空间中）。 |
| rotation | decimal list | 为生成的效果游戏对象设置的旋转。 |
| scale | decimal list | 为生成的效果游戏对象设置的缩放。 |
| wait | boolean | 在播放下一个命令之前是否等待效果预热动画。 |

</div>

```nani
; 在 10 秒内开始大雨。
@Rain power:1500 time:10
; 在 30 秒内停止雨。
@Rain power:0 time:30
```

## random

执行随机选取的嵌套命令之一。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| weight | decimal list | 嵌套命令的自定义概率，范围为 0.0 到 1.0。默认情况下，选择所有命令的概率相等。 |

</div>

```nani
; 以相等的概率播放 3 种声音之一。
@random
    @sfx Sound1
    @sfx Sound2
    @sfx Sound3

; 以 80% 的概率播放第 2 种声音，或以各 10% 的概率播放第 1/3 种声音。
@random weight:0.1,0.8,0.1
    @sfx Sound1
    @sfx Sound2
    @sfx Sound3

; 添加一个摇动摄像机、为 Kohaku Actor 着色或播放 'SoundX' SFX 的选择，
; 概率均为 33%。但是，仅当分数高于 10 时
; 才会考虑 SFX 播放。
@random
    @choice "Shake camera!"
        You've asked for it!
        @shake Camera
    @group
        Going to tint Kohaku!
        @char Kohaku tint:red
    @sfx SoundX if:score>10
```

## remove

移除（处置）具有指定 ID 的 Actor（角色、背景、文本打印机、选择处理程序）。如果发现多个具有相同 ID 的 Actor（例如，一个角色和一个打印机），将仅影响第一个发现的 Actor。

::: info NOTE
默认情况下，Naninovel 在卸载脚本资源时会自动移除未使用的 Actor；仅当资源提供者配置中的 `Remove Actors` 被禁用时，或者需要在特定时刻强制处置 Actor 时，才使用此命令。有关更多信息，请参阅[内存管理](/zh/guide/memory-management#actor-资源)指南。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">actorIds</span> | string list | 要移除的 Actor 的 ID，或使用 `*` 移除所有 Actor。 |

</div>

```nani
; 淡出然后处置 Kohaku 和 Yuko Actor。
@hide Kohaku,Yuko wait!
@remove Kohaku,Yuko

; 淡出并移除所有 Actor。
@hideAll wait!
@remove *
```

## resetState

重置[引擎服务](/zh/guide/engine-services)的状态并卸载（处置）Naninovel 加载的所有资源（纹理、音频、视频等）；基本上将恢复到空的初始引擎状态。

::: info NOTE
请注意，此命令无法撤消（倒带）。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">exclude</span> | string list | 要从重置中排除的[引擎服务](/zh/guide/engine-services)（接口）的名称。考虑添加 `ICustomVariableManager` 以保留局部变量。 |
| only | string list | 要重置的[引擎服务](/zh/guide/engine-services)（接口）的名称；其他服务不会受到影响。分配无名（排除）参数时无效。 |

</div>

```nani
; 重置所有服务（脚本将停止播放）。
@resetState

; 重置除脚本播放器、自定义变量和音频管理器之外的所有服务，
; 允许当前脚本和音频轨道继续播放
; 并保留自定义变量的值。
@resetState IScriptPlayer,ICustomVariableManager,IAudioManager

; 仅重置 'ICharacterManager' 和 'IBackgroundManager' 服务，
; 从场景中移除所有角色和背景 Actor
; 并从内存中卸载相关资源。
@resetState only:ICharacterManager,IBackgroundManager
```

## resetText

重置（清除）文本打印机的内容。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">printerId</span> | string | 要使用的打印机 Actor 的 ID。未指定时将使用默认值。 |

</div>

```nani
; 打印然后清除默认打印机的内容。
This line will disappear.
@resetText

; 与上面相同，但使用 'Wide' 打印机。
@print "This line will disappear." printer:Wide
@resetText Wide
```

## return

尝试将 naninovel 脚本播放导航到最后使用的 [@gosub] 之后的命令。有关更多信息和用法示例，请参阅 [@gosub] 命令摘要。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| reset | string list | 指定时，将在返回到进入 gosub 的初始脚本（如果不是当前播放的脚本）之前重置引擎服务状态。指定 `*` 以重置所有服务，或指定要从重置中排除的服务名称。默认情况下，状态不会重置。 |

</div>

## save

自动将游戏保存到第一个自动保存槽。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| at | string | 保存的播放位置，格式如下：`ScriptPath#Label`。省略时，使用当前播放器位置。可用于在加载游戏后将玩家重定向到特定标签或脚本。 |

</div>

```nani
; 在当前位置自动保存。
@save

; 玩家可以选择 'rest'，这将自动保存游戏并
; 退出到标题或继续到 'NextDay'。当玩家在休息后
; 加载保存的游戏时，他们将被移动到 '# Camp' 标签之后的行，
; 'rested' 设置为 'true'，这将强制他们继续到 'NextDay'。

# Camp

; 注意变量是用 '?=' 设置的——这将仅在
; 尚未分配时分配值，而在玩家休息后加载
; 自动保存的游戏时情况并非如此。
@set rested?=false

@if rested
    Good morning! We have to go now.
    @goto NextDay

@choice "No time to rest!" goto:NextDay
@choice "Let's rest a bit"
    @set rested=true
    ; 注意 'at' 参数——当游戏加载时，
    ; 它将把玩家重定向到指定的标签。
    @save at:#Camp
    @title
```

## set

将[脚本表达式](/zh/guide/script-expressions)的结果分配给[自定义变量](/zh/guide/custom-variables)。

::: info NOTE
如果具有指定名称的变量不存在，将自动创建它。<br/><br/> 通过用 `;` 分隔来指定多个设置表达式。表达式将按声明顺序依次执行。<br/><br/> 如果变量名称以 `t_` 开头，则被视为引用存储在 'Script' [托管文本](/zh/guide/managed-text)文档中的值。此类变量无法分配，旨在引用可本地化的文本值。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">expression</span> | string | 分配表达式。<br/><br/>表达式应采用以下格式：`var=expression`，其中 `var` 是要分配的自定义变量的名称，`expression` 是一个[脚本表达式](/zh/guide/script-expressions)，其结果应分配给变量。<br/><br/>可以使用递增和递减一元运算符（`@set foo++`、`@set foo--`）和复合赋值（`@set foo+=10`、`@set foo-=3`、`@set foo*=0.1`、`@set foo/=2`）。 |

</div>

```nani
; 为 'foo' 变量分配 'bar' 字符串值。
@set foo="bar"

; 为 'foo' 变量分配 1 数值。
@set foo=1

; 为 'foo' 变量分配 'true' 布尔值。
@set foo=true

; 如果 'foo' 是数字，则其值加 0.5。
@set foo+=0.5

; 如果 'angle' 是数字，则将其余弦分配给 'foo' 变量。
@set foo=cos(angle)

; 获取 -100 到 100 之间的随机数，然后取 4 次方
; 并分配给 'foo' 变量。当表达式内部存在空格时，
; 需要引号。
@set "foo = pow(random(-100, 100), 4)"

; 如果 'foo' 是数字，则其值加 1（递增）。
@set foo++

; 如果 'foo' 是数字，则其值减 1（递减）。
@set foo--

; 为 'foo' 变量分配 'bar' 变量的值，
; 即 'Hello World!' 字符串。
@set bar="Hello World!"
@set foo=bar

; 在一行中定义多个设置表达式；
; 结果将与上面相同。
@set bar="Hello World!",foo=bar

; 可以将变量注入到 naninovel 脚本命令参数中。
@set scale=0
# EnlargeLoop
@char Kohaku.Default scale:{scale}
@set scale+=0.1
@goto #EnlargeLoop if:scale<1

; ...以及通用文本行。
@set drink="Dr. Pepper"
My favourite drink is {drink}!

; 在文本表达式值内使用双引号时，请对其进行转义。
@set remark="Shouting \"Stop the car!\" was a mistake."

; 使用全局变量（'g_' 前缀）在会话之间保留值。
; 即使游戏重新启动，变量也将保持为 true。
@set g_Ending001Reached=true

; 即使在重玩时，也只增加全局变量一次。
@set g_GlobalCounter++ if:!hasPlayed()

; 仅在尚未分配的情况下声明并分配变量。
@set g_CompletedRouteX?=false
```

## sfx

播放或修改当前播放的具有指定名称的 [SFX（音效）](/zh/guide/audio#声音效果) 轨道。

::: info NOTE
音效轨道默认不循环播放。未指定 sfx 轨道名称 (SfxPath) 时，将影响所有当前播放的轨道。当对已在播放的轨道调用时，播放不会受到影响（轨道不会从头开始播放），但将应用指定的参数（音量和轨道是否循环）。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">sfxPath</span> | string | 要播放的音效资源的路径。 |
| volume | decimal | 音效的音量。 |
| loop | boolean | 是否循环播放音效。 |
| fade | decimal | 开始播放时的音量淡入持续时间，以秒为单位（默认为 0.0）；修改正在播放的轨道时无效。 |
| group | string | 播放音频时应使用的混音器[组路径](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。 |
| time | decimal | 修改的持续时间（以秒为单位）。 |
| wait | boolean | 在播放下一个命令之前是否等待 SFX 淡入动画完成。 |

</div>

```nani
; 播放一次名为 'Explosion' 的 SFX。
@sfx Explosion

; 循环播放名为 'Rain' 的 SFX 并在 30 秒内淡入。
@sfx Rain loop! fade:30

; 在 2.5 秒内将所有播放的 SFX 轨道的音量更改为 75%
; 并禁用所有它们的循环。
@sfx volume:0.75 !loop time:2.5
```

## sfxFast

播放具有指定名称的 [SFX（音效）](/zh/guide/audio#声音效果) 轨道。与 [@sfx] 命令不同，该剪辑以最小延迟播放，并且不与游戏状态序列化（即使在保存时播放，加载游戏后也不会播放）。该命令可用于播放各种瞬态音频剪辑，例如 UI 相关声音（例如，在使用 [`Play Script` 组件](/zh/guide/gui#unity-事件上的播放脚本) 单击按钮时）。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">sfxPath</span> | string | 要播放的音效资源的路径。 |
| volume | decimal | 音效的音量。 |
| restart | boolean | 如果已在播放，是否从头开始播放音频。 |
| additive | boolean | 是否允许播放同一剪辑的多个实例；当启用 `restart` 时无效。 |
| group | string | 播放音频时应使用的混音器[组路径](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。 |
| wait | boolean | 是否在开始执行场景脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 播放一次名为 'Click' 的 SFX。
@sfxFast Click

; 与上面相同，但允许同时播放同一剪辑。
@sfxFast Click !restart
```

## shake

为具有指定 ID 的 Actor 或主摄像机应用[摇动效果](/zh/guide/special-effects#震动-shake)。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">actorId</span> | string | 要摇动的 Actor 的 ID。如果发现多个具有相同 ID 的 Actor（例如，一个角色和一个打印机），将仅影响第一个发现的 Actor。未指定时，将摇动默认文本打印机。要摇动主摄像机，请使用 `Camera` 关键字。 |
| count | integer | 摇动迭代次数。启用 `loop` 时忽略。 |
| loop | boolean | 是否继续摇动直到禁用。 |
| time | decimal | 每次摇动迭代的基本持续时间，以秒为单位。 |
| deltaTime | decimal | 应用于效果基本持续时间的随机化修饰符。 |
| power | decimal | 每次摇动迭代的基本位移幅度，以单位为单位。 |
| deltaPower | decimal | 应用于基本位移幅度的随机化修饰符。 |
| hor | boolean | 是否水平（按 x 轴）置换 Actor。 |
| ver | boolean | 是否垂直（按 y 轴）置换 Actor。 |
| wait | boolean | 在播放下一个命令之前是否等待效果预热动画。 |

</div>

```nani
; 使用默认参数摇动 'Dialogue' 文本打印机。
@shake Dialogue

; 开始摇动 'Kohaku' 角色，显示停止选择并采取相应行动。
@shake Kohaku loop!
@choice "Stop shaking"
    @shake Kohaku !loop
...

; 水平摇动主 Naninovel 摄像机 5 次。
@shake Camera count:5 hor! !ver
```

## show

显示（使其可见）具有指定 ID 的 Actor（角色、背景、文本打印机、选择处理程序等）。如果发现多个具有相同 ID 的 Actor（例如，一个角色和一个打印机），将仅影响第一个发现的 Actor。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">actorIds</span> | string list | 要显示的 Actor 的 ID。 |
| time | decimal | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画将在开始动画到新目标之前立即完成。 |
| wait | boolean | 是否在开始执行场景脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 假设 Actor ID 'Smoke' 被隐藏，在 3 秒内显示它。
@show Smoke time:3

; 显示 'Kohaku' 和 'Yuko' Actor。
@show Kohaku,Yuko
```

## showPrinter

显示文本打印机。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">printerId</span> | string | 要使用的打印机 Actor 的 ID。未指定时将使用默认值。 |
| time | decimal | 命令启动的动画持续时间，以秒为单位。 |
| wait | boolean | 是否在开始执行场景脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 显示默认打印机。
@showPrinter

; 显示 ID 为 'Wide' 的打印机。
@showPrinter Wide
```

## showUI

使具有指定资源名称的 [UI 元素](/zh/guide/gui)可见。未指定名称时，将显示整个 UI（如果使用 [@hideUI] 隐藏）。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">uINames</span> | string list | 要显示的 UI 资源的名称。 |
| time | decimal | 显示动画的持续时间（以秒为单位）。未指定时，将使用特定于 UI 的持续时间。 |
| wait | boolean | 在播放下一个命令之前是否等待 UI 淡入动画。 |

</div>

```nani
; 假设你添加了一个名为 'Calendar' 的自定义 UI，
; 以下内容将使其在场景中可见。
@showUI Calendar

; 假设你使用 @hideUI 隐藏了整个 UI，将其显示回来。
@showUI

; 同时显示内置 'TipsUI' 和自定义 'Calendar' UI。
@showUI TipsUI,Calendar
```

## skip

允许启用或禁用脚本播放器“跳过”模式。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">enable</span> | boolean | 是否启用（默认）或禁用跳过模式。 |

</div>

```nani
; 启用跳过模式。
@skip

; 禁用跳过模式。
@skip false
```

## slide

滑动（在两个位置之间移动）具有指定 ID 的 Actor（角色、背景、文本打印机或选择处理程序），并可选择更改 Actor 的可见性和外观。可用于代替多个 [@char] 或 [@back] 命令，通过滑动动画显示或隐藏 Actor。

::: info NOTE
请注意，此命令将在所有 Actor 管理器中搜索具有指定 ID 的现有 Actor，如果存在多个具有相同 ID 的 Actor（例如，一个角色和一个文本打印机），这将仅影响第一个发现的 Actor。在使用此命令引用 Actor 之前，请确保该 Actor 存在于场景中；例如，如果是角色，你可以使用 `@char CharID visible:false time:0` 将其不被察觉地添加到场景中。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">idAndAppearance</span> | named string | 要滑动的 Actor 的 ID 和（可选）要设置的外观。 |
| from | decimal list | 在场景空间中滑动 Actor 的起始位置（滑动开始位置）。描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角；Z 分量（深度）在世界空间中。未指定时，如果可见将使用当前 Actor 位置，否则使用随机场景外位置（可能从左侧或右侧边界滑入）。 |
| <span class="command-param-required" title="必需参数：应始终指定参数">to</span> | decimal list | 在场景空间中滑动 Actor 的目标位置（滑动结束位置）。 |
| visible | boolean | 更改 Actor 的可见性状态（显示或隐藏）。未设置且目标 Actor 被隐藏时，仍会自动显示它。 |
| easing | string | 要应用的[缓动函数](/zh/guide/special-effects#过渡效果)名称。未指定时，将使用配置中设置的默认函数。 |
| time | decimal | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画将在开始动画到新目标之前立即完成。 |
| wait | boolean | 是否在开始执行场景脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 假设 'Jenna' Actor 不可见，以 'Angry' 外观显示它
; 并从场景的左边界或右边界滑动到中心。
@slide Jenna.Angry to:50

; 假设 'Sheba' Actor 当前可见，
; 隐藏它并将其滑出场景左边界。
@slide Sheba to:-10 !visible

; 使用 'EaseOutBounce' 动画缓动，
; 在 5 秒内将 'Mia' Actor 从场景的左中心侧滑动到右下角。
@slide Sheba from:15,50 to:85,0 time:5 easing:EaseOutBounce
```
## snow

生成模拟[雪](/zh/guide/special-effects#雪-snow)的粒子系统。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| power | decimal | 雪的强度（每秒粒子生成率）；默认为 100。设置为 0 以禁用（取消生成）效果。 |
| time | decimal | 粒子系统将在指定时间内（以秒为单位）逐渐将生成率增加到目标水平。 |
| pos | decimal list | 为生成的效果游戏对象设置的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。在正交模式下，使用 Z 分量（第三个成员，例如 `,,10`）按深度移动（排序）。 |
| position | decimal list | 为生成的效果游戏对象设置的位置（在世界空间中）。 |
| rotation | decimal list | 为生成的效果游戏对象设置的旋转。 |
| scale | decimal list | 为生成的效果游戏对象设置的缩放。 |
| wait | boolean | 在播放下一个命令之前是否等待效果预热动画。 |

</div>

```nani
; 在 10 秒内开始大雪。
@snow power:300 time:10
; 在 30 秒内停止雪。
@snow power:0 time:30
```

## spawn

实例化预制件或[特殊效果](/zh/guide/special-effects)；当对已生成的对象执行时，将改为更新生成参数。

::: info NOTE
如果预制件的根对象上附加了 `MonoBehaviour` 组件，并且该组件实现了 `IParameterized` 接口，则会在生成后传递指定的 `params` 值；如果该组件实现了 `IAwaitable` 接口，则命令执行将能够等待实现返回的异步完成任务。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">path</span> | string | 要生成的预制件资源的名称（路径）。 |
| params | string list | 生成预制件时要设置的参数。需要预制件的根对象上附加 `IParameterized` 组件。 |
| pos | decimal list | 为生成的对象设置的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。在正交模式下，使用 Z 分量（第三个成员，例如 `,,10`）按深度移动（排序）。 |
| position | decimal list | 为生成的对象设置的位置（在世界空间中）。 |
| rotation | decimal list | 为生成的对象设置的旋转。 |
| scale | decimal list | 为生成的对象设置的缩放。 |
| wait | boolean | 如果实现了 `IAwaitable` 接口，是否等待生成预热。 |

</div>

```nani
; 假设 'Rainbow' 预制件已分配在生成资源中，实例化它。
@spawn Rainbow
```

## stop

停止场景脚本播放。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">trackId</span> | string | 要停止的脚本轨道的标识符；未指定时停止主轨道。可用于停止使用 [@async] 命令生成的异步轨道的播放。 |

</div>

```nani
@gosub #Label
...
@stop

; 上面的 Stop 命令防止脚本播放继续
; 在下面的标签下进行。
# Label
This line is only executed when navigated directly with a @gosub.
@return

; 循环 'Quake' 异步任务直到停止。
@async Quake loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3,10) }
...
; 停止 'Quake' 异步任务。
@stop Quake
```

## stopBgm

停止播放具有指定名称的 BGM（背景音乐）轨道。

::: info NOTE
未指定音乐轨道名称 (BgmPath) 时，将停止所有当前播放的轨道。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">bgmPath</span> | string | 要停止的音乐轨道的路径。 |
| fade | decimal | 停止播放前的音量淡出持续时间，以秒为单位（默认为 0.35）。 |
| wait | boolean | 在播放下一个命令之前是否等待 BGM 淡出动画完成。 |

</div>

```nani
; 在 10 秒内淡出 'Sanctuary' bgm 轨道并停止播放。
@stopBgm Sanctuary fade:10

; 停止所有当前播放的音乐轨道。
@stopBgm
```

## stopSfx

停止播放具有指定名称的 SFX（音效）轨道。

::: info NOTE
未指定音效轨道名称 (SfxPath) 时，将停止所有当前播放的轨道。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">sfxPath</span> | string | 要停止的音效的路径。 |
| fade | decimal | 停止播放前的音量淡出持续时间，以秒为单位（默认为 0.35）。 |
| wait | boolean | 在播放下一个命令之前是否等待 SFX 淡出动画完成。 |

</div>

```nani
; 停止播放名为 'Rain' 的 SFX，淡出 15 秒。
@stopSfx Rain fade:15

; 停止所有当前播放的音效轨道。
@stopSfx
```

## stopVoice

停止播放当前播放的语音剪辑。

```nani
; 假设正在播放语音，停止它。
@stopVoice
```

## sun

生成模拟[太阳光](/zh/guide/special-effects#阳光-sun)（又名上帝之光）的粒子系统。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| power | decimal | 光线的强度（不透明度），范围为 0.0 到 1.0；默认为 0.85。设置为 0 以禁用（取消生成）效果。 |
| time | decimal | 粒子系统将在指定时间内（以秒为单位）逐渐将生成率增加到目标水平。 |
| pos | decimal list | 为生成的效果游戏对象设置的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。在正交模式下，使用 Z 分量（第三个成员，例如 `,,10`）按深度移动（排序）。 |
| position | decimal list | 为生成的效果游戏对象设置的位置（在世界空间中）。 |
| rotation | decimal list | 为生成的效果游戏对象设置的旋转。 |
| scale | decimal list | 为生成的效果游戏对象设置的缩放。 |
| wait | boolean | 在播放下一个命令之前是否等待效果预热动画。 |

</div>

```nani
; 在 10 秒内开始强烈的阳光。
@sun power:1 time:10
; 在 30 秒内停止阳光。
@sun power:0 time:30
```

## sync

将具有指定标识符的播放器轨道导航到当前行并处置宿主轨道。用于将异步执行的轨道彼此或与主轨道连接（同步）。有关更多信息，请参阅[并发播放](/zh/guide/scenario-scripting#并发播放)指南。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">trackId</span> | string | 要连接的播放器轨道的唯一标识符。未指定时使用主轨道。 |

</div>

```nani
You'll have 60 seconds to defuse the bomb!

@async Boom
    @wait 60
    ; 60 秒后，如果 'Boom' 任务未停止，
    ; 下面的 @sync 命令将强制主轨道移动到此处，
    ; 然后将导航到 'BadEnd' 脚本。
    @sync
    @goto BadEnd

; 模拟一系列拆弹谜题。
The defuse puzzle 1.
The defuse puzzle 2.
The defuse puzzle 3.

; 'Boom' 异步任务已停止，因此主轨道
; 将继续执行而不中断。
@stop Boom
The bomb is defused!
```

## timeline

通过指定名称的场景游戏对象上的 [Director](https://docs.unity3d.com/ScriptReference/Playables.PlayableDirector.html) 组件控制 [Timeline](https://docs.unity3d.com/Manual/com.unity.timeline.html)。默认情况下，除非指定了 'stop'、'pause' 或 'resume' 标志，否则该命令将使导演开始播放。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">name</span> | string | 附加了 'Playable Director' 组件的活动场景游戏对象的名称。 |
| stop | boolean | 是否停止导演。 |
| pause | boolean | 是否暂停导演。 |
| resume | boolean | 是否恢复导演。 |
| wait | boolean | 是否在继续执行脚本之前等待导演停止播放。 |

</div>

```nani
; 使附加到场景上 'Cutscene001' 游戏对象的导演组件
; 开始播放关联的时间轴并等待完成。
@timeline Cutscene001 wait!

; 停止附加到 'The Other Cutscene' 游戏对象的导演。
@timeline "The Other Cutscene" stop!
```

## title

重置引擎状态并开始播放 'Title' 脚本（如果在脚本配置中分配）。

```nani
; 退出到标题。
@title
```

## toast

显示带有指定文本和（可选）外观及持续时间的通用自动隐藏弹出通知（又名“toast”）UI。UI 会在指定的（或默认的）持续时间后自动隐藏。

::: info NOTE
外观名称是 `ToastUI` UI 预制件中具有 `Toast Appearance` 组件的游戏对象的名称（不区分大小写）。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">text</span> | string | 为 toast 设置的文本内容。 |
| appearance | string | toast 的外观变体（游戏对象名称）。未指定时，将使用 Toast UI 预制件中设置的默认外观。 |
| time | decimal | 隐藏 toast 之前等待的秒数。未指定时，将使用 Toast UI 预制件中默认设置的持续时间。 |

</div>

```nani
; 显示带有 'Hello World!' 内容的默认 toast。
@toast "Hello World!"

; 显示带有 'warning' 外观的 toast。
@toast "You're in danger!" appearance:warning

; toast 将在 1 秒后消失。
@toast "I'll disappear in 1 second." time:1
```

## trans

执行场景过渡，用命令开始执行时可见的任何内容（UI 除外）掩盖真实的场景内容，执行嵌套命令以更改场景并以指定的[过渡效果](/zh/guide/special-effects#过渡效果)结束。<br/><br/> 该命令的工作原理类似于 Actor 外观过渡，但覆盖整个场景。使用它可以通过过渡效果在单个批次中将多个 Actor 和其他可见实体更改为新状态。

::: info NOTE
在过渡进行期间（嵌套命令正在运行），UI 将被隐藏且用户输入被阻止。你可以通过覆盖处理过渡过程的 `ISceneTransitionUI` 来更改此设置。<br/><br/> 异步嵌套命令将立即执行，无需为每个命令指定 `time:0`。<br/><br/> 嵌套块应该总是能完成；不要嵌套任何可能导航到嵌套块外部的命令，因为这可能会导致未定义的行为。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID">transition</span> | string | 要使用的[过渡效果](/zh/guide/special-effects#过渡效果)类型（默认使用交叉淡入淡出）。 |
| params | decimal list | 过渡效果的参数。 |
| dissolve | string | [自定义溶解](/zh/guide/special-effects#过渡效果)纹理的路径（路径应相对于 `Resources` 文件夹）。仅当过渡设置为 `Custom` 模式时有效。 |
| easing | string | 用于过渡的[缓动函数](/zh/guide/special-effects#过渡效果)名称。 |
| time | decimal | 过渡的持续时间（以秒为单位）。 |

</div>

```nani
; 使用 'Felix' 角色和阳光明媚的氛围设置初始场景。
@char Felix
@back SunnyDay
@sun power:1
Felix: What a nice day!

; 过渡到具有 'Jenna' 角色和下雨氛围的新场景
; 在 3 秒内通过 'DropFade' 过渡效果。
@trans DropFade time:3
    @hide Felix
    @char Jenna
    @back RainyDay
    @sun power:0
    @rain power:1
Jenna: When will the damn rain stop?
```

## unless

标记反向条件执行块的开始。嵌套行被视为块的主体，仅在条件无名参数评估为 `false` 时才会执行。有关更多信息，请参阅[条件执行](/zh/guide/scenario-scripting#条件执行)指南。

::: info NOTE
此命令与 [@if] 相反且互补。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">expression</span> | string | 一个[脚本表达式](/zh/guide/script-expressions)，应返回一个布尔值，决定是否执行关联的嵌套块。 |

</div>

```nani
; 如果 "dead" 变量为 false，则打印 "You're still alive!"，
; 否则打印 "You're done."。
@unless dead
    You're still alive!
@else
    You're done.

; 根据 "score" 变量打印文本行：
;   "Test result: Passed." - 当分数是 10 或以上时。
;   "Test result: Failed." - 当分数低于 10 时。
Test result:[unless score<10] Passed.[else] Failed.[endif]
```

## unloadScene

卸载具有指定名称的 [Unity 场景](https://docs.unity3d.com/Manual/CreatingScenes.html)。不要忘记将所需的场景添加到[构建设置](https://docs.unity3d.com/Manual/BuildSettings.html)以使其可供加载。请注意，只能卸载以附加方式加载的场景（至少应始终保留一个场景加载）。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">sceneName</span> | string | 要卸载的场景名称。 |

</div>

```nani
; 以附加模式加载场景 'TestScene2'，然后卸载它。
@loadScene TestScene2 additive!
@unloadScene TestScene2
```

## unlock

将具有指定 ID 的[可解锁项](/zh/guide/unlockable-items)设置为 `unlocked` 状态。

::: info NOTE
项目的解锁状态存储在[全局范围](/zh/guide/state-management#全局状态)中。<br/> 如果具有指定 ID 的项目未在全局状态映射中注册，则将自动添加相应的记录。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">id</span> | string | 可解锁项的 ID。使用 `*` 解锁所有已注册的可解锁项。 |

</div>

```nani
; 解锁 ID 为 'FightScene1' 的可解锁 CG 记录。
@unlock CG/FightScene1
```

## voice

在指定路径播放语音剪辑。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">voicePath</span> | string | 要播放的语音剪辑的路径。 |
| volume | decimal | 播放的音量。 |
| group | string | 播放音频时应使用的混音器[组路径](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。 |
| authorId | string | 此语音所属的角色 Actor 的 ID。指定时且使用[按作者音量](/zh/guide/voicing#作者音量)，音量将相应调整。 |

</div>

```nani
; 假设 'Rawr' 语音资源可用，播放它。
@voice Rawr
```

## wait

暂停脚本执行直到满足指定的等待条件。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">waitMode</span> | string | 等待条件：<br/> - `i` 用户按下继续或跳过输入键；<br/> - `0.0` 计时器（秒）；<br/> - `i0.0` 可通过继续或跳过输入键跳过的计时器。 |

</div>

```nani
; 摇动背景效果结束后 0.5 秒播放雷声 SFX。
@spawn ShakeBackground
@wait 0.5
@sfx Thunder

; 打印前 2 个单词，然后等待输入再打印其余部分。
Lorem ipsum[wait i] dolor sit amet.
; 你也可以使用以下快捷方式作为此等待模式。
Lorem ipsum[-] dolor sit amet.

; 启动循环 SFX，打印消息并等待可跳过的 5 秒延迟，
; 然后停止 SFX。
@sfx Noise loop!
Jeez, what a disgusting Noise. Shut it down![wait i5][>]
@stopSfx Noise
```

## while

只要指定的条件表达式解析为 `true`，就循环执行嵌套行。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-nameless command-param-required" title="无名参数：值应在命令标识符之后指定，无需指定参数 ID  必需参数：应始终指定参数">expression</span> | string | 一个[脚本表达式](/zh/guide/script-expressions)，应返回一个布尔值，决定关联的嵌套块是否应继续循环执行。 |

</div>

```nani
; 猜数字游戏。
@set number=random(1,100),answer=0
@while answer!=number
    @input answer summary:"Guess a number between 1 and 100"
    @if answer<number
        Wrong, too low.
    @else if:answer>number
        Wrong, too high.
    @else
        Correct!
```
