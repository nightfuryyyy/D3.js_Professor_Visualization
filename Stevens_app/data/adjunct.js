const mongoCollections = require("../config/mongoCollections");
const adjunct = mongoCollections.adjunct;

const ObjectID = require('mongodb').ObjectID;

module.exports = {

    async createAdjunct(adjunctDetails){
        try{
            if(!adjunctDetails.email) throw "You must provide an email address";

            const adjunctCollection = await adjunct();

            const adjunctInfo = await adjunctCollection.findOne({email: adjunctDetails.email});

            if(!adjunctInfo){

                let newAdjunct = {
                    firstname: adjunctDetails.firstname,
                    lastname: adjunctDetails.lastname,
                    email: adjunctDetails.email,
                    gender: adjunctDetails.gender,
                    school: adjunctDetails.school,
                    division: adjunctDetails.division,
                    contractType: adjunctDetails.contractType,
                    speciality: adjunctDetails.speciality
                };

                const createAdjunctInfo = await adjunctCollection.insertOne(newAdjunct);
                if (createAdjunctInfo.insertedCount === 0) throw "could not add adjunct";

                return createAdjunctInfo;
                }
            else{
                throw "email already exists";
            }
            }
            catch (error) {
                console.log(error);
            }
                
    },

    async getAdjunctById(id){
        if (!id) throw "you must provide an ID";

        const adjunctCollection = await adjunct();
        const adjunctinfo = await adjunctCollection.findOne({_id: new ObjectID(id)});
        return adjunctinfo;
;
    },

    async getAdjunctByEmail(email){
        if (!email) throw "You must provide an email";
        const adjunctCollection = await adjunct();
        const adjunctinfo = await adjunctCollection.findOne({email: email});
        return adjunctinfo;
    },

    async updateAdjunctById(id,adjunctDetials){
        const adjunctCollection = await adjunct();
        const adjDetails = {};
        const query = {"_id": new ObjectID(id)};
        const newvalues =  {$set:{  "firstname": adjunctDetials.firstname,
                                    "lastname": adjunctDetials.lastname,
                                    "email": adjunctDetials.email,
                                    "gender": adjunctDetials.gender,
                                    "school": adjunctDetials.school,
                                    "division": adjunctDetials.division,
                                    "contractType": adjunctDetials.contractType,
                                    "speciality": adjunctDetials.speciality }};
        const updatedInfo = await adjunctCollection.updateOne(query, newvalues);
        if (updatedInfo.modifiedCount ===0){
            throw "could not update"
        }
        return updatedInfo.modifiedCount
    },

    async removeAdjunct(email){
        if (!email) throw "You must provide id";

        const adjunctCollection = await adjunct();
        const deletedAdjunct = await adjunctCollection.removeOne({email : email});
        if (deletedAdjunct.deletedCount ===0){
            throw "Could not remove adjunct";
        }
    },

    async getAdjunctBySpeciality(spec){
        const adjunctCollection = await adjunct();
        const special = await adjunctCollection.find({ speciality: spec}).toArray();
        // console.log(special);
        return special;
    

    },

    async getAllAdjunct(){

        const adjunctCollection = await adjunct();
        const adjunctinfo = await adjunctCollection.find().toArray();
        return adjunctinfo;
    },




        
    
}