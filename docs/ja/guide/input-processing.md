# 入力処理

NaninovelはUnityの [Input System](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest) を使用して、以下のアクションをリッスンします。

| 名前 | キーボード+マウス | ゲームパッド | 説明 |
|---------------|----------------------------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Submit | Enter | Button South | プロンプトの承認や入力フォームの送信など、汎用的な確認操作。 |
| Cancel | Escape | Button East | プロンプトの拒否やメニューを閉じる操作など、汎用的な拒否操作。 |
| Delete | Delete | Button North | 選択したセーブスロットの削除など、汎用的な削除操作。 |
| Navigate | Arrow Keys | D-Pad, Left Stick | 一列に並んだセーブスロットの選択など、汎用的なナビゲーション操作。 |
| Scroll | Page Up/Down | Right Stick | バックログのスクロールなど、汎用的なスクロール操作。 |
| Page | Shift+Left <-> Shift+Right | Left Trigger <-> Right Trigger | セーブ・ロードメニューでのページ切り替えなど、汎用的なページネーション操作。 |
| Tab | Ctrl+Left <-> Ctrl+Right | Left Bumper <-> Right Bumper | 設定メニューでのタブ切り替えなど、汎用的なタブ切り替え操作。 |
| Continue | Enter, Scroll Wheel (Y-) | Button South | 入力待ちモード（メッセージの表示時に有効になる）を解除し、スクリプトの再生を続行します。 |
| Pause | Backspace | Start | ポーズUIを表示します。 |
| Skip | Ctrl | Button West | アクションがアクティブ（ボタンが押されている）な間、[スキップモード](/ja/guide/text-printers#テキストのスキップ)（早送り）を有効にします。 |
| ToggleSkip | Tab | Right Stick Press | スキップモードを切り替えます（無効の場合は常時有効にし、有効の場合は無効にします）。 |
| SkipMovie | Escape | Button East | 現在再生中の [ムービー](/ja/api/#movie) をスキップ（キャンセル）します。 |
| AutoPlay | A | Button East | 設定された遅延後に自動的に入力待ちモードが無効になる [オートプレイモード](/ja/guide/text-printers#オートプレイ) を切り替えます。 |
| ToggleUI | Space | Button North | UIレイヤー全体の [可視性](/ja/guide/gui#uiの切り替え)（表示/非表示）を切り替えます。 |
| ShowBacklog | L | Right Bumper | [バックログUI](/ja/guide/text-printers#プリンターバックログ) の可視性を切り替えます。 |
| Rollback | B, Scroll Wheel (Y+) | Left Bumper | スクリプトを逆方向に巻き戻します。 |
| CameraLook | Mouse Delta | Right Stick | [@look] モード中にカメラを移動します。 |
| ToggleConsole | ` | | 開発コンソールの表示を切り替えます。 |
| EnterDialogue | Enter, E | Button South, Button West | ダイアログトリガーをアクティブにして [ダイアログモード](/ja/guide/getting-started#ダイアログモード) に入ります。 |

## 入力のカスタマイズ

`Naninovel -> Configuration -> Input` エディターメニューでカスタム `Input Actions` アセットを割り当てることで、デフォルトのアクションを構成し、新しいアクションを追加できます。エンジンがそれらを検出できるように、関連するアクションは `Naninovel` マップの下に配置してください。デフォルトの入力アクションアセットは `Create -> Naninovel -> Input -> Controls` アセットメニューで作成できます。独自のものを作成する際の参考にしてください。

![](https://i.gyazo.com/8ef1cc7eccac5cbc9e88016e2b1271f6.png)

::: tip EXAMPLE
インベントリUIを切り替えるためのカスタム入力バインディングを追加する例は、[インベントリサンプル](/ja/guide/samples#インベントリ) にあります。具体的には、カスタムの「ToggleInventory」アクションが `Scripts/Runtime/Inventory/UI/InventoryUI.cs` ランタイムスクリプトで使用されています。
:::

カスタム入力アクションを使用する場合は、同じ構成メニューにカスタム `Event System` も割り当てることをお勧めします。そのうえで、イベントシステムプレハブの `Input System UI Input Module` コンポーネントにある `Actions Asset` プロパティに、カスタム入力アクションアセットを割り当ててください。これは、さまざまなUI関連機能を正しく動作させるために必要です。`Create -> Naninovel -> Input -> Event System` から、Naninovelで動作するデフォルトのイベントシステムプレハブを作成できます。

![](https://i.gyazo.com/b1f99bb8e2cea14ec9f97c78b91d313a.png)

::: tip
修飾キー付きのアクション（`Tab` や `Page` など）が、修飾キーなしで同じバインディングを使用する他のアクション（`Navigate` など）をトリガーしないようにするには、プロジェクト設定のInput System Packageカテゴリにある `Enable Input Consumption` オプションを有効にしてください。
:::

## 入力モードへの適応

デフォルトでは、すべての組み込みUIは、最後にアクティブだった入力デバイスに基づいて、現在の入力モード（マウスとキーボード、ゲームパッド、またはタッチ）に適応します。たとえば、プレイヤーがマウスでゲームを操作していて、ある時点でゲームパッドのボタンを押すと、UIはゲームパッド入力モードに切り替わります。

![](https://i.gyazo.com/a2f38246d7eee8d75d7f3f6660a092ed.mp4)

入力構成メニューの `Detect Input Mode` オプションのチェックを外すことで、この機能を無効にできます。

エンジンの初期化後にアクティブになるデフォルトの入力モードは、ターゲットプラットフォームに基づいて入力マネージャーによって決定されます。

- ゲームコンソール -> ゲームパッド
- モバイル -> タッチ
- その他 -> マウス

### マウス

このモードでは、UIは配下にあるすべての [Selectable](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/script-Selectable.html) オブジェクトのナビゲーションを無効にします。これは、マウスでクリックしたときにボタンが「選択済み」状態に移行するのを防ぐためです。

さらに、`Custom UI`（または派生）コンポーネントで `Button Controls` オブジェクトが割り当てられている場合、それは有効になりますが、`Keyboard Controls` と `Gamepad Controls` は無効になります。これにより、マウス入力モードに固有のボタン（「閉じる」ボタンなど）と操作ガイド（ゲームパッドのボタンラベルなど）を、関連する入力モードがアクティブな場合にのみ表示できます。

### ゲームパッド

ゲームパッドモードでは、ナビゲーションが再度有効になり（マウスモードで無効になっていた場合）、プレイヤーはDパッドまたは左スティックでSelectableオブジェクト間を移動できるようになります。

割り当てられている場合、`Gamepad Controls` の操作ガイドが有効になり、その他（ボタンとキーボード）は無効になります。

::: tip
ゲームパッドの操作ガイド用アイコンをカスタマイズしたい場合は、[Xeluの無料コントローラープロンプト](https://thoseawesomeguys.com/prompts/) をチェックしてください。
:::

さらに、ゲームパッドモードでモーダルUIが表示されている間、フォーカスが以前に選択されたオブジェクトに残ったままになるのを防ぐために、その中にある最初のアクティブなSelectableオブジェクトがフォーカスされます。この動作は、カスタムUIまたは派生コンポーネントの `Focus Object` を明示的に割り当てることで変更できます。この場合、UIはフォーカスオブジェクトを自動的に見つけようとしません。

### キーボード

キーボードナビゲーション（矢印）キーが押されるとアクティブになります。他のキーはマウスモードでホットキーとして使用されるため、このモードをアクティブにしません。

それ以外の点はゲームパッドモードと同じように機能し、表示される操作ガイドだけが異なります。

### タッチ

タッチモードの場合、Naninovelはデフォルトで管理対象UIに特別な変更を加えません。ただし、`CustomUI` コンポーネントの `HandleInputModeChanged` メソッドをオーバーライドすることで、タッチ固有の動作を追加できます。

特定のUIの入力モードへの適応機能を無効にするには、`Custom UI`（または派生）コンポーネントの `Adapt To Input Mode` オプションのチェックを外します。機能をグローバルに無効にするには、入力構成の `Detect Input Mode` オプションを使用します。

## カスタム入力バックエンド

Naninovelでは、Unityの組み込み入力システムの代わりに、[Rewired](https://guavaman.com/projects/rewired/) などのカスタム入力ソリューションを使用できます。エンジンは、`InputManager` クラス内のいくつかの仮想メソッドでのみデフォルトの入力システムAPIを使用し、参照は条件付きでコンパイルされるため、デフォルトの入力モジュールを削除してもコンパイルエラーは発生しません。

エンジンにカスタム入力ソリューションを使用させるには、`InputManager` エンジンサービスを [オーバーライド](/ja/guide/engine-services#組み込みサービスのオーバーライド) し、必要な仮想メソッドをオーバーライドします。
