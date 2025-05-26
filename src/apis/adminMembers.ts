import { GetAdminMembersResponse, PatchMemberPayload } from '@/types/admin.type';

import { apiClient } from './client';

/**
 * 관리자 회원 목록 조회 API
 * @param params 쿼리 파라미터
 * @param accessToken 인증 토큰
 * 
 * @since 2025.05.16
 * @author 권민지
 */
export async function getMembers(
  params: Record<string, string>,
  accessToken: string
): Promise<GetAdminMembersResponse> {
  const { data } = await apiClient.get<GetAdminMembersResponse>(`/api/admin/members/search`, {
    params,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
}

/**
 * 관리자 회원 정보 수정 API
 * @param userId 회원 ID
 * @param payload 수정할 데이터
 * @param accessToken 인증 토큰
 * @returns void
 *
 * @since 2025.05.16
 * @author 권민지
 */
export async function patchMember(
  userId: number,
  payload: PatchMemberPayload,
  accessToken: string
): Promise<void> {
  await apiClient.patch(`/api/admin/members/${userId}`, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
