# Samples

While the Naninovel package already includes a couple of [essential samples](/guide/getting-started#demo-samples) to help you get started with Visual Novel and Dialogue Mode scenarios, an additional collection of specialized samples is provided to demonstrate common development use cases. Read on for instructions on how to access these samples and brief descriptions of each.

## Accessing Samples

The advanced samples are hosted under the [engine's monorepo](https://github.com/naninovel/engine/tree/stable/unity/samples). To access the repository, [register your Naninovel license](https://naninovel.com/register) and follow the dashboard instructions to assign a GitHub user. Once you have access, either [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) or [download](https://github.com/naninovel/engine/archive/refs/heads/stable.zip) the repository.

Unzip the downloaded repository and open the `unity/samples` directory in the Unity Editor. Naninovel is referenced as a local package in the Package Manager. The local package source points to `unity/client`, which contains the source code of the Unity extension. Other third-party packages used in the samples are embedded in the project for convenience.

![](https://i.gyazo.com/aa784d89f6a55576b745824c2f6fd537.png)

Once in the Unity Editor, open the `Assets/Scenes/Main.unity` scene and enter Play mode. You'll see the title screen of our [demo project](https://naninovel.com/demo). You can either start the demo or click the "SAMPLES" button to navigate the available samples, which are outlined below.

![](https://i.gyazo.com/f7304c828ff616f2d9a979d2452413a4.png)

## Addressable

This sample shows how to manually register Naninovel resources with the [addressable provider](/guide/resource-providers.html#addressable) (without using resource editor menus) and serve the assets from a remote host.

Notice that while most of the resources in the sample project are not assigned in the resource manager menus:

![](https://i.gyazo.com/8c1b37362bf58d26f18e4e61ffe2957c.png)

—they are still accessible in scenario scripts in the same way:

```nani
@back Snow
```

That works because the assets are assigned a Naninovel resource address and label:

![](https://i.gyazo.com/81e59da9ba85c90f3d59b84573f7facf.png)

## Perspective Scene

This sample shows a generic background filled with multiple animated environment sprites, camera rendering in perspective mode, and a bokeh (depth-of-field) effect. The background is stored in the `Content/Backgrounds/Perspective` directory.

![](https://i.gyazo.com/610d2cafe5fbe42aba7adb9ac71720d1.mp4)

## Compiler Localization

To activate compiler localization in the sample project, assign the `Profiles/Naninovel/CompilerRU` asset to the `Compiler Localization` field in the Scripts configuration. Then restart the Unity Editor and the VS Code extension. Now you can open the project with VS Code and run the `Compiler Localization` sample scenario.

![](https://i.gyazo.com/fde9998597ffedb8a025401bb2f71ce9.png)

## E2E

The `E2E Tests` sample shows how to set up an [automated end-to-end tests](/guide/automated-testing) suite and use most of the available APIs.

The test scripts are stored under the `Scripts/E2E` folder. Note the `.asmdef` file placed in the folder: it's required to compile the test sources under the Unity test environment. Also note the `testables` entry in the `Packages/manifest.json` file, which exposes the tests assembly to Unity's test runner.

![](https://i.gyazo.com/92e7eaf5725f098d6d12c83a2b7eb219.png)

## Generic Actor

Find `Content/Backgrounds/Beach`, `Content/Backgrounds/Perspective` [generic backgrounds](/guide/backgrounds#generic-backgrounds) and `Content/Characters/Kohaku/K3D` [generic character](/guide/characters#generic-characters) showing how to set up and use the generic actor implementation with 3D models and animations authored with Unity's Animator.

![](https://i.gyazo.com/009900b179f3130f45824e22094e7884.gif)

## Input Rebind

Documentation: https://naninovel.com/guide/input-processing.html#input-system

An example input-rebinding UI that allows the player to change default controls can be found in the `Content/UI/InputRebind` folder. It's based on the "Rebind UI" sample bundled with the Input System package; find more info in the [Unity documentation](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.1/manual/ActionBindings.html#interactive-rebinding).

![](https://i.gyazo.com/eba8d2ce2dabfbe41cc0df238ad8ad99.png)

## Integration

An example project demonstrating Naninovel used as both a drop-in dialogue system for a 3D adventure game and a switchable standalone novel mode.

![](https://i.gyazo.com/b1b6042db4a91b3a8cee74236b33c17c.mp4)

All project-specific example scripts are stored in the `Scripts/Runtime/Integration` folder.

Naninovel is initialized manually (auto initialization is disabled in the engine configuration menu) via the `SetupGame.cs` script attached to the `SetupGame` GameObject located in the `Integration` scene.

The `DialogueTrigger.cs` script, used as a component on triggers, switches to dialogue mode when the player hits the trigger colliders.

The `SwitchToNovelMode.cs` custom command is used to switch to novel mode from both C# and scenario scripts.

The `SwitchToAdventureMode.cs` custom command is used to switch back to adventure mode from novel mode.

## Inventory

While an inventory system is out of scope for visual novels, we received many requests and questions on how to integrate one with Naninovel. The inventory sample is an example of creating and integrating an inventory extension that you can set up on top of a Naninovel installation without modifying the engine source code.

::: info NOTE
The inventory is not a standalone product or part of Naninovel. Use it to learn how to extend and customize the engine, but don't expect it to be a production-ready solution for inventory systems. If you're looking for one, [check the Asset Store](https://assetstore.unity.com/?q=inventory) or create a custom one from scratch.
:::

This example project shows how to make a custom inventory UI with grid layout, pagination, and a drag-and-drop window; add a custom engine service and related configuration menu; add input bindings; use state outsourcing; and author custom scenario commands and expression functions.

![](https://i.gyazo.com/86c577f007daf4ec5d79c0e91db7bc10.mp4)

To create a pre-made inventory UI from a template, use the `Create -> Naninovel -> Inventory -> Inventory UI` asset context menu. Then add the prefab to the Naninovel UI resources via `Naninovel -> Resources -> UI` in the editor. Once added, the UI can be shown/hidden like all other UIs with the [@showUI] and [@hideUI] commands.

The Inventory UI component has a `Capacity` property where you can change the number of slots in the inventory. The slot grid is configured (slot number and layout, slots per page, etc.) via the `Content/InventoryGrid` GameObject. Window drag-and-drop behavior can be configured (or disabled) via the `Drag Drop` component attached to the `Content` GameObject.

Inventory item prefabs can be created with the `Create -> Naninovel -> Inventory -> Inventory Item` asset context menu. The item prefabs will then need to be assigned as inventory resources via `Naninovel -> Resources -> Inventory` in the editor.

![](https://i.gyazo.com/6062f8a433a47306f582a849c7bbf57e.png)

If you have many items and it's inconvenient to assign them via the editor menus, you can drop them in the `Resources/Naninovel/Inventory` folder and they'll automatically be exposed to the engine. You can additionally organize them with subfolders; in this case use forward slashes (`/`) when referencing them in scenario scripts. For example, an item stored as `Resources/Naninovel/Inventory/Armor/FullPlate.prefab` can be referenced in scripts as `Armor/FullPlate`.

It's also possible to use the [Addressable Asset System](/guide/resource-providers#addressable) to manually expose the resources. To expose an asset, assign an address equal to the path you'd use via the method described above, but omit the `Resources/` part. For example, to expose a `FullPlate.prefab` item, assign the prefab the address `Naninovel/Inventory/FullPlate`. Be aware that the Addressable provider is not used in the Editor by default; you can enable it by turning on the `Enable Addressable In Editor` property in the resource provider configuration menu.

Each item has a `Stack Count Limit` property to limit how many items of this type can be stacked in a single inventory slot, and an `On Item Used` Unity event, which is invoked when the item is used (either via the `@useItem` command or when the user clicks on the item in the inventory). Below is an example of how to set up the event with a `Play Script` component to remove the item once it is used, spawn a glitch special effect, and print a text message.

![](https://i.gyazo.com/010a9ba35db607ba46d78eda3513f678.png)

You can add items to the inventory using the `@addItem` command and remove them with `@removeItem` (or `@removeItemAt`, `@removeAllItems`). Item IDs are equal to the item prefab names. Inventory slot IDs are equal to the grid slot indexes (e.g., the first slot is 0, the second is 1, etc.).

`itemExist()` and `itemCount()` custom [expression functions](/guide/script-expressions#expression-functions) to check whether an item exists in inventory and to get the number of existing items are also available for convenience.

Below is a script from the example project:

```nani
# Start

Select an action.[>]

@choice "Pick up sword" lock:itemExist("Sword")
    @addItem Sword
@choice "Pick up armor" lock:itemExist("Armor")
    @addItem Armor
@choice "Adventure awaits, venture forth!"

# Adventure

@if itemExist("Sword")
	@set monstersSlayed={ itemExist("Armor") ? random(3,5) : 2 }
	@addItem Food amount:{monstersSlayed}
	You've encountered and slayed {monstersSlayed} monsters with your sword.
	@goto #Start
@else
	But you don't have a weapon! You've been beaten by the monsters.
	@goto #Start
```

## Live2D

The sample demonstrates using Live2D characters with Naninovel. Find them in the `Content/Characters/Hiyori` and `Content/Characters/Senko` directories.

![](https://i.gyazo.com/b81df72fc7afaed569520496cbee09f0.mp4)

## Localization

 - The generated localization documents are stored in the `Profiles/Naninovel/Resources/Naninovel/Localization` directory.
 - The generated sheets are stored in the `Sheets` directory under the samples project root.
 - The localization-specific font is stored in `Profiles/Naninovel/Resources/Naninovel/Fonts`.

Folders selected for localization tool:

| Folder                 | Path                                                       |
|------------------------|------------------------------------------------------------|
| Script Folder (input)  | Assets/Scripts/Scenario                                    |
| Text Folder (input)    | Assets/Profiles/Naninovel/Resources/Naninovel/Text         |
| Locale Folder (output) | Assets/Profiles/Naninovel/Resources/Naninovel/Localization |

Folders selected for spreadsheet tool:

| Folder                    | Path                                                       |
|---------------------------|------------------------------------------------------------|
| Input Scripts Folder      | Assets/Scripts/Scenario                                    |
| Input Text Folder         | Assets/Profiles/Naninovel/Resources/Naninovel/Text         |
| Input Localization Folder | Assets/Profiles/Naninovel/Resources/Naninovel/Localization |
| Output Folder             | Sheets                                                     |

![](https://i.gyazo.com/97d232751dd7e97bc828f3521f1d2066.mp4)

## Map

The sample shows how you can implement an interactive map without any C# scripting.

![](https://i.gyazo.com/f93f0e73389934bf25226f4000e437eb.gif)

The map is implemented as a custom UI stored at `Content/UI/Map`. The locations are regular Unity buttons placed in the UI.

![](https://i.gyazo.com/f421eaf666c9d84b04d23a72d1259f47.png)

The buttons' click and hover events are handled by Naninovel's [Play Script](https://naninovel.com/guide/gui.html#play-script-on-unity-event) component.

![](https://i.gyazo.com/a64ee9beee378c687d0d8093334f4ef7.png)

The availability of the locations is controlled with [Variable Events](https://naninovel.com/guide/custom-variables.html#variable-events) components attached to the buttons.

## RTL

The RTL printer is stored at `Content/Printers/RTL`.

![](https://i.gyazo.com/7b582e4ae76c6fd62170e00dd3874ff7.png)

## Actor Shader

The example shows how to create and use a texture shader for adding custom transition effects and a sprite shader with lighting and self-illumination support; the latter is used to simulate time of day for a background actor.

![](https://i.gyazo.com/a9d7fb29d5e076245ac515d673cc155e.mp4)

The custom shaders are stored in the `Scripts/Shaders` directory.

The background texture has a self-illumination mask stored in the alpha layer, which is used by the custom shader to evaluate which areas should emit light while ignoring the global light.

Time of day is controlled with `Scripts/Runtime/Shader/TimeOfDay.cs`, which allows configuring light color and emission intensity at any given point of a 24-hour day.

![](https://i.gyazo.com/b58cb70a522b9085cedb796249557df5.png)

The component API is exposed to scenario scripts via the `Scripts/Runtime/Shader/SetHour.cs` custom command, which allows setting the hour with the `@hour` command, e.g.:

```nani
; Set current hour to 18:00 (6:00 PM) over 3 seconds.
@hour 18 duration:3
```

## Spine

The sample demonstrates using Spine characters with Naninovel. Find them in the `Content/Characters/Spine` directory.

![](https://i.gyazo.com/08b04de115d97427d152cb5f37065d2d.mp4)

## UI

The sample contains the following examples of new custom and modified built-in UIs:

- Title Screen

![](https://i.gyazo.com/e76a9a339535da4e34dfcc376ebfbf41.png)

- Music Gallery

![](https://i.gyazo.com/68eabcbd6538d166c0e6eca58dd8f87b.png)

- Credits

![](https://i.gyazo.com/40bb59cf450fc129f80830aa411c3b14.png)

- Timestamps in Chat Printer

![](https://i.gyazo.com/770a7e9d9d021f8013f7ce139c80992b.png)

- Custom Choice Handler

![](https://i.gyazo.com/aab6a99a12a3e31f775a4f121cdc213a.png)

- Emoji in Revealed Messages

![](https://i.gyazo.com/e3bc62957204c0fba91e879470d0e181.png)

- Font Variants in Revealed Messages

![](https://i.gyazo.com/fd203a98efc513e6bf1020f1978d57eb.png)

- Calendar

![](https://i.gyazo.com/1666b02675d34dcd5ea4e42dae81b416.png)

All the sample UIs are stored in `Content/UI`.

## Layered Actor

Find the layered character at the `Content/Characters/Miho` directory and the layered background set up in camera rendering mode at `Content/Backgrounds/Particles`.

## Diced Actor

Find the diced character and atlas at `Content/Characters/Kohaku/Diced`.

## Video Actor

Video backgrounds are stored in the `Content/Backgrounds/Video` directory, while a video actor can be found in the `Content/Characters/Ball` directory.

## Scene Background

Find the scene background in the `Content/Backgrounds/Scene` directory.

## Transition Effects

Find a demo with all the available transition effects applied in sequence in the `Scripts/Scenario/Transitions` scenario script.

## Auto Voicing

The voice clips for EN and JA locales are stored under `Content/Audio/Voice`.

Enter the "AUTO VOICING" sample and try switching the voice language in game settings.

## Music Intro

Shows how to use the `intro` parameter of the [@bgm] command so that the intro part is played once before looping the base part of the track.

## Background Matching

A demo of the background matching feature, showing how backgrounds with different aspect ratios can be matched to the display viewport.

## Visual Scripting

[Visual Scripting](https://docs.unity3d.com/Packages/com.unity.visualscripting@latest) (previously known as Bolt) is a built-in package bundled by default with Unity 2021.2 and newer. It enables you to create logic for games or applications with unit-based graphs that both programmers and non-programmers can use without writing code.

![](https://i.gyazo.com/ab7c9d92b32810b030aba24b4bd95405.jpg)

First, make sure you're using a compatible Unity version (2021.2 or newer) and that the `Visual Scripting` package is installed in the Package Manager.

![](https://i.gyazo.com/885ebb9808b369c30dfcaab19b0cee2f.png)

Add the `Elringus.Naninovel.Runtime` library to the `Node Library` list found in the Visual Scripting project settings. This is required to expose engine types and APIs to the visual scripting graphs.

![](https://i.gyazo.com/38afd2ea477fcf0921114e3847de6c85.png)

Visual Scripting doesn't automatically expose all available types from libraries, so add the required Naninovel types to the `Type Options` list in the same settings menu. In the example below we added `Engine`, `Script Player Interface`, and `Script Player Extensions`, but you'll probably need more types, such as the other [engine service interfaces](/guide/engine-services), configurations, etc.

![](https://i.gyazo.com/9afdeb12c0ff63ce942d04b21f737217.png)

Don't forget to regenerate units after adding the libraries and types to apply the changes.

![](https://i.gyazo.com/26c7bee4798b690c4eb362ec39746dc7.png)

When the Naninovel library and types are added in the Visual Scripting settings, the engine APIs will become available in the fuzzy finder under the graph view and can be used like other Unity or third-party APIs. Below is an example of initializing the engine and playing a script. Make sure to disable `Initialize On Application Load` and remove `Title UI` before trying this example.

![](https://i.gyazo.com/63a832f10fa3f5e4429e98da50ae8dd0.png)

If you wish to send an event from a scenario script to a visual scripting graph or state machine, below is an example of a [custom command](/guide/custom-commands) that will attempt to find a GameObject with the provided name and send an event with the specified name and arguments:

```csharp
[Serializable, Alias("bolt")]
public class BroadcastBoltEvent : Command
{
    [Alias("object"), RequiredParameter]
    public StringParameter GameObjectName;
    [Alias("name"), RequiredParameter]
    public StringParameter EventName;
    [Alias("args")]
    public StringListParameter Arguments;

    public override Awaitable Execute (ExecutionContext ctx)
    {
        var gameObject = GameObject.Find(GameObjectName);
        if (!gameObject)
        {
            Debug.LogError($"Failed to broadcast '{EventName}' bolt event: '{GameObjectName}' game object is not found.");
            return Async.Completed;
        }

        CustomEvent.Trigger(gameObject, EventName, Arguments);

        return Async.Completed;
    }
}
```

Just copy-paste the contents to a new C# script stored anywhere inside the project's Assets directory and the command will automatically become available and can be used as follows:

```nani
; Send "MyEvent" to "ExampleEvent" game object with the provided args
@bolt object:ExampleEvent name:MyEvent args:ExampleMessage,Script002
```

Below is an example graph that, when attached to an `ExampleEvent` GameObject, will print the message and start playing the specified script.

![](https://i.gyazo.com/e2aef7f19cf013f4d476d32aac036f54.png)
