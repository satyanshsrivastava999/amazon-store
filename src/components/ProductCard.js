// components/ProductCard.js
import React, { useState } from 'react';

function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p className="price">₹{product.price.toLocaleString()}</p>
      <button className={`add-to-cart-btn ${added ? 'added' : ''}`} onClick={handleClick}>
        {added ? 'Added ✓' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default ProductCard;