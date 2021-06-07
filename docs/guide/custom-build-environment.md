# Custom Build Environment

When building the project using editor's [build menu](https://docs.unity3d.com/Manual/BuildSettings.html), Naninovel automatically executes additional pre- and post-processing procedures. Those procedures, among other things, include ensuring that all the resources assigned via Naninovel's configuration menus (eg, script documents, character appearances, BGM and SFX clips, etc) are included to the build.

In case you're using a custom build environment (eg, [Cloud Build](https://unity3d.com/unity/features/cloud-build) or starting the build via custom scripts or from the command line) you have to manually invoke `Naninovel.BuildProcessor.PreprocessBuild()` and `Naninovel.BuildProcessor.PostprocessBuild()` static methods before and after the build respectively.

Below is an example of Cloud Build custom build processing script, which invokes the required Naninovel processing methods. Consult the [official service docs](https://docs.unity3d.com/Manual/UnityCloudBuildPreAndPostExportMethods.html) on how to set up the processing scripts.

```csharp
public static class CloudBuildProcessor 
{
	#if UNITY_CLOUD_BUILD
    public static void PreExport (UnityEngine.CloudBuild.BuildManifestObject manifest)
    {
        Naninovel.BuildProcessor.PreprocessBuild();
    }
	#endif

    public static void PostExport (string exportPath)
    {
        Naninovel.BuildProcessor.PostprocessBuild();        
    }
}
```

In case you're using you own custom build handler, which supposed to be triggered with the editor's build menu, it's possible to disable the Naninovel's handler by disabling `Enable Build Processing` property in the "Resource Provider" configuration menu. When enabling or disabling the property, restart Unity editor in order for the change to take effect.
