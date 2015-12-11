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
            var re = /([LMCJVSD])\|(2[0-9])\.(2[0-9])\.(4[0-9])\|(2[0-9]):(2[0-9]):(2[0-9])\s*T:([0-9]+\.[0-9])\|?H:([0-9]+)%\|?UV:([0-9]+)/gm;
            var m;
            while ((m = re.exec(data)) !== null) {
                if (m.index === re.lastIndex) {
                    re.lastIndex++;
                }
                var date = new Date();
                date.setFullYear(m[4], m[3], m[5]);
                date.setHours(0, 0, 0, 0);

                models.Data.findOne({where:{sit_id: sede, dat_date: date}})
                    // when the date exist
                    .then(function(data) {
                        data.increment({
                            dat_uv: Number(m[10]),
                            dat_hr: Number(m[9]),
                            dat_temp: Number(m[8]),
                            dat_count: 1
                        })
                    })

                    // when the date didn't exist
                    .catch(function(err) {
                        models.Data.create({
                            sit_id: Number(sede),
                            dat_uv: Number(m[10]),
                            dat_hr: Number(m[9]),
                            dat_temp: Number(m[8]),
                            dat_date: date,
                            dat_count: 1
                        }).then(function (err) {
                            if (err) throw err;
                        });
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