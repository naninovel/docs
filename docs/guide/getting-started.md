# Getting Started

## Prerequisites

Naninovel is an extension for the [Unity game engine](https://unity.com), so it's strongly recommended to at least [learn the basics](https://learn.unity.com) of using the engine before starting with Naninovel.

In case you're not going to build any custom gameplay outside Naninovel, feel free to ignore the scene-related information altogether, as Naninovel will take care of that.

## Create New Unity Project

When creating a project we recommend choosing **Built-in Render Pipeline** (BiRP) template. While Universal (URP) and High Definition (HDRP) will generally work as well, they have limitations compared to the built-in renderer, require additional setup and support for them is limited; fine more info in the [render pipelines guide](/guide/render-pipelines).

Choosing 2D or 3D depends on the style of the game you're building. For most standard visual novels we recommend choosing 2D, so that images will be imported as sprite assets by default and you won't have to manually change the import settings. You can change the editor behaviour mode later using the [project settings](https://docs.unity3d.com/Manual/2DAnd3DModeSettings.html).

![](https://i.gyazo.com/7abffe64675880f6d1c7afe6424b91be.png)

When creating new project, Unity automatically includes a sample scene with "Main Camera" and (in some templates) "Directional Light" game objects inside it.

![](https://i.gyazo.com/0691599c7586100d2467499a252b6194.png)

Naninovel is scene-independent, hence we recommend removing those objects from the scene to prevent unnecessary performance overhead or conflicts with Naninovel systems. You can also remove the sample scene itself, though it's recommended to keep at least one scene in a project for some editor features to work correctly.

### Optimizing Editor Performance

This step is optional but recommended to significantly improve editor startup, reload and enter play mode times.

First, go to `Edit -> Project Settings -> Editor` menu and select `Do not reload Domain or Scene` under "Enter Play Mode Settings" option to reduce the time it takes to enter play mode.

![](https://i.gyazo.com/8432d5dfb28a0f63d0f2fedfa00be91c.png)

Now, open and inspect `manifest.json` file at the "Packages" folder stored under the Unity project root. It lists all the installed packages and modules. Depending on the template, Unity includes many modules by default, while you'll most likely never need most of those, while each of them increases the time of the editor startup and code reload. Below are the modules required by Naninovel; consider removing all the other entries, in case they are not needed:

```json
{
    "dependencies": {
        "com.unity.modules.audio": "1.0.0",
        "com.unity.modules.video": "1.0.0",
        "com.unity.modules.imgui": "1.0.0",
        "com.unity.modules.uielements": "1.0.0",
        "com.unity.modules.particlesystem": "1.0.0",
        "com.unity.modules.imageconversion": "1.0.0",
        "com.unity.ugui": "2.0.0"
    }
}
```

## Install Naninovel

### Release Streams

Naninovel is distributed across 3 release streams: **preview**, **stable** and **final**.

Preview is the bleeding edge: it's updated most often and has all the latest features. However, it's subject to occasional breaking changes and bugs. Pick this stream when you're early in development or need a specific feature not available in the other releases.

Stable is the middle-ground: it only receives bug fixes, doesn't have the latest features, but is also free from any breaking changes. It's recommended in most cases.

Final, while being the most tested and stable one, is also the most outdated and is not covered by the [tech support](/support/#naninovel-support). Only stay on the final release in case the project is already released and it's not possible to upgrade.

![](https://i.gyazo.com/fcf0bbd4bbd47141e30efabea6ad0f86.png)

Stable stream is published on both GitHub and Unity's Asset Store (though not as often as on GitHub), while preview and final streams are only available on GitHub.

### Install from Asset Store

In case you've purchased Naninovel on the Unity's Asset Store, you can install and update stable releases via "My Assets" tab of the [package manager](https://docs.unity3d.com/Manual/upm-ui-import.html).

::: info NOTE
Only releases from the stable stream are published to the Unity's Asset Store. Moreover, they're published with a 2-3 months delay, so we recommend installing Naninovel from GitHub to access the latest updates.
:::

### Install from GitHub

All the release streams starting with v1.20 are distributed via a UPM registry hosted on a private GitHub repository. To access the repository, [register your Naninovel license](https://naninovel.com/register) and follow the instructions on the dashboard.

Once you have access to the repository, go to `Window -> Package Manager` in Unity editor and add `https://github.com/naninovel/upm.git#X.X` as a Git package, where `X.X` is the Naninovel release version you'd like to install, for example `1.20`. You can find all the available releases and their versions on the [releases page](https://pre.naninovel.com/releases).

![](https://i.gyazo.com/91d056eb5b6278e5c9a28f59c8ff8732.png)

If you get an error when installing the package, make sure you're authenticated (on the local machine) as the GitHub user, which was assigned in the account dashboard; refer to the Unity guide for [more info on authentication](https://docs.unity3d.com/Manual/upm-config-https-git.html).

## Core Concepts

Before setting up and using Naninovel, let's skim through some of the core concepts.

An essential one, which you will constantly encounter in the rest of the guide, is *actor*. Actor is an entity described by an identifier (ID), appearance, position in space (scene) and some other parameters.

Actor is an abstract entity and can't exist directly; instead, specialized versions with various additional parameters are used:

Actor Type | Additional Parameters | Description
--- | --- | ---
[Character](/guide/characters) | Look Direction | Represents a character on scene.
[Background](/guide/backgrounds) | None | Represents a background on scene; placed behind character actors by default.
[Text Printer](/guide/text-printers) | Text, Author ID, Reveal Progress | Gradually reveals (prints) text messages over time.
[Choice Handler](/guide/choices) | Choices | Allows player to pick one of the available choices.

Consider a typical visual novel setup, with a character portrayed on top of a background. In Naninovel terms, it will be represented in the following way.

![](/assets/img/docs/actor-concept.mp4)

Now, let's say you want to make "Kohaku" character look happy. You have several textures (images) of that character, each portraying different emotion. In Naninovel such textures are called *appearances* of an actor. To achieve the goal, we have to change appearance of the character actor. Similarly, to make "MainBackground" display something else, we have to change appearance of that background actor.

Actors and their parameters are controlled (directed) via commands specified in [naninovel scripts](/guide/naninovel-scripts).

Another widely used concept is [user interface](/guide/user-interface) (UI). UIs are used by player to interact with actors and the rest of the game. This includes various menus (title, save-load, settings, etc) and control panels (toggle auto read mode, skip text, etc). UI elements are positioned on top of actors by default.

Text printers and choice handlers are considered both actors and UI elements, meaning they share actor qualities and can be controlled via naninovel scripts, while, at the same time, used by players to interact with the game.

In case you're familiar with programming, take a look at the [engine architecture](/guide/engine-architecture) to get a grasp on how it's designed from the software engineering perspective.

## Add Naninovel Script

Use `Create -> Folder` assets context menu and create a "Scenario" folder, under which all the Naninovel scenario script assets will be stored. Then, under the created folder, click `Create -> Naninovel -> Naninovel Script` to create your first scenario script.

![](https://i.gyazo.com/30f96fd3c8bb275478361c51f1a00e86.png)

::: info NOTE
You can store naninovel scripts (and other Naninovel resources) under any project folder and organize them any way you like; the naming is also up to you. However, note that all the scenario scripts have to be stored under a single root folder, which has to be specified via `Scenario Root` option in scripts configuration menu (by default the root is set to `Assets/Scenario`). It's ok to create any level of nested folders for organization purposes, as long as the sub-folders eventually resolve to the script root.

::: warning
Unity treats folders named `Resources` in a special manner: assets stored under such folders are force-included to the build, which may cause [performance issues](https://docs.unity3d.com/Manual/UnderstandingPerformanceResourcesFolder.html). Most importantly, never store anything under `Resources/Naninovel` folder, unless specifically required in the guide, as this may cause all sorts of conflicts and undefined behaviour.
:::

Naninovel scripts are text documents (`.nani` extension) where you control what happens on scenes. You can open and edit them with a text editor of your choice, like Microsoft Word, Google Docs or [VS Code](https://code.visualstudio.com).

![Open Naninovel Script](https://i.gyazo.com/f552c2ef323f9ec1171eba72e0c55432.png)

You can also use visual script editor to edit the naninovel scripts. Select the created script asset and you'll see the visual editor automatically open in the inspector window.

![](https://i.gyazo.com/ba57b9f78116e57408125325bdf66be9.mp4)

To add a new line to the script, either right-click the place, where you want to insert the line, or press `Ctrl+Space` (you can change the default key bindings in the input configuration menu) and select the desired line or command type. To re-order lines, drag them using their number labels. To remove a line, right-click it and choose "Remove".

When you've changed the script using visual editor, you'll see an asterisk (`*`) over the script path in the inspector header. That means the asset is dirty and need to be saved; press `Ctrl+S` to save the asset. In case you'll attempt to select another asset while the script is dirty, a dialogue window will pop up allowing to either save or revert the changes.

The visual editor will automatically sync edited script if you update it externally, so you can seamlessly work with the scripts in both text and visual editors.

::: info NOTE
In the rest of this guide we will use a text editor, but you can repeat all the same steps with the visual editor, if you wish.
:::

In order for a Naninovel-related asset (like our created script) to become "visible" for the engine, it should be assigned as a project resource. When creating the scripts via the create assets menu, they're assigned automatically. To assign (or edit/remove) a script resource manually use script resources window accessible with `Naninovel -> Resources -> Scripts` editor context menu. To add a script, press `+` (plus sign) button in the list to add a new record and drag-drop script asset to the list. It's also possible to drag-drop multiple assets or even whole folders to the list to add them in batch.

![Add Naninovel Script](https://i.gyazo.com/b3281a145ba54e6cb6cbdaa478ea894d.png)

Open the created script in a text editor and add the following text:

```nani
Hello World!
@stop
```
The first line will print the text "Hello World!" when the game is run and the second is required to gracefully stop script execution.

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

Let’s assume the added character ID is "Kohaku". Edit naninovel script to show the added character:

```nani
@char Kohaku
Hello World!
@stop
```

Run the game and you’ll see one of the character appearance sprites at the center of the screen. When you don’t specify an appearance, either the one named equal to character's ID or "Default" will be chosen by default. To select a specific appearance, add its name after the character ID separated by a dot like this:

```nani
@char Kohaku.Happy
Hello World!
@stop
```

Given there is an appearance with the name "Happy" added for the character "Kohaku", the corresponding sprite will now be shown instead of the default one.

You can now associate the printed text with the character by adding its ID followed by a colon before the text:

```nani
@char Kohaku.Happy
Kohaku: Hello World!
@stop
```

It's also possible to join character's appearance with the printed text to save some typing:

```nani
Kohaku.Happy: Hello World!
@stop
```

To hide a character (or any other actor, like background, text printer, etc), use [@hide] command followed by actor ID:
```nani
Kohaku.Happy: Hello World!
@hide Kohaku
@stop
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

Complete sources of the demo project (the same one showcased on the store) are [available on GitHub](https://github.com/naninovel/samples/tree/main/unity/demo).

You can [clone the repository with a Git client](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) or [download it as a zip archive](https://github.com/naninovel/samples/archive/main.zip). Be aware, that assets distributed with the demo project may be subject to custom licenses and are provided solely for learning purposes.

::: warning
Naninovel is referenced in the project as a Git UPM package, which is hosted on a private GitHub repository. Refer to the [installation guide](/guide/getting-started#install-from-github) for instructions on accessing the repository. Alternatively, remove the Git package and install Naninovel from the Asset Store.
:::
