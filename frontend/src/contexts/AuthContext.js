// frontend/src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(authService.getCurrentUserToken());
  const [loading, setLoading] = useState(true); // For initial check

  useEffect(() => {
    // This effect is to ensure state is synced with localStorage on initial load
    // and potentially verify token with backend in a real app
    const token = authService.getCurrentUserToken();
    if (token) {
      setUserToken(token);
      // TODO: Optionally decode token to get user info or verify with backend
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('userToken', token);
    setUserToken(token);
    // TODO: Optionally decode token to get user info
  };

  const logout = () => {
    authService.logout(); // Clears localStorage
    setUserToken(null);
  };

  const value = {
    userToken, // Can be null or the token string
    isAuthenticated: !!userToken, // True if token exists
    login,
    logout,
    loading // To know if initial auth check is complete
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
