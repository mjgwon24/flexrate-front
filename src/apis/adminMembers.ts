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
export async function getMembers(
  params: Record<string, string>,
  accessToken: string
): Promise<ApiResponse> {
  const { data } = await axios.get<ApiResponse>(`${API_URL}/api/admin/members/search`, {
    params,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
}

/**
 * 관리자 회원 정보 수정 API
 * @param userId 회원 ID
 * @param payload 수정할 데이터
 * @param accessToken 인증 토큰
 * @returns void
 */
export async function patchMember(
  userId: number,
  payload: {
    name?: string;
    email?: string;
    sex?: string;
    birthDate?: string;
    memberStatus?: string;
  },
  accessToken: string
): Promise<void> {
  await axios.patch(`${API_URL}/api/admin/members/${userId}`, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
