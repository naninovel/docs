# 自定义构建环境

当通过Unity的 [build menu](https://docs.unity3d.com/Manual/BuildSettings.html) 菜单来发布项目时，naninovel会自动执行附加的预处理和后处理过程。这些程序将处理包括确保将Naninovel的配置菜单分配的所有资源（例如，脚本文件，角色外观，BGM和SFX剪辑等）都包含到发布项目中，和其他事项。

如果使用的是自定义构建环境（例如，[Cloud Build](https://unity3d.com/unity/features/cloud-build) 或通过自定义脚本或从命令行启动构建），则必须分别在构建之前和之后手动调用`Naninovel.BuildProcessor.PreprocessBuild(BuildPlayerOptions)` 和 `Naninovel.BuildProcessor.PostprocessBuild()` 静态方法。

以下是Cloud Build自定义构建处理脚本的示例，调用的为所需Naninovel处理方法。有关如何设置处理脚本，请查阅[官方服务文档](https://docs.unity3d.com/Manual/UnityCloudBuildPreAndPostExportMethods.html) 。

```csharp
public static class CustomBuildProcessor 
{
	#if UNITY_CLOUD_BUILD
    public static void PreExport(UnityEngine.CloudBuild.BuildManifestObject manifest)
    {
        var options = new UnityEditor.BuildPlayerOptions();
        var cloudBuildTargetName = manifest.GetValue<string>("cloudBuildTargetName").ToString().ToLower();

        if (cloudBuildTargetName.Contains("windows") && cloudBuildTargetName.Contains("64"))
            options.target = UnityEditor.BuildTarget.StandaloneWindows64;
        else if (cloudBuildTargetName.Contains("windows"))
            options.target = UnityEditor.BuildTarget.StandaloneWindows;
        else if (cloudBuildTargetName.Contains("android"))
            options.target = UnityEditor.BuildTarget.Android;
        else if (cloudBuildTargetName.Contains("webgl"))
            options.target = UnityEditor.BuildTarget.WebGL;
        else throw new System.ArgumentException($"Unhandled cloudBuildTargetName: {cloudBuildTargetName}");
    
        Naninovel.BuildProcessor.PreprocessBuild(options);
    }
	#endif

    public static void PostExport(string exportPath)
    {
        Naninovel.BuildProcessor.PostprocessBuild();        
    }
}
```

如果使用自己的自定义构建处理程序（应该由编辑器的构建菜单触发），则可以通过禁用配置菜单中的`Enable Build Processing`属性来禁用Naninovel的处理程序。