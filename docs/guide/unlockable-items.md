# Unlockable Items

The unlockables feature allows managing items, which have a persistent state of being either locked or unlocked. You can use it in a variety of ways, for example to represent slots in a CG or movie gallery, achievements, tips and other systems where some entity should be able to become unlocked or activated when player satisfies a condition.

Each unlockable item is represented by a string identifier and boolean value, indicating whether the item is unlocked. In naninovel scripts, use [@unlock] and [@lock] commands to respectively unlock and lock an item with a specific ID, eg:

```nani
@unlock SecretAchievement
```
— will unlock item `SecretAchievement` and
```nani
@lock SecretAchievement
```
— will lock it back.

The unlockable state of the items is stored under [global scope](/guide/state-management.md#global-state) and doesn't depend on local game sessions; eg, if you unlock some item, it won't become locked again when player starts a new game or loads another saved game.

To bind an actual [GameObject](https://docs.unity3d.com/Manual/class-GameObject.html) with the unlockable item, use `UnlockableTrigger` component:

![](https://i.gyazo.com/9e92d5296e5f07d68ce6122ccb1da34a.png)

Set the item's ID to the `Unlockable Item Id` field and bind a command that should be performed when the item is unlocked. The illustration above, for example, makes the GameObject active when `SecretAchievement` is unlocked and vice versa.

In C# you can access the unlockable items using `UnlockableManager` [engine service](/guide/engine-services.md).

::: example
Find example on using the unlockable system to implement music gallery without any C# scripting in the [UI example project](https://github.com/Naninovel/CustomUIExample) on GitHub. Other types of unlockable galleries (movies, achievements, etc.) can be implemented in a similar fashion.
:::

## Unlockable Resources

Under the unlockables configuration menu (`Naninovel -> Configuration -> Unlockables`), you can find resources manager, that allows storing arbitrary assets to be used with the unlockables feature.

![](https://i.gyazo.com/17fa198861ed72de3ab1f9dc6b02b3d8.png)

The unlockable resources are used by the built-in unlockable systems, such as [CG Gallery](/guide/unlockable-items.md#cg-gallery). You can also utilize the manager for you own custom systems.

## CG Gallery

Using the CG gallery feature, you can specify texture resources (images), that can be unlocked throughout the game and then browsed via the `ICGGalleryUI` UI accessible from the title menu.

[!!wkZeszk6gm0]

By default, all the unlockable texture resources with `CG` prefix added via [unlockable resources manager](/guide/unlockable-items.md#unlockable-resources) and [background](/guide/backgrounds.md) sprite resources of the `MainBackground` actor with the same prefix will be considered unlockable CG items.

To add an unlockable CG item to the gallery, you can either use one of the existing main background resources, by prepending `CG` to its path:

![](https://i.gyazo.com/83a6eff3f91c05027ba1fbc5098e03c2.png)

— or add a "standalone" texture using the unlockable resources manager, accessible with `Naninovel -> Resources -> Unlockables`:

![](https://i.gyazo.com/236bddfd0a02c18b94153cfb7189a877.png)

To group multiple CGs into one gallery slot (eg, variations of a single scene), add `_` followed by a number to the unlockable ID. For instance, if you add CGs with the following IDs:

- `CG/EpicScene_1`
- `CG/EpicScene_2`
- `CG/EpicScene_3`

— they all will be grouped under a single CG slot and shown in sequence with crossfade effect when player clicks the screen.

::: note
CG slots in the UI grid are arranged left to right, top to bottom and ordered by the unlockable path name. Position in the resources editor menu is ignored. In case you want to arrange the slots in a specific order, name the resources accordingly, eg:
- `CG/01`
- `CG/02_1`
- `CG/02_2`
- ...
- `CG/35`
- `CG/36`
:::

To unlock and lock CG items use [@unlock] and [@lock] commands respectively. For example, to unlock `CG/Map` item added in the illustrations above, use the following script command:

```nani
@unlock CG/Map
```

In case you'll use both unlockable and background resources to add the CG items, the resources specified in the unlockables manager will be displayed in the CG gallery first. You can change this behavior as well as the actual sources from where the available CG resources are retrieved using `Cg Sources` property of `CG Gallery Panel` script, attached to the root of UI prefab representing the CG Gallery (built-in implementation stored at `Naninovel/Prefabs/DefaultUI/ICGGalleryUI.CGGalleryPanel`).

![](https://i.gyazo.com/c62c69eea8d6b1147aacb178dcaa9347.png)

When there is at least one CG item added to any of the sources (no matter the unlocked state), `CG GALLERY` button will appear in the title menu allowing to access the CG Gallery browser.

You can modify or completely replace the built-in `ICGGalleryUI` implementation using the [UI customization feature](/guide/user-interface.md#ui-customization).

## Tips

Unlockable tips system allows to specify a set of text records using localizable [managed text](/guide/managed-text.md) documents; the records can then be unlocked throughout the game and be browsed via the `ITipsUI` UI accessible from the title menu and text printer control panels.

The system can be used to build an in-game vocabulary/encyclopedia or achievements tracker.

[!!CRZuS1u_J4c]

:::note
Video above is demonstrating inline managed text document format, which is not the default for tips in modern Naninovel versions; see below on the current default (multiline) format and how to switch to inline.
:::

To define the available tips, create a `Tips.txt` text document inside the [managed text](/guide/managed-text.md) resources directory (`Resources/Naninovel/Text` by default). Format is similar to script localization documents (multiline): lines starting with `#` stores tip ID (key); lines below correspond to the tip record value, which can contain title (required), category and description (optional) seperated by `|`, eg:

```
# Tip1ID
Tip 1 Title | Tip 1 Category | Tip 1 Description
# Tip2ID
Tip 2 Title || Tip 2 Description
# Tip3ID
Tip 3 Title 
# Tip4ID
Tip 4 Title | Tip 4 Category |
```

When tip value is too long, you can break it into multiple lines for readability:

```
# Tip1
Title | Category |
Long description line 1.<br>
Long description line 2.<br>

# Tip2
Title | Category |
Long description line 1.<br>
...
```

In case you prefer inline format, remove `Tips` from `Multiline Categories` list in managed text configuration; the tips can then be authored similar to other managed text documents:

```
Tip1ID: Title
Tip2ID: Title | Category | Description
Tip3ID: Title || Description
```

Apart from `<br>` tag, you can use other rich text tags supported by the text rendering system of your choice (TMPro is used in built-in tips UI).

When there is at least one tip record in the `Tips.txt` managed text document, "TIPS" button will appear in the main menu and control panels, leading to the tips browser.

To unlock a tip record, use [@unlock] and [@lock] to lock the record back followed by the tip ID (should always be preceded by `Tips/` prefix) in the naninovel scripts. Eg, to unlock a `Tip1ID` tip record use:
```nani
@unlock Tips/Tip1ID
```

### Tips in Printers

It's possible to automatically unlock tips when associated text is printed via a [TMPro printer](/guide/text-printers.md#textmesh-pro); additionally, when such text is clicked by player `ITipsUI` UI will be automatically shown with the associated tip record selected.

[!3c0d761576c351066022be32b8595e6d]

To associate printed text with a tip, use `<tip>` tags, eg:

```nani
Lorem ipsum <tip="VN">visual novel</tip> pharetra nec.
```
— given a tip record with "VN" ID exist, the associated "visual novel" text (when printed by a TMPro printer) will be underlined, the tip record unlocked and when player clicks the text, tips UI will open and show the related record.

To change printer-related tips handling behaviour (eg, modifying formatting of the associated text or adding custom behaviour when the tips are clicked) use the properties under "Tips" section found in `Revealable TMPro Text` component attached to the text game object of all the built-in TMPro text printer prefabs; see the [guide](/guide/text-printers.md#adding-custom-printers) on how to create custom printers to tweak them.

![](https://i.gyazo.com/ec20da3f00b507428540d60f354bdeed.png)

Be aware, that when a custom handler is assigned to `On Tip Clicked` event, default behaviour (showing tips UI) will be disabled.
