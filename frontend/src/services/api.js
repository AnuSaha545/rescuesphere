const API_BASE_URL = "http://127.0.0.1:8000";

export const getRequests = async () => {
  const response = await fetch(`${API_BASE_URL}/requests`);
  return response.json();
};

export const getResources = async () => {
  const response = await fetch(`${API_BASE_URL}/resources`);
  return response.json();
};

export const getDashboard = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard`);
  return response.json();
};