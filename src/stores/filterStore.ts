import { create } from 'zustand';

type FilterState = {
  name: string;
  gender: string;
  birthRange: [string, string] | null;
  userStatus: string;
  joinDateRange: [string, string] | null;
  loanStatus: string;
  transactionCountMin: number | null;
  transactionCountMax: number | null;
  setName: (name: string) => void;
  setGender: (gender: string) => void;
  setBirthRange: (range: [string, string] | null) => void;
  setUserStatus: (status: string) => void;
  setJoinDateRange: (range: [string, string] | null) => void;
  setLoanStatus: (status: string) => void;
  setTransactionCountMin: (min: number | null) => void;
  setTransactionCountMax: (max: number | null) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  name: '',
  gender: 'all',
  birthRange: null,
  userStatus: 'all',
  joinDateRange: null,
  loanStatus: 'all',
  transactionCountMin: 0,
  transactionCountMax: 100,
  setName: (name) => set({ name }),
  setGender: (gender) => set({ gender }),
  setBirthRange: (birthRange) => set({ birthRange }),
  setUserStatus: (userStatus) => set({ userStatus }),
  setJoinDateRange: (joinDateRange) => set({ joinDateRange }),
  setLoanStatus: (loanStatus) => set({ loanStatus }),
  setTransactionCountMin: (transactionCountMin) => set({ transactionCountMin }),
  setTransactionCountMax: (transactionCountMax) => set({ transactionCountMax }),
}));
