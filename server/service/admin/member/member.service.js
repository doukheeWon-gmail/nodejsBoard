/** Admin User Dao */
const _UserDao = require('../../../dao/user/index.dao');
const UserDao = _UserDao();
/** password compare Module */
const bcrypt = require('bcrypt-nodejs');

/** Member Create */
const CreateMember = (Users) => {
    return new Promise((resolve, reject) => {
        console.log("Admin Create Member Service");
        let _Users = {
            Email: Users.Email,
            Password: bcrypt.hashSync(Users.Password, bcrypt.genSaltSync(5)),
            Name: Users.Name
        };
        UserDao.CreateMember(_Users).then(result => {
            return resolve(result);
        }).catch(err => {
            return reject(err);
        });
    });
};

/** Member Profile */
const ProfileMember = (Users) => {
    return new Promise((resolve, reject) => {

    });
};

/** Member Update */
const UpdateMember = (Users) => {
    return new Promise((resolve, reject) => {

    });
};

/** Member List */
const ListMember = (Uesrs) => {
    return new Promise((resolve, reject) => {

    });
};

/** Member Delete */
const DeleteMember = (Users) => {
    return new Promise((resolve, reject) => {

    });
};

/** Member Search by email, name, Permission */
const SearchMember = (Users) => {

};

module.exports = {
    CreateMember,
    ProfileMember,
    UpdateMember,
    DeleteMember,
    SearchMember
};