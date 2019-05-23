const db = require('../config/database');
const Sequelize = require('sequelize');

const Order = db.define('order', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        dateTime: {
            type: Sequelize.DATE,
        },
        totalPrice: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        //underscored: true
    }
);

Order.associate = function (models) {
    Order.belongsTo(models.User, {foreignKey: 'user_username'});
    Order.belongsToMany(models.Item, {through: 'order_item', foreignKey: 'order_id'});
};

module.exports = Order;
