/** Board Dao */
const _BoardDao = require('../../../dao/board/index.dao');
const BoardDao = _BoardDao();
/** Search Options Model Op */
const models = require('../../../DataBase/Mysql/models/index');
/** PageMaker */
const PageMakers = require('../../../utils/PageMaker.class');
/** Board Create Service */
const CreateBoard = (Boards) => {
    console.log("Admin Board Service Create");
    return new Promise((resolve, reject) => {
        BoardDao.CreateBoard(Boards).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Board Service Create Error Code ::: ", err.code);
            console.log("Admin Board Service Create Error ::: ", err);
            return reject(err);
        });
    });
};

/** Board View */
const GetBoard = (BoardsIdx) => {
    console.log("Admin Board Service View");
    return BoardDao.FindBoard(BoardsIdx);
};

/** Board Update  */
const UpdateBoard = (Boards) => {
    console.log("Admin Board Service Update");
    return new Promise((resolve, reject) => {

    });
};

/** Page List Board */
const pageBoard = (Boards) => {
    return new Promise((resolve, reject) => {
        let options = null;
        /** Search Options */
        if (Boards.type && Boards.keyword) {
            /** Search Option Add */
            switch (Boards.type) {
                case "t":
                    options.title = {
                        [models.Sequelize.Op.substring]: "%" + Boards.keyword + "%"
                    };
                    break;
                case "w":
                    options.writer = {
                        [models.Sequelize.Op.substring]: "%" + Boards.keyword + "%"
                    };
                    break;
                case "c":
                    options.content = {
                        [models.Sequelize.Op.substring]: "%" + Boards.keyword + "%"
                    };
                    break;

            }
        }
        /** Option Check  */
        console.log("optioins Check : " + options);

        /** Get Total Board Count */
        BoardDao.CountBoard(options).then(total => {
            /** Get Paging Info */
            let ListOptions = new PageMakers(Boards, total, options);
            /** Options Check */
            //console.log("Get LIST VALUE : " + JSON.stringify(ListOptions));
            /** Board Value List Get */
            BoardDao.ListBoard(ListOptions).then(result => {
                /** PageMaker */
                /*
                let PageMaker = {
                    prev: ListOptions.prevFlag,
                    next: ListOptions.nextFlag,
                    startPage: ListOptions.startPage,
                    endPage: ListOptions.endPage,
                    curPage: Boards.page
                }; 
                */
                /** Return Paging */
                let Returns = {
                    Boards: result,
                    //pageMaker: PageMaker
                    pageMaker: ListOptions
                };

                return resolve(Returns);

            }).catch(err => {
                console.log("Admin Board Service List Error Code ::: ", err.code);
                console.log("Admin Board Service List Error ::: ", err);
                return reject(err);
            });
        }).catch(err => {
            console.log("Admin Board Service List Count Error Code ::: ", err.code);
            console.log("Admin Board Service List Count Error ::: ", err);
            return reject(err);
        });
    });
};

/** Delete Board */
const DeleteBoard = (Boards) => {
    console.log("Admin Board Service Delete");
    return new Promise((resolve, reject) => {

    });
};

const SearchBoard = (Boards) => {
    console.log("Admin Board Service Search");
    return new Promise((resolve, reject) => {

    });
};

/** Reply Add */
const AddReply = (Replies) => {
    return new Promise((resolve, reject) => {

    });
};

/** Reply Update */
const ModifyReply = (Replies) => {
    return new Promise((resolve, reject) => {

    });
};

/** Reply List */
const ListReply = (Replies) => {
    return new Promise((resolve, reject) => {

    });
};

/** Reply Delete */
const DeleteReply = (Replies) => {
    return new Promise((resolve, reject) => {

    });
};

module.exports = {
    CreateBoard,
    GetBoard,
    SearchBoard,
    pageBoard,
    UpdateBoard,
    DeleteBoard,
    AddReply,
    ModifyReply,
    ListReply,
    DeleteReply
};