/** Admin User Dao */
const _MemberDao = require('../../../dao/member/index.dao');
const MemberDao = _MemberDao();
/** Search Options Model */
const models = require('../../../DataBase/Mysql/models/index');
/** Page Maker */
const PageMakers = require('../../../utils/PageMaker.class');
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
        MemberDao.CreateMember(_Users).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Member Registe Error Code ::: ", err.code);
            console.log("Admin Member Registe Error ::: ", err);
            return reject(err);
        });
    });
};

/** Member Profile */
const ProfileMember = (Users) => {
    return new Promise((resolve, reject) => {
        UserDao.FindMember(Users).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Member Profile Error Code ::: ", err.code);
            console.log("Admin Member Profile Error ::: ", err);
            return reject(err);
        });
    });
};

/** Member Update */
const UpdateMember = (Users) => {
    return new Promise((resolve, reject) => {
        /** Update Object */
        let _Users = {};
        /** Search Idx */
    });
};

/** Member List */
const ListMember = (Uesrs) => {
    return new Promise((resolve, reject) => {

    });
};

/** Page List Member */
const PageMember = (Users) => {
    return new Promise((resolve, reject) => {
        let options = null;
        if (Users.type && Users.keyword) {
            options = {};
            switch (Users.type) {
                case "e":
                    options.userEmail = {
                        [models.Sequelize.Op.substring]: "%" + Users.keyword + "%"
                    };
                    break;
                case "n":
                    options.userName = {
                        [models.Sequelize.Op.substring]: "%" + Users.keyword + "%"
                    };
                    break;
                case "r":
                    console.log("Get Role Switch");
                    options.role = {
                        [models.Sequelize.Op.substring]: "%" + Users.keyword + "%"
                    };
                    break;
            }
        }
        /** Search Option Check */
        console.log("Options : " + options);
        /** Get Total Member Count */
        MemberDao.CountMember(options).then(total => {
            /** Get Paging Info */
            let ListOptions = new PageMakers(Users, total, options);
            /** Member Value List Get */
            MemberDao.PagingMember(ListOptions).then(result => {
                /** Make Return Value Object */
                let ReturnValue = {
                    Members: result,
                    pageMaker: ListOptions
                };
                return resolve(ReturnValue);
            }).catch(err => {
                console.log("Admin Member Paging Error Code ::: ", err.code);
                console.log("Admin Member Paging Error ::: ", err);
                return reject(err);
            });
        }).catch(err => {
            console.log("Admin Member Count Error Code ::: ", err.code);
            console.log("Admin Member Count Error ::: ", err);
            return reject(err);
        });
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
    PageMember,
    UpdateMember,
    DeleteMember,
    SearchMember
};