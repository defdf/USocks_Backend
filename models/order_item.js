const db=require('../config/database');
const Sequelize=require('sequelize');

const Order_Item=db.define('order_item',{
   qty:{
       type: Sequelize.INTEGER,
       allowNull: false
   },
    sumPrice: {
       type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamp: false
});

module.exports=Order_Item;