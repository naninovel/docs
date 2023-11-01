# 背包

尽管背包系统在VN类游戏中可能不太适用，我们也有很多整合进Naninovel的要求和问题需要说明。[GitHub示例](https://github.com/Naninovel/Inventory) 是关于将背包，创建和作为扩展整合进Naninovel的示例，帮你快速完成设置。

示例演示了如何为背包应用网格布局，页码和拖拽窗口，添加自定义引擎服务和相关配置菜单，添加按键绑定，使用状态外包，自定义的特定作者预设命令和表达式方法。

![](https://i.gyazo.com/86c577f007daf4ec5d79c0e91db7bc10.mp4)

你可以使用git客户端[克隆存储库](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) 或是 [下载为zip存档](https://github.com/Naninovel/Demo/archive/master.zip) 。

::: warning
注意，其中不包含Naninovel资源包，第一次打开会产生编译错误，导入资源以解决报错。
:::

## 安装

要为已有项目添加背包扩展，使用[UPM](https://docs.unity3d.com/Manual/upm-ui.html) 通过以下git链接导入包：
`https://github.com/Naninovel/Inventory.git?path=Assets/NaninovelInventory`  或是使用下载[NaninovelInventory.unitypackage](https://github.com/Naninovel/Inventory/raw/master/NaninovelInventory.unitypackage) 手动添加。

![](https://i.gyazo.com/b54e9daa9a483d9bf7f74f0e94b2d38a.gif)

## 使用

要根据模板创建一个背包UI，从菜单`Create -> Naninovel -> Inventory -> Inventory UI` 选择。然后在 `Naninovel -> Resources -> UI` 将预制体添加到UI资源管理。添加后，UI就可以像其他UI一样通过[@showUI] 和 [@hideUI] 命令显示隐藏了。

背包UI有 `Capacity` 属性，用于改变背包栏位数量。栏位排版通过 `Content/InventoryGrid` 物体上组件配置（栏位数量，布局，每页数量等）。拖拽窗口可以通过 `Content` 物体的 `Drag Drop` 组件配置（关闭）。

背包物体预制体可以在 `Create -> Naninovel -> Inventory -> Inventory Item` 菜单创建。之后需要在 `Naninovel -> Resources -> Inventory` 注册至背包资源管理。

![](https://i.gyazo.com/6062f8a433a47306f582a849c7bbf57e.png)

在通过编辑器菜单添加多个预制体的时候，可能并不方便，在
`Resources/Naninovel/Inventory` 目录下直接拖入资源，这样添加也是可以的。他们就会被自动被注册至脚本。你也可以通过子文件夹来管理相应资源。脚本中需要使用(`/`)调用。比如`Resources/Naninovel/Inventory/Armor/FullPlate.prefab` 的资源，脚本中的调用为： `Armor/FullPlate`。

使用[可寻址资源系统](/zh/guide/resource-providers#寻址资源系统) 来手动公开资源也是可以的。公开资源地址和上述相同，但是需要省略"Resources/"部分。比如开放 "FullPlate.prefab" 背景音乐，注册地址为`Naninovel/Inventory/FullPlate`。注意，该系统默认不启用你可以通过资源配置菜单的`Enable Addressable In Editor`属性来启用。

每个物体都有 `Stack Count Limit` （单堆数量限制）属性，用于限制一个背包栏位的同物体可以存储多少个， `On Item Used` 事件，是在道具使用时调用（通过 `@useItem` 命令使用，或是玩家点击背包使用时）。如下是该事件的使用示例，使用道具后会运行 `Play Script` 组件的效果，使用后移除该道具，生成数字故障的效果，并打印一条消息：

![](https://i.gyazo.com/010a9ba35db607ba46d78eda3513f678.png)

你可以通过 `@addItem` 向背包添加道具，或使用`@removeItem` (或者`@removeItemAt`, `@removeAllItems`)来移除。道具ID和道具预制体一致。背包栏位ID和网格栏位的序号一致（比如，第一个栏位为0.第二个为1，以此类推）。

`ItemExist()` 和 `ItemCount()` 自定义 [表达式函数](/zh/guide/script-expressions#表达式函数) 方便用于检查道具是否存在于背包中，及道具数量。

以下为示例：

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
