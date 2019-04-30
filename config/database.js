require('dotenv').config();
const Sequelize = require('sequelize');

module.exports = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD, {
        port: process.env.DATABASE_PORT,
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
    }
);

const User = require('../models/user');