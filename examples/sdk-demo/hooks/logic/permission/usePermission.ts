import { validateChannelPermissions } from '../../../net/server';
import { useUserStore } from '../../../store/userStore';
import { useIsAuthenticated } from '../../common/useIsAuthenticated';

export const usePermission = () => {
  useIsAuthenticated();
  const { userId, channelId } = useUserStore();
  const getUserChannelPermission = async (permissions: number) => {
    const result = await validateChannelPermissions({
      channelId: channelId,
      userId: userId,
      group: '2',
      permissions: `${permissions}`,
    });
    return result.data?.data ?? {};
  };
  return {
    getUserChannelPermission,
  };
};
