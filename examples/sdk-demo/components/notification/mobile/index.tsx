import { MobilePageContainer } from '@/components/common/pageContainer/mobile';
import { Box, Center, Text, useToast, Input } from '@chakra-ui/react';

import { vw } from '@/utils';
import { MobileButton } from '@/components/common/button';
import { useState } from 'react';
import { useNotification } from '@/hooks/logic/notification/useNotification';
import {
  PAGE_NOTIFICATION_TITLE,
  PAGE_NOTIFICATION_DESCRIPTION,
} from '@/constant';
import { TextToast } from '@/components/common/toast';
export const NotificationMobile = () => {
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
            return (
              <Box width="100vw">
                <Center>
                  <TextToast text="✅ Success" />
                </Center>
              </Box>
            );
          },
        });
      } else {
        toast({
          position: 'top',
          render: () => {
            return (
              <Box width="100vw">
                <Center>
                  <TextToast text="❌ Fail" />
                </Center>
              </Box>
            );
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobilePageContainer
      pageTitle={PAGE_NOTIFICATION_TITLE}
      pageDescription={PAGE_NOTIFICATION_DESCRIPTION}
    >
      <Box>
        <Text
          fontWeight="400"
          fontSize={vw(28)}
          lineHeight={vw(35)}
          color="#4D4D4D"
          marginTop={vw(44)}
        >
          Title
        </Text>
        <Input
          value={notificationTitle}
          style={{
            height: vw(72),
            borderRadius: vw(10),
            padding: vw(10),
            width: '100%',
            marginTop: vw(13),
            color: '#FFFFFF',
          }}
          bg="#333333"
          border="none"
          _focus={{
            boxShadow: 'none',
            outlineColor: 'none',
          }}
          placeholder="Enter here"
          onChange={(e) => {
            setNotificationTitle(e.target.value);
          }}
          _placeholder={{
            fontWeight: 400,
            color: '#FFFFFF',
            opacity: 0.3,
          }}
        />
        <Text
          fontWeight="400"
          fontSize={vw(28)}
          lineHeight={vw(35)}
          color="#4D4D4D"
          marginTop={vw(44)}
        >
          Content
        </Text>
        <Input
          value={notificationContent}
          onChange={(e) => {
            setNotificationContent(e.target.value);
          }}
          placeholder="Enter here"
          style={{
            height: vw(72),
            borderRadius: vw(10),
            padding: vw(10),
            width: '100%',
            marginTop: vw(13),
            color: '#FFFFFF',
          }}
          bg="#333333"
          _placeholder={{
            fontWeight: 400,
            color: '#FFFFFF',
            opacity: 0.3,
          }}
          border="none"
          _focus={{
            boxShadow: 'none',
            outlineColor: 'none',
          }}
        />
        <MobileButton
          text="Send"
          onClick={pushNotificationFun}
          loading={loading}
        />
      </Box>
    </MobilePageContainer>
  );
};
