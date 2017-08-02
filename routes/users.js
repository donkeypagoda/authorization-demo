'use strict';

const bcrypt = require('bcrypt');
const boom = require('boom');
const jwt = require('jsonwebtoken');
const { camelizeKeys } = require('humps');
const knex = require('../knex');
const router = require('express').Router();

router.post('/', (req, res, next) => {
  console.log('here');
  const { username, password } = req.body;

  knex('users')
    .where('username', username)
    .first()
    .then((row) => {
      console.log(row);
      if (row) {
        throw new Error('User already exists');
      }

      return bcrypt.hash(password, 12)
    })
    .then((hashed_password) => {
      console.log(hashed_password);
      return knex('users').insert({ username, hashed_password }).returning('*')
    })
    .then((user) => {
      let newUser = user[0];
      const claim = { userId: newUser.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '30 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 30)
      });

      delete newUser.hashed_password;

      console.log(newUser);

      res.send(camelizeKeys(newUser));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
