import {
  LoanApplicationRequest,
  LoanApplicationResponse,
  LoanReviewApplicationRequest,
  LoanReviewApplicationResponse,
} from '@/types/loanApplication.type';

import { apiClient } from './client';

export const postLoanReviewApplication = async (
  token: string,
  body: LoanReviewApplicationRequest
) => {
  const { data } = await apiClient.post<LoanReviewApplicationResponse>(
    '/api/loans/loan-review-application',
    body,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return data;
};

export const getLoanReviewApplication = async (token: string) => {
  const response = await apiClient.get<LoanReviewApplicationResponse>(
    '/api/loans/loan-review-application',
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};

export const postLoanApplication = async (token: string, body: LoanApplicationRequest) => {
  const { data } = await apiClient.post<LoanApplicationResponse>(
    '/api/loans/loan-application',
    body,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return data;
};

export const getLoanApplication = async (token: string) => {
  const response = await apiClient.get<LoanApplicationResponse>(
    '/api/loans/loan-application-result',
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};
