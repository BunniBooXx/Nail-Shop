import React, { useState } from 'react';
import './ProductPage.css';

export default function ProductPage() {
    const [selectedSize, setSelectedSize] = useState('');
    const [customMeasurements, setCustomMeasurements] = useState({
        leftHand: '',
        rightHand: ''
    });

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleCustomMeasurementsChange = (event, hand) => {
        const { value } = event.target;
        setCustomMeasurements(prevState => ({
            ...prevState,
            [hand]: value
        }));
    };

    const handleAddToCart = () => {
        // Handle adding product to cart
    };

    return (
        <div className="product-page-container">
            <div className="product-images-carousel">
                {/* Implement your image carousel here */}
                {/* Example: <Carousel images={product.images} /> */}
            </div>
            <div className="product-details">
                <h2 className="product-title">Product Name</h2>
                <p className="product-price">$50</p>
                <p className="product-description">
                    This product is 100% handmade. It takes 2-3 weeks processing time to make each order. 
                    You will receive an email once it has been shipped with a tracking number.
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
                    <input type="text" placeholder="Left Hand Measurements" value={customMeasurements.leftHand} onChange={(e) => handleCustomMeasurementsChange(e, 'leftHand')} />
                    <input type="text" placeholder="Right Hand Measurements" value={customMeasurements.rightHand} onChange={(e) => handleCustomMeasurementsChange(e, 'rightHand')} />
                </div>
                <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}
