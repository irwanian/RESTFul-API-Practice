var {MongoClient, ObjectID, urlmongo} = require('./mongoDB')
var db = require('./mysqlDB').db

module.exports = {
    mongodb : {MongoClient, ObjectID, urlmongo},
    mysql : {db}
}