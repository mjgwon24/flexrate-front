import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchMember } from '@/apis/adminMembers';
import { FilterType } from '@/types/filter.type';

function toRawSex(sex: string | undefined): 'MALE' | 'FEMALE' | undefined {
  switch (sex) {
    case '남':
    case '남성':
    case 'MALE':
      return 'MALE';
    case '여':
    case '여성':
    case 'FEMALE':
      return 'FEMALE';
    default:
      return undefined;
  }
}

function toRawMemberStatus(
  status: string | undefined
): 'ACTIVE' | 'WITHDRAWN' | 'SUSPENDED' | undefined {
  switch (status) {
    case '활성':
    case 'ACTIVE':
      return 'ACTIVE';
    case '탈퇴':
    case 'WITHDRAWN':
      return 'WITHDRAWN';
    case '정지':
    case 'SUSPENDED':
      return 'SUSPENDED';
    default:
      return undefined;
  }
}

interface PatchMemberArgs {
  userId: number;
  payload: {
    name?: string;
    email?: string;
    sex?: string;
    birthDate?: string;
    memberStatus?: string;
  };
  accessToken: string;
}

function removeUndefined(obj: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
}

export function usePatchMember(
  filters: FilterType,
  accessToken: string,
  page: number,
  size: number = 8
) {
  const queryClient = useQueryClient();

  // params 생성 로직을 useMembersQueryParams와 맞춰줌
  function getParams() {
    const params: Record<string, string> = {};
    if (filters.name) params.name = filters.name;
    if (filters.sex && filters.sex !== 'ALL') params.sex = filters.sex;
    if (filters.birthDateRange && filters.birthDateRange[0] && filters.birthDateRange[1]) {
      params.birthDateStart = filters.birthDateRange[0];
      params.birthDateEnd = filters.birthDateRange[1];
    }
    if (filters.memberStatus && filters.memberStatus !== 'ALL')
      params.memberStatus = filters.memberStatus;
    if (filters.createdDateRange && filters.createdDateRange[0] && filters.createdDateRange[1]) {
      params.startDate = filters.createdDateRange[0];
      params.endDate = filters.createdDateRange[1];
    }
    if (filters.hasLoan && filters.hasLoan !== 'ALL') params.hasLoan = filters.hasLoan;
    if (filters.transactionCountMin)
      params.transactionCountMin = String(filters.transactionCountMin);
    if (filters.transactionCountMax)
      params.transactionCountMax = String(filters.transactionCountMax);
    params.page = String(page - 1);
    params.size = String(size);
    return params;
  }

  return useMutation({
    mutationFn: async ({ userId, payload, accessToken }: PatchMemberArgs) => {
      const rawPayload = {
        ...payload,
        sex: toRawSex(payload.sex),
        memberStatus: toRawMemberStatus(payload.memberStatus),
      };
      const cleanPayload = removeUndefined(rawPayload);
      return patchMember(userId, cleanPayload, accessToken);
    },
    onSuccess: () => {
      const params = getParams();
      queryClient.invalidateQueries({
        queryKey: ['customers', JSON.stringify(params), accessToken],
      });
    },
  });
}
