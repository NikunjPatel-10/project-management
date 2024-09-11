// src/components/AxiosInterceptor.js
import axios from "axios";
import { useEffect } from "react";

const axiosInstance = axios.create();

const AxiosInterceptor = () => {
  const requestInterceptor = axios.interceptors.request.use(
    (config) => {
      // Retrieve token from local storage
      const token = localStorage.getItem("accessToken");
      
      // Add token to the Authorization header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );

  // Response interceptor
  const responseInterceptor = axios.interceptors.response.use(
    (response) => {
      // Modify response data here
      return response;
    },
    async(error) => {
      const originalRequest = error.config;
      // Handle response error
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error
        const refreshToken = localStorage.getItem("refreshToken")
        const response = await axiosInstance.get('http://localhost:3000/login/refresh-token', {
          // withCredentials: true,
          headers:{
            Authorization:`Bearer ${refreshToken}`
          }
        });
        localStorage.setItem("accessToken",response.data.accessToken);
        return axios(originalRequest)
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    // Request interceptor
    // Cleanup interceptors on component unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return null;
};

export default AxiosInterceptor;
