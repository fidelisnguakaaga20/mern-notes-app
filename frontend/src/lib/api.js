// frontend/src/lib/api.js
import axios from "axios";
import { getAuth } from "firebase/auth";

// ✅ Base URL should point to your deployed backend
const API_BASE_URL = "https://mern-notes-backendbr.onrender.com/api"; /// ✅ Your Render backend URL

// ✅ Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Interceptor: attach Firebase token to requests
api.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
