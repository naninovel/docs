# Getting Started

## Prerequisites

Naninovel is an extension for the [Unity game engine](https://unity.com), so it is strongly recommended to at least [learn the basics](https://learn.unity.com) of using Unity before starting with Naninovel.

If you do not plan to implement any custom gameplay outside Naninovel, you can ignore the scene-related information, as Naninovel will handle it automatically.

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
        "com.unity.modules.uielements": "1.0.0",
        "com.unity.modules.particlesystem": "1.0.0",
        "com.unity.ugui": "2.0.0"
    }
}
```
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

### Install from GitHub

All the release streams are distributed via a UPM registry hosted on a private GitHub repository. To access the repository, [register your Naninovel license](https://naninovel.com/register) and follow the instructions on the dashboard.

Once you have access to the repository, go to `Window -> Package Manager` in Unity editor and add `https://github.com/naninovel/upm.git#X.X` as a Git package, where `X.X` is the Naninovel release version you'd like to install, for example:

```
https://github.com/naninovel/upm.git#1.21
```

You can find all the available releases and their versions on the [releases page](https://pre.naninovel.com/releases).

![?width=300](https://i.gyazo.com/c7c453b8b34c94809303a9dc42e5330d.png)

If you encounter an error while installing the package, make sure you're authenticated (on your local machine) as the GitHub user assigned in the account dashboard. The simplest way to authenticate is by logging in with [GitHub Desktop](https://github.com/apps/desktop) or the [CLI tool](https://cli.github.com). Refer to the Unity guide for [more info on authentication](https://docs.unity3d.com/Manual/upm-config-https-git.html).

### Install from Package

Alternatively, you can install Naninovel using a `.unitypackage` file. The current stable release and all previous versions are available in our [download archive](https://account.naninovel.com/download).

::: info NOTE
Asset Store packages and the download archive are updated several months later than the UPM repository and don't include preview releases, so we recommend installing Naninovel directly from GitHub for the latest updates.
:::

## Core Concepts

Before setting up and using Naninovel, let's skim through some of the core concepts.

An essential one, which you will constantly encounter throughout the rest of the guide, is the *actor*. An actor is an entity described by an identifier (ID), appearance, position in space (scene), and some other parameters.

An actor is an abstract entity and can't exist directly; instead, specialized versions with various additional parameters are used:


 Actor Type                           | Additional Parameters            | Description
--------------------------------------|----------------------------------|------------------------------------------------------------------------------
 [Character](/guide/characters)       | Look Direction                   | Represents a character on scene.
 [Background](/guide/backgrounds)     | None                             | Represents a background on scene; placed behind character actors by default.
 [Text Printer](/guide/text-printers) | Text, Author ID, Reveal Progress | Gradually reveals (prints) text messages over time.
 [Choice Handler](/guide/choices)     | Choices                          | Allows player to pick one of the available choices.

Consider a typical visual novel setup, with a character portrayed on top of a background. In Naninovel terms, it is represented as follows:

![](https://i.gyazo.com/ede8072c68393e915286d18811a8dd4f.png)

Now, let's say you want the character "Kohaku" to display a different emotion or pose. You have several textures (images) of that character, each portraying a different state. In Naninovel, such textures are called *appearances* of an actor. To achieve this, we have to change the appearance of the character actor. Similarly, to make "MainBackground" display something else, we need to change the appearance of that background actor.

Actors and their parameters are directed via commands specified in [scenario scripts](/guide/scenario-scripting).

Another widely used concept is the [user interface](/guide/gui) (UI). UIs are used by the player to interact with actors and the rest of the game. This includes various menus (title, save-load, settings, etc.) and control panels (toggle auto-read mode, skip text, etc.). UI elements are positioned on top of actors by default.

Text printers and choice handlers are considered both actors and UI elements, meaning they share actor qualities and can be controlled via Naninovel scripts, while at the same time being used by players to interact with the game.

![](https://i.gyazo.com/0c8bd29820c6f2165af6adc5736713bd.png)

If you're familiar with programming, take a look at the [engine architecture](/guide/engine-architecture) to understand how it is designed from a software engineering perspective.

## Add Naninovel Script

Use `Create -> Folder` assets context menu and create a "Scenario" folder, under which all the Naninovel scenario script assets will be stored. Then, under the created folder, click `Create -> Naninovel -> Naninovel Script` to create your first scenario script.

![](https://i.gyazo.com/30f96fd3c8bb275478361c51f1a00e86.png)

::: info NOTE
You can store Naninovel scripts (and other resources) in any project folder and organize them however you like; naming is also entirely up to you. However, note that all scenario scripts must be stored within a single root directory. You can create as many nested folders as needed for organizational purposes, as long as all sub-folders eventually resolve to a common root within the Unity project.

::: warning
Unity treats folders named `Resources` in a special manner: assets stored under such folders are force-included to the build, which may cause [performance issues](https://docs.unity3d.com/Manual/UnderstandingPerformanceResourcesFolder.html). Most importantly, never store anything under `Resources/Naninovel` folder, unless specifically required in the guide, as this may cause all sorts of conflicts and undefined behaviour.
:::

Naninovel scripts are text documents (`.nani` extension) where you control what happens on scenes. You can open and edit them with a text editor of your choice, like Microsoft Word, Google Docs or [VS Code](https://code.visualstudio.com).

![?class=when-dark](https://i.gyazo.com/0051c3b96de4854d665e6bf9aba6bbd1.png)
![?class=when-light](https://i.gyazo.com/4172fee457fb4c1f473ffeb0516b83ca.png)

You can also use visual script editor to edit the naninovel scripts. Select the created script asset and you'll see the visual editor automatically open in the inspector window.

![](https://i.gyazo.com/ba57b9f78116e57408125325bdf66be9.mp4)

To add a new line to the script, either right-click the place, where you want to insert the line, or press `Ctrl+Space` (you can change the default key bindings in the input configuration menu) and select the desired line or command type. To re-order lines, drag them using their number labels. To remove a line, right-click it and choose "Remove".

When you've changed the script using visual editor, you'll see an asterisk (`*`) over the script path in the inspector header. That means the asset is dirty and need to be saved; press `Ctrl+S` to save the asset. In case you attempt to select another asset while the script is dirty, a dialogue window will pop up allowing to either save or revert the changes.

The visual editor will automatically sync the edited script if you update it externally, so you can seamlessly work with the scripts in both text and visual editors.

::: tip
We're currently working on a new standalone editor app that's more powerful than the built-in visual editor and can be used without Unity, directly in a web browser. Learn more in the [editor guide](/guide/editor).

![](https://i.gyazo.com/d54f0b35b4d89bdbece096c7b78c8c72.mp4)
:::

In the rest of this guide we will use a text editor, but you can repeat all the same steps with the visual or standalone editors if you wish.

In order for a Naninovel-related asset (like our created script) to become "visible" for the engine, it should be assigned as a project resource. When creating the scripts via the asset menu, they're assigned automatically. To assign (or edit/remove) a script resource manually, use the script resources window accessible with `Naninovel -> Resources -> Scripts` editor context menu. To add a script, press `+` (plus sign) button in the list to add a new record and drag-drop script asset to the list. It's also possible to drag-drop multiple assets or even whole folders to the list to add them in batch.

![Add Naninovel Script](https://i.gyazo.com/b3281a145ba54e6cb6cbdaa478ea894d.png)

Open the created script in a text editor and add the following text:

```nani
Hello World!
```

The line will print the text "Hello World!" when the game is run.

Enter play mode and start a new game to see the result.

::: info NOTE
All the available built-in script commands, supported parameters and usage examples are listed in the [API reference](/api/). It's also possible to add custom commands; see [the guide](/guide/custom-commands) for more information.
:::

In case "NEW GAME" button of the title menu is not active, make sure `Start Game Script` property in the script configuration (`Naninovel -> Configuration -> Scripts`) is equal to the name of the created script.

![](https://i.gyazo.com/47e34c913994a5b3e88d8f30d5127b7b.png)

## Add Character

Characters in Naninovel can be based on regular and diced sprites, animated Live2D or Spine models and 3D meshes; you can add your own implementations as well. For the purpose of this tutorial, we’ll use a sprite implementation.

Each character is represented by ID and a set of appearances. To add a character, use character manager GUI accessible via `Naninovel -> Resources -> Characters` menu, add a new character actor record specifying its ID, then double-click the record (or press button at the end of the record) and add all the appearance sprites to the `Resources` list. Just like with naninovel scripts, you can drag-drop multiple assets and folders to the list.

![Add Character](https://i.gyazo.com/0c1e81ea1a20165c1bf88854df177b7f.png)

::: tip
You'll find many options in our configuration menus. As with the other Unity menus, most of the controls have associated tooltips that explain what they do. To view a tooltip, hover over it with the mouse and wait a moment — the explanation will appear under the cursor.
:::

Let’s assume the added character ID is "Kohaku". Edit naninovel script to show the added character:

```nani
@char Kohaku
Hello World!
```

Run the game and you’ll see one of the character appearance sprites at the center of the screen. When you don’t specify an appearance, either the one named equal to character's ID or "Default" will be chosen by default. To select a specific appearance, add its name after the character ID separated by a dot like this:

```nani
@char Kohaku.Happy
Hello World!
```

Given there is an appearance with the name "Happy" added for the character "Kohaku", the corresponding sprite will now be shown instead of the default one.

You can now associate the printed text with the character by adding its ID followed by a colon before the text:

```nani
@char Kohaku.Happy
Kohaku: Hello World!
```

It's also possible to join character's appearance with the printed text to save some typing:

```nani
Kohaku.Happy: Hello World!
```

To hide a character (or any other actor, like background, text printer, etc), use [@hide] command followed by actor ID:

```nani
Kohaku.Happy: Hello World!
@hide Kohaku
```

## Add Background

Similar to characters, a background can be represented in multiple ways in Naninovel: sprite, generic object, video and scene; custom user implementations are also possible.

While you can create multiple independent background actors, in a typical VN game you'll usually use just one and transition it to different appearances. To simplify the routine, a `MainBackground` actor is added to the background actors list by default and you don't have to specify the ID every time to change its appearance in naninovel scripts.

Add background sprites via `Naninovel -> Resources -> Backgrounds` menu. `MainBackground` record will open automatically, but you can still return to the actors list and create others, if you wish.

![Add Background](https://i.gyazo.com/98e88780625c7f2e1ef88db7ef10d1f4.png)

Let’s assume the added background appearance sprite is named "City". To show a background, use a [@back] command followed by the background appearance name:

```nani
@back City
```

When switching between backgrounds a cross-fade [transition effect](/guide/transition-effects) will be used by default. To change the effect, specify transition type after the appearance name:

```nani
@back City
@back School.RadialBlur
```

This will transition "City" to "School" using "RadialBlur" transition effect.

To reference a background other than the main one (eg, in case you wish to compose multiple backgrounds on top of each other), specify ID of the actor. For example, given a background actor with ID `Flower` exists beside the main one, following commands will change its appearance to "Bloomed" and then to "Withered":

```nani
@back Bloomed id:Flower
@back Withered id:Flower
```

## Add Music and Sound Effects

To add a BGM (background music) or SFX (sound effect) asset, use `Naninovel -> Resources -> Audio` editor menu. You can use any audio formats [supported by Unity](https://docs.unity3d.com/Manual/AudioFiles.html).

![Managing Audio](https://i.gyazo.com/cacdec36623dbbfcf9f49c594de53c0f.png)

Let’s assume the added BGM file name is "ThePromenade". To play this track as a background music use [@bgm] command followed by the name of the track:

```nani
@bgm ThePromenade
```

A cross-fade effect will be automatically applied when switching the music tracks. The music will loop by default, though you can change this, as well as volume and fade duration using command parameters.

On the contrary, sound effects won't loop by default. Assuming you've added an "Explosion" SFX, use an [@sfx] command to play it back:

```nani
@sfx Explosion
```

::: tip
Over the course of using Naninovel a number of assets (settings, resources, various caches, etc) will be automatically generated under `Assets/NaninovelData` folder. You're free to move or rename the folder, just make sure to not store it under a "Resources" folder, as it'll cause conflicts.
:::

## Video Guide

In case you prefer following video guides, here is one illustrating the above instructions.

![](https://www.youtube.com/watch?v=wFil5vje3NE)

## Demo Project

In case your prefer to learn from a complete solution, check the [sample project](/guide/samples), which contains the complete sources of the demo showed on the website.
