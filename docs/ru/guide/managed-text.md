# Managed Text

Managed text feature allows to manage (replace) various text elements used throughout Naninovel like the in-game UI and characters' display names using localizable documents.

To generate the managed text documents, use managed text tool accessible via `Naninovel -> Tools -> Managed Text` editor context menu.

![Managed Text Tool](https://i.gyazo.com/200680de85848f04a2eb51b063295c51.png)

Using "Select" button, select path to store the managed text documents (should be `Resources/Naninovel/Text` by default) and press "Generate" button to create the documents.

You can also create a custom managed text document using `Create -> Naninovel -> Managed Text` asset context menu.

Each line in managed text document is an expression in the following format: *Path*: *Value*, where *Path* is the path to the text variable and *Value* is the value of that variable. For example, here is the default contents of the "DefaultUI" document, which contains records for the built-in UI:

![Managed Text Document](https://i.gyazo.com/ce57c700b77818f87aabb722f2f42b78.png)

You can edit the values and the changes will be applied on the next run.

Enabling `Delete Unused` property will remove records in the managed text documents that are not directly referenced neither via `ManagedTextProvider` components, nor via `ManagedText` attributes in the source code (more on that below).

## Managed Text Provider

It's possible to bind an arbitrary Unity game object to managed text record without any scripting via `ManagedTextProvider` component; add the component to a game object, specify category (name of the document which will contain the record), key (name of the record inside the document) and use `OnValueChanged` event to bind the value to a game object property.

Below is an example of binding a managed text record stored in "MyCustomDocument" document with key "MyCustomText" to a Untiy's "Text" component.

![](https://i.gyazo.com/f47a997052674341aa3133deeea1f1cf.png)

When `ManagedTextProvider` component is used in a custom UI, text printer or choice handler, corresponding records will automatically be generated when using managed text tool (given the resources are assigned in the configuration menu); for other cases you'll have to add the records manually.

![](https://i.gyazo.com/cc2ad398d1ad716cca437913553eb09c.png)

## Managed Text Variables

It's also possible to bind managed text records with variables in the source code. For this, add `ManagedText` attribute to a static string field in any C# script. Its value will be overwritten with the value specified in the managed text document on engine initialization. 

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
        Engine.GetService<ILocalizationManager>().OnLocaleChanged += _ => text = LabelText;
    }
}
```

## Script Text

It's possible to get managed text values directly from naninovel scripts. This could be handy, when it's required to use some text in the script expressions and the text should be localizable. 

Create a managed text document named "Script" and add records using keys with `T_` or `t_` prefix. It's now possible to reference the values in script expressions; eg given the following records in the "Script" managed text document:

```
T_Greeting1: Hey!
T_Greeting2: Hello!
T_Greeting3: Hi!
``` 

— you can reference the values with:

```
@print {Random(T_Greeting1,T_Greeting2,T_Greeting3)}
```

Of course, "Script" managed text document can be localized in the same way as the other documents; so when the user will select another locale, the text will automatically be referenced from the corresponding localized document.

## Localization

Managed text localization process resemble the one for naninovel scripts: 

1. Generate (create, edit) the required managed text documents in a `Resources/Naninovel/Text` folder.
2. Run the localization utility in a locale folder (`Resources/Naninovel/Localization/{Locale}`, where `{Locale}` is the tag of the target locale).
3. The localization documents for the source managed text documents will appear in the corresponding locale folder. Use them to add or edit the translation.

To update the managed text documents and their corresponding localization counterparts, first run the generate managed text utility in a `Resources/Naninovel/Text` folder, and then the localization utility in a `Resources/Naninovel/Localization/{Locale}` folder. Both utilities will attempt to preserve any existing modifications (managed text records and their translations) by default, so you won't have to re-write everything from scratch on each update.

 See [Localization](/ru/guide/localization.md) for more info on how to use the localization utility.

 ::: example
You can find an example localization setup (including managed text) in the [demo project](/ru/guide/getting-started.md#demo-project). Feel free to use it as a reference in case having issues setting up localization in your own project.
:::

