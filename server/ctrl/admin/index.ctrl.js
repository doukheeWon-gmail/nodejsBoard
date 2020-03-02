/** Admin Main Controller */
const MainPage = (req, res, next) => {
    console.log("Admin Main Page");
    /** Session User Login value */
    console.log("get Session Main Page : ", req.user);
    /** View Insert Json */
    let Model = {
        login: req.user,
        title: "AdminLTE 2 | Dashboard"
    };
    res.render('./admin/index', Model);
};


module.exports = {
    MainPage
}