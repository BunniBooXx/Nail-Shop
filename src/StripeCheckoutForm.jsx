import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import CheckoutFormComponent from './CheckoutFormComponent';

const stripePromise = loadStripe(
  'STRIPE_PUBLISHABLE_KEY'
);

const StripeCheckoutForm = ({ orderId, order }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (order) {
      setOrderItems(order.order_items || []);
      setTotalPrice(order.total_amount || 0);
    }
  }, [order]);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormComponent
        orderId={orderId}
        cartItems={orderItems}
        totalPrice={totalPrice}
      />
    </Elements>
  );
};

export default StripeCheckoutForm;
