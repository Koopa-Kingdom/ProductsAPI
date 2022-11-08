const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  max: 20,
  idleTimoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports.queryDB = (query, parametrizedValues) => pool
  .connect()
  .then((client) => client
    .query(query, parametrizedValues)
    .then((res) => {
      client.release();
      return res;
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