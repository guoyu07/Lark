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
     * @language en_US
     * A Timer object emits a TimerEvent objects whenever the Timer object reaches the interval specified by the Timer.delay property.
     * @see lark.Timer
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 每当 Timer 对象达到由 Timer.delay 属性指定的间隔时，Timer 对象即会调度 TimerEvent 对象。
     * @see lark.Timer
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class TimerEvent extends Event {

        /**
         * @language en_US
         * Emitted whenever a Timer object reaches an interval specified according to the Timer.delay property.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 每当 Timer 对象达到根据 Timer.delay 属性指定的间隔时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static TIMER:string = "timer";

        /**
         * @language en_US
         * Emitted whenever it has completed the number of requests set by Timer.repeatCount.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 每当它完成 Timer.repeatCount 设置的请求数后调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static TIMER_COMPLETE:string = "timerComplete";

        /**
         * @language en_US
         * Creates an Event object with specific information relevant to timer events.
         * @param type The type of the event. Event listeners can access this information through the inherited type property.
         * @param bubbles Determines whether the Event object bubbles. Event listeners can access this information through
         * the inherited bubbles property.
         * @param cancelable Determines whether the Event object can be canceled. Event listeners can access this information
         * through the inherited cancelable property.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 Event 对象，其中包含有关 timer 事件的特定信息。
         * @param type 事件的类型。事件侦听器可以通过继承的 type 属性访问此信息。
         * @param bubbles 确定 Event 对象是否冒泡。事件侦听器可以通过继承的 bubbles 属性访问此信息。
         * @param cancelable 确定是否可以取消 Event 对象。事件侦听器可以通过继承的 cancelable 属性访问此信息。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public constructor(type:string, bubbles?:boolean, cancelable?:boolean) {
            super(type, bubbles, cancelable);
        }

        /**
         * @language en_US
         * Instructs Lark runtime to render after processing of this event completes, if the display list has been modified.
         * @example
         * <code>
         *    function onTimer(event:TimerEvent):void {
         *        if (40 < mySp.x && mySp.x < 375) {
         *            mySp.x-= 50;
         *        } else {
         *            mySp.x=374;
         *        }
         *        event.updateAfterEvent();
         *    }
         *
         *    var moveTimer:Timer=new Timer(50,250);
         *    moveTimer.on(TimerEvent.TIMER,onTimer);
         *    moveTimer.start();
         * </code>
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果已修改显示列表，调用此方法将会忽略帧频限制，在此事件处理完成后立即重绘屏幕。
         * @example
         * <code>
         *    function onTimer(event:TimerEvent):void {
         *        if (40 < mySp.x && mySp.x < 375) {
         *            mySp.x-= 50;
         *        } else {
         *            mySp.x=374;
         *        }
         *        event.updateAfterEvent();
         *    }
         *
         *    var moveTimer:Timer=new Timer(50,250);
         *    moveTimer.on(TimerEvent.TIMER,onTimer);
         *    moveTimer.start();
         * </code>
         * @version Lark 1.0
         * @platform Web,Native
         */
        public updateAfterEvent():void {
            sys.$requestRenderingFlag = true;
        }

        /**
         * @language en_US
         * uses a specified target to emit an event. Using this method can reduce the number of
         * reallocate event objects, which allows you to get better code execution performance.
         * @param target the event target
         * @param type The type of the event. Event listeners can access this information through the inherited type property.
         * @param bubbles Determines whether the Event object bubbles. Event listeners can access this information through
         * the inherited bubbles property.
         * @param cancelable Determines whether the Event object can be canceled. Event listeners can access this information
         * through the inherited cancelable property.
         * @see lark.Event.create()
         * @see lark.Event.release()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用指定的EventEmitter对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param type 事件的类型。事件侦听器可以通过继承的 type 属性访问此信息。
         * @param bubbles 确定 Event 对象是否冒泡。事件侦听器可以通过继承的 bubbles 属性访问此信息。
         * @param cancelable 确定是否可以取消 Event 对象。事件侦听器可以通过继承的 cancelable 属性访问此信息。
         * @see lark.Event.create()
         * @see lark.Event.release()
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static emitTimerEvent(target:IEventEmitter, type:string, bubbles?:boolean, cancelable?:boolean):boolean {
            var event = Event.create(TimerEvent, type, bubbles, cancelable);
            var result = target.emit(event);
            Event.release(event);
            return result;
        }
    }

    registerClass(TimerEvent,Types.TimerEvent);

}