import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

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

  const handleAddToCart = () => {
    // Implement logic to add product to cart
    console.log('Product added to cart:', product);
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
      <div className="options">
        <h2>Size Options:</h2>
        <label>
          <input type="radio" name="size" value="XS" />
          XS
        </label>
        <label>
          <input type="radio" name="size" value="Small" />
          Small
        </label>
        <label>
          <input type="radio" name="size" value="Medium" />
          Medium
        </label>
        <label>
          <input type="checkbox" name="custom" />
          Custom Size
        </label>
      </div>
      <div className="custom-sizes">
        <h3>Custom Nail Sizes:</h3>
        <input type="text" placeholder="Thumb: (mm)" />
        <input type="text" placeholder="Index: (mm)" />
        <input type="text" placeholder="Middle: (mm)" />
        <input type="text" placeholder="Ring: (mm)" />
        <input type="text" placeholder="Pinky: (mm)" />
      </div>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;



