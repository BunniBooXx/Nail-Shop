import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import CheckoutFormComponent from './CheckoutFormComponent';

const stripePromise = loadStripe(
  'pk_test_51OwSCeEBwfjW7s9fwT5GlYGVHY7f3YPeRxHEqbV8YJQN139JgZpuJjTgZIzoEmeds2FUi91q8TbSJVq1gxQbczmf00ht6oOGGU'
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

const Checkout = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/order/read/${orderId}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  return order ? (
    <StripeCheckoutForm orderId={orderId} order={order} />
  ) : (
    <div>Loading...</div>
  );
};

export default Checkout;
