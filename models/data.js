'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('DATA', {
        sit_id: DataTypes.INTEGER,
        dat_uv: DataTypes.INTEGER,
        dat_hr: DataTypes.INTEGER,
        dat_count: DataTypes.INTEGER,
        dat_temp: DataTypes.FLOAT,
        dat_date: DataTypes.DATE
    });
};