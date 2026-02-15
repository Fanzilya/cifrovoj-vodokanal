import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrlResearch = 'https://triapi.ru/authorization';

export const authorizationInstance = axios.create({
  baseURL: baseUrlResearch + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Функция обновления токена
const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await axios.get(`${baseUrlResearch}/Users/RefreshAuthorization`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const { jwtToken, refreshToken: newRefreshToken } = response.data;

    await AsyncStorage.setItem('access_token', jwtToken);
    await AsyncStorage.setItem('refresh_token', newRefreshToken);

    return jwtToken;
  } catch (error) {
    console.log('Token refresh failed', error);
    // Очистка данных при ошибке
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    await AsyncStorage.removeItem('user_id');
    throw error;
  }
};

// Перехватчик запросов
authorizationInstance.interceptors.request.use(
  async (config) => {
    const userId = await AsyncStorage.getItem('user_id');

    // Блокировка по meta-флагу (только для не-GET запросов)
    if (userId && userId === '99999' && config.method !== 'get') {
      return Promise.reject(new Error(`${config.method.toUpperCase()} blocked by meta flag`));
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
authorizationInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authorizationInstance(originalRequest);
      } catch (refreshError) {
        console.log('Auth failed, user logged out', refreshError);
        return Promise.reject(refreshError);
      }
    }

    console.log('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
