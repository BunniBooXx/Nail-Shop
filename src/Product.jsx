import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Quantity state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/read/${productId}`);
        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          console.error('Failed to fetch product data:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/cart/add_to_cart', {
        product_id: productId,
        quantity: quantity
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.message) {
        console.log('Product added to cart successfully');
        // Optionally, you can redirect the user to the cart page
      } else {
        console.error('Failed to add product to cart:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, description, price, image_url } = product;

  return (
    <div className="product-container">
      <h1>{name}</h1>
      <div className="image-carousel">
        <img src={image_url} alt={name} className="carousel-image" />
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
      <div className="price">
        <p>${price}</p>
      </div>
      <div className="quantity">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;





