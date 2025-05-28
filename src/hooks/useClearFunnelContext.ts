'use client';

import { useEffect, useRef } from 'react';

import { useLoanFunnelStore } from '@/stores/LoanFunnelStore';
import { useUserStore } from '@/stores/userStore';

export const useClearFunnelContext = () => {
  const user = useUserStore((state) => state.user);
  const previousUserEmail = useRef<string | null>(null);

  useEffect(() => {
    const currentEmail = user?.email ?? null;
    const previousEmail = previousUserEmail.current;

    if (previousEmail && currentEmail && previousEmail !== currentEmail) {
      localStorage.removeItem('loan-funnel-context');
      requestAnimationFrame(() => {
        useLoanFunnelStore.getState().clearFunnelContext();
      });
    }

    previousUserEmail.current = currentEmail;
  }, [user?.email]);
};
