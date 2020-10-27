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

組み込みの入力バインディングを設定し、コンテキストメニュー `Naninovel -> Configuration -> Input` から新しいリスナーを追加できます。使用可能なオプションについては、 [コンフィグガイド](/ja/guide/configuration.md#input) を参照してください。

![Manage Input](https://i.gyazo.com/2f97539323c9fc36124e286856a36f84.png)

::: example
カスタム入力バインディングを追加してインベントリUIを切り替える例は [GitHubのインベントリサンプルプロジェクト](https://github.com/Naninovel/Inventory) にあります。

具体的には、カスタムの "ToggleInventory" バインディングが [UI/InventoryUI.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/UI/InventoryUI.cs#L215) ランタイムスクリプトで使用されます。同じ名前のバインディングは、制御スキームの下の入力構成メニューから追加されます。
:::

## ゲームパッドとキーボード

すべての組み込み機能は、ゲームパッドまたはキーボード入力で使用できます。前述のバインディングエディターメニューで、ゲームパッド/キーボード固有のホットキーバインディングを削除、変更、または追加できます。

組み込みのUIは、マウスやタッチ入力を使用せずに、ゲームパッドまたはキーボードで操作することもできます。いずれかのモーダルメニュー（タイトルメニュー、バックログなどのメインゲームプレイモード以外）で、ナビゲーションキー（方向パッドまたはゲームパッドの左スティック、キーボードの矢印キー）を押して、メニューのボタンを選択します。フォーカスされた最初のボタン（ゲームオブジェクト）は、各UIの `Focus Object` フィールドで変更できます。

![](https://i.gyazo.com/809d4c423d1696a075d5fb73370d48fa.png)

`Focus Mode` プロパティを使用すると、UIが表示された直後、またはナビゲーションキーが押された直後に、割り当てられたゲームオブジェクトにフォーカスを合わせるかどうかを変更できます。

::: warn
UI上のゲームパッドナビゲーションは、Unityの新しい入力システムがプロジェクトにインストールされている場合にのみ機能します。入力システムの詳細については、以下をご覧ください。
:::

メインのゲームプレイモード（モーダルUIの外）では、 `Pause` 入力にバインドされているボタン（キーボードの場合は `Backspace` キー、ゲームパッドの場合は `Start` ボタン）を押して、一時停止メニューを開きます。 ゲームのセーブロード、設定を開く、タイトルに戻るなどのメニューです。

## 入力システム

Naninovel は Unity の新しい[入力システム](https://blogs.unity3d.com/2019/10/14/introducing-the-new-input-system/) に対応しています。入力システムをインストールして有効にする方法については、[公式ドキュメント](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual/Installation.html) を参照してください。入力システムパッケージがインストールされたら（プレーヤーの設定で新しい入力バックエンドを有効にするのを忘れないでください）、 `Input Actions` プロパティが入力コンフィグメニューに表示されます。

![](https://i.gyazo.com/7c6d767c0f3443e1999fe14917080eb1.png)

[input actions asset](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual/ActionAssets.html?q=input%20actions%20asset) をプロパティに割り当てて、 "Naninovel" アクションマップを作成し、Naninovelのバインディング名と同じ名前の入力アクションを追加します。 組み込みバインディング名のリストは、同じコンフィグウィンドウの "Bindings" の下の "Control Scheme" リストにあります。以下は、入力アクション構成の例です。

![](https://i.gyazo.com/36d1951519e4f671509c7136a83d9958.png)

適切に構成されている場合、入力アクションは Naninovel のバインディングをアクティブにします。レガシー入力処理（"Bindings" リストで設定されています）を無効にしたい場合は、入力コンフィグメニューの `Process Legacy Bindings` プロパティを無効にします。

::: warn
タッチおよびオブジェクト関連の入力は引き続きレガシー入力を介して処理されるため、プレーヤー設定でレガシーバックエンドを完全に無効にしないでください。機能を自分で実装する場合はこの限りではありません。
:::

デフォルトの入力アクションアセットは、`Naninovel/Prefabs/DefaultControls.inputactions` に保存されます。

新しい入力システムの使用に関する詳細（たとえば、特定のバインディングを構成する方法、または実行時にプレーヤーがバインディングを上書きできるようにする方法）については、[公式マニュアル](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.0/manual) を参照してください。
