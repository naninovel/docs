# 入力処理

エンジンは、事前設定されたリスナーを使用してユーザー入力を処理します。 各入力リスナーには、次のプロパティがあります:

プロパティ | 説明
--- | ---
Name | 入力リスナーの識別子。他のエンジンシステムからリスナーを参照するために使用されます。
Always Process | 入力ブロッキングモードで入力を処理するかどうか。 例えばムービーを再生するとき。
Keys | 入力をアクティブにするキー（ボタン）のリスト。
Axes | 入力をアクティブにする軸（たとえば、マウスまたはゲームパッドアナログスティック）のリスト。
Swipes | 入力をアクティブにするスワイプ（タッチスクリーン）のリスト。

特定の値については Unity の入力ガイドをご覧ください: [docs.unity3d.com/Manual/ConventionalGameInput](https://docs.unity3d.com/Manual/ConventionalGameInput.html).

組み込みの入力バインディングを設定し、コンテキストメニュー `Naninovel -> Configuration -> Input` から新しいリスナーを追加できます。使用可能なオプションについては、 [コンフィグガイド](/ja/guide/configuration#input) を参照してください。

![Manage Input](https://i.gyazo.com/2f97539323c9fc36124e286856a36f84.png)

::: tip EXAMPLE
カスタム入力バインディングを追加してインベントリUIを切り替える例は [GitHubのインベントリサンプルプロジェクト](https://github.com/Naninovel/Inventory) にあります。

具体的には、カスタムの "ToggleInventory" バインディングが [UI/InventoryUI.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/UI/InventoryUI.cs#L215) ランタイムスクリプトで使用されます。同じ名前のバインディングは、制御スキームの下の入力構成メニューから追加されます。
:::

## ゲームパッドとキーボード

すべての組み込み機能は、ゲームパッドまたはキーボード入力で使用できます。前述のバインディングエディターメニューで、ゲームパッド/キーボード固有のホットキーバインディングを削除、変更、または追加できます。

組み込みのUIは、マウスやタッチ入力を使用せずに、ゲームパッドまたはキーボードで操作することもできます。いずれかのモーダルメニュー（タイトルメニュー、バックログなどのメインゲームプレイモード以外）で、ナビゲーションキー（方向パッドまたはゲームパッドの左スティック、キーボードの矢印キー）を押して、メニューのボタンを選択します。フォーカスされた最初のボタン（ゲームオブジェクト）は、各UIの `Focus Object` フィールドで変更できます。

![](https://i.gyazo.com/809d4c423d1696a075d5fb73370d48fa.png)

`Focus Mode` プロパティを使用すると、UIが表示された直後、またはナビゲーションキーが押された直後に、割り当てられたゲームオブジェクトにフォーカスを合わせるかどうかを変更できます。

::: warning
UI上のゲームパッドナビゲーションは、Unityの新しい入力システムがプロジェクトにインストールされている場合にのみ機能します。入力システムの詳細については、以下をご覧ください。
:::

メインのゲームプレイモード（モーダルUIの外）では、 `Pause` 入力にバインドされているボタン（キーボードの場合は `Backspace` キー、ゲームパッドの場合は `Start` ボタン）を押して、一時停止メニューを開きます。 ゲームのセーブロード、設定を開く、タイトルに戻るなどのメニューです。

## 入力システム

Naninovel は Unity の[新しい入力システム](https://blogs.unity3d.com/2019/10/14/introducing-the-new-input-system/) に対応しています。入力システムをインストールして有効にする方法については、[公式ドキュメント](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual/Installation.html) を参照してください。


::: info NOTE

サポートされている最小入力システムパッケージは1.1で、現在プレビュー中です。プロジェクトをインストールするには、Package Manager側で `preview packages` を有効にする必要があります。

![](https://i.gyazo.com/1a662215459f936d1a3b49d9089e8357.mp4)
:::

::: warning
タッチおよびオブジェクト関連の入力は引き続き古い方の入力を介して処理されるため、機能を自分で実装する場合を除いて、プレーヤー設定でレガシーバックエンドを完全に無効にしないで(Active Input HandlingをBothにして)ください。

![](https://i.gyazo.com/bdac8d3ce8380f571bc3bc2e18a0074d.png)
:::

パッケージがインストールされたら、イベントシステムプレハブを作成します。 `UI -> Event System` から、デフォルトのウィンドウを作成できます。 `Input System UI Input Module` プレハブに取り付けられていることを確認してください。デフォルトのイベントシステムを作成するとき、Unityは古い入力モジュールコンポーネントを新しいものに自動的に変換することを勧めています。

![](https://i.gyazo.com/965b87f8585cb31ae2452f19882bdab7.png)

作成したイベントシステムプレハブを `Custom Event System` に割り当て、 `Spawn Input Module` を無効にします。

![](https://i.gyazo.com/b06177545022b8816e342b984afecaea.png)

入力システムパッケージがインストールされると、 `Input Actions` プロパティが入力構成メニューに表示されます。入力アクションアセットをプロパティに割り当ててから、「Naninovel」アクションマップを作成し、Naninovelのバインディング名と同じ名前の入力アクションを追加します。組み込みバインディング名のリストは、同じ構成ウィンドウの「制御スキーム」の下にある「バインディング」リストにあります。以下は、入力アクションの構成例です。

![](https://i.gyazo.com/07fb5702badd3e698c3533f28585a15b.png)

::: tip

デフォルトの入力アクションアセットは `Naninovel/Prefabs/DefaultControls.inputactions` に保存されます。自分で作成する際の参考にしてください。
:::

適切に構成されていれば、入力アクションはNaninovelのバインディングをアクティブにします。従来の入力処理（「バインディング」リストで設定）を無効にする場合は入力構成メニューの `Process Legacy Bindings` プロパティを無効にします。

::: tip EXAMPLE
GitHubに、Naninovelを使用した新しい入力システムのセットアップと使用に関するサンプルプロジェクトがあります： [github.com/Naninovel/Input](https://github.com/Naninovel/Input)
:::

入力システムの詳しい使い方（特定のバインディングを構成する方法、またはプレーヤーが実行時にバインディングをオーバーライドできるようにする方法など）については、[公式マニュアル](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual)を参照してください。
