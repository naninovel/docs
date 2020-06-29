# Adventure Creator

[Adventure Creator](https://www.adventurecreator.org/) позволяет вам создавать традиционные 2D, 2.5D и 3D-приключенческие игры – те, в основе которых лежат повествование, исследование и головоломки: такие, как Monkey Island, Grim Fandango, The Longest Journey и The Walking Dead от Telltale.

![](https://i.gyazo.com/74a12fa535198cb26a87a5037b15a988.jpg)

Вы можете использовать Naninovel для реализации сцен диалога в AC или подгрузить AC в игру на базе Naninovel для какого-либо пользовательского геймплея.

## Установка

Установите Adventure Creator и Naninovel (порядок установки не имеет значения).

Скачайте и импортируйте [пакет расширения Adventure Creator](https://github.com/Elringus/NaninovelAdventureCreator/raw/master/NaninovelAdventureCreator.unitypackage).

Назначьте `NaninovelAdventureCreator/Runtime/Actions` в качестве источника для пользовательских действий в настройках AC. Обратитесь к [руководству по AC](https://www.adventurecreator.org/tutorials/writing-custom-action) для дополнительной информации о пользовательских действиях.

![](https://i.gyazo.com/59a162751411ec60a7cf5ad89e9a66ec.png)

Теперь вы должны увидеть действие "Play Naninovel Script", доступное в категории "Custom".

![](https://i.gyazo.com/faf33afa1df8ff98ea04ef9cf1a44f8f.png)

В зависимости от настроек вам может потребоваться назначить специальный слой для объектов Naninovel, чтобы предотвратить их визуализацию камерами AC и наоборот. Это можно сделать через окно конфигурации движка Naninovel.

![](https://i.gyazo.com/ed765928c0420ec2b1e26d6bf4a66e6c.png)

При использовании Naninovel в качестве встроенной? системы для игры на базе AC вы также можете отключить опции `Initialize On Application Load` и `Show Title UI` в конфигурации движка.

## Использование

Используйте пользовательское действие AC `Play Naninovel Script` для (опционального) отключения AC, инициализации движка Naninovel (при необходимости) и загрузки указанного скрипта Naninovel. По умолчанию камеры AC и Naninovel также будут автоматически меняться местами, но вы можете предотвратить это, отключив свойство `Swap Cameras`.

Используйте пользовательскую команду Naninovel `@turnOnAC` в сценарии Naninovel для включения AC, сброса состояния движка Naninovel (опционально) и замены камер обратно (также опционально). Сброс состояния контролируется с помощью параметров `reset`, а замена камер – с помощью параметров `swapCameras`.

Use `@turnOnAC` custom Naninovel command in a Naninovel script to enable AC, reset Naninovel engine state (optionally) and swap the cameras back (also optionally). State reset is controlled with `reset` and camera swap with `swapCameras` parameters.

Следующее видео демонстрирует сцену AC с интегрированным Naninovel для обработки диалога.

[!!7tOIFZRSAec]

::: example
Смотрите [проект GitHub](https://github.com/Elringus/NaninovelAdventureCreator) для примера интеграции. При первом открытии проекта возникнут ошибки из-за отсутствия пакетов Adventure Creator и Naninovel. Импортируйте их из хранилища активов для исправления данных ошибок.
:::