# サンプル

Naninovelパッケージには、ビジュアルノベルとダイアログモードのシナリオを使い始めるのに役立ついくつかの [必須サンプル](/ja/guide/getting-started#デモサンプル) がすでに含まれていますが、一般的な開発ユースケースを示すための追加の専門的なサンプルコレクションも提供されています。これらのサンプルにアクセスする方法と、それぞれの簡単な説明については、以下をお読みください。

## サンプルへのアクセス

高度なサンプルは [エンジンのモノレポ](https://github.com/naninovel/engine/tree/stable/unity/samples) でホストされています。リポジトリにアクセスするには、[Naninovelライセンスを登録](https://naninovel.com/register) し、ダッシュボードの指示に従ってGitHubユーザーを割り当ててください。アクセス権を取得したら、リポジトリを [クローン](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) するか、[ダウンロード](https://github.com/naninovel/engine/archive/refs/heads/stable.zip) してください。

ダウンロードしたリポジトリを解凍し、Unityエディタで `unity/samples` ディレクトリを開きます。NaninovelはPackage Managerでローカルパッケージとして参照されます。ローカルパッケージソースは、Unity拡張機能のソースコードを含む `unity/client` を指しています。サンプルで使用される他のサードパーティパッケージは、便宜上プロジェクトに埋め込まれています。

![](https://i.gyazo.com/aa784d89f6a55576b745824c2f6fd537.png)

Unityエディタに入ったら、`Assets/Scenes/Main.unity` シーンを開き、プレイモードに入ります。[デモプロジェクト](https://naninovel.com/demo) のタイトル画面が表示されます。デモを開始するか、「SAMPLES」ボタンをクリックして、以下に概説する利用可能なサンプルに移動できます。

![](https://i.gyazo.com/f7304c828ff616f2d9a979d2452413a4.png)

## Addressable

このサンプルは、[Addressableプロバイダー](/ja/guide/resource-providers.html#addressable) を使用して（リソースエディタメニューを使用せずに）Naninovelリソースを手動で登録し、リモートホストからアセットを提供する方法を示しています。

サンプルプロジェクトのリソースのほとんどは、リソースマネージャーメニューで割り当てられていないことに注意してください。

![](https://i.gyazo.com/8c1b37362bf58d26f18e4e61ffe2957c.png)

—それでも、シナリオスクリプトでは同じ方法でアクセスできます。

```nani
@back Snow
```

これは、アセットにNaninovelリソースアドレスとラベルが割り当てられているために機能します。

![](https://i.gyazo.com/81e59da9ba85c90f3d59b84573f7facf.png)

## Perspective Scene

このサンプルは、複数のアニメーション環境スプライト、パースペクティブモードでのカメラレンダリング、およびボケ（被写界深度）効果で満たされた汎用背景を示しています。背景は `Content/Backgrounds/Perspective` ディレクトリに保存されています。

![](https://i.gyazo.com/610d2cafe5fbe42aba7adb9ac71720d1.mp4)

## コンパイラのローカライズ

サンプルプロジェクトでコンパイラのローカライズを有効にするには、`Scripts` 構成の `Compiler Localization` フィールドに `Profiles/Naninovel/CompilerRU` アセットを割り当てます。その後、UnityエディタとVS Code拡張機能を再起動します。これで、VS Codeでプロジェクトを開き、`Compiler Localization` サンプルシナリオを実行できます。

![](https://i.gyazo.com/fde9998597ffedb8a025401bb2f71ce9.png)

## E2E

`E2E Tests` サンプルは、[自動化されたエンドツーエンドテスト](/ja/guide/automated-testing) スイートをセットアップし、利用可能なAPIのほとんどを使用する方法を示しています。

テストスクリプトは `Scripts/E2E` フォルダの下に保存されています。フォルダに配置された `.asmdef` ファイルに注意してください。これは、Unityテスト環境でテストソースをコンパイルするために必要です。また、`Packages/manifest.json` ファイルの `testables` エントリにも注意してください。これにより、テストアセンブリがUnityのテストランナーに公開されます。

![](https://i.gyazo.com/92e7eaf5725f098d6d12c83a2b7eb219.png)

## ジェネリックアクター

`Content/Backgrounds/Beach`、`Content/Backgrounds/Perspective` [汎用背景](/ja/guide/backgrounds#汎用背景) および `Content/Characters/Kohaku/K3D` [汎用キャラクター](/ja/guide/characters#汎用キャラクター) を見つけて、UnityのAnimatorで作成された3Dモデルとアニメーションを使用して汎用アクター実装をセットアップおよび使用する方法を確認してください。

![](https://i.gyazo.com/009900b179f3130f45824e22094e7884.gif)

## 入力リバインド

ドキュメント: https://naninovel.com/guide/input-processing.html#input-system

プレイヤーがデフォルトのコントロールを変更できるようにする入力リバインドUIの例は、`Content/UI/InputRebind` フォルダにあります。これは、Input Systemパッケージにバンドルされている「Rebind UI」サンプルに基づいています。詳細については、[Unityドキュメント](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.1/manual/ActionBindings.html#interactive-rebinding) を参照してください。

![](https://i.gyazo.com/eba8d2ce2dabfbe41cc0df238ad8ad99.png)

## インテグレーション

3Dアドベンチャーゲームの組み込みダイアログシステムと、切り替え可能なスタンドアロンノベルモードの両方として使用されるNaninovelを示すサンプルプロジェクト。

![](https://i.gyazo.com/b1b6042db4a91b3a8cee74236b33c17c.mp4)

すべてのプロジェクト固有のサンプルスクリプトは `Scripts/Runtime/Integration` フォルダに保存されています。

Naninovelは、`Integration` シーンにある `SetupGame` GameObjectにアタッチされた `SetupGame.cs` スクリプトを介して手動で初期化されます（エンジン構成メニューで自動初期化が無効になっています）。

トリガーのコンポーネントとして使用される `DialogueTrigger.cs` スクリプトは、プレイヤーがトリガーコライダーに当たったときにダイアログモードに切り替えます。

`SwitchToNovelMode.cs` カスタムコマンドは、C#とシナリオスクリプトの両方からノベルモードに切り替えるために使用されます。

`SwitchToAdventureMode.cs` カスタムコマンドは、ノベルモードからアドベンチャーモードに戻すために使用されます。

## インベントリ

インベントリシステムはビジュアルノベルの範囲外ですが、統合方法に関する多くのリクエストや質問を受け取りました。インベントリサンプルは、エンジンのソースコードを変更せずにNaninovelインストールの上にセットアップできるインベントリ拡張機能を作成および統合する例です。

::: info NOTE
インベントリはスタンドアロン製品ではなく、Naninovelの一部でもありません。エンジンを拡張およびカスタマイズする方法を学ぶために使用してください。ただし、インベントリシステムの実用的なソリューションであるとは期待しないでください。探している場合は、[Asset Storeを確認する](https://assetstore.unity.com/?q=inventory) か、ゼロからカスタムのものを作成してください。
:::

このサンプルプロジェクトは、グリッドレイアウト、ページネーション、ドラッグアンドドロップウィンドウを備えたカスタムインベントリUIの作成方法、カスタムエンジンサービスと関連する構成メニューの追加、入力バインディングの追加、状態のアウトソーシングの使用、カスタムシナリオコマンドと式関数の作成方法を示しています。

![](https://i.gyazo.com/86c577f007daf4ec5d79c0e91db7bc10.mp4)

テンプレートから既製のインベントリUIを作成するには、`Create -> Naninovel -> Inventory -> Inventory UI` アセットコンテキストメニューを使用します。次に、エディタで `Naninovel -> Resources -> UI` を介してプレハブをNaninovel UIリソースに追加します。追加されると、UIは他のすべてのUIと同様に、[@showUI] および [@hideUI] コマンドで表示/非表示にできます。

Inventory UIコンポーネントには `Capacity` プロパティがあり、インベントリのスロット数を変更できます。スロットグリッドは、`Content/InventoryGrid` GameObjectを介して構成されます（スロット数とレイアウト、ページごとのスロットなど）。ウィンドウのドラッグアンドドロップ動作は、`Content` GameObjectにアタッチされた `Drag Drop` コンポーネントを介して構成（または無効化）できます。

インベントリアイテムプレハブは、`Create -> Naninovel -> Inventory -> Inventory Item` アセットコンテキストメニューを使用して作成できます。次に、アイテムプレハブをエディタで `Naninovel -> Resources -> Inventory` を介してインベントリリソースとして割り当てる必要があります。

![](https://i.gyazo.com/6062f8a433a47306f582a849c7bbf57e.png)

アイテムが多く、エディタメニューから割り当てるのが不便な場合は、`Resources/Naninovel/Inventory` フォルダにドロップすると、自動的にエンジンに公開されます。さらにサブフォルダで整理することもできます。この場合、シナリオスクリプトで参照するときはスラッシュ（`/`）を使用します。たとえば、`Resources/Naninovel/Inventory/Armor/FullPlate.prefab` として保存されているアイテムは、スクリプトで `Armor/FullPlate` として参照できます。

[Addressable Asset System](/ja/guide/resource-providers#addressable) を使用してリソースを手動で公開することも可能です。アセットを公開するには、上記の方法で使用するパスと同じアドレスを割り当てますが、`Resources/` 部分は省略します。たとえば、`FullPlate.prefab` アイテムを公開するには、プレハブにアドレス `Naninovel/Inventory/FullPlate` を割り当てます。Addressableプロバイダーはデフォルトではエディタで使用されないことに注意してください。リソースプロバイダー構成メニューで `Enable Addressable In Editor` プロパティをオンにすることで有効にできます。

各アイテムには、単一のインベントリスロットにスタックできるこのタイプのアイテムの数を制限する `Stack Count Limit` プロパティと、アイテムが使用されたとき（`@useItem` コマンドを介して、またはユーザーがインベントリ内のアイテムをクリックしたとき）に呼び出される `On Item Used` Unityイベントがあります。以下は、`Play Script` コンポーネントを使用してイベントを設定し、アイテムが使用されたら削除し、グリッチ特殊効果を生成し、テキストメッセージを表示する例です。

![](https://i.gyazo.com/010a9ba35db607ba46d78eda3513f678.png)

`@addItem` コマンドを使用してインベントリにアイテムを追加し、`@removeItem`（または `@removeItemAt`、`@removeAllItems`）を使用して削除できます。アイテムIDはアイテムプレハブ名と同じです。インベントリスロットIDはグリッドスロットインデックスと同じです（例：最初のスロットは0、2番目は1など）。

アイテムがインベントリに存在するかどうかを確認し、既存のアイテムの数を取得するための `itemExist()` および `itemCount()` カスタム [式関数](/ja/guide/script-expressions#式関数) も便利です。

以下はサンプルプロジェクトのスクリプトです。

```nani
# Start

Select an action.[>]

@choice "Pick up sword" lock:itemExist("Sword")
    @addItem Sword
@choice "Pick up armor" lock:itemExist("Armor")
    @addItem Armor
@choice "Adventure awaits, venture forth!"

# Adventure

@if itemExist("Sword")
	@set monstersSlayed={ itemExist("Armor") ? random(3,5) : 2 }
	@addItem Food amount:{monstersSlayed}
	You've encountered and slayed {monstersSlayed} monsters with your sword.
	@goto #Start
@else
	But you don't have a weapon! You've been beaten by the monsters.
	@goto #Start
```

## Live2D

サンプルは、NaninovelでLive2Dキャラクターを使用する方法を示しています。`Content/Characters/Hiyori` および `Content/Characters/Senko` ディレクトリで見つけてください。

![](https://i.gyazo.com/b81df72fc7afaed569520496cbee09f0.mp4)

## ローカライズ

 - 生成されたローカライズドキュメントは `Profiles/Naninovel/Resources/Naninovel/Localization` ディレクトリに保存されます。
 - 生成されたシートは、サンプルプロジェクトルートの下の `Sheets` ディレクトリに保存されます。
 - ローカライズ固有のフォントは `Profiles/Naninovel/Resources/Naninovel/Fonts` に保存されます。

ローカライズツール用に選択されたフォルダ：

| フォルダ | パス |
|------------------------|------------------------------------------------------------|
| Script Folder (input) | Assets/Scripts/Scenario |
| Text Folder (input) | Assets/Profiles/Naninovel/Resources/Naninovel/Text |
| Locale Folder (output) | Assets/Profiles/Naninovel/Resources/Naninovel/Localization |

スプレッドシートツール用に選択されたフォルダ：

| フォルダ | パス |
|---------------------------|------------------------------------------------------------|
| Input Scripts Folder | Assets/Scripts/Scenario |
| Input Text Folder | Assets/Profiles/Naninovel/Resources/Naninovel/Text |
| Input Localization Folder | Assets/Profiles/Naninovel/Resources/Naninovel/Localization |
| Output Folder | Sheets |

![](https://i.gyazo.com/97d232751dd7e97bc828f3521f1d2066.mp4)

## マップ

このサンプルは、C#スクリプトなしでインタラクティブマップを実装する方法を示しています。

![](https://i.gyazo.com/f93f0e73389934bf25226f4000e437eb.gif)

マップは `Content/UI/Map` に保存されたカスタムUIとして実装されています。場所はUIに配置された通常のUnityボタンです。

![](https://i.gyazo.com/f421eaf666c9d84b04d23a72d1259f47.png)

ボタンのクリックおよびホバーイベントは、Naninovelの [Play Script](https://naninovel.com/guide/gui.html#play-script-on-unity-event) コンポーネントによって処理されます。

![](https://i.gyazo.com/a64ee9beee378c687d0d8093334f4ef7.png)

場所の可用性は、ボタンにアタッチされた [Variable Events](https://naninovel.com/guide/custom-variables.html#variable-events) コンポーネントで制御されます。

## RTL

RTLプリンターは `Content/Printers/RTL` に保存されています。

![](https://i.gyazo.com/7b582e4ae76c6fd62170e00dd3874ff7.png)

## アクターシェーダー

この例は、カスタムトランジションエフェクトを追加するためのテクスチャシェーダーと、ライティングおよび自己照明をサポートするスプライトシェーダーを作成および使用する方法を示しています。後者は、背景アクターの時刻をシミュレートするために使用されます。

![](https://i.gyazo.com/a9d7fb29d5e076245ac515d673cc155e.mp4)

カスタムシェーダーは `Scripts/Shaders` ディレクトリに保存されています。

背景テクスチャには、アルファレイヤーに保存された自己照明マスクがあり、カスタムシェーダーがグローバルライトを無視しながら発光すべき領域を評価するために使用されます。

時刻は `Scripts/Runtime/Shader/TimeOfDay.cs` で制御され、24時間の任意の時点でライトの色と放射強度を構成できます。

![](https://i.gyazo.com/b58cb70a522b9085cedb796249557df5.png)

コンポーネントAPIは `Scripts/Runtime/Shader/SetHour.cs` カスタムコマンドを介してシナリオスクリプトに公開されており、`@hour` コマンドで時間を設定できます。例：

```nani
; 現在の時刻を3秒かけて18:00 (午後6時) に設定します。
@hour 18 duration:3
```

## Spine

サンプルは、NaninovelでSpineキャラクターを使用する方法を示しています。`Content/Characters/Spine` ディレクトリで見つけてください。

![](https://i.gyazo.com/08b04de115d97427d152cb5f37065d2d.mp4)

## UI

サンプルには、新しいカスタムおよび変更された組み込みUIの次の例が含まれています。

- タイトル画面

![](https://i.gyazo.com/e76a9a339535da4e34dfcc376ebfbf41.png)

- 音楽ギャラリー

![](https://i.gyazo.com/68eabcbd6538d166c0e6eca58dd8f87b.png)

- クレジット

![](https://i.gyazo.com/40bb59cf450fc129f80830aa411c3b14.png)

- チャットプリンターのタイムスタンプ

![](https://i.gyazo.com/770a7e9d9d021f8013f7ce139c80992b.png)

- カスタム選択肢ハンドラー

![](https://i.gyazo.com/aab6a99a12a3e31f775a4f121cdc213a.png)

- 表示されるメッセージ内の絵文字

![](https://i.gyazo.com/e3bc62957204c0fba91e879470d0e181.png)

- 表示されるメッセージ内のフォントバリアント

![](https://i.gyazo.com/fd203a98efc513e6bf1020f1978d57eb.png)

- カレンダー

![](https://i.gyazo.com/1666b02675d34dcd5ea4e42dae81b416.png)

すべてのサンプルUIは `Content/UI` に保存されています。

## レイヤーアクター

`Content/Characters/Miho` ディレクトリにあるレイヤーキャラクターと、`Content/Backgrounds/Particles` にあるカメラレンダリングモードで設定されたレイヤー背景を見つけてください。

## ダイスアクター

`Content/Characters/Kohaku/Diced` にあるダイスキャラクターとアトラスを見つけてください。

## ビデオアクター

ビデオ背景は `Content/Backgrounds/Video` ディレクトリに保存されており、ビデオアクターは `Content/Characters/Ball` ディレクトリにあります。

## シーン背景

`Content/Backgrounds/Scene` ディレクトリにあるシーン背景を見つけてください。

## トランジションエフェクト

`Scripts/Scenario/Transitions` シナリオスクリプトで、すべての利用可能なトランジションエフェクトが順番に適用されるデモを見つけてください。

## オートボイス

ENおよびJAロケールのボイスクリップは `Content/Audio/Voice` の下に保存されています。

"AUTO VOICING" サンプルに入り、ゲーム設定で音声言語を切り替えてみてください。

## ミュージックイントロ

トラックのベース部分をループする前にイントロ部分を1回再生するように、[@bgm] コマンドの `intro` パラメータを使用する方法を示します。

## 背景のマッチング

背景マッチング機能のデモ。アスペクト比の異なる背景を表示ビューポートに一致させる方法を示しています。

## ビジュアルスクリプティング

[Visual Scripting](https://docs.unity3d.com/Packages/com.unity.visualscripting@latest)（以前はBoltと呼ばれていました）は、Unity 2021.2以降にデフォルトでバンドルされている組み込みパッケージです。プログラマーも非プログラマーもコードを書かずに使用できるユニットベースのグラフを使用して、ゲームやアプリケーションのロジックを作成できます。

![](https://i.gyazo.com/ab7c9d92b32810b030aba24b4bd95405.jpg)

まず、互換性のあるUnityバージョン（2021.2以降）を使用していること、および `Visual Scripting` パッケージがPackage Managerにインストールされていることを確認してください。

![](https://i.gyazo.com/885ebb9808b369c30dfcaab19b0cee2f.png)

Visual Scriptingプロジェクト設定にある `Node Library` リストに `Elringus.Naninovel.Runtime` ライブラリを追加します。これは、エンジンの型とAPIをビジュアルスクリプティンググラフに公開するために必要です。

![](https://i.gyazo.com/38afd2ea477fcf0921114e3847de6c85.png)

Visual Scriptingは、ライブラリから使用可能なすべての型を自動的に公開しないため、同じ設定メニューの `Type Options` リストに必要なNaninovel型を追加します。以下の例では、`Engine`、`Script Player Interface`、および `Script Player Extensions` を追加しましたが、他の [エンジンサービスインターフェイス](/ja/guide/engine-services) や構成など、より多くの型が必要になるでしょう。

![](https://i.gyazo.com/9afdeb12c0ff63ce942d04b21f737217.png)

変更を適用するには、ライブラリとタイプを追加した後、ユニットを再生成することを忘れないでください。

![](https://i.gyazo.com/26c7bee4798b690c4eb362ec39746dc7.png)

Visual Scripting設定でNaninovelライブラリとタイプが追加されると、エンジンAPIがグラフビューの下のファジーファインダーで使用できるようになり、他のUnityまたはサードパーティAPIと同様に使用できます。以下は、エンジンを初期化してスクリプトを再生する例です。この例を試す前に、必ず `Initialize On Application Load` を無効にし、`Title UI` を削除してください。

![](https://i.gyazo.com/63a832f10fa3f5e4429e98da50ae8dd0.png)

シナリオスクリプトからビジュアルスクリプティンググラフまたはステートマシンにイベントを送信する場合は、以下に示す [カスタムコマンド](/ja/guide/custom-commands) の例を使用します。これは、指定された名前のGameObjectを見つけ、指定された名前と引数でイベントを送信しようとします。

```csharp
[Serializable, Alias("bolt")]
public class BroadcastBoltEvent : Command
{
    [Alias("object"), RequiredParameter]
    public StringParameter GameObjectName;
    [Alias("name"), RequiredParameter]
    public StringParameter EventName;
    [Alias("args")]
    public StringListParameter Arguments;

    public override Awaitable Execute (ExecutionContext ctx)
    {
        var gameObject = GameObject.Find(GameObjectName);
        if (!gameObject)
        {
            Debug.LogError($"Failed to broadcast '{EventName}' bolt event: '{GameObjectName}' game object is not found.");
            return Async.Completed;
        }

        CustomEvent.Trigger(gameObject, EventName, Arguments);

        return Async.Completed;
    }
}
```

内容をプロジェクトのAssetsディレクトリ内の任意の場所に保存された新しいC#スクリプトにコピー＆ペーストするだけで、コマンドが自動的に使用可能になり、次のように使用できます。

```nani
; 提供された引数を使用して "MyEvent" を "ExampleEvent" ゲームオブジェクトに送信します
@bolt object:ExampleEvent name:MyEvent args:ExampleMessage,Script002
```

以下は、`ExampleEvent` GameObjectにアタッチされたときに、メッセージを表示して指定されたスクリプトの再生を開始するグラフの例です。

![](https://i.gyazo.com/e2aef7f19cf013f4d476d32aac036f54.png)
