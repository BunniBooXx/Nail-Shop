import React from 'react';
import { useParams } from'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import CheckoutFormComponent from './CheckoutFormComponent';

const StripeCheckoutForm = ({ orderId, order }) => {
  const cartItems = order.order_items || []; // Assuming order.order_items contains the cart items
  const totalPrice = order.total_amount || 0; // Assuming order.total_amount contains the total price

  return (
    <CheckoutFormComponent
      orderId={orderId}
      cartItems={cartItems}
      totalPrice={totalPrice}
    />
  );
};

export default StripeCheckoutForm;

const Checkout = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();
        // Assuming the API response has the correct structure
        setOrder({
          order_items: data.order_items,
          // Add any other required properties here
        });
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const initiateCheckout = useCallback(async () => {
    try {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: {
            name: order.name,
            price: order.price,
          },
        }),
      });

      const session = await response.json();
      if (session.error) {
        console.error('Error creating checkout session:', session.error);
      } else {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [order]);

  useEffect(() => {
    if (order) {
      initiateCheckout();
    }
  }, [order, initiateCheckout]);

  return order ? (
    <StripeCheckoutForm
      orderId={orderId}
      order={order}
    />
  ) : null;
};
