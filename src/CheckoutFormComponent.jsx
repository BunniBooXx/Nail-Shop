import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutFormComponent = ({ clientSecret, createCheckoutSession, totalPrice, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!clientSecret & cartItems.length > 0) {
      await createCheckoutSession();
    }

    const cardElement = elements.getElement('cardElement');

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
        setPaymentError(confirmError.message ? confirmError.message : 'An error occurred');
      } else {
        setPaymentSuccess(true);
        // Handle successful payment here
        console.log('Payment successful:', paymentIntent);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {paymentError && <div>{paymentError}</div>}
      {paymentSuccess && <div>Payment successful!</div>}
      <button type="submit" disabled={!stripe}>
        Pay ${totalPrice}
      </button>
    </form>
  );
};

export default CheckoutFormComponent;
