const passport = require('passport');
/** Local Strategy */
const LocalStrategy = require('passport-local').Strategy;
/** Google Strategy */
const GoogleStrategy = require('passport-google').Strategy;
/** Facebook Strategy */
const FaceBookStrategy = require('passport-facebook').Strategy;
/** Naver Strategy */
const NaverStrategy = require('passport-naver').Strategy;
/** Kakao Strategy */
const KakaoStrategy = require('passport-kakao').Strategy;
/** Remember Me Strategy */
const RememberMeStrategy = require('passport-remember-me').Strategy;
/** password compare Module */
const bcrypt = require('bcrypt-nodejs');
/** Local DataBase Check Admin Users Dao */
const _UserDao = require('../dao/user/index.dao');
const UserDao = _UserDao();




/** Admin Local Auth */
const AdminAuth = (req) => {
    console.log("Admin Auth MiddleWare");
    /** Local Auth need To Dao Module */
    passport.use('local-admin', new LocalStrategy({
        /** this is Form Name */
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: false,
    }, (username, password, done) => {
        console.log("passport Get");
        console.log('user Email : ' + username + ', User Password : ' + password);
        /** Login Page Json */
        let UserJson = {
            UserEmail: username,
            UserPassword: password
        };

        /** Admin User Find */
        UserDao.LoginUser(UserJson).then(result => {
            /** User Value Check */
            if (!result) {
                console.log("Not Have User.");
                return done(null, false, { message: req.flash("Login", "등록된 사용자가 아닙니다.") });
            }
            /** Password Check */
            if (!bcrypt.compareSync(UserJson.UserPassword, result.dataValues.userPassword)) {
                console.log("Not Match Password");
                return done(null, false, { message: req.flash("Login", "비밀번호가 일치하지 않습니다.") });
            }
            //TODO
            /** User Role Check */
            console.log("Login User Result : ", result);
            if (result.role == "ADMIN") {
                return done(null, result, { message: "login success" });
            }
            //return done(null, result, { message: "login success" });
            /** Not Admin User */
            return done(null, false, { message: req.flash("Login", "권한이 없습니다.") });
        }).catch(err => {
            console.log("Passport Get Admin User Dao Error Code ::: ", err.code);
            console.log("Passport Get Admin User Dao Error ::: ", err);
            return done(err);
        });
    }));
    /** Session Save Passport Setting */
    passport.serializeUser((user, done) => {
        //console.log("Save User Session : ", user);
        /** Session Save Info */
        let SaveUser = {
            Email: user.userEmail,
            Name: user.userName,
            role: user.role
        };
        done(null, SaveUser);
    });
    /** Session get User Info Passport Setting */
    passport.deserializeUser((user, done) => {
        //console.log('Get User Session : ', user);
        done(null, user);
    });
    return {
        /** Login Check middle ware */
        isNotLogin: (req, res, next) => {
            if (req.isAuthenticated()) {
                console.log("Already Login User");
                return res.redirect('/admin');
            }
            return next();
        },
        /** Login Middle ware */
        login: passport.authenticate('local-admin', {
            successRedirect: '/admin',
            failureRedirect: '/admin/user/login',
            failureFlash: true,
        }),
        /** Logout before Check Middle ware */
        isAuthenticated: (req, res, next) => {
            console.log("Auth : " + req.isAuthenticated());
            if (req.isAuthenticated()) {
                console.log("GET Login Info : ", req.user);
                if (req.user.role == "ADMIN") {
                    return next();
                }
                req.flash("PERMISSION", "접근 권한이 없습니다.");
                return res.redirect('/');

            }
            console.log("Not Login User Go to Login Page");
            let getURL = req.originalUrl.split("/");
            console.log("Get URL : ", getURL);
            console.log("Get URL : ", getURL[2]);
            if (getURL[2] !== "") {
                req.flash("Login", "로그인을 해야합니다.");
                return res.redirect('/admin/user/login');
            }
            return res.redirect('/admin/user/login');
        }
    };
};

/** Manager Local Auth */
const ManagerAuth = (req) => {
    /** Local Auth need To Dao Module */
    passport.use('local-manager', new LocalStrategy({
        /** this is Form Name */
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: false,
    }, (username, password, done) => {
        console.log('user Email : ' + username + ', User Password : ' + password);
        /** Manager User Find */


    }));
    /** Session Save Passport Setting */
    passport.serializeUser((user, done) => {
        console.log("Save User Session : ", user);
        done(null, user);
    });
    /** Session get User Info Passport Setting */
    passport.deserializeUser((user, done) => {
        console.log('Get User Session : ', user);
        done(null, user);
    });
    return {
        login: passport.authenticate('local-manager', {
            failureRedirect: '/user/login',
            failureFlash: true
        })
    };
};

/** Customer Local Auth */
const CustomerAuth = (req) => {
    /** Local Auth need To Dao Module */
    passport.use('local-customer', new LocalStrategy({
        /** this is Form Name */
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: false,
    }, (username, password, done) => {
        console.log('user Email : ' + username + ', User Password : ' + password);
        /** Customer User Find */


    }));
    /** Session Save Passport Setting */
    passport.serializeUser((user, done) => {
        console.log("Save User Session : ", user);
        done(null, user);
    });
    /** Session get User Info Passport Setting */
    passport.deserializeUser((user, done) => {
        console.log('Get User Session : ', user);
        done(null, user);
    });
    return {
        /** Login Check middle ware */
        isNotLogin: (req, res, next) => {
            if (req.isAuthenticated()) {
                console.log("Already Login User");
                return res.redirect('/');
            }
            return next();
        },
        login: passport.authenticate('local-customer', {
            failureRedirect: '/user/login',
            failureFlash: true
        }),
        /** Logout before Check Middle ware */
        isAuthenticated: (req, res, next) => {
            if (req.isAuthenticated()) {
                return res.next();
            }
            console.log("Not Login User Go to Login Page");
            let getURL = req.originalUrl.split("/");
            console.log("Get URL : ", getURL);
            if (getURL[2] !== "") {
                req.flash("Login", "로그인을 해야합니다.");
                return res.redirect('/user/login');
            }
            return res.redirect('/user/login');
        }
    };
};

/** Remember Me Auth (PlugIn) */
const RememberMeAuth = (req) => {
    passport.use(new RememberMeStrategy((token, done) => {

    }));
};

/** google Auth (PlugIn) */
const GoogleAuth = (req) => {
    passport.use('local-google', new GoogleStrategy({

    }));
};

/** Facebook Auth (PlugIn) */
const FaceBookAuth = (req) => {
    passport.use('local-facebook', new FaceBookStrategy({

    }));
};

/** Naver Auth (PlugIn) */
const NaverAuth = (req) => {
    passport.use("local-naver", new NaverStrategy({

    }));
};

/** Kakao Auth (PlugIn) */
const KakaoAuth = (req) => {
    passport.use('local-kakao', new KakaoStrategy({

    }));
};

module.exports = {
    AdminAuth,
    ManagerAuth,
    CustomerAuth,
    GoogleAuth,
    FaceBookAuth,
    NaverAuth,
    KakaoAuth
};