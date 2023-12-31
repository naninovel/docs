# UniTask

[UniTask](https://github.com/Cysharp/UniTask) is an open-sourced (MIT license) library providing a more efficient [Task-based asynchronous programming](https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming) implementation for Unity. You can find more details regarding the nature of optimizations and usage examples in the [article by the author of the library](https://medium.com/@neuecc/a1ff0766029).

Naninovel uses a stripped and modified version of UniTask v1, which is embedded inside the engine runtime assembly; most of the asynchronous methods return `UniTask` objects, which you can await in the same way as default `Task` objects from the "System.Threading" namespace.

In case you want to use full standalone UniTask library, install UniTask v2 from the official repository: [github.com/Cysharp/UniTask](https://github.com/Cysharp/UniTask#install-via-git-url) and specify "Naninovel.UniTask" for the Naninovel APIs when required, eg:

```csharp
using Naninovel;
using UnityEngine;

public class UniTaskCommand : Command
{
    // This method uses embedded UniTask v1.
    public override async Naninovel.UniTask ExecuteAsync (AsyncToken token = default)
    {
        var message = await WaitAndReturnMessageAsync();
        Debug.Log(message);
    }

    // This method uses standalone UniTask v2.
    private async Cysharp.Threading.Tasks.UniTask<string> WaitAndReturnMessageAsync ()
    {
        await Cysharp.Threading.Tasks.UniTask.DelayFrame(100);
        return "Hello from UniTask v2!";
    }
}
```

::: tip EXAMPLE
Find an example on using full standalone UniTask v2 installation with Naninovel in the [sample GitHub repository](https://github.com/naninovel/samples/tree/main/unity/unitask).
:::
