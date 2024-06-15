import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';




const CheckoutFormComponent = ({ order, orderId, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setPaymentError(error.message);
      } else {
        const response = await axios.post(`${backendUrl}/create-checkout-session`, {
          orderId,
          amount: order.total_amount * 100, // Convert to cents
        });

        const { clientSecret } = response.data;

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (confirmError) {
          setPaymentError(confirmError.message);
        } else {
          onPaymentSuccess(paymentIntent.id);

          if (paymentIntent && paymentIntent.status === 'succeeded') {
            setPaymentSuccess(true);
            handlePaymentSuccess(paymentIntent); // Call the new function here
          }
        }
      }
    } catch (error) {
      setPaymentError('An error occurred while processing your payment.');
      console.error('Error:', error);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${backendUrl}/send-emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, // Include the user's authentication token
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
    <form onSubmit={handleSubmit}>
      <CardElement />
      {paymentError && <div>{paymentError}</div>}
      {paymentSuccess && <div>Payment successful! Emails have been sent.</div>}
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutFormComponent;
