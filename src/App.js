import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import Confirmation from './components/Confirmation';
import { products } from './data/products';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('browse'); // 'browse' | 'checkout' | 'confirmed'
  const [customerName, setCustomerName] = useState('');
  // optional: search/category/filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default'); // 'asc' | 'desc'

  // Optional: persist cart to localStorage using useEffect
  useEffect(() => {
    const saved = localStorage.getItem('amazon-store-cart');
    if (saved) setCartItems(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('amazon-store-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // ----- Cart functions -----
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ----- Checkout flow -----
  const startCheckout = () => setCheckoutStep('checkout');
  const confirmOrder = (name) => {
    setCustomerName(name);
    setCartItems([]);
    setCheckoutStep('confirmed');
  };
  const backToStore = () => setCheckoutStep('browse');

  // ----- Filtering & Sorting (bonus) -----
  const filteredProducts = products
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="app">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setShowCart(!showCart)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      {checkoutStep === 'browse' && (
        <main className="main-content">
          <ProductList products={filteredProducts} onAddToCart={addToCart} />
          {showCart && (
            <Cart
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              total={totalPrice}
              onCheckout={startCheckout}
              onClose={() => setShowCart(false)}
            />
          )}
        </main>
      )}
      {checkoutStep === 'checkout' && (
        <CheckoutForm onSubmit={confirmOrder} onCancel={backToStore} />
      )}
      {checkoutStep === 'confirmed' && (
        <Confirmation name={customerName} onContinue={backToStore} />
      )}
    </div>
  );
}

export default App;