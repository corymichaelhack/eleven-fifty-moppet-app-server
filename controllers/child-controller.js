const router = require('express').Router();
const sequelize = require('../db');
const Child = sequelize.import('../models/child');
const cloudinary = require('cloudinary');
require('../middleware/cloudinary');
const upload = require('../middleware/multer');





//CREATE A CHILD
router.post('/addnewchild', (req, res, next) => { 
    
   
    let newfirstName = req.body.child.firstName;
    let newlastName = req.body.child.lastName;
    let newdateOfBirth = req.body.child.dateOfBirth;
    let newmeds = req.body.child.meds;
    let newallergy = req.body.child.allergy;
    

    Child.create({
        firstName: newfirstName,
        lastName: newlastName,
        dateOfBirth: newdateOfBirth,
        meds: newmeds,
        allergy: newallergy,
        // imageUrl: result
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
                // imageUrl: imageUrl,
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

//UPDATE CHILD BY ID
router.put('/update/:id', (req, res) => {
    let childId = req.params.id;
    let  newfirstName = req.body.child.firstName;
    
    Child.update({
        firstName: newfirstName
    }, 
    { where: {id: childId}})
    .then( createSuccess = (firstName) => {
        res.json({
            firstName: firstName,
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
