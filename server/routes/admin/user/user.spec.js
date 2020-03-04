/** Admin User Controller */
const UserCtrl = require('../../../ctrl/admin/user/user.ctrl');
/** Admin User Dao */
const _UserDao = require('../../../dao/admin/user/index.dao');
const UserDao = _UserDao();
/** Password Encoder */
const bcrypt = require('bcrypt-nodejs');
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

            }).catch(err => {
                throw err;
            }).then(done, done);
        });
        /** Check Admin User By userEmail */
        it("2) find User Tests", (done) => {
            let Users = {
                Email: "admin@co.kr"
            };
            UserDao.CheckEmailUser(Users).then(result => {
                //console.log("Find User :", result);

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
                role: "MANAGER"
            };
            UserDao.UpdateUser(Users).then(result => {

            }).catch(err => {
                throw err;
            }).then(done, done);
        });
        it("4) delete User Tests", (done) => {
            let Users = {
                Email: "",
                Password: "",
                Name: "",
                role: ""
            };
            UserDao.DeleteUser(Users).then(result => {

            }).catch(err => {
                throw err;
            }).then(done, done);
        });
    });
    /** User Url Get Tests */
    describe("GET User Tests", () => {
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

        });
        */
    });
    /** Get Method End */
    /** Post Url Tests */
    describe("POST User Tests", () => {
        /** Admin User Test Case(1) */
        let admin = {
            email: 'admin@co.kr',
            password: 'admin'
        };
        /** Admin Login Page Post Tests */
        /*
        it("1) Login Tests", (done) => {
            request(app)
                .post('/admin/users/login')
                .send(admin)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        console.log("Admin User Tests Error Code ::: ", err.code);
                        console.log("Admin User Tests Error ::: ", err);
                        throw err;
                    }
                    return done();
                });
        });
        */
        /** Admin Update Page Post Tests */
        /*
        it("2) Update Tests", (done) => {
            request(app)
                .post('/admin/users/update')
                .send()
                .end((err, res) => {
                    console.log("Admin User Tests Error Code ::: ", err.code);
                    console.log("Admin User Tests Error ::: ", err);
                    throw err;
                });
            return done();
        });
        */
    });
};