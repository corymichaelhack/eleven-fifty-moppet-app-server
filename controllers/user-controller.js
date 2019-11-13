const router = require('express').Router();
const sequelize = require('../db');
const User = sequelize.import('../models/user');
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');


router.post('/signup', (req, res) => {
    let newEmail = req.body.user.email;
    let newPassword = req.body.user.password;
    let newRole = req.body.user.role;

    User.create({ 
        email: newEmail,
        password: bcrypt.hashSync(newPassword, 13),
        role: newRole    
    }).then(
        createUserSuccess = (user) => {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: 60*60*24 });
        res.json({
            user: user,
            message: 'user created',
            sessionToken: token
        });      
        },
        createError = err => res.send(err)
    )
    .catch  (error = (err, user) => {
        res.send(500, err),
        console.log(user)
    }   
    ) 
})




router.post('/signin', (req, res) => {
    let myEmail = req.body.user.email;

    User.findOne({where: {email: myEmail }})
    .then(user => {
        if (user){
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if (matches){
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                    res.json({
                        user: user,
                        message: 'successfully authenticated my user',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({
                        error: "bad gateway, passwords do not match"
                    })
                }
            })
        } else {
            res.status(500).send({error: 'failed to authenticate or no user found'})
        }
    }, err => res.status(501).send({error: 'failed to process'})
    )
})

module.exports = router;