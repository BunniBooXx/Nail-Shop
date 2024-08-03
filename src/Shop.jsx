import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Shop.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Product({ product }) {
  const isSoldOut = product.quantity_available <= 0;

  return (
    <Link to={`/product/read/${product.id}`} className={`product ${isSoldOut ? 'sold-out' : ''}`}>
      {isSoldOut && <div className="sold-out-overlay">Sold Out</div>}
      <img src={product.image_url} alt={product.name} />
      <h2>{product.name}</h2>
      <p className="price">${product.price}.00</p>
    </Link>
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
      <div className="products">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <div className="scroll-down">
        <span>&darr;</span> {/* Arrow down indicator */}
      </div>
    </div>
  );
}

export default Shop;


