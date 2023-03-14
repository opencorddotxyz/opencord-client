import { MobileButton } from '@/components/common/button';
import { MobilePageContainer } from '@/components/common/pageContainer/mobile';
import {
  PAGE_INFO_DESCRIPTION,
  PAGE_INFO_TITLE,
  SyntaxHighlighterTheme,
} from '@/constant';
import { useAuthCodeLogin } from '@/hooks/logic/login';
import { useAuthCode } from '@/store/useAuthCode';
import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { formatString, vw } from '@/utils';
import SyntaxHighlighter from 'react-syntax-highlighter';
export const WalletAddressMobile = () => {
  const { authCode } = useAuthCode();
  const { getAuthInfo } = useAuthCodeLogin();
  const [authInfo, setAuthInfo] = useState();

  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const result = await getAuthInfo();
      setAuthInfo(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobilePageContainer
      pageTitle={PAGE_INFO_TITLE}
      pageDescription={PAGE_INFO_DESCRIPTION}
    >
      <Box>
        <Box>
          <Text
            fontWeight="400"
            fontSize={vw(28)}
            lineHeight={vw(35)}
            color="#4D4D4D"
            marginTop={vw(44)}
          >
            Authorization code
          </Text>
          <Box
            height={vw(88)}
            borderRadius={vw(8)}
            fontWeight="500"
            fontSize={vw(32)}
            lineHeight={vw(88)}
            paddingX={vw(32)}
            bg="#333333"
            color="#FFFFFF"
            marginTop={vw(19)}
          >
            {formatString(authCode, 24, 6)}
          </Box>
        </Box>
        <MobileButton text="Try it out" onClick={onClick} loading={loading} />
        <Box height={vw(32)} />
        {authInfo ? (
          <Box borderRadius="4px" overflow="hidden">
            <SyntaxHighlighter
              language="javascript"
              style={SyntaxHighlighterTheme}
            >
              {JSON.stringify(authInfo, null, 2)}
            </SyntaxHighlighter>
          </Box>
        ) : (
          <Box />
        )}
      </Box>
    </MobilePageContainer>
  );
};
