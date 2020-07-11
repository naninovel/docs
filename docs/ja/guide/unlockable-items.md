# 収集アイテム

収集アイテム機能を使用すると、ロックまたはロック解除された状態を持続させるアイテムを管理できます。これをさまざまな方法で使用できます。たとえば、CGまたはムービーギャラリーのスロット、実績、ヒント、その他プレーヤーが条件を満たしたときに、一部のエンティティをロック解除またはアクティブ化できるシステムを表現することができます。

各収集アイテムは、アイテムがロック解除されているかどうかを、文字列識別子とブール値で表します。naninovelスクリプトでは、[@unlock] コマンドと [@lock] コマンドを使用して、特定のIDのアイテムをそれぞれロック解除およびロックします。例:

```
@unlock SecretAchievement
```
— これはアイテム `SecretAchievement` をロック解除し、
```
@lock SecretAchievement
```
— 再びロックします。

アイテムのロック状態は [グローバルスコープ](/ja/guide/state-management.md#グローバルステート) に保存されており、ローカルゲームセッションには影響しません。例:一部のアイテムをロック解除したあと、プレイヤーが新しいゲームを開始したり、別の保存されたゲームをロードしたりしても、アイテムは再びロックされません。

実際の [ゲームオブジェクト](https://docs.unity3d.com/Manual/class-GameObject.html) を収集アイテムにバインドするには、`UnlockableTrigger` コンポーネントを使います:

![](https://i.gyazo.com/9e92d5296e5f07d68ce6122ccb1da34a.png)

アイテムのIDを `Unlockable Item Id` フィールドに設定し、アイテムがロック解除されたときに実行されるコマンドをバインドします。たとえば上の図では、`SecretAchievement` がロック解除されているときにGameObjectがアクティブになり、逆の場合も同様です。

C# では、`UnlockableManager` [エンジンサービス](/ja/guide/engine-services.md) を利用して収集アイテムにアクセスできます。

## 収集アイテムリソース

収集アイテムコンフィグメニュー (`Naninovel -> Configuration -> Unlockables`)のリソースマネージャーで、アイテム収集機能で使用する任意のアセットを保存できます。

![](https://i.gyazo.com/17fa198861ed72de3ab1f9dc6b02b3d8.png)

収集アイテムリソースは、[CGギャラリー](/ja/guide/unlockable-items.md#CGギャラリー) などの組み込みの収集アイテムシステムによって使用されます。また、独自のカスタムシステムのマネージャーを利用することもできます。

## CGギャラリー

CGギャラリー機能を使用して、テクスチャリソース（画像）を指定できます。テクスチャリソース（画像）は、ゲームを通してロック解除でき、`ICGGalleryUI` UIを使ってタイトルメニューから参照できます。

[!!wkZeszk6gm0]

デフォルトでは、[収集アイテムリソースマネージャー](/ja/guide/unlockable-items.md#収集アイテムリソース) から追加されたテクスチャリソースと、`MainBackground` アクターの [背景](/ja/guide/backgrounds.md) スプライトリソースは、プリフィックス `CG` が付いたものは全てCGアイテムとみなされます。

CGアイテムをギャラリーに追加するには、パスに `CG` を付けることで既存のメイン背景リソースの1つを使用することができます:

![](https://i.gyazo.com/83a6eff3f91c05027ba1fbc5098e03c2.png)

— または、`Naninovel -> Resources -> Unlockables` から収集アイテムリソースマネージャーを使用して、"スタンドアロン"のテクスチャを追加します;

![](https://i.gyazo.com/236bddfd0a02c18b94153cfb7189a877.png)

どちらの方法でも、[@unlock] コマンドと [@lock] コマンドを使用してアイテムをそれぞれロック解除およびロックできます。

たとえば、上の図で追加された `CG/Map` アイテムのロックを解除するには、次のスクリプトコマンドを使用します:

```
@unlock CG/Map
```

収集アイテムリソースと背景リソースの両方を使用してCGアイテムを追加する場合、収集アイテムマネージャーで指定されたリソースが最初にCGギャラリーに表示されます。この動作は、`CG Gallery Panel` スクリプトの `Cg Sources` プロパティを使用して、CGリソースが取得される実際のソースと合わせて変更できます。これはCGギャラリーを表すUIプレハブのルート(`Naninovel/Prefabs/DefaultUI/ICGGalleryUI.CGGalleryPanel` にある組み込み実装)に紐付けられています。

![](https://i.gyazo.com/c62c69eea8d6b1147aacb178dcaa9347.png)

いずれかのソースに追加されたCGアイテムが少なくとも1つある場合（ロック解除状態に関係なく）、`CG GALLERY` ボタンがタイトルメニューに表示され、CGギャラリーにアクセスできます。

[カスタムUI機能](/ja/guide/user-interface.md#カスタムUI) を使用して、組み込みの `ICGGalleryUI` 実装を編集するか、完全に置き換えることができます。

## Tips

Tips収集システムでは、ローカライズ可能な [テキスト管理](/ja/guide/managed-text.md) ドキュメントを使用してテキストレコードのセットを指定できます。このレコードはゲームを通してロック解除でき、タイトルメニューや、テキストプリンターコントロールパネルの `ITipsUI` UIから閲覧できます。

このシステムは、ゲーム内の用語辞書/百科事典や実績トラッカーを構築するのに使用できます。

[!!CRZuS1u_J4c]

Tipsを定義するには、[テキスト管理](/ja/guide/managed-text.md) リソースディレクトリ（デフォルトでは `Resources/Naninovel/Text` ）内に、テキストドキュメント `Tips.txt` を作成します。各行は単一のTipsレコードが入ります。行は、チップIDで始まり、その後にコロンを続けます。次に、ヒントのタイトル、カテゴリ（任意）、説明をすべて縦線（`|`）で区切って指定します。例:

```
Tip1ID: Tip 1 Title | Tip 1 Category | Tip 1 Description
Tip2ID: Tip 2 Title || Tip 2 Description
Tip3ID: Tip 3 Title
Tip4ID: Tip 4 Title | Tip 4 Category |
...
```

[リッチテキストタグ](https://docs.unity3d.com/Manual/StyledText.html) を使用して、Tipsレコードの説明セクション内に改行 (`\n`) を挿入できます。

テキスト管理ドキュメント `Tips.txt` に少なくとも1つのヒントレコードがある場合、メインメニューとコントロールパネルに "TIPS" ボタンが表示され、Tips画面が表示されます。

naninovelスクリプトでTipレコードをロック解除するには、[@unlock] コマンドと [@lock] コマンドに続けてTip IDを記述します(常にプリフィックス `Tip1ID` を前に付ける必要があります)。例:
```
@unlock Tips/Tip1ID
```
