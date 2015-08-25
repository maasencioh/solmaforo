'use strict';

var models = require('../models/models');

// GET /show/
exports.basic = function(req, res) {
    var find = models.Find();
    find.then(function (data) {
        res.render('show', {data: data});
    });
};

// GET /show/:place
exports.places = function(req, res) {
    var find = models.Find(req.place);
    find.then(function (data) {
        res.render('show', {data: data});
    });
};