const express = require('express');
const router = express.Router();
const cors = require('cors');
const Order = require('../models').Order;
const Sock = require('../models').Item;
const passport = require('passport');

// Get all Order
/*
    REQUESTS Authorization header with bearer token
 */
router.get('/', cors(), passport.authenticate('jwt', {session: false}), (req, res) => {
    Order.findAll()
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

// Get single order
/*
    REQUESTS Authorization header with bearer token
 */
router.get('/:id', cors(), passport.authenticate('jwt', {session: false}), (req, res) => {
    Order.findAll({
        where: {
            id: req.params.id
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

// Delete an order
/*
    REQUESTS Authorization header with bearer token
 */
router.delete('/:id', cors(), passport.authenticate('jwt', {session: false}), (req, res) => {
    Order.findOne({
        where: {
            id: req.params.id
        }
    }).then(orderToBeDeleted => {
        orderToBeDeleted.destroy(
        ).then(() => {
            return res.status(200).json({
                message: 'Order has been deleted.'
            })
        })
    })
        .catch(err => {
            return res.status(500).json({
                message: 'Something went wrong deleting the order.',
                error: err
            })
        })
});

module.exports = router;