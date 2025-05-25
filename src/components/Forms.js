import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function Forms({ requiredRole }) {
  const location = useLocation();
  const isLogin = location.pathname.includes('login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const token = response.data.token;
      const decoded = jwt_decode(token);
      const userRole = decoded.role;

      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);

      if (location.pathname === '/adminlogin' && userRole !== 'admin') {
        navigate('/error');
        return;
      }
      if (location.pathname === '/artistlogin' && userRole !== 'artist') {
        navigate('/error');
        return;
      }
      if (location.pathname === '/customerlogin' && userRole !== 'customer') {
        navigate('/error');
        return;
      }

      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'artist') {
        navigate('/artgallery');
      } else if (userRole === 'customer') {
        navigate('/artgallery');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed: Invalid email or password.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
        role,
      });
      alert('Signup successful! Now log in.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-wrapper">
      <style>{formStyles}</style>
      <form onSubmit={isLogin ? handleLogin : handleSignup} className="auth-form">
        <h2 className="form-title">
          {isLogin
            ? `🔐 Login${requiredRole ? ` as ${requiredRole.charAt(0).toUpperCase() + requiredRole.slice(1)}` : ''}`
            : '📝 Signup'}
        </h2>

        {!isLogin && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="form-input"
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="form-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="form-input"
        />
        {!isLogin && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-input"
          >
            <option value="customer">Customer</option>
            <option value="artist">Artist</option>
            <option value="admin">Admin</option>
          </select>
        )}
        {error && <div className="form-error">{error}</div>}
        <button type="submit" className={`form-button ${isLogin ? 'login' : 'signup'}`}>
          {isLogin ? 'Login' : 'Signup'}
        </button>

        <div className="form-footer">
          {isLogin ? (
            <>
              <span>Don't have an account? </span>
              <Link to="/signup" className="form-link">Signup</Link>
            </>
          ) : (
            <>
              <span>Already have an account? </span>
              <Link to="/login" className="form-link">Login</Link>
            </>
          )}
        </div>

        <div className="form-footer">
          <Link to="/" className="form-link">🏠 Back to Home</Link>
        </div>
      </form>
    </div>
  );
}

const formStyles = `
body {
  background: linear-gradient(135deg, #2a2a35, #121212);
  font-family: 'Times New Roman', serif;
  color: #fff;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.7);
}

.auth-form {
  background: rgb(42, 42, 43);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 4px 25px rgba(0, 255, 255, 0.2);
  max-width: 400px;
  width: 100%;
  backdrop-filter: blur(10px);
}

.form-title {
  text-align: center;
  font-size: 30px;
  margin-bottom: 1.5rem;
  color: #2d3436;
  text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 1.2rem;
  border: none;
  border-radius: 8px;
  background: #f3f3f5;
  color: #000;
  font-size: 16px;
  transition: all 0.4s ease;
  font-family: 'Times New Roman', serif;
}

.form-input:focus {
  outline: none;
  box-shadow: 0 0 12px #00fff7;
  background: #e0e0e0;
  color: #000;
}

.form-button {
  width: 100%;
  padding: 14px;
  font-size: 17px;
  font-weight: bold;
  border: none;
  border-radius: 35px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  font-family: 'Times New Roman', serif;
}

.form-button.login,
.form-button.signup {
  background: linear-gradient(145deg, #00fff7, #00fff7);
  color: white;
}

.form-button:hover {
  background: #2d3436;
  box-shadow: 0 0 6px #00fff7, 0 0 10px #00fff7;
}

.form-footer {
  text-align: center;
  margin-top: 1.2rem;
  font-size: 15px;
  color: #ccc;
}

.form-link {
  background: none;
  border: none;
  color: #00fff7;
  font-weight: bold;
  cursor: pointer;
  margin-left: 5px;
  text-decoration: underline;
}

.form-error {
  color: #ff6b6b;
  font-size: 14px;
  text-align: center;
  margin-bottom: 1rem;
}
`;
