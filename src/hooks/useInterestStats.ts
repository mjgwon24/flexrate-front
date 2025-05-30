import { useQuery } from '@tanstack/react-query';

import { getInterestStats } from '@/apis/interest';
import { PeriodKey } from '@/types/chart.type';

export const useInterestStats = (periodType: PeriodKey) => {
  return useQuery({
    queryKey: ['interestStats', periodType],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken') || '';
      return getInterestStats(token, periodType);
    },
    enabled: !!periodType,
  });
};
