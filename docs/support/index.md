# Support

If you have issues with the engine, first make sure to read the [guide](/guide/) and [command reference](/api/) topics related to the feature you're having issues with; also check the [FAQ](/faq/) for some frequently asked questions.

In case you're sure the engine is not working as intended, check if you're running the latest available version. Most recent patches are published on our Discord server; always use them instead of importing the package from Unity's package manager, as the latter is usually outdated.

If upgrading didn't help, try to re-install the package by deleting `Naninovel` folder from the project and re-importing it. Make sure to follow the upgrade instructions specified in the [release notes](/releases/) when upgrading from on older version.

## Issue Tracker

In case the above steps didn't help to resolve the issue, check the [issue tracker](https://github.com/naninovel/docs/issues?q=is%3Aissue+label%3Abug) — chances are the problem is already being worked on.

## Community Forum

Consider joining dedicated [Naninovel forum](https://forum.naninovel.com), where users help each other solve development issues, share best practices and showcase their projects. The issue you're facing could potentially be already solved by other users there; and you can always ask for help, if it's not.

## Unity Support

While we have several video tutorials and example projects showing how to use Unity to achieve some Naninovel-specific goals, please be aware that we are not able to provide any additional guidance or direct support for Unity's built-in tools.

Unity is a standalone product with an enormous set of features; it has its own documentation, support services and vast community, which produced numerous learning materials over the engine's 20+ years lifespan. Usually, you'll be able to easily find a video tutorial, guide or forum thread for any question or issue you may have; and in the rare cases it's not available, you can always ask on the [Unity forum](https://discussions.unity.com) or use one of the official [support options](https://unity.com/support-services).

## Naninovel Support

Our community is primarily based on the Naninovel Discord server: [discord.gg/BfkNqem](https://discord.gg/BfkNqem). Most channels require `Verified User` role for sending messages to prevent spam. Get the role by registering your Naninovel license: [naninovel.com/register](https://naninovel.com/register/).

Feel free to discuss any Naninovel-related topics or ask for help in the `#devtalk` channel. Our support staff may assist in some cases, but if you need dedicated support or a direct communication channel with the developer, subscribe to the [Support Plan](/support/#support-plan).

### Support Plan

Subscribe to Support Plan to receive priority support and access direct communication channel with the engine developers: [account.naninovel.com/support](https://account.naninovel.com/support).

Subscription grants access to the `#support` channel, where requests are typically addressed within 24 hours on business days. Users are also allowed to create private threads for direct communication with our team, including the lead developer.

::: info NOTE
The support is limited to Naninovel-specific topics only. For anything Unity-related (eg, build UIs with uGUI, set up addressable system, write C# scripts, etc) see the [information above](/support/#unity-support).
:::

### Reporting Bugs

If you believe something is not working as intended:

- Provide a clear and concise description of the issue and step-by-step instructions on how to reproduce it.
- Specify Naninovel and Unity versions you're using, target platform (Android, iOS, WebGL, etc) and operating system you're running the editor under (Windows, Mac or Linux).
- Attach a [log file](https://docs.unity3d.com/Manual/LogFiles.html) containing error or warning messages related to the issue.

Attaching a [reproduction project](/support/#reproduction-project) greatly increases the chances to identify and fix the issue as soon as possible.

### Moderation

Basic communication etiquette is expected from all users; any of the following may result in a temporary or even **permanent ban**:

- Threatening, abusive, vulgar, disrespectful or otherwise offensive behaviour;
- Asset Store reviews manipulation (using negative reviews to extort special attention);
- Spam or advertising of products and services not related to Naninovel;
- Illegally sharing copyrighted, personal or sensitive information and assets.

## Reproduction Project

When reporting an issue, we may ask you to share a "repro" project. Reproduction project is a clean new Unity project containing only the **bare minimum** modifications and additional assets required to reproduce the issue.

Follow the steps below to create and share a reproduction project:

1. Create a new Unity project. Make sure you're using the [minimum/recommended Unity version](/guide/compatibility#unity-version); in case the issue is only reproduced in a newer Unity release, [submit a regression report to Unity](https://unity3d.com/unity/qa/bug-reporting).
   ::: info NOTE
   Reproduction project should be a new clean Unity project, not the one you're experiencing the issue with. Do not just copy all the assets from one project to another; it's important to isolate the issue by reproducing it in a clean environment, free from any custom configurations and assets, that are not directly affecting the issue.
   :::
2. Import the latest available Naninovel version; in case a pre-release version is available (via `#download` channel on our Discord server), use it instead.
3. Add the required assets and modify the project to reproduce the issue. Please **keep naninovel scripts as short as possible** and only add assets that are **essential to replicate the issue**. Make sure you're not adding any third-party plugins, extensions or any sort of custom C# scripts. In case a C# script is required for reproduction, ensure it contains only the code required to reproduce the issue.
   ::: warning
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
