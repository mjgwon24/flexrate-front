import axios from 'axios';

/**
 * 인증 관련 API
 */
const API_URL = process.env.API_URL || 'http://localhost:8080';

// axios 인스턴스 생성 (공통 설정 포함)
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



// 로그인 유저 정보 반환
export async function getMyPageUser(token: string) {
  const { data } = await axios.get(`${API_URL}/api/members/mypage`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}


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

export async function signupUser(data: SignupRequest): Promise<SignupResponse> {
  const response = await axios.post(`${API_URL}/api/auth/signup/password`, data);
  return response.data;
}

// 이메일 인증 요청
export interface SendEmailRequest {
  email: string;
}
export async function sendEmailVerificationCode(data: SendEmailRequest): Promise<void> {
  await apiClient.post('/api/auth/email/send', data);
}

// 이메일 인증번호 검증
export interface VerifyEmailCodeRequest {
  email: string;
  code: string;
}
export async function verifyEmailCode(data: VerifyEmailCodeRequest): Promise<void> {
  await apiClient.post('/api/auth/email/verification', data);
}

// 이메일 변경 요청
export async function requestEmailChange(token: string, email: string) {
  const { data } = await axios.patch(`${API_URL}/api/members/mypage`, { email }, {
      headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}