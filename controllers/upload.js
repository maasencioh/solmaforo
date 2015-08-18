var util = require("util");
var fs = require("fs");

exports.index = function(req, res) {
    res.render('upload');
};

exports.upload = function(req, res) {
    if (req.file) {
        console.log(util.inspect(req.file));
        if (req.file.size === 0) {
            return next(new Error("Hey, first would you select a file?"));
        }
        fs.exists(req.file.path, function(exists) {
            if(exists) {
                res.send("Got your file!");
            } else {
                res.send("Well, there is no magic for those who don’t believe in it!");
            }
        });
    }
};