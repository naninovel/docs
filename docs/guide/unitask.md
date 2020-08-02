# UniTask

[UniTask](https://github.com/Cysharp/UniTask) is an open-sourced (MIT license) library providing a more efficient [Task-based asynchronous programming](https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming) implementation for Unity (compared to [.NET native](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task)). You can find more details regarding the nature of optimizations and usage examples in the [article by the author of the library](https://medium.com/@neuecc/a1ff0766029).

All the Naninovel's asynchronous methods are built with UniTask; in order to use the public APIs (eg, to add custom commands or implementations of the engine services), the library should be installed in your Unity project. Naninovel is bundled with a copy of UniTask for convenience; if you already have the library installed, delete `Naninovel/ThirdParty/UniTask` to prevent conflicts.

## Upgrading to UniTask v2

Naninovel is bundled with and uses UniTask v1. While second version of the library provides more features and has slightly less allocations, it's unstable and frequently introduce breaking changes.

::: note
When UniTask v2 become stable enough, we'll use it by default. Until then, we won't be able to provide developer support for the projects, that are using it.
:::

In case you still wish to use UniTask v2, Naninovel has an automatic upgrade script, which modifies all the C# scripts in the project, that are using UniTask v1 APIs and removes `ThirdParty/UniTask` folder from the Naninovel directory. The script is accessible with `Naninovel -> Upgrade -> UniTask v1 to v2` editor menu.

![](https://i.gyazo.com/36de44973e67e17ba999788b35354f36.png)

After running the script, [install UniTask v2 via UPM](https://github.com/Cysharp/UniTask#upm-package) to resolve the dependencies. Installing via other methods (eg, importing unity package) is not supported, because package-specific platform defines won't work.
