# Localization

All the game resources (scripts, audio, voice, backgrounds, etc) can be localized to multiple languages/cultures.

By default, all the resources stored in the project are used when the game is running under the *source locale*. For example, imagine you initially develop the game in English: all the original (source) naninovel scripts you write, UIs, signs on backgrounds, etc are in English; this means the *source locale* is `en` (or `en-GB` / `en-US` / etc in case you wish to use separate locales for specific regions).

The *source locale* can be changed in the `Naninovel -> Configuration -> Localization` menu with the `Source Locale` property. `Source Locale` property only determines the name (ID) of the locale associated with your source project assets and is used in the "Language" drop-down settings menu and related engine APIs to distinguish the locale.

You can setup additional locales by creating a sub-folder inside `Resources/Naninovel/Localization` folder (the so-called *localization resources root*) with a name equal to one of the [RFC5646](https://gist.github.com/Elringus/db90d9c74f13c00fa35131e61d1b73cb) language tags you wish to add localization for. For example, to add a German locale, create a `Resources/Naninovel/Localization/de` folder. The "Language" drop-down list in the game settings built-in UI will automatically incorporate all the added locales. 

Be aware, that you don't have to create a sub-folder in the *localization resources root* for the *source locale*. All the project resources stored outside of the *localization resources root* belong to the *source locale* by default.

*Localization resources root* specific path can be changed in the localization configuration menu via `Loader > Path Prefix` property. Notice, that the configured path is relative to a "Resources" folder (not the "Assets"). The resources folders are [handled in a special way](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime.html) by Unity; you can have multiple such folders stored anywhere inside the project assets for organization purposes.

You can set which locale is selected by default when player first runs the game with `Default Locale` property in the localization configuration menu. When the property is not specified, the game will start in *source locale* by default.

![](https://i.gyazo.com/fb50a8c5f5fa6624105f8eeca6a7523e.png)

## Resources Localization

Inside the *localization resources root* store resources that will be used instead of the source ones when the corresponding localization is selected in the game settings. 

For example, if you wish to replace a "City" appearance sprite of a main background (background actor with "MainBackground" ID) with another one when a `ja-JP` locale is selected, place the localized version at the following path: `Resources/Naninovel/Localization/ja-JP/Backgrounds/MainBackground/City`.

## Scripts Localization

The resources localization scheme described above works with all the resource types, except naninovel scripts and managed text documents. For these type of resources, use localization tool accessible via `Naninovel -> Tools -> Localization`:

![Localization Tool](https://i.gyazo.com/5c6b023cbf4617f44102593f13131571.png)

First, select path to the locale folder where to store the generated localization resources. Make sure you've selected an actual locale folder (eg, `Resources/Naninovel/Localization/ja-JP`) and not just the *localization resources root*. Label under the property field will indicate when a valid output locale folder is selected displaying name of the selected localization target.

Enabling "Try update" property will attempt to preserve any currently existing localization resources; when disabled all the existing localization resources at the specified path will be lost.

Enabling "Localize text" will also generate [managed text](/zh/guide/managed-text.md) localization documents. When enabled, "Text Folder" property will appear allowing to specify path to the source managed text documents (`Assets/Resources/Naninovel/Text` by default). It's possible to set the path to a folder containing localized version of text documents to generate a localization variant that is using a non-source language.

Press "Generate" button to create (update) the localization resources.

Script localization documents consists of statements in the following format:

```
# ID
; Source text
Translation text
```

`# ID` line is the unique identifier of the source statement in the naninovel script, you shouldn't modify those.

`; Source text` line is the original text which you're expected to translate. It's just a comment, so changing this line won't have any effect; it's provided for convenience.

You're expected to put the actual translation right after the comment line with the source text. You can use any number of lines for the translation, just make sure to place them before next `# ID` line. 

Here is an example translation of a generic text line:

```
# f63f03ea
; Yuko: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut ultricies enim, id venenatis arcu. Nullam rhoncus eros eu ante vulputate tempus.
Yuko: Все известные астероиды имеют прямое движение, при этом весеннее равноденствие отражает гейзер. Уравнение времени однократно. Большая Медведица, оценивая блеск освещенного металлического шарика, пространственно притягивает первоначальный метеорный дождь.
```

In case the translation takes too much space, you can break it into separate commands:

```
# f63f03ea
; Yuko: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut ultricies enim, id venenatis arcu. Nullam rhoncus eros eu ante vulputate tempus.
Yuko: Все известные астероиды имеют прямое движение, при этом весеннее равноденствие отражает гейзер. Уравнение времени однократно.
Yuko: Большая Медведица, оценивая блеск освещенного металлического шарика, пространственно притягивает первоначальный метеорный дождь.
```

You're expected to include any inlined commands present in the source statement to the translation:

```
# b53b395d
; Kohaku: Qui ante molestie sit tempor felis.[br 2][char Kohaku.Casual/Angry][style #ff0000,bold,45]Adipiscing elit?[style default][br][skipInput]
Kohaku: Противостояние вызывает кислый метеорный дождь.[br 2][char Kohaku.Casual/Angry][style #ff0000,bold,45]Меандр разрушаем?[style default][br][skipInput]
```

::: warn
You **should not translate character IDs** (or any other actor IDs). If you do so, some features (eg, character highlight and lip sync) will break. In case you wish to translate author names displayed in text printers, use [display names](/zh/guide/characters.md#display-names) feature instead.
:::

Total word count contained in the generated localization documents (excluding the hash lines) is shown in the localization tool window when the generation procedure is finished.

By default, the generated documents will contain the text to translate taken from the source naninovel scripts. In case you wish to instead take the text from already generated localization documents, select "Script Folder" path to point into a folder containing generated localization documents for another locale. For example, let's say your source locale is Spanish. By default, the localization documents will contain the source text in Spanish. But what if you already have a Spanish -> English translation and now need to generate English -> Russian documents? Just point "Script Folder" to the folder where English documents are stored; the generated documents will then contain source text taken from the English translation.

::: example
You can find an example localization setup in the [demo project](/zh/guide/getting-started.md#demo-project). Feel free to use it as a reference in case having issues setting up localization in your own project.
:::