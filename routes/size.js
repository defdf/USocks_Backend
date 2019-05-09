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

module.exports = router;