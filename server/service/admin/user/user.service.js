/** Auth Login */
const Auth = require('../../../auth/passport');
/** Admin User Dao */
const _UserDao = require('../../../dao/admin/user/index.dao');
const UserDao = _UserDao();
/** password compare Module */
const bcrypt = require('bcrypt-nodejs');

/** Admin User Create Service */
const CreateService = (Users) => {
    return new Promise((resolve, reject) => {
        console.log("Admin Create User Service");
        /** Password Encoding */
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

/** Admin User Local Login Service */
const LoginService = (req, res, next) => {
    console.log("Admin Login User Service ");
    return Auth.AdminAuth(req).login(req, res, next);
};

/** Admin User Local Log out Service */
const LogoutService = (req, res, next) => {
    console.log("Admin Logout User Service ");
    req.session.destroy((err) => {
        if (err) {
            console.log("Admin User Logout Session Delete Error Code ::: ", err.code);
            console.log("Admin User Logout Session Delete Error ::: ", err);
            return next(err);
        } else {
            console.log("Admin User Log Out Success");
            return res.redirect('/admin/user/login');
        }
    });
};

/** Admin Profile Service */
const ProfileService = (Users) => {
    console.log("Admin Profile Service");
    return UserDao.DetailUser(Users);
};

/** Admin Update Service */
const UpdateService = (Users) => {

};

module.exports = {
    CreateService,
    ProfileService,
    UpdateService,
    LoginService,
    LogoutService
};