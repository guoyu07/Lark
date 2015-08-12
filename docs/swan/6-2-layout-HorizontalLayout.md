#Swan (UI库) 编程指南 - 横向布局

在横向布局，以及下面将要讲的垂直布局，格子布局中，都会忽略您在子项上的坐标设置，所有子项的位置将由布局类统一管理。

横向布局会自动将所有的子项横着排列，您可以做以下的设置：
* gap属性，设置子项之间的间距
* horizontalAlign属性，设置水平对齐方式
* verticalAlign属性，设置垂直对齐方式
* padding属性，设置容器内间距，如果需要分开设置可以使用paddingTop,paddingBottom,paddingLeft,paddingRight

示例：    
``` TypeScript
var hLayout:egret.gui.HorizontalLayout = new egret.gui.HorizontalLayout();
hLayout.gap = 10;
hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
hLayout.padding = 10;
hLayout.verticalAlign = egret.VerticalAlign.MIDDLE;
this.myGroup.layout = hLayout;//横向布局
```              
效果如图：
<!--
![][6-1-layout-BasicLayout-center]     


[6-1-layout-BasicLayout-center]: image/6/6-1-layout-BasicLayout-center.png
-->

