'use strict';
module.exports = (sequelize, DataTypes) => {
    const web_reply = sequelize.define('web_reply', {
        replyer: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: "userEmail"
            },
            onDelete: "CASCADE",
            allowNull: false
        },
        boardIdx: {
            type: DataTypes.BIGINT,
            references: {
                model: 'web_board',
                key: "id"
            },
            onDelete: "CASCADE",
            allowNull: false
        },
        reTitle: {
            type: DataTypes.STRING
        },
        reContent: {
            type: DataTypes.STRING
        }

    }, {});
    web_reply.associate = function(models) {
        // associations can be defined here

        /** Web_Board Has Many Web_Reply */
        web_reply.belongsTo(models.web_board, {
            foreignKeyConstraint: true,
            targetKey: 'id',
            foreignKey: 'boardIdx',
            allowNull: false,
            onDelete: 'CASCADE'
        });

        /** User Has Many Web_Reply */
        web_reply.belongsTo(models.user, {
            foreignKeyConstraint: true,
            targetKey: 'userEmail',
            foreignKey: 'replyer',
            allowNull: false,
            onDelete: 'CASCADE'
        });
    };
    return web_reply;
};