const db = require('../config/database');
const Sequelize = require("sequelize");

const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
    //underScored: true
});

User.associate = function (models) {
    User.hasMany(models.Order, {foreignKey: 'user_username'});
};

module.exports = User;