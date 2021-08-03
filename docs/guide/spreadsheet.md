# Spreadsheet

At some point you may look for an option to compile all the project scenario script and managed text localizable data into a single or multiple spreadsheets. For example, you may want to share the text with a translation agency or editors for proofreading.

Spreadsheet extension allows to extract all the localizable data (text) from the project to `.xlsx` spreadsheets and then import it back.

![](https://i.gyazo.com/e8b46fc74a5f633bdce9ec578b3ddf94.png)

## Installation

To set up spreadsheet extension on top of an existing Unity project use [UPM](https://docs.unity3d.com/Manual/upm-ui.html) to install the package via the following git URL: `https://github.com/Naninovel/Spreadsheet.git?path=Assets/NaninovelSpreadsheet` or download and import [NaninovelSpreadsheet.unitypackage](https://github.com/Naninovel/Spreadsheet/raw/main/NaninovelSpreadsheet.unitypackage) manually.

![](https://i.gyazo.com/b54e9daa9a483d9bf7f74f0e94b2d38a.gif)

## Usage

Before exporting the project data, always generate localization data with the localization tool (`Naninovel -> Tools -> Localization`). You can generate resources for all the locales defined in the project at once by selecting the localization root directory (`Resources/Naninovel/Localization` by default) for the `Locale Folder` property.

![](https://i.gyazo.com/047d43250a941b918de65205a19b2d78.png)

For more information on how to use the tool, see [localization guide](/guide/localization.md).

When the localization data is up to date, open spreadsheet tool with `Naninovel -> Tools -> Spreadsheet` editor menu.

![](https://i.gyazo.com/6789ed37b8e72282522bd34d332516af.png)

To import all the data into a single spreadsheet file, enable `Single Spreadsheet`, create a new `.xlsx` spreadsheet file (eg, with Microsoft Excel 2007 or newer) and specify location of the file. To import the data into multiple spreadsheets, specify the output folder and make sure `Single Spreadsheet` is disabled. Then specify folders containing naninovel scripts, managed text and localization root.

Click "Export" button to export the project data to the selected destination.

When using single spreadsheet, each script and managed text document will be exported to an individual sheet inside the Excel file; otherwise, an Excel file per document will be created. Sheets will have at least two columns: "Template" and "Arguments". Template column contain all the source file (script or managed text) lines, with localizable parts (text) replaced with placeholders (eg, `{0}`, `{1}` and so on). Each consecutive non-localizable script line (eg, command lines that don't contain parameters that can be translated) will be appended to single template column cell, until a localizable line is discovered. Arguments column contain the text extracted from the associated localizable line.

![](https://i.gyazo.com/709cc837db4e0bc1fe988c9a29ed8956.png)

When locales are defined in the project (via folder inside localization root), the associated columns will be added after the argument column. You're free to modify all the columns in the spreadsheet (including the template column), just make sure to preserve the argument to template relations.

After performing the required modifications, click "Import" button to import the data back to the project.

::: warn
Project resources will be overwritten when importing from spreadsheet, so refrain from modifying the scenario scripts, managed text and associated localization documents, while the spreadsheet is being edited.
:::

## Example

Find an example on how to setup and use the extension in the following project hosted on GitHub: [github.com/Naninovel/Spreadsheet](https://github.com/Naninovel/Spreadsheet).

You can [clone the project with a Git client](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) or [download it as a zip archive](https://github.com/Naninovel/Spreadsheet/archive/main.zip). 

::: warn
Naninovel package is not distributed with the project, hence compilation errors will be produced after opening it for the first time; import Naninovel from the Asset Store to resolve the issues.
:::

The project has a couple of test scripts stored in `Assets/Scripts` folder, managed text documents at `Assets/Resources/Naninovel/Text` and a `Spreadsheet.xlsx` at the root directory.