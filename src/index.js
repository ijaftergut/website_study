import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import Products from './Products';
// import Orders from './Orders';
import Ranking from './Ranking';
import Cart from './Cart';
import Login from './Login';
import api from './api';

const App = ()=> {
  const {pathname} = useLocation()
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [topTen, setTopTen] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});

  const attemptLoginWithToken = async()=> {
    await api.attemptLoginWithToken(setAuth);
  }

  useEffect(()=> {
    attemptLoginWithToken();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      await api.fetchTopTen(setTopTen);
    };
    fetchData();
  }, []);

  // useEffect(()=> {
  //   if(auth.id){
  //     const fetchData = async()=> {
  //       await api.fetchOrders(setOrders);
  //     };
  //     fetchData();
  //   }
  // }, [auth]);

  // useEffect(()=> {
  //   if(auth.id){
  //     const fetchData = async()=> {
  //       await api.fetchLineItems(setLineItems);
  //     };
  //     fetchData();
  //   }
  // }, [auth]);


  // const createLineItem = async(product)=> {
  //   await api.createLineItem({ product, cart, lineItems, setLineItems});
  // };

  // const updateLineItem = async(lineItem)=> {
  //   await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  // };

  // const updateOrder = async(order)=> {
  //   await api.updateOrder({ order, setOrders });
  // };

  // const removeFromCart = async(lineItem)=> {
  //   await api.removeFromCart({ lineItem, lineItems, setLineItems });
  // };

  // const cart = orders.find(order => order.is_cart) || {};

  // const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  // const cartCount = cartItems.reduce((acc, item)=> {
  //   return acc += item.quantity;
  // }, 0);

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
  }

  const logout = ()=> {
    api.logout(setAuth);
  }

  return (
    <div>
      {
        auth.id ? (
          <>
            <nav>
            <Link to='/products' className={pathname === '/products' ? 'selected' : 'link-style'}>Products ({ products.length })</Link>
            <Link to='/ranking' className={pathname === '/ranking' ? 'selected' : 'link-style'}>Top Ten </Link>
                {/* <Link to='/orders' className={pathname === '/orders' ? 'selected' : 'link-style'}>Orders ({ orders.filter(order => !order.is_cart).length })</Link> */}
                {/* <Link to='/cart' className={pathname === '/cart' ? 'selected' : 'link-style'}>Cart ({ cartCount })</Link> */}
              </nav>
            <span>
                Welcome { auth.username }!
                <button onClick={ logout }>Logout</button>
              </span>
            <main>
            <Routes>
              <Route path='/products' element={
              <Products
                auth = { auth }
                products={ products }
                // cartItems = { cartItems }
                // createLineItem = { createLineItem }
                // updateLineItem = { updateLineItem }
              />}/>
              <Route path='/ranking' element={
              <Ranking
                auth = { auth }
                products={ products }
                topTen={topTen}
                // cartItems = { cartItems }
                // createLineItem = { createLineItem }
                // updateLineItem = { updateLineItem }
              />}/>
              {/* <Route path='/cart' element={
              <Cart
                cart = { cart }
                lineItems = { lineItems }
                products = { products }
                updateOrder = { updateOrder }
                removeFromCart = { removeFromCart }
                />}/> */}
              {/* <Route path='/orders' element={
              <Orders
                orders = { orders }
                products = { products }
                lineItems = { lineItems }
                />}/> */}
            </Routes>
            </main>
            </>
        ):(
          <div>
            <Login login={ login }/>
            <Routes>
            <Route path='/products' element={
              <Products
                auth = { auth }
                products={ products }
                // cartItems = { cartItems }
                // createLineItem = { createLineItem }
                // updateLineItem = { updateLineItem }
              />}/>
              </Routes>
          </div>
        )
      }
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
