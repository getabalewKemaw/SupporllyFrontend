import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
export const signup = async (data: { name: string; email: string; password: string }) => {
  const res = await axios.post(`${API_BASE}/auth-local/signup`, data, { withCredentials: true });
  return res.data;
};
export const login = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API_BASE}/auth-local/login`, data, { withCredentials: true });
  return res.data;
};


export const getCurrentUser = async () => {
  const res = await axios.get(`${API_BASE}/auth-local/me`, { withCredentials: true });
  return res.data;
};

export const logout = async () => {
  const res = await axios.post(`${API_BASE}/auth-local/logout`, {}, { withCredentials: true });
  return res.data;
};

export const googleLogin = () => {
  window.location.href = `${API_BASE}/auth/google`; // redirect to backend Google OAuth
};
