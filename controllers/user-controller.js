const router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user')

router.post('/login', (req, res) => {
    let newEmail = req.body.user.email;
    let newPassword = req.body.user.password;
    let newRole = req.body.user.role;

    User.create({
        email: newEmail,
        password: newPassword,
        role: newRole
    }).then(
        res.send("Hello from the other side")
    )
})

module.exports = router;