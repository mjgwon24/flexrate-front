import axios from 'axios';

// 공통 설정 포함 axios 인스턴스 생성 (baseURL, JSON 헤더)
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

