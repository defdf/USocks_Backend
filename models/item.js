const db = require('../config/database');
const Sequelize = require('sequelize');

const Item = db.define('item', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    imageURL: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(500)
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = Item;