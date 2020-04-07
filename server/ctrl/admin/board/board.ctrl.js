/** Admin Board Service */
const Service = require("../../../service/admin/board/board.service");

/** Admin Board Controller Redirect List Page */
const MainPage = (req, res, next) => {
    console.log("Admin Board Main Page");
    return res.redirect('/admin/boards/list');
};

/** Admin Board Controller Create Page */
const CreatePage = (req, res, next) => {
    console.log("Admin Board Create Page");
    return res.render("admin/Boards/create", {
        title: "",
        login: req.user,
        _csrf: req.csrfToken(),
        msg: req.flash('BoardsMsg')
    });
};

/** Admin Board Controller Create Do */
const CreateDo = (req, res, next) => {
    console.log("Admin Board Create Do");
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
    Service.CreateBoard(Boards).then(result => {
        return res.redirect('/admin/boards/list')
    }).catch(err => {
        console.log("Create Do Error Code ::: ", err.code);
        console.log("Create Do Error ::: ", err);
        return res.redirect('/admin/boards/create');
    });

};

/** Admin Board Controller Modify Page */
const ModifyPage = (req, res, next) => {
    console.log("Admin Board Modify Page");
    let bno = req.body.bno || req.query.bno || req.param.bno || req.params.bno || "";
    let user = req.user || "";
    let temp = `Modify Page is ${bno}. login User ${user}`;
    console.log(temp);
    return res.json("");
};

/** Admin Board Controller Modify Do */
const ModifyDo = (req, res, next) => {
    let bno = req.body.bno || req.query.bno || req.param.bno || req.params.bno || "";
    let title = req.body.title || req.query.title || req.param.title || req.params.title || "";
    let content = req.body.content || req.query.content || req.param.content || req.params.content || "";
    let writer = req.body.writer || req.query.writer || req.param.writer || req.params.writer || "";
    console.log("Admin Board Modify Do");
    let temp = `${bno} is Modify title : ${title}, content : ${content}, writer : ${writer}`;
    console.log(temp);
    return res.json("Modify Do");
};

/** Admin Board Controller View Page */
const ViewPage = (req, res, next) => {
    console.log("Admin Board View Page");
    let bno = req.body.bno || req.query.bno || req.param.bno || req.params.bno || "";
    if (bno == "") {
        req.flash("BoardsMsg", "볼 게시판을 선택하세요.");
        return res.redirect('/admin/boards/list');
    }
    if (isNaN(parseInt(bno))) {
        req.flash("BoardsMsg", "잘못된 요청입니다.");
        return res.redirect('/admin/boards/list');
    }
    Service.GetBoard(bno).then(result => {
        //console.log("result : ", result);
        console.log("req userr : " + req.user);
        return res.render('admin/Boards/view', {
            title: "",
            boards: result,
            replies: result.web_replies,
            login: req.user,
            _csrf: req.csrfToken()
        });
    }).catch(err => {
        return res.json(err);
    });
};

/** Admin Board Controller Delete Do */
const DeleteDo = (req, res, next) => {
    console.log("Admin Board Delete Do");
    let login = req.user;
    let bno = req.body.bno || req.query.bno || req.param.bno || req.params.bno || "";
    let writer = req.body.writer || req.query.writer || req.params.writer || req.param.writer || "";

    console.log("Login User : " + login + ", Board Number : " + bno + "writer : " + writer);
    return res.json('Delete Do');
};

/** Search options and paging  */
/** Admin Board Controller List Page */
const ListPage = (req, res, next) => {
    console.log("Admin Board List Page");
    /** get Page Number */
    let page = req.body.page || req.query.page || req.param.page || req.params.page || 1;
    /** get Amount Number */
    let amount = parseInt(req.body.amount || req.query.amount || req.param.amount || req.params.amount || 10);
    /** get Search Options */
    let keyword = req.body.keyword || req.query.keyword || req.param.keyword || req.params.keyword || "";
    let type = req.body.type || req.query.type || req.param.type || req.params.type || "";
    let Search = {};
    if (keyword !== "" && type !== "") {
        Search = { page: page, amount: amount, keyword: keyword, type: type };
    } else {
        Search = { page: page, amount: amount };
    }
    /** Admin Board Paging List Service */
    Service.pageBoard(Search).then(result => {
        //console.log("Result : ", JSON.stringify(result));
        return res.render('admin/Boards/list', {
            title: "",
            login: req.user,
            list: result.Boards,
            PageMaker: result.pageMaker,
            Search: Search
        });
    }).catch(err => {
        console.log("Admin List Board Error Code ::: ", err.code);
        console.log("Admin List Board Error ::: ", err);
        next(err);
    });

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