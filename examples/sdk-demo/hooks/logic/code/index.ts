import { useAuthCode } from '../../../store/useAuthCode';

export const useGetCode = () => {
  const { getCodeFormOC, authCode } = useAuthCode();
  const getCode = async () => {
    await getCodeFormOC();
  };
  return {
    getCode,
  };
};
