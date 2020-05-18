
const express = require('express');

const helper = require('./user-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    if (req.session && req.session.loggedIn) {
        helper.get()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get the users' });
        })
    } else {
        res.status(401).json({you: "cannot pass!"});
    }
})

module.exports = router;