import { loginUser } from '@/apis/auth';
import { authSchemas } from '@/schemas/auth.schema';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export type LoginFormValues = z.infer<typeof authSchemas.login>;

export const useLoginUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: LoginFormValues) => loginUser(data),
    onSuccess: (res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      router.push('/');
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('로그인 실패:', error);
        alert('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        console.error('알 수 없는 오류:', error);
      }
    },
  });
};
