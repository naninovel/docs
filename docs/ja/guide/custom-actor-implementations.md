# カスタムアクターの実装

アクターは、名前、外観、可視性、および変換（位置、回転、スケール）によって定義されるシーンエンティティです。外観、可視性、および変換を時間の経過とともに非同期に変更できます。アクターの例には、キャラクター、背景、テキストプリンター、選択肢ハンドラーなどがあります。

アクターは `IActor` インターフェイスとその派生物によって表されます。

* `ICharacterActor`
* `IBackgroundActor`
* `ITextPrinterActor`
* `IChoiceHandlerActor`

各アクターインターフェイスには複数の実装を含めることができます。たとえば、キャラクターアクターには現在、スプライト、ダイススプライト、汎用、レイヤー、ナレーター、Spine、Live2Dの7つの組み込み実装があります。

アクターの実装は、`Naninovel -> Configuration` コンテキストメニューからアクセスできる構成マネージャーで選択できます。すべてのアクターに使用されるデフォルトの実装を変更したり、アクターごとに特定の実装を設定したりできます。デフォルトの実装を変更するには `Default Metadata` プロパティを使用し、特定のものを設定するにはアクターの構成の `Implementation` ドロップダウンを使用します。

![](https://i.gyazo.com/74625fa24b58362de15bb8e07753824d.png)
![](https://i.gyazo.com/eeb42043eb9a841de003f8db848f1427.png)

Implementationドロップダウンには、特定のアクターインターフェイスを実装するすべてのタイプが含まれています。独自のカスタム実装を追加することもでき、それらもリストに表示されます。独自のアクター実装を作成する際の参考として、`Naninovel/Runtime/Actor` スクリプトを参照してください。アクターがシーンにスポーンされることが想定されている場合は、組み込みの抽象 `MonoBehaviourActor` 実装を使用して、ほとんどの基本インターフェイス要件を満たすことを検討してください。

カスタムアクター実装を作成するときは、互換性のあるパブリックコンストラクタがあることを確認してください。

```csharp
public ActorImplementationType (string id, ActorMetadata metadata) { }
```

— ここで `id` はアクターのIDであり、`metadata` はアクターのメタデータ（リソースにアクターレコードが存在する場合）またはデフォルトのメタデータのいずれかです。特定のアクターインターフェイスを実装する場合、対応する特定のメタデータ（たとえば、`ICharacterActor` 実装の場合は `CharacterMetadata`）を要求することができます。

::: tip EXAMPLE
すべての組み込みアクター実装は同じアクターAPIに基づいて作成されているため、独自の実装を追加する際の参考にすることができます。ソースはNaninovelパッケージの `Runtime/Actor` ディレクトリにあります。
:::

## アクターリソース

実装タイプに `ActorResources` 属性を適用して、カスタムアクターのリソースとして使用できるアセットと、エディタメニューで複数のリソースを割り当てることができるかどうかを指定します。複数のリソースが許可されていない場合（デフォルト）、アクターIDのみを指定して単一の利用可能なリソースをロードできます。例：

```csharp
var resource = await resourceLoader.Load(actorId);
```

複数のリソースが許可されている場合は、フルパスを指定します。たとえば、`CubeBackground` という名前のリソースを割り当てた場合：

![](https://i.gyazo.com/64ff6d6dede1cc8c2c3be83cfe6a6d74.png)

— リソースをロードするには、次を使用します：

```csharp
var resource = await resourceLoader.Load($"{actorId}/CubeBackground");
```

## カスタムメタデータ

（組み込みおよびカスタム実装の両方について）アクターメタデータにカスタムの追加データを追加することが可能です。

カスタムデータを挿入するには、新しいC#クラスを作成し、`CustomMetadata<TActor>` から継承します。ここで `TActor` は、データが関連付けられるアクター実装のタイプです。以下は、`CustomCharacterImplementation` のキャラクターにカスタムデータを追加する例です。

```csharp
using Naninovel;
using UnityEngine;

public class MyCharacterData : CustomMetadata<CustomCharacterImplementation>
{
    public int MyCustomInt;
    [Range(0f, 100f), Tooltip("Tooltip for my custom range.")]
    public float MyCustomRange = 50f;
    [ColorUsage(false, true)]
    public Color MyCustomColor = Color.white;
}
```

作成されたカスタムデータクラスのシリアル化可能なフィールドは、関連する実装を持つアクターが選択されたときに、Naninovelエディタメニューで自動的に公開されます。

![](https://i.gyazo.com/72f46feb74b6de568b299329500bd7d5.png)

実行時にカスタムデータにアクセスするには、`ActorMetadata` インスタンスの `GetCustomData<TData>()` メソッドを使用します。ここで `TData` はカスタムデータクラスのタイプです。例：

```csharp
var charsConfig = Engine.GetConfiguration<CharactersConfiguration>();
var myCharMeta = charsConfig.GetMetadataOrDefault("CharId");
var myCharData = myCharMeta.GetCustomData<MyCharacterData>();
Debug.Log(myCharData.MyCustomInt);
```

### カスタムメタデータエディタ

[プロパティドロワー](https://docs.unity3d.com/Manual/editor-PropertyDrawers.html) を介してカスタムメタデータエディタをカスタマイズすることが可能です。以下は、編集されたフィールドの上に余分なラベルを挿入するプロパティドロワーを追加する例です。

```csharp
// シリアル化されたフィールドに適用する属性を作成します。
// `PropertyAttribute` から継承することを忘れないでください。
public class ExtraLabelAttribute : PropertyAttribute
{
    public readonly string LabelText;

    public ExtraLabelAttribute (string labelText)
    {
        LabelText = labelText;
    }
}

// 影響を受けるフィールドを描画するときに使用されるカスタムエディタを作成します。
// `UnityEditor` APIを使用するため、スクリプトは `Editor` フォルダ内にある必要があります。
[CustomPropertyDrawer(typeof(ExtraLabelAttribute))]
public class ExtraLabelPropertyDrawer : PropertyDrawer
{
    public override void OnGUI (Rect rect, SerializedProperty prop, GUIContent label)
    {
        var extraLabelAttribute = attribute as ExtraLabelAttribute;

        rect.height = EditorGUIUtility.singleLineHeight;
        EditorGUI.LabelField(rect, extraLabelAttribute.LabelText);

        rect.y += EditorGUIUtility.singleLineHeight +
                  EditorGUIUtility.standardVerticalSpacing;
        EditorGUI.PropertyField(rect, prop);
    }

    public override float GetPropertyHeight (SerializedProperty prop, GUIContent label)
    {
        return EditorGUIUtility.singleLineHeight * 2 +
               EditorGUIUtility.standardVerticalSpacing;
    }
}

// これで、属性を使用してシリアル化されたフィールドに追加のラベルを適用できます。
public class MyCharacterData : CustomMetadata<CustomCharacterImplementation>
{
    [ExtraLabel("Text from my custom property drawer")]
    public string MyCustomProperty;
}
```

上記の実装を前提として、カスタムキャラクターデータは次のように描画されます。

![](https://i.gyazo.com/294a9e2812d33ea3c863f9f53906b327.png)

::: tip
組み込み構成エディタ全体をオーバーライドすることも可能です。詳細と例については、[カスタムコンフィグレーション](/ja/guide/custom-configuration#組み込みエディタのオーバーライド) ガイドを参照してください。
:::

## カスタムステート

カスタムアクターの状態タイプをオーバーライドまたは拡張するには、状態がそこでシリアル化され、管理対象のアクターに適用されるため、[アクターのマネージャーもオーバーライド](/ja/guide/engine-services#組み込みサービスのオーバーライド) する必要があります。

::: info NOTE
これは、組み込みの `IActor` インターフェイス派生物（キャラクター、背景、テキストプリンター、および選択肢ハンドラー）の1つのカスタムアクター実装に適用されます。カスタムアクターを `IActor` から直接継承した場合は、カスタム状態を使用するために組み込みマネージャーをオーバーライドする必要はありません。独自のものを作成するだけです。

他のシステム（例：Naninovel外部のさまざまなゲームメカニクスのためのUI、ゲームオブジェクト、またはコンポーネント）にカスタム状態を追加する場合は、[状態管理ガイド](/ja/guide/state-management#カスタムステート) を参照してください。
:::

以下は、最後に追加された選択肢の時間を格納する `LastChoiceTime` フィールドを追加して選択肢ハンドラーの状態を拡張する例です。時間は、カスタム選択肢ハンドラーが表示されたときにコンソールに出力されます。

```csharp
// 最後の選択時間をシリアル化する拡張状態。
public class MyChoiceHandlerState : ChoiceHandlerState
{
    // このフィールドはシリアル化可能であり、ゲームのセーブ/ロードを通じて持続します。
    public string LastChoiceTime;

    // このメソッドはゲームを保存するときに呼び出されます。
    // アクターから必要なデータを取得し、シリアル化可能なフィールドに保存します。
    public override void OverwriteFromActor (IChoiceHandlerActor actor)
    {
        base.OverwriteFromActor(actor);
        if (actor is MyCustomChoiceHandler myCustomChoiceHandler)
            LastChoiceTime = myCustomChoiceHandler.LastChoiceTime;
    }

    // このメソッドはゲームをロードするときに呼び出されます。
    // シリアル化されたデータを取得し、アクターに適用します。
    public override void ApplyToActor (IChoiceHandlerActor actor)
    {
        base.ApplyToActor(actor);
        if (actor is MyCustomChoiceHandler myCustomChoiceHandler)
            myCustomChoiceHandler.LastChoiceTime = LastChoiceTime;
    }
}

// 最後の選択時間を使用するカスタム選択肢ハンドラー実装。
public class MyCustomChoiceHandler : UIChoiceHandler
{
    public string LastChoiceTime { get; set; }

    public MyCustomChoiceHandler (string id, ChoiceHandlerMetadata metadata)
        : base(id, metadata) { }

    public override void AddChoice (ChoiceState choice)
    {
        base.AddChoice(choice);
        LastChoiceTime = DateTime.Now.ToShortTimeString();
    }

    public override Awaitable ChangeVisibility (bool visible, float duration,
        EasingType easingType = default, AsyncToken token = default)
    {
        Debug.Log($"Last choice time: {LastChoiceTime}");
        return base.ChangeVisibility(visible, duration, easingType, token);
    }
}

// 拡張状態を使用するように組み込み選択肢ハンドラーマネージャーをオーバーライドします。
// 重要なステップは、ジェネリックタイプで `MyChoiceHandlerState` を指定することです。
// 他の変更は、インターフェイス要件を満たすためのものです。
[InitializeAtRuntime(@override: typeof(ChoiceHandlerManager))]
public class MyChoiceHandlerManager : ActorManager<IChoiceHandlerActor,
    MyChoiceHandlerState, ChoiceHandlerMetadata,
    ChoiceHandlersConfiguration>, IChoiceHandlerManager
{
    public MyChoiceHandlerManager (ChoiceHandlersConfiguration config)
        : base(config) { }

    public Awaitable<IChoiceHandlerActor> AddActor (string actorId,
        ChoiceHandlerState state)
    {
        return base.AddActor(actorId, state as MyChoiceHandlerState);
    }

    ChoiceHandlerState IActorManager<IChoiceHandlerActor,
        ChoiceHandlerState, ChoiceHandlerMetadata,
        ChoiceHandlersConfiguration>.GetActorState (string actorId)
    {
        return base.GetActorState(actorId);
    }
}
```

カスタム選択肢ハンドラーは、最後に追加された選択肢の時間を保持し、最後の選択肢がセーブスロットからロードされた以前のゲームセッションで追加された場合でも、コンソールにログ出力します。この方法で、組み込みのアクター状態に加えて任意の量のカスタムデータを保存できます。サポートされているシリアル化可能なデータ型については、[Unityのシリアル化ガイド](https://docs.unity3d.com/Manual/script-Serialization.html) を参照してください。
