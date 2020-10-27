# Support

If you have issues with the engine, first make sure to read the [guide](/guide/) and [command reference](/api/) topics related to the feature you're having issues with; also check the [FAQ](/faq/) for some frequently asked questions.

In case you're sure the engine is not working as intended, check if you're running the latest available version. You can update the main package inside the Unity editor using [Asset Store window](https://docs.unity3d.com/Manual/AssetStore.html). When using any of the engine extensions, download and import the latest packages:

- [NaninovelLive2D](https://github.com/Naninovel/Live2D/raw/master/NaninovelLive2D.unitypackage)
- [NaninovelPlayMaker](https://github.com/Naninovel/PlayMaker/raw/master/NaninovelPlayMaker.unitypackage)
- [NaninovelAdventureCreator](https://github.com/Naninovel/AdventureCreator/raw/master/NaninovelAdventureCreator.unitypackage)

If updating didn't help, try to re-install the package by deleting `Naninovel` folder from the project and re-importing it from the Asset Store. Make sure to follow upgrade instructions specified on the [release page](https://github.com/Naninovel/Documentation/releases) when updating the engine.

Always **remember to backup your project** (or use a [VCS](https://en.wikipedia.org/wiki/Version_control)) before updating or deleting a package. ~~Haruhi~~ God knows what could happen in the process. `ʕノ•ᴥ•ʔノ ︵ ┻━┻`

## Issue Tracker

In case the above steps didn't help to resolve the issue, check the [issue tracker](https://github.com/Naninovel/Documentation/issues?q=is%3Aissue+label%3Abug) — chances are the problem is already being worked on.

## Community Forum

Consider joining dedicated [Naninovel forum](https://forum.naninovel.com), where users help each other solve development issues, share best practices and showcase their projects. The issue you're facing could potentially be already solved by other users there; and you can always ask for help, if it's not.

## Unity Support

While we have several video tutorials and example projects showing how to use Unity to achieve some Naninovel-specific goals, please be aware that we are not able to provide any additional guidance or direct support for Unity's built-in tools.

Unity is a standalone product with an enormous set of features; it has its own documentation, support services and vast community, which produced numerous learning materials over the engine's more than a decade lifespan. Usually, you'll be able to easily find a video tutorial, guide or forum thread for any question or issue you may have; and in the rare cases it's not available, you can always ask on the [Unity forum](https://forum.unity.com), [Q&A service](https://answers.unity.com/questions/ask.html) or use one of the official [support options](https://unity.com/support-services).

## Developer Support

::: warn
Developer support is limited to Naninovel-specific topics only. For anything Unity-related (build UIs with uGUI, setup addressable system, write C# scripts, etc) see the [information above](/support/#unity-support).
:::

To receive direct developer support join Naninovel Discord server ([discord.gg/BfkNqem](https://discord.gg/BfkNqem)) and register your copy of the asset using the following registration form: [naninovel.com/register](https://naninovel.com/register/).

After the registration you'll automatically get a "Verified User" role on the server and access to the `#support` channel. You can also message `@Elringus#6359` to discuss the issue in private.

<iframe src="https://discordapp.com/widget?id=545676116871086080&theme=dark" width="100%" height="500" allowtransparency="true" frameborder="0"></iframe>

Be aware, that the **developer response may be delayed by up to 24 hours** (in some cases more), so make sure to:
 - Provide a clear and concise description of the issue and step-by-step instructions on how to reproduce it.
 - Specify Naninovel and Unity versions you're using, target platform (Android, iOS, WebGL, etc) and operating system you're running the editor under (Windows, Mac or Linux).
 - Attach a [log file](https://docs.unity3d.com/Manual/LogFiles.html) containing error or warning messages related to the issue.
 
Attaching a [reproduction project](/support/#reproduction-project) greatly increases the chances to identify and fix the issue as soon as possible.

## Reproduction Project

When reporting an issue, we may ask you to share a "repro" project. Reproduction project is a clean new Unity project containing only the **bare minimum** modifications and additional assets required to reproduce the issue. 

Follow the steps below to create and share a reproduction project:

1. Create a new Unity project. Make sure you're using Unity version supported by the [current Naninovel release](https://github.com/Naninovel/Documentation/releases).
::: note
Reproduction project should be a new clean Unity project, not the one you're experiencing the issue with. Do not just copy all the assets from one project to another; it's important to isolate the issue by reproducing it in a clean environment, free from any custom configurations and assets, that doesn't directly affect the issue.
:::
2. Import the latest available Naninovel version from the Asset Store; in case a pre-release version is available (via `#download` channel of our Discord server), use it instead.
3. Add the required assets and modify the project to reproduce the issue. Please **keep naninovel scripts as short as possible** and only add assets that are **essential to replicate the issue**. Make sure you're not adding any third-party plugins, extensions or any sort of custom C# scripts. In case a C# script is required for reproduction, ensure it contains only the code required to reproduce the issue.
::: warn
Do not modify contents or add/delete anything inside the `Naninovel` folder; we're not providing support for modified versions of the package.
:::
4. Create a "repro.txt" text file at the root project directory and specify step-by-step instructions on how to reproduce the issue, eg:

```
1. Open scene "SampleScene".
2. Enter play mode in the editor.
3. Start a new game.
4. Play through to the line number 15.
5. Save and load the game.
```

Then add what you've expected to happen and what is actually happening, eg:

```
Expected: Music "Ambient" should start playing.
Actual: No music is playing.
```

5. Close Unity editor and remove all the files and folders at the root project directory, except the previously created "repro.txt" file and "Assets", "Packages" and "ProjectSettings" folders. Most importantly, **make sure to delete "Library" folder**, as it contains a lot of auto-generated files, which significantly increase project size.
6. Archive (zip) the project folder and either attach it to a private message in Discord or upload to a private file hosting (eg, Google Drive with a restricted access).

Remember to share reproduction projects only via private messages; **never share the projects via public channels** to prevent leaking personal data and copyrighted assets.
