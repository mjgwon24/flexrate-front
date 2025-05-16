import React, { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { getMembers, RawMember } from '@/apis/adminMembers';
import { FilterType } from '@/types/filter.type';

const PAGE_SIZE = 8;

/**
 * 고객 테이블 행 데이터 타입
 */
export interface CustomerTableRow {
  key: React.Key;
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
 * 회원 상태 변환 함수
 * @param status 회원 상태
 */
function getMemberStatus(status: RawMember['memberStatus']) {
  switch (status) {
    case 'ACTIVE':
      return '활성';
    case 'WITHDRAWN':
      return '탈퇴';
    case 'SUSPENDED':
      return '정지';
    default:
      return '-';
  }
}

/**
 * 성별 변환 함수
 * @param sex 성별
 */
function getSex(sex: RawMember['sex']) {
  switch (sex) {
    case 'MALE':
      return '남';
    case 'FEMALE':
      return '여';
    default:
      return '-';
  }
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
function useMembersQueryParams(filters: FilterType, page: number, size: number = PAGE_SIZE) {
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
    params.page = String(page - 1);
    params.size = String(size);
    return params;
  }, [filters, page, size]);
}

/**
 * 관리자 회원 목록 조회 API
 * @param filters 조회 필터
 * @param accessToken 인증 토큰
 * @param page 페이지 번호
 * @param size 페이지 크기 (기본값: 8)
 *
 * @since 2025.05.13
 * @author 권민지
 */
export const useMembersQuery = (
  filters: FilterType,
  accessToken: string,
  page: number,
  size: number = PAGE_SIZE
) => {
  const params = useMembersQueryParams(filters, page, size);
  const queryKey = ['customers', JSON.stringify(params), accessToken];

  const queryResult = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const data = await getMembers(params, accessToken);

        const { members, paginationInfo } = data;
        const mappedMembers: CustomerTableRow[] = members.map((member, idx) => ({
          key: member.id,
          no: paginationInfo.currentPage * paginationInfo.pageSize + idx + 1,
          name: member.name,
          email: member.email,
          sex: getSex(member.sex),
          birthDate: member.birthDate,
          userId: member.id,
          hasLoan: member.hasLoan ? '대출중' : '대출중 아님',
          memberStatus: getMemberStatus(member.memberStatus),
          createdAt: dayjs(member.createdAt).format('YYYY-MM-DD'),
          transactionCount: member.loanTransactionCount,
          lastLoginAt: member.lastLoginAt,
        }));

        return {
          members: mappedMembers,
          paginationInfo,
        };
      } catch (error: unknown) {
        console.error('Error fetching customer data:', error);
        throw new Error('Failed to fetch customer data');
      }
    },
    enabled: !!accessToken,
    staleTime: 1000 * 30,
  });

  return {
    ...queryResult,
    members: queryResult.data?.members ?? [],
    paginationInfo: queryResult.data?.paginationInfo ?? {},
  };
};
