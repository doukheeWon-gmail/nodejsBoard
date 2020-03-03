/** Auth Login */
const Auth = require('../../../auth/passport');
/** Customer User Dao */
const _UserDao = require('../../../dao/customer/user/index.dao');
const UserDao = _UserDao();
/** password compare Module */
const bcrypt = require('bcrypt-nodejs');

/** User Create Service */
const CreateService = (Users) => {
    return new Promise((resolve, reject) => {
        console.log("User Create Service");
    });
};


module.exports = {
    CreateService,
};