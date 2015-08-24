'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('PLACE', {
        sit_id: DataTypes.INTEGER,
        sit_name: DataTypes.STRING
    });
};