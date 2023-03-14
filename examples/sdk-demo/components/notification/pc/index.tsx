import { TextToast } from '@/components/common/toast';
import { Box, Input, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNotification } from '../../../hooks/logic/notification/useNotification';

import { OButton } from '../../common/button';
import { PageContainer } from '../../common/pageContainer';

export const Notification = () => {
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationContent, setNotificationContent] = useState('');
  const { pushNotification } = useNotification();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const pushNotificationFun = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const result = await pushNotification(
        notificationTitle,
        notificationContent
      );
      if (result.status === 200 || result.status === 204) {
        toast({
          position: 'top',
          render: () => {
            return <TextToast text="✅ Success" />;
          },
        });
      } else {
        toast({
          position: 'top',
          render: () => {
            return <TextToast text="❌ Fail" />;
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <PageContainer
      pageTitle="Push notifications"
      pageDescription="Send timely and relevant push notifications to keep your users engaged and informed. "
    >
      <Box>
        <Text
          fontWeight="400"
          fontSize="14px"
          height="18px"
          color="rgba(255, 255, 255, 0.6)"
        >
          Title
        </Text>
        <Input
          value={notificationTitle}
          onChange={(e) => {
            setNotificationTitle(e.target.value);
          }}
          border="none"
          bg="#333333"
          borderRadius="4px"
          height="40px"
          _focus={{
            border: 'none',
            outline: 'none',
          }}
          outline="none"
          _active={{
            border: 'none',
            outline: 'none',
          }}
          padding="10px"
          color="#FFFFFF"
          marginTop="10px"
        />
        <Text
          fontWeight="400"
          fontSize="14px"
          height="18px"
          color="rgba(255, 255, 255, 0.6)"
          marginTop="20px"
        >
          Content
        </Text>
        <Input
          value={notificationContent}
          onChange={(e) => {
            setNotificationContent(e.target.value);
          }}
          marginTop="10px"
          border="none"
          bg="#333333"
          borderRadius="4px"
          height="40px"
          _focus={{
            border: 'none',
            outline: 'none',
          }}
          _active={{
            border: 'none',
            outline: 'none',
          }}
          padding="10px"
          color="#FFFFFF"
        />
        <OButton
          text="Send"
          width="60px"
          onClick={pushNotificationFun}
          loading={loading}
        />
      </Box>
    </PageContainer>
  );
};
