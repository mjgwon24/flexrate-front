import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8080';

/**
 * API 응답 타입
 */
export interface RawMember {
  id: number;
  name: string;
  email: string;
  sex: 'MALE' | 'FEMALE';
  birthDate: string;
  createdAt: string;
  hasLoan: boolean;
  lastLoginAt: string;
  loanTransactionCount: number;
  memberStatus: 'ACTIVE' | 'WITHDRAWN' | 'SUSPENDED';
  [key: string]: unknown;
}

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface ApiResponse {
  members: RawMember[];
  paginationInfo: PaginationInfo;
}

/**
 * 관리자 회원 목록 조회 API
 * @param params 쿼리 파라미터
 * @param accessToken 인증 토큰
 */
export async function getCustomers(
  params: Record<string, string>,
  accessToken: string
): Promise<ApiResponse> {
  const { data } = await axios.get<ApiResponse>(`${API_URL}/api/admin/members/search`, {
    params,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
}
