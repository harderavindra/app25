// utils/axios.js
import axios from "axios";

// Create instance
const instance = axios.create({
baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Sends cookies with each request
  timeout: 10000,
});

// Axios interceptor for 401 + refresh token logic
instance.interceptors.response.use(
   response => response,
  async error => {
    const originalRequest = error.config;
    const isAuthEndpoint = originalRequest.url.includes("/auth/");

    // Handle 401 Unauthorized
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;
      
      try {
        await instance.post("/auth/refresh");
        return instance(originalRequest);
      } catch (refreshError) {
        // Force logout if refresh fails
        if (refreshError.response?.status === 401) {
          window.dispatchEvent(new Event("storage"));
        }
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 403) {
        error.message = data.message || "You don't have permission to access this resource";
      } else if (status === 429) {
        error.message = "Too many requests. Please try again later.";
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
