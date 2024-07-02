import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductPage.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function ProductPage() {
    const [product, setProduct] = useState({});
    const [selectedSize, setSelectedSize] = useState('');
    const [customMeasurements, setCustomMeasurements] = useState({
        leftHand: '',
        rightHand: ''
    });

    const { productId } = useParams();

    useEffect(() => {
        axios.get(`${backendUrl}/product/read/${productId}`)
            .then(response => {
                console.log('Product:', response.data.data);
                setProduct(response.data.data || {});
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
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

    const handleAddToCart = () => {
        // Handle adding product to cart
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
                <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}
