'use strict';

const bcrypt = require('bcrypt');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');
const humps = require('humps');
const knex = require('../knex');
const router = require('express').Router();

router.get('/:userId', (req, res, next) => {
  knex('credit_cards')
    .where('user_id', req.params.userId)
    .then((creditCards) => {
      res.send(creditCards);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const { credit_card_number, type, user_id } = decamelizeKeys(req.body);

  knex('credit_cards')
    .insert({ credit_card_number, type, user_id })
    .then(() => {
      res.send('Successful');
    })
    .catch((err) => {
      next(err);
    })
});

router.delete('/:creditCardId', (req, res, next) => {
  knex('credit_cards')
    .del()
    .where('id', req.params.creditCardId)
    .returning('*')
    .then((data) => {
      const creditCard = data[0];

      res.send(camelizeKeys(creditCard));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
