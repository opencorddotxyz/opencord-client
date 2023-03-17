import { pluginNotify } from '../../../net/server';
import { useUserStore } from '../../../store/userStore';
import { useIsAuthenticated } from '../../common/useIsAuthenticated';

export const useNotification = () => {
  useIsAuthenticated();
  const { channelId, userId } = useUserStore();
  const pushNotification = async (title: string, content: string) => {
    const result = await pluginNotify({
      channelId,
      title,
      content,
      jumpPath: '',
      receiverIds: [userId],
    });
    return result;
  };
  return {
    pushNotification,
  };
};
