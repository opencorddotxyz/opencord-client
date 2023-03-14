import { pluginVerifyLoginCode } from '../../../net/server';
import { useAuthCode } from '../../../store/useAuthCode';
import { useUserStore } from '../../../store/userStore';
import { useCodeExpiration } from '../../common/useCodeExpiration';

export const useAuthCodeLogin = () => {
  useCodeExpiration();
  const { authCode: code } = useAuthCode();

  const { getLoginInfo } = useUserStore();

  const getAuthInfo = async () => {
    const result = await pluginVerifyLoginCode({ code });
    console.log('result', result);
    const {
      serverId = '',
      channelId = '',
      address = '',
      userId = '',
    } = result.data?.data ?? {};
    getLoginInfo({ serverId, channelId, address, userId });
    return result.data?.data ?? {};
  };
  return { getAuthInfo };
};
