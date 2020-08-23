# 自定义变量

自定义变量特性允许用户创建用户指定的变量，使用他们来驱动特定条件下的Naninovel脚本或其他系统执行。比如，自定义变量可以用于选择多个Naninovel脚本中的某一个执行（预设路线），基于用户之前的选择。另一个频繁使用的场景，玩家状态画面（比如，分数，金钱，资源等），基于玩家的游戏中的选择执行操作。

自定义变量可以自己创建，定制并用于Naninovel脚本中的 [@set] 和 [@if] 命令，及C#脚本中的`ICustomVariableManager` [引擎服务](/zh/guide/engine-services.md) 。

比如，以下脚本命令将会根据选择为自定义变量 `score` 赋予不同值：

```nani
@choice "I'm humble, one is enough..." set:score=1
@choice "Two, please." set:score=2
@choice "I'll take your entire stock!" set:score=999
```

以下脚本将会根据 `score` 值决定脚本执行路线：

```nani
@goto MainRoute if:"score > 1 && score <= 900"
@goto BadEnd if:score>900
```

察看API参考部分获取更多关于 [@set] 和 [@if] 命令的示例。

所有自定义变量都随游戏自动保存。默认情况下，变量存储于**局部范围**中。意味着，在游戏中你注册了某些变量值后，玩家重新开始新游戏或加载了其他栏位的游戏后，该值会丢失。大多数变量适用于此情况。如果，你希望将该变量存储于 **全局范围** ，在其变量名加上 `G_` 或 `g_` ，比如`G_FinishedMainRoute` 或 `g_total_score`。全局变量可以用于表明部分元信息或总信息，比如，玩家完成某些路线的次数，或所有路线中的总分数。

在配置菜单的 "Custom Variables" 中，你可以为自定义变量（全局和局部范围）预先设置初始值。

![](https://i.gyazo.com/21701f17403921e34ba4da33b0261ad0.png)

全局预定义值将会随第一个应用启动时初始化，本地变量会在每次状态重置时初始化。请注意，菜单中的value字段需要有效的脚本表达式，而不是原始值字符串。

## 注入变量

可以使用花括号将自定义变量注入（内联）到naninovel脚本参数值。

以下脚本将显示一个输入字段UI，用户可以在其中输入任意文本。提交后，输入的文本将分配给指定的自定义变量。

```nani
; 允许玩家输入任意文本，并绑定到 `name` 自定义变量。
@input name summary:"Choose your name."
; 停止命令，挂起脚本直到玩家提交输入值。
@stop

; 之后你就可以Naninovel脚本中注入该 `name` 变量值。
Archibald: Greetings, {name}!
{name}: Yo!

; ...或在set命令的条件表达式中使用。
@set score=score+1 if:name=="Felix"
```

只要类型允许，就可以将自定义变量注入任何参数值。例如，不能将字符串（文本）分配给整数（数字）参数。

```nani
@set PlayerName="Felix";PlayerYPosition=0.1;PlayerTint="lightblue"

; 由于 `PlayerTint` 值不是数字，所以会报错。
@char {PlayerName} pos:50,{PlayerTint} 

; ...这句会正常执行。
@char {PlayerName} pos:50,{PlayerYPosition} tint:{PlayerTint}
```

## 变量触发器

在构建 [自定义UI](/zh/guide/user-interface.md#UI自定义) 或其他系统时，可能希望在变量值更改时侦听（反应）事件。比如创建，角色状态界面是，你想让文本跟随变量改变。使用条件判断实现应该会用到C#脚本，你也可以通过 `Custom Variable Trigger` 组件使用达到效果。当给定名字的变量值改变时，该组件会调用Unity事件。你可以将事件和合适命令绑定，比如更新文本值。

![](https://i.gyazo.com/22eddd109e76d4e63c461e9d75b20ceb.png)

## 变量debug

在游戏运行时，可以基于debug的目的查看和修改所有已有变量值。

打开[开发控制台](/zh/guide/development-console.md) ，输入命令，打开 `var` 变量编辑窗口。

![](https://i.gyazo.com/d1812668c0776b01f3a82c5ddcba0145.png)

当改变列表中的值后，“set”按钮会出现，点击后应用该修改。

如果游戏运行中变量值改变，变量列表会自动更新对应值。