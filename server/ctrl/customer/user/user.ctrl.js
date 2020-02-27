/** Customer User Service */
const UserService = require('../../../service/customer/user/user.service');

/** Registe Page */
const RegistePageUser = (req, res, next) => {
    console.log("User Create Page");
    res.render('./customer/User/registe', {
        _csrf: req.csrfToken(),
        msg: req.flash("RegisteMsg")
    });
};

/** Registe Do */
const RegisteDoUser = (req, res, next) => {
    console.log("User Create Do");
};

/** Login page */
const LoginPageUser = (req, res, next) => {
    console.log("User Login Page");
};

/** Login Do */
const LoginDoUser = (req, res, next) => {
    console.log("User Login Do");
};

/** Logout Do */
const LogoutDoUser = (req, res, next) => {
    console.log("User Logout Do");
};

/** Profile Page */
const ProfilePageUser = (req, res, next) => {
    console.log("User Profile Page");
};


/** Modify Page */
const ModifyPageUser = (req, res, next) => {
    console.log("User Modify Page");

};

/** Modify Do */
const ModifyDoUser = (req, res, next) => {
    console.log("User Modify Do");
};


module.exports = {
    RegistePageUser,
    RegisteDoUser,
    LoginPageUser,
    LoginDoUser,
    LogoutDoUser,
    ProfilePageUser,
    ModifyPageUser,
    ModifyDoUser
};