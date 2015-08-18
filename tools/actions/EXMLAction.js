/// <reference path="../lib/types.d.ts" />
var file = require('../lib/FileUtil');
var exml = require("../lib/exml/EXML");
function getSortedEXML() {
    var files = file.search(lark.options.srcDir, "exml");
    var exmls = files.map(function (path) { return ({
        path: path,
        content: file.read(path)
    }); });
    exmls.forEach(function (it) { return it.path = file.getRelativePath(lark.options.srcDir, it.path); });
    exmls = exml.sort(exmls);
    return exmls;
}
exports.getSortedEXML = getSortedEXML;
function updateSetting(merge) {
    if (merge === void 0) { merge = false; }
    var themeDatas = [];
    var themes = searchTheme();
    if (themes.length == 0) {
        return;
    }
    themeDatas = themes.map(function (t) {
        try {
            var data = JSON.parse(file.read(file.joinPath(lark.options.srcDir, t)));
            return data || {};
        }
        catch (e) {
            return {};
        }
    });
    var oldEXMLS = [];
    themeDatas.forEach(function (thm, i) {
        thm.exmls && thm.exmls.forEach(function (e) {
            var path = e.path ? e.path : e;
            if (oldEXMLS[path]) {
                oldEXMLS[path].theme += themes[i] + ",";
                return;
            }
            var exmlFile = {
                path: path,
                theme: "," + themes[i] + ","
            };
            oldEXMLS[path] = exmlFile;
            oldEXMLS.push(exmlFile);
        });
    });
    var exmls = getSortedEXML();
    themeDatas.forEach(function (thm) { return thm.exmls = []; });
    exmls.forEach(function (e) {
        var epath = e.path;
        var exmlEl = merge ? { path: e.path, content: e.content } : epath;
        themeDatas.forEach(function (thm, i) {
            if (epath in oldEXMLS) {
                var thmPath = themes[i];
                var exmlFile = oldEXMLS[epath];
                if (exmlFile.theme.indexOf("," + thmPath + ",") >= 0)
                    thm.exmls.push(exmlEl);
            }
            else
                thm.exmls.push(exmlEl);
        });
    });
    themes.forEach(function (thm, i) {
        if (themeDatas[i].autoGenerateExmlsList == false)
            return;
        var path = file.joinPath(lark.options.outDir, thm);
        var thmData = JSON.stringify(themeDatas[i], null, "  ");
        file.save(path, thmData);
    });
}
exports.updateSetting = updateSetting;
function searchTheme() {
    var files = file.searchByFunction(lark.options.srcDir, function (f) { return f.indexOf('.thm.json') > 0; });
    files = files.map(function (it) { return file.getRelativePath(lark.options.srcDir, it); });
    console.log(files);
    return files;
}
function sort(exmls) {
    var preload = exmls.filter(function (e) { return e.preload; });
}
