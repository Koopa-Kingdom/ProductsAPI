const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'drewhenderson',
  database: 'productsapidb',
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