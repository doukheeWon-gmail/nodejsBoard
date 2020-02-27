'use strict';
module.exports = (sequelize, DataTypes) => {
  const web_files = sequelize.define('web_files', {
    boardIdx: DataTypes.BIGINT,
    fileSize: DataTypes.STRING,
    fileName: DataTypes.STRING,
    path: DataTypes.STRING
  }, {});
  web_files.associate = function(models) {
    // associations can be defined here
  };
  return web_files;
};