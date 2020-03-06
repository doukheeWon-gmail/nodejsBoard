const configFile = require('../../../../config/config.json');

/** Return Database Type Different */
const UserDao = () => {
    if (configFile.database.mysql) {
        console.log('Admin User Mysql Setting');
        const MysqlDao = require('./mysql/user.dao');
        return MysqlDao;
    } else if (configFile.database.mongoDB) {
        console.log('Admin User mongoDB Setting');
        const MongoDBDao = require('./mongoDB/user.dao');
        return MongoDBDao;
    } else {
        let temp = ``;
        throw new Error("Setting Database Config File");
    }
};


module.exports = UserDao;