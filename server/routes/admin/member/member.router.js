const express = require('express');
const router = express.Router();

/** Admin Member Controller */
const MemberCtrl = require('../../../ctrl/admin/member/member.ctrl');
const AdminMemberRouter = (auth, csurf) => {

    /** Admin Member Create Page */
    router.get('/create', csurf, auth.isAuthenticated, MemberCtrl.RegistePage);

    /** Admin Member Create Do */
    router.post('/create', csurf, auth.isAuthenticated, MemberCtrl.RegisteDo);

    /** Admin Member List Page */
    router.get('/list', auth.isAuthenticated, MemberCtrl.ListPage);

    /** Admin Member Modify Page */
    router.get("/modify", csurf, auth.isAuthenticated, MemberCtrl.ModifyPage);

    /** Admin Member Modify Do */
    router.post("/modify", csurf, auth.isAuthenticated, MemberCtrl.ModifyDo);

    /** Admin Member Detail Page */
    router.get("/detail", auth.isAuthenticated, MemberCtrl.ProfilePage);

    /** Admin Member Delete Do */
    router.post("/delete", csurf, auth.isAuthenticated, MemberCtrl.DeleteDo);

    return router;
};


module.exports = AdminMemberRouter;