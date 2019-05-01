const express = require('express');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require("../config/main");
const Op = require('sequelize').Op;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');

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

// Login user
/*
    Takes JSON body of:
    usernameOrEmail: string
    password: string

    =======================
    Returns:
    success: boolean
    token: string
 */
router.post('/login', cors(), jsonParser, (req, res) => {
    User.findOne({
        where: {
            [Op.or]: [
                {username: req.body.usernameOrPassword},
                {email: req.body.usernameOrPassword}
            ]
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                message: 'A user with provided username or email does not exist'
            })
        }
        let isAuthorised = bcrypt.compareSync(req.body.password, user.password);
        if (isAuthorised) {
            let token = jwt.sign({
                    username: user.username,
                    email: user.email
                },
                config.secretKey, {
                    expiresIn: 1814400 //?????????????????
                });
            return res.status(200).json({
                success: true,
                token: token
            })
        } else {
            return res.status(403).json({
                message: 'Unauthorized.'
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong.',
            error: error
        })
    });
});

// Create user
/*
    Takes json body of minimum:
    username: string,
    email: string,
    password: string

    ===========================
    Returns User JSON object
 */
router.post('/', cors(), jsonParser, (req, res) => {
    const data = req.body;
    console.log(data);

    if (!data.username ||
        !data.email ||
        !data.password) {
        return res.status(404).json({
            message: 'Incomplete data. Please ensure all required fields are filled:' +
                'username, email and password.',
            receivedData: data
        })
    } else {
        User.findOrCreate({
            where: {
                [Op.or]: [
                    {username: data.username},
                    {email: data.email}
                ]
            },
            defaults: {
                username: data.username,
                email: data.email,
                password: hashPassword(data.password)
            }
        }).then(result => {
            let user = result[0],
                created = result[1];

            if (!created) {
                return res.status(400).json({
                    message: 'Username or email already in use.'
                })
            }
            return res.status(200).json(user);
        }).catch(error => {
            return res.status(500).json({
                message: 'something went wrong.',
                error: error
            })
        })
    }
});

// Update a User

// Delete a User (ADMIN ONLY)
/*
    Takes JSON body of:
        username: string
    ==========
    REQUESTS Authorization
 */

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    console.log(hash);
    return hash;
}

module.exports = router;
