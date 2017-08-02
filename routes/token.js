'use strict';

const bcrypt = require('bcrypt');
const boom = require('boom');
const { camelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');
const humps = require('humps');
const knex = require('../knex');
const router = require('express').Router();

router.post('/', (req, res, next) => {
  const { username, password } = req.body;
  let user;

  knex('users')
    .where('username', username)
    .returning('*')
    .then((row) => {
      if (!row) {
        throw new Error('Bad email or password');
      }

      user = row[0];

      return bcrypt.compare(password, user.hashed_password)
    })
    .then(() => {
      const claim = { userId: user.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '30 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 30),
        secure: router.get('env') === 'production'
      });

      delete user.hashed_password;

      res.send(camelizeKeys(user));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
