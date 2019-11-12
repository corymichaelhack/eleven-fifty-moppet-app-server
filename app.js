require('dotenv').config();
//create variable to require express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const user = require('./controllers/user-controller');

const child = require('./controllers/child-controller');

const sequelize = require('./db');

// call sync() method to define all models in DB
sequelize.sync(); // {force:true} to drope tables in database

app.use(express.json());

app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}))

app.use(require('./middleware/headers'));

//Unprotected routes
app.use('/moppet/user', user);
app.use('/moppet/child', child);

app.use(require('./middleware/validate-session'));

//PROTECTED ROUTES






app.listen(3000, function(){
    console.log('App is listening on port 3000')
});