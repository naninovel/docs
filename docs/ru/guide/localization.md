# Локализация

Все игровые ресурсы (сценарии, аудио, озвучка, фоны и т.д.) могут быть локализованы для разных языков.

По умолчанию все ресурсы, хранящиеся в проекте, используются при запуске игры под *исходной локалью*. Например, представьте, что вы изначально создаёте игру на английском языке: все оригинальные (исходные) Naninovel скрипты, UI, знаки на фонах и т.д. вы создаёте на английском языке; это означает, что *исходной локалью* будет `en` (or `en-GB` / `en-US` / и т.д. в случае, если вы хотите использовать отдельные локали для конкретных регионов).

*Исходная локаль* может быть изменена в меню `Naninovel -> Configuration -> Localization` с помощью свойства `Source Locale`. Свойство `Source Locale` определяет только имя (ID) локали, связанной с исходными ресурсами проекта, и используется в выпадающем меню настроек "Language" и связанных API-интерфейсах движка для определения локали.

Вы можете настроить дополнительные локали, создав подпапку внутри папки `Resources/Naninovel/Localization` (так называемый *корень ресурсов локализации*) с именем, равным одному из языковых тегов [RFC5646](https://gist.github.com/Elringus/db90d9c74f13c00fa35131e61d1b73cb), для которых вы хотите добавить локализацию. Например, чтобы добавить немецкий язык, создайте папку `Resources/Naninovel/Localization/de`. Выпадающий список "Language" в стандартном UI настроек игры автоматически включает в себя все добавленные локали.

Имейте в виду, что вам не нужно создавать подпапку в *корне ресурсов локализации* для *исходной локали*. Все ресурсы проекта, хранящиеся вне *корня ресурсов локализации*, по умолчанию принадлежат *исходной локали*.

Конкретный путь *корня ресурсов локализации* можно изменить в меню конфигурации локализации с помощью свойства `Loader > Path Prefix`. Обратите внимание, что настроенный путь относится к папке "Resources" (а не к папке "Assets"). Папки ресурсов Unity [обрабатывает особым образом](https://docs.unity3d.com/Manual/LoadingResourcesatRuntime.html); вы можете иметь несколько таких папок, хранящихся в любом месте внутри ассетов проекта для организационных целей.

Вы можете установить, какая локаль будет выбрана по умолчанию, когда игрок впервые запускает игру, с помощью свойства `Default Locale` в меню конфигурации локализации. Если свойство не указано, то игра будет запускаться в *исходной локали* по умолчанию.

![](https://i.gyazo.com/fb50a8c5f5fa6624105f8eeca6a7523e.png)

## Локализация ресурсов

Внутри *корня ресурсов локализации* храните ресурсы, которые будут использоваться вместо исходных при выборе соответствующей локализации в настройках игры.

Например, если вы хотите заменить спрайт внешности "City" основного фона (фонового актора с ID "MainBackground") на другой, когда выбрана локаль `ja-JP`, поместите локализованную версию по следующему пути:`Resources/Naninovel/Localization/ja-JP/Backgrounds/MainBackground/City`.

## Локализация сценариев

Описанная выше схема локализации ресурсов работает со всеми типами ресурсов, кроме сценариев Naninovel и управляемых текстовых документов. Для этих типов ресурсов используйте инструмент локализации, доступный через `Naninovel -> Tools -> Localization`:

![Инструмент локализации](https://i.gyazo.com/5c6b023cbf4617f44102593f13131571.png)

Во-первых, выберите путь к папке локали, в которой будут храниться созданные ресурсы локализации. Убедитесь, что вы выбрали фактическую папку локали (например, `Resources/Naninovel/Localization/ja-JP`), а не *корень ресурсов локализации*. Метка под полем свойства будет указывать, когда выбрана допустимая папка локали вывода, отображая имя выбранного целевого объекта локализации.

Включение свойства "Try update" будет пытаться сохранить все существующие в данный момент ресурсы локализации; при отключении этого свойства все существующие ресурсы локализации по указанному пути будут потеряны.

Включение функции "Localize text" также создаст [управляемые текстовые](/ru/guide/managed-text) документы локализации. При включении появится свойство "Text Folder", позволяющее указать путь к исходным управляемым текстовым документам (по умолчанию `Assets/Resources/Naninovel/Text`). Можно задать путь к папке, содержащей локализованную версию текстовых документов, чтобы создать вариант локализации, использующий не исходный язык.

Нажмите кнопку "Generate", чтобы создать (обновить) ресурсы локализации.

Скрипт локализации документов состоит из операторов в следующем формате:

```nani
# ID
; Исходный текст
Переведнный текст
```

`# ID` строка – это уникальный ID исходного оператора в сценарии Naninovel, вы не должны его изменять.

`; Source text` строка – это исходный текст, который вы должны перевести. Это просто комментарий, поэтому изменение этой строки не будет иметь никакого эффекта; это предусмотрено для удобства.

Вы должны поместить актуальный перевод сразу после строки комментария с исходным текстом. Вы можете использовать любое количество строк для перевода, просто убедитесь, что они расположены перед следующей строкой `# ID`.

Вот пример перевода обычной текстовой строки:

```nani
# f63f03ea
; Yuko: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut ultricies enim, id venenatis arcu. Nullam rhoncus eros eu ante vulputate tempus.
Yuko: Все известные астероиды имеют прямое движение, при этом весеннее равноденствие отражает гейзер. Уравнение времени однократно. Большая Медведица, оценивая блеск освещенного металлического шарика, пространственно притягивает первоначальный метеорный дождь.
```

Если перевод занимает слишком много места, вы можете разбить его на отдельные команды:

```nani
# f63f03ea
; Yuko: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut ultricies enim, id venenatis arcu. Nullam rhoncus eros eu ante vulputate tempus.
Yuko: Все известные астероиды имеют прямое движение, при этом весеннее равноденствие отражает гейзер. Уравнение времени однократно.
Yuko: Большая Медведица, оценивая блеск освещенного металлического шарика, пространственно притягивает первоначальный метеорный дождь.
```

Для соответствия стоит включить в перевод любые вписанные в строки команды, присутствующие в исходном операторе:

```nani
# b53b395d
; Kohaku: Qui ante molestie sit tempor felis.[br 2][char Kohaku.Casual/Angry][style #ff0000,bold,45]Adipiscing elit?[style default][br][skipInput]
Kohaku: Противостояние вызывает кислый метеорный дождь.[br 2][char Kohaku.Casual/Angry][style #ff0000,bold,45]Меандр разрушаем?[style default][br][skipInput]
```

::: warning
Вы **не должны переводить ID персонажей** (или любые другие ID акторов). Если вы сделаете это, некоторые функции (например, подсветка персонажей и синхронизация губ) будут сломаны. Если вы хотите перевести имена авторов, отображаемые в текстовых принтерах, используйте вместо этого функцию [отображаемых имён](/ru/guide/characters#display-names).
:::

Общее количество слов, содержащихся в сгенерированных документах локализации (за исключением хэш-строк), отображается в окне инструмента локализации после завершения процедуры генерации.

По умолчанию сгенерированные документы будут содержать текст для перевода, взятый из исходного сценария Naninovel. Если вы хотите вместо этого взять текст из уже сгенерированных документов локализации, выберите путь "Script Folder", чтобы указать на папку, содержащую сгенерированные документы локализации для другой локали. Например, предположим, что ваша исходная локаль выполнена на испанском. По умолчанию документы локализации будут содержать исходный текст на испанском языке. Но что делать, если у вас уже есть испанский -> английский перевод, и теперь вам нужно создать английские -> русские документы? Просто укажите "Script Folder" на папку, в которой хранятся английские документы; сгенерированные документы будут содержать исходный текст, взятый из английского перевода.

::: tip EXAMPLE
Пример настройки локализации вы можете найти в [демонстрационном проекте](/ru/guide/getting-started#demo-project). Вы можете использовать его в качестве примера в случае возникновения проблем с настройкой локализации в вашем собственном проекте.
:::
