# UniTask

[UniTask](https://github.com/Cysharp/UniTask) is an open-sourced (MIT license) library providing a more efficient [Task-based asynchronous programming](https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming) implementation for Unity (compared to [.NET native](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task)). You can find more details regarding the nature of optimizations and usage examples in the [article by the author of the library](https://medium.com/@neuecc/a1ff0766029).

All the Naninovel's asynchronous methods are built with UniTask; in order to use the public APIs (eg, to add custom commands or implementations of the engine services), the library should be installed in your Unity project. Naninovel is bundled with a copy of UniTask for convenience; if you already have the library installed, delete `Naninovel/ThirdParty/UniTask` to prevent conflicts.

