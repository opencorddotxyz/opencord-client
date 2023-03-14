import { OButton } from '@/components/common/button';
import { PageContainer } from '@/components/common/pageContainer';
import { PAGE_AUTH_CODE_DESCRIPTION, PAGE_AUTH_CODE_TITLE } from '@/constant';
import { useGetCode } from '@/hooks/logic/code';
import { useAuthCode } from '@/store/useAuthCode';
import { formatString } from '@/utils';
import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';

export const AuthCode = () => {
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
    <PageContainer
      pageTitle={PAGE_AUTH_CODE_TITLE}
      pageDescription={PAGE_AUTH_CODE_DESCRIPTION}
    >
      <Box>
        <OButton
          text="Get Code"
          loading={loading}
          onClick={getCodeFun}
          width="81px"
        />

        {authCode.length > 0 ? (
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
              {formatString(authCode, 21, 6)}
            </Box>
          </Box>
        ) : (
          <Box />
        )}
      </Box>
    </PageContainer>
  );
};
