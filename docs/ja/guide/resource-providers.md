# リソースプロバイダー

リソースプロバイダーは、Naninovel関連のデータを取得するために使用します。シナリオスクリプト用の ".nani" テキストファイル、キャラクタースプライトのテクスチャ、音楽のオーディオクリップなどです。各プロバイダーは、それぞれ特定のソースからのデータの取得に特化しています。プロジェクトの "Resources" フォルダー 、Unityの Addressable asset system、ローカルファイルストレージ、Googleドライブアカウントなどです。

プロバイダーの一般的な動作は、`Naninovel -> Configuration -> Resource Provider` メニューで設定できます。

![](https://i.gyazo.com/466488bf852f0dd54aa680012b072af1.png)

`Resource Policy` プロパティは、スクリプトの実行中にリソースがいつロードおよびアンロードされるかを指示します:
 - Static — スクリプトの実行に必要なすべてのリソースが、再生の開始時にプリロードされ（ロード画面でマスクされます）、スクリプトの再生が終了したときにのみアンロードされます。このポリシーはデフォルトで、ほとんどの場合に推奨されます。
 - Dynamic — 次の `Dynamic Policy Steps` コマンドに必要なリソースのみがスクリプトの実行中にプリロードされ、未使用のすべてのリソースはすぐにアンロードされます。 このモードは、対象プラットフォームのメモリ制限が厳しく、naninovelスクリプトを適切に構成することができない場合に使用します。ゲームの進行中にリソースがバックグラウンドでロードされると、一時的な障害が発生することが予想されます。

`Log Resources Loading` が有効になっている場合、さまざまなプロバイダー関連のログメッセージがデフォルトの読み込み画面のUIにミラーリングされます。

`Enable Build Processing` は、エディターメニューから割り当てられたアセットをビルドに挿入するために、必要なビルド前処理手順を有効にします。[カスタムビルド環境](/ja/guide/custom-build-environment.md) を使用している場合、または独自のビルドフックをアタッチしている場合にのみ、これを無効にしてください。[addressable system](https://docs.unity3d.com/Packages/com.unity.addressables@latest) がインストール済みだと、`Use Addressables` を有効にした時にアセット処理ステップが最適化され、ビルド時間が改善されます。同時に `Auto Build Bundles` を有効にすると、プレーヤーのビルド時にアセットバンドルが自動的にコンパイルされます。

コンフィグメニューの他のプロパティはプロバイダー固有であり、以下で説明します。

リソース固有のプロバイダーの動作は、対応するコンフィグメニューにある `Loader` プロパティで設定します。たとえば、オーディオリソース（BGMおよびSFX）を取得するためのデフォルトのローダー構成は次のとおりです:

![](https://i.gyazo.com/e9b59f738c93d0cdee6f0999b797a461.png)

`Path Prefix` プロパティを使用すると、特定のタイプのリソースのプロバイダーのルートパスに追加のパスを指定できます。たとえば、プロジェクトの "Resources" フォルダからオーディオファイル "Explosion" を取得する場合、パスのプレフィックスを "Audio" に設定すると、次のリソースリクエストが発生します:  `Resources.Load("Audio/Explosion")`。

`Providers List` では、使用するプロバイダーの種類と順序を指定できます。たとえば上記の例では、オーディオリソースをリクエストすると最初に "Addressable" プロバイダーが使用されます。プロバイダーがリクエストされたリソースを見つけられない場合は、"Project" プロバイダーが使用されます。

**エディターでは、特別な "Editor" リソースプロバイダーが常に最初に使われます。** （ローダーの設定に関係なく）。プロバイダーは、Naninovelのコンフィグおよびリソースマネージャーメニュー(`Naninovel -> Resources -> ...`) から割り当てられた、すべてのリソースにアクセスできます。ゲームがビルドされると、それらのリソースはすべて一時的な "Resources" フォルダーに自動的にコピーされます。[addressable system](https://docs.unity3d.com/Packages/com.unity.addressables@latest) がインストールされ有効な場合には、addressables 構成に登録され、アセットバンドルにコンパイルされます。必ず毎回、Unity エディターではなく **ビルドでプロバイダー関連のテストを行って下さい。**


## Addressable

[Addressable Asset system](https://docs.unity3d.com/Packages/com.unity.addressables@latest) とは Unity パッケージで、アセットを "アドレス" によって簡単にロードすることができます。非同期読み込みを使用して、どの場所からでも（ローカルストレージ、リモートWebホスティングなど）、依存関係のコレクションを含む読み込みをサポートします。システムのセットアップ、設定、使用方法については、Unityのドキュメントを参照してください。

Naninovelは、パッケージがプロジェクトにインストールされると自動的に addressables を使用します。追加の設定は必要ありません。 プレーヤーのビルド時に、Naninovelのコンフィグメニューで割り当てられたすべてのアセット（シナリオスクリプト、キャラクタースプライト、オーディオクリップなど）がシステムに登録されます（ "Naninovel" グループの下に "address" が割り当てられます）。

Addressable プロバイダーはランタイムビルドでのみ使用され、エディターではデフォルトで無効になっています。 Naninovelのリソースマネージャーでリソースを割り当てずに、addressable address でリソースを手動で公開している場合は、リソースプロバイダーのコンフィグメニューの `Enable Addressable In Editor` プロパティでリソースを有効にできます。これを有効にすると、リソースがリソースマネージャーで割り当てられ、かつ addressable address でも登録されている場合は、名前の変更、複製、または削除が行われたときに問題が発生する可能性があることに注意してください。

Addressable アセットを Naninovel で可視化するには、アドレスが "Naninovel/" で始まり、 "Naninovel" ラベルが割り当てられている必要があります。リソースプロバイダーのコンフィグメニューの `Extra Labels` プロパティから、Naninovelで使用するアセットをフィルターする、追加のラベルを指定できます。"Naninovel" の addressable グループは、ビルドごとに自動的に再生成されます。別のグループを使用してカスタムリソースを指定するか、リソースプロバイダーのコンフィグメニューで `Enable Build Processing` プロパティを無効にして、ビルド時にアセットを手動で処理します。

Naninovel addressable アセットの提供方法を​​設定したい場合（たとえば、削除Webホストを指定する）、 `Window -> Asset Management -> Addressables -> Groups` メニューから "Naninovel" グループを編集します。グループは、ゲームを最初に構築したときに自動的に作成されます。 見つからない場合は、手動で作成できます。

![](https://i.gyazo.com/c93fbd9e232ec94468c685c4d6003916.png)

::: warn
アセット用のリモートWebホスティングのセットアップや、その他のデプロイ/サービスシナリオなどといった、Unity addressable asset system 自体のチュートリアルやサポートは提供していません。です。詳細は [サポートページ](/ja/support/#unityサポート) をご覧ください。
:::

## Project

Project プロバイダーは、Unityプロジェクトの "Resources" フォルダーにあるアセットを提供します。Project の詳細については、Unityのガイドを参照してください ([リソースローディング API](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime))。

ほとんどのケースで、 ["Resources" フォルダーの使用は推奨されません](https://docs.unity3d.com/Manual/BestPracticeUnderstandingPerformanceInUnity6)。可能な場合は、Naninovelのリソースマネージャーメニューからリソースを割り当てるか、代わりに Addressable system を使用することを検討してください。 その後、"Resources" フォルダからアセットを移動することを忘れないでください。

## Local

Local プロバイダーは、ローカルファイルシステムの任意の場所からシンプルな（シナリオスクリプト、テキスト管理、スプライトキャラクター、背景、オーディオ）アセットを提供できます。

リソースプロバイダーコンフィグの `Local Path Root` プロパティは、ローカルリソースが格納されているフォルダーを指す必要があります。次のいずれかの起点から始まる、絶対パス（例：`C:\Resources`）または相対パスを使用できます:

 - `%DATA%` — 対象デバイス上のゲームデータフォルダー ([Application.dataPath](https://docs.unity3d.com/ScriptReference/Application-dataPath));
 - `%PDATA%` — 対象デバイス上の永続的なデータディレクトリ ([Application.persistentDataPath](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath));
 - `%STREAM%` — "StreamingAssets" フォルダー ([Application.streamingAssetsPath](https://docs.unity3d.com/ScriptReference/Application-streamingAssetsPath));
 - `%SPECIAL{F}%` — 特定のOS用フォルダー。`F` は [special folders enum](https://docs.microsoft.com/en-us/dotnet/api/system.environment.specialfolder) の名前。

デフォルトの `%DATA%/Resources` 値は、ゲームデータディレクトリ内の "Resources" を指します(対象プラットフォームにより異なります)。

使用例の1つとして、`C:/Users/Admin/Dropbox/MyGame/Scripts` フォルダーからnaninovelスクリプトをロードして、シナリオを作成するために共同編集者と共有するとします。ルートフォルダーへの絶対パス (`C:/Users/Admin/Dropbox/MyGame`) を指定することも可能ですが、すべての共同編集者がまったく同じパス（同じドライブラベルとユーザー名）でフォルダーを保存する必要があります。 代わりに、"UserProfile" という特別なフォルダのオリジン上で次の相対パスを使用してください: `%SPECIAL{UserProfile}%/Dropbox/MyGame`。

![](https://i.gyazo.com/eb435b782cfb9df6c403702e8f6124df.png)

スクリプト構成のパスプリフィックスが `Scripts` に設定され、ローカルプロバイダーがリストに追加されたとします。スクリプトナビゲーター（[コンソールコマンド](/ja/guide/development-console.md)) の `nav` からアクセス可能）は、 フォルダ下に保存された ".nani" テキストファイルを取得するはずです。

![](https://i.gyazo.com/df8ad31d30b5c10c9a918e69a4543567.png)

## Google Drive

オープンソース（MITライセンス）のサードパーティパッケージ [UnityGoogleDrive](https://github.com/Elringus/UnityGoogleDrive) を介して実装されているため、以下のリソースのプロバイダーで [Google Drive](https://www.google.com/drive) を利用できます:

* Naninovel スクリプトとテキスト管理 (Google ドキュメントを介して);
* キャラクターと背景 (スプライト実装のみ);
* BGM、 SFX、ボイス。

Googleドライブのリソースフォルダーを他のユーザーと共有して、バージョン管理システムやその他の複雑なツールを使用せずに共同作業ができます。

リソースプロバイダーとして Google ドライブを選択するには、最初に [UnityGoogleDrive](https://github.com/Elringus/UnityGoogleDrive) をインストールする必要があります。インストールとセットアップの手順については、GitHubプロジェクトのreadmeを参照してください。

UnityGoogleDrive パッケージをインストールして構成すると、関連するプロパティがリソースプロバイダーのコンフィグメニューに表示されます。

![](https://i.gyazo.com/57281ae3a47e85690d9141179af768a8.png)

`Google Drive Root Path` はGoogleドライブのフォルダー内のディレクトリへの相対パスで、リソースのルートとして扱われます。たとえば、シナリオスクリプトを `MyGame/Scripts` 下に保存する場合は、ルートを `MyGame` として指定します。

`Google Drive Request Limit` プロパティを使用すると、Google Drive API にアクセスするときに許可される同時リクエストの最大数を設定できます。これは、Googleドライブのパーソナルプランを使用している場合に通信エラーを防止するために必要です。パーソナルプランでは許可される同時リクエスト数が制限されています。

`Google Drive Cache Policy` は、ダウンロードしたリソースのキャッシュ動作を指示します。`Smart`は、[Changes API](https://developers.google.com/drive/api/v3/reference/changes) を使用して、リクエストされた（キャッシュされた）リソースがダウンロードされる前にリモートフォルダーで変更されているかどうかを確認します。`Purge All On Init` は、エンジンの初期化時にキャッシュをパージし、最初のダウンロード後は常にキャッシュされたバージョンを使用します。キャッシュは、[コンソールコマンド](/ja/guide/development-console.md) `purge` でいつでも手動でパージできます。

取得したいリソースプロバイダーのリストに、Googleドライブを追加するのを忘れないでください。たとえば、次のようにすると、スクリプトマネージャーは Addressable と Project に加えて、Googleドライブからスクリプトを検索します:

![](https://i.gyazo.com/0ad07f73fe12be7ae6d421c5f4f33384.png)

::: example
[NaninovelSandbox](https://github.com/Naninovel/Sandbox) プロジェクトで、Google ドライブプロバイダーの設定方法の例をご覧ください。プロジェクトに Naninovel パッケージは含まれないため、初めて開く際はコンパイルエラーが発生します。問題を解決するには、アセットストアから Naninovel をインポートします。
:::

## カスタムプロバイダー

リソースプロバイダーのカスタム実装を追加し、組み込みプロバイダーと共に（または組み込みプロバイダーの代わりに）Naninovel で使用することができます。

カスタムプロバイダーを追加するには、パラメーターのないコンストラクターで C# クラスを作成し、 `IResourceProvider` インターフェイスを実装します。作成すると、組み込みのタイプと合わせてカスタムプロバイダーのタイプが、すべてのローダーコンフィグメニューに表示されます。

![](https://i.gyazo.com/7176a9d4a4ea2d9414c5495e2e465baf.png)

組み込みのリソースプロバイダー実装は、`Naninovel/Runtime/Common/ResourceProvider` パッケージディレクトリにあります。独自のバージョンを実装するときは、リファレンスとして自由に使用してください。

以下は、カスタムプロバイダーの例です。何もしませんが、使用するとメッセージをログに記録します。

```csharp
using Naninovel;
using System;
using System.Collections.Generic;
using UniRx.Async;

public class CustomResourceProvider : IResourceProvider
{
    public event Action<float> OnLoadProgress;
    public event Action<string> OnMessage;

    public bool IsLoading => default;
    public float LoadProgress => default;
    public IEnumerable<Resource> LoadedResources => default;

    public Resource<T> GetLoadedResourceOrNull<T> (string path)
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"GetLoadedResourceOrNull: {path}");
        return default;
    }

    public UniTask<Resource<T>> LoadResourceAsync<T> (string path)
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"LoadResourceAsync: {path}");
        OnLoadProgress?.Invoke(1f);
        return default;
    }

    public UniTask<IEnumerable<Resource<T>>> LoadResourcesAsync<T> (string path)
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"LoadResourcesAsync: {path}");
        OnLoadProgress?.Invoke(1f);
        return default;
    }

    public UniTask<IEnumerable<Folder>> LocateFoldersAsync (string path)
    {
        OnMessage?.Invoke($"LocateFoldersAsync: {path}");
        return default;
    }

    public UniTask<IEnumerable<string>> LocateResourcesAsync<T> (string path)
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"LocateResourcesAsync: {path}");
        return default;
    }

    public UniTask<bool> ResourceExistsAsync<T> (string path)
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"ResourceExistsAsync: {path}");
        return default;
    }

    public bool ResourceLoaded (string path)
    {
        OnMessage?.Invoke($"ResourceLoaded: {path}");
        return default;
    }

    public bool ResourceLoading (string path)
    {
        OnMessage?.Invoke($"ResourceLoading: {path}");
        return default;
    }

    public bool SupportsType<T> ()
        where T : UnityEngine.Object
    {
        OnMessage?.Invoke($"SupportsType: {typeof(T).Name}");
        return default;
    }

    public void UnloadResource (string path)
    {
        OnMessage?.Invoke($"UnloadResource: {path}");
    }

    public void UnloadResources ()
    {
        OnMessage?.Invoke("UnloadResources");
    }
}
```
