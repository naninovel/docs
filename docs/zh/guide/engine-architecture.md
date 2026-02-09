# 引擎架构

引擎在设计时考虑了以下原则：**场景独立性** 和 **面向服务**。

## 场景独立性

虽然 Unity 的设计提倡使用场景和预制件组合，但在开发视觉小说时并不实用。Naninovel 系统要么不直接绑定到 [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html)，要么附加到 [持久](https://docs.unity3d.com/ScriptReference/Object.DontDestroyOnLoad.html) 根 [GameObject](https://docs.unity3d.com/ScriptReference/GameObject.html)。

![](https://i.gyazo.com/6802b8c4bce20ca158bb757d12ef6c1a.png)

根据环境的不同，使用以下根对象：
- `Naninovel<Runtime>` 用于运行时（构建和编辑器播放模式）；
- `Naninovel<Editor>` 用于编辑器（播放模式之外）。

所有需要的游戏对象都在引擎初始化时创建，该初始化通过 [RuntimeInitializeOnLoadMethod](https://docs.unity3d.com/ScriptReference/RuntimeInitializeOnLoadMethodAttribute.html) 方法在应用程序启动时（进入播放模式或运行构建后立即）自动异步运行。要自定义初始化方案，请参阅 [手动初始化指南](/zh/guide/integration-options#手动初始化)。

::: info NOTE
如果场景独立设计不适合您的项目，请在引擎配置菜单中禁用 `Scene Independent` 选项。所有 Naninovel 相关对象随后将成为活动 Unity 场景的一部分，并将在场景卸载时销毁。
:::

## 面向服务

大多数引擎功能都是通过引擎服务实现的。引擎服务是 `IEngineService` 接口的实现，用于处理特定工作，例如执行剧本脚本、管理 actor 或保存和加载游戏状态。

如果您需要与引擎系统交互，通常会使用引擎服务。您可以使用静态方法 `Engine.GetService<TService>()` 获取对服务的引用，其中 `TService` 是您想要服务的接口类型；例如，要获取 `IScriptPlayer` 服务：

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```
您可以在 [引擎服务指南](/zh/guide/engine-services) 中找到所有当前可用的引擎服务列表以及有关如何覆盖或添加自定义服务的信息。

## 高级概念

以下 UML 图说明了引擎架构的高级概念。请注意，图中的所有类和接口名称都在 `Naninovel` 命名空间下组织。例如，要引用 `Engine` 类，请使用 `Naninovel.Engine` 或 [包含命名空间](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/namespaces/using-namespaces)。

<object class="engine-design-dark" data="/assets/img/engine-design-dark.svg" type="image/svg+xml"></object>
<object class="engine-design-light" data="/assets/img/engine-design-light.svg" type="image/svg+xml"></object>
