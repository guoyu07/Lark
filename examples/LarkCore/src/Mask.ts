class Mask extends lark.Sprite {

    mask:lark.Sprite;
    productBmp:lark.Bitmap;

    constructor() {
        super();

        var imageLoader = new Loader();
        imageLoader.once(lark.Event.COMPLETE,e=>this.onLoaded(imageLoader.images),this);
        imageLoader.loadImages([
            "resources/lark.png",
            "resources/blendModeBG.jpg"
        ]);
    }

    private onLoaded(images:any){

        var larkBitmapData = images["resources/lark.png"];
        var productsBitmapData = images["resources/blendModeBG.jpg"];

        var productBmp = new lark.Bitmap(productsBitmapData);
        this.addChild(productBmp);

        var larkBmp = new lark.Bitmap(larkBitmapData);
        larkBmp.x = -larkBmp.width /2;
        larkBmp.y = -larkBmp.height /2;
        var mask = new lark.Sprite();
        mask.width = 0;
        mask.height = 0;
        mask.addChild(larkBmp);
        this.addChild(mask);

        productBmp.mask = mask;

        this.mask = mask;
        this.productBmp = productBmp;
        this.annimate();
        this.stage.frameRate = 60;
    }

    private annimate(){

        Tween.get(this.mask)
            .to({rotation:360,x:300,y:150},2000,lark.Ease.cubicInOut)
            .to({rotation:360,x:75,y:100},2000,lark.Ease.cubicInOut)
            .call(()=>this.annimate());
    }
}