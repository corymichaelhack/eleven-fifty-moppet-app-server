require('dotenv').config();
//create variable to require express
const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
require('./middleware/cloudinary');
const upload = require('./middleware/multer');
app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
// const sequelize = require('../db');



const user = require('./controllers/user-controller');

const child = require('./controllers/child-controller');


const sequelize = require('./db');
// call sync() method to define all models in DB
sequelize.sync(); // {force:true} to drope tables in database

app.use(express.json());
// app.use(fileUpload());

app.use(require('./middleware/headers'));
app.use('/moppet/user', user);


//Unprotected routes
app.use(require('./middleware/validate-session'));

const Child = sequelize.import('./models/child');

app.post('/moppet/child/addnewchild', upload.single('image'), async (req, res, next) => { 
    //IF PHOTO IS UPLOADED
    if(req.file) {
            const result =  await cloudinary.v2.uploader.upload(req.file.path);
    // res.send(result)

    let newfirstName = req.body.firstName;
    let newlastName = req.body.lastName;
    let newdateOfBirth = req.body.dateOfBirth;
    let newmeds = req.body.meds;
    let newallergy = req.body.allergy;
    let newimage = result.secure_url;
    // console.log(result)
   
    await Child.create({
            firstName: newfirstName,
            lastName: newlastName,
            dateOfBirth: newdateOfBirth,
            meds: newmeds,
            allergy: newallergy,
            imageUrl: newimage
    }).catch(err => res.send(500, err.message))
    } else {
        //NO PHOTO UPLOADED
        let newfirstName = req.body.child.firstName;
        let newlastName = req.body.lastName;
        let newdateOfBirth = req.body.dateOfBirth;
        let newmeds = req.body.meds;
        let newallergy = req.body.allergy;
        // let newimage = result.secure_url;
        // console.log(result)
       
        await Child.create({
                firstName: newfirstName,
                lastName: newlastName,
                dateOfBirth: newdateOfBirth,
                meds: newmeds,
                allergy: newallergy,
                // imageUrl: newimage
        }).catch(err => res.send(500, err.message))
    }
   
});



app.post('/moppet/child/update/:id', upload.single('image'), async (req, res, next) => { 
    //IF PHOTO IS UPLOADED
    if (req.file){
        const result =  await cloudinary.v2.uploader.upload(req.file.path);

        let childId = req.params.id;
        let updatefirstName = req.body.firstName;
        let updatelastName = req.body.lastName;
        let updatedateOfBirth = req.body.dateOfBirth;
        let updatemeds = req.body.meds;
        let updateallergy = req.body.allergy;
        let updateimage = result.secure_url;
        
        
        await Child.update({
            firstName: updatefirstName,
            lastName: updatelastName,
            dateOfBirth: updatedateOfBirth,
            meds: updatemeds,
            allergy: updateallergy,
            imageUrl: updateimage
        },
        { where: {id: childId}})
    } else {
        let childId = req.params.id;
        let updatefirstName = req.body.firstName;
        let updatelastName = req.body.lastName;
        let updatedateOfBirth = req.body.dateOfBirth;
        let updatemeds = req.body.meds;
        let updateallergy = req.body.allergy;
        
        
        
        await Child.update({
            firstName: updatefirstName,
            lastName: updatelastName,
            dateOfBirth: updatedateOfBirth,
            meds: updatemeds,
            allergy: updateallergy
        },
        { where: {id: childId}})
    }

})

app.use('/moppet/child', child);













//PROTECTED ROUTES


app.listen(process.env.PORT, function(){
    console.log('App is listening')
});