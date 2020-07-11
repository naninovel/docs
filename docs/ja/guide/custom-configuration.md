# カスタムコンフィグレーション

コンフィグレーションオブジェクトは、サービスやその他のエンジンシステムを初期化および構成するために使用されます。

デフォルトではコンフィグレーションオブジェクトは [scriptable object](https://docs.unity3d.com/Manual/class-ScriptableObject.html) としてシリアル化されており、`Assets/NaninovelData/Resources/Naninovel/Configuration` フォルダーにあります。 これらはUnityエディターで対応するコンフィグメニューを初めて開いたときに、自動的に生成されます。これらはUnityエディターで対応するコンフィグメニュー (`Naninovel -> Configuration`) を初めて開いたときに、自動的に生成されます。

C# でコンフィグレーションオブジェクトにアクセスするには、静的メソッド `Engine.GetConfiguration<T>()` を使います。`T` はアクセスしたいコンフィグレーションオブジェクトの名前です。以下の例は、[オーディオコンフィグ](/ja/guide/configuration.md#audio) オブジェクトへアクセスするデモです:

```csharp
var audioConfig = Engine.GetConfiguration<AudioConfiguration>();
```  

`Engine.GetConfiguration` メソッドはエンジンが初期化された時のみ使えます。実行時にカスタム配信シナリオを許可するエンジンを初期化するのに指定する [コンフィグレーションプロバイダー](/ja/guide/custom-configuration.md#コンフィグレーションプロバイダー) オブジェクトが必要なためです。デフォルトのプロバイダーを介して設定アセットにアクセスする場合は、エンジンが `ProjectConfigurationProvider` クラスで初期化されていなくても可能です。例:

```csharp
var audioConfig = ProjectConfigurationProvider.LoadOrDefault<AudioConfiguration>();
```

コンフィグレーションプロパティはエディターメニューから変更することを想定していますが、実行時に変更することも可能です。デフォルトのプロジェクトプロバイダーによって返されるオブジェクトは、プロジェクトに保存されている実際のアセットであることに注意してください。変更した場合、その変更はプレイモードセッションを通じて保持されます。これは、元のアセットを変更しないインスタンスである `Engine.GetConfiguration` メソッドで提供されるコンフィグレーションオブジェクトとは対照的です。

以下は、エンジンの初期化直後にカメラ設定オブジェクトの `ReferenceResolution` プロパティを変更する例です:

```csharp
using Naninovel;
using UnityEngine;

public static class ModifyConfigAtRuntime
{
    [RuntimeInitializeOnLoadMethod]
    private static void ModifyConfig ()
    {
        if (Engine.Initialized) OnInitializationFinished();
        else Engine.OnInitializationFinished += OnInitializationFinished;

        void OnInitializationFinished ()
        {
            Engine.OnInitializationFinished -= OnInitializationFinished;

            var cameraConfig = Engine.GetConfiguration<CameraConfiguration>();
            cameraConfig.ReferenceResolution = new Vector2Int(3840, 2160);
        }
    }
}
```

## コンフィグレーションの追加

新しいカスタムコンフィグレーションを追加するには、`Serializable` 属性を使用してC#クラスを作成し、それを `Configuration` から継承します。

```csharp
using Naninovel;
using UnityEngine;

[System.Serializable]
public class MyCustomConfiguration : Configuration
{
    [Header("My Custom Header 1")]
    [Tooltip("Tooltip for my custom string.")]
    public string MyCustomString = "Default value";
    [Range(0, 100), Tooltip("Tooltip for my custom float.")]
    public float MyCustomFloat = 10;

    [Header("My Custom Header 2")]
    public int[] MyCustomArray;
}
```

対応するメニューがプロジェクト設定に自動的に追加され、すべての組み込みメニューと同じようにカスタムコンフィグレーションアセットのプロパティを設定できます。

![](https://i.gyazo.com/c1163bba83f5d2b6286b100e837bca40.png)

C# でカスタムコンフィグレーションにアクセスするには、組み込みアセットの時と同じ API を使用してください:

```csharp
var myConfig = Engine.GetConfiguration<MyCustomConfiguration>();
```

::: example
カスタムコンフィグメニューを追加してインベントリシステムをセットアップする別の例は、[GitHubのインベントリサンプルプロジェクト](https://github.com/Elringus/NaninovelInventory) にあります。

具体的には、カスタムコンフィグレーションは [InventoryConfiguration.cs](https://github.com/Elringus/NaninovelInventory/blob/master/Assets/NaninovelInventory/Runtime/InventoryConfiguration.cs) ランタイムスクリプトを介して実装されます。
:::

## コンフィグレーションプロバイダー

実行時のコンフィグレーションオブジェクトの提供方法を変更することが可能です。たとえば、静的プロジェクトアセットの代わりに、リモートホストに保存されているJSONファイルから構成を読み取ることができます。

カスタムコンフィグレーションの提供方法を指定するには、C#クラスを作成し、`IConfigurationProvider` インターフェイスを実装します。インターフェースにはメソッドが1つだけあり、`Type` 引数を受け取り `Configuration` オブジェクトを返します。要求されたコンフィグレーションオブジェクトを作成および設定する方法はユーザー次第です。返されるオブジェクトのタイプが要求されたオブジェクトと同じであることを確認してください。

以下は、デフォルトのコンフィグレーションオブジェクトを返すだけのカスタムプロバイダー実装の例です:

```csharp
using Naninovel;
using UnityEngine;

public class CustomConfigurationProvider : IConfigurationProvider
{
    public Configuration GetConfiguration (System.Type type)
    {
        var defaultAsset = ScriptableObject.CreateInstance(type);
        return defaultAsset as Configuration;
    }
}
```

カスタムコンフィグレーションプロバイダーの準備ができたら、カスタムエンジン初期化スクリプトを作成して、組み込みプロバイダーの代わりにエンジンで使用できるようにする必要があります。デフォルトでは、エンジンは `Naninovel/Runtime/Engine/RuntimeInitializer.cs` を介して初期化されます。独自の初期化スクリプトを作成するときの参考として自由にお使いください。

単にカスタムコンフィグレーションプロバイダーを使用し、かつデフォルトのエンジン初期化ルーチンを維持したい場合は、コンフィグレーションプロバイダーの任意引数を受け入れる `RuntimeInitializer.InitializeAsync(IConfigurationProvider)` 静的メソッドの使用を検討してください:

```csharp
using Naninovel;
using UniRx.Async;
using UnityEngine;

public class CustomInitializer
{
    [RuntimeInitializeOnLoadMethod]
    private static void InitializeWithCustomProvider ()
    {
        var customProvider = new CustomConfigurationProvider();
        RuntimeInitializer.InitializeAsync(customProvider).Forget();
    }
}
```

初期化方法に関係なく、エンジンコンフィグメニューの`Initialize On Application Load` オプションを無効にすることを忘れないでください。デフォルトの初期化手順を無効にするためです。
