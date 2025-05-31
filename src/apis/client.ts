import axios from 'axios';

import { postAuthToken } from './auth';

// 공통 설정 포함 axios 인스턴스 생성 (baseURL, JSON 헤더)
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

<<<<<<< HEAD
=======
const getAccessToken = () => localStorage.getItem('accessToken');
const setAccessToken = (token: string) => localStorage.setItem('accessToken', token);

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response?.status === 401 && originalConfig && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const newAccessToken = await postAuthToken();
        setAccessToken(newAccessToken);

        return apiClient({
          ...originalConfig,
          headers: {
            ...originalConfig.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      } catch (e) {
        localStorage.removeItem('accessToken');
        window.location.href = '/auth/login';
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
>>>>>>> 29fcf3b1269e5e09036267761482c31d07beadd5
