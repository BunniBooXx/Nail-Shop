import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [nailSizeOption, setNailSizeOption] = useState('');
  const [leftHandCustomSize, setLeftHandCustomSize] = useState('');
  const [rightHandCustomSize, setRightHandCustomSize] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [productId]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert('Please log in or sign up to add items to your cart.');
      return;
    }

    if (!nailSizeOption) {
      alert('Please select a nail size option');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const cartItem = {
        product_id: productId,
        quantity,
        nail_size_option_id: nailSizeOption,
        left_hand_custom_size: leftHandCustomSize,
        right_hand_custom_size: rightHandCustomSize,
      };

      const response = await axios.post('http://localhost:5000/cart/add_to_cart', cartItem, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message) {
        console.log('Product added to cart successfully');
        // Optionally, you can redirect the user to the cart page
      } else {
        console.error('Failed to add product to cart:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleLeftHandCustomSizeChange = (e) => {
    setLeftHandCustomSize(e.target.value);
  };

  const handleRightHandCustomSizeChange = (e) => {
    setRightHandCustomSize(e.target.value);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, description, price, image_url } = product;

  return (
    <div className="product-container">
      <h1>{name}</h1>
      <div className="image-carousel">
        <img src={`http://localhost:5000/nails/${image_url}`} alt={name} />
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
      <div className="price">
        <p>${price}</p>
      </div>
      <div className="quantity">
        <label htmlFor="quantity" className="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>
      <label className="nailsizes">
        Nail Size Option:
        <select value={nailSizeOption} onChange={(e) => setNailSizeOption(e.target.value)}>
          <option value="">Select an option</option>
          <option value="1">XS</option>
          <option value="2">M</option>
          <option value="3">L</option>
          <option value="4">Custom</option>
        </select>
      </label>

      {nailSizeOption === '4' && (
        <div>
          <label>
            Left Hand Custom Size:
            <input
              type="text"
              value={leftHandCustomSize}
              onChange={handleLeftHandCustomSizeChange}
            />
          </label>
          <label>
            Right Hand Custom Size:
            <input
              type="text"
              value={rightHandCustomSize}
              onChange={handleRightHandCustomSizeChange}
            />
          </label>
        </div>
      )}

      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
      
      <div>
        <p>Don't see your size? Check out our <a href="/sizing-guide" className="size-link">Size Guide</a>.</p>
      </div>
    </div>
  );
};

export default Product;
