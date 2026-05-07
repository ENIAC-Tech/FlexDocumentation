# Flexbar 页面结构和如何在 Flexbar 上导航

## 树形结构文件夹页面

Flexbar 使用类似树形的页面（文件夹）结构来包含和管理所有按键。当您启动 Flexbar 时，它从默认的"主页"开始。在任何页面上，您都可以添加按键或拖入称为"页面"的子页面。您甚至可以在另一个"页面"内添加更多嵌套的"页面"。这类似于在计算机上管理文件夹，让您可以自由创建、分类、存储和快速切换不同的快捷键集合。有关如何在页面之间导航的详细信息，请继续阅读。

![1743734044556](/image/navigation/1743734044556.png)

![1743734049690](/image/navigation/1743734049690.png)

![1743734054459](/image/navigation/1743734054459.png)

···

## 如何添加

在右侧的按键库中，在导航类别下，您可以找到"页面"按键并将其拖到虚拟 Flexbar 上。

![1743734083123](/image/navigation/1743734083123.png)

> 嵌套子页面总共支持最多 15 级（从"主页"开始计算）。
>
> 您可以重命名页面或自定义其外观，就像任何其他按键一样（"主页"不能重命名，因为它不是按键）。
>
> 在 Flexbar Designer 中，当前页面路径"home/page"显示在虚拟 Flexbar 的顶部。
>
> 在 Flexbar Designer 中，如果页面为空，虚拟 Flexbar 上不会显示任何内容。但是，在真实的 Flexbar 设备上，将显示"⚠️空页面"。

## 自动切换到关联应用程序

Check out the [Content aware controls](../../troubleshoting/content_aware_controls) to learn how to set it up

## 如何在 Flexbar 上导航

Flexbar 有两个侧边触摸板（非显示区域），默认设置为导航按键。

默认情况下，左侧触摸板是"返回"按键，将您带回上一页。右侧设置为"跳转到"按键，直接将您带回"主页"。

## 在 Flexbar Designer 中的虚拟 Flexbar 上导航

![1743734349089](/image/navigation/1743734349089.png)

Double-click a Page or navigation key to enter/return/jump.
Single-click opens the configuration for that Page/Key, same as all other keys.

## 在真实 Flexbar 上导航

单击任何页面或导航按键进入/返回/跳转。

## 如何添加

您可以在右侧导航类别下的按键库中找到"返回"和"跳转到"按键。只需将它们拖到虚拟 Flexbar 上即可。

![1743734366773](/image/navigation/1743734366773.png)

> "跳转到"可以跳转到 Flexbar 中的任何路径。在其配置的"功能"选项卡下设置。
>
> The side touch pads can be assigned different functions. When you open the drawer, place a key closest to the touch pad to have the touch pad perform that key’s function. For more details, see the "Touch Pad and Drawer" chapter.
>
> When you flip the Flexbar screen in "Flexbar Setting", the touch pads’ functions also flip accordingly.
