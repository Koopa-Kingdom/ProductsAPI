const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  idleTimoutMillis: 0,
  connectionTimeoutMillis: 0,
});
pool.on('error', (err) => {
  console.error('unexpected error on idle client', err);
  process.exit(-1);
})

module.exports.queryDB = (query, parametrizedValues) => pool
  .connect()
  .then((client) => client
    .query(query, parametrizedValues)
    .then((res) => {
      client.release();
      return res;
    }).catch((err) => {
      client.release();
      console.log(err);
  }));
/*
Example
-------------
const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
const values = ['brianc', 'brian.m.carlson@gmail.com']

client
  .query(text, values)
  .then(res => {
    console.log(res.rows[0])
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  })
  .catch(e => console.error(e.stack))
*/