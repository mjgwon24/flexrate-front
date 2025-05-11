import { useQuery } from '@tanstack/react-query';

const fetchCustomers = async (filters: any) => {
  // 추후 실제 API 요청 추가 예정
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`/api/customers?${params}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export const useCustomersQuery = (filters: any, enabled: boolean) => {
  return useQuery({
    queryKey: ['customers', filters],
    queryFn: () => fetchCustomers(filters),
    enabled,
  });
};
