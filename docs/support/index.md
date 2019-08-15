# Support

If you have issues with the engine, make sure you're using the latest available version. You can update the main package inside the Unity editor using [Asset Store window](https://docs.unity3d.com/Manual/AssetStore.html). In case you're using any of the engine extensions, download the latest packages using following links:

- [NaninovelLive2D](https://github.com/Elringus/NaninovelLive2D/raw/master/NaninovelLive2D.unitypackage)
- [NaninovelSpriteDicing](https://github.com/Elringus/NaninovelSpriteDicing/raw/master/NaninovelSpriteDicing.unitypackage)
- [NaninovelTMPro](https://github.com/Elringus/NaninovelTMPro/raw/master/NaninovelTMPro.unitypackage)
- [NaninovelPlayMaker](https://github.com/Elringus/NaninovelPlayMaker/raw/master/NaninovelPlayMaker.unitypackage)

If updating didn't help, try to re-install the package by deleting `Naninovel` folder from the project and re-importing it from the Asset Store.

Always **remember to backup your project** (or use a [VCS](https://en.wikipedia.org/wiki/Version_control)) before updating or deleting a package. ~~Haruhi~~ God knows what could happen in the process. `ʕノ•ᴥ•ʔノ ︵ ┻━┻`

## Issue Tracker

In case the above steps didn't help to resolve the issue, check the [issue tracker](https://github.com/Elringus/NaninovelWeb/issues?q=is%3Aissue+label%3Abug) — chances are the problem is already being worked on; and if it's not, let us know by creating a [bug report](https://github.com/Elringus/NaninovelWeb/issues/new?labels=bug&template=bug_report.md).

## Developer Support

To receive direct developer support join Naninovel Discord server ([discord.gg/avhRzP3](https://discord.gg/avhRzP3)) and register your copy of the asset using the following registration form: [naninovel.com/register](https://naninovel.com/register/).

After the registration you'll automatically get a "Verified User" role on the server and access to the `#support` channel. You can also message `@Elringus#6359` to discuss the issue in private.

<iframe src="https://discordapp.com/widget?id=545676116871086080&theme=dark" width="100%" height="500" allowtransparency="true" frameborder="0"></iframe>

## Reproduction Project

When reporting an issue, we may ask you to share a "repro" project. Reproduction project is a clean new Unity project containing only the **bare minimum** modifications and additional assets required to reproduce the issue. 

Follow the steps below to create and share a reproduction project:

1. Create a new Unity project. Make sure you're using Unity version supported by the [current Naninovel release](https://github.com/Elringus/NaninovelWeb/releases).
2. Import the latest available Naninovel version from the Asset Store (in case a pre-release version is available, use it instead).
3. Add the required assets and modify the project to reproduce the issue. Please keep naninovel scripts as short as possible and only add assets that are essential to replicate the issue.
4. Close Unity editor, open the root project directory. Remove all the files and folders, except `Assets`, `Packages` and `ProjectSettings`. Most importantly, **make sure you've deleted the `Library` folder**, as it contains a lot of auto-generated files.
5. Archive (zip) the project folder and either upload it to Google Drive or attach to a private message in Discord.

With the project itself, please also share a step-by-step instruction on how to reproduce the issue, eg:

```
1. Open scene *SampleScene*.
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

Remember to share the reproduction projects only via **private messages**; never share links to a project in the public channels.
