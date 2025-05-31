// frontend/src/services/userService.js
import axios from 'axios';
import authService from './authService'; // To get the token

const API_URL = '/api/user'; // Backend user routes

// Utility to get auth headers
const getAuthHeaders = () => {
  const token = authService.getCurrentUserToken();
  if (token) {
    return { 'x-auth-token': token };
  }
  return {};
};

const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`, { headers: getAuthHeaders() });
  return response.data;
};

const updateProfile = async (profileData) => {
  const response = await axios.post(`${API_URL}/profile`, profileData, { headers: getAuthHeaders() });
  return response.data;
};

const userService = {
  getProfile,
  updateProfile,
};

export default userService;
