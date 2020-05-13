const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expbs = require('express-handlebars');
const configRoutes = require('./routes');

//const static = express.static(__dirname + "/public");

const app = express();

app.use(express.static('views')) ;

//setup express app
//app.use("/public", static);
app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.engine("handlebars", expbs({ defaultLayout : "index"}));
app.set("view engine", "handlebars");
configRoutes(app);


//listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});