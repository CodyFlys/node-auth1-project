
const express = require('express');

const helper = require('./user-model')

const router = express.Router();

router.get('/', (req, res) => {
    helper.get()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get the users' });
        })
})

module.exports = router;