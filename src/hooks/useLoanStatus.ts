import { useQuery } from '@tanstack/react-query';
import { getCustomerLoanStatus } from '@/apis/customer';

export const useLoanStatus = () => {
  return useQuery({
    queryKey: ['loan-status'],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) throw new Error('로그인이 필요합니다.');
      return await getCustomerLoanStatus(token);
    },
    enabled: typeof window !== 'undefined',
    retry: 1,
  });
};
