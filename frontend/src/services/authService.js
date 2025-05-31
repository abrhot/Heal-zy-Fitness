// frontend/src/services/authService.js
import axios from 'axios';

const API_URL = '/api/auth'; // Adjust if your backend API prefix is different

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  // No token storage here, registration might just confirm and ask to login
  // Or, if backend returns token on register and auto-login is desired:
  // if (response.data.token) {
  //   localStorage.setItem('userToken', response.data.token);
  // }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data.token) {
    localStorage.setItem('userToken', response.data.token);
  }
  return response.data; // Should contain the token
};

const logout = () => {
  localStorage.removeItem('userToken');
  // Potentially call a backend logout endpoint if it exists
};

const getCurrentUserToken = () => {
  return localStorage.getItem('userToken');
};

const authService = {
  register,
  login,
  logout,
  getCurrentUserToken,
};

export default authService;
