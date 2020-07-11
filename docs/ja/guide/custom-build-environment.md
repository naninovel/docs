# カスタムビルド環境

エディターの [ビルドメニュー](https://docs.unity3d.com/Manual/BuildSettings.html) でプロジェクトをビルドすると、Naninovelは追加の前処理および後処理手順を自動的に実行します。これらの手順には、特に、Naninovelのコンフィグメニューで割り当てられたすべてのリソース（スクリプトドキュメント、キャラクターの外観、BGM、効果音など）がビルドに含まれていることを確認することが含まれます。

カスタムビルド環境をお使いの場合(たとえば [Cloud Build](https://unity3d.com/unity/features/cloud-build) や、カスタムスクリプトやコマンドラインからビルドする場合) は、ビルドの前後にそれぞれ手動で `Naninovel.BuildProcessor.PreprocessBuild(BuildPlayerOptions)` と `Naninovel.BuildProcessor.PostprocessBuild()` を呼び出す必要があります。

以下は、必要なNaninovel処理メソッドを呼び出す Cloud Build カスタムビルド処理スクリプトの例です。処理スクリプトの設定方法については、[公式サービスドキュメント](https://docs.unity3d.com/Manual/UnityCloudBuildPreAndPostExportMethods.html) をご覧ください。

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

エディターのビルドメニューでトリガーされる独自のカスタムビルドハンドラーを使用している場合は、"Resource Provider" コンフィグメニューの `Enable Build Processing` プロパティを無効にすることで、Naninovelのハンドラーを無効にすることができます。
