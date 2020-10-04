# Выражения сценария

При написании сценариев naninovel можно вводить конструкции выражений в значения параметров команд и общие текстовые строки с помощью фигурных скобок `{}`:

```nani
One plus two equals {1 + 2}.
```

— выведет "One plus two equals 3" при исполнении сценария.

Вы можете использовать любые математические и логические операторы, а также все математические функции из пространств имён [UnityEngine.Mathf](https://docs.unity3d.com/ScriptReference/Mathf.html) и [System.Math](https://docs.microsoft.com/en-us/dotnet/api/system.math#methods):

```nani
@char Kohaku scale:{Pow(Cosh(33.5), 3) % Log(0.5)}
```

– будет масштабировать персонажа с ID "Kohaku" со значением от деления гиперболического косинуса угла в 33,5 °, возведённого в третью степень, на натуральный логарифм от 0,5.

Выражение вычисляется в момент выполнения команды, что позволяет использовать [пользовательские переменные](/ru/guide/custom-variables.md) внутри выражений:

```nani
@input color summary:"What's your favorite color?"
@stop
{color}, huh? { color == "orange" ? "Mine too!" : "I see..."}
```

— выведет пользовательский интерфейс ввода, позволяющий игроку ввести свой любимый цвет, назначив его пользовательской переменной `color`, а затем распечатать введенный цвет, а затем либо "Mine too!" – на случай, если это "orange", или же "I see...".

Чтобы отличить обычное текстовое значение от имени переменной, заключите его в двойные кавычки `"`:

```nani
This is just a plain text: { "score" }.
And this is the value of "score" variable: { score }.
```

Если вы хотите включить двойные кавычки в выражение, экранируйте их **дважды**:

```nani
Saying { \\"Stop the car\\" } was a mistake.
```

Выражения сценария с использованием команд [@set] и [@if] (а также `set` и `if` параметры в других командах) не требуют фигурных скобок:

```nani
@set randomScore=Random(-100,100)
@goto EpicLabel if:Abs(randomScore)>=50
```

Однако, как и во всех других значениях параметров, если вы хотите использовать пробелы внутри выражений, вам следует заключить их в двойные кавычки:

```nani
@set "randomScore = Random(-100, 100)"
@goto EpicLabel if:"Abs(randomScore) >= 50"
```

Чтобы напечатать фигурные скобки внутри общей текстовой строки и предотвратить их распознавание как начальных и конечных литералов выражения, экранируйте фигурные скобки с помощью обратной косой черты, например:

```nani
Some text \{ text inside braces \}
```

— напечатает "Some text { text inside braces }" в игре.

## Функции выражений

Внутри выражений сценария также можно использовать следующие функции.

<div class="config-table">

Сигнатура? | Описание | Пример
--- | --- | ---
Random (*System.Double* min, *System.Double* max) | Возвращает случайное число с плавающей точкой между минимальным [включительно] и максимальным [включительно] значениями. | `Random(0.1, 0.85)`
Random (*System.Int32* min, *System.Int32* max) | Возвращает случайное целое число между минимальным [включительно] и максимальным [включительно] значениями. | `Random(0, 100)`
Random (*System.String[]* args) | Возвращает одну случайную из предоставленных строк. | `Random("Foo", "Bar", "Foobar")`
CalculateProgress () | Возвращает число с плавающей точкой в диапазоне от 0.0 до 1.0, представляющее, сколько уникальных команд было когда-либо выполнено по сравнению с общим числом команд во всех доступных скриптах Naninovel. 1.0 означает, что игрок `прочитал` или `увидел` весь доступный игровой контент. Перед использованием этой функции убедитесь, что в меню конфигурации скрипта включена функция `Count Total Commands`. | `CalculateProgress()`

</div>

## Добавление пользовательских функций

Можно добавить пользовательские функции выражений, присваивая атрибут `ExpressionFunctions` статическому классу C#. Все открытые методы этого класса с совместимыми сигнатурами будут автоматически доступны в выражениях сценария.

Совместимые подписи – это те, которые принимают и возвращают [простые](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/value-types#simple-types) и строковые типы, а также массивы этих типов (с ключевым словом `params`).

```csharp
[Naninovel.ExpressionFunctions]
public static class CustomFunctions
{
	// Возвращает предоставленную строку, конвертировав все её символы в нижний регистр.
    public static string ToLower (string content) => content.ToLower();

    // Возвращает сумму предоставленных чисел.
    public static int Add (int a, int b) => a + b;

    // Возвращает одну случайную из предоставленных строк.
    public static string Random (params string[] args) 
	{
		if (args == null || args.Length == 0) 
			return default;
        
        var randomIndex = UnityEngine.Random.Range(0, args.Length);
		return args[randomIndex];
	} 
}
```

::: example
Другой пример добавления пользовательских функций выражений для проверки наличия элемента в инвентаре можно найти в проекте [пример инвентаря на GitHub](https://github.com/Elringus/NaninovelInventory).

В частности, пользовательские функции реализуются через сценарий выполнения [Inventory Functions.cs](https://github.com/Elringus/NaninovelInventory/blob/master/Assets/NaninovelInventory/Runtime/InventoryFunctions.cs).
:::



