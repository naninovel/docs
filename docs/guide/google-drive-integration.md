# Google Drive Integration

Implemented via an open source (MIT license) third-party package [UnityGoogleDrive](https://github.com/Elringus/UnityGoogleDrive) the feature allows using [Google Drive](https://www.google.com/drive) as the provider for the following resources: 

* naninovel scripts and managed text (via Google Documents)
* characters and backgrounds (sprite implementation only)
* BGM, SFX and voice

In order to be able to choose Google Drive as the resource provider you have to first install [UnityGoogleDrive](https://github.com/Elringus/UnityGoogleDrive) and Unity's [Conditional Compilation Utility](https://github.com/Unity-Technologies/ConditionalCompilationUtility). Consult projects' readme for installation and usage instructions. 

When the required third-party packages are installed and configured, set `Google Drive Root Path` (folder in the root of your drive where you'll store the resource files) in the provider configuration and select the `Google Drive` provider for target resource type in the configuration manager accessible via `Naninovel -> Configuration` context menu.

![Google Drive Configuration](https://i.gyazo.com/beb9bc6a828a6df6d9b41c3378068020.png)
![Select Google Drive Provider](https://i.gyazo.com/4f1984448352841142f4ad495a3a6697.png)

You can share your Google Drive resources folder with other users to work in collaboration without the need to use version control systems or other complicated tools.
