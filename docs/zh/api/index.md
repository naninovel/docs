# 命令

标准脚本命令 API 参考。使用侧边栏快速在可用命令之间导航。

~~删除线~~ 表示主参数，**粗体** 代表必需参数；其他参数应视为可选参数。如果不确定这是怎么回事，请查阅 [剧本脚本指南](/zh/guide/scenario-scripting)。

大多数脚本命令都支持以下参数：

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| if | string | 一个布尔 [剧本表达式](/zh/guide/expressions)，控制命令是否应该执行。 |
| unless | string | 一个布尔 [剧本表达式](/zh/guide/expressions)，控制命令是否不应该执行（与“if”相反）。 |
| wait | boolean | 脚本播放器是否应等待异步命令完成执行后再执行下一个命令。 |

</div>

## addChoice

向具有指定 ID 的选项处理程序（或默认处理程序）添加一个 [选项](/zh/guide/choices)。使用此命令代替 [@choice] 可以动态添加选项，并更好地控制何时（或是否）停止播放。

::: info NOTE
在选项下嵌套命令时，`goto`、`gosub` 和 `set` 参数将被忽略。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">choiceSummary</span> | string | 选项显示的文本。当文本包含空格时，请用双引号（`"`）将其括起来。如果希望在文本本身中包含双引号，请对其进行转义。 |
| id | string | 选项的唯一标识符。之后可用于通过 [@clearChoice] 移除该选项。 |
| lock | string | 选项是否应被禁用或以其他方式让玩家无法选择；有关更多信息，请参阅 [选项文档](/zh/guide/choices#锁定选项)。默认不锁定。 |
| button | string | 代表该选项的 [按钮预制件](/zh/guide/choices#选项按钮) 的本地资源路径。预制件的根对象上应附加 `ChoiceHandlerButton` 组件。未指定时将使用默认按钮。 |
| pos | number list | 选项按钮在选项处理程序内的本地位置（如果处理程序实现支持）。 |
| handler | string | 要为其添加选项的选项处理程序的 ID。未指定时将使用默认处理程序。 |
| goto | string | 用户选择该选项时要跳转的路径；路径格式请参见 [@goto] 命令。在选项下嵌套命令时忽略。 |
| gosub | string | 用户选择该选项时要跳转的子程序路径；路径格式请参见 [@gosub] 命令。指定了 `goto` 时，此参数将被忽略。在选项下嵌套命令时忽略。 |
| set | string | 用户选择该选项时要执行的赋值表达式；语法参考请参见 [@set] 命令。在选项下嵌套命令时忽略。 |
| show | boolean | 是否同时显示该选项所添加到的选项处理程序；默认启用。 |
| time | number | 淡入（显示）动画的持续时间（以秒为单位）。 |

</div>

```nani
; 快速反应事件：除非玩家在 3 秒内做出选择，否则游戏结束。
快做决定！[>]
@addChoice "左转" goto:Left
@addChoice "右转" goto:Right
@wait 3
@clearChoice
你撞车了！

; 添加一个随机选项，然后停止播放，直到玩家选择它。
@random
    @addChoice "最佳选项"
        你选择了最佳选项！
    @addChoice "平庸的选项"
        你选择了平庸的选项。
    @addChoice "最差的选项"
        你选择了最差的选项...
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
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">text</span> | string | 要追加的文本。 |
| printer | string | 要使用的打印机 Actor 的 ID。未指定时将使用默认打印机。 |
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
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">characterPositions</span> | named number list | 角色 ID 到场景 X 轴位置（相对于场景左边界，以百分比表示）的命名值集合。位置 0 对应场景的左边界，100 对应右边界；50 为中心。 |
| look | boolean | 执行自动排列时，控制是否也让角色看向场景原点（默认启用）。 |
| time | number | 命令启动的动画持续时间，以秒为单位。 |
| wait | boolean | 是否在开始执行剧本脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 均匀分布所有可见角色。
@arrange

; 将 ID 为 'Jenna'、'Felix' 和 'Mia' 的角色分别放置在
; 距场景左边界 15%、50% 和 85% 处。
@arrange Jenna.15,Felix.50,Mia.85
```

## async

在专用脚本轨道上异步执行嵌套行，与主剧本播放流程并行。可用于与后续剧本并发运行复合动画或任意命令链。有关更多信息，请参阅 [并发播放](/zh/guide/scenario-scripting#并发播放) 指南。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">trackId</span> | string | 负责执行嵌套行的脚本轨道的唯一标识符。指定后，可通过该 ID 使用 [@await] 等待或使用 [@stop] 停止异步轨道的播放。 |
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

暂停剧本播放，直到指定的异步任务或所有嵌套行执行完毕。

::: info NOTE
嵌套块应始终能够执行完毕；不要嵌套任何可能导航到块外部的命令，因为这可能会导致未定义的行为。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">trackId</span> | string | 要等待的异步脚本轨道的标识符。可用于等待使用 [@async] 命令生成的轨道执行完毕。 |
| complete | boolean | 是否尽快强制完成所等待的轨道。等待嵌套行时无效。 |

</div>

```nani
; 并行运行嵌套行并等待它们全部完成。
@await
    @back RainyScene
    @bgm RainAmbient
    @camera zoom:0.5 time:3
    开始下雨了...[>]
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

修改 [背景 Actor](/zh/guide/backgrounds)。

::: info NOTE
为了更好地适应传统的视觉小说游戏流程，背景的处理方式与角色略有不同。大多数时候，场景中可能只有一个背景 Actor，它会不断过渡到不同的外观。为了省去在脚本中重复相同 Actor ID 的麻烦，可以仅提供背景外观和过渡类型（可选）作为主参数，此时默认影响 `MainBackground` Actor。如果要影响其他背景，可以通过 `id` 参数显式指定背景 Actor 的 ID。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">appearanceAndTransition</span> | named string | 为要修改的背景设置的外观（或 [姿势](/zh/guide/backgrounds#姿势)）以及要使用的 [过渡效果](/zh/guide/special-effects#过渡效果) 类型。未指定过渡时，默认使用交叉淡入淡出效果。 |
| pos | number list | 为要修改的 Actor 设置的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。在正交模式下，使用 Z 分量（第三个成员，例如 `,,10`）按深度移动（排序）。 |
| id | string | 要修改的 Actor 的 ID；指定 `*` 以影响所有可见 Actor。 |
| appearance | string | 为要修改的 Actor 设置的外观。 |
| pose | string | 为要修改的 Actor 设置的姿势。 |
| via | string | 要使用的 [过渡效果](/zh/guide/special-effects#过渡效果) 类型（默认使用交叉淡入淡出）。 |
| params | number list | 过渡效果的参数。 |
| dissolve | string | [自定义溶解](/zh/guide/special-effects#溶解遮罩) 纹理的路径（路径应相对于 `Resources` 文件夹）。仅当过渡设置为 `Custom` 模式时有效。 |
| visible | boolean | 为要修改的 Actor 设置的可见性状态。 |
| wpos | number list | 为要修改的 Actor 设置的位置（在世界空间中）。在正交模式下，使用 Z 分量（第三个成员）按深度移动（排序）。 |
| roll | number | 为要修改的 Actor 设置的 Z 轴旋转。与 `rotation` 参数的第三个分量相同；指定 `rotation` 时将忽略此参数。 |
| rotation | number list | 为要修改的 Actor 设置的旋转。 |
| scale | number list | 为要修改的 Actor 设置的缩放。 |
| tint | string | 要应用的色调颜色。<br><br>以 `#` 开头的字符串将按以下方式解析为十六进制：`#RGB`（变为 `RRGGBB`）、`#RRGGBB`、`#RGBA`（变为 `RRGGBBAA`）、`#RRGGBBAA`；未指定 alpha 时将默认为 `FF`。<br><br>不以 `#` 开头的字符串将被解析为颜色名称，支持以下名称：red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta。 |
| easing | string | 要应用的 [缓动函数](/zh/guide/special-effects#动画缓动) 名称。未指定时，将使用配置中设置的默认函数。 |
| time | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| wait | boolean | 是否在开始执行剧本脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 将 'River' 设置为主背景的外观。
@back River

; 与上面相同，但也使用 'RadialBlur' 过渡效果。
@back River.RadialBlur

; 将 'Smoke' 背景放置在屏幕中心
; 并将其缩放为原始大小的 50%。
@back id:Smoke pos:50,50 scale:0.5

; 为场景中所有可见背景设置色调。
@back id:* tint:#ffdc22
```

## bgm

播放具有指定名称的 [BGM（背景音乐）](/zh/guide/audio#背景音乐) 音轨，或修改当前正在播放的该音轨。

::: info NOTE
音乐音轨默认循环播放。未指定音乐音轨名称（`path`）时，将影响所有当前播放的音轨。对已在播放的音轨调用时，播放不会受到影响（音轨不会从头开始播放），但将应用指定的参数（音量以及音轨是否循环）。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| intro | string | 在主音轨之前播放一次的前奏音乐音轨的路径（不受循环参数影响）。 |
| group | string | 播放音频时应使用的混音器 [组路径](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。 |
| loop | boolean | 是否在播放结束时从头重复播放，直到停止。 |
| volume | number | 音频播放的响度，范围为 0.0 到 1.0。请注意，1.0 是默认值——在不产生削波的情况下，无法让数字音频以高于 0 dBFS 基线的电平播放。 |
| pitch | number | 播放的感知频率（速度），范围为 [-3.0 到 3.0](https://docs.unity3d.com/ScriptReference/AudioSource-pitch.html)，其中 1.0 为正常速度。负值将反向播放音频。 |
| pos | number list | 音频源的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。使用 Z 分量（第三个成员，例如 `,,10`）按深度移动。 |
| wpos | number list | 音频源的位置（在世界空间中）。`pos` 和 `wpos` 均未指定时，将禁用空间模式。 |
| wait | boolean | 是否等待音频播放结束后再执行下一个命令。循环播放时无效。 |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">path</span> | string | 音频资源的本地路径（名称）。 |
| easing | string | 要应用的 [缓动函数](/zh/guide/special-effects#动画缓动) 名称。未指定时，将使用配置中设置的默认函数。 |
| fade | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| waitFade | boolean | 在播放下一个命令之前是否等待淡入淡出完成。 |

</div>

```nani
; 开始循环播放名为 'Sanctuary' 的音乐音轨。
@bgm Sanctuary

; 与上面相同，但在 10 秒内淡入音量且只播放一次。
@bgm Sanctuary fade:10 !loop

; 在 2.5 秒内将所有正在播放的音乐音轨的音量更改为 50%
; 并让它们循环播放。
@bgm volume:0.5 loop! fade:2.5

; 播放 'BattleThemeIntro' 一次，然后循环播放 'BattleThemeMain'。
@bgm BattleThemeMain intro:BattleThemeIntro
```

## blur

将 [模糊效果](/zh/guide/special-effects#blur) 应用于受支持的 Actor：精灵、分层、切片、Universal、Live2D、Spine、视频、占位符和场景实现的背景和角色。

::: info NOTE
Actor 需要实现 `IBlurable` 接口才能支持该效果。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">actorId</span> | string | 要应用效果的 Actor 的 ID；如果找到多个具有相同 ID 的 Actor（例如，一个角色和一个打印机），将仅影响找到的第一个 Actor。未指定时，应用于主背景。 |
| power | number | 效果的强度，范围为 0.0 到 1.0。默认为 0.5。设置为 0 以禁用（取消生成）效果。 |
| time | number | 参数达到目标值所需的时间，以秒为单位。默认为 1.0。 |
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

模拟 [景深](/zh/guide/special-effects#bokeh)（又名散景）效果，即只有焦点中的对象保持清晰，而其他对象则变得模糊。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">focus</span> | string | 要设置焦点的游戏对象名称（可选）。设置后，焦点将始终停留在该游戏对象上，而 `dist` 参数将被忽略。 |
| dist | number | 从 Naninovel 摄像机到焦点的距离（以单位计）。指定 `focus` 参数时忽略。默认为 10。 |
| power | number | 应用于散焦区域的模糊量；也决定了焦点灵敏度。默认为 3.75。设置为 0 以禁用（取消生成）效果。 |
| time | number | 参数达到目标值所需的时间，以秒为单位。默认为 1.0。 |
| wait | boolean | 在播放下一个命令之前是否等待效果预热动画。 |

</div>

```nani
; 使用默认参数启用效果并将焦点锁定在 'Kohaku' 游戏对象上。
@bokeh focus:Kohaku
; 在 10 秒内淡出（禁用）效果。
@bokeh power:0 time:10
; 将焦点设置在距离摄像机 10 个单位的位置，
; 焦距设置为 0.95 并在 3 秒内应用。
@bokeh dist:10 power:0.95 time:3
```

## camera

修改主摄像机，随时间更改偏移、缩放级别、旋转和摄像机效果。观看 [此视频](https://youtu.be/zy28jaMss8w) 可快速了解该命令的效果。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| offset | number list | 摄像机本地位置沿 X、Y、Z 轴的偏移量（以单位计）。 |
| roll | number | 摄像机绕 Z 轴的本地旋转角度，以度为单位（0.0 到 360.0 或 -180.0 到 180.0）。与 `rotation` 参数的第三个分量相同；指定 `rotation` 时将忽略此参数。 |
| rotation | number list | 摄像机绕 X、Y、Z 轴的本地旋转角度，以度为单位（0.0 到 360.0 或 -180.0 到 180.0）。 |
| zoom | number | 摄像机的相对缩放（正交大小或视野，取决于渲染模式），范围为 0.0（无缩放）到 1.0（最大缩放）。 |
| ortho | boolean | 摄像机应以正交（true）还是透视（false）模式渲染。 |
| fx | named number list | 摄像机效果 Volume 配置文件名称及其目标权重，其中 0 表示无影响，1 表示完全应用。 |
| easing | string | 要应用的 [缓动函数](/zh/guide/special-effects#动画缓动) 名称。未指定时，将使用配置中设置的默认函数。 |
| time | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| wait | boolean | 是否在开始执行剧本脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 将摄像机在 X 轴上偏移 -3 个单位，在 Y 轴上偏移 1.5 个单位。
@camera offset:-3,1.5

; 将摄像机设置为透视模式，放大 50% 并后退 5 个单位。
@camera !ortho offset:,,-5 zoom:0.5

; 将摄像机设置为正交模式并顺时针旋转 10 度。
@camera ortho! roll:10

; 在 5 秒内同时对偏移、缩放和旋转进行动画处理。
@camera offset:-3,1.5 zoom:0.5 roll:10 time:5

; 立即将摄像机重置为默认状态。
@camera offset:0,0 zoom:0 rotation:0,0,0 time:0

; 将 'Dream' 摄像机效果 Volume 淡入至 1.0 权重。
@camera fx:Dream.1

; 在 3 秒内将摄像机效果 Volume 从 'Dream' 交叉淡入淡出到 'Night'。
@camera fx:Dream.0,Night.1 time:3
```

## char

修改 [角色 Actor](/zh/guide/characters)。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">idAndAppearance</span> | named string | 要修改的角色的 ID（指定 `*` 以影响所有可见角色）和要设置的外观（或 [姿势](/zh/guide/characters#姿势)）。未指定外观时，将使用 `Default`（如果存在）或随机外观。 |
| look | string | Actor 的朝向；支持的值：left, right, center。 |
| avatar | string | 为角色分配的 [头像纹理](/zh/guide/characters#头像纹理) 的名称（路径）。使用 `none` 从角色中移除（取消分配）头像纹理。 |
| pos | number list | 为要修改的 Actor 设置的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。在正交模式下，使用 Z 分量（第三个成员，例如 `,,10`）按深度移动（排序）。 |
| id | string | 要修改的 Actor 的 ID；指定 `*` 以影响所有可见 Actor。 |
| appearance | string | 为要修改的 Actor 设置的外观。 |
| pose | string | 为要修改的 Actor 设置的姿势。 |
| via | string | 要使用的 [过渡效果](/zh/guide/special-effects#过渡效果) 类型（默认使用交叉淡入淡出）。 |
| params | number list | 过渡效果的参数。 |
| dissolve | string | [自定义溶解](/zh/guide/special-effects#溶解遮罩) 纹理的路径（路径应相对于 `Resources` 文件夹）。仅当过渡设置为 `Custom` 模式时有效。 |
| visible | boolean | 为要修改的 Actor 设置的可见性状态。 |
| wpos | number list | 为要修改的 Actor 设置的位置（在世界空间中）。在正交模式下，使用 Z 分量（第三个成员）按深度移动（排序）。 |
| roll | number | 为要修改的 Actor 设置的 Z 轴旋转。与 `rotation` 参数的第三个分量相同；指定 `rotation` 时将忽略此参数。 |
| rotation | number list | 为要修改的 Actor 设置的旋转。 |
| scale | number list | 为要修改的 Actor 设置的缩放。 |
| tint | string | 要应用的色调颜色。<br><br>以 `#` 开头的字符串将按以下方式解析为十六进制：`#RGB`（变为 `RRGGBB`）、`#RRGGBB`、`#RGBA`（变为 `RRGGBBAA`）、`#RRGGBBAA`；未指定 alpha 时将默认为 `FF`。<br><br>不以 `#` 开头的字符串将被解析为颜色名称，支持以下名称：red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta。 |
| easing | string | 要应用的 [缓动函数](/zh/guide/special-effects#动画缓动) 名称。未指定时，将使用配置中设置的默认函数。 |
| time | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| wait | boolean | 是否在开始执行剧本脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 以默认外观显示 ID 为 'Sora' 的角色。
@char Sora

; 与上面相同，但将外观设置为 'Happy'。
@char Sora.Happy

; 与上面相同，但另外将角色放置在距离场景左边界 45%
; 和底部边界 10% 的位置；
; 还让其向左看。
@char Sora.Happy look:left pos:45,10

; 使 Sora 出现在底部中心并位于 Felix 前面。
@char Sora pos:50,0,-1
@char Felix pos:,,0

; 为场景中所有可见角色设置色调。
@char * tint:#ffdc22
```

## choice

添加一个必需的 [选项](/zh/guide/choices)，它会暂停后续的剧本播放，直到玩家做出选择。连续的选项命令将合并，从而可以一次显示多个选项。使用 [@addChoice] 代替此命令可以仅添加选项，而不要求在继续播放之前做出选择。

::: info NOTE
在选项下嵌套命令时，`goto`、`gosub` 和 `set` 参数将被忽略。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">choiceSummary</span> | string | 选项显示的文本。当文本包含空格时，请用双引号（`"`）将其括起来。如果希望在文本本身中包含双引号，请对其进行转义。 |
| id | string | 选项的唯一标识符。之后可用于通过 [@clearChoice] 移除该选项。 |
| lock | string | 选项是否应被禁用或以其他方式让玩家无法选择；有关更多信息，请参阅 [选项文档](/zh/guide/choices#锁定选项)。默认不锁定。 |
| button | string | 代表该选项的 [按钮预制件](/zh/guide/choices#选项按钮) 的本地资源路径。预制件的根对象上应附加 `ChoiceHandlerButton` 组件。未指定时将使用默认按钮。 |
| pos | number list | 选项按钮在选项处理程序内的本地位置（如果处理程序实现支持）。 |
| handler | string | 要为其添加选项的选项处理程序的 ID。未指定时将使用默认处理程序。 |
| goto | string | 用户选择该选项时要跳转的路径；路径格式请参见 [@goto] 命令。在选项下嵌套命令时忽略。 |
| gosub | string | 用户选择该选项时要跳转的子程序路径；路径格式请参见 [@gosub] 命令。指定了 `goto` 时，此参数将被忽略。在选项下嵌套命令时忽略。 |
| set | string | 用户选择该选项时要执行的赋值表达式；语法参考请参见 [@set] 命令。在选项下嵌套命令时忽略。 |
| show | boolean | 是否同时显示该选项所添加到的选项处理程序；默认启用。 |
| time | number | 淡入（显示）动画的持续时间（以秒为单位）。 |

</div>

```nani
; 打印文本，然后立即显示选项并停止播放，
; 直到其中一个选项被选中。
继续执行此脚本还是...？[>]
@choice "继续"
@choice "从头开始加载另一个脚本" goto:Another
@choice "从 \"Label\" 标签加载另一个脚本" goto:Another#Label
@choice "转到另一个脚本中的 \"Sub\" 子程序" gosub:Another#Sub

; 根据所选选项设置剧本变量。
@choice "我很谦虚，一个就够了..." set:score++
@choice "请给我两个。" set:score=score+2
@choice "我全都要！" set:karma--,score=999

; 选中该选项时播放音效并排列角色。
@choice "排列"
    @sfx Click
    @arrange k.10,y.55

; 打印与所选选项对应的文本行。
@choice "询问颜色"
    你最喜欢的颜色是什么？
@choice "询问年龄"
    你多大了？
@choice "保持沉默"
    ...

; 当 'score' 变量低于 10 时，禁用/锁定该选项。
@choice "额外选项" lock:score<10

; 仅当 'score' 变量大于或等于 10 时显示该选项。
@choice "秘密选项" if:score>=10
```

## choiceHandler

修改 [选项处理程序 Actor](/zh/guide/choices)。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">handlerId</span> | string | 要修改的选项处理程序 Actor 的 ID。未指定时，将使用默认处理程序。 |
| default | boolean | 是否将选项处理程序设为默认。未指定 `handler` 参数时，所有与选项相关的命令都将作用于默认处理程序。 |
| id | string | 要修改的 Actor 的 ID；指定 `*` 以影响所有可见 Actor。 |
| appearance | string | 为要修改的 Actor 设置的外观。 |
| pose | string | 为要修改的 Actor 设置的姿势。 |
| via | string | 要使用的 [过渡效果](/zh/guide/special-effects#过渡效果) 类型（默认使用交叉淡入淡出）。 |
| params | number list | 过渡效果的参数。 |
| dissolve | string | [自定义溶解](/zh/guide/special-effects#溶解遮罩) 纹理的路径（路径应相对于 `Resources` 文件夹）。仅当过渡设置为 `Custom` 模式时有效。 |
| visible | boolean | 为要修改的 Actor 设置的可见性状态。 |
| wpos | number list | 为要修改的 Actor 设置的位置（在世界空间中）。在正交模式下，使用 Z 分量（第三个成员）按深度移动（排序）。 |
| roll | number | 为要修改的 Actor 设置的 Z 轴旋转。与 `rotation` 参数的第三个分量相同；指定 `rotation` 时将忽略此参数。 |
| rotation | number list | 为要修改的 Actor 设置的旋转。 |
| scale | number list | 为要修改的 Actor 设置的缩放。 |
| tint | string | 要应用的色调颜色。<br><br>以 `#` 开头的字符串将按以下方式解析为十六进制：`#RGB`（变为 `RRGGBB`）、`#RRGGBB`、`#RGBA`（变为 `RRGGBBAA`）、`#RRGGBBAA`；未指定 alpha 时将默认为 `FF`。<br><br>不以 `#` 开头的字符串将被解析为颜色名称，支持以下名称：red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta。 |
| easing | string | 要应用的 [缓动函数](/zh/guide/special-effects#动画缓动) 名称。未指定时，将使用配置中设置的默认函数。 |
| time | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| wait | boolean | 是否在开始执行剧本脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 将 'ButtonArea' 选项处理程序设为默认。
@choiceHandler ButtonArea default!
```

## clearBacklog

从 [打印机历史记录](/zh/guide/text-printers#打印机历史记录) 中移除所有消息。

```nani
; 打印的文本将从历史记录中移除。
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
@clearBacklog
```

## clearChoice

移除具有指定 ID 的选项处理程序中的当前选项（未指定 ID 时为默认处理程序；指定 `*` 作为 ID 时为所有现有处理程序），并（可选）隐藏它（它们）。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">handlerId</span> | string | 要清除的选项处理程序的 ID。未指定时将使用默认处理程序。指定 `*` 以清除所有现有处理程序。 |
| id | string | 要移除的特定选项的标识符。未指定时将移除所有选项。 |
| hide | boolean | 是否也隐藏受影响的选项处理程序。 |

</div>

```nani
; 给玩家 2 秒钟的时间选择一个选项。
你有 2 秒钟的时间回答！[>]
@addChoice "猫" set:response="猫"
@addChoice "狗" set:response="狗"
@set response="None"
@wait 2
@clearChoice
@unless response="None"
    {response}，是吗？
@else
    时间到了！
```

## despawn

销毁使用 [@spawn] 命令生成的对象。

::: info NOTE
如果预制件的根对象上附加了 `MonoBehaviour` 组件，并且该组件实现了 `IParameterized` 接口，则会在销毁对象之前传递指定的 `params` 值；如果该组件实现了 `IAwaitable` 接口，则命令执行将等待实现返回的异步完成任务，然后再销毁对象。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">path</span> | string | 要销毁的预制件资源的名称（路径）。在此之前应已执行过具有相同参数的 [@spawn] 命令。 |
| params | string list | 销毁预制件之前要设置的参数。需要预制件的根对象上附加 `IParameterized` 组件。 |
| wait | boolean | 如果生成的对象实现了 `IAwaitable` 接口，是否等待其逐渐销毁完成。 |

</div>

```nani
; 假设之前执行了 '@spawn Rainbow' 命令，取消生成（销毁）它。
@despawn Rainbow
```

## despawnAll

销毁使用 [@spawn] 命令生成的所有对象。相当于对所有当前生成的对象调用 [@despawn]。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| wait | boolean | 如果生成的对象实现了 `IAwaitable` 接口，是否等待它们逐渐销毁完成。 |

</div>

```nani
@spawn Rainbow
@spawn SunShafts
; 将取消生成（销毁）Rainbow 和 SunShafts。
@despawnAll
```

## else

标记条件执行块的一个分支，在开头的 [@if] 或 [@unless] 以及前面的 [@else]（如果有）命令的条件不满足时执行。有关用法示例，请参阅 [条件执行](/zh/guide/scenario-scripting#条件执行) 指南。

## endIf

在条件块中使用缩进的替代方法：标记上一个 [@if] 命令打开的块的结束，无论缩进如何。有关用法示例，请参阅 [条件执行](/zh/guide/scenario-scripting#条件执行) 指南。

## enterDialogue

通过启用 Naninovel 活动（例如渲染和输入处理）进入对话模式。用于在 Naninovel 作为嵌入式对话/过场动画系统使用时切入对话或视觉小说模式。

## exitDialogue

通过重置引擎状态并禁用大多数 Naninovel 活动（例如渲染和输入处理）退出对话模式。用于在 Naninovel 作为嵌入式对话/过场动画系统使用时切出对话或视觉小说模式。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| destroy | boolean | 退出对话模式后是否也销毁（取消初始化）引擎。 |

</div>

## format

分配要应用于打印消息的 [格式化模板](/zh/guide/text-printers#消息模板)。

::: info NOTE
您也可以使用 [样式标签](/zh/guide/text-printers#文本样式) 格式化打印的文本。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">templates</span> | named string list | 要应用的模板，格式为 `Template.AuthorFilter`；有关更多信息，请参阅 [格式化模板](/zh/guide/text-printers#消息模板) 指南。 |
| printer | string | 要为其分配模板的打印机 Actor 的 ID。未指定时将使用默认打印机。 |

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

将 [数字故障](/zh/guide/special-effects#glitch) 后处理效果应用于主摄像机，模拟数字视频失真和伪影。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| time | number | 效果的持续时间，以秒为单位；默认为 1。 |
| power | number | 效果的强度，范围为 0.0 到 10.0；默认为 1。 |
| wait | boolean | 在播放下一个命令之前是否等待效果预热动画。 |

</div>

```nani
; 使用默认参数应用故障效果。
@glitch
; 在 3.33 秒内以低强度应用效果。
@glitch time:3.33 power:0.1
```

## gosub

将剧本脚本的播放导航到指定路径，并将该路径保存到全局状态；[@return] 命令使用此信息重定向到最后调用的 gosub 命令之后的命令。

::: info NOTE
虽然此命令可以用作函数（子程序）来调用一组公用的脚本行，但请记住 NaniScript 是一种剧本脚本 DSL，不适合通用编程。强烈建议改用 [自定义命令](/zh/guide/custom-commands)。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">path</span> | string | 要导航到的路径，格式如下：`ScriptPath#Label`。省略标签时，将从头开始播放指定的脚本。省略脚本路径时，将尝试在当前播放的脚本中查找标签。 |

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
你胜利了！
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
@print "现在还太早，我应该日落后再来。" if:time<21&time>6
@print "我能感觉到一股不祥的气息！" if:time>21|time<6
@return
```

## goto

将剧本脚本的播放导航到指定路径。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">path</span> | string | 要导航到的路径，格式如下：`ScriptPath#Label`。省略标签时，将从头开始播放指定的脚本。省略脚本路径时，将尝试在当前播放的脚本中查找标签。 |
| reset | string list | 指定时，将控制在加载脚本之前是否重置引擎服务状态（如果路径指向另一个脚本）：<br/> - 指定 `*` 以重置所有服务，但带有 `Goto.DontReset` 特性的服务除外。<br/> - 指定要从重置中排除的服务类型名称（以逗号分隔）；所有其他服务都将重置，包括带有 `Goto.DontReset` 特性的服务。<br/> - 指定 `-` 强制不重置（即使在配置中默认启用了重置）。<br/><br/>请注意，虽然某些服务应用了 `Goto.DontReset` 特性并且默认不重置，但在从重置中排除特定服务时仍应指定它们。 |
| hold | boolean | 是否持有目标脚本中的资源，使其与指定此命令的脚本一起预加载。在 `Conservative` 资源策略之外无效。有关更多信息，请参阅 [内存管理](/zh/guide/memory-management) 指南。 |
| release | boolean | 是否在导航到目标脚本之前释放资源以释放内存。在 `Optimistic` 资源策略之外无效。有关更多信息，请参阅 [内存管理](/zh/guide/memory-management) 指南。 |

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
; random 命令选择嵌套行之一，但忽略
; 其嵌套行的子级。group 命令在此处用于对多行进行分组，
; 以便 random 命令实际上执行多行。
@random
    @group
        @back tint:red
        涂成红色。
    @group
        @back tint:black
        涂成黑色。
```

## hide

隐藏具有指定 ID 的 Actor（角色、背景、文本打印机、选项处理程序）。如果找到多个具有相同 ID 的 Actor（例如，一个角色和一个打印机），将仅影响找到的第一个 Actor。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">actorIds</span> | string list | 要隐藏的 Actor 的 ID。 |
| time | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| wait | boolean | 是否在开始执行剧本脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 假设 ID 为 'Smoke' 的 Actor 可见，在 3 秒内隐藏它。
@hide Smoke time:3

; 隐藏 'Kohaku' 和 'Yuko' Actor。
@hide Kohaku,Yuko
```

## hideAll

隐藏场景中的所有 Actor（角色、背景、文本打印机、选项处理程序）。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| time | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| wait | boolean | 是否在开始执行剧本脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

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
| time | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| wait | boolean | 是否在开始执行剧本脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

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
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">printerId</span> | string | 要使用的打印机 Actor 的 ID。未指定时将使用默认打印机。 |
| time | number | 命令启动的动画持续时间，以秒为单位。 |
| wait | boolean | 是否在开始执行剧本脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 隐藏默认打印机。
@hidePrinter

; 隐藏 ID 为 'Wide' 的打印机。
@hidePrinter Wide
```

## hideUI

使具有指定名称的 [UI 元素](/zh/guide/gui#ui-自定义) 不可见。未指定名称时，将停止渲染（隐藏）整个 UI（包括所有内置 UI）。

::: info NOTE
使用此命令隐藏整个 UI 且 `allowToggle` 参数为 false（默认）时，用户将无法使用热键或通过单击屏幕上的任意位置重新显示 UI；请使用 [@showUI] 命令使 UI 再次可见。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">uiNames</span> | string list | 要隐藏的 UI 元素的名称。 |
| allowToggle | boolean | 隐藏整个 UI 时，控制是否允许用户使用热键或通过单击屏幕上的任意位置重新显示 UI（默认为 false）。隐藏特定 UI 时无效。 |
| time | number | 隐藏动画的持续时间（以秒为单位）。未指定时，将使用特定于 UI 的持续时间。 |
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

标记条件执行块的开始。嵌套行被视为块的主体，仅在条件主参数求值为 `true` 时才会执行。有关更多信息，请参阅 [条件执行](/zh/guide/scenario-scripting#条件执行) 指南。

::: info NOTE
此命令与 [@unless] 相反且互补。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">expression</span> | string | 一个 [剧本表达式](/zh/guide/expressions)，应返回一个布尔值，决定是否执行关联的嵌套块。 |

</div>

```nani
; 根据 "score" 变量打印文本行：
;   "你失败了。再试一次！" - 当 score 为 6 或更低时。
;   "你通过了测试。" 和 "太棒了！" - 当 score 高于 8 时。
;   "你通过了测试。" 和 "令人印象深刻！" - 当 score 高于 7 时。
;   "你通过了测试。" 和 "干得好！" - 其他情况。
@if score > 6
    你通过了测试。
    @if score > 8
        太棒了！
    @or score > 7
        令人印象深刻！
    @else
        干得好！
@else
    你失败了。再试一次！

; 根据 "score" 变量打印文本行：
;   "测试结果：失败。" - 当 score 为 6 或更低时。
;   "测试结果：完美！" - 当 score 高于 8 时。
;   "测试结果：通过。" - 其他情况。
测试结果：[if score>8]完美！[or score>6]通过。[else]失败。[endif]
```

## input

显示一个输入字段 UI，用户可以在其中输入任意文本。提交后，输入的文本将赋给指定的剧本变量。

::: info NOTE
要使用此命令为角色指定显示名称，请考虑 [将名称绑定到剧本变量](/zh/guide/characters#显示名称)。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">variableName</span> | string | 接收输入文本的剧本变量的名称。 |
| type | string | 输入内容的类型；默认为指定变量的类型。可用于更改所赋值变量的类型，或在赋值给新变量时使用。支持的类型：`String`、`Numeric`、`Boolean`。 |
| summary | string | 与输入字段一起显示的可选摘要文本。当文本包含空格时，请用双引号（`"`）将其括起来。如果希望在文本本身中包含双引号，请对其进行转义。 |
| value | string | 为输入字段设置的预定义值。未指定时将取用所赋值变量的现有值（如果有）。 |
| nostop | boolean | 在玩家提交输入之前是否不停止脚本播放。 |

</div>

```nani
; 提示输入任意文本并将其赋给 'name' 剧本变量。
@input name summary:"请选择你的名字。"

; 然后可以在剧本脚本中注入已赋值的 'name' 变量。
Archibald: 你好，{name}！

; ...或者在赋值表达式和条件表达式中使用它。
@set score++ if:name="菲利克斯"
```

## linkPrinter

将文本打印机链接到作者（角色 Actor），使该作者默认使用该打印机。更多信息请参阅 [链接的打印机指南](/zh/guide/characters#链接的打印机)。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">printerId</span> | string | 要链接的文本打印机标识符。 |
| to | string list | 要与打印机链接的角色 Actor 标识符。未指定时链接到所有作者。 |

</div>

```nani
; 将 'Dialogue' 打印机链接到 'Kohaku' 和 'Yuko' 作者。
@linkPrinter Dialogue to:Kohaku,Yuko

; 将 'Wide' 链接到所有作者。
@linkPrinter Wide
```

## lipSync

允许强制停止具有指定 ID 的角色的口型同步嘴部动画；停止后，在再次使用此命令允许之前，动画不会重新开始。角色应能够接收口型同步事件（目前仅限通用、分层、Universal、Live2D 和 Spine 实现）。有关口型同步功能的更多信息，请参阅 [角色指南](/zh/guide/characters#口型同步)。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">charIdAndAllow</span> | named boolean | 角色 ID 后跟一个布尔值，表示允许（true）还是停止（false）口型同步动画。 |

</div>

```nani
; 假设自动配音已禁用且口型同步由文本消息驱动，
; 从嘴部动画中排除标点符号。
Kohaku: Lorem ipsum dolor sit amet[lipSync Kohaku.false]... [lipSync Kohaku.true]Consectetur adipiscing elit.
```

## loadScene

加载具有指定名称的 [Unity 场景](https://docs.unity3d.com/Manual/CreatingScenes.html)。不要忘记将所需的场景添加到 [构建设置](https://docs.unity3d.com/Manual/BuildSettings.html) 以使其可供加载。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">sceneName</span> | string | 要加载的场景名称。 |
| additive | boolean | 是以附加方式加载场景，还是在加载新场景之前卸载任何当前加载的场景（默认）。有关更多信息，请参阅 [加载场景文档](https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.LoadScene.html)。 |

</div>

```nani
; 在单一模式下加载场景 'TestScene1'。
@loadScene TestScene1

; 在附加模式下加载场景 'TestScene2'。
@loadScene TestScene2 additive!
```

## lock

将具有指定 ID 的 [可解锁项](/zh/guide/unlockables) 设置为 `locked` 状态。

::: info NOTE
可解锁项的解锁状态存储在 [全局作用域](/zh/guide/state-management#全局状态) 中。<br/> 如果具有指定 ID 的项未在全局状态映射中注册，则将自动添加相应的记录。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">id</span> | string | 可解锁项的 ID。使用 `*` 锁定所有已注册的可解锁项。 |

</div>

```nani
; 锁定 ID 为 'FightScene1' 的可解锁 CG 记录。
@lock CG/FightScene1
```

## look

激活/禁用摄像机观看模式，在该模式下玩家可以使用输入设备（例如，通过移动鼠标或使用游戏手柄模拟摇杆）偏移主摄像机。观看 [此视频](https://youtu.be/rC6C9mA7Szw) 可快速了解该命令的效果。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">enable</span> | boolean | 启用还是禁用摄像机观看模式。默认值：true。 |
| zone | number list | 以摄像机初始位置为中心的边界框的尺寸（X、Y，以单位计），限制摄像机可以移动多远。默认值：5.0,3.0。 |
| speed | number list | 摄像机沿 X、Y 轴的移动速度（灵敏度）。默认值：1.5,1.0。 |
| gravity | boolean | 当观看输入不活动时（例如，鼠标未移动或模拟摇杆处于默认位置），是否自动将摄像机移动到初始位置。默认值：false。 |

</div>

```nani
; 使用默认参数激活摄像机观看模式。
@look

; 使用自定义参数激活摄像机观看模式。
@look zone:6.5,4 speed:3,2.5 gravity!

; 禁用观看模式并立即重置偏移。
@look false

; 禁用观看模式，但以 0.25 的速度逐渐重置。
@look false gravity! speed:0.25
```

## movie

播放具有指定名称（路径）的影片。

::: info NOTE
在播放影片之前会淡出屏幕，并在播放结束后重新淡入。可以通过激活 `SkipMovie` 输入（默认为 `Esc` 键）来取消播放。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">moviePath</span> | string | 要播放的影片资源的本地路径。 |
| time | number | 淡入淡出动画的持续时间（以秒为单位）。未指定时，将使用影片配置中设置的淡入淡出持续时间。 |
| block | boolean | 是否在播放影片时阻止与游戏的交互，防止玩家跳过它。 |

</div>

```nani
; 假设已将 'Opening' 视频剪辑添加到影片资源中，播放它。
@movie Opening
```

## openURL

使用默认 Web 浏览器打开指定的 URL（网址）。

::: info NOTE
在 WebGL 之外的平台或编辑器中，将使用 Unity 的 `Application.OpenURL` 方法来处理该命令；有关行为细节和限制，请参阅 [文档](https://docs.unity3d.com/ScriptReference/Application.OpenURL.html)。在 WebGL 下，将调用原生 `window.open()` JS 函数：<https://developer.mozilla.org/en-US/docs/Web/API/Window/open>。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">url</span> | string | 要打开的 URL。 |
| target | string | 浏览上下文：_self（当前标签页）、_blank（新标签页）、_parent、_top。 |

</div>

```nani
; 在当前标签页中打开空白页。
@openURL "about:blank"

; 在新标签页中打开 Naninovel 网站。
@openURL "https://naninovel.com" target:_blank
```

## or

标记条件执行块的一个分支，在开头的 [@if] 或 [@unless] 以及前面的 [@else] 或 [@or]（如果有）命令的条件不满足而自身条件满足时执行。可用作 `@else if:...` 的简写。有关用法示例，请参阅 [条件执行](/zh/guide/scenario-scripting#条件执行) 指南。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">expression</span> | string | 一个 [剧本表达式](/zh/guide/expressions)，应返回一个布尔值，决定是否执行关联的嵌套块。 |

</div>

## print

使用文本打印机 Actor 打印（逐渐显示）指定的文本消息。

::: info NOTE
处理通用文本行时会在底层使用此命令，例如通用文本行 `Kohaku: Hello World!` 在解析剧本脚本时将自动转换为 `@print "Hello World!" author:Kohaku`。<br/> 默认情况下，会在打印新消息之前重置（清除）打印机；将 `reset` 参数设置为 *false* 或在打印机 Actor 配置中禁用 `Auto Reset` 可防止这种情况并改为追加文本。<br/> 默认情况下，会使打印机成为默认打印机并隐藏其他打印机；将 `default` 参数设置为 *false* 或在打印机 Actor 配置中禁用 `Auto Default` 可防止这种情况。<br/> 默认情况下，会在完成任务之前等待用户输入；将 `waitInput` 参数设置为 *false* 或在打印机 Actor 配置中禁用 `Auto Wait` 可在文本完全显示后立即返回。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">text</span> | string | 要打印的消息文本。当文本包含空格时，请用双引号（`"`）将其括起来。如果希望在文本本身中包含双引号，请对其进行转义。 |
| printer | string | 要使用的打印机 Actor 的 ID。未指定时将使用默认打印机。 |
| author | string | 应与打印消息关联的 Actor 的 ID。追加时忽略。指定 `*` 或使用 `,` 分隔多个 Actor ID 以使所有/选定的角色成为文本的作者；当与 `as` 参数结合使用以表示多个角色同时说话时很有用。 |
| as | string | 指定时，打印消息时将在文本打印机中使用该标签代替作者 ID（或关联的显示名称）来表示作者名称。可用于覆盖少数几条消息的默认名称，或表示多个作者同时说话，而不触发文本打印机的作者特定行为（例如消息颜色或头像）。 |
| speed | number | 文本显示速度的乘数；应为正数或零。设置为 1 即为默认速度。 |
| reset | boolean | 是否在执行打印任务之前重置打印机的文本。默认值由打印机 Actor 配置菜单中的 `Auto Reset` 属性控制。 |
| default | boolean | 是否在执行打印任务之前使打印机成为默认打印机并隐藏其他打印机。默认值由打印机 Actor 配置菜单中的 `Auto Default` 属性控制。 |
| waitInput | boolean | 完成打印任务后是否等待用户输入。默认值由打印机 Actor 配置菜单中的 `Auto Wait` 属性控制。 |
| append | boolean | 是否将打印的文本追加到最后一条打印机消息。 |
| fadeTime | number | 控制与此命令关联的打印机显示和隐藏动画的持续时间（以秒为单位）。每个打印机的默认值在 Actor 配置中设置。 |
| wait | boolean | 是否等待文本显示完成并提示继续（等待输入）后再播放下一个命令。 |

</div>

```nani
; 使用默认打印机打印短语。
@print "Lorem ipsum dolor sit amet."

; 要在文本本身中包含引号，请对其进行转义。
@print "大喊 \"停车！\" 是个错误。"

; 以正常速度的一半显示消息，
; 并且不等待用户输入就继续。
@print "Lorem ipsum dolor sit amet." speed:0.5 !waitInput

; 打印该行，将 "大家" 显示为作者名称，
; 并使所有可见角色成为打印文本的作者。
@print "Hello World!" author:* as:"大家"

; 类似，但只让 "Kohaku" 和 "Yuko" 成为作者。
@print "Hello World!" author:Kohaku,Yuko as:"琥珀和优子"
```

## printer

修改 [文本打印机 Actor](/zh/guide/text-printers)，并在执行嵌套命令期间将该打印机链接到所有作者。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">idAndAppearance</span> | named string | 要修改的打印机的 ID 和要设置的外观。未指定 ID 或外观时，将使用默认值。 |
| default | boolean | 是否将打印机设为默认打印机。未指定 `printer` 参数时，所有与打印机相关的命令都将作用于默认打印机。命令包含嵌套命令时无效。 |
| hideOther | boolean | 是否隐藏所有其他打印机。 |
| anchor | boolean | 是否允许通过 Actor 锚点自动定位打印机。在手动定位打印机后，可为受支持的打印机启用此参数以恢复自动定位。请注意，使用此命令指定显式位置时，锚定会自动禁用。 |
| pos | number list | 为要修改的 Actor 设置的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。在正交模式下，使用 Z 分量（第三个成员，例如 `,,10`）按深度移动（排序）。 |
| id | string | 要修改的 Actor 的 ID；指定 `*` 以影响所有可见 Actor。 |
| appearance | string | 为要修改的 Actor 设置的外观。 |
| pose | string | 为要修改的 Actor 设置的姿势。 |
| via | string | 要使用的 [过渡效果](/zh/guide/special-effects#过渡效果) 类型（默认使用交叉淡入淡出）。 |
| params | number list | 过渡效果的参数。 |
| dissolve | string | [自定义溶解](/zh/guide/special-effects#溶解遮罩) 纹理的路径（路径应相对于 `Resources` 文件夹）。仅当过渡设置为 `Custom` 模式时有效。 |
| visible | boolean | 为要修改的 Actor 设置的可见性状态。 |
| wpos | number list | 为要修改的 Actor 设置的位置（在世界空间中）。在正交模式下，使用 Z 分量（第三个成员）按深度移动（排序）。 |
| roll | number | 为要修改的 Actor 设置的 Z 轴旋转。与 `rotation` 参数的第三个分量相同；指定 `rotation` 时将忽略此参数。 |
| rotation | number list | 为要修改的 Actor 设置的旋转。 |
| scale | number list | 为要修改的 Actor 设置的缩放。 |
| tint | string | 要应用的色调颜色。<br><br>以 `#` 开头的字符串将按以下方式解析为十六进制：`#RGB`（变为 `RRGGBB`）、`#RRGGBB`、`#RGBA`（变为 `RRGGBBAA`）、`#RRGGBBAA`；未指定 alpha 时将默认为 `FF`。<br><br>不以 `#` 开头的字符串将被解析为颜色名称，支持以下名称：red, cyan, blue, darkblue, lightblue, purple, yellow, lime, fuchsia, white, silver, grey, black, orange, brown, maroon, green, olive, navy, teal, aqua, magenta。 |
| easing | string | 要应用的 [缓动函数](/zh/guide/special-effects#动画缓动) 名称。未指定时，将使用配置中设置的默认函数。 |
| time | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| wait | boolean | 是否在开始执行剧本脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 将 'Wide' 打印机设为默认并隐藏任何其他可见打印机。
@printer Wide

; 为 'Bubble' 打印机设置 'Right' 外观，使其成为默认打印机，
; 放置在场景中心且不隐藏其他打印机。
@printer Bubble.Right pos:50,50 !hideOther

; 执行嵌套命令时强制使用 'Wide' 打印机。
@printer Wide
    无论当前默认打印机是什么，都打印到 'Wide'。
    Kohaku: 我可能有链接的打印机，但这里使用 'Wide'。
再次打印到默认打印机。
Kohaku: 再次使用我链接的打印机。
```

## processInput

允许暂停和恢复用户输入处理（例如，对按下键盘按键的反应）。该操作的效果是持久的，会随游戏一起保存。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">inputEnabled</span> | boolean | 是否启用所有输入的处理。 |
| set | named boolean list | 允许屏蔽和取消屏蔽单个输入。 |

</div>

```nani
; 暂停所有输入的处理。
@processInput false

; 恢复所有输入的处理。
@processInput true

; 屏蔽 'Rollback' 和 'Pause' 输入并取消屏蔽 'Continue' 输入。
@processInput set:Rollback.false,Pause.false,Continue.true
```

## purgeRollback

防止玩家回滚到之前的状态快照。

```nani
; 防止玩家回滚以尝试选择另一个选项。

请选择一个选项。之后将无法回滚。
@choice 选项一 goto:#One
@choice 选项二 goto:#Two

# One
@purgeRollback
你选择了选项一。
@stop

# Two
@purgeRollback
你选择了选项二。
@stop
```

## pushRollback

添加一个玩家可以回滚到的状态快照。

```nani
; 允许玩家回滚到此处。
@pushRollback
```

## rain

生成模拟 [雨](/zh/guide/special-effects#rain) 的粒子系统。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| power | number | 雨的强度（每秒粒子生成率），范围为 0.0 到 1.0；默认为 0.5。设置为 0 以禁用（取消生成）效果。 |
| time | number | 粒子系统将在指定时间（以秒为单位）内逐渐将生成率增加到目标水平。 |
| xSpeed | number | 粒子水平速度的乘数。用于改变雨滴的角度。 |
| ySpeed | number | 粒子垂直速度的乘数。 |
| pos | number list | 为生成的效果游戏对象设置的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。在正交模式下，使用 Z 分量（第三个成员，例如 `,,10`）按深度移动（排序）。 |
| wpos | number list | 为生成的效果游戏对象设置的位置（在世界空间中）。 |
| roll | number | 为生成的效果游戏对象设置的 Z 轴旋转。与 `rotation` 参数的第三个分量相同；指定 `rotation` 时将忽略此参数。 |
| rotation | number list | 为生成的效果游戏对象设置的旋转。 |
| scale | number list | 为生成的效果游戏对象设置的缩放。 |
| wait | boolean | 在播放下一个命令之前是否等待效果预热动画。 |

</div>

```nani
; 在 10 秒内开始强降雨。
@rain power:1 time:10
; 在 30 秒内停止降雨。
@rain power:0 time:30
```

## random

执行随机选取的嵌套命令之一。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| weight | number list | 嵌套命令的自定义概率，范围为 0.0 到 1.0。默认情况下，所有命令被选中的概率相等。 |

</div>

```nani
; 以相等的概率播放 3 种声音之一。
@random
    @sfx Sound1
    @sfx Sound2
    @sfx Sound3

; 以 80% 的概率播放第 2 种声音，或以各 10% 的概率播放第 1 或第 3 种声音。
@random weight:0.1,0.8,0.1
    @sfx Sound1
    @sfx Sound2
    @sfx Sound3

; 添加一个震动摄像机的选项、为 Kohaku Actor 设置色调或播放 'SoundX' SFX，
; 三者概率均为 33%。但是，仅当 score 高于 10 时
; 才会考虑播放 SFX。
@random
    @choice "震动摄像机！"
        这可是你要求的！
        @shake Camera
    @group
        要给琥珀设置色调了！
        @char Kohaku tint:red
    @sfx SoundX if:score>10
```

## remove

移除（销毁）具有指定 ID 的 Actor（角色、背景、文本打印机、选项处理程序）。如果找到多个具有相同 ID 的 Actor（例如，一个角色和一个打印机），将仅影响找到的第一个 Actor。

::: info NOTE
默认情况下，Naninovel 在卸载脚本资源时会自动移除未使用的 Actor；仅当资源提供者配置中的 `Remove Actors` 被禁用时，或者需要在特定时刻强制销毁 Actor 时，才使用此命令。有关更多信息，请参阅 [内存管理](/zh/guide/memory-management#actor-资源) 指南。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">actorIds</span> | string list | 要移除的 Actor 的 ID，或使用 `*` 移除所有 Actor。 |

</div>

```nani
; 淡出然后销毁 Kohaku 和 Yuko Actor。
@hide Kohaku,Yuko wait!
@remove Kohaku,Yuko

; 淡出并移除所有 Actor。
@hideAll wait!
@remove *
```

## resetState

重置 [引擎服务](/zh/guide/engine-services) 的状态并卸载（释放）Naninovel 加载的所有资源（纹理、音频、视频等）；基本上将恢复到空的初始引擎状态。

::: info NOTE
请注意，此命令无法撤销（倒回）。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">exclude</span> | string list | 要从重置中排除的 [引擎服务](/zh/guide/engine-services)（接口）的名称。可考虑添加 `IVariableManager` 以保留局部变量。 |
| only | string list | 要重置的 [引擎服务](/zh/guide/engine-services)（接口）的名称；其他服务不会受到影响。指定了主参数（exclude）时无效。 |

</div>

```nani
; 重置所有服务（脚本将停止播放）。
@resetState

; 重置除脚本播放器、剧本变量管理器和音频管理器之外的所有服务，
; 让当前脚本和音轨继续播放，
; 并保留剧本变量的值。
@resetState IScriptPlayer,IVariableManager,IAudioManager

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
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">printerId</span> | string | 要使用的打印机 Actor 的 ID。未指定时将使用默认打印机。 |

</div>

```nani
; 打印然后清除默认打印机的内容。
这一行将会消失。
@resetText

; 与上面相同，但使用 'Wide' 打印机。
@print "这一行将会消失。" printer:Wide
@resetText Wide
```

## return

尝试将剧本脚本的播放导航到最后使用的 [@gosub] 之后的命令。有关更多信息和用法示例，请参阅 [@gosub] 命令的说明。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| reset | string list | 指定时，将在返回到进入 gosub 的初始脚本（如果不是当前播放的脚本）之前重置引擎服务状态。指定 `*` 以重置所有服务，或指定要从重置中排除的服务名称。默认情况下，状态不会重置。 |

</div>

## save

自动将游戏保存到第一个自动存档槽。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| at | string | 存档的播放位置，格式如下：`ScriptPath#Label`。省略时，使用播放器的当前位置。可用于在加载游戏后将玩家重定向到特定标签或脚本。 |

</div>

```nani
; 在当前位置自动存档。
@save

; 玩家可以选择 'rest'（这将自动存档并
; 退出到标题），或者继续前往 'NextDay'。当玩家在休息后
; 加载该存档时，会被移到 '# Camp' 标签之后的行，
; 此时 'rested' 为 'true'，这将迫使他们继续前往 'NextDay'。

# Camp

; 注意变量是用 '?=' 设置的——仅当变量
; 尚未赋值时才会赋值，而玩家在休息后加载
; 自动存档时，变量已被赋值。
@set rested?=false

@if rested
    早上好！我们得出发了。
    @goto NextDay

@choice "没时间休息了！" goto:NextDay
@choice "休息一会儿吧"
    @set rested=true
    ; 注意 'at' 参数——当游戏加载时，
    ; 它将把玩家重定向到指定的标签。
    @save at:#Camp
    @title
```

## set

将 [剧本表达式](/zh/guide/expressions) 的结果赋给 [剧本变量](/zh/guide/variables)。

::: info NOTE
如果具有指定 ID 的变量不存在，将自动创建它。<br/><br/> 可以用 `,` 分隔来指定多个赋值表达式。这些表达式将按声明顺序依次执行。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">expression</span> | string | 赋值表达式。<br/><br/>表达式应采用以下格式：`var=expression`，其中 `var` 是要赋值的剧本变量的 ID，`expression` 是一个 [剧本表达式](/zh/guide/expressions)，其结果将赋给该变量。<br/><br/>可以使用递增和递减一元运算符（`@set foo++`、`@set foo--`）和复合赋值（`@set foo+=10`、`@set foo-=3`、`@set foo*=0.1`、`@set foo/=2`）。 |
| to | string | 一个表达式，其结果将赋给所有未带赋值表达式（即没有 `= ...` 部分）的指定变量。适用于将同一个值赋给多个变量，例如：`@set foo, bar, baz to:10`。 |
| scope | string | 指定后，会将没有显式作用域的变量归入指定的作用域。 |
| init | boolean | 该变量是否只应在尚未赋值时才进行赋值（即初始化意图）。不应与“meta”或“const”标志一起使用，因为它们都具有初始化意图。 |
| meta | boolean | 该变量是否应初始化为元变量。元变量位于游戏会话之“上”，即在开始新游戏时它们的值仍会保留。非常适合用于元游戏机制，例如追踪路线完成情况或成就。 |
| const | boolean | 该变量是否应初始化为常量。常量只能初始化一次，之后不允许再更改。 |

</div>

```nani
; 将字符串值 'bar' 赋给 'foo' 变量。
@set foo="bar"

; 将数值 1 赋给 'foo' 变量。
@set foo=1

; 将布尔值 'true' 赋给 'foo' 变量。
@set foo=true

; 假设 'foo' 是数值，将其值加 0.5。
@set foo+=0.5

; 假设 'angle' 是数值，将其余弦值赋给 'foo' 变量。
@set foo=cos(angle)

; 获取 -100 到 100 之间的随机数，然后取 4 次方
; 并赋给 'foo' 变量。
@set foo = pow(random(-100, 100), 4)

; 假设 'foo' 是数值，将其值加 1（递增）。
@set foo++

; 假设 'foo' 是数值，将其值减 1（递减）。
@set foo--

; 将 'bar' 变量的值赋给 'foo' 变量，
; 即 'Hello World!' 字符串。
@set bar="Hello World!"
@set foo=bar

; 在一行中定义多个赋值表达式；
; 结果将与上面相同。
@set bar="Hello World!", foo=bar

; 将同一个值赋给多个变量。
@set foo, bar, baz to:10

; 可以将变量注入到剧本脚本的命令参数中。
@set scale=0
@while scale is below 1
    @set scale+=0.1
    @char Kohaku scale:{scale}

; ...以及通用文本行。
@set drink="Dr. Pepper"
我最喜欢的饮料是 {drink}！

; 在文本表达式值内使用双引号时，请对其进行转义。
@set remark="大喊 \"停车！\" 是个错误。"

; 使用元变量在游戏会话之间保留该值。
; 即使重新启动游戏，该变量也会保持其值。
@set completeRouteX, completeRouteY to:false meta!
... ; 在脚本后面的某处，当 'RouteX' 完成时
@set completeRouteX=true ; 即使开始新游戏，它也会保持为 'true'

; 即使重复游玩，也只递增一次元变量。
@set metaCounter=0 meta!
...
@set metaCounter++ unless:hasPlayed()

; 在 'stats' 作用域下定义多个变量。
@set strength, intellect, agility to:1 scope:stats
...
@set stats.agility++

; 使用局部变量（ID 以点开头）防止
; 与其他脚本中具有相同 ID 的变量冲突。
@set .count=0
@while .count is below 10
    @set .count++
    当前计数：{.count}
```

## sfx

播放具有指定名称的 [SFX（音效）](/zh/guide/audio#音效) 音轨，或修改当前正在播放的该音轨。

::: info NOTE
音效音轨默认不循环播放。未指定 SFX 音轨名称（`path`）时，将影响所有当前播放的音轨。对已在播放的音轨调用时，播放不会受到影响（音轨不会从头开始播放），但将应用指定的参数（音量以及音轨是否循环）。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| group | string | 播放音频时应使用的混音器 [组路径](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。 |
| loop | boolean | 是否在播放结束时从头重复播放，直到停止。 |
| volume | number | 音频播放的响度，范围为 0.0 到 1.0。请注意，1.0 是默认值——在不产生削波的情况下，无法让数字音频以高于 0 dBFS 基线的电平播放。 |
| pitch | number | 播放的感知频率（速度），范围为 [-3.0 到 3.0](https://docs.unity3d.com/ScriptReference/AudioSource-pitch.html)，其中 1.0 为正常速度。负值将反向播放音频。 |
| pos | number list | 音频源的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。使用 Z 分量（第三个成员，例如 `,,10`）按深度移动。 |
| wpos | number list | 音频源的位置（在世界空间中）。`pos` 和 `wpos` 均未指定时，将禁用空间模式。 |
| wait | boolean | 是否等待音频播放结束后再执行下一个命令。循环播放时无效。 |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">path</span> | string | 音频资源的本地路径（名称）。 |
| easing | string | 要应用的 [缓动函数](/zh/guide/special-effects#动画缓动) 名称。未指定时，将使用配置中设置的默认函数。 |
| fade | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| waitFade | boolean | 在播放下一个命令之前是否等待淡入淡出完成。 |

</div>

```nani
; 播放一次名为 'Explosion' 的 SFX。
@sfx Explosion

; 循环播放名为 'Rain' 的 SFX 并在 30 秒内淡入。
@sfx Rain loop! fade:30

; 在 2.5 秒内将所有正在播放的 SFX 音轨的音量更改为 75%，
; 并禁用它们的循环。
@sfx volume:0.75 !loop fade:2.5

; 在世界空间中，于监听器稍上方偏后的位置播放 'Explosion'。
@sfx Explosion wpos:0,1,-3

; 在场景空间中，于 10 秒内以动画方式将 'Rain' 的位置从左移到右。
@sfx Rain pos:0,50 loop!
@sfx Rain pos:100,50 fade:10
```

## sfxFast

播放具有指定名称的 [SFX（音效）](/zh/guide/audio#音效) 音轨。与 [@sfx] 命令不同，该剪辑以最小延迟播放，并且不随游戏状态序列化（即使保存时正在播放，加载游戏后也不会播放）。该命令可用于播放各种临时音频剪辑，比如与 UI 相关的声音（例如，通过 [`Play Script` 组件](/zh/guide/gui#通过-unity-事件播放脚本) 在单击按钮时播放）。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| restart | boolean | 如果已在播放，是否从头开始播放音频。 |
| additive | boolean | 是否允许播放同一剪辑的多个实例；当启用 `restart` 时无效。 |
| group | string | 播放音频时应使用的混音器 [组路径](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。 |
| loop | boolean | 是否在播放结束时从头重复播放，直到停止。 |
| volume | number | 音频播放的响度，范围为 0.0 到 1.0。请注意，1.0 是默认值——在不产生削波的情况下，无法让数字音频以高于 0 dBFS 基线的电平播放。 |
| pitch | number | 播放的感知频率（速度），范围为 [-3.0 到 3.0](https://docs.unity3d.com/ScriptReference/AudioSource-pitch.html)，其中 1.0 为正常速度。负值将反向播放音频。 |
| pos | number list | 音频源的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。使用 Z 分量（第三个成员，例如 `,,10`）按深度移动。 |
| wpos | number list | 音频源的位置（在世界空间中）。`pos` 和 `wpos` 均未指定时，将禁用空间模式。 |
| wait | boolean | 是否等待音频播放结束后再执行下一个命令。循环播放时无效。 |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">path</span> | string | 音频资源的本地路径（名称）。 |

</div>

```nani
; 播放一次名为 'Click' 的 SFX。
@sfxFast Click

; 与上面相同，但允许同时播放同一剪辑。
@sfxFast Click !restart
```

## shake

为具有指定 ID 的 Actor 或主摄像机应用 [震动效果](/zh/guide/special-effects#shake)。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">actorId</span> | string | 要震动的 Actor 的 ID。如果找到多个具有相同 ID 的 Actor（例如，一个角色和一个打印机），将仅影响找到的第一个 Actor。未指定时，将震动默认文本打印机。要震动主摄像机，请使用 `Camera` 关键字。 |
| count | number | 震动迭代次数。启用 `loop` 时忽略。 |
| loop | boolean | 是否持续震动直到禁用。 |
| time | number | 每次震动迭代的基本持续时间，以秒为单位。 |
| deltaTime | number | 应用于效果基本持续时间的随机变化量。 |
| power | number | 每次震动迭代的基本位移幅度，以单位计。 |
| deltaPower | number | 应用于基本位移幅度的随机变化量。 |
| hor | boolean | 是否水平位移 Actor（沿 X 轴）。 |
| ver | boolean | 是否垂直位移 Actor（沿 Y 轴）。 |
| wait | boolean | 在播放下一个命令之前是否等待效果预热动画。 |

</div>

```nani
; 使用默认参数震动 'Dialogue' 文本打印机。
@shake Dialogue

; 开始震动 'Kohaku' 角色，显示用于停止的选项并做出相应处理。
@shake Kohaku loop!
@choice "停止震动"
    @shake Kohaku !loop
...

; 水平震动 Naninovel 主摄像机 5 次。
@shake Camera count:5 hor! !ver
```

## show

显示（使其可见）具有指定 ID 的 Actor（角色、背景、文本打印机、选项处理程序等）。如果找到多个具有相同 ID 的 Actor（例如，一个角色和一个打印机），将仅影响找到的第一个 Actor。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">actorIds</span> | string list | 要显示的 Actor 的 ID。 |
| time | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| wait | boolean | 是否在开始执行剧本脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 假设 ID 为 'Smoke' 的 Actor 处于隐藏状态，在 3 秒内显示它。
@show Smoke time:3

; 显示 'Kohaku' 和 'Yuko' Actor。
@show Kohaku,Yuko
```

## showPrinter

显示文本打印机。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">printerId</span> | string | 要使用的打印机 Actor 的 ID。未指定时将使用默认打印机。 |
| time | number | 命令启动的动画持续时间，以秒为单位。 |
| wait | boolean | 是否在开始执行剧本脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 显示默认打印机。
@showPrinter

; 显示 ID 为 'Wide' 的打印机。
@showPrinter Wide
```

## showUI

使具有指定资源名称的 [UI 元素](/zh/guide/gui) 可见。未指定名称时，将显示整个 UI（如果之前已使用 [@hideUI] 隐藏）。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">uiNames</span> | string list | 要显示的 UI 资源的名称。 |
| time | number | 显示动画的持续时间（以秒为单位）。未指定时，将使用特定于 UI 的持续时间。 |
| wait | boolean | 在播放下一个命令之前是否等待 UI 淡入动画。 |

</div>

```nani
; 假设您添加了一个名为 'Calendar' 的自定义 UI，
; 以下命令将使其在场景中可见。
@showUI Calendar

; 假设您使用 @hideUI 隐藏了整个 UI，将其重新显示。
@showUI

; 同时显示内置 'TipsUI' 和自定义 'Calendar' UI。
@showUI TipsUI,Calendar
```

## skip

允许启用或禁用脚本播放器“跳过”模式。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">enable</span> | boolean | 启用（默认）还是禁用跳过模式。 |

</div>

```nani
; 启用跳过模式。
@skip

; 禁用跳过模式。
@skip false
```

## slide

滑动（在两个位置之间移动）具有指定 ID 的 Actor（角色、背景、文本打印机或选项处理程序），并（可选）更改 Actor 的可见性和外观。可用于代替多个 [@char] 或 [@back] 命令，通过滑动动画显示或隐藏 Actor。

::: info NOTE
请注意，此命令将在所有 Actor 管理器中搜索具有指定 ID 的现有 Actor，如果存在多个具有相同 ID 的 Actor（例如，一个角色和一个文本打印机），这将仅影响找到的第一个 Actor。在使用此命令引用 Actor 之前，请确保该 Actor 存在于场景中；例如，如果是角色，您可以使用 `@char CharID visible:false time:0` 在玩家察觉不到的情况下将其添加到场景中。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">idAndAppearance</span> | named string | 要滑动的 Actor 的 ID 和（可选）要设置的外观。 |
| from | number list | 在场景空间中滑动 Actor 的起始位置（滑动开始位置）。描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角；Z 分量（深度）在世界空间中。未指定时，如果 Actor 可见，将使用其当前位置，否则使用随机的场景外位置（可能从左侧或右侧边界滑入）。 |
| <span class="command-param-required" title="必需参数：应始终指定该参数">to</span> | number list | 在场景空间中滑动 Actor 的目标位置（滑动结束位置）。 |
| visible | boolean | 更改 Actor 的可见性状态（显示或隐藏）。未设置且目标 Actor 被隐藏时，仍会自动显示它。 |
| easing | string | 要应用的 [缓动函数](/zh/guide/special-effects#动画缓动) 名称。未指定时，将使用配置中设置的默认函数。 |
| time | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| wait | boolean | 是否在开始执行剧本脚本中的下一个命令之前等待命令完成。默认行为由脚本播放器配置中的 `Wait By Default` 选项控制。 |

</div>

```nani
; 假设 'Jenna' Actor 不可见，以 'Angry' 外观显示它
; 并从场景的左边界或右边界滑动到中心。
@slide Jenna.Angry to:50

; 假设 'Sheba' Actor 当前可见，
; 隐藏它并将其滑出场景左边界。
@slide Sheba to:-10 !visible

; 将 'Sheba' Actor 从场景的左侧中部滑动到右下角，
; 用时 5 秒，并使用 'EaseOutBounce' 动画缓动。
@slide Sheba from:15,50 to:85,0 time:5 easing:EaseOutBounce
```

## snow

生成模拟 [雪](/zh/guide/special-effects#snow) 的粒子系统。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| power | number | 雪的强度（每秒粒子生成率），范围为 0.0 到 1.0；默认为 0.5。设置为 0 以禁用（取消生成）效果。 |
| time | number | 粒子系统将在指定时间（以秒为单位）内逐渐将生成率增加到目标水平。 |
| pos | number list | 为生成的效果游戏对象设置的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。在正交模式下，使用 Z 分量（第三个成员，例如 `,,10`）按深度移动（排序）。 |
| wpos | number list | 为生成的效果游戏对象设置的位置（在世界空间中）。 |
| roll | number | 为生成的效果游戏对象设置的 Z 轴旋转。与 `rotation` 参数的第三个分量相同；指定 `rotation` 时将忽略此参数。 |
| rotation | number list | 为生成的效果游戏对象设置的旋转。 |
| scale | number list | 为生成的效果游戏对象设置的缩放。 |
| wait | boolean | 在播放下一个命令之前是否等待效果预热动画。 |

</div>

```nani
; 在 10 秒内开始下大雪。
@snow power:1 time:10
; 在 30 秒内停止下雪。
@snow power:0 time:30
```

## spawn

实例化预制件或 [特殊效果](/zh/guide/special-effects)；当对已生成的对象执行时，将改为更新生成参数。

::: info NOTE
如果预制件的根对象上附加了 `MonoBehaviour` 组件，并且该组件实现了 `IParameterized` 接口，则会在生成后传递指定的 `params` 值；如果该组件实现了 `IAwaitable` 接口，则命令执行将能够等待实现返回的异步完成任务。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">path</span> | string | 要生成的预制件资源的名称（路径）。 |
| params | string list | 生成预制件时要设置的参数。需要预制件的根对象上附加 `IParameterized` 组件。 |
| pos | number list | 为生成的对象设置的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。在正交模式下，使用 Z 分量（第三个成员，例如 `,,10`）按深度移动（排序）。 |
| wpos | number list | 为生成的对象设置的位置（在世界空间中）。 |
| roll | number | 为生成的对象设置的 Z 轴旋转。与 `rotation` 参数的第三个分量相同；指定 `rotation` 时将忽略此参数。 |
| rotation | number list | 为生成的对象设置的旋转。 |
| scale | number list | 为生成的对象设置的缩放。 |
| transient | boolean | 是否从游戏状态中排除生成的对象。适用于一次性、短时效果，无需稍后再对其调用 [@despawn]。 |
| wait | boolean | 如果生成的对象实现了 `IAwaitable` 接口，是否等待其预热完成。 |

</div>

```nani
; 假设已在生成资源中分配了 'Rainbow' 预制件，将其实例化。
@spawn Rainbow

; 生成的 'Explosion' 是一次性效果，之后无需调用 '@despawn'。
@spawn Explosion transient!
```

## stop

停止剧本脚本播放。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">trackId</span> | string | 要停止的脚本轨道的标识符；未指定时停止主轨道。可用于停止使用 [@async] 命令生成的异步轨道的播放。 |

</div>

```nani
@gosub #Label
...
@stop

; 上面的 stop 命令可防止脚本播放
; 继续进入下面的标签。
# Label
只有通过 @gosub 直接导航时才会执行这一行。
@return

; 循环执行 'Quake' 异步任务，直到被停止。
@async Quake loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3,10) }
...
; 停止 'Quake' 异步任务。
@stop Quake
```

## stopBgm

停止播放具有指定名称的 BGM（背景音乐）音轨。

::: info NOTE
未指定音乐音轨名称（`path`）时，将停止所有当前播放的音轨。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">path</span> | string | 音频资源的本地路径（名称）。 |
| easing | string | 要应用的 [缓动函数](/zh/guide/special-effects#动画缓动) 名称。未指定时，将使用配置中设置的默认函数。 |
| fade | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| waitFade | boolean | 在播放下一个命令之前是否等待淡入淡出完成。 |

</div>

```nani
; 在 10 秒内淡出 'Sanctuary' BGM 音轨并停止播放。
@stopBgm Sanctuary fade:10

; 停止所有当前正在播放的音乐音轨。
@stopBgm
```

## stopSfx

停止播放具有指定名称的 SFX（音效）音轨。

::: info NOTE
未指定音效音轨名称（`path`）时，将停止所有当前播放的音轨。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">path</span> | string | 音频资源的本地路径（名称）。 |
| easing | string | 要应用的 [缓动函数](/zh/guide/special-effects#动画缓动) 名称。未指定时，将使用配置中设置的默认函数。 |
| fade | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| waitFade | boolean | 在播放下一个命令之前是否等待淡入淡出完成。 |

</div>

```nani
; 停止播放名为 'Rain' 的 SFX，淡出 15 秒。
@stopSfx Rain fade:15

; 停止所有当前正在播放的音效音轨。
@stopSfx
```

## stopVoice

停止播放当前正在播放的语音剪辑。

```nani
; 假设正在播放语音，停止它。
@stopVoice
```

## sun

生成模拟 [太阳光束](/zh/guide/special-effects#sun)（又名“上帝之光”）的粒子系统。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| power | number | 光线的强度（不透明度），范围为 0.0 到 1.0；默认为 0.85。设置为 0 以禁用（取消生成）效果。 |
| time | number | 粒子系统将在指定时间（以秒为单位）内逐渐将光线的不透明度调整到目标水平。 |
| pos | number list | 为生成的效果游戏对象设置的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。在正交模式下，使用 Z 分量（第三个成员，例如 `,,10`）按深度移动（排序）。 |
| wpos | number list | 为生成的效果游戏对象设置的位置（在世界空间中）。 |
| roll | number | 为生成的效果游戏对象设置的 Z 轴旋转。与 `rotation` 参数的第三个分量相同；指定 `rotation` 时将忽略此参数。 |
| rotation | number list | 为生成的效果游戏对象设置的旋转。 |
| scale | number list | 为生成的效果游戏对象设置的缩放。 |
| wait | boolean | 在播放下一个命令之前是否等待效果预热动画。 |

</div>

```nani
; 在 10 秒内让强烈的阳光出现。
@sun power:1 time:10
; 在 30 秒内让阳光消失。
@sun power:0 time:30
```

## sync

将具有指定标识符的脚本轨道导航到当前行并销毁宿主轨道。用于将异步执行的轨道相互连接（同步），或与主轨道连接。有关更多信息，请参阅 [并发播放](/zh/guide/scenario-scripting#并发播放) 指南。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">trackId</span> | string | 要连接的脚本轨道的唯一标识符。未指定时使用主轨道。 |

</div>

```nani
你有 60 秒的时间拆除炸弹！

@async Boom
    @wait 60
    ; 60 秒后，如果 'Boom' 任务未停止，
    ; 下面的 @sync 命令将强制主轨道移动到此处，
    ; 然后导航到 'BadEnd' 脚本。
    @sync
    @goto BadEnd

; 模拟一系列拆弹谜题。
拆弹谜题 1。
拆弹谜题 2。
拆弹谜题 3。

; 'Boom' 异步任务已停止，因此主轨道
; 将继续执行而不中断。
@stop Boom
炸弹已拆除！
```

## timeline

通过指定名称的场景游戏对象上的 [Director](https://docs.unity3d.com/ScriptReference/Playables.PlayableDirector.html) 组件控制 [Timeline](https://docs.unity3d.com/Manual/com.unity.timeline.html)。默认情况下，除非指定了“stop”、“pause”或“resume”标志，否则该命令将使 Director 开始播放。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">name</span> | string | 场景中附加了“Playable Director”组件且处于活动状态的游戏对象的名称。 |
| stop | boolean | 是否停止 Director。 |
| pause | boolean | 是否暂停 Director。 |
| resume | boolean | 是否恢复 Director。 |
| wait | boolean | 是否在继续执行脚本之前等待 Director 停止播放。 |

</div>

```nani
; 使附加到场景中 'Cutscene001' 游戏对象的 Director 组件
; 开始播放关联的 Timeline 并等待完成。
@timeline Cutscene001 wait!

; 停止附加到 'The Other Cutscene' 游戏对象的 Director。
@timeline "The Other Cutscene" stop!
```

## title

重置引擎状态并开始播放“Title”脚本（如果已在脚本配置中分配）。

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
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">text</span> | string | 为 toast 设置的文本内容。 |
| appearance | string | toast 的外观变体（游戏对象名称）。未指定时，将使用 Toast UI 预制件中设置的默认外观。 |
| time | number | 隐藏 toast 之前等待的秒数。未指定时，将使用 Toast UI 预制件中默认设置的持续时间。 |

</div>

```nani
; 显示带有 'Hello World!' 内容的默认 toast。
@toast "Hello World!"

; 显示带有 'warning' 外观的 toast。
@toast "你有危险！" appearance:warning

; toast 将在 1 秒后消失。
@toast "我会在 1 秒后消失。" time:1
```

## trans

执行场景过渡，用命令开始执行时可见的任何内容（UI 除外）掩盖真实的场景内容，执行嵌套命令以更改场景并以指定的 [过渡效果](/zh/guide/special-effects#过渡效果) 结束。<br/><br/> 该命令的工作原理类似于 Actor 外观过渡，但覆盖整个场景。使用它可以借助过渡效果一次性将多个 Actor 和其他可见实体更改为新状态。

::: info NOTE
在过渡进行期间（嵌套命令正在运行），UI 将被隐藏且用户输入被阻止。您可以通过覆盖处理过渡过程的 `ISceneTransitionUI` 来更改此行为。<br/><br/> 异步嵌套命令将立即执行，无需为每个命令指定 `time:0`。<br/><br/> 嵌套块应始终能够执行完毕；不要嵌套任何可能导航到嵌套块外部的命令，因为这可能会导致未定义的行为。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">transition</span> | string | 要使用的 [过渡效果](/zh/guide/special-effects#过渡效果) 类型（默认使用交叉淡入淡出）。 |
| params | number list | 过渡效果的参数。 |
| dissolve | string | [自定义溶解](/zh/guide/special-effects#溶解遮罩) 纹理的路径（路径应相对于 `Resources` 文件夹）。仅当过渡设置为 `Custom` 模式时有效。 |
| easing | string | 用于过渡的 [缓动函数](/zh/guide/special-effects#动画缓动) 名称。 |
| time | number | 过渡的持续时间（以秒为单位）。 |

</div>

```nani
; 使用 'Felix' 角色和阳光明媚的氛围设置初始场景。
@char Felix
@back SunnyDay
@sun power:1
Felix: 多好的天气啊！

; 过渡到带有 'Jenna' 角色和下雨氛围的新场景，
; 使用 'DropFade' 过渡效果，持续 3 秒。
@trans DropFade time:3
    @hide Felix
    @char Jenna
    @back RainyDay
    @sun power:0
    @rain power:1
Jenna: 这该死的雨什么时候才会停？
```

## unless

标记反向条件执行块的开始。嵌套行被视为块的主体，仅在条件主参数求值为 `false` 时才会执行。有关更多信息，请参阅 [条件执行](/zh/guide/scenario-scripting#条件执行) 指南。

::: info NOTE
此命令与 [@if] 相反且互补。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">expression</span> | string | 一个 [剧本表达式](/zh/guide/expressions)，应返回一个布尔值，决定是否执行关联的嵌套块。 |

</div>

```nani
; 如果 "dead" 变量为 false，则打印 "你还活着！"，
; 否则打印 "你完了。"。
@unless dead
    你还活着！
@else
    你完了。

; 根据 "score" 变量打印文本行：
;   "测试结果：通过。" - 当 score 为 10 或更高时。
;   "测试结果：失败。" - 当 score 低于 10 时。
测试结果：[unless score<10]通过。[else]失败。[endif]
```

## unlinkPrinter

取消文本打印机与作者（角色 Actor）的链接，该链接此前由 [@linkPrinter] 建立。更多信息请参阅 [链接的打印机指南](/zh/guide/characters#链接的打印机)。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary" title="主参数：值应在命令标识符之后指定，无需指定参数 ID">printerId</span> | string | 要取消链接的文本打印机标识符。未指定时，取消与任何打印机的链接。 |
| from | string list | 要取消链接的角色 Actor 标识符。未指定时从所有作者取消链接。 |

</div>

```nani
; 取消 'Dialogue' 打印机与 'Kohaku' 和 'Yuko' 作者的链接。
@unlinkPrinter Dialogue from:Kohaku,Yuko

; 取消 'Kohaku' 作者与任何打印机的链接。
@unlinkPrinter from:Kohaku

; 取消 'Dialogue' 打印机与所有作者的链接。
@unlinkPrinter Dialogue

; 取消所有打印机与所有作者的链接。
@unlinkPrinter
```

## unloadScene

卸载具有指定名称的 [Unity 场景](https://docs.unity3d.com/Manual/CreatingScenes.html)。不要忘记将所需的场景添加到 [构建设置](https://docs.unity3d.com/Manual/BuildSettings.html) 以使其可供加载。请注意，只能卸载以附加方式加载的场景（应始终至少有一个场景保持加载）。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">sceneName</span> | string | 要卸载的场景名称。 |

</div>

```nani
; 在附加模式下加载场景 'TestScene2'，然后卸载它。
@loadScene TestScene2 additive!
@unloadScene TestScene2
```

## unlock

将具有指定 ID 的 [可解锁项](/zh/guide/unlockables) 设置为 `unlocked` 状态。

::: info NOTE
可解锁项的解锁状态存储在 [全局作用域](/zh/guide/state-management#全局状态) 中。<br/> 如果具有指定 ID 的项未在全局状态映射中注册，则将自动添加相应的记录。
:::

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">id</span> | string | 可解锁项的 ID。使用 `*` 解锁所有已注册的可解锁项。 |

</div>

```nani
; 解锁 ID 为 'FightScene1' 的可解锁 CG 记录。
@unlock CG/FightScene1
```

## voice

播放位于指定路径的语音剪辑。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| authorId | string | 此语音所属的角色 Actor 的 ID。指定此参数且使用了 [按作者音量](/zh/guide/voicing#作者音量) 时，音量将相应调整。 |
| group | string | 播放音频时应使用的混音器 [组路径](https://docs.unity3d.com/ScriptReference/Audio.AudioMixer.FindMatchingGroups)。 |
| loop | boolean | 是否在播放结束时从头重复播放，直到停止。 |
| volume | number | 音频播放的响度，范围为 0.0 到 1.0。请注意，1.0 是默认值——在不产生削波的情况下，无法让数字音频以高于 0 dBFS 基线的电平播放。 |
| pitch | number | 播放的感知频率（速度），范围为 [-3.0 到 3.0](https://docs.unity3d.com/ScriptReference/AudioSource-pitch.html)，其中 1.0 为正常速度。负值将反向播放音频。 |
| pos | number list | 音频源的位置（相对于场景边界，以百分比表示）。位置描述如下：`0,0` 是左下角，`50,50` 是中心，`100,100` 是场景的右上角。使用 Z 分量（第三个成员，例如 `,,10`）按深度移动。 |
| wpos | number list | 音频源的位置（在世界空间中）。`pos` 和 `wpos` 均未指定时，将禁用空间模式。 |
| wait | boolean | 是否等待音频播放结束后再执行下一个命令。循环播放时无效。 |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">path</span> | string | 音频资源的本地路径（名称）。 |
| easing | string | 要应用的 [缓动函数](/zh/guide/special-effects#动画缓动) 名称。未指定时，将使用配置中设置的默认函数。 |
| fade | number | 命令启动的动画持续时间，以秒为单位。 |
| lazy | boolean | 当命令启动的动画已在运行时，启用 `lazy` 将使动画从当前状态继续播放到新目标。未启用 `lazy`（默认行为）时，当前正在运行的动画会先立即完成，然后再开始向新目标播放动画。 |
| waitFade | boolean | 在播放下一个命令之前是否等待淡入淡出完成。 |

</div>

```nani
; 以低音调播放 'Rawr' 语音资源。
@voice Rawr pitch:0.5
```

## wait

暂停脚本执行直到满足指定的等待条件。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">waitMode</span> | string | 等待条件：<br/> - `i` 用户按下继续或跳过输入键；<br/> - `0.0` 计时器（秒）；<br/> - `i0.0` 可通过继续或跳过输入键跳过的计时器。 |

</div>

```nani
; 震动背景效果结束 0.5 秒后播放雷声 SFX。
@spawn ShakeBackground
@wait 0.5
@sfx Thunder

; 打印前 2 个单词，然后等待输入再打印其余部分。
Lorem ipsum[wait i] dolor sit amet.
; 您也可以对此等待模式使用以下简写。
Lorem ipsum[-] dolor sit amet.

; 启动循环 SFX，打印消息并等待可跳过的 5 秒延迟，
; 然后停止 SFX。
@sfx Noise loop!
天哪，多么刺耳的噪音。快关掉它！[wait i5][>]
@stopSfx Noise
```

## while

只要指定的条件表达式求值为 `true`，就循环执行嵌套行。

<div class="config-table">

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| <span class="command-param-primary command-param-required" title="主参数：值应在命令标识符之后指定，无需指定参数 ID 必需参数：应始终指定该参数">expression</span> | string | 一个 [剧本表达式](/zh/guide/expressions)，应返回一个布尔值，决定关联的嵌套块是否应继续循环执行。 |

</div>

```nani
; 猜数字游戏。
@set number=random(1,100),answer=0
@while answer!=number
    @input answer summary:"猜一个 1 到 100 之间的数字"
    @if answer<number
        错了，太小了。
    @else if:answer>number
        错了，太大了。
    @else
        正确！
```
