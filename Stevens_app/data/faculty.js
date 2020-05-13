const mongoCollections = require("../config/mongoCollections");
const faculty = mongoCollections.faculty;

const ObjectID = require('mongodb').ObjectID;

module.exports = {

    async createFaculty(facultyDetails){
        try{
        if(!facultyDetails.email) throw "You must provide an email address";
        
        const facultyCollection = await faculty();

        const facultyInfo = await facultyCollection.findOne({email: facultyDetails.email});

        if (!facultyInfo){

            const facultyCollection = await faculty();

            let newFaculty = {
                firstname: facultyDetails.firstname,
                lastname: facultyDetails.lastname,
                email: facultyDetails.email,
                gender: facultyDetails.gender,
                school: facultyDetails.school,
                division: facultyDetails.division,
                contractType: facultyDetails.contractType,
                speciality: facultyDetails.speciality
            };

            const createFacultyInfo = await facultyCollection.insertOne(newFaculty);
            if (createFacultyInfo.insertedCount === 0) throw "could not add faculty";

            return createFacultyInfo;
        }
        else{
            throw "email already exists";
        }
        }
        catch (error) {
            console.log(error);
            
        }
        
    
    },

    async getFacultyById(id){
        if (!id) throw "you must provide an ID";

        const facultyCollection = await faculty();
        const facultyInfo = await facultyCollection.findOne({_id: new ObjectID(id)});
        return facultyInfo;
;
    },

    async getFacultyByEmail(email){
        if (!email) throw "You must provide an email";
        const facultyCollection = await faculty();
        const facultyinfo = await facultyCollection.findOne({email: email});
        return facultyinfo;
    },

    async updateFacultyById(id, facultyDetails){
        const facultyCollection = await faculty();
        const facDetails = {};
        const query = {"_id": new ObjectID(id)};
        const newvalues = {$set:{   "firstname": facultyDetails.firstname,
                                    "lastname": facultyDetails.lastname,
                                    "email": facultyDetails.email,
                                    "gender": facultyDetails.gender,
                                    "school": facultyDetails.school,
                                    "division": facultyDetails.division,
                                    "contractType": facultyDetails.contractType,
                                    "speciality": facultyDetails.speciality }};
        const updatedInfo = await facultyCollection.updateOne(query, newvalues);
        if (updatedInfo.modifiedCount ===0){
            throw "could not update"
        }
        return updatedInfo.modifiedCount
    },

    async removeFaculty(email){
        if (!email) throw "You must provide email";

        const facultyCollection = await faculty();
        const deletedFaculty = await facultyCollection.removeOne({email: email});

        if (deletedFaculty.deletedCount ===0){
            throw "Could not remove faculty";
        }
    },

    async getFacultyBySpeciality(spec){
        const facultyCollection = await faculty();
        const special = await facultyCollection.find({ speciality: spec}).toArray();
        // console.log(special);
        return special;
    

    },
    async getAllFaculty(){

        const facultyCollection = await faculty();
        const facultyinfo = await facultyCollection.find().toArray();
        return facultyinfo;
        
    },

       
    // let fac1 = {
    //         name : professors,
    //         children :[
    //             {name : faculty,
    //                 children : [
    //                     {
    //                         for (i = 0; i < facultyinfo.length; i++) {
    //                         name : i.name,
    //                     },
    //                 },
    //                 ]

    //     },



}


