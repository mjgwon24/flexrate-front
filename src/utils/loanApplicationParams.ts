import {LoanFilterType} from '@/types/loan.filter.type';

/**
 * 대출 신청 조회 필터를 API 파라미터로 변환
 * @param filters 필터 객체
 * @param page 페이지 번호
 * @param size 페이지 크기
 * @returns 변환된 API 파라미터 객체
 *
 * @since 2025.05.19
 * @author 허연규
 */
export function filtersToLoanApplicationParams(
    filters: LoanFilterType,
    page: number,
    size: number
): Record<string, string> {
    const params: Record<string, string> = {};

    params.page = String(page - 1);
    params.size = String(size);

    if (filters.status && filters.status !== 'ALL') {
        params.status = filters.status;
    }

    if (filters.applicationDateRange && filters.applicationDateRange[0] && filters.applicationDateRange[1]) {
        params.appliedFrom = filters.applicationDateRange[0];
        params.appliedTo = filters.applicationDateRange[1];
    }

    if (filters.applicantName) {
        params.applicant = filters.applicantName;
    }

    if (filters.loanLimitMin !== null) {
        params.limitFrom = String(filters.loanLimitMin);
    }
    if (filters.loanLimitMax !== null) {
        params.limitTo = String(filters.loanLimitMax);
    }

    if (filters.initialInterestRateMin !== null) {
        params.rateFrom = String(filters.initialInterestRateMin);
    }
    if (filters.initialInterestRateMax !== null) {
        params.rateTo = String(filters.initialInterestRateMax);
    }

    if (filters.previousLoanCountMin !== null) {
        params.prevLoanCountFrom = String(filters.previousLoanCountMin);
    }
    if (filters.previousLoanCountMax !== null) {
        params.prevLoanCountTo = String(filters.previousLoanCountMax);
    }

    if (filters.loanType && filters.loanType !== 'ALL') {
        params.type = filters.loanType;
    }

    return params;
}