# 资源加载器

资源加载器是用于检索Naninovel相关的数据，".nani"后缀的文本脚本，用于人物表现的角色贴图，用于声音表现音频剪辑等资源的工具类。每个加载器都被用于从特定目录来检索加载相应资源：工程目录下的"Resources"文件夹，Unity的可寻址资源系统，本地资源，Google Drive账号等。

加载器的整体配置，可在`Naninovel -> Configuration -> Resource Provider`菜单内查看。

![](https://i.gyazo.com/466488bf852f0dd54aa680012b072af1.png)

`Resource Policy`属性用于检测资源在脚本执行时的加载，卸载情况：
 - Static —（静态）所有资源在读取画面时预加载，并在脚本执行完成后卸载，默认使用的配置推荐适用于大多情况。
 - Dynamic —（动态）根据`Dynamic Policy Steps`设置来加载，不使用的资源立即卸载。用于低配低内存设备，可能在游戏时会有由于加载造成的卡顿。

当`Log Resources Loading`打开时，加载器相关的信息，会默认输出到加载画面的UI上。

`Enable Build Processing`用于打包时，启用预读取流程来注入在编辑器菜单中绑定的资源，仅在[自定义构建环境](/zh/guide/custom-build-environment.md) 或附加自己的构建挂钩时才禁用此功能。当[可寻址系统](https://docs.unity3d.com/Packages/com.unity.addressables@latest)被安装，开启`Use Addressables`将优化资源的处理步骤减少打包时间; 同时启用`Auto Build Bundles`将让asset bundles在打包时自动编译。

其他属性，不同加载器有所不同，将在后文详细说明。

资源加载器的特定属性，是通过`Loader`属性来配置的，可在相关的配置菜单找到。比如，下图为用于检索音频(BGM及 音效)的默认的音乐加载器的配置：

![](https://i.gyazo.com/e9b59f738c93d0cdee6f0999b797a461.png)

`Path Prefix` 属性允许为特定类型的资源加载器除根目录外，额外指定其他资源路径。
比如，我们要从项目的"Resources"文件夹中检索"Explosion"音频文件，加上"Audio"前缀，路径书写就应这样表示：`Resources.Load("Audio/Explosion")`。

`Providers List`允许配置加载器资源类型，和使用顺序。在上述例子中，加载音频资源时，首先假如可寻址资源加载器没有找到相应资源，此时就会调用项目配置的加载器。

注意，**编辑器模式下，特殊的编辑器资源加载器总是首先调用**（无视加载器配置）。该加载器用于存取所有通过Naninovel菜单的配置及其资源配置 (`Naninovel -> Resources -> ...`)。当游戏发布时，所有这些配置都会被暂存至"Resources"目录或者（当[可寻址资源系统](https://docs.unity3d.com/Packages/com.unity.addressables@latest)安装并启用时），会被自动编译为Assetsbundle包。因此记得**在发布项目后测试相关加载器功能**而不是在编辑器模式下。

## 寻址资源系统

[寻址资源系统](https://docs.unity3d.com/Packages/com.unity.addressables@latest)是unity用于通过“地址”为任意位置资源（本地或远端等）异步存取提供支持的资源包。详情请参考Unity的文档来安装，配置和使用。

Naninovel会自动在该系统安装后调用，不需要额外设置。在发布时，所有配置菜单内的资源（脚本，角色图片，音频剪辑等）都会被自动将地址注册至该系统的Naninovel组下。

寻址提供程序仅在运行时生成中使用，默认情况下在编辑器中被禁用。在资源配置菜单打开`Enable Addressable In Editor`属性后来手动配置调用该系统。注意，在启用该系统后，如果同时在原来的资源配置和寻址资源系统中配置了相同资源可能会导致一些问题，请重命名，多复制一份文件，或移除资源。

为了使要使用该系统的资源能被Naninovel引擎检测到，资源地址应该加上"Naninovel/"，并且应该有个“Naninovel”的标签注册（参照下图）。你可以在资源加载配置菜单中找到`Extra Labels`属性额外定义naninovel的过滤器标签。关闭资源加载器配置菜单中的`Enable Build Processing`并手动获取资源或是使用另一个非Naninovel默认可寻址组别的自定义组，避免每次都发布都重新生成相关资源。

如果你想配置可寻址系统的使用场景（比如，定义个远端获取主机），在`Window -> Asset Management -> Addressables -> Groups`菜单中编辑Naninovel组。该组会在第一次启动游戏时候，自动生成；如果该组丢失，可以手动创建。


![](https://i.gyazo.com/c93fbd9e232ec94468c685c4d6003916.png)

::: warn
我们不提供任何Unity可寻址系统用于远端主机或是部署/服务相关架构的支持或教程。参考[支持页面](/zh/support/#unity-支持)获取更多信息。
:::

## 项目加载器

项目加载器适用于服务“Resources”文件夹目录下的。详情参考Unity教程[资源加载API](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime) 。

注意，大多数情况下，[不推荐使用“Resources”文件夹加载资源](https://docs.unity3d.com/Manual/BestPracticeUnderstandingPerformanceInUnity6) 。请将资源注册至Naninovel资源管理器中，或是使用可寻址系统。在注册完毕之后，记得将资源从“Resources”文件夹移出。

## 本地资源加载器

本地资源加载器能够让（演出脚本，托管文本，精灵人物，背景，音频剪辑）等资源从本地任意位置加载。

资源加载器属性配置菜单里的`Local Path Root`属性，应该指向某个包含本地资源的路径。你可以使用绝对路径（比如，`C:\Resources`），或如下的相对路径：

 - `%DATA%` — 目标设备的游戏数据目录 ([Application.dataPath](https://docs.unity3d.com/ScriptReference/Application-dataPath));
 - `%PDATA%` — 目标设备的持久化数据目录 ([Application.persistentDataPath](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath));
 - `%STREAM%` — "StreamingAssets"目录 ([Application.streamingAssetsPath](https://docs.unity3d.com/ScriptReference/Application-streamingAssetsPath));
 - `%SPECIAL{F}%` — 系统的特殊目录，`F`是 [用于检索系统特殊文件夹的目录路径的枚举常数](https://docs.microsoft.com/en-us/dotnet/api/system.environment.specialfolder) value.

默认`%DATA%/Resources`的值指向游戏数据路径（不同平台的路径指向不同）内的 "Resources" 目录。

比如，假如你想从目录`C:/Users/Admin/Dropbox/MyGame/Scripts`加载Naninovel脚本，你可以直接写绝对路径(`C:/Users/Admin/Dropbox/MyGame`)，这需要你的所有合作开发者都使用完全一样的路径（包含驱动器标识符，一样的用户名）。使用相对路径可以避免这一问题：`%SPECIAL{UserProfile}%/Dropbox/MyGame`。


![](https://i.gyazo.com/eb435b782cfb9df6c403702e8f6124df.png)

脚本配置菜单的给定目录前缀用于添加脚本及相应的加载器，脚本导航器（通过`nav`[控制台命令](/zh/guide/development-console.md)使用） ，之后该工具就能抓取所有在其目录下的后缀“.nani”的脚本。

![](https://i.gyazo.com/df8ad31d30b5c10c9a918e69a4543567.png)


## 自定义加载器

用户可以自己添加资源加载器，让其和内置加载器协同工作，或替代其工作。

要添加自定义加载器，先创建C#类，包含无参数的构造函数，并继承`IResourceProvider`接口。创建后自定义加载器会和内置的一起罗列于加载器配置菜单，如下图：

![](https://i.gyazo.com/7176a9d4a4ea2d9414c5495e2e465baf.png)

你可以在`Naninovel/Runtime/Common/ResourceProvider`目录下找到内置的加载器，创建时随意参考其内容来创建你的加载器。

以下为自定义加载器的示例，没有实际作用，仅仅在使用时输出信息。

```csharp
using Naninovel;
using System;
using System.Collections.Generic;
using UniRx.Async;

public class CustomResourceProvider : IResourceProvider
{
    public event Action<float> OnLoadProgress;
    public event Action<string> OnMessage;

    public bool IsLoading => default;
    public float LoadProgress => default;
    public IEnumerable<Resource> LoadedResources => default;

    public Resource<T> GetLoadedResourceOrNull<T> (string path) 
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"GetLoadedResourceOrNull: {path}");
        return default;
    }

    public UniTask<Resource<T>> LoadResourceAsync<T> (string path) 
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"LoadResourceAsync: {path}");
        OnLoadProgress?.Invoke(1f);
        return default;
    }

    public UniTask<IEnumerable<Resource<T>>> LoadResourcesAsync<T> (string path) 
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"LoadResourcesAsync: {path}");
        OnLoadProgress?.Invoke(1f);
        return default;
    }

    public UniTask<IEnumerable<Folder>> LocateFoldersAsync (string path)
    {
        OnMessage?.Invoke($"LocateFoldersAsync: {path}");
        return default;
    }

    public UniTask<IEnumerable<string>> LocateResourcesAsync<T> (string path) 
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"LocateResourcesAsync: {path}");
        return default;
    }

    public UniTask<bool> ResourceExistsAsync<T> (string path) 
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"ResourceExistsAsync: {path}");
        return default;
    }

    public bool ResourceLoaded (string path)
    {
        OnMessage?.Invoke($"ResourceLoaded: {path}");
        return default;
    }

    public bool ResourceLoading (string path)
    {
        OnMessage?.Invoke($"ResourceLoading: {path}");
        return default;
    }

    public bool SupportsType<T> () 
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"SupportsType: {typeof(T).Name}");
        return default;
    }

    public void UnloadResource (string path)
    {
        OnMessage?.Invoke($"UnloadResource: {path}");
    }

    public void UnloadResources ()
    {
        OnMessage?.Invoke("UnloadResources");
    }
}
```

