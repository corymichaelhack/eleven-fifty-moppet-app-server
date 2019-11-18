const router = require('express').Router();
const sequelize = require('../db');
const Child = sequelize.import('../models/child');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
require('../middleware/cloudinary');
const upload = require('../middleware/multer');
const faker = require('faker');
//  upload.single('image'), async 
    // const result =  
    // await 
    // cloudinary.v2.uploader.upload(req.file.path);
    // res.send(result)
//CREATE A CHILD
router.post('/addnewchild', (req, res) => { 
   
    let newfirstName = req.body.child.firstName;
    // console.log(newfirstName)
    let newlastName = req.body.child.lastName;
    let newdateOfBirth = req.body.child.dateOfBirth;
    let newmeds = req.body.child.meds;
    let newallergy = req.body.child.allergy;
    let newimage = faker.image.avatar();
    // console.log(result)
   
    // await 
    Child.create({ 
      
            firstName: newfirstName,
            lastName: newlastName,
            dateOfBirth: newdateOfBirth,
            meds: newmeds,
            allergy: newallergy,
            imageUrl: newimage
              
    })

    .then(
        createSuccess = (childId, firstName, lastName, dateOfBirth, meds, allergy, imageUrl) => {
            res.json({
                id: childId,
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth,
                meds: meds,
                allergy: allergy,
                imageUrl: imageUrl,
                message: `Child ${childId.id} was created`
            });
        },
        createError = (err) => {
           
            res.status(500).json({error: err})
        }
    );
});

//GET ALL CHILDREN IN THE DATABASE
router.get('/allchildren', (req, res) => {
    Child.findAll({})
    .then(pie => res.status(200).json(pie))
    .catch(err => res.status(500).json({error: err}))
})

//GET CHILD BY ID
router.get('/getchild/:id', function(req, res){
    
   var data = req.params.id;

    Child.findOne({
            where: { id: data }
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});
//  upload.single('image'), async 
// const result =  
    // await 
    // cloudinary.v2.uploader.upload(req.file.path);
//UPDATE CHILD BY ID
router.put('/update/:id', (req, res, next) => { 
    

    let childId = req.params.id;
    let updatefirstName = req.body.child.firstName;
    let updatelastName = req.body.child.lastName;
    let updatedateOfBirth = req.body.child.dateOfBirth;
    let updatemeds = req.body.child.meds;
    let updateallergy = req.body.child.allergy;
    // let updateimage = result.secure_url;
    
    
    Child.update({
        firstName: updatefirstName,
        lastName: updatelastName,
        dateOfBirth: updatedateOfBirth,
        meds: updatemeds,
        allergy: updateallergy,
        // imageUrl: updateimage
    }, 
    { where: {id: childId}})
    .then( createSuccess = (firstName) => {
        res.json({
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            meds: meds,
            allergy: allergy,
            message: `Child ${childId} was updated`
        })
    })
    .catch(err => res.json(req.errors))

})


//DELETE CHILD BY ID
router.delete('/delete/:id', (req, res) => {
    let childId = req.params.id;

    Child.destroy({
        where: {id: childId}
    })
    .then( createSuccess = (firstName) => {
        res.json({
            message: `Child ${childId} was deleted.`
        })
    })
    .catch(err => res.json(req.errors))

})


module.exports = router;
