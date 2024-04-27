// OrderSuccessPage.jsx

import React, { useEffect, useState } from 'react';
import './OrderSuccessPage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/order/details/${orderId}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div className="order-success-container">
      <h2 className="order-success-title">Thank You for Your Order!</h2>
      {orderDetails && (
        <div className="order-details">
          <p><strong>Order ID:</strong> {orderDetails.order_id}</p>
          <p><strong>Total Amount:</strong> ${orderDetails.total_amount}</p>
          <p><strong>Status:</strong> {orderDetails.status}</p>
          <p><strong>Estimated Delivery:</strong> {orderDetails.estimated_delivery}</p>
          {/* Add more order details as needed */}
        </div>
      )}
      <p className="order-success-message">Your order is being processed. You will receive a confirmation email shortly. Thank you for shopping with us!</p>
    </div>
  );
};

export default OrderSuccessPage;
