# UniTask

[UniTask](https://github.com/Elringus/UniTask) is an open-sourced (MIT license) library providing a more efficient [Task-based asynchronous programming](https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming) implementation for Unity (compared to [.NET native](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task)). You can find more details regarding the nature of optimizations and usage examples in the [article by the author of the library](https://medium.com/@neuecc/a1ff0766029).

All the engines asynchronous methods are built with UniTask; in order to use the public APIs (eg, to add custom commands or implementations of the engine services), you'll need to install the library to your Unity project. Naninovel is bundled with an embedded version of the library, so it won't cause conflicts in case you already have one in your project. 

## Setup

Use [UPM](https://docs.unity3d.com/Manual/upm-ui.html) (`Window -> Package Manager`) to install a [UPM-compatible fork](https://github.com/Elringus/UniTask) of the library via the following git URL: `https://github.com/Elringus/UniTask.git#package`.

![](https://i.gyazo.com/b54e9daa9a483d9bf7f74f0e94b2d38a.gif)

Alternatively, you can install UniTask form the [main repository](https://github.com/Cysharp/UniTask/releases) via a standalone unity package. 

