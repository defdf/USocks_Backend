const db = require('../config/database');
const Sequelize = require('sequelize');

const Order = db.define('order', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        /*user_username: {
             type: Sequelize.STRING,
             allowNull: false
         },*/
        dateTime: {
            type: Sequelize.DATE,
            allowNull:
                false
        },
        totalPrice: {
            type: Sequelize.INTEGER,
            allowNull:
                false
        }
    }, {
        freezeTableName: true,
        timestamp:
            false
    }
);

module.exports = Order;