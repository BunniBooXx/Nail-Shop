import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';
import { useParams } from 'react-router-dom';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [nailSizeOption, setNailSizeOption] = useState('');
  const [leftHandCustomSize, setLeftHandCustomSize] = useState('');
  const [rightHandCustomSize, setRightHandCustomSize] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/product/read/${productId}`);
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
      setNotification({ type: 'error', message: 'Please log in or sign up to add items to your cart.' });
      return;
    }

    if (!nailSizeOption) {
      setNotification({ type: 'error', message: 'Please select a nail size option' });
      return;
    }

    if (product.quantity < quantity) {
      setNotification({ type: 'error', message: 'Product is sold out' });
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

      const response = await axios.post(`${backendUrl}/cart/add_to_cart`, cartItem, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.message) {
        setNotification({ type: 'success', message: 'Product added to cart successfully' });
        console.log('Product added to cart successfully');
        // Optionally, you can redirect the user to the cart page
      } else {
        setNotification({ type: 'error', message: 'Failed to add product to cart' });
        console.error('Failed to add product to cart:', response.data.error);
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Error adding to cart' });
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
        <img src={`${product.image_url}`} alt={name} />
      </div>
      <div className="description">
        <p>{description}</p>
        <p>Check out a video of the product here: <a href="https://www.tiktok.com/@bunnybubblenails" className="video-link">TikTok</a></p>
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
              placeholder="Thumb: 11mm, Index: 9mm, Middle: 10mm, Ring Finger: 10mm, Pinky: 8mm"
            />
          </label>
          <label>
            Right Hand Custom Size:
            <input
              type="text"
              value={rightHandCustomSize}
              onChange={handleRightHandCustomSizeChange}
              placeholder="Thumb: 11mm, Index: 9mm, Middle: 10mm, Ring Finger: 10mm, Pinky: 8mm"
            />
          </label>
        </div>
      )}

      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>

      {notification && (
        <div className={`notification ${notification.type}`}>{notification.message}</div>
      )}

      <div>
        <p>Don't see your size? Check out our <a href="/sizing-guide" className="size-link">Size Guide</a>.</p>
      </div>
    </div>
  );
};

export default Product;
