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
    imageUrl: {
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
    underscored: true
});

Item.associate = function (models) {
    Item.belongsToMany(models.Order, {through: 'order_item', foreignKey: 'item_id'});
    Item.belongsToMany(models.Size, {through: 'item_size', foreignKey: 'item_id'});
    Item.belongsToMany(models.Category, {through: 'item_category', foreignKey: 'item_id', timestamps: false});
};

module.exports = Item;