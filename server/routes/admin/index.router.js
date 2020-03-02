const express = require('express');
const router = express.Router();
/** Layout template Setting */
const expressLayouts = require('express-ejs-layouts');
/** Admin Main Controller */
const MainCtrl = require('../../ctrl/admin/index.ctrl');
/** auth Admin */
const Auth = require('../../auth/passport').AdminAuth();
/** Admin User Router */
const UserRouter = require('./user/user.router');
/** Admin Member Router */
const MemberRouter = require('./member/member.router');
/** Admin Board Router */
const BoardRouter = require('./board/board.router');


/** Main Router */
const MainRouter = (auth, csurf) => {
    /** Admin Home Router */
    router.get('/', auth.isAuthenticated, MainCtrl.MainPage);

    return router;
};


module.exports = (app, csurf) => {
    //TODO
    /** Admin layout Setting */
    // app.use(expressLayouts);
    // app.set('layout', '../partials/admin/index');
    // app.set("layout extractScripts", true);
    /** Main Admin Router */
    app.use('/admin', MainRouter(Auth));
    //app.use('/admin', MainRouter(Auth.AdminAuth, csurf));
    /** User Admin Router */
    app.use('/admin/user', UserRouter(Auth, csurf));
    /** Admin Member Router */
    app.use("/admin/members", MemberRouter(Auth, csurf));
    //app.use('/admin/user', UserRouter(Auth.AdminAuth, csurf));
    app.use("/admin/boards", BoardRouter(Auth, csurf));
};