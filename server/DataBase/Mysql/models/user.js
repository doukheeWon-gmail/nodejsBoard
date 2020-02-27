'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        userEmail: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM,
            values: ["ADMIN", "MANAGER", "USER"],
            defaultValue: "USER",
            allowNull: false
        }
    }, {

        /** hooks */
    });
    user.associate = function(models) {
        // associations can be defined here
        /** User Have Many Web_Board */
        user.hasMany(models.web_board, {
            foreignKey: 'writer',
            sourceKey: 'userEmail',
        });
        /** User Have Many Web_reply */
        user.hasMany(models.web_reply, {
            foreignKey: "replyer",
            sourceKey: "userEmail"
        });
    };
    return user;
};