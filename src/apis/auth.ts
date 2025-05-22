import {
  ConsumptionTypeResponse,
  LoginRequest,
  LoginResponse,
  SendEmailRequest,
  SignupRequest,
  SignupResponse,
  VerifyEmailCodeRequest,
} from '@/types/auth.type';
import { apiClient } from './client';
import { ConsumptionTypeKey } from '@/constants/auth.constant';

/**
 * 인증 관련 API
 */

<<<<<<< HEAD
// 공통 설정 포함 axios 인스턴스 생성 (baseURL, JSON 헤더)
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 로그인 유저 정보 반환
export async function getMyPageUser(token: string) {
  const { data } = await axios.get(`${API_URL}/api/members/mypage`, {
=======
// 마이페이지 정보 조회 API
export const getMyPageUser = async (token: string) => {
  const { data } = await apiClient.get(`/api/members/mypage`, {
>>>>>>> fda45806e0ce6e40b2a0594a35159f18048cb21c
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

<<<<<<< HEAD
export interface SignupRequest {
  email: string;
  password: string;
  sex: 'MALE' | 'FEMALE';
  name: string;
  birthDate: string;
  consumptionType: string;
  consumeGoal: string
}

export interface SignupResponse {
  userId: number;
  email: string;
}

export interface SendEmailRequest {
  email: string;
}

// 회원가입 API는 공통 인스턴스 사용
export async function signupUser(data: SignupRequest): Promise<SignupResponse> {
=======
// 회원가입 API는 공통 인스턴스 사용
export const postSignupUser = async (data: SignupRequest): Promise<SignupResponse> => {
>>>>>>> fda45806e0ce6e40b2a0594a35159f18048cb21c
  const response = await apiClient.post('/api/auth/signup/password', data);
  return response.data;
};

// 이메일 인증 요청
<<<<<<< HEAD
export async function sendEmailVerificationCode(data: SendEmailRequest): Promise<void> {
  await apiClient.post('/api/auth/email/send', data);
}

export interface VerifyEmailCodeRequest {
  email: string;
  code: string;
}

// 이메일 인증번호 검증 - 인스턴스 사용
export async function verifyEmailCode(data: VerifyEmailCodeRequest): Promise<void> {
  await apiClient.post('/api/auth/email/verification', data);
}
=======
export const postSendEmailVerificationCode = async (data: SendEmailRequest): Promise<void> => {
  await apiClient.post('/api/auth/email/send', data);
};

// 이메일 인증번호 검증
export const postVerifyEmailCode = async (data: VerifyEmailCodeRequest): Promise<void> => {
  await apiClient.post('/api/auth/email/verification', data);
};
>>>>>>> fda45806e0ce6e40b2a0594a35159f18048cb21c

// 이메일 변경 요청 - 토큰 헤더 필요해서 직접 호출
export const patchEmailChange = async (token: string, email: string) => {
  const { data } = await apiClient.patch(
    `/api/members/mypage`,
    { email },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return data;
<<<<<<< HEAD
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  email: string;
  accessToken: string;
  refreshToken?: string;
}

// 로그인 API - 공통 인스턴스 사용
export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await apiClient.post('/api/auth/login/password', data);
  return response.data;
}
=======
};

export const getConsumptionType = async (): Promise<ConsumptionTypeKey> => {
  const response = await apiClient.get<ConsumptionTypeResponse>('/api/auth/consumption-type');
  return response.data.consumptionType;
};

// 로그인 API
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post('/api/auth/login/password', data);
  return response.data;
};
>>>>>>> fda45806e0ce6e40b2a0594a35159f18048cb21c
