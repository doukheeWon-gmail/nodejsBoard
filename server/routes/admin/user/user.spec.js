/** Admin User Controller */
const UserCtrl = require('../../../ctrl/admin/user/user.ctrl');
/** Admin User Dao */
const _UserDao = require('../../../daoSplit/admin/user/index.dao');
const UserDao = _UserDao();
/** Password Encoder */
const bcrypt = require('bcrypt-nodejs');
/** Get Parsing Module */
const cheerio = require('cheerio');

var _csrfToken;

/** Get _csrf get Value Function */
function extractCsrfToken(res) {
    var $ = cheerio.load(res.text);
    return $("[name = _csrf]").val();
}
/** Admin User Router Test */

module.exports = (request, should, app) => {
    /** User Dao Tests */
    describe("User Dao Tests", () => {
        it("1) Admin User Insert Tests", (done) => {
            let Users = {
                Email: "admin@co.kr",
                Password: bcrypt.hashSync("admin"),
                Name: "adminTest",
                role: 'ADMIN'
            };
            UserDao.CreateUser(Users).then(result => {
                //console.log("Insert Admin User : ", result);
                console.log("Insert User : ", result);
            }).catch(err => {
                throw err;
            }).then(done, done);
        });
        /** Check Admin User By userEmail */
        it("2) find User Tests", (done) => {
            let Users = {
                Email: "test@co.kr"
            };
            UserDao.CheckEmailUser(Users).then(result => {
                //console.log("Find User :", result);
                console.log("Find User : ", result);
                if (!result) {
                    console.log("Not Have User");
                }
            }).catch(err => {
                throw err;
            }).then(done, done);
        });
        /** Admin User Modify By userEmail */
        it("3) modify User Tests", (done) => {
            let Users = {
                Email: "test@co.kr",
                Password: "test",
                Name: "test",
                role: "USER"
            };
            UserDao.UpdateUser(Users).then(result => {
                console.log("Modify User : ", result);
                if (result[0] === 1) {
                    console.log("Update User");
                } else {
                    console.log("Failed Update User");
                }
            }).catch(err => {
                throw err;
            }).then(done, done);
        });
        it("4) delete User Tests", (done) => {
            let Users = {
                Email: "test@co.kr",
                Password: "test",
                Name: "test",
                role: "USER"
            };
            UserDao.DeleteUser(Users).then(result => {
                console.log("Delete User : ", result);
                if (result === 1) {
                    console.log("Delete User.");
                } else {
                    console.log("Failed Delete User");
                }
            }).catch(err => {
                throw err;
            }).then(done, done);
        });
    });
    /** User Url Get Tests */
    describe("User URL Tests", () => {
        /** Get _csrf Token */
        var token;
        /** Admin User Test Case(1) */
        it("1) Main Page Tests", (done) => {
            request(app)
                .get('/admin/user')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        console.log("Admin User Tests Error Code ::: ", err.code);
                        console.log("Admin User Tests Error ::: ", err);
                        throw err;
                    }
                    return done();
                });
        });
        /** Admin User Test Case(2) */
        it("2) Login Page Tests", (done) => {

            request(app)
                .get('/admin/user/login')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        console.log("Admin User Tests Error Code ::: ", err.code);
                        console.log("Admin User Tests Error ::: ", err);
                        throw err;
                    }
                    token = extractCsrfToken(res);
                    console.log("test : ", extractCsrfToken(res));
                    return done();
                });
        });
        /** Admin User Test Case(2) - POST */
        it("2) POST Login Page Tests", (done) => {
            /** Send User Login Info */
            let LoginInfo = {
                email: 'admin@co.kr',
                password: 'admin',
                _csrf: token
            };
            request(app)
                .post("/admin/user/login")
                .expect(200)
                .send(LoginInfo)
                .end((err, res) => {
                    if (err) {
                        console.log("Admin User Post Tests Error Code ::: " + err.code);
                        console.log("Admin User Post Tests Error ::: " + err);
                        throw err;
                    }
                    return done();
                });
        });
        /** Admin User Test Case(3) */
        it("3) Profile Page Tests", (done) => {
            request(app)
                .get('/admin/user/profile')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        console.log("Admin User Tests Error Code ::: ", err.code);
                        console.log("Admin User Tests Error ::: ", err);
                        throw err;
                    }
                    return done();
                });
        });
        /** Admin User Test Case(4) */
        /*
        it("4) ", (done) => {
            request(app)
        });
        */
    });

};