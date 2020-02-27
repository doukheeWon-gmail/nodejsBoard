/** Customer Board Service */
const Service = require('../../../service/customer/board/board.service');

/** Board Controller Redirect List Page */
const MainPage = (req, res, next) => {
    console.log("Board Main Page");
    return res.redirect('/boards/list');
};

/** Board Controller Create Page */
const CreatePage = (req, res, next) => {
    console.log("Board Create Page");
};

/** Board Controller Create Do */
const CreateDo = (req, res, next) => {
    console.log("Board Create Do");
    /** Create Board */
    let title = req.body.title || req.query.title || "";
    let content = req.body.content || req.query.content || "";
    let writer = req.body.writer || req.query.writer || "";
    /** Null check parameter */
    if (title == "" || writer == "") {
        if (title == "") {
            req.flash("BoardsMsg", "타이틀은 입력해야 합니다.");
        }
        if (writer == "") {
            req.flash("BoardsMsg", "작성자는 꼭 필요합니다.");
        }
        return res.redirect('/admin/boards/create');
    }
    let Boards = { title: title, content: content, writer: writer };
};

/** Board Modify Page */
const ModifyPage = (req, res, next) => {
    console.log("Board Modify Page");
};

/** Board Modify Do */
const ModifyDo = (req, res, next) => {
    console.log("Board Modify Do");
};

/** Board Controller View Page */
const ViewPage = (req, res, next) => {
    console.log("Board View Page");
    let bno = req.body.bno || req.query.bno || req.param.bno || req.params.bno || "";
    /** bno check */
    if (bno == "") {
        req.flash("BoardsMsg", "볼 게시판을 선택하세요.");
        return res.redirect('/admin/boards/list');
    }
    if (isNaN(parseInt(bno))) {
        req.flash("BoardsMsg", "잘못된 요청입니다.");
        return res.redirect('/admin/boards/list');
    }
};

/** Board Controller Delete Do */
const DeleteDo = (req, res, next) => {
    console.log("Board Delete Do");
    let login = req.user;
    let bno = req.body.bno || req.query.bno || req.param.bno || req.params.bno || "";
    let writer = req.body.writer || req.query.writer || req.params.writer || req.param.writer || "";
    /** Parameter Check Log */
    console.log("Login User : " + login + ", Board Number : " + bno + "writer : " + writer);
};

/** Search Options and Paging */
/** Board Controller List Page */
const ListPage = (req, res, next) => {
    console.log("Board List Page");
    /** get Page Number */
    let page = req.body.page || req.query.page || req.param.page || req.params.page || 1;
    /** get Search Options */
    let keyword = req.body.keyword || req.query.keyword || req.param.keyword || req.params.keyword || "";
    let type = req.body.type || req.query.type || req.param.type || req.params.type || "";
    let Search = {};
    if (keyword !== "" && type !== "") {
        Search = { page: page, keyword: keyword, type: type };
    } else {
        Search = { page: page };
    }
};


/** Export Module */
module.exports = {
    MainPage,
    CreatePage,
    CreateDo,
    ModifyPage,
    ModifyDo,
    ViewPage,
    DeleteDo,
    ListPage
};