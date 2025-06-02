import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { postSendEmailVerificationCode } from '@/apis/auth';

export const useEmailVerification = () => {
  const [codeSent, setCodeSent] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: postSendEmailVerificationCode,
    onError: () => {
      alert('인증메일 발송에 실패했습니다.');
    },
  });

  const requestCode = (email: string) => {
    mutate({ email });
  };

  return {
    requestCode,
    codeSent,
    setCodeSent,
    isLoading: isPending,
  };
};
