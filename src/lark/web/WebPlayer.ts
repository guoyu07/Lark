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

module lark.web {

    interface PlayerOption {
        /**
         * 入口类完整类名
         */
        entryClassName?:string;
        /**
         * 默认帧率
         */
        frameRate?:number;
        /**
         * 屏幕适配模式
         */
        scaleMode?:string;
        /**
         * 初始内容宽度
         */
        contentWidth?:number;
        /**
         * 初始内容高度
         */
        contentHeight?:number;
        /**
         * 屏幕方向
         */
        orientation?:string;
        /**
         * 是否显示重绘区域
         */
        showPaintRect?:boolean;
        /**
         * 显示FPS
         */
        showFPS?:boolean;
        /**
         * 显示日志
         */
        showLog?:boolean;
        /**
         * 过滤日志的正则表达式
         */
        logFilter?: string;

        /**
         * HighResolution
         */
        highResolutionMode?: string;
    }

    export class WebPlayer extends LarkObject implements lark.sys.Screen {

        public constructor(container:HTMLDivElement) {
            super();
            this.init(container);
        }

        private init(container:HTMLDivElement):void {
            var option = this.readOption(container);
            var stage = new lark.Stage();
            stage.$screen = this;
            stage.$scaleMode = option.scaleMode;
            stage.$highResolutionMode = option.highResolutionMode;
            stage.frameRate = option.frameRate;
            var surface = lark.sys.surfaceFactory.create();
            var canvas = <HTMLCanvasElement><any>surface;
            this.attachCanvas(container, canvas);
            var webTouch = new WebTouchHandler(stage, canvas);
            var webText = new WebTextAdapter(container, stage, canvas);
            var player = new lark.sys.Player(surface.renderContext, stage, option.entryClassName);
            if (DEBUG) {
                player.showPaintRect(option.showPaintRect);
                if (option.showFPS || option.showLog) {
                    player.displayFPS(option.showFPS, option.showLog, option.logFilter);
                }
            }
            this.playerOption = option;
            this.container = container;
            this.canvas = canvas;
            this.stage = stage;
            this.player = player;
            this.webTextAdapter = webText;
            this.webTouchHandler = webTouch;
            this.updateScreenSize();
            player.start();
        }

        /**
         * 读取初始化参数
         */
        private readOption(container:HTMLDivElement):PlayerOption {
            var option:PlayerOption = {};
            option.entryClassName = container.getAttribute("data-entry-class");
            option.scaleMode = container.getAttribute("data-scale-mode") || lark.StageScaleMode.NO_SCALE;
            option.frameRate = +container.getAttribute("data-frame-rate") || 30;
            option.contentWidth = +container.getAttribute("data-content-width") || 480;
            option.contentHeight = +container.getAttribute("data-content-height") || 800;
            option.orientation = container.getAttribute("data-orientation") || lark.sys.OrientationMode.AUTO;
            option.highResolutionMode = container.getAttribute("data-resolution-mode") || lark.sys.HighResolutionMode.DEFAULT;
            if (DEBUG) {
                option.showPaintRect = container.getAttribute("data-show-paint-rect") == "true";
                option.showFPS = container.getAttribute("data-show-fps") == "true";
                option.showLog = container.getAttribute("data-show-log") == "true";
                option.logFilter = container.getAttribute("data-log-filter");
            }
            return option;
        }

        /**
         * @private
         * 添加canvas到container。
         */
        private attachCanvas(container:HTMLElement, canvas:HTMLCanvasElement):void {

            var style = canvas.style;
            style.cursor = "default";
            style.position = "absolute";
            style.top = "0";
            style.bottom = "0";
            style.left = "0";
            style.right = "0";
            container.appendChild(canvas);
            style = container.style;
            style.overflow = "hidden";
            style.position = "relative";
        }

        private playerOption:PlayerOption;

        /**
         * @private
         * 画布实例
         */
        private canvas:HTMLCanvasElement;
        /**
         * @private
         * 播放器容器实例
         */
        private container:HTMLElement;

        /**
         * @private
         * 舞台引用
         */
        private stage:Stage;

        private webTouchHandler:WebTouchHandler;
        private webTextAdapter:WebTextAdapter;
        private player:lark.sys.Player;

        /**
         * @private
         * 更新播放器视口尺寸
         */
        public updateScreenSize():void {
            var canvas = this.canvas;
            var option = this.playerOption;
            var devicePixelRatio = Capabilities.$devicePixelRatio;
            var stagePixelRatio = 1;
            var screenRect = this.container.getBoundingClientRect();
            var ormode = this.calculateOrientationMode(option, screenRect),
                shouldRotate = ormode.shouldRotate,
                rotation = ormode.rotation;
            var scaleMode = this.stage.$scaleMode,
                highResolutionMode = this.stage.$highResolutionMode;

            var screenWidth = shouldRotate ? screenRect.height : screenRect.width;
            var screenHeight = shouldRotate ? screenRect.width : screenRect.height;
            var stageSize = lark.sys.screenAdapter.calculateStageSize(scaleMode,
                screenWidth, screenHeight, option.contentWidth, option.contentHeight);
            var stageWidth = stageSize.stageWidth,
                stageHeight = stageSize.stageHeight;
            var displayWidth = stageSize.displayWidth,
                displayHeight = stageSize.displayHeight;
            var canvasWidth = stageWidth,
                canvasHeight = stageHeight;
            if (scaleMode == StageScaleMode.NO_SCALE) {
                if (highResolutionMode != sys.HighResolutionMode.DEFAULT) {
                    canvasWidth *= devicePixelRatio;
                    canvasHeight *= devicePixelRatio;
                    if (highResolutionMode == sys.HighResolutionMode.DEVICE) {
                        stageWidth *= devicePixelRatio;
                        stageHeight *= devicePixelRatio;
                    }
                    if (highResolutionMode == sys.HighResolutionMode.HIGH_DPI) {
                        stagePixelRatio = devicePixelRatio;
                    }
                }
            }

            canvas.style.width = displayWidth + "px";
            canvas.style.height = displayHeight + "px";
            canvas.style.top = (screenRect.height - displayHeight) / 2 + "px";
            canvas.style.left = (screenRect.width - displayWidth) / 2 + "px";
            if (canvas.width !== canvasWidth) 
                canvas.width = canvasWidth;
            if (canvas.height !== canvasHeight) 
                canvas.height = canvasHeight;
            console.log(canvas.width);
            var transform = `rotate(${ rotation }deg)`;
            canvas.style['webkitTransform'] = transform;
            canvas.style.transform = transform;
            this.player.updateStageSize(stageWidth, stageHeight, stagePixelRatio);
            var scaleX = displayWidth / stageWidth;
            var scaleY = displayHeight / stageHeight;
            this.webTouchHandler.updateScaleMode(scaleX, scaleY, rotation);
            this.webTextAdapter.updateScaleMode(scaleX, scaleY, (screenRect.width - displayWidth) / 2,
                (screenRect.height - displayHeight) / 2, displayWidth / 2, displayHeight / 2, rotation);
        }

        private calculateOrientationMode(option: PlayerOption, screenRect:ClientRect) {

            var shouldRotate = false;
            var rotation = 0;
            if (option.orientation != sys.OrientationMode.AUTO) {
                shouldRotate = option.orientation != sys.OrientationMode.PORTRAIT && screenRect.height > screenRect.width
                || option.orientation == sys.OrientationMode.PORTRAIT && screenRect.width > screenRect.height;
            }

            if (shouldRotate) {
                if (option.orientation == sys.OrientationMode.LANDSCAPE)
                    rotation = 90;
                else
                    rotation = -90;
            }

            return {
                shouldRotate,
                rotation
            };
        }

    }


}