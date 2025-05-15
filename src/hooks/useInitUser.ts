import { useEffect } from 'react';

import { fetchMyPageUser } from '@/apis/auth';
import { useUserStore } from '@/stores/userStore';

/**
 * 사용자 정보를 초기화
 */
export function useInitUser() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setUser(null);
      return;
    }

    fetchMyPageUser(token)
      .then((data) => setUser(data))
      .catch(() => {
        setUser(null);
      });
  }, [setUser]);
}
