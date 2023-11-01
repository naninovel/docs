# Пользовательские команды

Команда представляет собой единую операцию, которая управляет тем, что происходит в сцене; например, она может быть использована для изменения фона, перемещения персонажа или загрузки другого сценария Naninovel. Параметризованные последовательности команд, определенные в [сценариях Naninovel](/ru/guide/naninovel-scripts), эффективно управляют игровым потоком. Доступные встроенные команды можно найти в [справочнике API](/ru/api/). В коде все встроенные реализации команд сценария определяются в разделе `Naninovel.Commands`.

Чтобы добавить свою собственную команду сценария, создайте новый производный от `Command` класс C# и реализуйте абстрактный метод `ExecuteAsync`. Созданный класс будет автоматически определён движком, и вы сможете вызвать команду из сценариев Naninovel либо по имени класса, либо по псевдониму (если он назначен). Чтобы назначить псевдоним команде Naninovel, примените атрибут `CommandAlias` к классу.

`ExecuteAsync` – это асинхронный метод, вызываемый при выполнении команды проигрывателем сценариев; поместите туда логику команды. Используйте [сервисы движка](/ru/guide/engine-services) для доступа к встроенным системам движка. Выполнение сценария Naninovel остановится до тех пор, пока этот метод не вернет завершенную задачу, если параметр `Wait` имеет значение `true`.

Чтобы предоставить параметр команды сценариям Naninovel, добавьте в класс команд публичное поле с одним из поддерживаемых типов:

Тип поля | Тип значения | Пример скрипта
--- | --- | ---
StringParameter | String | `LoremIpsum`, `"Lorem ipsum"`
IntegerParameter | Int32 | `10`, `0`, `-1`
DecimalParameter | Single | `0.525`, `-55.1`
BooleanParameter | Boolean | `true`, `false`
NamedStringParameter | NamedString |  `Script001.LabelName`, `.LabelName`
NamedIntegerParameter | NamedInteger | `Yuko.5`
NamedDecimalParameter | NamedFloat | `Kohaku.-10.25`
NamedBooleanParameter | NamedBoolean | `Misaki.false`
StringListParameter | List&lt;String> | `Lorem,ipsum,"doler sit amet"`
IntegerListParameter | List&lt;Int32> | `10,-1,0`
DecimalListParameter | List&lt;Single> | `0.2,10.5,-88.99`
BooleanListParameter | List&lt;Boolean> | `true,false,true`
NamedStringListParameter | List&lt;NamedString> | `Felix.Happy,Jenna.Confidence`
NamedIntegerListParameter | List&lt;NamedInteger> | `Yuko.5,Misaki.-8`
NamedDecimalListParameter | List&lt;NamedFloat> | `Nanikun.88.99,Yuko.-5.1`
NamedBooleanListParameter | List&lt;NamedBoolean> | `Misaki.false,Kohaku.true`

При необходимости можно применить атрибут `[ParameterAlias]` к полю, чтобы присвоить параметру псевдоним, позволяющий использовать его вместо имени поля при ссылке на параметр в сценариях Naninovel. Если вы хотите сделать параметр безымянным, установите константу `Command.NamelessParameterAlias` (пустая строка) в качестве псевдонима; обратите внимание, что для каждой команды разрешен только один безымянный параметр.

Чтобы сделать параметр обязательным (вызывающим регистрацию ошибки, если он не был определён в сценарии Naninovel), примените к полю атрибут `[RequiredParameter]`. Если атрибут не применяется, параметр считается необязательным.

Все типы параметров имеют свойство `HasValue`, которое можно использовать для проверки того, был ли параметр назначен в сценарии Naninovel; дополнительно можно использовать статичный метод `Command.Assigned()`, который принимает экземпляр параметра и возвращает "true", когда данный параметр не является нулевым и имеет назначенное значение.

В случае, если выполнение команды требует загрузки некоторых ресурсов, включите интерфейс `Command.IPreloadable` для предварительной загрузки необходимых ресурсов при загрузке игры.

В случае, если команда имеет параметры, которые могут быть локализованы (обычно текст, непосредственно представленный пользователю), реализуйте интерфейс `Command.ILocalizable` для добавления команды в сгенерированные документы локализации сценария.

Вы можете найти сценарии со всеми встроенными реализациями команд в папке пакета `Naninovel/Runtime/Commands`; можно использовать их в качестве примера при реализации ваших собственных пользовательских команд.

Вот пример пользовательской команды, которая может быть вызвана из сценариев Naninovel как `@HelloWorld` или `@hello` для печати `Hello World!` в консоли, а также может принять дополнительный параметр `name` (например, `@hello name:Felix`), чтобы приветствовать предоставленное имя вместо мира:

```csharp
using Naninovel.Commands;
using System.Threading;
using UniRx.Async;
using UnityEngine;

[CommandAlias("hello")]
public class HelloWorld : Command
{
    public StringParameter Name;

    public override UniTask ExecuteAsync (AsyncToken asyncToken = default)
    {
        if (Assigned(Name))
        {
            Debug.Log($"Hello, {Name}!");
        }
        else
        {
            Debug.Log("Hello World!");
        }

        return UniTask.CompletedTask;
    }
}
```

Обратите внимание на необязательный аргумент `AsyncToken`. В случае вызова каких-либо асинхронных методов обязательно проверьте токен на наличие запросов на отмену и возврат как можно скорее.

::: tip EXAMPLE
Другой пример добавления пользовательских команд для добавления/удаления элементов системы инвентаря можно найти в [примере проекта инвентаря на GitHub](https://github.com/Naninovel/Inventory).

В частности, реализации команд хранятся в директории [Runtime/Commands](https://github.com/Naninovel/Inventory/tree/master/Assets/NaninovelInventory/Runtime/Commands).
:::
