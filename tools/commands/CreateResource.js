/// <reference path="../lib/types.d.ts" />
var FileUtil = require('../lib/FileUtil');
var CreateResource = (function () {
    function CreateResource() {
    }
    CreateResource.prototype.execute = function () {
        FileUtil.getExtension;
        var resources = FileUtil.searchByFunction(lark.options.srcDir, isResource);
        var config = {
            resources: []
        };
        config.resources = resources.map(function (f) {
            var ext = FileUtil.getExtension(f);
            f = FileUtil.getRelativePath(lark.options.srcDir, f);
            return {
                name: f,
                type: extToType[ext] || "bin",
                url: f
            };
        });
        FileUtil.save(FileUtil.joinPath(lark.options.srcDir, "resource/default.res.json"), JSON.stringify(config, null, "  "));
        return 0;
    };
    return CreateResource;
})();
var resourceExtensions = {
    png: true,
    jpg: true,
    gif: true,
    mp3: true,
    wav: true,
    json: true,
    fnt: true,
    webp: true,
    mp4: true
};
var extToType = {
    png: "image",
    jpg: "image",
    gif: "image",
    mp3: "sound",
    wav: "sound",
    json: "json",
    fnt: "font",
    txt: "text",
    mp4: "video"
};
function isResource(fileName) {
    var ext = FileUtil.getExtension(fileName);
    return ext in resourceExtensions;
}
module.exports = CreateResource;
