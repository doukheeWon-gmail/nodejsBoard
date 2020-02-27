'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('web_replies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            replyer: {
                type: Sequelize.STRING,
                references: {
                    model: 'users',
                    key: "userEmail"
                },
                onDelete: "CASCADE",
                allowNull: false
            },
            reTitle: {
                type: Sequelize.STRING
            },
            reContent: {
                type: Sequelize.STRING
            },
            boardIdx: {
                type: Sequelize.BIGINT,
                references: {
                    model: "web_boards",
                    key: 'id'
                },
                onDelete: 'CASCADE',
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('web_replies');
    }
};