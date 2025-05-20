import {useMutation, useQueryClient} from '@tanstack/react-query';

import {patchLoanStatus} from '@/apis/loanApplication';
import {LoanFilterType} from '@/types/loan.filter.type';
import {filtersToLoanApplicationParams} from '@/utils/loanApplicationParams';

/**
 * 프론트 상태 문자열을 백엔드 상태 문자열로 변환
 */
function toRawStatus(
    status: string | undefined
): 'PRE_APPLIED' | 'PENDING' | 'REJECTED' | 'EXECUTED' | 'COMPLETED' {
    switch (status) {
        case '신청 접수':
        case 'PRE_APPLIED':
            return 'PRE_APPLIED';
        case '심사중':
        case 'PENDING':
            return 'PENDING';
        case '거절됨':
        case 'REJECTED':
            return 'REJECTED';
        case '실행됨':
        case 'EXECUTED':
            return 'EXECUTED';
        case '상환 완료':
        case 'COMPLETED':
            return 'COMPLETED';
        default:
            throw new Error(`지원하지 않는 상태입니다: ${status}`);
    }
}

interface PatchLoanStatusArgs {
    applicationId: number;
    payload: { status: string, reason?: string };
    accessToken: string;
}

function removeUndefined(obj: Record<string, unknown>) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== undefined)
    );
}

export function usePatchLoanStatus(
    filters: LoanFilterType,
    accessToken: string,
    page: number,
    size: number = 8
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({applicationId, payload}: PatchLoanStatusArgs) => {
            const rawPayload = {
                ...payload,
                status: toRawStatus(payload.status),
                reason: payload.reason || '대출 신청 상태 변경'
            };
            const cleanPayload = removeUndefined(rawPayload);
            return patchLoanStatus(applicationId, cleanPayload, accessToken);
        },
        onSuccess: () => {
            const params = filtersToLoanApplicationParams(filters, page, size);
            queryClient.invalidateQueries({
                queryKey: ['loanApplications', params, accessToken],
            });
        },
    });
}