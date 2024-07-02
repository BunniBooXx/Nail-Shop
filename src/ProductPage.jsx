import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductPage.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function ProductPage() {
    const [product, setProduct] = useState({});
    const [selectedSize, setSelectedSize] = useState('');
    const [customMeasurements, setCustomMeasurements] = useState({
        leftHand: '',
        rightHand: ''
    });
    const [quantity, setQuantity] = useState(1); // Dynamic quantity
    const [notification, setNotification] = useState('');
    const [notificationType, setNotificationType] = useState(''); // For success or error
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${backendUrl}/product/read/${productId}`)
            .then(response => {
                console.log('Product:', response.data.data);
                setProduct(response.data.data || {});
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });

        // Check if user is logged in by verifying token
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${backendUrl}/user`, { headers: { 'Authorization': `Bearer ${token}` } })
                .then(response => {
                    if (response.status === 200) {
                        setIsLoggedIn(true);
                    }
                })
                .catch(error => {
                    console.error('Error checking login status:', error);
                    setIsLoggedIn(false);
                });
        }
    }, [productId]);

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleCustomMeasurementsChange = (e, field) => {
        setCustomMeasurements((prevState) => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleAddToCart = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setNotification('You need to be logged in to add items to the cart.');
            setNotificationType('error');
            return;
        }

        const requestData = {
            product_id: productId,
            quantity: parseInt(quantity), // Use the dynamic quantity
            nail_size_option_id: selectedSize,
            left_hand_custom_size: customMeasurements.leftHand,
            right_hand_custom_size: customMeasurements.rightHand
        };

        console.log('Request Data:', requestData);

        axios.post(`${backendUrl}/cart/add_to_cart`, requestData, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            console.log('Add to cart response:', response.data);
            setNotification('Product added to cart successfully.');
            setNotificationType('success');
        })
        .catch(error => {
            console.error('Error adding to cart:', error);
            if (error.response && error.response.data) {
                setNotification(error.response.data.error || 'Failed to add product to cart.');
            } else {
                setNotification('Failed to add product to cart.');
            }
            setNotificationType('error');
        });
    };

    return (
        <div className="product-page-container">
            <div className="product-images-carousel">
                <img src={`${product.image_url}`} alt={product.name} />
            </div>
            <div className="product-details">
                <h2 className="product-title">{product.name}</h2>
                <p className="product-price">${product.price}</p>
                <p className="product-description">
                    {product.description}
                </p>
                <div className="size-options">
                    <h3 className="size-title">Sizes:</h3>
                    <div className="size-buttons">
                        <button className={`size-button ${selectedSize === 'xs' ? 'selected' : ''}`} onClick={() => handleSizeChange('xs')}>XS</button>
                        <button className={`size-button ${selectedSize === 'small' ? 'selected' : ''}`} onClick={() => handleSizeChange('small')}>Small</button>
                        <button className={`size-button ${selectedSize === 'medium' ? 'selected' : ''}`} onClick={() => handleSizeChange('medium')}>Medium</button>
                    </div>
                    <p className="size-guide-link">See sizing guide</p>
                </div>
                <div className="custom-measurements">
                    <h3 className="custom-measurements-title">Custom Nail Measurements:</h3>
                    <p>Example: Thumb: 11mm, Index: 9mm, Middle Finger: 10mm, Ring Finger: 12mm, Pinky: 8mm</p>
                    <input 
                        type="text" 
                        placeholder="Left Hand Measurements (e.g., Thumb: 11mm, Index: 12mm, Middle Finger: 14mm)" 
                        value={customMeasurements.leftHand} 
                        onChange={(e) => handleCustomMeasurementsChange(e, 'leftHand')} 
                    />
                    <input 
                        type="text" 
                        placeholder="Right Hand Measurements (e.g., Thumb: 11mm, Index: 12mm, Middle Finger: 14mm)" 
                        value={customMeasurements.rightHand} 
                        onChange={(e) => handleCustomMeasurementsChange(e, 'rightHand')} 
                    />
                </div>
                <div className="quantity-selection">
                    <h3 className="quantity-title">Quantity:</h3>
                    <input 
                        type="number" 
                        min="1" 
                        value={quantity} 
                        onChange={handleQuantityChange} 
                        className="quantity-input"
                    />
                </div>
                <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
                {notification && <div className={`notification ${notificationType}`}>{notification}</div>}
            </div>
        </div>
    );
}
