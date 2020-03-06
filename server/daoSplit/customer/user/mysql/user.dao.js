/** Index Model */
const models = require('../../../../DataBase/Mysql/models/index');
/** User Model */
const user = require('../../../../DataBase/Mysql/models/user');


/** Check Email User */
const CheckEmailUser = (Users) => {
    return new Promise((resolve, reject) => {
        models.user.findOne({
            where: {
                userEmail: Users.Email
            }
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin User Email Check Error Code ::: ", err.code);
            console.log("Admin User Email Check Error ::: ", err);
            return reject(err);
        });
    });
};

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

/** Counter User */
const CounterUser = (options) => {
    return new Promise((resolve, reject) => {
        models.user.count({
            where: options
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Counter User Dao Error Code ::: ", err.code);
            console.log("Admin Counter User Dao Error ::: ", err);
            return reject(err);
        });
    });
};

/** Profile User */
const DetailUser = (Users) => {
    return new Promise((resolve, reject) => {
        models.user.findOne({
            where: {
                userEmail: Users.Email
            }
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin User Detail Dao Error Code ::: ", err.code);
            console.log("Admin User Detail Dao Error ::: ", err);
            return reject(err);
        });
    });
};

/** Update User */
const UpdateUser = (Users) => {
    return new Promise((resolve, reject) => {
        models.user.update({

        }, {
            where: {

            }
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin User Update Dao Error Code ::: ", err.code);
            console.log("Admin User Update Dao Error ::: ", err);
            return reject(err);
        });
    });
};

/** Delete User */
const DeleteUser = (Users) => {
    return new Promise((resolve, reject) => {
        models.user.destroy({
            where: {

            }
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Delete Admin User Error Code ::: ", err.code);
            console.log("Delete Admin User Error ::: ", err);
            return reject(err);
        });
    });
};

module.exports = {
    CheckEmailUser,
    CreateUser,
    CounterUser,
    LoginUser,
    DetailUser,
    UpdateUser,
    DeleteUser
};