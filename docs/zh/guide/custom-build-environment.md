# 自定义构建环境

使用编辑器的 [构建菜单](https://docs.unity3d.com/Manual/BuildSettings.html) 构建项目时，Naninovel 会自动执行额外的预处理和后处理程序。除此之外，这些程序确保通过 Naninovel 的配置菜单分配的所有资源（例如，脚本文件、角色外观、BGM 和 SFX 剪辑等）都包含在构建中。

如果您使用的是自定义构建环境（例如 [Cloud Build](https://unity3d.com/unity/features/cloud-build)）或通过自定义脚本或命令行启动构建，则必须在构建前后分别手动调用 `Naninovel.BuildProcessor.PreprocessBuild(BuildPlayerOptions)` 和 `Naninovel.BuildProcessor.PostprocessBuild()` 静态方法。

下面是一个调用所需 Naninovel 处理方法的 Cloud Build 自定义构建处理脚本示例。请参阅 [官方服务文档](https://docs.unity3d.com/Manual/UnityCloudBuildPreAndPostExportMethods.html) 了解如何设置处理脚本。

```csharp
public static class CustomBuildProcessor
{
	#if UNITY_CLOUD_BUILD
    public static void PreExport (BuildManifestObject manifest)
    {
        var options = new UnityEditor.BuildPlayerOptions();
        var target = manifest.GetValue<string>("target").ToString().ToLower();

        if (target.Contains("windows") && target.Contains("64"))
            options.target = UnityEditor.BuildTarget.StandaloneWindows64;
        else if (target.Contains("windows"))
            options.target = UnityEditor.BuildTarget.StandaloneWindows;
        else if (target.Contains("android"))
            options.target = UnityEditor.BuildTarget.Android;
        else if (target.Contains("webgl"))
            options.target = UnityEditor.BuildTarget.WebGL;
        else throw new System.ArgumentException($"Unhandled target: {target}");

        Naninovel.BuildProcessor.PreprocessBuild(options);
    }
	#endif

    public static void PostExport(string exportPath)
    {
        Naninovel.BuildProcessor.PostprocessBuild();
    }
}
```

当为自定义命令使用程序集定义时，Unity 编辑器可能会在编译所有程序集之前开始导入资产，从而导致在使用 Cloud Build 时出现构建错误。这可以通过在开始构建之前重新导入脚本资产来解决，例如：

```csharp
var scriptGuids = AssetDatabase.FindAssets("t:Naninovel.script");
foreach (var scriptGuid in scriptGuids)
{
    var scriptPath = AssetDatabase.GUIDToAssetPath(scriptGuid);
    AssetDatabase.ImportAsset(scriptPath);
}
```

如果您使用的自定义构建处理程序应该通过编辑器的构建菜单触发，您可以通过在 Resource Provider 配置菜单中关闭 `Enable Build Processing` 属性来禁用 Naninovel 的处理程序。启用或禁用该属性后，重新启动 Unity 编辑器以使更改生效。
