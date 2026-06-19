// components/CheckoutForm.js
import React, { useState } from 'react';

function CheckoutForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && address) {
      onSubmit(name);
    }
  };

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          Address:
          <textarea value={address} onChange={e => setAddress(e.target.value)} required />
        </label>
        <div className="form-buttons">
          <button type="submit">Place Order</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;