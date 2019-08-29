# Managed Text

Managed text feature allows to manage (replace) various text elements used throughout Naninovel like the in-game UI and characters' display names using localizable documents. 

To generate the managed text documents, use managed text tool accessible via `Naninovel -> Tools -> Managed Text` editor context menu.

![Managed Text Tool](https://i.gyazo.com/2897fb4799b829bb9ae0781bd11c2508.png)

Using "Select" button, select path to store the managed text documents (should be `Resources/Text` by default) and press "Generate" button to create the documents.

You can also create a custom managed text document using `Create -> Naninovel -> Managed Text` asset context menu.

Each line in managed text document is an expression in the following format: *Path*: *Value*, where *Path* is the path to the text variable and *Value* is the value of that variable. For example, here is the default contents of the "UITitleMenu" document, which corresponds to the title (main) menu UI:

![Managed Text Document](https://i.gyazo.com/5d2f9fa1dff0ddc5740dc2d3efcb9e9e.png)

You can edit the values and the changes will be applied on the next run.

Enabling `Delete unused` property will remove records in the managed text documents for variables that doesn't exist when running the generate managed text task. Be aware, that running the generate utility with this option enabled **will always delete** all the custom managed text documents, that are not referenced by managed text variables (see below).

## Managed Text Variables

You can add your own managed text variables and they'll be included to the generated documents. For this add `ManagedText` attribute to a static string field in any C# script. Its value will be overwritten with the value specified in the managed text document on engine initialization. 

Below is an example on using a managed text variable to localize a text label in a C# script.

```csharp
using Naninovel;
using UnityEngine.UI;

// Inheriting our class from the Unity's text component, so we can use it as one.
public class CustomLabel : Text
{
    // Value of the "CustomLabel.LabelText" managed text record will be assigned 
    // to the below variable on engine initialization and updated on locale changes.
    [ManagedText("MyCustomUI")] // "MyCustomUI" is the name of managed text document where the record will be kept.
    public static string LabelText = "Default Value"; // "Default Value" is the default value of the record.

    protected override void Awake ()
    {
        base.Awake();

        text = LabelText; // Assign current value of the managed text record to the label.

        // Update the label when user changes the locale at runtime.
        Engine.GetService<LocalizationManager>().OnLocaleChanged += _ => text = LabelText;
    }
}
```

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

## Localization

Managed text localization process closely resembles the one used for naninovel scripts: 

1. Generate (create, edit) the required managed text documents in a `Resources/Text` folder.
2. Run the localization utility in a locale folder (`Resources/Localization/{Locale}`, where `{Locale}` is the tag of the target locale).
3. The localization documents for the source managed text documents will appear in the corresponding locale folder. Use them to add or edit the translation.

To update the managed text documents and their corresponding localization counterparts, first run the generate managed text utility in a `Resources/Text` folder, and then the localization utility in a `Resources/Localization/{Locale}` folder. Both utilities will attempt to preserve any existing modifications (managed text records and their translations) by default, so you won't have to re-write everything from scratch on each update.

 See [Localization](/guide/localization.md) for more info on how to use the localization utility.

