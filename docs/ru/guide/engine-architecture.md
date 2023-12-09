# Архитектура движка

Движок разработан с учетом следующих принципов: **независимость от сцен** и **ориентированность на сервисы**.

## Независимость от сцен

Дизайн Unity продвигает использование сцен и композиции префабов, что не очень практично при разработке визуальных новелл.

Все системы Naninovel либо не связаны непосредственно с [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html), либо прикреплены к [постоянному](https://docs.unity3d.com/ScriptReference/Object.DontDestroyOnLoad.html) корневому [GameObject](https://docs.unity3d.com/ScriptReference/GameObject.html).

![](https://i.gyazo.com/9805e2ce450bc486a007cdc001f8ae13.png)

В зависимости от среды используются следующие корневые объекты:

– `Naninovel<Runtime>` для воспроизведения (сборки и режим воспроизведения редактора);
– `Naninovel<Editor>` для редактора (вне режима воспроизведения).

Все необходимые игровые объекты создаются при инициализации движка, которая выполняется автоматически и асинхронно при запуске приложения (сразу после входа в режим воспроизведения или запуска сборки) с помощью метода [RuntimeInitializeOnLoadMethod](https://docs.unity3d.com/ScriptReference/RuntimeInitializeOnLoadMethodAttribute.html). Вы можете изменить это поведение, отключив свойство `Initialize On Application Load` в конфигурации движка и вручную вызвав инициализацию с помощью классов `RuntimeInitializer` (для среды выполнения) или `EditorInitializer` (для редактора).

![](https://i.gyazo.com/f58a8af9f2f6d71286061e55fc228896.png)

Поскольку процесс инициализации является асинхронным, используйте либо [подход async-await](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/) при вызове метода `InitializeAsync()`, либо используйте статическое событие `Engine.OnInitialized`.

Чтобы полностью отключить и удалить из памяти все системы движка, используйте статический метод `Engine.Destroy()`.

## Ориентированность на сервисы

Большинство функций движка реализуются через его сервисы. Сервис движка – это реализация интерфейса `IEngineService`, который исполняет конкретную работу – например, выполнение сценариев Naninovel, управление акторами или сохранение-загрузка состояния игры.

В случае, если вы хотите взаимодействовать с системой движка, вы, скорее всего, захотите использовать сервисы движка. Вы можете получить ссылку на сервис движка, используя статический метод `Engine.GetService<TService>()`, где `TService` - это тип (интерфейс) сервиса, на который вы хотите сослаться; например, чтобы получить сервис `IScriptPlayer`:

```csharp
var player = Engine.GetService<IScriptPlayer>();
player.Stop();
```
Список всех доступных в настоящее время сервисов движка и информацию о том, как переопределить/добавить пользовательские сервисы, можно найти в [руководстве по сервисам движка](/ru/guide/engine-services).

## Высокоуровневая концепция

Следующая диаграмма UML иллюстрирует высокоуровневую концепцию архитектуры движка. Обратите внимание, что все имена классов и интерфейсов на диаграмме организованы в пространстве имён `Naninovel`. Например, чтобы сослаться на класс `Engine`, используйте `Naninovel.Engine` или [включите пространство имён](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/namespaces/using-namespaces).

<object class="engine-design-dark" data="/assets/img/engine-design-dark.svg" type="image/svg+xml"></object>
<object class="engine-design-light" data="/assets/img/engine-design-light.svg" type="image/svg+xml"></object>
