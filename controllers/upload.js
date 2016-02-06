'use strict';

var fs = require('fs');
var models = require('../models/models');

exports.index = function(req, res) {
    res.render('upload');
};

var re = /([LMCJVSD])\|(2[0-9]\.2[0-9]\.4[0-9])\|2[0-9]:2[0-9]:2[0-9]\s*T:([0-9]+\.[0-9])\|?H:([0-9]+)%\|?UV:([0-9]+)/gm;

exports.upload = function(req, res) {
    if (req.file) {

        // reads the file
        fs.readFile(req.file.path, {encoding: 'utf-8'}, function (err, data) {
            if (err) throw err;
            var sede = /Sede ([0-9])/m.exec(data);
            if (sede)
                sede = sede[1];
            var m;
            while ((m = re.exec(data)) !== null) {
                if (m.index === re.lastIndex) {
                    re.lastIndex++;
                }

                var date = m[2];

                models.store.get(date, (function(err, new_date) {
                    if (err) throw err;

                    // if date don't exist
                    if (new_date === undefined)
                        models.store.set(date, {
                            sede: {
                                count: 1,
                                uv: m[4],
                                hr: m[3],
                                temp: m[2]
                            }
                        }, function (err, key) { if (err) throw err; });

                    // if the date already exist
                    else {
                        // and the sede also exist
                        if (new_date.sede) {
                            new_date.sede.count += 1;
                            new_date.sede.uv += m[4];
                            new_date.sede.hr += m[3];
                            new_date.sede.temp += m[2];
                        }
                        // and the sede don't exist
                        else
                            new_date.sede = {
                                count: 1,
                                uv: m[4],
                                hr: m[3],
                                temp: m[2]
                            };

                        models.store.set(date, new_date.sede, function (err, key) { if (err) throw err; });
                    }
                })(sede, date, m));
            }
        });

        // delete file
        fs.unlink(req.file.path, function (err) {
            if (err) throw err;
        });

        // response
        res.render('done');
    }
};