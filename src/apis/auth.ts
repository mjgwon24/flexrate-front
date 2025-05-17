import axios from 'axios';

/**
 * 인증 관련 API
 */
const API_URL = process.env.API_URL || 'http://localhost:8080';

// 로그인 유저 정보 반환
export async function getMyPageUser(token: string) {
  const { data } = await axios.get(`${API_URL}/api/members/mypage`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}
