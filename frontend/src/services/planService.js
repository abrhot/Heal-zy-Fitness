// frontend/src/services/planService.js
import axios from 'axios';
import authService from './authService'; // To get the token

const API_URL = '/api/plan'; // Backend plan routes

const getAuthHeaders = () => {
  const token = authService.getCurrentUserToken();
  if (token) {
    return { 'x-auth-token': token };
  }
  return {};
};

const getWorkoutPlan = async () => {
  const response = await axios.get(`${API_URL}/workout`, { headers: getAuthHeaders() });
  return response.data;
};

const getNutritionPlan = async () => {
  const response = await axios.get(`${API_URL}/nutrition`, { headers: getAuthHeaders() });
  return response.data;
};

const planService = {
  getWorkoutPlan,
  getNutritionPlan,
};

export default planService;
