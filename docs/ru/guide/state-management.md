# Управление состоянием

Все постоянные данные, генерируемые и используемые Naninovel во время выполнения, делятся на три категории:

- Состояние игры
- Глобальное состояние
- Пользовательская настройка

Данные сериализуются в формат JSON и хранятся как двоичные файлы `.nson` (по умолчанию) или text `.json` (можно переключить в меню конфигурации состояния) слотов сохранения в специфичном для платформы [постоянном каталоге данных](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html). В рамках же платформы WebGL, благодаря политике безопасности LFS в современных веб-браузерах, сериализованные данные хранятся поверх [индексированной DB](https://en.wikipedia.org/wiki/Indexed_Database_API).

Вместо локальных файлов можно хранить слоты состояний в базе данных ключ-значение [PlayerPrefs](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html), выбрав соответствующие обработчики сериализации в меню конфигурации.

Путь к папке сохранения, максимально допустимое количество слотов сохранения и имена файлов могут быть изменены с помощью меню конфигурации состояния.

![](https://i.gyazo.com/f9a2462d19eb228224f1dcd5302d6b1c.png)

## Состояние игры

Состояние игры – это данные, которые варьируются в зависимости от игрового слота сохранения, описывая состояние сервисов движка и других объектов по отношению к прогрессу игрока в игре. Примерами данных состояния игры являются: текущий воспроизводимый сценарий Naninovel и индекс команды сценария в пределах сценария, текущие видимые персонажи и их позиции в сцене,  название текущей воспроизведимой музыки, ее громкость и так далее.

Чтобы сохранить или загрузить текущее состояние игры в определенный слот сохранения, используйте сервис движка `IStateManager` следующим образом:

```csharp
// Получить экземпляр менеджера состояний.
var stateManager = Engine.GetService<IStateManager>();

// Сохранить текущую игровую сессию в слоте `mySaveSlot`.
await stateManager.SaveGameAsync("mySaveSlot");
// Загрузить игровую сессию из слота `mySaveSlot`.
await stateManager.LoadGameAsync("mySaveSlot");

// Вы также можете использовать методы быстрого сохранения и загрузки без указания имен слотов.
await stateManager.QuickSaveAsync();
await stateManager.QuickLoadAsync();
```

Обратите внимание, что API сохранения-загрузки является [асинхронным](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/). Если вы вызываете API из синхронных методов, используйте `IStateManager.OnGameSaveFinished` и `IStateManager.OnGameLoadFinished` для подписки на события завершения.

## Глобальное состояние

Некоторые данные, однако, должны быть постоянными во всех игровых сессиях. Например, функция "Пропускать прочитанный текст" ("Skip Read Text") требует, чтобы движок хранил данные, описывающие, какие команды сценария Naninovel были выполнены хотя бы один раз (то есть игрок уже "видел" их). Такие данные хранятся в одном "глобальном" слоте сохранения и не зависят от операций сохранения и загрузки игры.

Глобальное состояние загружается автоматически при инициализации движка. Вы можете сохранить глобальное состояние в любое время с помощью `IStateManager` следующим образом:

```csharp
await stateManager.SaveGlobalStateAsync();
```

## Пользовательские настройки

Как и глобальное состояние, данные пользовательских настроек (разрешение дисплея, язык, громкость звука и т.д.) хранятся в одном слоте сохранения, но по умолчанию обрабатываются немного по-другому: сгенерированный файл сохранения помещается вне папки "Saves" и форматируется читаемым образом, так что пользователь может изменять значения, если пожелает.

Пользовательские настройки загружаются автоматически при инициализации движка. Вы можете сохранить настройки в любое время с помощью `IStateManager` следующим образом:

```csharp
await stateManager.SaveSettingsAsync();
```

## Пользовательское состояние

Можно "передать на аутсорсинг" обработку состояния ваших пользовательских объектов в `IStateManager`, чтобы они сериализовались в слоты сохранения со всеми данными движка, когда игрок сохраняет игру, и десериализовались обратно, когда игра загружается.

В следующем примере показано, как подписаться на универсальное `MonoBehaviour` для операций сохранения и загрузки.

```csharp
using UniRx.Async;
using UnityEngine;
using Naninovel;

public class MyCustomBehaviour : MonoBehaviour
{
    [System.Serializable]
    private class GameState 
    { 
    	public bool MyCustomBoolVariable; 
    	public string MyCustomStringVariable; 
    }

    private bool myCustomBoolVariable;
    private string myCustomStringVariable;
    private IStateManager stateManager;

    private void Awake ()
    {
        stateManager = Engine.GetService<IStateManager>();
    }

    private void OnEnable ()
    {
        stateManager.AddOnGameSerializeTask(SerializeState);
        stateManager.AddOnGameDeserializeTask(DeserializeState);
    }

    private void OnDisable ()
    {
        stateManager.RemoveOnGameSerializeTask(SerializeState);
        stateManager.RemoveOnGameDeserializeTask(DeserializeState);
    }

    private void SerializeState (GameStateMap stateMap)
    {
        var state = new GameState() {
            MyCustomBoolVariable = myCustomBoolVariable,
            MyCustomStringVariable = myCustomStringVariable
        };
        stateMap.SetState(state);
    }

    private UniTask DeserializeState (GameStateMap stateMap)
    {
        var state = stateMap.GetState<GameState>();
        if (state is null) return UniTask.CompletedTask;

        myCustomBoolVariable = state.MyCustomBoolVariable;
        myCustomStringVariable = state.MyCustomStringVariable;
        return UniTask.CompletedTask;
    }
}
```

::: example
Более продвинутый пример использования пользовательского состояния со списком пользовательских структур для сохранения-загрузки состояния UI инвентаря можно найти в [примере проекта инвентаря на GitHub](https://github.com/Naninovel/Inventory).

В частности, де-/сериализация пользовательского состояния реализуется в сценарии выполнения [InventoryUI.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/UI/InventoryUI.cs#L238); пользовательское состояние для слотов UI реализуется через [InventorySlotState.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/InventorySlotState.cs).

:::

## Обработчики пользовательской сериализации

По умолчанию состояние движка (сохранение игры, глобальное состояние, настройки) сериализуется в локальную файловую систему через кросс-платформенный API IO. Однако в некоторых случаях специфичные для платформы реализации недоступны из коробки. Например, Nintendo решила ограничить доступ к собственным библиотекам Switch, сделав невозможной поддержку платформы в сторонних решениях. Для таких случаев Naninovel позволяет предоставлять пользовательские обработчики сериализации.

Чтобы добавить пользовательский обработчик, реализуйте интерфейсы `ISaveSlotManager<GameStateMap>`, `ISaveSlotManager<GlobalStateMap>`, `ISaveSlotManager<SettingsStateMap>` для игровых слотов сохранения, глобального состояния и параметров соответственно (каждая из них должна иметь свой собственный реализующий класс).

Реализация должна иметь совместимый публичный конструктор: `public CustomSlotManager (StateConfiguration config, string savesFolderPath)`, где `config` – это экземпляр конфигурации состояния объекта, а `savesFolderPath` – это путь к папке сохранений (вы вольны игнорировать этот путь и использовать тот, который вы считаете нужным).

Ниже приведен пример фиктивного обработчика сериализации настроек, который ничего не делает, но создает записи в логах, когда вызывается любой из его методов.

```csharp
using Naninovel;
using System;
using UniRx.Async;
using UnityEngine;

public class CustomSettingsSlotManager : ISaveSlotManager<SettingsStateMap>
{
    public event Action OnBeforeSave;
    public event Action OnSaved;
    public event Action OnBeforeLoad;
    public event Action OnLoaded;

    public bool Loading => false;
    public bool Saving => false;

    public CustomSettingsSlotManager (StateConfiguration config, string savesFolderPath)
    {
        Debug.Log($"Ctor({savesFolderPath})");
    }

    public bool AnySaveExists () => true;

    public bool SaveSlotExists (string slotId) => true;

    public void DeleteSaveSlot (string slotId)
    {
        Debug.Log($"DeleteSaveSlot({slotId})");
    }

    public void RenameSaveSlot (string sourceSlotId, string destSlotId)
    {
        Debug.Log($"RenameSaveSlot({sourceSlotId},{destSlotId})");
    }

    public UniTask SaveAsync (string slotId, SettingsStateMap data)
    {
        OnBeforeSave?.Invoke();
        Debug.Log($"SaveAsync({slotId})");
        OnSaved?.Invoke();
        return UniTask.CompletedTask;
    }

    public UniTask<SettingsStateMap> LoadAsync (string slotId)
    {
        OnBeforeLoad?.Invoke();
        Debug.Log($"LoadAsync({slotId})");
        OnLoaded?.Invoke();
        return UniTask.FromResult(new SettingsStateMap());
    }

    public UniTask<SettingsStateMap> LoadOrDefaultAsync (string slotId)
    {
        return LoadAsync(slotId);
    }
}
```

::: note
Вы можете выбрать любое имя для вашего пользовательского обработчика сериализации, `CustomSettingsSlotManager` – это всего лишь пример.
:::

Когда пользовательский обработчик будет реализован, он появится в меню конфигурации состояния, где вы можете установить его вместо встроенного.

![](https://i.gyazo.com/213bc2bb8c7cc0e62ae98a579579f313.png)

