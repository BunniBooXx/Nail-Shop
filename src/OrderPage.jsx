import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './orderpage.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const OrderPage = () => {
  const { orderId } = useParams();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const streetAddressRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);
  const postalCodeRef = useRef(null);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${backendUrl}/order/details/${orderId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });

      if (response.ok) {
        const orderData = await response.json();
        setOrder(orderData);
      } else {
        throw new Error('Order not found');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const handleShippingInfo = async () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const streetAddress = streetAddressRef.current.value;
    const city = cityRef.current.value;
    const state = stateRef.current.value;
    const country = countryRef.current.value;
    const postalCode = postalCodeRef.current.value;

    if (!orderId) {
      console.error('Order ID is undefined');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const updateOrderResponse = await fetch(`${backendUrl}/order/update_order_with_user_info/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          street_address: streetAddress,
          city: city,
          state: state,
          country: country,
          postal_code: postalCode
        })
      });

      if (!updateOrderResponse.ok) {
        throw new Error('Failed to update order with user information');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='background'>
      <div className="order-container">
        <div className="order-header">Mailing Address</div>
        {order ? (
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
              <label htmlFor="streetAddress">Street Address:</label>
              <input id="streetAddress" ref={streetAddressRef} type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input id="city" ref={cityRef} type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input id="state" ref={stateRef} type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input id="country" ref={countryRef} type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code:</label>
              <input id="postalCode" ref={postalCodeRef} type="text" />
            </div>
          </div>
        ) : (
          <p>Loading order details...</p>
        )}
        <div className="button-container">
          <Link to={`/checkout/${orderId}`}>
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




