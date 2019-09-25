import axios from 'axios';
import router from '../routes/router';

// Create an instance of axios and configure base URL
const instance = axios.create({ baseURL: process.env.API_URI });

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) config.headers.Authorization = `Bearer ${token}`; // eslint-disable-line
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  response => response,
  (error) => {
    const originalRequest = error.config;

    // Check if response status is 401 and if original request was the one for refreshing token
    if (error.response.status === 401 && originalRequest.url === 'http://13.232.130.60:8081/v1/auth/refresh') {
      router.replace('/login');
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      const token = localStorage.getItem('refresh-token');
      return axios.post('/auth/refresh', { token })
        .then((res) => {
          if (res.data.success) {
            const { accessToken, refreshToken } = res.data;
            localStorage.setItem('access-token', accessToken);
            localStorage.setItem('access-token', refreshToken);
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          }
          router.replace('/login');
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  },
);
