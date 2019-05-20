const express = require('express');
const router = express.Router();
const cors = require('cors');
const Category = require('../models').Category;

// Get all categories
router.get('/', cors(), (req, res) => {
    Category.findAll({
        attributes: [
            'name'
        ]
    })
        .then(allCategories => {
            return res.status(200).json(allCategories);
        })
        .catch(err => console.log(err));
});

// Get one category
router.get('/:category', cors(), (req, res) => {
    Category.findByPk(req.params.category)
        .then(category => {
            return res.status(200).json(category);
        })
        .catch(err => {
            return res.status(404).json(err);
        })
});

// Post a category
router.post('/', cors(), (req, res) => {
    const data = req.body;

    if (!data) {
        return res.status(400).json({
            message: 'Incomplete data. Please ensure all required fields are filled:' +
                'name.',
            receivedData: data
        })
    } else {
        Category.findOrCreate({
                where: {name: data.name.toLowerCase()},
                defaults: {name: data.name.toLowerCase()}
            }
        ).then(result => {
            let category = result[0],
                created = result[1];

            if (!created) {
                return res.status(400).json({
                    message: 'Category name already in use.'
                })
            }
            return res.status(200).json(category);
        }).catch(err => {
            return res.status(500).json({
                message: 'something went wrong.',
                error: err
            })
        })
    }
});

// Delete a category
router.delete('/:id', cors(), (req, res) => {
    Category.findByPk(req.params.id)
        .then(catToBeDeleted => {
            if (catToBeDeleted) {
                Category.destroy({
                    where: {name: req.params.id}
                })
                    .then(() => {
                        return res.status(200).json({
                            message: "Category has been deleted."
                        })
                    })
                    .catch(err => {
                        return res.status(500).json({
                            message: "Category could not be deleted.",
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: "Category could not be found.",
                error: err
            })
        })
});

module.exports = router;