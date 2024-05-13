import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import './orderpage.css';

const OrderPage = () => {
  const { orderId } = useParams(); // Get orderId from URL using useParams
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const addressRef = useRef(null);
  const myAPIKey = "d09060e63fea4428be40d8194e56abbf"; // Replace 'YOUR_API_KEY' with your actual API key

  const [selectedAddress, setSelectedAddress] = useState('');

  const handleShippingInfo = () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const address = addressRef.current.value;

    if (!orderId) {
      console.error('Order ID is undefined');
      return;
    }

    const token = localStorage.getItem('token');
    
    fetch(`http://localhost:5000/order/update_order_with_user_info/${orderId}`, {
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
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log(data);
      // Redirect to the create checkout session page
      window.location = `/create-checkout-session/${orderId}`;
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error
    });
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
          <button className="submit-btn" onClick={handleShippingInfo}>Continue to Checkout<a href={`/create-checkout-session/${orderId}`} className="submit-btn">Create Checkout Session</a></button>
          <a href={`/create-checkout-session/${orderId}`} className="submit-btn">Create Checkout Session</a>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;





