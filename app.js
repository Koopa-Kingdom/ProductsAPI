const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/loaderio-09ae7bd3da1ef357bf0b33adf0941b75', (req, res) => {
  res.send('loaderio-09ae7bd3da1ef357bf0b33adf0941b75');
});

app.use('/api/fec2/hr-rfc/products', routes);

module.exports = app;
