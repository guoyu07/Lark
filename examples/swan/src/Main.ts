﻿declare module skins{
    export class Main extends swan.Group{

    }
}

class Main extends swan.Group {

    skins = [
        "skins/ItemRenderer.exml",
        "skins/List.exml",
        "skins/TabBar.exml",
        "ui/Main.exml"
    ];

    constructor() {
        super();
        Loader.load(this.skins, () => this.loaded());
    }   

    loaded() {
        var ui = new skins.Main();
        this.addChild(ui);
    }


    protected createChildren():void {
        super.createChildren();

        new swan.Theme("resource/theme/green-theme.json",this.stage);

        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
    }
}

class Loader {
    static load(urls: string[], callback: () => void) {

        var total = urls.length;
        var got = 0;
        var parser = new swan.sys.EXMLParser();
        urls.forEach(url => {
            var request = new lark.HttpRequest();
            request.once(lark.Event.COMPLETE, () => {
                got++;
                parser.parse(request.response);

                if (got == total)
                    callback();
            }, this);
            request.open(url);
            request.send();
        });
    }
}