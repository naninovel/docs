# Playmaker

[PlayMaker](https://assetstore.unity.com/packages/tools/visual-scripting/playmaker-368) – популярный визуальный сценарный инструмент Unity, специально разработанный для удобства работы пользователей, не являющихся программистами. 

![](https://i.gyazo.com/0a5b219b059fd61c85d225e903d77857.png)

Имейте в виду, что в отличие от Bolt, где все C# API Naninovel доступны по умолчанию, PlayMaker требует создания специального класса C# для каждого действия. Это означает, что только ограниченное подмножество API движка доступно из коробки при использовании PlayMaker. Доступные пользовательские действия также могут нарушиться в случае изменения API Naninovel.

## Установка

Установите PlayMaker, следуя инструкциям из [официального руководства](https://hutonggames.fogbugz.com/default.asp?W11).

Скачайте и импортируйте [пакет расширения PlayMaker](https://github.com/Elringus/NaninovelPlayMaker/raw/master/NaninovelPlayMaker.unitypackage).

Пользовательские действия Naninovel должны появиться в браузере действий PlayMaker в категории "Naninovel".

![](https://i.gyazo.com/a40b0b7b21c73d3b5f64b005085198ea.png)

## Использование

В следующем видео демонстрируется использование FSM PlayMaker (finite state machine) для инициализации движка Naninovel, предварительной загрузки и воспроизведения сценария.

[!!N856vi18XVU]

### События

Некоторые из основных событий Naninovel могут быть автоматически перенаправлены в FSM PlayMaker. Для этого создайте глобальное [пользовательское событие](https://hutonggames.fogbugz.com/default.asp?W148) с соответствующим именем и используйте его внутри FSM. Ниже приведены доступные имена событий:

- `Naninovel/Engine/OnInitialized`
- `Naninovel/ScriptPlayer/OnPlay`
- `Naninovel/ScriptPlayer/OnStop`
- `Naninovel/StateManager/OnGameSaveStarted`
- `Naninovel/StateManager/OnGameSaveFinished`
- `Naninovel/StateManager/OnGameLoadStarted`
- `Naninovel/StateManager/OnGameLoadFinished`
- `Naninovel/TextPrinterManager/OnPrintTextStarted`
- `Naninovel/TextPrinterManager/OnPrintTextFinished`
- `Naninovel/LocalizationManager/OnLocaleChanged`

Кроме того, можно транслировать пользовательские события PlayMaker из сценариев Naninovel с помощью команды `@playmaker`:

```nani
@playmaker EventName
```

— вызовет глобальное пользовательское событие с именем "EventName" во всех активных FSM в сцене.

Команда также позволяет отправлять события в определенные FSM с помощью параметров `fsm` и `object`. Первый параметр позволяет указать имена FSM, которые должны принимать событие, например:

```nani
@playmaker EventName fsm:Fsm1,Fsm2
```

— вызовет событие с именем "EventName" для FSM с именами "Fsm1" и "Fsm2".

Когда параметр `object` задан, событие будет отправлено только в те FSM, которые применяются к игровым объектам, имеющим соответствующие имена, например:
```nani
@playmaker EventName object:Obj1,Obj2
```

— вызовет событие с именем "EventName" для всех FSM, которые прикреплены к игровым объектам с именами "Obj1" и "Obj2".

Вы также можете объединить параметры `fsm` и `object` для дальнейшей фильтрации FSM, которые должны получить событие.

### Глобальные переменные

В сценариях Naninovel можно получить доступ к глобальной переменной PlayMaker со следующими пользовательскими [выражениями функций](/ru/guide/script-expressions.html#expression-functions), доступными в пакете расширений:
 - `GetPlayMakerGlobalVariable("variableName")` — возвращает переменную простого типа (int, float, строка, и т.д.) c именем "variableName"
 - `GetPlayMakerGlobalArray("variableName", arrayIndex)` — возвращает значение, хранящееся в индексе "arrayIndex" массива переменной с именем "variableName"

К примеру, у вас есть целое число "Score" и глобальные переменные PlayMaker булева массива "FinishedRoutes" – вы можете использовать их в сценариях Naninovel следующим образом:


```nani
Felix: My score is {GetPlayMakerGlobalVariable("Score")}.

@if GetPlayMakerGlobalArray("FinishedRoutes",2)
    Third route (second array index) is completed.
@else
    Not yet.
@endif
```

## Расширение IDE

Чтобы добавить поддержку команды `@playmaker` в [расширение IDE Atom](/ru/guide/naninovel-scripts.md#поддержка-IDE), откройте файл метаданных, расположенный по адресу `%HOMEPATH%/.atom/packages/language-naniscript/server/metadata.json` (где `%HOMEPATH%` – это путь к каталогу пользователя вашей ОС), и добавьте следующую запись в массив `commands`:

```json
{
  "id": "BroadcastPlayMakerEvent",
  "alias": "playmaker",
  "localizable": false,
  "summary": "Broadcasts a PlayMaker event with the provided name.",
  "params": [
    {
      "id": "EventName",
      "nameless": true,
      "required": true,
      "dataType": {
        "kind": "literal",
        "contentType": "string"
      },
      "summary": "Name of the event to broadcast."
    },
    {
      "id": "FsmNames",
      "alias": "fsm",
      "nameless": false,
      "required": false,
      "dataType": {
        "kind": "array",
        "contentType": "string"
      },
      "summary": "Names of FSMs for which to broadcast the event."
    },
    {
      "id": "GameObjectNames",
      "alias": "object",
      "nameless": false,
      "required": false,
      "dataType": {
        "kind": "array",
        "contentType": "string"
      },
      "summary": "Names of game objects for which to broadcast the event."
    }
  ]
},
```

После редактирования файл должен начинаться следующим образом:

```json
{
  "commands": [
    {
      "id": "BroadcastPlayMakerEvent",
      "alias": "playmaker",
```

Перезагрузите Atom (если он был запущен), и команда `@playmaker` больше не должна выделяться как ошибка.