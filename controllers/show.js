'use strict';

var models = require('../models/models');

// GET /show/
exports.basic = function(req, res) {
    res.render('show', {data: undefined});
};

// GET /show/:place
exports.places = function(req, res) {
    res.render('show', {data: undefined});
};