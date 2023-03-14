import { useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { pluginNotify } from '../../net/server';
import { useUserStore } from '../../store/userStore';

export const useNotify = () => {
  const { channelId } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [notifyRes, setNotifyRes] = useState<any>();
  const toast = useToast();
  const [notifyParams, setNotifyParams] = useState<{
    title: string;
    content: string;
    jumpPath: string;
  }>({
    title: '',
    content: '',
    jumpPath: 'test',
  });

  const notify = useCallback(async () => {
    try {
      setLoading(true);

      if (!notifyParams?.title) {
        toast({
          position: 'top',
          status: 'error',
          description: 'Please input title',
        });
        return;
      }

      if (!notifyParams?.content) {
        toast({
          position: 'top',
          status: 'error',
          description: 'Please input content',
        });
        return;
      }

      const res = await pluginNotify({
        ...notifyParams,
        channelId,
      });
      setNotifyRes('succeeded');
    } catch (e) {
      setNotifyRes('failed');
    } finally {
      setLoading(false);
    }
  }, [notifyParams]);

  return {
    notifyRes,
    notifyParams,
    notify,
    loading,
    setNotifyParams,
  };
};
