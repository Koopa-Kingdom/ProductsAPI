const pool = require('../models/db');

module.exports.getProductInformation = (productId) => {
  const text = 'query text';
  const values = ['parametrized values', productId]
  pool.query(text, values)
    .then();
};
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