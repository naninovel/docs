# FAQ

## Возможно ли использовать Naninovel в качестве диалоговой системы для уже существующих проектов?

Хотя Naninovel в первую очередь предназначена для игр в жанре визуальный роман, возможна её интеграция с проектами других жанров. Если вы работаете над 3D-адвенчурой, ролевой игрой или любым другим жанром — вы можете использовать Naninovel в качестве диалоговой системы.

Имейте ввиду, что в большинстве случаев подобная интеграция потребует написания кода на C# (или [визуального программирования](/guide/bolt.md)). Для дополнительной информации смотрите [обзор архитектуры движка](/guide/engine-architecture.md) и обзор [опций по интеграции](/guide/integration-options.md).

## Возможно ли встроить мини-игру в Naninovel?

Безусловно, вы можете свободно встраивать любую дополнительную логику в стандартные системы движка. В большинстве случаев, однако, это потребует написания кода на C# (или [визуального программирования](/guide/bolt.md)). Смотрите руководство по [сервисам движка](/guide/engine-services.md), где можно найти API, позволяющие взаимодействовать с движком; также обратите внимание на руководства по [использованию состояний](/guide/state-management.md#custom-state), [пользовательских имплентаций акторов](/guide/custom-actor-implementations.md) и [пользовательских команд](/guide/custom-commands.md).

## Могу ли я использовать определенный язык при написании сценариев?

Naninovel может работать с любым языком, однако для того, чтобы показать текст на некоторых языках, может потребоваться совместимый шрифт. Шрифт от Google [Roboto](https://fonts.google.com/specimen/Roboto) используется по умолчанию во всех встроенных UI и поддерживает все латинские, кириллические и греческие символы в системе Unicode 7.0. Вы можете изменить шрифт в любом UI с помощью [кастомизации интерфейса](/guide/user-interface.md#ui-customization); для кастомизации шрифта в выводимых сообщениях создайте [пользовательский принтер](/guide/text-printers.md#adding-custom-printers). 

Если вы стремитесь реализовать поддержку как можно большего количества языков на базе единого шрифта, обратите внимание на шрифты [Noto](https://www.google.com/get/noto/).

## Получу ли я доступ к исходному коду после покупки Naninovel?

Весь код движка распространяется в исходном виде вместе с пакетом. Пара библиотек ([NCalc](https://github.com/ncalc/ncalc) и [NLayer](https://github.com/naudio/NLayer)) пре-компилированы, однако их исходный код доступен под свободной лицензией MIT на GitHub.

## Почему в пакете отсутствуют демо-сцены?

Дизайн Naninovel подразумевает [независимость от сцен](/guide/engine-architecture.md#scene-independent). Движок не использует [Unity-сцены](https://docs.unity3d.com/Manual/CreatingScenes.html) ни в каком виде, поэтому какие-либо демо-сцены создать невозможно. Движок автоматически инициализируется при запуске приложения (можно переключить на ручную инициализацию в окне конфигурации), а сценарии создаются в специальных текстовых [документах-скриптах](/guide/naninovel-scripts.md).

Пожалуйста, ознакомьтесь с [руководством по началу работы](/ru/guide/getting-started.md) перед использованием движка. Примеры использования различных функций движка и команд можно найти в [статья](/guide/index.md) и [руководстве по командам](/api/index.md). Если вам необходим готовый проект, который можно было бы использовать как пример, обратите внимание на [демо-проект](/ru/guide/getting-started.html#demo-project).

## How to customize the title (main) menu: add background, music, effects, change buttons, etc?

For the UI part (changing/adding buttons or panel layout and style) use the [UI customization](/guide/user-interface.md#ui-customization) feature; for everything else set `Title Script` at the scripts configuration menu (`Naninovel -> Configuration -> Scripts`) and use script commands to setup the scene just like when writing a scenario. The title script will be automatically played when entering the title menu.

## How to remove a sky background appearing by default in all the Unity scenes?

Remove `Skybox Material` in  `Window -> Rendering -> Lighting Settings` editor menu.

When you remove the skybox, camera's background color will be used instead to fill the screen when no objects are visible. You can change that color (as well as other related settings) by creating a camera prefab and assigning it to `Custom Camera Prefab` property found inside `Naninovel -> Configuration -> Camera` menu. 

## How to add a line break to the message?

Check out [`[br]` command](/api/#br).

## How to inject a command in the midst of a printed text message?

Use [command inlining](/guide/naninovel-scripts.md#command-inlining).

## How to make actors appear in front of each other (z-sorting)?

Use positioning over z-axis, eg:

```
; Make Sora appear at the bottom-center and in front of Felix
@char Sora pos:50,0,-1
@char Felix pos:,,0
```

## Is it possible to show only the avatar of a character inside a text printer, but hide the character itself?

Set `visible:false` for the character you wish to hide; the avatar will remain visible, eg:

```
@char CharId visible:false
```

In case you're constantly changing avatars while the character itself should remain hidden, consider disabling `Auto Show On Modify` in the characters configuration menu; when disabled, you won't have to specify `visible:false` to change any parameters of the character while it's hidden.

## I'd like to use backgrounds with a non-standard resolution (eg, 2048x1024), but they look cropped.

Set `Reference Resolution` at the camera configuration menu (`Naninovel -> Configuration -> Camera`) equal to the backgrounds resolution. Also, make sure the background textures are imported with the [correct settings](https://docs.unity3d.com/Manual/class-TextureImporter) (eg, `Max Size` is high enough).

## How to handle different aspect ratios of the target platforms?

For standalone (PC, Mac, Linux) builds you can select the available aspect ratios in the [player settings](https://docs.unity3d.com/Manual/class-PlayerSettingsStandalone.html#Resolution); for web, consoles and mobiles you can't force a specific aspect ratio and have to adapt for the target devices instead. 

Given the source textures (background sprites) of a specific resolution, the only options to "adapt" them for a different aspect ratio are: resize (will distort the image), add black bars or crop. The least noticeable option is to crop, obviously. Naninovel will automatically do the cropping, when `Auto Correct Ortho Size` is enabled in the camera configuration menu and display aspect ratio is different from the `Reference Resolution` aspect set in the same menu. The auto correction will ensure, that the user won't see any black bars or distortions, no matter which display or device is used to run the game.

To manually handle the aspect ratio differences (eg, if you prefer to add black bars or resize the images instead of cropping), disable `Auto Correct Ortho Size` option in the camera configuration menu. You can then control orthographic size of the camera used by Naninovel with `CameraManager` [engine service](/guide/engine-services.md).

## How to run a custom C# code from naninovel scripts?

Use [custom commands](/guide/custom-commands.md).
