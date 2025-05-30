import { useQueries } from '@tanstack/react-query';

import { getCreditScore } from '@/apis/credit';
import { getInterestCurrent } from '@/apis/interest';

export const useMainFirstPage = () => {
  const token = typeof window !== undefined ? localStorage.getItem('accessToken') ?? '' : '';

  const results = useQueries({
    queries: [
      {
        queryKey: ['interestCurrent'],
        queryFn: () => getInterestCurrent(token),
        enabled: !!token,
      },
      {
        queryKey: ['credit-score'],
        queryFn: () => getCreditScore(token),
        enabled: !!token,
      },
    ],
  });

  const [interestCurrentQuery, creditScoreQuery] = results;

  return {
    interestCurrent: interestCurrentQuery.data,
    creditScore: creditScoreQuery.data,
  };
};
