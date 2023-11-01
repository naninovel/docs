# 引擎架构

该引擎在设计时考虑了以下原则： **场景独立性** 和 **面向服务** 。

## 独立于场景

虽然Unity设计推荐使用场景和预制体开发，但是在开发视觉小说时并不是很实际。

所有Naninovel系统并不直接和[MonoBehaviour]( https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) 关联，或依附于[持久化]( https://docs.unity3d.com/ScriptReference/Object.DontDestroyOnLoad.html) 的 [GameObject]( https://docs.unity3d.com/ScriptReference/GameObject.html) 。


![](https://i.gyazo.com/9805e2ce450bc486a007cdc001f8ae13.png)

下列根物体会根据运行环境使用：
- `Naninovel<Runtime>` 运行时（发布后和编辑器模式play mode运行时）
- `Naninovel<Editor>` 编辑器模式（非play mode运行时）

所有必需的游戏对象都是在引擎初始化时创建的，在应用启动时（在刚进入Play mode或启动发布包后）自动通过[RuntimeInitializeOnLoadMethod]( https://docs.unity3d.com/ScriptReference/RuntimeInitializeOnLoadMethodAttribute.html) （运行时初始化onload方法）方法异步加载。你可以在配置菜单关闭 `Initialize On Application Load` 属性不在启动时初始化，在之后手动调用`RuntimeInitializer` (运行模式下) 或 `EditorInitializer` (编辑器模式下)来初始化。

![](https://i.gyazo.com/f58a8af9f2f6d71286061e55fc228896.png)

因为初始化时异步进行的，在调用 `InitializeAsync()` 方法或订阅静态事件`Engine.OnInitialized` 时使用[使用 Async 和 Await 的异步编程](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/)

要完全禁用所有引擎系统并将其从内存中删除，请使用`Engine.Destroy()`静态方法。

## 面向服务

大多数引擎功能都是通过引擎服务实现的。引擎服务是IEngineService接口的实现，该接口会处理特定的功能，例如执行naninovel脚本，管理演出元素或保存加载游戏状态。

如果你想和引擎系统交互，大概率你是想使用某个引擎服务。你可以通过静态方法`Engine.GetService<TService>()`来获得相关引擎服务参考， `TService` 指你想要获取到的服务，比如，获取`IScriptPlayer` 服务：

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```

你可以在[引擎服务](/zh/guide/engine-services) 中找到现在可用的服务列表，和关于如何重写/添加自定义服务的信息。

## 高级概念

下面的UML图说明了引擎体系结构的高级概念。请注意，图中的所有类和接口名称都在Naninovel命名空间下。例如，要引用 `Engine` 类，请使用 `Naninovel.Engine`或[包含名称空间](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/namespaces/using-namespaces) 。

<object style="width:100%; max-width:699px" data="/assets/img/engine-design.svg" type="image/svg+xml"></object>
