import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './orderpage.css';

const OrderPage = () => {
  const { orderId } = useParams();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const addressRef = useRef(null);

  
  const handleShippingInfo = async () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const address = addressRef.current.value;

    if (!orderId) {
      console.error('Order ID is undefined');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      // Update order with user information
      const updateOrderResponse = await fetch(`http://localhost:5000/order/update_order_with_user_info/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          address: address
        })
      });

      if (!updateOrderResponse.ok) {
        throw new Error('Failed to update order with user information');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className='background'>
      <div className="order-container">
        <div className="order-header">Mailing Address</div>
        <div className="order-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input id="firstName" ref={firstNameRef} type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input id="lastName" ref={lastNameRef} type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input id="address" ref={addressRef} type="text" placeholder="Street address, Apartment number, City, Postal code, Country" />
          </div>
        </div>
        <div className="button-container">
          <Link to={`/create-checkout-session/${orderId}`}>
            <button className="submit-btn" onClick={handleShippingInfo}>
              Continue to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;




