const db = require('../config/database');
const Sequelize = require('sequelize');

const Order_Item = db.define('order_item', {
    qty: {
        type: Sequelize.INTEGER,
    },
    unitPrice: {
        type: Sequelize.INTEGER,
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Order_Item.associate = function (models) {
    Order_Item.belongsTo(models.Item, {foreignKey: 'item_id'});
    Order_Item.belongsTo(models.Order, {foreignKey: 'order_id'});
};

module.exports = Order_Item;