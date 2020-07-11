# インベントリ

インベントリシステムはビジュアルノベルスタイルのゲームでは少し範囲外ですが、Naninovelで活用する方法について多くの問合せがありました。[GitHubプロジェクト](https://github.com/Elringus/NaninovelInventory) には、インベントリをエンジンや拡張機能として作成し統合する例があります。Naninovel上で簡単にセットアップできます。

サンプルプロジェクトは、グリッドレイアウト、ページネーション、ドラッグドロップウィンドウといったカスタムインベントリUIを作成する方法、カスタムエンジンサービスと関連するコンフィグメニューを追加する方法、入力バインディングを追加する方法、ステートのアウトソーシングを使用する方法、カスタムシナリオコマンドと式関数を作成する方法を示しています。

[!86c577f007daf4ec5d79c0e91db7bc10]

[Git clientでリポジトリをクローン](https://help.github.com/ja/github/creating-cloning-and-archiving-repositories/cloning-a-repository) するか [zipファイルをダウンロード](https://github.com/Elringus/NaninovelDemo/archive/master.zip) することができます。

::: warn
プロジェクトに Naninovel パッケージは含まれないため、初めて開く際はコンパイルエラーが発生します。問題を解決するには、アセットストアから Naninovel をインポートします。
:::

## インストール

既存のUnityプロジェクトの上にインベントリ拡張機能を設定するには、[UPM](https://docs.unity3d.com/Manual/upm-ui.html) を使用して、次のgit URL経由でパッケージをインストールします: `https://github.com/Elringus/NaninovelInventory.git?path=Assets/NaninovelInventory` または[NaninovelInventory.unitypackage](https://github.com/Elringus/NaninovelInventory/raw/master/NaninovelInventory.unitypackage) を手動でダウンロードしてインポートします。

![](https://i.gyazo.com/b54e9daa9a483d9bf7f74f0e94b2d38a.gif)

## 使い方

テンプレートから既製のインベントリUIを作成するには、アセットコンテキストメニューの `Create -> Naninovel -> Inventory -> Inventory UI` を使用します。次にエディターメニューの `Naninovel -> Resources -> UI` から、プレハブをNaninovel UIリソースに追加します。追加すると、[@showUI] と [@hideUI] コマンドで、他のすべてのUIと同様にUIを表示/非表示にすることができます。

インベントリUIコンポーネントには `Capacity` プロパティがあり、インベントリのスロット数を変更できます。スロットグリッドは、 `Content/InventoryGrid` ゲームオブジェクトで設定します（スロット番号とレイアウト、ページごとのスロットなど）。ウィンドウのドラッグドロップ動作は、`Content`ゲームオブジェクトに紐づいた `Drag Drop` コンポーネントで設定（無効化）できます。

インベントリアイテムプレハブは、アセットコンテキストメニューの `Create -> Naninovel -> Inventory -> Inventory Item` で作成できます。アイテムのプレハブは、エディターメニュー `Naninovel -> Resources -> Inventory` からインベントリリソースとして割り当てる必要があります。

![](https://i.gyazo.com/6062f8a433a47306f582a849c7bbf57e.png)

大量のアイテムがありエディターメニューから割り当てるのが大変な場合は、`Resources/Naninovel/Inventory` フォルダーにドロップするだけで自動的にスクリプトで使用できるようになります。必要に応じて、さらにサブフォルダで整理することもできます。この場合、naninovelスクリプトで参照する場合はスラッシュ (`/`) を使用します。たとえば、`Resources/Naninovel/Inventory/Armor/FullPlate.prefab` として保存されたアイテムは、`Armor/FullPlate` としてスクリプトから参照できます。

[addressable asset system](/ja/guide/resource-providers.md#addressable) を使用して手動でリソースを公開することもできます。アセットを公開するには、使用するパスと同じアドレスを "Resources/" の部分を除いて、上記の方法で割り当てます。例えば、アイテム "FullPlate.prefab" を公開するには、次のアドレスにプレハブアセットを割り当てます: `Naninovel/Inventory/FullPlate`。addressable 機能はデフォルトではエディターで使用できないことに注意してください。リソースプロバイダーのコンフィグメニューで `Enable Addressable In Editor` プロパティを有効にすることで許可できます。

各アイテムには、同じタイプのアイテムを1つのインベントリスロットにスタックできる数を制限する `Stack Count Limit` プロパティと、アイテムが使用されたとき（`@useItem` コマンドまたはユーザーがインベントリ内のアイテムをクリックしたとき）に呼び出される `On Item Used` Unityイベントがあります。以下の例は、`Play Script` コンポーネントを使用してイベントを設定し、一度使用したアイテムを削除し、グリッチの特殊効果を生成してテキストメッセージを出力する方法です。

![](https://i.gyazo.com/010a9ba35db607ba46d78eda3513f678.png)

`@addItem` コマンドでアイテムをインベントリに追加し、`@removeItem`(または`@removeItemAt`、`@removeAllItems`）でアイテムを削除できます。アイテムIDは、アイテムのプレハブ名と同じです。 インベントリスロットIDはグリッドスロットインデックスと同じです（たとえば、最初のスロットは0、2番目は1）。

カスタム [関数式](/ja/guide/script-expressions.md#関数式) `ItemExist()` と `ItemCount()` でアイテムが在庫に存在するかどうか、および既存のアイテムの数を確認でき、便利です。

以下は、サンプルプロジェクトのスクリプトです:

```
# Start

Select an action.[skipInput]

@choice "Pick up sword" if:!ItemExist("Sword") do:"@addItem Sword, @goto .Adventure"
@choice "Pick up armor" if:!ItemExist("Armor") do:"@addItem Armor, @goto .Adventure"
@choice "Adventure awaits, venture forth!"
@stop

# Adventure

@if ItemExist("Sword")
	@set monstersSlayed="{ItemExist("Armor") ? Random(3,5) : 2}"
	@addItem Food amount:{monstersSlayed}
	You've encountered and slayed {monstersSlayed} monsters with your sword.[if !ItemExist("Armor")] You could've been more productive with an armor, though.[endif][i][showUI Inventory wait:false] Check your inventory for the loot!
	@goto .Start
@else
	But you don't have a weapon! You've been beaten by the monsters.[if ItemExist("Armor")] At least it didn't hurt that much, thanks to the armor.[endif] Let's prepare better next time.
	@goto .Start
@endif
```
