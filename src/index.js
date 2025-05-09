import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavouritesContext';
import { AuthProvider } from './context/AuthContext'; // Add this if it's defined in your context.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <FavoritesProvider>
      <AuthProvider> {/* Wrap App with AuthProvider */}
        <App />
      </AuthProvider>
    </FavoritesProvider>
  </CartProvider>
);
