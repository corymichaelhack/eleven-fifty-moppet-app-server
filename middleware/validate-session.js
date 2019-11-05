const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    if (req.method == 'OPTIONS'){
        next();
    } else {
        const token = req.headers.authorization;
        jwt.verify(token, 'lets_play_sum_games_man', (err, decoded) => {
            if (!err && decoded){
                User.findOne(
                    { where: {id: decoded.id} },
                    console.log(decoded)
                )
                .then(user => {
                    if(!user) throw 'err'
                    req.user = user
                    console.log(req.user)
                    return next();
                })
                .catch(err => next(err))
            } else {
                req.errors = err
                return res.status(500).send('Not authroized')
            }
        })
    }
}

module.exports = validateSession;