const express = require('express');
const products = require('../controllers/products');

const router = express.Router();

router.use((req, res, next) => {
  // probably do something here
  next();
});
//
router.get('/:product_id',(req, res) => {
  products.getProduct(req.params.product_id).then((results) => {
    res.send(results);
  });
});

router.get('/', (req, res) => {
  const { count, page } = req.query;
  products.getProducts(page, count).then((results) => {
    res.send(results);
  });
});

router.get('/:product_id/styles', (req, res) => {
  products.getStyles(req.params.product_id).then((results) => {
    res.send(results);
  });
});

router.get('/:product_id/related', (req, res) => {
  products.getRelatedProducts(req.params.product_id).then((results) => {
    res.send(results);
  });
});

module.exports = router;
