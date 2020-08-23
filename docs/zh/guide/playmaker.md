# Playmaker

[PlayMaker](https://assetstore.unity.com/packages/tools/visual-scripting/playmaker-368) 是用于unity很受欢迎的可视化编程扩展，旨在用于便于无代码基础的人使用。

![](https://i.gyazo.com/0a5b219b059fd61c85d225e903d77857.png)

请注意，与默认情况下所有Naninovel的C＃API均可用的Bolt相比，PlayMaker要求为每个操作创建一个特殊的C＃类。意味着只有少部分引擎API在playmaker下可用。如果Naninovel的API发生更改，可用的自定义操作也可能会中断。

## 安装

安装playmaker参考[官方文档](https://hutonggames.fogbugz.com/default.asp?W11) 。

下载并导入[PlayMaker引擎扩展包](https://github.com/Elringus/NaninovelPlayMaker/raw/master/NaninovelPlayMaker.unitypackage) 。

自定义Naninovel操作应出现在PlayMaker操作浏览器的“ Naninovel”类别下。

![](https://i.gyazo.com/a40b0b7b21c73d3b5f64b005085198ea.png)

## 使用

以下视频演示了如何使用PlayMaker FSM（有限状态机）初始化Naninovel引擎，预加载并运行脚本。


[!!N856vi18XVU]

### 事件

一些重要的Naninovel事件可以自动发送到PlayMaker FSM。为此，请创建一个具有适当名称的全局[用户事件](https://hutonggames.fogbugz.com/default.asp?W148) ，并在FSM中使用它。以下是可用的事件名称：

- `Naninovel/Engine/OnInitialized`
- `Naninovel/ScriptPlayer/OnPlay`
- `Naninovel/ScriptPlayer/OnStop`
- `Naninovel/StateManager/OnGameSaveStarted`
- `Naninovel/StateManager/OnGameSaveFinished`
- `Naninovel/StateManager/OnGameLoadStarted`
- `Naninovel/StateManager/OnGameLoadFinished`
- `Naninovel/TextPrinterManager/OnPrintTextStarted`
- `Naninovel/TextPrinterManager/OnPrintTextFinished`
- `Naninovel/LocalizationManager/OnLocaleChanged`

也可以使用以下 `@playmaker` 命令从naninovel脚本中广播自定义PlayMaker事件：

```nani
@playmaker EventName
```

— 将在场景中所有活动的FSM中调用一个名为“ EventName”的全局用户事件。

该命令还允许使用 `fsm` 和 `object` 参数将事件发送到特定的FSM 。第一个参数允许指定FSM名称，该名称应接收事件，例如：

```nani
@playmaker EventName fsm:Fsm1,Fsm2
```

— 将为名称为“ Fsm1”和“ Fsm2”的FSM调用名为“ EventName”的事件。
 
当 `object` 指定参数时，事件将仅发送到应用于游戏对象的FSM，FSM具有相应的名称，例如：

```nani
@playmaker EventName object:Obj1,Obj2
```

— 将为所有绑定到名称分别为“ Obj1”和“ Obj2”的游戏对象的FSM调用一个名为“ EventName”的事件。

您还可以结合使用 `fsm` 和 `object` 参数来进一步过滤应接收事件的FSM。

### 全局变量

可以使用扩展包中提供的以下自定义[表达式函数](/zh/guide/script-expressions.html#表达式函数) 来访问Naninovel脚本中的全局PlayMaker变量：
 - `GetPlayMakerGlobalVariable("variableName")` —检索名称为“ variableName”简单类型的变量（int，float，string等）
 - `GetPlayMakerGlobalArray("variableName", arrayIndex)` —检索存储在名称为“ variableName”的数组变量的“arrayIndex”索引处的值

假设有一个"Score"整数和 "FinishedRoutes" 布尔数组全局PlayMaker变量，则可以在Naninovel脚本中使用它们，如下所示：

```nani
Felix: My score is {GetPlayMakerGlobalVariable("Score")}.

@if GetPlayMakerGlobalArray("FinishedRoutes",2)
    Third route (second array index) is completed.
@else
    Not yet.
@endif
```

## IDE扩展

要将 `@playmaker` 命令支持添加到[Atom IDE扩展](/zh/guide/naninovel-scripts.md#IDE支持)，请打开位于`%HOMEPATH%/.atom/packages/language-naniscript/server/metadata.json` （`%HOMEPATH%` 是OS用户目录的路径）上的元数据文件，并将以下记录添加到commands数组中：

```json
{
  "id": "BroadcastPlayMakerEvent",
  "alias": "playmaker",
  "localizable": false,
  "summary": "Broadcasts a PlayMaker event with the provided name.",
  "params": [
    {
      "id": "EventName",
      "nameless": true,
      "required": true,
      "dataType": {
        "kind": "literal",
        "contentType": "string"
      },
      "summary": "Name of the event to broadcast."
    },
    {
      "id": "FsmNames",
      "alias": "fsm",
      "nameless": false,
      "required": false,
      "dataType": {
        "kind": "array",
        "contentType": "string"
      },
      "summary": "Names of FSMs for which to broadcast the event."
    },
    {
      "id": "GameObjectNames",
      "alias": "object",
      "nameless": false,
      "required": false,
      "dataType": {
        "kind": "array",
        "contentType": "string"
      },
      "summary": "Names of game objects for which to broadcast the event."
    }
  ]
},
```

After the edit, the file should start as follows:

```json
{
  "commands": [
    {
      "id": "BroadcastPlayMakerEvent",
      "alias": "playmaker",
```

Restart the Atom editor (in case it was running), and the `@playmaker` command should no longer be highlighted as an error.

