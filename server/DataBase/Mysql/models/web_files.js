'use strict';
module.exports = (sequelize, DataTypes) => {
    const web_files = sequelize.define('web_files', {
        boardIdx: {
            type: DataTypes.BIGINT,
        },
        fileSize: {
            type: DataTypes.STRING,
        },
        fileName: {
            type: DataTypes.STRING,
        },
        path: {
            type: DataTypes.STRING
        }
    }, {});
    web_files.associate = function(models) {
        // associations can be defined here
    };
    return web_files;
};