/** Admin Reply Service */
const service = require('../../../service/admin/board/board.service');

/** Admin Board Reply Create */
const CreateReply = (req, res, next) => {
    console.log("Admin Reply Create");
    return res.json("");
};

/** Admin Board Reply Modify */
const ModifyReply = (req, res, next) => {
    console.log("Admin Reply Modify");
    return res.json("");
};

/** Admin Board Reply Delete */
const DeleteReply = (req, res, next) => {
    console.log("Admin Reply Delete");
    return res.json("");
};

/** Admin Board Reply List */
const ListReply = (req, res, next) => {
    console.log("Admin Reply List");
    return res.json("");
};

module.exports = {
    CreateReply,
    ModifyReply,
    DeleteReply,
    ListReply
};