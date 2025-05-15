import { useEffect } from 'react';

import { getMyPageUser } from '@/apis/auth';
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

    getMyPageUser(token)
      .then((data) => setUser(data))
      .catch(() => {
        setUser(null);
      });
  }, [setUser]);
}
