# 整合设置

尽管Naninovel专注于传统视觉小说游戏，引擎仍然可以与现有项目集成。如果你在制作3D冒险游戏，RPG或任何其他类型的游戏，你仍然可以将Naninovel引入用作嵌入式对话（长篇文字）系统。

[!b1b6042db4a91b3a8cee74236b33c17c]

有多种方式可以将Naninovel整合到你的项目，取决于你想要通过Naninovel实现什么样的效果。在之后的文档中，我们会展示多种配置选项和API来保证Naninovel和一个游戏的匹配。在你开始前，请先参考[引擎设计](/zh/guide/engine-architecture.md) 来更好理解引擎如何在设计概念上实现这些。

::: example
参考[示例项目](/zh/guide/integration-options.md#示例项目)， 在此项目中，Nnianovel有作为嵌入对话系统和可切换的独立小说模式使用。
:::

## 手动初始化

第一个需要做的事情是，关闭引擎配置菜单内的 `Initialize On Application Load` 选项。
The first thing you'll probably want to change is disable `Initialize On Application Load` option in the engine configuration menu.

![](https://i.gyazo.com/f58a8af9f2f6d71286061e55fc228896.png)

该选项开启时，引擎服务会在应用启动时就开始初始化。除非你想在小说模式下开始你的游戏，否则请在需要使用该引擎的时候进行初始化。

使用静态异步 `RuntimeInitializer.InitializeAsync()` 方法（或自己的脚本），来在运行时使用任何内置API前初始化引擎。可以通过`Engine.Initialized` 查看当前引擎是否已经初始化。 `Engine.OnInitialized` 用来监听初始化完成事件。

要重置引擎服务（或释放大多数已加载资源），使用 `IStateManager` 服务下`ResetStateAsync()` 方法；在你暂时切换至其他游戏模式的时候这会很有用，不需要在再次使用时，重新初始化引擎。

要从内存完全销毁引擎相关服务，使用`Engine.Destroy()` 静态方法。

## 运行Naninova脚本

要预加载并运行特定Naninovel脚本，使用 `IScriptPlayer` 下的`PreloadAndPlayAsync(ScriptName)` 方法。要获取引擎服务，使用 `Engine.GetService<TService>()` 静态方法，`TService` 指服务使用的接口类型。比如，以下代码会获取脚本执行服务，预加载并执行名为"Script001"的脚本：

```csharp
var player = Engine.GetService<IScriptPlayer>();
await player.PreloadAndPlayAsync("Script001");
```

当退出小说模式并饭回主游戏模式时，你可能想卸载所有Naninovel使用的资源和服务。可以使用`IStateManager` 下的 `ResetStateAsync()` 方法：

```csharp
var stateManager = Engine.GetService<IStateManager>();
await stateManager.ResetStateAsync();
```

## 关闭标题菜单

内置标题菜单，会在初始化时自动显示，即使多数情况下你会在自己项目中有标题菜单。你可以通过[UI自定义特性](/zh/guide/user-interface.md#UI自定义) 来定制或时完全替代内置标题菜单，或是在引擎配置菜单直接关闭 `Show Title UI` 。

## 引擎物体层级
你可以通过配置菜单为所有除UI相关的引擎物体配置一个特殊[层级](https://docs.unity3d.com/Manual/Layers.html) 。

![](https://i.gyazo.com/8642fe37ddc45b8514b9f01d70277fbd.png)

这会让引擎使用[遮挡剔除](https://docs.unity3d.com/ScriptReference/Camera-cullingMask.html)  并只会渲染特定层级的物体。

要改变UI物体的使用层级，在UI配置菜单中修改`Objects Layer`选项。

![](https://i.gyazo.com/56d863bef96bf72c1fed9ae646db4746.png)

## 渲染到贴图

通过在摄像机配置菜单中分配自定义摄像机预制，可以让引擎相机渲染到自定义的[渲染贴图](https://docs.unity3d.com/ScriptReference/RenderTexture.html) 上而不是屏幕（并更改其他与摄像机相关的设置）。

![](https://i.gyazo.com/1b7116fa1bd170d3753b4cdbd27afcf3.png)

## 切换模式

尽管它很大程度上取决于项目，以下是一个抽象示例（基于前面提到的整合设置），来展示如何通过自定义命令来切换“普通冒险”和“小说”模式。

```csharp
[CommandAlias("novel")]
public class SwitchToNovelMode : Command
{
    public StringParameter ScriptName;
    public StringParameter Label;

    public override async UniTask ExecuteAsync (AsyncToken asyncToken = default)
    {
        // 1. Disable character control.
        var controller = Object.FindObjectOfType<CharacterController3D>();
        controller.IsInputBlocked = true;

        // 2. Switch cameras.
        var advCamera = GameObject.Find("AdventureModeCamera").GetComponent<Camera>();
        advCamera.enabled = false;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = true;

        // 3. Load and play specified script (if assigned).
        if (Assigned(ScriptName))
        {
            var scriptPlayer = Engine.GetService<IScriptPlayer>();
            await scriptPlayer.PreloadAndPlayAsync(ScriptName, label: Label);
        }

        // 4. Enable Naninovel input.
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.ProcessInput = true;
    }
}
```

```csharp
[CommandAlias("adventure")]
public class SwitchToAdventureMode : Command
{
    public override async UniTask ExecuteAsync (AsyncToken asyncToken = default)
    {
        // 1. Disable Naninovel input.
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.ProcessInput = false;

        // 2. Stop script player.
        var scriptPlayer = Engine.GetService<IScriptPlayer>();
        scriptPlayer.Stop();

        // 3. Reset state.
        var stateManager = Engine.GetService<IStateManager>();
        await stateManager.ResetStateAsync();

        // 4. Switch cameras.
        var advCamera = GameObject.Find("AdventureModeCamera").GetComponent<Camera>();
        advCamera.enabled = true;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = false;

        // 5. Enable character control.
        var controller = Object.FindObjectOfType<CharacterController3D>();
        controller.IsInputBlocked = false;
    }
}
```

然后可以在naninovel脚本中使用以下命令：

```nani
; Switch to adventure mode.
@adventure
```

— 或直接在C＃中（例如，在Unity的 `OnTrigger` 事件）：

```csharp
private void OnTriggerEnter (Collider other)
{
	var switchCommand = new SwitchToNovelMode { ScriptName = "Script001" };
	switchCommand.ExecuteAsync().Forget();
}
```

## 其他选项

还有许多其他功能（状态开放，服务重写，自定义序列化，资源和配置加载器等），这些都在整合另一个系统的时候非常有用。参考剩余部分教程获取更多信息。同时参考[配置选项](/zh/guide/configuration.md)。 部分特性或许教程没有提及，但是对整合来说仍然很有用。

如果你觉得API扩展性不足，或是需要源码修改来整合，可以联系[技术支持](/zh/support/#开发支持) — 我们会考虑改进。

## 示例项目

[GitHub上](https://github.com/Naninovel/IntegrationExample) 提供了一个示例项目，其中Naninovel用作3D冒险游戏的直接对话和可切换的独立小说模式。您可以使用Git客户端[克隆存储库](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)， 也可以将其[下载为zip存档](https://github.com/Naninovel/IntegrationExample/archive/master.zip)。

::: warn
Naninovel软件包未包含在内，因此，首次打开该项目会产生编译错误；从资源商店导入Naninovel以解决问题。
:::

所有示例脚本都存储在 `Assets/Runtime` 目录。

Naninovel初始化时由`MainScene`场景中`SetupGame`游戏物体上的 `Runtime/SetupGame.cs` 脚本手动执行（引擎配置菜单中禁用了自动初始化）。

当玩家触发到相应碰撞盒，`Runtime/DialogueTrigger.cs`作为组件来触发切换到对话模式。

`Runtime/SwitchToNovelMode.cs`的自定义命令，用于从C#或是naninovel脚本切换到小说模式。

`Runtime/SwitchToAdventureMode.cs`的自定义命令，用于从小说模式切换到冒险模式。

