const configFile = require('../../../config/config.json');

/** Return Database Type Different */
const UserDao = () => {
    if (configFile.database.mysql) {
        console.log('Admin User Mysql Setting');
        const MysqlUserDao = require('./mysql/member.dao');
        return MysqlUserDao;
    } else if (configFile.database.mongoDB) {
        console.log('Admin User mongoDB Setting');
        const MongoDBDao = require('./mongoDB/member.dao');
        return MongoDBDao;
    } else {
        let temp = ``;
        throw new Error("Setting Database config file");
    }
};


module.exports = UserDao;