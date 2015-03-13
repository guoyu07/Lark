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

module lark {
    /**
     * @excluded
     * 渲染节点基类
     */
    export class RenderNode {

        public constructor(){

        }

        /**
         * 上一次绘制区域在屏幕上的起点x
         */
        public oldXMin:number = 0;
        /**
         * 上一次绘制区域在屏幕上的起点y
         */
        public oldYMin:number = 0;
        /**
         * 上一次绘制区域在屏幕上的终点x
         */
        public oldXMax:number = 0;
        /**
         * 上一次绘制区域在屏幕上的终点y
         */
        public oldYMax:number = 0;


        /**
         * 绘制区域在屏幕上的起点x
         */
        public xMin:number = 0;
        /**
         * 绘制区域在屏幕上的起点y
         */
        public yMin:number = 0;
        /**
         * 绘制区域在屏幕上的终点x
         */
        public xMax:number = 0;
        /**
         * 绘制区域在屏幕上的终点y
         */
        public yMax:number = 0;

        /**
         * 更新绘制的矩形区域
         */
        public updateDrawRect(xMin:number,yMin:number,xMax:number,yMax:number):void{
            this.oldXMax = this.xMax;
            this.oldXMin = this.xMin;
            this.oldYMax = this.yMax;
            this.oldYMin = this.yMin;
            this.xMin = xMin;
            this.yMin = yMin;
            this.xMax = xMax;
            this.yMax = yMax;
        }
    }
}