import { useEffect } from 'react';

import { FunnelContextMap } from '@/components/loanApplicationFunnel/LoanApplicationFunnel';
import { useLoanFunnelStore } from '@/stores/LoanFunnelStore';

export const useResumeFunnel = () => {
  const { funnelContext, setFunnelContext } = useLoanFunnelStore();

  useEffect(() => {
    const raw = localStorage.getItem('loan-funnel-context');
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      const saved = parsed?.state?.funnelContext;
      if (!saved) return;

      (Object.keys(saved) as (keyof FunnelContextMap)[]).forEach((step) => {
        if (!funnelContext[step]) {
          setFunnelContext(step, saved[step]);
        }
      });
    } catch (e) {
      console.warn('로컬스토리지 파싱 실패', e);
    }
  }, []);
};
