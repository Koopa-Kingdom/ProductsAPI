/* eslint-disable no-multi-str */
const { queryDB } = require('./queryDB');

module.exports.getProduct = (productId) => {
  const query = `SELECT
  json_build_object('id', p.id, 'name', p.name, 'slogan', p.slogan, 'description', p.description, 'category', p.category, 'default_price', p.default_price,
    'features', (SELECT json_agg(json_build_object('feature', f.feature, 'value', f.value)) FROM features f WHERE p.id = f.product_id)) result
  FROM product p
  WHERE p.id = $1;`;
  // , product,name, product.slogan, product.description, product.category, product.default_price;';
  const parametrizedValues = [productId];

  return queryDB(query, parametrizedValues).then((results) => results.rows[0].result);
};

module.exports.getProducts = (page, count = 5) => {
  const startingID = (page - 1) * count;
  const endingID = startingID + count;
  const parametrizedValues = [startingID, endingID];
  const query = 'SELECT id, name, slogan, description, category, default_price, FROM product WHERE id > $1 AND id <= $2;';
  return queryDB(query, parametrizedValues).then((results) => results.rows[0]);
};

module.exports.getStyles = (productId) => {
  const query = `SELECT
  json_build_object('product_id', s.product_id, 'results',
  (json_agg(json_build_object(
    'style_id', s.id,
    'name', s.name,
    'original_price', s.original_price,
    'sale_price', s.sale_price,
    'default?', s.default_style,
    'photos', (SELECT json_agg(json_build_object(
        'thumbnail_url', f.thumbnail_url,
        'url', f.url))
        FROM photos f WHERE s.id = f.style_id))))) result
  FROM styles s
  WHERE s.product_id = $1
  GROUP BY s.product_id;`;
  const parametrizedValue = [productId];

  return queryDB(query, parametrizedValue).then((results) => results.rows[0].result);
};

module.exports.getRelatedProducts = (productId) => {
  const query = `SELECT
    json_agg(related_product_id) result
    FROM related
    WHERE product_id = $1;`;
  const parametrizedValue = [productId];
  return queryDB(query, parametrizedValue).then((results) => results.rows[0].result);
};

console.log(module.exports.getRelatedProducts(1).then(result => console.log(result)));
