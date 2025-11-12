# 资源提供器

资源提供器用于在运行时根据 [内存管理](/zh/guide/memory-management) 需求获取 Naninovel 相关资源（如角色立绘、BGM 音频等）。每种提供器都专门负责从特定来源加载资源，例如项目的 “Resources” 文件夹、Unity 的 Addressables 系统、本地文件存储等。

可以通过 `Naninovel -> Configuration -> Resource Provider` 菜单配置资源提供器的通用行为。

![](https://i.gyazo.com/b895b71462d39352931609bcf2115711.png)

`Resource Policy`（资源策略）属性决定了脚本执行过程中资源的加载与卸载时机。详细说明请参阅 [内存管理指南](/zh/guide/memory-management)。

启用 `Log Resources Loading` 选项后，资源加载的相关日志信息将显示在默认的加载界面 UI 上。

启用 `Enable Build Processing` 后，会在构建时执行预处理步骤，以确保通过编辑器菜单分配的资源在构建版本中可用。如果你使用了 [自定义构建环境](/zh/guide/custom-build-environment) 或自行注册了构建钩子，可禁用此项。当修改此选项后，请重新启动 Unity 编辑器以使更改生效。

当项目中安装了 [可寻址系统](https://docs.unity3d.com/Packages/com.unity.addressables@latest) 时，启用 `Use Addressables` 可优化资源处理流程、缩短构建时间；同时启用 `Auto Build Bundles` 会在打包游戏时自动编译资源包。

配置菜单中的其他属性为各提供器专有属性，具体说明如下。

资源类型相关的提供器行为可通过各自配置菜单中的 `Loader`（加载器）属性设置。例如，以下是用于加载音频资源（BGM 和 SFX）的默认加载器配置：

![](https://i.gyazo.com/e9b59f738c93d0cdee6f0999b797a461.png)

`Path Prefix`（路径前缀）属性允许为特定资源类型指定附加路径。例如，当从项目的 “Resources” 文件夹加载名为 “Explosion” 的音频文件时，若将路径前缀设为 “Audio”，最终的加载请求路径将为：`Resources.Load("Audio/Explosion")`。

`Providers List`（提供器列表）属性用于指定资源提供器的使用顺序。例如，在上图中，请求音频资源时将首先尝试 “Addressable” 提供器，若未找到资源，则回退使用 “Project” 提供器。

请注意，**在 Unity 编辑器中始终会优先使用特殊的 “Editor” 资源提供器**（无论加载器配置如何）。该提供器可以访问所有通过 Naninovel 配置或资源管理器菜单（`Naninovel -> Resources -> ...`）分配的资源。当游戏构建后，这些资源会自动复制到临时的 “Resources” 文件夹，或（若启用了 [Addressables 系统](https://docs.unity3d.com/Packages/com.unity.addressables@latest)）注册到 Addressables 配置中并编译为资源包。

**请务必在构建版本中测试与资源提供器相关的功能**，而不是仅在 Unity 编辑器中进行测试。

## 可寻址资源

[可寻址资源系统](https://docs.unity3d.com/Packages/com.unity.addressables@latest) 是一个 Unity 包，允许通过“地址”来加载资源。它使用异步加载机制，以支持从任意位置（本地存储、远程网络托管等）加载资源，并处理任意依赖项集合。请参阅 Unity 官方文档了解如何设置、配置和使用该系统。

当项目中安装了 Addressables 包，并在资源提供器配置中启用了 `Use Addressables` 属性时，Naninovel 将自动使用 Addressables 系统，无需额外配置。所有在 Naninovel 配置菜单中分配的资源（例如剧情脚本、角色立绘、音频剪辑等）都会在构建播放器时自动注册到该系统中（即被分配地址）。

如果你希望自定义 Naninovel 资源的加载方式（例如指定远程服务器托管地址），可以通过 `Window -> Asset Management -> Addressables -> Groups` 菜单编辑 Naninovel 相关的资源组。这些资源组会在首次构建游戏时自动创建；如果缺失，也可以手动创建。

![](https://i.gyazo.com/c93fbd9e232ec94468c685c4d6003916.png)

::: info NOTE
Naninovel Addressable 资源组中的资源记录会在每次构建时自动生成。不要手动修改这些记录，否则更改会在下次构建时被覆盖。不过，所有资源组的设置将会被保留。
:::

### 分类分组

默认情况下，资源提供器配置中的 `Group By Category` 选项是禁用的，这会导致所有 Naninovel 资源都被归入单个名为 “Naninovel” 的组中。若希望按照资源类别进行分组（例如为每种资源类型设置独立的打包或加载方式），请启用此选项并重新构建项目。启用后，每个资源类别（如脚本、音频、角色等）都会被添加到各自的 Addressable 资源组中，命名格式为 “Naninovel-*Category*”，其中 *Category* 表示资源类别名称。

![](https://i.gyazo.com/80938ca5ca1021e8a71f783eef516d15.png)

### 手动分配

若希望在不使用编辑器菜单的情况下手动将 Addressable 资源暴露给 Naninovel，可使用自定义的 Addressable 资源组；该组可以使用任意名称，但**不能以保留前缀 “Naninovel” 开头**，否则会被识别为自动生成组并在构建时被清空。被暴露的资源地址应以 “Naninovel/” 开头，并且必须分配 “Naninovel” 标签。你还可以通过资源提供器配置菜单中的 `Extra Labels` 属性，为 Naninovel 指定额外的标签来过滤使用的资源。

::: tip EXAMPLE
请参考 [可寻址话示例](/zh/guide/samples#addressable)，了解如何通过 Addressable 提供器手动注册 Naninovel 资源（无需使用资源编辑器菜单）并从远程服务器加载资源。你也可以查阅 Unity 官方的 [Addressables 学习资料](https://learn.unity.com/course/get-started-with-addressables) 以获取更多帮助。
:::

### 脚本标签

由于 [Unity 的一个设计缺陷](https://github.com/naninovel/docs/issues/159)，Addressable 资源在整个资源包卸载之前不会从内存中释放。也就是说，如果你没有正确地组织资源包，所有资源可能最终被打包到一个单独的 bundle 中，并且一旦加载将永远不会卸载，从而可能导致内存溢出错误。

最简单的解决方案是在 [资源组设置](https://docs.unity3d.com/Packages/com.unity.addressables@1.22/manual/GroupSchemas.html) 中将 `Bundle Mode` 设置为 `Pack Separately`：

![](https://i.gyazo.com/651a292ca6f1f4e26593074e25c66cea.png)

— 这样每个资源都会拥有独立的 bundle，从而在释放后可以立即卸载。虽然这在内存占用方面最为高效，但会带来额外的 CPU 开销并增加加载时间，因为加载一个大型连续的二进制文件远比不断查找、加载和卸载多个小文件要快，尤其是在较慢的硬盘上。

当资源提供器配置中启用了 `Label By Scripts`（默认启用）时，Naninovel 会采用折中方案：在构建玩家时，它会扫描所有的剧情脚本，并尝试判断每个脚本需要使用哪些资源；随后，它会根据资源被使用的脚本为对应的 Addressable 资源分配标签：

![](https://i.gyazo.com/9013a1264a55aa95d22ecfc6b3283ac3.png)

— 如果随后将 `Bundle Mode` 设置为 `Pack Together By Label`（默认值），这些资源将根据它们所属的剧情脚本分配到不同的 bundle 中，从而使 bundle 结构与 Naninovel 的 [内存管理策略](/zh/guide/memory-management) 相匹配，实现加载与释放的优化。

::: info NOTE
所有 Naninovel 资源都会参与标签分配，包括那些 [手动注册](/zh/guide/resource-providers#manual-assignment) 而非通过资源编辑器菜单添加的资源。只要资源具有 `Naninovel` 标签，它就会被标记为与对应脚本关联。
:::

然而，这种标签分配过程带有一定的推断成分，并非总能准确完成。为了确保大多数资源能被正确标记，请遵循以下准则：

- 不要在资源上下文参数（例如角色 ID、立绘、音频路径等）中使用 [表达式](/zh/guide/script-expressions)。表达式会在指令执行前才被解析，因此在构建时无法确定资源的最终路径。Naninovel 会在构建期间检测并警告此类情况。
- 在使用 [@char] 和 [@back] 等指令时，务必显式指定角色 ID 和立绘。虽然这些指令在省略参数时会使用默认值，但在构建阶段并不总能正确解析默认资源。
- 当创建 [自定义指令](/zh/guide/custom-commands) 时，请为引用资源的参数应用 [资源上下文属性](/zh/guide/ide-extension#ide-attributes)。例如，如果你的自定义指令包含一个接受角色 ID 的参数，请为该字段添加 `[ActorContext]` 属性。虽然这些属性主要用于 IDE 自动补全，但标记工具同样会利用它们来解析资源地址。

## Project

Project 提供器用于加载 Unity 项目中 “Resources” 文件夹下的资源。有关 Unity [资源加载 API](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime) 的更多信息，请查阅官方文档。

::: warning
在大多数情况下，[不推荐使用 “Resources” 文件夹](https://docs.unity3d.com/Manual/UnderstandingPerformanceResourcesFolder.html)。建议通过 Naninovel 的资源管理器菜单分配资源，或改用 Addressable 系统；完成后请将资源移出 “Resources” 文件夹。
:::

## 本地资源提供器

本地资源提供器允许从本地文件系统中的任意位置加载简单资源（如剧情脚本、受管文本、角色立绘、背景图片、音频等）。

::: info NOTE
本地提供器会直接从文件系统加载原始文件并在运行时进行转换，这种方式较慢，且相比其他提供器支持的文件类型更少。仅建议在开发阶段或用于特定功能（例如 [社区模组功能](/zh/guide/community-modding)）时使用。
:::

支持的文件格式：

- `.nani`：剧情脚本文本文件  
- `.png` 与 `.jpg`：图像或纹理文件  
- `.wav`：音频文件（仅支持 PCM16 44100Hz 立体声格式）

::: tip
若要添加更多支持的文件格式，可通过重写 `IResourceProviderManager` [引擎服务](/zh/guide/engine-services#overriding-built-in-services)，为本地提供器添加自定义转换器。

![](https://i.gyazo.com/d4e63726c2d1d75e2677cab7f2503546.png)
:::

在资源提供器配置中，`Local Path Root` 属性应指向存放本地资源的文件夹。该路径可以是绝对路径（如 `C:\Resources`），也可以是以下任意起始符号的相对路径：

- `%DATA%` — 游戏数据目录（[Application.dataPath](https://docs.unity3d.com/ScriptReference/Application-dataPath)）  
- `%PDATA%` — 游戏持久化数据目录（[Application.persistentDataPath](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath)）  
- `%STREAM%` — “StreamingAssets” 目录（[Application.streamingAssetsPath](https://docs.unity3d.com/ScriptReference/Application-streamingAssetsPath)）  
- `%SPECIAL{F}%` — 操作系统的特殊文件夹，其中 `F` 是 [.NET SpecialFolder 枚举](https://docs.microsoft.com/en-us/dotnet/api/system.environment.specialfolder) 的名称。

默认路径 `%DATA%/Resources` 指向游戏数据目录下的 “Resources” 文件夹（该路径会因平台不同而有所变化）。

例如，假设你希望从 `C:/Users/Admin/Dropbox/MyGame/Scripts` 文件夹加载 Naninovel 剧本，并通过 Dropbox 与协作者共享这些脚本。虽然可以直接使用绝对路径（如 `C:/Users/Admin/Dropbox/MyGame`），但这样会要求所有协作者在相同驱动器和用户名下保持完全一致的路径结构。更灵活的做法是使用以下相对路径：`%SPECIAL{UserProfile}%/Dropbox/MyGame`，该路径会基于用户的系统配置自动解析到正确位置。

![](https://i.gyazo.com/eb435b782cfb9df6c403702e8f6124df.png)

如果脚本配置中的路径前缀（Path Prefix）设置为 `Scripts`，且本地提供器已添加至加载器列表中，那么使用 `nav` [控制台指令](/zh/guide/development-console) 打开的脚本导航器将自动识别指定文件夹下的所有 `.nani` 剧本文本文件。

![](https://i.gyazo.com/df8ad31d30b5c10c9a918e69a4543567.png)

## 自定义资源提供器

你可以添加自定义的资源提供器实现，以替换或补充 Naninovel 内置的提供器。

创建一个带无参构造函数的 C# 类，并实现 `IResourceProvider` 接口。完成后，该自定义提供器类型将会出现在所有加载器配置菜单中，与内置提供器并列。

![](https://i.gyazo.com/7176a9d4a4ea2d9414c5495e2e465baf.png)

内置资源提供器的实现可在 `Naninovel/Runtime/Common/ResourceProvider` 目录中找到，可作为自定义实现的参考。

以下示例展示了一个仅用于记录调用日志的自定义资源提供器：

```csharp
using Naninovel;
using System;
using System.Collections.Generic;

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

    public UniTask<Resource<T>> LoadResource<T> (string path)
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"LoadResource: {path}");
        OnLoadProgress?.Invoke(1f);
        return default;
    }

    public UniTask<IEnumerable<Resource<T>>> LoadResources<T> (string path)
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"LoadResources: {path}");
        OnLoadProgress?.Invoke(1f);
        return default;
    }

    public UniTask<IEnumerable<Folder>> LocateFolders (string path)
    {
        OnMessage?.Invoke($"LocateFolders: {path}");
        return default;
    }

    public UniTask<IEnumerable<string>> LocateResources<T> (string path)
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"LocateResources: {path}");
        return default;
    }

    public UniTask<bool> ResourceExists<T> (string path)
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"ResourceExists: {path}");
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
