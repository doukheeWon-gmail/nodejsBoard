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
/** Local DataBase Check Users Dao */
const _AdminUserDao = require('../dao/user/index.dao');
const AdminUserDao = _AdminUserDao();

class Auth {
    constructor(role, id, pass) {
        /** User Role */
        this.role = role;
        this.id = id;
        this.pass = pass;
    }

    AdminAuth() {
        console.log("Admin Auth MiddleWare");
    }

    RoleCheck() {
        if (this.role === "ADMIN") {
            passport.use('local-admin', new LocalStrategy({
                /** Admin Local Auth need To Dao Module */
                usernameField: this.id,
                passwordField: this.pass,
                session: true,
                passReqToCallback: false
            }, (username, password, done) => {

            }));

        } else if (this.role === "MANAGER") {

        } else if (this.role === "BASIC") {} else {
            let error = new Error(`NOT HAVE ROLES. ROLE IS ${this.role}`);
            throw error;
        }
    }
};

module.exports = Auth;