import { ConsumptionTypeKey } from '@/constants/auth.constant';
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

/**
 * 인증 관련 API
 */

// 마이페이지 정보 조회 API
export const getMyPageUser = async (token: string) => {
  const { data } = await apiClient.get(`/api/members/mypage`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

// 회원가입 API는 공통 인스턴스 사용
export const postSignupUser = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await apiClient.post('/api/auth/signup/password', data);
  return response.data;
};

// 이메일 인증 요청
export const postSendEmailVerificationCode = async (data: SendEmailRequest): Promise<void> => {
  await apiClient.post('/api/auth/email/send', data);
};

// 이메일 인증번호 검증
export const postVerifyEmailCode = async (data: VerifyEmailCodeRequest): Promise<void> => {
  await apiClient.post('/api/auth/email/verification', data);
};

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
};

// 소비성향 조회
export const getConsumptionType = async (): Promise<ConsumptionTypeKey> => {
  const response = await apiClient.get<ConsumptionTypeResponse>('/api/auth/consumption-type');
  return response.data.consumptionType;
};

// 로그인 API
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post('/api/auth/login/password', data);
  return response.data;
};

// PIN 등록 여부 조회 API
export const checkPinRegistered = async (userId: number): Promise<boolean> => {
  const response = await apiClient.get<{ registered: boolean }>('/api/auth/login/pin/registered', {
    params: { userId },
  });
  return response.data.registered;
};


// PIN 등록 API
interface PinRegisterRequest {
  email: string;
  pin: string;
}

export const registerPin = async (data: PinRegisterRequest): Promise<string> => {
  const response = await apiClient.post('/api/auth/pin/register', data);
  return response.data;
};

// PIN 로그인 API
export const loginWithPin = async (email: string, pin: string): Promise<LoginResponse> => {
  const response = await apiClient.post('/api/auth/login/pin', {
    email,
    pin,
  });
  return response.data;
};
