import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutFormComponent = ({ orderId, cartItems, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentError(error.message);
    } else {
      try {
        const response = await axios.post('http://localhost:5000/create-payment-intent', {
          orderId,
          amount: totalPrice * 100, // Convert to cents
        });

        const { clientSecret } = response.data;

        const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (confirmError) {
          setPaymentError(confirmError.message);
        } else {
          setPaymentSuccess(true);
          // Send email to customer and developer upon successful payment
          await sendEmailsOnPaymentSuccess(orderId);
        }
      } catch (error) {
        setPaymentError('An error occurred while processing your payment.');
        console.error('Error:', error);
      }
    }
  };

  const sendEmailsOnPaymentSuccess = async (orderId) => {
    try {
      await axios.post('http://localhost:5000/send-emails', { orderId });
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {paymentError && <div>{paymentError}</div>}
      {paymentSuccess && <div>Payment successful!</div>}
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutFormComponent;
