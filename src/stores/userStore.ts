/**
 * 사용자 정보 전역 상태를 관리하는 Zustand 스토어
 * (예: 로그인 상태, 사용자 프로필 정보 등)
 */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { LoanStatusType } from '@/types/user.type';

type ConsumptionType = 'CONSERVATIVE' | 'BALANCED' | 'PRACTICAL' | 'CONSUMPTION_ORIENTED';

export type User = {
  name: string;
  email: string;
  consumeGoal: string;
  consumptionType: ConsumptionType;
  recentLoanStatus: LoanStatusType;
  hasCreditScore: boolean;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

/**
 * 사용자 정보 Store
 */
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
