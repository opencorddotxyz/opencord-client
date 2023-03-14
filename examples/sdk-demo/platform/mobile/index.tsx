import { RunTimeMobile } from '@/components/runTime/mobile';
import { Box, Flex, Image, Spacer, Text } from '@chakra-ui/react';
import { vw } from '@/utils';
import { AuthCodeMobile } from '@/components/authCode/mobile';
import { PermissionMobile } from '@/components/permission/mobile';
import { WalletAddressMobile } from '@/components/walletAddress/mobile';
import { NotificationMobile } from '@/components/notification/mobile';
import {
  PAGE_SIDEBAR_RUNTIME,
  PAGE_SIDEBAR_CODE,
  PAGE_SIDEBAR_ADDRESS,
  PAGE_SIDEBAR_PERMISSIONS,
  PAGE_SIDEBAR_NOTION,
  sidebarList,
  OPENCORD_DOCS_LINK,
} from '@/constant';
import { useMemo, useState } from 'react';
const SDKMobile = () => {
  const [presentExample, setPresentExample] = useState(PAGE_SIDEBAR_RUNTIME);
  const [showMenu, setShowMenu] = useState(false);
  const presentExampleLabel = useMemo(() => {
    return sidebarList.find((val) => {
      return val.marking === presentExample;
    });
  }, [presentExample]);
  const pageContent = useMemo(() => {
    switch (presentExample) {
      case PAGE_SIDEBAR_RUNTIME:
        return <RunTimeMobile />;
      case PAGE_SIDEBAR_CODE:
        return <AuthCodeMobile />;
      case PAGE_SIDEBAR_ADDRESS:
        return <WalletAddressMobile />;
      case PAGE_SIDEBAR_PERMISSIONS:
        return <PermissionMobile />;
      case PAGE_SIDEBAR_NOTION:
        return <NotificationMobile />;
      default:
        return <RunTimeMobile />;
    }
  }, [presentExample]);
  return (
    <Box
      bg="#282828"
      height="100vh"
      maxWidth="100vw"
      overflow="hidden"
      position="relative"
    >
      <Flex
        height={vw(88)}
        borderBottom=" 1px solid rgba(255, 255, 255, 0.05)"
        align="center"
        onClick={() => {
          setShowMenu(true);
        }}
        paddingX={vw(15)}
      >
        <Image
          src="/imgs/menu_hidden.svg"
          width={vw(70)}
          height={vw(70)}
          marginRight={vw(7)}
        />
        <Text
          fontWeight="500"
          fontSize={vw(26)}
          lineHeight={vw(33)}
          color="#FFFFFF"
        >
          Examples
        </Text>
        <Text
          fontWeight="400"
          fontSize={vw(26)}
          lineHeight={vw(33)}
          color="#999999"
        >
          /{presentExampleLabel?.headline ?? ''}
        </Text>
      </Flex>
      <Spacer padding={`${vw(34)} ${vw(30)}`}>{pageContent}</Spacer>

      {showMenu ? (
        <Flex
          position="absolute"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="#000000"
          flexDirection="column"
        >
          <Flex
            height={vw(88)}
            borderBottom=" 1px solid rgba(255, 255, 255, 0.05)"
            align="center"
            onClick={() => {
              setShowMenu(false);
            }}
            paddingX={vw(15)}
          >
            <Image
              src="/imgs/menu_show.svg"
              width={vw(70)}
              height={vw(70)}
              marginRight={vw(7)}
            />
            <Text
              fontWeight="500"
              fontSize={vw(26)}
              lineHeight={vw(33)}
              color="#FFFFFF"
            >
              Examples
            </Text>
          </Flex>
          <Box height={vw(24)} />
          <Spacer overflow="hidden">
            <Flex flexDirection="column" height="100%" paddingX={vw(30)}>
              <Spacer>
                {sidebarList.map((val) => {
                  return (
                    <Box
                      key={val.marking}
                      fontWeight="500"
                      fontSize={vw(28)}
                      lineHeight={vw(35)}
                      marginBottom={vw(48)}
                      color="#FFFFFF"
                      onClick={() => {
                        setPresentExample(val.marking);
                        setShowMenu(false);
                      }}
                    >
                      {val.headline}
                    </Box>
                  );
                })}
              </Spacer>
              <Box height={vw(217)} paddingTop={vw(32)}>
                <Text
                  fontWeight="600"
                  fontSize={vw(36)}
                  lineHeight={vw(45)}
                  color="#FFFFFF"
                  onClick={() => {
                    window.open(OPENCORD_DOCS_LINK, '_blank');
                  }}
                >
                  Developer Docs
                </Text>
              </Box>
            </Flex>
          </Spacer>
        </Flex>
      ) : (
        <Box />
      )}
    </Box>
  );
};
export default SDKMobile;