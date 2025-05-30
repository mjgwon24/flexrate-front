import { useQuery } from '@tanstack/react-query';

import { getMain } from '@/apis/interest';
import { MainResponse } from '@/types/interest.type';

export const useMainSecondPage = () => {
  const token = typeof window !== undefined ? localStorage.getItem('accessToken') ?? '' : '';

  const { data, isLoading, error } = useQuery<MainResponse>({
    queryKey: ['mainSecondPage'],
    queryFn: () => getMain(token),
    enabled: !!token,
  });

  return {
    mainData: data,
    isLoading,
    error,
  };
};
