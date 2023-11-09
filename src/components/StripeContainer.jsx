import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY =
  'pk_test_51KXLsbDRDZG7uUNLpfgvpE2fzDW8V35OXkCfS3jzm7HkqUPDLoVz74s6DcWQT8eSpTkQdU5Ze05PigbCE5FgT5aD00b0RFgHai';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
