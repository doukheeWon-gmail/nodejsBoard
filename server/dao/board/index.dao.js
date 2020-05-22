const configFile = require('../../../config/config.json');

/** Return Database Type Different */
const BoardDao = () => {
    if (configFile.database.mysql) {
        console.log('Admin Board Mysql Setting');
        const MysqlUserDao = require('./mysql/board.dao');
        return MysqlUserDao;
    } else if (configFile.database.mongoDB) {
        console.log('Admin Board mongoDB Setting');
        const MongoDBDao = require('./mongoDB/board.dao');
        return MongoDBDao;
    } else {
        let temp = ``;
        throw new Error("Setting Database config file");
    }
};


module.exports = BoardDao;