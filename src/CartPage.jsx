import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/cart/read'); // Fetch cart items for the logged-in user
            if (response.data.items) {
                setCartItems(response.data.items);
                setTotalPrice(response.data.total_price);
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handleClearCart = async () => {
        try {
            await axios.delete('http://localhost:5000/cart/delete_all_items'); // Clear cart items for the logged-in user
            setCartItems([]);
            setTotalPrice(0);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5000/cart/delete_item/${itemId}`); // Delete a cart item for the logged-in user
            const updatedCartItems = cartItems.filter(item => item.cart_item_id !== itemId);
            setCartItems(updatedCartItems);
            const updatedTotalPrice = updatedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            setTotalPrice(updatedTotalPrice);
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        }
    };

    const handleQuantityChange = async (itemId, quantity) => {
        try {
            await axios.put(`http://localhost:5000/cart/update/${itemId}`, { quantity }); // Update quantity of a cart item for the logged-in user
            const updatedCartItems = cartItems.map(item => {
                if (item.cart_item_id === itemId) {
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

    return (
        <div className="cart-page-container">
            <h2 className="cart-title">Your Shopping Cart</h2>
            {cartItems.map(item => (
                <div key={item.cart_item_id} className="cart-item">
                    <div className="item-details">
                        <p className="item-name">{item.name}</p>
                        <p className="item-price">${item.price}</p>
                    </div>
                    <div className="item-actions">
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.cart_item_id, parseInt(e.target.value))}
                            className="quantity-input"
                        />
                        <button className="delete-button" onClick={() => handleDeleteItem(item.cart_item_id)}>Delete</button>
                    </div>
                </div>
            ))}
            <div className="cart-actions">
                <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button>
                <p className="total-price">Total: ${totalPrice}</p>
            </div>
            <Link to="/order"><button className="clear-cart-button">Order</button></Link>
            
            {/* Message about creation and shipping */}
            <p className="shipping-info">Please note that creation and shipping may take 2+ weeks. You will be emailed the shipping link once your order is processed.</p>
        </div>
    );
}

export default CartPage;
