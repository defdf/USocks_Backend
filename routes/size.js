const express = require('express');
const router = express.Router();
const cors = require('cors');
const Size = require('../models').Size;

// Get all sizes
router.get('/', cors(), (req, res) => {
    Size.findAll({
        attributes: [
            'name'
        ]
    })
        .then(allSizes => {
            return res.status(200).json(allSizes);
        })
        .catch(err => console.log(err));
});

// Get one size
router.get('/:size', cors(), (req, res) => {
    Size.findByPk(req.params.size)
        .then(size => {
            return res.status(200).json(size);
        })
        .catch(err => {
            return res.status(404).json(err);
        })
});

// Post a size
router.post('/', cors(), (req, res) => {
    const data = req.body;

    if (!data) {
        return res.status(400).json({
            message: 'Incomplete data. Please ensure all required fields are filled:' +
                'name.',
            receivedData: data
        })
    } else {
        Size.findOrCreate({
                where: {name: data.name.toLowerCase()},
                defaults: {name: data.name.toLowerCase()}
            }
        ).then(result => {
            let size = result[0],
                created = result[1];

            if (!created) {
                return res.status(400).json({
                    message: 'Size name already in use.'
                })
            }
            return res.status(200).json(size);
        }).catch(err => {
            return res.status(500).json({
                message: 'something went wrong.',
                error: err
            })
        })
    }
});

// Delete a size
router.delete('/:id', cors(), (req, res) => {
    Size.findByPk(req.params.id)
        .then(sizeToBeDeleted => {
            if (sizeToBeDeleted) {
                Size.destroy({
                    where: {name: req.params.id}
                })
                    .then(() => {
                        return res.status(200).json({
                            message: "size has been deleted."
                        })
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: "size could not be deleted.",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: "size could not be found.",
                error: err
            })
        })
});

module.exports = router;