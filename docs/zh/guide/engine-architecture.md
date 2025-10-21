# 引擎架构

Naninovel 引擎的设计核心基于以下两大原则：**场景无关性** 与 **服务导向**。

## 场景无关性

虽然 Unity 的设计理念鼓励通过场景与预制体进行组合开发，但在开发视觉小说时，这种方式并不高效。Naninovel 的系统要么**不直接绑定到 [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html)**，要么绑定到一个 **持久化根对象**上，即使用 [Object.DontDestroyOnLoad](https://docs.unity3d.com/ScriptReference/Object.DontDestroyOnLoad.html) 机制。

![](https://i.gyazo.com/6802b8c4bce20ca158bb757d12ef6c1a.png)

根据运行环境不同，Naninovel 使用以下根对象之一：

- `Naninovel<Runtime>`：用于运行时（构建版本与编辑器播放模式中）；
- `Naninovel<Editor>`：用于编辑器环境（非播放模式下）。

所有运行所需的游戏对象都会在**引擎初始化时自动创建**。初始化通过 [RuntimeInitializeOnLoadMethod](https://docs.unity3d.com/ScriptReference/RuntimeInitializeOnLoadMethodAttribute.html) 自动执行，即应用程序启动时（进入播放模式或运行构建后）异步完成。

若需要自定义初始化流程，可参考 👉 [手动初始化指南](/zh/guide/integration-options#manual-initialization)。

::: info 提示
如果你不希望使用“场景无关”设计，可在 **引擎配置菜单** 中关闭 `Scene Independent` 选项。关闭后，所有 Naninovel 相关对象都会成为当前 Unity 场景的一部分，并在场景卸载时一并销毁。
:::

## 基于服务

引擎的大多数功能都通过 **引擎服务** 实现。每个服务都是 `IEngineService` 接口的实现，用于处理特定的职责，例如：

- 执行 Naninovel 脚本；
- 管理角色；
- 管理游戏状态的保存与加载等。

当你需要与某个引擎系统交互时，最常见的方式就是使用相应的 **引擎服务**。

可通过静态方法 `Engine.GetService<TService>()` 获取服务引用：其中 `TService` 是你想要访问的服务接口类型。

例如，获取脚本播放器服务：

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```

你可以在 [引擎服务指南](/zh/guide/engine-services) 中找到当前可用的所有引擎服务列表，以及如何**重写或添加自定义服务**的详细说明。

## 高层架构概念

下方的 UML 图展示了 Naninovel 引擎架构的高层概念。

请注意：图中所有的类与接口名称都位于 `Naninovel` 命名空间下。例如，要引用 `Engine` 类，应使用完整限定名 `Naninovel.Engine`，或通过 C# 的 [`using`](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/namespaces/using-namespaces) 语句引入命名空间。

<object class="engine-design-dark" data="/assets/img/engine-design-dark.svg" type="image/svg+xml"></object>
<object class="engine-design-light" data="/assets/img/engine-design-light.svg" type="image/svg+xml"></object>
