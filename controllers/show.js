'use strict';

var models = require('../models/models');

var places = {
    '0': 'Museo',
    '1': 'Agustin Fernandez',
    '2': 'SaludCoop Sur',
    '3': 'Chucua',
    '4': 'Arborizadora Baja',
    '5': 'Jose Felix Restrepo'
};

// GET /show/
exports.basic = function(req, res) {
    res.render('show', {data: undefined});
};

// GET /show/:place
exports.places = function(req, res) {
    res.render('show', {data: undefined});
};