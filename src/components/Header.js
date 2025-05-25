import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBoxOpen,
  FaHome,
  FaUpload,
  FaImages,
  FaSignInAlt,
  FaUserPlus
} from 'react-icons/fa';

export default function Header() {
  const location = useLocation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setRole(parsedUser.role); // 'customer' or 'artist'
      } else {
        setRole(null);
      }
    } catch (err) {
      console.error('Invalid user data in localStorage:', err);
      setRole(null);
    }
  }, []);

  // Detect if current page is gallery (include paths starting with /gallery)
  const isGalleryPage = location.pathname.startsWith('/gallery');

  // Show login/signup only if not logged in AND not on gallery page
  const showAuthLinks = !role && !isGalleryPage;

  return (
    <header className="header">
      <style>{headerStyles}</style>

      <div className="logo">
        <FaHome className="icon" />
        <Link to="/" className="logo-text">Artistry</Link>
      </div>

      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>

        {role === 'customer' && (
          <>
            <div className="nav-header">Customer Menu</div>
            <Link to="/cart" className="nav-link">
              <FaShoppingCart className="icon" /> Cart
            </Link>
            <Link to="/whishlist" className="nav-link">
              <FaHeart className="icon" /> Wishlist
            </Link>
            <Link to="/orders" className="nav-link">
              <FaBoxOpen className="icon" /> Orders
            </Link>
            <Link to="/profile" className="nav-link">
              <FaUser className="icon" /> Profile
            </Link>
          </>
        )}

        {role === 'artist' && (
          <>
            <div className="nav-header">Artist Menu</div>
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
          </>
        )}

        {showAuthLinks && (
          <>
            <Link to="/login" className="nav-link">
              <FaSignInAlt className="icon" /> Login
            </Link>
            <Link to="/signup" className="nav-link">
              <FaUserPlus className="icon" /> Signup
            </Link>
          </>
        )}
      </nav>

      {role && (
        <div className="user-info">
          {role === 'artist' ? '🎨 Artist' : '🛍 Customer'}
        </div>
      )}
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

  .nav-header {
    font-weight: bold;
    font-size: 1.1rem;
    color: #81ecec;
    margin-right: 1rem;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid #81ecec;
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

  .user-info {
    color: #ffeaa7;
    font-weight: bold;
    font-size: 1rem;
    margin-left: 1rem;
  }
`;
