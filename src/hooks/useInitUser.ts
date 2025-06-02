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
    if (!prevUser) {
      setUser(null);
      return;
    }

    getMyPageUser()
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
