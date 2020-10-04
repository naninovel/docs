# Варианты интеграции

В то время как Naninovel фокусируется на построении традиционных визуальных новелл, движок разработан таким образом, чтобы обеспечить интеграцию в существующие проекты. Если вы создаете 3D-приключенческую игру, RPG или игру любого другого жанра, вы можете использовать Naninovel в качестве встроенной диалоговой системы.

[!b1b6042db4a91b3a8cee74236b33c17c]

Существует несколько способов интеграции Naninovel в пользовательский проект, и конкретная реализация будет зависеть от типа проекта и того, чего именно вы хотите достичь с помощью Naninovel. В следующей документации мы перечислим различные параметры конфигурации и API, которые могут быть полезны для "сопряжения" Naninovel с автономной игрой. Прежде чем продолжить, взгляните на [архитектуру движка](/ru/guide/engine-architecture.md), чтобы лучше понять, как он ведет себя на концептуальном уровне.

::: example
Изучите [пример проекта](/ru/guide/integration-options.md#example-project), где Naninovel используется и как встроенная диалоговая система для 3D приключенческой игры, и как переключаемый автономный новый режим.
:::

## Ручная инициализация 

Первое, что вы, вероятно, захотите изменить – это отключить опцию `Initialize On Application Load` в меню конфигурации движка.

![](https://i.gyazo.com/f58a8af9f2f6d71286061e55fc228896.png)

Если этот параметр включен, сервисы движка будут автоматически инициализироваться при запуске приложения. И если вы не хотите начать свою игру в режиме новеллы, вам стоит вручную инициализировать движок, когда это действительно необходимо.

Используйте статический асинхронный метод `RuntimeInitializer.InitializeAsync()` (или пользовательский скрипт) для инициализации движка во время выполнения перед использованием любого из встроенных API сервисов. Вы можете проверить, инициализирован ли движок в данный момент с помощью свойства `Engine.Initialized`. Используйте событие `Engine.OnInitialized` для прослушивания событий завершения инициализации.

Чтобы сбросить сервисы движка (и выгрузить большую часть занятых ресурсов), используйте метод `ResetStateAsync()` сервиса `IStateManager`; это полезно, когда вы собираетесь временно переключиться в какой-то другой игровой режим, чтобы иметь возможность вернуться в новый режим без повторной инициализации движка.

Чтобы уничтожить все сервисы движка и полностью удалить Naninovel из памяти, используйте статический метод `Engine.Destroy()`.

## Проигрывание сценариев Naninovel

Чтобы подзагрузить и воспроизвести любой новый сценарий с заданным именем, используйте метод `PreloadAndPlayAsync(ScriptName)` сервиса `IScriptPlayer`. Чтобы получить сервис движка, используйте статический метод `Engine.GetService<TService>()`, где `TService` - это тип (интерфейс) извлекаемого сервиса. Например, ниже будет получен сервис плеера сценариев, затем предварительно загружен и воспроизведён скрипт с именем "Script 001":

```csharp
var player = Engine.GetService<IScriptPlayer>();
await player.PreloadAndPlayAsync("Script001");
```

При выходе из нового режима и возвращении в основной игровой режим вы, вероятно, захотите выгрузить все ресурсы, используемые Naninovel в настоящее время, и остановить все сервисы движка. Для этого используйте метод `ResetStateAsync()` сервиса `IStateManager`:

```csharp
var stateManager = Engine.GetService<IStateManager>();
await stateManager.ResetStateAsync();
```

## Отключение главного меню

Встроенная реализация главного меню будет автоматически отображаться при инициализации движка, в то время как у вас, скорее всего, будет свое собственное главное меню. Вы можете либо изменить или полностью заменить встроенное меню, используя [функцию настройки UI](/ru/guide/user-interface.md#кастомизация-UI) или просто отключить его, отключив `Show Title UI` в меню конфигурации движка.

## Слой объектов движка

Вы можете заставить движок назначить определенный [слой](https://docs.unity3d.com/Manual/Layers.html) для всех объектов (кроме связанных с UI), которые он создает, через меню конфигурации.

![](https://i.gyazo.com/8642fe37ddc45b8514b9f01d70277fbd.png)

При этом также камера движка будет использовать [обрезную маску](https://docs.unity3d.com/ScriptReference/Camera-cullingMask.html) и визуализировать только объекты с указанным слоем.

Чтобы изменить слой объектов UI, управляемых движком, используйте опцию `Objects Layer` в меню конфигурации UI.

![](https://i.gyazo.com/56d863bef96bf72c1fed9ae646db4746.png)

## Рендеринг в текстуру
Вы можете сделать рендеринг камеры движка в пользовательскую [текстуру рендеринга](https://docs.unity3d.com/ScriptReference/RenderTexture.html) вместо экрана (и изменить другие настройки, связанные с камерой), назначив пользовательский префаб камеры в меню конфигурации камеры.

![](https://i.gyazo.com/1b7116fa1bd170d3753b4cdbd27afcf3.png)

## Переключение режимов

Хотя это сильно зависит от проекта, ниже приведен абстрактный пример (основанный на упомянутом ранее проекте интеграции) того, как вы можете реализовать переключение между режимами "приключения" и "новеллы" с помощью пользовательских команд.

```csharp
[CommandAlias("novel")]
public class SwitchToNovelMode : Command
{
    public StringParameter ScriptName;
    public StringParameter Label;

    public override async UniTask ExecuteAsync (CancellationToken cancellationToken = default)
    {
        // 1. Disable character control.
        var controller = Object.FindObjectOfType<CharacterController3D>();
        controller.IsInputBlocked = true;

        // 2. Switch cameras.
        var advCamera = GameObject.Find("AdventureModeCamera").GetComponent<Camera>();
        advCamera.enabled = false;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = true;

        // 3. Load and play specified script (if assigned).
        if (Assigned(ScriptName))
        {
            var scriptPlayer = Engine.GetService<IScriptPlayer>();
            await scriptPlayer.PreloadAndPlayAsync(ScriptName, label: Label);
        }

        // 4. Enable Naninovel input.
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.ProcessInput = true;
    }
}
```

```csharp
[CommandAlias("adventure")]
public class SwitchToAdventureMode : Command
{
    public override async UniTask ExecuteAsync (CancellationToken cancellationToken = default)
    {
        // 1. Disable Naninovel input.
        var inputManager = Engine.GetService<IInputManager>();
        inputManager.ProcessInput = false;

        // 2. Stop script player.
        var scriptPlayer = Engine.GetService<IScriptPlayer>();
        scriptPlayer.Stop();

        // 3. Reset state.
        var stateManager = Engine.GetService<IStateManager>();
        await stateManager.ResetStateAsync();

        // 4. Switch cameras.
        var advCamera = GameObject.Find("AdventureModeCamera").GetComponent<Camera>();
        advCamera.enabled = true;
        var naniCamera = Engine.GetService<ICameraManager>().Camera;
        naniCamera.enabled = false;

        // 5. Enable character control.
        var controller = Object.FindObjectOfType<CharacterController3D>();
        controller.IsInputBlocked = false;
    }
}
```

Затем команды могут быть использованы в сценариях Naninovel:

```nani
; Перейти в приключенческий режим.
@adventure
```

— или напрямую в C# (например, в событиях Unity `OnTrigger`):

```csharp
private void OnTriggerEnter (Collider other)
{
	var switchCommand = new SwitchToNovelMode { ScriptName = "Script001" };
	switchCommand.ExecuteAsync().Forget();
}
```

## Другие варианты

Существует множество других функций (аутсорсинг состояния, переопределение сервисов, пользовательская сериализация, провайдеры ресурсов и конфигураций и т.д.), которые могут быть ситуационно полезны при интеграции движка в другие системы; ознакомьтесь с остальной частью руководства для получения дополнительной информации. Также вы можете изучить доступные [параметры конфигурации](/ru/guide/configuration.md); некоторые функции могут быть не описаны в руководстве, но все же удобны при интеграции.

Если вы чувствуете, что каким-то API или системам движка или не хватает расширяемости и требуется модификация исходного кода для интеграции, пожалуйста, [свяжитесь с разработчиком](/ru/support/#developer—support) – мы рассмотрим возможности улучшения.

## Демонстрационный проект

Пример проекта с Naninovel, где движок используется как в качестве диалоговой системы для 3D-приключенческой игры, так и в переключаемом автономном режиме новеллы, [доступен на GitHub](https://github.com/Elringus/NaninovelIntegrationExample). Вы можете [клонировать репозиторий](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) с помощью Git-клиента или [скачать его в виде zip-архива](https://github.com/Elringus/NaninovelIntegrationExample/archive/master.zip).

::: warn
Пакет Naninovel не распространяется вместе с проектом, поэтому ошибки компиляции будут создаваться после его первого открытия; импортируйте Naninovel из Asset Store, чтобы исправить их.
:::

Все сценарии, относящиеся к конкретному проекту (примеры), хранятся в папке `Assets/Runtime`.

Naninovel инициализируется вручную (автоматическая инициализация отключена в меню конфигурации движка) через скрипт `Runtime/SetupGame.cs`, прикреплённый к игровому объекту `SetupGame`, расположенному в сцене `MainScene`.

Скрипт `Runtime/DialogueTrigger.cs`, используемый в качестве компонента на триггерах, выполняет переключение в диалоговый режим, когда игрок нажимает на триггерные коллайдеры.

Пользовательская команда `Runtime/SwitchToNovelMode.cs` используется, чтобы переключиться в режим новеллы в C# и сценариях Naninovel.

Пользовательская команда `Runtime/SwitchToAdventureMode.cs` используется для переключения в приключенческий режим из режима новеллы.