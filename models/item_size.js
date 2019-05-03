const db = require('../config/database');
const Sequelize = require('sequelize');

const Item_Size = db.define('item_size', {
    /*item_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    size: {
        type: Sequelize.STRING,
        allowNull: false
    },*/
    qty: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamp: false
});

module.exports = Item_Size;