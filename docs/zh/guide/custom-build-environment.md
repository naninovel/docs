# 自定义构建环境

当你通过编辑器的 [Build 菜单](https://docs.unity3d.com/Manual/BuildSettings.html) 构建项目时，Naninovel 会自动执行额外的构建前与构建后处理流程。这些流程会确保所有在 Naninovel 配置菜单中分配的资源（例如脚本文档、角色立绘、BGM、SFX 音频等）都被正确包含到最终构建中。

如果你使用的是自定义构建环境（例如 [Unity Cloud Build](https://unity3d.com/unity/features/cloud-build)）或通过自定义脚本、指令行执行构建，则需要在构建前后手动调用以下静态方法：

- 构建前调用：`Naninovel.BuildProcessor.PreprocessBuild(BuildPlayerOptions)`  
- 构建后调用：`Naninovel.BuildProcessor.PostprocessBuild()`

以下是一个 Cloud Build 自定义构建处理脚本示例，展示了如何在构建流程中调用所需的 Naninovel 处理方法。关于如何设置这些处理脚本，请参考 [Unity 官方文档](https://docs.unity3d.com/Manual/UnityCloudBuildPreAndPostExportMethods.html)。

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

当为自定义指令使用程序集定义（Assembly Definition）时，Unity 编辑器可能会在所有程序集尚未完全编译完成前就开始导入资源，这会在使用 Cloud Build 时导致构建错误。可以通过在构建开始前重新导入脚本资源来解决该问题，例如：

```csharp
var scriptGuids = AssetDatabase.FindAssets("t:Naninovel.script");
foreach (var scriptGuid in scriptGuids)
{
    var scriptPath = AssetDatabase.GUIDToAssetPath(scriptGuid);
    AssetDatabase.ImportAsset(scriptPath);
}
```

如果你使用自定义的构建处理器（Build Handler），并希望通过 Unity 编辑器的 Build 菜单触发构建，可以在 “Resource Provider” 配置菜单中关闭 `Enable Build Processing` 属性以禁用 Naninovel 自带的构建处理逻辑。启用或禁用该属性后，请重新启动 Unity 编辑器以使更改生效。
