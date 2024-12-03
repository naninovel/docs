# Samples

A collection of example projects are provided to help you get started with common development scenarios. Read on for instructions to access the samples and brief descriptions of each.

## Accessing Samples

The samples are hosted on a private GitHub repository: [github.com/naninovel/samples](https://github.com/naninovel/samples/tree/stable). To access the repository, [register your Naninovel license](https://naninovel.com/register) and follow the dashboard instructions to assign a GitHub user. Once you have access, either [clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) or [download](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) the repository.

Open the repository directory with the Unity editor. Notice that Naninovel is referenced as a Git package in the package manager, so ensure a Git client is installed on your machine. Without it, Unity won't be able to pull the packages; refer to the UPM guide for [more info on Git packages](https://docs.unity3d.com/Manual/upm-ui-giturl.html).

To use the referenced Naninovel package, you must be authenticated as the GitHub user assigned in the account dashboard. Refer to the Unity guide for [more info on authentication](https://docs.unity3d.com/Manual/upm-config-https-git.html). Alternatively, you can remove the Git package reference and install Naninovel from the Asset Store instead.

## Addressable

This sample shows how to manually register Naninovel resources with [addressable provider](/guide/resource-providers.html#addressable) (without using resource editor menus) and serve the assets from a remote host.

Notice, that while most of the resources in the sample project are not assigned in resource manager menus:

![](https://i.gyazo.com/8c1b37362bf58d26f18e4e61ffe2957c.png)

— they are still accessible in Naninovel scripts in the same way:

```nani
@back Snow
```

That works, because the assets are assigned a Naninovel resource address and label:

![](https://i.gyazo.com/81e59da9ba85c90f3d59b84573f7facf.png)

::: info NOTE
`Allow Addressable In Editor` has to be enabled in the resource provider configuration in order for the manually registered resources to work in Unity editor.
:::

## Perspective Scene

This sample shows a generic background filled with multiple animated environment sprites, camera rendering in perspective mode and bokeh (depth of field) effect. The background is stored at `Content/Backgrounds/Perspective` directory.

![](https://i.gyazo.com/610d2cafe5fbe42aba7adb9ac71720d1.mp4)

## Compiler Localization

To activate the compiler localization in the sample project, assign `Profiles/Naninovel/CompilerRU` asset to the `Compiler Localization` field in the scripts configuration. Then restart the Unity editor and VS Code extension. Now you can open the project with VS Code and run `Compiler Localization` sample scenario.

![](https://i.gyazo.com/fde9998597ffedb8a025401bb2f71ce9.png)

## E2E

The `E2E Tests` sample shows how to set up an [automated end-to-end tests](/guide/automated-testing) suite and use most of the available APIs.

The test scripts are stored under `Scripts/E2E` folder. Notice the `.asmdef` file placed in the folder: it's required to compile the test sources under Unity-specific test environment. Also note the `testables` entry in the `Packages/manifest.json` file, which exposes the tests assembly to the Unity's test runner.

![](https://i.gyazo.com/92e7eaf5725f098d6d12c83a2b7eb219.png)

## Generic Actor

Find `Content/Backgrounds/Beach`, `Content/Backgrounds/Perspective` [generic backgrounds](/guide/backgrounds#generic-backgrounds) and `Content/Characters/Kohaku/K3D` [generic character](/guide/characters#generic-characters) showing how to set up and use the generic actor implementation with 3D models and animations authored with Unity's Animator.

![](https://i.gyazo.com/009900b179f3130f45824e22094e7884.gif)

## Input Rebind

Documentation: https://naninovel.com/guide/input-processing.html#input-system

An example of input rebinding UI which allows player to change default controls can be found at `Content/UI/InputRebind` folder. It's based on the "Rebind UI" sample bundled with the input system package; find more info in the [Unity documentation](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.1/manual/ActionBindings.html#interactive-rebinding).

![](https://i.gyazo.com/eba8d2ce2dabfbe41cc0df238ad8ad99.png)

## Integration

An example project with Naninovel used as both drop-in dialogue for a 3D adventure game and a switchable standalone novel mode.

![](https://i.gyazo.com/b1b6042db4a91b3a8cee74236b33c17c.mp4)

All the project-specific (example) scripts are stored at `Scripts/Runtime/Integration` folder.

Naninovel is initialized manually (auto initialization is disabled in the engine configuration menu) via `SetupGame.cs` script attached to `SetupGame` game object located on `Integration` scene.

`DialogueTrigger.cs` script used as component on triggers perform switch to dialogue mode when player is hitting the trigger colliders.

`SwitchToNovelMode.cs` custom command is used to switch to novel mode from both C# and naninovel scripts.

`SwitchToAdventureMode.cs` custom command is used to switch to adventure from novel mode.

## Inventory

While an inventory system is out of scope for visual novels, we had a lot of requests and questions on how to integrate one with Naninovel. The inventory sample serves as an example for creating and integrating an inventory extension, which you can set up on top of Naninovel installation without modifying the engine source code.

::: info NOTE
The inventory is not a standalone product and/or part of Naninovel. Use it to learn how to extend and customize the engine, but don't expect it to be production-ready solution for inventory systems. If you're looking for one, [check the Asset Store](https://assetstore.unity.com/?q=inventory) or create a custom one from scratch.
:::

Example project shows how to make custom inventory UI with grid layout, pagination and drag-drop window, add custom engine service and related configuration menu, add input bindings, use state outsourcing, author custom scenario commands and expression functions.

![](https://i.gyazo.com/86c577f007daf4ec5d79c0e91db7bc10.mp4)

To create a pre-made inventory UI from template, use `Create -> Naninovel -> Inventory -> Inventory UI` asset context menu. Then add the prefab to the Naninovel UI resources via `Naninovel -> Resources -> UI` editor menu. Once added, the UI can be shown/hidden like all the other UIs with [@showUI] and [@hideUI] commands.

The Inventory UI component has `Capacity` property, where you can change number of slots in the inventory. Slot grid is configured (slot number and layout, slots per page, etc) via `Content/InventoryGrid` game object. Window drag-drop behavior can be configured (disabled) via `Drag Drop` component attached to `Content` game object.

Inventory item prefabs can be created with `Create -> Naninovel -> Inventory -> Inventory Item` asset context menu. The item prefabs will then need to be assigned as inventory resources via `Naninovel -> Resources -> Inventory` editor menu.

![](https://i.gyazo.com/6062f8a433a47306f582a849c7bbf57e.png)

In case you have a lot of items and it's inconvenient to assign them via editor menu, it's possible to just drop them at `Resources/Naninovel/Inventory` folder and they'll automatically be exposed to the engine. You can additionally organize them with sub-folders, if you wish; in this case use forward slashes (`/`) when referencing them in naninovel scripts. Eg, item stored as `Resources/Naninovel/Inventory/Armor/FullPlate.prefab` can be referenced in scripts as `Armor/FullPlate`.

It's also possible to use [addressable asset system](/guide/resource-providers#addressable) to manually expose the resources. To expose an asset, assign address equal to the path you'd use to expose it via the method described above, except omit the "Resources/" part. Eg, to expose a "FullPlate.prefab" item, assign the prefab asset following address: `Naninovel/Inventory/FullPlate`. Be aware, that addressable provider is not used in editor by default; you can allow it by enabling `Enable Addressable In Editor` property in resource provider configuration menu.

Each item has a `Stack Count Limit` property to limit how much items of this type can be stacked in a single inventory slot and a `On Item Used` Unity event, which is invoked when the item is used (either via `@useItem` command or when user clicks on the item in the inventory). Below is an example on how you can set up the event with `Play Script` component to remove the item once it used, spawn a glitch special effect and print a text message.

![](https://i.gyazo.com/010a9ba35db607ba46d78eda3513f678.png)

You can add items to the inventory with `@addItem` command and remove with `@removeItem` (or `@removeItemAt`, `@removeAllItems`). Item IDs are equal to the item prefab names. Inventory slot IDs are equal to the grid slot indexes (eg, first slot is 0, second is 1, etc).

`itemExist()` and `itemCount()` custom [expression functions](/guide/script-expressions#expression-functions) to check wither an items exist in inventory and number of existing items are also available for convenience.

Below is a script from the example project:

```nani
# Start

Select an action.[< skip!]

@choice "Pick up sword" if:!itemExist("Sword")
    @addItem Sword
@choice "Pick up armor" if:!itemExist("Armor")
    @addItem Armor
@choice "Adventure awaits, venture forth!"
@stop

# Adventure

@if itemExist("Sword")
	@set monstersSlayed={ itemExist("Armor") ? random(3,5) : 2 }
	@addItem Food amount:{monstersSlayed}
	You've encountered and slayed {monstersSlayed} monsters with your sword.
	@goto .Start
@else
	But you don't have a weapon! You've been beaten by the monsters.
	@goto .Start
```

## Live2D

The sample demonstrates using Live2D characters with Naninovel. Find them at `Content/Characters/Hiyori` and `Content/Characters/Senko` directories.

![](https://i.gyazo.com/b81df72fc7afaed569520496cbee09f0.mp4)

## Localization

The generated localization documents are stored at `Profiles/Naninovel/Resources/Naninovel/Localization` directory.

The generated sheets are stored at `Sheets` directory under the samples project root.

## Map

The sample shows how you can implement an interactive map without any C# scripting.

![](https://i.gyazo.com/f93f0e73389934bf25226f4000e437eb.gif)

The map is implemented as a custom UI, which is stored at `Content/UI/Map`. The locations are regular Unity buttons placed in the UI.

![](https://i.gyazo.com/f421eaf666c9d84b04d23a72d1259f47.png)

The button's click and hover events are handled with Naninovel's [Play Script](https://naninovel.com/guide/user-interface.html#play-script-on-unity-event) component.

![](https://i.gyazo.com/a64ee9beee378c687d0d8093334f4ef7.png)

The availability of the locations is controlled with [Variable Trigger](https://naninovel.com/guide/custom-variables.html#variable-triggers) components attached to the buttons.

## RTL

The RTL printer is stored at `Content/Printers/RTL`.

![](https://i.gyazo.com/7b582e4ae76c6fd62170e00dd3874ff7.png)

## Actor Shader

The example shows how to create and use texture shader for adding custom transition effects and sprite shader with lighting and self-illumination support; the latter is used to simulate time of day for a background actor.

![](https://i.gyazo.com/a9d7fb29d5e076245ac515d673cc155e.mp4)

The custom shaders are stored at `Scripts/Shaders` directory.

Background texture has self-illumination mask stored in the alpha layer, which is used by the custom shader to evaluate which areas should emit light, while ignoring the global light.

Time of day is controlled with `Scripts/Runtime/Shader/TimeOfDay.cs`, which allows configuring light color and emission intensity at any given point of a 24-hour day.

![](https://i.gyazo.com/b58cb70a522b9085cedb796249557df5.png)

The component API is exposed to naninovel scripts via a `Scripts/Runtime/Shader/SetHour.cs` custom command, which allows setting the hour with `@hour` command, eg:

```nani
; Set current hour to 18:00 (6:00 PM) over 3 seconds.
@hour 18 duration:3
```

## Spine

The sample demonstrates using Spine character with Naninovel. Find it a`Content/Characters/Spine` directory.

![](https://i.gyazo.com/08b04de115d97427d152cb5f37065d2d.mp4)

## UI

The sample contains following examples of new custom and modified built-in UIs:

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

— all the sample UIs are stored at `Content/UI`.

## Layered Actor

Find the layered character at `Content/Charecters/Miho` directory and layered background set up in camera rendering mode at `Content/Backgrounds/Particles` directory.

## Video Actor

Video backgrounds are stored `Content/Backgrounds/Video` directory, while a video actor can be found at `Content/Characters/Ball` directory.

## Visual Scripting

[Visual scripting](https://docs.unity3d.com/Packages/com.unity.visualscripting@latest) (previously known as Bolt) is a built-in package bundled by default with Unity 2021 and newer version. It enables you to create logic for games or applications with unit-based graphs that both programmers and non-programmers can use without writing code.

![](https://i.gyazo.com/ab7c9d92b32810b030aba24b4bd95405.jpg)

First, make sure you're using a compatible Unity version (2021.2 or newer) and `Visual Scripting` package is installed in the package manager.

![](https://i.gyazo.com/885ebb9808b369c30dfcaab19b0cee2f.png)

Add `Elringus.Naninovel.Runtime` library to the `Node Library` list found in "Visual Scripting" project settings menu. This is required to expose engine types and APIs to the visual scripting graphs.

![](https://i.gyazo.com/38afd2ea477fcf0921114e3847de6c85.png)

The Visual Scripting doesn't automatically expose all the available types in the libraries, so we additionally need to add the required Naninovel types to the `Type Options` list found in the same settings menu. In the example below we added `Engine`, `Script Player Interface` and `Script Player Extensions`, but you'll probably need more types, like the other [engine service interfaces](/guide/engine-services), configurations, etc.

![](https://i.gyazo.com/9afdeb12c0ff63ce942d04b21f737217.png)

Don't forget to regenerate units after adding the libraries and types to apply the changes.

![](https://i.gyazo.com/26c7bee4798b690c4eb362ec39746dc7.png)

When Naninovel library and types are added in the visual scripting settings, the engine APIs will become available in the fuzzy finder under graph view and can be used in the same way as the other Unity or third-party APIs. Below is an example on initializing the engine and playing a script. Make sure to disable `Initialize On Application Load` and remove `Title UI`, before trying this example.

![](https://i.gyazo.com/63a832f10fa3f5e4429e98da50ae8dd0.png)

In case you wish to send an event from a scenario script to a visual scripting graph or state machine, below is example of a [custom command](/guide/custom-commands), which will attempt to find a game object with the provided name and send an event with the specified name and arguments:

```csharp
using Naninovel;
using Unity.VisualScripting;
using UnityEngine;

[CommandAlias("bolt")]
public class BroadcastBoltEvent : Command
{
    [ParameterAlias("object"), RequiredParameter]
    public StringParameter GameObjectName;
    [ParameterAlias("name"), RequiredParameter]
    public StringParameter EventName;
    [ParameterAlias("args")]
    public StringListParameter Arguments;

    public override UniTask Execute (AsyncToken token = default)
    {
        var gameObject = GameObject.Find(GameObjectName);
        if (!gameObject)
        {
            Debug.LogError($"Failed to broadcast '{EventName}' bolt event: '{GameObjectName}' game object is not found.");
            return UniTask.CompletedTask;
        }

        CustomEvent.Trigger(gameObject, EventName, Arguments);

        return UniTask.CompletedTask;
    }
}
```

Just copy-paste the contents to a new C# script stored anywhere inside the project Assets directory and the command will automatically become available and can be used as follows:

```nani
; Send "MyEvent" to "ExampleEvent" game object with the provided args
@bolt object:ExampleEvent name:MyEvent args:ExampleMessage,Script002
```

Below is an example graph, that, when attached to a `ExampleEvent` game object, will print the message and start playing the specified script.

![](https://i.gyazo.com/e2aef7f19cf013f4d476d32aac036f54.png)

## UniTask

[UniTask](https://github.com/Cysharp/UniTask) is an open-sourced (MIT license) library providing a more efficient [Task-based asynchronous programming](https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming) implementation for Unity. You can find more details regarding the nature of optimizations and usage examples in the [article by the author of the library](https://medium.com/@neuecc/a1ff0766029).

Naninovel uses a stripped and modified version of UniTask v1, which is embedded inside the engine runtime assembly; most of the asynchronous methods return `UniTask` objects, which you can await in the same way as default `Task` objects from the "System.Threading" namespace.

In case you want to use full standalone UniTask library, install UniTask v2 from the official repository: [github.com/Cysharp/UniTask](https://github.com/Cysharp/UniTask#install-via-git-url) and specify "Naninovel.UniTask" for the Naninovel APIs when required, eg:

```csharp
using Naninovel;
using UnityEngine;

public class UniTaskCommand : Command
{
    // This method uses embedded UniTask v1.
    public override async Naninovel.UniTask Execute (AsyncToken token = default)
    {
        var message = await WaitAndReturnMessage();
        Debug.Log(message);
    }

    // This method uses standalone UniTask v2.
    private async Cysharp.Threading.Tasks.UniTask<string> WaitAndReturnMessage ()
    {
        await Cysharp.Threading.Tasks.UniTask.DelayFrame(100);
        return "Hello from UniTask v2!";
    }
}
```
