# ユーザーインターフェイス

Naninovelには様々な組み込みUIが付属しています。タイトル画面、ゲーム設定、セーブロードメニュー、バックログ、CGギャラリー、Tipsなどです。

組み込みの各UIは、無効化またはカスタマイズできます。 詳細については、[カスタムUI](/ja/guide/user-interface.md#カスタムUI) ガイドを参照してください。

## 適合性のあるUIレイアウト

すべての組み込みUIは、アダプティブレイアウトで実装されています。これにより、画面の解像度に関係なく、すべてのプラットフォームでUIをそのまま使用できます。

[!b6bddf8a0c6f2ba68dcdc1bc65db0c09]

## UI切替

UI切り替え機能により、ユーザーはゲーム内UI全体を非表示/表示にできます。

[!e267c4ab3654efbfaf611011502de79f]

`ToggleUI` 入力（スタンドアロン入力モジュールのデフォルトでは `Space` キー）を実行するか、コントロールパネルの `HIDE` ボタンを使用してUIを非表示/表示します。

UIが非表示になっている場合、`Continue` 操作または画面をクリック（タッチ）すると、UIが再表示されます。

## カスタムUI

カスタムUI機能は、組み込みのタイトルメニュー、設定画面、バックログなどのUIを、カスタムUIを追加して編集するか、完全に置き換えることができます。

テキストプリンターと選択ハンドラーは、アクターインターフェイスを介して実装されているため、別の方法でカスタマイズします。詳細については、それぞれのドキュメント（[テキストプリンター](/ja/guide/text-printers.md)、[選択肢ハンドラー](/ja/guide/choices.md)）を参照してください。

::: warn
カスタムUIを作成したり、既存のUIを変更したりする前に、まず[UnityのUIシステム](https://docs.unity3d.com/Packages/com.unity.ugui@latest)（uGUI）をよく確認してください。以下で利用できるUIカスタマイズのチュートリアル動画とサンプルプロジェクトがありますが、Unityの組み込みツールについて追加のガイダンスまたはサポートは提供していませんので、ご注意してください。詳細は [サポートページ](/ja/support/#unityサポート) をご覧ください。
:::

カスタムUIを追加したり、組み込みUIを変更（無効）したりするには、 エディターメニュー `Naninovel-> Resources-> UI` からUIリソースマネージャーを使用します。

![](https://i.gyazo.com/b0f00e8431e34e59249b3f59919e3b2c.png)

エンジンが初期化されると、リソースマネージャーで割り当てられたすべてのUIプレハブがインスタンス化されます。

リソースマネージャーにリストされているUIを表示または非表示にするには、それぞれ [@showUI] コマンドと [@hideUI] コマンドを使用します。

### カスタムUIの追加

新しいカスタムUIを追加するには、アセットコンテキストメニュー `Create -> Naninovel -> Custom UI` からプレハブを作成し、UIリソースリストに追加します。すると、エンジンの初期化時に他のUIプレハブと共にインスタンス化されます。

次のチュートリアル動画は、特殊な表示/非表示のアニメーションを備えた、カスタムカレンダーUIを追加する方法を示しています。カレンダーには、[カスタム変数](/ja/guide/custom-variables.md) に基づく日付が表示されます。これはnaninovelスクリプトで変更でき、ゲームに保存されます。変数が変更されると、カレンダーは自動的に更新されます。すべて、C# スクリプトなしで実現できます。

[!!wrAm-cwPXy4]

::: example
上記のチュートリアル動画で示したUnityプロジェクトは [GitHubにあります](https://github.com/Elringus/NaninovelCustomUIExample)。[Git clientでリポジトリをクローン](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) するか [zipファイルをダウンロード](https://github.com/Elringus/NaninovelDemo/archive/master.zip) することができます。プロジェクトに Naninovel パッケージは含まれないため、初めて開く際はコンパイルエラーが発生します。問題を解決するには、アセットストアから Naninovel をインポートします。
:::

::: example
グリッドレイアウト、ページング、ドラッグアンドドロップを使用したカスタムインベントリUIの上級の例は、[GitHubのインベントリサンプルプロジェクト](https://github.com/Elringus/NaninovelInventory) にあります。

具体的には、UI関連のスクリプトは [Runtime/UI](https://github.com/Elringus/NaninovelInventory/tree/master/Assets/NaninovelInventory/Runtime/UI) に、プレハブは [Prefabs](https://github.com/Elringus/NaninovelInventory/tree/master/Assets/NaninovelInventory/Prefabs) ディレクトリにあります。
:::

コンテキストメニューから新しいカスタムUIプレハブを作成すると、プレハブのルートオブジェクトに `Custom UI` コンポーネントが紐付けられます。このコンポーネント（コンポーネントが `IManagedUI` インターフェースを実装しているということ）は、エンジンがプレハブをUIとして受け入れるために不可欠です。

![](https://i.gyazo.com/9a4a38754ccf35e48b8bef2c3062ff02.png)

`Disable Interaction` プロパティを使用すると、可視性に関係なく、UIとの相互作用を永続的に無効にすることができます。同じゲームオブジェクトに `Canvas Group` コンポーネントが必要です。

`Visible On Awake` が有効になっている場合、UIがインスタンス化されたとき（エンジンが初期化された直後）にUIが表示され、その逆も同様です。

`Control Opacity`が有効で、`Canvas Group` コンポーネントが同じゲームオブジェクトに紐付けられている場合、`Canvas Group` コンポーネントの `Alpha` プロパティは、UI要素の現在の可視状態に同期して変更されます。`Fade Duration` は、透明フェードアニメーションの時間（秒単位の期間）を制御します。UI要素の可視状態を制御する独自の効果を実装する場合（たとえば、透明度をフェードする代わりにスライドアニメーション）、`Control Opacity` プロパティを無効にし、`On Show` および `On Hide` Unityイベントを使用して可視性の変化に適応できます。

UIでゲームパッドまたはキーボードナビゲーションをサポートしたい場合は、インタラクティブコンポーネント（たとえば、`Button`）を備えたゲームオブジェクトを `Focus Object` プロパティに割り当てます。このオブジェクトは、UIが表示されたときに自動的にフォーカスされ、ゲームパッドやキーボードで他のインタラクティブなオブジェクトをジャンプできるようになります。ナビゲーションの動作設定について詳細は、Unityの [UIナビゲーションガイド](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/script-SelectableNavigation.html) をご覧ください。

`Focus Object` が割り当てられている場合、`Focus Mode` プロパティでオブジェクトにいつフォーカスするかを選択できます: `Visibility` モードはUIが表示された直後にフォーカスし、`Navigation` はプレーヤーがゲームパッド（左スティックまたはDパッド）またはキーボード（矢印キー）でナビゲーションキーをオンにするまで、フォーカスを延期します。

`On Show` と `On Hide` Unityイベントでは、カスタムハンドラーをフックして、UIの可視性の変更に対応できます。たとえば、UIが表示されたときに `Animator` トリガーをフックしてカスタムアニメーションを表示できます。逆も同様です。

`Hide On Load` が有効になっている場合、エンジンがロード操作を開始すると、UIは自動的に非表示になります。これは通常、別のnaninovelスクリプトをロードするとき、またはタイトルメニューに戻るときに発生します。

`Save Visibility State` を有効にすると、UIの可視状態が永続的になるため、プレイヤーが保存されたゲームをロードすると、UIはゲームが保存されたときと同じ状態（表示または非表示）になります。

`Block Input When Visible` は、UIが表示されているときに [入力処理](/ja/guide/input-processing.md) を無効にできます。これは、UIの操作中にプレーヤーがさまざまなホットキー（UIを非表示にする、読み続けるなど）を使用できないようにするのに役立ちます。`Allowed Samplers` では、ブロックする入力の例外を追加できます。たとえば、`ToggleUI` をリストに追加すると、プレーヤーはUIを切り替えることができますが、他の入力はアクティブになりません。

`Modal UI` を有効にすると、UIが表示されている間、他のすべてのUIは操作を無視します。 これは `Block Input When Visible` に似ていますが、直接入力処理ではなく、イベントベースの操作（マウスのクリック、タッチ、UIナビゲーション）に影響します。

カスタムUIを作成すると、他のいくつかのコンポーネントもデフォルトで追加されます:
- `Canvas Group` は、不透明度を変更することでUIを非表示にし（`Fade Duration` で制御）、UIが必要に応じてユーザーの操作を無視できるようにします。
- `Canvas Scaler` は、現在のディスプレイ解像度に合わせてレイアウトを自動的に拡大縮小します。
- `Graphic Raycaster` は、プレーヤーがUIキャンバス内のボタンやその他のインタラクティブ要素を操作できるようにします。

上記のコンポーネントは、必要に応じて自由に変更または削除できます。

### 組み込みUIを無効にする

組み込みのUIを無効にするには、対応するレコードをUIリソースリストから削除します。プレハブはエンジンの初期化時にインスタンス化されません。

### 組み込みUIの変更

既存の組み込み（デフォルト）UIプレハブを変更する場合は、`Naninovel/Prefabs/DefaultUI` パッケージフォルダーにあります。

パッケージの更新時に問題を発生させないため、**組み込みのプレハブを直接編集しないでください**。むしろ、アセットコンテキストメニューの `Create -> Naninovel -> Default UI -> ...` を使用してテンプレートから新しいプレハブを作成するか、変更したいプレハブを手動で複製して(Ctrl/Cmd+D)、パッケージフォルダから移動します。次に、作成/変更したプレハブを、UIリソースマネージャーの既存のレコード（ `Object`フィールド）に割り当てます。

次のチュートリアル動画では、組み込みのタイトル（メイン）メニューを上書きする方法を学習できます。また、タイトルスクリプトを使用して、タイトルメニューに背景と特殊効果を追加する方法も紹介しています。これは C# スクリプトは必要ありません。

[!!hqhfhXzQkdk]

::: example
上記のチュートリアル動画で示したUnityプロジェクトは [GitHubにあります](https://github.com/Elringus/NaninovelCustomUIExample)。[Git clientでリポジトリをクローン](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) するか [zipファイルをダウンロード](https://github.com/Elringus/NaninovelDemo/archive/master.zip) することができます。プロジェクトに Naninovel パッケージは含まれないため、初めて開く際はコンパイルエラーが発生します。問題を解決するには、アセットストアから Naninovel をインポートします。
:::

新しいプレハブをスクラッチで作成する場合は、上書きするUIのインターフェイスを実装するコンポーネントを必ず追加してください。このコンポーネントは、プレハブのルートオブジェクトに追加する必要があります。

すべてのUIインターフェースは `Naninovel.UI` ネームスペースに保存されています:

インターフェース | 対応UI
--- | ---
IBacklogUI | バックログプリンター。
ILoadingUI | ゲームの読み込み中に表示するパネル。
IMovieUI | 映画をホストするためのUI。
ISaveLoadUI | ゲームのセーブとロードに使用するパネル。
ISceneTransitionUI | シーントランジションを制御。 ( [@startTrans] と [@finishTrans] コマンド).
ISettingsUI | ゲーム設定の変更に使用するパネル。
ITitleUI | ゲームのタイトル画面。
IExternalScriptsUI | 外部スクリプトブラウザーUI（コミュニティMod機能）。
IVariableInputUI | カスタムステート変数に任意のテキストを割り当てるための入力フォーム（[@input]コマンドで使用）。
IConfirmationUI | 重要なコマンドを確認するために使用するUIパネル（たとえば、タイトルメニューを終了するとき、またはセーブしたゲームスロットを削除するとき）。
ICGGalleryUI | [CGギャラリー](/ja/guide/unlockable-items.md#CGギャラリー) アイテム画面。
ITipsUI | [Tips](/ja/guide/unlockable-items.md#tips) 画面。
IRollbackUI | ステート巻き戻し機能のインジケーター。
IContinueInputUI | UIスタックの下部に配置されたフルスクリーンの非表示UIレイヤーで、クリックまたはタッチされたときに `continue input` トリガーをアクティブ化するために使用されます。

UIで可視状態（目覚め時に表示、フェードタイムで表示）とインタラクションオプション（インタラクションを無効にする）をサポートするには、`Canvas Group` コンポーネントも同じオブジェクトに追加します。

C# スクリプトに抵抗がなく、UIのデフォルトロジックを上書きしたい場合は、[新しいコンポーネントを作成](https://docs.unity3d.com/Manual/CreatingAndUsingScripts) します。そして `IManagedUI` インターフェースを実装し（`CustomUI` または `ScriptableUIBehaviour` からコンポーネントを継承して、すべてのインターフェース要件を満たすことができます）、代わりに追加したカスタムコンポーネントを紐付けます。組み込みUIのリファレンス実装については、`Naninovel/Runtime/UI` フォルダーを確認してください。次の例はカスタムUIコンポーネントの最小限の実装です:

```csharp
using UniRx.Async;

public class MyCustomUI : ScriptableUIBehaviour, Naninovel.UI.IManagedUI
{
    public UniTask InitializeAsync () => UniTask.CompletedTask;
}
```

## UnityイベントのPlay Script

カスタムUIを作成するとき、いくつかのコマンドを実行したり、イベント (例えば[ボタンのクリック](https://docs.unity3d.com/Manual/script-Button.html)) に反応して、特定のnaninovelスクリプトを再生したりできます

`Play Script` コンポーネントをゲームオブジェクトに追加し、既存のnaninovelスクリプトを選択するか、テキスト領域フィールド内に直接コマンドを記述します。次に、他のコンポーネントの [Unity event](https://docs.unity3d.com/Manual/UnityEvents.html) をルーティングして、`Play Script` コンポーネントで `Play()` メソッドを呼び出します。スクリプトは、イベントが再生モードでトリガーされたときに実行されます。 以下の例は、ボタンがクリックされたときにカスタムUIを非表示にします。

![](https://i.gyazo.com/5f56fbddc090919cc71f68e82bb1713f.png)

スクリプトテキスト内のUnityイベント引数を 式で参照することもできます。サポートしている引数のタイプは、文字列、整数、浮動小数点数、ブール値です。以下の例は、ブールのUnityイベントが正の場合にカメラシェイクを実行して効果音を再生し、負の場合に背景をミューズして再生します。

![](https://i.gyazo.com/78e9fa27d6561f8f8aced76bbeb4b542.png)

::: warn
条件付きブロックコマンド（if、else、elseif、endif）は、スクリプトテキストではサポートしていません。
:::

ドロップダウンリストから既存のnaninovelスクリプトを選択すると、スクリプトテキスト領域は無視され、選択したnaninovelスクリプトが現在実行中のスクリプトの **代わりに** 実行されます。実行中のスクリプトを中断せずにいくつかのコマンドを追加で実行したい場合は、スクリプトテキスト領域を使用します。
