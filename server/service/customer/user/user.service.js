/** Auth Login */
const Auth = require('../../../auth/passport');
/** Customer User Dao */
const _UserDao = require('../../../dao/user/index.dao');
const UserDao = _UserDao();
/** password compare Module */
const bcrypt = require('bcrypt-nodejs');

/** User Create Service */
const CreateService = (Users) => {
    return new Promise((resolve, reject) => {
        console.log("User Create Service");
        let _Users = {
            Email: Users.Email,
            Password: bcrypt.hashSync(Users.Password, bcrypt.genSaltSync(5)),
            Name: Users.Name
        };
        UserDao.CreateUser(_Users).then(result => {
            console.log("result Check : ", result);
            return resolve(result);
        }).catch(err => {
            return reject(err);
        });
    });
};

/** User Local Login Service */
const LoginService = (req, res, next) => {
    console.log("Login User Service");
    return Auth.CustomerAuth(req).login(req, res, next);
};

/** User Local Log out Service */
const LogoutService = (req, res, next) => {
    console.log("Logout User Service");
    req.session.destroy((err) => {
        if (err) {
            console.log("User Logout Sessison Delete Error Code ::: ", err.code);
            console.log("User Logout Sessison Delete Error ::: ", err);
            return next(err);
        } else {
            console.log("User Log out Success");
            return res.redirect('/user/login');
        }
    });
};

/** User Profile Service */
const ProfileService = (Users) => {
    console.log("User Profile Service");
    return UserDao.DetailUser(Users);
};

/** User Update Service */
const UpdateService = (Users) => {
    console.log("User Update Service");
};

/** User Delete Service */
const DeleteService = (Users) => {
    console.log("User Delete Service");
};

module.exports = {
    CreateService,
    ProfileService,
    LoginService,
    LogoutService,
};