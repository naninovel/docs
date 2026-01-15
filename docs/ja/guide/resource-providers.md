# リソースプロバイダー

リソースプロバイダーは、[メモリ管理](/ja/guide/memory-management) のニーズに従って、実行時にNaninovel関連のアセット（外観テクスチャ、BGMクリップなど）を取得するために使用されます。各プロバイダーは、特定のソース（プロジェクトの「Resources」フォルダ、UnityのAddressableアセットシステム、ローカルファイルストレージなど）からのアセットの取得に特化しています。

プロバイダーの一般的な動作は、`Naninovel -> Configuration -> Resource Provider` メニューで設定できます。

![](https://i.gyazo.com/b895b71462d39352931609bcf2115711.png)

`Resource Policy` プロパティは、スクリプト実行中にリソースをいつロードおよびアンロードするかを指定します。詳細については、[メモリ管理](/ja/guide/memory-management) ガイドを参照してください。

`Log Resources Loading` が有効になっている場合、さまざまなプロバイダー関連のログメッセージがデフォルトのロード画面UIにミラーリングされます。

`Enable Build Processing` は、エディタメニューで割り当てられたアセットがビルドで使用可能であることを確認するために必要なビルド前処理ステップをオンにします。[カスタムビルド環境](/ja/guide/custom-build-environment) を使用している場合や、独自のビルドフックをアタッチしている場合は、この処理を無効にする必要があるかもしれません。プロパティを有効または無効にした後、変更を有効にするにはUnityエディタを再起動してください。

[Addressablesシステム](https://docs.unity3d.com/Packages/com.unity.addressables@latest) がインストールされている場合、`Use Addressables` を有効にするとアセット処理ステップが最適化され、ビルド時間が短縮されます。同時に `Auto Build Bundles` を有効にすると、プレイヤーのビルド時にアセットバンドルが自動的にコンパイルされます。

構成メニューのその他のプロパティはプロバイダー固有であり、以下で説明します。

リソース固有のプロバイダーの動作は、対応する構成メニューにある `Loader` プロパティで構成されます。たとえば、以下はオーディオリソース（BGMおよびSFX）の取得に使用されるデフォルトのローダー構成です。

![](https://i.gyazo.com/e9b59f738c93d0cdee6f0999b797a461.png)

`Path Prefix` プロパティを使用すると、特定の種類のリソースに対して、プロバイダーのルートパスに対する追加のパスを指定できます。たとえば、プロジェクトの「Resources」フォルダから「Explosion」オーディオファイルを取得し、パスプレフィックスを `Audio` に設定する場合、結果のリソースリクエストは `Resources.Load("Audio/Explosion")` になります。

`Providers List` では、使用するプロバイダーの種類とその順序を指定できます。たとえば、上記の構成では、オーディオリソースをリクエストするときに、Addressableプロバイダーが最初に試行されます。リクエストされたリソースが見つからない場合は、Projectプロバイダーがフォールバックとして使用されます。

エディタ内では、特別な「Editor」リソースプロバイダーが常に最初に使用されることに注意してください（ローダー構成に関係なく）。このプロバイダーは、Naninovelの構成およびリソースマネージャーメニュー（`Naninovel -> Resources -> ...`）を介して割り当てられたすべてのリソースにアクセスできます。ゲームがビルドされると、このようなリソースは自動的に一時的な「Resources」フォルダにコピーされるか、（[Addressablesシステム](https://docs.unity3d.com/Packages/com.unity.addressables@latest) がインストールおよび有効化されている場合）Addressables構成に登録され、アセットバンドルにコンパイルされます。プロバイダー関連のテストは、Unityエディタではなく、常にビルドで実行することを忘れないでください。

## Addressable

[Addressable Assetシステム](https://docs.unity3d.com/Packages/com.unity.addressables@latest) は、「アドレス」によってアセットをロードできるUnityパッケージです。非同期ロードを使用して、任意の場所（ローカルストレージ、リモートWebホスティングなど）からのロードをサポートし、任意の依存関係コレクションを使用します。システムのセットアップ、構成、使用方法については、Unityのドキュメントを参照してください。

パッケージがプロジェクトにインストールされ、リソースプロバイダー構成で `Use Addressables` プロパティが有効になっている場合、Naninovelは自動的にAddressablesを使用します。追加のセットアップは必要ありません。Naninovelの構成メニュー（シナリオスクリプト、キャラクタースプライト、オーディオクリップなど）で割り当てられたすべてのアセットは、プレイヤーのビルド時にシステムに登録されます（アドレスが割り当てられます）。

Naninovelアセットの提供方法を構成する場合（たとえば、リモートWebホストを指定する場合）は、`Window -> Asset Management -> Addressables -> Groups` を介してNaninovelグループを編集します。Addressableグループは、ゲームを最初にビルドするときに自動的に作成されます。見つからない場合は、手動で作成できます。

![](https://i.gyazo.com/c93fbd9e232ec94468c685c4d6003916.png)

::: info NOTE
Naninovel Addressableグループの下のアセットレコードは、ビルドごとに自動的に生成されます。レコードを手動で編集しないでください。変更は次のビルドで失われます。ただし、グループ設定は保持されます。
:::

### カテゴリグループ

デフォルトでは、リソースプロバイダー構成の `Group By Category` オプションは無効になっており、すべてのNaninovelアセットが単一の「Naninovel」グループになります。リソースをカテゴリ別にグループ化する場合（たとえば、個別のパッキングまたは提供オプションを指定する場合）、プロパティを有効にして再ビルドします。有効にすると、各リソースカテゴリ（スクリプト、オーディオ、キャラクターなど）は、`Naninovel-*Category*` という名前の独自のAddressableグループの下に追加されます。ここで *Category* はリソースカテゴリです。

![](https://i.gyazo.com/80938ca5ca1021e8a71f783eef516d15.png)

### 手動割り当て

エディタメニューを使用せずにAddressableアセットをNaninovelに公開するには、カスタムAddressableグループを使用します。グループには任意の名前を付けることができますが、予約された `Naninovel` プレフィックスで開始してはなりません（そうでない場合、自動生成されたものとして認識され、ビルド時にクリアされます）。公開されたアセットのアドレスは `Naninovel/` で始まり、`Naninovel` ラベルが割り当てられている必要があります。リソースプロバイダー構成メニューの `Extra Labels` プロパティを使用して、Naninovelで使用されるアセットをフィルタリングするための追加のラベルを指定できます。

::: tip EXAMPLE
Addressableプロバイダーを介して（リソースエディタメニューを使用せずに）Naninovelリソースを手動で登録し、リモートホストからアセットを提供する方法の例については、[Addressableサンプル](/ja/guide/samples#addressable) を確認してください。Unityの [学習教材](https://learn.unity.com/course/get-started-with-addressables) も役立つ場合があります。
:::

### スクリプトラベル

[残念なUnityの設計上の決定](https://github.com/naninovel/docs/issues/159) により、Addressableアセットは、アセットバンドル全体がアンロードされるまでメモリからアンロードされません。つまり、バンドルを適切に整理しない限り、アセットが単一のバンドルになり、ロードされるとアンロードされず、メモリ不足の例外が発生する可能性があります。

最も簡単な解決策は、[グループ設定](https://docs.unity3d.com/Packages/com.unity.addressables@1.22/manual/GroupSchemas.html) で `Bundle Mode` を `Pack Separately` に設定することです。

![](https://i.gyazo.com/651a292ca6f1f4e26593074e25c66cea.png)

これにより、各アセットが独自のバンドルになり、リリースされるとすぐにアンロードできるようになります。これはRAM使用量には最適ですが、CPUオーバーヘッドとロード時間が増加します。これは、特に低速ドライブでは、多数の小さなバイナリBLOBを繰り返しシークしてロードするよりも、1つの大きな連続バイナリBLOBをロードする方がはるかに高速であるためです。

リソースプロバイダー構成で `Label By Scripts` が有効になっている場合（デフォルト）、Naninovelは妥協案を使用します。ビルドプロセス中に、すべてのシナリオスクリプトをスキャンし、各スクリプトに必要なアセットを特定し、それらを参照するスクリプトによってAddressableアセットにラベルを割り当てます。

![](https://i.gyazo.com/9013a1264a55aa95d22ecfc6b3283ac3.png)

`Bundle Mode` を `Pack Together By Label`（デフォルト）に設定すると、アセットはシナリオスクリプトとの親和性に基づいてバンドルに分割され、Naninovelの [メモリ管理ポリシー](/ja/guide/memory-management) 用にバンドル構造が最適化されます。

::: info NOTE
Addressablesを介して [手動で割り当てられた](/ja/guide/resource-providers#手動割り当て) アセットを含め、すべてのNaninovelアセットはラベル付けの対象となります。アセットに `Naninovel` ラベルがある限り、関連するスクリプトでラベル付けされます。
:::

ラベル付けプロセスにはある程度の推測が必要であり、常に完璧であるとは限りません。アセットが正しくラベル付けされるようにするには、次のガイドラインに従ってください。

- アクターID、外観、オーディオパスなどのリソースコンテキストのパラメータで [式](/ja/guide/script-expressions) を使用しないでください。式はコマンドが実行される直前に評価されるため、ビルド時に最終パスを解決することは不可能です。Naninovelは、ビルド中にそのようなケースを検出すると警告します。
- [@char] や [@back] などのコマンドでは、常にアクターIDと外観を指定してください。このようなコマンドはデフォルトにフォールバックする場合がありますが、ビルド時にそれらのデフォルトを解決できるとは限りません。
- [カスタムコマンド](/ja/guide/custom-commands) を作成するときは、リソースを参照するパラメータに [リソースコンテキスト属性](/ja/guide/ide-extension#ide属性) を適用してください（たとえば、アクターIDを受け入れるパラメータに `[ActorContext]` を適用します）。これらの属性は主にIDE拡張機能のオートコンプリートに使用されますが、ラベル付けツールもアセットアドレスを解決するために使用します。

## Project

Projectプロバイダーは、Unityプロジェクト内の「Resources」フォルダにあるアセットを提供します。プロジェクトの [リソース読み込みAPI](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime) に関する詳細については、Unityのガイドを参照してください。

::: warning
ほとんどの場合、[「Resources」フォルダの使用は推奨されません](https://docs.unity3d.com/Manual/UnderstandingPerformanceResourcesFolder.html)。可能な場合はNaninovelリソースマネージャーメニューを介してリソースを割り当てるか、代わりにAddressablesシステムを使用することを検討してください。その後、アセットを「Resources」フォルダの外に移動することを忘れないでください。
:::

## Local

Localプロバイダーを使用すると、ローカルファイルシステムの任意の場所から単純なアセット（シナリオスクリプトと管理テキスト、スプライトキャラクターと背景、オーディオ）を提供できます。

::: info NOTE
Localプロバイダーはファイルシステムから生のファイルをロードし、実行時に変換します。これは遅く、他のプロバイダーと比較してサポートされるファイルタイプが制限されます。開発中または特定の機能（[コミュニティMod](/ja/guide/resource-providers#コミュニティmod) など）にのみ使用してください。
:::

サポートされているファイル形式：

- シナリオスクリプト用の `.nani` プレーンテキストファイル
- 画像/テクスチャ用の `.png` および `.jpg`
- オーディオ用の `.wav`（PCM16 44100Hzステレオのみ）

::: tip
`IResourceProviderManager` [エンジンサービス](/ja/guide/engine-services#組み込みサービスのオーバーライド) をオーバーライドし、Localプロバイダー用のカスタムコンバーターを追加することで、サポートされるファイル形式を追加します。

![](https://i.gyazo.com/d4e63726c2d1d75e2677cab7f2503546.png)
:::

リソースプロバイダー構成の `Local Path Root` プロパティは、ローカルリソースが保存されているフォルダを指す必要があります。絶対パス（例：`C:\Resources`）または次のオリジンのいずれかで始まる相対パスを使用できます。

- `%DATA%` — ターゲットデバイス上のゲームデータフォルダ（[Application.dataPath](https://docs.unity3d.com/ScriptReference/Application-dataPath)）
- `%PDATA%` — ターゲットデバイス上の永続データディレクトリ（[Application.persistentDataPath](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath)）
- `%STREAM%` — 「StreamingAssets」フォルダ（[Application.streamingAssetsPath](https://docs.unity3d.com/ScriptReference/Application-streamingAssetsPath)）
- `%SPECIAL{F}%` — OSの特別なフォルダ。`F` は [特別なフォルダの列挙](https://docs.microsoft.com/en-us/dotnet/api/system.environment.specialfolder) 値の名前です。

デフォルトの `%DATA%/Resources` 値は、ゲームのデータディレクトリ内の「Resources」フォルダを指します（正確な場所はターゲットプラットフォームによって異なります）。

使用例の1つとして、シナリオを作成するために共同作業者と共有している `C:/Users/Admin/Dropbox/MyGame/Scripts` からシナリオスクリプトをロードしたいとします。絶対ルートフォルダ（`C:/Users/Admin/Dropbox/MyGame`）を指定すると、すべての共同作業者がまったく同じパスにフォルダを保存する必要があります。代わりに、「UserProfile」特別なフォルダオリジン上の相対パスを使用します：`%SPECIAL{UserProfile}%/Dropbox/MyGame`。

![](https://i.gyazo.com/eb435b782cfb9df6c403702e8f6124df.png)

スクリプト構成のパスプレフィックスが `Scripts` に設定されており、Localプロバイダーがリストに追加されている場合、スクリプトナビゲーター（`nav` コンソールコマンドでアクセス可能）は、フォルダの下に保存されている `.nani` テキストファイルを検出するはずです。

![](https://i.gyazo.com/df8ad31d30b5c10c9a918e69a4543567.png)

## カスタムプロバイダー

リソースプロバイダーのカスタム実装を追加し、Naninovelに組み込みプロバイダーと一緒に（またはその代わりに）使用させることが可能です。

カスタムプロバイダーを追加するには、パラメータなしのコンストラクタを持つC#クラスを作成し、`IResourceProvider` インターフェイスを実装します。作成されると、カスタムプロバイダータイプが組み込みタイプとともにすべてのローダー構成メニューに表示されます。

![](https://i.gyazo.com/7176a9d4a4ea2d9414c5495e2e465baf.png)

`Naninovel/Runtime/Common/ResourceProvider` パッケージディレクトリに組み込みのリソースプロバイダー実装があります。独自のプロバイダーを実装する際の参考にしてください。

## コミュニティMod

コミュニティModを使用すると、プレイヤーは独自のシナリオやリソースを追加してビルドを変更しながら、ゲームの組み込みリソースにアクセスできます。

機能を有効にするには、スクリプト構成UI（Naninovel -> Configuration -> Scripts）で `Enable Community Modding` プロパティを有効にし、Mod用に公開したいリソースに対して [Local](/ja/guide/resource-providers#local) プロバイダーを設定します。Localプロバイダーのルートパスがデフォルト値（`%DATA%/Resources`）に設定されていることを確認して、ビルドディレクトリ下のリソースを探すようにします。

![](https://i.gyazo.com/e32f40aa3faa648774908a0a937c5fcb.png)

機能が有効になると、タイトルメニューに「EXTERNAL SCRIPTS」ボタンが表示され、外部スクリプトブラウザが開きます。エディタ内では、ブラウザにはプロジェクトアセットからのシナリオスクリプトもリストされます。

`External Loader` 構成は外部スクリプトブラウザに表示されるスクリプトを制御するのに対し、`Loader` 構成は実際のスクリプトリソースのロードを制御することに注意してください。External LoaderはデフォルトでLocalプロバイダーを使用するため、ゲームビルドディレクトリ内のスクリプトのみを検索します。その他のリソースタイプ（背景、キャラクターなど）については、プレイヤーが追加できるように、対応する構成メニューで手動でLocalプロバイダーを設定する必要があります。

外部リソースをビルドに追加するには、`Loader` フォールドアウトで構成されたリソースの `Path Prefix` プロパティに対応するゲームの `Resources` ディレクトリ下のサブフォルダにドロップします。たとえば、外部シナリオスクリプトを追加するには、`GameFolder/GameName_Data/Resources/Scripts` にドロップします。背景は `GameFolder/GameName_Data/Resources/Backgrounds` に移動します。*GameFolder* と *GameName* は、Unityプロジェクトの名前によって異なります。

外部スクリプトブラウザUIは、[UIカスタマイズ](/ja/guide/gui#uiのカスタマイズ) 機能を使用してカスタマイズまたは完全に置き換えることができます。
