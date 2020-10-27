# Инвентарь

Хотя система инвентаря несколько не в духе игр вроде VN, нам поступило много запросов и просьб интегрировать таковую в Naninovel. [Проект на GitHub](https://github.com/Naninovel/Inventory) служит как примером для создания и интеграции инвентаря в движок, так и расширением, которое вы можете легко настроить для Naninovel.

Демонтрационный проект показывает, как создать пользовательский интерфейс инвентаря с макетом сетки, разбиением на страницы и перетаскиванием окна, как добавить пользовательский сервис движка и связанное с ним меню конфигурации, добавить вводные привязки, использовать аутсорсинг состояния, авторские пользовательские команды сценария и функции выражений.

[!86c577f007daf4ec5d79c0e91db7bc10]

Вы можете [клонировать репозиторий проекта с помощью клиента Git](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) или [скачать его в виде zip-архива](https://github.com/Naninovel/Demo/archive/master.zip). 

::: warn
Пакет Naninovel не распространяется вместе с проектом, поэтому ошибки компиляции будут создаваться после его первого открытия; импортируйте Naninovel из Asset Store, чтобы исправить эти ошибки.
:::

## Установка

Чтобы настроить расширение инвентаря для существующего проекта Unity, используйте [UPM](https://docs.unity3d.com/Manual/upm-ui.html) чтобы установить пакет через следующий URL-адрес Git: `https://github.com/Naninovel/Inventory.git?path=Assets/NaninovelInventory`; или скачайте и импортируйте [NaninovelInventory.unitypackage](https://github.com/Naninovel/Inventory/raw/master/NaninovelInventory.unitypackage) вручную.

![](https://i.gyazo.com/b54e9daa9a483d9bf7f74f0e94b2d38a.gif)

## Использование

Чтобы создать готовый интерфейс инвентаря из шаблона, используйте контекстное меню ассета `Create -> Naninovel -> Inventory -> Inventory UI`. Затем добавьте префаб для ресурсов UI Naninovel через меню редактора `Naninovel -> Resources -> UI`. После добавления интерфейс может быть показан/скрыт, как и все другие UI, с помощью команд [@showUI] и [@hideUI].

Компонент UI инвентаря имеет свойство `Capacity`, с помощью которого вы можете изменить количество слотов в инвентаре. Сетка слотов настраивается (номер слота и макет, слоты на странице и т.д.) с помощью игрового объекта `Content/InventoryGrid`. Поведение перетаскивания окна можно настроить (отключить) с помощью компонента `Drag Drop`, прикрепленного к игровому объекту `Content`.

Префабы предметов инвентаря можно создать с помощью контекстного меню ассета `Create -> Naninovel -> Inventory -> Inventory Item`. Затем префабы предметов должны быть назначены в качестве ресурсов инвентаря через меню редактора `Naninovel -> Resources -> Inventory`.

![](https://i.gyazo.com/6062f8a433a47306f582a849c7bbf57e.png)

Если у вас много предметов и их неудобно назначать через меню редактора, можно просто поместить их в папку `Resources/Naninovel/Inventory`, и они автоматически будут предоставлены движку. Вы можете дополнительно организовать их с помощью подпапок, если хотите; в этом случае используйте прямые косые черты (`/`) при ссылке на них в сценариях Naninovel. Например, элемент, сохранённый как `Resources/Naninovel/Inventory/Armor/FullPlate.prefab`, может использоваться в сценариях в качестве `Armor/FullPlate`.

Также можно использовать [адресируемую систему ассетов](/ru/guide/resource-providers.md#адресация ) для ручного предоставления ресурсов. Чтобы предоставить доступ к ассету, назначьте адрес, равный пути, который вы использовали бы для его предоставления с помощью описанного выше метода, за исключением опущенной части "Resources/". Например, выставить "FullPlate.prefab", назначьте префабу следующий адрес:`Naninovel/Inventory/FullPlate`. Имейте в виду, что адресируемый провайдер по умолчанию не используется в редакторе; вы можете разрешить его, включив свойство `Enable Addressable In Editor` в меню конфигурации провайдера ресурсов.

Каждый предмет имеет свойство `Stack Count Limit`, чтобы ограничить количество предметов этого типа, которые могут быть уложены в один слот инвентаря, и событие Unity `On Item Used`, которое вызывается при использовании предмета (либо с помощью команды `@useItem`, либо когда пользователь нажимает на предмет в инвентаре). Ниже приведен пример того, как вы можете настроить событие с помощью компонента `Play Script`, чтобы удалить предмет после его использования, создать спецэффект сбоя и вывести текстовое сообщение.

![](https://i.gyazo.com/010a9ba35db607ba46d78eda3513f678.png)

Вы можете добавить предметы в инвентарь с помощью команды `@addItem` и удалить с помощью команды  `@removeItem` (или `@removeItemAt`, `@removeAllItems`). ID предметов равны именам их префабов. ID слотов инвентаря равны индексам слотов сетки (например, первый слот равен 0, второй – 1 и т.д.).

[Пользовательские функции](/ru/guide/script-expressions.md#expression-functions) `ItemExist()` и `ItemCount()` для проверки наличия предметов в инвентаре и количества существующих предметов также доступны для удобства.

Ниже приведен скрипт из демонстрационного проекта:

```nani
# Start

Select an action.[skipInput]

@choice "Pick up sword" if:!ItemExist("Sword") do:"@addItem Sword, @goto .Adventure"
@choice "Pick up armor" if:!ItemExist("Armor") do:"@addItem Armor, @goto .Adventure"
@choice "Adventure awaits, venture forth!"
@stop

# Adventure

@if ItemExist("Sword")
	@set monstersSlayed="{ItemExist("Armor") ? Random(3,5) : 2}"
	@addItem Food amount:{monstersSlayed}
	You've encountered and slayed {monstersSlayed} monsters with your sword.[if !ItemExist("Armor")] You could've been more productive with an armor, though.[endif][i][showUI Inventory wait:false] Check your inventory for the loot!
	@goto .Start
@else
	But you don't have a weapon! You've been beaten by the monsters.[if ItemExist("Armor")] At least it didn't hurt that much, thanks to the armor.[endif] Let's prepare better next time.
	@goto .Start
@endif
```