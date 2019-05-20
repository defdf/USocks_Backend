const express = require('express');
const cors = require('cors');
const passport = require('./config/passport');
const bodyParser = require('body-parser');
const logger = require('morgan');

const db = require('./config/database');
const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(logger('dev'));

const userRouter = require('./routes/user');
const sockRouter = require('./routes/sock');
const sizeRouter = require('./routes/size');
const categoryRouter=require('./routes/category');

app.use('/user', userRouter);
app.use('/sock', sockRouter);
app.use('/category', categoryRouter);
app.use('/size', sizeRouter);

db.sync({force: false})
    .then(() => {
        console.log('Database is synced');
    })
    .catch(err => {
        console.log(err);
    });

module.exports = app;
