import { FilterType } from '@/types/filter.type';

/**
 * 관리자 페이지 조회 조건(필터) 객체를 쿼리 파라미터로 변환
 * @param filters 조회 조건 필터
 * @param page 페이지
 * @param size 페이지 크기
 */
export function filtersToParams(
  filters: FilterType,
  page: number,
  size: number
): Record<string, string> {
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
  if (filters.transactionCountMin) params.transactionCountMin = String(filters.transactionCountMin);
  if (filters.transactionCountMax) params.transactionCountMax = String(filters.transactionCountMax);
  params.page = String(page - 1);
  params.size = String(size);
  return params;
}
