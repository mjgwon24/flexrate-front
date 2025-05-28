import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { FunnelContextMap } from '@/components/loanApplicationFunnel/LoanApplicationFunnel';

type FunnelStore = {
  funnelContext: Partial<FunnelContextMap>;
  setFunnelContext: <K extends keyof FunnelContextMap>(step: K, data: FunnelContextMap[K]) => void;
  clearFunnelContext: () => void;
};

export const useLoanFunnelStore = create<FunnelStore>()(
  persist(
    (set) => ({
      funnelContext: {},
      setFunnelContext: (step, data) =>
        set((state) => ({
          funnelContext: {
            ...state.funnelContext,
            [step]: data,
          },
        })),
      clearFunnelContext: () => set({ funnelContext: {} }),
    }),
    {
      name: 'loan-funnel-context',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
