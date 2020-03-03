const configFile = require('../../../../config/config.json');

/** Return Database Type Different */
const UserDao = () => {
    if (configFile.database.mysql) {
        const MysqlDao = require('./mysql/user.dao');
        return MysqlDao;
    } else if (configFile.database.mongoDB) {
        const MongoDBDao = require('./mongoDB/user.dao');
        return MongoDBDao;
    } else {
        throw new Error("Setting Database Config File");
    }

};

module.exports = UserDao;