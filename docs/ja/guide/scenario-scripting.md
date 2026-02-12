# シナリオスクリプト

シナリオスクリプトは `.nani` 拡張子を持つテキストドキュメントで、シーンで何が起こるかを制御します。スクリプトアセットは `Create -> Naninovel -> Scenario Script` アセットコンテキストメニューから作成されます。組み込みの [ストーリーエディタ](/ja/guide/editor) または、Microsoft Word、Google Docs、[VS Code](/ja/guide/ide-extension) などの任意の外部テキストまたはコードエディタを使用して開いて編集できます。

![?class=when-dark](https://i.gyazo.com/8ccfe73f2b0d39dfe8479a02a218a011.png)
![?class=when-light](https://i.gyazo.com/110a7ca29df4d19f9a019732e1a68019.png)

シナリオスクリプトの各行はステートメント（命令文）を表し、コマンド、汎用テキスト、ナビゲーションラベル、またはコメントのいずれかになります。ステートメントのタイプは、行の先頭に配置された記号によって決定されます。

| 記号 | ステートメント |
|:------:|---------------------------|
| @ | [コマンド](#コマンドライン) |
| # | [ラベル](#ラベルライン) |
| ; | [コメント](#コメントライン) |

行の先頭に上記の記号のいずれも存在しない場合、それは [汎用テキスト](#汎用テキストライン) ステートメントと見なされます。

::: tip
[コンパイラのローカライズ](/ja/guide/localization#コンパイラのローカライズ) 機能を使用して、記号、コマンド識別子、定数など、スクリプト作成時に入力する必要がある事前定義されたコンパイラアーティファクトをすべて変更することが可能です。
:::

## コマンドライン

行が `@` 記号で始まる場合、コマンドステートメントと見なされます。コマンドは、シーンで何が起こるかを制御する単一の操作を表します。たとえば、背景の変更、キャラクターの移動、または別のシナリオスクリプトのロードに使用できます。

### コマンド識別子

コマンド記号の直後に、コマンド識別子が期待されます。これは、コマンドを実装するC#クラスの名前、またはコマンドのエイリアス（`Alias` 属性を介してクラスに適用されている場合）のいずれかになります。

たとえば、[@save] コマンド（ゲームの自動保存に使用）は `AutoSave` C#クラスによって実装されています。実装クラスには `[Alias("save")]` 属性も適用されているため、スクリプト内で `@save` と `@AutoSave` の両方のステートメントを使用してこのコマンドを呼び出すことができます。

コマンド識別子は大文字と小文字を区別しません。以下のステートメントはすべて有効であり、同じ `AutoSave` コマンドを呼び出します。

```nani
@save
@Save
@AutoSave
@autosave
```

### コマンドパラメータ

ほとんどのコマンドには、コマンドの効果を定義するいくつかのパラメータがあります。パラメータは、コマンド識別子の後に定義され、コロン（`:`）で区切られたキーと値の式です。パラメータ識別子（キー）は、コマンド実装クラスの対応するパラメータフィールドの名前、またはパラメータのエイリアス（`CommandParameter` 属性の `alias` プロパティを介して適用されている場合）のいずれかになります。

```nani
@commandId paramId:paramValue
```

シーン内のすべての表示されているアクターを隠すために使用される [@hideAll] コマンドを考えてみましょう。次のように使用できます。

```nani
@hideAll
```

`time` *decimal* パラメータを使用して、アクターが完全に隠れるまでにフェードアウトする時間を制御できます。

```nani
@hideAll time:5.5
```

これにより、アクターは5.5秒間フェードアウトしてから完全に見えなくなります。

### パラメータ値のタイプ

コマンドパラメータに応じて、次の値タイプのいずれかが期待されます。

| タイプ | 説明 |
|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| string | 単純な文字列値。例: `LoremIpsum`。スペースが含まれる場合は、必ず二重引用符で囲んでください。例: `"Lorem ipsum dolor sit amet."`。 |
| integer | 小数ではない数値、整数。例: `1`, `150`, `-25`。 |
| decimal | ドットで区切られた小数部を持つ10進数。例: `1.0`, `12.08`, `-0.005`。 |
| boolean | `true` または `false` の2つの値のいずれかを持つことができます。`true` や `false` と入力する代わりに [ブールフラグ](/ja/guide/scenario-scripting#ブールフラグ) を使用できます。例: `@hideAll wait:true` の代わりに `@hideAll wait!`。 |
| named | ドットで区切られたキーと値のペア。キーは文字列で、値は上記のタイプのいずれかです。名前付き整数の例: `foo.8`, `bar.-20`。 |
| list | 上記のタイプのいずれかの値のカンマ区切りリスト。文字列リストの例: `foo,bar,"Lorem ipsum."`、10進数リストの例: `12,-8,0.105,2`。 |

### 名前なしパラメータ

一部のコマンドには名前なしパラメータがあります。パラメータは、その識別子（名前）を指定せずに使用できる場合、名前なしと見なされます。

たとえば、[@bgm] コマンドは、再生するオーディオリソースのパスを指定する名前なしパラメータを期待します。

```nani
@bgm PianoTheme
```

ここでの "PianoTheme" は、`BgmPath` *string* パラメータの値です。

コマンドごとに1つの名前なしパラメータのみを持つことができ、他のパラメータよりも前に常に指定する必要があります。

### オプションおよび必須パラメータ

多くのコマンドパラメータは *オプション* です。これは、事前に定義された値があるか、コマンドを実行するために値を必要としないことを意味します。たとえば、[@resetText] コマンドをパラメータを指定せずに使用すると、デフォルトプリンターのテキストがリセットされますが、次のように特定のプリンターIDを設定することもできます: `@resetText printer:Dialogue`。

ただし、一部のパラメータはコマンドを実行するために *必須* であり、常に指定する必要があります。[VS Code](/ja/guide/ide-extension) 拡張機能は、そのようなパラメータの割り当てを忘れた場合に警告します。

### 標準コマンド

設定なしですぐに使用できるすべての標準コマンドのリスト（概要、パラメータ、使用例を含む）については、[APIリファレンス](/ja/api/) を参照してください。

## コメントライン

行がセミコロン記号（`;`）で始まる場合、それは *コメント* ステートメントと見なされます。コメントは実行時にエンジンによって完全に無視されます。コメントを使用して、自分自身やシナリオスクリプトを扱う他のチームメンバーのためにメモや注釈を追加します。

```nani
; 次のコマンドはゲームを自動保存します。
@save

@save ; コマンド行の中にもコメントを入れることができます。

# Label ; ラベル行の中にも入れられます。

Lorem [shake ; インラインコマンドの中にも入れられます] ipsum. [; ...空のものも含めて。]
```

このガイドの残りの部分では、サンプルのNaniScriptスニペットに注釈を付けるためにコメントを使用します。

## 汎用テキストライン

大量のテキストを含むスクリプトを簡単に記述するために、汎用テキストラインが使用されます。行がいずれのステートメント記号でも始まらない場合、それは *汎用テキスト* と見なされます。

```nani
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

汎用テキストラインの先頭に、コロンとスペース（`: `）で区切って著者IDを指定することで、表示されるテキストを [キャラクターアクター](/ja/guide/characters) に関連付けることができます。

```nani
Felix: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

表示されるテキストに関連付けられたキャラクターの外観を頻繁に変更する際の入力を節約するために、著者IDの後に外観を指定することもできます。

```nani
Felix.Happy: Lorem ipsum dolor sit amet.
```

上記の行は、次の2行と同じです。

```nani
@char Felix.Happy
Felix: Lorem ipsum dolor sit amet.
```

### コマンドのインライン化

テキストメッセージを表示（印刷）している最中に、特定の文字の直後や直前にコマンドを実行したい場合があります。たとえば、特定の単語が表示されたときにアクターが外観（表情）を変えたり、メッセージの途中で記述されたイベントに反応して特定の効果音が再生されたりする場合です。コマンドのインライン化機能により、このようなケースを処理できます。

すべてのコマンド（[標準](/ja/api/) と [カスタム](/ja/guide/custom-commands) の両方）は、角括弧（`[ ]`）を使用して汎用テキストラインにインライン化（注入）できます。

```nani
Felix: Lorem[char Felix.Happy pos:0.5] ipsum![sfx Explosion] Dolor sit amet.
```

インラインコマンドの構文は、`@` 記号が省略され、コマンド本体が角括弧で囲まれていることを除いて、通常のコマンドとまったく同じであることに注意してください。基本的に、任意のコマンドラインを取得して汎用テキストにインライン化することができ、テキストメッセージ内の位置に応じて異なるタイミングで同じ効果を発揮します。

内部的には、汎用テキストラインはインラインインデックスによって識別される個々のコマンドに解析されます。テキストは [@print] コマンドで表示されます。

たとえば、次の汎用テキストライン：

```nani
Lorem ipsum[char Felix.Happy pos:75 wait!] dolor sit amet.
```

— は、実際にはエンジンによって個々のコマンドのシーケンスとして処理されます。

```nani
@print "Lorem ipsum" !waitInput
@char Felix.Happy pos:75 wait!
@print " dolor sit amet." !reset
```

汎用テキストライン内に実際に角括弧を表示するには、バックスラッシュでエスケープします。例：

```nani
Some text \[ text inside brackets \]
```

— は、ゲーム内で `Some text [ text inside brackets ]` と表示されます。

テキストラインが表示された後に入力を待つのをスキップするには、`[>]` を追加します。

```nani
; 次の行を表示した後、入力待ちはアクティブになりません
; （プレイヤーは読み続けるためにプロンプトを確認する必要がありません）。
Lorem ipsum dolor sit amet.[>]
```

### 汎用パラメータ

場合によっては、汎用テキストラインの特定の部分または全体に対して [@print] パラメータを変更または割り当てたいことがあります。汎用ラインでのみ使用可能な特別な `<` コマンドを使用すると、それが可能になります。

```nani
; この行はKohakuとYukoアクターによって作成されますが、
; プリンターの表示名は「All Together」と表示されます。
Kohaku,Yuko: Hello![< as:"All Together"]

; 最初の部分は50%の速度で表示され、
; 2番目の部分は250%の速度で待機なしで表示されます。
Lorem[< speed:0.5] world![< speed:2.5 nowait!]
```

このコマンドは、`<` とテキストの間に他のコマンドがインライン化されていても、その前に配置された最後のテキストラインに指定されたパラメータを適用します。

```nani
; 速度は依然として「Hello」部分に適用されます。
; パラメータがインラインコマンドの後にある場合でも同様です。
Hello[-][< speed:0.5] world!
```

### 空白区切り文字

汎用テキストラインが空白（スペースやタブなど）で始まるか終わる場合、表示するコンテンツが実際にどこで始まり終わるかを明示的に区切ることが役立つ場合があります。これは、ネストを使用する場合に特に重要です。

汎用テキストラインの境界の区切り文字として `[]`（空のインラインコマンド）を使用します。

```nani
; "Some text  continuation." を表示（間にスペース2つ）
@group
    ; 最初の部分の末尾の空白を保持します。
    Some text []
    ; 2番目の部分の先頭の空白を保持します。
    [] continuation.[< join!]
```

## ラベルライン

ラベルは、[@goto] コマンドでシナリオスクリプトをナビゲートするための「アンカー」として使用されます。ラベルを定義するには、行の先頭に `#` 記号を付け、その後にラベル名を続けます。

```nani
# Epilogue
```

その後、[@goto] コマンドを使用してその行に移動できます。

```nani
@goto ScriptPath#Epilogue
```

[@goto] コマンドとターゲットラベルが同じスクリプト内にある場合は、スクリプトパスを省略できます。

```nani
@goto #Epilogue
```

### シナリオルート

ナビゲーションコマンドで指定する「アンカー」は *エンドポイント* と呼ばれます。エンドポイントは、*スクリプトパス* と *ラベル* の2つの部分で構成されます。ラベルはオプションです。省略すると、エンドポイントはスクリプトの開始を指すと見なされます。スクリプトパスは、*シナリオルート* からの相対的なシナリオファイルのパス（`.nani` 拡張子なし）を指します。

シナリオルートは、プロジェクト内のすべてのシナリオファイルが保存される最上位ディレクトリです。たとえば、Unityプロジェクト内の次のディレクトリ構造を考えてみましょう。

```
Assets
└── Scenario/
    ├── Prologue.nani
    ├── CommonRoute/
    │   ├── Day1/
    │   │   ├── Scene1.nani
    │   │   └── Scene2.nani
    │   └── Day2/
    │       └── Scene1.nani
    └── RouteX/
        └── SceneX.nani
```

この場合、シナリオルートは `Assets/Scenario` ディレクトリです。`Assets/Scenario/RouteX/SceneX.nani` スクリプトファイルに移動するには、次のエンドポイントを使用します: `RouteX/SceneX`。

::: tip
エンドポイントを指定するときにディレクトリを含めたくない場合は、そうする必要はありません！以下で説明する [相対](/ja/guide/scenario-scripting#相対エンドポイント) および [ワイルドカード](/ja/guide/scenario-scripting#ワイルドカードエンドポイント) エンドポイント構文を確認してください。
:::

シナリオファイルを作成または移動すると、シナリオルートは自動的に検出されます。現在のルートはスクリプト設定メニューで確認できます。

![?width=715](https://i.gyazo.com/ff701bf560bd56948957b5ad887e3420.png)

### エンドポイント構文

Naninovelは4種類のエンドポイント構文をサポートしており、場合によってはより簡潔なパスを記述できます。

#### 正規エンドポイント

これはデフォルトの構文で、[シナリオルート](/ja/guide/scenario-scripting#シナリオルート) から始まるスクリプトへのフルパスを含みます。常にサポートされており、現在のスクリプトの場所に依存しませんが、ターゲットスクリプトまでのすべてのディレクトリを含める必要があります。

```nani
; 'Assets/Scenario/Prologue.nani' スクリプトの開始に移動します。
@goto Prologue
; 'Assets/Scenario/CommonRoute/Day1/Scene1.nani' スクリプトの
; 'Action' ラベルに移動します。
@goto CommonRoute/Day1/Scene1#Action
```

#### ローカルエンドポイント

この構文は、現在のスクリプト内のラベルに移動する場合にのみサポートされます。ラベルのみが含まれます。

```nani
; 現在のスクリプト内の 'Action' に移動します。
@goto #Action
```

#### 相対エンドポイント

相対パスは、現在のスクリプトからの相対パスをマッピングすることでエンドポイント構文を簡素化します。

```nani
; 'Assets/Scenario/CommonRoute/Day1/Scene1.nani' 内にいるとして、
; 同じディレクトリ内の 'Scene2.nani' ファイルに移動します。
@goto ./Scene2
; 親ディレクトリ内の 'Scene1.nani' ファイルに移動します。
@goto ../Day2/Scene1
; 現在のディレクトリの2つ上の 'RouteX' ディレクトリ内の
; 'SceneX.nani' ファイルに移動します。
@goto ../../RouteX/SceneX
```

#### ワイルドカードエンドポイント

パスにディレクトリを含めたくない場合は、スクリプト名のみを指定してワイルドカードパスを使用できます。これは、スクリプト名がプロジェクト全体で一意である場合にのみ機能します。

```nani
; 'Prologue.nani' スクリプトがどこにあっても移動します。
@goto */Prologue
; 'Scene1.nani' ファイルが複数あるため、エラーになります。
@goto */Scene1
; 'Day1' フォルダの下には 'Scene1.nani' ファイルが1つしかないため機能します。
@goto */Day1/Scene1
```

## ブールフラグ

ブールパラメータ値のショートカットとして *ブールフラグ* を使用します。例：

```nani
; Kohakuキャラクターを表示します。
@char Kohaku visible!
; 次と同等です:
@char Kohaku visible:true

; Kohakuキャラクターを非表示にします。
@char Kohaku !visible
; 次と同等です:
@char Kohaku visible:false

; インラインコマンドもフラグをサポートしています。
Lorem ipsum[shake Camera ver! !wait] dolor sit amet.
; 次と同等です:
Lorem ipsum[shake Camera ver:true wait:false] dolor sit amet.
```

完全なブール形式を使用する唯一の理由は、[スクリプト式](/ja/guide/script-expressions) を介して値を動的に評価したい場合です。例：

```nani
; "score" 変数が10より大きい場合、Kohakuを表示します。
@char Kohaku visible:{score>10}
```

— または、ブールパラメータに名前がない場合。例：

```nani
; 名前なしパラメータでカメラルックモードを無効にします。
@look false
```

後者の場合、名前なしパラメータのIDを指定してもフラグを使用できます。

```nani
; ブールフラグでカメラルックモードを無効にします。
@look !enable
```

## 条件付き実行

デフォルトでは、スクリプトは線形に実行されますが、すべてのコマンドでサポートされている `if` または `unless` パラメータを使用して分岐を導入できます。

```nani
; "level" が9000より大きい場合、選択肢を追加します。
@choice "It's over 9000!" if:level>9000

; "dead" がfalseの場合、printコマンドを実行します。
@print "I'm still alive." if:!dead

; 同じですが、より簡潔です。
@print "I'm still alive." unless:dead

; "insane" がtrueの場合、または1〜10の範囲のrandom関数が
; 5以上を返す場合、"@glitch" コマンドを実行します。
@glitch if:{ insane | random(1, 10) >= 5 }

; "score" が7〜13の間の場合、または "lucky" がtrueの場合、
; "LuckyEnd" スクリプトに移動します。
@goto LuckyEnd if:{ (score >= 7 & score <= 13) | lucky }

; インラインコマンド内の条件。
Lorem sit amet. [style bold if:score>=10]Consectetur elit.[style default]

; 式内の二重引用符をエスケープします。
@print {remark} if:remark="Saying \"Stop the car\" was a mistake."
```

### 条件ブロック

[@if] と [@else] を使用して、複数行の条件ブロックを [ネスト](/ja/guide/scenario-scripting#ネスト) できます。

```nani
; "score" 変数に応じてテキスト行を表示します。
; "You've failed. Try again!" - scoreが6未満の場合。
; "You've passed the test." と "Brilliant!" - scoreが8より大きい場合。
; "You've passed the test." と "Impressive!" - scoreが7より大きい場合。
; "You've passed the test." と "Good job!" - それ以外の場合。
@if score>6
    You've passed the test.
    @if score>8
        Brilliant!
    @else if:score>7
        Impressive!
    @else
        Good job!
@else
    You've failed. Try again!
```

条件ブロックはテキスト行内でインラインで使用することもでき、[@endif] で終了を示します。

```nani
; "score" 変数に応じてテキスト行を表示します。
; "Test result: Failed." - scoreが6未満の場合。
; "Test result: Perfect!" - scoreが8より大きい場合。
; "Test result: Passed." - それ以外の場合。
Test result:[if score>8] Perfect![else if:score>6] Passed.[else] Failed.[endif]
```

逆の条件を指定するには、[@unless] を使用します。

```nani
; deadがfalseの場合は "You're still alive!" を表示し、それ以外の場合は "You're done." を表示します。
@unless dead
    You're still alive!
@else
    You're done.

; "score" 変数に応じてテキスト行を表示します。
; "Test result: Passed." - scoreが10以上の場合。
; "Test result: Failed." - scoreが10未満の場合。
Test result:[unless score<10] Passed.[else] Failed.[endif]
```

::: info
条件式と使用可能な演算子の詳細については、[スクリプト式](/ja/guide/script-expressions) ガイドを参照してください。
:::

## ネスト

[@if]、[@choice]、[@while] などのコマンド、およびその他のいくつかのコマンドは、インデントを介して他のコマンドや汎用テキストラインを関連付けることをサポートしています。

```nani
@if score>10
    @bgm Victory
    Good job, you've passed the test!
```

ここで、[@bgm] コマンドとそれに続く汎用テキストラインは、[@if] コマンドに関連付けられています。

この機能をサポートするコマンドは *ネストホスト* と呼ばれます。C#では、これらのコマンドは `Command.INestedHost` インターフェイスを実装しています。ホストコマンドは、ネストされたコマンドを実行するかどうか、いつ実行するか、どのような順序で実行するかを制御します。

各ホストコマンドには、ネストされたコマンドを実行するときの独自の動作があります。たとえば、[@if] は条件が満たされない場合にネストされたコマンドをスキップしますが、[@choice] はプレイヤーが関連する選択肢を選択した場合にのみネストされたコマンドを実行します。

```nani
@if score>10
    Good job, you've passed the test!
    @bgm Victory
    @spawn Fireworks
@else if:attempts>100
    You're hopeless... Need help?
    @choice "Yeah, please!"
        @set score+=10
        @goto #BeginTest
    @choice "I'll keep trying."
        @goto #BeginTest
@else
    You've failed. Try again!
    @goto #BeginTest
```

ネストされたブロックがどのようにインデントされているかに注意してください。各レベルでは正確に **4つのスペース** を使用します。タブやその他の長さのスペースは無視されます。任意の深さのネストされたブロックが可能です。レベルごとにインデントを4スペース増やしてください。

複数のコマンドを単一のホストの下にグループ化するには、[@group] コマンドを使用します。

```nani
; randomコマンドはネストされた行の1つを選択しますが、ネストされた行の子は
; 無視します。ここではgroupコマンドを使用して複数の行を結合し、
; randomコマンドがそれらを一緒に実行するようにしています。
@random
    @group
        @back tint:red
        Paint it red.
    @group
        @back tint:black
        Paint it black.
```

## 非同期実行

一部のコマンドは、時間の経過とともに実行される場合があります。たとえば、[@hide] コマンドは、`time` パラメータで変更できる設定時間にかけて指定されたアクターをフェードアウトします。次のシナリオを考えてみましょう。

```nani
@hide Kohaku
@show Yuko
```

— 再生すると、Kohakuがフェードアウトしているのと同時に、Yukoアクターがフェードインし始めることに気付くでしょう。これは、デフォルトですべての非同期コマンドが待機されないためです。[@show] は、[@hide] がKohakuのフェードアウトを開始した直後にYukoのフェードインを開始します。

再生を続行する前に非同期コマンドが完了するのを待ちたい場合は、`wait` パラメータを使用します。

```nani
@hide Kohaku wait!
@show Yuko
```

— これで、YukoはKohakuが完全にフェードアウトした後にのみフェードインを開始します。

シーンを設定するために複数の非同期コマンドを使用し、それらすべてが完了するまで待つのが一般的です。プロセスを簡素化するには、[@await] コマンドを使用します。

```nani
; ネストされた行を並行して実行し、すべて完了するまで待ちます。
@await
    @back RainyScene
    @bgm RainAmbient
    @camera zoom:0.5 time:3
; 次の行は、上記がすべて完了した後に実行されます。
It starts raining...
```

### 並行再生

個々のコマンドはデフォルトで非同期に実行されますが、場合によっては、メインシナリオと並行して、独立した制御フローと再生状態を持つコマンドのチェーンを実行したいことがあります。

[@async] コマンドを使用して、ネストされた行を専用のスクリプトトラックで、メインの再生ルーチンと並行して実行します。一般的な使用例には、シナリオが通常通り進行している間にバックグラウンドで複合アニメーションを実行することが含まれます。

```nani
; 音楽をフェードしながら、カメラを3つのポイントにゆっくりとパンします。
@async
    @bgm volume:0.7 fade:10
    @camera offset:4,1 zoom:0.5 time:3 wait!
    @bgm volume:0.3 fade:5
    @camera offset:,-2 zoom:0.4 time:2 wait!
    @stopBgm fade:10
    @camera offset:0,0 zoom:0 time:3 wait!

; 下のテキストは、上記のアニメーションが独立して実行されている間に表示されます。
...
```

— または、コマンドのチェーンをループで実行します。

```nani
@async loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3, 10) }

; 上記のアニメーションはループで実行され、下のテキストが表示されます。
Watch out!
```

アニメーションの進行中にゲームが保存およびロードされたとしても、現在の再生状態が復元され、保存時のポイントからアニメーションが続行されます。ロールバックも同様に機能します。

### 非同期タスク

上記のループの例で、ループを停止するにはどうすればよいか疑問に思うかもしれません。または、ループしない非同期シナリオブロックが完了するのを待ってから続行したい場合はどうすればよいでしょうか？非同期タスクが役立ちます！[@async] コマンドのオプションの名前なしパラメータを使用して、コマンドによって実行される非同期タスクの名前を指定します。後で [@stop] または [@await] コマンドでその名前を使用して、タスクを停止（キャンセル）または待機できます。

```nani
; 'Quake' 非同期タスクを開始します。
@async Quake loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3, 10) }

...

; ある時点でタスクを停止します。
@stop Quake
```

同様に、非同期タスクを待機できます。

```nani
@async CameraPan
    @camera offset:4,1 zoom: 0.5 time:3 wait!
    @camera offset:,-2 zoom:0.4 time:2 wait!

...

; カメラをリセットする前に、パンアニメーションが終了していることを確認します。
@await CameraPan
@camera offset:0,0 zoom:0
```

タスクの残りの期間を待ちたくない場合は、`complete!` フラグを使用してタスクを即座に完了させることもできます。

```nani
; カメラアニメーションを完了し、即座にリセットします。
@await CameraPan complete!
@camera offset:0,0 zoom:0 time:0
```

::: tip

一般的なアニメーションやその他の非同期タスクを別のスクリプトにカプセル化し、[@gosub] コマンドを使用して他のスクリプトから再利用することを検討してください。

::: code-group

```nani [SomeScript.nani]
@gosub FX#Quake
...
@stop Quake

@gosub FX#CameraPan
...
@await CameraPan
```

```nani [FX.nani]
# Quake
@async Quake loop!
    @spawn Pebbles
    @shake Camera
    @wait { random(3, 10) }
@return

# CameraPan
@async CameraPan
    @bgm volume:0.7 fade:10
    @camera offset:4,1 zoom:0.5 time:3 wait!
    @bgm volume:0.3 fade:5
    @camera offset:,-2 zoom:0.4 time:2 wait!
    @stopBgm fade:10
    @camera offset:0,0 zoom:0 time:3 wait!
@return
```

:::

### トラックの同期

高度なケースでは、並行して実行されているトラックを相互に、またはメイントラックと結合（同期）したい場合があります。[@sync] コマンドはまさにそれを実行できます。

```nani
You'll have 60 seconds to defuse the bomb!

@async Boom
    @wait 60
    ; 60秒後、'Boom' タスクが停止されていない場合、
    ; 下の @sync コマンドはメイントラックを強制的にここに移動させ、
    ; その後 'BadEnd' スクリプトに移動します。
    @sync
    @goto BadEnd

; 一連の爆弾解除パズルをシミュレートします。
The defuse puzzle 1.
The defuse puzzle 2.
The defuse puzzle 3.

; 'Boom' 非同期タスクが停止されたため、メイントラックは
; 中断することなく実行を継続します。
@stop Boom
The bomb is defused!
```

— `Boom` 非同期スレッドで [@sync] コマンドを使用しなかった場合、[@goto] コマンドは非同期トラックで実行され、メイントラックはさらに実行を続けるため、`BadEnd` とメインシナリオの両方が並行して実行されることになります。[@sync] が行うことは、ターゲットトラック（デフォルトではメイン）を強制的にそれが使用されている行に移動し、ホストトラックを破棄することです。基本的にはホストトラックをターゲットトラックと交換します。

## テキスト識別

[スクリプトのローカライズ](/ja/guide/localization#スクリプトのローカライズ) や [オートボイス](/ja/guide/voicing#オートボイス) などの機能では、シナリオスクリプトに記述されたテキストを他のリソースに関連付ける必要があります。たとえば、オリジナルの代わりに表示する翻訳テキストや、テキストが表示されるときに再生するボイスクリップなどです。これが機能するには、そのような各テキストに一意の識別子を割り当てる必要があります。

デフォルトでは、Naninovelはスクリプトアセットのインポート時に、コンテンツハッシュによってすべてのローカライズ可能なテキストを自動的に識別します。テキストを変更しない限り、これは正常に機能します。変更すると、関連付けが壊れます。オートボイスクリップを再マッピングするか、変更されたテキストステートメントを再翻訳する必要があります。

テキストを編集するときに関連付けが壊れるのを防ぐために、`Naninovel -> Tools -> Text Identifier` エディタメニューからアクセスできるテキスト識別ユーティリティを使用してください。これにより、シナリオスクリプト内の各ローカライズ可能なテキストに一意のIDが自動生成され、書き込まれます。シナリオテキストには、各ローカライズ可能なパラメータに識別子が追加されます。例：

```nani
Kohaku: Hey!|#1|[-] What's up?|#2|
@choice "Option 1|#3|"
@choice "Option 2|#4|"
```

IDを削除または変更しない限り、関連付けは壊れません。テキストIDが目障りにならないように、IDE拡張機能とストーリーエディタは薄い色でレンダリングします。

このユーティリティは、生成されたすべてのテキストIDが一意であり、スクリプト内で以前に使用されていないことを保証します。これを追跡するために、リビジョン番号を `NaninovelData/ScriptRevisions` エディタアセットに保存します。割り当てられたテキストIDを持つ行を削除するたびに、このIDが突然他の場所に表示されることはない（手動で追加しない限り）と確信できます。

### 識別済みテキスト参照

ごくまれに、ローカライズ可能なテキスト識別子を意図的に複製したい場合があります。たとえば、スクリプトで指定されたローカライズされたパラメータを再利用する必要があるコマンドのインスタンスをC#で作成する場合などです。

単に `LocalizableTextParameter` 値を割り当てると、Naninovelは重複するテキストIDについて警告します。代わりに、パラメータの `Ref()` インスタンスメソッドを使用してください。

```cs
var print = new PrintText();
print.AuthorLabel = otherPrint.AuthorLabel.Ref();
```

シナリオスクリプト内の既存のローカライズされたテキストを参照するには、識別子に `&` を追加します。

```nani
; "Some Text" を含む選択肢を表示し、その後同じテキストを表示します。
@choice "Some Text|#SOMEID|"
@print |#&SOMEID|
```

## タイトルスクリプト

タイトルスクリプトは、スクリプト設定メニューで割り当てられる特別なシナリオスクリプトです。割り当てられると、エンジンの初期化後、または [@title] コマンドやさまざまなゲーム内メニューの「Title」ボタンでタイトルメニューに終了するときに自動的に再生されます。タイトルスクリプトは、タイトル画面シーンの設定に使用できます：背景、音楽、効果、タイトルUIの表示など。

スクリプトは、プレイヤーが「NEW GAME」、「EXIT」、またはセーブスロットのいずれかをクリックしてタイトルUI内でゲームをロードしたときにコマンドを呼び出すためにも使用できます。以下はタイトルスクリプトの例です。

```nani
; タイトルメニューの外観を設定します。
@back MainMenuBackground
@bgm MainMenuMusic
@spawn Rain
@show TitleUI
@stop

# OnNewGame
; 以下のコマンドは、プレイヤーが「NEW GAME」をクリックしたときに実行されます。
; "stopBgm" コマンドが待機されているため、
; 新しいゲームのロードが始まる前に音楽が完全に停止することに注意してください。
@sfx NewGameSoundEffect
@stopBgm wait!
@stop

# OnLoad
; 以下のコマンドは、プレイヤーが保存されたゲームをロードしたときに実行されます。
@sfx LoadGameEffect
@wait 0.5
@stop

# OnExit
; 以下のコマンドは、プレイヤーが「EXIT」をクリックしたときに実行されます。
@sfx ExitGameEffect
@wait 1.5
@stop
```

## Fountain

[Fountain](https://fountain.io) は、人間が読めるテキストで脚本を記述および共有するためのマークアップ構文です。[Highland](https://highland2.app)、[Final Draft](https://www.finaldraft.com)、[Scrivener](https://www.literatureandlatte.com/scrivener) などの脚本ソフトウェアでサポートされています。

Naninovelは、`.fountain` ドキュメントを `.nani` スクリプトに変換するツールを提供しているため、Fountain互換ソフトウェアでプロジェクトの初期シナリオを作成し、それをNaninovelに移行できます。

エディタメニューからツールを開きます: `Naninovel -> Tools -> Fountain Screenplay`。ソース `.fountain` ドキュメントと生成された `.nani` ファイルの出力フォルダを選択し、「Convert Screenplay」をクリックします。

Fountainの [Action](https://fountain.io/syntax#section-action) および [Dialogue](https://fountain.io/syntax#section-dialogue) 段落は [汎用テキストライン](/ja/guide/scenario-scripting#汎用テキストライン) に変換されます。その他の構文構造は [コメントライン](/ja/guide/scenario-scripting#コメントライン) として表されます。脚本を複数の `.nani` スクリプトに分割したい場合は、Fountainの [Section](https://fountain.io/syntax#section-sections) マークアップを使用します。たとえば、次の脚本を考えてみましょう。

```
# Episode 1
## Scene 1
...
## Scene 2
...
# Episode 2
## Scene 1
...
```

これは、フォルダに整理された次のシナリオスクリプトに変換されます。

- `Episode 1/Scene 1.nani`
- `Episode 1/Scene 2.nani`
- `Episode 2/Scene 1.nani`
