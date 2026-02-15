import axios from 'axios';

const baseUrl = 'http://hydrig.gsurso.ru/camera';
// const baseUrl = 'http://localhost:5012'; // для разработки

export const reserchCamera = axios.create({
  baseURL: baseUrl + '/api/cameras',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик запросов (можно расширить позже)
reserchCamera.interceptors.request.use(
  (config) => {
    console.log('Request sent:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Перехватчик ответов
reserchCamera.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
