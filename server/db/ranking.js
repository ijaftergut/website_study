const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchTopTen = async()=> {
    const SQL = `
      SELECT *
      FROM topTen
    `;
    const response = await client.query(SQL);
    return response.rows;
  };
  const createTopTen = async(product)=> {
    const SQL = `
      INSERT INTO topTen (id, product_id, user_id, rank) VALUES($1, $2, $3, $4) RETURNING *
    `;
    const response = await client.query(SQL, [ uuidv4(), product.product_id, product.user_id,  product.rank]);
    return response.rows[0];
  };
  module.exports = {
    fetchTopTen,
    createTopTen
  }