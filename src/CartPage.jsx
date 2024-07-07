import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CartPage.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${backendUrl}/cart/read`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
            await axios.delete(`${backendUrl}/cart/delete_all_items`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  `Bearer ${token}`
                }
            });
            setCartItems([]);
            setTotalPrice(0);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const handleQuantityChange = async (itemId, quantity) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${backendUrl}/cart/update`, { itemId, quantity }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
            await axios.delete(`${backendUrl}/cart/delete_item/${itemId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
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

    const handleCreatePreliminaryOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${backendUrl}/order/create_preliminary_order`, {
                total_amount: totalPrice
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.success) {
                // Redirect to the order page with the created order ID
                navigate(`/order/${response.data.order_id}`);
            } else {
                console.error('Error creating preliminary order:', response.data.message);
            }
        } catch (error) {
            console.error('Error creating preliminary order:', error);
        }
    };

    return (
        <div>
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
                <button className="order-button" onClick={handleCreatePreliminaryOrder}>Order</button>
                <br/>
                <br/>
                {/* Message about creation and shipping */}
                <p className="shipping-info">Please note that creation and shipping may take 2+ weeks. You will be emailed the shipping link once your order is processed.</p>
            </div>

            <div className="space">
                <br/>
                <br/>
            </div>
        </div>
    );
}

export default CartPage;




