//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

module swan {

    /**
     * @private
     * 默认的皮肤适配器
     */
    var assetAdapter = new DefaultAssetAdapter();
    /**
     * @language en_US
     * The Image control lets you show JPEG, PNG, and GIF files
     * at runtime. Image inherit Bitmap，so you can set the <code>bitmapData</code> property
     * to show the data. you can also set the <code>source</code> property, Image will auto load
     * and show the url image or the bitmapData.
     *
     * @event lark.Event.COMPLETE Emitted when the image loaded complete.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/extension/swan/components/ImageExample.ts
     */
    /**
     * @language zh_CN
     * Image 控件允许您在运行时显示 JPEG、PNG 等图片文件文件。Image 继承至 Bitmap，因此您可以直接对其 bitmapData 属性，
     * 赋值从外部加载得到的位图数据以显示对应图片。同时，Image 还提供了更加方便的 source 属性，source 属性可以接受一个网络图片url作为值，
     * 赋值为url后，它内部会自动去加载并显示图片。并且您同样也可以直接把 BitmapData 对象赋值给 source 属性以显示图片。
     *
     * @event lark.Event.COMPLETE 当图片加载完成后调度
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/extension/swan/components/ImageExample.ts
     */
    export class Image extends lark.Bitmap implements UIComponent {

        /**
         * @language en_US
         * Constructor.
         *
         * @param source The source used for the bitmap fill. the value can be
         * a string or an instance of <code>lark.BitmapData</code>
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 构造函数。
         *
         * @param source 用于位图填充的源。可以是一个字符串或者 <code>lark.BitmapData</code> 对象
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public constructor(source?:string|lark.BitmapData) {
            super();
            this.initializeUIValues();
            if (source) {
                this.source = source;
            }
        }

        /**
         * @private
         */
        //if lark
        private _scale9Grid:lark.Rectangle = null;
        //endif*/

        /**
         * @language en_US
         * Represent a Rectangle Area that the 9 scale area of Image.
         * Notice: This property is valid only when <code>fillMode</code>
         * is <code>BitmapFillMode.SCALE</code>.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 矩形区域，它定义素材对象的九个缩放区域。
         * 注意:此属性仅在<code>fillMode</code>为<code>BitmapFillMode.SCALE</code>时有效。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get scale9Grid():lark.Rectangle {
            //if lark
            return this._scale9Grid;
            //endif*/
            /*//if egret
            return this.$scale9Grid;
            //endif*/
        }

        public set scale9Grid(value:lark.Rectangle) {
            //if lark
            this._scale9Grid = value;
            this.invalidateDisplayList();
            //endif*/
            /*//if egret
            this.$scale9Grid = value;
            this.$invalidateContentBounds();
            this.invalidateDisplayList();
            //endif*/
        }

        /**
         * @private
         */
        //if lark
        private _fillMode:string = "scale";
        //endif*/
        /**
         * @language en_US
         * Determines how the bitmap fills in the dimensions.
         * <p>When set to <code>BitmapFillMode.CLIP</code>, the bitmap
         * ends at the edge of the region.</p>
         * <p>When set to <code>BitmapFillMode.REPEAT</code>, the bitmap
         * repeats to fill the region.</p>
         * <p>When set to <code>BitmapFillMode.SCALE</code>, the bitmap
         * stretches to fill the region.</p>
         *
         * @default <code>BitmapFillMode.SCALE</code>
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 确定位图填充尺寸的方式。
         * <p>设置为 <code>BitmapFillMode.CLIP</code>时，位图将在边缘处被截断。</p>
         * <p>设置为 <code>BitmapFillMode.REPEAT</code>时，位图将重复以填充区域。</p>
         * <p>设置为 <code>BitmapFillMode.SCALE</code>时，位图将拉伸以填充区域。</p>
         *
         * @default <code>BitmapFillMode.SCALE</code>
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get fillMode():string {
            //if lark
            return this._fillMode;
            //endif*/
            /*//if egret
            return this.$fillMode;
            //endif*/
        }

        public set fillMode(value:string) {
            //if lark
            if (value == this._fillMode) {
                return;
            }
            this._fillMode = value;
            //endif*/
            /*//if egret
            if (value == this.$fillMode) {
                return;
            }
            this.$fillMode = value;
             //endif*/
            this.invalidateDisplayList();
        }

        /*//if egret
        $setFillMode(value:string):void {
            super.$setFillMode(value);
            this.invalidateDisplayList();
        }
         //endif*/

        /**
         * @private
         */
        private sourceChanged:boolean = false;
        /**
         * @private
         */
        private _source:string|lark.BitmapData = null;
        /**
         * @language en_US
         * The source used for the bitmap fill. the value can be
         * a string or an instance of <code>lark.BitmapData</code>
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 用于位图填充的源。可以是一个字符串或者 <code>lark.BitmapData</code> 对象
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get source():string|lark.BitmapData {
            return this._source;
        }

        public set source(value:string|lark.BitmapData) {
            if (value == this._source) {
                return;
            }
            this._source = value;
            this.sourceChanged = true;
            this.invalidateProperties();
        }

        /**
         * @private
         */
        //if lark
        $setBitmapData(value:lark.BitmapData|lark.Texture):void {
            var values = this.$Bitmap;
            if (value == values[lark.sys.BitmapKeys.bitmapData]) {
                return;
            }
            super.$setBitmapData(value);
            this.sourceChanged = false;
            this.invalidateSize();
            this.invalidateDisplayList();
        }
        //endif*/
        /*//if egret
        $setBitmapData(value:egret.Texture):void {
            if (value == this.$bitmapData) {
                return;
            }
            super.$setBitmapData(value);
            this.sourceChanged = false;
            this.invalidateSize();
            this.invalidateDisplayList();
        }
         //endif*/

        /**
         * @private
         * 解析source
         */
        private parseSource():void {
            this.sourceChanged = false;
            var source = this._source;
            if (source && typeof source == "string") {
                var adapter:IAssetAdapter = this.$stage.getImplementation("swan.IAssetAdapter");
                if (!adapter) {
                    adapter = assetAdapter;
                }
                adapter.getAsset(<string>this._source, this.contentChanged, this);
            }
            else {
                this.$setBitmapData(<lark.BitmapData>source);
            }
        }

        /**
         * @private
         * 资源发生改变
         */
        private contentChanged(data:any, source:any):void {
            if (source !== this._source)
                return;
            //if lark
            if (!lark.is(data, "lark.BitmapData") && !(data instanceof lark.Texture))
            //endif*/
            /*//if egret
            if (!egret.is(data, "egret.Texture"))
             //endif*/
            {
                return;
            }
            this.$setBitmapData(data);
            if (data) {
                this.emitWith(lark.Event.COMPLETE);
            }
            else if (DEBUG) {
                lark.$warn(2301, source);
            }
        }

        /**
         * @private
         */
        //if lark
        $measureContentBounds(bounds:lark.Rectangle):void {
            var values = this.$Bitmap;
            var image = values[lark.sys.BitmapKeys.image];
            if (image) {
                var uiValues = this.$UIComponent;
                var width = uiValues[sys.UIKeys.width];
                var height = uiValues[sys.UIKeys.height];
                if (isNaN(width) || isNaN(height)) {
                    bounds.setEmpty();
                    return;
                }
                if (this._fillMode == "clip")
                {
                    if (width > values[lark.sys.BitmapKeys.width]) {
                        width = values[lark.sys.BitmapKeys.width];
                    }
                    if (height > values[lark.sys.BitmapKeys.height]) {
                        height = values[lark.sys.BitmapKeys.height];
                    }
                }
                bounds.setTo(0, 0, width, height);
            }
            else {
                bounds.setEmpty();
            }
        }
        //endif*/
        /*//if egret
        $measureContentBounds(bounds:lark.Rectangle):void {
            var values = this.$Bitmap;
            var image = this.$bitmapData;
            if (image) {
                var uiValues = this.$UIComponent;
                var width = uiValues[sys.UIKeys.width];
                var height = uiValues[sys.UIKeys.height];
                if (isNaN(width) || isNaN(height)) {
                    bounds.setEmpty();
                    return;
                }
                if (this.$fillMode == "clip")
                {
                    if (width > image.$getTextureWidth()) {
                        width = image.$getTextureWidth();
                    }
                    if (height > image.$getTextureHeight()) {
                        height = image.$getTextureHeight();
                    }
                }
                bounds.setTo(0, 0, width, height);
            }
            else {
                bounds.setEmpty();
            }
        }
         //endif*/

        /**
         * @private
         *
         * @param context
         */
        $render(context:lark.sys.RenderContext):void {
            //if lark
            var values = this.$Bitmap;
            var image = values[lark.sys.BitmapKeys.image];
            //endif*/
            /*//if egret
            var image = this.$bitmapData;
             //endif*/
            if (!image) {
                return;
            }
            var uiValues = this.$UIComponent;
            var width = uiValues[sys.UIKeys.width];
            var height = uiValues[sys.UIKeys.height];
            if (width === 0 || height === 0) {
                return;
            }
            //if lark
            switch (this._fillMode) {
                case "clip":
                    if (width > values[lark.sys.BitmapKeys.width]) {
                        width = values[lark.sys.BitmapKeys.width];
                    }
                    if (height > values[lark.sys.BitmapKeys.height]) {
                        height = values[lark.sys.BitmapKeys.height];
                    }
                    context.drawImage(image, 0, 0, width, height, 0, 0, width, height);
                    break;
                case "repeat":
                    var pattern = context.createPattern(image, "repeat");
                    context.beginPath();
                    context.rect(0, 0, width, height);
                    context.fillStyle = pattern;
                    context.fill();
                    break;
                default ://scale
                    context.imageSmoothingEnabled = values[lark.sys.BitmapKeys.smoothing];
                    if (this._scale9Grid) {
                        this.drawScale9GridImage(context, image, this._scale9Grid, width, height);
                    }
                    else {
                        context.drawImage(image, 0, 0, width, height);
                    }
                    break;
            }
            //endif*/
            /*//if egret
            egret.Bitmap.$drawImage(context, image, width, height, this.$scale9Grid, this.$fillMode, this.$smoothing, 0, 0);
            //endif*/
        }

        /**
         * @private
         * 绘制九宫格位图
         */
        //if lark
        private drawScale9GridImage(context:lark.sys.RenderContext, image:lark.BitmapData,
                                    scale9Grid:lark.Rectangle, surfaceWidth?:number, surfaceHeight?:number):void {

            var imageWidth = image.width;
            var imageHeight = image.height;

            var sourceW0 = scale9Grid.x;
            var sourceH0 = scale9Grid.y;
            var sourceW1 = scale9Grid.width;
            var sourceH1 = scale9Grid.height;

            //防止空心的情况出现。
            if (sourceH1 == 0) {
                sourceH1 = 1;
                if (sourceH0 >= imageHeight) {
                    sourceH0--;
                }
            }
            if (sourceW1 == 0) {
                sourceW1 = 1;
                if (sourceW0 >= imageWidth) {
                    sourceW0--;
                }
            }
            var sourceX0 = 0;
            var sourceX1 = sourceX0 + sourceW0;
            var sourceX2 = sourceX1 + sourceW1;
            var sourceW2 = imageWidth - sourceW0 - sourceW1;

            var sourceY0 = 0;
            var sourceY1 = sourceY0 + sourceH0;
            var sourceY2 = sourceY1 + sourceH1;
            var sourceH2 = imageHeight - sourceH0 - sourceH1;

            if (sourceW0 + sourceW2 > surfaceWidth || sourceH0 + sourceH2 > surfaceHeight) {
                context.drawImage(image, 0, 0, surfaceWidth, surfaceHeight);
                return;
            }

            var targetX0 = 0;
            var targetX1 = targetX0 + sourceW0;
            var targetX2 = targetX0 + surfaceWidth - sourceW2;
            var targetW1 = surfaceWidth - sourceW0 - sourceW2;

            var targetY0 = 0;
            var targetY1 = targetY0 + sourceH0;
            var targetY2 = targetY0 + surfaceHeight - sourceH2;
            var targetH1 = surfaceHeight - sourceH0 - sourceH2;

            //
            //             x0     x1     x2
            //          y0 +------+------+------+
            //             |      |      |      | h0
            //             |      |      |      |
            //          y1 +------+------+------+
            //             |      |      |      | h1
            //             |      |      |      |
            //          y2 +------+------+------+
            //             |      |      |      | h2
            //             |      |      |      |
            //             +------+------+------+
            //                w0     w1     w2
            //

            context.drawImage(image, sourceX0, sourceY0, sourceW0, sourceH0, targetX0, targetY0, sourceW0, sourceH0);
            context.drawImage(image, sourceX1, sourceY0, sourceW1, sourceH0, targetX1, targetY0, targetW1, sourceH0);
            context.drawImage(image, sourceX2, sourceY0, sourceW2, sourceH0, targetX2, targetY0, sourceW2, sourceH0);
            context.drawImage(image, sourceX0, sourceY1, sourceW0, sourceH1, targetX0, targetY1, sourceW0, targetH1);
            context.drawImage(image, sourceX1, sourceY1, sourceW1, sourceH1, targetX1, targetY1, targetW1, targetH1);
            context.drawImage(image, sourceX2, sourceY1, sourceW2, sourceH1, targetX2, targetY1, sourceW2, targetH1);
            context.drawImage(image, sourceX0, sourceY2, sourceW0, sourceH2, targetX0, targetY2, sourceW0, sourceH2);
            context.drawImage(image, sourceX1, sourceY2, sourceW1, sourceH2, targetX1, targetY2, targetW1, sourceH2);
            context.drawImage(image, sourceX2, sourceY2, sourceW2, sourceH2, targetX2, targetY2, sourceW2, sourceH2);
        }
        //endif*/

        //=======================UIComponent接口实现===========================
        /**
         * @private
         * UIComponentImpl 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
         */
        private initializeUIValues:()=>void;

        /**
         * @copy swan.UIComponent#createChildren
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected createChildren():void {

        }

        /**
         * @copy swan.UIComponent#childrenCreated
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected childrenCreated():void {

        }

        /**
         * @copy swan.UIComponent#commitProperties
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected commitProperties():void {
            sys.UIComponentImpl.prototype["commitProperties"].call(this);
            if (this.sourceChanged) {
                this.parseSource();
            }
        }

        /**
         * @copy swan.UIComponent#measure
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected measure():void {
            //if lark
            var values = this.$Bitmap;
            var image = values[lark.sys.BitmapKeys.image];
            if (image) {
                this.setMeasuredSize(values[lark.sys.BitmapKeys.width], values[lark.sys.BitmapKeys.height]);
            }
            else {
                this.setMeasuredSize(0, 0);
            }
            //endif*/
            /*//if egret
            var bitmapData = this.$bitmapData;
            if (bitmapData) {
                this.setMeasuredSize(bitmapData.$getTextureWidth(), bitmapData.$getTextureHeight());
            }
            else {
                this.setMeasuredSize(0, 0);
            }
            //endif*/
        }

        /**
         * @copy swan.UIComponent#updateDisplayList
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
            this.$invalidateContentBounds();
        }

        /**
         * @copy swan.UIComponent#invalidateParentLayout
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected invalidateParentLayout():void {
        }

        /**
         * @private
         */
        $UIComponent:Object;

        /**
         * @private
         */
        $includeInLayout:boolean;

        /**
         * @copy swan.UIComponent#includeInLayout
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public includeInLayout:boolean;
        /**
         * @copy swan.UIComponent#left
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public left:number;

        /**
         * @copy swan.UIComponent#right
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public right:number;

        /**
         * @copy swan.UIComponent#top
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public top:number;

        /**
         * @copy swan.UIComponent#bottom
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public bottom:number;

        /**
         * @copy swan.UIComponent#horizontalCenter
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public horizontalCenter:number;

        /**
         * @copy swan.UIComponent#verticalCenter
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public verticalCenter:number;

        /**
         * @copy swan.UIComponent#percentWidth
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public percentWidth:number;

        /**
         * @copy swan.UIComponent#percentHeight
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public percentHeight:number;

        /**
         * @copy swan.UIComponent#explicitWidth
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public explicitWidth:number;

        /**
         * @copy swan.UIComponent#explicitHeight
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public explicitHeight:number;


        /**
         * @copy swan.UIComponent#minWidth
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public minWidth:number;
        /**
         * @copy swan.UIComponent#maxWidth
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public maxWidth:number;

        /**
         * @copy swan.UIComponent#minHeight
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public minHeight:number;
        /**
         * @copy swan.UIComponent#maxHeight
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public maxHeight:number;


        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public setMeasuredSize(width:number, height:number):void {
        }

        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public invalidateProperties():void {
        }

        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public validateProperties():void {
        }

        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public invalidateSize():void {
        }

        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public validateSize(recursive?:boolean):void {
        }

        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public invalidateDisplayList():void {
        }

        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public validateDisplayList():void {
        }

        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public validateNow():void {
        }

        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public setLayoutBoundsSize(layoutWidth:number, layoutHeight:number):void {
        }

        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public setLayoutBoundsPosition(x:number, y:number):void {
        }

        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public getLayoutBounds(bounds:lark.Rectangle):void {
        }

        /**
         * @inheritDoc
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public getPreferredBounds(bounds:lark.Rectangle):void {
        }
    }

    sys.implementUIComponent(Image, lark.Bitmap);
    registerProperty(Image, "scale9Grid", "lark.Rectangle");
}