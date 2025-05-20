export type LoanStatusType =
    | 'ALL'
    | 'PRE_APPLIED'
    | 'PENDING'
    | 'REJECTED'
    | 'EXECUTED'
    | 'COMPLETED';
export type LoanType = 'ALL' | 'NEW' | 'EXTENSION' | 'REDEVELOPMENT';

/**
 * 대출 신청 조회 조건(필터) 타입
 */
export type LoanFilterType = {
    status: LoanStatusType;
    applicationDateRange: [string, string] | null;
    applicantName: string;
    loanLimitMin: number | null;
    loanLimitMax: number | null;
    initialInterestRateMin: number | null;
    initialInterestRateMax: number | null;
    previousLoanCountMin: number | null;
    previousLoanCountMax: number | null;
    loanType: LoanType;
};