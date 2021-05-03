# Введение

::: warn
Это переведенная версия документации. Она может быть неверной или устаревшей. Для получения верной и актуальной версии [перейдите к оригинальной документации](/guide/).
:::

Naninovel – это расширение для [игрового движка Unity](https://unity3d.com). Оно состоит из C# фреймворка и утилит редактора для поддержки разработки [визуальных новелл](https://en.wikipedia.org/wiki/Visual_novel).

[!!lRxIKDU9z4k]

::: note
Хотя Naninovel не ограничивает то, что вы можете достичь с использованием Unity, существуют определённые требования (поддерживаемые версии Unity, конфигурация проекта, целевые платформы) для корректной работы некоторых встроенных функций; обратитесь к [странице совместимости](/ru/guide/compatibility.md) для получения дополнительной информации.
:::

Обязательно прочтите [руководство по началу работы](/ru/guide/getting-started.md) при первом использовании движка.

Если вы ищете конкретную тему, попробуйте воспользоваться строкой поиска, расположенной в верхней части сайта; кроме того, ознакомьтесь с [FAQ](/ru/faq/), где вы можете найти ответы на некоторые часто задаваемые вопросы. Все доступные команды скрипта, поддерживаемые параметры и примеры использования перечислены в [справочнике по API](/ru/api/). Вы также можете обратиться в [службу поддержки](/ru/support/#developer-support), если не можете найти необходимую информацию.

## Функции

Ниже приведены некоторые из функций, которые Naninovel предоставляет «из коробки»:

* [Сценарии на основе документов](/ru/guide/naninovel-scripts.md)
  * [Универсальные текстовые строки](/ru/guide/naninovel-scripts.md#универсальные-текстовые-строки)
  * [Метки](/ru/guide/naninovel-scripts.md#строки-метки)
  * [Подстановка команд](/ru/guide/naninovel-scripts.md#встраивание-команд)
  * [Визуальный редактор](/ru/guide/naninovel-scripts.md#визуальный-редактор)
  * [Горячая перезагрузка](/ru/guide/naninovel-scripts.md#горячая-перезагрузка)
  * [Поддержка IDE (подсветка синтаксиса, автозаполнение и пр.)](/ru/guide/naninovel-scripts.md#поддержка-IDE)
* [Текстовые принтеры](/ru/guide/text-printers.md)
  * [Диалоговый](/ru/guide/text-printers.md#текстовые-принтеры)
  * [Полноэкранный](/ru/guide/text-printers.md#полноэкранный-принтер)
  * [Чат](/ru/guide/text-printers.md#чат-принтер)
  * [Облачный](/ru/guide/text-printers.md#баббл-принтер)
  * [Поддержка TextMesh Pro](/ru/guide/text-printers.html#textmesh-pro)
  * [Поддержка текста Ruby (фуригана)](/ru/guide/text-printers.html#Стили-текста)
* [Персонажи](/ru/guide/characters.md)
  * [Спрайты персонажей](/ru/guide/characters.md#спрайтовые-персонажи)
  * [Нарезанные спрайты персонажей](/ru/guide/characters.md#нарезанные-спрайты-персонажей)
  * [Послойные спрайты персонажей](/ru/guide/characters.md#послойные-персонажи)
  * [Универсальные персонажи](/ru/guide/characters.md#универсальные-персонажи)
  * [Персонажи Live2D](/ru/guide/characters.md#персонажи-Live2D)
  * [Связанными с персонажами цвета сообщений](/ru/guide/characters.md#цвета-сообщений)
  * [Синхронизация движения губ](/ru/guide/characters.md#синхронизация-движений-губ-со-звуком)
* [Фоны](/ru/guide/backgrounds.md)
  * [Спрайтовые фоны](/ru/guide/backgrounds.md#спрайтовые-фоны)
  * [Видеофоны](/ru/guide/backgrounds.md#видео-фоны)
  * [Послойные фоны](/ru/guide/backgrounds.md#послойные-фоны)
  * [Универсальные фоны](/ru/guide/backgrounds.md#универсальные-фоны)
  * [Фоны сцены](/ru/guide/backgrounds.md#фоны-сцен)
* [Эффекты переходов](/ru/guide/transition-effects.md)
* [Перспективная камера и режим кругового обзора](https://youtu.be/rC6C9mA7Szw)
* [Спецэффекты (система FX)](/ru/guide/special-effects.md)
* [Фоновая музыка (BGM)](/ru/guide/audio.md#фоновая-музыка)
* [Звуковые эффекты (SFX)](/ru/guide/audio.md#звуковые-эффекты)
* [Анимации камеры](/ru/api/#camera)
* [Озвучка и автоозвучка](/ru/guide/voicing.md)
* [Видеоролики](/ru/guide/movies.md)
* [Выборы](/ru/guide/choices.md)
* [Пользовательские переменные](/ru/guide/custom-variables.md)
* [Откат состояния](https://youtu.be/HJnOoUrqHis)
* [Выражения сценария](/ru/guide/script-expressions.md)
* [Внутриигровой ввод данных](/ru/api/#input)
* [Вариабельное развитие сценария](/ru/api/#if)
* [Система сохранения-загрузки](/ru/guide/save-load-system.md)
* [Динамическое управление ресурсами (памятью)](https://youtu.be/cFikLjfeKyc)
* [Настройки игры](/ru/guide/game-settings.md)
* [Галерея иллюстраций](/ru/guide/unlockable-items.md#галерея-CG)
* [Разблокируемые подсказки](/ru/guide/unlockable-items.md#подсказки)
* [Кросс-платформенный ввод](/ru/guide/input-processing.md)
* [Бэклог принтера](/ru/guide/text-printers.md#бэклог-принтера)
* [Пропуск текста](/ru/guide/text-printers.md#пропуск-текста)
* [Режим авточтения](/ru/guide/text-printers.md#авточтение-текста)
* [Переключение UI](/ru/guide/user-interface.md#переключение-UI)
* [Адаптивный слой UI](/ru/guide/user-interface.md#адаптивная-вёрстка-UI)
* [Кастомизация UI](/ru/guide/user-interface.md#кастомизация-UI)
* [Управляемый текст](/ru/guide/managed-text.md)
* [Локализация](/ru/guide/localization.md)
  * [Локализация сценариев](/ru/guide/localization.md#локализация-сценариев)
  * [Локализация ресурсов](/ru/guide/localization.md##локализация-ресурсов)
* [Моддинг сообщества](/ru/guide/community-modding.md)
* [Консоль разработчика](/ru/guide/development-console.md)
* [Откат сценария и отладка](/ru/guide/naninovel-scripts.md#отладка-сценариев)
* [Пользовательские команды](/ru/guide/custom-commands.md)
* [Пользовательские реализации акторов](/ru/guide/custom-actor-implementations.md)
* [Интеграция Google Drive](/ru/guide/resource-providers.md#google-drive)
* [Визуальное редактирование сценариев](/ru/guide/visual-scripting.md)
