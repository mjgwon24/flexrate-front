import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { postSendEmailVerificationCode } from '@/apis/auth';

export const useEmailVerification = () => {
  const [codeSent, setCodeSent] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: postSendEmailVerificationCode,
    onError: (error: unknown) => {
      if (isAxiosError(error) && error.response?.status === 409) {
        alert('이미 가입된 이메일입니다.');
        setCodeSent(false);
      } else {
        alert('인증메일 발송에 실패했습니다.');
      }
    }
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
