# カスタムビルド環境

エディタの [ビルドメニュー](https://docs.unity3d.com/Manual/BuildSettings.html) を使用してプロジェクトをビルドする場合、Naninovelは追加の事前処理および事後処理手順を自動的に実行します。これらの手順により、Naninovelの構成メニュー（スクリプトドキュメント、キャラクターの外観、BGMおよびSFXクリップなど）を介して割り当てられたすべてのリソースがビルドに含まれるようになります。

カスタムビルド環境（[Cloud Build](https://unity3d.com/unity/features/cloud-build) など）を使用している場合、またはカスタムスクリプトやコマンドラインからビルドを開始する場合は、ビルドの前後に `Naninovel.BuildProcessor.PreprocessBuild(BuildPlayerOptions)` および `Naninovel.BuildProcessor.PostprocessBuild()` 静的メソッドを手動で呼び出す必要があります。

以下は、必要なNaninovel処理メソッドを呼び出すCloud Buildカスタムビルド処理スクリプトの例です。処理スクリプトの設定方法については、[公式サービスドキュメント](https://docs.unity3d.com/Manual/UnityCloudBuildPreAndPostExportMethods.html) を参照してください。

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

カスタムコマンドにアセンブリ定義を使用する場合、Unityエディタはすべてのアセンブリをコンパイルする前にアセットのインポートを開始し、Cloud Buildの使用時にビルドエラーが発生する可能性があります。これは、ビルドを開始する前にスクリプトアセットを再インポートすることで解決できます。例：

```csharp
var scriptGuids = AssetDatabase.FindAssets("t:Naninovel.script");
foreach (var scriptGuid in scriptGuids)
{
    var scriptPath = AssetDatabase.GUIDToAssetPath(scriptGuid);
    AssetDatabase.ImportAsset(scriptPath);
}
```

エディタのビルドメニューでトリガーされるはずの独自のカスタムビルドハンドラーを使用している場合は、Resource Provider構成メニューの `Enable Build Processing` プロパティをオフにして、Naninovelのハンドラーを無効にできます。プロパティを有効または無効にした後、変更を有効にするためにUnityエディタを再起動してください。
