import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'daisyui/dist/full.css'; // Ensure DaisyUI styles are included
import './Shop.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Product({ product }) {
  const isSoldOut = product.quantity_available <= 0;

  return (
    <Link to={`/product/read/${product.id}`} className={`card ${isSoldOut ? 'sold-out' : ''}`}>
      <img src={product.image_url} alt={product.name} />
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
      </div>
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
      <div className="flex-container">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Shop;




