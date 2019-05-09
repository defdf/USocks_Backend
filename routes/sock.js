const express = require('express');
const router = express.Router();
const cors = require('cors');
const Sock = require('../models').Item;
const Category = require('../models').Category;

// Get all Socks
router.get('/', cors(), (req, res) => {
    Sock.findAll({
        attributes: [
            'id',
            'name',
            'price',
            'image_url',
            'description'
        ]
    })
        .then(allSocks => {
            return res.status(200).json(allSocks);
        })
        .catch(err => console.log(err));
});

// Get single sock
router.get('/:id', cors(), (req, res) => {
    Sock.findByPk(req.params.id, {
        attributes: [
            'id',
            'name',
            'price',
            'image_url',
            'description'
        ]
    })
        .then(theSock => {
            return res.status(200).json(theSock);
        })
        .catch(err => console.log(err));
});

// Get all Socks of Men
router.get('/men', cors(), (req, res) => {
    Category.findByPk('men')
        .then(men => {
            men.getItems()
                .then(menSocks => {
                    return res.status(200).json(menSocks);
                })
        })
        .catch(err => console.log(err));
});

// get all Socks of women
router.get('/women', cors(), (req, res) => {
    Sock.findAll({
        include: [{
            model: Category,
            where: {category: 'women'}
        }],
        attributes: [
            'id',
            'name',
            'price',
            'image_url'
        ]
    })
        .then(womenSocks => {
            return res.status(200).json(womenSocks);
        })
        .catch(err => console.log(err));
});

// Get all Socks of Kids
router.get('/kids', cors(), (req, res) => {
    Sock.findAll({
        include: [{
            model: Category,
            where: {category: 'kids'}
        }],
        attributes: [
            'id',
            'name',
            'price',
            'image_url'
        ]
    })
        .then(kidsSocks => {
            return res.status(200).json(kidsSocks);
        })
        .catch(err => console.log(err));
});

// Get all Socks of Gifts
router.get('/gifts', cors(), (req, res) => {
    Sock.findAll({
        include: [{
            model: Category,
            where: {category: 'gifts'}
        }],
        attributes: [
            'id',
            'name',
            'price',
            'image_url'
        ]
    })
        .then(giftsSocks => {
            return res.status(200).json(giftsSocks);
        })
        .catch(err => console.log(err));
});

// Search socks with Keywords
router.get('/search/:query', cors(), (req, res) => {
    Sock.findAll({
        where: [{
            name: {
                $like: '%' + req.params.query + '%'
            }
        }],
        attributes: [
            'id',
            'name',
            'price',
            'image_url'
        ]
    })
        .then(giftsSocks => {
            return res.status(200).json(giftsSocks);
        })
        .catch(err => console.log(err));
});

module.exports = router;