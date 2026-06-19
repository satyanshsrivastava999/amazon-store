// components/Cart.js
import React from 'react';
import CartItem from './CartItem';

function Cart({ items, onUpdateQuantity, onRemove, total, onCheckout, onClose }) {
  if (items.length === 0) {
    return (
      <div className="cart-panel">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Your Cart</h2>
        <p className="empty-cart">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-panel">
      <button className="close-btn" onClick={onClose}>✕</button>
      <h2>Your Cart</h2>
      <div className="cart-items">
        {items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ₹{total.toLocaleString()}</h3>
        <button
          className="checkout-btn"
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;