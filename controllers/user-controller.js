const router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user')

router.post('/signup', (req, res) => {
    let newFirstName = req.body.user.firstName;

    User.create({
        firstName: newFirstName
    }).then(
        res.send("Hello from the other side")
    )
})

module.exports = router;