# Настройки игры

Настройки игры можно изменить в любое время с помощью меню настроек.

![](https://i.gyazo.com/8ef1044cb0b8429298af05e6275ff14d.mp4)

Изменение локали требует перезапуска игры для того, чтобы изменения вступили в силу. Другие изменения вступят в силу немедленно.

Параметры сериализуются в файле `Settings.json`, который хранится в каталоге игры. Имя файла можно настроить с помощью контекстного меню `Naninovel -> Configuration -> State`; доступные параметры см. в [руководстве по конфигурации](/ru/guide/configuration#состояние).

![Конфигурация состояния](https://i.gyazo.com/606bb86f6cac2cc2275ca8912f2e6d17.png)

В WebGL настройки сериализуются с помощью кросс-браузера [IndexedDB API](https://en.wikipedia.org/wiki/Indexed_Database_API).

Интерфейс меню может быть настроен или полностью заменён с помощью функции [кастомизации UI](/ru/guide/user-interface#кастомизация-UI).
