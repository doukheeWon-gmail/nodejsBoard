/** Admin Member Service */
const Service = require("../../../service/admin/member/member.service");

/** Admin Member Main Page */
const MainPage = (req, res, next) => {
    console.log("Admin Member Main Page Redirect List Page");
    return res.redirect('/admin/members/list');
};

/** Admin Member Registe Page */
const RegistePage = (req, res, next) => {
    console.log("Admin Member Registe Page");

    return res.render('./admin/Member/create', {
        _csrf: req.csrfToken(),
        title: 'AdminLTE 2 | Member Create',
        msg: req.flash("MemberMsg"),
        login: req.user
    });
};

/** Admin Member Registe Do */
const RegisteDo = (req, res, next) => {
    console.log("Admin Member Regisge Do");
    let userEmail = req.body.email || req.query.email || req.params.email || req.param.email || "";
    let userName = req.body.name || req.query.name || req.params.name || req.param.name || "";
    let userPassword = req.body.password || req.query.password || req.params.password || req.param.password || "";

    if (userEmail == "" || userName == "" || userPassword == "") {
        /** Flash Msg Set */
        req.flash("MemeberMsg", "빈칸 없이 입력해주세요.");
        /** Redirect Member Create Page */
        return res.redirect('/admin/members/create');
    }
    /** User Make Object */
    let Users = {
        Email: userEmail,
        Password: userPassword,
        Name: userName
    };
    Service.CreateMember(Users).then(result => {
        /** Create Success */
        return res.redirect('/admin/members/list');
    }).catch(err => {
        console.log("Registe Error Code ::: ", err.code);
        console.log("Registe Error ::: ", err);
        /** Flash Messgae Set */
        req.flash("MemberMsg", "다시 입력 해주세요.");
        /** Redirect Registe Page */
        return res.redirect('/admin/members/create');
    });
};

/** Admin Member Detail Page */
const ProfilePage = (req, res, next) => {
    return res.render("./admin/Member/detail", {
        title: 'AdminLTE 2 | Member Detail',
        login: req.user
    });
};

/** Admin Member Modify Page */
const ModifyPage = (req, res, next) => {
    return res.render("./admin/Member/update", {
        title: 'AdminLTE 2 | Member Modify',
        login: req.user
    });
};

/** Admin Member Modify Do */
const ModifyDo = (req, res, next) => {
    return res.json("");
};

/** Admin Member Delete Do */
const DeleteDo = (req, res, next) => {
    return res.json("");
};

/** Admin Member List Page */
const ListPage = (req, res, next) => {
    /** get Page Number */
    let page = req.body.page || req.query.page || req.param.page || req.params.page || 1;
    /** get Amount Number */
    let amount = parseInt(req.body.amount || req.query.amount || req.param.amount || req.params.amount || 10);
    /** get Search Options */
    let keyword = req.body.keyword || req.query.keyword || req.param.keyword || req.params.keyword || "";
    let type = req.body.type || req.query.type || req.param.type || req.params.type || "";
    /** Make Search Or Paging Info */
    let Search = {};
    if (keyword !== "" && type !== "") {
        Search = { page: page, amount: amount, keyword: keyword, type: type };
    } else {
        Search = { page: page, amount: amount };
    }
    console.log("Get Search : " + JSON.stringify(Search));
    /** Paging Member Service List */
    Service.PageMember(Search).then(result => {
        console.log("RESULT : " + JSON.stringify(result));
        return res.render("./admin/Member/list", {
            title: 'AdminLTE 2 | Member Create',
            login: req.user,
            list: result.Members,
            PageMaker: result.pageMaker,
            Search: Search
        });
    }).catch(err => {
        console.log("Admin List Member Error Code ::: ", err.code);
        console.log("Admin List Member Error ::: ", err);
        return next(err);
    });

};

module.exports = {
    MainPage,
    RegistePage,
    RegisteDo,
    ProfilePage,
    ModifyPage,
    ModifyDo,
    DeleteDo,
    ListPage
};