const dbConnection = require("./mongoConnection");

const getCollection = collection =>{
    let cln = undefined;

    return async() => {
        if(!cln){ 
            const db = await dbConnection();
            cln = await db.collection(collection);
        }
        return cln; 
    };
};

module.exports = {
    faculty: getCollection("faculty"),
    adjunct:getCollection("adjunct")

}