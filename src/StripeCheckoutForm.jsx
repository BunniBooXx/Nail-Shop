import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import CheckoutFormComponent from './CheckoutFormComponent';
import axios from 'axios';

const stripePromise = loadStripe('STRIPE_PUBLISHABLE_KEY');

const StripeCheckoutForm = ({ orderId, order }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (order) {
      setOrderItems(order.order_items || []);
      setTotalPrice(order.total_amount || 0);
    }
  }, [order]);

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      const response = await axios.post('/api/orders/finalize-order', { orderId });

      if (response.data.success) {
        console.log('Order finalized successfully');
        // Optionally, you can redirect the user to a success page or display a success message
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
        cartItems={orderItems}
        totalPrice={totalPrice}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Elements>
  );
};

export default StripeCheckoutForm;
