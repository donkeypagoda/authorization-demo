'use strict';

const bcrypt = require('bcrypt');
const boom = require('boom');
const { camelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');
const humps = require('humps');
const knex = require('../knex');
const router = require('express').Router();

router.get('/:userId', (req, res, next) => {
  knex('credit_cards')
    .where('user_id', req.params.userId)
    .then((creditCards) => {
      res.send(creditCards);
    });
});

router.post('/', (req, res, next) => {

});

router.patch('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {

});

module.exports = router;
