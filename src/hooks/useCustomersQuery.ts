import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';

import { FilterType } from '@/types/filter.type';

// API 응답 타입
interface RawMember {
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

interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

interface ApiResponse {
  members: RawMember[];
  paginationInfo: PaginationInfo;
}

// 테이블에 넘길 데이터 타입
export interface CustomerTableRow {
  key: number;
  no: number;
  name: string;
  email: string;
  sex: string;
  birthDate: string;
  userId: number;
  hasLoan: string;
  memberStatus: string;
  createdAt: string;
  transactionCount: number;
  lastLoginAt: string;
  [key: string]: unknown;
}

/**
 * 관리자 회원 조회용 쿼리 파라미터 변환 훅
 * @param filters - 조회 조건 필터
 * @param page - 페이지 번호
 * @param size - 페이지 크기 (기본값: 8)
 *
 * @since 2025.05.13
 * @author 권민지
 */
function useCustomerQueryParams(filters: FilterType, page: number, size: number = 8) {
  return useMemo(() => {
    const params: Record<string, string> = {};

    if (filters.name) params.name = filters.name;
    if (filters.sex && filters.sex !== 'ALL') params.sex = filters.sex;
    if (filters.birthDateRange && filters.birthDateRange[0] && filters.birthDateRange[1]) {
      params.birthDateStart = filters.birthDateRange[0];
      params.birthDateEnd = filters.birthDateRange[1];
    }
    if (filters.memberStatus && filters.memberStatus !== 'ALL')
      params.memberStatus = filters.memberStatus;
    if (filters.createdDateRange && filters.createdDateRange[0] && filters.createdDateRange[1]) {
      params.startDate = filters.createdDateRange[0];
      params.endDate = filters.createdDateRange[1];
    }
    if (filters.hasLoan && filters.hasLoan !== 'ALL') params.hasLoan = filters.hasLoan;
    if (filters.transactionCountMin)
      params.transactionCountMin = String(filters.transactionCountMin);
    if (filters.transactionCountMax)
      params.transactionCountMax = String(filters.transactionCountMax);
    params.page = String(page);
    params.size = String(size);
    return params;
  }, [filters, page, size]);
}

/**
 * 관리자 회원 목록 조회 API
 * @param filters 조회 필터
 * @param adminToken 관리자 인증 토큰
 * @param page 페이지 번호
 * @param size 페이지 크기 (기본값: 8)
 *
 * @since 2025.05.13
 * @author 권민지
 */
export const useCustomersQuery = (
  filters: FilterType,
  adminToken: string,
  page: number,
  size: number = 8
) => {
  const params = useCustomerQueryParams(filters, page, size);

  return useQuery({
    queryKey: ['customers', params, adminToken],
    queryFn: async () => {
      const { data } = await axios.get<ApiResponse>(
        'http://localhost:8080/api/admin/members/search',
        {
          params,
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      const { members, paginationInfo } = data;

      console.log('members', members);
      console.log('paginationInfo', paginationInfo);

      // 응답 데이터 테이블 형식으로 변환
      const mappedMembers: CustomerTableRow[] = members.map((member, idx) => ({
        key: member.id,
        no: paginationInfo.currentPage * paginationInfo.pageSize + idx + 1,
        name: member.name,
        email: member.email,
        sex: member.sex === 'MALE' ? '남' : member.sex === 'FEMALE' ? '여' : '-',
        birthDate: member.birthDate,
        userId: member.id,
        hasLoan: member.hasLoan ? '대출중' : '대출중 아님',
        memberStatus:
          member.memberStatus === 'ACTIVE'
            ? '활성'
            : member.memberStatus === 'WITHDRAWN'
              ? '탈퇴'
              : '정지',
        createdAt: dayjs(member.createdAt).format('YYYY-MM-DD'),
        transactionCount: member.loanTransactionCount,
        lastLoginAt: member.lastLoginAt,
      }));

      return {
        members: mappedMembers,
        paginationInfo,
      };
    },
    enabled: !!adminToken,
    staleTime: 1000 * 30,
  });
};
