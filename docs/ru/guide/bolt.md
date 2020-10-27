# Bolt

[Bolt](https://assetstore.unity.com/packages/tools/visual-scripting/bolt-87491) – это передовое визуальное скриптовое решение для Unity, обеспечивающее максимальную гибкость как для программистов, так и для дизайнеров. 


![](https://i.gyazo.com/ab7c9d92b32810b030aba24b4bd95405.jpg)

## Установка

Скачайте и установите пакет Bolt в свой проект Naninovel. **Рекомендуется использовать Bolt v2**, так как предыдущие версии не поддерживают дженерики под платформами AOT (ядро API Naninovel широко использует дженерики).

Теперь необходимо сделать API Naninovel доступным для Bolt. Откройте распаковщик через `Tools/Bolt/Extractor...`:

![](https://i.gyazo.com/bcd6cf253b77b20f12b7557f41d2a0ae.png)

Во вкладке "Namespaces" добавьте новую запись пространства имен, найдите в списке "Naninovel", установите флажок "Hierarchy" и нажмите кнопку "Fast Extract":

![](https://i.gyazo.com/0a0460e46aa57fde767b037d6d3af70e.png)

Вот и все, теперь вы можете использовать Naninovel C# API в своих графиках Bolt.

![](https://i.gyazo.com/080106d574ea894f62ea79b7dd904ab2.png)

::: example
Пример проекта доступен на GitHub: [github.com/Naninovel/Bolt](https://github.com/Naninovel/Bolt). Имейте в виду, что ни Naninovel, ни Bolt не поставляются вместе с проектом, поэтому ошибки компиляции будут возникать после его первого открытия; импортируйте пакеты из Asset Store, чтобы решить эту проблему.
:::