import { useMutation } from '@tanstack/react-query';

import { postVerifyEmailCode } from '@/apis/auth';

export const useVerifyEmailCode = (onSuccessCallback: (email: string) => void) => {
  return useMutation({
    mutationFn: postVerifyEmailCode,
    onSuccess: (_, variables) => {
      onSuccessCallback(variables.email);
    },
    onError: () => {
      alert('인증번호가 틀렸거나 만료되었습니다.');
    },
  });
};
