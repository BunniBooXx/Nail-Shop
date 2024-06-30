import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutFormComponent from './CheckoutFormComponent';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripeCheckoutForm = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${backendUrl}/order/read/${orderId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId, backendUrl]);

  const handlePaymentSuccess = async (paymentIntent) => {
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
  };

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

export default StripeCheckoutForm;


