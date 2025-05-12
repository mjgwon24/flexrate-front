import { create } from 'zustand';

import { GenderType, UserStatusType, LoanStatusType, FilterType } from '@/types/filter.type';

/**
 * 관리자 페이지 필터 정보 타입
 */
export interface FilterState extends FilterType {
  setName: (name: string) => void;
  setGender: (gender: GenderType) => void;
  setBirthRange: (range: [string, string] | null) => void;
  setUserStatus: (status: UserStatusType) => void;
  setJoinDateRange: (range: [string, string] | null) => void;
  setLoanStatus: (status: LoanStatusType) => void;
  setTransactionCountMin: (min: number | null) => void;
  setTransactionCountMax: (max: number | null) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  name: '',
  gender: 'ALL',
  birthRange: null,
  userStatus: 'ALL',
  joinDateRange: null,
  loanStatus: 'ALL',
  transactionCountMin: null,
  transactionCountMax: null,
  setName: (name) => set({ name }),
  setGender: (gender) => set({ gender }),
  setBirthRange: (birthRange) => set({ birthRange }),
  setUserStatus: (userStatus) => set({ userStatus }),
  setJoinDateRange: (joinDateRange) => set({ joinDateRange }),
  setLoanStatus: (loanStatus) => set({ loanStatus }),
  setTransactionCountMin: (transactionCountMin) => set({ transactionCountMin }),
  setTransactionCountMax: (transactionCountMax) => set({ transactionCountMax }),
}));
