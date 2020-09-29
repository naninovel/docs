# Пользовательская cреда cборки

При сборке проекта с помощью [меню сборки](https://docs.unity3d.com/Manual/BuildSettings.html) в редакторе, Naninovel автоматически выполняет дополнительные процедуры пре- и пост-обработки. Эти процедуры, среди прочего, включают в себя обеспечение того, чтобы все ресурсы, назначенные через меню конфигурации Naninovel (например, документы сценариев, внешности персонажей, клипы BGM, SFX и т.д.), были включены в сборку.

В случае, если вы используете пользовательскую среду сборки (например, [Cloud Build](https://unity3d.com/unity/features/cloud-build) или запускаете сборку с помощью пользовательских скриптов или из командной строки) вы должны вручную вызвать статические методы `Naninovel.BuildProcessor.PreprocessBuild(BuildPlayerOptions)` и `Naninovel.BuildProcessor.PostprocessBuild()` до и после сборки соответственно.

Ниже приведен пример скрипта обработки пользовательских сборок Cloud Build, который вызывает необходимые методы обработки Naninovel. Обратитесь к [официальной документации](https://docs.unity3d.com/Manual/UnityCloudBuildPreAndPostExportMethods.html) для получения информации о том, как настроить сценарии обработки.

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

В случае, если вы используете собственный пользовательский обработчик сборки, который должен запускаться с помощью меню сборки редактора, можно отключить обработчик Naninovel, отключив свойство `Enable Build Processing` в меню конфигурации "Resource Provider".