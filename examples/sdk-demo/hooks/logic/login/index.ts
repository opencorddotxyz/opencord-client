import { pluginVerifyLoginCode } from '../../../net/server';
import { useAuthCode } from '../../../store/useAuthCode';
import { useUserStore } from '../../../store/userStore';
import { useCodeExpiration } from '../../common/useCodeExpiration';

export const useAuthCodeLogin = () => {
  useCodeExpiration();
  const { authCode: code, getCodeFormOC } = useAuthCode();

  const { getLoginInfo } = useUserStore();

  const getAuthInfo = async () => {
    let authCode: string | undefined = code;
    if (authCode.length < 1) {
      authCode = await getCodeFormOC();
    }
    const result = await pluginVerifyLoginCode({ code: authCode ?? '' });

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
