const express = require('express');
const router = express.Router();

/** Admin User Controller */
const UserCtrl = require('../../../ctrl/admin/user/user.ctrl');

const AdminUserRouter = (auth, csurf) => {
    /** Admin Main Page */
    router.get("", UserCtrl.MainPageUser);
    /** Admin Create Page */
    router.get('/create', csurf, UserCtrl.RegistePageUser);
    //router.get('/create', auth.isAuthenticated, UserCtrl.RegistePageUser);
    /** Admin Create Do */
    router.post("/create", csurf, UserCtrl.RegisteDoUser);
    //router.post("/create", auth.isAuthenticated, UserCtrl.RegisteDoUser);
    /** Admin Login Page */
    router.get('/login', csurf, auth.isNotLogin, UserCtrl.LoginPageUser);
    /** Admin Login Do */
    router.post('/login', csurf, auth.isNotLogin, UserCtrl.LoginDoUser);
    /** Admin Logout Do */
    router.post('/logout', auth.isAuthenticated, UserCtrl.LogoutDoUser);
    /** Admin Profile Page */
    router.get('/profile', auth.isAuthenticated, UserCtrl.ProfilePageUser);
    /** Admin Profile Modify Page */
    router.get("/modify", auth.isAuthenticated, UserCtrl.ModifyPageUser);
    /** Admin Profile Modify Do */
    router.post('/modify', auth.isAuthenticated, UserCtrl.ModifyDoUser);

    return router;
};


module.exports = AdminUserRouter;