import { MobilePageContainer } from '@/components/common/pageContainer/mobile';
import { Box, Text } from '@chakra-ui/react';
import { PAGE_AUTH_CODE_DESCRIPTION, PAGE_AUTH_CODE_TITLE } from '@/constant';

import { formatString, vw } from '@/utils';
import { useGetCode } from '@/hooks/logic/code';
import { useAuthCode } from '@/store/useAuthCode';
import { MobileButton } from '@/components/common/button';
import { useState } from 'react';
export const AuthCodeMobile = () => {
  const { getCode } = useGetCode();
  const { authCode } = useAuthCode();
  const [loading, setLoading] = useState(false);
  const getCodeFun = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await getCode();
    } finally {
      setLoading(false);
    }
  };
  return (
    <MobilePageContainer
      pageTitle={PAGE_AUTH_CODE_TITLE}
      pageDescription={PAGE_AUTH_CODE_DESCRIPTION}
    >
      <Box>
        <MobileButton text="Get Code" onClick={getCodeFun} loading={loading} />
        {authCode?.length > 0 ? (
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
        ) : (
          <Box />
        )}
      </Box>
    </MobilePageContainer>
  );
};
