# コンフィグレーション

エンジンのコンフィグレーションは複数の ScriptableObject アセットに保存されており、`Assets/NaninovelData/Resources/Naninovel/Configuration` フォルダーにあります。 これらはUnityエディターで対応するコンフィグメニューを初めて開いたときに、自動的に生成されます。

コンフィグメニューへは `Naninovel -> Configuration` または `Edit -> Project Settings -> Naninovel` でアクセスします。

全てのコンフィグメニューは [Unityのプリセット機能](https://docs.unity3d.com/Manual/Presets) をサポートしています。異なるプラットフォーム（モバイル、スタンドアロン、コンソールなど）を対象にデプロイする場合、いくつかのコンフィグプリセットを作成すると便利です。

[!55f5c74bfc16e1af2455034647525df3]

実行時にコンフィグオブジェクトを変更し、新しいカスタムコンフィグを追加して、実行時にオブジェクトにアクセスする方法を変更することができます（たとえば、コンフィグをリモートホストに保存されているJSONファイルから読み取る）。詳細については、[カスタムコンフィグ](/ja/guide/custom-configuration.md) ガイドを参照してください。

::: note
このコンフィグレーションリファレンスは [Naninovel v1.10](https://github.com/Naninovel/Documentation/releases) で有効です。
:::

## Audio

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Audio Loader | Audio- (Addressable, Project) | オーディオ（BGMとSFX）リソースで使用されるリソースローダーの構成。
Voice Loader | Voice- (Addressable, Project) | ボイスリソースで使用されるリソースローダーの構成。
Default Master Volume | 1 | ゲーム開始時に設定するマスターボリューム。
Default Bgm Volume | 1 | ゲーム開始時に設定するBGMのボリューム。
Default Sfx Volume | 1 | ゲーム開始時に設定するSFXのボリューム。
Default Voice Volume | 1 | ゲーム開始時に設定するボイスボリューム。
Enable Auto Voicing | False | 有効になっていると、それぞれの `PrintText` コマンドは `VoiceResourcesPrefix/ScriptName/LineIndex.ActionIndex` にあるボイスクリップの再生を試みます。
Voice Overlap Policy | Prevent Overlap | ボイス同時再生の処理方法を指示します:<br> • Allow Overlap — 同時ボイスは制限なしで再生されます。<br> • Prevent Overlap — 新しいボイスクリップを再生する前に、再生中のボイスクリップを停止し、ボイスの同時再生を防ぎます。<br> • Prevent Character Overlap — 同じキャラクターのボイス同時再生を防ぎます。異なるキャラクターのボイス（自動ボイシング）と任意の数の [@voice] コマンドを同時に再生できます。
Custom Audio Mixer | Null | オーディオグループを制御するオーディオミキサー。指定されていない場合はデフォルトのものを使用します。
Master Volume Handle Name | Master Volume | マスターボリュームを制御するミキサーのハンドル名（公開パラメーター）。
Bgm Group Path | Master/BGM | マスターボリュームを制御するミキサーのグループのパス。
Bgm Volume Handle Name | BGM Volume | バックグラウンドミュージックの音量を制御するためのミキサーのハンドル名（公開パラメーター）。
Sfx Group Path | Master/SFX | バックグラウンドミュージックの音量を制御するミキサーグループのパス。
Sfx Volume Handle Name | SFX Volume | 効果音の音量を制御するミキサーのハンドル名（公開パラメーター）。
Voice Group Path | Master/Voice | ボイスの音量を制御するミキサーグループのパス。
Voice Volume Handle Name | Voice Volume | ボイスの音量を制御するミキサーのハンドル名（公開パラメーター）。

</div>

## Backgrounds

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Default Metadata | Object Ref | 背景アクターを作成するときデフォルトで使用するメタデータ。また作成したアクターIDが存在しないときのカスタムメタデータ。
Metadata | Object Ref | 指定したIDで背景アクターを作成するときのメタデータ。
Scene Origin | (0.5, 0.0) | シーンにアクターを配置するときに参照する起点。
Z Offset | 100 | アクターの作成時に設定する、アクターからカメラへの初期Z軸オフセット（深さ）。
Z Step | 0.1 | アクターが作成されたときにアクター間に設定するZ軸による距離。 Zファイティングの問題を防ぐために使用されます。
Default Easing | Linear | アクター変更時の全てのアニメーション（外観、位置、色合いの変更など）にデフォルトで使用するイージング関数。
Auto Show On Modify | True | 変更コマンドの実行時にアクターを自動的に表示するかどうか。

</div>

## Camera

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Reference Resolution | (1920, 1080) | 参照解像度は、適切なレンダリング寸法を評価するために使用されます。これによりスプライトアセット（背景やキャラクターなど）はシーンに正しく配置されます。一般的に、ゲーム用に作成する背景テクスチャの解像度と同じに設定します。
Auto Correct Ortho Size | True | 現在のディスプレイのアスペクト比に基づいてカメラの正投影サイズを自動的に修正して、背景とキャラクターが正しく配置されるようにするかどうか。
Default Ortho Size | 5.35 | 自動修正が無効になっているときにデフォルトで設定する正投影サイズ。
Initial Position | (0.0, 0.0, -10.0) | カメラの初期ワールド位置。
Orthographic | True | カメラをデフォルトで正投影（有効）モードまたは遠近法（無効）モードのどちらでレンダリングするか。 カスタムカメラプレハブが割り当てられている場合は効果がありません。
Custom Camera Prefab | Null | レンダリングに使用するカメラコンポーネントが追加されたプレハブ。指定しない場合はデフォルトを使用します。カメラプロパティ（背景色、FOV、HDRなど）を設定する場合、または後処理スクリプトを追加する場合は、希望のカメラ設定でプレハブを作成し、このフィールドにプレハブを割り当てます。
Use UI Camera | True | 別のカメラでUIをレンダリングするかどうか。 これにより、メインカメラとUIカメラに個別の構成を使用できるようになり、後処理（画像）エフェクトがUIに影響するのを防ぎますが、多少のレンダリングオーバーヘッドが発生します。
Custom UI Camera Prefab | Null | UIレンダリングに使用するカメラコンポーネントを備えたプレハブ。指定しない場合はデフォルトになります。`UseUICamera` が無効になっている場合は効果がありません。
Default Easing | Linear | カメラ変更時（ズーム、ポジション、回転など）の全てのアニメーションにデフォルトで使用するイージング関数。
Thumbnail Resolution | (240, 140) | ゲームの保存スロットのプレビューサムネイルをキャプチャする解像度。
Hide UI In Thumbnails | False | サムネイルのキャプチャ時にUIレイヤーを無視するかどうか。

</div>

## Characters

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Auto Arrange On Add | True | 位置を指定せずに新しいキャラクターを追加するときに、X軸でキャラクターを均等に配分するかどうか。
Default Metadata | Object Ref | キャラクターアクターを作成するときデフォルトで使用するメタデータ。また作成したアクターIDが存在しないときのカスタムメタデータ。
Metadata | Object Ref | 指定したIDでキャラクターアクターを作成するときのメタデータ。
Avatar Loader | Character Avatars- (Addressable, Project) | キャラクターアバターテクスチャリソースで使用されるリソースローダーの構成。
Scene Origin | (0.5, 0.0) | シーンにアクターを配置するときに参照する起点。
Z Offset | 50 | アクターの作成時に設定する、アクターからカメラへの初期Z軸オフセット（深さ）。
Z Step | 0.1 | アクターが作成されたときにアクター間に設定するZ軸による距離。 Zファイティングの問題を防ぐために使用されます。
Default Easing | Smooth Step | アクター変更時の全てのアニメーション（外観、位置、色合いの変更など）にデフォルトで使用するイージング関数。
Auto Show On Modify | True | 変更コマンドの実行時にアクターを自動的に表示するかどうか。

</div>

## Choice Handlers

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Default Handler Id | Button List | デフォルトで使用する選択肢ハンドラーのID。
Default Metadata | Object Ref | 選択肢アクターを作成するときデフォルトで使用するメタデータ。また作成したアクターIDが存在しないときのカスタムメタデータ。
Metadata | Object Ref | 指定したIDで選択肢アクターを作成するときのメタデータ。
Default Easing | Linear | アクター変更時の全てのアニメーション（外観、位置、色合いの変更など）にデフォルトで使用するイージング関数。
Auto Show On Modify | True | 変更コマンドの実行時にアクターを自動的に表示するかどうか。

</div>

## Custom Variables

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Predefined Variables | Object Ref | デフォルトで初期化する変数のリスト。グローバル変数（ `G_` または `g_` で始まる名前）は、最初のアプリケーションの起動時に初期化され、その他は状態がリセットされるたびに初期化されます。

</div>

## Engine

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Generated Data Path | Naninovel Data | 自動生成されたアセットを格納するための、アプリケーションデータディレクトリへの相対パス。
Override Objects Layer | False | すべてのエンジンオブジェクトに特定のレイヤーを割り当てるかどうか。エンジンのカメラは、カリングマスクのレイヤーを使用します。これを使って、Naninovel オブジェクトを他のカメラによるレンダリングから分離します。
Objects Layer | 0 | `Override Objects Layer` が有効の場合に、指定したレイヤーが全てのエンジンオブジェクトに割り当てられます。
Async Exception Log Type | Error | UniTask関連の例外に使用するログタイプ。
Initialize On Application Load | True | アプリケーションの起動時にエンジンを自動的に初期化するかどうか。
Show Initialization UI | True | エンジンの初期化中にロード中UIを表示するかどうか。
Custom Initialization UI | Null | エンジンの初期化中に表示するUI（有効な場合）。指定しない場合はデフォルトを使用します。
Show Title UI | True | エンジンの初期化後にタイトル画面のUI（メインメニュー）を自動的に表示するかどうか。UIカスタマイズ機能を使用して、タイトルUIを変更できます（詳細については、オンラインガイドを参照してください）。
Enable Development Console | True | 開発コンソールを有効にするかどうか。
Toggle Console Key | Back Quote | 開発コンソールの切り替えに使用するキー。タッチスクリーンを使用する場合、マルチ（3以上）タッチに切り替えることもできます。

</div>

## Input

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Spawn Event System | True | 初期化時にイベントシステムを生成するかどうか。
Custom Event System | Null | 入力処理のために生成する、`EventSystem` コンポーネントを含むプレハブ。指定されていない場合、デフォルトを生成します。
Spawn Input Module | True | 初期化時に入力モジュールを生成するかどうか。
Custom Input Module | Null | 入力処理のために生成する、`InputModule` コンポーネントを含むプレハブ。指定されていない場合、デフォルトを生成します。
Touch Frequency Limit | 0.1 | タッチ入力の頻度を制限。秒単位。
Process Legacy Bindings | True | レガシー入力バインディングを処理するかどうか。Unityの新しい入力システムを使用していて、入力アクションに加えてレガシーバインディングを機能させたくない場合は、無効にします。
Bindings | Object Ref | 入力を処理するためのバインディング。

</div>

## Localization

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Loader | Localization- (Addressable, Project) | ローカライゼーションリソースで使用されるリソースローダーの構成。
Source Locale | En | ソースプロジェクトリソースのロケール（プロジェクトアセットが作成されている言語）。
Default Locale | Null | ゲームを初めて実行するときにデフォルトで選択されるロケール。指定しない場合は `Source Locale` が選択されます。

</div>

## Managed Text

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Loader | Text- (Addressable, Project) | 管理テキストドキュメントリソースで使用されるリソースローダーの構成。

</div>

## Movies

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Loader | Movies- (Addressable, Project) | 動画リソースで使用されるリソースローダーの構成。
Skip On Input | True | ユーザーが `キャンセル` キーをアクティブにしたときにムービーの再生をスキップするかどうか。
Skip Frames | True | 現在の時間に追いつくためにフレームをスキップするかどうか。
Fade Duration | 1 | ムービーの再生を開始/終了する際、フェードイン/フェードアウトする時間。秒単位。
Custom Fade Texture | Null | フェード中に表示するテクスチャ。指定しない場合は、シンプルな黒のテクスチャを使用します。
Play Intro Movie | False | エンジンの初期化後、メインメニューを表示する前に、ムービーを自動的に再生するかどうか。
Intro Movie Name | Null | イントロムービーリソースへのパス。

</div>

## Resource Provider

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Resource Policy | Static | スクリプトの実行中にリソースをロードおよびアンロードする時の指示: <br> • Static — スクリプトの実行に必要なすべてのリソースが、再生の開始時にプリロードされ（ロード画面でマスクされます）、スクリプトの再生が終了したときにのみアンロードされます。このポリシーはデフォルトで、ほとんどの場合に推奨されます。<br> • Dynamic — 次の `Dynamic Policy Steps` コマンドに必要なリソースのみがスクリプトの実行中にプリロードされ、未使用のすべてのリソースはすぐにアンロードされます。 このモードは、対象プラットフォームのメモリ制限が厳しく、naninovelスクリプトを適切に構成することができない場合に使用します。ゲームの進行中にリソースがバックグラウンドでロードされると、一時的な障害が発生することが予想されます。
Dynamic Policy Steps | 25 | 動的リソースポリシーが有効な場合に、プリロードするスクリプトコマンドの数を定義します。
Optimize Loading Priority | True | 動的リソースポリシーが有効の場合に、Unityのバックグラウンドロードスレッドの優先度が低に設定され、スクリプトの再生中にリソースをロードするときに問題が発生しなくなります。
Log Resource Loading | False | ロード画面でリソースのロード操作をログに記録するかどうか。
Enable Build Processing | True | Naninovelリソースとして割り当てられたアセットを処理するためのカスタムビルドプレーヤーハンドルを登録するかどうか。<br><br>注意: この設定を有効にするには、Unityエディターを再起動する必要があります。
Use Addressables | True | Addressable アセットシステムがインストールされている場合にこのプロパティを有効にすると、アセット処理ステップが最適化され、ビルド時間が改善されます。
Auto Build Bundles | True | プレーヤーの構築時に Addressable アセットバンドルを自動的に構築するかどうか。 `Use Addressables` が無効になっている場合は効果がありません。
Allow Addressable In Editor | False | エディターで Addressable プロバイダーを使用するかどうか。Naninovelのリソースマネージャーでリソースを割り当てずに Addressable アドレスを介してリソースを手動で公開する場合に有効にします。これを有効にすると、リソースがリソースマネージャーと Addressable アドレスの両方に登録し、名前の変更や複製をした場合に問題が発生する可能性があります。
Extra Labels | Null | Addressable プロバイダーは、`Naninovel` ラベルに加えてラベルが割り当てられているアセットでのみ機能します。カスタム基準（HDとSDテクスチャなど）に基づいてエンジンが使用するアセットをフィルタリングするのに使用されます。
Local Root Path | %DATA%/Resources | ローカルリソースプロバイダーのパスルート。リソースが配置されているフォルダーへの絶対パス、または以下の起点を含む相対パスを指定できます:<br> • %DATA% — ターゲットデバイス上のゲームデータフォルダー (UnityEngine.Application.dataPath).<br> • %PDATA% — ターゲットデバイス上の永続的なデータディレクトリ (UnityEngine.Application.persistentDataPath).<br> • %STREAM% — `StreamingAssets` フォルダー (UnityEngine.Application.streamingAssetsPath).<br> • %SPECIAL{F}% — OS専用フォルダ (F は System.Environment.SpecialFolder の値).
Project Root Path | Naninovel | naninovel固有のアセットが配置されている `Resources` フォルダーへの相対パス。
Google Drive Root Path | Resources | Googleドライブリソースプロバイダーに使用するパスルート。
Google Drive Request Limit | 2 | Googleドライブ APIに接続するときに許可される同時リクエストの最大数。
Google Drive Caching Policy | Smart | リソースをダウンロードする際のキャッシュポリシー。`Smart` は、Changes API を使用してドライブの変更を確認します。`PurgeAllOnInit` は、プロバイダーが初期化されるときにすべてのリソースを再ダウンロードします。

</div>

## Script Player

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Skip Time Scale | 10 | スキップ（早送り）モードのときに使用するタイムスケール。
Min Auto Play Delay | 3 | 自動再生モード中、次のコマンドを実行するまで待機する最小秒数。
Show Debug On Init | False | エンジンの初期化時にプレーヤーのデバッグウィンドウを表示するかどうか。

</div>

## Scripts

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Loader | Scripts- (Addressable, Project) | naninovel スクリプトリソースで使用されるリソースローダーの構成。
Initialization Script | Null | エンジンの初期化直後に再生するスクリプトの名前。
Title Script | Null | タイトルUIを表示するときに再生するスクリプトの名前。 タイトル画面のシーン（背景、音楽など）の設定に使用できます。
Start Game Script | Null | 新しいゲームを開始するときに再生するスクリプトの名前。指定しない場合、最初の利用可能なスクリプトが使用されます。
Auto Add Scripts | True | 作成したnaninovelスクリプトをリソースに自動的に追加するかどうか。
Hot Reload Scripts | True | ビジュアルエディターまたは外部エディターで変更されたスクリプトを再読み込みし、再生を再開せずにプレイモード中に変更を適用するかどうか。
Count Total Commands | False | サービスの初期化ですべてのnaninovelスクリプトに存在するコマンドの数を計算するかどうか。naninovelスクリプト式でスクリプトマネージャーの `TotalCommandsCount` プロパティと` CalculateProgress` 関数を使用しない場合は、無効にしてエンジンの初期化時間を短縮します。
Enable Visual Editor | True | スクリプトが選択されたときにビジュアルスクリプトエディターを表示するかどうか。
Hide Unused Parameters | True | 行がホバーまたはフォーカスされていないときに、コマンドラインで割り当てられていないパラメーターを非表示にするかどうか。
Insert Line Key | Space | ビジュアルエディターがフォーカスされているときに `行の挿入` ウィンドウを表示するホットキー。無効にするには、`None` に設定します。
Insert Line Modifier | Control | `行の挿入キー`の修飾子。無効にするには、`None` に設定します。
Save Script Key | S | ビジュアルエディターにフォーカスがあるときに、編集したスクリプトを保存（シリアル化）するホットキー。無効にするには、`None` に設定します。
Save Script Modifier | Control | `スクリプト保存キー` の修飾子。無効にするには、`None` に設定します。
Editor Page Length | 1000 | ビジュアルエディターページごとにレンダリングするスクリプト行の数。
Editor Custom Style Sheet | Null | ビジュアルエディターのデフォルトスタイルを変更できます。
Graph Orientation | Horizontal | グラフを垂直、水平のどちらで作成するか。
Graph Auto Align Padding | (10.0, 0.0) | 自動整列を実行するときに各ノードに追加するパディング。
Graph Custom Style Sheet | Null | スクリプトグラフのデフォルトスタイルを変更できます。
Enable Community Modding | False | ビルドへの外部naninovelスクリプトの追加を許可するかどうか。
External Loader | Scripts- (Local) | 外部naninovelスクリプトリソースで使用されるリソースローダーの構成。
Enable Navigator | True | 使用可能なnaninovelスクリプトを参照するためにスクリプトナビゲーターを初期化するかどうか。
Show Navigator On Init | False | スクリプトマネージャーの初期化時にnaninovelスクリプトナビゲーターを表示するかどうか。
Navigator Sort Order | 900 | スクリプトナビゲーターのUIソート順。

</div>

## Spawn

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Loader | Spawn- (Addressable, Project) | spawn リソースで使用されるリソースローダーの構成。

</div>

## State

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Save Folder Name | Saves | フォルダはゲームデータフォルダに作成されます。
Default Settings Slot Id | Settings | 設定保存ファイルの名前。
Default Global Slot Id | Global Save | グローバル保存ファイルの名前。
Save Slot Mask | Game Save{0:000} | セーブスロットの名前に使用されるマスク。
Quick Save Slot Mask | Game Quick Save{0:000} | クイックセーブスロットの命名に使用されるマスク。
Save Slot Limit | 99 | セーブスロットの最大数。
Quick Save Slot Limit | 18 | クイックセーブスロットの最大数。
Binary Save Files | True | セーブをテキストファイル（.json）ではなくバイナリファイルとして圧縮保存するかどうか。これにより、ファイルサイズが大幅に削減され、編集が難しくなります（チートを防止できます）が、セーブとロードの際により多くのメモリとCPU時間を消費します。
Load Start Delay | 0.3 | ロード操作を開始するまで待機する秒数。 ロード関連のスタッターが発生する前に、プリロードアニメーションを完了します。
Reset On Goto | True | [@goto] コマンドで別のスクリプトをロードするときに、エンジンサービスのステートをリセットしてリソースをアンロード（破棄）するかどうか。 メモリリークを防ぐため、有効にすることをお勧めします。 このオプションを無効にした場合でも、[@resetState] コマンドを使用して、いつでもステートをリセットし、リソースを手動で破棄できます。
Enable State Rollback | True | ステートのロールバック機能を有効にするかどうか。プレーヤーがスクリプトを巻き戻すことができます。
State Rollback Steps | 1024 | 実行時に保持する状態スナップショットの数。ロールバック（巻き戻し）できる量を決定します。この値を大きくすると、より多くのメモリが消費されます。
Saved Rollback Steps | 128 | セーブスロットの下でシリアル化（保存）するステートスナップショットの数。セーブしたゲームを読み込んだ後、ロールバックをどれだけ前までできるかを決定します。この値を大きくすると、セーブファイルが大きくなります。
Game State Handler | Naninovel.IO Game State Slot Manager, Elringus.Naninovel.Runtime, Version=0.0.0.0, Culture=neutral, Public Key Token=null | ローカル（セッション固有）のゲームステートを非/シリアル化するための実装。カスタムのシリアル化ハンドラーを追加する方法については、`ステート管理` ガイドを参照してください。
Global State Handler | Naninovel.IO Global State Slot Manager, Elringus.Naninovel.Runtime, Version=0.0.0.0, Culture=neutral, Public Key Token=null | グローバルのゲームステートを非/シリアル化するための実装。カスタムのシリアル化ハンドラーを追加する方法については、`ステート管理` ガイドを参照してください。
Settings State Handler | Naninovel.IO Settings Slot Manager, Elringus.Naninovel.Runtime, Version=0.0.0.0, Culture=neutral, Public Key Token=null | ゲーム設定を非/シリアル化するための実装。カスタムのシリアル化ハンドラーを追加する方法については、`ステート管理` ガイドを参照してください。

</div>

## Text Printers

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Default Printer Id | Dialogue | デフォルトで使用するテキストプリンターのID。
Max Reveal Delay | 0.06 | テキストメッセージを表示するときの待ち時間の制限（秒単位）。表示速度は、ゲーム設定の `message speed` で設定されます。この値は、使用可能な範囲を定義します（値が高いほど、表示速度が低くなります）。
Max Auto Wait Delay | 0.02 | オートプレイモードの続行を待機している間の、各表示キャラクターの待ち時間の制限（秒単位）。待ち時間は、ゲーム設定の `auto delay` で設定されます。この値は、使用可能な範囲を定義します。
Scale Auto Wait | True | オートプレイモードでの待機時間を、プリントコマンドで設定した表示速度でスケーリングするかどうか。
Default Metadata | Object Ref | テキストプリンターアクターを作成するときデフォルトで使用するメタデータ。また作成したアクターIDが存在しないときのカスタムメタデータ。
Metadata | Object Ref | 指定したIDでテキストプリンターアクターを作成するときのメタデータ。
Scene Origin | (0.5, 0.0) | シーンにアクターを配置するときに参照する起点。
Z Offset | 100 | アクターの作成時に設定する、アクターからカメラへの初期Z軸オフセット（深さ）。
Z Step | 0.1 | アクターが作成されたときにアクター間に設定するZ軸による距離。 Zファイティングの問題を防ぐために使用されます。
Default Easing | Linear | アクター変更時の全てのアニメーション（外観、位置、色合いの変更など）にデフォルトで使用するイージング関数。
Auto Show On Modify | False | 変更コマンドの実行時にアクターを自動的に表示するかどうか。

</div>

## UI

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Loader | UI- (Addressable, Project) | UIリソースで使用されるリソースローダーの構成。
Objects Layer | 5 | エンジンによってインスタンス化されたUI要素に割り当てるレイヤー。`UI切り替え` 機能を使用するときにUIをカリングするのに使用されます。
Render Mode | Screen Space Camera | すべてのマネージドUI要素に適用するキャンバスレンダリングモード。
Sorting Offset | 1 | すべてのマネージドUI要素に適用するソートオフセット。

</div>

## Unlockables

<div class="config-table">

プロパティ | デフォルト値 | 説明
--- | --- | ---
Loader | Unlockables- (Addressable, Project) | 収集アイテムリソースで使用されるリソースローダーの構成。

</div>
