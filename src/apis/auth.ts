/**
 * 인증 관련 API
 */
// 로그인 유저 정보 반환
export async function fetchMyPageUser(token: string) {
  const res = await fetch('http://localhost:8080/api/members/mypage', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('사용자 정보를 불러오지 못했습니다.');

  return res.json();
}
