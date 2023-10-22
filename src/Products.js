import React from 'react';
import { Link } from 'react-router-dom';

const Products = ({ products, auth})=> {
  return (
    <div>
      <h2>Products</h2>
      <ul className='products'>
        {
          products.map( product => {
            // const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            return (
              <li key={ product.id } >
                { product.name }
                {
                  auth.id ? (
                    null
                    // cartItem ? <button className='productButton' onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button className='productButton' onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${product.id}/edit`}>Edit</Link>
                  ): null
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Products;
