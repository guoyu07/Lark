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
     * Timer 类是计时器的接口，它使您能按指定的时间序列运行代码。
     * 使用 start() 方法来启动计时器。为 timer 事件添加事件侦听器，以便将代码设置为按计时器间隔运行。
     * 可以创建 Timer 对象以运行一次或按指定间隔重复运行，从而按计划执行代码。
     * 根据 Lark 的帧速率或运行时环境（可用内存和其他因素），运行时调度事件的间隔可能稍有不同。
	 */
    export class Timer extends EventEmitter {

        /**
         * 创建一个 Timer 对象
         * @param delay 计时器事件间的延迟（以毫秒为单位）。
         * @param repeatCount 设置的计时器运行总次数。
         */
        public constructor(delay:number, repeatCount:number = 0) {
            super();
            this.delay = delay;
            this.repeatCount = +repeatCount|0;
        }

        private _delay:number = 0;
		/**
         * 计时器事件间的延迟（以毫秒为单位）。如果在计时器正在运行时设置延迟间隔，则计时器将按相同的 repeatCount 迭代重新启动。
         * 注意：建议 delay 不要低于 20 毫秒。计时器频率不得超过 60 帧/秒，这意味着低于 16.6 毫秒的延迟可导致出现运行时问题。
		 */
        public get delay():number{
            return this._delay;
        }
        public set delay(value:number){
            value = +value||0;
            if(value<1){
                value = 1;
            }
            if(this._delay===value){
                return;
            }
            this._delay = value;
            this.lastCount = this.updateInterval = Math.round(60*value);
        }

		/**
         * 设置的计时器运行总次数。如果重复计数设置为 0，则计时器将持续不断运行，或直至调用了 stop() 方法或节目停止。
         * 如果重复计数不为 0，则将运行计时器，运行次数为指定的次数。如果设置的 repeatCount 总数等于或小于 currentCount，则计时器将停止并且不会再次触发。
		 */
        public repeatCount:number;

        private _currentCount:number = 0;

		/**
         * 计时器从 0 开始后触发的总次数。如果已重置了计时器，则只会计入重置后的触发次数。
		 */
        public get currentCount():number {
            return this._currentCount;
        }

        private _running:boolean = false;

		/**
         * 计时器的当前状态；如果计时器正在运行，则为 true，否则为 false。
		 */
        public get running():boolean{
            return this._running;
        }

		/**
         * 如果计时器正在运行，则停止计时器，并将 currentCount 属性设回为 0，这类似于秒表的重置按钮。然后，在调用 start() 后，将运行计时器实例，运行次数为指定的重复次数（由 repeatCount 值设置）。
		 */
        public reset():void{
            this.stop();
            this._currentCount = 0;
        }

		/**
         * 如果计时器尚未运行，则启动计时器。
		 */
        public start() {
            if(this._running)
                return;
            lark.sys.Ticker.$instance.$addTimer(this);
            this._running = true;
        }

		/**
         * 停止计时器。如果在调用 stop() 后调用 start()，则将继续运行计时器实例，运行次数为剩余的 重复次数（由 repeatCount 属性设置）。
		 */
        public stop() {
            if(!this._running)
                return;
            lark.sys.Ticker.$instance.$removeTimer(this);
            this._running = false;
        }

        private updateInterval:number = 1000;
        private lastCount:number = 1000;

        /**
         * Ticker以60FPS频率刷新此方法
         */
        $update() {
            this.lastCount -= 1000;
            if(this.lastCount>0){
                return;
            }
            this.lastCount += this.updateInterval;
            this._currentCount++;
            var complete = (this.repeatCount > 0 && this._currentCount >= this.repeatCount);
            TimerEvent.emitTimerEvent(this,TimerEvent.TIMER);
            if (complete) {
                this.stop();
                TimerEvent.emitTimerEvent(this,TimerEvent.TIMER_COMPLETE);
            }
        }
    }
}