'use strict';

var fs = require('fs');
var models = require('../models/models');

exports.index = function(req, res) {
    res.render('upload');
};

exports.upload = function(req, res) {
    if (req.file) {

        // reads the file
        fs.readFile(req.file.path, {encoding: 'utf-8'}, function (err, data) {
            if (err) throw err;
            var sede = /Sede ([0-9])/m.exec(data);
            if (sede)
                sede = sede[1];
            var re = /([LMCJVSD])\|([0-9][0-9])\.([0-9][0-9])\.([0-9][0-9][0-9][0-9])\|([0-9][0-9]):([0-9][0-9]):([0-9][0-9])\s*T:([0-9]+\.[0-9])\|H:([0-9]+)%\|UV:([0-9]+)/gm;
            var m;
            while ((m = re.exec(data)) !== null) {
                if (m.index === re.lastIndex) {
                    re.lastIndex++;
                }
                var day;
                switch (m[1]) {
                    case 'L': day = 'Lunes'; break;
                    case 'M': day = 'Martes'; break;
                    case 'C': day = 'Miercoles'; break;
                    case 'J': day = 'Jueves'; break;
                    case 'V': day = 'Viernes'; break;
                    case 'S': day = 'Sabado'; break;
                    case 'D': day = 'Domingo'; break;
                    default : day = 'null'; break;
                }
                models.Data.create({
                    sit_id: sede,
                    dat_uv: m[10],
                    dat_hr: m[9],
                    dat_temp: Number(m[8]),
                    dat_date: m[4]+'-'+m[3]+'-'+m[2]+' '+m[5]+':'+m[6]+':'+m[7]+' -05:00', //2015-01-28 04:05:06  -05:00
                    dat_day: day
                }).then(function (err) {
                    if (err) throw err;
                });
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