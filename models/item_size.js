const db = require('../config/database');
const Sequelize = require('sequelize');

const Item_Size = db.define('item_size', {
    qty: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Item_Size.associate = function (models) {
    Item_Size.belongsTo(models.Size, {foreignKey: 'size_name'});
    Item_Size.belongsTo(models.Item, {foreignKey: 'item_id'});
};

module.exports = Item_Size;