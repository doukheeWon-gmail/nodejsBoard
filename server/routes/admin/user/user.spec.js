/** Admin User Router Test */
module.exports = (request, should, app) => {
    describe("GET User Tests", () => {
        /** Admin User Test Case(1) */
        it("1) Main Page Tests", (done) => {
            request(app)
                .get('/admin/users')
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
                .get('/admin/users/login')
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
                .get('/admin/users/profile')
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
        it("4) ", (done) => {

        });
    });
    /** Get Method End */
    describe("POST User Tests", () => {
        /** Admin User Test Case(1) */
        let admin = {
            email: 'admin@co.kr',
            password: 'admin'
        };
        /** Admin Login Page Post Tests */
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
        /** Admin Update Page Post Tests */
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

    });
};