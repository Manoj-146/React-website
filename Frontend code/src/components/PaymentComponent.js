// components/PaymentComponent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentComponent = ({ buyNowProducts }) => {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Add payment processing logic here
    console.log('Processing payment for:', buyNowProducts);
    navigate('/thank-you'); // Navigate to a thank-you or confirmation page after payment
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <ul>
        {buyNowProducts.map(product => (
          <li key={product.id}>{product.name} - &#8377; {product.price}</li>
        ))}
      </ul>
      <button onClick={handlePayment}>
        Confirm Payment
      </button>
    </div>
  );
};

export default PaymentComponent;
