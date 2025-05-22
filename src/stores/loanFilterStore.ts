import {create} from 'zustand';

import {LoanStatusType, LoanFilterType, LoanType} from '@/types/loan.filter.type';

/**
 * 대출 신청 관리 페이지 필터 정보 타입
 */
export interface LoanFilterState extends LoanFilterType {
    setStatus: (status: LoanStatusType) => void;
    setApplicationDateRange: (range: [string, string] | null) => void;
    setApplicantName: (name: string) => void;
    setLoanLimitMin: (min: number | null) => void;
    setLoanLimitMax: (max: number | null) => void;
    setInitialInterestRateMin: (min: number | null) => void;
    setInitialInterestRateMax: (max: number | null) => void;
    setPreviousLoanCountMin: (min: number | null) => void;
    setPreviousLoanCountMax: (max: number | null) => void;
    setLoanType: (loanType: LoanType) => void;
}

/**
 * 대출 필터 상태 관리 스토어
 * @since 2025.05.18
 * @author 허연규
 */
export const useLoanFilterStore = create<LoanFilterState>((set) => ({
    status: 'ALL',
    applicationDateRange: null,
    applicantName: '',
    loanLimitMin: null,
    loanLimitMax: null,
    initialInterestRateMin: null,
    initialInterestRateMax: null,
    previousLoanCountMin: null,
    previousLoanCountMax: null,
    loanType: 'ALL',

    setStatus: (status) => set({status}),
    setApplicationDateRange: (applicationDateRange) => set({applicationDateRange}),
    setApplicantName: (applicantName) => set({applicantName}),
    setLoanLimitMin: (loanLimitMin) => set({loanLimitMin}),
    setLoanLimitMax: (loanLimitMax) => set({loanLimitMax}),
    setInitialInterestRateMin: (initialInterestRateMin) => set({initialInterestRateMin}),
    setInitialInterestRateMax: (initialInterestRateMax) => set({initialInterestRateMax}),
    setPreviousLoanCountMin: (previousLoanCountMin) => set({previousLoanCountMin}),
    setPreviousLoanCountMax: (previousLoanCountMax) => set({previousLoanCountMax}),
    setLoanType: (loanType) => set({loanType}),
}));