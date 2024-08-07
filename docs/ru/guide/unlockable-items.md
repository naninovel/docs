# Разблокируемые элементы

Функция разблокировки позволяет управлять элементами, которые имеют постоянное состояние блокировки или разблокировки. Вы можете использовать его различными способами, например, для представления слотов в CG или видеогалерее, достижений, советов и других систем, где некоторвый объект должен быть в состоянии стать разблокированным или активированным, когда игрок выполняет требуемое условие.

Каждый разблокируемый элемент представлен строковым идентификатором и булевым значением, указывающим, разблокирован ли элемент. В сценариях Naninovel используйте команды [@unlock] и [@lock], чтобы соответственно разблокировать и заблокировать элемент с определенным ID, например:

```nani
@unlock SecretAchievement
```
— разблокирует предмет `SecretAchievement`, а
```nani
@lock SecretAchievement
```
— снова заблокирует его.

Состояние блокировки элементов хранится в разделе [глобального состояния](/ru/guide/state-management#глобальное-состояние) и не зависит от локальных игровых сессий; например, если вы разблокируете какой-то элемент, он не будет снова заблокирован, когда игрок начнет новую игру или загрузит другую сохраненную игру.

Чтобы привязать фактический [GameObject](https://docs.unity3d.com/Manual/class-GameObject.html) к разблокируемому элементу, используйте компонент `UnlockableTrigger`:

![](https://i.gyazo.com/9e92d5296e5f07d68ce6122ccb1da34a.png)

Установите ID элемента в поле `Unlockable Item Id` и привяжите к нему команду, которая должна быть выполнена, когда элемент разблокирован. Например, на приведенном выше рисунке GameObject активируется, когда `SecretAchievement` разблокировано, и наоборот.

В C# вы можете получить доступ к разблокируемым элементам с помощью [сервиса движка](/ru/guide/engine-services) `Unlockable Manager`.

## Разблокируемые Ресурсы

В меню конфигурации разблокируемых элементов (`Naninovel -> Configuration -> Unlockables`) вы можете найти менеджер ресурсов, который позволяет хранить произвольные ресурсы, используемые с функцией разблокировки.

![](https://i.gyazo.com/17fa198861ed72de3ab1f9dc6b02b3d8.png)

Разблокируемые ресурсы используются встроенными разблокируемыми системами, такими как [галерея CG](/ru/guide/unlockable-items#галерея-CG). Вы также можете использовать менеджер для своих собственных пользовательских систем.

## Галерея CG

Используя функцию галереи CG, вы можете указать ресурсы текстур (изображения), которые могут быть разблокировываться в течение игры, а затем просмотрены через UI `ICGGalleryUI`, доступный в главном меню.

![](https://www.youtube.com/watch?v=wkZeszk6gm0)

По умолчанию все разблокируемые текстурные ресурсы с префиксом `CG`, добавленные через [менеджер разблокируемых ресурсов](/ru/guide/unlockable-items#unlockable-resources), и [фоновые](/ru/guide/backgrounds) спрайтовые ресурсы актора `MainBackground` с тем же префиксом будут считаться разблокируемыми элементами CG.

Чтобы добавить разблокируемый элемент CG в галерею, вы можете либо использовать один из существующих основных фоновых ресурсов, добавив `CG` к его пути:

![](https://i.gyazo.com/83a6eff3f91c05027ba1fbc5098e03c2.png)

— или добавить "автономную" текстуру, используя менеджер разблокируемых ресурсов, доступный через `Naninovel -> Resources -> Unlockables`:

![](https://i.gyazo.com/236bddfd0a02c18b94153cfb7189a877.png)

Независимо от того, какой способ вы выберете, вы можете разблокировать и заблокировать элементы с помощью команд [@unlock] и [@lock] соответственно.

Например, чтобы разблокировать элемент `CG/Map`, добавленный на иллюстрациях выше, используйте следующую команду скрипта:

```nani
@unlock CG/Map
```

Если для добавления элементов CG вы будете использовать как разблокируемые ресурсы, так и ресурсы фонов, то сначала в галерее CG будут отображаться ресурсы, указанные в диспетчере разблокируемых объектов. Вы можете изменить это поведение, а также актуальные источники, из которых извлекаются доступные ресурсы CG, используя свойство `Cg Sources` скрипта `CG Gallery Panel`, прикрепленного к корню префаба UI, представляющего галерею CG (встроенная реализация, хранящаяся в `Naninovel/Prefabs/DefaultUI/ICGGalleryUI.CGGalleryPanel`).

![](https://i.gyazo.com/c62c69eea8d6b1147aacb178dcaa9347.png)

Когда в любой из источников будет добавлен хотя бы один элемент CG (независимо от разблокированного состояния), в главном меню появится кнопка `CG GALLERY`, позволяющая получить доступ к браузеру галереи.

Вы можете изменить или полностью заменить встроенную реализацию `ICGGalleryUI` с помощью функции [кастомизации UI](/ru/guide/user-interface#кастомизация-UI).

## Подсказки

Система разблокируемых подсказок позволяет указать набор текстовых записей с помощью локализуемых документов [управляемого текста](/ru/guide/managed-text); затем записи могут быть разблокированы на протяжении всей игры и просмотрены через пользовательский интерфейс `ITipsUI`, доступный из главного меню и панелей управления текстовым принтером.

Эта система может быть использована для создания внутриигрового словаря/энциклопедии или трекера достижений.

![](https://www.youtube.com/watch?v=CRZuS1u_J4c)

Чтобы определить доступные подсказки, создайте текстовый документ `Tips.txt` внутри каталога ресурсов [управляемого текста](/ru/guide/managed-text) (по умолчанию `Resources/Naninovel/Text`). Каждая строка идентифицирует одну запись подсказки. Строка должна начинаться с ID подсказки, за которым следует двоеточие; затем следует указать название подсказки, категорию (необязательно) и описание, разделенные вертикальными линиями (`|`), например:

```
Tip1ID: Tip 1 Title | Tip 1 Category | Tip 1 Description
Tip2ID: Tip 2 Title | Tip 2 Description
Tip3ID: Tip 3 Title
Tip4ID: Tip 4 Title | Tip 4 Category
...
```

Вы можете использовать теги [Rich text](https://docs.unity3d.com/Manual/StyledText.html) и вставлять разрывы строк (`\n`) в раздел описания подсказки.

Когда есть хотя бы одна запись подсказки в управляемом текстовом документе `Tips.txt`, в главном меню и панелях управления появятся кнопки "TIPS", ведущие к браузеру подсказок.

Чтобы разблокировать запись подсказки, используйте [@unlock] и [@lock] для блокировки записи обратно с последующим ID подсказки (всегда должен предшествовать префикс `Tips/`) в сценариях Naninovel. Например, чтобы разблокировать запись подсказки `Tip1ID`, используйте:

```nani
@unlock Tips/Tip1ID
```
