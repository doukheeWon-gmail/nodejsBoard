const express = require('express');
const router = express.Router();

/** Admin Member Controller */
const MemberCtrl = require('../../../ctrl/admin/member/member.ctrl');
const AdminMemberRouter = (auth, csurf) => {

    /** Admin Member Create Page */
    router.get('/create', (req, res, next) => {
        console.log("Admin Member Page");
    });

    /** Admin Member Create Do */
    router.post('/create', (req, res, next) => {
        console.log("Admin Member Do");
    });

    /** Admin Member List Page */
    router.get('/list', MemberCtrl.ListPage);

    /** Admin Member Modify Page */
    router.get("/modify", (req, res, next) => {
        console.log("Admin Member Modify Page");
    });

    /** Admin Member Modify Do */
    router.post("/modify", (req, res, next) => {
        console.log("Admin Member Modify Do");
    });

    /** Admin Member Detail Page */
    router.get("/detail", (req, res, next) => {
        console.log("Admin Member Detail Page");
    });

    /** Admin Member Delete Do */
    router.post("/delete", (req, res, next) => {
        console.log("Admin Member Delete Do");
    });

    return router;
};


module.exports = AdminMemberRouter;