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

module lark.sys {

    var ENTER_LIST:DisplayObject[] = [], LEAVE_LIST:DisplayObject[] = [];

    /**
     * @private
     */
    function getParentList(target:DisplayObject, list):DisplayObject[] {
        while (target) {
            list.push(target);
            target = target.$parent;
        }
        return list;
    }

    /*
     * @private git Test
     */

    /**
     * @private
     * 用户交互操作管理器
     */
    export class TouchHandler extends LarkObject {

        /**
         * @private
         */
        public constructor(stage:Stage) {
            super();
            this.stage = stage;
        }

        /**
         * @private
         */
        private stage:Stage;

        /**
         * @private
         */
        private touchDownTarget:{[key:number]:number} = {};

        /**
         * @private
         */
        private touchDownTime:{[key:number]:number} = {};

        /**
         * @private
         * 触摸开始（按下）
         * @param x 事件发生处相对于舞台的坐标x
         * @param y 事件发生处相对于舞台的坐标y
         * @param touchPointID 分配给触摸点的唯一标识号
         */
        public onTouchBegin(x:number, y:number, touchPointID:number):void {
            var target = this.findTarget(x, y);
            this.touchDownTarget[touchPointID] = target.$hashCode;
            this.touchDownTime[touchPointID] = lark.getTimer();
            TouchEvent.emitTouchEvent(target, TouchEvent.TOUCH_BEGIN, true, true, x, y, touchPointID);
        }

        /**
         * @private
         */
        private lastTouchX:number = -1;
        /**
         * @private
         */
        private lastTouchY:number = -1;

        /**
         * @private
         * 触摸移动
         * @param x 事件发生处相对于舞台的坐标x
         * @param y 事件发生处相对于舞台的坐标y
         * @param touchPointID 分配给触摸点的唯一标识号
         */
        public onTouchMove(x:number, y:number, touchPointID:number):void {
            if (this.lastTouchX === x && this.lastTouchY === y) {
                return;
            }
            this.lastTouchX = x;
            this.lastTouchY = y;
            var target = this.findTarget(x, y);
            TouchEvent.emitTouchEvent(target, TouchEvent.TOUCH_MOVE, true, true, x, y, touchPointID);
        }

        /**
         * @private
         * 触摸结束（弹起）
         * @param x 事件发生处相对于舞台的坐标x
         * @param y 事件发生处相对于舞台的坐标y
         * @param touchPointID 分配给触摸点的唯一标识号
         */
        public onTouchEnd(x:number, y:number, touchPointID:number):void {
            var target = this.findTarget(x, y);
            var oldTargetCode = this.touchDownTarget[touchPointID];
            delete this.touchDownTarget[touchPointID];
            TouchEvent.emitTouchEvent(target, TouchEvent.TOUCH_END, true, true, x, y, touchPointID);
            target = this.findTarget(x, y);
            if (oldTargetCode === target.$hashCode) {
                TouchEvent.emitTouchEvent(target, TouchEvent.TOUCH_TAP, true, true, x, y, touchPointID);
            }
            else {
                TouchEvent.emitTouchEvent(target, TouchEvent.TOUCH_RELEASE_OUTSIDE, true, true, x, y, touchPointID);
            }

            var time = lark.getTimer();
            if (time - this.touchDownTime[touchPointID] > 5000) {
                var num = 0;
                for (var key in this.touchDownTime) {
                    if (time - this.touchDownTime[key] > 5000) {
                        num++;
                    }
                }

                if (num == 3) {
                    var textField = new lark.TextField("powered by lark");
                    this.stage.addChild(textField);
                    setTimeout(function ():void {
                        if (textField.parent) {
                            textField.parent.removeChild(textField);
                        }
                    }, 2000);
                }
            }
            delete this.touchDownTime[touchPointID];
        }

        /**
         * @private
         * 获取舞台坐标下的触摸对象
         */
        private findTarget(stageX:number, stageY:number):DisplayObject {
            var target = this.stage.$hitTest(stageX, stageY);
            if (!target) {
                target = this.stage;
            }
            return target;
        }
    }
}