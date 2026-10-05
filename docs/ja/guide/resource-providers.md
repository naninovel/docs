# リソースプロバイダー

リソースプロバイダーは、[メモリ管理](/ja/guide/memory-management) のニーズに従って、実行時にNaninovel関連のアセット（外観テクスチャ、BGMクリップなど）を取得するために使用されます。各プロバイダーは、特定のソース（プロジェクトの「Resources」フォルダー、UnityのAddressable Asset System、ローカルファイルストレージなど）からのアセットの取得に特化しています。

プロバイダーの全般的な動作は、`Naninovel -> Configuration -> Resource Provider` メニューで設定できます。

![](https://i.gyazo.com/623b6df78984851c79715378aae9b559.png)

`Resource Policy` プロパティは、スクリプト実行中にリソースをいつロードおよびアンロードするかを指定します。詳細については、[メモリ管理](/ja/guide/memory-management) ガイドを参照してください。

`Enable Build Processing` は、エディターメニューで割り当てられたアセットをビルドで確実に使用できるようにするために必要な、ビルド前処理ステップをオンにします。[カスタムビルド環境](/ja/guide/custom-build-environment) を使用している場合や、独自のビルドフックをアタッチしている場合は、この処理を無効にする必要があるかもしれません。プロパティを有効または無効にした後、変更を有効にするにはUnityエディターを再起動してください。

[Addressablesシステム](https://docs.unity3d.com/Packages/com.unity.addressables@latest) がインストールされている場合、アセット処理ステップの最適化に使用され、ビルド時間が短縮されます。`Auto Build Bundles` を有効にすると、プレイヤーのビルド時にアセットバンドルが自動的にコンパイルされます。

構成メニューのその他のプロパティはプロバイダー固有であり、以下で説明します。

リソース固有のプロバイダーの動作は、対応する構成メニューにある `Loader` プロパティで構成されます。たとえば、以下はSFXリソースの取得に使用されるデフォルトのローダー構成です。

![](https://i.gyazo.com/a51d5e5e6348ccc942cd3c96e5782b48.png)

`Path Prefix` プロパティを使用すると、特定の種類のリソースに対して、プロバイダーのルートパスに続く追加のパスを指定できます。たとえば、プロジェクトの「Resources」フォルダーから「Explosion」オーディオファイルを取得し、パスプレフィックスを `SFX` に設定する場合、結果のリソースリクエストは `Resources.LoadAsync("Naninovel/SFX/Explosion")` になります。

`Providers List` では、使用するプロバイダーの種類とその順序を指定できます。たとえば、上記の構成では、オーディオリソースをリクエストするときに、Addressableプロバイダーが最初に試行されます。リクエストされたリソースが見つからない場合は、プロジェクトプロバイダーがフォールバックとして使用されます。

エディター内では、特別な「Editor」リソースプロバイダーが常に最初に使用されることに注意してください（ローダー構成に関係なく）。このプロバイダーは、Naninovelの構成およびリソースマネージャーメニュー（`Naninovel -> Resources -> ...`）を介して割り当てられたすべてのリソースにアクセスできます。ゲームがビルドされると、このようなリソースは自動的に一時的な「Resources」フォルダーにコピーされるか、（[Addressablesシステム](https://docs.unity3d.com/Packages/com.unity.addressables@latest) がインストールされている場合）Addressables構成に登録され、アセットバンドルにコンパイルされます。プロバイダー関連のテストは、Unityエディターではなく、常にビルドで実行することを忘れないでください。

## Addressable

[Addressable Asset System](https://docs.unity3d.com/Packages/com.unity.addressables@latest) は、「アドレス」によってアセットをロードできるUnityパッケージです。非同期ロードを使用することで、任意の依存関係のコレクションを伴う、任意の場所（ローカルストレージ、リモートWebホスティングなど）からのロードをサポートします。システムのセットアップ、構成、使用方法については、Unityのドキュメントを参照してください。

パッケージがプロジェクトにインストールされている場合、Naninovelは自動的にAddressablesを使用します。追加のセットアップは必要ありません。Naninovelの構成メニューで割り当てられたすべてのアセット（シナリオスクリプト、キャラクタースプライト、オーディオクリップなど）は、プレイヤーのビルド時にシステムに登録されます（アドレスが割り当てられます）。

Naninovelメニューで割り当てたアセットは、`Naninovel` グループに追加されます。アセットの配信方法を設定する場合（たとえば、リモートWebホストを指定する場合）は、`Window -> Asset Management -> Addressables -> Groups` からこのグループを編集します。このグループは必要になった時点で自動的に作成されますが、ゲームをビルドする前に設定する場合は手動で作成することもできます。

![](https://i.gyazo.com/c93fbd9e232ec94468c685c4d6003916.png)

::: info NOTE
Naninovelメニューで割り当てたアセットのアドレスは、ビルドごとに自動的に生成または更新されます。アドレスを手動で編集しないでください。変更は次のビルドで失われる可能性があります。ただし、グループ設定は保持されます。
:::

### 手動割り当て

エディターメニューを使用せずにAddressableアセットをNaninovelリソースとして登録するには、アドレスに `Naninovel/` プレフィックスを追加し、その後にリソースタイプ（パスプレフィックス）とローカルリソースパスを続けます。アドレスにファイル拡張子を含めないでください。アセットはどのAddressablesグループに属していても構いません。Naninovelはアドレスによってアセットを識別します。

以下は、一般的なリソースタイプを手動で割り当てる際に使用できるアドレスの例です。

| リソースタイプ              | アドレス                                                           |
|----------------------|----------------------------------------------------------------|
| シナリオスクリプト            | `Naninovel/Scripts/{SCRIPT_PATH}`                              |
| スプライトキャラクターの外観       | `Naninovel/Characters/{CHARACTER_ID}/{APPEARANCE_PATH}`        |
| 汎用キャラクター             | `Naninovel/Characters/{CHARACTER_ID}`                          |
| 背景音楽                 | `Naninovel/BGM/{AUDIO_PATH}`                                   |
| 効果音                  | `Naninovel/SFX/{AUDIO_PATH}`                                   |
| ボイス                  | `Naninovel/Voice/{AUDIO_PATH}`                                 |
| 管理テキストドキュメント         | `Naninovel/Text/{DOCUMENT_PATH}`                               |
| スクリプトローカライズドキュメント    | `Naninovel/Localization/{L10N_TAG}/Text/Scripts/{SCRIPT_PATH}` |

::: tip EXAMPLE
Addressableプロバイダーを介して（リソースエディターメニューを使用せずに）Naninovelリソースを手動で登録し、リモートホストからアセットを提供する方法の例については、[Addressableサンプル](/ja/guide/samples#addressable) を確認してください。Unityの [学習教材](https://learn.unity.com/course/get-started-with-addressables) も役立つ場合があります。
:::

### スクリプトラベル

[残念なUnityの設計上の決定](https://github.com/naninovel/docs/issues/159) により、Addressableアセットは、アセットバンドル全体がアンロードされるまでメモリからアンロードされません。つまり、バンドルを適切に整理しない限り、アセットが単一のバンドルにまとめられ、一度ロードされると二度とアンロードされず、メモリ不足例外が発生する可能性があります。

最も簡単な解決策は、[グループ設定](https://docs.unity3d.com/Packages/com.unity.addressables@1.22/manual/GroupSchemas.html) で `Bundle Mode` を `Pack Separately` に設定することです。

![](https://i.gyazo.com/651a292ca6f1f4e26593074e25c66cea.png)

これにより、各アセットが独自のバンドルになり、解放されるとすぐにアンロードできるようになります。これはRAM使用量には最適ですが、CPUオーバーヘッドとロード時間が増加します。これは、特に低速ドライブでは、多数の小さなバイナリBLOBを繰り返しシークしてロードするよりも、1つの大きな連続バイナリBLOBをロードする方がはるかに高速であるためです。

リソースプロバイダー構成で `Label By Scripts` が有効になっている場合（デフォルト）、Naninovelは折衷案を採用します。ビルドプロセス中にすべてのシナリオスクリプトをスキャンし、各スクリプトに必要なアセットの特定を試み、参照元のスクリプトごとにAddressableアセットにラベルを割り当てます。

![](https://i.gyazo.com/9013a1264a55aa95d22ecfc6b3283ac3.png)

`Bundle Mode` を `Pack Together By Label`（デフォルト）に設定すると、アセットはシナリオスクリプトとの関連性に基づいてバンドルに分割され、Naninovelの [メモリ管理ポリシー](/ja/guide/memory-management) 用にバンドル構造が最適化されます。

::: info NOTE
Addressablesを介して [手動で割り当てられた](/ja/guide/resource-providers#手動割り当て) アセットを含め、すべてのNaninovelアセットはラベル付けの対象となります。アセットのアドレスが `Naninovel/` で始まる限り、関連するスクリプトでラベル付けされます。
:::

ラベル付けプロセスにはある程度の推測が必要であり、常に完璧であるとは限りません。アセットが正しくラベル付けされるようにするには、次のガイドラインに従ってください。

- アクターID、外観、オーディオパスなどのリソースコンテキストのパラメーターで [式](/ja/guide/expressions) を使用しないでください。式はコマンドが実行される直前に評価されるため、ビルド時に最終パスを解決することは不可能です。Naninovelは、ビルド中にそのようなケースを検出すると警告します。
- [@char] や [@back] などのコマンドでは、常にアクターIDと外観を指定してください。このようなコマンドはデフォルトにフォールバックする場合がありますが、ビルド時にそれらのデフォルトを解決できるとは限りません。
- [カスタムコマンド](/ja/guide/custom-commands) を作成するときは、リソースを参照するパラメーターに [リソースコンテキスト属性](/ja/guide/ide-extension#ide属性) を適用してください（たとえば、アクターIDを受け入れるパラメーターに `[ActorContext]` を適用します）。これらの属性は主にIDE拡張機能のオートコンプリートに使用されますが、ラベル付けツールもアセットアドレスを解決するために使用します。

## Project

プロジェクトプロバイダーは、Unityプロジェクト内の「Resources」フォルダーにあるアセットを提供します。プロジェクトの [リソースロードAPI](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime) に関する詳細については、Unityのガイドを参照してください。

::: warning
ほとんどの場合、[「Resources」フォルダーの使用は推奨されません](https://docs.unity3d.com/Manual/UnderstandingPerformanceResourcesFolder.html)。可能な場合はNaninovelリソースマネージャーメニューを介してリソースを割り当てるか、代わりにAddressablesシステムを使用することを検討してください。その後、アセットを「Resources」フォルダーの外に移動することを忘れないでください。
:::

## Local

ローカルプロバイダーを使用すると、ローカルファイルシステムの任意の場所から単純なアセット（シナリオスクリプト、スプライトキャラクターと背景、オーディオ）を提供できます。

::: info NOTE
ローカルプロバイダーはファイルシステムから生のファイルをロードし、実行時に変換します。この処理は低速であり、他のプロバイダーと比較してサポートされるファイルタイプも限られます。開発時または特定の機能（[コミュニティMod](/ja/guide/resource-providers#コミュニティmod) など）にのみ使用してください。
:::

サポートされているファイル形式：

- シナリオスクリプト用の `.nani` プレーンテキストファイル
- 画像/テクスチャ用の `.png` および `.jpg`
- オーディオ用の `.wav`（PCM16 44100Hzステレオのみ）

::: tip
`IResourceProviderManager` [エンジンサービス](/ja/guide/engine-services#組み込みサービスのオーバーライド) をオーバーライドし、ローカルプロバイダー用のカスタムコンバーターを追加することで、サポートされるファイル形式を増やせます。

![](https://i.gyazo.com/d4e63726c2d1d75e2677cab7f2503546.png)
:::

リソースプロバイダー構成の `Local Root Path` プロパティは、ローカルリソースが保存されているフォルダーを指す必要があります。絶対パス（例：`C:\Resources`）または次のオリジンのいずれかで始まる相対パスを使用できます。

- `%DATA%` — ターゲットデバイス上のゲームデータフォルダー（[Application.dataPath](https://docs.unity3d.com/ScriptReference/Application-dataPath)）
- `%PDATA%` — ターゲットデバイス上の永続データディレクトリ（[Application.persistentDataPath](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath)）
- `%STREAM%` — 「StreamingAssets」フォルダー（[Application.streamingAssetsPath](https://docs.unity3d.com/ScriptReference/Application-streamingAssetsPath)）
- `%SPECIAL{F}%` — OSの特別なフォルダー。`F` は [特別なフォルダーの列挙型](https://docs.microsoft.com/en-us/dotnet/api/system.environment.specialfolder) の値の名前です。

デフォルトの `%DATA%/Resources` 値は、ゲームのデータディレクトリ内の「Resources」フォルダーを指します（正確な場所はターゲットプラットフォームによって異なります）。

使用例の1つとして、シナリオを作成するために共同作業者と共有している `C:/Users/Admin/Dropbox/MyGame/Scripts` からシナリオスクリプトをロードしたいとします。ルートフォルダーを絶対パス（`C:/Users/Admin/Dropbox/MyGame`）で指定すると、すべての共同作業者がまったく同じパスにフォルダーを保存する必要があります。代わりに、「UserProfile」という特別なフォルダーをオリジンとする相対パスを使用します：`%SPECIAL{UserProfile}%/Dropbox/MyGame`。

![](https://i.gyazo.com/eb435b782cfb9df6c403702e8f6124df.png)

スクリプト構成のパスプレフィックスが `Scripts` に設定されており、ローカルプロバイダーがリストに追加されている場合、スクリプトナビゲーター（`nav` コンソールコマンドでアクセス可能）は、そのフォルダーの下に保存されているすべての `.nani` テキストファイルを検出するはずです。

![](https://i.gyazo.com/df8ad31d30b5c10c9a918e69a4543567.png)

## カスタムプロバイダー

リソースプロバイダーのカスタム実装を追加し、Naninovelに組み込みプロバイダーと一緒に（またはその代わりに）使用させることが可能です。

カスタムプロバイダーを追加するには、パラメーターなしのコンストラクターを持つC#クラスを作成し、`IResourceProvider` インターフェースを実装します。作成すると、カスタムプロバイダータイプが組み込みタイプとともにすべてのローダー構成メニューに表示されます。

![](https://i.gyazo.com/7176a9d4a4ea2d9414c5495e2e465baf.png)

`Naninovel/Runtime/Resource/Provider` パッケージディレクトリに組み込みのリソースプロバイダー実装があります。独自のプロバイダーを実装する際の参考にしてください。

## コミュニティMod

コミュニティModを使用すると、プレイヤーはゲームの組み込みリソースを引き続き利用しながら、独自のシナリオやリソースを追加してビルドを改変できます。

機能を有効にするには、スクリプト構成UI（`Naninovel -> Configuration -> Scripts`）で `Enable Community Modding` プロパティを有効にし、Mod用に公開したいリソースに対して [ローカル](/ja/guide/resource-providers#local) プロバイダーを設定します。ビルドディレクトリ下のリソースが検索されるように、ローカルプロバイダーのルートパスがデフォルト値（`%DATA%/Resources`）に設定されていることを確認してください。

![](https://i.gyazo.com/e32f40aa3faa648774908a0a937c5fcb.png)

機能が有効になると、タイトルメニューに「EXTERNAL SCRIPTS」ボタンが表示され、このボタンで外部スクリプトブラウザーを開けます。エディター内では、ブラウザーにプロジェクトアセットのシナリオスクリプトも一覧表示されます。

`External Loader` 構成は外部スクリプトブラウザーに表示されるスクリプトを制御するのに対し、`Loader` 構成は実際のスクリプトリソースのロードを制御することに注意してください。External Loaderはデフォルトでローカルプロバイダーを使用するため、ゲームビルドディレクトリ内のスクリプトのみを検索します。その他のリソースタイプ（背景、キャラクターなど）については、プレイヤーが追加できるように、対応する構成メニューで手動でローカルプロバイダーを設定する必要があります。

外部リソースをビルドに追加するには、ゲームの `Resources` ディレクトリ下にある、`Loader` フォールドアウトで構成されたリソースの `Path Prefix` プロパティに対応するサブフォルダーに配置します。たとえば、外部シナリオスクリプトを追加するには `GameFolder/GameName_Data/Resources/Scripts` に配置し、背景は `GameFolder/GameName_Data/Resources/Backgrounds` に配置する、といった具合です。*GameFolder* と *GameName* は、Unityプロジェクトの名前によって異なります。

外部スクリプトブラウザーUIは、[UIのカスタマイズ](/ja/guide/gui#uiのカスタマイズ) 機能を使用してカスタマイズまたは完全に置き換えることができます。
