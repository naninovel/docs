# コンフィグレーション

エンジン構成は、`Assets/NaninovelData/Resources/Naninovel/Configuration` フォルダにある複数のスクリプタブルオブジェクトアセットに保存されます。これらは、Unityエディタで対応する構成メニューを初めて開いたときに自動的に生成されます。

`Naninovel -> Configuration` または `Edit -> Project Settings -> Naninovel` を使用して、構成メニューにアクセスします。

すべての構成メニューは [Unityのプリセット機能](https://docs.unity3d.com/Manual/Presets) をサポートしていることに注意してください。異なるターゲットプラットフォーム（モバイル、スタンドアロン、コンソールなど）にデプロイするときに、いくつかの構成プリセットを作成すると便利です。

![](https://i.gyazo.com/55f5c74bfc16e1af2455034647525df3.mp4)

実行時に構成オブジェクトを変更したり、新しいカスタム構成を追加したり、実行時にオブジェクトにアクセスする方法を変更したりできます（リモートホストに保存されたJSONファイルから構成を読み取るなど）。詳細については、[カスタムコンフィグレーション](/ja/guide/custom-configuration) ガイドを参照してください。

## オーディオ

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Audio Loader | Audio- (Addressable, Project) | オーディオ（BGMおよびSFX）リソースで使用されるリソースローダーの構成。 |
| Voice Loader | Voice- (Addressable, Project) | ボイスリソースで使用されるリソースローダーの構成。 |
| Audio Player | Naninovel Audio Player | オーディオクリップの再生を担当するIAudioPlayerの実装。 |
| Default Master Volume | 1 | ゲームの初回起動時に設定するマスターボリューム。 |
| Default Bgm Volume | 1 | ゲームの初回起動時に設定するBGMボリューム。 |
| Default Sfx Volume | 1 | ゲームの初回起動時に設定するSFXボリューム。 |
| Default Voice Volume | 1 | ゲームの初回起動時に設定するボイスボリューム。 |
| Enable Auto Voicing | False | 有効にすると、各 [@print] コマンドは関連するボイスクリップの再生を試みます。 |
| Voice Overlap Policy | Prevent Overlap | 同時音声再生の処理方法を指定します:<br> • Allow Overlap — 同時音声は制限なく再生されます。<br> • Prevent Overlap — 新しいボイスクリップを再生する前に再生中のボイスクリップを停止することで、同時音声再生を防ぎます。<br> • Prevent Character Overlap — キャラクターごとの同時音声再生を防ぎます。異なるキャラクターの音声（オートボイス）と任意の数の [@voice] コマンドは同時に再生できます。 |
| Voice Locales | Null | ローカライズタグを割り当てて、メインのローカライズとは独立してゲーム設定で音声言語を選択できるようにします。 |
| Default Fade Duration | 0.35 | オーディオの再生を開始または停止するときのボリュームフェードイン/アウトのデフォルト期間。 |
| Play Sfx While Skipping | True | スキップモード中に非ループ効果音（SFX）を再生するかどうか。無効にすると、スキップ中に `loop!` なしの [@sfx] コマンドは無視されます。 |
| Custom Audio Mixer | Null | オーディオグループを制御するオーディオミキサー。指定しない場合、デフォルトのものが使用されます。 |
| Master Group Path | Master | マスターボリュームを制御するミキサーのグループのパス。 |
| Master Volume Handle Name | Master Volume | マスターボリュームを制御するミキサーのハンドル（公開パラメータ）の名前。 |
| Bgm Group Path | Master/BGM | 背景音楽のボリュームを制御するミキサーのグループのパス。 |
| Bgm Volume Handle Name | BGM Volume | 背景音楽のボリュームを制御するミキサーのハンドル（公開パラメータ）の名前。 |
| Sfx Group Path | Master/SFX | 効果音のボリュームを制御するミキサーのグループのパス。 |
| Sfx Volume Handle Name | SFX Volume | 効果音のボリュームを制御するミキサーのハンドル（公開パラメータ）の名前。 |
| Voice Group Path | Master/Voice | 音声のボリュームを制御するミキサーのグループのパス。 |
| Voice Volume Handle Name | Voice Volume | 音声のボリュームを制御するミキサーのハンドル（公開パラメータ）の名前。 |

</div>

## 背景

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Default Metadata | Object Ref | 背景アクターを作成するときにデフォルトで使用するメタデータ。作成されたアクターIDのカスタムメタデータが存在しない場合に使用されます。 |
| Metadata | Object Ref | 特定のIDで背景アクターを作成するときに使用するメタデータ。 |
| Shared Poses | Object Ref | 背景間で共有される名前付き状態（ポーズ）。ポーズ名は [@back] コマンドで外観として使用して、関連する状態の有効なプロパティを設定できます。 |
| Scene Origin | (0.50, 0.00) | 管理対象アクターの原点と見なされるシーン上の参照点。配置には影響しません。 |
| Z Offset | 100 | アクターが作成されるときに設定される、アクターからカメラへの初期Z軸オフセット（深度）。 |
| Z Step | 0.1 | アクターが作成されるときにアクター間に設定されるZ軸による距離。Zファイティングの問題を防ぐために使用されます。 |
| Default Duration | 0.35 | すべてのアクターの変更（外観、位置、色合いの変更など）のデフォルトの期間（秒単位）。 |
| Default Easing | Linear | すべてのアクター変更アニメーション（外観、位置、色合いの変更など）にデフォルトで使用するイージング関数。 |
| Auto Show On Modify | True | 変更コマンドを実行するときにアクターを自動的に表示（公開）するかどうか。 |

</div>

## カメラ

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Reference Resolution | (1920, 1080) | 参照解像度は、アクターがシーンに正しく配置されるように、適切なレンダリング寸法を評価するために使用されます。原則として、これをゲーム用に作成する背景テクスチャの解像度と同じに設定します。 |
| Reference PPU | 100 | シーン単位に対応するピクセル数。これを減らすとすべてのアクターが小さく見え、逆も同様です。ほとんどの場合、デフォルト値の100をお勧めします。 |
| Match Screen Width | False | 参照シーンの矩形の幅を画面の幅に合わせるかどうか。有効にすると、相対（シーン）位置の評価は画面の境界を原点として使用します。それ以外の場合は、参照解像度が使用されます。 |
| Initial Position | (0.00, 0.00, -10.00) | 管理対象カメラの初期ワールド位置。 |
| Custom Camera Prefab | Null | レンダリングに使用するカメラコンポーネントを持つプレハブ。指定しない場合、デフォルトのものが使用されます。カメラのプロパティ（背景色、FOV、HDRなど）を設定したり、ポストプロセススクリプトを追加したりする場合は、目的のカメラ設定でプレハブを作成し、そのプレハブをこのフィールドに割り当てます。 |
| Use UI Camera | True | 専用のカメラでUIをレンダリングするかどうか。このオプションは下位互換性のためであり、新しいプロジェクトでは無効にしないでください。無効にすると問題が発生することが予想されます（例：カメラアニメーションでのuGUIレイアウトの絶え間ない再構築）。 |
| Custom UI Camera Prefab | Null | UIレンダリングに使用するカメラコンポーネントを持つプレハブ。指定しない場合、デフォルトのものが使用されます。`Use UI Camera` が無効になっている場合は効果がありません。 |
| Default Duration | 0.35 | すべてのカメラ変更（ズーム、位置、回転の変更など）のデフォルトの期間（秒単位）。 |
| Default Easing | Linear | すべてのカメラ変更（ズーム、位置、回転の変更など）にデフォルトで使用するイージング関数。 |
| Disable Rendering | False | エンジンが初期化されるときに、デフォルトでNaninovelカメラを無効にするかどうか。Naninovelが組み込みのダイアログシステムとして統合されており、初期化後にレンダリングすべきではない場合に役立ちます。 |
| Capture Thumbnails | True | ゲームを保存するときに小さな画面プレビューをキャプチャするかどうか。これらのプレビューはセーブスロットで使用されます。 |
| Thumbnail Resolution | (240, 140) | ゲームのセーブスロットをプレビューするためのサムネイルがキャプチャされる解像度。 |
| Hide UI In Thumbnails | False | サムネイルをキャプチャするときにUIレイヤーを無視するかどうか。 |

</div>

## キャラクター

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Auto Arrange On Add | True | 位置を指定せずに新しいキャラクターを追加するときに、X軸でキャラクターを均等に配置するかどうか。 |
| Arrange Range | (0.00, 1.00) | キャラクターが配置される範囲を表す、シーン幅に対する開始（x）および終了（y）位置（0.0〜1.0の範囲）。 |
| Default Metadata | Object Ref | キャラクターアクターを作成するときにデフォルトで使用するメタデータ。作成されたアクターIDのカスタムメタデータが存在しない場合に使用されます。 |
| Metadata | Object Ref | 特定のIDでキャラクターアクターを作成するときに使用するメタデータ。 |
| Avatar Loader | Character Avatars- (Addressable, Project) | キャラクターアバターテクスチャリソースで使用されるリソースローダーの構成。 |
| Shared Poses | Object Ref | キャラクター間で共有される名前付き状態（ポーズ）。ポーズ名は [@char] コマンドで外観として使用して、関連する状態の有効なプロパティを設定できます。 |
| Scene Origin | (0.50, 0.00) | 管理対象アクターの原点と見なされるシーン上の参照点。配置には影響しません。 |
| Z Offset | 50 | アクターが作成されるときに設定される、アクターからカメラへの初期Z軸オフセット（深度）。 |
| Z Step | 0.1 | アクターが作成されるときにアクター間に設定されるZ軸による距離。Zファイティングの問題を防ぐために使用されます。 |
| Default Duration | 0.35 | すべてのアクターの変更（外観、位置、色合いの変更など）のデフォルトの期間（秒単位）。 |
| Default Easing | Smooth Step | すべてのアクター変更アニメーション（外観、位置、色合いの変更など）にデフォルトで使用するイージング関数。 |
| Auto Show On Modify | True | 変更コマンドを実行するときにアクターを自動的に表示（公開）するかどうか。 |

</div>

## 選択肢ハンドラー

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Default Handler Id | Button List | デフォルトで使用する選択肢ハンドラーのID。 |
| Choice Button Loader | Choice Buttons- (Addressable, Project) | カスタム選択肢ボタンのロードに使用されるリソースローダーの構成。 |
| Default Metadata | Object Ref | 選択肢ハンドラーアクターを作成するときにデフォルトで使用するメタデータ。作成されたアクターIDのカスタムメタデータが存在しない場合に使用されます。 |
| Metadata | Object Ref | 特定のIDで選択肢ハンドラーアクターを作成するときに使用するメタデータ。 |
| Default Duration | 0.35 | すべてのアクターの変更（外観、位置、色合いの変更など）のデフォルトの期間（秒単位）。 |
| Default Easing | Linear | すべてのアクター変更アニメーション（外観、位置、色合いの変更など）にデフォルトで使用するイージング関数。 |
| Auto Show On Modify | False | 変更コマンドを実行するときにアクターを自動的に表示（公開）するかどうか。 |

</div>

## カスタム変数

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Default Scope | Local | 'Global' に設定すると、名前が 'g_' 接頭辞で始まらない場合でも、すべての変数がグローバルとして扱われます。グローバル変数は新しいゲームを開始するときにリセットされず、変更時に自動保存されます。エンジンが常にリセットされ、ゲームの状態が外部で処理されるダイアログモードに役立ちます。 |
| Predefined Variables | Object Ref | デフォルトで初期化する変数のリスト。グローバル変数（`g_` で始まる名前）は最初のアプリケーション起動時に初期化され、その他は各状態リセット時に初期化されます。 |

</div>

## エンジン

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Override Objects Layer | False | すべてのエンジンオブジェクトに特定のレイヤーを割り当てるかどうか。エンジンのカメラはカリングマスクにそのレイヤーを使用します。これを使用して、Naninovelオブジェクトが他のカメラによってレンダリングされないように分離します。 |
| Objects Layer | 0 | `Override Objects Layer` が有効な場合、指定されたレイヤーがすべてのエンジンオブジェクトに割り当てられます。 |
| Async Instantiation | True | エンジンオブジェクトのインスタンス化に `Object.InstantiateAsync` を使用するかどうか。これにより、関連する作業のほとんどがメインスレッドから外れます。問題が発生しない限り、有効のままにしてください。 |
| Initialize On Application Load | True | アプリケーションの起動時にエンジンを自動的に初期化するかどうか。 |
| Check Unity Version | True | Unityのバージョンがサポートされていない場合に警告するかどうか。 |
| Scene Independent | True | エンジンオブジェクトに `DontDestroyOnLoad` を適用して、その寿命をロードされたシーンから独立させるかどうか。無効にすると、オブジェクトはエンジンが初期化されたUnityシーンの一部になり、シーンがアンロードされると破棄されます。 |
| Show Initialization UI | True | エンジンの初期化中にロードUIを表示するかどうか。 |
| Custom Initialization UI | Null | エンジンの初期化中に表示するUI（有効な場合）。指定しない場合、デフォルトのものが使用されます。 |
| Enable Bridging | True | 外部のNaninovelツール（IDE拡張機能、Webエディタなど）と通信するためのブリッジングサーバーを自動的に開始するかどうか。 |
| Auto Generate Metadata | True | Unityエディタの起動時およびC#スクリプトのコンパイル後にプロジェクトメタデータを自動的に生成するかどうか。 |
| Enable Development Console | True | 開発コンソールを有効にするかどうか。 |
| Debug Only Console | False | 有効にすると、開発コンソールは開発（デバッグ）ビルドでのみ使用可能になります。 |

</div>

## 入力

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Spawn Event System | True | Naninovel固有のイベントシステムをスポーンするかどうか。uGUIインタラクションに必要です。自分でイベントシステムを初期化したい場合は無効にしてください。 |
| Event System | Null | エンジン初期化時にスポーンし、入力処理に使用する `EventSystem` コンポーネントを持つプレハブ。割り当てられていない場合は、デフォルトのイベントシステムを使用します。 |
| Input Actions | Null | UnityのInput Systemがインストールされている場合は、ここで入力アクションアセットを割り当てます。<br><br>入力アクションをNaninovelの入力サンプラーにマップするには、`Naninovel` アクションマップを作成し、入力名と同じ名前のアクションを追加します。<br><br>割り当てられていない場合は、デフォルトの入力アクションを使用します。 |
| Action Maps | Object Ref | Naninovel入力に登録する、指定された 'Input Actions' アセット内の入力アクションマップ名。 |
| Detect Input Mode | True | 関連するデバイスがアクティブになったときに入力モードを変更するかどうか。例：ゲームパッドのボタンが押されたときにゲームパッドに切り替え、マウスボタンがクリックされたときにマウスに戻します。 |
| Disable Input | False | エンジンが初期化されるときに、デフォルトで入力処理を無効にするかどうか。Naninovelが組み込みのダイアログシステムとして統合されており、初期化後にユーザー入力に反応すべきではない場合に役立ちます。 |

</div>

## ローカライズ

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Loader | Localization- (Addressable, Project) | ローカライズリソースで使用されるリソースローダーの構成。 |
| Languages | Object Ref | デフォルトの言語表示名にマップされたRFC5646言語タグ。変更を有効にするには、Unityエディタを再起動してください。 |
| Source Locale | En | ソースプロジェクトリソースのロケール（プロジェクトアセットが作成されている言語）。 |
| Expose Source Locale | True | ソースロケールをエンドユーザー（プレイヤー）が利用できるようにするかどうか。つまり、言語選択に含めるかどうか。<br><br>このオプションを無効にすると、ソースのローカライズ可能なテキストをサードパーティ（校正用など）と共有したいが、シナリオスクリプトは共有したくない場合に役立ちます。その場合、このオプションを無効にし、ソースマテリアル専用のロケールを追加します。その後、ローカライズドキュメントまたはスプレッドシートにエクスポートできます。 |
| Default Locale | Null | ゲームを初めて実行するときにデフォルトで選択されるロケール。指定しない場合、`Source Locale` が選択されます。 |
| Auto Detect Locale | True | 有効で、ゲームが初めて実行されている場合、システム言語に基づいてロケールを自動的に検出しようとします。成功し、そのロケールがゲームでサポートされている場合は、それを選択します。それ以外の場合は、'Default Locale' にフォールバックします。 |
| Record Separator | | | 汎用テキストラインの一部やローカライズ可能なパラメータ値など、一般的なローカライズされたスクリプトレコードを結合するためのテキスト文字。 |
| Annotation Prefix | > | ローカライズされたテキストの注釈行を区別するために、注釈行の前に挿入するテキスト文字。注釈は、表示されたテキストメッセージの著者、インラインコマンド、ローカライズされたパラメータを含むコマンドラインなど、翻訳者に追加のコンテキストを提供するために、生成されたローカライズドキュメントにオプションで追加されるコメントです。スタブ文字は、ローカライズするテキストを含む次のコメント行で複製されるため、このような注釈のローカライズされた部分を置き換えるために使用されます。 |

</div>

## 管理テキスト

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Loader | Text- (Addressable, Project) | 管理テキストドキュメントで使用されるリソースローダーの構成。 |
| Multiline Documents | Object Ref | 複数行形式を使用する管理テキストドキュメントのローカルリソースパス。 |

</div>

## ムービー

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Loader | Movies- (Addressable, Project) | ムービーリソースで使用されるリソースローダーの構成。 |
| Skip On Input | True | ユーザーが `cancel` 入力キーをアクティブにしたときにムービーの再生をスキップするかどうか。 |
| Skip Frames | True | 現在の時間に追いつくためにフレームをスキップするかどうか。 |
| Fade Duration | 1 | ムービーの再生を開始/終了する前にフェードイン/アウトする時間（秒単位）。 |
| Custom Fade Texture | Null | フェード中に表示するテクスチャ。指定しない場合、単純な黒のテクスチャが使用されます。 |
| Play Intro Movie | False | エンジンの初期化後、メインメニューを表示する前にムービーを自動的に再生するかどうか。 |
| Intro Movie Name | Null | イントロムービーリソースへのパス。 |

</div>

## リソースプロバイダー

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Resource Policy | Conservative | スクリプト実行中にリソースをいつロードおよびアンロードするかを指定します:<br><br> • Conservative — バランスの取れたメモリ使用率のデフォルトモード。スクリプト実行に必要なすべてのリソースは、再生開始時にプリロードされ、スクリプトの再生が終了したときにアンロードされます。[@gosub] コマンドで参照されるスクリプトもプリロードされます。[@goto] コマンドの `hold` パラメータを使用して、追加のスクリプトをプリロードできます。<br><br> • Optimistic — 再生されるスクリプトに必要なすべてのリソース、および [@goto] および [@gosub] コマンドで指定されたスクリプトのすべてのリソースはプリロードされ、[@goto] コマンドで `release` パラメータが指定されていない限りアンロードされません。これにより、ロード画面が最小限に抑えられ、スムーズなロールバックが可能になりますが、リソースをいつアンロードするかを手動で指定する必要があり、メモリ不足例外のリスクが高まります。<br><br> • Lazy — 再生開始時に実行されるスクリプトのリソースはプリロードされず、ロード画面は自動的に表示されません。代わりに、次のいくつかのコマンドに必要なリソースのみがスクリプトの再生中に「オンザフライ」でロードされ、実行されたコマンドで使用されたリソースはすぐに解放されます。このポリシーはシナリオの計画や手動制御を必要とせず、メモリ消費量が最も少なくなりますが、バックグラウンドでリソースがロードされるため、特に早送り（スキップモード）やロールバックを実行するときに、ゲームプレイ中にスタッターが発生する可能性があります。 |
| Lazy Buffer | 25 | Lazyリソースポリシーが有効な場合、プリロードバッファのサイズ、つまりプリロードするスクリプトコマンドの最大数を制御します。 |
| Lazy Priority | Below Normal | Lazyリソースポリシーが有効な場合、リソースがロードされるバックグラウンドスレッドの優先度を制御します。スタッターを最小限に抑えるには減らしますが、ロード時間が長くなります。 |
| Remove Actors | True | スクリプトリソースをアンロードするときに、未使用のアクター（キャラクター、背景、テキストプリンター、選択肢ハンドラー）を自動的に削除するかどうか。有効になっていても、`@remove` コマンドを使用して手動でいつでもアクターを削除できることに注意してください。 |
| Log Resource Loading | False | リソースのアンロード/ロード操作をログに記録するかどうか。 |
| Enable Build Processing | True | Naninovelリソースとして割り当てられたアセットを処理するために、カスタムビルドプレイヤーハンドルを登録するかどうか。<br><br>警告：この設定を有効にするには、Unityエディタを再起動する必要があります。 |
| Use Addressables | True | Addressable Asset Systemがインストールされている場合、このプロパティを有効にすると、アセット処理ステップが最適化され、ビルド時間が短縮されます。 |
| Auto Build Bundles | True | プレイヤーをビルドするときにAddressableアセットバンドルを自動的にビルドするかどうか。`Use Addressables` が無効になっている場合は効果がありません。 |
| Label By Scripts | True | すべてのNaninovel Addressableアセットに、それらが使用されているシナリオスクリプトパスでラベルを付けるかどうか。Addressableグループ設定で `Bundle Mode` が `Pack Together By Label` に設定されている場合、より効率的なバンドルパッキングになります。<br><br>スクリプトラベルは、「Naninovel」ラベルを持つすべてのアセットに割り当てられることに注意してください。これには、リソースエディタメニューを使用せずにAddressableリソースプロバイダーに手動で公開されたアセットが含まれます。 |
| Extra Labels | Null | Addressableプロバイダーは、`Naninovel` ラベルに加えて割り当てられたラベルを持つアセットでのみ機能します。カスタム基準（例：HDテクスチャとSDテクスチャ）に基づいてエンジンで使用されるアセットをフィルタリングするために使用できます。 |
| Local Root Path | %DATA%/Resources | ローカルリソースプロバイダーに使用するパスルート。リソースが配置されているフォルダへの絶対パス、または使用可能なオリジンの1つを使用した相対パスにすることができます:<br> • %DATA% — ターゲットデバイス上のゲームデータフォルダ（UnityEngine.Application.dataPath）。<br> • %PDATA% — ターゲットデバイス上の永続データディレクトリ（UnityEngine.Application.persistentDataPath）。<br> • %STREAM% — `StreamingAssets` フォルダ（UnityEngine.Application.streamingAssetsPath）。<br> • %SPECIAL{F}% — OSの特別なフォルダ（FはSystem.Environment.SpecialFolderからの値）。 |
| Video Stream Extension | .mp 4 | WebGLでビデオをストリーミングする場合（ムービー、ビデオ背景）、ビデオファイルの拡張子を指定します。 |
| Reload Scripts | True | ローカルプロバイダーディレクトリの下に保存されている変更されたシナリオスクリプトを監視してホットリロードするかどうか。 |
| Project Root Path | Naninovel | `Resources` フォルダに対する相対パス。Naninovel固有のアセットはこの下に配置されます。 |

</div>

## スクリプトプレイヤー

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Default Skip Mode | Read Only | ゲームの初回起動時に設定するデフォルトのスキップモード。 |
| Skip Time Scale | 10 | スキップ（早送り）モードで使用するタイムスケール。スキップ時にタイムスケールを変更しないようにするには、1に設定します。 |
| Min Auto Play Delay | 1 | オートプレイモード中に次のコマンドを実行する前に待機する最小秒数。 |
| Complete On Continue | True | `Continue` 入力がアクティブになったときに、時間の経過とともに実行されるブロッキング（`wait!`）コマンド（例：アニメーション、表示/非表示、色合いの変更など）を即座に完了するかどうか。 |
| Show Debug On Init | False | エンジン初期化時にプレイヤーデバッグウィンドウを表示するかどうか。 |
| Wait By Default | False | `wait` パラメータが明示的に指定されていない場合に、再生されたコマンドを待つかどうか。待機可能な（非同期）コマンドにのみ適用されます。<br><br>警告：このオプションは下位互換性のために保持されており、次のリリースで削除されるため、新しいプロジェクトでは有効にしないでください。 |
| Show Loading UI | False | スクリプトのプリロード/ロードおよびエンジンリセット操作中に `ILoadingUI` を自動的に表示するかどうか。リソースのロードプロセスをロード画面でマスクできます。 |

</div>

## スクリプト

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Loader | Scripts- (Addressable, Project) | Naninovelスクリプトリソースで使用されるリソースローダーの構成。 |
| Script Compiler | Naninovel Script Compiler | ソースシナリオテキストをスクリプトアセットに変換するために使用するIScriptCompiler実装。変更を有効にするには、この設定を変更した後にスクリプトアセットを再インポートします。 |
| Compiler Localization | (Naninovel.Compiler Localization) | ロケール固有のNaniScriptコンパイラオプション。メタデータ同期時にIDE拡張機能に伝播します。変更を有効にするには、Unityエディタを再起動し、スクリプトアセットを再インポートします。 |
| Initialization Script | Null | エンジン初期化直後に再生するスクリプトのローカルリソースパス。 |
| Title Script | Title | タイトルUIを表示するときに再生するスクリプトのローカルリソースパス。タイトル画面シーン（背景、音楽など）の設定に使用できます。 |
| Start Game Script | Entry | 新しいゲームを開始するときに再生するスクリプトのローカルリソースパス。指定しない場合、最初に使用可能なものが使用されます。 |
| Auto Add Scripts | True | 作成されたNaninovelスクリプトをリソースに自動的に追加するかどうか。 |
| Auto Resolve Path | True | スクリプトが作成、名前変更、または移動されたときに、リソースパスを自動的に解決して更新するかどうか。 |
| Hot Reload Scripts | True | 変更された（ビジュアルエディタと外部エディタの両方を介して）スクリプトをリロードし、再生を再開せずにプレイモード中に変更を適用するかどうか。 |
| Watch Scripts | True | '.nani' ファイルに対してファイルシステムウォッチャーを実行するかどうか。外部アプリケーションで編集されたときにスクリプトの変更を登録するために必要です。 |
| Show Script Navigator | False | エンジンが初期化された後にスクリプトナビゲーターUIを自動表示するかどうか（UIリソースで 'IScriptNavigatorUI' が利用可能である必要があります）。 |
| Enable Story Editor | True | 従来のビジュアルエディタとスクリプトグラフの代わりに、新しいストーリーエディタを使用するかどうか。 |
| Show Selected Script | True | 選択したシナリオスクリプトアセットをストーリーエディタ内で開くかどうか。 |
| Enable Visual Editor | True | スクリプトが選択されたときに従来のビジュアルスクリプトエディタを表示するかどうか。ストーリーエディタが有効な場合は効果がありません。 |
| Hide Unused Parameters | True | 行がホバーまたはフォーカスされていないときに、コマンドラインの未割り当てパラメータを非表示にするかどうか。 |
| Select Played Script | True | ビジュアルエディタが開いているときに、現在再生中のスクリプトを自動的に選択するかどうか。 |
| Insert Line Key | Space | ビジュアルエディタがフォーカスされているときに「行の挿入」ウィンドウを表示するために使用されるホットキー。「None」に設定すると無効になります。 |
| Insert Line Modifier | Control | 「行の挿入キー」の修飾子。「None」に設定すると無効になります。 |
| Indent Line Key | Right Arrow | 行をインデントするために使用されるホットキー。「None」に設定すると無効になります。 |
| Indent Line Modifier | Control | 「行のインデントキー」の修飾子。「None」に設定すると無効になります。 |
| Unindent Line Key | Left Arrow | 行のインデントを解除するために使用されるホットキー。「None」に設定すると無効になります。 |
| Unindent Line Modifier | Control | 「行のインデント解除キー」の修飾子。「None」に設定すると無効になります。 |
| Save Script Key | S | ビジュアルエディタがフォーカスされているときに、編集されたスクリプトを保存（シリアル化）するために使用されるホットキー。「None」に設定すると無効になります。 |
| Save Script Modifier | Control | 「スクリプトの保存キー」の修飾子。「None」に設定すると無効になります。 |
| Rewind Mouse Button | 0 | ビジュアルエディタで行をクリックしたときに、どのマウスボタンで巻き戻しをアクティブにするか：'0' は左、'1' は右、'2' は中。'-1' に設定すると無効になります。 |
| Rewind Modifier | Shift | 「巻き戻しマウスボタン」の修飾子。「None」に設定すると無効になります。 |
| Editor Page Length | 300 | ビジュアルエディタページごとにレンダリングするスクリプト行の数。 |
| Editor Custom Style Sheet | Null | ビジュアルエディタのデフォルトスタイルを変更できます。 |
| Graph Orientation | Horizontal | グラフを垂直に構築するか水平に構築するか。 |
| Graph Auto Align Padding | (10.00, 0.00) | 自動整列を実行するときに各ノードに追加するパディング。 |
| Show Synopsis | True | グラフノード内にスクリプトの最初のコメント行を表示するかどうか。 |
| Graph Custom Style Sheet | Null | スクリプトグラフのデフォルトスタイルを変更できます。 |
| Enable Community Modding | False | 外部のNaninovelスクリプトをビルドに追加することを許可するかどうか。 |
| External Loader | Scripts- (Local) | 外部のNaninovelスクリプトリソースで使用されるリソースローダーの構成。 |

</div>

## スポーン

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Loader | Spawn- (Addressable, Project) | スポーンリソースで使用されるリソースローダーの構成。 |

</div>

## ステート

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Save Folder Name | Saves | フォルダはゲームデータフォルダに作成されます。 |
| Default Settings Slot Id | Settings | 設定セーブファイルの名前。 |
| Default Global Slot Id | Global Save | グローバルセーブファイルの名前。 |
| Save Slot Mask | Game Save{0:000} | セーブスロットの名前付けに使用されるマスク。 |
| Quick Save Slot Mask | Game Quick Save{0:000} | クイックセーブスロットの名前付けに使用されるマスク。 |
| Auto Save Slot Mask | Game Auto Save{0:000} | オートセーブスロットの名前付けに使用されるマスク。 |
| Save Slot Limit | 99 | セーブスロットの最大数。 |
| Quick Save Slot Limit | 18 | クイックセーブスロットの最大数。 |
| Auto Save Slot Limit | 18 | オートセーブスロットの最大数。 |
| Auto Save On Quit | True | タイトルに戻る前、またはタイトルメニューにないときにアプリケーションが閉じられたときに、ゲームを自動保存するかどうか（エディタでは機能しません）。 |
| Binary Save Files | True | セーブをテキストファイル（.json）ではなくバイナリファイル（.nson）として圧縮して保存するかどうか。これにより、ファイルサイズが大幅に縮小され、編集が困難になります（不正行為を防ぐため）が、保存およびロード時にメモリとCPU時間をより多く消費します。 |
| Reset On Goto | False | [@goto] コマンドを介して別のスクリプトをロードするときに、エンジンサービスの状態をリセットするかどうか。[@resetState] コマンドの代わりに使用して、各gotoですべてのリソースを自動的にアンロードできます。 |
| Show Loading UI | True | ゲーム状態のロード中に `ILoadingUI` を自動的に表示するかどうか。 |
| Enable State Rollback | True | プレイヤーがスクリプトを逆方向に巻き戻せるようにする状態ロールバック機能を有効にするかどうか。<br><br>ロールバック機能にはパフォーマンスコストがかかります。これは、プレイヤーのインタラクションごとにゲーム状態全体を効果的にシリアル化するため、多くのヒープ割り当てが発生するためです。ゲームにロールバック機能が必要ない場合は、単にロールバック入力を削除するのではなく、ここで無効にしてください。<br><br>ここで無効にしても、Unityエディタではホットリロード機能に必要なため、ロールバックは有効のままになることに注意してください。構成はプレイヤービルドで尊重されます。 |
| State Rollback Steps | 1024 | 実行時に保持する状態スナップショットの数。ロールバック（巻き戻し）をどのくらい遡って実行できるかを決定します。この値を増やすと、より多くのメモリを消費します。 |
| Saved Rollback Steps | 128 | セーブゲームスロットの下にシリアル化（保存）する状態スナップショットの数。保存されたゲームをロードした後にロールバックをどのくらい遡って実行できるかを決定します。この値を増やすと、セーブゲームファイルが大きくなります。 |
| Recovery Rollback | True | セーブが行われた後にスクリプトが変更されたゲーム状態をロードするときに、再生されたスクリプトの最初にロールバックするかどうか。 |
| Game State Handler | Naninovel Universal Game State Serializer | ローカル（セッション固有）ゲーム状態の逆シリアル化/シリアル化を担当する実装。カスタムシリアル化ハンドラーを追加する方法については、`State Management` ガイドを参照してください。 |
| Global State Handler | Naninovel Universal Global State Serializer | グローバルゲーム状態の逆シリアル化/シリアル化を担当する実装。カスタムシリアル化ハンドラーを追加する方法については、`State Management` ガイドを参照してください。 |
| Settings State Handler | Naninovel Universal Settings State Serializer | ゲーム設定の逆シリアル化/シリアル化を担当する実装。カスタムシリアル化ハンドラーを追加する方法については、`State Management` ガイドを参照してください。 |

</div>

## テキストプリンター

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Default Printer Id | Dialogue | デフォルトで使用するテキストプリンターのID。 |
| Default Base Reveal Speed | 0.5 | ゲームの初回起動時に設定する基本表示速度（ゲーム設定）。 |
| Default Base Auto Delay | 0.5 | ゲームの初回起動時に設定する基本自動遅延（ゲーム設定）。 |
| Max Reveal Delay | 0.06 | テキストメッセージを表示（印刷）するときの遅延制限（秒単位）。特定の表示速度はゲーム設定の `message speed` で設定されます。この値は使用可能な範囲を定義します（値が大きいほど、表示速度は遅くなります）。 |
| Max Auto Wait Delay | 0.02 | オートプレイモードで続行を待機しているときに、印刷された文字ごとの遅延制限（秒単位）。特定の遅延はゲーム設定の `auto delay` で設定されます。この値は使用可能な範囲を定義します。 |
| Scale Auto Wait | True | オートプレイモードでの待機時間を、printコマンドで設定された表示速度でスケーリングするかどうか。 |
| Skip Print Delay | 0 | ゼロより大きい場合、スキップ再生モード（早送り）が有効になっている間、各printコマンドは指定された時間（秒単位、スケーリングなし）待機します。スキップ中に再生を遅くするために使用します。 |
| Default Metadata | Object Ref | テキストプリンターアクターを作成するときにデフォルトで使用するメタデータ。作成されたアクターIDのカスタムメタデータが存在しない場合に使用されます。 |
| Metadata | Object Ref | 特定のIDでテキストプリンターアクターを作成するときに使用するメタデータ。 |
| Scene Origin | (0.50, 0.00) | 管理対象アクターの原点と見なされるシーン上の参照点。配置には影響しません。 |
| Z Offset | 0 | アクターが作成されるときに設定される、アクターからカメラへの初期Z軸オフセット（深度）。 |
| Z Step | 0 | アクターが作成されるときにアクター間に設定されるZ軸による距離。Zファイティングの問題を防ぐために使用されます。 |
| Default Duration | 0.35 | すべてのアクターの変更（外観、位置、色合いの変更など）のデフォルトの期間（秒単位）。 |
| Default Easing | Linear | すべてのアクター変更アニメーション（外観、位置、色合いの変更など）にデフォルトで使用するイージング関数。 |
| Auto Show On Modify | False | 変更コマンドを実行するときにアクターを自動的に表示（公開）するかどうか。 |

</div>

## UI

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| UI Loader | UI- (Addressable, Project) | UIリソースで使用されるリソースローダーの構成。 |
| Font Loader | Fonts- (Addressable, Project) | フォントリソースで使用されるリソースローダーの構成。 |
| Override Objects Layer | True | エンジンによって管理されるすべてのUIオブジェクトに特定のレイヤーを割り当てるかどうか。`Toggle UI` などの一部の組み込み機能に必要です。 |
| Objects Layer | 5 | `Override Objects Layer` が有効な場合、指定されたレイヤーがすべての管理対象UIオブジェクトに割り当てられます。 |
| Font Options | Object Ref | プレイヤーが選択できるように、ゲーム設定UIで使用可能にするフォントオプション（`Default` に加えて）。 |
| Default Font | Null | ゲームの初回起動時にデフォルトで適用される `Font Options` からのフォント名。指定しない場合、`Default` フォントが適用されます。 |

</div>

## アンロックアイテム

<div class="config-table">

| プロパティ | デフォルト値 | 説明 |
| --- | --- | --- |
| Loader | Unlockables- (Addressable, Project) | アンロック可能リソースで使用されるリソースローダーの構成。 |

</div>
