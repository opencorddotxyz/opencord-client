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
      if (notificationTitle.length < 1) {
        return toast({
          position: 'top',
          render: () => {
            return <TextToast text="Title cannot be empty" />;
          },
        });
      }

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
          bg="#333333"
          borderRadius="4px"
          height="40px"
          outline="none"
          _active={{
            border: 'none',
            outline: 'none',
          }}
          border="none"
          _focus={{
            boxShadow: 'none',
            outlineColor: 'none',
          }}
          padding="10px"
          color="#FFFFFF"
          marginTop="10px"
          _placeholder={{
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '20px',
            color: '#FFFFFF',
            opacity: 0.3,
          }}
          placeholder="Enter here"
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
          bg="#333333"
          borderRadius="4px"
          height="40px"
          border="none"
          _focus={{
            boxShadow: 'none',
            outlineColor: 'none',
          }}
          _active={{
            border: 'none',
            outline: 'none',
          }}
          _placeholder={{
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '20px',
            color: '#FFFFFF',
            opacity: 0.3,
          }}
          padding="10px"
          color="#FFFFFF"
          placeholder="Enter here"
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
