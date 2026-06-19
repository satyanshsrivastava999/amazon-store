// components/Confirmation.js
import React from 'react';

function Confirmation({ name, onContinue }) {
  return (
    <div className="confirmation">
      <h2>Thank you, {name}!</h2>
      <p>Your order has been placed.</p>
      <button onClick={onContinue}>Continue Shopping</button>
    </div>
  );
}

export default Confirmation;