import axios from 'axios';

/**
 * 고객 상세 정보 조회
 */
const API_URL = process.env.API_URL || 'http://localhost:8080';

export const fetchCustomerDetail = async (memberId: string, token: string | null) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/admin/members/${memberId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error('고객 정보 조회 실패');
  }
};
