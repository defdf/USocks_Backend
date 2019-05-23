require('dotenv').config();
const express = require('express');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models').User;
const Sock = require('../models').Item;
const Order = require('../models').Order;
const Op = require('sequelize').Op;
const passport = require('passport');
const secretKey = process.env.SECRETKEY;

// Get all users
router.get('/', cors(), (req, res) => {
    User.findAll({
        attributes: [
            'username',
            'email',
            'firstName',
            'lastName',
        ]
    })
        .then(allUsers => {
            return res.status(200).json(allUsers);
        })
        .catch(err => console.log(err));
});

// Get single user
router.get('/:username', cors(), (req, res) => {
    User.findOne({
        where: {username: req.params.username},
        attributes: [
            'username',
            'email',
            'firstName',
            'lastName',
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
        .catch(err => {
            return res.status(500).json({
                message: 'Something is wrong find the user.',
                error: err
            })
        });
});

// Login user
/*
    Takes JSON body of:
    usernameOrEmail: string
    password: string

    =======================
    Returns:
    token: string
 */
router.post('/login', cors(), (req, res) => {
    User.findOne({
        where: {
            [Op.or]: [
                {username: req.body.usernameOrEmail},
                {email: req.body.usernameOrEmail}
            ]
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                message: 'A user with provided username or email does not exist.'
            })
        }
        let isAuthorised = bcrypt.compareSync(req.body.password, user.password);
        if (isAuthorised) {
            let token = jwt.sign({
                    username: user.username,
                    email: user.email
                },
                secretKey, {
                    expiresIn: '7d'
                });
            return res.status(200).json({
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
router.post('/', cors(), (req, res) => {
    const data = req.body;

    if (!data.username ||
        !data.email ||
        !data.password) {
        return res.status(404).json({
            message: 'Incomplete data. Please ensure all required fields are filled:' +
                'username: string, email: string, and password: string.',
            receivedData: data
        })
    }
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
            firstName: data.firstName,
            lastName: data.lastName,
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
        let returnUser = user;
        returnUser.password = null;
        return res.status(200).json(returnUser);
    }).catch(error => {
        return res.status(500).json({
            message: 'something went wrong.',
            error: error
        })
    })
});

function hashPassword(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}

/* Update User
    REQUIRES Authorization header with bearer token
    Takes json body of:
        updateField: <option>
            options =
                email: string,
                firstName: string,
                lastName: string
        newValue: string
    ===============================
    Returns User json object
 */
router.put('/:username', cors(), passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findOne({
        where: {
            username: req.params.username
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            })
        }
        let data = req.body;
        if (!data.updateField ||
            !data.newValue) {
            return res.status(400).json({
                message: 'Request body must contain updateField and newValue key value pair.' +
                    'Accepted types: email: string, firstName: string, lastName: string.'
            });
        }
        let updateField = data.updateField;
        if (updateField === 'password') {
            return res.status(400).json({
                message: 'Call the relevant endpoints to change your password.'
            })
        }
        let values = {[updateField]: data.newValue};
        user.update(values)
            .then(result => {
                let updatedUser = result;
                updatedUser.password = null;
                res.status(200).json(updatedUser);
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'There was an error updating this user.',
                    error: err
                });
            });
    })
});

// Delete a User
/*
    REQUESTS Authorization header with bearer token
 */
router.delete('/:username', cors(), passport.authenticate('jwt', {session: false}), (req, res) => {
    let bearerHeader = req.get('Authorization');
    let snippedAuth = bearerHeader.replace("Bearer ", "");
    let decodedAuth = jwt.verify(snippedAuth, secretKey);
    let isUser = decodedAuth.username == req.params.username;
    if (isUser) {
        User.findOne({
            where: {
                username: req.params.username
            }
        }).then(userToBeDeleted => {
            if (!userToBeDeleted) {
                return res.status(404).json({
                    message: 'User could not be found',
                })
            }
            // todo => delete user related data
            User.destroy({
                where: {
                    username: userToBeDeleted.username
                }
            }).then(() => {
                return res.status(200).json({
                    message: 'User has been deleted.'
                })
            }).catch(err => {
                return res.status(500).json({
                    message: 'User could not be deleted.',
                    error: err
                })
            })
        }).catch(err => {
            return res.status(500).json({
                message: "Something went wrong deleting the user.",
                error: err
            })
        })
    } else {
        return res.status(401).json({
            message: 'Unauthorized. You cannot delete another user.'
        })
    }
});

/*==================================================================
                          Order Endpoints
==================================================================*/
// Add an order to an user
router.post('/:username/order', cors(), (req, res) => {
    let data = req.body;
    let get_order_items = data.items;
    // todo -> input validation

    User.findByPk(req.params.username)
        .then(user => {
            // Create Order and Order-User-Association
            Order.create({
                dateTime: data.dateTime,
                totalPrice: data.totalPrice,
                user_username: user.username,
            })
                .then(createdOrder => {
                    get_order_items.forEach(itemInOrder => {
                        // Create orderItem and Order-OrderItem-Association
                        createdOrder.addItem(itemInOrder.id, {
                            through: {
                                qty: itemInOrder.qty,
                                unitPrice: itemInOrder.unitPrice
                            }
                        });
                    });
                });
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Something went wrong finding the user.',
                error: err
            });
        })
});

// get all orders of user
router.get('/:username/order', cors(), (req, res) => {
    Order.findAll({
        where: {user_username: req.params.username}
    })
        .then(orders => {
            return res.status(200).json(orders);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Something went wrong finding orders.',
                error: err
            })
        })
});

// get one order of user
router.get('/:username/order/:orderId', cors(), (req, res) => {
    Order.findAll({
        where: {
            [Op.and]: [
                {user_username: req.params.username},
                {id: req.params.orderId}]
        },
        include: [{
            model: Sock
        }]
    })
        .then(orders => {
            return res.status(200).json(orders);
        })

        .catch(err => {
            return res.status(500).json({
                message: 'Something went wrong finding the order.',
                error: err
            })
        })
});

module.exports = router;
