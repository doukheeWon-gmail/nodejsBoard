const config = require('../../config/config.json');

const DataBaseCheck = () => {
    if (config.database.mysql) {

        /**
         * mysqlDB connection check
         */
        let models = require('./Mysql/models/index');
        models.sequelize.sync().then(() => {
            console.log('DB connect success.');
        }).catch((err) => {
            console.log("Mysql DB Connection Failed...");
            console.log('db connection failed error code ::: ', err.parent);
            console.log('db connection failed error :::: ', err);
        });

    } else if (config.database.mongoDB) {
        /**
         * MongoDB connection check
         */
        const MongooseDB = require('./server/DataBase/mongoModel/index.mongodb');


    } else {
        return new Error("Not DataBase Setting Setting server/config/config.json");
    }
};

module.exports = {
    DataBaseCheck
};