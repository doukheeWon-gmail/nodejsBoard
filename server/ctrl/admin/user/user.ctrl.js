/** Admin User Service */
const UserService = require('../../../service/admin/user/user.service');

/** Main Page */
const MainPageUser = (req, res, next) => {
    console.log("Admin User Main Page Redirect /admin");
    return res.redirect('/admin');
};

/** Registe Page */
const RegistePageUser = (req, res, next) => {
    console.log("Admin User Create Page");
    res.render('./admin/User/registe', {
        _csrf: req.csrfToken(),
        msg: req.flash("RegisteM")
    });
};

/** Registe Do */
const RegisteDoUser = (req, res, next) => {
    console.log("Admin User Create Do");
    const Email = req.body.UserEmail || req.query.UserEmail || "";
    const Password = req.body.UserPassword || req.query.UserPassword || "";
    const Name = req.body.UserName || req.query.UserName || "";
    console.log("User Email : " + Email + ", Password : " + Password + ", Name : " + Name);
    if (Email == "") {
        req.flash("RegisteM", "이메일을 입력하세요.");
        return res.redirect('/admin/user/create');
    }
    if (Password == "") {
        req.flash("RegisteM", "비밀번호를 입력하세요.");
        return res.redirect('/admin/user/create');
    }
    if (Name == "") {
        req.flash("RegisteM", "이름을 입력하세요.");
        return res.redirect('/admin/user/create');
    }
    /** Create User Json */
    let users = {
        Email: Email,
        Password: Password,
        Name: Name
    };
    UserService.CreateService(users).then(result => {
        console.log("Ctrl Check Create User : ", result);
        if (!result) {
            return res.redirect('/admin');
        } else {
            req.flash("RegisteM", "이미 등록된 이메일입니다.");
            return res.redirect('/admin/user/create');
        }
    }).catch(err => {
        return next(err);
    });
};

/** Login Page */
const LoginPageUser = (req, res, next) => {
    console.log("Admin User Login Page");
    res.render('./admin/User/login', {
        _csrf: req.csrfToken(),
        msg: req.flash('Login')
    });
};

/** Login Do */
const LoginDoUser = (req, res, next) => {
    /** Get Parameter */
    const Email = req.body.email || "";
    const Password = req.body.password || "";
    console.log("Admin User Login Do");
    console.log("Login Email : " + Email + ", Password : " + Password);
    if (Email == "") {
        req.flash("Login", "Email을 빈칸이될 수 없습니다.");
        return res.redirect('/admin/user/login');
    }
    if (Password == "") {
        req.flash("Login", "비밀 번호를 입력하세요.");
        return res.redirect('/admin/user/login');
    }
    return UserService.LoginService(req, res, next);
};

/** Logout Do */
const LogoutDoUser = (req, res, next) => {
    console.log("Admin User Logout Do");
    return UserService.LogoutService(req, res, next);
};

/** Profile Page */
const ProfilePageUser = (req, res, next) => {
    console.log("Admin User Profile Page");
    console.log("Profile Session : ", req.user);

    UserService.ProfileService(req.user).then(result => {
        console.log("Result : ", result);
        return res.render("admin/User/profile", {
            user: result
        });
    }).catch(err => {
        return res.redirect('/admin/user/login');
    });
};

/** Modify Page */
const ModifyPageUser = (req, res, next) => {
    console.log("Admin User Modify Page");
    res.render('/admin/User/profile');
};

/** Modify Do */
const ModifyDoUser = (req, res, next) => {
    console.log("Admin User Modify Do");
};

module.exports = {
    MainPageUser,
    RegistePageUser,
    RegisteDoUser,
    LoginPageUser,
    LoginDoUser,
    LogoutDoUser,
    ProfilePageUser,
    ModifyPageUser,
    ModifyDoUser
};