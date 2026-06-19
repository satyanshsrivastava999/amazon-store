// components/CartItem.js
import React from 'react';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <p>₹{item.price.toLocaleString()} each</p>
      </div>
      <div className="quantity-controls">
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
      </div>
      <div className="line-total">
        ₹{(item.price * item.quantity).toLocaleString()}
      </div>
      <button className="remove-btn" onClick={() => onRemove(item.id)}>🗑</button>
    </div>
  );
}

export default CartItem;