'use strict';

exports.seed = function(knex) {
  return knex('credit_cards').del()
    .then(function () {
      return knex('credit_cards').insert([
        {
          user_id: 1,
          type: 'Visa',
          credit_card_number: 4234567890121234
        },
        {
          user_id: 1,
          type: 'MasterCard',
          credit_card_number: 5234234565431234
        },
        {
          user_id: 1,
          type: 'Discover',
          credit_card_number: 6543234534565678
        },
        {
          user_id: 1,
          type: 'American Express',
          credit_card_number: 312345678901234
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('credit_cards_id_seq', (SELECT MAX(id) FROM credit_cards));");
    });
};
