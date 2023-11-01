# Custom Build Environment

When building the project using editor's [build menu](https://docs.unity3d.com/Manual/BuildSettings.html), Naninovel automatically executes additional pre- and post-processing procedures. Those procedures, among other things, include ensuring that all the resources assigned via Naninovel's configuration menus (eg, script documents, character appearances, BGM and SFX clips, etc) are included to the build.

In case you're using a custom build environment (eg, [Cloud Build](https://unity3d.com/unity/features/cloud-build) or starting the build via custom scripts or from the command line) you have to manually invoke `Naninovel.BuildProcessor.PreprocessBuild(BuildPlayerOptions)` and `Naninovel.BuildProcessor.PostprocessBuild()` static methods before and after the build respectively.

Below is an example of Cloud Build custom build processing script, which invokes the required Naninovel processing methods. Consult the [official service docs](https://docs.unity3d.com/Manual/UnityCloudBuildPreAndPostExportMethods.html) on how to setup the processing scripts.

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

When using assembly definitions for custom commands, Unity editor may start importing assets before compiling all the assemblies leading to build errors when using Cloud Build. This can be solved by reimporting the script assets before starting the build, eg:

```csharp
var scriptGuids = AssetDatabase.FindAssets("t:Naninovel.script");
foreach (var scriptGuid in scriptGuids)
{
    var scriptPath = AssetDatabase.GUIDToAssetPath(scriptGuid);
    AssetDatabase.ImportAsset(scriptPath);
}
```

In case you're using you own custom build handler, which supposed to be triggered with the editor's build menu, it's possible to disable the Naninovel's handler by disabling `Enable Build Processing` property in the "Resource Provider" configuration menu. When enabling or disabling the property, restart Unity editor in order for the change to take effect.
