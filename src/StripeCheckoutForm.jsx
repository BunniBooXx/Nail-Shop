import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import CheckoutFormComponent from './CheckoutFormComponent';

const stripePromise = loadStripe('STRIPE_PUBLISHABLE_KEY');

const StripeCheckoutForm = ({ cartItems, totalPrice }) => {
  const [clientSecret, setClientSecret] = useState('');

  const createCheckoutSession = async () => {
    try {
      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();

      if (response.ok) {
        setClientSecret(data.clientSecret);
      } else {
        console.error('Error creating checkout session:', data.error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ elements, stripe }) => (
          <CheckoutFormComponent
            elements={elements}
            stripe={stripe}
            clientSecret={clientSecret}
            createCheckoutSession={createCheckoutSession}
            totalPrice={totalPrice}
          />
        )}
      </ElementsConsumer>
    </Elements>
  );
};

export default StripeCheckoutForm;

