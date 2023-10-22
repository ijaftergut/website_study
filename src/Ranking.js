import React from 'react';
import { Link } from 'react-router-dom';
const Ranking = ({ auth, products }) => {
  return (
    <div>
      <h2>Ranking</h2>
      <ul className='products'>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}
            {auth.id ? null : null}
            {auth.is_admin ? <Link to={`/products/${product.id}/edit`}>Edit</Link> : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
