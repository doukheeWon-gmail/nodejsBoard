const models = require('../../../../DataBase/Mysql/models/index');
const user = require('../../../../DataBase/Mysql/models/user');

/** Registe user Default Role USER */
const CreateUser = (Users) => {
    return new Promise((resolve, reject) => {
        models.user.findOrCreate({
            where: {
                userEmail: Users.Email
            },
            defaults: {
                userEmail: Users.Email,
                userPassword: Users.Password,
                userName: Users.Name,
                role: 'USER'
            }
        }).spread((user, create) => {
            if (create) {
                /** Create User. */
                console.log("Create User. User : ", user.id);
                return resolve(null);
            } else {
                /** Already Have User. */
                console.log("Already Have User.");
                return resolve(user);
            }
        }).catch(err => {
            console.log("Admin Create User Dao Error Code ::: ", err.code);
            console.log("Admin Create User Dao Error ::: ", err);
            return reject(err);
        });
    });
};

/** Login User */
const LoginUser = (Users) => {
    return new Promise((resolve, reject) => {
        models.user.findOne({
            where: {
                userEmail: Users.UserEmail
            },
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Login User Dao Error Code ::: ", err.code);
            console.log("Admin Login User Dao Error ::: ", err);
            return reject(err);
        });
    });
};
module.exports = {
    CreateUser,
    LoginUser
};