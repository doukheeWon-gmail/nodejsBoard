/** csrf token  */

/** Admin Another Case Module */

module.exports = (request, should, app) => {

    /** Method Admin Main Tests */

    describe("GET Admin Main Test", () => {
        /** Test Case (One) */
        it("1) ", (done) => {
            request(app)
                .get('/admin')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        console.log("Admin Main Tests Error Code ::: ", err.code);
                        console.log("Admin Main Tests Error ::: ", err);
                        throw err;
                    }
                    return done();
                });
        });
        /** Test Case (Two) */
    });

};