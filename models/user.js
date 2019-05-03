const db = require('../config/database');
const Sequelize = require("sequelize");

const User = db.define('user', {
    username: {
        type: Sequelize.STRING(32),
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(254),
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(128),
        allowNull: false,
    },
    /*name: {
        type: Sequelize.STRING
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    },*/
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = User;