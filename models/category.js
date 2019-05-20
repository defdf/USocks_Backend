const db = require('../config/database');
const Sequelize = require("sequelize");

const Category = db.define('category', {
    name: {
        type: Sequelize.STRING(10),
        unique: true,
        primaryKey: true,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

Category.associate = function (models) {
    Category.belongsToMany(models.Item, {through: 'item_category', timestamps: false, foreignKey: 'category_name'});
};

module.exports = Category;