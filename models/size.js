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
    timestamp: false
});

module.exports = Size;