'use strict';

const bcrypt = require('bcrypt');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');
const humps = require('humps');
const knex = require('../knex');
const router = require('express').Router();


const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err){
      return next(boom.create(401, "Unauthorized"));
    }
    req.claim = payload;

    next();
  })
}

router.get('/', authorize, (req, res, next) => {
  console.log("hello");
  knex('credit_cards')
    .where('user_id', req.claim.userId)
    .then((creditCards) => {
      res.send(creditCards);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', authorize, (req, res, next) => {
  const { credit_card_number, type, } = decamelizeKeys(req.body);
  const user_id = req.claim.userId;

  knex('credit_cards')
    .insert({ credit_card_number, type, user_id })
    .then(() => {
      res.send('Successful');
    })
    .catch((err) => {
      next(err);
    })
});

router.delete('/:creditCardId', authorize, (req, res, next) => {
  knex('credit_cards')
    .del()
    .where('id', req.params.creditCardId)
    .andWhere('user_id', req.claim.userId)
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
