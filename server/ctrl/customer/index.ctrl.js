/** Customer Main Controller */
const MainPage = (req, res, next) => {
    console.log("Main Page");
    console.log("get Session Check : ", req.user);

    let Model = {
        login: req.user,
        title: "DashBoard"
    };

    res.render('./customer/index', Model);
};

module.exports = {
    MainPage

};