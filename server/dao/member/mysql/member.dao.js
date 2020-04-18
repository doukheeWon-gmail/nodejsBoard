const models = require('../../../DataBase/Mysql/models/index');
const user = require('../../../DataBase/Mysql/models/user');

const CheckEmailMember = (Members) => {
    return new Promise((resolve, reject) => {
        models.user.findOne({
            where: {
                UserEmail: Members.Email
            }
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Member Check Email Error Code ::: ", err.code);
            console.log("Admin Member Check Email Error ::: ", err);
            return reject(err);
        });
    });
};

const CreateMember = (Members) => {
    return new Promise((resolve, reject) => {
        models.user.findOrCreate({
            where: {
                userEmail: Members.Email
            },
            defaults: {
                userEmail: Members.Email,
                userPassword: Members.Password,
                userName: Members.Name,
                role: Members.role
            }
        }).spread((user, create) => {
            if (create) {
                /** Create User Success */
                console.log("Create User. User : ", user.id);
                return resolve(null);
            } else {
                /** Already Have User. */
                console.log("Already Have User.");
                return resolve(user);
            }
        }).catch(err => {
            console.log("Admin Member Create Error Code ::: ", err.code);
            console.log("Admin Member Create Error ::: ", err);
            return reject(err);
        });
    });
};

const UpdateMember = (Members) => {
    return new Promise((resolve, reject) => {
        models.user.modify(
            /** Change Value */
            Members, {
                /** Search Options */
            }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Member Update Error Code ::: ", err.code);
            console.log("Admin Member Update Error ::: ", err);
            return reject(err);
        });
    });
};

const DeleteMember = (Members) => {
    return new Promise((resolve, reject) => {
        models.user.destroy({
            where: {

            }
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Member Delete Error Code ::: ", err.code);
            console.log("Admin Member Delete Error ::: ", err);
            return reject(err);
        });
    });
};

const FindMember = (Members) => {
    return new Promise((resolve, reject) => {
        models.user.findOne({
            where: {

            }
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Member Find Error Code ::: ", err.code);
            console.log("Admin Member Find Error ::: ", err);
            return reject(err);
        });
    });
};

const CountMember = (Options) => {
    return new Promise((resolve, reject) => {
        models.user.count({
            where: Options
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Count Member Error Code ::: ", err.code);
            console.log("Admin Count Member Error ::: ", err);
            return reject(err);
        });
    });
};

const PagingMember = (Members) => {
    return new Promise((resolve, reject) => {
        models.user.findAll({
            where: Members.Search,
            offset: Members.offset,
            limit: 10,
            order: [
                [
                    'createdAt', 'DESC'
                ]
            ]
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Member Paging Error Code ::: ", err.code);
            console.log("Admin Member Paging Error ::: ", err);
            return reject(err);
        });
    });
};

const SearchMember = (Members) => {
    return new Promise((resolve, reject) => {

    });
};

module.exports = {
    CheckEmailMember,
    CreateMember,
    UpdateMember,
    DeleteMember,
    FindMember,
    CountMember,
    PagingMember,
    SearchMember
};