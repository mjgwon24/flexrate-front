import { create } from 'zustand';

import { SexType, MemberStatusType, HasLoanType, FilterType } from '@/types/filter.type';

/**
 * 관리자 페이지 필터 정보 타입
 */
export interface FilterState extends FilterType {
  setName: (name: string) => void;
  setSex: (sex: SexType) => void;
  setBirthRange: (range: [string, string] | null) => void;
  setMemberStatus: (memberStatus: MemberStatusType) => void;
  setCreatedDateRange: (range: [string, string] | null) => void;
  setHasLoan: (memberStatus: HasLoanType) => void;
  setTransactionCountMin: (min: number | null) => void;
  setTransactionCountMax: (max: number | null) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  name: '',
  sex: 'ALL',
  birthDateRange: null,
  memberStatus: 'ALL',
  createdDateRange: null,
  hasLoan: 'ALL',
  transactionCountMin: null,
  transactionCountMax: null,
  setName: (name) => set({ name }),
  setSex: (sex) => set({ sex }),
  setBirthRange: (birthDateRange) => set({ birthDateRange }),
  setMemberStatus: (memberStatus) => set({ memberStatus }),
  setCreatedDateRange: (createdDateRange) => set({ createdDateRange }),
  setHasLoan: (hasLoan) => set({ hasLoan }),
  setTransactionCountMin: (transactionCountMin) => set({ transactionCountMin }),
  setTransactionCountMax: (transactionCountMax) => set({ transactionCountMax }),
}));
