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

    var containerList:HTMLDivElement[] = [];

    /**
     * @private
     * 刷新所有Lark播放器的显示区域尺寸。仅当使用外部JavaScript代码动态修改了Lark容器大小时，需要手动调用此方法刷新显示区域。
     * 当网页尺寸发生改变时此方法会自动被调用。
     */
    export function updateScreenSize():void{
        var length = containerList.length;
        for(var i=0;i<length;i++){
            var container = containerList[i];
            var player = <sys.Player>container["lark-player"];
            var webTouch = <WebTouchHandler>container["lark-touch"];
            var webScreen = <WebScreen>container["lark-screen"];
            var webText = <WebTextAdapter>container["lark-text-layer"];
            webScreen.updateScreenSize(player,webTouch,webText);
    }
    }

    /**
     * @private
     * 网页加载完成，实例化页面中定义的Larksys标签
     */
    function runLark():void {
        var ticker = lark.sys.$ticker = new sys.Ticker();
        startTicker(ticker);
        var surfaceFactory = new CanvasFactory();
        sys.surfaceFactory = surfaceFactory;
        if(!lark.sys.screenAdapter){
            lark.sys.screenAdapter = new lark.sys.ScreenAdapter();
        }

        var list = document.querySelectorAll(".lark-player");
        var length = list.length;
        for (var i = 0; i < length; i++) {
            var container = <HTMLDivElement>list[i];
            createPlayer(container);
        }
    }

    /**
     * @private
     * Lark网页版程序入口
     */
    function createPlayer(container:HTMLDivElement):void {
        containerList.push(container);
        var entryClassName = container.getAttribute("data-entry-class");
        var contentWidth = +container.getAttribute("data-content-width")||480;
        var contentHeight = +container.getAttribute("data-content-height") || 800;
        var scaleMode = container.getAttribute("data-scale-mode");
        var orientation = container.getAttribute("data-orientation") || lark.sys.OrientationMode.NOT_SET;
        var surface = lark.sys.surfaceFactory.create();
        var canvas = <HTMLCanvasElement><any>surface;
        var webScreen = new WebScreen(container, canvas, scaleMode, contentWidth, contentHeight, orientation);
        var stage = new lark.Stage();
        var touch = new lark.sys.TouchHandler(stage);
        var webTouch = new WebTouchHandler(touch, canvas);
        var webText = new WebTextAdapter(container,stage,canvas);
        var player = new lark.sys.Player(surface.renderContext, stage, entryClassName);
        if(DEBUG){
            var showPaintRect = container.getAttribute("data-show-paint-rect")=="true";
            player.showPaintRect(showPaintRect);
            var showFPS = container.getAttribute("data-show-fps")=="true";
            var showLog = container.getAttribute("data-show-log")=="true";
            var logFilter = container.getAttribute("data-log-filter");
            if(showFPS||showLog){
                player.displayFPS(showFPS,showLog,logFilter);
            }
            var language = navigator.language || navigator.browserLanguage || "en_US";
            language = language.replace("-", "_");

            if (language in lark.$locale_strings)
                lark.$language = language;
        }
        container["lark-player"] = player;
        container["lark-touch"] = webTouch;
        container["lark-screen"] = webScreen;
        container["lark-text-layer"] = webText;
        webScreen.updateScreenSize(player,webTouch,webText);
        player.start();
    }

    /**
     * @private
     * 启动心跳计时器。
     */
    function startTicker(ticker:lark.sys.Ticker):void {
        var requestAnimationFrame =
            window["requestAnimationFrame"] ||
            window["webkitRequestAnimationFrame"] ||
            window["mozRequestAnimationFrame"] ||
            window["oRequestAnimationFrame"] ||
            window["msRequestAnimationFrame"];

        if (!requestAnimationFrame) {
            requestAnimationFrame = function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
        }

        requestAnimationFrame.call(window, onTick);
        function onTick():void {
            ticker.update();
            requestAnimationFrame.call(window, onTick)
        }
    }

    function toArray(argument){
        var args = [];
        for(var i=0;i<argument.length;i++){
            args.push(argument[i]);
        }
        return args;
    }

    lark.warn = function () { console.warn.apply(console, toArray(arguments)) };
    lark.error = function () { console.error.apply(console, toArray(arguments)) };
    lark.assert = function () { console.assert.apply(console, toArray(arguments)) };
    if(DEBUG){
        lark.log = function(){
            if(DEBUG){
                var length = arguments.length;
                var info = "";
                for(var i=0;i<length;i++){
                    info += arguments[i]+" ";
                }
                sys.$logToFPS(info);
            }
            console.log.apply(console,toArray(arguments));
        }
    }
    else{
        lark.log = function () { console.log.apply(console, toArray(arguments)) };
    }
    window.addEventListener("load", runLark);
    window.addEventListener("resize",updateScreenSize);
}