//create variable to require express
var express = require('express');
var app = express();
var user = require('./controllers/user-controller');

var sequelize = require('./db');

// call sync() method to define all models in DB
sequelize.sync(); // {force:true} to drope tables in database

app.use(express.json());

//Unprotected routes
app.use('/moppet/user', user);





app.listen(3000, function(){
    console.log('App is listening on port 3000')
});