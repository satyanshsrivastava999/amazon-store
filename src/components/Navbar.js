// components/Navbar.js
import React from 'react';

function Navbar({
  cartCount,
  onCartClick,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange
}) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo">ShopNow</h1>
      </div>
      <div className="nav-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="category-select"
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="default">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      <div className="nav-right">
        <button className="cart-icon" onClick={onCartClick}>
          🛒
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;