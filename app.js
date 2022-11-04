const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/fec2/hr-rfc/products', routes);

module.exports = app;