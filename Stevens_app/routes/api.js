const express = require('express');
const router = express.Router();
const faculty = require('../data/faculty');
const adjunct = require('../data/adjunct');


router.get("/visualize", async function (req, res) {
    try {
        // const fac = await faculty.getAll();
    
        // const adj = await adjunct.getAll();
        // all= fac.concat(adj);
    
        res.render("tree");
    } catch (err) {
        console.log(err);
    }
});

router.get("/getAll", async function (req, res) {
    try {
        const fac = await faculty.getAllFaculty();
        
    
        const adj = await adjunct.getAllAdjunct();
        // $scope.NewTestList = $scope.fac.map(el => ({
        //     id: el._id,
        //     firstname: el.firstname,
        //     lastname: el.lastname,
        //     // speciality: el.speciality
        // }));
        // var arr2 = []; // create an empty array
        // fac.forEach(function(arr) {
        // arr2.push({id:arr._id,firstname:arr.firstname,lastname: arr.lastname, speciality: arr.speciality}) // push in the array
        // }, this);
        // console.log(arr2)




        Professors = {
            "faculty": fac,
            "adjunct": adj
        }
    
        res.send(Professors);
    } catch (err) {
        console.log(err);
    }
});


router.get("/getFaculty/:id", async function (req, res) {
    try {
            fac = await faculty.getFacultyById(req.params.id);
            res.send(fac);
    } catch (err) {
        console.log(err);
    }
});

router.get("/getFacultyEmail/:email", async function(req, res){
    try{
        const fac = await faculty.getFacultyByEmail(req.params.email);
        res.send(fac);
    } catch(err){
        console.log(err);
    }
});

router.post("/createFaculty", async function (req, res) {
    try {
        let facultyInput = req.body;
        fac  = await faculty.createFaculty(facultyInput);
        res.send(fac);
    } catch (err) {
        console.log(err);
    }
});

router.post("/editFaculty/:id", async function (req, res) {
    try {
        oldFac = await faculty.getFacultyById(req.params.id);
        if (!oldFac) {
            throw "faculty does not exist"
            }
            await faculty.updateFacultyById(req.params.id, req.body);
            newFac = await faculty.getFacultyById(req.params.id);
            res.send(newFac);
        }
     catch (err) {
        console.log(err);
    }
});

router.post("/removeFaculty/:id", async (req, res) => {
    try {
        facInfo = await faculty.getFacultyById(req.params.id);
        if (!facInfo) {
            throw "faculty does not exist"
        }

            await faculty.removeFaculty(req.params.id);
             res.send("faculty deleted successfully");

        }
    
    catch (error) {
        console.log(error);
        res.send(error)

    }
});

 


//routes for adjunct//////////////////////////////////////////////////////////////////////////////////////////////


router.get("/getAdjunct/:id", async function (req, res) {
    try {
            adj = await adjunct.getAdjunctById(req.params.id);
            res.send(adj);
    } catch (err) {
        console.log(err);
    }
});

router.get("/getAdjunctEmail/:email", async function(req, res){
    try{
        fac = await adjunct.getAdjunctByEmail(req.params.email);
        res.send(fac);
    } catch(err){
        console.log(err);
    }
});

router.post("/createAdjunct", async function (req, res) {
    try {
        let adjunctInput = req.body;
        adj = await adjunct.createAdjunct(adjunctInput);
        res.send(adj);
    } catch (adj) {
        console.log(err);
    }
});

router.post("/editAdjunct/:id", async function (req, res) {
    try {
        oldFac = await adjunct.getAdjunctById(req.params.id);
        if (!oldFac) {
            throw "adjunct does not exist"
            }
            await adjunct.updateAdjunctById(req.params.id, req.body);
            newAdj = await adjunct.getAdjunctById(req.params.id);
            res.send(newAdj);
        }
     catch (err) {
        console.log(err);
    }
});

router.post("/removeAdjunct/:id", async (req, res) => {
    try {
        adjInfo = await adjunct.getAdjunctById(req.params.id);
        if (!adjInfo) {
            throw "adjunct does not exist"
        }

            await adjunct.removeAdjunct(req.params.id);
             res.send("adjunct deleted successfully");

        }
    catch (error) {
        console.log(error);
        res.send(error)

    }
});

router.post("/getBySpeciality", async (req, res) => {
    const speciality = req.body.speciality;
    console.log(req.body.speciality);
    
    const a = await faculty.getFacultyBySpeciality(speciality);
    res.send(a)

    const b = await adjunct.getAdjunctBySpeciality(speciality);
    c= a.concat(b);


    res.send(c);
 
});




router.get("/tree", async function (req, res) {
    res.render('tree');
    
});

router.get("/graph", async function(req, res){
    try {
        // const fac = await faculty.getAll();
    
        // const adj = await adjunct.getAll();
        // all= fac.concat(adj);
    
        res.render("forcegraph");
    } catch (err) {
        console.log(err);
    }
});




module.exports = router;