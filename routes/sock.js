const express = require('express');
const router = express.Router();
const cors = require('cors');
const Op = require('sequelize').Op;
const Sock = require('../models').Item;

// Get all Socks
router.get('/', cors(), (req, res) => {
    Sock.findAll({
        attributes: [
            'id',
            'name',
            'price',
            'imageUrl',
            'description',
            'category',
            'size_qty'
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
            'imageUrl',
            'description',
            'category',
            'size_qty'
        ]
    })
        .then(theSock => {
            return res.status(200).json(theSock);
        })
        .catch(err => console.log(err));
});

// Upload a sock
/*
    Takes json body of minimum:
    name: string,
    price: string,
    image_url: string

    ===========================
    Returns Sock JSON object
 */
router.post('/', cors(), (req, res) => {
    const data = req.body;
    if (!data.name ||
        !data.price ||
        !data.imageUrl) {
        return res.status(400).json({
            message: 'Incomplete data. Please ensure all required fields are filled:' +
                'name: string, price: int, and imageUrl: string.',
            receivedData: data
        })
    }
    Sock.findOrCreate({
        where: {imageUrl: data.imageUrl},
        defaults: {
            name: data.name,
            price: data.price,
            imageUrl: data.imageUrl,
            description: data.description,
            category: data.category,
            size_qty: data.size_qty
        }
    }).then(result => {
        let sock = result[0],
            created = result[1];

        if (!created) {
            return res.status(400).json({
                message: 'The item already exists.'
            })
        }
        return res.status(200).json(sock);
    }).catch(error => {
        return res.status(500).json({
            message: 'something went wrong creating the item.',
            error: error
        })
    })

});

// todo -> Delete a sock

/*========================================
            Category Endpoints
========================================*/
// Get all Socks of Men
router.get('/category/men', cors(), (req, res) => {
    Sock.findAll({
            where: {
                [Op.or]: [
                    {category: {[Op.like]: '%men,%'}},
                    {category: {[Op.like]: '%,men,%'}},
                    {category: {[Op.like]: '%,men%'}},
                    {category: {[Op.eq]: 'men'}}
                ]
            }
        }
    )
        .then(menSocks => {
            return res.status(200).json(menSocks);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Something went wrong getting men socks.'
            })
        })
});

// Get all Socks of Women
router.get('/category/women', cors(), (req, res) => {
    Sock.findAll({
            where: {
                [Op.or]: [
                    {category: {[Op.like]: '%women,%'}},
                    {category: {[Op.like]: '%,women,%'}},
                    {category: {[Op.like]: '%,women%'}},
                    {category: {[Op.eq]: 'women'}}
                ]
            }
        }
    )
        .then(womenSocks => {
            return res.status(200).json(womenSocks);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Something went wrong getting women socks.'
            })
        })
});

// Get all Socks of Kids
router.get('/category/kids', cors(), (req, res) => {
    Sock.findAll({
            where: {
                [Op.or]: [
                    {category: {[Op.like]: '%kids,%'}},
                    {category: {[Op.like]: '%,kids,%'}},
                    {category: {[Op.like]: '%,kids%'}},
                    {category: {[Op.eq]: 'kids'}}
                ]
            }
        }
    )
        .then(kidsSocks => {
            return res.status(200).json(kidsSocks);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Something went wrong getting kids socks.',
                error: err
            })
        })
});

// Get all Socks of Gifts
router.get('/category/gifts', cors(), (req, res) => {
    Sock.findAll({
            where: {
                [Op.or]: [
                    {category: {[Op.like]: '%gifts,%'}},
                    {category: {[Op.like]: '%,gifts,%'}},
                    {category: {[Op.like]: '%,gifts%'}},
                    {category: {[Op.eq]: 'gifts'}}
                ]
            }
        }
    )
        .then(giftsSocks => {
            return res.status(200).json(giftsSocks);
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Something went wrong getting gifts socks.',
                error: err
            })
        })
});

/*========================================
            Search Endpoints
========================================*/
// Search socks with Keywords
router.get('/search/:query', cors(), (req, res) => {
    Sock.findAll({
        where: [{
            name: {
                [Op.like]: '%' + req.params.query + '%'
            }
        }],
        attributes: [
            'id',
            'name',
            'price',
            'imageUrl',
            'description',
            'category',
            'size_qty'
        ]
    })
        .then(giftsSocks => {
            return res.status(200).json(giftsSocks);
        })
        .catch(err => console.log(err));
});

module.exports = router;