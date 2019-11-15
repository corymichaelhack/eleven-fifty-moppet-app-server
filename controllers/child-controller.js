const router = require('express').Router();
const sequelize = require('../db');
const Child = sequelize.import('../models/child');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
require('../middleware/cloudinary');
const upload = require('../middleware/multer');
router.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}))

//CREATE A CHILD
// router.post('/addnewchild', upload.single('image'), async (req, res, next) => { 
//     const result =  await cloudinary.v2.uploader.upload(req.file.path);
//     res.send(result)

//     let newfirstName = req.body.child.firstName;
//     let newlastName = req.body.child.lastName;
//     let newdateOfBirth = req.body.child.dateOfBirth;
//     let newmeds = req.body.child.meds;
//     let newallergy = req.body.child.allergy;
//     let newimage = result.secure_url;
//     // console.log(result)
   
//     await Child.create({
//             firstName: newfirstName,
//             lastName: newlastName,
//             dateOfBirth: newdateOfBirth,
//             meds: newmeds,
//             allergy: newallergy,
//             imageUrl: newimage
//     })

//     .then(
//         createSuccess = (childId, firstName, lastName, dateOfBirth, meds, allergy, imageUrl) => {
//             res.json({
//                 id: childId,
//                 firstName: firstName,
//                 lastName: lastName,
//                 dateOfBirth: dateOfBirth,
//                 meds: meds,
//                 allergy: allergy,
//                 imageUrl: imageUrl,
//                 message: `Child ${childId.id} was created`
//             });
//         },
//         createError = (err) => {
           
//             res.status(500).json({error: err})
//         }
//     );
// });

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
// router.put('/update/:id', upload.single('image'), async (req, res, next) => { 
//     const result =  await cloudinary.v2.uploader.upload(req.file.path);

//     let childId = req.params.id;
//     let updatefirstName = req.body.firstName;
//     let updatelastName = req.body.lastName;
//     let updatedateOfBirth = req.body.dateOfBirth;
//     let updatemeds = req.body.meds;
//     let updateallergy = req.body.allergy;
//     let updateimage = result.secure_url;
    
    
//     Child.update({
//         firstName: updatefirstName,
//         lastName: updatelastName,
//         dateOfBirth: updatedateOfBirth,
//         meds: updatemeds,
//         allergy: updateallergy,
//         imageUrl: updateimage
//     }, 
//     { where: {id: childId}})
//     // .then( createSuccess = (firstName) => {
//     //     res.json({
//     //         firstName: firstName,
//     //         lastName: lastName,
//     //         dateOfBirth: dateOfBirth,
//     //         meds: meds,
//     //         allergy: allergy,
//     //         message: `Child ${childId} was updated`
//     //     })
//     // })
//     // .catch(err => res.json(req.errors))

// })


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
