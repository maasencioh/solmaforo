'use strict';

var path = require('path');
var Sequelize = require('sequelize');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

var sequelize = new Sequelize(DB_name, user, pwd, {
    dialect: dialect,
    protocol: protocol,
    port: port,
    host: host,
    storage: storage,
    omitNull: true
});

var Data = sequelize.import(path.join(__dirname, 'data'));
exports.Data = Data;

var Place = sequelize.import(path.join(__dirname, 'place'));
exports.Place = Place;

sequelize.sync().then(function () {
    Place.count().then(function (count) {
        if (count === 0) {
            Place.bulkCreate([
                {sit_id: 0, sit_name: 'Museo'},
                {sit_id: 1, sit_name: 'Agustin Fernandez'},
                {sit_id: 2, sit_name: 'SaludCoop Sur'},
                {sit_id: 3, sit_name: 'Chucua'},
                {sit_id: 4, sit_name: 'Arborizadora Baja'},
                {sit_id: 5, sit_name: 'Jose Felix Restrepo'}
            ]).then(function () {
                console.log('Initialized places db');
            })
        }
    })
});