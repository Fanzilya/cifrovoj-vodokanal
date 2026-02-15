import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://triapi.ru';

export const instance = axios.create({
  baseURL: baseUrl + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Запрос с обновлением токена
const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await axios.get(`${baseUrl}/Users/RefreshAuthorization`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const { jwtToken, refreshToken: newRefreshToken } = response.data;

    await AsyncStorage.setItem('access_token', jwtToken);
    await AsyncStorage.setItem('refresh_token', newRefreshToken);

    return jwtToken;
  } catch (error) {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    await AsyncStorage.removeItem('user_id');
    throw error;
  }
};

// Перехватчик запросов
instance.interceptors.request.use(
  async (config) => {
    const userId = await AsyncStorage.getItem('user_id');

    // Блокировка по meta-флагу
    if (userId && userId === '99999' && config.method !== 'get') {
      return Promise.reject(new Error(config.method + ' blocked by meta flag'));
    }

    const accessToken = await AsyncStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Перехватчик ответов
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.log('Token refresh failed, logging out', refreshError);
        return Promise.reject(refreshError);
      }
    }

    console.log('API Error:', error);
    return Promise.reject(error);
  }
);
