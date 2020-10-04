# Сервисы движка

Большинство функций движка реализуются через его сервисы. Сервис движка – это реализация интерфейса `IEngineService`, который выполняет определенную работу, например, выполнение сценариев Naninovel, управление акторами или сохранение-загрузка состояния игры.

В случае, если вы хотите взаимодействовать с системой движка, вам, скорее всего, захочется использовать сервис движка. Вы можете получить ссылку на него, используя статический метод `Engine.GetService<TService>()`, где `TService` – интерфейс сервиса, который вы хотите получить; например, чтобы получить сервис `IScriptPlayer`:

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```

В настоящее время доступны следующие сервисы:

Интерфейс сервиса | Описание
--- | ---
IBackgroundManager | Управляет акторами [фонов](/ru/guide/backgrounds.md).
ICharacterManager | Управляет акторами [персонажей](/ru/guide/characters.md).
IChoiceHandlerManager | Управляет акторами [обработчиков выбора](/ru/guide/choices.md).
ITextPrinterManager | Управляет акторами [текстовых принтеров](/ru/guide/text-printers.md).
IAudioManager | Управляет аудио: [SFX](/ru/guide/audio.md#звуковые-эффекты), [BGM](/ru/guide/audio.md#фоновая-музыка) и [озвучкой](/ru/guide/voicing.md).
IInputManager | Управляет пользовательским [вводом](/ru/guide/input-processing.md).
ILocalizationManager| Управляет функциями [локализации](/ru/guide/localization.md).
ITextManager | Обрабатывает функцию [управляемого текста](/ru/guide/managed-text.md).
IMoviePlayer | Обрабатывает воспроизведение [видео](/ru/guide/movies.md).
IScriptManager | Управляет ресурсами [сценариев Naninovel](/ru/guide/naninovel-scripts.md).
IScriptPlayer | Управляет воспроизведением [сценариев Naninovel](/ru/guide/naninovel-scripts.md).
ICameraManager | Управляет камерами и другими системами, необходимыми для визуализации сцены.
IResourceProviderManager | Управляет объектами `IResourceProvider`.
IStateManager | Управляет де-/сериализацией постоянной информации, связанной с `IEngineService`; поставляет API для [сохранения и загрузки](/ru/guide/save-load-system.md) состояния игры?.
IUIManager | Управляет объектами `IManagedUI`и обрабатывает функцию [кастомизации UI](/ru/guide/user-interface.md#кастомизация-UI).
ICustomVariableManager | Предоставляет доступ к [пользовательским переменных](/ru/guide/custom-variables.md) и позволяет их модифицировать. 
ISpawnManager | Управляет объектами, созданными с помощью команд [@spawn].
IUnlockableManager | Управляет [разблокировываемыми предметами](/ru/guide/unlockable-items.md) (предметы галерей иллюстрации и видео, советы и пр.).

Встроенные реализации сервисов можно найти в исходном коде среды выполнения, хранящемся в разделе `Naninovel/Runtime`.

## Добавление пользовательских сервисов

Чтобы добавить новый пользовательский сервис движка, реализуйте интерфейс `IEngineService` и добавьте атрибут `InitializeAtRuntime` к реализуемому классу. Экземпляр реализации будет автоматически создан во время инициализации движка и станет доступен через API `Engine.GetService<TService>()`.

Вы можете принудительно инициализировать свой пользовательский сервис раньше или позже других сервисов, используя аргумент `InitializationPriority` атрибута `InitializeAtRuntime`; более низкие значения будут размещать сервис перед другими сервисами в очереди инициализации и наоборот.

Для автоматического создания экземпляра реализация сервиса должна иметь совместимый конструктор (или конструктор по умолчанию). Допускаются следующие аргументы (в любом порядке):
 
- Любое количество других сервисов (производные от `IEngineService`)
- Любое количество объектов конфигурации (производные от `Configuration`)
- Прокси-объект Unity "MonoBehavior" (производные`IEngineBehaviour`)

Имейте в виду, что использовать другие сервисы в конструкторе небезопасно. Вместо этого используйте любые действия инициализации, требующие использования других служб в методе `InitializeServiceAsync`; чтобы убедиться, что необходимые сервисы инициализируются при обращении к ним, перечислите их в конструкторе служб (очередь инициализации топологически сортируется на основе аргументов конструктора).

В случае, если пользовательский сервис имеет постоянное состояние, которое вы хотите де-/сериализировать с другими сервисами движка, реализуйте интерфейс `IStatefulService<TState>`,  используйте `TState` или `GameStateMap`, `GlobalStateMap` или `SettingsStateMap` в зависимости от того, хотите ли вы сохранить состояние конкретной игровой сессии, глобального состояния или настроек. При необходимости можно реализовать все три интерфейса для одного сервиса. Для получения дополнительной информации о различных типах состояния движка см. [руководство управления состояниями](/ru/guide/state-management.md).

Ниже приведен пример реализации пользовательского сервиса движка с некоторыми уведомлениями об использовании.

```csharp
using Naninovel;
using UniRx.Async;
using UnityEngine;

[InitializeAtRuntime]
public class CustomService : IEngineService
{
    private readonly InputManager inputManager;
    private readonly ScriptPlayer scriptPlayer;

    public CustomService (InputManager inputManager, ScriptPlayer scriptPlayer)
    {
        // Потенциально сервисы здесь ещё не инициализированы, 
        // воздержитесь от их использования.
        this.inputManager = inputManager;
        this.scriptPlayer = scriptPlayer;
    }

    public UniTask InitializeServiceAsync ()
    {
    	// Сервис инициализируется здесь.
        // Теперь можно безопасно использовать сервисы, необходимые конструктору.
        Debug.Log(inputManager.ProcessInput);
        Debug.Log(scriptPlayer.PlayedScript);
        return UniTask.CompletedTask;
    }

    public void ResetService ()
    {
        // Сброс состояния сервиса.
    }

    public void DestroyService ()
    {
        // Остановка сервиса и разгрузка всех используемых ресурсов.
    }
}
```

Вышеупомянутый сервис вы можете получить его через API движка следующим образом:

```csharp
var customService = Engine.GetService<CustomService>();
```

::: example
Другой пример добавления пользовательского сервиса движка для управления ресурсами предметов и конфигурацией UI инвентаря можно найти в [примере проекта инвентаря на GitHub](https://github.com/Elringus/NaninovelInventory).

Данный пользовательский сервис движка реализован с помощью скрипта воспроизведения [InventoryManager.cs](https://github.com/Elringus/NaninovelInventory/blob/master/Assets/NaninovelInventory/Runtime/InventoryManager.cs).
:::

## Переопределение встроенных сервисов

Ссылки на все встроенные сервисы происходят через интерфейсы в исходном коде движка, что позволяет заменить любой из этих сервисов пользовательской реализацией.

Добавьте пользовательский сервис таким же образом, как описано выше, но вместо `IEngineService` реализуйте конкретный интерфейс движка и укажите переопределенный тип (тип реализации, а не интерфейса) с помощью атрибута `InitializeAtRuntime`. После этого ваша пользовательская реализация будет инициализирована вместо встроенной.

Ниже приведен пример фиктивной реализации `IInputManager`, которая ничего не делает, но регистрирует, когда любой из ее методов вызывается.

```csharp
using Naninovel;
using Naninovel.UI;
using UniRx.Async;
using UnityEngine;

[InitializeAtRuntime(@override: typeof(InputManager))]
public class CustomInputManager : IInputManager
{
    public InputConfiguration Configuration { get; }
    public bool ProcessInput { get; set; }

    public CustomInputManager (InputConfiguration config)
    {
        Configuration = config;
    }

    public UniTask InitializeServiceAsync ()
    {
        Debug.Log("CustomInputManager::InitializeServiceAsync()");
        return UniTask.CompletedTask;
    }

    public void ResetService ()
    {
        Debug.Log("CustomInputManager::ResetService()");
    }

    public void DestroyService ()
    {
        Debug.Log("CustomInputManager::DestroyService()");
    }

    public IInputSampler GetSampler (string bindingName)
    {
        Debug.Log($"CustomInputManager::GetSampler({bindingName})");
        return default;
    }

    public void AddBlockingUI (IManagedUI ui, params string[] allowedSamplers)
    {
        Debug.Log($"CustomInputManager::AddBlockingUI({ui.GetType().Name})");
    }

    public void RemoveBlockingUI (IManagedUI ui)
    {
        Debug.Log($"CustomInputManager::RemoveBlockingUI({ui.GetType().Name})");
    }
}
```
Теперь, когда менеджер ввода запрашивается через `Engine.GetService<IInputManager>()`, ваша пользовательская реализация будет предоставлена вместо встроенной `Naninovel.InputManager`.