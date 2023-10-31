import React, { useState } from 'react';
import StripeContainer from './StripeContainer';
import { useNavigate } from 'react-router-dom';

const Coupon = ({ totalPrice, handlePayment }) => {
  const [myValue, setMyValue] = useState('');

  const navigate = useNavigate();

  // Function to format the total amount as currency
  const formatAmount = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const handleInputChange = (e) => {
    setMyValue(e.target.value);
  };

  return (
    <section id="cart-bottom" className="container">
      <div className="wrapper">
        <div>
          <div className="coupon">
            <h5>Coupon</h5>
            <p>Enter your coupon code if you have one</p>
            <div className="flex">
              <input
                type="text"
                placeholder="Coupon Code"
                value={myValue}
                onChange={handleInputChange}
              />
              <button className="apply-coupon">Apply Coupon</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Coupon;
