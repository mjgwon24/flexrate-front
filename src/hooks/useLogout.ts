import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { logout } from '@/apis/auth';
import { useUserStore } from '@/stores/userStore';

export const useLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') ?? '' : '';
      if (token) {
        await logout(token);
      }
    },
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      useUserStore.getState().clearUser();
      router.replace('/');
    },
  });
};
