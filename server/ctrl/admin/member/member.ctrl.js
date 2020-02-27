const MainPage = (req, res, next) => {

};

const RegistePage = (req, res, next) => {

};

const RegisteDo = (req, res, next) => {

};

const ProfilePage = (req, res, next) => {

};

const ModifyPage = (req, res, next) => {

};

const ModifyDo = (req, res, next) => {

};

const DeleteDo = (req, res, next) => {

};

const ListPage = (req, res, next) => {
    let Page = req.body.page || req.query.page || req.param.page || req.params.page || "";
    let keyword = req.body.keyword || req.query.keyword || req.param.keyword || req.params.keyword || "";
    let type = req.body.type || req.query.type || req.param.type || req.params.type || "";
    let tmp = `page Number : ${Page}, Keyword : ${keyword}, type : ${type}`;
    console.log(tmp);
    return res.json("");
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