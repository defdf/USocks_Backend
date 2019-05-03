require('dotenv').config();
const Sequelize = require('sequelize');

module.exports = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD, {
        port: process.env.DATABASE_PORT,
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
    }
);

const User = require('../models/user');
const Item = require('../models/item');
const Category = require('../models/category');
const Size = require('../models/size');
const Order = require('../models/order');
const Order_Item = require('../models/order_item');
const Item_Size = require('../models/item_size');

User.hasMany(Order, {foreignKey: 'user_username'});
Order.belongsTo(User, {foreignKey: 'user_username'});

Item.belongsToMany(Order, {through: 'order_item', foreignKey: 'item_id'});
Order.belongsToMany(Item, {through: 'order_item', foreignKey: 'order_id'});
Order_Item.belongsTo(Item, {foreignKey: 'item_id'});
Order_Item.belongsTo(Order, {foreignKey: 'order_id'});

Item.belongsToMany(Size, {through: 'item_size', foreignKey: 'item_id'});
Size.belongsToMany(Item, {through: 'item_size', foreignKey: 'size'});
Item_Size.belongsTo(Size, {foreignKey: 'size'});
Item_Size.belongsTo(Item, {foreignKey: 'item_id'});
