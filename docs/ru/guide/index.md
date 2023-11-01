# Введение

::: warning
Это переведенная версия документации. Она может быть неверной или устаревшей. Для получения верной и актуальной версии [перейдите к оригинальной документации](/guide/).
:::

Naninovel – это расширение для [игрового движка Unity](https://unity3d.com). Оно состоит из C# фреймворка и утилит редактора для поддержки разработки [визуальных новелл](https://en.wikipedia.org/wiki/Visual_novel).

![](https://www.youtube.com/watch?v=lRxIKDU9z4k)

::: info NOTE
Хотя Naninovel не ограничивает то, что вы можете достичь с использованием Unity, существуют определённые требования (поддерживаемые версии Unity, конфигурация проекта, целевые платформы) для корректной работы некоторых встроенных функций; обратитесь к [странице совместимости](/ru/guide/compatibility) для получения дополнительной информации.
:::

Обязательно прочтите [руководство по началу работы](/ru/guide/getting-started) при первом использовании движка.

Если вы ищете конкретную тему, попробуйте воспользоваться строкой поиска, расположенной в верхней части сайта; кроме того, ознакомьтесь с [FAQ](/ru/faq/), где вы можете найти ответы на некоторые часто задаваемые вопросы. Все доступные команды скрипта, поддерживаемые параметры и примеры использования перечислены в [справочнике по API](/ru/api/). Вы также можете обратиться в [службу поддержки](/ru/support/#developer-support), если не можете найти необходимую информацию.

## Функции

Ниже приведены некоторые из функций, которые Naninovel предоставляет «из коробки»:

* [Сценарии на основе документов](/ru/guide/naninovel-scripts)
  * [Универсальные текстовые строки](/ru/guide/naninovel-scripts#универсальные-текстовые-строки)
  * [Метки](/ru/guide/naninovel-scripts#строки-метки)
  * [Подстановка команд](/ru/guide/naninovel-scripts#встраивание-команд)
  * [Визуальный редактор](/ru/guide/naninovel-scripts#визуальный-редактор)
  * [Горячая перезагрузка](/ru/guide/naninovel-scripts#горячая-перезагрузка)
  * [Поддержка IDE (подсветка синтаксиса, автозаполнение и пр.)](/ru/guide/naninovel-scripts#поддержка-IDE)
* [Текстовые принтеры](/ru/guide/text-printers)
  * [Диалоговый](/ru/guide/text-printers#текстовые-принтеры)
  * [Полноэкранный](/ru/guide/text-printers#полноэкранный-принтер)
  * [Чат](/ru/guide/text-printers#чат-принтер)
  * [Облачный](/ru/guide/text-printers#баббл-принтер)
  * [Поддержка TextMesh Pro](/ru/guide/text-printers.html#textmesh-pro)
  * [Поддержка текста Ruby (фуригана)](/ru/guide/text-printers.html#Стили-текста)
* [Персонажи](/ru/guide/characters)
  * [Спрайты персонажей](/ru/guide/characters#спрайтовые-персонажи)
  * [Нарезанные спрайты персонажей](/ru/guide/characters#нарезанные-спрайты-персонажей)
  * [Послойные спрайты персонажей](/ru/guide/characters#послойные-персонажи)
  * [Универсальные персонажи](/ru/guide/characters#универсальные-персонажи)
  * [Персонажи Live2D](/ru/guide/characters#персонажи-Live2D)
  * [Связанными с персонажами цвета сообщений](/ru/guide/characters#цвета-сообщений)
  * [Синхронизация движения губ](/ru/guide/characters#синхронизация-движений-губ-со-звуком)
* [Фоны](/ru/guide/backgrounds)
  * [Спрайтовые фоны](/ru/guide/backgrounds#спрайтовые-фоны)
  * [Видеофоны](/ru/guide/backgrounds#видео-фоны)
  * [Послойные фоны](/ru/guide/backgrounds#послойные-фоны)
  * [Универсальные фоны](/ru/guide/backgrounds#универсальные-фоны)
  * [Фоны сцены](/ru/guide/backgrounds#фоны-сцен)
* [Эффекты переходов](/ru/guide/transition-effects)
* [Перспективная камера и режим кругового обзора](https://youtu.be/rC6C9mA7Szw)
* [Спецэффекты (система FX)](/ru/guide/special-effects)
* [Фоновая музыка (BGM)](/ru/guide/audio#фоновая-музыка)
* [Звуковые эффекты (SFX)](/ru/guide/audio#звуковые-эффекты)
* [Анимации камеры](/ru/api/#camera)
* [Озвучка и автоозвучка](/ru/guide/voicing)
* [Видеоролики](/ru/guide/movies)
* [Выборы](/ru/guide/choices)
* [Пользовательские переменные](/ru/guide/custom-variables)
* [Откат состояния](https://youtu.be/HJnOoUrqHis)
* [Выражения сценария](/ru/guide/script-expressions)
* [Внутриигровой ввод данных](/ru/api/#input)
* [Вариабельное развитие сценария](/ru/api/#if)
* [Система сохранения-загрузки](/ru/guide/save-load-system)
* [Динамическое управление ресурсами (памятью)](https://youtu.be/cFikLjfeKyc)
* [Настройки игры](/ru/guide/game-settings)
* [Галерея иллюстраций](/ru/guide/unlockable-items#галерея-CG)
* [Разблокируемые подсказки](/ru/guide/unlockable-items#подсказки)
* [Кросс-платформенный ввод](/ru/guide/input-processing)
* [Бэклог принтера](/ru/guide/text-printers#бэклог-принтера)
* [Пропуск текста](/ru/guide/text-printers#пропуск-текста)
* [Режим авточтения](/ru/guide/text-printers#авточтение-текста)
* [Переключение UI](/ru/guide/user-interface#переключение-UI)
* [Адаптивный слой UI](/ru/guide/user-interface#адаптивная-вёрстка-UI)
* [Кастомизация UI](/ru/guide/user-interface#кастомизация-UI)
* [Управляемый текст](/ru/guide/managed-text)
* [Локализация](/ru/guide/localization)
  * [Локализация сценариев](/ru/guide/localization#локализация-сценариев)
  * [Локализация ресурсов](/ru/guide/localization##локализация-ресурсов)
* [Моддинг сообщества](/ru/guide/community-modding)
* [Консоль разработчика](/ru/guide/development-console)
* [Откат сценария и отладка](/ru/guide/naninovel-scripts#отладка-сценариев)
* [Пользовательские команды](/ru/guide/custom-commands)
* [Пользовательские реализации акторов](/ru/guide/custom-actor-implementations)
* [Интеграция Google Drive](/ru/guide/resource-providers#google-drive)
* [Визуальное редактирование сценариев](/ru/guide/visual-scripting)
