const { Pool } = require('pg');

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
};

module.exports = new Pool(cn);