# Managed Text

Managed text feature allows to manage (replace) various text elements used throughout Naninovel like the in-game UI and characters' display names using localizable documents. 

To generate the managed text documents, use managed text tool accessible via `Naninovel -> Tools -> Managed Text` context menu.

![Managed Text Tool](https://i.gyazo.com/2897fb4799b829bb9ae0781bd11c2508.png)

Using "Select" button, select path to store the managed text documents (should be `./Resources/Text` by default) and press "Generate" button to create the documents.

Each line in managed text document is an expression in the following format: *Path*: *Value*, where *Path* is the path to the text variable and *Value* is the value of that variable. For example, here is the default contents of the "UITitleMenu" document, which corresponds to the title (main) menu UI:

![Managed Text Document](https://i.gyazo.com/5d2f9fa1dff0ddc5740dc2d3efcb9e9e.png)

You can edit the values and the changes will be applied on the next run.

Enabling `Delete unused` property will remove records in the managed text documents for variables that doesn't exist when running the generate managed text task.

Localization variant for each managed text document will be created automatically when running the generate localization resources task; see [Localization](/guide/localization.md) for more info.

You can add your own managed text variables and they'll be included to the generated documents. For this just add `ManagedText` attribute to a static string field in any C# script. Its value will be overwritten with the value specified in the managed text document on engine initialization. 

## Script Text

It's also possible to reference managed text values from naninovel scripts. This could be handy, when you need to use some text in the script expressions and the text should be localizable. 

Create a managed text document named "Script" and add records using keys with `T_` or `t_` prefix. You'll then be able to reference the values in script expressions; eg given the following records in the "Script" managed text document:

```
T_Greeting1: Hey!
T_Greeting2: Hello!
T_Greeting3: Hi!
``` 

— you can reference the values with:

```
@print {Random(T_Greeting1,T_Greeting2,T_Greeting3)}
```

Of course, the "Script" managed text document can be localized in the same way as the other documents; so when the user will select another locale, the text will automatically be referenced from the corresponding localized document.