'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          id: 1,
          username: 'jamiesonbates',
          hashed_password: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        },
        {
          id: 2,
          username: 'fakeuser1',
          hashed_password: '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        },
        {
          id: 3,
          username: 'fakeuser2',
          hashed_password:
          '$2a$12$enuFwD6k2m8uD9yN2OVcI.ExS1dWGdlTZ/YX2zmWTjS7X24Lo.Wye'
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
    });
};
