const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchProducts = async()=> {
  const SQL = `
    SELECT *
    FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchTopTen = async()=> {
  const SQL = `
    SELECT *
    FROM topTen
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createProduct = async(product)=> {
  const SQL = `
    INSERT INTO products (id, name) VALUES($1, $2) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), product.name]);
  return response.rows[0];
};
const createTopTen = async(product)=> {
  const SQL = `
    INSERT INTO topTen (id, product_id, rank) VALUES($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), product.product_id, product.rank]);
  return response.rows[0];
};

module.exports = {
  fetchProducts,
  createProduct,
  fetchTopTen,
  createTopTen
};
