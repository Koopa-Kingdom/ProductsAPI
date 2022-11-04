/* eslint-disable no-multi-str */
const fs = require('fs');
const { Pool } = require('pg');
const fastcsv = require('fast-csv');

exports.insertData = async (query, csvFileName) => {
  const stream = fs.createReadStream(`../CSV_Data/${csvFileName}`);
  const csvData = [];
  const csvStream = await fastcsv
    .parse()
    .on('data', (data) => {
      csvData.push(data);
      console.log(data);
    })
    .on('error', (err) => {
      console.error(err);
    })
    .on('end', () => {
      csvData.shift();
      console.log(csvData[0]);
      //  create new connection to database
      const pool = new Pool({
        host: 'localhost',
        user: 'drewhenderson',
        database: 'productsapidb',
        password: '',
        port: 5432,
        idleTimeoutMillis: 0,
        connectionTimeoutMillis: 0,
      });
      pool.connect((err, client, done) => {
        if (err) throw err;
        try {
          csvData.forEach((row) => {
            client.query(query, row, (error) => {
              if (error) {
                console.log(error.stack, row);
              } else {
                console.log('Saved', row[0]);
              }
            });
          });
        } finally {
          console.log('done');
          done();
        }
      });
    });

  stream.pipe(csvStream);
};

exports.createTable = async (query) => {
  const pool = new Pool({
    host: 'localhost',
    user: 'drewhenderson',
    database: 'productsapidb',
    password: '',
    port: 5432,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,
  });
  await pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(query, (error) => {
        if (error) {
          console.log(error.stack);
        } else {
          console.log('adding table');
        }
      });
    } finally {
      done();
    }
  });
};
