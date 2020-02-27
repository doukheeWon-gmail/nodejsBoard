'use strict';
module.exports = (sequelize, DataTypes) => {
    const web_board = sequelize.define('web_board', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT
        },
        writer: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'userEmail'
            },
            onDelete: 'CASCADE',
            allowNull: false
        },
        files: {
            type: DataTypes.STRING
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {});
    web_board.associate = function(models) {
        // associations can be defined here

        /** User Have Many Web_Board */
        web_board.belongsTo(models.user, {
            foreignKeyConstraint: true,
            targetKey: 'userEmail',
            foreignKey: 'writer',
            allowNull: false,
            onDelete: 'CASCADE'
        });

        /** Web_Board has Many Web_Reply */
        web_board.hasMany(models.web_reply, {
            foreignKey: "boardIdx",
            sourceKey: "id"
        });


    };
    return web_board;
};