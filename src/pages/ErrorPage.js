import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>🚫 Access Denied</h1>
      <p style={styles.message}>
        You are not authorized to access this page. Please check your credentials.
      </p>
      <Link to="/login" style={styles.button}>
        🔁 Back to Login
      </Link>
      <Link to="/" style={{ ...styles.button, marginTop: '15px', backgroundColor: '#ffa502' }}>
        🏠 Back to Home
      </Link>
    </div>
  );
}

const styles = {
  wrapper: {
    height: '100vh',
    backgroundColor: '#1c1c1e',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    color: '#ff4c4c',
    marginBottom: '1rem',
    textShadow: '0 0 10px #ff4c4c',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    maxWidth: '500px',
  },
  button: {
    textDecoration: 'none',
    backgroundColor: '#00fff7',
    color: '#000',
    padding: '12px 24px',
    borderRadius: '30px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
};
