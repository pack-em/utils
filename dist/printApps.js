'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var appSource = '/Applications';
var fs = require('fs');
var path = require('path');
var PassThrough = require('stream').PassThrough;
var outputFileName = 'apps.txt';

var setupConsoleToFile = function setupConsoleToFile(filePath) {
    var outlog = fs.createWriteStream(filePath, { flags: 'a' });
    var oso = process.stdout;
    var splitter = new PassThrough();
    process.__defineGetter__("stdout", function () {
        return splitter;
    });
    splitter.pipe(oso);
    splitter.pipe(outlog);
};

var getList = function getList(appSource) {
    return new Promise(function (res, rej) {
        return fs.readdir(appSource, function (err, files) {
            if (err) rej(err);
            res(files.filter(function (file) {
                return path.extname(file) == ".app";
            }).map(function (file) {
                return file.substring(0, file.length - 4);
            }));
        });
    });
};

setupConsoleToFile(outputFileName);

var printApps = function printApps() {
    return getList(appSource).then(function (apps) {
        console.table(apps);
        process.exit(0);
    });
};

exports.default = printApps;