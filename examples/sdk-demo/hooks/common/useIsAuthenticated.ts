import { useEffect } from 'react';
import { useUserStore } from '../../store/userStore';
import { useAuthCodeLogin } from '../logic/login';

export const useIsAuthenticated = () => {
  const { userId } = useUserStore();
  const { getAuthInfo } = useAuthCodeLogin();
  useEffect(() => {
    if (userId.length === 0) {
      getAuthInfo();
    }
  }, [userId]);
};
