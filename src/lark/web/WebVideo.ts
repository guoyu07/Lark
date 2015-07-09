﻿//////////////////////////////////////////////////////////////////////////////////////
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

    /**
     * @private
     * @inheritDoc
     */
    export class WebVideo extends lark.DisplayObject implements lark.Video {

        /**
         * @inheritDoc
         */
        public src: string;
        /**
         * @inheritDoc
         */
        public poster: string;
        
        /**
         * @private
         */
        private posterData: BitmapData;
        /**
         * @private
         */
        private video: HTMLVideoElement;
        /**
         * @private
         */
        private loaded: boolean = false;
        /**
         * @private
         */
        private closed: boolean = false;
        /**
         * @private
         */
        private heightSet: number = NaN;
        /**
         * @private
         */
        private widthSet: number = NaN;

        /**
         * @inheritDoc
         */
        constructor(url?: string) {
            super();
            this.$renderRegion = new sys.Region();
            this.src = url;
            this.once(lark.Event.ADDED_TO_STAGE, this.loadPoster, this);
        }

        /**
         * @inheritDoc
         */
        load(url?: string) {
            url = url || this.src;
            if (DEBUG && !url) {
                lark.$error(3002);
            }
            if (this.video && this.video.src == url)
                return;
            var video = document.createElement("video");
            video.src = url;
            video.setAttribute("webkit-playsinline", "webkit-playsinline");
            video.addEventListener("canplay", this.onVideoLoaded);
            video.addEventListener("error", () => this.onVideoError());
            video.addEventListener("ended", () => this.onVideoEnded());
            video.load();
            video.play();
            setTimeout(() => video.pause(), 16);
            this.video = video;
        }

        /**
         * @inheritDoc
         */
        play(startTime?: number, loop = false) {
            if (this.loaded == false) {
                this.load();
                this.once(lark.Event.COMPLETE, e=> this.play(startTime, loop), this);
                return;
            }

            var video = this.video;
            if (startTime != undefined)
                video.currentTime = +startTime||0;
            video.loop = !!loop;
            video.play();
            video.style.position = "absolute";
            video.style.top = "0px";
            video.style.left = "0px";
            video.style.height = "0";
            video.style.width = "0";
            document.body.appendChild(video);
            var fullscreen = false;
            if (this._fullscreen) {
                fullscreen = this.goFullscreen();
            }
            if (fullscreen == false) {
                video.setAttribute("webkit-playsinline", "webkit-playsinline");
                lark.startTick(this.markDirty, this);
            }
        }

        private goFullscreen():boolean {
            var video = this.video;
            if (video['webkitRequestFullscreen'])
                video['webkitRequestFullscreen']();
            else if (video['webkitRequestFullScreen'])
                video['webkitRequestFullScreen']();
            else if (video['msRequestFullscreen'])
                video['msRequestFullscreen']();
            else if (video['requestFullscreen'])
                video['requestFullscreen']();
            else
                return false;
            video.removeAttribute("webkit-playsinline");
            video['onwebkitfullscreenchange'] = (e:any) => {
                var isfullscreen = !!video['webkitDisplayingFullscreen'];
                if (!isfullscreen) {
                    this.pause();
                }
            };
            video['onwebkitfullscreenerror'] = (e: any) => {
                lark.$error(3003);
            };
            return true;
        }
        
        /**
         * @inheritDoc
         */
        close() {
            this.pause();
            if (this.loaded == false && this.video)
                this.video.src = "";
            if (this.video) {
                if (this.video['remove'])
                    this.video['remove']();
                this.video = null;
            }
            this.closed = true;
            this.loaded = false;
        }


        /**
         * @inheritDoc
         */
        pause() {
            if (this.video) {
                this.video.pause();
                this.onVideoEnded();
            }
            lark.stopTick(this.markDirty, this);
        }


        /**
         * @inheritDoc
         */
        public get volume(): number {
            if (!this.video)
                return 1;
            return this.video.volume;
        }

        /**
         * @inheritDoc
         */
        public set volume(value: number) {
            if (!this.video)
                return;
            this.video.volume = value;
        }

        /**
         * @inheritDoc
         */
        public get position(): number {
            if (!this.video)
                return 0;
            return this.video.currentTime;
        }

        /**
         * @inheritDoc
         */
        public set position(value: number) {
            if (!this.video)
                return ;
            this.video.currentTime = value;
        }

        private _fullscreen = true;
        /**
         * @inheritDoc
         */
        public get fullscreen(): boolean {
            return this._fullscreen;
        }

        /**
         * @inheritDoc
         */
        public set fullscreen(value: boolean) {
            this._fullscreen = !!value;
            if (this.video && this.video.paused == false) {
                this.goFullscreen();
            }
        }

        private _bitmapData: BitmapData;

        /**
         * @inheritDoc
         */
        public get bitmapData(): BitmapData {
            if (!this.video || !this.loaded)
                return null;
            if (!this._bitmapData) {
                this.video.width = this.video.videoWidth;
                this.video.height = this.video.videoHeight;
                this._bitmapData = lark.web['toBitmapData'](this.video);
            }
            return this._bitmapData;
        }

        private loadPoster() {
            var poster = this.poster;
            if (!poster)
                return;
            var imageLoader = new lark.ImageLoader();
            imageLoader.once(lark.Event.COMPLETE, e=> {
                var posterData = <HTMLImageElement><any>imageLoader.data;
                this.posterData = imageLoader.data;
                if (this.video && this.loaded) {
                    posterData.width = this.video.videoWidth;
                    posterData.height = this.video.videoHeight;
                }
                else {
                    posterData.width = isNaN(this.widthSet) ? posterData.width : this.widthSet;
                    posterData.height = isNaN(this.heightSet) ? posterData.height : this.heightSet;
                }
                this.$invalidateContentBounds();
            }, this);
            imageLoader.load(poster);
        }

        /**
         * @private
         * 
         */
        private onVideoLoaded = () => {
            this.video.removeEventListener("canplay", this.onVideoLoaded);
            var video = this.video;
            var width = this.width;
            var height = this.height;
            this.loaded = true;
            video.pause();
            if (this.posterData) {
                this.posterData.width = video.videoWidth;
                this.posterData.height = video.videoHeight;
            }
            video.width = video.videoWidth;
            video.height = video.videoHeight;
            this.$invalidateContentBounds();
            this.width = isNaN(this.widthSet) ? video.videoWidth : this.widthSet;
            this.height = isNaN(this.heightSet) ? video.videoHeight : this.heightSet;
            this.emitWith(lark.Event.COMPLETE);

        }

        /**
         * @private
         * 
         */
        private onVideoEnded() {
            this.emitWith(lark.Event.ENDED);
            this.$invalidateContentBounds();
        }

        /**
         * @private
         * 
         */
        private onVideoError() {
            this.emitWith(lark.Event.IO_ERROR);
        }

        /**
         * @private
         */
        $measureContentBounds(bounds: Rectangle): void {
            var bitmapData = this.bitmapData;
            var posterData = this.posterData;
            if (bitmapData) {
                bounds.setTo(0, 0, bitmapData.width, bitmapData.height);
            }
            else if (posterData) {
                bounds.setTo(0, 0, posterData.width, posterData.height);
            }
            else {
                bounds.setEmpty();
            }
        }

        /**
         * @private
         */
        $render(context: sys.RenderContext): void {
            var bitmapData = this.bitmapData;
            var posterData = this.posterData;
            if ((!bitmapData || this.video && this.video.paused) && posterData) {
                context.drawImage(posterData, 0, 0, posterData.width, posterData.height);
            }
            if (bitmapData) {
                context.imageSmoothingEnabled = true;
                context.drawImage(bitmapData, 0, 0, bitmapData.width, bitmapData.height);
            }
        }

        private markDirty(time):boolean {
            this.$invalidate();
            return true;
        }

        /**
         * @private
         * 设置显示高度
         */
        $setHeight(value: number) {
            super.$setHeight(value);
            this.heightSet = +value || 0;
        }

        /**
         * @private
         * 设置显示宽度
         */
        $setWidth(value: number) {
            super.$setWidth(value);
            this.widthSet = +value || 0;
        }
    }

    lark.Video = WebVideo;
}