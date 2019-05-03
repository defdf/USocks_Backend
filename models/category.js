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

module.exports = Category;