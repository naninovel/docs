# Spreadsheet

At some point you may look for an option to compile all the project scenario script and managed text localizations into spreadsheets. For example, you may want to share the text with a translation agency or editors for proofreading.

Spreadsheet tool allows extracting all the localizable text from the project to `.csv` sheets and then import it back.

![](https://i.gyazo.com/50767f3193ae5b3ed423ea7c213c786b.png)

## Usage

Before exporting the project data, always generate localization data with the localization tool (`Naninovel -> Tools -> Localization`). You can generate resources for all the locales defined in the project at once by selecting the localization root directory (`Resources/Naninovel/Localization` by default) for the `Locale Folder` property.

![](https://i.gyazo.com/047d43250a941b918de65205a19b2d78.png)

For more information on how to use the tool, see [localization guide](/guide/localization).

When the localization data is up-to-date, open spreadsheet tool with `Naninovel -> Tools -> Spreadsheet` editor menu.

![](https://i.gyazo.com/f583374cc46f9b24af8f493c6693f0c1.png)

Specify the required folders:
 - Input Script Folder — folder where you store source naninovel scenario scripts (`.nani`); usually in our example projects we store them under `Assets/Scripts` folder.
 - Input Text Folder — folder where [managed text documents](/guide/managed-text) are generated to; it's `Assets/Resources/Naninovel/Text` by default. Make sure to generate managed text documents via associated tool in case the folder is missing.
 - Input Localization Folder — localization root where resources for all the different locales are stored; `Assets/Resources/Naninovel/Localization` by default.
 - Output Folder — folder where to store generated or import edited sheets from.

Click "Export" button to export sheets to the selected destination.

Each script and managed text document will be exported to an individual sheet. Each sheets will have "ID" column storing localizable text IDs and additional column per each locale. You're free to modify all the columns in the spreadsheet except "ID"; however, modifying column associated with the source locale won't have any effect on import.

When **Include Annotations** option is enabled, generated sheets will also contain a column with script comments placed before localized lines. The column is ignored during import.

After performing required modifications, click "Import" button to import the data back to the project.

::: warning
Project's localization documents will be overwritten when importing from spreadsheet, so refrain from modifying them while the spreadsheet is being edited to prevent conflicts.
:::

::: info NOTE
The sheets `.csv` format is expected to be compliant with [RFC-4180](https://datatracker.ietf.org/doc/html/rfc4180) standard. However, some sheet processors, such as Microsoft Excel don't wrap cells with trailing whitespace in double quotes on save, which may lead to missing spaces in some cases (eg, spaces between text and inlined commands or expressions). Consult following thread for various workarounds: [techcommunity.microsoft.com/excel/223484](https://techcommunity.microsoft.com/t5/excel/save-as-csv-file-utf-8-with-double-quotes-how/m-p/223484).
:::

## Custom Processor

It's possible to inject custom spreadsheet processor to customize the way sheets are generated as well as the import and export processes.

Create a custom processor class by inheriting built-in `Naninovel.Spreadsheet.Processor` handler. The utility will automatically pick the custom handler and use it instead of the built-in one.

Below is an example of a custom processor with some key override points.

```csharp
using Naninovel.Spreadsheet;

public class CustomProcessor : Processor
{
    public CustomProcessor (ProcessorOptions options) : base(options)
    {
        // Access export/import process options, eg:
        // options.ScriptFolder
        // options.SourceLocale
        // ...etc
    }

    // Override how scripts are exported from project to sheets.
    protected override void ExportScripts () { }
    // Override how managed text is exported from project to sheets.
    protected override void ExportText () { }
    // Override how script are imported from sheets to project.
    protected override void ImportText () { }
    // Override how managed text is imported from sheets to project
    protected override void ImportScripts () { }
}
```

## Example

Find an example on how to set up and use the tool in the following project [hosted on GitHub](https://github.com/naninovel/samples/tree/main/unity/spreadsheet).

You can [clone the project with a Git client](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) or [download it as a zip archive](https://github.com/Naninovel/Spreadsheet/archive/main.zip).

::: warning
Naninovel package is not distributed with the project, hence compilation errors will be produced after opening it for the first time; importing the package will resolve the issues.
:::

The project has a couple of test scripts stored in `Assets/Scripts` folder, managed text documents at `Assets/Resources/Naninovel/Text` and a sheets at the root directory.
