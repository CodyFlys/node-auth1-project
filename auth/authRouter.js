const express = require('express');

const helper = require('./auth-model')

const router = express.Router();
const bcrypt = require('bcryptjs');

router.post('/register', (req, res) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 12)

    user.password = hash;

    helper.register(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to post the user' });
        })
})

router.post('/login', (req, res, next) => {
    const {userName, password} = req.body

    helper.login(userName)
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                req.session.user = user; // saving user on the session as the user from the req.body
                res.status(200).json({ message: 'SUCCESSFULLY FOUND USER!' });
                next();
            } else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(err => {
            res.status(500).json({message: "error", error})
        })
})

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if(err){
                res.json('error when logging out!')
            } else {
                res.status(200).json({message: 'bye, thanks for coming!'})
            }
        })
    } else if (!req.session) {
        res.status(200).json({message: 'you were not a user to begin with!'})
    }
})

module.exports = router;