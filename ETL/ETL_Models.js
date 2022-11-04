/* eslint-disable no-console */
/* eslint-disable no-multi-str */
const { insertData, createTable } = require('./ETL_Controllers');

// ==============Queries ================
// product

const productQuery = 'INSERT INTO product (id, name, slogan, description, category, default_price) VALUES ($1, $2, $3, $4, $5, $6)';
const productFileName = 'product.csv';

// features
const createFeaturesTableQuery = '\
  CREATE TABLE features(\
  ID INT PRIMARY KEY NOT NULL,\
  product_id INT,\
  feature TEXT,\
  value TEXT,\
  CONSTRAINT fk_product\
    FOREIGN KEY(product_id)\
      REFERENCES product(id)\
  );';
const featuresInsertionQuery = 'INSERT INTO features (id, product_id, feature, value) VALUES ($1, $2, $3, $4);';
const featuresFileName = 'features.csv';

// styles
const createStylesTableQuery = '\
CREATE TABLE styles(\
  id INT PRIMARY KEY NOT NULL,\
  product_id INT,\
  name TEXT,\
  original_price REAL,\
  sale_price REAL,\
  default INT,\
  CONSTRAINT fk_product\
    FOREIGN KEY(product_id)\
      REFERENCES product(id)\
  );';
const stylesInsertionQuery = 'INSERT INTO styles (id, product_id, name, sale_price, original_price, default_style)\
  VALUES ($1, $2, $3, $4, $5, $6);';
const stylesFileName = 'styles.csv';
// photos
const createPhotosTableQuery = '\
    CREATE TABLE photos(\
    ID INT PRIMARY KEY NOT NULL,\
    thumbnail_url CHAR(50),\
    url CHAR(50),\
    product_id INT,\
    style_id INT,\
    CONSTRAINT fk_product\
      FOREIGN KEY(product_id)\
        REFERENCES product(id),\
    CONSTRAINT fk_styles\
      FOREIGN KEY(style_id)\
        REFERENCES styles(id)\
    );';
const photosInsertionQuery = 'INSERT INTO photos (id, style_id, url, thumbnail_url, product_id) VALUES (\
  $1, $2, $3, $4, (SELECT product_id FROM styles WHERE id = $1));';
const photosFileName = 'photos.csv';

// skus

const createSkusTableQuery = '\
  CREATE TABLE skus(\
  id INT PRIMARY KEY NOT NULL,\
  style_id INT,\
  product_id INT,\
  size CHAR(3),\
  quantity INT,\
  CONSTRAINT fk_product\
      FOREIGN KEY(product_id)\
        REFERENCES product(id),\
    CONSTRAINT fk_styles\
      FOREIGN KEY(style_id)\
        REFERENCES styles(id)\
  )';
const skusInsertionQuery = 'INSERT INTO skus (id, style_id, size, quantity, product_id) VALUES\
  ($1, $2, $3, $4, (SELECT product_id FROM styles WHERE id = $2));';
const skusFileName = 'skus.csv';

// related

const createRelatedTableQuery = '\
  CREATE TABLE related(\
  id INT PRIMARY KEY NOT NULL,\
  product_id INT,\
  related_product_id INT,\
  CONSTRAINT fk_product\
      FOREIGN KEY(product_id)\
        REFERENCES product(id)\
  )';
const relatedInsertionQuery = 'INSERT INTO related (id, product_id, related_product_id) VALUES (\
  $1, $2, $3);';
const relatedFileName = 'related.csv';

// Run Queries
const importDataToDB = async () => {
  // insertData(productQuery, productFileName);
  // createTable(createFeaturesTableQuery);
  // insertData(featuresInsertionQuery, featuresFileName);
  // createTable(createStylesTableQuery);
  //insertData(stylesInsertionQuery, stylesFileName);
  //createTable(createPhotosTableQuery);
  // insertData(photosInsertionQuery, photosFileName);
  // createTable(createSkusTableQuery);
  insertData(skusInsertionQuery, skusFileName);
  // createTable(createRelatedTableQuery);
  // insertData(relatedInsertionQuery, relatedFileName);
};

importDataToDB();
