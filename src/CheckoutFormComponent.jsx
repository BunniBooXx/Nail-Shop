import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutFormComponent = ({ orderId, cartItems, totalPrice, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post('http://localhost:5000/create-payment-intent', {
          orderId,
          amount: totalPrice * 100, // Convert to cents
        });

        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setPaymentError('An error occurred while creating the payment intent.');
        console.error('Error:', error);
      }
    };

    fetchClientSecret();
  }, [orderId, totalPrice]);

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
      setPaymentError(error.message ? error.message : 'An error occurred');
    } else {
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (confirmError) {
        setPaymentError(confirmError.message);
      } else {
        // Payment successful, call the onPaymentSuccess function
        onPaymentSuccess(paymentIntent.id);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {paymentError && <div>{paymentError}</div>}
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutFormComponent;
