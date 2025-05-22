// src/pages/Wishlist.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavouritesContext';

export default function Wishlist() {
  const [allArtworks, setAllArtworks] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllArtworks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/artworks');
        setAllArtworks(res.data);
      } catch (err) {
        console.error('Error fetching artworks:', err);
      }
    };
    fetchAllArtworks();
  }, []);

  const wishlistArtworks = allArtworks.filter((art) => favorites[art._id]);

  const handleBuyNow = (art) => {
    addToCart(art);
    navigate('/cart');
  };

  return (
    <div className="gallery-container">
      <style>{WishlistStyles}</style>
      <h1 className="gallery-header">❤️ My Wishlist</h1>

      {wishlistArtworks.length === 0 ? (
        <p className="empty-text">No favorites added yet.</p>
      ) : (
        <div className="artwork-grid">
          {wishlistArtworks.map((art) => (
            <div key={art._id} className="artwork-card">
              <div className="image-wrapper">
                <img
                  src={`http://localhost:5000${art.imageUrl}`}
                  alt={art.title}
                  className="artwork-image"
                />
              </div>

              <div className="price-tag">₹{art.price}</div>

              <button
                className="fav-button active"
                onClick={() => toggleFavorite(art._id)}
              >
                ❤️
              </button>

              <h2 className="artwork-title">{art.title}</h2>

              <p className="artwork-description">{art.description}</p>

              <button onClick={() => handleBuyNow(art)} className="buy-button">
                🛒 Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const WishlistStyles = `
body {
  background-color: black;
  color: white;
  font-family: 'Segoe UI', sans-serif;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0;
}

.gallery-container {
  padding: 2rem;
}

.gallery-header {
  font-size: 2.4rem;
  text-align: center;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #2d3436;
  text-shadow: 0 0 6px #00fff7, 0 0 10px #00fff7;
}

.empty-text {
  text-align: center;
  font-size: 1.2rem;
  color: #ccc;
  margin-top: 2rem;
}

.artwork-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 32px;
}

.artwork-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
  border-radius: 20px;
  padding: 1rem;
  position: relative;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.artwork-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,255,255,0.15);
  border: 1px solid #00fff7;
}

.image-wrapper {
  overflow: hidden;
  border-radius: 15px;
}

.artwork-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.3s ease;
  border-radius: 15px;
}

.artwork-card:hover .artwork-image {
  transform: scale(1.05);
}

.price-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #eb4d4b;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
}

.fav-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: #ff4757;
}

.artwork-title {
  font-size: 1.3rem;
  margin: 1rem 0 0.5rem;
  font-weight: bold;
  color: #a3e4ff;
  transition: color 0.3s;
}

.artwork-title:hover {
  color: #00fff7;
}

.artwork-description {
  font-size: 0.95rem;
  color: #ccc;
  margin-bottom: 1rem;
}

.buy-button {
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s;
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}

.buy-button:hover {
  background: #a29bfe;
}
`;
