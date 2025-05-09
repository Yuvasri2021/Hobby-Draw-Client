import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavouritesContext'; // Importing the custom hook

const Navbar = () => {
  const location = useLocation();
  const { favorites } = useFavorites();
  const favoriteCount = Object.values(favorites).filter(Boolean).length;

  return (
    <>
      <nav className="navbar">
        <Link to="/admin" className="navbar-logo">
          <img src="/images/artist-painting.png" alt="Logo" className="logo-img" />
          Yuvi's
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/upload" className={location.pathname === '/upload' ? 'active' : ''}>
              UPLOAD
            </Link>
          </li>
          <li>
            <Link to="/artgallery" className={location.pathname === '/artgallery' ? 'active' : ''}>
              GALLERY
            </Link>
          </li>
          <li>
            <Link to="/my-orders" className={location.pathname === '/my-orders' ? 'active' : ''}>
              ORDERS
            </Link>
          </li>
          <li>
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
              <img src="/images/login.png" alt="Login" className="login-img" width="30px" height="30px" />
            </Link>
          </li>
          <li>
            <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
              <img src="/images/avatar.png" width="30px" height="30px" />
            </Link>
          </li>
          <li>
          <Link to="/whishlist" className={location.pathname === '/wishlist' ? 'active' : ''}>
          <img src="/images/favourite.png" width="30px" height="30px" ></img> ({favoriteCount})
        </Link>
          </li>
        </ul>
        <div className="hamburger-menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>

      <style>{`
        * {
          font-family: 'Times New Roman', Times, serif;
        }

        .navbar {
          background: linear-gradient(45deg, rgb(23, 119, 148), rgb(67, 206, 227), rgb(125, 204, 204));
          color: white;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 10;
          transition: background 0.5s ease-in-out;
          border-radius: 15px;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 1.75rem;
          text-decoration: none;
          color: white;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .logo-img {
          width: 30px;
          height: 30px;
          margin-right: 8px;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          list-style: none;
          padding: 0;
          margin: 0;
          text-decoration: none;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          font-size: 1rem;
          font-weight: bold;
          transition: color 0.3s ease, transform 0.3s ease, letter-spacing 0.3s ease;
        }

        .nav-links a:hover {
          color: #cbd5e1;
          transform: scale(1.05);
        }

        .nav-links .active {
          color: #cbd5e1;
          font-weight: bold;
        }

        .logout-btn {
          background-color: #e74c3c;
          color: white;
          padding: 0.6rem 1.25rem;
          border-radius: 0.375rem;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }

        .logout-btn:hover {
          background-color: #c0392b;
          transform: scale(1.05);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }

        .hamburger-menu {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }

        .hamburger-menu .bar {
          width: 25px;
          height: 3px;
          background-color: white;
          transition: 0.3s ease;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: block;
            text-align: center;
            position: absolute;
            top: 60px;
            left: -200px;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            transition: left 0.3s ease;
            border-radius: 10px;
          }

          .nav-links.active {
            left: 0;
          }

          .nav-links a {
            margin: 1rem 0;
            font-size: 1.2rem;
          }

          .navbar {
            flex-direction: column;
          }

          .hamburger-menu {
            display: flex;
          }

          .hamburger-menu.active .bar:nth-child(1) {
            transform: rotate(45deg);
            top: 6px;
          }

          .hamburger-menu.active .bar:nth-child(2) {
            opacity: 0;
          }

          .hamburger-menu.active .bar:nth-child(3) {
            transform: rotate(-45deg);
            top: -6px;
          }
        }
      `}</style>

      <script>
        {`
          const hamburgerMenu = document.querySelector('.hamburger-menu');
          const navLinks = document.querySelector('.nav-links');
          hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
          });
        `}
      </script>
    </>
  );
};

export default Navbar;
