# Unlockable Items

The unlockables feature allows to manage items, which have a persistent state of being either locked or unlocked. You can use it in a variety of ways, for example to represent slots in a CG or movie gallery, achievements, tips and other systems where some entity should be able to become unlocked or activated when player satisfies a condition.

Each unlockable item is represented by a string identifier and boolean value, indicating whether the item is unlocked. In novel scripts, use [`@unlock`](/api/#unlock) and [`@lock`](/api/#lock) actions to respectively unlock and lock an item with a specific ID, eg:

```
@unlock SecretAchievement
```
— will unlock item `SecretAchievement` and
```
@lock SecretAchievement
```
— will lock it back.

The unlockable state of the items is stored under [global scope](/guide/state-management.md#global-state) and doesn't depend on local game sessions; eg, if you unlock some item, it won't become locked again when player starts a new game or loads another saved game.

To bind an actual [GameObject](https://docs.unity3d.com/Manual/class-GameObject.html) with the unlockable item, use `UnlockableTrigger` component:

![](https://i.gyazo.com/9e92d5296e5f07d68ce6122ccb1da34a.png)

Set the item's ID to the `Unlockable Item Id` field and bind an action that should be performed when the items is unlocked. The illustration above, for example, makes the GameObject active when `SecretAchievement` is unlocked and vice versa.

In C# you can access the unlockable items using `UnlockableManager` [engine service](/guide/engine-services.md).

## Unlockable Resources

Under the unlockables configuration menu (`Naninovel -> Configuration -> Unlockables`), you can find resources manager, that allows to store arbitrary assets to be used with the unlockables feature.

![](https://i.gyazo.com/17fa198861ed72de3ab1f9dc6b02b3d8.png)

The unlockable resources are used by the built-in unlockable systems, such as [CG Gallery](/guide/unlockable-items.md#cg-gallery). You can also utilize the manager for you own custom systems.

## CG Gallery

Using the CG gallery feature, you can specify texture resources (images), that can be unlocked throughout the game and then browsed via the `ICGGalleryUI` UI accessible from the title menu.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/wkZeszk6gm0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

By default, all the unlockable texture resources with `CG` prefix added via [unlockable resources manager](/guide/unlockable-items.md#unlockable-resources) and [background](/guide/backgrounds.md) sprite resources of the `MainBackground` actor with the same prefix will be considered unlockable CG items.

To add an unlockable CG item to the gallery, you can either use one of the existing main background resources, by prepending `CG` to its path:

![](https://i.gyazo.com/83a6eff3f91c05027ba1fbc5098e03c2.png)

— or add a "standalone" texture using the unlockable resources manager, accessible with `Naninovel -> Resources -> Unlockables`:

![](https://i.gyazo.com/236bddfd0a02c18b94153cfb7189a877.png)

No matter which way you'll choose, you can then unlock and lock the items using [`@unlock`](/api/#unlock) and [`@lock`](/api/#lock) actions respectively.

For example, to unlock the `CG/Map` item added in the illustrations above, use the following novel action:

```
@unlock CG/Map
```

In case you'll use both unlockable and background resources to add the CG items, the resources specified in the unlockables manager will be displayed in the CG gallery first. You can change this behavior as well as the actual sources from where the available CG resources are retrieved using `Cg Sources` property of `CG Gallery Panel` script, attached to the root of UI prefab representing the CG Gallery (built-in implementation stored at `Naninovel/Resources/Naninovel/DefaultUI/ICGGalleryUI.CGGalleryPanel`).

![](https://i.gyazo.com/c62c69eea8d6b1147aacb178dcaa9347.png)

When there is at least one CG item added to any of the sources (no matter the unlocked state), `CG GALLERY` button will appear in the title menu allowing to access the CG Gallery browser.

You can modify or completely replace the built-in `ICGGalleryUI` implementation using the [UI customization feature](/guide/ui-customization.md).

## Tips

Unlockable tips system allows to specify a set of text records using localizable [managed text](/guide/managed-text.md) documents; the records can then be unlocked throughout the game and be browsed via the `ITipsUI` UI accessible from the title menu and text printer control panels. 

The system can be used to build an in-game vocabulary/encyclopedia or achievements tracker.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/CRZuS1u_J4c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

To define the available tips, create a `Tips.txt` text document inside the [managed text](/guide/managed-text.md) resources directory (`Resources/Text` by default). Each line identifies a single tip record. The line should begin with tip ID followed by colon; then the tip's title, category (optional) and description should be specified, all separated by vertical lines (`|`), eg:

```
Tip1ID: Tip 1 Title | Tip 1 Category | Tip 1 Description
Tip2ID: Tip 2 Title || Tip 2 Description
Tip3ID: Tip 3 Title 
Tip4ID: Tip 4 Title | Tip 4 Category |
...
```

You can use [rich text tags](https://docs.unity3d.com/Manual/StyledText.html) and insert line breaks (`\n`) inside the description section of the tip records.

When there is at least one tip record in the `Tips.txt` managed text document, "TIPS" button will appear in the main menu and control panels, leading to the tips browser.

To unlock a tip record, use [`@unlock`](/api/#unlock) and [`@lock`](/api/#lock) to lock the record back followed by the tip ID (should always be preceded by `Tips/` prefix) in the novel scripts. Eg, to unlock a `Tip1ID` tip record use:
```
@unlock Tips/Tip1ID
```