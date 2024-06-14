import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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
        const response = await axios.get(`${backendUrl}/order/details/${orderId}`, {
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

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      const response = await axios.post(`${backendUrl}/finalize-order`, { orderId });

      if (response.data.success) {
        console.log('Order finalized successfully');
        // Redirect to success page or show success message
      } else {
        console.error('Error finalizing order');
      }
    } catch (error) {
      console.error('Error finalizing order:', error);
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
