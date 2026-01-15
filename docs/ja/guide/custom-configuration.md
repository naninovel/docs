# カスタムコンフィグレーション

構成オブジェクトは、サービスやその他のエンジンシステムを初期化および構成するために使用されます。

デフォルトでは、構成オブジェクトはScriptableObjectアセットとしてシリアル化され、プロジェクトの `NaninovelData/Resources/Naninovel/Configuration` に保存されます。Unityエディタで対応する構成メニュー（`Naninovel -> Configuration`）を初めて開いたときに、アセットが自動的に生成されます。

C#を介して構成オブジェクトにアクセスするには、`Engine.GetConfiguration<T>()` を使用します。ここで `T` は、アクセスする構成オブジェクトのタイプです。たとえば、次は [オーディオ構成](/ja/guide/configuration#オーディオ) オブジェクトにアクセスする方法を示しています。

```csharp
var audioConfig = Engine.GetConfiguration<AudioConfiguration>();
```

::: info NOTE
エンジンの初期化手順は非同期であるため、自動初期化が有効になっている場合でも、Unityがシーンをロードした直後（たとえば、`Awake`、`Start`、`OnEnable` [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html) メソッド内）にエンジンAPI（`GetConfiguration` など）が利用できない場合があります。詳細については、[エンジンAPIへのアクセス](/ja/guide/integration-options#エンジンapiへのアクセス) を参照してください。
:::

`Engine.GetConfiguration` はエンジンが初期化されている必要がありますが（構成プロバイダーに依存します）、エンジンが初期化されていない場合でも、デフォルトのプロバイダーを介して直接構成アセットにアクセスできます。例：

```csharp
var config = ProjectConfigurationProvider.LoadOrDefault<AudioConfiguration>();
```

構成オブジェクトはエディタメニューを介して変更することを意図していますが、実行時に変更することも可能です。デフォルトのプロジェクトプロバイダーによって返されるオブジェクトは、プロジェクトに保存されている実際のアセットであることに注意してください。プレイモードで変更すると、アセットへの変更が保持されます。これは、ランタイムインスタンスであり元のアセットを変更しない `Engine.GetConfiguration` によって返されるインスタンスとは異なります。

以下は、エンジンの初期化直後にカメラ構成の `ReferenceResolution` プロパティを変更する例です。

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

::: info NOTE
Naninovelは、エンジンの初期化中に構成が変更されることを想定していないため、一部の変更を有効にするには、`ProjectConfigurationProvider` または [カスタムプロバイダー](/ja/guide/custom-configuration#構成プロバイダー) を使用してエンジンを初期化する前に変更を適用する必要がある場合があります。
:::

## 構成の追加

新しいカスタム構成を追加するには、`Configuration` を継承するC#クラスを作成します。

```csharp
[EditInProjectSettings]
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

`EditInProjectSettings` 属性に注意してください。属性が適用されると、関連するエディタメニューがプロジェクト設定に自動的に追加され、組み込みメニューと同様にカスタム構成アセットのシリアル化可能なプロパティを変更できます。

![](https://i.gyazo.com/c1163bba83f5d2b6286b100e837bca40.png)

C#を介してカスタム構成にアクセスするには、組み込みアセットと同じAPIを使用します。

```csharp
var myConfig = Engine.GetConfiguration<MyCustomConfiguration>();
```

::: tip EXAMPLE
インベントリシステムをセットアップするためのカスタム構成メニューを追加する別の例は、[インベントリサンプル](/ja/guide/samples#インベントリ) にあります。具体的には、カスタム構成は `Scripts/Runtime/Inventory/InventoryConfiguration.cs` に実装されています。
:::

カスタム構成のエディタ動作をカスタマイズするには（Naninovelのプロジェクト設定で描画される場合）、エディタスクリプトの下にクラスを作成し、`ConfigurationSettings<T>` を継承します。ここで `T` はカスタム構成タイプです。独自のエディタを作成する際の参考として、`Naninovel/Editor/Settings` に保存されている組み込み設定エディタスクリプトを使用できます。

## 組み込みエディタのオーバーライド

`OverrideSettings` 属性を `ConfigurationSettings<T>`（またはその派生クラス）から継承したエディタクラスに適用することで、組み込み構成エディタ（Naninovelのプロジェクト設定メニュー）をオーバーライドできます。ここで `T` は構成タイプです。カスタムエディタスクリプトを `Editor` フォルダの下に保存して、エディタアセンブリに含まれるようにします。

以下は、組み込みのキャラクターマネージャー構成エディタをオーバーライドする例です。新しいエディタは、`Shared Poses` フィールドの下に共有ポーズの総数を示すラベルを追加します。

```csharp
[OverrideSettings]
public class CustomCharacterSettings : CharactersSettings
{
    protected override Dictionary<string, Action<SerializedProperty>>
        OverrideConfigurationDrawers ()
    {
        var drawers = base.OverrideConfigurationDrawers();
        drawers[nameof(CharactersConfiguration.SharedPoses)] = property => {
            ActorPosesEditor.Draw(property);
            EditorGUILayout.LabelField(
                $"Number of shared poses is {property.arraySize}.");
        };
        return drawers;
    }
}
```

上記のエディタを使用すると、キャラクター構成は次のように描画されます。

![](https://i.gyazo.com/5555e8c3eb33c3783bef8ef852a7e765.png)

組み込みのアクターメタデータエディタをオーバーライドすることもできます。以下は、検査されたアクターの `Message Color` フィールドの下に、その色の名前を含むラベルを挿入します。

```csharp
[OverrideSettings]
public class CustomCharacterSettings : CharactersSettings
{
    protected override MetadataEditor<ICharacterActor,
        CharacterMetadata> MetadataEditor { get; } = new MetaEditor();

    private class MetaEditor : CharacterMetadataEditor
    {
        protected override Action<SerializedProperty>
            GetCustomDrawer (string propertyName)
        {
            if (propertyName == nameof(CharacterMetadata.MessageColor))
                return property => {
                    EditorGUILayout.PropertyField(property);
                    EditorGUILayout.LabelField($"Message color of " +
                        "'{Metadata.DisplayName}' is '{property.colorValue}'.");
                };
            return base.GetCustomDrawer(propertyName);
        }
    }
}
```

— 結果は次のようになります。

![](https://i.gyazo.com/60abbf6b773b6c66cf138ac40882b1c1.png)

## 構成プロバイダー

実行時に構成オブジェクトを提供する方法を変更できます。たとえば、静的なプロジェクトアセットの代わりに、リモートホストに保存されたJSONファイルから構成を読み取ることができます。

カスタム構成提供シナリオを指定するには、`IConfigurationProvider` を実装するC#クラスを作成します。インターフェイスには、`Type` 引数を予期し、`Configuration` オブジェクトを返すメソッドが1つあります。要求された構成オブジェクトをどのように構築して設定するかはあなた次第です。返されるオブジェクトのタイプが要求されたものと一致することを確認してください。

以下は、デフォルトの構成オブジェクトを返すカスタムプロバイダー実装の例です。

```csharp
public class CustomConfigurationProvider : IConfigurationProvider
{
    public Configuration GetConfiguration (System.Type type)
    {
        var defaultAsset = ScriptableObject.CreateInstance(type);
        return defaultAsset as Configuration;
    }
}
```

実行時にメタデータを注入するためにプロジェクトのキャラクター構成をオーバーライドする別の例：

```csharp
public class CustomConfigurationProvider : ProjectConfigurationProvider
{
    public override Configuration GetConfiguration (System.Type type)
    {
        // キャラクター以外のすべてのプロジェクト構成をそのまま返します。
        if (type != typeof(CharactersConfiguration))
            return base.GetConfiguration(type);

        // キャラクターのメタデータを注入（またはオーバーライド）します。
        // 実際のデータは実行時に外部ソースを介して取得できます。
        var charsConfig = (CharactersConfiguration)base.GetConfiguration(type);
        charsConfig.Metadata["NewCustomChar"] = new CharacterMetadata {
            Implementation = typeof(NarratorCharacter).AssemblyQualifiedName,
            DisplayName = "Custom Narrator",
            UseCharacterColor = true,
            MessageColor = Color.cyan,
            // など...
        };

        // 変更されたキャラクター構成を返します。
        return charsConfig;
    }
}
```

カスタム構成プロバイダーの準備ができたら、カスタムエンジン初期化スクリプトを作成して、組み込みのものの代わりにそれを使用するようにエンジンに指示します。デフォルトでは、エンジンは `Naninovel/Runtime/Engine/RuntimeInitializer.cs` を介して初期化されます。参考として自由に使用してください。

あるいは、カスタム構成プロバイダーを使用するだけで、デフォルトのエンジン初期化ルーチンを維持したい場合は、オプションの構成プロバイダー引数を受け入れる `RuntimeInitializer.Initialize(IConfigurationProvider)` を検討してください。

```csharp
public class CustomInitializer
{
    [RuntimeInitializeOnLoadMethod]
    private static void InitializeWithCustomProvider ()
    {
        var customProvider = new CustomConfigurationProvider();
        RuntimeInitializer.Initialize(customProvider).Forget();
    }
}
```

どちらの初期化方法を選択しても、デフォルトの初期化手順を防ぐために、エンジン構成メニューで `Initialize On Application Load` を無効にしてください。
