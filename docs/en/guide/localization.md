# Localization

All the game resources (scripts, audio, voice, backgrounds, etc.) can be localized to multiple languages/cultures.

Resources originally used to author the project are associated with a *source locale* by default. For example, if the game is initially authored in English, all the original (source) scenario scripts, UIs, signs on backgrounds, etc. are in English; this means the *source locale* is `en` (or `en-GB` / `en-US` / etc. if you wish to use separate locales for specific regions).

The *source locale* can be changed via `Naninovel -> Configuration -> Localization` menu with the `Source Locale` property. The `Source Locale` setting only determines the name (ID) of the locale associated with source project assets and is used in the "Language" drop-down in settings and related engine APIs to distinguish the locale.

![](https://i.gyazo.com/84eea85d3c3deddd187af1ed843f1bd5.png)

::: tip
If you'd like to share the source localizable text with a third party (e.g., for proofreading) but don't want to share the source scenario scripts, change `Source Locale` to some unrelated language you won't actually use, then disable `Expose Source Locale` and add a dedicated locale for the source material. That locale can then be exported to the localization [documents](/guide/localization#scripts-localization) or [spreadsheets](/guide/localization#spreadsheet).
:::

To add a locale, create a sub-folder inside `Resources/Naninovel/Localization` (the *localization resources root*) with a name equal to one of the [RFC5646](https://gist.github.com/Elringus/db90d9c74f13c00fa35131e61d1b73cb) language tags you wish to support. For example, to add German, create `Resources/Naninovel/Localization/de`. The "Language" drop-down in the built-in game settings UI will automatically include all added locales.

Be aware that you do not have to create a sub-folder in the *localization resources root* for the *source locale*. All project resources stored outside the *localization resources root* belong to the *source locale* by default.

The *localization resources root* path can be changed in the localization configuration menu via the `Loader > Path Prefix` property. Note that the configured path is relative to a "Resources" folder (not "Assets"). Unity handles Resources folders in a special way; you can have multiple such folders anywhere inside the project to organize locale-specific assets.

::: tip
Instead of using the `Resources` folder, you can opt for a different resource provider; for example, with [addressables](/guide/resource-providers#addressable) you can bundle locale-specific resources independently from the main game package and download them on demand.
:::

## Default Locale

To specify which locale is selected by default when the player first runs the game, use the `Default Locale` property in the localization configuration menu. When this property is not specified, the game will start in the `Source Locale`.

When the `Auto Detect Locale` option is enabled and the game runs for the first time, Naninovel will attempt to detect the locale based on the system language. If detection succeeds and the locale is supported by the game, it will be selected; otherwise the game falls back to `Default Locale`.

::: warning
Automatically detected locale won't include a specifier; i.e., when system language is English, the detected locale will be `en`, never `en-US` or `en-GB`. This is a limitation of Unity's [system language detection](https://docs.unity3d.com/ScriptReference/Application-systemLanguage). When relying on auto-detection, avoid using specifiers in the added locales.
:::

## Resources Localization

Inside the *localization resources root*, store resources that will be used instead of the source ones when the corresponding localization is selected in the game settings.

For example, if you wish to replace the "City" appearance sprite of the main background (actor ID `MainBackground`) when the `ja-JP` locale is selected, place the localized version at:

```
Resources/Naninovel/Localization/ja-JP/Backgrounds/MainBackground/City
```

## Scripts Localization

The resources localization scheme works for most resource types, except scenario scripts and managed text documents. For these types, use the localization tool accessible via `Naninovel -> Tools -> Localization`:

![](https://i.gyazo.com/1b47d70dcbbb45a3ab955b44c9b50942.png)

First, pick `Scripts Folder (input)` — the project directory where Naninovel scenario scripts (`.nani`) are stored (e.g., `Assets/Scenario`). Optionally, to generate localization documents for [managed text](/guide/managed-text) as well, pick `Text Folder (input)` — the directory where managed text documents are stored (`Assets/Resources/Naninovel/Text` by default).

Alternatively, if you wish to generate localization documents not from the source scripts but from previously generated documents for another locale, pick the text folder with existing localization documents for that locale, e.g. `Assets/Resources/Naninovel/Localization/ja-JP/Text`.

Then select the path to the locale folder where the generated localization resources should be stored. Make sure you've selected an actual locale folder (e.g., `Resources/Naninovel/Localization/ja-JP`). A label under the field will indicate when a valid output locale folder is selected and display the target locale name.

::: tip
You can generate resources for all locales in the project at once by selecting the *localization resources root* directory instead of a specific locale folder; the tool will iterate the sub-folders and generate resources for each.

![](https://i.gyazo.com/4f0a6373755f0e122958f1f98de13013.png)
:::

Press "Generate" to create or update localization resources. On subsequent runs the tool will respect previously generated localization documents and preserve localized entries when the source material hasn't changed.

Script localization documents are grouped under a `Scripts` folder and consist of statements in the following format:

```nani
# ID
; Source text
Translation text
```

The `# ID` line is the unique identifier of the localized content and should not be modified.

The `; Source text` line contains the original content to translate. It's a comment, so changing it won't affect the game — it's provided for translators' convenience.

Place the actual translation immediately after the comment line. You can use multiple lines for readability (they'll be joined), but ensure they appear before the next `# ID` line. For example:

```nani
# aj0e5dea
; Aliquam ut <b>ultricies</b> enim, id venenatis.<br>Nullam rhoncus eros tempus.
Оценивая блеск <b>металлического</b> шарика, пространство равноденственно.<br>
Противостояние есть метеорный дождь.
```

### Joined Lines

When a translated generic line contains inlined commands or expressions, it may be split into multiple text fragments, each mapped to a unique text ID. When **Join Lines** is enabled, such fragments will be joined into a single line using the pipe symbol `|`.

For example, given the following source script text:

```nani
Looks like rain is starting[rain]. Hey, {MC}, hurry up!
```

— the localization document will contain:

```nani
# id1|id2|id3
; Looks like rain is starting|. Hey, |, hurry up!
```

Notice inlined commands and expressions are replaced with `|`. Preserve them in the translated text, for example:

```nani
# id1|id2|id3
; Looks like rain is starting|. Hey, |, hurry up!
Похоже, дождь начинается|. Эй, |, поспеши!
```

You can also rearrange localized fragments if required by the target language, e.g.:

```nani
# id1|id2
; Hey, |, hurry up!
|, эй, поспеши!
```

— this will print `{MC}` (main character name) before the rest of the sentence.

::: tip
To give translators more control over inlined content (for example, to allow rewriting commands or changing expression order), check out [reveal events](/guide/text-printers#reveal-events) and [reveal expressions](/guide/text-printers#reveal-expressions).
:::

### Annotations

When **Include Annotations** is enabled, generated localization documents include the source script content being localized (command or generic line), as well as any comments placed before it. For example, given this source script:

```nani
; Player has to pick route.
@choice "Go left" set:route="left"
@choice "Go right" set:route="right"
Narrator: You've decided to go {route}. Wise choice!
```

—the generated localization document will contain:

```nani
# id1
; > Player has to pick route.
; > @choice "|#id1|" set:route="left"
; Go left

# id2
; > @choice "|#id2|" set:route="right"
; Go right

# id3|id4
; > Narrator: |#id3|{route}|#id4|
; You've decided to go |. Wise choice!
```

Annotations provide translators with context for the localized text. Make sure to **NOT** include annotation lines (those beginning with `; >`) in the translation. Only the single-`;` lines are expected to be translated.

::: tip EXAMPLE
Find an example localization setup in the [localization sample](/guide/samples#localization). Use it as a reference if you have issues setting up localization in your project.
:::

## Spreadsheet

You can compile all project scenario scripts and managed text localizations into spreadsheets — for example, to share text with translators or editors.

The Spreadsheet tool extracts localizable text to `.csv` sheets and can import edited sheets back into the project.

![](https://i.gyazo.com/50767f3193ae5b3ed423ea7c213c786b.png)

Before exporting, always generate localization data with the localization tool (`Naninovel -> Tools -> Localization`). You can generate resources for all locales at once by selecting the localization root directory (`Resources/Naninovel/Localization`) for the `Locale Folder` property.

![](https://i.gyazo.com/047d43250a941b918de65205a19b2d78.png)

When the localization data is up to date, open the Spreadsheet tool via `Naninovel -> Tools -> Spreadsheet`.

![](https://i.gyazo.com/16cd076ebcc43b2d1a058c10e9dea43d.png)

Specify the required folders:
- Input Script Folder — folder where source `.nani` scripts are stored (e.g., `Assets/Scenario`).
- Input Text Folder — folder where [managed text documents](/guide/managed-text) are generated (e.g., `Assets/Resources/Naninovel/Text`). Make sure to generate managed text documents via the tool if the folder is missing.
- Input Localization Folder — localization root where locale resources are stored (e.g., `Assets/Resources/Naninovel/Localization`).
- Output Folder — destination for generated or edited sheets.

Click "Export" to export sheets to the selected destination.

Each script and managed text document will be exported to an individual sheet. Each sheet has an "ID" column storing localizable text IDs and an additional column for each locale. You can modify any column except "ID"; however, modifying the source-locale column won't have any effect on import.

When **Include Annotations** is enabled, generated sheets will also contain a column with the source script content (author names, inlined commands and comments). That column is ignored during import.

After editing the sheets, click "Import" to bring the data back into the project.

::: warning
Project localization documents will be overwritten when importing from a spreadsheet, so avoid modifying them while the spreadsheet is being edited to prevent conflicts.
:::

### Custom Processor

You can inject a custom spreadsheet processor to customize sheet generation and the import/export processes.

Create a custom processor class by inheriting the built-in `Naninovel.Spreadsheet.Processor`. The utility will automatically pick your custom handler and use it instead of the built-in one.

Below is an example processor with key override points:

```csharp
using Naninovel.Spreadsheet;

public class CustomProcessor : Processor
{
    public CustomProcessor (ProcessorOptions options) : base(options)
    {
        // Access export/import options, e.g.:
        // options.ScriptFolder
        // options.SourceLocale
        // ...
    }

    // Override how scripts are exported from project to sheets.
    protected override void ExportScripts () { }
    // Override how managed text is exported from project to sheets.
    protected override void ExportText () { }
    // Override how scripts are imported from sheets to project.
    protected override void ImportScripts () { }
    // Override how managed text is imported from sheets to project.
    protected override void ImportText () { }
}
```

::: tip EXAMPLE
Find an example on how to set up and use the tool in the [localization sample](/guide/samples#localization).
:::

## UI Localization

To localize both custom and built-in UIs, use the [managed text provider](/guide/managed-text#managed-text-provider) component. It can also be used to localize any other custom game objects (prefabs). For more information on using managed text records and localizing them, refer to the managed text guide.

## Fonts

To display text in some languages, you'll need a compatible font. `Inter` is used by default and supports Latin, Cyrillic, and Greek characters in Unicode 7.0.

::: tip
If you plan to support many languages with a single font, consider [Noto fonts](https://www.google.com/get/noto/).
:::

Right-to-left (RTL) languages (Arabic, Hebrew, Persian, etc.) are supported by the TMPro printers but require additional setup; see the [guide](/guide/text-printers.html#right-to-left-arabic-text) for details.

When publishing for CJK languages (Chinese, Japanese, and Korean), consider using the Character Extractor utility to optimize TMPro font atlas size. See [guide](/guide/text-printers.html#cjk-languages).

To associate a font with a specific locale, use the `Apply On Locale` property of font options found in the UI configuration. When assigned, the font will be applied automatically whenever that locale is selected in the game settings.

![](https://i.gyazo.com/e44d120c983f3d6c1d15e910829fc344.png)

Ensure `Font Change Configuration` is set up properly on the text printer. See the [UI guide](/guide/gui#changing-font) for instructions on configuring fonts.

::: tip EXAMPLE
Find an example on setting up localization-specific fonts in the [localization sample](/guide/samples#localization).
:::

## Community Localization

When a released title gains enough popularity, the community may want to contribute additional localizations; this often leads to users hacking build assets to replace displayed text. Naninovel provides a runtime localization option that lets you add community localizations without tampering with build files.

### Ejecting Localization Resources

To generate localization resources (script and managed text docs), run the game executable with the `-nani-eject` argument, e.g.:

```
./game.exe -nani-eject
```

This launches the game as usual, but after Naninovel initializes it will eject localization resources to Unity's [persistent data folder](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html) under `Localization`. For example, if the company's name is `Foo` and the game title is `Bar`, the ejected path on Windows will be:

```
C:/Users/User/AppData/LocalLow/Foo/Bar/Localization
```

If you'd like to generate localization resources based on a built-in localization, append the locale tag to the eject arg. E.g., given the game has `ja-JP` localization, use:

```
-nani-eject-ja-JP
```

When the locale tag is not specified, documents for the source locale are ejected.

Now supply a font to use with the localization. Drop the font file under the Localization directory, e.g. `Localization/Noto.ttf`.

Note the `Localization/Info.txt` file. Specify the author of the localization (first line) and the supplied font name (second line) by replacing the default content. For example:

```
Awesome Author
Noto.ttf
```

— "Awesome Author" will be displayed in the language dropdown by default (developers can customize this). The font will be applied by default when the game starts.

Don't delete or move the `Info.txt` file, as it's required to detect the presence of a community localization.

### Translating

After documents are ejected you can start translating. The process is similar to "Scripts Localization" and "UI Localization" above. Script localization documents are stored in `Localization/Text/Scripts`, while managed text docs are in `Localization/Text`.

Restart the game as usual (without the eject arg) and it will automatically use the localization resources in the persistent data folder. For script localization changes to take effect, the associated script has to be re-loaded (save-loading is usually enough), though a restart may be required in some cases.

If the developer updates the game, you can eject again to update the existing localization; new lines and records will be inserted while existing translations for unchanged source material will be preserved.

After translation is finished, share the `Localization` folder and instruct end-users to place it under the aforementioned persistent data directory to activate the localization. To disable the localization, delete the folder.

## Compiler Localization

NaniScript is special among domain-specific languages in that it's heavily intertwined with natural languages, i.e., authors constantly switch between typing prose displayed to the player (printed text lines) and engine constructs (commands and labels).

As long as you're authoring scenarios in English, it's not a problem, but authors working in other languages would have to switch keyboard layouts to input natural text and English-based commands. Worse, some layouts may not have required characters (such as `@`), requiring writers to input them via key codes.

To help authoring scenarios in languages other than English, Naninovel has a compiler localization feature. It allows re-mapping control characters, as well as command and parameter names, constants and basically anything you need to type when authoring scenarios.

First, create a compiler localization asset via `Create -> Naninovel -> Compiler Localization`. Select the asset and specify the desired localization for the compiler artifacts:

![](https://i.gyazo.com/5ffcd8e06231616598cc8317f7854f9a.png)

To override commands, parameters, functions and constants, use the dedicated lists. You can also localize documentation and usage examples associated with commands and parameters; these will be shown in the IDE extension.

![](https://i.gyazo.com/4fdcdcec7361a9ccbcc1012d842ef4ad.png)

The lists are initially empty. To populate them with commands and functions available in the project, use the inspector context menu.

![](https://i.gyazo.com/cddd1981c5aef5f16da2052898c7a530.png)

After making the required changes, restart the Unity editor and re-import scenario script assets for changes to take effect.

Localized artifacts will propagate to the visual editor and [IDE extension](/guide/ide-extension), providing autocomplete and on-hover documentation after metadata sync.

![](https://i.gyazo.com/fde9998597ffedb8a025401bb2f71ce9.png)

::: tip EXAMPLE
Check the [compiler localization sample](/guide/samples#compiler-localization) where the compiler is localized to Russian language and keyboard layout.
:::
