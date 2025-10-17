# Support

The best place to start when you need help is our official Discord server: [discord.gg/BfkNqem](https://discord.gg/BfkNqem).

You're welcome to ask for help or advice in the `#devtalk` channel, explore tutorials and guides in `#wiki`, or just hang out and chat with fellow Naninovel users in `#general`.

If you have an active [Support Plan](/support#support-plan), you'll also gain access to the `#support` channel, where the Naninovel team provides direct assistance. The first year of the Support Plan is free when you [register your license](https://account.naninovel.com).

## Support Plan

The Support Plan provides access to dedicated support on our Discord server and includes:

- Priority responses to technical issues and troubleshooting requests in the `#support` channel
- Access to the engine source code repository on GitHub, where you can track the development process
- Access to the UPM repository with the latest preview and stable release branches, allowing you to install and update Naninovel directly from GitHub
- Access to a project with advanced samples and demo scenes

A free one-year Support Plan is included when you [register your license](https://account.naninovel.com). After that, you can renew your subscription anytime through your [account dashboard](https://account.naninovel.com/support).

::: info NOTE
The Support Plan is completely optional — you'll continue to have lifetime access to all future stable Naninovel releases via the [download archive](https://account.naninovel.com/download) even without it, and community support remains available in the `#devtalk` channel, where you can always ask questions and get help.
:::

## Reporting Bugs

If you believe something is not working as intended, let us know on [Discord](https://discord.gg/BfkNqem) in the `#support` channel (if you have an active [Support Plan](/support#support-plan)) or the `#devtalk` channel.

Before submitting a report, please:

- Check the [guide](/guide/), [command reference](/api/), and [FAQ](/faq/) for the feature or use case you're experiencing an issue with — chances are you're missing something.
- Ensure you're running the latest available Naninovel version. The most recent patches are available via the [UPM registry](/guide/getting-started#install-from-github); packages distributed on the Asset Store and download archive are often outdated.
- If you recently upgraded from a previous Naninovel release, make sure to follow the upgrade instructions in the [release notes](/releases/).
- Try clearing Unity's cache by deleting the `Library` folder in your project root and restarting the editor.
- Make sure the issue actually stems from Naninovel and not another third-party plugin or Unity itself; in which case, [contact Unity support](https://unity.com/support-services).

When reporting a bug:

- Provide a clear, concise description of the issue and how to reproduce it step by step.
- Include your Naninovel version, Unity version, target platform (Android, iOS, WebGL, etc.), and operating system (Windows, macOS, or Linux).
- Attach a [log file](https://docs.unity3d.com/Manual/LogFiles.html) with any relevant errors or warnings.

## Reproduction Project

When reporting an issue, you may be asked to provide a small Unity project that reproduces it.
A reproduction project should be **a new, clean Unity project** containing only the **bare minimum** modifications needed to show the problem.

Follow these steps:

1. Create a new Unity project. Make sure it's using a [supported Unity version](/guide/compatibility#unity-version).
2. Install the latest available Naninovel version. Don't modify or add anything inside the package folder — we can't support altered versions of the package.
3. Add the assets and scripts required to reproduce the issue. Make sure to not copy the entire existing project — start fresh and reproduce the issue in isolation. Avoid third-party plugins or unnecessary content.
4. Create a `repro.txt` file in the project root with step-by-step instructions and a short description of what you expected versus what actually happens. For example:
    ```
    1. Open scene "Assets/Scenes/SampleScene".
    2. Enter play mode in the editor.
    3. Start a new game.
    4. Play through to line number 15.
    5. Save and load the game.

    Expected: Music "Ambient" should start playing.
    Actual: No music is playing.
    ```
5. Delete the `Library` folder to reduce project size, then zip the project folder.
6. Share it privately via a Discord DM with the Naninovel team member that requested the reproduction project. Don't share the project via public channels, as it may contain personal or copyrighted assets.
