import { Box, Text, Flex, Image, Spacer } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Permission, RunTimeInformation } from '../../components';
import { AuthCode } from '../../components/authCode/pc';
import { WalletAddress } from '../../components/walletAddress/pc';
import { Notification } from '../../components/notification/pc';
import {
  OPENCORD_DOCS_LINK,
  PAGE_SIDEBAR_ADDRESS,
  PAGE_SIDEBAR_CODE,
  PAGE_SIDEBAR_NOTION,
  PAGE_SIDEBAR_PERMISSIONS,
  PAGE_SIDEBAR_RUNTIME,
  sidebarList,
} from '../../constant';
import { useUserStore } from '@/store/userStore';
const SDKPcPage = () => {
  return (
    <Box
      bg="#282828"
      height="100vh"
      maxWidth="100vw"
      overflow="hidden"
      padding="20px 30px"
    >
      <PageTitle />

      <PageContent />
    </Box>
  );
};
export default SDKPcPage;

const PageTitle = () => {
  return (
    <Flex align="center">
      <Image src="/imgs/oc-logo.svg" width="127px" height="28px" />
      <Box width="20px" />
      <Box height="18px" minWidth="1px" bg="#ffffff" opacity={0.6} />
      <Box width="20px" />
      <Text fontWeight="400" fontSize="14px" color="rgba(255,255,255,0.6)">
        Playground
      </Text>
      <Spacer />
      <Box
        width="60px"
        height="30px"
        border="1px solid #FFFFFF"
        borderRadius="4px"
        color="#FFFFFF"
        textAlign="center"
        cursor="pointer"
        fontWeight="500"
        fontSize="14px"
        lineHeight="30px"
        onClick={() => {
          window.open(OPENCORD_DOCS_LINK, '_blank');
        }}
        _hover={{ opacity: 0.5 }}
        transition="0.3s"
      >
        Docs
      </Box>
    </Flex>
  );
};

const PageContent = () => {
  const [presentExample, setPresentExample] = useState(PAGE_SIDEBAR_RUNTIME);
  const { userId } = useUserStore();
  const pageContent = useMemo(() => {
    if (presentExample === PAGE_SIDEBAR_RUNTIME) {
      return <RunTimeInformation />;
    }
    if (presentExample === PAGE_SIDEBAR_CODE) {
      return <AuthCode />;
    }
    if (userId.length < 1) {
      return <WalletAddress />;
    }
    switch (presentExample) {
      case PAGE_SIDEBAR_RUNTIME:
        return <RunTimeInformation />;
      case PAGE_SIDEBAR_CODE:
        return <AuthCode />;
      case PAGE_SIDEBAR_ADDRESS:
        return <WalletAddress />;
      case PAGE_SIDEBAR_PERMISSIONS:
        return <Permission />;
      case PAGE_SIDEBAR_NOTION:
        return <Notification />;
      default:
        return <RunTimeInformation />;
    }
  }, [presentExample, userId]);
  return (
    <Flex width="100%" height="100%" marginTop="36px">
      <Box>
        <Text
          fontWeight="400"
          fontSize="14px"
          lineHeight="18px"
          color="rgba(255,255,255,0.3)"
        >
          Examples
        </Text>

        <Box
          marginTop="12px"
          width="211px"
          borderRight="1px solid rgba(255, 255, 255, 0.05)"
          height="340px"
        >
          {sidebarList.map((val) => {
            return (
              <SidebarItem
                headline={val.headline}
                marking={val.marking}
                presentMarking={presentExample}
                onClick={setPresentExample}
              />
            );
          })}
        </Box>
      </Box>
      <Spacer paddingX="24px">{pageContent}</Spacer>
    </Flex>
  );
};

const SidebarItem = (props: {
  headline: string;
  presentMarking: number;
  marking: number;
  onClick: (marking: number) => void;
}) => {
  const { headline = '', presentMarking, marking, onClick } = props;
  const isPresent = useMemo(() => {
    return presentMarking === marking;
  }, [presentMarking, marking]);
  return (
    <Box
      color="#FFFFFF"
      width="187px"
      height="38px"
      bg={isPresent ? '#3B3B3B' : '#282828'}
      borderRadius="4px"
      marginBottom="6px"
      fontWeight="400"
      fontSize="14px"
      lineHeight="38px"
      paddingLeft="12px"
      cursor="pointer"
      onClick={() => {
        onClick(marking);
      }}
      _hover={{
        bg: '#3B3B3B',
      }}
      transition="0.3s"
    >
      {headline}
    </Box>
  );
};
