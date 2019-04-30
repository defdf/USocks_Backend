const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../models/user');

// Get all users
router.get('/', cors(), (req, res) => {
    User.findAll({
        attributes: [
            'username',
            'email',
            //'name',
           // 'isAdmin'
        ]
    })
        .then(allUsers => {
            return res.status(200).json(allUsers);
        })
        .catch(err => console.log(err));
});

// Get single user
router.get('/:id', cors(), (req, res) => {
    User.findOne({
        where: {username: req.params.id},
        attributes: [
            'username',
            'email',
            //'name',
            //'isAdmin'
        ]
    })
        .then(appUser => {
            if (appUser) {
                return res.status(200).json(appUser);
            } else {
                return res.status(404).json({
                    message: 'User not found'
                })
            }
        })
        .catch(err => console.log(err));
});


module.exports = router;
