const express = require('express');
const router = express.Router();

/** Customer Board Controller */
const BoardCtrl = require('../../../ctrl/customer/board/board.ctrl');

/** Admin Board Reply Controller */
const ReplyCtrl = require('../../../ctrl/customer/board/reply.ctrl');

const BoardRouter = (auth, csurf) => {

    /** Board Main Page */
    router.get('', BoardCtrl.MainPage);
    /** Board Create Page */
    router.get('/create', csurf, BoardCtrl.CreatePage);
    /** Board Create Do */
    router.post("/create", csurf, auth.isAuthenticated, BoardCtrl.CreateDo);
    /** Board Modify Page */
    router.get("/modify", csurf, auth.isAuthenticated, BoardCtrl.ModifyPage);
    /** Board Modify Do */
    router.post("/modify", csurf, auth.isAuthenticated, BoardCtrl.ModifyDo);
    /** Board View page */
    router.get("/view", csurf, BoardCtrl.ViewPage);
    /** Board Delete Do */
    router.post("/delete", auth.isAuthenticated, BoardCtrl.DeleteDo);
    /** Board List Page */
    router.get('/list', BoardCtrl.ListPage);
    /** Reply Add Do */
    router.post('/addReply', csurf, ReplyCtrl.CreateReply);
    /** Reply Update Do */
    router.post('/updateReply', csurf, ReplyCtrl.ModifyReply);
    /** Reply Delete Do */
    router.post('/deleteReply', csurf, ReplyCtrl.DeleteReply);

    /** Upload File Do */
    router.post('/upload', (req, res, next) => {});

    /** Return Router */
    return router;
};

module.exports = BoardRouter;