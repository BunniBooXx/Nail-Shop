import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Shop.css';

function Product({ product, addToCart }) {
  const handleAddToCart = () => {
    addToCart(product.id, product.name);
  };

  return (
    <div className="product" key={product.id}>
      <img src={product.image_url} alt={product.name} />
      <br />
      <h2>{product.name}</h2>
      <p>ID: {product.id}</p>
      <br />
      <p className="price">{product.price}</p>
      <br />
      <button onClick={handleAddToCart} className="btn btn-primary btn-block">Add to Cart</button>
      <Link to={`/product/read/${product.id}`} className="btn btn-secondary">View Item</Link>
    </div>
  );
}

function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/product/read_all')
      .then(response => {
        console.log('Products:', response.data.data);
        setProducts(response.data.data || []);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const addToCart = (productId, productName) => {
    // Implementation for adding to cart
  };

  return (
    <div className="container">
      <h1>Welcome to Our Cute Shop!</h1>
      <Link to="/cart" className="btn btn-primary">Go to Cart</Link>
      <div className="products">
        {products.map(product => (
          <Product
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;

