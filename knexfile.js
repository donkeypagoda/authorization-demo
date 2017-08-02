'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/authorization_demo_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/authorization_demo_test'
  }
}
