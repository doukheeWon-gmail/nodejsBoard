/** Board Dao */
const _BoardDao = require('../../../dao/board/index.dao');
const BoardDao = _BoardDao();
/** Search Options Model Op */
const models = require('../../../DataBase/Mysql/models/index');
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
            /** Offset Page */
            let offset = Boards.page < 0 ? 0 : ((parseInt(Boards.page) - 1) * parseInt(Boards.amount));
            /** End Page Set */
            let endPage = parseInt(Math.ceil((Boards.page) / 10.0) * 10);
            /** Start Page */
            let startPage = (endPage - 9) < 0 ? 1 : (endPage - 9);
            /** Real End Page */
            let RealEnd = Math.ceil((total * 1.0) / Boards.amount);
            /** Previous Boolean Check */
            let prevFlag = false;
            /** Next Boolean Check */
            let nextFlag = false;
            /** end page set */
            if (RealEnd <= endPage) {
                endPage = RealEnd;
            }
            /** Previous Boolean Set */
            prevFlag = startPage > 1 ? true : false;
            /** Next Boolean Set */
            nextFlag = endPage < RealEnd ? true : false;
            /** Make List Options */
            let ListOptions = {
                offset: offset,
                endPage: endPage,
                startPage: startPage,
                RealEnd: RealEnd,
                prevFlag: prevFlag,
                nextFlag: nextFlag,
                curPage: Boards.page,
                amount: Boards.amount,
                Search: options
            };
            /** Options Check */
            //console.log("Get LIST VALUE : " + JSON.stringify(ListOptions));
            /** Board Value List Get */
            BoardDao.ListBoard(ListOptions).then(result => {
                /** PageMaker */
                let PageMaker = {
                    prev: prevFlag,
                    next: nextFlag,
                    startPage: startPage,
                    endPage: endPage,
                    curPage: Boards.page
                };
                /** Return Paging */
                let Returns = {
                    Boards: result,
                    pageMaker: PageMaker
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

/** Page List Board */
const ListBoard = (Boards) => {
    let emptyJson;
    return new Promise((resolve, reject) => {
        if (Boards.type == null) {
            emptyJson = null;
            BoardDao.CountBoard(emptyJson).then(count => {
                console.log("Count Board : ", count);
                let AllCount = count;
                let offset = 0;
                let MaxPage = 0;
                let prevPage = false;
                let nextPage = false;
                if (parseInt(AllCount % 10) !== 0) {
                    MaxPage = parseInt(AllCount / 10) + 1;
                } else if (parseInt(AllCount) === 0) {
                    MaxPage = 1;
                } else {
                    MaxPage = parseInt(AllCount / 10);
                }
                if (Boards.page > 1) {
                    offset = 10 * (Boards.page - 1);
                }
                if (Boards.page > MaxPage) {
                    offset = 10 * (MaxPage - 1);
                }
                let List = { offset: offset, amount: Boards.amount };
                BoardDao.ListBoard(List).then(result => {
                    let Returns = {
                        offset: offset,
                        MaxPage: MaxPage,
                        List: result,
                        curPage: Boards.page,
                    };
                    return resolve(Returns);
                });
            }).catch(err => {
                console.log("Admin Board Service List Error Code ::: ", err.code);
                console.log("Admin Board Service List Error ::: ", err);
                return reject(err);
            });
        }
        if (Boards.type && Boards.keyword) {
            let options = {};
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
            BoardDao.CountBoard(options).then(count => {
                console.log("RESULT : ", count);
                let AllCount = count;
                let offset = 0;
                let MaxPage = 0;
                if (parseInt(AllCount % 10) !== 0) {
                    MaxPage = parseInt(AllCount / 10) + 1;
                } else {
                    MaxPage = parseInt(AllCount / 10);
                }
                if (Boards.page > 1) {
                    offset = 10 * (Boards.page - 1);
                }
                if (Boards.page > MaxPage) {
                    offset = 10 * (MaxPage);
                }
                let List = { offset: offset, amount: Boards.amount, Search: options };
                BoardDao.ListBoard(List).then(result => {
                    let Returns = {
                        offset: offset,
                        MaxPage: MaxPage,
                        List: result,
                        curPage: Boards.page
                    };
                    return resolve(Returns);
                }).catch(err => {
                    console.log("Admin Board Service List Error Code ::: ", err.code);
                    console.log("Admin Board Service List Error ::: ", err);
                    return reject(err);
                });
            }).catch(err => {
                console.log("Admin Board Service List Error Code ::: ", err.code);
                console.log("Admin Board Service List Error ::: ", err);
                return reject(err);
            });
        }
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
    ListBoard,
    UpdateBoard,
    DeleteBoard,
    AddReply,
    ModifyReply,
    ListReply,
    DeleteReply
};