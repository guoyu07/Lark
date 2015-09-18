#Swan (UI库) 编程指南 - 简单容器( Group )

在 Swan 提供的容器中，swan.Group是最轻量级的，它本身不可以设置皮肤，也不会具备外观，它的呈现只取决于内部的显示对象。如果您需要使用容器，并且没有设置皮肤的需求，那么请尽量使用Group。     

为了保持习惯和风格统一，在 swan.Group 中对于显示列表的操作，与 lark.Sprite 大体相同：使用 addChild，addChildAt，removeChild，removeChildAt，getChildIndex，setChilcIndex，swapChildren 这几个方法都是完全一致的。    

另外在两个方法上有专门适用于 Swan 的变体：getChildAt 和 numChildren。这两个方法在 Swan 上分别增加了 getElementAt  和 numElements 。这两个方法都带 Element 
，对应于GUI体系中的布局元素，我们称之为布局元素操作方法。 
    
这两个布局元素操作方法，在 DataGroup 里是有区别的，在 Group 里没区别。因为 DataGroup 里实际上只有几个复用的子项，getChildAt 一直返回那几个 item 显示对象，getElementAt 就会按数据源项返回。     

如果您自定义一个类，继承自Group，那么注意，内部的其它对象应该在 createChildren() 方法中创建和添加，也就是说，您要覆盖 Group 的 createChildren() 方法。参见下面的例子：   
``` TypeScript
class Main extends swan.Group {

    constructor() {
        super();
    }

    protected createChildren():void {
        lark.log( "createChildren" );
        super.createChildren();

        this.layContents();
    }


    private layContents():void {
        new swan.Theme("resource/theme/"+"blue"+"-theme.json", this.stage);
        this.myGroup = new swan.Group();
        this.myGroup.x = 100;
        this.myGroup.y = 100;
        this.myGroup.width = 500;
        this.myGroup.height = 300;
        this.addChild( this.myGroup );
        
        /// 绘制矩形用于显示 myGroup 的轮廓
        var outline:lark.Shape = new lark.Shape;
        outline.graphics.strokeStyle = 0x00ff00;
        outline.graphics.beginPath();
        outline.graphics.strokeRect( 0, 0, 500, 300 );
        this.myGroup.addChild( outline );
        
        this.myGroup.layout = new swan.BasicLayout();   ///用绝对定位，控制xy坐标
        for(var i:number=0;i<4;i++) {
        var btn:swan.Button = new swan.Button();
        btn.label = "button" + i;
        btn.x = 10 + i * 30;
        btn.y = 10 + i * 30;
        this.myGroup.addChild( btn );
        }
		
    }
```       
编译运行，效果如图：   

![][8-1-group]

一些使用技巧：   

 * Group和所有其他GUI组件都遵循一个原则：组件在没被外部显式设置尺寸(直接设置 width/height)的前提下。会自己测量出一个“合适”的大小。这时候 Group 宽高就是 contentWidth 和 contentHeight 的宽高。如果您显式设置了 Group 的尺寸，则它的尺寸不一定等于内部对象尺寸，比如您的Group高度是 100 像素，但内部几个按钮的高度加起来可能是 400 像素。您可以使用 contentWidth 和 contentHeight 属性来获取内部高度。
 * 如果内容尺寸超出容器尺寸，默认是全部显示的，您可以设置 clipAndEnableScrolling 为 true ，这样超出的部分就不再显示了。


[8-1-group]: image/8/8-1-group.jpg
