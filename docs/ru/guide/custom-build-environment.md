# Custom Build Environment

When building the project using editor's [build menu](https://docs.unity3d.com/Manual/BuildSettings.html), Naninovel automatically executes additional pre- and post-processing procedures. Those procedures, among other things, include ensuring that all the resources assigned via Naninovel's configuration menus (eg, script docuements, character appearances, BGM and SFX clips, etc) are included to the build.

In case you're using a custom build environment (eg, [Cloud Build](https://unity3d.com/unity/features/cloud-build) or starting the build via custom scripts or from the command line) you have to manually invoke `Naninovel.BuildProcessor.PreprocessBuild(BuildPlayerOptions)` and `Naninovel.BuildProcessor.PostprocessBuild()` static methods before and after the build respectively.

Below is an example of Cloud Build custom build processing script, which invokes the required Naninovel processing methods. Consult the [official service docs](https://docs.unity3d.com/Manual/UnityCloudBuildPreAndPostExportMethods.html) on how to setup the processing scripts.

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

In case you're using you own custom build handler, which supposed to be triggered with the editor's build menu, it's possible to disable the Naninovel's handler by disabling `Enable Build Processing` property in the "Resource Provider" configuration menu.
