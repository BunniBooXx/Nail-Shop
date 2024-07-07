import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import PropTypes from 'prop-types';

const CheckoutFormComponent = ({ order, orderId, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  console.log('CheckoutFormComponent received orderId:', orderId);

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
        console.log('Creating checkout session with orderId:', orderId);

        const response = await axios.post(`${backendUrl}/create-checkout-session`, {
          order_id: orderId,
          amount: order.total_amount * 100, // Convert to cents
        });

        const { sessionId } = response.data; // Ensure this is 'sessionId'

        console.log('Session ID received:', sessionId);

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(sessionId, {
          payment_method: paymentMethod.id,
        });

        if (confirmError) {
          setPaymentError(confirmError.message);
        } else {
          if (paymentIntent && paymentIntent.status === 'succeeded') {
            setPaymentSuccess(true);
            console.log('Payment successful:', paymentIntent);
            await onPaymentSuccess(paymentIntent);
          }
        }
      }
    } catch (error) {
      setPaymentError('An error occurred while processing your payment.');
      console.error('Error:', error);
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

CheckoutFormComponent.propTypes = {
  orderId: PropTypes.string.isRequired,
  order: PropTypes.object.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
};

export default CheckoutFormComponent;




