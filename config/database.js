require('dotenv').config();
const Sequelize = require('sequelize');

module.exports = new Sequelize(
    process.env.DATABAST_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD, {
        port: process.env.DATABASE_PORT,
        host: process.env.DATABASE_HOST,
        dialect: 'mysql'
    }
);

const User = require('../models/user');