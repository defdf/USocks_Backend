const db = require('../config/database');
const Sequelize = require('sequelize');

const Size = db.define('size', {
    name: {
        type: Sequelize.STRING(10),
        unique: true,
        primaryKey: true,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false,
    underscored: true
});

Size.associate= function (models) {
    Size.belongsToMany(models.Item, {through: 'item_size', foreignKey: 'size_name'});
};

module.exports = Size;