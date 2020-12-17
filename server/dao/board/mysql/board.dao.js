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
            /** Default Idx  */
            /** Boards.Search */
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
            /** Delete Options */
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
            boardIdx: Replies.BoardIdx,
            reTitle: Replies.title,
            reContent: Replies.content,
            replyer: Replies.writer
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Board Reply Create Error Code ::: ", err.code);
            console.log("Board Reply Create Error Code ::: ", err);
            return reject(err);
        });
    });
};

const UpdateReply = (Replies) => {
    return new Promise((resolve, reject) => {
        models.web_reply.update(
            /** Update Reply */
            {

            },
            /** Where Options Search */
            {

            }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Board Reply Update Error Code ::: ", err.code);
            console.log("Board Repjly Update Error Code ::: ", err);
            return reject(err);
        });
    });
};

const CountReply = (Replies) => {
    return new Promise((resolve, reject) => {
        models.web_reply.count({
            where: Replies.options
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Board Reply Count Error Code ::: ", err.code);
            console.log("Board Reply Count Error ::: ", err);
            return reject(err);
        });
    });
};

const ListReply = (Replies) => {
    return new Promise((resolve, reject) => {
        models.web_reply.findAll({
            /** Search Options */
            where: Replies.options
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Board Reply List Error Code ::: ", err.code);
            console.log("Board Reply List Error ::: ", err);
            return reject(err);
        });
    });
};

const PagingReply = (Replies) => {
    return new Promise((resolve, reject) => {
        models.web_reply.findALl({
            where: Replies.options,
            offset: Replies.offset,
            limit: 10,
            order: [
                [
                    'createdAt', 'DESC'
                ]
            ]
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Board Reply Paging Error Code ::: ", err.code);
            console.log("Board Reply Paging Error ::: ", err);
            return reject(err);
        });
    });
};

const DeleteReply = (Replies) => {
    return new Promise((resolve, reject) => {
        models.web_reply.destroy({
            /** Delete Reply Default id */
            where: Replies.options
        }).then(result => {
            return resolve(result);
        }).catch(err => {
            console.log("Board Reply Delete Error Code ::: ", err.code);
            console.log("Board Reply Delete Error ::: ", err);
            return reject(err);
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
    CountReply,
    ListReply,
    DeleteReply
};