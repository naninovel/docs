# UniTask

[UniTask](https://github.com/Cysharp/UniTask) 是基于(MIT license)的开源库，提供的高效的基于任务的异步编程实现（与[.NET native](https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task) 相比）。你可以在[作者文章库](https://medium.com/@neuecc/a1ff0766029)找到更多说明和使用示例。

Naninovel的所有异步方法都是使用UniTask构建的；为了使用公共API（例如，添加自定义命令或引擎服务的实现），应该在您的Unity项目中安装该库。Naninovel为方便起见内附了UniTask的副本。如果您已经安装了该库，请删除`Naninovel/ThirdParty/UniTask` 目录以防止冲突。


