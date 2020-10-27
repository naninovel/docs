# Пользовательская конфигурация

Объекты конфигурации используются для инициализации и настройки служб и других систем движка.

По умолчанию объекты конфигурации сериализуются как ассеты [объектов сценария](https://docs.unity3d.com/Manual/class-ScriptableObject.html) активы и хранятся в каталоге проекта `NaninovelData/Resources/Naninovel/Configuration`. Ассеты автоматически генерируются при первом открытии соответствующих конфигурационных меню (`Naninovel -> Configuration`) в редакторе Unity.

Для доступа к объектам конфигурации через C# используйте статический метод `Engine.GetConfiguration<T>()`, где `T` – тип объекта конфигурации, к которому вы хотите получить доступ. Например, в следующем примере показано, как получить доступ к объекту [конфигурации аудио](/ru/guide/configuration.md#аудио) :

```csharp
var audioConfig = Engine.GetConfiguration<AudioConfiguration>();
```  

Имейте в виду, что метод `Engine.GetConfiguration` может быть использован только тогда, когда движок инициализирован, так как требует объекта [конфигурации провайдера](/ru/guide/custom-configuration.md#провайдер-конфигурации), который указывается при инициализациидвижка, чтобы позволить использовать пользовательскую обработку сценариев во время выполнения. Если вы хотите получить доступ к ассету конфигурации через провайдера по умолчанию, это возможно даже в том случае, если движок не инициализирован классом `ProjectConfigurationProvider`, например:

```csharp
var audioConfig = ProjectConfigurationProvider.LoadOrDefault<AudioConfiguration>();
``` 

Хотя свойства конфигурации предназначены для изменения с помощью меню редактора, их все еще можно изменять во время выполнения. Имейте в виду, что объекты, возвращаемые провайдером проекта по умолчанию, являются фактическими ассетами, хранящимися в проекте; если вы измените их, изменения произойдут и в режиме воспроизведения. Это отличает их от конфигурационных объектов, предоставляемых с помощью метода `Engine.GetConfiguration`, который являются копиями и не будут влиять на исходные ассеты.

Ниже приведен пример изменения свойства `ReferenceResolution` объекта конфигурации камеры сразу после инициализации движка:

```csharp
using Naninovel;
using UnityEngine;

public static class ModifyConfigAtRuntime
{
    [RuntimeInitializeOnLoadMethod]
    private static void ModifyConfig ()
    {
        if (Engine.Initialized) OnInitializationFinished();
        else Engine.OnInitializationFinished += OnInitializationFinished;

        void OnInitializationFinished ()
        {
            Engine.OnInitializationFinished -= OnInitializationFinished;

            var cameraConfig = Engine.GetConfiguration<CameraConfiguration>();
            cameraConfig.ReferenceResolution = new Vector2Int(3840, 2160);
        }
    }
}
```

## Добавление конфигурации

Чтобы добавить новую пользовательскую конфигурацию, создайте наследуемый от `Configuration` класс C# с атрибутом `Serializable`.

```csharp
using Naninovel;
using UnityEngine;

[System.Serializable]
public class MyCustomConfiguration : Configuration
{
    [Header("My Custom Header 1")]
    [Tooltip("Tooltip for my custom string.")]
    public string MyCustomString = "Default value";
    [Range(0, 100), Tooltip("Tooltip for my custom float.")]
    public float MyCustomFloat = 10;

    [Header("My Custom Header 2")]
    public int[] MyCustomArray;
}
```

Затем соответствующее меню будет автоматически добавлено в настройки проекта, где вы сможете настроить свойства вашего пользовательского ассета конфигурации точно так же, как и во всех встроенных меню.

![](https://i.gyazo.com/c1163bba83f5d2b6286b100e837bca40.png)

Для доступа к пользовательской конфигурации через C# используйте тот же API, что и для встроенных ассетов:

```csharp
var myConfig = Engine.GetConfiguration<MyCustomConfiguration>();
```

::: example
Другой пример добавления меню пользовательской конфигурации для настройки системы инвентаря можно найти в [примере проекта инвентаря на GitHub](https://github.com/Naninovel/Inventory).

В частности, пользовательская конфигурация реализуется с помощью скрипта воспроизведения [InventoryConfiguration.cs](https://github.com/Naninovel/Inventory/blob/master/Assets/NaninovelInventory/Runtime/InventoryConfiguration.cs).
:::

## Провайдер конфигурации

Можно изменить способ обработки объектов конфигурации во время выполнения. Например, вместо статических ресурсов проекта можно прочитать конфигурацию из файлов JSON, хранящихся на удаленном хосте.

Чтобы указать пользовательский сценарий обработки конфигурации, создайте класс C# и реализуйте интерфейс `IConfigurationProvider`. Интерфейс имеет только один метод, который ожидает аргумент `Type` и возвращает объект `Configuration`. Это зависит от вас, как построить и заполнить запрошенные объекты конфигурации; только убедитесь, что тип возвращаемого объекта равен запрошенному.

Ниже приведен пример реализации пользовательского провайдера, который просто возвращает объекты конфигурации по умолчанию:

```csharp
using Naninovel;
using UnityEngine;

public class CustomConfigurationProvider : IConfigurationProvider
{
    public Configuration GetConfiguration (System.Type type)
    {
        var defaultAsset = ScriptableObject.CreateInstance(type);
        return defaultAsset as Configuration;
    }
}
```

Как только пользовательский провайдер конфигураций будет готов, вы должны заставить движок использовать его вместо встроенного, создав пользовательский сценарий инициализации движка. По умолчанию движок инициализируется через `Naninovel/Runtime/Engine/RuntimeInitializer.cs`; вы можете использовать его в качестве примера при создании собственного сценария инициализации.

С другой стороны, если ваша цель – просто использовать пользовательский провайдер конфигурации, но сохранить процедуру инициализации движка по умолчанию, вы можете воспользоваться статическим методом `RuntimeInitializer.InitializeAsync(IConfigurationProvider)`, который принимает необязательный аргумент для провайдера конфигурации:

```csharp
using Naninovel;
using UniRx.Async;
using UnityEngine;

public class CustomInitializer
{
    [RuntimeInitializeOnLoadMethod]
    private static void InitializeWithCustomProvider ()
    {
        var customProvider = new CustomConfigurationProvider();
        RuntimeInitializer.InitializeAsync(customProvider).Forget();
    }
}
```

Независимо от того, какой способ вы выберете для инициализации движка, не забудьте отключить опцию `Initialize On Application Load` в меню конфигурации движка, чтобы отключить процедуру инициализации по умолчанию.