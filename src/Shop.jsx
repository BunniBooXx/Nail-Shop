import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'daisyui/dist/full.css'; // Ensure DaisyUI styles are included
import './Shop.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Product({ product }) {
  const isSoldOut = product.quantity_available <= 0;

  return (
    <Link to={`/product/read/${product.id}`} className={`card bg-base-100 shadow-xl rounded-lg overflow-hidden ${isSoldOut ? 'opacity-50' : ''}`}>
      {isSoldOut && <div className="absolute top-0 left-0 w-full h-full bg-gray-800 text-white flex items-center justify-center text-xl font-bold">Sold Out</div>}
      <figure>
        <img src={product.image_url} alt={product.name} className="object-cover w-full h-48" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-bold">{product.name}</h2>
        <div className="card-actions justify-end">
          <span className="text-lg font-bold text-primary">${product.price}.00</span>
        </div>
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <div className="fixed bottom-4 right-4 bg-primary text-white rounded-full p-2 cursor-pointer">
        <span>&darr;</span> {/* Arrow down indicator */}
      </div>
    </div>
  );
}

export default Shop;



