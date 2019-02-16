# Managed Text

Managed text feature allows to manage (replace) various text elements used throughout Naninovel like the in-game UI and characters' display names using localizable documents. 

To generate the managed text documents, use managed text tool accessible via `Naninovel -> Tools -> Managed Text` context menu.

![Managed Text Tool](/guide/managed-text.png)

Using "Select" button, select path to store the managed text documents (should be `./Resources/Text` by default) and press "Generate" button to create the documents.

Each line in managed text document is an expression in the following format: *Path*: *Value*, where *Path* is the path to the text variable and *Value* is the value of that variable. For example, here is the default contents of the "UITitleMenu" document, which corresponds to the title (main) menu UI:

![Managed Text Document](/guide/managed-text-document.png)

You can edit the values and the changes will be applied on the next run.

Enabling `Delete unused` property will remove records in the managed text documents for variables that doesn't exist when running the generate managed text task.

Localization variant for each managed text document will be created automatically when running the generate localization resources task; see [Localization](/guide/localization.md) for more info.

You can add your own managed text variables and they'll be included to the generated documents. For this just add `ManagedText` attribute to a static string field in any C# script. Its value will be overwritten with the value specified in the managed text document on engine initialization. 
