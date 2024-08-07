# Видеоролики

Видеоролики – это видео, воспроизводимое поверх сцены с помощью пользовательского интерфейса `IMovieUI`, останавливающее выполнение скрипта и обработку пользовательского ввода во время воспроизведения.

Перед началом воспроизведения ролика выполняется переход к указанной текстуре затухания (по умолчанию сплошная черная). Когда воспроизведение завершено, выполняется переход от текстуры затухания к содержимому сцены.

Игрок может пропустить воспроизведение ролика с помощью ввода `Cancel` (`Esc` по умолчанию для автономного модуля ввода); привязка может быть изменена в меню конфигурации ввода.

Для добавления, редактирования и удаления ресурсов видеороликов используйте менеджер роликов, доступный через контекстное меню `Naninovel -> Resources -> Movies`:

![Управление роликами](https://i.gyazo.com/aace59f30f42245fc3ba714d10815d46.png)

Вы можете использовать любые видеоформаты, [поддерживаемые Unity](https://docs.unity3d.com/Manual/VideoSources-FileCompatibility).

Поведение воспроизведения роликов можно настроить с помощью контекстного меню `Naninovel -> Configuration -> Movies`; доступные параметры см. в [руководстве по конфигурации](/ru/guide/configuration#видеороликиs).

Используйте команду [@movie], а следом за ней имя клипа для проигрывания ролика в сценариях Naninovel:

```nani
; Дан клип "Opening", добавленный в ресурсы видеороликов, проиграть его
@movie Opening
```

По умолчанию воспроизводимое видео имеет соотношение сторон 16:9, чтобы предотвратить растягивание. Вы можете изменить это поведение с помощью [переопределения](/ru/guide/user-interface.html#ui-customization) интерфейса `IMovieUI`. Компонент  `Aspect Ratio Fitter`, прикрепленный к игровому объекту `MovieImage`, управляет поведением подгонки.

![](https://i.gyazo.com/38e8b1fc220d5fedd50f62ab855b2e92.png)

## Ограничения WebGL

Из-за ограничений платформы воспроизведение видео на WebGL возможно только в потоковом режиме URI. При создании плеера WebGL все ресурсы видео будут автоматически скопированы в каталог `Assets/StreamingAssets`. Убедитесь, что ваш веб-хостинг настроен так, чтобы предоставлять доступ к локальным файлам из каталога сборки плеера.
