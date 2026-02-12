# Getting Started

## Prerequisites

Naninovel is an extension for the [Unity game engine](https://unity.com), so it is strongly recommended to at least [learn the basics](https://learn.unity.com) of using Unity before starting with Naninovel.

If you do not plan to implement any custom gameplay outside Naninovel, you can ignore the scene-related information, as Naninovel will handle it automatically.

## Video Guide

If you prefer video tutorials, here is one covering this Getting Started guide.

![](https://www.youtube.com/watch?v=N1_CwR5xblU)

## Create Unity Project

When creating a project, we recommend selecting either the Universal 2D or Universal 3D templates, which are based on the **Universal Render Pipeline** (URP). The legacy built-in render pipeline (BiRP) will also work, but it is no longer actively maintained by Unity and is expected to be deprecated. The High Definition Render Pipeline (HDRP) is not recommended — it will generally work, but some rendering features may not be compatible out of the box.

Choosing 2D or 3D depends on the style of game you're building. For most standard visual novels, we recommend selecting 2D, so images will be imported as sprite assets by default and you won't have to manually adjust the import settings. You can change the editor behavior mode later in the [project settings](https://docs.unity3d.com/Manual/2DAnd3DModeSettings.html).

![](https://i.gyazo.com/b1b89ad23fbeffff3d03cf7dcf25cab1.png)

After creating a new project, Unity automatically includes a sample scene with a "Main Camera" and, depending on the template, various other game objects.

![?width=271](https://i.gyazo.com/5bd6471a53ffbf106099373395484ef6.png)

Naninovel is scene-independent; therefore, we recommend removing these objects from the scene to prevent unnecessary performance overhead or conflicts with Naninovel systems. You can also remove the sample scene itself, though it is recommended to keep at least one scene in the project for certain editor features to function correctly.

### Optimizing Editor

This step is optional but recommended, as it can significantly improve Unity editor startup, reload, and play mode entry times.

First, go to `Edit -> Project Settings -> Editor` and select `Do not reload Domain or Scene` under the "Enter Play Mode Settings" option to reduce the time it takes to enter play mode.

![](https://i.gyazo.com/bf1a91f7ad04f0823e72c9feb4f67f0a.png)

Now, open and inspect the `manifest.json` file in the "Packages" folder located under the Unity project root. This file lists all installed packages and modules. Depending on the template, Unity includes many modules by default, most of which you will likely never need, while each additional module can increase editor startup and code reload times. Below are the modules required by Naninovel — consider removing any other entries if they are not needed:

::: code-group
```json [Packages/manifest.json]
{
    "dependencies": {
        "com.unity.modules.audio": "1.0.0",
        "com.unity.modules.video": "1.0.0",
        "com.unity.modules.imgui": "1.0.0",
        "com.unity.modules.animation": "1.0.0",
        "com.unity.modules.particlesystem": "1.0.0",
        "com.unity.modules.imageconversion": "1.0.0",
        "com.unity.render-pipelines.universal": "17.3.0",
        "com.unity.inputsystem": "1.17.0",
        "com.unity.ugui": "2.0.0"
    }
}
```
:::

::: info NOTE
Disabling domain reload and modifying the `manifest.json` file is **not required to use Naninovel**; it is only intended to improve Unity Editor performance. If you are unsure about the effects of these changes or which modules you will need for your game — skip these steps.
:::

### VCS Setup

If you're using a version control system, such as Git, consider ignoring the following paths to prevent unnecessary churn:

::: code-group
```asm [.gitignore]
# Auto-generated Unity assets of transient nature.
/Assets/NaninovelData/Transient*
# Transient artifacts of the external tools.
/Assets/NaninovelData/.nani/Transient*
```
:::

Note that `Assets/NaninovelData` is an auto-generated folder. After it is initially created, you can rename or move it to any folder under `Assets` (Naninovel will still be able to locate it). If you do so, the ignore paths above must be updated accordingly.

::: tip EXAMPLE
See the [.gitignore](https://github.com/naninovel/engine/blob/main/unity/samples/.gitignore) in our [samples project](/guide/samples) for an example Git ignore profile. In that example, the `NaninovelData` folder is renamed to `Naninovel` and moved under `Assets/Profiles` for better organization — you can move the folder similarly in your own project.
:::

## Install Naninovel

### Release Streams

Naninovel is distributed across 3 release streams: **preview**, **stable** and **final**.

Preview is the bleeding edge: it's updated most often and has all the latest features. However, it's subject to occasional breaking changes and bugs. Pick this stream when you're early in development or need a specific feature not available in the other releases.

Stable is the middle-ground: it only receives bug fixes, doesn't have the latest features, but is also free from any breaking changes. It's recommended in most cases.

Final, while being the most tested and stable one, is also the most outdated and is not covered by the [tech support](/support/#naninovel-support). Only stay on the final release in case the project is already released and it's not possible to upgrade.

![](https://i.gyazo.com/2462242c14c96a0eae9ca99212c340c4.png)

Stable stream is published on both GitHub and Unity's Asset Store (though not as often as on GitHub), while preview and final streams are only available on GitHub.

### Install from Asset Store

The simplest way to install Naninovel is through the "My Assets" tab of the Unity Package Manager (UPM). Open the Package Manager window, find Naninovel, and click Install.

![?width=674](https://i.gyazo.com/3e056854efc95a4adfb485557497e134.png)

Find more information on using the UPM in the [Unity documentation](https://docs.unity3d.com/Manual/upm-ui-import).

### Install from GitHub

The most recent Naninovel releases across the preview and stable streams are distributed via the Naninovel GitHub repository. To access the repository, [register your Naninovel license](https://naninovel.com/register) and follow the instructions on the dashboard to assign your GitHub user.

Once you have access to the repository, add `https://github.com/naninovel/upm.git#X.X` as a Git package via Unity's Package Manager, where `X.X` is the release version you would like to install, for example:

```
https://github.com/naninovel/upm.git#1.21
```

You can find all the available releases and their Git URIs on the [releases page](https://pre.naninovel.com/releases).

![?width=300](https://i.gyazo.com/c7c453b8b34c94809303a9dc42e5330d.png)

This installation method is especially convenient when you want to stay on the bleeding edge with the preview stream or get the patches on the stable stream as soon as they are pushed to the GitHub repository. Simply click "Update" in the Package Manager window to upgrade your installation to the latest commit.

![?width=368](https://i.gyazo.com/c1b86f88105a76e33cba961a9b71c8fb.png)

::: tip
If you encounter an error installing the package, make sure you are authenticated as the GitHub user assigned in the account dashboard. The simplest way to authenticate on Windows is by signing in with [GitHub Desktop](https://github.com/apps/desktop). On macOS and Linux, use [GCM](https://github.com/git-ecosystem/git-credential-manager/releases/latest) instead. Refer to the Unity guide for [more info](https://docs.unity3d.com/Manual/upm-config-https-git.html).
:::

### Install from Archive

Another way to install Naninovel is by downloading the package from our [download archive](https://account.naninovel.com/download). This method is useful when you need a specific final release that is no longer distributed on the Asset Store. The archive contains final releases of all legacy versions, starting from version 1.14 up to the current stable release.

Simply drop the downloaded `.unitypackage` file into the Unity Editor window and click "Import" to install the package. Find more info on installing local packages in the [Unity documentation](https://docs.unity3d.com/Manual/AssetPackagesImport.html).

## Core Concepts

Before diving into Naninovel, let's take a quick look at some of its core concepts.

An essential one, which you will constantly encounter throughout the rest of the guide, is the *actor*. An actor is an entity described by an identifier (ID), appearance, position in space (scene), and some other parameters.

An actor is an abstract entity and can't exist directly; instead, specialized versions with various additional parameters are used:


| Actor Type                           | Additional Parameters            | Description                                                                  |
|--------------------------------------|----------------------------------|------------------------------------------------------------------------------|
| [Character](/guide/characters)       | Look Direction                   | Represents a character on scene.                                             |
| [Background](/guide/backgrounds)     | None                             | Represents a background on scene; placed behind character actors by default. |
| [Text Printer](/guide/text-printers) | Text, Author ID, Reveal Progress | Gradually reveals (prints) text messages over time.                          |
| [Choice Handler](/guide/choices)     | Choices                          | Allows player to pick one of the available choices.                          |

Consider a typical visual novel setup, with a character portrayed on top of a background. In Naninovel terms, it is represented as follows:

![](https://i.gyazo.com/ede8072c68393e915286d18811a8dd4f.png)

Now, let's say you want the character "Kohaku" to display a different emotion or pose. You have several textures (images) of that character, each portraying a different state. In Naninovel, such textures are called *appearances* of an actor. To achieve this, we have to change the appearance of the character actor. Similarly, to make "MainBackground" display something else, we need to change the appearance of that background actor.

Actors and their parameters are directed via commands specified in [scenario scripts](/guide/scenario-scripting).

Another widely used concept is the [user interface](/guide/gui) (UI). UIs are used by the player to interact with actors and the rest of the game. This includes various menus (title, save-load, settings, etc.) and control panels (toggle auto-read mode, skip text, etc.). UI elements are positioned on top of actors by default.

Text printers and choice handlers are considered both actors and UI elements, meaning they share actor qualities and can be controlled via scenario scripts, while at the same time being used by players to interact with the game.

![](https://i.gyazo.com/0c8bd29820c6f2165af6adc5736713bd.png)

If you're familiar with programming, take a look at the [engine architecture](/guide/engine-architecture) to understand how it is designed from a software engineering perspective.

## First Steps

A few sample scripts are scaffolded into the `Assets/Scenario` folder, and the [Story Editor](/guide/editor) tab is automatically opened on the initial Naninovel install. Click the "Play" button at the top of the Story Editor to enter play mode.

![?width=400](https://i.gyazo.com/664efe9237b14ee091fded317a2cab4a.png)

The Unity editor will enter play mode and display the default title UI. At the same time, the `Title` scenario script will open in the Story Editor, indicating that it is currently being played.

![](https://i.gyazo.com/84c64bf7fb4217dd149260fd0008b7f4.png)

Feel free to explore the Story Editor and edit the scripts — changes are applied live. Read through the comments in the sample scripts for brief explanations of the nearby commands. Click "NEW GAME" on the title UI to proceed to the `Entry` script, which contains some additional examples.

## Add Scenario Script

Now that you are familiar with the general flow, let's dive into adding actual content to the game. The essential assets that drive the story in Naninovel are called *scenario scripts*.

We already have two scripts scaffolded automatically, but let's learn how to add new ones. While you can use the [Story Editor](/guide/editor) to manage scripts, let's focus on the standard Unity workflow while getting started; you can learn the Story Editor-specific workflows in its dedicated guide.

First, exit Play Mode by clicking the "Stop" button. As a rule of thumb, any project-level modifications — such as adding or removing assets, as well as tweaking project settings — should be performed outside of Play Mode in Unity.

Find the `Assets/Scenario` folder that was automatically scaffolded together with the sample scripts — this is *scenario root* — the folder where all Naninovel scenario scripts will be stored. Under the scenario folder, right-click and select `Create -> Naninovel -> Scenario Script` to create a new `Test.nani` scenario script.

![](https://i.gyazo.com/52ac23ba6b66c176bcbe67ef852310fb.png)

::: info NOTE
You can store scenario scripts (and other assets) in any project folder and organize them however you like; naming is also entirely up to you. However, note that all scenario scripts must be stored within a single root directory. You can create as many nested folders as needed for organizational purposes, as long as all subfolders ultimately resolve to a common root within the Unity project.

::: warning
Unity treats folders named `Resources` in a special manner: assets stored under such folders are force-included in the build, which may cause [performance issues](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime). Most importantly, never store anything under the `Resources/Naninovel` folder unless specifically required by the guide, as this may cause all sorts of conflicts and undefined behavior.
:::

Scenario scripts are text documents with a `.nani` extension where you control what happens in scenes using [NaniScript](/guide/scenario-scripting) — Naninovel's screenwriting language. You can open and edit the script files with any text or code editor of your choice, such as Microsoft Word or [VS Code](/guide/ide-extension).

![?class=when-dark](https://i.gyazo.com/8ccfe73f2b0d39dfe8479a02a218a011.png)
![?class=when-light](https://i.gyazo.com/110a7ca29df4d19f9a019732e1a68019.png)

When you use the [Story Editor](/guide/editor), it outputs the same NaniScript to the scenario files, so you can use it interchangeably with code editors. In the rest of this guide, we will show script snippets assuming you're using a code editor, but you can follow the same steps inside the Story Editor: start typing `@` in the line type dropdown list, and it will show the matching commands.

![?width=399](https://i.gyazo.com/0f5ee5d28de74570bdf25197e1f5444e.png)

Open the created `Test.nani` script and add the following line:

```nani
Hello World!
```

— this line will print "Hello World!" when executed.

Next, open the `Entry.nani` script and replace the last `@title` command with:

```nani
@goto Test
```

— this command will navigate the playback to our new `Test.nani` script instead of exiting to the title menu.

Enter Play Mode, start a new game, and play through until "Hello World!" is printed. Try editing the script while the game is playing — changes will be applied immediately.

::: tip
The standard NaniScript commands and their usage examples are listed in the [API reference](/api/). It is also possible to add custom commands; see [the guide](/guide/custom-commands) for more information.
:::

## Add Character

Use the same menu you used to add the scenario script, but now select `Create -> Naninovel -> Actor Record -> Character`. This will create a *character record* asset, which contains the actor configuration for the new character. Let's give the record asset a name — `K`. Why `K`? Because the identifier will be used throughout the scenario scripts, and you would not want to type the full name repeatedly. The actual name — "Kohaku" — can be set under `Display Name` in the record asset; this is the name that will be displayed to players in the game.

![?width=574](https://i.gyazo.com/f9da79b98e2cd3acf9151945330f961e.png)

Of course, you can use any identifier and display name for your characters; just make sure the ID does not contain whitespace or special characters. The display name, on the other hand, can contain whitespace and any special characters.

::: tip
You'll find many options in our configuration menus. As with other Unity menus, most controls have associated tooltips that explain what they do. To view a tooltip, hover over it with the mouse and wait a moment — the explanation will appear under the cursor.
:::

Now, let's select the implementation for our actor. Characters in Naninovel can be based on regular or diced sprites, animated Live2D or Spine models, 3D meshes, and many other types of assets; you can also add your own implementations. For the purpose of this tutorial, we'll use a sprite implementation, which is based on 2D texture assets (images).

![?width=575](https://i.gyazo.com/8ffc45f0266741dcb31782c9f236985c.png)

Finally, assign appearances by dropping the textures into the folder with our character, select them, click the Naninovel icon under the Inspector header, and select `Characters -> K`.

![?width=623](https://i.gyazo.com/25cf89584f50f72b5e0f34d71742ed23.png)

Modify the scenario script to show the added character with the [@char] command:

```nani
@char K
Hello World!
```

You'll see the character at the center of the screen. When you don't specify an appearance, the one named "Default" is chosen automatically. To select a specific appearance, add its name after the character ID, separated by a dot, like this:

```nani
@char K.Happy
Hello World!
```

Given that there is an appearance named "Happy" added for the character "K", the corresponding sprite will now be shown instead of the default one.

You can now associate the displayed text with the character by adding its ID followed by a colon before the text:

```nani
@char K.Happy
K: Hello World!
```

![?width=588](https://i.gyazo.com/48ad8d4c512b67df02d7ace15d5eaca5.png)

It's possible to combine a character's appearance with the displayed text to save some typing:

```nani
K.Happy: Hello World!
```

To hide a character, use the [@hide] command followed by the actor ID:

```nani
@hide K
```

## Add Background

Similar to characters, a background can be represented in multiple ways in Naninovel: sprite, video, scene, and others; custom implementations are also possible.

While you can create multiple independent background actors, in a typical visual novel you'll usually use just one and transition it between different appearances. To simplify the routine, a background actor with the `MainBackground` ID is assumed by default when you use the [@back] command to control background actors:

```nani
@back Road
```

— the command will transition the `MainBackground` actor to the `Road` appearance.

You create the background actor record and assign the appearance sprites similarly to characters:

- Create a folder to store the backgrounds, for example `Assets/Backgrounds`
- Right-click the folder and select `Create -> Naninovel -> Actor Record -> Background` to create the `MainBackground` record
- Inspect the record and select the implementation, for example `SpriteBackground`
- Assign the appearance resources

![](https://i.gyazo.com/1017667cd15b374839127fa5e1e5c2e5.png)

When switching between background appearances, a cross-fade [transition effect](/guide/special-effects#transition-effects) is used by default. To change the effect, specify the transition type after the appearance name:

```nani
@back Road
@back Ruins.RadialBlur
```

This will transition "Road" to "Ruins" using the "RadialBlur" transition effect.

To reference a background other than the main one (e.g., if you wish to compose multiple backgrounds on top of each other), specify the ID of the actor. For example, given that a background actor with the ID `Flower` exists alongside the main one, the following commands will change its appearance to "Bloomed" and then to "Withered":

```nani
@back Bloomed id:Flower
@back Withered id:Flower
```

Hide backgrounds with the same [@hide] command:

```nani
@hide Flower
```

## Add Audio

To register a BGM (background music) or SFX (sound effect) audio resource with Naninovel, select the audio clip asset and use the same inspector menu you've used to register the character and background resources, but select "Audio" instead.

![?width=655](https://i.gyazo.com/b49d3a7f865c8dde7322ef497ee9bcf6.png)

To play a registered audio resource as background music, use the [@bgm] command:

```nani
@bgm CloudNine
```

A cross-fade effect is automatically applied when switching music tracks. The music will loop by default, though you can change this, as well as the volume and fade duration, using the command parameters.

In contrast, sound effects won't loop by default. Play them with the [@sfx] command:

```nani
@sfx Explosion
```

To stop a playing BGM or SFX, use the [@stopBgm] and [@stopSfx] commands respectively:

```nani
@stopBgm CloudNine
@stopSfx Explosion
```

## Manage Resources

You can review all the registered resources, as well as actors and other engine options, in the Project Settings window under the Naninovel tab; use the `Naninovel -> Configuration` editor menu to quickly access the configuration.

![?width=641](https://i.gyazo.com/0716a001d7bc1695ae0cac655b55f017.png)

You're free to change the resource paths (they equal the asset names by default), which may be useful for organisational purposes. The registered paths are what are actually used when you reference resources in the scenario scripts. For example, in the screenshot above we changed `Explosion` to `SFX/Explosion`. We can now use the new path to play the sound effect:

```nani
@sfx SFX/Explosion
```

When you add or modify resources, both the Story Editor and the VS Code extension are automatically synchronised with the changes and update the associated lists.

![](https://i.gyazo.com/c353c7cfa398315d926f365634786467.png)

::: tip
Consider installing the Unity's [Addressables package](https://docs.unity3d.com/Packages/com.unity.addressables@latest) for ultimate control over how assets are organised and bundled in the final build — Naninovel will automatically integrate with the package.
:::

## Dialogue Mode

Even though Naninovel is primarily designed as a foundation for building visual novels, it can also be used as a drop-in dialogue or cutscene system for games of any genre.

While it is possible to manually configure the engine for the "drop-in" use case, there is a dedicated "Minimal Mode" switch that automatically modifies the configuration, removes most built-in UI, and disables features to reduce the engine to its bare minimum.

Enable Minimal Mode via the `Naninovel -> Set Up Minimal Mode` Unity Editor menu.

![?width=234](https://i.gyazo.com/6d92cd0d7e0c63c1010123a0f61e78e0.png)

::: warning
The Minimal Mode setup procedure will modify the engine's default configuration and resources, and the **changes cannot be automatically undone**. Only enable the mode when starting a new project where Naninovel is going to be used as a drop-in dialogue system, not as a visual novel engine.
:::

You can read more about the C# part of the engine integration into existing codebases under the "Advanced" section of the guide. Here, we'll show a simple no-code dialogue interaction scenario: the player hovers over an interactable object and clicks it to start the dialogue. On an empty scene, add:

- An object with an `UI / Event System` component
    - Assign `Naninovel/Resources/Input/DefaultControls` as the `Actions Asset`
- A camera object with an `Event / Physics Raycaster` component
- A cube that will serve as our dialogue trigger
    - Remove the default collider component attached to the cube

Now, right-click the cube and select `Naninovel -> Dialogue` — this automatically sets up the dialogue trigger on the selected object. Inspect the created `Dialogue` object under the cube and assign a scenario script asset to play.

Next, set up the trigger conditions on the `Dialogue/Trigger` object:

- Set `Collide With` and `Raycast From` to "None"
- Set `Perform Input` to the `UI/Click` action from the Naninovel input actions asset
- Enable `Hover With Pointer`

![?width=689](https://i.gyazo.com/97b63b1cb1692966fef8dc0b98b0fced.png)

Enter Play mode and hover over the cube — the prompt will react when the mouse cursor is over it. Left-click to start the dialogue. To exit the dialogue, use the [@exitDialogue] command.

Note the many options on the `Trigger Events` component — you can set up most common interaction scenarios by simply tweaking them, such as first-person look at a certain distance, side-scroller view collision, third-person pointer hover followed by a key press, and more. Read the tooltips on each option to understand how they work.

## Demo Samples

The Naninovel package contains two basic samples:

- **Visual Novel** — a basic visual novel template with multiple routes, demonstrating the use of placeholder actors, various commands, local and global variables, customizable character names, and other traditional VN mechanics.
- **Dialogue System** — a 3D side-scroller scene where Naninovel is used as a drop-in dialogue system, showing the use of transient printers, bubble choice handlers, integration with Cinemachine, and other common usage scenarios.

You can import both samples via the Unity Package Manager by selecting the Naninovel package, navigating to the "Samples" tab, and clicking the "Import" button for a sample.

![?width=711](https://i.gyazo.com/a33a679037089bab1bce41684818b158.png)

For a collection of more advanced examples, check the [samples project](/guide/samples) — it contains many specialized samples, such as Live2D and Spine characters, custom actor shaders, an interactive map, video actors, calendar and inventory custom UIs, and more.
