import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Shop.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Product({ product }) {
  const isSoldOut = product.quantity_available <= 0;

  return (
    <div className={`product ${isSoldOut ? 'sold-out' : ''}`} key={product.id}>
      {isSoldOut && <div className="sold-out-overlay">Sold Out</div>}
      <img src={`${product.image_url}`} alt={product.name} />
      <br />
      <h2>{product.name}</h2>
      <p>ID: {product.id}</p>
      <br />
      <p className="price">${product.price}.00</p>
      <br />
      <Link to={`/product/read/${product.id}`} className="btn btn-secondary">View Item</Link>
    </div>
  );
}

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${backendUrl}/product/read_all`)
      .then(response => {
        console.log('Products:', response.data.data);
        setProducts(response.data.data || []);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="container">
      <div className="title">
        <h1>Welcome to Our Cute Shop!</h1>
      </div>
      <div className="products">
        {products.map(product => (
          <Product
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
