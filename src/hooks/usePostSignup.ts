import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { postSignupUser } from '@/apis/auth';

export const usePostSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: postSignupUser,
    onSuccess: () => {
      router.push('/auth/login');
    },
    onError: (error) => {
      console.error('회원가입 실패', error);
      alert('회원가입에 실패했어요. 다시 시도해주세요.');
    },
  });
};
