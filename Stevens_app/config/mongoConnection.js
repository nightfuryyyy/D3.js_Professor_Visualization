const mongoClient = require('mongodb').MongoClient;
let connection = undefined;
let db = undefined;

module.exports = async() => {
    if (!connection){
        connection = await mongoClient.connect("mongodb://localhost:27017/", {useNewUrlParser: true, useUnifiedTopology: true});
        db = await connection.db("testdb");
    }

    return db;
}
