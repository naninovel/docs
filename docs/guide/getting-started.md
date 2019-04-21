# Getting Started

## Prerequisites
Naninovel is an extension for [Unity game engine](https://unity.com/), so it's strongly recommended to at least learn the basics of using the engine before starting with Naninovel.

The following manual chapters should be considered essential:
- [Installing Unity](https://docs.unity3d.com/Manual/GettingStartedInstallingHub)
- [Creating Projects](https://docs.unity3d.com/Manual/GettingStarted)
- [Editor Interface](https://docs.unity3d.com/Manual/LearningtheInterface)
- [Using the Asset Store](https://docs.unity3d.com/Manual/AssetStore)
- [Publishing Builds](https://docs.unity3d.com/Manual/PublishingBuilds)

In case you're not going to build any custom gameplay outside of Naninovel, feel free to ignore the scene-related information altogether, as Naninovel will take care of that.

## Create New Unity Project
Consult the [Unity manual](https://docs.unity3d.com/Manual/GettingStarted) on how to create a new project.

When creating a project you'd probably like to use `2D Template` to set the editor in 2D behaviour mode, so that images will be imported as sprite assets by default and you won't have to manually change the import settings. You can change the editor behaviour mode later using the [project settings](https://docs.unity3d.com/Manual/2DAnd3DModeSettings.html).

## Install Naninovel
Import Naninovel package using the [Asset Store window](https://docs.unity3d.com/Manual/AssetStore.html) and wait for the initial scripts compilation and assets import process. You are free to move `Naninovel` package folder anywhere inside your project assets directory, if you wish.

Over the course of using Naninovel a number of assets (configuration, settings, saves, etc) will be automatically generated inside `Assets/NaninovelData` folder. In contrast to the package folder, you shouldn't manually move the data folder (it'll be automatically regenerated). If you wish to change location of the data folder, edit `Generated Data Path` property in the engine configuration menu.

## Add Novel Script
Use `Create -> Novel Script` assets context menu to create a novel script asset. 

![Create Novel Script](https://i.gyazo.com/d63a378e2c8602a6f9918c4106de6832.png)

*Notice: you can create and store novel scripts (as well as all the other Naninovel resources) under any project folder and organize them in any way you like; the naming is also up to you. The above illustration is just an example.*

Novel scripts are text documents (`.txt` extension) where you control what happens on scenes. You can open and edit them with a text editor of your choice, like Notepad, Word or Sublime.

![Open Novel Script](https://i.gyazo.com/b4b8e0848751fcfdd8d56045f5104e80.png)

Add the created novel script to the project resources. For this, open scripts manager using `Naninovel -> Resources -> Scripts` context menu, press `+` (plus sign) button in the list to add a new record and drag-drop script asset to the list. It's also possible to drag-drop multiple assets or even whole folders to the list to add them in batch. While not recommended, it's also possible to just keep the scripts in a `Resources/Scripts` folder and they'll be automatically exposed to project resources.

![Add Novel Script](https://i.gyazo.com/b3281a145ba54e6cb6cbdaa478ea894d.png)

In case you’ve chosen to not use the script manager, you’ll have to manually set `Start Game Script` value in the `Naninovel -> Configuration -> Scripts` menu; it will be set automatically when you add first novel script in the manager otherwise.

![Start Script](https://i.gyazo.com/76e167cb24adfb4d0b454b372f05eb3d.png)

Open the created script in a text editor and add the following text:
```
Hello World!
@stop
```
The first line will print the text "Hello World!" when the game is run and the second is required to gracefully stop script execution.

Enter play mode and start new game to see the result.

## Add Character
Characters in Naninovel can be based on regular and diced sprites, animated Live2D models and 3D meshes; you can add your own implementations as well. For the purpose of this tutorial, we’ll use a sprite implementation. 

Each character is represented by ID and a set of appearances. To add a sprite character, you can either use the character manager GUI (recommended) or place the character’s appearance sprites in a `Resources/Characters/CharacterName` folder, where `CharacterName` is the name of the character. 

If you choose to use the manager GUI, access it with `Naninovel -> Resources -> Characters` menu, add new character record specifying its ID, then double click the ID record (or press button at the and of the record) and add all the appearance sprites to the `Resources` list. Just like with novel scripts, you can drag-drop multiple assets and folders to the list.

![Add Novel Character](https://i.gyazo.com/c8a4f7f987621831b4a2ecb3145a4a07.png)

Let’s assume the added character ID is "Kohaku". Edit novel script to show the added character:
```
@char Kohaku
Hello World!
@stop
```
Run the game and you’ll see one of the character appearance sprites at the center of the screen. When you don’t specify an appearance, either the one named equal to character's ID or "Default" will be chosen by default. To select a specific appearance, add its name after the character ID separated by a dot like this:
```
@char Kohaku.Happy
Hello World!
@stop
```
Given there is an appearance with the name "Happy" added for the character "Kohaku", the corresponding sprite will now be shown instead of the default one.

You can now also associate the printed text with the character by adding its ID followed by a colon before the text:
```
@char Kohaku.Happy
Kohaku: Hello World!
@stop
```
To hide (remove form scene) a character (or any other actor, like background, text printer, etc), use [`@hide`](/api/#hide) action followed by actor ID:
```
@char Kohaku.Happy
Kohaku: Hello World!
@hide Kohaku
@stop
```

## Add Background
Similar to characters, a background can be represented in multiple ways in Naninovel: sprite, animated object, video and scene; custom user implementations are also possible. 

While you can create multiple independent background actors, in a typical VN game you'll usually use just one and transition it to different appearances. To simplify the routine, a `MainBackground` actor is added to the background actors list by default and you don't have to specify the ID every time to change its appearance in novel scripts.

Add sprite background in the same way you’ve added a character: using editor GUI `Naninovel -> Resources -> Backgrounds` (`MainBackground` actor will be chosen automatically) or place the appearance sprites under a `Resources/Backgrounds/MainBackground` folder.

![Add Background](https://i.gyazo.com/98e88780625c7f2e1ef88db7ef10d1f4.png)

Let’s assume the added background appearance sprite is named "City". To show a background, use a [`@back`](/api/#back) action followed by the background appearance name:
```
@back City 
```
When switching between backgrounds a cross-fade [transition effect](/guide/background-transition-effects.md) will be used by default. To change the effect, specify transition type after the appearance name:
```
@back City 
@back School.RadialBlur
```
This will transition "City" to "School" using "RadialBlur" transition effect.

## Add Music and Sound Effects
To add a BGM (background music) or SFX (sound effect) asset, either use `Naninovel -> Resources -> Audio` editor menu (recommended) or place the audio assets inside `Resources/Audio` folder. You can use any audio formats [supported by Unity](https://docs.unity3d.com/Manual/AudioFiles.html).

![Managing Audio](https://i.gyazo.com/cacdec36623dbbfcf9f49c594de53c0f.png)

Let’s assume the added BGM file name is "ThePromenade". To play this track as a background music use [`@bgm`](/api/#bgm) action followed by the name of the track:
```
@bgm ThePromenade
```
A cross-fade effect will be automatically applied when switching the music tracks. The music will loop by default, though you can change this, as well as volume and fade duration using action parameters.

On the contrary, sound effects won't loop by default. Assuming you've added an "Explosion" SFX, use an [`@sfx`](/api/#sfx) action to play it back:
```
@sfx Explosion
```

## Video Guide

In case you prefer following video guides, here is one illustrating the above instructions.

<div class="video-container">
    <iframe src="https://www.youtube-nocookie.com/embed/qarLvnK85Tg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
