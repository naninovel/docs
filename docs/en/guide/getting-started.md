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
        "com.unity.modules.imageconversion": "1.0.0",
        "com.unity.modules.uielements": "1.0.0",
        "com.unity.modules.particlesystem": "1.0.0",
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

When you use the [Story Editor](/guide/editor), it outputs the same NaniScript to the scenario files, so you can use it interchangeably with text editors.

![?width=403](https://i.gyazo.com/18f5cc0e910bf95e7d933b06b878b589.png)

In the rest of this guide, we will show script snippets that you can copy and paste when using a text or code editor, but you can follow the same steps inside the Story Editor if you prefer.

Open the created `Test.nani` script in a text editor and add the following line:

```nani
Hello World!
```

— this line will print "Hello World!" when executed.

Next, open the `Entry.nani` script and replace the last `@title` command with:

```nani
@goto Test
```

— this command will navigate the playback to our new `Test.nani` script instead of exiting to the title menu.

Enter Play Mode, start a new game, and play through until "Hello World!" is printed. Try editing the script while the game is playing — changes will be applied immediately, without re-entering Play Mode.

::: tip
The standard NaniScript commands and their usage examples are listed in the [API reference](/api/). It is also possible to add custom commands; see [the guide](/guide/custom-commands) for more information.
:::

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
