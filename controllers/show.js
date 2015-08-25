'use strict';

var models = require('../models/models');

// GET /show/
exports.basic = function(req, res) {
    models.Place.findAll().then(function(place) {
        models.Data.findAll().then(function (data) {
            for (var i = 0; i < data.length; i ++)
                for (var j = 0; j < place.length; j ++)
                    if (data[i].sit_id === place[j].sit_id)
                        data[i].sit_name = place[j].sit_name;
            res.render('show', {data: data});
        });
    });
};

// GET /show/:place
exports.places = function(req, res) {
    models.Place.findOne({where:{sit_id: req.place}}).then(function(place) {
        models.Data.findAll().then(function (data) {
            for (var i = 0; i < data.length; i ++)
                data[i].sit_name = place.sit_name;
            res.render('show', {data: data});
        });
    });
};