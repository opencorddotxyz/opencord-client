import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { useAuthCode } from '@/store/useAuthCode';
import { formatString } from '@/utils';

import { useAuthCodeLogin } from '@/hooks/logic/login';

import {
  PAGE_INFO_DESCRIPTION,
  PAGE_INFO_TITLE,
  SyntaxHighlighterTheme,
} from '@/constant';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { PageContainer } from '@/components/common/pageContainer';
import { OButton } from '@/components/common/button';

export const WalletAddress = () => {
  const { authCode: code } = useAuthCode();
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
    <PageContainer
      pageTitle={PAGE_INFO_TITLE}
      pageDescription={PAGE_INFO_DESCRIPTION}
    >
      <Box>
        <Box marginTop="20px">
          <Text
            fontWeight="400"
            fontSize="14px"
            height="18px"
            color="rgba(255, 255, 255, 0.6)"
          >
            Authorization code
          </Text>
          <Box
            marginTop="20px"
            minWidth="302px"
            width="min"
            height="44px"
            bg="#333333"
            borderRadius="4px"
            padding="12px 16px"
            fontWeight="500"
            fontSize="16px"
            lineHeight="20px"
            color="#FFFFFF"
          >
            {formatString(code, 21, 6)}
          </Box>
        </Box>
        <OButton
          text="Try it out"
          onClick={onClick}
          loading={loading}
          width="99px"
        />
        <Box height="10px" />

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
    </PageContainer>
  );
};
