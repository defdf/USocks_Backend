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

//const User = require('../models/user');
//const Order = require('../models/order');

//const Item = require('../models/item');
//const Category = require('../models/category');
//const Size = require('../models/size');
//const Order_Item = require('../models/order_item');
//const Item_Size = require('../models/item_size');
//User.hasMany(Order);
//Order.belongsTo(User, {constraints: false});
//Order_Item.belongsTo(Item, {foreignKey: 'item_id'});
//Order_Item.belongsTo(Order, {foreignKey: 'order_id'});
//Item.belongsToMany(Order, {through: 'order_item', foreignKey: 'item_id'});
//Order.belongsToMany(Item, {through: 'order_item', foreignKey: 'order_id'});
//Item.belongsToMany(Size, {through: 'item_size', foreignKey: 'item_id'});
//Item.belongsToMany(Category, {through: 'item_category', foreignKey: 'item_id'});
//Size.belongsToMany(Item, {through: 'item_size', foreignKey: 'size_name'});
//Item_Size.belongsTo(Size, {foreignKey: 'size_name'});
//Item_Size.belongsTo(Item, {foreignKey: 'item_id'});
//Category.belongsToMany(Item, {through: 'item_category', foreignKey: 'category_name'});
