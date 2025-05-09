// src/pages/Gallery.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavouritesContext';

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const fetchArtworks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/artworks', {
        params: { search, minPrice, maxPrice },
      });
      setArtworks(res.data);
    } catch (err) {
      console.error('Error loading artworks:', err);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [search, minPrice, maxPrice]);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchArtworks();
  };

  const handleBuyNow = (art) => {
    addToCart(art);
    navigate('/cart');
  };

  return (
    <div className="gallery-container">
      <style>{GalleryStyles}</style>

      <h1 className="gallery-header">🎨 Art Gallery</h1>

      <form onSubmit={handleFilter} className="filter-form">
        <input
          type="text"
          placeholder="Search by title"
          className="filter-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          className="filter-input"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="filter-input"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button type="submit" className="filter-button">Filter</button>
      </form>

      <div className="artwork-grid">
        {artworks.map((art) => (
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
              className={`fav-button ${favorites[art._id] ? 'active' : ''}`}
              onClick={() => toggleFavorite(art._id)}
            >
              {favorites[art._id] ? '❤️' : '🤍'}
            </button>

              <h2 className="artwork-title" >{art.title}</h2>

            <p className="artwork-description">{art.description}</p>
            
            <button onClick={() => handleBuyNow(art)} className="buy-button">
              🛒 Buy Now
            </button>

            <Link to={`/edit/${art._id}`} className="edit-button">
              ✏️
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const GalleryStyles = `
  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: black;
  }

  .gallery-container {
    padding: 2rem;
    max-width: 1400px;
    margin: auto;
    animation: fadeIn 1s ease;
  }

  .gallery-header {
    font-size: 2.8rem;
    text-align: center;
    font-weight: 800;
    margin-bottom: 2rem;
    color: #2d3436;
    text-shadow: 0 0 6px #00fff7, 0 0 10px #00fff7;
  }

  .filter-form {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    margin-bottom: 2.5rem;
  }

  .filter-input {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    width: 200px;
    font-size: 1rem;
  }

  .filter-button {
    padding: 10px 20px;
    background-color: #6c5ce7;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s ease;
  }

  .filter-button:hover {
    background-color: #341f97;
  }

  .artwork-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 32px;
  }

  .artwork-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 1rem;
    position: relative;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    border: 1px solid rgba(255, 255, 255, 0.25);
    transform: translateY(20px);
    animation: fadeUp 0.6s forwards;
    transition: all 0.4s ease;
  }

  .artwork-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    border: 2px solid #a29bfe;
  }

  .image-wrapper {
    overflow: hidden;
    border-radius: 15px;
    border: 2px solid transparent;
    transition: all 0.4s ease;
  }

  .artwork-card:hover .image-wrapper {
    border-image: linear-gradient(45deg, #81ecec, #74b9ff, #a29bfe) 1;
  }

  .artwork-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 10px;
    transition: transform 0.4s ease;
  }

  .artwork-card:hover .artwork-image {
    transform: scale(1.05);
  }

  .price-tag {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: linear-gradient(to right, #f0932b, #eb4d4b);
    padding: 6px 14px;
    border-radius: 50px;
    font-weight: bold;
    color: white;
    font-size: 0.95rem;
    box-shadow: 0 0 6px rgba(0,0,0,0.2);
  }

  .fav-button {
    position: absolute;
    top: 1rem;
    right: 3.5rem;
    background: transparent;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .fav-button.active {
    transform: scale(1.2);
  }

  .artwork-title {
    font-size: 1.4rem;
    margin: 1rem 0 0.5rem;
    color:rgb(164, 175, 178);
    font-weight: 700;
    text-decoration: none;
  }

  .artwork-description {
    font-size: 0.95rem;
    color: #636e72;
    margin-bottom: 2.5rem;
  }

  .buy-button {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    background: linear-gradient(135deg, #00cec9, #6c5ce7);
    color: white;
    border: none;
    padding: 10px 20px;
    font-weight: 600;
    border-radius: 30px;
    cursor: pointer;
    transition: background 0.4s ease;
    margin-left:55%;
  }

  .buy-button:hover {
    background: linear-gradient(135deg, #0984e3, #6c5ce7);
    transform: scale(1.05);
  }

  .edit-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #ffeaa7;
    padding: 8px 12px;
    border-radius: 50%;
    color: #2d3436;
    font-weight: bold;
    text-decoration: none;
    font-size: 0.85rem;
    transition: 0.3s ease;
  }

  .edit-button:hover {
    background: #fab1a0;
  }

  @keyframes fadeUp {
    to {
      transform: translateY(0);
      opacity: 1;
    }
    from {
      transform: translateY(20px);
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  }
`;
