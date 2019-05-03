const db = require('../config/database');
const Sequelize = require('sequelize');

const Item = db.define('item', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
    category: {
        type: Sequelize.STRING(45),
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