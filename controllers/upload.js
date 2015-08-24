'use strict';

var util = require("util");
var fs = require("fs");

exports.index = function(req, res) {
    res.render('upload');
};

exports.upload = function(req, res) {
    if (req.file) {

        // reads the file
        fs.readFile(req.file.path, {encoding: 'utf-8'}, function (err, data) {
            if (err) throw err;
            //console.log(data);
            var re = /([LMCJVSD])\|([0-9][0-9])\.([0-9][0-9])\.([0-9][0-9][0-9][0-9])\|([0-9][0-9]):([0-9][0-9]):([0-9][0-9])\s*T:([0-9]+\.[0-9])\|H:([0-9]+)%\|UV:([0-9]+)/gm;
            var m;
            while ((m = re.exec(data)) !== null) {
                if (m.index === re.lastIndex) {
                    re.lastIndex++;
                }
                console.log(m[0]);
            }
        });

        // delete file
        fs.unlink(req.file.path, function (err) {
            if (err) throw err;
        });

        // response
        res.render('show');
    }
};