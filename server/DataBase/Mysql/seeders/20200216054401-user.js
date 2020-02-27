/** password compare Module */
const bcrypt = require('bcrypt-nodejs');

'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        /** Admin User Seeder Data Make */
        let Admin = {
            id: 1,
            userEmail: 'admin@co.kr',
            userPassword: bcrypt.hashSync('admin', bcrypt.genSaltSync(5)),
            userName: 'admin',
            role: "ADMIN",
            createdAt: new Date(),
            updatedAt: new Date()

        }
        return queryInterface.bulkInsert('users', [Admin], {});
        /** Dummy Data Insert Bulk */
        /*
          return queryInterface.bulkInsert('users',)
        */
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};