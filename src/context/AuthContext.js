import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Get user info after login using the token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`, // Use token once
            },
          });
          console.log('User fetched:', response.data);
          setUser(response.data); // Set the user data
        } catch (error) {
          console.error('Error fetching user:', error.response ? error.response.data : error.message);
        }
      };
      
      fetchUser();
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = response.data;

      // Store token and user data in localStorage
      localStorage.setItem('token', token);
      setUser(user); // Set the user after login
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null); // Reset the user state on logout
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext); // Use the context in other components
};

export default AuthContext;
