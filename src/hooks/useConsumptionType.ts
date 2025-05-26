import { useQuery } from '@tanstack/react-query';

import { getConsumptionType } from '../apis/auth';

export const useConsumptionType = () => {
  return useQuery({
    queryKey: ['consumptionType'],
    queryFn: getConsumptionType,
  });
};
