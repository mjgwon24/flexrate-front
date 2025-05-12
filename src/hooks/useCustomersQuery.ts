import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { FilterType } from '@/types/filter.type';

function useCustomerQueryParams(filters: FilterType) {
  return useMemo(() => {
    const params: Record<string, string> = {};
    if (filters.name) params.name = filters.name;
    if (filters.gender && filters.gender !== 'ALL') params.gender = filters.gender;
    if (filters.birthRange && filters.birthRange[0] && filters.birthRange[1]) {
      params.birthStart = filters.birthRange[0];
      params.birthEnd = filters.birthRange[1];
    }
    if (filters.userStatus && filters.userStatus !== 'ALL') params.userStatus = filters.userStatus;
    if (filters.joinDateRange && filters.joinDateRange[0] && filters.joinDateRange[1]) {
      params.joinStart = filters.joinDateRange[0];
      params.joinEnd = filters.joinDateRange[1];
    }
    if (filters.loanStatus && filters.loanStatus !== 'ALL') params.loanStatus = filters.loanStatus;
    if (filters.transactionCountMin !== null && filters.transactionCountMin !== undefined) {
      params.transactionCountMin = String(filters.transactionCountMin);
    }
    if (filters.transactionCountMax !== null && filters.transactionCountMax !== undefined) {
      params.transactionCountMax = String(filters.transactionCountMax);
    }
    return params;
  }, [filters]);
}

const fetchCustomers = async (paramsObj: Record<string, string>) => {
  const params = new URLSearchParams(paramsObj).toString();
  // 추후 실제 API 요청 추가 예정
  const res = await fetch(`/api/customers?${params}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export const useCustomersQuery = (filters: FilterType) => {
  const params = useCustomerQueryParams(filters);
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => fetchCustomers(params),
  });
};
