// src/components/ArtistHeader.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUpload, FaImages, FaBoxOpen, FaUser } from 'react-icons/fa';

export default function ArtistHeader() {
  return (
    <header className="header">
      <style>{headerStyles}</style>

      <div className="logo">
        <FaHome className="icon" />
        <Link to="/" className="logo-text">Artistry</Link>
      </div>

      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/upload" className="nav-link">
          <FaUpload className="icon" /> Upload
        </Link>
        <Link to="/gallery" className="nav-link">
          <FaImages className="icon" /> Gallery
        </Link>
        <Link to="/orders" className="nav-link">
          <FaBoxOpen className="icon" /> Orders
        </Link>
        <Link to="/profile" className="nav-link">
          <FaUser className="icon" /> Profile
        </Link>
      </nav>
    </header>
  );
}

const headerStyles = `
  .header {
    background: #2d3436;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .logo-text {
    font-size: 1.6rem;
    font-weight: bold;
    color: #00cec9;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: white;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s ease;
  }

  .nav-link:hover {
    color: #81ecec;
  }

  .icon {
    font-size: 1.2rem;
  }
`;
