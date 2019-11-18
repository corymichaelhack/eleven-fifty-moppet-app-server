require('dotenv').config();
//create variable to require express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
require('./middleware/cloudinary');
const upload = require('./middleware/multer');
app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());


const user = require('./controllers/user-controller');

const child = require('./controllers/child-controller');


const sequelize = require('./db');
// call sync() method to define all models in DB
sequelize.sync(); // {force:true} to drope tables in database

app.use(express.json());
// app.use(fileUpload());

app.use(require('./middleware/headers'));
//Unprotected routes
app.use('/moppet/user', user);
app.use('/moppet/child', child);
//PROTECTED ROUTES
app.use(require('./middleware/validate-session'));





app.listen(process.env.PORT, function(){
    console.log('App is listening')
});