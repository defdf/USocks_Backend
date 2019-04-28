const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = User;