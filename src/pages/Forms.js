import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  
      // ✅ Decode the token to extract the role
      const decoded = jwt_decode(token);
      const userRole = decoded.role;
  
      // ✅ Save token and role to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);
  
      console.log('Stored role:', userRole); // ✅ Confirm it's working
  
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };
  return (
    <div className="auth-wrapper">
      <style>{formStyles}</style>
      <form onSubmit={handleLogin} className="auth-form">
        <h2 className="form-title">🔐 Login</h2>
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
        {error && <div className="form-error">{error}</div>}
        <button type="submit" className="form-button login">Login</button>
        <div className="form-footer">
          <span>Don't have an account? </span>
          <Link to="/signup" className="form-link">Signup</Link>
        </div>
      </form>
    </div>
  );
}

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      setError(err.response?.data?.message || 'Signup failed: Unknown error');
    }
  };

  return (
    <div className="auth-wrapper">
      <style>{formStyles}</style>
      <form onSubmit={handleSignup} className="auth-form">
        <h2 className="form-title">📝 Signup</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="form-input"
        />
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-input"
        >
          <option value="customer">Customer</option>
          <option value="artist">Artist</option>
        </select>
        {error && <div className="form-error">{error}</div>}
        <button type="submit" className="form-button signup">Signup</button>
        <div className="form-footer">
          <span>Already have an account? </span>
          <Link to="/login" className="form-link">Login</Link>
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

.form-button.login {
  background: linear-gradient(145deg, #00fff7, #00fff7);
  color: white;
}

.form-button.login:hover {
  background: #2d3436;
  box-shadow: 0 0 6px #00fff7, 0 0 10px #00fff7;
}

.form-button.signup {
  background: linear-gradient(145deg, #00fff7, #00fff7);
  color: white;
}

.form-button.signup:hover {
  background: #2d3436;
  box-shadow: 0 0 6px #00fff7, 0 0 10px #00fff7;
}

.form-footer {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 15px;
  color: #ccc;
}

.form-link {
  color: #00fff7;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.form-link:hover {
  text-decoration: underline;
  color: #00fff7;
}

.form-error {
  color: #ff6b6b;
  font-size: 14px;
  text-align: center;
  margin-bottom: 1rem;
}
`;
