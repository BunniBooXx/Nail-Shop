import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OrderSuccessPage.css'; // Ensure this is the correct path to your CSS file

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${backendUrl}/order/details/${orderId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setOrder(response.data);
        setLoading(false);

        // Send confirmation email
        await axios.post(`${backendUrl}/send-emails`, 
          { order_id: orderId },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to load order details. Please try again later.');
        setLoading(false);
      }
    };



    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, backendUrl]);

  if (loading) {
    return <p className="loading">Loading order details...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="container">
      {order && (
        <div className="order-success">
          <div className="box">
            <h1>Order Success</h1>
          </div>
          <br />
          <div className="box">
            <p>Your order with ID {order.order_id} has been successfully placed.</p>
          </div>
          <br />
          <div className="box">
            <p>Total Amount: ${order.total_amount}.00</p>
          </div>
          <br />
          <div className="box">
            <p className="intro">You will be getting a confirmation email. Keep in mind orders are handmade and take 2-3 weeks to fulfill. You will get an email with the shipment link when your order is shipped out.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSuccessPage;



