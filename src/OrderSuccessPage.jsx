import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OrderSuccessPage.css';

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const stripeApiKey = process.env.REACT_APP_STRIPE_KEY;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${backendUrl}/order/details/${orderId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'Stripe-Key': stripeApiKey
          }
        });
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, backendUrl]);

  return (
    <div>
      {order ? (
        <div>
          <h1>Order Success</h1>
          <p>Your order with ID {order.order_id} has been successfully placed.</p>
          <p>Total Amount: ${Number((order.total_amount / 100).toFixed(2))}</p>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default OrderSuccessPage;
