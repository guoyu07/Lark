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
     * The Capabilities class provides properties that describe the system and runtime that are hosting the application.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Capabilities 类提供一些属性，这些属性描述了承载应用程序的系统和运行时。
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class Capabilities {

        /**
         * @private
         */
        static $language:string = "zh-CN";
        /**
         * @language en_US
         * Specifies the language code of the system on which the content is running. The language is specified as a lowercase
         * two-letter language code from ISO 639-1. For Chinese, an additional uppercase two-letter country code from ISO 3166
         * distinguishes between Simplified and Traditional Chinese.<br/>
         * The following table lists the possible values,but not limited to them:
         * <ul>
         * <li>Simplified    Chinese  zh-CN</li>
         * <li>Traditional   Chinese  zh-TW</li>
         * <li>English       en</li>
         * <li>Japanese      ja</li>
         * <li>Korean        ko</li>
         * </ul>
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示运行内容的系统的语言代码。语言指定为 ISO 639-1 中的小写双字母语言代码。
         * 对于中文，另外使用 ISO 3166 中的大写双字母国家/地区代码，以区分简体中文和繁体中文。<br/>
         * 以下是可能但不限于的语言和值：
         * <ul>
         * <li>简体中文  zh-CN</li>
         * <li>繁体中文  zh-TW</li>
         * <li>英语      en</li>
         * <li>日语      ja</li>
         * <li>韩语      ko</li>
         * </ul>
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static get language():string {
            return Capabilities.$language;
        }

        /**
         * @private
         */
        static $isMobile:boolean;

        /**
         * @language en_US
         * Specifies whether the system is running in a mobile device.(such as a mobile phone or tablet)
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示程序内容是否运行在移动设备中（例如移动电话或平板电脑）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static get isMobile():boolean {
            return Capabilities.$isMobile;
        }

        /**
         * @private
         */
        static $os:string = "Unknown";

        /**
         * @language en_US
         * Specifies the current operating system. The os property can return the following strings:
         * <ul>
         * <li>iPhone            "iOS"</li>
         * <li>Android Phone     "Android"</li>
         * <li>Windows Phone     "Windows Phone"</li>
         * <li>Windows Desktop   "Windows PC"</li>
         * <li>Mac Desktop       "Mac OS"</li>
         * <li>Unknown OS        "Unknown"</li>
         * </ul>
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指示当前的操作系统。os 属性返回下列字符串：
         * <ul>
         * <li>苹果手机操作系统     "iOS"</li>
         * <li>安卓手机操作系统     "Android"</li>
         * <li>微软手机操作系统     "Windows Phone"</li>
         * <li>微软桌面操作系统     "Windows PC"</li>
         * <li>苹果桌面操作系统     "Mac OS"</li>
         * <li>未知操作系统        "Unknown"</li>
         * </ul>
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static get os():string {
            return Capabilities.$os;
        }


        /**
         * @private
         */
        static $hasGeolocation:boolean;

        /**
         * @language en_US
         * Specifies whether the system supports the geolocation services
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指示系统是否支持地理位置服务
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static get hasGeolocation():boolean {
            return Capabilities.$hasGeolocation;
        }


        /**
         * @private
         */
        static $hasOrientation:boolean;

        /**
         * @language en_US
         * Specifies whether the system supports detecting the device orientation.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指示系统是否支持检测设备方向
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static get hasOrientation():boolean {
            return Capabilities.$hasOrientation;
        }


        /**
         * @private
         */
        static $hasMotion:boolean;

        /**
         * @language en_US
         * Specifies whether the system supports the motion Sensor
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指示系统是否支持运动传感器
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static get hasMotion():boolean {
            return Capabilities.$hasMotion;
        }

        static $devicePixelRatio: number = 1;
        
        /**
         * @language en_US
         * The devicePixelRatio read-only property returns the ratio 
         * of the (vertical) size of one physical pixel on the current display 
         * device to the size of one logical pixel. 
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * devicePixelRatio 反应设备物理分辨率与逻辑分辨率的比值
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static get devicePixelRatio(): number {
            return Capabilities.$devicePixelRatio;
        }
    }

    if (DEBUG) {
        lark.$markReadOnly(Capabilities, "language", true);
        lark.$markReadOnly(Capabilities, "isMobile", true);
        lark.$markReadOnly(Capabilities, "hasOrientation", true);
        lark.$markReadOnly(Capabilities, "hasMotion", true);
        lark.$markReadOnly(Capabilities, "hasGeolocation", true);
        lark.$markReadOnly(Capabilities, "os", true);
    }

}