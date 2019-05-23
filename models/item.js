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
    },
    category:{
        type: Sequelize.STRING
    },
    size_qty:{
        type: Sequelize.JSON
    }
}, {
    freezeTableName: true,
    timestamps: false,
    //underscored: true
});

Item.associate = function (models) {
    Item.belongsToMany(models.Order, {through: 'order_item', foreignKey: 'item_id'});
};

module.exports = Item;