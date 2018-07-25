const { Pool } = require('pg');

const cn = {
  host: '52.13.185.141',
  // host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  max: 25,
};

module.exports = new Pool(cn);