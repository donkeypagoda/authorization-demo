'use strict';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/users', require('./routes/users'));
app.use('/api/token', require('./routes/token'));
// app.use('/api/credit_cards', require('./routes/creditCards'));

app.use((err, req, res, next) => {
  res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
