import axios from 'axios';

/**
 * 상환 내역 조회
 */
const API_URL = process.env.API_URL || 'http://localhost:8080';

export const fetchTransactionHistory = async (
  memberId: string,
  token: string | null,
  page: number,
  size: number
) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/api/admin/loans/members/${memberId}/transactions`,
      {
        params: { page, size },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    throw new Error('거래 내역 조회 실패');
  }
};
