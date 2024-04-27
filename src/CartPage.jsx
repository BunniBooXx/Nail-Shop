import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';

export default function CartPage() {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product 1', price: 25, quantity: 1 },
        { id: 2, name: 'Product 2', price: 30, quantity: 2 },
        { id: 3, name: 'Product 3', price: 20, quantity: 1 }
    ]);

    const handleClearCart = () => {
        setCartItems([]);
    };

    const handleDeleteItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
    };

    const handleQuantityChange = (id, quantity) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity };
            }
            return item;
        });
        setCartItems(updatedCart);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className="cart-page-container">
            <h2 className="cart-title">Your Shopping Cart</h2>
            {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                    <div className="item-details">
                        <p className="item-name">{item.name}</p>
                        <p className="item-price">${item.price}</p>
                    </div>
                    <div className="item-actions">
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            className="quantity-input"
                        />
                        <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>Delete</button>
                    </div>
                </div>
            ))}
            <div className="cart-actions">
                <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
                <p className="total-price">Total: ${getTotalPrice()}</p>
            </div>
            <Link to="/order"><button className="clear-cart-button">Order</button></Link>
            
            {/* Message about creation and shipping */}
            <p className="shipping-info">Please note that creation and shipping may take 2+ weeks. You will be emailed the shipping link once your order is processed.</p>
        </div>
    );
}
