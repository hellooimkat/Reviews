const { Pool } = require('pg');

const cn = {
  // host: '172.31.25.132',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  max: 10,
};

module.exports = new Pool(cn);