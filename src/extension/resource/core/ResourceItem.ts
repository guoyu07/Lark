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

module RES {

    /**
     * @language en_US
     * Resource term. One of the resources arrays in resource.json.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 资源项。对应 resource.json 中 resources 数组中的一项。
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class ResourceItem {

        /**
         * @language en_US
         * Animation configuration file. Currently supports Egret MovieClip file format.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * Animation 配置文件。目前支持 Egret MovieClip 文件格式。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static TYPE_ANIMATION:string = "animation";

        /**
         * @language en_US
         * XML file.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * XML 文件。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static TYPE_XML:string = "xml";

        /**
         * @language en_US
         * Picture file.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 图片文件。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static TYPE_IMAGE:string = "image";

        /**
         * @language en_US
         * Binary file.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 二进制文件。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static TYPE_BIN:string = "bin";

        /**
         * @language en_US
         * Text file.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 文本文件。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static TYPE_TEXT:string = "text";

        /**
         * @language en_US
         * JSON file.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * JSON 文件。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static TYPE_JSON:string = "json";

        /**
         * @language en_US
         * SpriteSheet file.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * SpriteSheet 文件。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static TYPE_SHEET:string = "sheet";

        /**
         * @private
         * @language en_US
         * BitmapTextSpriteSheet file.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @private
         * @language zh_CN
         * BitmapTextSpriteSheet 文件。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static TYPE_FONT:string = "font";

        /**
         * @language en_US
         * Sound file.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 声音文件。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static TYPE_SOUND:string = "sound";

        /**
         * @language en_US
         * Constructor.
         * @param name Name of resource term.
         * @param url URL of resource term.
         * @param type Type of resource term.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 构造函数。
         * @param name 加载项名称。
         * @param url 要加载的文件地址。
         * @param type 加载项文件类型。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public constructor(name:string, url:string, type:string) {
            this.name = name;
            this.url = url;
            this.type = type;
        }

        /**
         * @language en_US
         * Name of resource term.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 加载项名称。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public name:string;

        /**
         * @language en_US
         * URL of resource term.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 要加载的文件地址。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public url:string;

        /**
         * @language en_US
         * Type of resource term.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 加载项文件类型。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public type:string;

        /**
         * @language en_US
         * Name of the resource term group.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 资源所属的组名。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public groupName:string = "";

        /**
         * @language en_US
         * The raw data object to be referenced.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 被引用的原始数据对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public data:any = null;

        /**
         * @private
         */
        private _loaded:boolean = false;

        /**
         * @language en_US
         * Load complete flag.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 加载完成的标志。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get loaded():boolean {
            return this.data ? this.data.loaded : this._loaded;
        }

        public set loaded(value:boolean) {
            if (this.data)
                this.data.loaded = value;
            this._loaded = value;
        }

        /**
         * @language en_US
         * Turn into a string.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 转成字符串。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public toString():string {
            return "[ResourceItem name=\"" + this.name + "\" url=\"" + this.url + "\" type=\"" + this.type + "\"]";
        }
    }
}