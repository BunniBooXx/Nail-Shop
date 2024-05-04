import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/cart/read', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            });
            if (response.data.cart_id) {
                setCartItems(response.data.items);
                setTotalPrice(response.data.total_price);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const handleClearCart = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete('http://localhost:5000/cart/delete_all_items', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            });
            setCartItems([]);
            setTotalPrice(0);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/cart/delete_item/${itemId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            });
            const updatedCartItems = cartItems.filter(item => item.product_id !== itemId);
            setCartItems(updatedCartItems);
            const updatedTotalPrice = updatedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            setTotalPrice(updatedTotalPrice);
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    };

    const handleQuantityChange = async (itemId, quantity) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/cart/update`, { itemId, quantity }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            });
            const updatedCartItems = cartItems.map(item => {
                if (item.product_id === itemId) {
                    return { ...item, quantity };
                }
                return item;
            });
            setCartItems(updatedCartItems);
            const updatedTotalPrice = updatedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            setTotalPrice(updatedTotalPrice);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleDeleteSingleItem = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('User not authenticated');
            }
            await axios.delete(`http://localhost:5000/cart/delete_item/${itemId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            });
            // Remove the item from the cartItems array only if it exists
            const updatedCartItems = cartItems.filter(item => item.product_id !== itemId);
            if (updatedCartItems.length === cartItems.length) {
                throw new Error('Cart item not found');
            }
            setCartItems(updatedCartItems);
            const updatedTotalPrice = updatedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            setTotalPrice(updatedTotalPrice);
        } catch (error) {
            console.error('Error deleting single item from cart:', error);
        }
    };
    
    

 

    return (
        <div className="cart-page-container">
            <h2 className="cart-title">Your Shopping Cart</h2>
            <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
            {cartItems.map(item => (
                <div key={item.product_id} className="cart-item">
                    <div className="item-details">
                        <p className="item-name">{item.name}</p>
                        <p className="item-price">${item.price}</p>
                    </div>
                    <div className="item-actions">
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.product_id, parseInt(e.target.value))}
                            className="quantity-input"
                        />
                        <button className="delete-button" onClick={() => handleDeleteSingleItem(item.product_id)}>🗑️</button>
                    </div>
                </div>
            ))}
            <div className="cart-actions">
                <p className="total-price">Total: ${totalPrice}</p>
            </div>
            <br/>
            <br/>
            <Link to="/order"><button className="clear-cart-button">Order</button></Link>
            <br/>
            <br/>
            {/* Message about creation and shipping */}
            <p className="shipping-info">Please note that creation and shipping may take 2+ weeks. You will be emailed the shipping link once your order is processed.</p>
        </div>
    );
}

export default CartPage;



