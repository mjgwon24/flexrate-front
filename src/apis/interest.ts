import { PeriodKey } from '@/types/chart.type';
import { InterestCurrentResponse, InterestRateResponse, MainResponse } from '@/types/interest.type';

import { apiClient } from './client';

export const getInterestStats = async (token: string, periodType: PeriodKey) => {
  const response = await apiClient.get<InterestRateResponse>('/loans/interest/stats', {
    headers: { Authorization: `Bearer ${token}` },
    params: { periodType },
  });

  return response.data;
};

export const getInterestCurrent = async (token: string) => {
  const response = await apiClient.get<InterestCurrentResponse>('/loans/interest/current', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getMain = async (token: string) => {
  const response = await apiClient.get<MainResponse>('/api/members/main', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
