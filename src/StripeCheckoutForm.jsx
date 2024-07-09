import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutFormComponent from './CheckoutFormComponent';
import axios from 'axios';

const stripePromises = loadStripe('pk_test_51OwSCeEBwfjW7s9fwT5GlYGVHY7f3YPeRxHEqbV8YJQN139JgZpuJjTgZIzoEmeds2FUi91q8TbSJVq1gxQbczmf00ht6oOGGU');




console.log(stripePromises);

console.log('Stripe Publishable Key:', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);

const StripeCheckoutForm = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${backendUrl}/order/details/${orderId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
      const response = await fetch(`${backendUrl}/send-emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the user's authentication token
        },
        body: JSON.stringify({ orderId: paymentIntent.metadata.orderId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send emails');
      }
  
      console.log('Emails sent successfully');
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };
  

  return (
    <Elements stripe={stripePromises}>
      <CheckoutFormComponent
        orderId={orderId}
        order={order}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Elements>
  );
};

export default StripeCheckoutForm;





