import { useEffect } from 'react';

import { getMyPageUser } from '@/apis/auth';
import { useUserStore } from '@/stores/userStore';

/**
 * 사용자 정보를 초기화
 */
export const useInitUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  const prevUser = useUserStore.getState().user;

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token || !prevUser) {
      setUser(null);
      return;
    }

    getMyPageUser(token)
      .then((data) => {
        setUser({
          ...prevUser,
          consumeGoal: data.consumeGoal,
          consumptionType: data.consumptionType,
        });
      })
      .catch(() => {
        setUser(null);
      });
  }, [setUser]);
};
