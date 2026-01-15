# Managed Text

The managed text feature allows managing (replacing) various text elements used throughout Naninovel, such as in-game UI strings and characters' display names, via localizable documents.

To generate the managed text documents, use the managed text tool accessible via `Naninovel -> Tools -> Managed Text` editor context menu.

![Managed Text Tool](https://i.gyazo.com/200680de85848f04a2eb51b063295c51.png)

Using the "Select" button, choose the path to store the managed text documents (should be `Resources/Naninovel/Text` by default) and press "Generate" to create the documents.

You can also create a custom managed text document using `Create -> Naninovel -> Managed Text` asset context menu.

Each line in a managed text document is an entry in the following format: *Path*: *Value*, where *Path* is the path to the text variable and *Value* is the value of that variable. For example, here is the default contents of the "DefaultUI" document, which contains records for the built-in UI:

![Managed Text Document](https://i.gyazo.com/ce57c700b77818f87aabb722f2f42b78.png)

You can edit the values and the changes will be applied on the next run.

Enabling the `Delete Unused` option will remove records in the managed text documents that are not directly referenced either via `ManagedTextProvider` components or via `ManagedText` attributes in the source code (more on that below).

::: tip
To insert a line break in a managed text value, use the `<br>` tag, which is supported by TMPro text out of the box.
:::

## Managed Text Provider

It's possible to bind an arbitrary Unity game object to a managed text record without any scripting via the `ManagedTextProvider` component; add the component to a game object, specify `Category` (the document name), `Key` (the record name inside the document) and use the `OnValueChanged` event to bind the value to a game object property.

Below is an example of binding a managed text record stored in the "MyCustomDocument" document with key "MyCustomText" to a Unity `Text` component.

![](https://i.gyazo.com/f47a997052674341aa3133deeea1f1cf.png)

When a `ManagedTextProvider` component is used in a custom UI, text printer, or choice handler, corresponding records will be automatically generated when using the managed text tool (given the resources are assigned in the configuration menu); for other cases you'll have to add the records manually.

![](https://i.gyazo.com/cc2ad398d1ad716cca437913553eb09c.png)

## Managed Text Variables

It's also possible to bind managed text records to variables in the source code. To do this, add the `ManagedText` attribute to a static string field. The field's value will be overwritten with the value specified in the managed text document on engine initialization.

Below is an example of using a managed text variable to localize a text label in a C# script.

```csharp
using Naninovel;
using UnityEngine.UI;

// Inheriting from Unity's Text component so we can use it as one.
public class CustomLabel : Text
{
    // Value of the "CustomLabel.LabelText" managed text record will be assigned
    // to the below variable on engine init and updated on locale changes.
    [ManagedText("foo")] // "foo" is the document name for the record.
    public static string LabelText = "bar"; // "bar" is the default value.

    protected override void Awake ()
    {
        base.Awake();

        text = LabelText; // Assign current record value to the label.

        var l10n = Engine.GetService<ILocalizationManager>();
        // Update the label when the user changes the locale at runtime.
        l10n.OnLocaleChanged += _ => text = LabelText;
    }
}
```

## Script Text

You can reference managed text values directly from scenario scripts. This is useful when you want script expressions to use localizable text.

Create a managed text document named `Script` and add records using keys with `T_` or `t_` prefix. Given the following records in the `Script` managed text document:

```
T_Greeting1: Hey!
T_Greeting2: Hello!
T_Greeting3: Hi!
```

—you can reference the values with:

```nani
@print {Random(T_Greeting1,T_Greeting2,T_Greeting3)}
```

The `Script` managed text document can be localized in the same way as other documents; when the user selects another locale, the text will automatically be referenced from the corresponding localized document.

## Localization

Managed text localization follows a similar workflow to scenario scripts:

1. Generate (create/edit) the required managed text documents in a `Resources/Naninovel/Text` folder.
2. Run the localization utility in a locale folder (`Resources/Naninovel/Localization/{Locale}`, where `{Locale}` is the target locale tag).
3. Localization documents for the source managed text documents will appear in the corresponding locale folder. Use them to add or edit translations.

To update the managed text documents and their corresponding localization counterparts, first run the generate managed text utility in the `Resources/Naninovel/Text` folder, and then the localization utility in `Resources/Naninovel/Localization/{Locale}`. Both utilities will attempt to preserve any existing modifications (managed text records and their translations) by default, so you won't have to re-write everything on each update.

See [Localization](/guide/localization) for more info on how to use the localization utility.

::: tip EXAMPLE
Find an example localization setup (including managed text) in the [localization sample](/guide/samples#localization). Use it as a reference if you have issues setting up localization in your own project.
:::

## Custom Documents

You can create any number of managed text documents for your custom needs and use them in C# while the engine is initialized. These custom documents function the same way as the built-in types discussed above: you can access them in both C# and scenario scripts, retrieve records via the `ManagedTextProvider` component, auto-generate localization documents, and more.

Create a new custom managed text document via the `Create -> Naninovel -> Managed Text` asset context menu under a `Resources/Naninovel/Text` folder (or expose it via the resource provider of your choice). The document will then be accessible via the `ITextManager` engine service in C#. Below is an example of accessing a record from a custom document named `Custom` with the content `Foo: Bar`.

```cs
var manager = Engine.GetService<ITextManager>();
// The document must be loaded before it can be accessed;
// typically done once during initialization of your custom system.
await manager.DocumentLoader.Load("Custom");
var document = manager.GetDocument("Custom");
var record = document.Get("Foo");
Debug.Log($"Key: {record.Key} Value: {record.Value}");
```
