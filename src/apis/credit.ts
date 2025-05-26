import { CreditResponse, CreditStatusResponse } from '@/types/credit.type';

import { apiClient } from './client';

export const getCreditScoreEvaluate = async (token: string) => {
  const { data } = await apiClient.get<CreditResponse>('/api/credit-score/evaluate', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getCreditScore = async (token: string) => {
  const { data } = await apiClient.get<CreditResponse>('/api/credit-score', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getCreditStatus = async (token: string) => {
  const { data } = await apiClient.get<CreditStatusResponse>('/api/members/credit-score-status', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
