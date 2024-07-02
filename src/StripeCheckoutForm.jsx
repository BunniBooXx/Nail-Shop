import React, { useState, useEffect, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import axios from 'axios';
import CheckoutFormComponent from './CheckoutFormComponent';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripeCheckoutForm = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const fetchOrder = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      console.log('Fetching order with ID:', orderId);
      const response = await axios.get(`${backendUrl}/order/read/${orderId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      console.log('Order fetched:', response.data);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  }, [orderId, backendUrl]);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId, fetchOrder]);

  const handlePaymentSuccess = useCallback(async (paymentIntent) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${backendUrl}/send-emails`,
        { order_id: orderId },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to send emails');
      }

      console.log('Emails sent successfully');
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  }, [orderId, backendUrl]);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormComponent
        orderId={orderId}
        order={order}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Elements>
  );
};

StripeCheckoutForm.propTypes = {
  orderId: PropTypes.string.isRequired,
};

export default StripeCheckoutForm;




