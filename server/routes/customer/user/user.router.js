const express = require('express');
const router = express.Router();

/** Customer User Controller */
const UserCtrl = require('../../../ctrl/customer/user/user.ctrl');

const UserRouter = (auth, csurf) => {
    /** Customer Create Page */
    router.get("/registe", csurf, UserCtrl.RegistePageUser);
    /** Customer Create Do */
    router.post("/registe", csurf, UserCtrl.RegisteDoUser);
    /** Customer Login Page */
    router.get("/login", csurf, auth.isNotLogin, UserCtrl.LoginPageUser);
    /** Customer Login Do */
    router.post("/login", csurf, auth.isNotLogin, UserCtrl.LoginDoUser);
    /** Customer Logout Do */
    router.post("/logout", auth.isAuthenticated, UserCtrl.LogoutDoUser);
    /** Customer Profile Page */
    router.get("/profile", auth.isAuthenticated, UserCtrl.ProfilePageUser);
    /** Customer User Modify Page */
    router.get("/modify", auth.isAuthenticated, UserCtrl.ModifyPageUser);
    /** Customer User Modify Do */
    router.post("/modify", auth.isAuthenticated, UserCtrl.ModifyDoUser);

    return router;
};

module.exports = UserRouter;