const { Pool } = require('pg');

const pool = new Pool();
pool.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
