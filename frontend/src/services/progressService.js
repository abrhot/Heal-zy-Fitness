// frontend/src/services/progressService.js
import axios from 'axios';
import authService from './authService';

const API_URL = '/api/progress';

const getAuthHeaders = () => {
  const token = authService.getCurrentUserToken();
  return token ? { 'x-auth-token': token } : {};
};

const logProgress = async (progressData) => {
  // progressData should include: weight (Number), date (String, optional), notes (String, optional)
  const response = await axios.post(`${API_URL}/log`, progressData, { headers: getAuthHeaders() });
  return response.data;
};

const getProgressLogs = async () => {
  const response = await axios.get(`${API_URL}/log`, { headers: getAuthHeaders() });
  return response.data; // Expects an array of logs
};

const progressService = {
  logProgress,
  getProgressLogs,
};

export default progressService;
