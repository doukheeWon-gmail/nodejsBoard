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
    const Email = req.body.UserEmail || req.query.UserEmail || "";
    const Password = req.body.UserPassword || req.query.UserPassword || "";
    const Name = req.body.UserName || req.query.UserName || "";
    let temp = `User Registe Email is ${Email}, Password is ${Password}, Name is ${Name}`;
    console.log(temp);
    if (Email == "") {
        req.flash("RegisteMsg", "이메일을 입력하세요.");
        return res.redirect('/user/registe');
    }
    if (Password == "") {
        req.flash("RegisteMsg", "이메일을 입력하세요.");
        return res.redirect('/user/registe');
    }
    if (Name == "") {
        req.flash("RegisteMsg", "이메일을 입력하세요.");
        return res.redirect('/user/registe');
    }
    /** Create User Json */
    let users = {
        Email: Email,
        Password: Password,
        Name: Name
    };

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