import { ConsumptionTypeResponse } from '@/types/auth.type';
import { getConsumptionType } from '../apis/auth';
import { useQuery } from '@tanstack/react-query';

export const useConsumptionType = () => {
  return useQuery({
    queryKey: ['consumptionType'],
    queryFn: getConsumptionType,
  });
};
