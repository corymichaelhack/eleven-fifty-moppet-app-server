require('dotenv').config();
//create variable to require express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const user = require('./controllers/user-controller');

const child = require('./controllers/child-controller');

const sequelize = require('./db');

// call sync() method to define all models in DB
sequelize.sync(); // {force:true} to drope tables in database

app.use(express.json());
app.use(fileUpload());
app.use(require('./middleware/headers'));

const cloudinary = require('cloudinary');
require('./middleware/cloudinary');
const upload = require('./middleware/multer');


app.post('/upload'), upload.single('image'), async (req, res) => { 
    if(req.files === null){
        return res.status(400).json({msg: "No file uploaded"})
    }
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    res.send(result)
}
// app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}))
// const upload = require('./middleware/multer');

// app.post('/create_photo', upload.single('image'), async (req, res) => {
//     const result = await cloudinary.v2.uploader.upload(req.file.path)
//     res.send(result);
// })



//Unprotected routes
app.use('/moppet/user', user);
app.use('/moppet/child', child);

app.use(require('./middleware/validate-session'));

//PROTECTED ROUTES


app.listen(3000, function(){
    console.log('App is listening on port 3000')
});