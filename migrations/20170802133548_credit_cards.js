'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('credit_cards', (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users');
    table.string('type').notNullable().defaultTo('');
    table.bigInteger('credit_card_number').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('credit_cards');
};
