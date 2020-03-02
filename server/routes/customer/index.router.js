const express = require('express');
const router = express.Router();
/** Layout template Setting */
const expressLayouts = require('express-ejs-layouts');
/** Customer Main Controller */
const MainCtrl = require('../../ctrl/customer/index.ctrl');
/** auth Customer */
const Auth = require('../../auth/passport').CustomerAuth();
/** Customer User Router */
const UserRouter = require("./user/user.router");
/** Customer Board Router */
const BoardRouter = require('./board/board.router');

/** Main Router */
const MainRouter = (auth, csurf) => {
    /** Main Customer Router */
    router.get("/", MainCtrl.MainPage);

    return router;
};
module.exports = (app, csurf) => {
    //TODO
    //app.use(expressLayouts);
    //app.set('layout', "../partials/customer/index");
    //app.set('layout extractScripts', true);
    /** Customer Main Router */
    app.use('/', MainRouter(Auth));
    /** Customer User Router */
    app.use('/user', UserRouter(Auth, csurf));
    /** Customer Board Router */
    app.use("/boards", BoardRouter(Auth, csurf));

};