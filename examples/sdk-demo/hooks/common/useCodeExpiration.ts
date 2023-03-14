import { useEffect } from 'react';
import { useAuthCode } from '../../store/useAuthCode';

export const useCodeExpiration = () => {
  const { getCodeFormOC, authCode: code, accessTime } = useAuthCode();

  useEffect(() => {
    const now = new Date().getTime();
    if (now - accessTime > 10 * 60 * 60 * 1000) {
      getCodeFormOC();
    }
  }, []);
};
