import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8080';

/**
 * API 응답 타입
 */
export interface PaginationInfo {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface RawLoanApplication {
    id: number;
    status: 'PRE_APPLIED' | 'PENDING' | 'REJECTED' | 'EXECUTED' | 'COMPLETED';
    appliedAt: string;
    applicant: string;
    applicantId: number;
    availableLimit: number;
    initialRate: number;
    prevLoanCount: number;
    type: 'NEW' | 'EXTENSION' | 'REDEVELOPMENT';
}

export interface LoanApiResponse {
    paginationInfo: PaginationInfo;
    loans: RawLoanApplication[];
}

/**
 * 관리자 대출 신청 목록 조회 API
 * @param params 쿼리 파라미터
 * @param accessToken 인증 토큰
 *
 * @since 2025.05.19
 * @author 허연규
 */
export async function getLoanApplications(
    params: Record<string, unknown>,
    accessToken: string
): Promise<LoanApiResponse> {
    const {data} = await axios.get<LoanApiResponse>(`${API_URL}/api/admin/loans`, {
        params,
        headers: {Authorization: `Bearer ${accessToken}`},
    });

    return data;
}

/**
 * 관리자 대출 상태 정보 수정 API
 * @param applicationId 대출 ID
 * @param payload 수정할 데이터 (상태 및 사유)
 * @param accessToken 인증 토큰
 * @returns void
 */
export async function patchLoanStatus(
    applicationId: number,
    payload: { status?: string, reason?: string },
    accessToken: string
): Promise<void> {
    await axios.patch(`${API_URL}/api/admin/loans/${applicationId}/status`, payload, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
}