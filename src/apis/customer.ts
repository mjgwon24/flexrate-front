import { apiClient } from './client';

/**
 * 고객 상세 정보 조회
 */

export const fetchCustomerDetail = async (memberId: string, token: string | null) => {
  try {
    const { data } = await apiClient.get(`/api/admin/members/${memberId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error('고객 정보 조회 실패');
  }
};
