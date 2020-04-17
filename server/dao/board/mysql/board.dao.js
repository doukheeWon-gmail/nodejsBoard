const models = require('../../../DataBase/Mysql/models/index');
const web_board = require('../../../DataBase/Mysql/models/web_board');
const web_reply = require('../../../DataBase/Mysql/models/web_reply');

const CreateBoard = (Boards) => {
    return new Promise((resolve, reject) => {
        models.web_board.create(Boards).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Board Create Dao Error Code ::: ", err.code);
            console.log("Admin Board Create Dao Error ::: ", err);
            return reject(err);
        });
    });
};

const UpdateBoard = (Boards) => {
    return new Promise((resolve, reject) => {
        models.web_board.update({
            /** Change */
        }, {
            /** Where */
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Board Update Error Code ::: ", err.code);
            console.log("Admin Board Update Error ::: ", err);
            return reject(err);
        });
    });
};

const FindBoard = (BoardsIdx) => {
    return new Promise((resolve, reject) => {
        CountUpBoard(BoardsIdx).then(result => {
            models.web_board.findOne({
                where: {
                    id: BoardsIdx
                },

                attributes: ['id', 'title', 'content', 'writer'],
                include: [{
                    model: models.web_reply,
                    attributes: ['replyer', 'reContent']
                }]
            }).then(result => {
                return resolve(result);
            }).catch(err => {
                console.log("Admin Board Find Dao Error Code ::: ", err.code);
                console.log("Admin Board Find Dao Error ::: ", err);
                return reject(err);
            });
        }).catch(err => {
            console.log("Admin Board Find Dao Error Code ::: ", err.code);
            console.log("Admin Board Find Dao Error ::: ", err);
            return reject(err);
        });
    });
};

const DeleteBoard = (Boards) => {
    return new Promise((resolve, reject) => {
        models.web_board.destroy({
            where: {

            }
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.loog("Admin Board Delete Dao Error Code ::: ", err.code);
            console.loog("Admin Board Delete Dao Error ::: ", err);
            return reject(err);
        });
    });
};

const CountBoard = (options) => {
    return new Promise((resolve, reject) => {
        models.web_board.count({
            where: options
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Count Board Error Code ::: ", err.code);
            console.log("Admin Count Board Error ::: ", err);
            return reject(err);
        });
    });
};

const PagingBoard = (Boards) => {
    return new Promise((resolve, reject) => {
        models.web_board.findAll({
            where: Boards.Search,
            offset: Boards.offset,
            limit: 10,
            order: [
                [
                    'createdAt', 'DESC'
                ]
            ]
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Board Dao Paging Error Code ::: ", err.code);
            console.log("Admin Board Dao Paging Error ::: ", err);
            return reject(err);
        });
    });
};

/** Count Board Number */
const CountUpBoard = (BoardsIdx) => {
    return new Promise((resolve, reject) => {
        models.web_board.update({
            count: models.Sequelize.literal("count + 1")
        }, {
            where: {
                id: BoardsIdx
            }
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin Count Board Error Code ::: ", err.code);
            console.log("Admin Count Board Error ::: ", err);
            return reject(err);
        });
    });
};

const ListBoard = (Boards) => {
    return new Promise((resolve, reject) => {
        models.web_board.findAll({
            limit: Boards.amount,
            offset: Boards.offset,
            where: Boards.Search,
            order: [
                ['createdAt', 'DESC']
            ],
            include: [{
                model: models.web_reply,
            }]
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Admin List Board Error Code ::: ", err.code);
            console.log("Admin List BOard Error ::: ", err);
            return reject(err);
        });
    });
};

const CreateReply = (Replies) => {
    return new Promise((resolve, reject) => {
        models.web_reply.create({

        }).then(result => {

        }).catch(err => {

        });
    });
};

const UpdateReply = (Replies) => {
    return new Promise((resolve, reject) => {
        models.web_reply.update({

        }, {

        }).then(result => {

        }).catch(err => {

        });
    });
};

const ListReply = (Replies) => {
    return new Promise((resolve, reject) => {
        models.web_reply.findAll({

        }).then(result => {

        }).catch(err => {

        });
    });
};

const DeleteReply = (Replies) => {
    return new Promise((resolve, reject) => {
        models.web_reply.destroy({
            where: {

            }
        }).then(result => {

        }).catch(err => {

        });
    });
};

module.exports = {
    CreateBoard,
    UpdateBoard,
    CountBoard,
    FindBoard,
    DeleteBoard,
    PagingBoard,
    ListBoard,
    CreateReply,
    UpdateReply,
    ListReply,
    DeleteReply
};